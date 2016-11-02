const gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    watch = require('gulp-watch');

gulp.task('monitorTests', function () {
    watchTests();
});

gulp.task('test', function () {
    return gulp.src('./test/tests.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
        .pipe(gulp.dest('build'));
});

function watchTests() {
    return watch(['./*.js', './**/*.js'], function () {
        gulp.src('./test/tests.js', {read: false})
            .pipe(mocha({reporter: 'nyan'}))
            .pipe(gulp.dest('build'));
    });
}
