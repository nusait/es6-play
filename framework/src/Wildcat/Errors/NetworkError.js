

var errorConstructor = require('./errorConstructor');

var NetworkError = errorConstructor('NetworkError', 'network problem');

module.exports = NetworkError;