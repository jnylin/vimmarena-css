'use strict';

module.exports = function(grunt) {
  
	grunt.config.init({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*<%= pkg.homepage %>*/',
		basename: "vimmerby",
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.config('jshint', {
		files: ['Gruntfile.js'],
		options: {
			globalstrict: true,
			predef: ["module"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.config('sass', {
		style: {
			files: {
				'css/<%= basename %>.css': ['sass/<%= basename %>.scss']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.config('cssmin', {
		style: {
			files: {
				'css/<%= basename %>.min.css': ['css/<%= basename %>.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.config('concat', {
		options: {
        	banner: '<%= banner %>',
        	stripBanners: true
      	},
		dist: {
			src: ['css/<%= basename %>.min.css'],
			dest: 'dist/<%= basename %>.min.css'
      	}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		styles: {
			files: ['sass/**/*.scss'],
			tasks: ['sass', 'cssmin', 'concat'],
			options: {
				spawn: false
			}
		}
	});

	grunt.registerTask('default',
	"Skapar en minifierad CSS-fil", ['jshint', 'sass', 'cssmin', 'concat']);

};
