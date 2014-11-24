// Application.js

var BaseApplication = require('../framework/src/Wildcat/Foundation/Application');
var helpers         = require('../framework/src/Wildcat/Support/helpers');

var {log} = helpers;

class Application extends BaseApplication {

	start() {
	    log('::#start class Application extends BaseApplication');

	    if (this.isLocal()) {
	        log(`::i am local!!`);
	        this.on('bind', log);
	    }

	    super();
	}

	run() {
		log('::#run class Application extends BaseApplication');
		super();

		this.debugOnGlobal();
		this.proceed();
	}

	proceed() {

		var {viewManager} = this;
		viewManager.init();



		// log(`:: proceed`);
		// events.on('app.*', introView.handle.bind(introView));
		// introView.getBluelights().then(function() {
		//     log('::got bluelights');
		// });
		
	}

	debugOnGlobal() {
		log(`debugOnGlobal`);

		var app = this;

		if (app.isLocal()) {

		    log(`=== NEW app.environment() is ${app.environment()}`);

		    // add all IOC bindings to window
		    for (var key of app) {
		        if ( ! global[key] ) global[key] = app[key];
		    }

		    // add all helper functions to global
		    global.helpers = helpers;
		    for (var key in helpers) {
		        // log(`adding helpers.${key} to global`);
		        if ( ! global[key] ) global[key] = helpers[key];
		    }
		}
		return app;
	}

}



module.exports = Application;