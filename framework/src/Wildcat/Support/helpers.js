/* global window */

// Object
function keys(object) {
    return Object.keys(object);
}
function assign(object, ...args) {
    return Object.assign(...args);
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
    return (typeof val) === 'string';
}
function isUndefined(val) {

    return val === undefined;
}
function isDefined(val) {

    return ( ! isUndefined(val));
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
    var console = window.console;
    console.log(...args);
}
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
    defined,
    wait,
    log,
    async,
    arrayIterator,
    noProto,
};

module.exports = helpers;