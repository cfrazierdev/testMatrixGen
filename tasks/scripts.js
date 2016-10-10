const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('scripts', (callback) => {
  runSequence(['clean.dist.js'], 'compile.ts', 'bundle.js', callback);
});
