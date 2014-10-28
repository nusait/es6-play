/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // return `true` if should compile to ES6
  return filename.indexOf(/node_modules|bundle/) === -1;
});
var customMatchers = require('../../framework/tests/customMatchers.js');
var log = console.log.bind(console);
var createTestApplication = require('../../framework/src/Wildcat/Foundation/Testing/createTestApplication.js');

beforeEach(function() {
    
    jasmine.addMatchers(customMatchers);
});

describe('retrieveBluelightsCommand', function() {

	var app;

	beforeEach( function() {

		app = createTestApplication();
	});

    it('is truthy', function() {

        expect(app.retrieveBluelightsCommand).toBeTruthy();
    });

    it('has property as passed to command constructor', function() {

    	var command = app.make('retrieveBluelightsCommand', [{test: 'yes'}]);
    	expect(command.test).toBe('yes');
    });

    it('calls handle on fake retrieveBluelightsCommandHandler in IoC', function() {

    	var handler = {handle: function() {} };
    	spyOn(handler, 'handle');
    	app.bindShared('retrieveBluelightsCommandHandler', () => handler);

    	var command = app.make('retrieveBluelightsCommand', [{test: 'yes'}]);
    	app.execute(command);

    	expect(handler.handle).toHaveBeenCalledWith(command);
    });

    it('calls handle on real retrieveBluelightsCommandHandler in IoC', function() {

    	var handler = app.retrieveBluelightsCommandHandler;
    	spyOn(handler, 'handle');

    	var command = app.make('retrieveBluelightsCommand', [{test: 'yes'}]);
    	app.execute(command);

    	expect(handler.handle).toHaveBeenCalledWith(command);
    });

    it('to have app property b/c of parent command handler class', function() {

        var handler = app.retrieveBluelightsCommandHandler;
        expect(handler.app).toBe(app);
    });

    // it('raises a `reportWasPosted` event', function(done) {

    //     var command = app.make('retrieveBluelightsCommand', ['Joe', 'some-incident']);     
    //     app.execute(command); 
    //     app.events.on('reportWasPosted', function(e) {
    //         expect(e.type).toBe('reportWasPosted');
    //         expect(e.value).toBeInstanceOf(app.Report);
    //         expect(e.value.name).toBe('Joe');
    //         expect(e.value.incident).toBe('some-incident');
    //         done();
    //     });
    // });
});