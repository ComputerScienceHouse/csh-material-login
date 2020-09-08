const fs = require("fs-extra");

const isDirectory = async (dirPath) =>
  (await fs.pathExists(dirPath)) && (await fs.lstat(dirPath)).isDirectory();

const getDirectories = async (src) =>
  (await fs.readdir(src, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${src}/${entry.name}`);

const findFiles = async (src, exts) =>
  (await fs.readdir(src, { withFileTypes: true }))
    .filter((entry) => {
      if (Array.isArray(exts)) {
        const ext = entry.name.split(".").pop();
        return exts.includes(ext);
      }

      return entry.isFile();
    })
    .map((entry) => `${src}/${entry.name}`);

module.exports = {
  isDirectory,
  getDirectories,
  findFiles,
};
