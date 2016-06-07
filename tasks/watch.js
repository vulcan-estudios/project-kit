const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const stringify = require('stringify');
const pathmodify = require('pathmodify');
const config = require('./config');


module.exports = function() {

    //
    // LIVERELOAD
    //

    if (config.enableLiveReload) {
        livereload.listen();
        gulp.watch(config.views, ['views']);
    }

    //
    // SASS
    //

    gulp.watch(config.sassWatch, function(e) {
        gutil.log(gutil.colors.magenta(`File "${e.path}" was "${e.type}", running tasks...`));
    });
    gulp.watch(config.sassWatch, ['sass']);

    //
    // BROWSERIFY
    //

    // General files which has to compile all JavaScript modules.
    var paths = [];
    config.browserifyWatch.forEach(entry => {
        if (entry.endsWith('.js')) {
            paths.push(entry);
        } else {
            paths = paths.concat([
                entry + '/**/*.js',
                entry + '/**/*.json',
                entry + '/**/*.html'
            ]);
        }
    });
    gulp.watch(paths, function(e) {
        gutil.log(gutil.colors.magenta(`File "${e.path}" was "${e.type}", running tasks...`));
    });
    gulp.watch(paths, ['browserify']);

    // Only compile applications entry points when they are isolatedly affected.
    var inc = -1;
    config.browserifyEntries.forEach(entry => {

        inc = inc + 1;

        var entryPaths;

        if (entry.standalone) {
            entryPaths = [entry.folder + '/' + entry.file + '.js'];
        } else {
            entryPaths = [
                entry.folder + '/**/*.js',
                entry.folder + '/**/*.json',
                entry.folder + '/**/*.html'
            ];
        }

        if (entry.watch) {
            entry.watch.forEach(e => {
                if (e.endsWith('.js')) {
                    entryPaths.push(e);
                } else {
                    entryPaths = entryPaths.concat([
                        e + '/**/*.js',
                        e + '/**/*.json',
                        e + '/**/*.html'
                    ]);
                }
            });
        }

        gulp.watch(entryPaths, function(e) {
            gutil.log(gutil.colors.magenta(`File "${e.path}" was "${e.type}", running tasks...`));
        });
        gulp.watch(entryPaths, [`script${inc}`]);
    });
};
