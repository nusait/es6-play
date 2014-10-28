
var helpers = require('Wildcat.Support.helpers');

class RetrieveBluelightsCommand {

    constructor(options = {}) {

        assign(this, options);
    }
    static getName() {

        return 'app.retrieveBluelightsCommand';
    }
    static getShortName() {

    	return lastSegment( this.getName() );
    }
}

var {assign, lastSegment} = helpers;

module.exports = RetrieveBluelightsCommand;