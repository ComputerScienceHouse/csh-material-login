let gulp = require('gulp');
let fs = require('fs');
let config = require('../../config');
let revReplace = require('gulp-rev-replace');
let path = require('path');

// 5) Update asset references in HTML
gulp.task('update-html', function() {
  let manifestPath = path.join(config.root.dest, 'rev-manifest.json');

  // Patch manifest to use relative path names
  let manifestToPatch = fs.readFileSync(manifestPath, 'utf8');
  let patchedManifest = manifestToPatch.replace(/"[^:\n]+\/resources\//g, '"');
  fs.writeFileSync(manifestPath, patchedManifest, 'utf8');

  let manifest = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest,
      '/**/*.{' + config.tasks.html.extensions + '}'))
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: config.tasks.html.extensions.map(function(ext) {
        return '.' + ext;
      }),
    }))
    .pipe(gulp.dest(path.join(config.root.dest)));
});
