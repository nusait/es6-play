var autoload        = require('./autoload');
var environment     = require('./environment');
var helpers         = require('Wildcat.Support.helpers');
var log             = helpers.log;
var APPSTART        = Date.now();

function instantiateNewApplication(App) {

    var app = new App();
    app.on('bind', e => log(`bind event: ${e.abstract}`));
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
    log(`application loaded in ${ APPDONE - APPSTART } ms`);
}
function debugIfLocalEnvironment(app) {

    if (app.isLocal()) {
        log('! environment is local, add container values to window');
        
        for (var key of app) {
            log(`key here: ${key}`);
            if ( ! window[key] ) window[key] = app[key];
        }
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
