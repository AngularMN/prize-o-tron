/*globals module, require, process */
/*jslint vars:true */
module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma', 'coverage']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var ciOptions = process.env.CI && {
      reporters: ['dots', 'coverage'],
      singleRun: true
    };
    return grunt.util._.extend(options, customOptions, ciOptions);
  };

  // Project configuration.
  grunt.initConfig({
    coverage: {
      options: {
        thresholds: {
          'statements': 100,
          'branches': 98,
          'lines': 100,
          'functions': 100
        },
        dir: 'coverage',
        root: ''
      }
    },
    karma: {
      unit: {
        options: testConfig('karma.conf.js',
          {
            singleRun: true,
            autoWatch: true,
            keepalive: true,
            browsers: ['Chrome']
          })
      }
    },
    jshint: {
      files: ['public/app/**/*.js', 'routes/**/*.js', 'views/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {}
      }
    }
  });
};