const babelPlugins = [
  'transform-decorators-legacy',
  ['transform-runtime', { 'helpers': false, 'polyfill': false, 'regenerator': true }],
  'babel-plugin-syntax-jsx',
  [
    'babel-plugin-inferno',
    {
      'imports': true
    }
  ]
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
  externals: Object.keys(require('../package.json').dependencies)
}
