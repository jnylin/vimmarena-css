'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
    	banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
	});

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

	grunt.registerTask('build',	"Does the work", ['sass', 'cssmin']);

};
