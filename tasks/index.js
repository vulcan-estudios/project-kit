/*!
 * Grunt file.
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.config.init({

        //
        // SPECIFIC TASKS CONFIGURATIONS
        //

        browserify: {

            // Compatibility scripts
            'app-compatibility': {
                src: [
                    './bower_components/webcomponentsjs/webcomponents-lite.min.js'
                ],
                dest: './build/js/compatibility.js'
            },

            // Non-CommonJS Libraries
            'app-vendor': {
                src: [
                    //
                ],
                dest: './build/js/vendor.js'
            },

            // App scripts
            app: {
                options: {
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
                        [
                            'babelify', {
                                plugins: [
                                    'transform-es2015-block-scoping',
                                    'transform-es2015-arrow-functions',
                                    'transform-es2015-modules-commonjs'
                                ]
                            }
                        ]
                    ]
                },
                src: './src/js/main.js',
                dest: './build/js/main.js'
            }
        },

        concat: {
            app: {
                src: [
                    './build/js/vendor.js',
                    './build/js/main.js'
                ],
                dest: './assets/js/app.js',
            }
        },

        uglify: {
            'app-compatibility': {
                src: './build/js/compatibility.js',
                dest: './assets/js/compatibility.min.js'
            },
            app: {
                src: './assets/js/app.js',
                dest: './assets/js/app.min.js'
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

        cssmin: {
            app: {
                files: [{
                    expand: true,
                    cwd: './assets/css',
                    src: [
                        '*.css',
                        '!*.min.css'
                    ],
                    dest: './assets/css',
                    ext: '.min.css'
                }]
            }
        },

        vulcanize: {
            app: {
                options: {
                    stripComments: true,
                    inlineScripts: true,
                    inlineCss: true
                },
                files: {
                    './build/polymers/polymers1.html': './src/polymers/polymers1.html'
                }
            }
        },

        htmlmin: {
            app: {
                options: {
                    removeComments: true
                },
                files: {
                    './assets/polymers/polymers1.html': './build/polymers/polymers1.html'
                }
            }
        },

        remove: {
            app: {
                options: {
                    trace: true
                },
                fileList: [
                    // JS
                    './assets/js/compatibility.js',
                    './assets/js/app.js',
                    // CSS
                    './assets/css/app.css'
                ]
            }
        },


        //
        // GENERAL TASKS CONFIGURATIONS
        //

        // Watchers.
        watch: {

            'js': {
                files: [
                    './src/js/**/*.js',
                    './libs/**/*.js'
                ],
                tasks: [
                    'build:js'
                ],
                options: {
                    spawn: false
                }
            },

            'css': {
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

            'polymer': {
                files: [
                    './src/polymers/**/*.html',
                ],
                tasks: [
                    'build:polymer'
                ],
                options: {
                    spawn: false
                }
            },
        },

        // Messages.
        notify: {

            'js': {
                options: {
                    title: 'JavaScript',
                    message: 'JavaScript files have been re-built.'
                }
            },

            'css': {
                options: {
                    title: 'CSS',
                    message: 'CSS files have been re-built.'
                }
            },

            'polymer': {
                options: {
                    title: 'Polymer',
                    message: 'Polymer components have been re-built.'
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
        'cssmin',
        'remove',
        'notify:css'
    ]);

    grunt.registerTask('build:js', [
        'browserify',
        'concat',
        'uglify',
        'remove',
        'notify:js'
    ]);

    grunt.registerTask('build:polymer', [
        'vulcanize',
        'htmlmin',
        'notify:polymer'
    ]);

    grunt.registerTask('default', [
        'watch'
    ]);
};
