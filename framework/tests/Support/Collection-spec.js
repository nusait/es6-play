// Collection-spec.js

/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // return `true` if should compile to ES6
  return filename.indexOf(/node_modules|bundle/) === -1;
});

var customMatchers = traceur.require('framework/tests/customMatchers.js');
var helpers = traceur.require('framework/src/Wildcat/Support/helpers.js');

var Collection = traceur.require('framework/src/Wildcat/Support/Collection.js');

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});

describe('Collection', function() {

	it('is truthy', function() {
		
		expect(Collection).toBeTruthy();
	});

	it('throws an error if not an array in constructor argument', function() {

		var getCollection = function() {
			return new Collection(1);
		};
		expect(getCollection).toThrow();
	});

	it('has a length getter', function() {

		var collection = new Collection([1,2,3]);
		expect(collection.length).toBe(3);
	});

	it('has a forEach method', function() {

		var collection = new Collection([1,2,3]);
		var sum = 0;
		collection.forEach(function(value, key) {
			sum += value;
		});	

		expect(sum).toBe(6);
	});

	it('has a filter method', function() {

		var collection = new Collection([1,2,3,4]);
		var filtered = collection.filter(function(value) {
			return value > 2;
		});

		expect(filtered).toEqual([3,4]);
	});

	it('has a map method', function() {

		var collection = new Collection([1,2,3]);
		var mapped = collection.map( function(value) {
			return value + 1;
		});

		expect(mapped).toEqual([2,3,4]);
	});

	it('has a toJson method', function() {

		var collection = new Collection([1,2,3]);
		var json = collection.toJson();

		expect(json).toBe('[1,2,3]');
	});	
});