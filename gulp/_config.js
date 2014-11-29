'use strict';

module.exports = {};
module.exports.plugins = require('gulp-load-plugins')();

module.exports.paths = {
  'tmp': './.tmp',
  'dist': './dist',
  'app': './app',
  'test': './test'
};

module.exports.browserify = {
};

module.exports.autoprefixer = [
  'ie >= 8',
  'ie_mob >= 9',
  'ff >= 30',
  'chrome >= 30',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 2.3',
  'bb >= 9'
];

module.exports.handleError = function (e) {
  module.exports.plugins.util.log(e.message);
  this.emit('end');
};
