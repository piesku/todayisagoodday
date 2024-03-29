module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8080,
          base: './public/play'
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'public/play/js/app.js': 'src/app/main.js',
        },
        options: {
          transform: [['babelify']]
        }
      }
    },

    concat: {
      dist: {
        src: [
          'src/vendor/three.js',
          'src/vendor/three-*.js',
          'src/vendor/threex-*.js'
        ],
        dest: 'public/play/js/vendor.js'
      }
    },

    watch: {
      files: 'src/**/*.js',
      tasks: ['concat', 'browserify']
    },

    open: {
      dev: {
        path: 'http://localhost:8080/index.html'
      }
    },

    jshint: {
      src: [
        'src/app/**/*.js',
      ],
      options: {
        jshintrc: 'src/.jshintrc',
      },
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'public/play/js'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
  });

  grunt.registerTask('build',
    ['jshint', 'concat', 'browserify']);

  grunt.registerTask('default',
    ['build', 'connect', 'open', 'watch']);

  grunt.registerTask('release',
    ['build', 'bump']);

};
