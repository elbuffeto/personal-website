// Gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();
var sassdoc = require('sassdoc');

// Paths
var paths = {
  styles: {
    src: 'app/styles/**/*.scss',
    dest: 'app/css'
  },
  html: {
    src: "app/index.html"
  }
};


// Development functions
// -----------------

// Compiling scss
function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Destination for the compiled files
      .pipe(gulp.dest(paths.styles.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}

// This allows you to run it from the commandline using $ gulp style
exports.style = style;

// To reload the page
function reload(done) {
  browserSync.reload();
  done();
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: "app"
    }
  });
  gulp.watch(paths.styles.src, style);
  gulp.watch(paths.html.src, reload);
}

exports.watch = watch;

// Generate sassdoc file
function sassdoc() {
   src(paths.styles.src)
      .pipe(sassdoc());
}

exports.sassdoc = sassdoc;
