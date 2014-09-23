var View = require('Wildcat.View.View');

class IntroView extends View {

    postReport(name, incident) {

        var command = this.app.make('postReportCommand', [name, incident]);     
        this.execute(command); 
    }

}

module.exports = IntroView;