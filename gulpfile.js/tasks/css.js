var config = require('../config');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var replace = require('gulp-batch-replace');
var cssnano = require('gulp-cssnano');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src,
    '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

var cssTask = function() {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(gulpif(config.tasks.css.replace.constructor === Array,
      replace(config.tasks.css.replace)))
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

if (config.tasks.css) {
  gulp.task('css', cssTask);
  module.exports = cssTask;
}
