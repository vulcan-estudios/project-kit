const path =        require('path');
const S =           require('string');
const gulp =        require('gulp');
const streamify =   require('gulp-streamify');
const rename =      require('gulp-rename');
const gutil =       require('gulp-util');
const gulpif =      require('gulp-if');
const uglify =      require('gulp-uglify');
const livereload =  require('gulp-livereload');
const source =      require('vinyl-source-stream');
const browserify =  require('browserify');
const stringify =   require('stringify');
const pathmodify =  require('pathmodify');
const runSequence = require('run-sequence');
const config =      require('./config');


//
// DEFINE SCRIPT TASKS
//
// For every script defined to compile independently, it's created a task for it.
var inc = -1;
config.browserifyEntries.forEach(entry => {

    if (typeof entry !== 'object') return;

    inc = inc + 1;

    var entryPaths = [
        entry.folder + '/**/*.js',
        entry.folder + '/**/*.json',
        entry.folder + '/**/*.html'
    ];

    gulp.task(`script${inc}`, function () {

        return browserify({
                entries: [entry.folder + '/' + entry.file + '.js'],
                debug: config.isDebug
            })
            .plugin(pathmodify, {
                mods: config.browserifyShortcuts.map(s => {
                    return pathmodify.mod[s.type](
                        s.name,
                        S(__dirname).chompRight('tasks') + S(s.path).chompLeft('./')
                    );
                })
            })
            .transform(stringify())
            .transform('babelify', {
                presets: ['es2015']
            })
            .bundle()
            .pipe(source(entry.folder + '/' + entry.file + '.js'))
            .pipe(rename({
                dirname: entry.destFolder ? entry.destFolder : '',
                basename: entry.destFile ? entry.destFile : undefined
            }))
            .pipe(gulpif(
                !config.isDebug,
                streamify(uglify().on('error', gutil.log))
            ))
            .pipe(gulp.dest(config.browserifyOutput))
            .pipe(gulpif(
                config.enableLiveReload,
                livereload()
            ));
    });
});


//
// BROWSERIFY TASK
//
// To compile all script files, it is defined the "browserify" task do to so.
module.exports = function (callback) {

    var inc = -1;
    var browserifySubTasks = [];

    config.browserifyEntries.forEach(entry => {
        if (typeof entry !== 'object') return;
        inc = inc + 1;
        browserifySubTasks.push(`script${inc}`);
    });

    browserifySubTasks.push(function () {
        gutil.log(gutil.colors.green(`Browserify completed.`));
        callback();
    });

    runSequence.apply(runSequence, browserifySubTasks);
};
