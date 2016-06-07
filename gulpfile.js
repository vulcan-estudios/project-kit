const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

gulp.task('sass', tasks.sass);
gulp.task('browserify', tasks.browserify);
gulp.task('views', tasks.views);
gulp.task('watch', tasks.watch);
gulp.task('build', ['sass', 'browserify']);
gulp.task('default', ['watch']);
