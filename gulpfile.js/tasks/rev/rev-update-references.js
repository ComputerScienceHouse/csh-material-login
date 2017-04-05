let config = require('../../config');
let gulp = require('gulp');
let fs = require('fs');
let path = require('path');
let revReplace = require('gulp-rev-replace');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function() {
  let manifestPath = path.join(config.root.dest, 'rev-manifest.json');

  // Patch manifest to use relative path names
  let manifest = fs.readFileSync(manifestPath, 'utf8')
    .replace(/[^"]*?(resources|themes\/.*?)\//g, '');
  fs.writeFileSync(manifestPath, manifest, 'utf8');

  let manifestFromFile = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
    .pipe(revReplace({manifest: manifestFromFile}))
    .pipe(gulp.dest(config.root.dest));
});
