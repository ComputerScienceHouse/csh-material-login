var config = require('../config');

var webpackConfig = require('../lib/webpack-multi-config')('production');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');

var webpackProductionTask = function(callback) {
  webpack(webpackConfig, function(err, stats) {
    logger(err, stats);
    callback();
  });
};

if (config.tasks.js) {
  gulp.task('webpack:production', webpackProductionTask);
  module.exports = webpackProductionTask;
}
