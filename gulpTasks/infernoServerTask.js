const path = require('path')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const named = require('vinyl-named')
const print = require('gulp-print').default
const webpackConfig = require('./webpack.server.config')
const gulpWebpack = require('webpack-stream')
const webpack2 = require('webpack')
const deepAssign = require('deep-assign')

const buildCommons = require('kth-node-build-commons').tasks()
const onError = buildCommons.onError

const isDev = process.env.NODE_ENV !== 'production'

module.exports = function(options) {
  /*
    options.destinationPath -- target directory for generated files
    options.src -- passed to: gulp.src(options.src)
  */
  deepAssign(webpackConfig, { resolve: { modules: ['node_modules'] } })

  if (isDev) {
    try {
      deepAssign(webpackConfig, {
        resolve: { alias: { inferno: path.resolve(require.resolve('inferno/dist/index.dev.esm.js')) } },
      })
    } catch (e) {
      console.log('Failed to alias inferno to dev version. You are probably running inferno <5.0.0')
    }
  }

  return function(env) {
    const destinationPath = options.destinationPath || 'dist/js/server'

    return (
      gulp
        .src(options.src)
        .pipe(print())
        .pipe(named())
        .pipe(
          plumber({
            errorHandler: onError,
          })
        )
        // Passing webpack 2 to webpack-stream because webpack-stream is bundled with an older version
        .pipe(gulpWebpack(webpackConfig, webpack2))
        .pipe(gulp.dest(destinationPath))
    )
  }
}
