var {log}           = require('Wildcat.Support.helpers');
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var CommandBus      = require('Wildcat.Commander.CommandBus');
var EventDispatcher = require('Wildcat.Commander.Events.EventDispatcher');

class CommandServiceProvider extends ServiceProvider {

    register() {
        
        registerCommandBus.call(this);
        registerCommands.call(this);
        registerHandlers.call(this);
        registerEventDispatcher.call(this);
    }
}

function registerCommandBus() {

    this.app.bindShared('commandBus', app => new CommandBus(app));
}
function registerCommands() {

    var {app} = this;
    var commands = app.config.get('commands');

    for (var {abstract, command} of commands) {
        
        app.bind(abstract, (app, ...args) => {
            return new command(...args);
        });
    }
}
function registerHandlers() {

    var {app} = this;
    var handlers = app.config.get('handlers');

    for (var {abstract, handler} of handlers) {
        
        app.bindShared(abstract, (app, ...args) => {
            return new handler(app, ...args);
        });
    }
}
function registerEventDispatcher() {

    var {app} = this;
    var {events, logger} = app;

    app.bind('eventDispatcher', app => new EventDispatcher(events, logger));
}

module.exports = CommandServiceProvider;