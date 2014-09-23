var helpers = require('Wildcat.Support.helpers');

class ReportRepository {

    constructor(app) {

        this.app = app;
    }
    save(report) {

        log(`saving report, please wait…`);
        
        return wait().then(() => {
            log(`report saved, thank you.`);
            return report;
        });
    }
}

var {log, wait} = helpers;

module.exports = ReportRepository;