const gulp = require('gulp');
const sysBuilder = require('systemjs-builder');
const del = require('del');

gulp.task('bundle.js', () => {
  var builder = new sysBuilder('./', './systemjs.config.prod.js');
  return builder.buildStatic('app', 'public/dist/js/app.min.js')
    .then(() => {
      return del(['public/dist/js/**/*', '!public/dist/js/app.min.js']);
    })
    .catch((err) => {
      console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
    });
});
