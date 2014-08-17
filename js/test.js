var console, log;

function anotherSpeak() {
    log(`anotherSpeak: age is ${this.age}`);
}

class Test {
    constructor($window) {
        console = $window.console;
        log = console.log.bind(console);
        log('Test being constructed');
    }
    speak(message = 'default message') {
        log('speak method called');
        var up = str => str.toUpperCase();

        log(`My ${up('age')} is ${this.age}`);
        this.anotherSpeak();
    }
    run() {
        this.speak('hey, what up?'); 
        this.restParameters('one', 'two', 'three');
        this.spread();
        this.forOf();
        this.destructuring();
        this.mapObj();
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
    static hello() {
  
        log('helllo');
    }
}

export {Test};