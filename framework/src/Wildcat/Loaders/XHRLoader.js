var TimeoutError = require('Wildcat.Errors.TimeoutError');
var NetworkError = require('Wildcat.Errors.NetworkError');
var helpers = require('Wildcat.Support.helpers');

class XHRLoader {

    constructor(XMLHttpRequest) {

        this.Xhr_ = XMLHttpRequest || global.XMLHttpRequest;
    }
    send(method, {url, timeout = 5000, headers = {}, responseType = 'json'}) {
        log(`:: xhrloader.send`);
        var xhr = new this.Xhr_();

        var promise = new Promise((resolve, reject) => {
            
            xhr.open(method, url);
            log(`:: xhrloader.send-promise`);
            if (responseType === 'json') {
                xhr.setRequestHeader('Accept', 'application/json');
                this.responseType = responseType;
            }

            entries(headers).forEach(entry => xhr.setRequestHeader(...entry));

            log(`:: xhrloader.xhr-before-eassign`);

            // setting responseType breaks android at least <= 4.3
            
            assign(xhr, {
                resolve, reject,
                /*responseType,*/ timeout, 
                onload: onload.bind(this), 
                ontimeout: ontimeout.bind(this), 
                onerror: onerror.bind(this), 
            });

            xhr.send();
        });
 
        promise.cancel = xhr.abort.bind(xhr);

        return promise;
    }
    get(...args) {
        log(`:: xhrloader.get`);
        return this.send('GET', ...args);
    }
}

function onload({target: xhr}) {
    
    var {response, status, statusText, resolve} = xhr;

    var wantsJson = 
        (xhr.responseType  === 'json')  || 
        (this.responseType === 'json');

    if (isString(response) && wantsJson) response = JSON.parse(response);

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

var {log, error, isString, assign, entries} = helpers;

module.exports = XHRLoader;