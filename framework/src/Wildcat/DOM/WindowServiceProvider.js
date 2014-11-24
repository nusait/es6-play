var ServiceProvider = require('Wildcat.Support.ServiceProvider');

class WindowServiceProvider extends ServiceProvider {

    register() {
    	// separate out this as ShimmedWindow:

        this.shimMatches(global);
    	this.shimRequestAnimationFrame(global);
    	
        var {app} = this;
        app.bindShared('window', app => global);
    }
    provides() {

        return ['window'];
    }
    shimMatches(global) {
    	var 
    	    ElementProto = global.Element.prototype;

    	if (ElementProto.matches) return;

    	ElementProto.matches = 
    	    ElementProto.webkitMatchesSelector || 
    	        ElementProto.mozMatchesSelector || 
    	            ElementProto.msMatchesSelector;
    }
    shimRequestAnimationFrame(global) {
        // see comments in
        // https://gist.github.com/paulirish/1579671
        // http://creativejs.com/resources/requestanimationframe/
        (function (window, rAF, cAF) {
            var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'], x;

            for (x = 0; x < vendors.length && !window[rAF]; ++x) {
                window[rAF] = window[vendors[x] + 'RequestAnimationFrame'];
                window[cAF] = window[vendors[x] + 
                    'CancelAnimationFrame'] || window[vendors[x] + 
                        'CancelRequestAnimationFrame'];
                if (window[rAF]) {
                    log('shimRequestAnimationFrame using '+vendors[x]+' prefix');
                }
            }

            if (!window[rAF]) {
                log('shimRequestAnimationFrame using setTimeout');
                window[rAF] = function (callback) {
                    var currTime = new Date().getTime(),
                        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                        id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        }, timeToCall);

                    lastTime = currTime + timeToCall;

                    return id;
                };
            }

            if (!window[cAF]) {
                window[cAF] = function (id) {
                    window.clearTimeout(id);
                };
            }
        }(global, 'requestAnimationFrame', 'cancelAnimationFrame'));
    }
}

module.exports = WindowServiceProvider;