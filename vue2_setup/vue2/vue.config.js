const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: function(config) {
    config
      .entry("adaptive")
      .add(path.resolve("src/foxit-lib/adaptive.js"))
      .end()
      .entry("preload")
      .add(path.resolve("src/preload.js"))
      .end()
      .plugin("html")
      .tap((args) => {
        const [options] = args;
        options.chunks = ["adaptive", "preload", "chunk-vendors", "app"];
        options.chunksSortMode = "manual";
        return args;
      })
      .end()
      .module.rule("js")
      .exclude.add(/node_modules|foxit-lib|license\-key\.js/);

    config.module.rule("eslint").exclude.add(/node_modules|foxit-lib|license\-key\.js/);
  },
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     src: path.resolve(__dirname, "src"),
    //   },
    // },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/foxit-lib/",
          to: "foxit-lib",
          force: true,
          ignore: ["{PDFViewCtrl,UIExtension}*.{js,css}", "preload-jr-worker.js"],
        },
      ]),
    ],
  },
  devServer: {
    disableHostCheck: true,
    port: 9103,
    proxy: "http://localhost:5000",

    //THIS IS PLACE TO SET PROXY CONNECT WITH BACKEND !!!
  },
};
