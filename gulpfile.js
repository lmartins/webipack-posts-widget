'use strict';

var gulp            = require('gulp'),
    connect         = require('gulp-connect'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    dev     = require('gulp-dev'),
    browserSync     = require('browser-sync'),
    plugins         = gulpLoadPlugins(),
    webpack         = require('webpack'),
    ComponentPlugin = require("component-webpack-plugin"),
    info            = require('./package.json'),
    webpackCompiler;

var config = {

  JS: {
    src: ["js/**/*.js"],
    build: "build/js/",
    buildFiles: "build/js/*.js"
  },

  HTML:{
    src: ['**/*.php']
    // build: "./app/"
  },

  SASS: {
    src: "css/*.scss",
    build: "build/css/"
  }

}

// SERVER ---------------------------------------------------------------------
gulp.task('browser-sync', function() {
  browserSync({
    // server: {
    //   baseDir: "./app/"
    // },
    proxy: "http://multisite.dev/wip053/wp-admin/",
    browser: "",
    online: true,
    open: false
  });
});


// SASS -----------------------------------------------------------------------

gulp.task('sass', function () {
  gulp.src( config.SASS.src )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.plumber() )
    .pipe( plugins.sass() )
    .pipe( plugins.sourcemaps.write('./') )
    .pipe( gulp.dest( config.SASS.build ) )
    .pipe( plugins.filter( '**/*.css') ) // Filtering stream to only css files
    .pipe( browserSync.reload({ stream: true }) );
});

gulp.task('sass-prefixer', function () {
  gulp.src( config.SASS.build + "*.css" )
    .pipe( plugins.autoprefixer (
      "last 1 versions", "> 10%", "ie 9"
      ))
    .pipe( gulp.dest( config.SASS.build ) );
});

// gulp.task('sass', function() {
//   return gulp.src( config.SASS.src )
//     .pipe(plugins.plumber())
//     .pipe(plugins.sass({
//       outputStyle: 'compressed'
//       }))
//     .on("error", plugins.notify.onError())
//     // .on("error", function (err) {
//     //   console.log("Error:", err);
//     // })
//     .pipe(plugins.plumber.stop())
//     .pipe( plugins.autoprefixer (
//         "last 1 versions", "> 10%", "ie 9"
//         ))
//     .pipe( gulp.dest( config.SASS.build ) )
//     .pipe( browserSync.reload({ stream: true }) );
// });


// JAVASCRIPT RELOADING -------------------------------------------------------
gulp.task('js', function () {
  return gulp.src( config.JS.buildFiles )
    .pipe( plugins.changed ( config.JS.buildFiles ))
    .pipe( plugins.filter('**/*.js'))
    .pipe( browserSync.reload({ stream: true }) );
    // .pipe( plugins.livereload() );
});



// HTML TEMPORARIO --------------------------------------------------------------
gulp.task('html', function () {
  return gulp.src( config.HTML.src )
    // .pipe( cleanhtml() )
    // .pipe( dev(true) )
    // .pipe( gulp.dest( config.HTML.build ) )
    .pipe( browserSync.reload({ stream: true }) );
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});



// DEPLOY ---------------------------------------------------------------------
// Runs the deployment script
// Use it after pushing the local repo into the remote repository
gulp.task('deploy', function () {
  plugins.run('ssh wordpress@wp.webispot.com "cd wordpress/mw-public/plugins/webipack-posts-widget ; git pull"').exec()
    // .pipe(gulp.dest('output'))    // Writes "Hello World\n" to output/echo.
})




// GLOBAL TASKS ---------------------------------------------------------------

gulp.task('watch', function () {
  // gulp.watch( config.HTML.src , [browserSync.reload] );
  gulp.watch( config.HTML.src , ['bs-reload'] );
  gulp.watch( config.JS.src , ["webpack"]);
  gulp.watch( config.JS.buildFiles , ["js"] );
  gulp.watch( config.SASS.src , ['sass']  );
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('server', ['browser-sync'] );
