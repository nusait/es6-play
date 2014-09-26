var state = require('Wildcat.Support.state');

class ConsoleLogger /*implements 'Wildcat.Contracts.Log'*/ {

    constructor($window = global) {

        var _ = state(this, {});
        _.window = $window;
        _.console = $window.console;
    }
    log(...args) {

        state(this).console.log(...args)
    }
    error(...args) {

        state(this).console.error(...args);
    }
    dir(...args) {

        state(this).console.dir(...args);
    }
    get state_() {

        return state(this);
    }

}

module.exports = ConsoleLogger;