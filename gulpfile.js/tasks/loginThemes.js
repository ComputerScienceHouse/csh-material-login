let config = require('../config');
let gulp = require('gulp');
let fs = require('fs');
let path = require('path');

let themesRoot = path.join(config.root.src, config.tasks.loginThemes.src);

function getDirectories(root) {
  return fs.readdirSync(root).filter(function(file) {
    return fs.statSync(path.join(root, file)).isDirectory();
  });
}

gulp.task('loginThemes', function() {
  let manifest = [];

  getDirectories(themesRoot).forEach(function(theme) {
    manifest.push(
      JSON.parse(
        fs.readFileSync(path.join(themesRoot, theme, 'theme.json'))
      )
    );
  });

  return fs.writeFile(
    path.join(themesRoot, 'manifest.json'),
    JSON.stringify(manifest), 'utf8', function(err) {
      if (err)
        return console.log('Unable to write login theme manifest: ' + err);
    });
});
