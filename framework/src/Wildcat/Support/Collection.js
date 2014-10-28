// Collection.js

var helpers = require('./helpers');

class Collection {

	constructor(items) {

		if ( ! isArray(items)) {

			throw new TypeError('collection object must be created with an array');
		}

		this.items_ = items;
		
	}
	getItems() {

		return this.items_;
	}
	forEach(cb, context) {

	    context = defined(context, this);

	    // be sure third argument is this collection, not its array;
	    return this.getItems().forEach((value, key) => {
	        return cb.call(context, value, key, this);
	    });
	}
	filter(cb, context) {

	    context = defined(context, this);

	    // be sure third argument is this collection, not its array;
	    return this.getItems().filter((value, key) => {
	        return cb.call(context, value, key, this);
	    });
	}
	map(cb, context) {

	    context = defined(context, this);

	    // be sure third argument is this collection, not its array;
	    return this.getItems().map((value, key) => {
	        return cb.call(context, value, key, this);
	    });
	}
	toJson() {

		var items = this.getItems();
		return JSON.stringify(items);
	}
	get length() {

		return this.items_.length;
	}
}

var {isArray, defined} = helpers;


module.exports = Collection;