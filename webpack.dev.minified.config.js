/* 
This configuration allows to test production files in a local dev server,
this allows us to detect bugs related to minification and code optimization
early before the application goes to the real production environment 
*/

const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod.config');
const { prodConfig, SRC_DIR, DIST_DIR } = require('./webpack.prod.config');

const devMinifiedConfig = merge(prodConfig, {
  mode: 'production',
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
    open: true
  },
  // to track down errors and warnings from bundled files to source files
  // so we can debug errors with the original, non-compressed source files while running the minified files
  // The rational for inlining the source maps with your minified files is that the browser is parsing
  // the exact same JavaScript in development and production
  devtool: 'inline-source-map', // eval-source-map
  plugins: [
    // This is a shorthand for using the DefinePlugin on process.env keys.
    // process.env injected by node into app to give access to system environment variables
    new webpack.EnvironmentPlugin({
      DEBUG: true
    })
    /* new BundleAnalyzerPlugin({
      defaultSizes: "gzip"
    }) */
  ]
});

module.exports = devMinifiedConfig;
