const path = require("path")

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 9000,
    compress: true
  }
}