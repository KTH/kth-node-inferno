const babelPlugins = [
  'transform-decorators-legacy',
  'transform-object-rest-spread',
  ['transform-runtime', { 'helpers': false, 'polyfill': false, 'regenerator': true }],
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
      "node": "current"
    }
  }],
  "stage-0"
]

module.exports = {
  target: 'node',
  devtool: 'source-map', // TODO: example sets this to false
  output: {
    libraryTarget: 'commonjs2'
  },
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
  externals: Object.keys(require('../package.json').dependencies)
}
