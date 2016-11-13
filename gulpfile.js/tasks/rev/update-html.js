var gulp = require('gulp');
var fs = require('fs');
var config = require('../../config');
var revReplace = require('gulp-rev-replace');
var path = require('path');

// 5) Update asset references in HTML
gulp.task('update-html', function() {
  var manifestPath = path.join(config.root.dest, "rev-manifest.json");

  // Patch manifest to use relative path names
  var manifestToPatch = fs.readFileSync(manifestPath, 'utf8');
  var patchedManifest = manifestToPatch.replace(/"[^:\n]+\/resources\//g, '"');
  fs.writeFileSync(manifestPath, patchedManifest, 'utf8');

  var manifest = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest,
      '/**/*.{' + config.tasks.html.extensions + '}'))
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: config.tasks.html.extensions.map(function(ext) {
        return '.' + ext;
      })
    }))
    .pipe(gulp.dest(path.join(config.root.dest)));
});
