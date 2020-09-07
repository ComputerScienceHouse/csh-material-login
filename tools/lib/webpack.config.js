const path = require("path");
const fs = require("fs-extra");
const neutrino = require("neutrino");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const neutrinoConfig = require("../../.neutrinorc.js");
const { isDirectory, getDirectories, findFiles } = require("./utils");

module.exports = (async () => {
  const src = path.resolve(__dirname, "../../src");
  const dist = path.resolve(__dirname, "../../dist/theme/csh");

  // Discover JavaScript to compile
  const configs = [];
  const modules = await getDirectories(src);

  for (const module of modules) {
    const jsSrc = path.resolve(module, "resources/js");
    const jsDist = jsSrc.replace(src, dist);

    if (await isDirectory(jsSrc)) {
      const entries = await findFiles(jsSrc, ["js", "jsx", "ts", "tsx"]);
      const template = path.resolve(module, "template.ftl");

      if (entries.length > 0) {
        let config = {
          ...neutrinoConfig,
          options: {
            ...neutrinoConfig.options,
            source: jsSrc,
            output: jsDist,
            mains: Object.fromEntries(
              entries.map((entry) => [
                path.basename(entry).split(".").shift(),
                entry,
              ])
            ),
          },
        };

        if (await fs.pathExists(template)) {
          config = {
            ...config,
            use: [
              ...config.use,
              (neutrinoIns) => {
                // Inject the compiled assets into the module template
                neutrinoIns.config.plugin("html").use(HtmlWebpackPlugin, [
                  {
                    template,
                    minify: false,
                    inject: false,
                    filename: path.resolve(
                      module.replace(src, dist),
                      "template.ftl"
                    ),
                  },
                ]);
              },
            ],
          };
        }

        configs.push(neutrino(config).webpack());
      } else {
        console.warn(
          `Found a JavaScript source root at '${jsSrc.replace(
            src,
            "src"
          )}', but did not find any entrypoints. Skipping.`
        );
      }
    }
  }

  return configs;
})();
