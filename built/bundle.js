(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var async = require('async');
var console;
var log;
var $Promise;
var $window;
var Test = function Test(windowArg) {
  $window = windowArg;
  console = $window.console;
  log = console.log.bind(console);
  $Promise = $window.Promise;
  log('Test being constructed');
};
($traceurRuntime.createClass)(Test, {
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
  testAsync: function() {
    var test = async($traceurRuntime.initGeneratorFunction(function $__10() {
      var blah;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = 2;
              return wait(1000);
            case 2:
              blah = $ctx.sent;
              $ctx.state = 4;
              break;
            case 4:
              log("waited in between");
              $ctx.state = 10;
              break;
            case 10:
              $ctx.state = 6;
              return wait(2000);
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              log("finally all done!");
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    }));
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
    for (var $__1 = map[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var $__8 = $traceurRuntime.assertObject($__2.value),
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
      var $__9 = $traceurRuntime.assertObject($__8),
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
function anotherSpeak() {
  log(("anotherSpeak: age is " + this.age));
}
function wait() {
  var time = arguments[0] !== (void 0) ? arguments[0] : 500;
  return new $Promise((function(resolve) {
    log(("starting to wait " + time));
    setTimeout((function() {
      log(("just waited " + time + "."));
      resolve();
    }), time);
  }));
}
module.exports = Test;


},{"async":2}],2:[function(require,module,exports){
function async(makeGenerator) {
	
    return function () {
    	var $Promise = Promise;
        var generator = makeGenerator.apply(this, arguments);

        function handle(result) {
            // result => { done: [Boolean], value: [Object] }
            if (result.done) return $Promise.resolve(result.value);

            return $Promise.resolve(result.value).then(function (res) {
                return handle(generator.next(res));
            }, function (err) {
                return handle(generator.throw(err));
            });
        }

        try {
            return handle(generator.next());
        } catch (ex) {
            return $Promise.reject(ex);
        }
    };  
}

module.exports = async;
},{}],3:[function(require,module,exports){
var Test = require('Nusait/Utils/Test');

var test = new Test(window);
test.run();
test.testAsync();

},{"Nusait/Utils/Test":1}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9MaWJyYXJ5L1dlYlNlcnZlci9Eb2N1bWVudHMvZXM2LXBsYXkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9MaWJyYXJ5L1dlYlNlcnZlci9Eb2N1bWVudHMvZXM2LXBsYXkvanMvTnVzYWl0L1V0aWxzL1Rlc3QuanMiLCIvTGlicmFyeS9XZWJTZXJ2ZXIvRG9jdW1lbnRzL2VzNi1wbGF5L2pzL2FzeW5jLmpzIiwiL0xpYnJhcnkvV2ViU2VydmVyL0RvY3VtZW50cy9lczYtcGxheS9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxLQUFJLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUU1QixBQUFJLEVBQUEsQ0FBQSxPQUFNLENBQUM7QUFDWCxBQUFJLEVBQUEsQ0FBQSxHQUFFLENBQUM7QUFDUCxBQUFJLEVBQUEsQ0FBQSxRQUFPLENBQUM7QUFDWixBQUFJLEVBQUEsQ0FBQSxPQUFNLENBQUM7U0FFWCxTQUFNLEtBQUcsQ0FDTyxTQUFRLENBQUc7QUFDbkIsUUFBTSxFQUFJLFVBQVEsQ0FBQztBQUNuQixRQUFNLEVBQUksQ0FBQSxPQUFNLFFBQVEsQ0FBQztBQUN6QixJQUFFLEVBQUksQ0FBQSxPQUFNLElBQUksS0FBSyxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDL0IsU0FBTyxFQUFJLENBQUEsT0FBTSxRQUFRLENBQUM7QUFDMUIsSUFBRSxBQUFDLENBQUMsd0JBQXVCLENBQUMsQ0FBQztBQUNqQzs7QUFDQSxNQUFJLENBQUosVUFBTSxBQUEwQjtNQUExQixRQUFNLDZDQUFJLGtCQUFnQjtBQUM1QixNQUFFLEFBQUMsQ0FBQyxxQkFBb0IsQ0FBQyxDQUFDO0FBQzFCLEFBQUksTUFBQSxDQUFBLEVBQUMsSUFBSSxTQUFBLEdBQUU7V0FBSyxDQUFBLEdBQUUsWUFBWSxBQUFD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Ryw2Q0FBSSxJQUFFO0FBQ25CLE9BQU8sSUFBSSxTQUFPLEFBQUMsRUFBQyxTQUFBLE9BQU07QUFDdEIsTUFBRSxBQUFDLEVBQUMsbUJBQW1CLEVBQUMsS0FBRyxFQUFHLENBQUM7QUFDL0IsYUFBUyxBQUFDLEVBQUMsU0FBQSxBQUFDLENBQUs7QUFDYixRQUFFLEFBQUMsRUFBQyxjQUFjLEVBQUMsS0FBRyxFQUFDLElBQUUsRUFBQyxDQUFDO0FBQzNCLFlBQU0sQUFBQyxFQUFDLENBQUM7SUFDYixFQUFHLEtBQUcsQ0FBQyxDQUFDO0VBQ1osRUFBQyxDQUFDO0FBQ047QUFDQSxLQUFLLFFBQVEsRUFBSSxLQUFHLENBQUM7QUFBQTs7O0FDMUpyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcblxudmFyIGNvbnNvbGU7XG52YXIgbG9nO1xudmFyICRQcm9taXNlO1xudmFyICR3aW5kb3c7XG5cbmNsYXNzIFRlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHdpbmRvd0FyZykge1xuICAgICAgICAkd2luZG93ID0gd2luZG93QXJnO1xuICAgICAgICBjb25zb2xlID0gJHdpbmRvdy5jb25zb2xlO1xuICAgICAgICBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgICAgICAkUHJvbWlzZSA9ICR3aW5kb3cuUHJvbWlzZTtcbiAgICAgICAgbG9nKCdUZXN0IGJlaW5nIGNvbnN0cnVjdGVkJyk7XG4gICAgfVxuICAgIHNwZWFrKG1lc3NhZ2UgPSAnZGVmYXVsdCBtZXNzYWdlJykge1xuICAgICAgICBsb2coJ3NwZWFrIG1ldGhvZCBjYWxsZWQnKTtcbiAgICAgICAgdmFyIHVwID0gc3RyID0+IHN0ci50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgIGxvZyhgTXkgJHt1cCgnYWdlJyl9IGlzICR7dGhpcy5hZ2V9YCk7XG4gICAgICAgIHRoaXMuYW5vdGhlclNwZWFrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIFJ1bnMgdGhlIHByb2dyYW1cblxuICAgIFRoZSBtZXRob2Qgd2lsbCBydW4gdGhlIGVudGlyZSBwcm9ncmFtXG5cbiAgICBAbWV0aG9kIHJ1blxuICAgICoqL1xuICAgIHJ1bigpIHtcbiAgICAgICAgdGhpcy5zcGVhaygnaGV5LCB3aGF0IHVwPycpOyBcbiAgICAgICAgdGhpcy5yZXN0UGFyYW1ldGVycygnb25lJywgJ3R3bycsICd0aHJlZScpO1xuICAgICAgICB0aGlzLnNwcmVhZCgpO1xuICAgICAgICB0aGlzLmZvck9mKCk7XG4gICAgICAgIHRoaXMuZGVzdHJ1Y3R1cmluZygpO1xuICAgICAgICB0aGlzLm1hcE9iaigpO1xuICAgIH1cbiAgICB0ZXN0QXN5bmMoKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gYXN5bmMoIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgYmxhaCA9IHlpZWxkIHdhaXQoMTAwMCk7XG4gICAgICAgICAgICBsb2coYHdhaXRlZCBpbiBiZXR3ZWVuYCk7XG4gICAgICAgICAgICB5aWVsZCB3YWl0KDIwMDApO1xuICAgICAgICAgICAgbG9nKGBmaW5hbGx5IGFsbCBkb25lIWApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0ZXN0KCk7XG4gICAgfVxuICAgIGdldCB3YWl0KCkge1xuXG4gICAgICAgIHJldHVybiB3YWl0O1xuICAgIH1cbiAgICBtYXBPYmooKSB7XG4gICAgICAgIC8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9cbiAgICAgICAgLy8gZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwXG4gICAgICAgIFxuICAgICAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIga2V5LCB2YWx1ZTtcblxuICAgICAgICBtYXAuc2V0KDEsICdqaWsnKTtcbiAgICAgICAgbG9nKG1hcC5oYXMoMSkpO1xuICAgICAgICBtYXAuc2V0KDIsICdueWknKTtcbiAgICAgICAgbG9nKG1hcC5nZXQoMSkpO1xuICAgICAgICBsb2cobWFwLnNpemUpO1xuXG4gICAgICAgIGxvZygnI2Zvck9mIG9uIG1hcCcpO1xuICAgICAgICBmb3IgKHZhciBbaywgdiwgbF0gb2YgbWFwKSB7XG4gICAgICAgICAgbG9nKGsgKyAnICsgJyArIHYpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nKCdtYXAjZm9yRWFjaCgpJyk7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5LCBsaXN0KSA9PiBsb2codmFsdWUsIGtleSwgbGlzdCkpO1xuXG4gICAgICAgIGxvZygnbWFwI3ZhbHVlcygpJyk7XG4gICAgICAgIGZvcih2YWx1ZSBvZiBtYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGxvZyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2coJ21hcCNlbnRyaWVzKCknKTtcbiAgICAgICAgZm9yKHZhbHVlIG9mIG1hcC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxvZyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXAuZGVsZXRlKDEpO1xuICAgICAgICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSwgbGlzdCkgPT4gbG9nKHZhbHVlLCBrZXksIGxpc3QpKTtcbiAgICAgICAgbWFwLmNsZWFyKCk7XG4gICAgICAgIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5LCBsaXN0KSA9PiBsb2codmFsdWUsIGtleSwgbGlzdCkpO1xuICAgIH1cbiAgICBkZXN0cnVjdHVyaW5nKCkge1xuICAgICAgICB2YXIge2FnZTogdGhlaXJBZ2UsIGdlbmRlcn0gPSB7XG4gICAgICAgICAgICBhZ2U6IDE4LFxuICAgICAgICAgICAgZ2VuZGVyOiAnZmVtYWxlJyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nKHRoZWlyQWdlKTtcbiAgICAgICAgbG9nKGdlbmRlcik7XG5cbiAgICAgICAgdmFyIFtsYXQsIGxuZ10gPSBbMjM0LjIzNCwgNjQzLjIzNF07XG4gICAgICAgIGxvZyhsYXQpO1xuICAgICAgICBsb2cobG5nKTtcblxuICAgICAgICB2YXIgZm5jID0gZnVuY3Rpb24oe2xhdCwgbGF0aXR1ZGU6bG5nfSkge1xuICAgICAgICAgICAgbG9nKCdkZXN0cnVjdHVyaW5nIHBhcmFtZXRlcnM6Jyk7XG4gICAgICAgICAgICBsb2cobGF0KTtcbiAgICAgICAgICAgIGxvZyhsbmcpO1xuICAgICAgICB9O1xuICAgICAgICBmbmMoe2xhdDogNDUsIGxhdGl0dWRlOiAyNX0pO1xuICAgIH1cbiAgICBmb3JPZigpIHtcbiAgICAgICAgbG9nKCdmb3JPZiB0ZXN0OicpO1xuICAgICAgICB2YXIgbnVtYmVycyA9IFsnb25lJywndHdvJywndGhyZWUnXTtcbiAgICAgICAgZm9yICh2YXIgbnVtYmVyIG9mIG51bWJlcnMpIHtcbiAgICAgICAgICAgIGxvZyhudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwcmVhZCgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gWydzaG91bGRlcicsICdrbmVlcyddO1xuICAgICAgICB2YXIgbHlyaWNzID0gWydoZWFkJywgLi4ucGFydHMsICdhbmQnLCAndG9lcyddO1xuICAgICAgICBsb2cobHlyaWNzLmpvaW4oJyAtICcpKTtcbiAgICB9XG4gICAgcmVzdFBhcmFtZXRlcnMoYXJnT25lLCAuLi5hcmdzKSB7XG4gICAgICAgIGxvZyhhcmdPbmUpO1xuICAgICAgICBsb2coQXJyYXkuaXNBcnJheShhcmdzKSk7XG4gICAgICAgIGxvZyhgYXJncy5sZW5ndGggPSAke2FyZ3MubGVuZ3RofWApO1xuICAgIH1cbiAgICBhbm90aGVyU3BlYWsoKSB7XG4gICAgICAgIHJldHVybiBhbm90aGVyU3BlYWs7XG4gICAgfVxuICAgIGdldCBhZ2UoKSB7XG4gICAgICAgIHJldHVybiAxNTtcbiAgICB9XG4gICAgLyoqXG4gICAgaGVsbG9cblxuICAgIFByaW50cyBvdXQgJ2hlbGxvJyB0byB0aGUgY29uc29sZVxuXG4gICAgQG1ldGhvZFxuICAgICoqL1xuICAgIHN0YXRpYyBoZWxsbygpIHtcbiAgXG4gICAgICAgIGxvZygnaGVsbGxvJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gYW5vdGhlclNwZWFrKCkge1xuXG4gICAgbG9nKGBhbm90aGVyU3BlYWs6IGFnZSBpcyAke3RoaXMuYWdlfWApO1xufVxuZnVuY3Rpb24gd2FpdCh0aW1lID0gNTAwKSB7XG4gICAgcmV0dXJuIG5ldyAkUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgbG9nKGBzdGFydGluZyB0byB3YWl0ICR7dGltZX1gKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2coYGp1c3Qgd2FpdGVkICR7dGltZX0uYCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgIH0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBUZXN0OyIsImZ1bmN0aW9uIGFzeW5jKG1ha2VHZW5lcmF0b3IpIHtcblx0XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBcdHZhciAkUHJvbWlzZSA9IFByb21pc2U7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKHJlc3VsdCkge1xuICAgICAgICAgICAgLy8gcmVzdWx0ID0+IHsgZG9uZTogW0Jvb2xlYW5dLCB2YWx1ZTogW09iamVjdF0gfVxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSByZXR1cm4gJFByb21pc2UucmVzb2x2ZShyZXN1bHQudmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gJFByb21pc2UucmVzb2x2ZShyZXN1bHQudmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yLm5leHQocmVzKSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShnZW5lcmF0b3IudGhyb3coZXJyKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KCkpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgcmV0dXJuICRQcm9taXNlLnJlamVjdChleCk7XG4gICAgICAgIH1cbiAgICB9OyAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmM7IiwidmFyIFRlc3QgPSByZXF1aXJlKCdOdXNhaXQvVXRpbHMvVGVzdCcpO1xuXG52YXIgdGVzdCA9IG5ldyBUZXN0KHdpbmRvdyk7XG50ZXN0LnJ1bigpO1xudGVzdC50ZXN0QXN5bmMoKTtcbiJdfQ==
