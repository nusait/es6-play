var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');
var helpers = require('../Support/helpers');

class ViewServiceProvider extends ServiceProvider {

    register() {

        var {app} = this;
        var views = app.config.get('views');

        views.forEach(view => {

            var {abstract, $constructor, build, args} = view;

            switch (build) {
                case 'singleton':
                    app.bindShared(abstract, app => new $constructor(app, ...args));
                    break;
            }    
        });

    }
}

var {log} = helpers;

module.exports = ViewServiceProvider;