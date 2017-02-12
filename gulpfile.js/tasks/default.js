let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');
let getEnabledTasks = require('../lib/getEnabledTasks');

let defaultTask = function(cb) {
  let tasks = getEnabledTasks('watch');
  gulpSequence(tasks.initTasks, tasks.linterTasks, tasks.assetTasks,
    tasks.codeTasks, 'static', 'watch', cb);
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
