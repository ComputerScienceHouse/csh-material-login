let config = require('../../config');

let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');

// This task the equivalent of `rake assets:precompile` in Rails
let revTask = function(cb) {
  gulpSequence(
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets',
    // 2) Update asset references (images, fonts, etc) with reved
    // filenames in compiled css + js
    'rev-update-references',
    // 3) Rev and compress CSS and JS files (this is done after assets,
    // so that if a referenced asset hash changes, the parent hash
    // will change as well)
    'rev-css-js',
    // 4) Update asset references in HTML
    'update-html',
    cb);
};

if (config.tasks.production.rev) {
  gulp.task('rev', revTask);
  module.exports = revTask;
}
