/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
var customMatchers = traceur.require('framework/tests/customMatchers.js');
var errorConstructor 
    = traceur.require('framework/src/Wildcat/Errors/errorConstructor.js');

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});

describe('custom error instance', function() {

    it('should display custom class default message', function() {
        var TestError = errorConstructor('TestError', 'defaultMessage');
        var testError = new TestError();
        expect(testError.message).toBe('defaultMessage');
    });

    it('should allow custom message while instantiating', function() {
        var TestError = errorConstructor('TestError', 'defaultMessage');
        var testError = new TestError('custom message');
        expect(testError.message).toBe('custom message');
    });

    it('should be an instance of custom class error', function() {
        var TestError = errorConstructor('TestError');
        var testError = new TestError();
        expect(testError).toBeInstanceOf(TestError);
    });

    it('should be an instance of Error', function() {
        var TestError = errorConstructor('TestError');
        var testError = new TestError();
        expect(testError).toBeInstanceOf(Error);
    });

    it('should have a non enumerable "message" property, when specified', function() {
        var TestError = errorConstructor('TestError', 'defaultMessage');
        var testError = new TestError('custom message');
        expect([testError, 'message']).not.toBeEnumerable(); 
    });

    /*it('should call done after timeout', function(done) {
        setTimeout( function() {
            expect(1).toBe(1);
            done();
        }, 400);
    });*/
});
