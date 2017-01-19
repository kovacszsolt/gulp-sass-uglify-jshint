var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('styles', function () {
    return sass('app/sass/main.scss', {style: 'expanded'})
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'))
        ;
});

gulp.task('lint', function () {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compress', function () {
    gulp.src('app/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('default', function () {
    gulp.start('styles', 'lint', 'compress');
});

gulp.task('css', function () {
    gulp.start('styles');
});

gulp.task('script', function () {
    gulp.start('lint', 'compress');
});