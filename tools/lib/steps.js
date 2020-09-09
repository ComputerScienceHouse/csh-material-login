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

async function writeThemeManifest() {
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

    return fs.writeJson(path.resolve(themesRoot, "manifest.json"), manifest);
  } catch (err) {
    console.error("[THEMES] Failed to write login theme manifest.");
    throw err;
  }
}

async function writePackageManifest() {
  try {
    // Build package manifest for the distribution JAR
    const dist = path.resolve(__dirname, "../../dist");
    const meta = path.resolve(dist, "META-INF");

    const manifest = {
      themes: [
        {
          name: "csh",
          types: (
            await getDirectories(path.resolve(dist, "theme/csh"))
          ).map((p) => path.basename(p)),
        },
      ],
    };

    await fs.ensureDir(meta);

    return fs.writeJson(path.resolve(meta, "keycloak-themes.json"), manifest);
  } catch (err) {
    console.error("[PACKAGE] Failed to write package manifest.");
    throw err;
  }
}

module.exports = {
  compileJs,
  writeThemeManifest,
  writePackageManifest,
};
