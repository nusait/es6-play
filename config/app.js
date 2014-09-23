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
var ViewServiceProvider      = require('Wildcat.View.ViewServiceProvider');
var CommanderServiceProvider = require('Wildcat.Commander.CommandServiceProvider');

module.exports = {
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
        ViewServiceProvider,
        CommanderServiceProvider,
    ],
    locale: 'en',
    get browser() {return window.navigator.userAgent;},
};