const path = require("path");
const fs = require("fs-extra");

(async () => {
  try {
    await fs.remove(path.resolve(__dirname, "../dist"));
    console.log("🧹 Cleanup finished!");
  } catch (e) {
    if (e.message) {
      console.error(e.message);
    }
    console.error("❌ Cleanup failed!");
    process.exit(1);
  }
})();
