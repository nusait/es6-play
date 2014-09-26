/* global describe, expect, it, beforeEach, afterEach, jasmine */
var traceur = require('traceur');
var customMatchers = traceur.require('./framework/tests/customMatchers.js');
var helpers 
    = traceur.require('framework/src/Wildcat/Support/helpers.js');

var isString = helpers.isString;

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});

console.log(jasmine);

describe('toString helper', function() {

    it('identifies a string', function() {
        expect( isString('some-random-string') ).toBe(true);
    });

    it('returns false for a number', function() {
        expect( isString(4) ).toBe(false);
    });

    it('returns false for null', function() {
        expect( isString(null) ).toBe(false);
    });

    it('returns false for undefined', function() {
        expect( isString(undefined) ).toBe(false);
    });

    it('returns false for an array', function() {
        expect( isString([])).toBe(false);
    });
});