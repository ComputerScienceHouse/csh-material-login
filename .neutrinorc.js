const react = require("@neutrinojs/react");
const lint = require("@neutrinojs/eslint");
const typescript = require("neutrinojs-typescript");
const SriPlugin = require("webpack-subresource-integrity");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({
      tsconfig: {
        compilerOptions: {
          strict: true,
          noImplicitAny: true,
          plugins: [{ name: "typescript-plugin-css-modules" }],
        },
      },
    }),
    lint({
      eslint: {
        baseConfig: {
          extends: ["airbnb-typescript", "prettier", "prettier/react"],
          parser: undefined,
          parserOptions: {
            project: `${__dirname}/tsconfig.json`,
            ecmaVersion: 2020,
          },
          rules: {
            // Conflicts with Prettier
            "@typescript-eslint/quotes": "off",
            "@typescript-eslint/indent": "off",
          },
        },
      },
    }),
    react({
      hot: false,
      publicPath: "", // Use relative paths
      targets: {
        browsers: [">0.25%"],
      },
      clean: {
        // Only clean the JS source root instead of the entire output directory
        cleanOnceBeforeBuildPatterns: ["js/**/*"],
      },
      html: false, // Disable HTML page generation
      style: {
        extract: {
          plugin: {
            filename: "css/[name].[contenthash:8].css",
          },
        },
        loaders: [
          // Note: loaders must be specified in reverse order.
          // i.e. for the loaders below the actual execution order would be:
          // input file -> postcss-loader -> css-loader -> style-loader/mini-css-extract-plugin
          {
            loader: require.resolve("postcss-loader"),
            useId: "postcss",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
    }),
    (neutrino) => {
      neutrino.config.output.crossOriginLoading("anonymous");
      neutrino.config.output.filename("js/[name].[contenthash:8].js");

      // Bundle analyzer
      neutrino.config.when(process.env.BUNDLE_ANALYZER === "true", (config) => {
        config.plugin("analyzer").use(BundleAnalyzerPlugin, [
          {
            analyzerMode: "server",
          },
        ]);
      });

      // Calculate integrity hashes for artifacts
      neutrino.config.when(process.env.NODE_ENV === "production", (config) => {
        config.plugin("sri").use(SriPlugin, [
          {
            hashFuncNames: ["sha384"],
          },
        ]);
      });
    },
  ],
};
