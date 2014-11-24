/* global window */

/*
 * Application Service Providers...
 */
var AppServiceProvider = require('App.Providers.AppServiceProvider');

/*
 * Framework Service Providers...
 */
var LogServiceProvider       = require('Wildcat.Log.LogServiceProvider');
var WindowServiceProvider    = require('Wildcat.DOM.WindowServiceProvider');
var ErrorProvider            = require('Wildcat.Errors.ErrorServiceProvider');
var ViewServiceProvider      = require('Wildcat.View.ViewServiceProvider');
var CommanderServiceProvider = require('Wildcat.Commander.CommandServiceProvider');

function getNavigatorProperty(prop) {

    // deal with current bug in Cordova:
    // "Deprecated attempt to access property..."
    // ...probably will fix soon

    var navigator = global.navigator;
    var parent    = Object.getPrototypeOf(navigator);

    try {
        var result = parent[prop];
        if (parent[prop] !== undefined) return parent[prop];
        return navigator[prop];
    } catch (err) {
        return navigator[prop];
    }
}

function browser() {

    if (global.navigator) {
        return getNavigatorProperty('userAgent');
    } else {
        return 'not determined';
    }
}

var configObject = {
    apiBaseUrl: 'https://go.dosa.northwestern.edu/nuhelpapi/api/',
    debug: false,
    providers: [
        /*
         * Application Service Providers...
         */
        AppServiceProvider,

        /*
         * Framework Service Providers...
         */
        WindowServiceProvider,
        LogServiceProvider,
        ErrorProvider,
        ViewServiceProvider,
        CommanderServiceProvider,
    ],
    locale: 'en',
    browser: browser(),
};

module.exports = configObject;