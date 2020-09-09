const fs = require("fs-extra");
const { resolve } = require("path");
const { compileJs, writeThemeManifest } = require("./lib/steps");

(async () => {
  try {
    const src = resolve(__dirname, "../src");
    const dist = resolve(__dirname, "../dist/theme/csh");

    // Copy everything to dist
    await fs.emptyDir(dist);
    await fs.copy(src, dist, {
      // Exclude theme manifests, which are compiled into the JS bundle
      filter: (path) => !/themes\/.+\.json$/.test(path),
    });

    // Compile theme manifest for login module
    await writeThemeManifest();

    // Compile JavaScript
    await compileJs();

    console.log("🥳 Build succeeded!");
  } catch (e) {
    if (e.message) {
      console.error(e.message);
    }
    console.error("❌ Build failed!");
    process.exit(1);
  }
})();
