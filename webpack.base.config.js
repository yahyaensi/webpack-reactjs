/* This file will contain settings that are common across all environments in your application.
   Good candidates are entry files, plugins and loaders.*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Contants */
var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

const baseConfig = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  plugins: [
    // cleans dist folder before each build
    new CleanWebpackPlugin(),
    // regenerate html file and add automatically bundles to it
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.ejs',
      filename: DIST_DIR + '/index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.ejs',
      filename: SRC_DIR + '/index.html',
      inject: 'body'
    }),
    /* This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.*/
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      chunkFilename:
        process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        /* babel-loader is the Webpack loader responsible for taking in the ES6 code 
        and making it understandable by the browser of choice.
        Obsviusly babel-loader makes use of Babel. And Babel must be configured to use a bunch of presets:

          a) babel preset env for compiling Javascript ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
          b) babel preset react for compiling JSX and other stuff down to Javascript        
        */
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /* we have both HMR in development and styles extracted in a file for production builds. */
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            }
          },
          /* The css-loader interprets @import and url() like import/require() and will resolve them */
          { loader: 'css-loader', options: { importLoaders: 1 } }, // recommended config according to postcss-loader website
          /* requires postcss.config.js 
             When postcss-loader is used standalone (without css-loader) don't use @import in your CSS, 
             since this can lead to quite bloated bundles
          */
          'postcss-loader',
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
          /* Style-Loader embeds the CSS as a string into the JS bundle (or module) itself so 
             it won't work with MiniCssExtractPlugin */
          /* "style-loader" */
        ]
      },
      // to import font in css (url) or js module
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|eot|woff|woff2)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                }

                return '[hash].[ext]';
              }
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },
  resolve: {
    modules: [`${SRC_DIR}/app/`, './node_modules'],
    extensions: ['.js', '.jsx', '.json', '.scss']
  }
};

module.exports = {
  SRC_DIR,
  DIST_DIR,
  baseConfig
};
