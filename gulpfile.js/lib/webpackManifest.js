let path = require('path');
let fs = require('fs');

module.exports = function(publicPath, dest, filename) {
  filename = filename || 'rev-manifest.json';

  return function() {
    this.plugin('done', function(stats) {
      stats = stats.toJson();
      let chunks = stats.assetsByChunkName;
      let manifest = {};

      for (let key in chunks) {
        if (chunks.hasOwnProperty(key)) {
          let originalFilename = key + '.js';
          manifest[path.join(publicPath, originalFilename)] =
            path.join(publicPath, chunks[key]);
        }
      }

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      );
    });
  };
};
