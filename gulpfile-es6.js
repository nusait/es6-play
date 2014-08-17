// to compile: 
// traceur --modules commonjs --out gulpfile.js gulpfile-es6.js

// dependencies
var gulp    = require('gulp');
var traceur = require('gulp-traceur');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var path    = require('path');
var {spawn} = require('child_process');

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
    traceurTask(e = {}) {
        var src = e.path || 'js/**/*.js';

        var options = {
            modules: 'instantiate',

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

        var defaultOpts = {};

        var auroraOpts = {
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

        var canaryExpOpts = {
            arrowFunctions: 'parse',
            defaultParameters: true,
            restParameters: true,
            spread: true,
            forOf: 'parse',
            destructuring: 'parse',

            classes: true,
            templateLiterals: true, // coming in FF34?

            computedPropertyNames: true, // coming in FF34? make test
            propertyMethods: true, // make test
            propertyNameShorthand: true, // make test
        };

        Object.assign(options, defaultOpts);
        log(options);

        log(`running Traceur on ${src}: ${now()}`);
        
        gulp.src(src)
            .pipe(traceur(options))
            .pipe(notify(`transpiled ${path.basename(src)}`))
            .pipe(gulp.dest('./built/'));
    }
    configTask() {
        log('running configTask: ' + now());
        // builds the gulpfile.js from the es6 version
        // ie, traceur --modules commonjs --out gulpfile.js gulpfile-es6.js
        var src = 'gulpfile-es6.js';
        gulp.src(src)
            .pipe(traceur({
                modules: 'commonjs',
            }))
            .pipe(rename('gulpfile.js'))
            .pipe(gulp.dest(''));
    }
    restartTask() {
        // see http://noxoc.de/2014/06/25/reload-gulpfile-js-on-change/
        var process;
        var restart = () => {
            if (process) process.kill();
            process = spawn('gulp', ['watch'], {stdio: 'inherit'});
        };
        gulp.watch('gulpfile.js', restart);
        restart();
    }
    watchTask() {
        var ins = this;
        var watch = (blob, task) => gulp.watch(blob, task.bind(ins));

        watch('./js/**/*.js',      ins.traceurTask);
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


