var helpers = require('../../framework/src/Wildcat/Support/helpers');

class BluelightRepository {

    constructor(app, loader) {

        this.app = app;
        this.loader = loader;
    }
    *get() {

    	var {app, loader, baseUrl} = this;
    	var {BluelightCollection} = app;
    	var url = `${baseUrl}bluelights`;

    	var {features} = yield loader.get({url, timeout: 10000});

        return new BluelightCollection(features);
    }
    get baseUrl() {

    	var {config} = this.app;
    	return config.get('app').apiBaseUrl;
    }
}

var {asyncMethods, log} = helpers;

asyncMethods(BluelightRepository.prototype, 'get');

module.exports = BluelightRepository;