
var autoload        = require('./autoload');
var environment     = require('./environment');
var helpers         = require('../framework/src/Wildcat/Support/helpers');
var log             = helpers.log;
var terminateError  = helpers.terminateError;
var APPSTART        = Date.now();

function instantiateNewApplication(App) {

    var app = new App();
    return app;
}
function loadEnvironment(app) {

    var env = app.detectEnvironment(environment); 
    return app; 
}
function startApp(app) {
    if (app.isLocal()) {
        log(`i am local`);
        app.on('bind', log);
    }
    app.start();
    return app;
}
function runApp(app) {

    app.run();
    return app;
}
function debugIfLocalEnvironment(app) {

    if (app.isLocal()) {

        log(`=== app.environment() is ${app.environment()}`);

        // add all IOC bindings to window
        for (var key of app) {
            if ( ! window[key] ) window[key] = app[key];
        }

        // add all helper functions to global
        window.helpers = helpers;
        for (var key in helpers) {
            // log(`adding helpers.${key} to window`);
            if ( ! window[key] ) window[key] = helpers[key];
        }
    }
    return app;
}
function complete(app) {

    var APPDONE = Date.now();
    log(`=== application loaded in ${ APPDONE - APPSTART } ms`);

    var events    = app.events;
    var introView = app.introView;

    events.on('app.*', introView.handle.bind(introView));
    introView.getBluelights();
}


autoload.loadApp()
    .then(instantiateNewApplication)
    .then(loadEnvironment)
    .then(startApp)
    .then(runApp)
    .then(debugIfLocalEnvironment)
    .then(complete)
    .catch(terminateError);
