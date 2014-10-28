/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // return `true` if should compile to ES6
  return filename.indexOf(/node_modules|bundle/) === -1;
});
var customMatchers   = require('../framework/tests/customMatchers.js');
var createTestApplication = require('../framework/src/Wildcat/Foundation/Testing/createTestApplication.js');
var log = console.log.bind(console);

console.log(createTestApplication);
app = createTestApplication();

beforeEach(function() {
    jasmine.addMatchers(customMatchers);
});

describe('app instance', function() {

    it('is truthy', function() {
        expect(app).toBeTruthy();
    });

    it('has `start` method', function() {
        expect(typeof app.start).toBe('function');
    });

    it('has a `run` method', function() {
        expect(typeof app.run).toBe('function');
    });

    it('has a `environment` method', function() {
        expect(app.environment).toBeAFunction();
    });

    it('should have the environment set as "testing"', function() {
        expect(app.environment()).toBe('testing');
    });

    it('should have browser config set as "console" while testing', function() {
        var browser = app.config.get('app.browser');
        expect(browser).toBe('console');
    });
});