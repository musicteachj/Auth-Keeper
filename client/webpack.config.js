const path = require('path');
const DIST_DIR = path.resolve(__dirname, "../server/dist");
const SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
  entry: [
    SRC_DIR + '/index.js'
  ],
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
