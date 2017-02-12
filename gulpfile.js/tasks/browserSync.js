let browserSync = require('browser-sync');
let gulp = require('gulp');
let webpack = require('webpack');
let webpackMultiConfig = require('../lib/webpack-multi-config');
let config = require('../config');
let pathToUrl = require('../lib/pathToUrl');

let browserSyncTask = function() {
  let webpackConfig = webpackMultiConfig('development');
  let compiler = webpack(webpackConfig);
  let proxyConfig = config.tasks.browserSync.proxy || null;

  if (typeof (proxyConfig) === 'string') {
    config.tasks.browserSync.proxy = {
      target: proxyConfig,
    };
  }

  let server = config.tasks.browserSync.proxy ||
    config.tasks.browserSync.server;

  server.middleware = [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      publicPath: pathToUrl('/', webpackConfig.output.publicPath),
    }),
    require('webpack-hot-middleware')(compiler),
  ];

  browserSync.init(config.tasks.browserSync);
};

if (!global.production) {
  gulp.task('browserSync', browserSyncTask);
  module.exports = browserSyncTask;
}
