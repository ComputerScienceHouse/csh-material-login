const fs = require("fs-extra");
const archiver = require("archiver");
const { resolve, basename } = require("path");
const { writePackageManifest } = require("./lib/steps");
const { getDirectories } = require("./lib/utils");
const { name, version } = require("../package");

(async () => {
  try {
    const dist = resolve(__dirname, "../dist");

    // Write the package manifest
    await writePackageManifest();

    const filename = `${name}_${version}.jar`;
    const output = fs.createWriteStream(resolve(dist, filename));
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      console.log(`📦 Package written: ${filename}`);
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        // No such file or directory
        console.warn(`[PACKAGE] ${err.message}`);
      } else {
        throw err;
      }
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);

    for (const dir of await getDirectories(dist)) {
      archive.directory(dir, basename(dir), null);
    }

    archive.finalize();
  } catch (e) {
    if (e.message) {
      console.error(e.message);
    }
    console.error("❌ Packaging failed!");
    process.exit(1);
  }
})();
