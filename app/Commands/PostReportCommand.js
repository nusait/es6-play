
class PostReportCommand {

    constructor(name, incident) {

        this.name = name;
        this.incident = incident;
    }
    static getName() {

        return 'postReportCommand';
    }
}

module.exports = PostReportCommand;