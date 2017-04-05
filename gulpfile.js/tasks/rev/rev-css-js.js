let config = require('../../config');
let gulp = require('gulp');
let path = require('path');
let rev = require('gulp-rev');
let revNapkin = require('gulp-rev-napkin');
let gulpSequence = require('gulp-sequence');

const cssJsTask = function(extension) {
  return gulp.src(path.join(config.root.dest, '/**/*.' + extension))
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(
      path.join(config.root.dest, 'rev-manifest.json'), {merge: true}
      )
    )
    .pipe(gulp.dest(''));
};

gulp.task('rev-css', function() {
  return cssJsTask('css');
});

gulp.task('rev-js', function() {
  return cssJsTask('js');
});

// 3) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css-js', function(cb) {
  gulpSequence('rev-css', 'rev-update-references', 'rev-js', cb);
});
