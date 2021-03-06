// to compile: 
// traceur --modules commonjs --out gulpfile2.js gulpfile-es6.js

// dependencies
var traceur     = require('traceur');
var gulp        = require('gulp');
var gulpTraceur = require('gulp-traceur');
var rename      = require('gulp-rename');
var notify      = require('gulp-notify');
var path        = require('path');
var {spawn}     = require('child_process');
var sourcemaps  = require('gulp-sourcemaps');
var es6ify      = require('es6ify');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

// aliases, closeurs, etc.
var log = console.log.bind(log);
var now = Date.now.bind(Date);

// Taskrunner class
class Taskrunner {
    constructor() {

        log('Taskrunner constructed');
    }
    run() {

        this.registerTasks();
    }
    get auroraOpts() {
        var auroraOpts = {
            generators: 'parse',

            arrowFunctions: 'parse',
            defaultParameters: 'parse',
            restParameters: 'parse',
            spread: 'parse',
            forOf: 'parse',
            destructuring: 'parse',

            classes: true,
            templateLiterals: true, // coming in FF34?

            computedPropertyNames: true, // coming in FF34? make test
            propertyMethods: true, // make test
            propertyNameShorthand: true, // make test
        };
        return auroraOpts;
    }
    get canaryExpOpts() {
        var canaryExpOpts = {
            generators: 'parse',

            arrowFunctions: 'parse',
            defaultParameters: true,
            restParameters: true,
            spread: true,
            forOf: 'parse',
            destructuring: true,

            classes: true,
            templateLiterals: true, // coming in FF34?

            computedPropertyNames: true, // coming in FF34? make test
            propertyMethods: true, // make test
            propertyNameShorthand: true, // make test
        };
        return canaryExpOpts;
    }
    get transformAllOpts() {
        var options = {
            modules: 'instantiate',
            generators: true,

            arrowFunctions: true, 
            defaultParameters: true,
            restParameters: true,
            spread: true,
            forOf: true,
            destructuring: true,

            classes: true,
            templateLiterals: true,

            computedPropertyNames: true,
            propertyMethods: true,
            propertyNameShorthand: true,
        };
        return options;    
    }
    tracTask() {
        log(`Running tracTask on ${Date.now()}`);

        return browserify('./js/main.js')
            .transform(es6ify)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./built/'));
    }
    traceurTask(e = {}) {
        var src = e.path || 'js/**/*.js';
        var options = this.transformAllOpts;
        var defaultOpts = {};
        var {auroraOpts, canaryExpOpts} = this;

        Object.assign(options, canaryExpOpts);
        log(options);

        log(`running Traceur on ${src}: ${now()}`);
        
        gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(gulpTraceur(options))
            // .pipe(notify(`transpiled ${path.basename(src)}`))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./built/'));
    }
    configTask() {
        log('running configTask: ' + now());
        // builds the gulpfile2.js from the es6 version
        // ie, traceur --modules commonjs --out gulpfile2.js gulpfile-es6.js
        var src = 'gulpfile-es6.js';
        gulp.src(src)
            .pipe(gulpTraceur({
                modules: 'commonjs',
            }))
            .pipe(rename('gulpfile2.js'))
            .pipe(gulp.dest(''));
    }
    restartTask() {
        // see http://noxoc.de/2014/06/25/reload-gulpfile-js-on-change/
        var process;
        var restart = () => {
            if (process) process.kill();
            process = spawn('gulp', ['watch'], {stdio: 'inherit'});
        };
        gulp.watch('gulpfile2.js', restart);
        restart();
    }
    watchTask() {
        var ins = this;
        var watch = (blob, task) => gulp.watch(blob, task.bind(ins));

        watch('./js/**/*.js',      ins.tracTask);
        // watch('./js/**/*.js',      ins.traceurTask);
        watch('./gulpfile-es6.js', ins.configTask);
    }
    registerTasks() {
        // register all methods ending in 'Task'
        var methodNames = Object.getOwnPropertyNames(Taskrunner.prototype);
        var taskNames = methodNames.filter(name => name.endsWith('Task'));
        
        for (var taskName of taskNames) {
            var shortName = taskName.replace(/Task$/, '');
            log(`Registering task name ${shortName} with ${taskName}`);
            gulp.task(shortName, this[taskName].bind(this));
        }
    }
}

// execute:
var taskrunner = new Taskrunner();
taskrunner.run();


