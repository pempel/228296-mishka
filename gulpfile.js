'use strict';

var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var run = require('run-sequence');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff2,woff}',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
  gulp.src('js/app.js')
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('styles', function() {
  gulp.src('sass/app.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('symbols', function() {
  var svgs = gulp.src('build/img/symbols/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }));

  return gulp.src('build/*.html')
    .pipe(inject(svgs, {
      transform: function(path, file) {
        return file.contents.toString()
      }
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build', function(fn) {
  run('clean', 'copy', 'scripts', 'styles', 'symbols', fn);
});

gulp.task('reload', function() {
  server.reload();
});

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('sass/**/*.{scss,sass}', ['styles']);
  gulp.watch('*.html', function() { run('copy', 'symbols', 'reload'); });
});
