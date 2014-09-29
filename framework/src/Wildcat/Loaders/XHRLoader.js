var TimeoutError = require('Wildcat.Errors.TimeoutError');
var NetworkError = require('Wildcat.Errors.NetworkError');
var helpers = require('Wildcat.Support.helpers');

class XHRLoader {

    constructor(XMLHttpRequest) {

        this.Xhr_ = XMLHttpRequest || global.XMLHttpRequest;
    }
    send(method, {url, timeout = 5000, responseType = 'json'}) {

        var xhr = new this.Xhr_();

        var promise = new Promise((resolve, reject) => {
            
            xhr.open(method, url);

            assign(xhr, {
                resolve, reject,
                responseType, timeout, 
                onload, ontimeout, onerror, 
            }).send();
        });
 
        promise.cancel = xhr.abort.bind(xhr);

        return promise;
    }
    get(...args) {

        return this.send('GET', ...args);
    }
}

function onload({target: xhr}) {

    var {response, status, statusText, resolve} = xhr;

    if (isString(response) && xhr.responseType === 'json')
        response = JSON.parse(response);

    resolve(response);
}
function ontimeout({target: {reject}}) {

    var timeoutError = new TimeoutError();
    reject(timeoutError);
}
function onerror({target: xhr}) {
    
    var {response, status, reject} = xhr;

    // cue of status number, and message on response

    var networkError = new NetworkError();
    reject(networkError);
}

var {log, error, isString, assign} = helpers;

module.exports = XHRLoader;