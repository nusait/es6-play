
var $console    = global.console;
var $setTimeout = global.setTimeout;

// Object
function keys(object) {

    if (object instanceof Map) {
        var result = [];
        object.forEach((value, key) => {
            result.push(key);
        }); 
        return result;
    }

    return Object.keys(object);
}
function values(object = {}) {

    if (object instanceof Map) {
        var result = [];
        object.forEach((value, key) => {
            result.push(value);
        });
        return result;
    }
    return keys(object).map(key => object[key]);
}
function entries(object = {}) {

    if (object instanceof Map) {
        var result = [];
        object.forEach((value, key) => {
            result.push([key, value]);
        });
        return result;
    }

    return keys(object).map(key => [key, object[key]]);
}
function assign(target, ...sources) {

    var source, temp, props, prop;

    for (source of sources) {

        if ( isArray(source) ) {

            temp = {};
            [source, ...props] = source;
            for (prop of props) temp[prop] = source[prop];
            assign(target, temp);

        } else Object.assign(target, source);
    }
    return target;

    // return Object.assign(target, ...args);
}
function extendProtoOf(target, source, key = []) {

    if (isString(key)) {
        target.prototype[key] = source.prototype[key];
        return;
    }
    
    var sourceKeys = keys(source.prototype);
    for (var key of sourceKeys) {
        target.prototype[key] = source.prototype[key];   
    }
}
function implementIterator(sourceClass) {

    var $prototype = sourceClass.prototype;
    $prototype[Symbol.iterator] = $prototype.getIterator;
}
function value(val) {

    return (typeof val === 'function') ? val() : val;
}
function isNull(val) {

    return val === null;
}
function isString(val) {

    return typeof val === 'string';
}
function isFunction(val) {

    return typeof val === 'function';
}
function isUndefined(val) {

    return val === undefined;
}
function isDefined(val) {

    return ( ! isUndefined(val));
}
function isArray(val) {

    return Array.isArray(val);
}
function defined(val, $default) {

    return isDefined(val) ? val : $default;
}
function wait(time = 500, ...args) {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(...args);
        }, time);
    });
}
function log(...args) {
    
    $console.log(...args);
}
function dir(...args) {

    $console.dir(...args);
}
function error(...args) {

    $console.error(...args);
}
function warn(...args) {
    
    $console.warn(...args);
}
function spawn(makeGenerator) {

    var promise = async(makeGenerator);

    promise().then(log, terminateError);
}
function async(makeGenerator) {

    return function () {
        var $Promise = Promise;
        var generator = makeGenerator.apply(this, arguments);

        function handle(result) {

            var done  = result.done;
            var value = result.value;

            if (done) return $Promise.resolve(value); 

            return $Promise.resolve(value).then(function (res) {
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
function asyncMethods(object, ...methods) {

    for (var method of methods) {

        object[method] = async(object[method]);
    }
}
function arrayIterator(items = []) {
    
    var i     = 0;
    var len   = items.length;

    return {
        next() {
            var value, notDone;
            if (notDone = i < len) value = items[i++];
            return {value, done: !notDone};
        }
    };
}
function noProto(source = {}) {

    var empty = Object.create(null);
    Object.assign(empty, source);
    return empty;
}
function terminateError(error) {

    $setTimeout(() => {
        warn(`from [terimateError]:`);
        warn(error.stack);
        throw error;    
    }, 0);
}
function mapFrom(object = {}) {

    if (object instanceof Map) return object;

    var map = new Map();
    var objectKeys = keys(object);

    return objectKeys.reduce((result, key) => {
        var value = object[key];
        map.set(key, value);
        return map;
    }, map);
}
function ucfirst(str) {

  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
}
function first(array) {

    return array[0];
}
function last(array) {

    var length    = array.length;
    var lastIndex = length - 1;
    return array[lastIndex];
}
function lastSegment(array) {

    var segments = array.split('.');
    return last(segments);
}

var helpers = {
    keys,
    values,
    entries,
    assign,
    extendProtoOf,
    implementIterator,
    value,
    isNull,
    isString,
    isFunction,
    isUndefined,
    isDefined,
    isArray,
    defined,
    wait,
    log,
    dir,
    error,
    warn,
    spawn,
    async,
    asyncMethods,
    arrayIterator,
    noProto,
    terminateError,
    mapFrom,
    ucfirst,
    first,
    last,
    lastSegment,
};

module.exports = helpers;