// to compile: 
// traceur --modules commonjs --out gulpfile.js gulpfile-es6.js

// dependencies
var gulp    = require('gulp');
var traceur = require('gulp-traceur');
var rename  = require('gulp-rename');

// aliases, closeurs, etc.
var log = console.log.bind(log);

// Taskrunner class
class Taskrunner {
    constructor() {

        log('Taskrunner constructed');
    }
    run() {

        this.registerTasks();
    }
    traceurTask(e = {}) {
        var path = e.path || 'js/**/*.js';

        log(`running Traceur on ${path}`);
        gulp.src(path)
            .pipe(traceur({
                modules: 'instantiate',
            }))
            .pipe(gulp.dest('./built/'));
    }
    configTask() {
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
    watchTask() {
        var watch = (blob, task) => gulp.watch(blob, task.bind(this));
        watch('./js/**/*.js', this.traceurTask);
        watch('./gulpfile-es6.js', this.configTask);
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


