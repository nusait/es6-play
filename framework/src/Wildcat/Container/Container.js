var {
    keys, implementIterator, 
    isUndefined, arrayIterator,
    extendProtoOf,
} = require('Wildcat.Support.helpers');

var state = require('Wildcat.Support.state');
var EventEmitter = require('events').EventEmitter;

class Container {

    // use EventEmitter;

    constructor() {
        EventEmitter.call(this);

        var _ = state(this, {});
        _.bindings = {};
        _.instances = {};
        // Object.observe(state(this), function(e) {
        //     console.log(e);
        // });
    }
    make(abstract, parameters = []) {

        // if (state.instances[abstract]) return state.instances[abstract];

        // console.log('was not an instance');

        var concrete = this.getConcrete(abstract);
        var object   = concrete();

        // if (this.isShared(abstract)) {
        //     state.instances[abstract] = object;
        // }

        return object;
    }
    bind(abstract, concrete = null, shared = false) {
        var type = 'bind';
        var target = this;

        if (shared) concrete = this.share(concrete);

        console.log(`binding ${abstract}, shared: ${shared}`);
        state(this).bindings[abstract] = {concrete, shared};
        this.makeAccessorProperty(abstract);

        this.emit(`bind.${abstract}`, {type, target, abstract});
        this.emit('bind', {type, target, abstract});
    }
    getConcrete(abstract) {

        return state(this).bindings[abstract].concrete;
    }
    isShared(abstract) {
        var _ = state(this);

        if (_.instances[abstract]) return true;

        if (_.bindings[abstract]) {
            return state.bindings[abstract].shared;
        }

        return false;
    }
    getBindings() {

        return state(this).bindings;
    }
    getBindingsKeys() {

        return keys(this.getBindings());
    }
    instance(abstract, ins) {
        console.log('called instance method with ' + abstract);
        state(this).instances[abstract] = ins;
        this.makeAccessorProperty(abstract);
    }
    singleton(abstract, concrete = null, ...args) {

        this.bind(abstract, function() {
            return new concrete(...args);
        }, true);
    }
    share(func) {
        var object;
        return function(container) {
            if (object === undefined) object = func(container);
            return object;
        };
    }
    forgetInstance(abstract) {

        delete state(this).instances[abstract];
    }
    makeAccessorProperty(abstract) {
        Object.defineProperty(this, abstract, {
            get: function() {
                return this.make(abstract);
            }
        });
    }
    getState() {

        console.dir(state);
        // return state;
    }
    getItems() {
        return [3,2,6,3,6,3,2];
    }
    getIterator() {
        
        return arrayIterator(this.getBindingsKeys());
    }
}
extendProtoOf(Container, EventEmitter);
implementIterator(Container);

module.exports = Container;