let config = require('../config');
let ghPages = require('gulp-gh-pages');
let gulp = require('gulp');
let open = require('open');
let os = require('os');
let packageJson = require('../../package.json');
let path = require('path');

let settings = {
  url: packageJson.homepage,
  src: path.join(config.root.dest, '/**/*'),
  ghPages: {
    cacheDir: path.join(os.tmpdir(), packageJson.name),
  },
};

let deployTask = function() {
  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
    .on('end', function() {
      open(settings.url);
    });
};

gulp.task('deploy', ['production'], deployTask);
module.exports = deployTask;
