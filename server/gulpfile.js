const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    package = require('./package.json');

gulp.task('js',function(){
  gulp.src('routeHandlers/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
});

gulp.task('server', function (cb) {
  let called = false;
  return nodemon({script: 'app.js',
      ignore: [
        'gulpfile.js',
        'config/',
        'node_modules/'
      ]
    })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
});

gulp.task('default', ['js', 'server'], function () {
    gulp.watch('routeHandlers/**/*.js', ['js']);
    gulp.watch('routes/**/*.js', ['server']);
    gulp.watch('routeHandlers/**/*.js', ['server']);
    gulp.watch('app.js', ['server']);
});
