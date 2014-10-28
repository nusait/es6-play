
var traceur = require('./includeTraceur');

var log = console.log.bind(console);

var ClientRequestLoader = require('./framework/src/Wildcat/Loaders/ClientRequestLoader');

var loader = new ClientRequestLoader();

var headers = {
	'Accept': 'whatever',
};

loader.get({url: 'http://nuhelp.api/api/bluelights', headers: headers, timeout: 10000})
	.then( function(response) {
		log(typeof response);
	})
	.catch(function(err) {
		log('errrrorrr!', err);
	});
