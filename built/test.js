System.register([], function($__export) {
  "use strict";
  var console,
      log,
      Test;
  function anotherSpeak() {
    log(("anotherSpeak: age is " + this.age));
  }
  function async(makeGenerator) {
    return function() {
      var generator = makeGenerator.apply(this, arguments);
      function handle(result) {
        if (result.done)
          return Promise.resolve(result.value);
        return Promise.resolve(result.value).then(function(res) {
          return handle(generator.next(res));
        }, function(err) {
          return handle(generator.throw(err));
        });
      }
      try {
        return handle(generator.next());
      } catch (ex) {
        return Promise.reject(ex);
      }
    };
  }
  function wait() {
    var time = arguments[0] !== (void 0) ? arguments[0] : 500;
    return new Promise((resolve) => {
      log(("starting to wait " + time));
      setTimeout(() => {
        log(("just waited " + time + "."));
        resolve();
      }, time);
    });
  }
  return {
    setters: [],
    execute: function() {
      Test = (function() {
        var Test = function Test($window) {
          console = $window.console;
          log = console.log.bind(console);
          log('Test being constructed');
        };
        return ($traceurRuntime.createClass)(Test, {
          speak: function() {
            log('speak method called');
            var up = (str) => str.toUpperCase();
            log(("My " + up('age') + " is " + this.age));
            this.anotherSpeak();
          },
          run: function() {
            this.speak('hey, what up?');
            this.restParameters('one', 'two', 'three');
            this.spread();
            this.forOf();
            this.destructuring();
            this.mapObj();
          },
          testAsync: function() {
            var test = async(function*() {
              var blah = yield wait(1000);
              log("waited in between");
              yield wait(2000);
              log("finally all done!");
            });
            test();
          },
          get wait() {
            return wait;
          },
          mapObj: function() {
            var map = new Map();
            var key,
                value;
            map.set(1, 'jik');
            log(map.has(1));
            map.set(2, 'nyi');
            log(map.get(1));
            log(map.size);
            log('#forOf on map');
            for (var $__2 of map) {
              var k = $__2[0],
                  v = $__2[1],
                  l = $__2[2];
              log(k + ' + ' + v);
            }
            log('map#forEach()');
            map.forEach((value, key, list) => log(value, key, list));
            log('map#values()');
            for (value of map.values()) {
              log(value);
            }
            log('map#entries()');
            for (value of map.entries()) {
              log(value);
            }
            map.delete(1);
            map.forEach((value, key, list) => log(value, key, list));
            map.clear();
            map.forEach((value, key, list) => log(value, key, list));
          },
          destructuring: function() {
            var $__2 = {
              age: 18,
              gender: 'female'
            },
                theirAge = $__2.age,
                gender = $__2.gender;
            log(theirAge);
            log(gender);
            var $__2 = [234.234, 643.234],
                lat = $__2[0],
                lng = $__2[1];
            log(lat);
            log(lng);
            var fnc = function($__2) {
              var $__3 = $__2,
                  lat = $__3.lat,
                  lng = $__3.latitude;
              log('destructuring parameters:');
              log(lat);
              log(lng);
            };
            fnc({
              lat: 45,
              latitude: 25
            });
          },
          forOf: function() {
            log('forOf test:');
            var numbers = ['one', 'two', 'three'];
            for (var number of numbers) {
              log(number);
            }
          },
          spread: function() {
            var parts = ['shoulder', 'knees'];
            var lyrics = $traceurRuntime.spread(['head'], parts, ['and', 'toes']);
            log(lyrics.join(' - '));
          },
          restParameters: function(argOne) {
            for (var args = [],
                $__1 = 1; $__1 < arguments.length; $__1++)
              args[$__1 - 1] = arguments[$__1];
            log(argOne);
            log(Array.isArray(args));
            log(("args.length = " + args.length));
          },
          anotherSpeak: function() {
            return anotherSpeak;
          },
          get age() {
            return 15;
          }
        }, {hello: function() {
            log('helllo');
          }});
      }());
      window.test = new Test(window);
      $__export("Test", Test);
    }
  };
});
