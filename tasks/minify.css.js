const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify.css', () => {
  return gulp.src([
      'node_modules/ag-grid/dist/styles/ag-grid.css',
      'node_modules/ag-grid/dist/styles/theme-fresh.css',
      'src/client/css/**/*.css'
    ]).pipe(concat('global.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('public/lib/css'));
});
