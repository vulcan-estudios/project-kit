const extend = require('extend');
const gutil = require('gulp-util');
const packageInfo = require('../package');

// Optional local configuration.
var local = {};
try {
    local = require('./local');
} catch (e) {
    local = {};
}

const isProduction = String(process.env.NODE_ENV).toLowerCase() === 'production';
const isDebug = !isProduction && packageInfo._debug;

gutil.log(gutil.colors.yellow('Gulp running in '+ (isDebug ? '"development"' : '"production"') +' mode.'));


const global = {

    // If the projects is being developed, tested or is in a debug model. This
    // will determine how the assets are generated.
    isDebug: isDebug,

    // Enable LiveReload plugin in the browsers http://livereload.com/.
    enableLiveReload: isDebug,

    // The template (or HTML) views files to watch for changes. When there is a
    // change, the livereload plugin is updated.
    views: [
        './assets/**/*.html',
        './views/**/*.html',
        './views/**/*.hbs'
    ],

    // Global import paths for SASS files.
    sassImports: [
        './node_modules/foundation-sites/scss',
        './node_modules/motion-ui/src',
    ],

    // Watch SASS files for changes to build CSS files.
    sassWatch: [
        './src/scss/**/*.scss'
    ],

    // Where to put the CSS built files.
    sassOutput: './assets/css',

    // Require paths shortcuts to use in browserify JavaScript files.
    // This uses the browserify plugin https://www.npmjs.com/package/pathmodify.
    // For example: `const models = require('models/Model1');` in any browserify
    // JS file will require the folder `./src/js/models/Model1.js`.
    browserifyShortcuts: [{
        type: 'id',
        name: 'appSettings',
        path: './src/js/settings.js'
    }, {
        type: 'dir',
        name: 'appBase',
        path: './src/js'
    }, {
        type: 'dir',
        name: 'models',
        path: './src/js/models'
    }, {
        type: 'dir',
        name: 'collections',
        path: './src/js/collections'
    }, {
        type: 'dir',
        name: 'components',
        path: './src/js/components'
    }],

    // Watch folders and files for changes to build ALL browserify entries.
    // These files can affect any browserify entry so we build all of them to
    // ensure the proper building.
    browserifyWatch: [
        './src/js/collections',
        './src/js/models',
        './src/js/components',
        './src/js/settings.js'
    ],

    // Browserify JavaScript files entries. For each of them:
    // `folder` is the path to the folder where the JS file entry is located.
    // `file` is the entry file name inside the `folder`.
    // `destFolder` is the relative path to `browserifyOutput` folder path where
    // to put the built file.
    // `destFile` is the built file name to locate in the `destFolder`.
    // Basically we define each JS file to build through browserify here.
    browserifyEntries: [

        // Core
        {
            folder: './src/js/core',
            file: 'core',
            destFolder: '/',
            destFile: 'core'
        },

        // Home
        {
            folder: './src/js/pages/home',
            file: 'home',
            destFolder: '/',
            destFile: 'home'
        },

        // App1
        {
            folder: './src/js/app1',
            file: 'app1',
            destFolder: '/',
            destFile: 'app1'
        },
    ],

    // Folder path where to put all built browserify JS files or JS assets.
    browserifyOutput: './assets/js'
};


module.exports = extend(true, global, local);
