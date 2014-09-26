var $Error = Error;
var {isArray} = Array;
var {keys, defineProperties} = Object;

function nonEnum(objects) {

    var writable = true;
    var enumerable = false;
    var configurable = true;

    objects = isArray(objects) ? objects : [objects];
    
    return objects.reduce((result, object) => {
        var key     = keys(object)[0];
        var value   = object[key];
        result[key] = {value, writable, enumerable, configurable};
        return result;
    }, {});
}
function addStackToObject(object, CustomError) {

    var {captureStackTrace} = $Error;

    // See https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    if (captureStackTrace) {captureStackTrace(object, CustomError);} 
    else {object.stack = (new $Error).stack || '';}

    return object;
}
function errorConstructor(name = 'CustomError', message = '') {

    class CustomError extends $Error {

        constructor(message) {

            // should not call parent's constructor
            if (message !== undefined) {
                defineProperties(this, nonEnum({message}));    
            }
            addStackToObject(this, CustomError);
        }
    }

    defineProperties(CustomError.prototype, nonEnum([{name}, {message}]));
    return CustomError;
}

module.exports = errorConstructor;