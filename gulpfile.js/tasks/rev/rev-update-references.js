var config = require('../../config');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  var manifestPath = path.join(config.root.dest, "rev-manifest.json");
  // Patch manifest to use relative path names
  fs.readFile(manifestPath, 'utf8',
    function(err, data) {
      if (err) {
        return console.log("Unable to open rev manifest: " + err);
      }
      var result = data.replace(/"[^:\n]+\/resources\//g, '"');

      fs.writeFile(manifestPath, result, 'utf8', function(err) {
        if (err) return console.log("Unable to write rev manifest: " + err);

        // Continue revving
        var manifest = gulp.src(manifestPath);
        return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
          .pipe(revReplace({manifest: manifest}))
          .pipe(gulp.dest(config.root.dest));
      });
    }
  );
});
