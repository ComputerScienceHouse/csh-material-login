let config = require('../config');

let webpackConfig = require('../lib/webpack-multi-config')('production');
let gulp = require('gulp');
let logger = require('../lib/compileLogger');
let webpack = require('webpack');

let webpackProductionTask = function(callback) {
  webpack(webpackConfig, function(err, stats) {
    logger(err, stats);
    callback();
  });
};

if (config.tasks.js) {
  gulp.task('webpack:production', webpackProductionTask);
  module.exports = webpackProductionTask;
}
