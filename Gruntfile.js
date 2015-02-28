'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.config('sass', {
		app: {
			files: {
				'tmp/vimmerby.css': ['sass/vimmerby.scss']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.config('cssmin', {
		app: {
			files: {
				'dist/vimmerby.min.css': ['tmp/vimmerby.css']
			}
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


	grunt.registerTask('default', "Watching for changes and deploys", ['watch']);
	grunt.registerTask('build',	"Does the work", ['sass', 'cssmin']);

};
