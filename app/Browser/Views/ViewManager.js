var helpers = require('Wildcat.Support.helpers');

class ViewManager {

	constructor(app) {

		this.app = app;
	}
	init() {

		this.createViews();
		this.removeNotouchOnTouch();
	}
	removeNotouchOnTouch() {
		log('removeNotouchOnTouch');

		var {document} = this.app.window;
		var {documentElement, body} = document;

		var remove = () => {
			log(`remove`);
			documentElement.classList.remove('no-touch');
			body.removeEventListener('touchstart', remove);
		};
		body.addEventListener('touchstart', remove);
	};
	createViews() {

		var {app}      = this;
		var {events} = app;
		var {window} = app;
		var {document} = window;
		var {body} = document;
		
		var {introView, aboutView, menuView, serviceView} = app;

		var views = [aboutView, serviceView, menuView];
		
		var html = views.reduce((str, view) => str += view.render(), '');

		// html = `<div class=wrapper>${html}</div>`;
		html = 
		`<div class="statusbar-container">
			<div class="statusbar-faker">
				<div>
					<div class="left">●●●○○ Verizon <span class="icon-local-phone" /></div>
					<div class="middle">9:09 AM</div>
					<div class="right">58% ▭</div>
				</div>
			</div>
		</div>
		<div class="wrapper menu-showing">
			${html}
		</div>`;

		body.insertAdjacentHTML('beforeend', html);

		views.forEach(view => view.bindEvents());
	}
}

var {log, assign} = helpers;

module.exports = ViewManager;