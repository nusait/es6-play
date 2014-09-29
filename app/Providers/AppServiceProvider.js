var ServiceProvider = require('Wildcat.Support.ServiceProvider');

var Report = require('App.Entities.Reports.Report');
var ReportWasPosted = require('App.Entities.Reports.Events.ReportWasPosted');

var ReportRepository = require('App.Repositories.ReportRepository');
var BluelightRepository = require('App.Repositories.BluelightRepository');
var XHRLoader = require('Wildcat.Loaders.XHRLoader');

var helpers = require('Wildcat.Support.helpers');

class AppServiceProvider extends ServiceProvider {

    boot() {

    }
    register() {
        // This service provider is a convenient place to register your services
        // in the IoC container.
        
        registerEntities.call(this);
        registerRepositories.call(this);
    }
}

function registerEntities() {

    var {app} = this;

    app.bindShared('Report', app => {
        Report.setApplication(app);
        return Report;
    });
    app.bind('report', (app, ...args) => {
        return new app.Report(...args);
    });
    app.bind('reportWasPosted', (app, ...args) => {
        return new ReportWasPosted(...args);
    });
}
function registerRepositories() {

    var {app} = this;

    app.bindShared('reportRepository', app => new ReportRepository(app));

    app.bind('xhrLoader', app => new XHRLoader);
    app.bindShared('bluelightRepository', app => {
        var xhrLoader = app.xhrLoader;
        return new BluelightRepository(app, xhrLoader);
    });
}

var {log} = helpers;

module.exports = AppServiceProvider;