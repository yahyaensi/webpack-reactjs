/* 
  In production it could include modification of assets, extracting CSS into a separate file
  and outputting the chunks to a build directory. 
*/

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { baseConfig, SRC_DIR, DIST_DIR } = require('./webpack.base.config');

const prodConfig = merge(baseConfig, {
  /* webpack v4+ will minify the code by default in production mode
     Note that while the TerserPlugin is a great place to start for minification and being used by default, 
     there are other options out there. Here are a few more popular ones:
        BabelMinifyWebpackPlugin
        ClosureWebpackPlugin
     If you decide to try another minification plugin, just make sure your new choice also drops dead code 
     as described in the tree shaking guide and provide it as the optimization.minimizer.
  */
  mode: "production",
  output: {
    filename: '[name].bundle.[chunkhash].js',
    path: DIST_DIR
  },
  optimization: {
    /*
      The SplitChunksPlugin allows us to extract common dependencies into an existing entry 
      chunk or an entirely new chunk. Let's use this to de-duplicate the lodash dependency
    */
    splitChunks: {
      chunks: "all"
    },
    // optimization.minimizer overrides the defaults provided by webpack which uses TerserJSPlugin
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    // This is a shorthand for using the DefinePlugin on process.env keys.
    // process.env injected by node into app to give access to system environment variables
    new webpack.EnvironmentPlugin({
      DEBUG: false
    }),
    // regenerate html file and add automatically bundles to it
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.ejs',
      filename: DIST_DIR + '/index.html',
      inject: 'body'
    })
  ]
});


module.exports = prodConfig;
