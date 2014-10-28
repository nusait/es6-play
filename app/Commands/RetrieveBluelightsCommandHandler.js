var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers        = require('Wildcat.Support.helpers');

class RetrieveBluelightsCommandHandler extends CommandHandler {

    *handle(command) {

        var {app} = this;
        var {Bluelight, events} = app;
        var commandName  = command.constructor.getName();
        
        try {

            var bluelight = yield Bluelight.get();
            this.dispatchEventsFor(bluelight);   
            return bluelight.collection;

        } catch(err) {

            events.emit(commandName, err);
            throw err;
        }
    }
}

var {asyncMethods} = helpers;

asyncMethods(RetrieveBluelightsCommandHandler.prototype, 'handle');

module.exports = RetrieveBluelightsCommandHandler;