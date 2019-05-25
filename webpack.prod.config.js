/* In production it could include modification of assets, extracting CSS into a separate file
   and outputting the chunks to a build directory. */

const preProdConfig = require("./webpack.pre.prod.config");
const merge = require("webpack-merge");

delete preProdConfig.devServer;
delete preProdConfig.devtool;

const config = merge(preProdConfig, {
  mode: "production"
});

module.exports = config;
