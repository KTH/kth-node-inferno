const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'


const webpackPlugins = []
if (isProd) {
  webpackPlugins.push(new UglifyJSPlugin())
  webpackPlugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }))
}
webpackPlugins.push(new Visualizer({
  filename: './infernoClientSize.html'
}))


const babelPlugins = [
  "transform-decorators-legacy",
  // ["transform-runtime"], // This includes a package with polyfills etc, but the final size is larger because unused polyfills aren't removed
  "babel-plugin-syntax-jsx",
  [
    "babel-plugin-inferno",
    {
      "imports": true
    }
  ]
]

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: babelPlugins
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: babelPlugins
      }
    }]
  },
  plugins: webpackPlugins
}
