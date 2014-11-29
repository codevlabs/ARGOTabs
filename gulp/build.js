'use strict';

/* global __dirname */
var gulp = require('gulp');

var config = require('./_config.js');
var paths = config.paths;
var $ = config.plugins;

var wiredep = require('wiredep').stream;
var nodefn = require('when/node');
var fs = require('fs');
var exec = require('child_process').exec;
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var istanbul = require('browserify-istanbul');
var browserifyIncremental = require('browserify-incremental');
var browserSync = require('browser-sync');
var templatizer = require('templatizer');
var penthouse = require('penthouse');
var express = require('express');
var path = require('path');
var mainBowerFiles = require('main-bower-files');
var fs = require('fs');
var _ = require('lodash');

// Turn index.jade into an HTML file.
gulp.task('index.html', function () {
  return gulp.src(paths.app + '/index.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(wiredep())
    .pipe(gulp.dest(paths.tmp))
    .pipe(browserSync.reload({stream: true}));
});

// Generate JS functions from Jade templates.
// Run this before any JS task, because Browserify needs to bundle them in.
gulp.task('templates', function () {
  var templates = templatizer(paths.app + '/templates', null, {});
  return nodefn.call(fs.writeFile, paths.app + '/js/lib/templates.js', templates);
});

// Common outputs between all of the JS tasks.
var spitJs = function (bundleStream) {
  return bundleStream
    .pipe(source(paths.app + '/js/main.js'))
    .pipe($.rename('main.js'))
    .pipe(gulp.dest(paths.tmp + '/js/'));
};

// Bundles Browserify for production; no source or coverage maps.
gulp.task('js', ['templates'], function () {
  var opts = _.extend({
    entries: [paths.app + '/js/main.js'],
  }, config.browserify);

  var bundleStream = browserify(opts)
    .bundle();

  return spitJs(bundleStream);
});

// Bundles Browserify with Istanbul coverage maps.
gulp.task('js:istanbul', ['templates'], function () {
  var opts = _.extend({
    entries: [paths.app + '/js/main.js'],
    debug: true,
  }, config.browserify);

  var bundleStream = browserify(opts)
    .transform(istanbul({
      ignore: ['**/lib/**']
    }))
    .bundle();

  return spitJs(bundleStream);
});


// Bundles Browserify with sourcemaps.
function jsDev() {
  // Incremental development bundle.
  // Stored as a global variable so it can be reused
  // between compiles by `browserify-incremental`
  
  var opts = _.extend({
    entries: [paths.app + '/js/main.js'],
    debug: true,
  }, config.browserify);

  global.incDevBundle = global.incDevBundle || browserifyIncremental(opts);

  var bundleStream = global.incDevBundle
    .bundle()
    .on('error', config.handleError);

  return spitJs(bundleStream)
    .pipe(browserSync.reload({stream: true}));
}

gulp.task('js:dev', ['templates'], jsDev);
gulp.task('js:dev:notemplates', [], jsDev);

// Copies over CSS.
gulp.task('css', function () {
  return gulp.src(paths.app + '/css/main.styl')
    .pipe($.stylus())
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(paths.tmp + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Deletes the assets folder or symlink.
gulp.task('assets:clean', function () {
  return nodefn.call(exec, 'rm -r "' + paths.tmp + '/assets"').catch(function(){});
});

// Creates the .tmp folder if it does not already exists.
gulp.task('mktmp', function () {
  return nodefn.call(exec, 'mkdir -p "' + paths.tmp + '"');
});

// Copies over assets.
gulp.task('assets', ['assets:clean', 'mktmp'], function () {
  return nodefn.call(fs.symlink, '../app/assets', paths.tmp + '/assets');
});

gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('icons', function () {
  return gulp.src(paths.app + '/icons/**/*')
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('icons:dist', function () {
  return gulp.src(paths.app + '/icons/**/*')
    .pipe(gulp.dest(paths.dist));
});

// Copies over assets for production.
gulp.task('assets:dist', ['fonts'], function () {
  var imgFilter = $.filter('**/img/**/*.*');
  var stream = gulp.src(paths.app + '/assets/**/*')
    .pipe(imgFilter)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(imgFilter.restore());

  return stream.pipe(gulp.dest(paths.dist + '/assets/'));
});

// Common tasks between all the different builds.
gulp.task('build:common', ['index.html', 'css']);

// Minimal development build.
gulp.task('build', ['build:common', 'js:dev', 'assets', 'icons']);

// CI testing build, with coverage maps.
gulp.task('build:test', ['build:common', 'js:istanbul', 'assets', 'icons']);

var cssPath = '';

// Production-ready build.
gulp.task('build:dist:base', ['build:common', 'js', 'assets:dist', 'icons:dist'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var htmlFilter = $.filter('**/*.html');
  var assets = $.useref.assets();

  return gulp.src(paths.tmp + '/index.html')
    .pipe(assets)
    .pipe($.rev())

    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore())

    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe($.tap(function (file) {
      // Get the path of the revReplaced CSS file.
      var tmpPath = path.resolve(paths.tmp);
      cssPath = file.path.replace(tmpPath, '');
    }))
    .pipe(cssFilter.restore())

    .pipe(assets.restore())
    .pipe($.useref())

    .pipe(htmlFilter)
    .pipe($.minifyHtml())
    .pipe(htmlFilter.restore())

    .pipe($.revReplace())
    .pipe(gulp.dest(paths.dist));
});

var CRIT = '';

gulp.task('critical', ['build:dist:base'], function (done) {
  // Start a local express server for penthouse.
  var app = express();
  var port = 8765;

  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });

  var server = app.listen(port, function () {
    penthouse({
      url: 'http://localhost:' + port,
      css: paths.dist + cssPath,
      width: 1440,
      height: 900
    }, function (err, criticalCSS) {
      CRIT = criticalCSS.replace('\n', '');
      $.util.log('Critical CSS size: ' + criticalCSS.length + ' bytes.');
      server.close();
      done();
    });
  });
});

gulp.task('build:dist', ['critical'], function () {
  return gulp.src(paths.dist + '/index.html')
    .pipe($.replace(
      '<link rel=stylesheet href=' + cssPath + '>',
      '<style>' + CRIT + '</style>'
    ))
    .pipe(gulp.dest(paths.dist));
});
