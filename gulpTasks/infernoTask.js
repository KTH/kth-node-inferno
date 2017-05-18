const gulp = require('gulp')
const plumber = require('gulp-plumber')
const named = require('vinyl-named')
const print = require('gulp-print')
const webpackConfig = require('./webpack.config')
const gulpWebpack = require('webpack-stream')
const webpack2 = require('webpack')
const deepAssign = require('deep-assign')

const buildCommons = require('kth-node-build-commons').tasks()
const onError = buildCommons.onError

module.exports = function (options) {
  /*
    options.destinationPath -- target directory for generated files
    options.src -- passed to: gulp.src(options.src)
    options.__dirname --
  */

  deepAssign(webpackConfig, { resolve: { modules: [options.dirname + '/node_modules'] } })

  return function (env) {
    const destinationPath = options.destinationPath || 'dist/js/inferno'
    // const cssDestinationPath = options.cssDestinationPath || 'dist/css'

    // Filter out js and css-files so we can have separate destinations
    // const jsFilter = filter('**/*.js*', {restore: true})
    // const cssFilter = filter('**/*.css*', {restore: true})

    return gulp.src(options.src)
      .pipe(print())
      .pipe(named())
      .pipe(plumber({
        errorHandler: onError
      }))
      // Passing webpack 2 to webpack-stream because webpack-stream is bundled with an older version
      .pipe(gulpWebpack(webpackConfig, webpack2))
      // .pipe(jsFilter)
      .pipe(gulp.dest(destinationPath))
      // .pipe(jsFilter.restore)
      // .pipe(cssFilter)
      // .pipe(gulp.dest(cssDestinationPath))
  }
}
