
var $console    = global.console;
var $setTimeout = global.setTimeout;

// Object
function keys(object) {
    return Object.keys(object);
}
function assign(target, ...args) {

    return Object.assign(target, ...args);
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
function wait(time = 500) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
function log(...args) {
    
    $console.log(...args);
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
var helpers = {
    keys,
    assign,
    extendProtoOf,
    implementIterator,
    value,
    isNull,
    isString,
    isUndefined,
    isDefined,
    isArray,
    defined,
    wait,
    log,
    error,
    warn,
    spawn,
    async,
    arrayIterator,
    noProto,
    terminateError,
};

module.exports = helpers;