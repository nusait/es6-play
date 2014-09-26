var ServiceProvider     = require('Wildcat.Support.ServiceProvider');
var ValidationError     = require('Wildcat.Errors.ValidationError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');

class ErrorServiceProvider extends ServiceProvider {

    register() {

        var app = this.app;
        app.bindShared('ValidationError',     app => ValidationError);
        app.bindShared('AuthenticationError', app => AuthenticationError);
    }
    provides() {

        return ['ValidationError', 'AuthenticationError'];
    }
}

module.exports = ErrorServiceProvider;