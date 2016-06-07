const path =            require('path');
const gulp =            require('gulp');
const gutil =           require('gulp-util');
const gulpif =          require('gulp-if');
const sass =            require('gulp-sass');
const rename =          require('gulp-rename');
const autoprefixer =    require('gulp-autoprefixer');
const cleanCSS =        require('gulp-clean-css');
const livereload =      require('gulp-livereload');
const config =          require('./config');


module.exports = function () {

    return gulp.src(config.sassWatch)
        .pipe(sass({
                includePaths: config.sassImports,
                outputStyle: config.isDebug ? 'compact' : 'compressed',
                sourceMap: config.isDebug,
                sourceMapEmbed: config.isDebug
            })
            .on('error', sass.logError)
        )
        .pipe(autoprefixer({
            browsers: [
                'last 5 versions',
                'ie >= 8'
            ]
        }))
        .pipe(gulpif(
            !config.isDebug,
            cleanCSS({
                compatibility: 'ie8'
            })
        ))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(config.sassOutput, {
            overwrite: true
        }))
        .on('end', function () {
            gutil.log(gutil.colors.green(`SASS completed.`));
        })
        .pipe(gulpif(
            config.enableLiveReload,
            livereload()
        ));
};
