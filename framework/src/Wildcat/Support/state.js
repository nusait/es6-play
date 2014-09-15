var {isUndefined} = require('Wildcat.Support.helpers');

var map = new Map();

function state(obj, val) {
    if (isUndefined(val)) return map.get(obj);
    
    map.set(obj, val);
    return map.get(obj);
}

module.exports = state;