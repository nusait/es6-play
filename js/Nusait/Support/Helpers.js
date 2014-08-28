/**
Provides useful Helpers to JavaScript code

@module Nusait.Support.Helpers
*/

/**
Provides useful Helpers to JavaScript code

@class Helpers
@constructor
*/

class Helpers {
    /**
    Waits for a provided amount of milliseconds using setTimeout()
    and then fulfills promise upon completion.

    @method wait
    @param {Number = 500} time the number of milliseconds to wait.
    @return {Promise}
    */
    wait(time = 500) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
    /**
    @method log
    @param msg {Mixed} the msg to be displayed to the console
    */
    log(msg) {
        var console = window.console;
        console.log(msg);
    }
    /**
    @method assignTo
    @param {Object} target the target object on which to assign 
    methods of the class
    @static
    */
    static assignTo(target) {
        Object.assign(target, Helpers.prototype);
    }
    /**
    @method create
    @static
    */
    static create() {
        return new Helpers();
    }
}

exports.Helpers = Helpers;