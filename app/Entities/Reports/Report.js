var EventGenerator = require('Wildcat.Commander.Events.EventGenerator');
var helpers = require('Wildcat.Support.helpers');
var ValidationError = require('Wildcat.Errors.ValidationError');

class Report {

    // uses EventGenerator

    constructor(name, incident) {

        this.name = name;
        this.incident = incident;
        EventGenerator.call(this);
    }
    static *persist(report) {

        var myName = this.myName();
        console.log(`hey report 1: ${myName}`);
        var savedReport = yield wait();
        console.log('hey report 2');
        yield wait();
        console.log('hey report 3');
        return 'i am done!';
    }
    static myName() {

        return 'weirdName';
    }
    static *post(...args) {

        var app = this.getApplication();
        var {reportRepository} = app;

        var report = app.make('report', args);
        report = yield reportRepository.save(report);

        var event = app.make('reportWasPosted', [report]);
        return report.raise(event);
    }
    static getApplication() {

        return this.app_;
    }
    static setApplication(app) {

        this.app_ = app;
        return this;
    }
}


var {log, extendProtoOf, wait, asyncMethods} = helpers;
extendProtoOf(Report, EventGenerator);
asyncMethods(Report, 'persist', 'post');

module.exports = Report;