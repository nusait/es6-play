System.register([], function($__export) {
  "use strict";
  var app;
  function run() {
    var log = console.log.bind(log);
    var errlog = function(err) {
      log('error here: ' + err);
    };
    System.import('built/test').then(function(m) {
      var Test = m.Test;
      var test = new Test();
      test.speak();
    }, errlog);
    System.import('built/amdtest').then(function(m) {
      log('hi');
    }, errlog);
  }
  return {
    setters: [],
    execute: function() {
      app = $__export("app", {run: run});
    }
  };
});
