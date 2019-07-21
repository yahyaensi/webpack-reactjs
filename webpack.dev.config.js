/* Common settings in development could be source maps, a dev server or different settings for file loaders. */

const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { baseConfig, SRC_DIR } = require('./webpack.base.config');

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: SRC_DIR,
    port: 9500,
    hot: true,
    open: true,
    /*
      1) historyApiFallback = false: the rooting is based on # tag, the http server will handle the part of the URL
         that exists before the # tag and leaves the handling of the part that exists after that tag for the rooter.

      2) historyApiFallback = true: the rooting is not based on # tag, the http server will try to handle the whole URL,
         if it doesn't find a response, it will resend index.html so the front rooter can handle url

    */
    historyApiFallback: true
  },
  plugins: [
    // This is a shorthand for using the DefinePlugin on process.env keys.
    // process.env injected by node into app to give access to system environment variables
    new webpack.EnvironmentPlugin({
      DEBUG: true
    }),
    // handles hot deployment
    new webpack.HotModuleReplacementPlugin()
    /* new BundleAnalyzerPlugin({
      defaultSizes: "gzip"
    }) */
  ]
});

module.exports = devConfig;
