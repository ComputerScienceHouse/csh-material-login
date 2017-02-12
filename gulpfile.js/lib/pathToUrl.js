let path = require('path');

module.exports = function pathToUrl(...args) {
  // Normalizes Windows file paths to valid url paths
  return path.join.apply(this, args).replace(/\\/g, '/');
};
