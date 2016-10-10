const gulp = require('gulp');
const plumber = require('gulp-plumber');
const tsc = require('gulp-typescript');
const tsconfig = require('tsconfig-glob');
const tscConfig = require('../tsconfig.json');

gulp.task('compile.ts', () => {
  return gulp
    .src(tscConfig.filesGlob)
    .pipe(plumber({
      errorHandler: (err) => {
        console.error('>>> [tsc] Typescript compilation failed'.bold.green);
        this.emit('end');
      }
    }))
    .pipe(tsc(tscConfig.compilerOptions))
    .pipe(gulp.dest('public/dist/js'));
});
