# Project Kit

A boilerplate web project with the following batteries:

- [Babel](http://babeljs.io/) - JavaScript ES2015 compiler
- [SASS](http://sass-lang.com/) - CSS with superpowers
- [Compass](http://compass-style.org/) - CSS Authoring Framework using SASS
- [Foundation](foundation.zurb.com) - Responsive front-end framework
- [Bower](http://bower.io) - Frontend dependency manager
- [npm](http://npmjs.org) - Node package manager
- [Grunt](http://gruntjs.com) - Task runner
- [Browserify](http://browserify.org/) - Modular JavaScript bundler
  - [Remapify](https://github.com/joeybaker/remapify) - Alias directories for browserify
- [Livereload](http://livereload.com/) & [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) & [Firefox Plugin](https://addons.mozilla.org/en-US/firefox/addon/livereload/) - Refresh HTML, CSS, JS, images and other stuff as soon as they change
- [jQuery](http://jquery.com) - JavaScript general purpose library
- [Polymer](http://polymer-project.org) - Make fast, beautiful, and interoperable web components
- [Underscore](http://underscorejs.org) - JavaScript functional library
- [Backbone](http://backbonejs.org) - Structure for JS applications

## Installation

Install system dependencies:

- [Node and npm](https://github.com/romelperez/workspace/tree/master/node) with the global packages:
  - Grunt CLI
  - Bower
- [Ruby](https://github.com/romelperez/workspace/tree/master/ruby) with the gems:
  - SASS
  - Compass

Project dependencies:

```bash
npm install
bower install
```

Project configuration:

```bash
npm run configure
```

Most project dependencies are needed in the development environment. In a production
environment they are not required because assets would have been created.

## Anatomy

- `src/` - Main source code
  - `js/` - ES2015 code
  - `scss/` - SASS code
  - `polymers/` - Polymer components
- `build/` - Build folder
- `assets/` - Public assets folder
  - `js/` - JavaScript assets
  - `css/` - CSS assets
  - `polymers/` - Compiled web components
- `tests/` - Test suites
  - `unit/` - Unit testing
  - `integration/` - Integration testing
  - `benchmarks/` - Benchmarks
  - `index.js` - Testing entry point
- `tasks/` - Grunt tasks
  - `index.js` - Tasks entry point
- `package.json` - Node package info
- `bower.json` - Bower dependencies
- `Gruntfile.js` - Grunt file for tasks
- `configure.js` - Project configuration file
- `.bowerrc` - Bower config file
- `.editorconfig` - [EditorConfig](http://editorconfig.org/)
- `.jshintrc` - [JSHint](http://jshint.com/) config file
- `.travis.yml` - [Travis CI](https://travis-ci.org) Test and deploy code in the cloud
- `app.js` - [express](http://expressjs.com/) server example

## License

[MIT](./LICENSE)
