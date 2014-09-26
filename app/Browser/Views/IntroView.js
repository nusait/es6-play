var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var {log} = helpers;

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
}

module.exports = IntroView;