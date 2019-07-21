/* 
  This configuration allows to test production files in a local dev server,
  this allows us to detect bugs related to minification and code optimization
  early before the application goes to the real production environment 
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod.config');
const { DIST_DIR } = require('./webpack.base.config');

const devMinifiedConfig = merge(prodConfig, {
  mode: 'production',
  /*
   to track down errors and warnings from bundled files to source files
   so we can debug errors with the original, non-compressed source files while running the minified files
   The rational for inlining the source maps with your minified files is that the browser is parsing
   the exact same JavaScript in development and production
  */
  devtool: 'inline-source-map', // eval-source-map
  devServer: {
    contentBase: DIST_DIR,
    port: 9500,
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
    })
    /* new BundleAnalyzerPlugin({
      defaultSizes: "gzip"
    }) */
  ]
});

module.exports = devMinifiedConfig;
