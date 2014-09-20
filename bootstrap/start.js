
var autoload        = require('bootstrap.autoload');
var environment     = require('bootstrap.environment');
var helpers         = require('Wildcat.Support.helpers');
var log             = helpers.log;
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
function complete(app) {
    var APPDONE = Date.now();
    log(`=== application loaded in ${ APPDONE - APPSTART } ms`);
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
            if ( ! window[key] ) window[key] = helpers[key];
        }
    }
    return app;
}
function appFailedToLoad(error) {

    log('appFailedToLoad');
    setTimeout( function() {
        throw error;
    }, 10);   
}

autoload.loadApp()
    .then(instantiateNewApplication)
    .then(loadEnvironment)
    .then(startApp)
    .then(runApp)
    .then(debugIfLocalEnvironment)
    .then(complete)
    .catch(appFailedToLoad);
