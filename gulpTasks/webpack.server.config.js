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
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  externals: Object.keys(require('../package.json').dependencies)
}
