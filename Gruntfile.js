module.exports = function (grunt) {

  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      // jsTest: {
      //   files: ['test/spec/{,*/}*.js'],
      //   tasks: ['newer:jshint:test', 'karma']
      // },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    express: {

      options: {
        port: 9000,
        serverreload: true
      },

      dev: {
        options: {
          bases: [
            'app',
            'app/templates' /* [1] */
          ]
        }
      },

      prod: {
        options: {
          bases: [
            '.app',
            '.app/templates' /* [1] */
          ]
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: false,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                './bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: '<%= yeoman.app %>'
      },
      app: {
        src: ['<%= yeoman.app %>/templates/index.html'],
        ignorePath:  /\.\.\//
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'app',
          mainConfigFile: 'app/scripts/main.js',
          dir: '.app',
          optimize: 'uglify',
          modules: [
            {
              name: 'js/main'
            }
          ]
        }
      }
    },

    karma: {

      options: {
        frameworks: ['mocha', 'requirejs', 'chai'],
        reporters: ['spec'],
        files: [
          { pattern: 'app/components/**/*.js', included: false },
          { pattern: 'app/scripts/**/*.js', included: false },
          { pattern: 'test/browser/utils.js', included: false },
          { pattern: 'test/browser/unit/**/*.js', included: false },
          'test/browser/main.js'
        ]
      },

      unit: {
        options: {
          port: 9999,
          browsers: ['PhantomJS'],
          autoWatch: false,
          singleRun: true
        }
      }
    }
  });

  grunt.registerTask('server', 'Compile then start a connect web server', function (target) {

    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  // grunt.loadNpmTasks('grunt-express');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  // grunt.loadNpmTasks('grunt-karma');
};

// [1] Not using server-side controllers in order to simplify things