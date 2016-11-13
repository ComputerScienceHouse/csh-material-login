var config = require('../config');

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src,
    '/**/*.{' + config.tasks.fonts.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest)
};

var fontsTask = function() {
  var globs = [paths.src, '*!README.md'];

  if (config.tasks.fonts.vendor.constructor === Array) {
    for (var i = 0; i < config.tasks.fonts.vendor.length; i++) {
      var vendorSrc = path.join(config.tasks.fonts.vendor[i][0],
        '/**/*.{' + config.tasks.fonts.extensions + '}');
      var vendorDest = path.join(paths.dest, config.tasks.fonts.vendor[i][1]);

      gulp.src(vendorSrc)
        .pipe(changed(vendorDest))
        .pipe(gulp.dest(vendorDest))
        .pipe(browserSync.stream());
    }
  }

  return gulp.src(globs)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

if (config.tasks.fonts) {
  gulp.task('fonts', fontsTask);
  module.exports = fontsTask;
}
