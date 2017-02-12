let config = require('../config');
let changed = require('gulp-changed');
let gulp = require('gulp');
let path = require('path');

let paths = {
  src: [
    path.join(config.root.src, config.tasks.static.src, '/**'),
    path.join('!' + config.root.src, config.tasks.static.src, '/README.md'),
  ],
  dest: path.join(config.root.dest, config.tasks.static.dest),
};

// Exclude files handled by other tasks
for (let task in config.tasks) {
  if (config.tasks.hasOwnProperty(task) &&
    config.tasks[task].hasOwnProperty('extensions')) {
    paths.src.push(path.join('!' + config.root.src, config.tasks.static.src,
      '/**/*.{' + config.tasks[task].extensions + '}'));
  }
}

let staticTask = function() {
  return gulp.src(paths.src, {nodir: true})
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('static', staticTask);
module.exports = staticTask;
