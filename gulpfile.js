var gulp = require('gulp');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var sass = require('gulp-sass');


gulp.task('styles', function() {
  return gulp.src('css/sass/*.scss')
    .pipe(sass()) // takes all the files in the sass folder
    .pipe(autoprefixer({ // this adds the css prefixers that are necessary
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(minifycss()) // this minifies the css
    .pipe(concat('style.css')) // try to put it all in one file? Yep!
    .pipe(gulp.dest('css')) // the destination ok.
    //.pipe(notify({ message: 'All done, Marine!' })); // a notification in the mac thingy
});


gulp.task('watch', function () {
  gulp.watch('css/sass/*.scss', ['styles']);
});

gulp.task('default', ['watch', 'styles']);
