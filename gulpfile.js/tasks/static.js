var config = require('../config');
var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var paths = {
  src: [
    path.join(config.root.src, config.tasks.static.src, '/**'),
    path.join('!' + config.root.src, config.tasks.static.src, '/README.md')
  ],
  dest: path.join(config.root.dest, config.tasks.static.dest)
};

// Exclude files handled by other tasks
for (var task in config.tasks) {
  if (config.tasks.hasOwnProperty(task) &&
    config.tasks[task].hasOwnProperty("extensions")) {
    paths.src.push(path.join('!' + config.root.src, config.tasks.static.src,
      '/**/*.{' + config.tasks[task].extensions + '}'));
  }
}

var staticTask = function() {
  return gulp.src(paths.src, {nodir: true})
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('static', staticTask);
module.exports = staticTask;
