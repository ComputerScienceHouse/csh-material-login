const path = require('path');
const parallelWebpack = require('parallel-webpack');

async function compileJs(watch = false) {
  // Build JavaScript
  const configPath = path.resolve(__dirname, 'webpack.config.js');
  return parallelWebpack.run(configPath, {
    watch,
    stats: true,
  });
}

module.exports = {
  compileJs,
};