"use strict";
var __moduleName = "gulpfile-es6";
var traceur = require('traceur');
var gulp = require('gulp');
var gulpTraceur = require('gulp-traceur');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var path = require('path');
var spawn = require('child_process').spawn;
var sourcemaps = require('gulp-sourcemaps');
var es6ify = require('es6ify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
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
      templateLiterals: true,
      computedPropertyNames: true,
      propertyMethods: true,
      propertyNameShorthand: true
    };
    return auroraOpts;
  },
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
      templateLiterals: true,
      computedPropertyNames: true,
      propertyMethods: true,
      propertyNameShorthand: true
    };
    return canaryExpOpts;
  },
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
      propertyNameShorthand: true
    };
    return options;
  },
  tracTask: function() {
    log(("Running tracTask on " + Date.now()));
    return browserify('./js/main.js').transform(es6ify).bundle().pipe(source('bundle.js')).pipe(gulp.dest('./built/'));
  },
  traceurTask: function() {
    var e = arguments[0] !== (void 0) ? arguments[0] : {};
    var src = e.path || 'js/**/*.js';
    var options = this.transformAllOpts;
    var defaultOpts = {};
    var $__3 = this,
        auroraOpts = $__3.auroraOpts,
        canaryExpOpts = $__3.canaryExpOpts;
    Object.assign(options, canaryExpOpts);
    log(options);
    log(("running Traceur on " + src + ": " + now()));
    gulp.src(src).pipe(sourcemaps.init()).pipe(gulpTraceur(options)).pipe(sourcemaps.write()).pipe(gulp.dest('./built/'));
  },
  configTask: function() {
    log('running configTask: ' + now());
    var src = 'gulpfile-es6.js';
    gulp.src(src).pipe(gulpTraceur({modules: 'commonjs'})).pipe(rename('gulpfile2.js')).pipe(gulp.dest(''));
  },
  restartTask: function() {
    var process;
    var restart = (function() {
      if (process)
        process.kill();
      process = spawn('gulp', ['watch'], {stdio: 'inherit'});
    });
    gulp.watch('gulpfile2.js', restart);
    restart();
  },
  watchTask: function() {
    var ins = this;
    var watch = (function(blob, task) {
      return gulp.watch(blob, task.bind(ins));
    });
    watch('./js/**/*.js', ins.tracTask);
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
