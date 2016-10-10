const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy', (callback) => {
  runSequence('clean.lib.all', 'copy.libs', callback);
});
