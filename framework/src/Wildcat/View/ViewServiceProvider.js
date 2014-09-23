var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');

class ViewServiceProvider extends ServiceProvider {

    register() {

        var app   = this.app;
        var views = app.config.get('views');

        for (var {abstract, $constructor, build} of views) {
            
            switch (build) {

                case 'singleton':
                    app.bindShared(abstract, app => new $constructor(app));
                    break;
                    
            }
        }
    }
}

module.exports = ViewServiceProvider;