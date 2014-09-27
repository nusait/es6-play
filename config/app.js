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

function browser() {

    if (global.navigator) {
        return global.navigator.userAgent;
    } else {
        return 'not determined';
    }
}

var configObject = {
    debug: false,
    providers: [
        /*
         * Application Service Providers...
         */
         AppServiceProvider,

        /*
         * Framework Service Providers...
         */
        LogServiceProvider,
        WindowServiceProvider,
        ErrorProvider,
        ViewServiceProvider,
        CommanderServiceProvider,
    ],
    locale: 'en',
    browser: browser(),
};

module.exports = configObject;