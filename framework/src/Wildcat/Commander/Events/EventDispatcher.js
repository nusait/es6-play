
class EventDispatcher {

    constructor(events, log) {

        this.events_ = events;
        this.log_    = log;
    }
    dispatch(events) {

        for (var event of events) {

            var eventName = getEventName.call(this, event);
            this.events_.emit(eventName, event);
            this.log_.log(`${eventName} was fired.`);
        }
    }
}

function getEventName(event) {

    return event.getName();
}

module.exports = EventDispatcher;