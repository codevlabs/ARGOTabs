#!/usr/bin/env node

var express = require('express');
var compression = require('compression');

var app = express();

// Enable gzip compression.
app.use(compression());

app.use(express.static(__dirname + '/dist'));

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on port: ' + port + '.');
});
