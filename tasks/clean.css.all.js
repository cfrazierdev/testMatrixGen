const gulp = require('gulp');
const del = require('del');

gulp.task('clean.css.all', () => {
  return del('public/lib/css/*');
});
