let config = require('../config');

let webpackMultiConfig = require('../lib/webpack-multi-config');
let gulp = require('gulp');
let logger = require('../lib/compileLogger');
let webpack = require('webpack');

let webpackDevelopmentTask = function() {
  webpack(webpackMultiConfig('development'), function(err, stats) {
    logger(err, stats);
  });
};

let webpackProductionTask = function() {
  webpack(webpackMultiConfig('production'), function(err, stats) {
    logger(err, stats);
  });
};

if (config.tasks.js) {
  gulp.task('webpack', ['loginThemes'], webpackDevelopmentTask);
  gulp.task('webpack:production', ['loginThemes'], webpackProductionTask);
  module.exports = webpackDevelopmentTask;
}
