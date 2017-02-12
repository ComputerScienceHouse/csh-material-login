let config = require('../config');
let path = require('path');
let gulp = require('gulp');
let zip = require('gulp-zip');
let msg = require('gulp-msg');

gulp.task('package', function() {
  return gulp.src(path.join(config.root.destRoot, '**/*'))
    .pipe(zip('theme.zip'))
    .pipe(gulp.dest(config.root.destRoot))
    .pipe(msg.flush.note('=================================================='))
    .pipe(msg.flush.success('Theme archive saved to <%= zipPath %>',
      {zipPath: path.join(config.root.destRoot, 'theme.zip')}))
    .pipe(msg.flush.success('To deploy to Keycloak, see: https://goo.gl/aWvYU4'))
    .pipe(msg.flush.note('=================================================='));
});
