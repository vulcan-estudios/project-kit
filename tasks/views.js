const gulp = require('gulp');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const config = require('./config');


module.exports = function () {
    gulp.src(config.views).pipe(livereload());
};
