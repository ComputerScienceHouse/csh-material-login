var config = require('../config');

var path = require('path');
var pathToUrl = require('./pathToUrl');
var webpack = require('webpack');
var WebpackManifest = require('./webpackManifest');

var webpackConfig = function(env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest);
  var publicPath = pathToUrl(config.tasks.js.dest, '/');

  var extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension;
  });

  var rev = config.tasks.production.rev && env === 'production';
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js';

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      root: jsSrc,
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: config.tasks.js.babel
        },
        {
          test: /enumify/,
          loader: 'babel-loader',
          query: config.tasks.js.babel
        },
        {
          test: require.resolve("jquery"),
          loader: 'expose?$!expose?jQuery'
        }
      ]
    }
  };

  if (env === 'development') {
    webpackConfig.devtool = 'inline-source-map';

    // Create new entries object with webpack-hot-middleware added
    for (var key in config.tasks.js.entries) {
      if (config.tasks.js.entries.hasOwnProperty(key)) {
        var entry = config.tasks.js.entries[key];
        config.tasks.js.entries[key] =
          ['webpack-hot-middleware/client?&reload=true'].concat(entry);
      }
    }

    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries;

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    };

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern
        })
      );
    }
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(
        new WebpackManifest(publicPath, config.root.dest)
      );
    }
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return webpackConfig;
};

if (config.tasks.js) {
  module.exports = webpackConfig;
}
