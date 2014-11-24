var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers        = require('Wildcat.Support.helpers');

class RetrieveBluelightsCommandHandler extends CommandHandler {

    *handle(command) {

        var {app} = this;
        var {Bluelight, events} = app;
        var commandName  = command.constructor.getName();
        
        try {
            var bluelight = yield Bluelight.get();
            log(':: crap 2');
            this.dispatchEventsFor(bluelight);   
            return bluelight.collection;

        } catch(err) {
        
            log(`:: big error`);
            events.emit(commandName, err);
            throw err;
        }
    }
}

var {asyncMethods, log} = helpers;

asyncMethods(RetrieveBluelightsCommandHandler.prototype, 'handle');

module.exports = RetrieveBluelightsCommandHandler;