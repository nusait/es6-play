
class CommandBus {

    constructor(app) {

        this.app = app;
    }

    execute(command) {

        var commandName = command.constructor.getShortName();
        var handlerName = `${commandName}Handler`;
        var handler     = this.app.make(handlerName);

        return handler.handle(command);
    }
}

module.exports = CommandBus;