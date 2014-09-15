/**
Provides useful Helpers to JavaScript code

@module Wildcat.Support.helpers
*/

/**
Provides useful Helpers to JavaScript code

@class helpers
@constructor
*/

class helpers {

    value(value) {

        return (typeof value === 'function') ? value() : value;
    }

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
    @method async
    @param makeGenerator {generator}
    */
    async(makeGenerator) {

        return function () {
            var $Promise = Promise;
            var generator = makeGenerator.apply(this, arguments);

            function handle(result) {
                // result => { done: [Boolean], value: [Object] }
                if (result.done) return $Promise.resolve(result.value);

                return $Promise.resolve(result.value).then(function (res) {
                    return handle(generator.next(res));
                }, function (err) {
                    return handle(generator.throw(err));
                });
            }

            try {
                return handle(generator.next());
            } catch (ex) {
                return $Promise.reject(ex);
            }
        };  
    }
    
    /**
    @method assignTo
    @param {Object} target the target object on which to assign 
    methods of the class
    @static
    */
    static assignTo(target) {
        Object.assign(target, helpers.prototype);
    }

    /**
    @method create
    @static
    */
    static create() {
        return new helpers();
    }

}

module.exports = helpers;