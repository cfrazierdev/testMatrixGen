const gulp = require('gulp');
const inject = require('gulp-inject');

gulp.task('inject.serve', (callback) => {
  /*var sources = gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'systemjs.config.js'
  ], { read: false });*/
  var sources = gulp.src(['./public/lib/js/*.js', './public/dist/js/*.js'], { read: false });

  var sysImport = gulp.src([
    'src/client/dev.js'
  ], { read: false });

  return gulp.src('./src/client/index.html')
    .pipe(inject(sources, { relative: true, starttag: '<!-- inject:head:js -->' }))
    .pipe(inject(sysImport, { relative: true }))
    .pipe(gulp.dest('./src/client'));
});
