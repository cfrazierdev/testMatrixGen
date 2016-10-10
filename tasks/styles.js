const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('styles', (callback) => {
  runSequence(['clean.css.all'], 'minify.css', 'clean.css', callback);
});
