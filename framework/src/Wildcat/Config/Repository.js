
class Repository {

    constructor(loader, environment) {
        
        this.loader = loader;
        this.environment = environment;
    }
    has() {

    }
    get(key, defaultVal) {

        var {environment} = this;
        var [namespace, group, item] = parseKey(key);

        var items = this.loader.load(environment, group, namespace);

        if ( ! item) return items;

        if (items[item] !== undefined) return items[item];

        return defaultVal;
    }
    set() {

    }
}

// private functions ======================================

function parseKey(key) {

    var segments = key.split('.');

    return parseBasicSegments(segments);
}

function parseBasicSegments(segments) {

    var group = segments[0];

    if (segments.length === 1) {
        return [null, group, null];
    } else {
        return [null, group, segments[1]];
    }
}

module.exports = Repository;