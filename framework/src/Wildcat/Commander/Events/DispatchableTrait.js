
class DispatchableTrait {

    dispatchEventsFor(entity) {

        var dispatcher = this.getDispatcher();
        var events     = entity.releaseEvents();

        dispatcher.dispatch(events);
    }
    getDispatcher() {

        return this.app.eventDispatcher;
    }
}

module.exports = DispatchableTrait;