module.exports = function(grunt) {
	'use strict';
  
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
			options: {
        		banner: '<%= banner %>'
			},
			files: [{
				expand: true,
				cwd: 'css',
				src: ['*.css', '!*.min.css'],
				dest: 'dist',
				ext: '.min.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		styles: {
			files: ['sass/**/*.scss'],
			tasks: ['sass', 'cssmin'],
			options: {
				spawn: false
			}
		}
	});

	grunt.registerTask('default',
	"Skapar en minifierad CSS-fil", ['jshint', 'sass', 'cssmin']);

};
