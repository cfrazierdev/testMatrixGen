const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('copy.libs', () => {
  gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js'
  ]).pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib/js'));
});
