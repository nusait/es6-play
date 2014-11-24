
var autoload        = require('./autoload');
var environment     = require('./environment');
var helpers         = require('../framework/src/Wildcat/Support/helpers');
var log             = helpers.log;
var terminateError  = helpers.terminateError;
var APPSTART        = Date.now();

function instantiateNewApplication(App) {
    // alert('instantiateNewApplication');
    var app = new App();
    return app;
}
function loadEnvironment(app) {

    var env = app.detectEnvironment(environment); 
    return app; 
}
function startApp(app) {
    
    app.start();
    return app;
}
function runApp(app) {

    app.run(); 
    return app;
}
function complete(app) {

    var APPDONE = Date.now();
    log(`::=== application loaded in ${ APPDONE - APPSTART } ms`);
}

// quick stamp
var htmlCL = document.documentElement.classList;
if (global.cordova) {
    htmlCL.add(cordova.platformId);
} else {
    htmlCL.add('browser');    
}

autoload.loadApp()
    .then(instantiateNewApplication)
    .then(loadEnvironment)
    .then(startApp)
    .then(runApp)
    .then(complete)
    .catch(terminateError);
