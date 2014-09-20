var ServiceProvider = require('Wildcat.Support.ServiceProvider');

class WindowServiceProvider extends ServiceProvider {

    register() {

        var app = this.app;
        app.bindShared('window', app => global);
    }
    provides() {

        return ['window'];
    }
}

module.exports = WindowServiceProvider;