const gulp = require('gulp');
const del = require('del');

gulp.task('clean.lib.all', () => {
  return del('public/lib/js/**/*');
});
