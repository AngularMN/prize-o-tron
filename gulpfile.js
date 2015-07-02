require('es6-shim');
var gulp = require('gulp');
var Builder = require('systemjs-builder');
var Package = require('./package.json');
var Typescript = require('./jspm_packages/github/mhegazy/typescript@v1.5-beta2/')
var gulpTs = require('gulp-typescript');

var baseConfig = {
      transpiler: 'traceur'
};


function getBuilder(config){
  return Promise.resolve(new Builder(config));
}

function configureBuilder(options){
  console.log(options)
  return function applyConfig(builder){
    builder.config(options);
    return builder;
  }
}

function loadConfigFile(filename){
  return function withBuilder(builder){
    return builder.loadConfig(filename)
      .then(function(){ return builder; });
  }
}

function build(inputPath, outputFile, outputOptions, buildConfig){
  return getBuilder()
    .then(loadConfigFile(Package.jspm.configFile))
    .then(configureBuilder(buildConfig || baseConfig))
    .then(function(builder){
      if(outputOptions.sfx){
        delete outputOptions.sfx;
        return builder.buildSFX(inputPath, outputFile, outputOptions);
      }
      return builder.build(inputPath, outputFile, outputOptions);
    });
}

//compiles TS to ES6 
gulp.task('compile:app',function(){
  return gulp.src(['src/**/*.ts'])
    .pipe(gulpTs({
      typescript: Typescript,
      target: 'es6',
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    }))
    .js.pipe(gulp.dest('app'));
});

//OPTION 1
//builds a single System.register bundle for the entire app + dependencies

gulp.task('build:all:dev',['compile:app'], function(){
  return build(baseConfig);
});

gulp.task('build:all:min',['compile:app'], function(){
  return build(
    'app/main',
    'build/app.min.js',
    {
      minify: true,
      inject: true,
    });
});

//OPTION 2
//builds a single self-executing bundle for entire app + dependencies

gulp.task('build:all:sfx:min',['compile:app'], function(){
  return build(
    'app/main',
    'build/app.min.sfx.js',
    {
      minify: true,
      inject: true,
      sfx: true
    });
});

gulp.task('build:all:sfx',['compile:app'], function(){
  return build(
    'app/main',
    'build/app.sfx.js',
    {
      inject: false,
      sfx: true
    });
});

//OPTION 3 - builds two System.register bundles, one for dependencies, one for app.

//build dependency bundle
gulp.task('build:lib',[], function(){
  return build(
    'app/**/* - [app/**/*]',
    'build/lib.js',{});
  
});

gulp.task('build:lib:min',['compile:app'], function(){
  return build(
    'app/**/* - [app/**/*]',
    'build/lib.min.js',
    {
      minify: true,
      mangle: true
    });
  
});

gulp.task('build:app',[], function(){
  return build(
    'app/main - build/lib',
    'app/app.js',{});
});


gulp.task('build:app:min',['compile:app'], function(){
  return build(
    'app/main - build/lib.min',
    'app/app.min.js',
    {
      minify: true,
      mangle: true
    });
});