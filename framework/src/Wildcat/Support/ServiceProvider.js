var state = require('Wildcat.Support.state');

class ServiceProvider {

    constructor(app) {

        var _ = state(this, {});
        _.app = app;
    }
    register() {
        
        // abstract
    }
    get app() {

        return state(this).app;
    }
}

module.exports = ServiceProvider;