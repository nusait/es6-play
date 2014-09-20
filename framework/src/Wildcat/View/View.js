var state   = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var {PathObserver, Platform} = observe;

class View {

    constructor(el = null) {

        var _ = state(this, {});
        _.el = el;
        console.log(`being constructed`);
        this.bindStateEvents();
    }
    bindStateEvents() {

        var _ = state(this);

        _.elObserver = new PathObserver(_, 'el');
        _.elObserver.open(this.onElChange.bind(this));
    }
    onElChange(newValue, oldValue) {

        console.log(`newValue = ${newValue}`);
        console.log(`oldValue = ${oldValue}`);    
    }
    setElement(element, quiet = false) {

        var _ = state(this);
        _.el = element;
        if (quiet) _.elObserver.discardChanges();
        Platform.performMicrotaskCheckpoint();
    }
    get el() {

        return state(this).el;
    }
    set el(value) {

        this.setElement(value);
    }
    render() {
        // noop
    }
}

module.exports = View; 