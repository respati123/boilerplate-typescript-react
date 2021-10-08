const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  output: {
    libraryTarget: 'system'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
          vendor: {
              name: "node_vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
          }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
            format: {
                comments: false,
            },
        },
        extractComments: false,
        // enable parallel running
        parallel: true,
    }),
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[contenthash].css`,
      chunkFilename: `static/css/[id].[contenthash].css`
  }),
  ]
}