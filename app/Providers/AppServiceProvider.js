var ServiceProvider = require('Wildcat.Support.ServiceProvider');

class AppServiceProvider extends ServiceProvider {

    boot() {

    }
    register() {
        // This service provider is a convenient place to register your services
        // in the IoC container. If you wish, you may make additional methods
        // or service providers to keep the code more focused and granular.    
    }
}

module.exports = AppServiceProvider;