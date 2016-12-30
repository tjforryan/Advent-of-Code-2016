var gulp = require('gulp');
var mocha = require('gulp-mocha');
var argv = require('yargs').argv;

gulp.task('unitTests', function () {
  const day = argv.day !== true ? `day_${argv.day}` : '**';
  const part = argv.part !== true ? `day_${argv.day}_${argv.part}.test` : '*';

  console.log('PATH: ', `./tests/${day}/${part}.js`)

  return gulp.src(`./tests/${day}/${part}.js`, {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'nyan'}));
});
