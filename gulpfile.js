"use strict";
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var rename = require('gulp-rename');
var log = console.log.bind(log);
var Taskrunner = function Taskrunner() {
  log('Taskrunner constructed');
};
var $Taskrunner = Taskrunner;
($traceurRuntime.createClass)(Taskrunner, {
  run: function() {
    this.registerTasks();
  },
  traceurTask: function() {
    var e = arguments[0] !== (void 0) ? arguments[0] : {};
    var path = e.path || 'js/**/*.js';
    log(("running Traceur on " + path));
    gulp.src(path).pipe(traceur({modules: 'instantiate'})).pipe(gulp.dest('./built/'));
  },
  configTask: function() {
    var src = 'gulpfile-es6.js';
    gulp.src(src).pipe(traceur({modules: 'commonjs'})).pipe(rename('gulpfile.js')).pipe(gulp.dest(''));
  },
  watchTask: function() {
    var $__0 = this;
    var watch = (function(blob, task) {
      return gulp.watch(blob, task.bind($__0));
    });
    watch('./js/**/*.js', this.traceurTask);
    watch('./gulpfile-es6.js', this.configTask);
  },
  registerTasks: function() {
    var methodNames = Object.getOwnPropertyNames($Taskrunner.prototype);
    var taskNames = methodNames.filter((function(name) {
      return name.endsWith('Task');
    }));
    for (var $__2 = taskNames[Symbol.iterator](),
        $__3; !($__3 = $__2.next()).done; ) {
      var taskName = $__3.value;
      {
        var shortName = taskName.replace(/Task$/, '');
        log(("Registering task name " + shortName + " with " + taskName));
        gulp.task(shortName, this[taskName].bind(this));
      }
    }
  }
}, {});
var taskrunner = new Taskrunner();
taskrunner.run();
