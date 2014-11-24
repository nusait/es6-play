var EventGenerator = require('../../../framework/src/Wildcat/Commander/Events/EventGenerator');
var helpers = require('Wildcat.Support.helpers');

class Bluelight {

	// uses EventGenerator

	constructor(name, incident) { 

	    this.name = name;
	    this.incident = incident;
	    EventGenerator.call(this);
	}
	static *get(...args) {
		var app = this.getApplication();
		var {bluelightRepository, bluelight} = app;

		var collection = yield bluelightRepository.get();
		log(`:: Bluelight.get 3`);
		bluelight.collection = collection;
		
		var event = app.make('bluelightsDelivered', [collection]);
		return bluelight.raise(event);
	}
	static getApplication() {

	    return this.app_;
	}
	static setApplication(app) {

	    this.app_ = app;
	    return this;
	}
}

var {log, extendProtoOf, wait, asyncMethods} = helpers;

extendProtoOf(Bluelight, EventGenerator);
asyncMethods(Bluelight, 'get');

module.exports = Bluelight;