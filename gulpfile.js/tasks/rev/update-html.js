let gulp = require('gulp');
let fs = require('fs');
let config = require('../../config');
let revReplace = require('gulp-rev-replace');
let path = require('path');

// 4) Update asset references in HTML
gulp.task('update-html', function() {
  let manifestPath = path.join(config.root.dest, 'rev-manifest.json');

  // Patch manifest to use relative path names
  let manifest = fs.readFileSync(manifestPath, 'utf8')
    .replace(/[^"]*?(resources|themes\/.*?)\//g, '');
  fs.writeFileSync(manifestPath, manifest, 'utf8');

  let manifestFromFile = gulp.src(manifestPath);
  return gulp.src(path.join(config.root.dest,
      '/**/*.{' + config.tasks.html.extensions + '}'))
    .pipe(revReplace({
      manifest: manifestFromFile,
      replaceInExtensions: config.tasks.html.extensions.map(function(ext) {
        return '.' + ext;
      }),
    }))
    .pipe(gulp.dest(path.join(config.root.dest)));
});
