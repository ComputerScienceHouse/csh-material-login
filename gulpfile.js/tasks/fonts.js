let config = require('../config');

let browserSync = require('browser-sync');
let changed = require('gulp-changed');
let gulp = require('gulp');
let path = require('path');

let paths = {
  src: path.join(config.root.src, config.tasks.fonts.src,
    '/**/*.{' + config.tasks.fonts.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest),
};

let fontsTask = function() {
  let globs = [paths.src, '*!README.md'];

  if (config.tasks.fonts.vendor.constructor === Array) {
    for (let i = 0; i < config.tasks.fonts.vendor.length; i++) {
      let vendorSrc = path.join(config.tasks.fonts.vendor[i][0],
        '/**/*.{' + config.tasks.fonts.extensions + '}');
      let vendorDest = path.join(paths.dest, config.tasks.fonts.vendor[i][1]);

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
