/* global window */
var $window = window;

function run() {
    var console = $window.console;
    var log = console.log.bind(console);

    var errlog = function(err) {
        log('error here: ' + err);
    };

    System.import('built/test').then( function(m) {
        var Test = m.Test;
        var test = new Test($window);
        test.run();
    }, errlog);

    // System.import('built/amdtest').then( function(m) {
    //     log(m);
    // }, errlog);   
}

export var app = {
    run: run
};

