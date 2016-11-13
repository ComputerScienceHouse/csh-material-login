var config = require('../../config');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  var manifestPath = path.join(config.root.dest, "rev-manifest.json");

  // Patch manifest to use relative path names
  var manifestToPatch = fs.readFileSync(manifestPath, 'utf8');
  var patchedManifest = manifestToPatch.replace(/"[^:\n]+\/resources\//g, '"');
  fs.writeFileSync(manifestPath, patchedManifest, 'utf8');

  var manifest = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.root.dest));
});
