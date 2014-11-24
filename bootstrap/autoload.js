/* global document, window */

var rsvpPromise = require('rsvp').Promise;
var {document, console, localStorage = {}}  = global;
var {head}      = document;
var $Promise    = global.Promise || rsvpPromise;
var protocol    = 'http:';
// var host        = 'go.ngrok.com';
// var host        = '192.168.10.10';
// var host        = 'es6-play.app';
// var origin      = `${protocol}//${host}/`;
var origin = '';

if (localStorage.host) origin = `${protocol}//${localStorage.host}/`;

var log         = console.log.bind(console);

var {body} = document;
var out = body.insertAdjacentHTML.bind(body, 'beforeend');
var now = Date.now();

var autoload = {

    supportsLinkOnload() {

        var {navigator} = global;

        if ( ! navigator) return true;
        
        if (/Android 4\.[0-3]/.test(navigator.userAgent)) return false;

        return true;
    },

    loadStyle() {

        return new $Promise((resolve, reject) => {

            var link  = document.createElement('link');
            link.rel  = 'stylesheet';
            link.href = `${origin}css/main.css?${now}`;
            link.onload = () => {
                log('>>> link loaded');
                resolve();
            };
            link.onerror = error => reject(error);
            head.appendChild(link);

            if ( ! this.supportsLinkOnload()) {
                global.setTimeout(function() {
                    log('>>> link loaded setTimeout');
                    resolve();
                }, 100);
            }
            
        });

    },

    loadDOM() {

        return new $Promise(resolve => {

            var isCordova = !! global.cordova;
            var event = isCordova ? 'deviceready' : 'DOMContentLoaded';
            var loaded = () => {
                document.removeEventListener(event, loaded);
                log('>>> loadDOM: ' + event);
                resolve();
            };
            document.addEventListener(event, loaded);
        });
    },

    loadScript() {

        return new $Promise((resolve, reject) => {
            var script = document.createElement('script');
            // script.src = 'js/bundle.js';
            head.appendChild(script);
            script.onload = () => {
                log('>>> script loaded');
                var {App} = global;
                delete global.App;
                resolve(App);
            };
            script.src = `${origin}js/bundle.js?${now}`;
            // script.onerror = error => reject(error);
        });    
    },

    loadApp() {
        log('loadApp3 >>>>');
        return $Promise.all([
            this.loadScript(),
            this.loadStyle(),
            this.loadDOM(),
        ]).then(array => {
            // out('<h1>app loaded</h1>');
            return array[0];
        });
    },

};

module.exports = autoload;