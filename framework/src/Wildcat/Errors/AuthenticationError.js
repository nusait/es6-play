
var errorConstructor = require('./errorConstructor');

var AuthenticationError = errorConstructor('AuthenticationError', 'no way! authenticated');

module.exports = AuthenticationError;