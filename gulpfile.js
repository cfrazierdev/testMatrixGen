const gulp = require('gulp');
const runSequence = require('run-sequence');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

gulp.task('build', (callback) => {
  runSequence('copy', 'scripts', 'minify.js', 'styles', 'inject.build', 'clean.lib', callback);
});

gulp.task('serve', () => {
  runSequence(['scripts', 'styles'], 'inject.serve', 'serve.watch');
});
