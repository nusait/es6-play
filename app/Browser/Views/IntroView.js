var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var {log, error} = helpers;

class IntroView extends View {

    constructor(...args) {

        super(...args);

        var {app} = this;
        var {events} = app;

        events.on('reportWasPosted', e => log(e.type, e)); 
    }
    postReport(name, incident) {

        var {app} = this;
        var command = app.make('postReportCommand', [name, incident]);     
        this.execute(command); 
    }
    getBluelights() {

        var {app} = this;
        var command = app.make('retrieveBluelightsCommand');

        this.execute(command)
            .then(collection => {
                log(`got it from thenable `, collection)
            })
            .catch(err => {
                error('got it from catchable', err.message);
            });
    }
    onBluelightsDelivered({value: collection}) {

        log(`whenBluelightsDelivered`);
    }
    onFailRetrieveBluelightsCommand(err) {

        error(`onFailRetrieveBluelightsCommand`, err);
    }
}

module.exports = IntroView;