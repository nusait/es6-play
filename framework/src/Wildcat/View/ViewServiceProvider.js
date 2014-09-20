var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');

class ViewServiceProvider extends ServiceProvider {

    register() {

        var app    = this.app;
        var config = app.config;
        var views  = config.get('views');

        for (var {abstract, $constructor, build} of views) {
            
            switch (build) {
                case 'singleton':
                    app.singleton(abstract, $constructor);
                    break;
            }
        }
    }
}

module.exports = ViewServiceProvider;