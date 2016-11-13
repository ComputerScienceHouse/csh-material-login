var config = require('../config');

var browserSync = require('browser-sync');
var gulp = require('gulp');
// var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
// var htmlmin = require('gulp-htmlmin');
var path = require('path');
var render = require('gulp-nunjucks-render');

var exclude = path.normalize('!**/{' +
  config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src,
    '/**/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest)
};

// Ignore Freemarker template tags
// config.tasks.html.htmlmin.ignoreCustomFragments = [/<[\/]?#[\s\S]*?>/];

var htmlTask = function() {
  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(render({
      inheritExtension: true,
      path: [path.join(config.root.src, config.tasks.html.src)],
      envOptions: {
        watch: false
      }
    }))
    .on('error', handleErrors)
    // .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload);
};

if (config.tasks.html) {
  gulp.task('html', htmlTask);
  module.exports = htmlTask;
}
