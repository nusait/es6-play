
class CommandBus {

    constructor(app) {

        this.app = app;
    }

    execute(command) {

        var commandName = command.constructor.getName();
        var handlerName = `${commandName}Handler`;
        var handler     = this.app.make(handlerName);

        handler.handle(command);
    }
}

module.exports = CommandBus;