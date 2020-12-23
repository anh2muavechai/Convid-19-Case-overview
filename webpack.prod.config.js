const { merge } = require('webpack-merge');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

const common = require('./webpack.common.config.js'); // Pay attention to the invocation.
module.exports = merge(common, {
  mode: 'production',

  // mandatory: where to save the result
  output: {
    path: path.resolve(__dirname, './dist'),   // where to build
    publicPath: '/dist/', // where to look for the files on webserver, ie. https://server/dist/
    filename: '[name].js'
  },

  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.css$|\.scss$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
