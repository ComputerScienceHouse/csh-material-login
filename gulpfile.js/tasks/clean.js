let gulp = require('gulp');
let del = require('del');
let config = require('../config');

let cleanTask = function(cb) {
  del([config.root.destRoot]).then(function(paths) {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
