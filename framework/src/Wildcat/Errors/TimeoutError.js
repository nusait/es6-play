
var errorConstructor = require('Wildcat.Errors.errorConstructor');

var TimeoutError = errorConstructor('TimeoutError', 'timeout error happened');

module.exports = TimeoutError;