# kth-node-inferno
Gulp transpiling tasks for isomorphic Inferno.js in Node.js projects.

Install with `npm i -D kth-node-inferno babel-preset-es2015 babel-preset-stage-0 babel-eslint eslint-config-standard eslint-config-standard-jsx`

## ES6-support and presets

This package doesn't contain any babel presets. To support ES6 or similar you need to add them to your package.json:

```JSON
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1"
  }

  ...

  "babel": {
    "presets": [
      "es2015",
      "stage-0"
    ]
  }
```

## Linting

You will probably want to add the following linting settings to your package.json

```JSON
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint-config-standard": "^10.2.1",
    "eslint-config-standard-jsx": "^4.0.2",
  }

  ...

  "standard": {
    "parser": "babel-eslint",
    "extends": [
      "standard",
      "standard-jsx"
    ]
  }
```

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
