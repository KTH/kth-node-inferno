# kth-node-inferno
Server-side rendering helpers for isomorphic inferno.js in Node.js projects

## Gulp Tasks ##
These Gulp tasks will build your client and server-side bundles to be used in your project.

```JavaScript
const gulp = require('gulp')
const mergeStream = require('merge-stream')

const infernoTask = require('kth-node-inferno/gulpTasks/infernoTask')({
  src: [
    'public/js/app/app.jsx'
  ],
  destinationPath: 'dist/js',
  dirname: __dirname
})

const infernoServerTask = require('kth-node-inferno/gulpTasks/infernoServerTask')({
  src: [
    'public/js/app/app.jsx'
  ],
  destinationPath: 'dist/js/server',
  dirname: __dirname
})


// This is your task
gulp.task('inferno', function () {
  return mergeStream(
    infernoTask(),
    infernoServerTask()
  )
})
```