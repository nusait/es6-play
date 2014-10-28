var helpers = require('Wildcat.Support.helpers');
var ValidationError = require('Wildcat.Errors.ValidationError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');

class ReportRepository {

    constructor(app) {

        this.app = app;
    }
    save(report) {

        log(`saving report, please wait…`);
        
        return wait().then(() => {

            // throw new AuthenticationError(`craapppp`);

            log(`report saved, thank you.`);
            return report;
        });
    }
}

var {log, wait} = helpers;

module.exports = ReportRepository;