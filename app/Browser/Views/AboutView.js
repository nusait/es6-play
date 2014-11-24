var View    = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');

class AboutView extends View {

	constructor(app, template) {

		this.name = 'about';
	    super(app);
	    assign(this, {template, name: 'about'});
	}
}

var {log, assign} = helpers;

module.exports = AboutView;