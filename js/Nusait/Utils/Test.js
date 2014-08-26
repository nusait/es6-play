/**
@module Nusait.Services.Test
**/

var {async} = require('Nusait.Services.async');

var console;
var log;
var $Promise;
var $window;

class Test {
    /**
    @class Test
    @constructor
    @param {Object} windowArg An object that implements the DOM window
    **/
    constructor(windowArg) {
        $window = windowArg;
        console = $window.console;
        log = console.log.bind(console);
        $Promise = $window.Promise;
        log('Test being constructed');
    }
    /**
    @method speak
    @param message='default message' {String} a message to output
    **/
    speak(message = 'defaultmessage') {
        log('speak method called');
        var up = str => str.toUpperCase();

        log(`My ${up('age')} is ${this.age}`);
        this.anotherSpeak();
    }
    /**
    Runs the program

    The method will run the entire program

    @method run
    **/
    run() {
        this.speak('hey, what up?'); 
        this.restParameters('one', 'two', 'three');
        this.spread();
        this.forOf();
        this.destructuring();
        this.mapObj();
        this.shorthandMethods();
    }
    /**
    testAsync

    Tests how well generators and promises can be combined.

    @method testAsync
    **/
    testAsync() {
        var test = async( function* () {
            var blah = yield wait(1000);
            log(`waited in between`);
            yield wait(2000);
            log(`finally all done!`);
        });

        test();
    }
    shorthandMethods() {
        log('test shorthandMethods');
        var obj = {
            firstMethod() {
                return 'hey';
            },
            secondMethod() {
                return 'hey2';
            },  
        };

        log(obj.firstMethod());
        log(obj.secondMethod());
    }
    get wait() {

        return wait;
    }
    mapObj() {
        // see https://developer.mozilla.org/en-US/
        // docs/Web/JavaScript/Reference/Global_Objects/Map
        
        var map = new Map();
        var key, value;

        map.set(1, 'jik');
        log(map.has(1));
        map.set(2, 'nyi');
        log(map.get(1));
        log(map.size);

        log('#forOf on map');
        for (var [k, v, l] of map) {
          log(k + ' + ' + v);
        }

        log('map#forEach()');
        map.forEach((value, key, list) => log(value, key, list));

        log('map#values()');
        for(value of map.values()) {
            log(value);
        }

        log('map#entries()');
        for(value of map.entries()) {
            log(value);
        }

        map.delete(1);
        map.forEach((value, key, list) => log(value, key, list));
        map.clear();
        map.forEach((value, key, list) => log(value, key, list));
    }
    destructuring() {
        var {age: theirAge, gender} = {
            age: 18,
            gender: 'female',
        };
        log(theirAge);
        log(gender);

        var [lat, lng] = [234.234, 643.234];
        log(lat);
        log(lng);

        var fnc = function({lat, latitude:lng}) {
            log('destructuring parameters:');
            log(lat);
            log(lng);
        };
        fnc({lat: 45, latitude: 25});
    }
    forOf() {
        log('forOf test:');
        var numbers = ['one','two','three'];
        for (var number of numbers) {
            log(number);
        }
    }
    spread() {
        var parts = ['shoulder', 'knees'];
        var lyrics = ['head', ...parts, 'and', 'toes'];
        log(lyrics.join(' - '));
    }
    restParameters(argOne, ...args) {
        log(argOne);
        log(Array.isArray(args));
        log(`args.length = ${args.length}`);
    }
    anotherSpeak() {
        return anotherSpeak;
    }
    get age() {
        return 15;
    }
    /**
    hello

    Prints out 'hello' to the console

    @method hello
    @static
    **/
    static hello() {
  
        log('helllo');
    }
}
function anotherSpeak() {

    log(`anotherSpeak: age is ${this.age}`);
}
function wait(time = 500) {
    return new $Promise(resolve => {
        log(`starting to wait ${time}`);
        setTimeout(() => {
            log(`just waited ${time}.`);
            resolve();
        }, time);
    });
}

exports.Test = Test;