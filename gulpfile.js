var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

// Error
var onError = function (err) {
    console.log(err);
    this.emit('end');
}

// Start BrowserSync Server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "src/",
            index: 'index.html',
            directory: true
        }
    })
});

// Sass changes and compile into css
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Compile Error",
                    message: "<%= error.message %>",
                    sound: "beep"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['src/scss/partials']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Watchers
gulp.task('watch', ['browserSync','sass'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/html/**/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});