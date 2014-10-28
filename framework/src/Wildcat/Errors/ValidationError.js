
var errorConstructor = require('./errorConstructor');

var ValidationError = errorConstructor('ValidationError', 'no way! validated');

module.exports = ValidationError;