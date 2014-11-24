var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');

class IntroView extends View {

    constructor(app, ...args) {

        this.name = 'intro';
        
        super(app);

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

        log(`::introView#getBluelights`);
        var {app} = this;
        var command = app.make('retrieveBluelightsCommand');

        return this.execute(command)
            .then(collection => {
                log(`::got it from thenable `, collection)
            })
            .catch(err => {
                error('::got it from catchable', err.message);
            });
    }
    onBluelightsDelivered({value: collection}) {

        log(`whenBluelightsDelivered`);
    }
    onFailRetrieveBluelightsCommand(err) {

        error(`onFailRetrieveBluelightsCommand`, err);
    }
}

var {log, error} = helpers;

module.exports = IntroView;