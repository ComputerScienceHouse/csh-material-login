let config = require('../config');
let gulp = require('gulp');
let path = require('path');
let watch = require('gulp-watch');
let browserSync = require('browser-sync');

let watchTask = function() {
  let watchableTasks = config.tasks.watch.tasks;
  let additionalPaths = config.tasks.watch.paths;

  watchableTasks.forEach(function(taskName) {
    let task = config.tasks[taskName];
    if (task) {
      let glob = path.join(config.root.src, task.src,
        '**/*.{' + task.extensions.join(',') + '}');
      watch(glob, function() {
        require('./' + taskName)();
      });
    }
  });

  if (typeof additionalPaths !== 'undefined') {
    additionalPaths.forEach(function(addPath) {
      let glob = path.join(addPath, '**');
      watch(glob, function() {
        browserSync.reload();
      });
    });
  }
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
