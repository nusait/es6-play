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

    this.app.bindShared('commandBus', app => {

        return new CommandBus(app);
    });
}
function registerCommands() {

    var app      = this.app;
    var commands = app.config.get('commands');

    for (var {abstract, command} of commands) {
        
        app.bind(abstract, function(app, ...args) {
            return new command(...args);
        });
    }
}
function registerHandlers() {

    var app      = this.app;
    var handlers = app.config.get('handlers');

    for (var {abstract, handler} of handlers) {
        
        app.bind(abstract, function(app, ...args) {
            return new handler(app, ...args);
        });
    }
}
function registerEventDispatcher() {

    var {app} = this;
    var {events, log} = app;

    app.bind('eventDispatcher', app => {
        return new EventDispatcher(events, log);        
    });
}

module.exports = CommandServiceProvider;