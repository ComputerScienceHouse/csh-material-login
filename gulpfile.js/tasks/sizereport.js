let config = require('../config');
let gulp = require('gulp');
let sizereport = require('gulp-sizereport');

gulp.task('size-report', function() {
  return gulp.src([config.root.dest + '/**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true,
    }));
});
