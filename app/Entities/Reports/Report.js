var EventGenerator = require('Wildcat.Commander.Events.EventGenerator');
var helpers = require('Wildcat.Support.helpers');

class Report {

    // uses EventGenerator

    constructor(name, incident) {

        this.name = name;
        this.incident = incident;
        EventGenerator.call(this);
    }
    static post(...args) {

        var app = Report.getApplication();
        var {reportRepository} = app;

        // return app.reportRepository.save(report)
        //      .then( savedReport => {
        //         var event = app.make('reportWasPosted', [savedReport]);
        //         return savedReport.raise(event);
        //      });

        // throw new Error('simulating error');


        return async(function* () {

            var report = app.make('report', args);
            report = yield reportRepository.save(report);
            var event = app.make('reportWasPosted', [report]);
            return report.raise(event);

        })();
    }
    static getApplication() {

        return Report.app_;
    }
    static setApplication(app) {

        Report.app_ = app;
    }
}

var {log, extendProtoOf} = helpers;
extendProtoOf(Report, EventGenerator);

module.exports = Report;