// gulpfile.js
// --- INIT ---
var gulp    = require('gulp'),
    less    = require('gulp-less'),
    sass    = require('gulp-sass'),
    minify  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    notify  = require('gulp-notify'),
    growl   = require('gulp-notify-growl'),
    phpunit = require('gulp-phpunit');
    bower   = require('gulp-bower');

// Paths variables
var paths = {
    'app': {
          'less': './public/less/',
            'js': './public/js/',
        'vendor': './public/vendor/'
    },
    'assets': {
           'css': './public/',
            'js': './public/'
    },
	bowerDir: './bower_components'
};

// --- TASKS ---
// Bower
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(paths.bowerDir))
});

// CSS
gulp.task('css', function() {
    return gulp.src(paths.app.less+'app.less')
        .pipe(less())
        .pipe(gulp.dest(paths.assets.css))
        .pipe(minify({keepSpecialComments:0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.assets.css));
});

// JS
gulp.task('js', function(){
    return gulp.src([
        paths.app.vendor+'jquery/dist/jquery.js',
        paths.app.vendor+'bootstrap/dist/js/bootstrap.js',
        paths.app.js+'js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.assets.js));
});

// PHP Unit
//gulp.task('phpunit', function() {
//    var options = {debug: false, notify: true};
//    return gulp.src('./tests/*.php')
//        .pipe(phpunit('./vendor/bin/phpunit', options))
//        .on('error', notify.onError({
//            title: 'PHPUnit Failed',
//            message: 'One or more tests failed.'
//        }))
//        .pipe(notify({
//            title: 'PHPUnit Passed',
//            message: 'All tests passed!'
//        }));
//});

// --- WATCH 
// Rerun the task when a file changes
gulp.task('watch', function() { 
    gulp.watch(paths.app.less + '/*.less', ['css']);
    gulp.watch(paths.app.js + '/*.js', ['js']);
    //gulp.watch('./tests/*.php', ['phpunit']);
});

// --- DEFAULT
gulp.task('default', ['bower', 'css', 'js', 'watch']);
