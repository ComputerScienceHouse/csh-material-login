let config = require('../config');
let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');
let getEnabledTasks = require('../lib/getEnabledTasks');

let productionTask = function(cb) {
  global.production = true;
  let tasks = getEnabledTasks('production');
  gulpSequence('clean', tasks.initTasks, tasks.linterTasks, tasks.assetTasks,
    tasks.codeTasks, config.tasks.production.rev ? 'rev' : false,
    'size-report', 'static', 'manifest', 'package', cb);
};

gulp.task('production', productionTask);
module.exports = productionTask;
