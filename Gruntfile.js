module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      compile: {
        options: {
          paths: ["css"],
          cleancss: true
        },
        files: {
          "css/style.css": "css/style.less"
        }
      }
    },
    watch: {
      css: {
        files: ['css/*.less'],
        tasks: ['less']
      }
    },
    uglify: {
      app: {
        files: {
          'js/game.min.js': ['js/vendor/pixi.js', 'js/main.js']
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

};