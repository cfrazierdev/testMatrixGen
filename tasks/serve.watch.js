const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('serve.watch', () => {
  var electron = require('electron-connect').server.create({ path: 'src/client', stopOnClose: true });

  electron.start('src/client');

  gulp.watch(['src/client/index.js',
              'src/client/index.html',
              'src/client/app/+database/*.js',
              'src/client/app/shared/matrix-exporter/*.js',
              'src/client/**/*.html'],
              () => electron.restart('src/client'));

  gulp.watch('src/client/css/**/*.css', () => {
    runSequence('styles', () => electron.restart('src/client'));
  });

  gulp.watch('src/client/app/**/*.ts', () => {
    runSequence(['scripts.serve', 'styles'], 'inject.serve', () => electron.restart('src/client'));
  });
});
