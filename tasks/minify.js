const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('minify.js', () => {
  return gulp.src('public/dist/js/app.min.js')
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('public/dist/js'));
});
