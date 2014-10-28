var $url = require('url');
var $http = require('http');
var TimeoutError = require('../Errors/TimeoutError');
var helpers = require('../Support/helpers');

class ClientRequestLoader {

	constructor(http) {

		this.http = http || $http;
	}
	send(method, {url, timeout = 5000, headers = {}, responseType = 'json'}) {

		var {hostname, path} = $url.parse(url);

		this.response = '';

		return new Promise((resolve, reject) => {

			assign(this, {resolve, reject, responseType});

			var clientRequest = this.http.request({hostname, path, method, headers});
			clientRequest.on('response', onResponse.bind(this));
			clientRequest.on('error', reject);
			clientRequest.setTimeout(timeout, function() {
				clientRequest.abort();
				reject(new TimeoutError(`after ${timeout}ms`));
			});
			clientRequest.end();
		}); 
	}
	get(...args) {

		return this.send('GET', ...args);
	}
}

function onResponse(message) {

	assign(this, [message, 'statusCode', 'headers']);

	message.setEncoding('utf8');
	message.on('data', chunk => this.response += chunk);
	message.on('end',  onEnd.bind(this));
}
function onEnd() {

	var {response, responseType, resolve, reject, statusCode} = this;
	
	if (responseType === 'json') response = JSON.parse(response);

	if (statusCode === 200) return resolve(response);

	return reject( new Error(response) );
}

var {log, assign} = helpers;

module.exports = ClientRequestLoader;