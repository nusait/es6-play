// BluelightCollection.js

var Collection = require('Wildcat.Support.Collection');
var helpers = require('../../../framework/src/Wildcat/Support/helpers');

// var EventGenerator = require('../../../framework/src/Wildcat/Commander/Events/EventGenerator');

class BluelightCollection extends Collection {

	// uses EventGenerator

	constructor(...args) {
		super(...args)
		// EventGenerator.call(this);
	}
	// static *get(...args) {

	// 	var result = yield wait(0, [5,3,2]);
	// 	return new BluelightCollection(result);
	// }
	static getApplication() {

	    return this.app_;
	}
	static setApplication(app) {

	    this.app_ = app;
	    return this;
	}
}

var {extendProtoOf, /*asyncMethods, */wait} = helpers;

// extendProtoOf(BluelightCollection, EventGenerator);
// asyncMethods(BluelightCollection, 'get');

module.exports = BluelightCollection;