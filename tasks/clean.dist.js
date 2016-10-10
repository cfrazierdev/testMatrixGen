const gulp = require('gulp');
const del = require('del');

gulp.task('clean.dist.js', () => {
  return del('public/dist/js/*');
});
