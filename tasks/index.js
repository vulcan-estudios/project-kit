/*!
 * Grunt file.
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-minify-polymer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.config.init({

        //
        // SPECIFIC TASKS CONFIGURATIONS
        //

        browserify: {
            options: {
                browserifyOptions: {
                    debug: false
                },
                alias: {
                    // name: './path'
                },
                plugin: [
                    [
                        'remapify', [{
                            cwd: './libs/',
                            src: './**/*.js',
                            expose: 'libs'
                        }]
                    ]
                ],
                transform: [
                    'stringify',
                    [
                        'babelify', {
                            plugins: [
                                'transform-es2015-block-scoping',
                                'transform-es2015-arrow-functions',
                                'transform-es2015-template-literals'
                            ]
                        }
                    ]
                ]
            },
            app: {
                files: {
                    './assets/js/app.js': './src/js/app.js'
                }
            }
        },

        uglify: {
            assets: {
                files: [{
                    expand: true,
                    cwd: './assets/js',
                    src: [
                        '**/*.js',
                        '!**/*.min.js'
                    ],
                    dest: './assets/js',
                    ext: '.min.js'
                }]
            }
        },

        compass: {
            app: {
                options: {
                    sassDir: './src/scss',
                    cssDir: './assets/css',
                    raw: 'add_import_path "./bower_components/foundation/scss"'
                }
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    // REM polyfill.
                    require('pixrem')(),
                    // Autoprefixer.
                    require('autoprefixer')({
                        remove: false,
                        browsers: [
                            'last 2 versions',
                            'ie >= 10'
                        ]
                    }),
                    // Minifier.
                    require('cssnano')()
                ]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: './assets/css',
                    src: [
                        '**/*.css',
                        '!**/*.min.css'
                    ],
                    dest: './assets/css',
                    ext: '.min.css'
                }]
            }
        },

        vulcanize: {
            options: {
                stripComments: true,
                inlineScripts: true,
                inlineCss: true
            },
            app: {
                files: {
                    './assets/polymers/app.html': './src/polymers/app.html'
                }
            }
        },

        minifyPolymer: {
            assets: {
                files: [{
                    expand: true,
                    cwd: './assets/polymers',
                    src: [
                        '**/*.html',
                        '!**/*.min.html'
                    ],
                    dest: './assets/polymers',
                    ext: '.min.html'
                }]
            }
        },

        clean: {
            assets: {
                src: [
                    // JS
                    './assets/js/**/*.js',
                    '!./assets/js/**/*.min.js',
                    // CSS
                    './assets/css/**/*.css',
                    '!./assets/css/**/*.min.css',
                    // Polymer
                    './assets/polymers/**/*.html',
                    '!./assets/polymers/**/*.min.html'
                ]
            }
        },


        //
        // GENERAL TASKS CONFIGURATIONS
        //

        // Watchers.
        watch: {
            js: {
                files: [
                    './src/js/**/*.js',
                    './src/templates/**/*.html',
                    './libs/**/*.js'
                ],
                tasks: [
                    'build:js'
                ],
                options: {
                    spawn: false
                }
            },
            css: {
                files: [
                    './src/scss/**/*.scss'
                ],
                tasks: [
                    'build:css'
                ],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            polymer: {
                files: [
                    './src/polymers/**/*.html',
                ],
                tasks: [
                    'build:polymer'
                ],
                options: {
                    spawn: false
                }
            }
        },

        // Messages.
        notify: {
            js: {
                options: {
                    title: 'JavaScript',
                    message: 'JavaScript files re-built.'
                }
            },
            css: {
                options: {
                    title: 'CSS',
                    message: 'CSS files re-built.'
                }
            },
            polymer: {
                options: {
                    title: 'Polymer',
                    message: 'Polymer components re-built.'
                }
            }
        }
    });


    //
    // TASKS
    //

    grunt.registerTask('build', [
        'build:css',
        'build:js',
        'build:polymer'
    ]);

    grunt.registerTask('build:css', [
        'compass',
        'postcss',
        'clean',
        'notify:css'
    ]);

    grunt.registerTask('build:js', [
        'browserify',
        'uglify',
        'clean',
        'notify:js'
    ]);

    grunt.registerTask('build:polymer', [
        'vulcanize',
        'minifyPolymer',
        'clean',
        'notify:polymer'
    ]);

    grunt.registerTask('default', [
        'watch'
    ]);
};
