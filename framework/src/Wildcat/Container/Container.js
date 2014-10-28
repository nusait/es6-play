var state        = require('Wildcat.Support.state');
var EventEmitter = require('events').EventEmitter;
var helpers      = require('Wildcat.Support.helpers');

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
        var object   = concrete(this, ...parameters);

        // if (this.isShared(abstract)) {
        //     state.instances[abstract] = object;
        // }

        return object;
    }
    bind(abstract, concrete = null, shared = false) {

        var type = 'bind';
        var target = this;

        state(this).bindings[abstract] = {concrete, shared};
        this.makeAccessorProperty(abstract);

        this.emit(`bind.${abstract}`, 
            noProto({type: `${type}.${abstract}`, target, abstract, shared})
        );
        
        this.emit('bind', 
            noProto({type, target, abstract, shared})
        );
    }
    bindShared(abstract, concrete, ...args) {

        if (isArray(abstract)) {
            for (var $args of abstract) this.bindShared(...$args);
            return;
        }

        this.bind(abstract, this.share(concrete, ...args), true);
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
    newInstanceOf(abstract, instantiable, ...args) {

        this.bind(abstract, function(app) {
            return new instantiable(...args);
        }, false);
    }
    singleton(abstract, instantiable, ...args) {
        
        this.bindShared(abstract, app => new instantiable(...args));
    }
    share(func, ...args) {
        var object;
        return function(container) {
            if (object === undefined) object = func(container, ...args);
            return object;
        };
    }
    forgetInstance(abstract) {

        delete state(this).instances[abstract];
    }
    makeAccessorProperty(abstract) {

        if (this.abstract) return;

        Object.defineProperty(this, abstract, {
            get: () => this.make(abstract),
            configurable: true,
        });
    }
    getState() {

        console.dir(state);
        // return state;
    }
    getItems() {
        
        return this.getBindingsKeys();
    }
    forEach(cb, context) {

        context = defined(context, this);

        // be sure third argument is this collection, not its array;
        return this.getItems().forEach((value, key) => {
            return cb.call(context, value, key, this);
        });
    }
    map(cb, context) {

        context = defined(context, this);

        // be sure third argument is this collection, not its array;
        return this.getItems().map((value, key) => {
            return cb.call(context, value, key, this);
        });
    }
    filter(cb, context) {

        context = defined(context, this);

        // be sure third argument is this collection, not its array;
        return this.getItems().filter((value, key) => {
            return cb.call(context, value, key, this);
        });
    }
    getIterator() {
        
        return arrayIterator(this.getItems());
    }
}

var {

    keys, 
    implementIterator, 
    isUndefined,
    isDefined,
    defined,
    arrayIterator,
    extendProtoOf,
    noProto,
    isArray,

} = helpers;

extendProtoOf(Container, EventEmitter);
implementIterator(Container);

module.exports = Container;