var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers        = require('Wildcat.Support.helpers');

class PostReportCommandHandler extends CommandHandler {

    handle(command) {

        var $this = this;
        var {name, incident} = command;
        var {app} = $this;
        var Report = app.make('Report');
        
        async(function* () {

            var report = yield Report.post(name, incident);
            $this.dispatchEventsFor(report);

        })().catch(terminateError);
    }
}

var {terminateError, async, log} = helpers;

module.exports = PostReportCommandHandler;