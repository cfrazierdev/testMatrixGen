const gulp = require('gulp');
const inject = require('gulp-inject');

gulp.task('inject.build', (callback) => {
  var sources = gulp.src(['./public/lib/js/*.js', './public/dist/js/*.js'], { read: false });

  return gulp.src('./src/client/index.html')
    .pipe(inject(sources, { relative: true, starttag: '<!-- inject:head:js -->' }))
    .pipe(inject(gulp.src('./src/client/prod.js'), { relative: true }))
    .pipe(gulp.dest('./src/client'));
});
