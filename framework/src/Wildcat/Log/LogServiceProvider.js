var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var ConsoleLogger   = require('Wildcat.Log.ConsoleLogger');

class LogServiceProvider extends ServiceProvider {
 
    register() {

        this.app.singleton('logger', ConsoleLogger);
    }
    provides() {

        return ['log'];
    }
}

module.exports = LogServiceProvider;