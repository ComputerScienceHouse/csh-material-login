var config = require('../../config');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var rev = require('gulp-rev');
var revNapkin = require('gulp-rev-napkin');

function getDirectories() {
  return fs.readdirSync(config.root.dest).filter(function(file) {
    return fs.statSync(path.join(config.root.dest, file)).isDirectory();
  });
}

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var extToIgnore = [];
  ['html', 'css', 'js'].forEach(function(task) {
    if (config.tasks.hasOwnProperty(task) &&
      config.tasks[task].hasOwnProperty("extensions")) {
      extToIgnore = extToIgnore.concat(config.tasks[task].extensions);
    }
  });

  var ignoreThese = '!' +
    path.join(config.root.dest, '/**/*.{' + extToIgnore + '}');

  var toRev = getDirectories();
  var commonIndex = toRev.indexOf('common');
  if (commonIndex > -1) {
    toRev.splice(commonIndex, 1);
  }

  return gulp.src([path.join(config.root.dest, '/**/*'), ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'),
      {merge: true}))
    .pipe(gulp.dest(''));
});
