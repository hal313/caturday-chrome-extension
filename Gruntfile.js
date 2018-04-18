(function() {
  'use strict';

  module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
      app: 'app',
      dist: 'dist'
    };

    grunt.initConfig({
      // Project settings
      config: config,

      // Watches files for changes and runs tasks based on the changed files
      watch: {
        js: {
          files: ['<%= config.app %>/scripts/{,*/}*.js'],
          tasks: ['jshint', 'build']
        },
        html: {
          files: ['<%= config.app %>/{,*/}*.html'],
          tasks: ['build']
        },
        styles: {
          files: ['<%= config.app %>/styles/{,*/}*.css'],
          tasks: ['build']
        },
        manifests: {
          files: ['<%= config.app %>/manifest.json'],
          tasks: ['build']
        }

      },

      // Empties folders to start fresh
      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*'
            ]
          }]
        }
      },

      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
        options: {
          jshintrc: true,
          reporterOutput: 'jshint-report.txt',
          reporter: require('jshint-stylish')
        },
        all: [
          'Gruntfile.js',
          '<%= config.app %>/scripts/{,*/}*.js'
        ]
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
        options: {
          dest: '<%= config.dist %>'
        },
        html: [
          '<%= config.app %>/popup.html'
        ]
      },

      // Performs rewrites based on rev and the useminPrepare configuration
      usemin: {
        options: {
          assetsDirs: ['<%= config.dist %>']
        },
        html: ['<%= config.dist %>/{,*/}*.html'],
        css: ['<%= config.dist %>/styles/{,*/}*.css']
      },

      // Used to minifiy the HTML
      htmlmin: {
        dist: {
          options: {
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true
          },
          files: [{
            expand: true,
            cwd: '<%= config.dist %>',
            src: '*.html',
            dest: '<%= config.dist %>'
          }]
        }
      },

      // Copies remaining files to places other tasks can use
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              'manifest.json',
              'images/{,*/}*.{webp,gif,png}',
              '{,*/}*.html',
              '_locales/{,*/}*.json'
            ]
          }]
        }
      },

      // Increment the build number and prepare for packaging
      chromeManifest: {
        dist: {
          options: {
            buildnumber: true,
            indentSize: 2,
            background: {/*There is no background script to run*/}
          },
          src: '<%= config.app %>',
          dest: '<%= config.dist %>'
        }
      },

      // Compres dist files to package
      compress: {
        dist: {
          options: {
            archive: function() {
              return 'package/caturday-' + grunt.file.readJSON('app/manifest.json').version + '.zip';
            }
          },
          files: [{
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: ''
          }]
        }
      }
    });


    ////////////////////////////////////////////////////////////////////////////
    // GRUNT TASK DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////
    //
    // 'debug'
    // Constantly performs builds when deployable assets change    
    grunt.registerTask('debug', function () {
      grunt.task.run([
        'build',
        'watch'
      ]);
    });

    //
    // 'build'
    // Creates a static build, suitable for testing
    grunt.registerTask('build', [
      'useminPrepare',
      'cssmin',
      'uglify',
      'copy',
      'usemin',
      'htmlmin'
    ]);

    //
    // 'release'
    // Creates a build artifact, suitable for publishing to the Chrome Developer Dashboard
    grunt.registerTask('release', [
      // Check the code
      'jshint',
      // Clean the workspace
      'clean:dist',
      // Process the manifest
      'chromeManifest:dist',
      // Perform a build
      'build',
      // Build a deployable asset
      'compress'
    ]);

    //
    // '' or 'default'
    // The default task; creates a build after validating code through jshint
    grunt.registerTask('default', [
      'jshint',
      'build'
    ]);
  };

})();