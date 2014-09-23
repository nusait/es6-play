/**
@module Wildcat.Events.Dispatcher
*/
var EventEmitter = require('events').EventEmitter;
var {extendProtoOf, isString} = require('Wildcat.Support.helpers');

class Dispatcher {

    constructor(app) {
        this.app_ = app;
        EventEmitter.call(this);
    }
    subscribe(subscriber) {
        subscriber = resolveSubscriber.call(this);
        subscriber.subscribe(this);
    }
}
extendProtoOf(Dispatcher, EventEmitter);

function resolveSubscriber(subscriber) {

    if (isString(subscriber)) {
        return this.app_[subscriber];
    }
    return subscriber;
}

module.exports = Dispatcher; 