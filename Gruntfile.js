module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['scripts/libs/*.js', 'scripts/site.js'],
        dest: 'scripts/build/site.min.js'
      }
    },

    sass: {
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'styles/site.css': 'styles/site.scss'       // 'destination': 'source'
        }
      }
    },

    autoprefixer: {
      // prefix the specified file
      single_file: {
        options: {
          
        },
        src: 'styles/site.css',
        dest: 'styles/build/site.css'
      },
    },

    haml: {                              // Task
      dist: {                            // Target
        files: {                         // Dictionary of files
          'index.html': 'index.haml'     // 'destination': 'source'
        }
      }
    },

    watch: {
      options: { livereload: true },
      scripts: {
        files: ['scripts/libs/*.js', 'scripts/site.js'],
        tasks: ['uglify']
      }, //script
      css: {
        files: ['styles/site.scss'],
        tasks: ['sass']
      }, //sass
      html: {
        files: ['*.haml'],
        tasks: ['haml']
      }
    } //watch

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-haml2html');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'autoprefixer', 'haml', 'watch']);

};