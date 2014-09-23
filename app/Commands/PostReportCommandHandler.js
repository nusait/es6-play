var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers        = require('Wildcat.Support.helpers');

class PostReportCommandHandler extends CommandHandler {

    handle(command) {

        var $this = this;
        var {name, incident} = command;
        var {app} = $this;
        var Report = app.make('Report');

        // Report.post(name, incident)
        //     .then( savedReport => {
        //         this.dispatchEventsFor(savedReport);
        //     })
        //     .catch(terminateError);
        //     
        
        async(function* () {

            var report = yield Report.post(name, incident);
            $this.dispatchEventsFor(report);

        })().catch(terminateError);
    }
}

var {terminateError, async} = helpers;

module.exports = PostReportCommandHandler;