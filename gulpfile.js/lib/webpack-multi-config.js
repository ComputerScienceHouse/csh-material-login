const config = require('../config');

const path = require('path');
const pathToUrl = require('./pathToUrl');
const webpack = require('webpack');
const WebpackManifest = require('./webpackManifest');

const webpackConfig = function(env) {
  const jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  const jsDest = path.resolve(config.root.dest, config.tasks.js.dest);
  const publicPath = pathToUrl(config.tasks.js.dest, '/');

  const extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension;
  });

  const rev = config.tasks.production.rev && env === 'production';
  const filenamePattern = rev ? '[name]-[hash].js' : '[name].js';

  const webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      modules: [
        jsSrc,
        'node_modules',
      ],
      extensions: extensions,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: config.tasks.js.babel,
            },
          ],
        },
        {
          test: /(enumify|es6-store)/,
          use: [
            {
              loader: 'babel-loader',
              options: config.tasks.js.babel,
            },
          ],
        },
        {
          test: require.resolve('jquery'),
          use: [
            'expose-loader?$',
            'expose-loader?jQuery',
          ],
        },
      ],
    },
  };

  if (env === 'development') {
    webpackConfig.devtool = 'inline-source-map';

    // Create new entries object with webpack-hot-middleware added
    for (let key in config.tasks.js.entries) {
      if (config.tasks.js.entries.hasOwnProperty(key)) {
        let entry = config.tasks.js.entries[key];
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
      publicPath: publicPath,
    };

    if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
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
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  }

  return webpackConfig;
};

if (config.tasks.js) {
  module.exports = webpackConfig;
}
