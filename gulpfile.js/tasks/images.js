let config = require('../config');

let browserSync = require('browser-sync');
let changed = require('gulp-changed');
let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let path = require('path');

let paths = {
  src: path.join(config.root.src, config.tasks.images.src,
    '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.images.dest),
};

let imagesTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

if (config.tasks.images) {
  gulp.task('images', imagesTask);
  module.exports = imagesTask;
}
