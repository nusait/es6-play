
class ReportWasPosted {

    constructor(report) {

        this.value = report;
        this.type = this.getName();
        this.timeStamp = Date.now();
    }
    getName() {

        return 'reportWasPosted';
    }
}

module.exports = ReportWasPosted;