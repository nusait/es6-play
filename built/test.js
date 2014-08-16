System.register([], function($__export) {
  "use strict";
  var $window,
      console,
      log,
      Test;
  return {
    setters: [],
    execute: function() {
      $window = window;
      console = $window.console;
      log = console.log.bind(console);
      Test = (function() {
        var Test = function Test() {
          log('being constructed');
        };
        return ($traceurRuntime.createClass)(Test, {speak: function(message) {
            log('I am speaking my message');
          }}, {hello: function() {
            log('heldlo');
          }});
      }());
      $__export("Test", Test);
    }
  };
});
