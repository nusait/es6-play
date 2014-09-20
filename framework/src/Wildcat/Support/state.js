var {isUndefined} = require('Wildcat.Support.helpers');

var MapConstructor = global.WeakMap || global.Map;

console.log(`supports ${MapConstructor.name}`);

var map = new MapConstructor();

function state(obj, val) {
    if (isUndefined(val)) return map.get(obj);
    
    map.set(obj, val);
    return map.get(obj);
}

module.exports = state;