const path = require('path');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'static/src'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },
};