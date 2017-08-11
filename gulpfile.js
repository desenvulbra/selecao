var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');

gulp.task('vendor-js', function() {
  gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-messages/angular-messages.js',
    './node_modules/angular-sanitize/angular-sanitize.js',
    './node_modules/angular-toastr/dist/angular-toastr.tpls.js',
    './node_modules/angular-input-masks/releases/angular-input-masks-standalone.js',
    './node_modules/angular-i18n/angular-locale_pt-br.js'
  ]).pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
});

gulp.task('vendor-css', function() {
  gulp.src([
    './node_modules/angular-toastr/dist/angular-toastr.css'
  ]).pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('compile', [
  'vendor-js',
  'vendor-css',
  'scripts'
]);

gulp.task('watch', function() {
  return gulp.watch(['assets/js/**/*.js'], [
    'scripts' ,
    'vendor-js', 
    'vendor-css'
  ]);
});

gulp.task('default', ['watch']);