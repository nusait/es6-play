
var errorConstructor = require('Wildcat.Errors.errorConstructor');

var AuthenticationError = errorConstructor('AuthenticationError', 'no way! authenticated');

module.exports = AuthenticationError;