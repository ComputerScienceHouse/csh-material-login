const fs = require("fs-extra");
const { resolve } = require("path");
const chokidar = require("chokidar");
const { compileJs } = require("./lib/steps");

const truncatePath = (path) => {
  const matches = /(src|dist).*/.exec(path);
  return matches?.[0] ?? path;
};

(async () => {
  try {
    const src = resolve(__dirname, "../src");
    const dist = resolve(__dirname, "../dist/theme/csh");

    const copyFile = async (path) => {
      const dest = path.replace(src, dist);
      await fs.copy(path, dest);
      console.log(`${truncatePath(path)} => ${truncatePath(dest)}`);
    };

    const remove = async (path) => {
      const dest = path.replace(src, dist);
      await fs.remove(dest);
      console.log(`remove: ${truncatePath(dest)}`);
    };

    await fs.ensureDir(dist);

    // One-liner for current directory
    const watcher = chokidar.watch(src, {
      persistent: true,
      // Ignore JavaScript source directories, as these will be handled by Webpack
      ignored: /.*resources\/js\/.*/,
    });

    watcher.on("ready", () => console.log("Waiting for changes..."));
    watcher.on("error", async (error) =>
      console.log(`Watcher error: ${error}`)
    );
    watcher.on("add", copyFile);
    watcher.on("change", copyFile);
    watcher.on("unlink", remove);
    watcher.on("unlinkDir", remove);
    watcher.on("addDir", async (path) => {
      const dest = path.replace(src, dist);
      await fs.ensureDir(dest);
      console.log(`create: ${truncatePath(dest)}`);
    });

    await compileJs(true);
  } catch (e) {
    if (e.message) {
      console.error(e.message);
    }
    console.error("😱 An unexpected error occurred, exiting.");
    process.exit(1);
  }
})();
