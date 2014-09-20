/* global window */

/*
 * Application Service Providers...
 */

/*
 * Framework Service Providers...
 */
var LogServiceProvider    = require('Wildcat.Log.LogServiceProvider');
var WindowServiceProvider = require('Wildcat.DOM.WindowServiceProvider');
var ViewServiceProvider   = require('Wildcat.View.ViewServiceProvider');

module.exports = {
    debug: false,
    providers: [
        /*
         * Application Service Providers...
         */


        /*
         * Framework Service Providers...
         */
        LogServiceProvider,
        WindowServiceProvider,
        ViewServiceProvider,
    ],
    locale: 'en',
    get browser() {return window.navigator.userAgent;},
};