
var errorConstructor = require('./errorConstructor');

var TimeoutError = errorConstructor('TimeoutError', 'timeout error happened');

module.exports = TimeoutError;