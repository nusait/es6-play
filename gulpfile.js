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
var concat        = require('gulp-concat');
var rsync         = require('gulp-rsync');
var sass          = require('gulp-ruby-sass');
var gutil         = require('gulp-util');
var path          = require('path');
var hbsy          = require('hbsfy');

var dumpautoload  = require('./dumpautoload');

// aliases, closeurs, etc.
var log = console.log.bind(log);
var basename = path.basename.bind(path);

function uglifyTask() {

    gulp.src('./public/js/bundle.js')
        .pipe(uglify({
            mangle: false,
            output: {beautify: true},
            compress: false,
        }))
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
    
    return browserify({debug: true, standalone: 'App'})
        .transform(es6ify.configure(/(app|config|framework).*\.js$/))
        .transform(hbsy.configure({ extensions: ['hbs'] }))
        .require(
            require.resolve('./app/main.js'), 
            { entry: true }
        )
        // .add(es6ify.runtime, {standalone: false}) // load inline from main
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(jsRoot))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(notify('$$$ end jsTask'))
        .on('end', function() {
            log('$$$ end jsTask');

            gutil.beep();
        });
}
function bootstrapTaskWithAutoload() {
    return dumpautoload()
        .then(bootstrapTask);
}
function bootstrapTask() {
    
    var jsRoot = path.join(__dirname, '.');

    return browserify({debug: false})
        .transform(es6ify)
        .require(require.resolve('./bootstrap/start.js'), { entry: true })
        .bundle()

        // doesn't work below:
        // .pipe(mold.transformSourcesRelativeTo(jsRoot))

        .pipe(source('boot.js'))

        .pipe(gulp.dest('./public/js/'))
        .on('end', function() {
            gutil.beep();
            log('end bootstrapTask: ' + Date.now());
            return gulp.src('./public/js/boot.js')
                .pipe(uglify({
                    mangle: false,
                    output: {beautify: true},
                    compress: false,
                }))
                .pipe(rename('boot-min.js'))
                .pipe(gulp.dest('./public/js/'))
                .pipe(notify('end bootstrapTask: ' + Date.now()));
        });
}
function yuidocTask() {

    // todo
}
function sassTask(e) {

    var filename      = basename(e.path);
    var reBundleThese = /(initial|bundled)/; // had 'colors' here before
    var isInit        = reBundleThese.test(filename);
    var destination   = './public/css/';

    var options = {
        trace: true,
        style: isInit ? 'expanded' : 'expanded' /*'compressed'*/,
        noCache: false,
        sourcemap: 'none', // could be `auto`
    };

    log('file changed: ' + filename);

    if (isInit) {
        return gulp.src('./styles/initial.scss')
            .pipe(sass(options))
            .pipe(gulp.dest(destination))
            // .pipe(livereload())
            .on('end', function() {
                gutil.beep();
                gulp.src('', {read:false})
                    .pipe(notify('sass initial.scss'));
            });
    } else {
        return gulp.src('./styles/main.scss')
            .pipe(sass(options))
            .pipe(gulp.dest(destination))
            // .pipe(livereload())
            .on('end', function() {
                gutil.beep();
                gulp.src('', {read:false})
                    .pipe(notify('sass main.scss'));
            }); 
    }
}  
function cordovacopyTask() {
    log('cordova copy task');

    return gulp.src(['public'])
        .pipe(rsync({
            root: 'public',
            progress: true,
            emptyDirectories: true,
            exclude: ['cordova.js','boot-min.js'],
            clean: true,
            recursive: true,
            incremental: true,
            destination: 'cordova/www'
        }))
        // .then( function() {
        //     log('$$$ cordovacopyTask');
        // });
        .on('end', function() {
            log('$$$ cordovacopyTask');
            gutil.beep();
        });
}
function cordovaconfigTask() {
    log('cordova config task');

    return gulp.src(['cordova-assets/config.xml'])
        .pipe(rsync({
            root: 'cordova-assets',
            progress: true,
            incremental: false,
            destination: 'cordova'
        }));
}
function watchTask() {

    gulp.watch(['styles/**/*'], sassTask);

    gulp.watch(
        ['framework/**/*.js','app/**/*.js','config/**/*.js','templates/built/**/*'], 
    // jsTaskWithAutoload);
    jsTask);

    gulp.watch(['bootstrap/**/*.js','framework/**/helpers.js'], bootstrapTask);
    // gulp.watch('public/js/bundle.js', uglifyTask);


    // ready assets for cordova:
    // (try reacting to just one file at once, ergo specifying folders)
    gulp.watch([
        'public/js/**',
        'public/index.html',
        'public/css/**'
    ], cordovacopyTask);

    gulp.watch(['cordova-assets/config.xml'], cordovaconfigTask);
}
function registerGulpTasks() {
    gulp.task('cordovacopy', cordovacopyTask);
    gulp.task('cordovaconfig', cordovaconfigTask);
    gulp.task('watch', watchTask);
    gulp.task('js', jsTask);     
    gulp.task('uglify', uglifyTask);  
    gulp.task('yuidoc', shell.task([
        'yuidoc -o docs js/Nusait'
    ]));
    gulp.task('bootstrap', bootstrapTaskWithAutoload);
    gulp.task('dumpautoload', dumpautoload);

    gulp.task('ios', function() {

        var templateData = {};
        var options = {
            cwd: './cordova',
            templateData: templateData
        };

        return gulp.src('', {read:false})
            .pipe(shell([
                'cordova build ios',
                'ios-sim launch ' +
                    './platforms/ios/build/emulator/NUHelp.app ' +  
                    '--exit ' +
                    '--devicetypeid "com.apple.CoreSimulator.SimDeviceType.iPhone-6-Plus, 8.1"',
            ], options));

    });
}

registerGulpTasks();