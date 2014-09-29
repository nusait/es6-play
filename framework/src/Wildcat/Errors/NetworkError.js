

var errorConstructor = require('Wildcat.Errors.errorConstructor');

var NetworkError = errorConstructor('NetworkError', 'network problem');

module.exports = NetworkError;