const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('scripts.serve', (callback) => {
    runSequence('compile.ts', 'bundle.js', callback);
});
