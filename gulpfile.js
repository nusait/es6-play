// dependencies
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var notify        = require('gulp-notify');
var path          = require('path');
var spawn         = require('child_process').spawn;
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var es6ify        = require('es6ify');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var beautify      = require('gulp-beautify');
var canaryExpOpts = require('./gulp/canaryExpOpts');
var auroraOpts    = require('./gulp/auroraOpts');

// aliases, closeurs, etc.
var log = console.log.bind(log);

function uglifyTask() {

    var mangledOptions = {
        mangle: true,
        output: {beautify: false}
    };

    return gulp.src('./built/bundle.js')
        .pipe(uglify(mangledOptions))
        .pipe(rename('bundle-min.js'))
        .pipe(gulp.dest('built/'))
        .pipe(beautify())
        .pipe(rename('bundle-min-beautified.js'))
        .pipe(gulp.dest('built/'));
}
function traceurTask() {

    // es6ify.traceurOverrides = canaryExpOpts;

    return browserify({debug: true})
        // .add(es6ify.runtime)
        .transform(es6ify.configure(/Nusait.*\.js$/))
        .require(require.resolve('./js/main.js'), { entry: true })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./built/'));
}
function registerGulpTasks() {     
    gulp.task('traceur', traceurTask);     
    gulp.task('uglify', uglifyTask);     
}

registerGulpTasks();