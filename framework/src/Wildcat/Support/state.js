var {isUndefined, log, noProto, isString} = require('Wildcat.Support.helpers');
var observe = require('Wildcat.Support.observe');
var {ObjectObserver, Platform} = observe;

var MapConstructor = global.WeakMap || global.Map;
var map = new MapConstructor();

// log(`supports ${MapConstructor.name}`);

function state(thisArg, val, cbs, quiet = false) {

    // if not value, assume a getter for entire state object;
    if (isUndefined(val)) return map.get(thisArg);

    // if second argument is a str
    if (isString(val)) {
        setState.call(thisArg, val, cbs, quiet);
        return thisArg;
    }
    
    var _ = setStateObject.call(thisArg, val);

    if (cbs) bindObservable.call(thisArg, _, cbs);

    return _;
}
function setState(key, value, quiet) {

    var _ = state(this);
    _[key] = value;
    if (quiet) _.observer_.discardChanges();
    Platform.performMicrotaskCheckpoint();
}
function setStateObject(val) {

    map.set(this, val);
    return map.get(this);
}
function bindObservable(_, cbs) {

    _.observer_ = new ObjectObserver(_);
    _.observer_.open(onObserve.bind(this, {_, cbs}));
}
function onObserve({_, cbs}, added, removed, changed, getOldValueFn) {

    var observed = {added, removed, changed, _, cbs, getOldValueFn};
    invokeObservables.call(this, observed);
}
function invokeObservables(observed) {

    ['added', 'removed', 'changed'].forEach(type => {
        var hasCallback = (typeof observed.cbs[type] === 'function');
        var isNotEmpty  = Object.keys(observed[type]).length > 0;

        if (hasCallback && isNotEmpty) invoke.call(this, observed, type); 
    });
}
function invoke(observed, type) {

    var callback = observed.cbs[type];
    var names    = Object.keys(observed[type]);

    var payload = names.map(name => {

        return noProto({
            name    : name,
            type    : type,
            newValue: observed._[name],
            oldValue: observed.getOldValueFn(name),
        });
    });

    callback.call(this, payload);
}

module.exports = state;