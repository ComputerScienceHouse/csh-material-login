const path = require("path");
const fs = require("fs-extra");
const parallelWebpack = require("parallel-webpack");
const { getDirectories } = require("./utils");

async function compileJs(watch = false) {
  // Build JavaScript
  const configPath = path.resolve(__dirname, "webpack.config.js");
  return parallelWebpack.run(configPath, {
    watch,
    stats: true,
  });
}

async function compileThemeManifest() {
  try {
    // Build theme manifest for the login module
    const themesRoot = path.resolve(
      __dirname,
      "../../src/login/resources/themes"
    );

    const manifest = [];
    for (const theme of await getDirectories(themesRoot)) {
      manifest.push(
        JSON.parse(
          await fs.readFile(path.resolve(themesRoot, theme, "theme.json"))
        )
      );
    }

    return fs.writeFile(
      path.resolve(themesRoot, "manifest.json"),
      JSON.stringify(manifest)
    );
  } catch (err) {
    console.error("[THEMES] Failed to compile login theme manifest.");
    throw err;
  }
}

module.exports = {
  compileJs,
  compileThemeManifest,
};
