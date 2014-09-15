/* global document, window */

var $Promise = require('rsvp').Promise;

var autoload = {

    loadApp() {

        return new $Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.src = 'js/bundle.js';
            script.onload = () => {
                var App = window.App;
                delete window.App;
                resolve(App);
            };
            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
        });

    },

};

module.exports = autoload;