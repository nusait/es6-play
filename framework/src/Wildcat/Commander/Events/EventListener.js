
var helpers = require('Wildcat.Support.helpers');

/*abstract*/ class EventListener {

	handle(event) {

		var eventName    = event.getName();
		var shortName    = getShortname(eventName);
		var targetName   = getTargetname(shortName);
		var isRegistered = isFunction( this[targetName] );

		if (isRegistered) return this[targetName](event);
	}
}

function getTargetname(shortName) {

	shortName = ucfirst(shortName);
	return `on${shortName}`;
}
function getShortname(eventName) {

	return lastSegment(eventName);
}

var {isFunction, log, ucfirst, lastSegment} = helpers;

module.exports = EventListener;