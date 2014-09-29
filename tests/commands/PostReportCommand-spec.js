/* global describe, expect, it, beforeEach, afterEach, jasmine */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // return `true` if should compile to ES6
  return filename.indexOf(/node_modules|bundle/) === -1;
});
var customMatchers = require('../../framework/tests/customMatchers.js');
var log = console.log.bind(console);
var createTestApplication = require('../../framework/src/Wildcat/Foundation/Testing/createTestApplication.js');

app = createTestApplication();

beforeEach(function() {
    
    jasmine.addMatchers(customMatchers);
});

describe('postReportCommand', function() {

    it('is truthy', function() {

        expect(app.postReportCommand).toBeTruthy();
    });

    it('raises a `reportWasPosted` event', function(done) {

        var command = app.make('postReportCommand', ['Joe', 'some-incident']);     
        app.execute(command); 
        app.events.on('reportWasPosted', function(e) {
            expect(e.type).toBe('reportWasPosted');
            expect(e.value).toBeInstanceOf(app.Report);
            expect(e.value.name).toBe('Joe');
            expect(e.value.incident).toBe('some-incident');
            done();
        });
    });
});