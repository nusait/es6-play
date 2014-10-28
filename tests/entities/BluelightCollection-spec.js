// BluelightCollection-spec.js

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

describe('BluelightCollection', function() {

	var app;

	beforeEach( function() {

		app = createTestApplication();
	});

    it('constructor has to be truthy', function() {

        expect(app.BluelightCollection).toBeTruthy();
    });

    // it('has static async method "get"', function(done) {

    // 	var BluelightCollection = app.BluelightCollection;

    // 	BluelightCollection.get()
    // 		.then( function(collection) {
    // 			// expect(collection).toBeInstanceOf(BluelightCollection);
    // 			expect(collection.getItems()).toEqual([5,3,2]);
    // 			done();
    // 		});
    // });
});