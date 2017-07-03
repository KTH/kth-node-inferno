const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: ['transform-decorators-legacy']
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  plugins: [
    new UglifyJSPlugin(),
    new Visualizer({
      filename: './infernoClientSize.html'
    })
  ]
}
