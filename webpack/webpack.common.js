const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const testRegex = {
  REGEXTS: /\.(ts|js)x?$/,
  REGEXCSS: /\.css$/i,
};

const loader = {
  TSLOADER: 'ts-loader',
  JSLOADER: 'babel-loader',
  CSSLOADER: 'css-loader',
};

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  output: {
    filename: 'dca.js',
    path: path.resolve(__dirname, '..', './build/pap'),
    chunkFilename: '[id].[contentHash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '..', 'src/components'),
      '@domain': path.resolve(__dirname, '..', 'src/domain'),
      '@constants': path.resolve(__dirname, '..', 'src/constants'),
      '@routes': path.resolve(__dirname, '..', 'src/routes'),
      '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: testRegex.REGEXTS,
        exclude: /node_modules/,
        use: [loader.JSLOADER],
      },
      {
        test: testRegex.REGEXCSS,
        use: ['style-loader', loader.CSSLOADER],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
};
