const fs = require("fs-extra");
const { resolve } = require("path");
const { compileJs, compileThemeManifest } = require("./lib/steps");

(async () => {
  try {
    const src = resolve(__dirname, "../src");
    const dist = resolve(__dirname, "../dist/theme/csh");

    // Copy everything to dist
    await fs.emptyDir(dist);
    await fs.copy(src, dist);

    // Compile theme manifest for login module
    await compileThemeManifest();

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
