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
  webpackPlugins.push(new Visualizer({
    filename: './infernoClientSize.html'
  }))
}

const babelPlugins = [
  'transform-decorators-legacy',
  'transform-object-rest-spread',
  'add-module-exports',
  [
    'babel-plugin-inferno',
    {
      'imports': true
    }
  ]
]

const babelPresets = [
  ["env", {
    "targets": {
      "browsers": ["last 3 versions", "ie >= 11"]
    }
  }],
  "stage-0"
]

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: babelPlugins,
        presets: babelPresets
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        // babel-loader doesn't pick up the transform-decorators-legacy plugin setting from babelrc entry in package.json
        plugins: babelPlugins,
        presets: babelPresets
      }
    }]
  },
  plugins: webpackPlugins
}
