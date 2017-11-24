var pkg = require('./package.json');
var productionDirectoryName = pkg.name;

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  zip = require('gulp-zip');

var pkg = require('./package.json');

gulp.task('clean-dist', function () {
  return gulp.src('./dist/' + productionDirectoryName + '/*', { read: false })
    .pipe(clean());
});


gulp.task('default', function () {
  return gulp.src('dist/' + productionDirectoryName + '/**', { base: 'dist' })
    .pipe(zip(pkg.name + '@production.zip'))
    .pipe(gulp.dest('./dist'));

}); //定义默认任务