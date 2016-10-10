const gulp = require('gulp');
const del = require('del');

gulp.task('clean.lib', () => {
  return del(['public/lib/js/**/*', '!public/lib/js/vendors.min.js']);
});
