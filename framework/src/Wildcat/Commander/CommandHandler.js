var DispatchableTrait = require('Wildcat.Commander.Events.DispatchableTrait');
var helpers = require('Wildcat.Support.helpers');

class CommandHandler {

    // uses DispatchableTrait

    constructor(app) {

        this.app = app;
    }
}

var {extendProtoOf} = helpers;

extendProtoOf(CommandHandler, DispatchableTrait);

module.exports = CommandHandler;