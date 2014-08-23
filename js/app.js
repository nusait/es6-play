/* global window */
var $window = window;

function run() {
    var {console} = $window;
    var log       = console.log.bind(console);
    var errlog    = err => {
        debugger;
        log(`error here: ${err}`);
    }

    System.import('built/test').then(m => {
        var {Test} = m;
        var test   = new Test($window);
        test.run();
    }, errlog);

    // System.import('built/amdtest').then( function(m) {
    //     log(m);
    // }, errlog);   
}

export var app = {run};

