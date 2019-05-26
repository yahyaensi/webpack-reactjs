/* Common settings in development could be source maps, a dev server or different settings for file loaders. */

const { baseConfig, SRC_DIR, DIST_DIR } = require("./webpack.base.config");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const config = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: SRC_DIR,
    port: 9500,
    hot: true,
    open: true
  },
  plugins: [
    // This is a shorthand for using the DefinePlugin on process.env keys.
    // process.env injected by node into app to give access to system environment variables
    new webpack.EnvironmentPlugin({
      DEBUG: true
    }),
    // handles hot deployment
    new webpack.HotModuleReplacementPlugin()
    /*new BundleAnalyzerPlugin({
      defaultSizes: "gzip"
    })*/
  ]
});

module.exports = config;
