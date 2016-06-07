# Vulcan Project Kit

A frontend boilerplate with the following batteries:

- [NPM](http://npmjs.org) - Node package manager
- [Gulp](http://gulpjs.com) - Task runner
- [Babel](http://babeljs.io/) - JavaScript ES2015 compiler
- [Browserify](http://browserify.org/) - Modular JavaScript bundler
- [SASS](http://sass-lang.com/) - CSS with superpowers
- [Material Design Icons 1.6.50](https://materialdesignicons.com/) - Extended version of Google Material Design icons
- [jQuery](http://jquery.com) - JavaScript general purpose library
- [Foundation 6.2.3](foundation.zurb.com) - Responsive front-end framework
- [Underscore](http://underscorejs.org) - JavaScript functional library
- [Backbone](http://backbonejs.org) - Structure for JS applications
- [Livereload](http://livereload.com/) & [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) & [Firefox Plugin](https://addons.mozilla.org/en-US/firefox/addon/livereload/) - Refresh HTML, CSS, JS, images and other stuff as soon as they change
- [Editorconfig](http://editorconfig.org/) - Define and maintain consistent coding styles between different editors and IDEs
- [JSHint](http://jshint.com/) - Detect errors and potential problems in JavaScript code

The Foundation components and configuration and Material Design Icons are pre-installed with their respective versions commented.

An example of Foundation installation is the [Foundation Sites Template](https://github.com/zurb/foundation-sites-template).

## Installation

First, it is necessary to install [node.js](http://nodejs.org) ([install node.js](https://nodejs.org/en/download/)) and the node module [gulp](http://gulpjs.com) ([install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)).

You can either download the ZIP file and uncompress the folder files where you want to install your project or fork the git project. Once done, get in the terminal on the project folder and install the node dependencies:

```bash
npm install
```

The built assets are being ignored by git. They should be build in a [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) tool or simply by the server everytime there are new changes in the code base in the repository. This is an optional feature.

## Anatomy

- `views/` - A tentative folder to put the backend views
- `src/` - Main frontend source code. The dummy code is an example of code structure
  - `js/` - ES2015 code
  - `scss/` - SASS code
- `assets/` - Public assets folder
  - `img/` - Images
  - `fonts/` - Web fonts
  - `js/` - JavaScript assets
  - `css/` - CSS assets
- `tasks/` - Gulp tasks
  - `config.js` - Global tasks configurations
  - `sass.js` - SASS task definition
  - `browserify.js` - Browserify task definition
  - `views.js` - Views watchers
  - `watch.js` - Project files watchers
- `package.json` - Node package info
- `gulpfile.js` - Gulp file for tasks
- `.editorconfig` - [EditorConfig](http://editorconfig.org/)
- `.jshintrc` - [JSHint](http://jshint.com/) config file
- `.gitignore` - Git ignore file
- `app.js` - optional [express](http://expressjs.com/) server (this is to test the server)

## Automation

The `tasks` folder contains all [gulp](http://gulpjs.com) automated tasks. The `tasks/config.js` has all the configurations to run the tasks. Optionaly you can create an (git ignored) file called `local.js` inside the tasks folder which overwrites the global configuration to apply only in the local machine.

The main tasks are:

- `gulp` the default task. Watch over all configure files for changes and run the proper tasks when changes occurs.
- `gulp build` build all frontend assets configured.

The boolean variable `_debug` in the `package.json` file is used in all tasks to determine whether the tasks are to be run in a development or production environment. If the machine has the system variable `NODE_ENV` configured in `PRODUCTION`, the `_debug` variable is set to `false` regardless its value.

## License

[MIT](./LICENSE)
