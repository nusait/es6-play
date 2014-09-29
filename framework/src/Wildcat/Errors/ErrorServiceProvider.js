var ServiceProvider     = require('Wildcat.Support.ServiceProvider');
var ValidationError     = require('Wildcat.Errors.ValidationError');
var TimeoutError        = require('Wildcat.Errors.TimeoutError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');
var NetworkError        = require('Wildcat.Errors.NetworkError');

class ErrorServiceProvider extends ServiceProvider {

    register() {

        this.app.bindShared([
            ['ValidationError',     () => ValidationError],
            ['AuthenticationError', () => AuthenticationError],
            ['NetworkError',        () => NetworkError],
            ['TimeoutError',        () => TimeoutError],
        ]);
    }
    provides() {

        return [
            'ValidationError', 
            'AuthenticationError', 
            'NetworkError', 
            'TimeoutError'
        ];
    }
}

module.exports = ErrorServiceProvider;