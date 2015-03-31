module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!\n'+
            ' * MicroEvent <%= pkg.version %> - to make any js object an event emitter\n'+
            ' * Copyright 2011 Jerome Etienne (http://jetienne.com)\n'+
            ' * Copyright <%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n'
            },
            dist: {
                files: {
                    'microevent.min.js': [
                        'microevent.js'
                    ]
                }
            }
        },

        // jshint tests
        jshint: {
            lib: {
                files: {
                    src: [
                        'microevent.js'
                    ]
                }
            }
        },

        // mocha tests
        mochacov: {
            coverage: {
                options: {
                    coveralls: true
                }
            },
            test: {
                options: {
                    reporter: 'spec'
                }
            },
            options: {
                files: 'tests/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cov');

    grunt.registerTask('default', [
        'uglify'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'mochacov:test'
    ]);

    grunt.registerTask('test-travis', [
        'jshint',
        'mochacov:coverage'
    ]);
};