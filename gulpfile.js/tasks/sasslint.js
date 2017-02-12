let config = require('../config');

let sassLint = require('gulp-sass-lint');
let gulp = require('gulp');
let path = require('path');
let _ = require('lodash');

let sasslintTask = function() {
  let globs = [path.join(config.root.src, config.tasks.sasslint.src,
    '/**/*.{' + config.tasks.sasslint.extensions + '}')];

  if (!_.isUndefined(config.tasks.sasslint.exclude) &&
    _.isArray(config.tasks.sasslint.exclude) &&
    config.tasks.sasslint.exclude.length > 0) {
    for (let i = 0; i < config.tasks.sasslint.exclude.length; i++) {
      let excludePath = '!' + path.join(config.root.src,
          config.tasks.sasslint.src, config.tasks.sasslint.exclude[i]);
      globs.push(excludePath);
    }
  }

  return gulp.src(globs)
    .pipe(sassLint())
    .pipe(sassLint.format());
};

if (config.tasks.sasslint) {
  gulp.task('sasslint', sasslintTask);
  module.exports = sasslintTask;
}
