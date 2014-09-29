var helpers = require('Wildcat.Support.helpers');

class BluelightRepository {

    constructor(app, loader) {
        this.app = app;
        this.loader_ = loader;
    }
    get() {
        return new Promise(function(resolve, reject) {
            resolve('here are bluerights');
        });
    }
}

module.exports = BluelightRepository;