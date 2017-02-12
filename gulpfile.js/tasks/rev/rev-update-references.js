let config = require('../../config');
let gulp = require('gulp');
let fs = require('fs');
let path = require('path');
let revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  let manifestPath = path.join(config.root.dest, 'rev-manifest.json');

  // Patch manifest to use relative path names
  let manifestToPatch = fs.readFileSync(manifestPath, 'utf8');
  let patchedManifest = manifestToPatch.replace(/"[^:\n]+\/resources\//g, '"');
  fs.writeFileSync(manifestPath, patchedManifest, 'utf8');

  let manifest = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.root.dest));
});
