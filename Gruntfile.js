'use strict';

module.exports = function(grunt) {
  
	grunt.config.init({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*<%= pkg.homepage %>*/'
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
				'css/vimmerby.css': ['sass/vimmerby.scss']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.config('cssmin', {
		style: {
			files: {
				'css/vimmerby.min.css': ['css/vimmerby.css']
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
			src: ['css/vimmerby.min.css'],
			dest: 'dist/vimmerby.min.css'
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
