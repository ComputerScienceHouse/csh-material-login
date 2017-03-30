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

      if (taskName === 'js') {
        const loginThemesTask = config.tasks['loginThemes'];
        glob = [glob, path.join(config.root.src, loginThemesTask.src,
          '**/{' + loginThemesTask.watchFiles.join(',') + '}')]
      }

      watch(glob, function() {
        if (taskName === 'js') {
          gulp.start('webpack');
        } else {
          gulp.start(taskName);
        }
      });
    }
  });
};

gulp.task('watch', watchTask);
module.exports = watchTask;
