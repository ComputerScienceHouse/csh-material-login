let config = require('../config');
let gulp = require('gulp');
let fs = require('fs');
let path = require('path');

function getDirectories(root) {
  return fs.readdirSync(root).filter(function(file) {
    return fs.statSync(path.join(root, file)).isDirectory();
  });
}

function getThemes() {
  return getDirectories(path.join(config.root.destRoot, 'theme'));
}

function getThemeTypes(themeName) {
  return getDirectories(path.join(config.root.destRoot, 'theme', themeName));
}

gulp.task('manifest', function() {
  let manifest = {themes: []};

  getThemes().forEach(function(theme) {
    manifest.themes.push({
      name: theme,
      types: getThemeTypes(theme),
    });
  });

  let manifestPath = path.join(config.root.destRoot, 'META-INF');
  if (fs.existsSync(manifestPath)) {
    fs.rmdirSync(manifestPath);
  }

  fs.mkdirSync(manifestPath);

  return fs.writeFile(
    path.join(manifestPath, 'keycloak-themes.json'),
    JSON.stringify(manifest), 'utf8', function(err) {
      if (err)
        return console.log('Unable to write Keycloak theme manifest: ' + err);
    });
});
