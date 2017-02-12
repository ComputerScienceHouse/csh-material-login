let config = require('../config');

let eslint = require('gulp-eslint');
let gulp = require('gulp');
let path = require('path');
let _ = require('lodash');

let eslintTask = function() {
  let globs = [path.join(config.root.src,
    config.tasks.eslint.src, '/**/*.{' + config.tasks.eslint.extensions + '}')];

  if (!_.isUndefined(config.tasks.eslint.exclude) &&
    _.isArray(config.tasks.eslint.exclude) &&
    config.tasks.eslint.exclude.length > 0) {
    for (let i = 0; i < config.tasks.eslint.exclude.length; i++) {
      let excludePath = '!' + path.join(config.root.src,
          config.tasks.eslint.src, config.tasks.eslint.exclude[i]);
      globs.push(excludePath);
    }
  }

  return gulp.src(globs)
    .pipe(eslint(config.tasks.eslint.options))
    .pipe(eslint.format());
};

if (config.tasks.eslint) {
  gulp.task('eslint', eslintTask);
  module.exports = eslintTask;
}
