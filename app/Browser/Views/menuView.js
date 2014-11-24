var View    = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');

class MenuView extends View {

	constructor(app, template) {

		this.name = 'menu';
	    super(app);
	    assign(this, {template});
	}
	bindEvents() {

		super.bindEvents();

		var {document} = this.app.window;
		var {body} = document;
	}
	toggleMenu() {

		var {document} = this.app.window;
		var {moveableEl, screenEl, wrapperEl} = this;
		var moveableElCL = moveableEl.classList;
		var screenElCL   = screenEl.classList;
		var wrapperElCL   = wrapperEl.classList;

		var isShowing = moveableElCL.contains('show');

		if (isShowing) {
			this.remove('show');
			moveableElCL.add('transition');
			wait(40)
				.then(() => {
					moveableElCL.remove('show');
					screenElCL.remove('shaded');
					wrapperElCL.remove('menu-showing');
					wait(300).then(() => {
						moveableElCL.remove('transition');	
						moveableElCL.add('done');
						screenElCL.add('hide');
					});
				});

		} else {
			this.add('show');
			screenElCL.remove('hide');
			moveableElCL.remove('done');
			wrapperElCL.add('menu-showing');
			wait(40)
				.then(() => moveableElCL.add('transition'))
				.then(() => wait(20))
				.then(() => screenElCL.add('shaded'))
				.then(() => {
					moveableElCL.add('show');
					wait(300).then(() => {
						moveableElCL.remove('transition');
						// screenElCL.add('shaded');
					});
				});
		}	
	}
	onClickToggle(target) {

		this.toggleMenu();
	}
	onClickScreen() {
		
		this.toggleMenu();
	}
	onClickItem(target) {

		// log(`onClickMenuButton`, target);
		log(target.parentNode.className);
	}
	onHighlightstart(e) {

		var {target} = e;

		if (target.matches('.menu button')) {
			this.ancestorOf(target, 'div').classList.add('active');
		} else {
			super.onHighlightstart(e);
		}
	}
	onHighlightend(e) {
		// debugger;
	    var {target} = e;

	    if (target.matches('.menu button')) {
	    	this.ancestorOf(target, 'div').classList.remove('active');
	    } else {
	    	super.onHighlightend(e);
	    }
	}
	get menuEl() {

		return this.$('.menu');
	}
	get barEl() {

		return this.$('.bar');
	}
	get moveableEl() {

		return this.$('.moveable');
	}
	get screenEl() {

		return this.$('.screen');
	}
	get wrapperEl() {

		return this.app.window.document.querySelector('.wrapper');
	}
}

var {log, assign, wait, nextFrame} = helpers;

module.exports = MenuView;