var state   = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = require('Wildcat.Commander.CommanderTrait');
var EventListener  = require('Wildcat.Commander.Events.EventListener');
var {PathObserver, Platform} = observe;

class View extends EventListener {

    // use CommandTrait

    constructor(app, el) {

        this.app = app;

        var defaultState = {
            el: null,
        };

        state(this, defaultState, {changed, added});
    }
    setEl(element, quiet = false) {

        return state(this, 'el', element, quiet);
    }
    get el() {

        return state(this).el;
    }
    set el(value) {

        this.setEl(value);
    }
    render() {
        // noop
    }
}

function changed(changes) {
    log(`onStateChanged`);
    for (var change of changes) log(change);
}
function added(additions) {
    log(`onStateAdded`);
    for (var addition of additions) log(addition);
}

var {
    log,
    extendProtoOf,
} = helpers;

extendProtoOf(View, CommanderTrait);

module.exports = View; 