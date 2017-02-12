let config = require('../config');

let csscomb = require('gulp-csscomb');
let gulp = require('gulp');
let path = require('path');
let _ = require('lodash');

let csscombTask = function() {
  let globs = [path.join(config.root.src, config.tasks.csscomb.src,
    '/**/*.{' + config.tasks.csscomb.extensions + '}')];

  if (!_.isUndefined(config.tasks.csscomb.exclude) &&
    _.isArray(config.tasks.csscomb.exclude) &&
    config.tasks.csscomb.exclude.length > 0) {
    for (let i = 0; i < config.tasks.csscomb.exclude.length; i++) {
      let excludePath = '!' + path.join(config.root.src,
          config.tasks.csscomb.src, config.tasks.csscomb.exclude[i]);
      globs.push(excludePath);
    }
  }

  return gulp.src(globs)
    .pipe(csscomb())
    .pipe(gulp.dest(path.join(config.root.src, config.tasks.csscomb.src)));
};

if (config.tasks.csscomb) {
  gulp.task('csscomb', csscombTask);
  module.exports = csscombTask;
}
