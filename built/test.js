System.register([], function($__export) {
  "use strict";
  var console,
      log,
      Test;
  function anotherSpeak() {
    log(("anotherSpeak: age is " + this.age));
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
            var message = arguments[0] !== (void 0) ? arguments[0] : 'default message';
            log('speak method called');
            var up = (function(str) {
              return str.toUpperCase();
            });
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
            for (var $__1 = map[Symbol.iterator](),
                $__2; !($__2 = $__1.next()).done; ) {
              var $__8 = $__2.value,
                  k = $__8[0],
                  v = $__8[1],
                  l = $__8[2];
              {
                log(k + ' + ' + v);
              }
            }
            log('map#forEach()');
            map.forEach((function(value, key, list) {
              return log(value, key, list);
            }));
            log('map#values()');
            for (var $__3 = map.values()[Symbol.iterator](),
                $__4; !($__4 = $__3.next()).done; ) {
              value = $__4.value;
              {
                log(value);
              }
            }
            log('map#entries()');
            for (var $__5 = map.entries()[Symbol.iterator](),
                $__6; !($__6 = $__5.next()).done; ) {
              value = $__6.value;
              {
                log(value);
              }
            }
            map.delete(1);
            map.forEach((function(value, key, list) {
              return log(value, key, list);
            }));
            map.clear();
            map.forEach((function(value, key, list) {
              return log(value, key, list);
            }));
          },
          destructuring: function() {
            var $__8 = {
              age: 18,
              gender: 'female'
            },
                theirAge = $__8.age,
                gender = $__8.gender;
            log(theirAge);
            log(gender);
            var $__8 = [234.234, 643.234],
                lat = $__8[0],
                lng = $__8[1];
            log(lat);
            log(lng);
            var fnc = function($__8) {
              var $__9 = $__8,
                  lat = $__9.lat,
                  lng = $__9.latitude;
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
            for (var $__1 = numbers[Symbol.iterator](),
                $__2; !($__2 = $__1.next()).done; ) {
              var number = $__2.value;
              {
                log(number);
              }
            }
          },
          spread: function() {
            var parts = ['shoulder', 'knees'];
            var lyrics = $traceurRuntime.spread(['head'], parts, ['and', 'toes']);
            log(lyrics.join(' - '));
          },
          restParameters: function(argOne) {
            for (var args = [],
                $__7 = 1; $__7 < arguments.length; $__7++)
              args[$__7 - 1] = arguments[$__7];
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
      $__export("Test", Test);
    }
  };
});
