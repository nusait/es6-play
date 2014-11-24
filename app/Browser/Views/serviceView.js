// serviceView.js

var View    = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');

class ServiceView extends View {

	constructor(app, template) {
		
		this.name = 'service';

	    super(app);
	    assign(this, {template});
	}
	bindEvents() {

		var {el} = this;
		var elOn = el.addEventListener.bind(el);

		elOn('touchstart', this.onTouchstart.bind(this, '.detail-action'));
		elOn('click',      this.onClick.bind(this));
	}
	onClick(e) {
		var target = this.getDesiredTarget(e.target);

		if (target.matches('.detail-action')) this.onClickDetailAction(target);
		if (target.matches('.close-action'))  this.onClickCloseAction(target);

	}
	getDesiredTarget(node) {

	    if (node.matches('.detail-action *')) {
	    	return this.ancestorOf(node, '.detail-action');	
	    }
	    if (node.matches('.close-action *')) {
	    	return this.ancestorOf(node, '.close-action');	
	    }
	    	
	    return node;
	}
	onClickDetailAction(target) {

		var {typeEl}    = this;
		var clickedItem = this.ancestorOf(target, '.service-listitem');

		this.$$('.service-listitem').forEach(item => {
			if ( item !== clickedItem) item.classList.add('closed');
		});

		typeEl.classList.remove('list');
		typeEl.classList.add('detail');

	}
	onClickCloseAction(target) {

		var {typeEl}    = this;
		var clickedItem = this.ancestorOf(target, '.service-listitem');

		this.$$('.service-listitem').forEach(item => {
			item.classList.remove('closed');
		});

		typeEl.classList.add('list');
		typeEl.classList.remove('detail');

	}
	get typeEl() {

		return this.$('.type');
	}
}

var {log, assign} = helpers;

module.exports = ServiceView;