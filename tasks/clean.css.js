const gulp = require('gulp');
const del = require('del');

gulp.task('clean.css', () => {
  return del(['public/lib/css/*', '!public/lib/css/global.min.css']);
});
