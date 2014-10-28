
// var EventEmitter = require('events').EventEmitter;
var {EventEmitter2} = require('eventemitter2');
var {/*extendProtoOf, */isString} = require('Wildcat.Support.helpers');

class Dispatcher extends EventEmitter2 {

    constructor(options) {
        this.app_ = options.app;
        EventEmitter2.call(this, options);
    }
    subscribe(subscriber) {
        subscriber = resolveSubscriber.call(this);
        subscriber.subscribe(this);
    }
}
// extendProtoOf(Dispatcher, EventEmitter);

function resolveSubscriber(subscriber) {

    if (isString(subscriber)) {
        return this.app_[subscriber];
    }
    return subscriber;
}

module.exports = Dispatcher; 