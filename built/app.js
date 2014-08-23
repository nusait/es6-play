System.register([], function($__export) {
  "use strict";
  var $window,
      app;
  function run() {
    var console = $window.console;
    var log = console.log.bind(console);
    var errlog = (err) => {
      debugger;
      log(("error here: " + err));
    };
    System.import('built/test').then((m) => {
      var Test = m.Test;
      var test = new Test($window);
      test.run();
    }, errlog);
  }
  return {
    setters: [],
    execute: function() {
      $window = window;
      app = $__export("app", {run: run});
    }
  };
});
