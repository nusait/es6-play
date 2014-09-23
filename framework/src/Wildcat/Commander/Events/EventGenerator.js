
class EventGenerator {

    constructor() {

        this.pendingEvents_ = [];
    }

    raise(event) {

        this.pendingEvents_.push(event);
        return this;
    }
    releaseEvents() {

        var events = this.pendingEvents_;

        this.pendingEvents_ = [];

        return events;
    }
}

module.exports = EventGenerator;