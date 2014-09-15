/* global window */

/*
 * Application Service Providers...
 */

/*
 * Framework Service Providers...
 */
var LogServiceProvider = require('Wildcat.Log.LogServiceProvider');

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

    ],
    locale: 'en',
    get browser() {return window.navigator.userAgent;},
};