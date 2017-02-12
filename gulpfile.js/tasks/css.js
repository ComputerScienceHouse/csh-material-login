let config = require('../config');

let gulp = require('gulp');
let gulpif = require('gulp-if');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let handleErrors = require('../lib/handleErrors');
let autoprefixer = require('gulp-autoprefixer');
let path = require('path');
let replace = require('gulp-batch-replace');
let cssnano = require('gulp-cssnano');

let paths = {
  src: path.join(config.root.src, config.tasks.css.src,
    '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest),
};

let cssTask = function() {
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
