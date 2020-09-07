const react = require('@neutrinojs/react');
const lint = require('@neutrinojs/eslint');
const typescript = require('neutrinojs-typescript');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({
      tsconfig: {
        compilerOptions: {
          strict: true,
          noImplicitAny: true,
        },
      }
    }),
    lint({
      eslint: {
        baseConfig: {
          extends: [
            'airbnb-typescript',
            'prettier',
            'prettier/react'
          ],
          parser: undefined,
          parserOptions: {
            project: `${__dirname}/tsconfig.json`,
            ecmaVersion: 2020,
          }
        }
      }
    }),
    react({
      hot: false,
      publicPath: '', // Use relative paths
      targets: {
        browsers: ['>0.25%'],
      },
      html: false, // Disable HTML page generation
      style: {
        loaders: [
          // Note: loaders must be specified in reverse order.
          // i.e. for the loaders below the actual execution order would be:
          // input file -> postcss-loader -> css-loader -> style-loader/mini-css-extract-plugin
          {
            loader: require.resolve('postcss-loader'),
            useId: 'postcss',
            options: {
              plugins: [
                require('autoprefixer')
              ],
            },
          },
        ],
      }
    }),
    (neutrino) => {
      neutrino.config.output.crossOriginLoading('anonymous');
      neutrino.config.output.filename('[name].[contenthash:8].js');

      // Calculate integrity hashes for artifacts
      neutrino.config.when(process.env.NODE_ENV === 'production', config => {
        config.plugin('sri').use(SriPlugin, [{
          hashFuncNames: ['sha384'],
        }]);
      });
    },
  ],
};
