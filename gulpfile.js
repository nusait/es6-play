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
function jsTask(e) {

    var filepath = (e && e.path) || null;
    var jsRoot = path.join(__dirname, '.');

    log('running jsTask triggered by: ' + filepath);
    
    es6ify.traceurOverrides = canaryExpOpts;
    
    return browserify({debug: true})
        // .add(es6ify.runtime)
        .transform(es6ify.configure(/Nusait.*\.js$/))
        .require(require.resolve('./js/main.js'), { entry: true })
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(jsRoot))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./built/'))
        .on('end', function() {
            log('end jsTask');
        });
}
function watchTask() {
    gulp.watch('js/app.js', function() {
        log('changed');
    });
    gulp.watch('js/Nusait/**/*.js', jsTask);
    gulp.watch('main.js', jsTask);
}
function registerGulpTasks() {     
    gulp.task('watch', watchTask);
    gulp.task('js', jsTask);     
    gulp.task('uglify', uglifyTask);     
}

registerGulpTasks();