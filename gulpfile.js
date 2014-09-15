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
var mold          = require('mold-source-map');
var shell         = require('gulp-shell');

var dumpautoload  = require('./dumpautoload');

// aliases, closeurs, etc.
var log = console.log.bind(log);

function uglifyTask() {

    return gulp.src('./public/js/bundle.js')
        .pipe(uglify({
            mangle: false,
            output: {beautify: true},
            compress: false,
        }))
        // .pipe(beautify({preserveNewlines: false}))
        .pipe(rename('bundle-beautified.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(uglify({
            mangle: true,
            output: {beautify: false},
        }))
        .pipe(rename('bundle-min.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(beautify())
        .pipe(rename('bundle-min-beautified.js'))
        .pipe(gulp.dest('./public/js/'))
        .on('end', function() {
            log('end uglifyTask');
        });
}
function jsTaskWithAutoload() {
    return dumpautoload()
        .then(jsTask);
}
function jsTask(e) {

    var filepath = (e && e.path) || null;
    var jsRoot = path.join(__dirname, '.');

    log('running jsTask triggered by: ' + filepath);
    
    // es6ify.traceurOverrides = canaryExpOpts;
    
    return browserify({debug: true})
        .add(es6ify.runtime)
        .transform(es6ify.configure(/(app|config|framework).*\.js$/))
        .require(require.resolve('./app/main.js'), { entry: true })
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(jsRoot))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js/'))
        .on('end', function() {
            log('end jsTask');
        });
}
function bootstrapTask() {
    return browserify({debug: false})
        .transform(es6ify)
        .require(require.resolve('./bootstrap/start.js'), { entry: true })
        .bundle()
        .pipe(source('boot.js'))
        .pipe(gulp.dest('./public/js/'))
        .on('end', function() {
            log('end bootstrapTask');
        });
}
function yuidocTask() {

}
function watchTask() {

    gulp.watch('framework/**/*.js', jsTaskWithAutoload);
    gulp.watch('app/**/*.js',       jsTaskWithAutoload);
    gulp.watch('config/**/*.js',    jsTaskWithAutoload);
    gulp.watch('public/js/bundle.js', uglifyTask);
    gulp.watch('bootstrap/**/*.js', bootstrapTask);
}
function registerGulpTasks() {     
    gulp.task('watch', watchTask);
    gulp.task('js', jsTask);     
    gulp.task('uglify', uglifyTask);  
    gulp.task('yuidoc', shell.task([
        'yuidoc -o docs js/Nusait'
    ]));
    gulp.task('bootstrap', bootstrapTask);
    gulp.task('dumpautoload', dumpautoload);
}

registerGulpTasks();