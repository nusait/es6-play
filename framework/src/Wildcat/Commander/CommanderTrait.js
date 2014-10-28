var helpers = require('Wildcat.Support.helpers');

class CommanderTrait {

    execute(command, input) {

        var bus = this.getCommandBus();
        return bus.execute(command);
    }
    getCommandBus() {

        return this.app.make('commandBus');
    }
}

var {log} = helpers;

module.exports = CommanderTrait;