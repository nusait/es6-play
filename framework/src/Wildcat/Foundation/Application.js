var Container          = require('Wildcat.Container.Container');
var Config             = require('Wildcat.Config.Repository');
var ModuleLoader       = require('Wildcat.Config.ModuleLoader');
var Dispatcher         = require('Wildcat.Events.Dispatcher');
var start              = require('Wildcat.Foundation.start');
var ProviderRepository = require('Wildcat.Foundation.ProviderRepository');

var {value}      = require('Wildcat.Support.helpers');
var state        = {};

class Application extends Container {

    detectEnvironment(env) {

        return state.env = value(env);
    }
    isLocal() {

        return this.environment('local');
    }
    environment(...args) {

        if (args.length) {
            return args.indexOf(state.env) !== -1;
        } else {
            return state.env;
        }
    }
    getConfigLoader() {

        return new ModuleLoader();
    }
    registerCoreContainerBindings() {

        var app = this;
        console.log('registerCoreContainerBindings');

        app.bind('config', function() {
            return new Config(new app.getConfigLoader(), app.environment());
        }, true);

        app.bind('events', function() {
            return new Dispatcher(app);
        }, true);   
    }
    getProviderRepository() {

        return new ProviderRepository();
    }
    start() {

        start.call(this);
    }
    run() {

        console.log('app running!');
    }
    register(provider) {

        provider.register();
        return provider;
    }
}

module.exports = Application;