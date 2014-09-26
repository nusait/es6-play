
var errorConstructor = require('Wildcat.Errors.errorConstructor');

var ValidationError = errorConstructor('ValidationError', 'no way! validated');

module.exports = ValidationError;