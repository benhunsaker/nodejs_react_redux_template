'use strict';

var webpack_conf = require('./webpack.config'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    webpack = require('webpack-stream');

gulp.task('start', function() {
      require('dotenv').load();
      plugins.nodemon({
        watch: ["configurations", "lib", "config.js", "package.json", "app.js"],
        script: 'bin/www'
      });
});

gulp.task('js', function () {
  return gulp.src('./public/javascripts/**/*')
    .pipe(plugins.eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        'modules': true,
        'jsx': true
      },
      rules: {
        'no-console': 1,
        'no-unused-vars': 1
      },
      globals: {},
      plugins: ["react"],
      envs: ['browser', 'es6']
    }))
    .pipe(plugins.eslint.format())
    //.pipe(plugins.eslint.failAfterError())
    .pipe(webpack(webpack_conf))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', function () {
  return gulp.watch('./public/javascripts/src/**/*', ['js']);
});

gulp.task('default', ['start', 'js', 'watch']);
