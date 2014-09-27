var Container          = require('Wildcat.Container.Container');
var Config             = require('Wildcat.Config.Repository');
var ModuleLoader       = require('Wildcat.Config.ModuleLoader');
var Dispatcher         = require('Wildcat.Events.Dispatcher');
var start              = require('Wildcat.Foundation.start');
var ProviderRepository = require('Wildcat.Foundation.ProviderRepository');
var CommanderTrait     = require('Wildcat.Commander.CommanderTrait');
var helpers            = require('Wildcat.Support.helpers');

var config       = require('config.config');
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

        return new ModuleLoader(config);
    }
    registerCoreContainerBindings() {

        var app = this;
        var configLoader = app.getConfigLoader();
        var environment  = app.environment();

        app.bindShared([
            ['config', app => new Config(configLoader, environment)],
            ['events', app => new Dispatcher(app)],
        ]);
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

var {extendProtoOf} = helpers;

extendProtoOf(Application, CommanderTrait);

module.exports = Application;