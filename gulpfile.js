"use strict";
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var path = require('path');
var spawn = require('child_process').spawn;
var log = console.log.bind(log);
var now = Date.now.bind(Date);
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
      propertyNameShorthand: true
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
      templateLiterals: true,
      computedPropertyNames: true,
      propertyMethods: true,
      propertyNameShorthand: true
    };
    var canaryExpOpts = {
      arrowFunctions: 'parse',
      defaultParameters: true,
      restParameters: true,
      spread: true,
      forOf: 'parse',
      destructuring: 'parse',
      classes: true,
      templateLiterals: true,
      computedPropertyNames: true,
      propertyMethods: true,
      propertyNameShorthand: true
    };
    Object.assign(options, defaultOpts);
    log(options);
    log(("running Traceur on " + src + ": " + now()));
    gulp.src(src).pipe(traceur(options)).pipe(notify(("transpiled " + path.basename(src)))).pipe(gulp.dest('./built/'));
  },
  configTask: function() {
    log('running configTask: ' + now());
    var src = 'gulpfile-es6.js';
    gulp.src(src).pipe(traceur({modules: 'commonjs'})).pipe(rename('gulpfile.js')).pipe(gulp.dest(''));
  },
  restartTask: function() {
    var process;
    var restart = (function() {
      if (process)
        process.kill();
      process = spawn('gulp', ['watch'], {stdio: 'inherit'});
    });
    gulp.watch('gulpfile.js', restart);
    restart();
  },
  watchTask: function() {
    var ins = this;
    var watch = (function(blob, task) {
      return gulp.watch(blob, task.bind(ins));
    });
    watch('./js/**/*.js', ins.traceurTask);
    watch('./gulpfile-es6.js', ins.configTask);
  },
  registerTasks: function() {
    var methodNames = Object.getOwnPropertyNames($Taskrunner.prototype);
    var taskNames = methodNames.filter((function(name) {
      return name.endsWith('Task');
    }));
    for (var $__1 = taskNames[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var taskName = $__2.value;
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
