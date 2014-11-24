(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
})({
    1: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $__2;
            var rsvpPromise = require("rsvp").Promise;
            var $__1 = global, document = $__1.document, console = $__1.console, localStorage = ($__2 = $__1.localStorage) === void 0 ? {} : $__2;
            var head = document.head;
            var $Promise = global.Promise || rsvpPromise;
            var protocol = "http:";
            var origin = "";
            if (localStorage.host) origin = protocol + "//" + localStorage.host + "/";
            var log = console.log.bind(console);
            var body = document.body;
            var out = body.insertAdjacentHTML.bind(body, "beforeend");
            var now = Date.now();
            var autoload = {
                supportsLinkOnload: function() {
                    var navigator = global.navigator;
                    if (!navigator) return true;
                    if (/Android 4\.[0-3]/.test(navigator.userAgent)) return false;
                    return true;
                },
                loadStyle: function() {
                    var $__0 = this;
                    return new $Promise(function(resolve, reject) {
                        var link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = origin + "css/main.css?" + now;
                        link.onload = function() {
                            log(">>> link loaded");
                            resolve();
                        };
                        link.onerror = function(error) {
                            return reject(error);
                        };
                        head.appendChild(link);
                        if (!$__0.supportsLinkOnload()) {
                            global.setTimeout(function() {
                                log(">>> link loaded setTimeout");
                                resolve();
                            }, 100);
                        }
                    });
                },
                loadDOM: function() {
                    return new $Promise(function(resolve) {
                        var isCordova = !!global.cordova;
                        var event = isCordova ? "deviceready" : "DOMContentLoaded";
                        var loaded = function() {
                            document.removeEventListener(event, loaded);
                            log(">>> loadDOM: " + event);
                            resolve();
                        };
                        document.addEventListener(event, loaded);
                    });
                },
                loadScript: function() {
                    return new $Promise(function(resolve, reject) {
                        var script = document.createElement("script");
                        head.appendChild(script);
                        script.onload = function() {
                            log(">>> script loaded");
                            var App = global.App;
                            delete global.App;
                            resolve(App);
                        };
                        script.src = origin + "js/bundle.js?" + now;
                    });
                },
                loadApp: function() {
                    log("loadApp3 >>>>");
                    return $Promise.all([ this.loadScript(), this.loadStyle(), this.loadDOM() ]).then(function(array) {
                        return array[0];
                    });
                }
            };
            module.exports = autoload;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        rsvp: 6
    } ],
    2: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            function environment(localStorage) {
                localStorage = localStorage || global.localStorage;
                return localStorage.env || "production";
            }
            module.exports = environment;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    3: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var autoload = require("./autoload");
            var environment = require("./environment");
            var helpers = require("../framework/src/Wildcat/Support/helpers");
            var log = helpers.log;
            var terminateError = helpers.terminateError;
            var APPSTART = Date.now();
            function instantiateNewApplication(App) {
                var app = new App();
                return app;
            }
            function loadEnvironment(app) {
                var env = app.detectEnvironment(environment);
                return app;
            }
            function startApp(app) {
                app.start();
                return app;
            }
            function runApp(app) {
                app.run();
                return app;
            }
            function complete(app) {
                var APPDONE = Date.now();
                log("::=== application loaded in " + (APPDONE - APPSTART) + " ms");
            }
            var htmlCL = document.documentElement.classList;
            if (global.cordova) {
                htmlCL.add(cordova.platformId);
            } else {
                htmlCL.add("browser");
            }
            autoload.loadApp().then(instantiateNewApplication).then(loadEnvironment).then(startApp).then(runApp).then(complete).catch(terminateError);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../framework/src/Wildcat/Support/helpers": 4,
        "./autoload": 1,
        "./environment": 2
    } ],
    4: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $console = global.console;
            var setTimeout = global.setTimeout;
            var clearTimeout = global.clearTimeout;
            function keys(object) {
                if (object instanceof Map) {
                    var result = [];
                    object.forEach(function(value, key) {
                        result.push(key);
                    });
                    return result;
                }
                return Object.keys(object);
            }
            function values() {
                var object = arguments[0] !== void 0 ? arguments[0] : {};
                if (object instanceof Map) {
                    var result = [];
                    object.forEach(function(value, key) {
                        result.push(value);
                    });
                    return result;
                }
                return keys(object).map(function(key) {
                    return object[key];
                });
            }
            function entries() {
                var object = arguments[0] !== void 0 ? arguments[0] : {};
                if (object instanceof Map) {
                    var result = [];
                    object.forEach(function(value, key) {
                        result.push([ key, value ]);
                    });
                    return result;
                }
                return keys(object).map(function(key) {
                    return [ key, object[key] ];
                });
            }
            function assign(target) {
                var $__11;
                for (var sources = [], $__4 = 1; $__4 < arguments.length; $__4++) sources[$__4 - 1] = arguments[$__4];
                var source, temp, props, prop;
                for (var $__2 = sources[Symbol.iterator](), $__3; !($__3 = $__2.next()).done; ) {
                    source = $__3.value;
                    {
                        if (isArray(source)) {
                            temp = {};
                            $__11 = source, source = $__11[0], props = Array.prototype.slice.call($__11, 1), 
                            $__11;
                            for (var $__0 = props[Symbol.iterator](), $__1; !($__1 = $__0.next()).done; ) {
                                prop = $__1.value;
                                temp[prop] = source[prop];
                            }
                            assign(target, temp);
                        } else Object.assign(target, source);
                    }
                }
                return target;
            }
            function extendProtoOf(target, source) {
                var key = arguments[2] !== void 0 ? arguments[2] : [];
                if (isString(key)) {
                    target.prototype[key] = source.prototype[key];
                    return;
                }
                var sourceKeys = keys(source.prototype);
                for (var $__0 = sourceKeys[Symbol.iterator](), $__1; !($__1 = $__0.next()).done; ) {
                    var key = $__1.value;
                    {
                        target.prototype[key] = source.prototype[key];
                    }
                }
            }
            function implementIterator(sourceClass) {
                var $prototype = sourceClass.prototype;
                $prototype[Symbol.iterator] = $prototype.getIterator;
            }
            function value(val) {
                return typeof val === "function" ? val() : val;
            }
            function isNull(val) {
                return val === null;
            }
            function isString(val) {
                return typeof val === "string";
            }
            function isFunction(val) {
                return typeof val === "function";
            }
            function isUndefined(val) {
                return val === undefined;
            }
            function isDefined(val) {
                return !isUndefined(val);
            }
            function isArray(val) {
                return Array.isArray(val);
            }
            function defined(val, $default) {
                return isDefined(val) ? val : $default;
            }
            function wait() {
                var time = arguments[0] !== void 0 ? arguments[0] : 500;
                for (var args = [], $__5 = 1; $__5 < arguments.length; $__5++) args[$__5 - 1] = arguments[$__5];
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve.apply(null, $traceurRuntime.spread(args));
                    }, time);
                });
            }
            function log() {
                var $__13;
                for (var args = [], $__6 = 0; $__6 < arguments.length; $__6++) args[$__6] = arguments[$__6];
                var document = global.document;
                if (typeof args[0] === "string" && args[0].startsWith("::") && document) {
                    var body = document.body;
                    var outputEl = document.querySelector("output.log");
                    if (!outputEl) {
                        body.insertAdjacentHTML("afterbegin", "<output class=log />");
                        outputEl = document.querySelector("output.log");
                    }
                    outputEl.insertAdjacentHTML("beforeend", "<p>" + args[0] + "</p>");
                } else {
                    ($__13 = $console).log.apply($__13, $traceurRuntime.spread(args));
                }
            }
            function dir() {
                var $__13;
                for (var args = [], $__7 = 0; $__7 < arguments.length; $__7++) args[$__7] = arguments[$__7];
                ($__13 = $console).dir.apply($__13, $traceurRuntime.spread(args));
            }
            function error() {
                var $__13;
                for (var args = [], $__8 = 0; $__8 < arguments.length; $__8++) args[$__8] = arguments[$__8];
                ($__13 = $console).error.apply($__13, $traceurRuntime.spread(args));
            }
            function warn() {
                var $__13;
                for (var args = [], $__9 = 0; $__9 < arguments.length; $__9++) args[$__9] = arguments[$__9];
                ($__13 = $console).warn.apply($__13, $traceurRuntime.spread(args));
            }
            function spawn(makeGenerator) {
                var promise = async(makeGenerator);
                promise().then(log, terminateError);
            }
            function async(makeGenerator) {
                return function() {
                    var $Promise = Promise;
                    var generator = makeGenerator.apply(this, arguments);
                    function handle(result) {
                        var done = result.done;
                        var value = result.value;
                        if (done) return $Promise.resolve(value);
                        return $Promise.resolve(value).then(function(res) {
                            return handle(generator.next(res));
                        }, function(err) {
                            return handle(generator.throw(err));
                        });
                    }
                    try {
                        return handle(generator.next());
                    } catch (ex) {
                        return $Promise.reject(ex);
                    }
                };
            }
            function asyncMethods(object) {
                for (var methods = [], $__10 = 1; $__10 < arguments.length; $__10++) methods[$__10 - 1] = arguments[$__10];
                for (var $__0 = methods[Symbol.iterator](), $__1; !($__1 = $__0.next()).done; ) {
                    var method = $__1.value;
                    {
                        object[method] = async(object[method]);
                    }
                }
            }
            function arrayIterator() {
                var items = arguments[0] !== void 0 ? arguments[0] : [];
                var i = 0;
                var len = items.length;
                return {
                    next: function() {
                        var value, notDone;
                        if (notDone = i < len) value = items[i++];
                        return {
                            value: value,
                            done: !notDone
                        };
                    }
                };
            }
            function noProto() {
                var source = arguments[0] !== void 0 ? arguments[0] : {};
                var empty = Object.create(null);
                Object.assign(empty, source);
                return empty;
            }
            function terminateError(error) {
                setTimeout(function() {
                    warn("from [terimateError]:");
                    warn(error.stack);
                    throw error;
                }, 0);
            }
            function mapFrom() {
                var object = arguments[0] !== void 0 ? arguments[0] : {};
                if (object instanceof Map) return object;
                var map = new Map();
                var objectKeys = keys(object);
                return objectKeys.reduce(function(result, key) {
                    var value = object[key];
                    map.set(key, value);
                    return map;
                }, map);
            }
            function ucfirst(str) {
                var f = str.charAt(0).toUpperCase();
                return f + str.substr(1);
            }
            function first(array) {
                return array[0];
            }
            function last(array) {
                var length = array.length;
                var lastIndex = length - 1;
                return array[lastIndex];
            }
            function lastSegment(array) {
                var segments = array.split(".");
                return last(segments);
            }
            function nextFrame() {
                return new Promise(function(resolve) {
                    global.requestAnimationFrame(resolve);
                });
            }
            var helpers = {
                keys: keys,
                values: values,
                entries: entries,
                assign: assign,
                extendProtoOf: extendProtoOf,
                implementIterator: implementIterator,
                value: value,
                isNull: isNull,
                isString: isString,
                isFunction: isFunction,
                isUndefined: isUndefined,
                isDefined: isDefined,
                isArray: isArray,
                defined: defined,
                wait: wait,
                log: log,
                dir: dir,
                error: error,
                warn: warn,
                spawn: spawn,
                async: async,
                asyncMethods: asyncMethods,
                arrayIterator: arrayIterator,
                noProto: noProto,
                terminateError: terminateError,
                mapFrom: mapFrom,
                ucfirst: ucfirst,
                first: first,
                last: last,
                lastSegment: lastSegment,
                setTimeout: setTimeout,
                clearTimeout: clearTimeout,
                nextFrame: nextFrame
            };
            module.exports = helpers;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    5: [ function(require, module, exports) {
        var process = module.exports = {};
        process.nextTick = function() {
            var canSetImmediate = typeof window !== "undefined" && window.setImmediate;
            var canPost = typeof window !== "undefined" && window.postMessage && window.addEventListener;
            if (canSetImmediate) {
                return function(f) {
                    return window.setImmediate(f);
                };
            }
            if (canPost) {
                var queue = [];
                window.addEventListener("message", function(ev) {
                    var source = ev.source;
                    if ((source === window || source === null) && ev.data === "process-tick") {
                        ev.stopPropagation();
                        if (queue.length > 0) {
                            var fn = queue.shift();
                            fn();
                        }
                    }
                }, true);
                return function nextTick(fn) {
                    queue.push(fn);
                    window.postMessage("process-tick", "*");
                };
            }
            return function nextTick(fn) {
                setTimeout(fn, 0);
            };
        }();
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
    }, {} ],
    6: [ function(require, module, exports) {
        (function(process) {
            (function() {
                "use strict";
                function $$rsvp$events$$indexOf(callbacks, callback) {
                    for (var i = 0, l = callbacks.length; i < l; i++) {
                        if (callbacks[i] === callback) {
                            return i;
                        }
                    }
                    return -1;
                }
                function $$rsvp$events$$callbacksFor(object) {
                    var callbacks = object._promiseCallbacks;
                    if (!callbacks) {
                        callbacks = object._promiseCallbacks = {};
                    }
                    return callbacks;
                }
                var $$rsvp$events$$default = {
                    mixin: function(object) {
                        object.on = this.on;
                        object.off = this.off;
                        object.trigger = this.trigger;
                        object._promiseCallbacks = undefined;
                        return object;
                    },
                    on: function(eventName, callback) {
                        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks;
                        callbacks = allCallbacks[eventName];
                        if (!callbacks) {
                            callbacks = allCallbacks[eventName] = [];
                        }
                        if ($$rsvp$events$$indexOf(callbacks, callback) === -1) {
                            callbacks.push(callback);
                        }
                    },
                    off: function(eventName, callback) {
                        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks, index;
                        if (!callback) {
                            allCallbacks[eventName] = [];
                            return;
                        }
                        callbacks = allCallbacks[eventName];
                        index = $$rsvp$events$$indexOf(callbacks, callback);
                        if (index !== -1) {
                            callbacks.splice(index, 1);
                        }
                    },
                    trigger: function(eventName, options) {
                        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks, callback;
                        if (callbacks = allCallbacks[eventName]) {
                            for (var i = 0; i < callbacks.length; i++) {
                                callback = callbacks[i];
                                callback(options);
                            }
                        }
                    }
                };
                var $$rsvp$config$$config = {
                    instrument: false
                };
                $$rsvp$events$$default.mixin($$rsvp$config$$config);
                function $$rsvp$config$$configure(name, value) {
                    if (name === "onerror") {
                        $$rsvp$config$$config.on("error", value);
                        return;
                    }
                    if (arguments.length === 2) {
                        $$rsvp$config$$config[name] = value;
                    } else {
                        return $$rsvp$config$$config[name];
                    }
                }
                function $$utils$$objectOrFunction(x) {
                    return typeof x === "function" || typeof x === "object" && x !== null;
                }
                function $$utils$$isFunction(x) {
                    return typeof x === "function";
                }
                function $$utils$$isMaybeThenable(x) {
                    return typeof x === "object" && x !== null;
                }
                var $$utils$$_isArray;
                if (!Array.isArray) {
                    $$utils$$_isArray = function(x) {
                        return Object.prototype.toString.call(x) === "[object Array]";
                    };
                } else {
                    $$utils$$_isArray = Array.isArray;
                }
                var $$utils$$isArray = $$utils$$_isArray;
                var $$utils$$now = Date.now || function() {
                    return new Date().getTime();
                };
                function $$utils$$F() {}
                var $$utils$$o_create = Object.create || function(o) {
                    if (arguments.length > 1) {
                        throw new Error("Second argument not supported");
                    }
                    if (typeof o !== "object") {
                        throw new TypeError("Argument must be an object");
                    }
                    $$utils$$F.prototype = o;
                    return new $$utils$$F();
                };
                var $$instrument$$queue = [];
                var $$instrument$$default = function instrument(eventName, promise, child) {
                    if (1 === $$instrument$$queue.push({
                        name: eventName,
                        payload: {
                            guid: promise._guidKey + promise._id,
                            eventName: eventName,
                            detail: promise._result,
                            childGuid: child && promise._guidKey + child._id,
                            label: promise._label,
                            timeStamp: $$utils$$now(),
                            stack: new Error(promise._label).stack
                        }
                    })) {
                        setTimeout(function() {
                            var entry;
                            for (var i = 0; i < $$instrument$$queue.length; i++) {
                                entry = $$instrument$$queue[i];
                                $$rsvp$config$$config.trigger(entry.name, entry.payload);
                            }
                            $$instrument$$queue.length = 0;
                        }, 50);
                    }
                };
                function $$$internal$$noop() {}
                var $$$internal$$PENDING = void 0;
                var $$$internal$$FULFILLED = 1;
                var $$$internal$$REJECTED = 2;
                var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();
                function $$$internal$$getThen(promise) {
                    try {
                        return promise.then;
                    } catch (error) {
                        $$$internal$$GET_THEN_ERROR.error = error;
                        return $$$internal$$GET_THEN_ERROR;
                    }
                }
                function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                    try {
                        then.call(value, fulfillmentHandler, rejectionHandler);
                    } catch (e) {
                        return e;
                    }
                }
                function $$$internal$$handleForeignThenable(promise, thenable, then) {
                    $$rsvp$config$$config.async(function(promise) {
                        var sealed = false;
                        var error = $$$internal$$tryThen(then, thenable, function(value) {
                            if (sealed) {
                                return;
                            }
                            sealed = true;
                            if (thenable !== value) {
                                $$$internal$$resolve(promise, value);
                            } else {
                                $$$internal$$fulfill(promise, value);
                            }
                        }, function(reason) {
                            if (sealed) {
                                return;
                            }
                            sealed = true;
                            $$$internal$$reject(promise, reason);
                        }, "Settle: " + (promise._label || " unknown promise"));
                        if (!sealed && error) {
                            sealed = true;
                            $$$internal$$reject(promise, error);
                        }
                    }, promise);
                }
                function $$$internal$$handleOwnThenable(promise, thenable) {
                    if (thenable._state === $$$internal$$FULFILLED) {
                        $$$internal$$fulfill(promise, thenable._result);
                    } else if (promise._state === $$$internal$$REJECTED) {
                        $$$internal$$reject(promise, thenable._result);
                    } else {
                        $$$internal$$subscribe(thenable, undefined, function(value) {
                            if (thenable !== value) {
                                $$$internal$$resolve(promise, value);
                            } else {
                                $$$internal$$fulfill(promise, value);
                            }
                        }, function(reason) {
                            $$$internal$$reject(promise, reason);
                        });
                    }
                }
                function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
                    if (maybeThenable.constructor === promise.constructor) {
                        $$$internal$$handleOwnThenable(promise, maybeThenable);
                    } else {
                        var then = $$$internal$$getThen(maybeThenable);
                        if (then === $$$internal$$GET_THEN_ERROR) {
                            $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
                        } else if (then === undefined) {
                            $$$internal$$fulfill(promise, maybeThenable);
                        } else if ($$utils$$isFunction(then)) {
                            $$$internal$$handleForeignThenable(promise, maybeThenable, then);
                        } else {
                            $$$internal$$fulfill(promise, maybeThenable);
                        }
                    }
                }
                function $$$internal$$resolve(promise, value) {
                    if (promise === value) {
                        $$$internal$$fulfill(promise, value);
                    } else if ($$utils$$objectOrFunction(value)) {
                        $$$internal$$handleMaybeThenable(promise, value);
                    } else {
                        $$$internal$$fulfill(promise, value);
                    }
                }
                function $$$internal$$publishRejection(promise) {
                    if (promise._onerror) {
                        promise._onerror(promise._result);
                    }
                    $$$internal$$publish(promise);
                }
                function $$$internal$$fulfill(promise, value) {
                    if (promise._state !== $$$internal$$PENDING) {
                        return;
                    }
                    promise._result = value;
                    promise._state = $$$internal$$FULFILLED;
                    if (promise._subscribers.length === 0) {
                        if ($$rsvp$config$$config.instrument) {
                            $$instrument$$default("fulfilled", promise);
                        }
                    } else {
                        $$rsvp$config$$config.async($$$internal$$publish, promise);
                    }
                }
                function $$$internal$$reject(promise, reason) {
                    if (promise._state !== $$$internal$$PENDING) {
                        return;
                    }
                    promise._state = $$$internal$$REJECTED;
                    promise._result = reason;
                    $$rsvp$config$$config.async($$$internal$$publishRejection, promise);
                }
                function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                    var subscribers = parent._subscribers;
                    var length = subscribers.length;
                    parent._onerror = null;
                    subscribers[length] = child;
                    subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
                    subscribers[length + $$$internal$$REJECTED] = onRejection;
                    if (length === 0 && parent._state) {
                        $$rsvp$config$$config.async($$$internal$$publish, parent);
                    }
                }
                function $$$internal$$publish(promise) {
                    var subscribers = promise._subscribers;
                    var settled = promise._state;
                    if ($$rsvp$config$$config.instrument) {
                        $$instrument$$default(settled === $$$internal$$FULFILLED ? "fulfilled" : "rejected", promise);
                    }
                    if (subscribers.length === 0) {
                        return;
                    }
                    var child, callback, detail = promise._result;
                    for (var i = 0; i < subscribers.length; i += 3) {
                        child = subscribers[i];
                        callback = subscribers[i + settled];
                        if (child) {
                            $$$internal$$invokeCallback(settled, child, callback, detail);
                        } else {
                            callback(detail);
                        }
                    }
                    promise._subscribers.length = 0;
                }
                function $$$internal$$ErrorObject() {
                    this.error = null;
                }
                var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();
                function $$$internal$$tryCatch(callback, detail) {
                    try {
                        return callback(detail);
                    } catch (e) {
                        $$$internal$$TRY_CATCH_ERROR.error = e;
                        return $$$internal$$TRY_CATCH_ERROR;
                    }
                }
                function $$$internal$$invokeCallback(settled, promise, callback, detail) {
                    var hasCallback = $$utils$$isFunction(callback), value, error, succeeded, failed;
                    if (hasCallback) {
                        value = $$$internal$$tryCatch(callback, detail);
                        if (value === $$$internal$$TRY_CATCH_ERROR) {
                            failed = true;
                            error = value.error;
                            value = null;
                        } else {
                            succeeded = true;
                        }
                        if (promise === value) {
                            $$$internal$$reject(promise, new TypeError("A promises callback cannot return that same promise."));
                            return;
                        }
                    } else {
                        value = detail;
                        succeeded = true;
                    }
                    if (promise._state !== $$$internal$$PENDING) {} else if (hasCallback && succeeded) {
                        $$$internal$$resolve(promise, value);
                    } else if (failed) {
                        $$$internal$$reject(promise, error);
                    } else if (settled === $$$internal$$FULFILLED) {
                        $$$internal$$fulfill(promise, value);
                    } else if (settled === $$$internal$$REJECTED) {
                        $$$internal$$reject(promise, value);
                    }
                }
                function $$$internal$$initializePromise(promise, resolver) {
                    try {
                        resolver(function resolvePromise(value) {
                            $$$internal$$resolve(promise, value);
                        }, function rejectPromise(reason) {
                            $$$internal$$reject(promise, reason);
                        });
                    } catch (e) {
                        $$$internal$$reject(promise, e);
                    }
                }
                function $$enumerator$$makeSettledResult(state, position, value) {
                    if (state === $$$internal$$FULFILLED) {
                        return {
                            state: "fulfilled",
                            value: value
                        };
                    } else {
                        return {
                            state: "rejected",
                            reason: value
                        };
                    }
                }
                function $$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
                    this._instanceConstructor = Constructor;
                    this.promise = new Constructor($$$internal$$noop, label);
                    this._abortOnReject = abortOnReject;
                    if (this._validateInput(input)) {
                        this._input = input;
                        this.length = input.length;
                        this._remaining = input.length;
                        this._init();
                        if (this.length === 0) {
                            $$$internal$$fulfill(this.promise, this._result);
                        } else {
                            this.length = this.length || 0;
                            this._enumerate();
                            if (this._remaining === 0) {
                                $$$internal$$fulfill(this.promise, this._result);
                            }
                        }
                    } else {
                        $$$internal$$reject(this.promise, this._validationError());
                    }
                }
                $$enumerator$$Enumerator.prototype._validateInput = function(input) {
                    return $$utils$$isArray(input);
                };
                $$enumerator$$Enumerator.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array");
                };
                $$enumerator$$Enumerator.prototype._init = function() {
                    this._result = new Array(this.length);
                };
                var $$enumerator$$default = $$enumerator$$Enumerator;
                $$enumerator$$Enumerator.prototype._enumerate = function() {
                    var length = this.length;
                    var promise = this.promise;
                    var input = this._input;
                    for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
                        this._eachEntry(input[i], i);
                    }
                };
                $$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                    var c = this._instanceConstructor;
                    if ($$utils$$isMaybeThenable(entry)) {
                        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
                            entry._onerror = null;
                            this._settledAt(entry._state, i, entry._result);
                        } else {
                            this._willSettleAt(c.resolve(entry), i);
                        }
                    } else {
                        this._remaining--;
                        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
                    }
                };
                $$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                    var promise = this.promise;
                    if (promise._state === $$$internal$$PENDING) {
                        this._remaining--;
                        if (this._abortOnReject && state === $$$internal$$REJECTED) {
                            $$$internal$$reject(promise, value);
                        } else {
                            this._result[i] = this._makeResult(state, i, value);
                        }
                    }
                    if (this._remaining === 0) {
                        $$$internal$$fulfill(promise, this._result);
                    }
                };
                $$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
                    return value;
                };
                $$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                    var enumerator = this;
                    $$$internal$$subscribe(promise, undefined, function(value) {
                        enumerator._settledAt($$$internal$$FULFILLED, i, value);
                    }, function(reason) {
                        enumerator._settledAt($$$internal$$REJECTED, i, reason);
                    });
                };
                var $$promise$all$$default = function all(entries, label) {
                    return new $$enumerator$$default(this, entries, true, label).promise;
                };
                var $$promise$race$$default = function race(entries, label) {
                    var Constructor = this;
                    var promise = new Constructor($$$internal$$noop, label);
                    if (!$$utils$$isArray(entries)) {
                        $$$internal$$reject(promise, new TypeError("You must pass an array to race."));
                        return promise;
                    }
                    var length = entries.length;
                    function onFulfillment(value) {
                        $$$internal$$resolve(promise, value);
                    }
                    function onRejection(reason) {
                        $$$internal$$reject(promise, reason);
                    }
                    for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
                        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
                    }
                    return promise;
                };
                var $$promise$resolve$$default = function resolve(object, label) {
                    var Constructor = this;
                    if (object && typeof object === "object" && object.constructor === Constructor) {
                        return object;
                    }
                    var promise = new Constructor($$$internal$$noop, label);
                    $$$internal$$resolve(promise, object);
                    return promise;
                };
                var $$promise$reject$$default = function reject(reason, label) {
                    var Constructor = this;
                    var promise = new Constructor($$$internal$$noop, label);
                    $$$internal$$reject(promise, reason);
                    return promise;
                };
                var $$rsvp$promise$$guidKey = "rsvp_" + $$utils$$now() + "-";
                var $$rsvp$promise$$counter = 0;
                function $$rsvp$promise$$needsResolver() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                }
                function $$rsvp$promise$$needsNew() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                }
                var $$rsvp$promise$$default = $$rsvp$promise$$Promise;
                function $$rsvp$promise$$Promise(resolver, label) {
                    this._id = $$rsvp$promise$$counter++;
                    this._label = label;
                    this._state = undefined;
                    this._result = undefined;
                    this._subscribers = [];
                    if ($$rsvp$config$$config.instrument) {
                        $$instrument$$default("created", this);
                    }
                    if ($$$internal$$noop !== resolver) {
                        if (!$$utils$$isFunction(resolver)) {
                            $$rsvp$promise$$needsResolver();
                        }
                        if (!(this instanceof $$rsvp$promise$$Promise)) {
                            $$rsvp$promise$$needsNew();
                        }
                        $$$internal$$initializePromise(this, resolver);
                    }
                }
                $$rsvp$promise$$Promise.cast = $$promise$resolve$$default;
                $$rsvp$promise$$Promise.all = $$promise$all$$default;
                $$rsvp$promise$$Promise.race = $$promise$race$$default;
                $$rsvp$promise$$Promise.resolve = $$promise$resolve$$default;
                $$rsvp$promise$$Promise.reject = $$promise$reject$$default;
                $$rsvp$promise$$Promise.prototype = {
                    constructor: $$rsvp$promise$$Promise,
                    _guidKey: $$rsvp$promise$$guidKey,
                    _onerror: function(reason) {
                        $$rsvp$config$$config.trigger("error", reason);
                    },
                    then: function(onFulfillment, onRejection, label) {
                        var parent = this;
                        var state = parent._state;
                        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
                            if ($$rsvp$config$$config.instrument) {
                                $$instrument$$default("chained", this, this);
                            }
                            return this;
                        }
                        parent._onerror = null;
                        var child = new this.constructor($$$internal$$noop, label);
                        var result = parent._result;
                        if ($$rsvp$config$$config.instrument) {
                            $$instrument$$default("chained", parent, child);
                        }
                        if (state) {
                            var callback = arguments[state - 1];
                            $$rsvp$config$$config.async(function() {
                                $$$internal$$invokeCallback(state, child, callback, result);
                            });
                        } else {
                            $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                        }
                        return child;
                    },
                    "catch": function(onRejection, label) {
                        return this.then(null, onRejection, label);
                    },
                    "finally": function(callback, label) {
                        var constructor = this.constructor;
                        return this.then(function(value) {
                            return constructor.resolve(callback()).then(function() {
                                return value;
                            });
                        }, function(reason) {
                            return constructor.resolve(callback()).then(function() {
                                throw reason;
                            });
                        }, label);
                    }
                };
                function $$rsvp$node$$Result() {
                    this.value = undefined;
                }
                var $$rsvp$node$$ERROR = new $$rsvp$node$$Result();
                var $$rsvp$node$$GET_THEN_ERROR = new $$rsvp$node$$Result();
                function $$rsvp$node$$getThen(obj) {
                    try {
                        return obj.then;
                    } catch (error) {
                        $$rsvp$node$$ERROR.value = error;
                        return $$rsvp$node$$ERROR;
                    }
                }
                function $$rsvp$node$$tryApply(f, s, a) {
                    try {
                        f.apply(s, a);
                    } catch (error) {
                        $$rsvp$node$$ERROR.value = error;
                        return $$rsvp$node$$ERROR;
                    }
                }
                function $$rsvp$node$$makeObject(_, argumentNames) {
                    var obj = {};
                    var name;
                    var i;
                    var length = _.length;
                    var args = new Array(length);
                    for (var x = 0; x < length; x++) {
                        args[x] = _[x];
                    }
                    for (i = 0; i < argumentNames.length; i++) {
                        name = argumentNames[i];
                        obj[name] = args[i + 1];
                    }
                    return obj;
                }
                function $$rsvp$node$$arrayResult(_) {
                    var length = _.length;
                    var args = new Array(length - 1);
                    for (var i = 1; i < length; i++) {
                        args[i - 1] = _[i];
                    }
                    return args;
                }
                function $$rsvp$node$$wrapThenable(then, promise) {
                    return {
                        then: function(onFulFillment, onRejection) {
                            return then.call(promise, onFulFillment, onRejection);
                        }
                    };
                }
                var $$rsvp$node$$default = function denodeify(nodeFunc, options) {
                    var fn = function() {
                        var self = this;
                        var l = arguments.length;
                        var args = new Array(l + 1);
                        var arg;
                        var promiseInput = false;
                        for (var i = 0; i < l; ++i) {
                            arg = arguments[i];
                            if (!promiseInput) {
                                promiseInput = $$rsvp$node$$needsPromiseInput(arg);
                                if (promiseInput === $$rsvp$node$$GET_THEN_ERROR) {
                                    var p = new $$rsvp$promise$$default($$$internal$$noop);
                                    $$$internal$$reject(p, $$rsvp$node$$GET_THEN_ERROR.value);
                                    return p;
                                } else if (promiseInput && promiseInput !== true) {
                                    arg = $$rsvp$node$$wrapThenable(promiseInput, arg);
                                }
                            }
                            args[i] = arg;
                        }
                        var promise = new $$rsvp$promise$$default($$$internal$$noop);
                        args[l] = function(err, val) {
                            if (err) $$$internal$$reject(promise, err); else if (options === undefined) $$$internal$$resolve(promise, val); else if (options === true) $$$internal$$resolve(promise, $$rsvp$node$$arrayResult(arguments)); else if ($$utils$$isArray(options)) $$$internal$$resolve(promise, $$rsvp$node$$makeObject(arguments, options)); else $$$internal$$resolve(promise, val);
                        };
                        if (promiseInput) {
                            return $$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
                        } else {
                            return $$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
                        }
                    };
                    fn.__proto__ = nodeFunc;
                    return fn;
                };
                function $$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
                    var result = $$rsvp$node$$tryApply(nodeFunc, self, args);
                    if (result === $$rsvp$node$$ERROR) {
                        $$$internal$$reject(promise, result.value);
                    }
                    return promise;
                }
                function $$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self) {
                    return $$rsvp$promise$$default.all(args).then(function(args) {
                        var result = $$rsvp$node$$tryApply(nodeFunc, self, args);
                        if (result === $$rsvp$node$$ERROR) {
                            $$$internal$$reject(promise, result.value);
                        }
                        return promise;
                    });
                }
                function $$rsvp$node$$needsPromiseInput(arg) {
                    if (arg && typeof arg === "object") {
                        if (arg.constructor === $$rsvp$promise$$default) {
                            return true;
                        } else {
                            return $$rsvp$node$$getThen(arg);
                        }
                    } else {
                        return false;
                    }
                }
                var $$rsvp$all$$default = function all(array, label) {
                    return $$rsvp$promise$$default.all(array, label);
                };
                function $$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
                    this._superConstructor(Constructor, entries, false, label);
                }
                $$rsvp$all$settled$$AllSettled.prototype = $$utils$$o_create($$enumerator$$default.prototype);
                $$rsvp$all$settled$$AllSettled.prototype._superConstructor = $$enumerator$$default;
                $$rsvp$all$settled$$AllSettled.prototype._makeResult = $$enumerator$$makeSettledResult;
                $$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
                    return new Error("allSettled must be called with an array");
                };
                var $$rsvp$all$settled$$default = function allSettled(entries, label) {
                    return new $$rsvp$all$settled$$AllSettled($$rsvp$promise$$default, entries, label).promise;
                };
                var $$rsvp$race$$default = function race(array, label) {
                    return $$rsvp$promise$$default.race(array, label);
                };
                function $$promise$hash$$PromiseHash(Constructor, object, label) {
                    this._superConstructor(Constructor, object, true, label);
                }
                var $$promise$hash$$default = $$promise$hash$$PromiseHash;
                $$promise$hash$$PromiseHash.prototype = $$utils$$o_create($$enumerator$$default.prototype);
                $$promise$hash$$PromiseHash.prototype._superConstructor = $$enumerator$$default;
                $$promise$hash$$PromiseHash.prototype._init = function() {
                    this._result = {};
                };
                $$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
                    return input && typeof input === "object";
                };
                $$promise$hash$$PromiseHash.prototype._validationError = function() {
                    return new Error("Promise.hash must be called with an object");
                };
                $$promise$hash$$PromiseHash.prototype._enumerate = function() {
                    var promise = this.promise;
                    var input = this._input;
                    var results = [];
                    for (var key in input) {
                        if (promise._state === $$$internal$$PENDING && input.hasOwnProperty(key)) {
                            results.push({
                                position: key,
                                entry: input[key]
                            });
                        }
                    }
                    var length = results.length;
                    this._remaining = length;
                    var result;
                    for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
                        result = results[i];
                        this._eachEntry(result.entry, result.position);
                    }
                };
                var $$rsvp$hash$$default = function hash(object, label) {
                    return new $$promise$hash$$default($$rsvp$promise$$default, object, label).promise;
                };
                function $$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
                    this._superConstructor(Constructor, object, false, label);
                }
                $$rsvp$hash$settled$$HashSettled.prototype = $$utils$$o_create($$promise$hash$$default.prototype);
                $$rsvp$hash$settled$$HashSettled.prototype._superConstructor = $$enumerator$$default;
                $$rsvp$hash$settled$$HashSettled.prototype._makeResult = $$enumerator$$makeSettledResult;
                $$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
                    return new Error("hashSettled must be called with an object");
                };
                var $$rsvp$hash$settled$$default = function hashSettled(object, label) {
                    return new $$rsvp$hash$settled$$HashSettled($$rsvp$promise$$default, object, label).promise;
                };
                var $$rsvp$rethrow$$default = function rethrow(reason) {
                    setTimeout(function() {
                        throw reason;
                    });
                    throw reason;
                };
                var $$rsvp$defer$$default = function defer(label) {
                    var deferred = {};
                    deferred.promise = new $$rsvp$promise$$default(function(resolve, reject) {
                        deferred.resolve = resolve;
                        deferred.reject = reject;
                    }, label);
                    return deferred;
                };
                var $$rsvp$map$$default = function map(promises, mapFn, label) {
                    return $$rsvp$promise$$default.all(promises, label).then(function(values) {
                        if (!$$utils$$isFunction(mapFn)) {
                            throw new TypeError("You must pass a function as map's second argument.");
                        }
                        var length = values.length;
                        var results = new Array(length);
                        for (var i = 0; i < length; i++) {
                            results[i] = mapFn(values[i]);
                        }
                        return $$rsvp$promise$$default.all(results, label);
                    });
                };
                var $$rsvp$resolve$$default = function resolve(value, label) {
                    return $$rsvp$promise$$default.resolve(value, label);
                };
                var $$rsvp$reject$$default = function reject(reason, label) {
                    return $$rsvp$promise$$default.reject(reason, label);
                };
                var $$rsvp$filter$$default = function filter(promises, filterFn, label) {
                    return $$rsvp$promise$$default.all(promises, label).then(function(values) {
                        if (!$$utils$$isFunction(filterFn)) {
                            throw new TypeError("You must pass a function as filter's second argument.");
                        }
                        var length = values.length;
                        var filtered = new Array(length);
                        for (var i = 0; i < length; i++) {
                            filtered[i] = filterFn(values[i]);
                        }
                        return $$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
                            var results = new Array(length);
                            var newLength = 0;
                            for (var i = 0; i < length; i++) {
                                if (filtered[i]) {
                                    results[newLength] = values[i];
                                    newLength++;
                                }
                            }
                            results.length = newLength;
                            return results;
                        });
                    });
                };
                var $$rsvp$asap$$len = 0;
                var $$rsvp$asap$$default = function asap(callback, arg) {
                    $$rsvp$asap$$queue[$$rsvp$asap$$len] = callback;
                    $$rsvp$asap$$queue[$$rsvp$asap$$len + 1] = arg;
                    $$rsvp$asap$$len += 2;
                    if ($$rsvp$asap$$len === 2) {
                        $$rsvp$asap$$scheduleFlush();
                    }
                };
                var $$rsvp$asap$$browserGlobal = typeof window !== "undefined" ? window : {};
                var $$rsvp$asap$$BrowserMutationObserver = $$rsvp$asap$$browserGlobal.MutationObserver || $$rsvp$asap$$browserGlobal.WebKitMutationObserver;
                var $$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
                function $$rsvp$asap$$useNextTick() {
                    return function() {
                        process.nextTick($$rsvp$asap$$flush);
                    };
                }
                function $$rsvp$asap$$useMutationObserver() {
                    var iterations = 0;
                    var observer = new $$rsvp$asap$$BrowserMutationObserver($$rsvp$asap$$flush);
                    var node = document.createTextNode("");
                    observer.observe(node, {
                        characterData: true
                    });
                    return function() {
                        node.data = iterations = ++iterations % 2;
                    };
                }
                function $$rsvp$asap$$useMessageChannel() {
                    var channel = new MessageChannel();
                    channel.port1.onmessage = $$rsvp$asap$$flush;
                    return function() {
                        channel.port2.postMessage(0);
                    };
                }
                function $$rsvp$asap$$useSetTimeout() {
                    return function() {
                        setTimeout($$rsvp$asap$$flush, 1);
                    };
                }
                var $$rsvp$asap$$queue = new Array(1e3);
                function $$rsvp$asap$$flush() {
                    for (var i = 0; i < $$rsvp$asap$$len; i += 2) {
                        var callback = $$rsvp$asap$$queue[i];
                        var arg = $$rsvp$asap$$queue[i + 1];
                        callback(arg);
                        $$rsvp$asap$$queue[i] = undefined;
                        $$rsvp$asap$$queue[i + 1] = undefined;
                    }
                    $$rsvp$asap$$len = 0;
                }
                var $$rsvp$asap$$scheduleFlush;
                if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
                    $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useNextTick();
                } else if ($$rsvp$asap$$BrowserMutationObserver) {
                    $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useMutationObserver();
                } else if ($$rsvp$asap$$isWorker) {
                    $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useMessageChannel();
                } else {
                    $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useSetTimeout();
                }
                $$rsvp$config$$config.async = $$rsvp$asap$$default;
                var $$rsvp$$cast = $$rsvp$resolve$$default;
                function $$rsvp$$async(callback, arg) {
                    $$rsvp$config$$config.async(callback, arg);
                }
                function $$rsvp$$on() {
                    $$rsvp$config$$config.on.apply($$rsvp$config$$config, arguments);
                }
                function $$rsvp$$off() {
                    $$rsvp$config$$config.off.apply($$rsvp$config$$config, arguments);
                }
                if (typeof window !== "undefined" && typeof window["__PROMISE_INSTRUMENTATION__"] === "object") {
                    var $$rsvp$$callbacks = window["__PROMISE_INSTRUMENTATION__"];
                    $$rsvp$config$$configure("instrument", true);
                    for (var $$rsvp$$eventName in $$rsvp$$callbacks) {
                        if ($$rsvp$$callbacks.hasOwnProperty($$rsvp$$eventName)) {
                            $$rsvp$$on($$rsvp$$eventName, $$rsvp$$callbacks[$$rsvp$$eventName]);
                        }
                    }
                }
                var rsvp$umd$$RSVP = {
                    race: $$rsvp$race$$default,
                    Promise: $$rsvp$promise$$default,
                    allSettled: $$rsvp$all$settled$$default,
                    hash: $$rsvp$hash$$default,
                    hashSettled: $$rsvp$hash$settled$$default,
                    denodeify: $$rsvp$node$$default,
                    on: $$rsvp$$on,
                    off: $$rsvp$$off,
                    map: $$rsvp$map$$default,
                    filter: $$rsvp$filter$$default,
                    resolve: $$rsvp$resolve$$default,
                    reject: $$rsvp$reject$$default,
                    all: $$rsvp$all$$default,
                    rethrow: $$rsvp$rethrow$$default,
                    defer: $$rsvp$defer$$default,
                    EventTarget: $$rsvp$events$$default,
                    configure: $$rsvp$config$$configure,
                    async: $$rsvp$$async
                };
                if (typeof define === "function" && define.amd) {
                    define(function() {
                        return rsvp$umd$$RSVP;
                    });
                } else if (typeof module !== "undefined" && module.exports) {
                    module.exports = rsvp$umd$$RSVP;
                } else if (typeof this !== "undefined") {
                    this["RSVP"] = rsvp$umd$$RSVP;
                }
            }).call(this);
        }).call(this, require("_process"));
    }, {
        _process: 5
    } ]
}, {}, [ 3 ]);