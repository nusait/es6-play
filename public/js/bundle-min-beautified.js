!
function e(t, r, n) {
    function i(s, u) {
        if (!r[s]) {
            if (!t[s]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(s, !0);
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = r[s] = {
                exports: {}
            };
            t[s][0].call(l.exports, function (e) {
                var r = t[s][1][e];
                return i(r ? r : e)
            }, l, l.exports, e, t, r, n)
        }
        return r[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) i(n[s]);
    return i
}({
    1: [function (e, t) {
        "use strict";
        var r = e("Wildcat.View.View"),
            n = function () {
                $traceurRuntime.defaultSuperCall(this, i.prototype, arguments)
            },
            i = n;
        $traceurRuntime.createClass(n, {
            hi: function () {
                console.log("I am the introview")
            }
        }, {}, r), t.exports = n
    },
    {
        "Wildcat.View.View": 21
    }],
    2: [function (e) {
        "use strict";
        var t = e("Wildcat.Foundation.Application");
        window.App = t
    },
    {
        "Wildcat.Foundation.Application": 12
    }],
    3: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Log.LogServiceProvider"),
            n = e("Wildcat.DOM.WindowServiceProvider"),
            i = e("Wildcat.View.ViewServiceProvider");
        t.exports = {
            debug: !1,
            providers: [r, n, i],
            locale: "en",
            get browser() {
                return window.navigator.userAgent
            }
        }
    },
    {
        "Wildcat.DOM.WindowServiceProvider": 10,
        "Wildcat.Log.LogServiceProvider": 16,
        "Wildcat.View.ViewServiceProvider": 22
    }],
    4: [function (e, t) {
        "use strict";
        t.exports = {
            app: e("./app"),
            "local.app": e("./local/app"),
            views: e("./views")
        }
    },
    {
        "./app": 3,
        "./local/app": 5,
        "./views": 6
    }],
    5: [function (e, t) {
        "use strict";
        t.exports = {
            debug: !0
        }
    },
    {}],
    6: [function (e, t) {
        "use strict";
        var r = e("App.Browser.Views.IntroView");
        t.exports = [{
            "abstract": "introView",
            $constructor: r,
            build: "singleton"
        }]
    },
    {
        "App.Browser.Views.IntroView": 1
    }],
    7: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.state"),
            n = function () {
                var e = void 0 !== arguments[0] ? arguments[0] : {},
                    t = r(this, {});
                t.configObj = e
            };
        $traceurRuntime.createClass(n, {
            load: function (e, t) {
                var n = (void 0 !== arguments[2] ? arguments[2] : null, r(this)),
                    i = n.configObj,
                    o = {};
                return this.exists(t) && (o = i[t]), i[e + "." + t] && Object.assign(o, i[e + "." + t]), o
            },
            exists: function (e) {
                var t = (void 0 !== arguments[1] ? arguments[1] : null, r(this)),
                    n = t.configObj;
                return n[e] ? !0 : !1
            }
        }, {}), t.exports = n
    },
    {
        "Wildcat.Support.state": 20
    }],
    8: [function (e, t) {
        "use strict";

        function r(e) {
            var t = e.split(".");
            return n(t)
        }
        function n(e) {
            var t = e[0];
            return 1 === e.length ? [null, t, null] : [null, t, e[1]]
        }
        var i = e("Wildcat.Support.state"),
            o = function (e, t) {
                var r = i(this, {});
                r.loader = e, r.environment = t
            };
        $traceurRuntime.createClass(o, {
            has: function () {},
            get: function (e, t) {
                var n = i(this),
                    o = $traceurRuntime.assertObject(n).environment,
                    s = $traceurRuntime.assertObject(r(e)),
                    u = s[0],
                    a = s[1],
                    c = s[2],
                    l = n.loader.load(o, a, u);
                return c ? void 0 !== l[c] ? l[c] : t : l
            },
            set: function () {}
        }, {}), t.exports = o
    },
    {
        "Wildcat.Support.state": 20
    }],
    9: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.state"),
            n = e("events").EventEmitter,
            i = e("Wildcat.Support.helpers"),
            o = function () {
                n.call(this);
                var e = r(this, {});
                e.bindings = {}, e.instances = {}
            };
        $traceurRuntime.createClass(o, {
            make: function (e) {
                var t = (void 0 !== arguments[1] ? arguments[1] : [], this.getConcrete(e)),
                    r = t(this);
                return r
            },
            bind: function (e) {
                var t = void 0 !== arguments[1] ? arguments[1] : null,
                    n = void 0 !== arguments[2] ? arguments[2] : !1,
                    i = "bind",
                    o = this;
                r(this).bindings[e] = {
                    concrete: t,
                    shared: n
                }, this.makeAccessorProperty(e), this.emit("bind." + e, h({
                    type: i + "." + e,
                    target: o,
                    "abstract": e,
                    shared: n
                })), this.emit("bind", h({
                    type: i,
                    target: o,
                    "abstract": e,
                    shared: n
                }))
            },
            bindShared: function (e, t) {
                for (var r, n, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
                if (Array.isArray(e)) for (var s, u = e[Symbol.iterator](); !(s = u.next()).done;) {
                    var a = s.value;
                    (r = this).bindShared.apply(r, $traceurRuntime.spread(a))
                } else this.bind(e, (n = this).share.apply(n, $traceurRuntime.spread([t], i)), !0)
            },
            getConcrete: function (e) {
                return r(this).bindings[e].concrete
            },
            isShared: function (e) {
                var t = r(this);
                return t.instances[e] ? !0 : t.bindings[e] ? r.bindings[e].shared : !1
            },
            getBindings: function () {
                return r(this).bindings
            },
            getBindingsKeys: function () {
                return u(this.getBindings())
            },
            newInstanceOf: function (e, t) {
                for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
                this.bind(e, function () {
                    return new(Function.prototype.bind.apply(t, $traceurRuntime.spread([null], r)))
                }, !1)
            },
            singleton: function (e, t) {
                for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
                this.bindShared(e, function () {
                    return new(Function.prototype.bind.apply(t, $traceurRuntime.spread([null], r)))
                })
            },
            share: function (e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                var n;
                return function (r) {
                    return void 0 === n && (n = e.apply(null, $traceurRuntime.spread([r], t))), n
                }
            },
            forgetInstance: function (e) {
                delete r(this).instances[e]
            },
            makeAccessorProperty: function (e) {
                this.abstract || Object.defineProperty(this, e, {
                    get: function () {
                        return this.make(e)
                    }
                })
            },
            getState: function () {
                console.dir(r)
            },
            getItems: function () {
                return this.getBindingsKeys()
            },
            forEach: function (e, t) {
                var r = this;
                return t = c(t, this), this.getItems().forEach(function (n, i) {
                    return e.call(t, n, i, r)
                })
            },
            map: function (e, t) {
                var r = this;
                return t = c(t, this), this.getItems().map(function (n, i) {
                    return e.call(t, n, i, r)
                })
            },
            filter: function (e, t) {
                var r = this;
                return t = c(t, this), this.getItems().filter(function (n, i) {
                    return e.call(t, n, i, r)
                })
            },
            getIterator: function () {
                return l(this.getItems())
            }
        }, {});
        var s = $traceurRuntime.assertObject(i),
            u = s.keys,
            a = s.implementIterator,
            c = (s.isUndefined, s.isDefined, s.defined),
            l = s.arrayIterator,
            f = s.extendProtoOf,
            h = s.noProto;
        f(o, n), a(o), t.exports = o
    },
    {
        "Wildcat.Support.helpers": 18,
        "Wildcat.Support.state": 20,
        events: 23
    }],
    10: [function (e, t) {
        (function (r) {
            "use strict";
            var n = e("Wildcat.Support.ServiceProvider"),
                i = function () {
                    $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
                },
                o = i;
            $traceurRuntime.createClass(i, {
                register: function () {
                    var e = this.app;
                    e.bindShared("window", function () {
                        return r
                    })
                },
                provides: function () {
                    return ["window"]
                }
            }, {}, n), t.exports = i
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {
        "Wildcat.Support.ServiceProvider": 17
    }],
    11: [function (e, t) {
        "use strict";

        function r(e) {
            return s(e) ? this._app[e] : e
        }
        var n = e("events").EventEmitter,
            i = $traceurRuntime.assertObject(e("Wildcat.Support.helpers")),
            o = i.extendProtoOf,
            s = i.isString,
            u = function (e) {
                this._app = e, n.call(this)
            };
        $traceurRuntime.createClass(u, {
            subscribe: function (e) {
                e = r.call(this), e.subscribe(this)
            }
        }, {}), o(u, n), t.exports = u
    },
    {
        "Wildcat.Support.helpers": 18,
        events: 23
    }],
    12: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Container.Container"),
            n = e("Wildcat.Config.Repository"),
            i = e("Wildcat.Config.ModuleLoader"),
            o = e("Wildcat.Events.Dispatcher"),
            s = e("Wildcat.Foundation.start"),
            u = e("Wildcat.Foundation.ProviderRepository"),
            a = e("config.config"),
            c = $traceurRuntime.assertObject(e("Wildcat.Support.helpers")).value,
            l = {},
            f = function () {
                $traceurRuntime.defaultSuperCall(this, h.prototype, arguments)
            },
            h = f;
        $traceurRuntime.createClass(f, {
            detectEnvironment: function (e) {
                return l.env = c(e)
            },
            isLocal: function () {
                return this.environment("local")
            },
            environment: function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return e.length ? -1 !== e.indexOf(l.env) : l.env
            },
            getConfigLoader: function () {
                return new i(a)
            },
            registerCoreContainerBindings: function () {
                var e = this,
                    t = e.getConfigLoader(),
                    r = e.environment();
                e.bindShared([
                    ["config", function () {
                        return new n(t, r)
                    }],
                    ["events", function (e) {
                        return new o(e)
                    }]
                ])
            },
            getProviderRepository: function () {
                return new u
            },
            start: function () {
                s.call(this)
            },
            run: function () {
                console.log("app running!")
            },
            register: function (e) {
                return e.register(), e
            }
        }, {}, r), t.exports = f
    },
    {
        "Wildcat.Config.ModuleLoader": 7,
        "Wildcat.Config.Repository": 8,
        "Wildcat.Container.Container": 9,
        "Wildcat.Events.Dispatcher": 11,
        "Wildcat.Foundation.ProviderRepository": 13,
        "Wildcat.Foundation.start": 14,
        "Wildcat.Support.helpers": 18,
        "config.config": 4
    }],
    13: [function (e, t) {
        "use strict";
        var r = function () {};
        $traceurRuntime.createClass(r, {
            load: function (e, t) {
                for (var r, n = t[Symbol.iterator](); !(r = n.next()).done;) {
                    var i = r.value;
                    e.register(this.createProvider(e, i))
                }
            },
            createProvider: function (e, t) {
                return new t(e)
            }
        }, {}), t.exports = r
    },
    {}],
    14: [function (e, t) {
        "use strict";

        function r() {
            {
                var e, t, r = this;
                r.environment()
            }
            r.bindShared("app", function () {
                return r
            }), r.registerCoreContainerBindings(), t = r.config, e = t.get("app").providers, r.getProviderRepository().load(r, e)
        }
        e("Wildcat.Config.Repository");
        t.exports = r
    },
    {
        "Wildcat.Config.Repository": 8
    }],
    15: [function (e, t) {
        (function (r) {
            "use strict";
            var n = e("Wildcat.Support.state"),
                i = function () {
                    var e = void 0 !== arguments[0] ? arguments[0] : r,
                        t = n(this, {});
                    t.window = e, t.console = e.console
                };
            $traceurRuntime.createClass(i, {
                log: function () {
                    for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    (e = n(this).console).log.apply(e, $traceurRuntime.spread(t))
                },
                error: function () {
                    for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    (e = n(this).console).error.apply(e, $traceurRuntime.spread(t))
                },
                dir: function () {
                    for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    (e = n(this).console).dir.apply(e, $traceurRuntime.spread(t))
                }
            }, {}), t.exports = i
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {
        "Wildcat.Support.state": 20
    }],
    16: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.ServiceProvider"),
            n = e("Wildcat.Log.ConsoleLogger"),
            i = function () {
                $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
            },
            o = i;
        $traceurRuntime.createClass(i, {
            register: function () {
                this.app.singleton("log", n)
            },
            provides: function () {
                return ["log"]
            }
        }, {}, r), t.exports = i
    },
    {
        "Wildcat.Log.ConsoleLogger": 15,
        "Wildcat.Support.ServiceProvider": 17
    }],
    17: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.state"),
            n = function (e) {
                var t = r(this, {});
                t.app = e
            };
        $traceurRuntime.createClass(n, {
            register: function () {},
            get app() {
                return r(this).app
            }
        }, {}), t.exports = n
    },
    {
        "Wildcat.Support.state": 20
    }],
    18: [function (e, t) {
        "use strict";

        function r(e) {
            return Object.keys(e)
        }
        function n() {
            for (var e, t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            return (e = Object).assign.apply(e, $traceurRuntime.spread(t))
        }
        function i(e, t) {
            var n = void 0 !== arguments[2] ? arguments[2] : [];
            if (a(n)) return void(e.prototype[n] = t.prototype[n]);
            for (var i, o = r(t.prototype), s = o[Symbol.iterator](); !(i = s.next()).done;) {
                var n = i.value;
                e.prototype[n] = t.prototype[n]
            }
        }
        function o(e) {
            var t = e.prototype;
            t[Symbol.iterator] = t.getIterator
        }
        function s(e) {
            return "function" == typeof e ? e() : e
        }
        function u(e) {
            return null === e
        }
        function a(e) {
            return "string" == typeof e
        }
        function c(e) {
            return void 0 === e
        }
        function l(e) {
            return !c(e)
        }
        function f(e, t) {
            return l(e) ? e : t
        }
        function h() {
            var e = void 0 !== arguments[0] ? arguments[0] : 500;
            return new Promise(function (t) {
                setTimeout(t, e)
            })
        }
        function p() {
            for (var e, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            var n = window.console;
            (e = n).log.apply(e, $traceurRuntime.spread(t))
        }
        function v(e) {
            return function () {
                function t(e) {
                    return e.done ? r.resolve(e.value) : r.resolve(e.value).then(function (e) {
                        return t(n.next(e))
                    }, function (e) {
                        return t(n.
                        throw (e))
                    })
                }
                var r = Promise,
                    n = e.apply(this, arguments);
                try {
                    return t(n.next())
                } catch (i) {
                    return r.reject(i)
                }
            }
        }
        function d() {
            var e = void 0 !== arguments[0] ? arguments[0] : [],
                t = 0,
                r = e.length;
            return {
                next: function () {
                    var n, i;
                    return (i = r > t) && (n = e[t++]), {
                        value: n,
                        done: !i
                    }
                }
            }
        }
        function g() {
            var e = void 0 !== arguments[0] ? arguments[0] : {},
                t = Object.create(null);
            return Object.assign(t, e), t
        }
        var b = {
            keys: r,
            assign: n,
            extendProtoOf: i,
            implementIterator: o,
            value: s,
            isNull: u,
            isString: a,
            isUndefined: c,
            isDefined: l,
            defined: f,
            wait: h,
            log: p,
            async: v,
            arrayIterator: d,
            noProto: g
        };
        t.exports = b
    },
    {}],
    19: [function (e, t) {
        (function (r) {
            "use strict";
            e("observe-js");
            t.exports = {
                Observer: r.Observer,
                ArrayObserver: r.ArrayObserver,
                ArraySplice: r.ArraySplice,
                ObjectObserver: r.ObjectObserver,
                PathObserver: r.PathObserver,
                CompoundObserver: r.CompoundObserver,
                Path: r.Path,
                ObserverTransform: r.ObserverTransform,
                Platform: r.Platform
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {
        "observe-js": 26
    }],
    20: [function (e, t) {
        (function (r) {
            "use strict";

            function n(e, t) {
                return i(t) ? s.get(e) : (s.set(e, t), s.get(e))
            }
            var i = $traceurRuntime.assertObject(e("Wildcat.Support.helpers")).isUndefined,
                o = r.WeakMap || r.Map;
            console.log("supports " + o.name);
            var s = new o;
            t.exports = n
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {
        "Wildcat.Support.helpers": 18
    }],
    21: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.state"),
            n = e("Wildcat.Support.observe"),
            i = $traceurRuntime.assertObject(n),
            o = i.PathObserver,
            s = i.Platform,
            u = function () {
                var e = void 0 !== arguments[0] ? arguments[0] : null,
                    t = r(this, {});
                t.el = e, console.log("being constructed"), this.bindStateEvents()
            };
        $traceurRuntime.createClass(u, {
            bindStateEvents: function () {
                var e = r(this);
                e.elObserver = new o(e, "el"), e.elObserver.open(this.onElChange.bind(this))
            },
            onElChange: function (e, t) {
                console.log("newValue = " + e), console.log("oldValue = " + t)
            },
            setElement: function (e) {
                var t = void 0 !== arguments[1] ? arguments[1] : !1,
                    n = r(this);
                n.el = e, t && n.elObserver.discardChanges(), s.performMicrotaskCheckpoint()
            },
            get el() {
                return r(this).el
            },
            set el(e) {
                this.setElement(e)
            },
            render: function () {}
        }, {}), t.exports = u
    },
    {
        "Wildcat.Support.observe": 19,
        "Wildcat.Support.state": 20
    }],
    22: [function (e, t) {
        "use strict";
        var r = e("Wildcat.Support.ServiceProvider"),
            n = (e("Wildcat.View.View"), function () {
                $traceurRuntime.defaultSuperCall(this, i.prototype, arguments)
            }),
            i = n;
        $traceurRuntime.createClass(n, {
            register: function () {
                for (var e, t = this.app, r = t.config, n = r.get("views"), i = n[Symbol.iterator](); !(e = i.next()).done;) {
                    var o = $traceurRuntime.assertObject(e.value),
                        s = o.abstract,
                        u = o.$constructor,
                        a = o.build;
                    switch (a) {
                    case "singleton":
                        t.singleton(s, u)
                    }
                }
            }
        }, {}, r), t.exports = n
    },
    {
        "Wildcat.Support.ServiceProvider": 17,
        "Wildcat.View.View": 21
    }],
    23: [function (e, t) {
        function r() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }
        function n(e) {
            return "function" == typeof e
        }
        function i(e) {
            return "number" == typeof e
        }
        function o(e) {
            return "object" == typeof e && null !== e
        }
        function s(e) {
            return void 0 === e
        }
        t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
            if (!i(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, r.prototype.emit = function (e) {
            var t, r, i, u, a, c;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if (t = arguments[1], t instanceof Error) throw t;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (r = this._events[e], s(r)) return !1;
            if (n(r)) switch (arguments.length) {
            case 1:
                r.call(this);
                break;
            case 2:
                r.call(this, arguments[1]);
                break;
            case 3:
                r.call(this, arguments[1], arguments[2]);
                break;
            default:
                for (i = arguments.length, u = new Array(i - 1), a = 1; i > a; a++) u[a - 1] = arguments[a];
                r.apply(this, u)
            } else if (o(r)) {
                for (i = arguments.length, u = new Array(i - 1), a = 1; i > a; a++) u[a - 1] = arguments[a];
                for (c = r.slice(), i = c.length, a = 0; i > a; a++) c[a].apply(this, u)
            }
            return !0
        }, r.prototype.addListener = function (e, t) {
            var i;
            if (!n(t)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned) {
                var i;
                i = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
            function r() {
                this.removeListener(e, r), i || (i = !0, t.apply(this, arguments))
            }
            if (!n(t)) throw TypeError("listener must be a function");
            var i = !1;
            return r.listener = t, this.on(e, r), this
        }, r.prototype.removeListener = function (e, t) {
            var r, i, s, u;
            if (!n(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (r = this._events[e], s = r.length, i = -1, r === t || n(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (o(r)) {
                for (u = s; u-- > 0;) if (r[u] === t || r[u].listener && r[u].listener === t) {
                    i = u;
                    break
                }
                if (0 > i) return this;
                1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, r.prototype.removeAllListeners = function (e) {
            var t, r;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (r = this._events[e], n(r)) this.removeListener(e, r);
            else for (; r.length;) this.removeListener(e, r[r.length - 1]);
            return delete this._events[e], this
        }, r.prototype.listeners = function (e) {
            var t;
            return t = this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, r.listenerCount = function (e, t) {
            var r;
            return r = e._events && e._events[t] ? n(e._events[t]) ? 1 : e._events[t].length : 0
        }
    },
    {}],
    24: [function (e, t) {
        function r() {}
        var n = t.exports = {};
        n.nextTick = function () {
            var e = "undefined" != typeof window && window.setImmediate,
                t = "undefined" != typeof window && window.postMessage && window.addEventListener;
            if (e) return function (e) {
                return window.setImmediate(e)
            };
            if (t) {
                var r = [];
                return window.addEventListener("message", function (e) {
                    var t = e.source;
                    if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), r.length > 0)) {
                        var n = r.shift();
                        n()
                    }
                }, !0), function (e) {
                    r.push(e), window.postMessage("process-tick", "*")
                }
            }
            return function (e) {
                setTimeout(e, 0)
            }
        }(), n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.on = r, n.addListener = r, n.once = r, n.off = r, n.removeListener = r, n.removeAllListeners = r, n.emit = r, n.binding = function () {
            throw new Error("process.binding is not supported")
        }, n.cwd = function () {
            return "/"
        }, n.chdir = function () {
            throw new Error("process.chdir is not supported")
        }
    },
    {}],
    25: [function (e) {
        (function (e, t) {
            !
            function (e) {
                "use strict";

                function t(e) {
                    return {
                        configurable: !0,
                        enumerable: !1,
                        value: e,
                        writable: !0
                    }
                }
                function r() {
                    return "__$" + Math.floor(1e9 * Math.random()) + "$" + ++D + "$__"
                }
                function n() {
                    var e = r();
                    return Q[e] = !0, e
                }
                function i(e) {
                    return "object" == typeof e && e instanceof u
                }
                function o(e) {
                    return i(e) ? "symbol" : typeof e
                }
                function s(e) {
                    var t = new u(e);
                    if (!(this instanceof s)) return t;
                    throw new TypeError("Symbol cannot be new'ed")
                }
                function u(e) {
                    var t = r();
                    $(this, z, {
                        value: this
                    }), $(this, U, {
                        value: t
                    }), $(this, H, {
                        value: e
                    }), c(this), B[t] = this
                }
                function a(e) {
                    var t = e[q];
                    return t && t.self === e ? t : L(e) ? (Z.hash.value = X++, Z.self.value = e, K.value = R(null, Z), $(e, q, K), K.value) : void 0
                }
                function c(e) {
                    return a(e), I.apply(this, arguments)
                }
                function l(e) {
                    return a(e), W.apply(this, arguments)
                }
                function f(e) {
                    return a(e), F.apply(this, arguments)
                }
                function h(e) {
                    return i(e) ? e[U] : e
                }
                function p(e) {
                    for (var t = [], r = M(e), n = 0; n < r.length; n++) {
                        var i = r[n];
                        B[i] || Q[i] || t.push(i)
                    }
                    return t
                }
                function v(e, t) {
                    return A(e, h(t))
                }
                function d(e) {
                    for (var t = [], r = M(e), n = 0; n < r.length; n++) {
                        var i = B[r[n]];
                        i && t.push(i)
                    }
                    return t
                }
                function g(e) {
                    return N.call(this, h(e))
                }
                function b(t) {
                    return e.traceur && e.traceur.options[t]
                }
                function m(e, t, r) {
                    var n, o;
                    return i(t) && (n = t, t = t[U]), e[t] = r, n && (o = A(e, t)) && $(e, t, {
                        enumerable: !1
                    }), r
                }
                function y(e, t, r) {
                    return i(t) && (r.enumerable && (r = R(r, {
                        enumerable: {
                            value: !1
                        }
                    })), t = t[U]), $(e, t, r), e
                }
                function _(e) {
                    $(e, "defineProperty", {
                        value: y
                    }), $(e, "getOwnPropertyNames", {
                        value: p
                    }), $(e, "getOwnPropertyDescriptor", {
                        value: v
                    }), $(e.prototype, "hasOwnProperty", {
                        value: g
                    }), $(e, "freeze", {
                        value: c
                    }), $(e, "preventExtensions", {
                        value: l
                    }), $(e, "seal", {
                        value: f
                    }), e.getOwnPropertySymbols = d
                }
                function w(e) {
                    for (var t = 1; t < arguments.length; t++) for (var r = M(arguments[t]), n = 0; n < r.length; n++) {
                        var i = r[n];
                        Q[i] || !
                        function (t, r) {
                            $(e, r, {
                                get: function () {
                                    return t[r]
                                },
                                enumerable: !0
                            })
                        }(arguments[t], r[n])
                    }
                    return e
                }
                function O(e) {
                    return null != e && ("object" == typeof e || "function" == typeof e)
                }
                function j(e) {
                    if (null == e) throw C();
                    return P(e)
                }
                function S(e) {
                    if (!O(e)) throw C(e + " is not an Object");
                    return e
                }
                function x(e) {
                    if (null == e) throw new TypeError("Value cannot be converted to an Object");
                    return e
                }
                function E(e) {
                    e.Symbol = s, e.Reflect = e.Reflect || {}, e.Reflect.global = e.Reflect.global || e, _(e.Object)
                }
                if (!e.$traceurRuntime) {
                    var P = Object,
                        C = TypeError,
                        R = P.create,
                        k = P.defineProperties,
                        $ = P.defineProperty,
                        I = P.freeze,
                        A = P.getOwnPropertyDescriptor,
                        M = P.getOwnPropertyNames,
                        T = P.keys,
                        N = P.prototype.hasOwnProperty,
                        W = (P.prototype.toString, Object.preventExtensions),
                        F = Object.seal,
                        L = Object.isExtensible,
                        V = {
                            "void": function () {},
                            any: function () {},
                            string: function () {},
                            number: function () {},
                            "boolean": function () {}
                        },
                        G = t,
                        D = 0,
                        U = r(),
                        H = r(),
                        z = r(),
                        B = R(null),
                        Q = R(null);
                    $(s.prototype, "constructor", t(s)), $(s.prototype, "toString", G(function () {
                        var e = this[z];
                        if (!b("symbols")) return e[U];
                        if (!e) throw TypeError("Conversion from symbol to string");
                        var t = e[H];
                        return void 0 === t && (t = ""), "Symbol(" + t + ")"
                    })), $(s.prototype, "valueOf", G(function () {
                        var e = this[z];
                        if (!e) throw TypeError("Conversion from symbol to string");
                        return b("symbols") ? e : e[U]
                    })), $(u.prototype, "constructor", t(s)), $(u.prototype, "toString", {
                        value: s.prototype.toString,
                        enumerable: !1
                    }), $(u.prototype, "valueOf", {
                        value: s.prototype.valueOf,
                        enumerable: !1
                    });
                    var q = n(),
                        K = {
                            value: void 0
                        },
                        Z = {
                            hash: {
                                value: void 0
                            },
                            self: {
                                value: void 0
                            }
                        },
                        X = 0;
                    s.iterator = s(), c(u.prototype), E(e), e.$traceurRuntime = {
                        assertObject: S,
                        createPrivateName: n,
                        exportStar: w,
                        getOwnHashObject: a,
                        privateNames: Q,
                        setProperty: m,
                        setupGlobals: E,
                        toObject: j,
                        isObject: O,
                        toProperty: h,
                        type: V,
                        "typeof": o,
                        checkObjectCoercible: x,
                        hasOwnProperty: function (e, t) {
                            return g.call(e, t)
                        },
                        defineProperties: k,
                        defineProperty: $,
                        getOwnPropertyDescriptor: A,
                        getOwnPropertyNames: M,
                        keys: T
                    }
                }
            }("undefined" != typeof t ? t : this), function () {
                "use strict";

                function e() {
                    for (var e, t = [], r = 0, n = 0; n < arguments.length; n++) {
                        var i = $traceurRuntime.checkObjectCoercible(arguments[n]);
                        if ("function" != typeof i[$traceurRuntime.toProperty(Symbol.iterator)]) throw new TypeError("Cannot spread non-iterable object.");
                        for (var o = i[$traceurRuntime.toProperty(Symbol.iterator)](); !(e = o.next()).done;) t[r++] = e.value
                    }
                    return t
                }
                $traceurRuntime.spread = e
            }(), function () {
                "use strict";

                function e(e, t) {
                    var r = d(e);
                    do {
                        var n = p(r, t);
                        if (n) return n;
                        r = d(r)
                    } while (r);
                    return void 0
                }
                function t(e, t, n, i) {
                    return r(e, t, n).apply(e, i)
                }
                function r(t, r, n) {
                    var i = e(r, n);
                    return i ? i.get ? i.get.call(t) : i.value : void 0
                }
                function n(t, r, n, i) {
                    var o = e(r, n);
                    if (o && o.set) return o.set.call(t, i), i;
                    throw c("super has no setter '" + n + "'.")
                }
                function i(e) {
                    for (var t, r = {}, n = v(e), i = 0; i < n.length; i++) {
                        var t = n[i];
                        r[t] = p(e, t)
                    }
                    return r
                }
                function o(e, t, r, n) {
                    return h(t, "constructor", {
                        value: e,
                        configurable: !0,
                        enumerable: !1,
                        writable: !0
                    }), arguments.length > 3 ? ("function" == typeof n && (e.__proto__ = n), e.prototype = l(s(n), i(t))) : e.prototype = t, h(e, "prototype", {
                        configurable: !1,
                        writable: !1
                    }), f(e, i(r))
                }
                function s(e) {
                    if ("function" == typeof e) {
                        var t = e.prototype;
                        if (a(t) === t || null === t) return e.prototype;
                        throw new c("super prototype must be an Object or null")
                    }
                    if (null === e) return null;
                    throw new c("Super expression must either be null or a function")
                }
                function u(e, r, n) {
                    null !== d(r) && t(e, r, "constructor", n)
                }
                var a = Object,
                    c = TypeError,
                    l = a.create,
                    f = $traceurRuntime.defineProperties,
                    h = $traceurRuntime.defineProperty,
                    p = $traceurRuntime.getOwnPropertyDescriptor,
                    v = $traceurRuntime.getOwnPropertyNames,
                    d = Object.getPrototypeOf;
                $traceurRuntime.createClass = o, $traceurRuntime.defaultSuperCall = u, $traceurRuntime.superCall = t, $traceurRuntime.superGet = r, $traceurRuntime.superSet = n
            }(), function () {
                "use strict";

                function e(e) {
                    return {
                        configurable: !0,
                        enumerable: !1,
                        value: e,
                        writable: !0
                    }
                }
                function t(e) {
                    return new Error("Traceur compiler bug: invalid state in state machine: " + e)
                }
                function r() {
                    this.state = 0, this.GState = b, this.storedException = void 0, this.finallyFallThrough = void 0, this.sent_ = void 0, this.returnValue = void 0, this.tryStack_ = []
                }
                function n(e, t, r, n) {
                    switch (e.GState) {
                    case m:
                        throw new Error('"' + r + '" on executing generator');
                    case _:
                        if ("next" == r) return {
                            value: void 0,
                            done: !0
                        };
                        throw n;
                    case b:
                        if ("throw" === r) throw e.GState = _, n;
                        if (void 0 !== n) throw g("Sent value to newborn generator");
                    case y:
                        e.GState = m, e.action = r, e.sent = n;
                        var i = t(e),
                            o = i === e;
                        return o && (i = e.returnValue), e.GState = o ? _ : y, {
                            value: i,
                            done: o
                        }
                    }
                }
                function i() {}
                function o() {}
                function s(e, t, n) {
                    var i = l(e, n),
                        o = new r,
                        s = d(t.prototype);
                    return s[j] = o, s[S] = i, s
                }
                function u(e) {
                    return e.prototype = d(o.prototype), e.__proto__ = o, e
                }
                function a() {
                    r.call(this), this.err = void 0;
                    var e = this;
                    e.result = new Promise(function (t, r) {
                        e.resolve = t, e.reject = r
                    })
                }
                function c(e, t) {
                    var r = l(e, t),
                        n = new a;
                    return n.createCallback = function (e) {
                        return function (t) {
                            n.state = e, n.value = t, r(n)
                        }
                    }, n.errback = function (e) {
                        f(n, e), r(n)
                    }, r(n), n.result
                }
                function l(e, t) {
                    return function (r) {
                        for (;;) try {
                            return e.call(t, r)
                        } catch (n) {
                            f(r, n)
                        }
                    }
                }
                function f(e, t) {
                    e.storedException = t;
                    var r = e.tryStack_[e.tryStack_.length - 1];
                    return r ? (e.state = void 0 !== r.
                    catch ? r.
                    catch : r.
                    finally, void(void 0 !== r.finallyFallThrough && (e.finallyFallThrough = r.finallyFallThrough))) : void e.handleException(t)
                }
                var h = $traceurRuntime.createPrivateName,
                    p = $traceurRuntime.defineProperties,
                    v = $traceurRuntime.defineProperty,
                    d = Object.create,
                    g = TypeError,
                    b = 0,
                    m = 1,
                    y = 2,
                    _ = 3,
                    w = -2,
                    O = -3;
                r.prototype = {
                    pushTry: function (e, t) {
                        if (null !== t) {
                            for (var r = null, n = this.tryStack_.length - 1; n >= 0; n--) if (void 0 !== this.tryStack_[n].
                            catch) {
                                r = this.tryStack_[n].
                                catch;
                                break
                            }
                            null === r && (r = O), this.tryStack_.push({
                                "finally": t,
                                finallyFallThrough: r
                            })
                        }
                        null !== e && this.tryStack_.push({
                            "catch": e
                        })
                    },
                    popTry: function () {
                        this.tryStack_.pop()
                    },
                    get sent() {
                        return this.maybeThrow(), this.sent_
                    },
                    set sent(e) {
                        this.sent_ = e
                    },
                    get sentIgnoreThrow() {
                        return this.sent_
                    },
                    maybeThrow: function () {
                        if ("throw" === this.action) throw this.action = "next", this.sent_
                    },
                    end: function () {
                        switch (this.state) {
                        case w:
                            return this;
                        case O:
                            throw this.storedException;
                        default:
                            throw t(this.state)
                        }
                    },
                    handleException: function (e) {
                        throw this.GState = _, this.state = w, e
                    }
                };
                var j = h(),
                    S = h();
                i.prototype = o, v(o, "constructor", e(i)), o.prototype = {
                    constructor: o,
                    next: function (e) {
                        return n(this[j], this[S], "next", e)
                    },
                    "throw": function (e) {
                        return n(this[j], this[S], "throw", e)
                    }
                }, p(o.prototype, {
                    constructor: {
                        enumerable: !1
                    },
                    next: {
                        enumerable: !1
                    },
                    "throw": {
                        enumerable: !1
                    }
                }), Object.defineProperty(o.prototype, Symbol.iterator, e(function () {
                    return this
                })), a.prototype = d(r.prototype), a.prototype.end = function () {
                    switch (this.state) {
                    case w:
                        this.resolve(this.returnValue);
                        break;
                    case O:
                        this.reject(this.storedException);
                        break;
                    default:
                        this.reject(t(this.state))
                    }
                }, a.prototype.handleException = function () {
                    this.state = O
                }, $traceurRuntime.asyncWrap = c, $traceurRuntime.initGeneratorFunction = u, $traceurRuntime.createGeneratorInstance = s
            }(), function () {
                function e(e, t, r, n, i, o, s) {
                    var u = [];
                    return e && u.push(e, ":"), r && (u.push("//"), t && u.push(t, "@"), u.push(r), n && u.push(":", n)), i && u.push(i), o && u.push("?", o), s && u.push("#", s), u.join("")
                }
                function t(e) {
                    return e.match(u)
                }
                function r(e) {
                    if ("/" === e) return "/";
                    for (var t = "/" === e[0] ? "/" : "", r = "/" === e.slice(-1) ? "/" : "", n = e.split("/"), i = [], o = 0, s = 0; s < n.length; s++) {
                        var u = n[s];
                        switch (u) {
                        case "":
                        case ".":
                            break;
                        case "..":
                            i.length ? i.pop() : o++;
                            break;
                        default:
                            i.push(u)
                        }
                    }
                    if (!t) {
                        for (; o-- > 0;) i.unshift("..");
                        0 === i.length && i.push(".")
                    }
                    return t + i.join("/") + r
                }
                function n(t) {
                    var n = t[a.PATH] || "";
                    return n = r(n), t[a.PATH] = n, e(t[a.SCHEME], t[a.USER_INFO], t[a.DOMAIN], t[a.PORT], t[a.PATH], t[a.QUERY_DATA], t[a.FRAGMENT])
                }
                function i(e) {
                    var r = t(e);
                    return n(r)
                }
                function o(e, r) {
                    var i = t(r),
                        o = t(e);
                    if (i[a.SCHEME]) return n(i);
                    i[a.SCHEME] = o[a.SCHEME];
                    for (var s = a.SCHEME; s <= a.PORT; s++) i[s] || (i[s] = o[s]);
                    if ("/" == i[a.PATH][0]) return n(i);
                    var u = o[a.PATH],
                        c = u.lastIndexOf("/");
                    return u = u.slice(0, c + 1) + i[a.PATH], i[a.PATH] = u, n(i)
                }
                function s(e) {
                    if (!e) return !1;
                    if ("/" === e[0]) return !0;
                    var r = t(e);
                    return r[a.SCHEME] ? !0 : !1
                }
                var u = new RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
                    a = {
                        SCHEME: 1,
                        USER_INFO: 2,
                        DOMAIN: 3,
                        PORT: 4,
                        PATH: 5,
                        QUERY_DATA: 6,
                        FRAGMENT: 7
                    };
                $traceurRuntime.canonicalizeUrl = i, $traceurRuntime.isAbsolute = s, $traceurRuntime.removeDotSegments = r, $traceurRuntime.resolveUrl = o
            }(), function (e) {
                "use strict";

                function t(e) {
                    if (e) {
                        var t = d.normalize(e);
                        return a[t]
                    }
                }
                function r(e) {
                    var t = arguments[1],
                        r = Object.create(null);
                    return Object.getOwnPropertyNames(e).forEach(function (n) {
                        var i, o;
                        if (t === v) {
                            var s = Object.getOwnPropertyDescriptor(e, n);
                            s.get && (i = s.get)
                        }
                        i || (o = e[n], i = function () {
                            return o
                        }), Object.defineProperty(r, n, {
                            get: i,
                            enumerable: !0
                        })
                    }), Object.preventExtensions(r), r
                }
                var n, i = $traceurRuntime.assertObject($traceurRuntime),
                    o = i.canonicalizeUrl,
                    s = i.resolveUrl,
                    u = i.isAbsolute,
                    a = Object.create(null);
                n = e.location && e.location.href ? s(e.location.href, "./") : "";
                var c = function (e, t) {
                    this.url = e, this.value_ = t
                };
                $traceurRuntime.createClass(c, {}, {});
                var l = function (e, t) {
                    this.message = this.constructor.name + (t ? ": '" + t + "'" : "") + " in " + e
                };
                $traceurRuntime.createClass(l, {
                    loadedBy: function (e) {
                        this.message += "\n loaded by " + e
                    }
                }, {}, Error);
                var f = function (e, t) {
                    $traceurRuntime.superCall(this, h.prototype, "constructor", [e, null]), this.func = t
                },
                    h = f;
                $traceurRuntime.createClass(f, {
                    getUncoatedModule: function () {
                        if (this.value_) return this.value_;
                        try {
                            return this.value_ = this.func.call(e)
                        } catch (t) {
                            if (t instanceof l) throw t.loadedBy(this.url), t;
                            throw new l(this.url, t)
                        }
                    }
                }, {}, c);
                var p = Object.create(null),
                    v = {},
                    d = {
                        normalize: function (e, t) {
                            if ("string" != typeof e) throw new TypeError("module name must be a string, not " + typeof e);
                            if (u(e)) return o(e);
                            if (/[^\.]\/\.\.\//.test(e)) throw new Error("module name embeds /../: " + e);
                            return "." === e[0] && t ? s(t, e) : o(e)
                        },
                        get: function (e) {
                            var n = t(e);
                            if (!n) return void 0;
                            var i = p[n.url];
                            return i ? i : (i = r(n.getUncoatedModule(), v), p[n.url] = i)
                        },
                        set: function (e, t) {
                            e = String(e), a[e] = new f(e, function () {
                                return t
                            }), p[e] = t
                        },
                        get baseURL() {
                            return n
                        },
                        set baseURL(e) {
                            n = String(e)
                        },
                        registerModule: function (e, t) {
                            var r = d.normalize(e);
                            if (a[r]) throw new Error("duplicate module named " + r);
                            a[r] = new f(r, t)
                        },
                        bundleStore: Object.create(null),
                        register: function (e, t, r) {
                            t && (t.length || r.length) ? this.bundleStore[e] = {
                                deps: t,
                                execute: function () {
                                    var e = arguments,
                                        n = {};
                                    t.forEach(function (t, r) {
                                        return n[t] = e[r]
                                    });
                                    var i = r.call(this, n);
                                    return i.execute.call(this), i.exports
                                }
                            } : this.registerModule(e, r)
                        },
                        getAnonymousModule: function (t) {
                            return new r(t.call(e), v)
                        },
                        getForTesting: function (e) {
                            var t = this;
                            return this.testingPrefix_ || Object.keys(p).some(function (e) {
                                var r = /(traceur@[^\/]*\/)/.exec(e);
                                return r ? (t.testingPrefix_ = r[1], !0) : void 0
                            }), this.get(this.testingPrefix_ + e)
                        }
                    };
                d.set("@traceur/src/runtime/ModuleStore", new r({
                    ModuleStore: d
                }));
                var g = $traceurRuntime.setupGlobals;
                $traceurRuntime.setupGlobals = function (e) {
                    g(e)
                }, $traceurRuntime.ModuleStore = d, e.System = {
                    register: d.register.bind(d),
                    get: d.get,
                    set: d.set,
                    normalize: d.normalize
                }, $traceurRuntime.getModuleImpl = function (e) {
                    var r = t(e);
                    return r && r.getUncoatedModule()
                }
            }("undefined" != typeof t ? t : this), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/utils", [], function () {
                "use strict";

                function e(e) {
                    return e >>> 0
                }
                function t(e) {
                    return e && ("object" == typeof e || "function" == typeof e)
                }
                function r(e) {
                    return "function" == typeof e
                }
                function n(e) {
                    return "number" == typeof e
                }
                function i(e) {
                    return e = +e, h(e) ? 0 : 0 !== e && f(e) ? e > 0 ? l(e) : c(e) : e
                }
                function o(e) {
                    var t = i(e);
                    return 0 > t ? 0 : v(t, g)
                }
                function s(e) {
                    return t(e) ? e[Symbol.iterator] : void 0
                }
                function u(e) {
                    return r(e)
                }
                function a(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }
                var c = Math.ceil,
                    l = Math.floor,
                    f = isFinite,
                    h = isNaN,
                    p = Math.pow,
                    v = Math.min,
                    d = $traceurRuntime.toObject,
                    g = p(2, 53) - 1;
                return {
                    get toObject() {
                        return d
                    }, get toUint32() {
                        return e
                    }, get isObject() {
                        return t
                    }, get isCallable() {
                        return r
                    }, get isNumber() {
                        return n
                    }, get toInteger() {
                        return i
                    }, get toLength() {
                        return o
                    }, get checkIterable() {
                        return s
                    }, get isConstructor() {
                        return u
                    }, get createIteratorResultObject() {
                        return a
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Array", [], function () {
                "use strict";

                function e(e) {
                    var t, r, n = arguments[1],
                        i = arguments[2],
                        o = this,
                        c = f(e),
                        h = void 0 !== n,
                        p = 0;
                    if (h && !s(n)) throw TypeError();
                    if (a(c)) {
                        t = u(o) ? new o : [];
                        for (var v, d = c[Symbol.iterator](); !(v = d.next()).done;) {
                            var g = v.value;
                            t[p] = h ? n.call(i, g, p) : g, p++
                        }
                        return t.length = p, t
                    }
                    for (r = l(c.length), t = u(o) ? new o(r) : new Array(r); r > p; p++) t[p] = h ? "undefined" == typeof i ? n(c[p], p) : n.call(i, c[p], p) : c[p];
                    return t.length = r, t
                }
                function t(e) {
                    var t = void 0 !== arguments[1] ? arguments[1] : 0,
                        r = arguments[2],
                        n = f(this),
                        i = l(n.length),
                        o = c(t),
                        s = void 0 !== r ? c(r) : i;
                    for (o = 0 > o ? Math.max(i + o, 0) : Math.min(o, i), s = 0 > s ? Math.max(i + s, 0) : Math.min(s, i); s > o;) n[o] = e, o++;
                    return n
                }
                function r(e) {
                    var t = arguments[1];
                    return i(this, e, t)
                }
                function n(e) {
                    var t = arguments[1];
                    return i(this, e, t, !0)
                }
                function i(e, t) {
                    var r = arguments[2],
                        n = void 0 !== arguments[3] ? arguments[3] : !1,
                        i = f(e),
                        o = l(i.length);
                    if (!s(t)) throw TypeError();
                    for (var u = 0; o > u; u++) if (u in i) {
                        var a = i[u];
                        if (t.call(r, a, u, i)) return n ? u : a
                    }
                    return n ? -1 : void 0
                }
                var o = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
                    s = o.isCallable,
                    u = o.isConstructor,
                    a = o.checkIterable,
                    c = o.toInteger,
                    l = o.toLength,
                    f = o.toObject;
                return {
                    get from() {
                        return e
                    }, get fill() {
                        return t
                    }, get find() {
                        return r
                    }, get findIndex() {
                        return n
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator", [], function () {
                "use strict";

                function e(e, t) {
                    var r = s(e),
                        n = new h;
                    return n.iteratorObject_ = r, n.arrayIteratorNextIndex_ = 0, n.arrayIterationKind_ = t, n
                }
                function t() {
                    return e(this, f)
                }
                function r() {
                    return e(this, c)
                }
                function n() {
                    return e(this, l)
                }
                var i, o = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
                    s = o.toObject,
                    u = o.toUint32,
                    a = o.createIteratorResultObject,
                    c = 1,
                    l = 2,
                    f = 3,
                    h = function () {};
                return $traceurRuntime.createClass(h, (i = {}, Object.defineProperty(i, "next", {
                    value: function () {
                        var e = s(this),
                            t = e.iteratorObject_;
                        if (!t) throw new TypeError("Object is not an ArrayIterator");
                        var r = e.arrayIteratorNextIndex_,
                            n = e.arrayIterationKind_,
                            i = u(t.length);
                        return r >= i ? (e.arrayIteratorNextIndex_ = 1 / 0, a(void 0, !0)) : (e.arrayIteratorNextIndex_ = r + 1, n == l ? a(t[r], !1) : n == f ? a([r, t[r]], !1) : a(r, !1))
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(i, Symbol.iterator, {
                    value: function () {
                        return this
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), i), {}), {
                    get entries() {
                        return t
                    }, get keys() {
                        return r
                    }, get values() {
                        return n
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Map", [], function () {
                "use strict";

                function e(e, t) {
                    if (r(t)) {
                        var i = n(t);
                        return i && e.objectIndex_[i.hash]
                    }
                    return "string" == typeof t ? e.stringIndex_[t] : e.primitiveIndex_[t]
                }
                function t(e) {
                    e.entries_ = [], e.objectIndex_ = Object.create(null), e.stringIndex_ = Object.create(null), e.primitiveIndex_ = Object.create(null), e.deletedCount_ = 0
                }
                var r = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject,
                    n = $traceurRuntime.getOwnHashObject,
                    i = Object.prototype.hasOwnProperty,
                    o = {},
                    s = function () {
                        var e = arguments[0];
                        if (!r(this)) throw new TypeError("Map called on incompatible type");
                        if (i.call(this, "entries_")) throw new TypeError("Map can not be reentrantly initialised");
                        if (t(this), null !== e && void 0 !== e) for (var n, o = e[Symbol.iterator](); !(n = o.next()).done;) {
                            var s = $traceurRuntime.assertObject(n.value),
                                u = s[0],
                                a = s[1];
                            this.set(u, a)
                        }
                    };
                return $traceurRuntime.createClass(s, {
                    get size() {
                        return this.entries_.length / 2 - this.deletedCount_
                    }, get: function (t) {
                        var r = e(this, t);
                        return void 0 !== r ? this.entries_[r + 1] : void 0
                    },
                    set: function (t, i) {
                        var o = r(t),
                            s = "string" == typeof t,
                            u = e(this, t);
                        if (void 0 !== u) this.entries_[u + 1] = i;
                        else if (u = this.entries_.length, this.entries_[u] = t, this.entries_[u + 1] = i, o) {
                            var a = n(t),
                                c = a.hash;
                            this.objectIndex_[c] = u
                        } else s ? this.stringIndex_[t] = u : this.primitiveIndex_[t] = u;
                        return this
                    },
                    has: function (t) {
                        return void 0 !== e(this, t)
                    },
                    "delete": function (e) {
                        var t, i, s = r(e),
                            u = "string" == typeof e;
                        if (s) {
                            var a = n(e);
                            a && (t = this.objectIndex_[i = a.hash], delete this.objectIndex_[i])
                        } else u ? (t = this.stringIndex_[e], delete this.stringIndex_[e]) : (t = this.primitiveIndex_[e], delete this.primitiveIndex_[e]);
                        void 0 !== t && (this.entries_[t] = o, this.entries_[t + 1] = void 0, this.deletedCount_++)
                    },
                    clear: function () {
                        t(this)
                    },
                    forEach: function (e) {
                        for (var t = arguments[1], r = 0, n = this.entries_.length; n > r; r += 2) {
                            var i = this.entries_[r],
                                s = this.entries_[r + 1];
                            i !== o && e.call(t, s, i, this)
                        }
                    },
                    entries: $traceurRuntime.initGeneratorFunction(function u() {
                        var e, t, r, n;
                        return $traceurRuntime.createGeneratorInstance(function (i) {
                            for (;;) switch (i.state) {
                            case 0:
                                e = 0, t = this.entries_.length, i.state = 12;
                                break;
                            case 12:
                                i.state = t > e ? 8 : -2;
                                break;
                            case 4:
                                e += 2, i.state = 12;
                                break;
                            case 8:
                                r = this.entries_[e], n = this.entries_[e + 1], i.state = 9;
                                break;
                            case 9:
                                i.state = r === o ? 4 : 6;
                                break;
                            case 6:
                                return i.state = 2, [r, n];
                            case 2:
                                i.maybeThrow(), i.state = 4;
                                break;
                            default:
                                return i.end()
                            }
                        }, u, this)
                    }),
                    keys: $traceurRuntime.initGeneratorFunction(function a() {
                        var e, t, r, n;
                        return $traceurRuntime.createGeneratorInstance(function (i) {
                            for (;;) switch (i.state) {
                            case 0:
                                e = 0, t = this.entries_.length, i.state = 12;
                                break;
                            case 12:
                                i.state = t > e ? 8 : -2;
                                break;
                            case 4:
                                e += 2, i.state = 12;
                                break;
                            case 8:
                                r = this.entries_[e], n = this.entries_[e + 1], i.state = 9;
                                break;
                            case 9:
                                i.state = r === o ? 4 : 6;
                                break;
                            case 6:
                                return i.state = 2, r;
                            case 2:
                                i.maybeThrow(), i.state = 4;
                                break;
                            default:
                                return i.end()
                            }
                        }, a, this)
                    }),
                    values: $traceurRuntime.initGeneratorFunction(function c() {
                        var e, t, r, n;
                        return $traceurRuntime.createGeneratorInstance(function (i) {
                            for (;;) switch (i.state) {
                            case 0:
                                e = 0, t = this.entries_.length, i.state = 12;
                                break;
                            case 12:
                                i.state = t > e ? 8 : -2;
                                break;
                            case 4:
                                e += 2, i.state = 12;
                                break;
                            case 8:
                                r = this.entries_[e], n = this.entries_[e + 1], i.state = 9;
                                break;
                            case 9:
                                i.state = r === o ? 4 : 6;
                                break;
                            case 6:
                                return i.state = 2, n;
                            case 2:
                                i.maybeThrow(), i.state = 4;
                                break;
                            default:
                                return i.end()
                            }
                        }, c, this)
                    })
                }, {}), Object.defineProperty(s.prototype, Symbol.iterator, {
                    configurable: !0,
                    writable: !0,
                    value: s.prototype.entries
                }), {
                    get Map() {
                        return s
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Number", [], function () {
                "use strict";

                function e(e) {
                    return o(e) && a(e)
                }
                function t(t) {
                    return e(t) && s(t) === t
                }
                function r(e) {
                    return o(e) && c(e)
                }
                function n(t) {
                    if (e(t)) {
                        var r = s(t);
                        if (r === t) return u(r) <= l
                    }
                    return !1
                }
                var i = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
                    o = i.isNumber,
                    s = i.toInteger,
                    u = Math.abs,
                    a = isFinite,
                    c = isNaN,
                    l = Math.pow(2, 53) - 1,
                    f = -Math.pow(2, 53) + 1,
                    h = Math.pow(2, -52);
                return {
                    get MAX_SAFE_INTEGER() {
                        return l
                    }, get MIN_SAFE_INTEGER() {
                        return f
                    }, get EPSILON() {
                        return h
                    }, get isFinite() {
                        return e
                    }, get isInteger() {
                        return t
                    }, get isNaN() {
                        return r
                    }, get isSafeInteger() {
                        return n
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Object", [], function () {
                "use strict";

                function e(e, t) {
                    return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t
                }
                function t(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r, n = arguments[t],
                            i = u(n),
                            o = i.length;
                        for (r = 0; o > r; r++) {
                            var s = i[r];
                            a[s] || (e[s] = n[s])
                        }
                    }
                    return e
                }
                function r(e, t) {
                    var r, n, u = s(t),
                        c = u.length;
                    for (r = 0; c > r; r++) {
                        var l = u[r];
                        a[l] || (n = o(t, u[r]), i(e, u[r], n))
                    }
                    return e
                }
                var n = $traceurRuntime.assertObject($traceurRuntime),
                    i = n.defineProperty,
                    o = n.getOwnPropertyDescriptor,
                    s = n.getOwnPropertyNames,
                    u = n.keys,
                    a = n.privateNames;
                return {
                    get is() {
                        return e
                    }, get assign() {
                        return t
                    }, get mixin() {
                        return r
                    }
                }
            }), System.register("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap", [], function () {
                "use strict";

                function t(e, t) {
                    p[a] = e, p[a + 1] = t, a += 2, 2 === a && u()
                }
                function r() {
                    return function () {
                        e.nextTick(s)
                    }
                }
                function n() {
                    var e = 0,
                        t = new f(s),
                        r = document.createTextNode("");
                    return t.observe(r, {
                        characterData: !0
                    }), function () {
                        r.data = e = ++e % 2
                    }
                }
                function i() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = s, function () {
                        e.port2.postMessage(0)
                    }
                }
                function o() {
                    return function () {
                        setTimeout(s, 1)
                    }
                }
                function s() {
                    for (var e = 0; a > e; e += 2) {
                        var t = p[e],
                            r = p[e + 1];
                        t(r), p[e] = void 0, p[e + 1] = void 0
                    }
                    a = 0
                }
                var u, a = 0,
                    c = t,
                    l = "undefined" != typeof window ? window : {},
                    f = l.MutationObserver || l.WebKitMutationObserver,
                    h = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                    p = new Array(1e3);
                return u = "undefined" != typeof e && "[object process]" === {}.toString.call(e) ? r() : f ? n() : h ? i() : o(), {
                    get
                default () {
                        return c
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Promise", [], function () {
                "use strict";

                function e(e) {
                    return e && "object" == typeof e && void 0 !== e.status_
                }
                function t(e) {
                    return e
                }
                function r(e) {
                    throw e
                }
                function n(e) {
                    var n = void 0 !== arguments[1] ? arguments[1] : t,
                        o = void 0 !== arguments[2] ? arguments[2] : r,
                        s = i(e.constructor);
                    switch (e.status_) {
                    case void 0:
                        throw TypeError;
                    case 0:
                        e.onResolve_.push(n, s), e.onReject_.push(o, s);
                        break;
                    case 1:
                        l(e.value_, [n, s]);
                        break;
                    case -1:
                        l(e.value_, [o, s])
                    }
                    return s.promise
                }
                function i(e) {
                    if (this === b) {
                        var t = s(new b(d));
                        return {
                            promise: t,
                            resolve: function (e) {
                                u(t, e)
                            },
                            reject: function (e) {
                                a(t, e)
                            }
                        }
                    }
                    var r = {};
                    return r.promise = new e(function (e, t) {
                        r.resolve = e, r.reject = t
                    }), r
                }
                function o(e, t, r, n, i) {
                    return e.status_ = t, e.value_ = r, e.onResolve_ = n, e.onReject_ = i, e
                }
                function s(e) {
                    return o(e, 0, void 0, [], [])
                }
                function u(e, t) {
                    c(e, 1, t, e.onResolve_)
                }
                function a(e, t) {
                    c(e, -1, t, e.onReject_)
                }
                function c(e, t, r, n) {
                    0 === e.status_ && (l(r, n), o(e, t, r))
                }
                function l(e, t) {
                    v(function () {
                        for (var r = 0; r < t.length; r += 2) f(e, t[r], t[r + 1])
                    })
                }
                function f(t, r, i) {
                    try {
                        var o = r(t);
                        if (o === i.promise) throw new TypeError;
                        e(o) ? n(o, i.resolve, i.reject) : i.resolve(o)
                    } catch (s) {
                        try {
                            i.reject(s)
                        } catch (s) {}
                    }
                }
                function h(e) {
                    return e && ("object" == typeof e || "function" == typeof e)
                }
                function p(t, r) {
                    if (!e(r) && h(r)) {
                        var n;
                        try {
                            n = r.then
                        } catch (o) {
                            var s = m.call(t, o);
                            return r[y] = s, s
                        }
                        if ("function" == typeof n) {
                            var u = r[y];
                            if (u) return u;
                            var a = i(t);
                            r[y] = a.promise;
                            try {
                                n.call(r, a.resolve, a.reject)
                            } catch (o) {
                                a.reject(o)
                            }
                            return a.promise
                        }
                    }
                    return r
                }
                var v = System.get("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap").
            default,
                    d = {},
                    g = function (e) {
                        if (e !== d) {
                            if ("function" != typeof e) throw new TypeError;
                            var t = s(this);
                            try {
                                e(function (e) {
                                    u(t, e)
                                }, function (e) {
                                    a(t, e)
                                })
                            } catch (r) {
                                a(t, r)
                            }
                        }
                    };
                $traceurRuntime.createClass(g, {
                    "catch": function (e) {
                        return this.then(void 0, e)
                    },
                    then: function (i, o) {
                        "function" != typeof i && (i = t), "function" != typeof o && (o = r);
                        var s = this,
                            u = this.constructor;
                        return n(this, function (t) {
                            return t = p(u, t), t === s ? o(new TypeError) : e(t) ? t.then(i, o) : i(t)
                        }, o)
                    }
                }, {
                    resolve: function (e) {
                        return this === b ? o(new b(d), 1, e) : new this(function (t) {
                            t(e)
                        })
                    },
                    reject: function (e) {
                        return this === b ? o(new b(d), -1, e) : new this(function (t, r) {
                            r(e)
                        })
                    },
                    cast: function (t) {
                        if (t instanceof this) return t;
                        if (e(t)) {
                            var r = i(this);
                            return n(t, r.resolve, r.reject), r.promise
                        }
                        return this.resolve(t)
                    },
                    all: function (e) {
                        var t = i(this),
                            r = [];
                        try {
                            var n = e.length;
                            if (0 === n) t.resolve(r);
                            else for (var o = 0; o < e.length; o++) this.resolve(e[o]).then(function (e, i) {
                                r[e] = i, 0 === --n && t.resolve(r)
                            }.bind(void 0, o), function (e) {
                                t.reject(e)
                            })
                        } catch (s) {
                            t.reject(s)
                        }
                        return t.promise
                    },
                    race: function (e) {
                        var t = i(this);
                        try {
                            for (var r = 0; r < e.length; r++) this.resolve(e[r]).then(function (e) {
                                t.resolve(e)
                            }, function (e) {
                                t.reject(e)
                            })
                        } catch (n) {
                            t.reject(n)
                        }
                        return t.promise
                    }
                });
                var b = g,
                    m = b.reject,
                    y = "@@thenable";
                return {
                    get Promise() {
                        return g
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Set", [], function () {
                "use strict";

                function e(e) {
                    e.map_ = new r
                }
                var t = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject,
                    r = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map,
                    n = ($traceurRuntime.getOwnHashObject, Object.prototype.hasOwnProperty),
                    i = function () {
                        var r = arguments[0];
                        if (!t(this)) throw new TypeError("Set called on incompatible type");
                        if (n.call(this, "map_")) throw new TypeError("Set can not be reentrantly initialised");
                        if (e(this), null !== r && void 0 !== r) for (var i, o = r[Symbol.iterator](); !(i = o.next()).done;) {
                            var s = i.value;
                            this.add(s)
                        }
                    };
                return $traceurRuntime.createClass(i, {
                    get size() {
                        return this.map_.size
                    }, has: function (e) {
                        return this.map_.has(e)
                    },
                    add: function (e) {
                        return this.map_.set(e, e)
                    },
                    "delete": function (e) {
                        return this.map_.delete(e)
                    },
                    clear: function () {
                        return this.map_.clear()
                    },
                    forEach: function (e) {
                        var t = arguments[1],
                            r = this;
                        return this.map_.forEach(function (n, i) {
                            e.call(t, i, i, r)
                        })
                    },
                    values: $traceurRuntime.initGeneratorFunction(function o() {
                        var e, t;
                        return $traceurRuntime.createGeneratorInstance(function (r) {
                            for (;;) switch (r.state) {
                            case 0:
                                e = this.map_.keys()[Symbol.iterator](), r.sent = void 0, r.action = "next", r.state = 12;
                                break;
                            case 12:
                                t = e[r.action](r.sentIgnoreThrow), r.state = 9;
                                break;
                            case 9:
                                r.state = t.done ? 3 : 2;
                                break;
                            case 3:
                                r.sent = t.value, r.state = -2;
                                break;
                            case 2:
                                return r.state = 12, t.value;
                            default:
                                return r.end()
                            }
                        }, o, this)
                    }),
                    entries: $traceurRuntime.initGeneratorFunction(function s() {
                        var e, t;
                        return $traceurRuntime.createGeneratorInstance(function (r) {
                            for (;;) switch (r.state) {
                            case 0:
                                e = this.map_.entries()[Symbol.iterator](), r.sent = void 0, r.action = "next", r.state = 12;
                                break;
                            case 12:
                                t = e[r.action](r.sentIgnoreThrow), r.state = 9;
                                break;
                            case 9:
                                r.state = t.done ? 3 : 2;
                                break;
                            case 3:
                                r.sent = t.value, r.state = -2;
                                break;
                            case 2:
                                return r.state = 12, t.value;
                            default:
                                return r.end()
                            }
                        }, s, this)
                    })
                }, {}), Object.defineProperty(i.prototype, Symbol.iterator, {
                    configurable: !0,
                    writable: !0,
                    value: i.prototype.values
                }), Object.defineProperty(i.prototype, "keys", {
                    configurable: !0,
                    writable: !0,
                    value: i.prototype.values
                }), {
                    get Set() {
                        return i
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator", [], function () {
                "use strict";

                function e(e) {
                    var t = String(e),
                        r = Object.create(l.prototype);
                    return r[u(a)] = t, r[u(c)] = 0, r
                }
                var t, r = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
                    n = r.createIteratorResultObject,
                    i = r.isObject,
                    o = $traceurRuntime.assertObject($traceurRuntime),
                    s = o.hasOwnProperty,
                    u = o.toProperty,
                    a = Symbol("iteratedString"),
                    c = Symbol("stringIteratorNextIndex"),
                    l = function () {};
                return $traceurRuntime.createClass(l, (t = {}, Object.defineProperty(t, "next", {
                    value: function () {
                        var e = this;
                        if (!i(e) || !s(e, a)) throw new TypeError("this must be a StringIterator object");
                        var t = e[u(a)];
                        if (void 0 === t) return n(void 0, !0);
                        var r = e[u(c)],
                            o = t.length;
                        if (r >= o) return e[u(a)] = void 0, n(void 0, !0);
                        var l, f = t.charCodeAt(r);
                        if (55296 > f || f > 56319 || r + 1 === o) l = String.fromCharCode(f);
                        else {
                            var h = t.charCodeAt(r + 1);
                            l = 56320 > h || h > 57343 ? String.fromCharCode(f) : String.fromCharCode(f) + String.fromCharCode(h)
                        }
                        return e[u(c)] = r + l.length, n(l, !1)
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), Object.defineProperty(t, Symbol.iterator, {
                    value: function () {
                        return this
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0
                }), t), {}), {
                    get createStringIterator() {
                        return e
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/String", [], function () {
                "use strict";

                function e(e) {
                    var t = String(this);
                    if (null == this || "[object RegExp]" == c.call(e)) throw TypeError();
                    var r = t.length,
                        n = String(e),
                        i = (n.length, arguments.length > 1 ? arguments[1] : void 0),
                        o = i ? Number(i) : 0;
                    isNaN(o) && (o = 0);
                    var s = Math.min(Math.max(o, 0), r);
                    return l.call(t, n, o) == s
                }
                function t(e) {
                    var t = String(this);
                    if (null == this || "[object RegExp]" == c.call(e)) throw TypeError();
                    var r = t.length,
                        n = String(e),
                        i = n.length,
                        o = r;
                    if (arguments.length > 1) {
                        var s = arguments[1];
                        void 0 !== s && (o = s ? Number(s) : 0, isNaN(o) && (o = 0))
                    }
                    var u = Math.min(Math.max(o, 0), r),
                        a = u - i;
                    return 0 > a ? !1 : f.call(t, n, a) == a
                }
                function r(e) {
                    if (null == this) throw TypeError();
                    var t = String(this),
                        r = t.length,
                        n = String(e),
                        i = (n.length, arguments.length > 1 ? arguments[1] : void 0),
                        o = i ? Number(i) : 0;
                    isNaN(o) && (o = 0);
                    Math.min(Math.max(o, 0), r);
                    return -1 != l.call(t, n, o)
                }
                function n(e) {
                    if (null == this) throw TypeError();
                    var t = String(this),
                        r = e ? Number(e) : 0;
                    if (isNaN(r) && (r = 0), 0 > r || 1 / 0 == r) throw RangeError();
                    if (0 == r) return "";
                    for (var n = ""; r--;) n += t;
                    return n
                }
                function i(e) {
                    if (null == this) throw TypeError();
                    var t = String(this),
                        r = t.length,
                        n = e ? Number(e) : 0;
                    if (isNaN(n) && (n = 0), 0 > n || n >= r) return void 0;
                    var i, o = t.charCodeAt(n);
                    return o >= 55296 && 56319 >= o && r > n + 1 && (i = t.charCodeAt(n + 1), i >= 56320 && 57343 >= i) ? 1024 * (o - 55296) + i - 56320 + 65536 : o
                }
                function o(e) {
                    var t = e.raw,
                        r = t.length >>> 0;
                    if (0 === r) return "";
                    for (var n = "", i = 0;;) {
                        if (n += t[i], i + 1 === r) return n;
                        n += arguments[++i]
                    }
                }
                function s() {
                    var e, t, r = [],
                        n = Math.floor,
                        i = -1,
                        o = arguments.length;
                    if (!o) return "";
                    for (; ++i < o;) {
                        var s = Number(arguments[i]);
                        if (!isFinite(s) || 0 > s || s > 1114111 || n(s) != s) throw RangeError("Invalid code point: " + s);
                        65535 >= s ? r.push(s) : (s -= 65536, e = (s >> 10) + 55296, t = s % 1024 + 56320, r.push(e, t))
                    }
                    return String.fromCharCode.apply(null, r)
                }
                function u() {
                    var e = $traceurRuntime.checkObjectCoercible(this),
                        t = String(e);
                    return a(t)
                }
                var a = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator").createStringIterator,
                    c = Object.prototype.toString,
                    l = String.prototype.indexOf,
                    f = String.prototype.lastIndexOf;
                return {
                    get startsWith() {
                        return e
                    }, get endsWith() {
                        return t
                    }, get contains() {
                        return r
                    }, get repeat() {
                        return n
                    }, get codePointAt() {
                        return i
                    }, get raw() {
                        return o
                    }, get fromCodePoint() {
                        return s
                    }, get stringPrototypeIterator() {
                        return u
                    }
                }
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills", [], function () {
                "use strict";

                function e(e, t, r) {
                    t in e || Object.defineProperty(e, t, r)
                }
                function t(t, r, n) {
                    e(t, r, {
                        value: n,
                        configurable: !0,
                        enumerable: !1,
                        writable: !0
                    })
                }
                function r(t, r, n) {
                    e(t, r, {
                        value: n,
                        configurable: !1,
                        enumerable: !1,
                        writable: !1
                    })
                }
                function n(e, r) {
                    for (var n = 0; n < r.length; n += 2) {
                        var i = r[n],
                            o = r[n + 1];
                        t(e, i, o)
                    }
                }
                function i(e, t) {
                    for (var n = 0; n < t.length; n += 2) {
                        var i = t[n],
                            o = t[n + 1];
                        r(e, i, o)
                    }
                }
                function o(e, t, r) {
                    r && r.iterator && !e[r.iterator] && (e["@@iterator"] && (t = e["@@iterator"]), Object.defineProperty(e, r.iterator, {
                        value: t,
                        configurable: !0,
                        enumerable: !1,
                        writable: !0
                    }))
                }
                function s(e) {
                    e.Promise || (e.Promise = d)
                }
                function u(e, t) {
                    e.Map || (e.Map = p);
                    var r = e.Map.prototype;
                    r.entries && (o(r, r.entries, t), o(B((new e.Map).entries()), function () {
                        return this
                    }, t)), e.Set || (e.Set = v);
                    var n = e.Set.prototype;
                    n.values && (o(n, n.values, t), o(B((new e.Set).values()), function () {
                        return this
                    }, t))
                }
                function a(e) {
                    n(e.prototype, ["codePointAt", b, "contains", m, "endsWith", y, "startsWith", j, "repeat", w]), n(e, ["fromCodePoint", _, "raw", O]), o(e.prototype, S, Symbol)
                }
                function c(e, t) {
                    n(e.prototype, ["entries", $, "keys", I, "values", A, "fill", E, "find", P, "findIndex", C]), n(e, ["from", R]), o(e.prototype, A, t), o(B([].values()), function () {
                        return this
                    }, t)
                }
                function l(e) {
                    n(e, ["assign", T, "is", N, "mixin", W])
                }
                function f(e) {
                    i(e, ["MAX_SAFE_INTEGER", L, "MIN_SAFE_INTEGER", V, "EPSILON", G]), n(e, ["isFinite", D, "isInteger", U, "isNaN", H, "isSafeInteger", z])
                }
                function h(e) {
                    s(e), u(e, e.Symbol), a(e.String), c(e.Array, e.Symbol), l(e.Object), f(e.Number)
                }
                var p = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map,
                    v = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Set").Set,
                    d = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Promise").Promise,
                    g = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/String"),
                    b = g.codePointAt,
                    m = g.contains,
                    y = g.endsWith,
                    _ = g.fromCodePoint,
                    w = g.repeat,
                    O = g.raw,
                    j = g.startsWith,
                    S = g.stringPrototypeIterator,
                    x = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Array"),
                    E = x.fill,
                    P = x.find,
                    C = x.findIndex,
                    R = x.from,
                    k = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator"),
                    $ = k.entries,
                    I = k.keys,
                    A = k.values,
                    M = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Object"),
                    T = M.assign,
                    N = M.is,
                    W = M.mixin,
                    F = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Number"),
                    L = F.MAX_SAFE_INTEGER,
                    V = F.MIN_SAFE_INTEGER,
                    G = F.EPSILON,
                    D = F.isFinite,
                    U = F.isInteger,
                    H = F.isNaN,
                    z = F.isSafeInteger,
                    B = $traceurRuntime.assertObject(Object).getPrototypeOf;
                h(this);
                var Q = $traceurRuntime.setupGlobals;
                return $traceurRuntime.setupGlobals = function (e) {
                    Q(e), h(e)
                }, {}
            }), System.register("traceur-runtime@0.0.55/src/runtime/polyfill-import", [], function () {
                "use strict";
                return System.get("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills"), {}
            }), System.get("traceur-runtime@0.0.55/src/runtime/polyfill-import")
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {
        _process: 24
    }],
    26: [function (e, t) {
        (function (e) {
            !
            function (e) {
                "use strict";

                function t() {
                    function e(e) {
                        t = e
                    }
                    if ("function" != typeof Object.observe || "function" != typeof Array.observe) return !1;
                    var t = [],
                        r = {},
                        n = [];
                    return Object.observe(r, e), Array.observe(n, e), r.id = 1, r.id = 2, delete r.id, n.push(1, 2), n.length = 0, Object.deliverChangeRecords(e), 5 !== t.length ? !1 : "add" != t[0].type || "update" != t[1].type || "delete" != t[2].type || "splice" != t[3].type || "splice" != t[4].type ? !1 : (Object.unobserve(r, e), Array.unobserve(n, e), !0)
                }
                function r() {
                    if ("undefined" != typeof chrome && chrome.app && chrome.app.runtime) return !1;
                    if ("undefined" != typeof navigator && navigator.getDeviceStorage) return !1;
                    try {
                        var e = new Function("", "return true;");
                        return e()
                    } catch (t) {
                        return !1
                    }
                }
                function n(e) {
                    return +e === e >>> 0 && "" !== e
                }
                function i(e) {
                    return +e
                }
                function o(e) {
                    return e === Object(e)
                }
                function s(e, t) {
                    return e === t ? 0 !== e || 1 / e === 1 / t : U(e) && U(t) ? !0 : e !== e && t !== t
                }
                function u(e) {
                    if (void 0 === e) return "eof";
                    var t = e.charCodeAt(0);
                    switch (t) {
                    case 91:
                    case 93:
                    case 46:
                    case 34:
                    case 39:
                    case 48:
                        return e;
                    case 95:
                    case 36:
                        return "ident";
                    case 32:
                    case 9:
                    case 10:
                    case 13:
                    case 160:
                    case 65279:
                    case 8232:
                    case 8233:
                        return "ws"
                    }
                    return t >= 97 && 122 >= t || t >= 65 && 90 >= t ? "ident" : t >= 49 && 57 >= t ? "number" : "else"
                }
                function a() {}
                function c(e) {
                    function t() {
                        if (!(h >= e.length)) {
                            var t = e[h + 1];
                            return "inSingleQuote" == p && "'" == t || "inDoubleQuote" == p && '"' == t ? (h++, n = t, v.append(), !0) : void 0
                        }
                    }
                    for (var r, n, i, o, s, c, l, f = [], h = -1, p = "beforePath", v = {
                        push: function () {
                            void 0 !== i && (f.push(i), i = void 0)
                        },
                        append: function () {
                            void 0 === i ? i = n : i += n
                        }
                    }; p;) if (h++, r = e[h], "\\" != r || !t(p)) {
                        if (o = u(r), l = q[p], s = l[o] || l["else"] || "error", "error" == s) return;
                        if (p = s[0], c = v[s[1]] || a, n = void 0 === s[2] ? r : s[2], c(), "afterPath" === p) return f
                    }
                }
                function l(e) {
                    return Q.test(e)
                }
                function f(e, t) {
                    if (t !== K) throw Error("Use Path.get to retrieve path objects");
                    for (var r = 0; r < e.length; r++) this.push(String(e[r]));
                    D && this.length && (this.getValueFrom = this.compiledGetValueFromFn())
                }
                function h(e) {
                    if (e instanceof f) return e;
                    if ((null == e || 0 == e.length) && (e = ""), "string" != typeof e) {
                        if (n(e.length)) return new f(e, K);
                        e = String(e)
                    }
                    var t = Z[e];
                    if (t) return t;
                    var r = c(e);
                    if (!r) return X;
                    var t = new f(r, K);
                    return Z[e] = t, t
                }
                function p(e) {
                    return n(e) ? "[" + e + "]" : '["' + e.replace(/"/g, '\\"') + '"]'
                }
                function v(t) {
                    for (var r = 0; J > r && t.check_();) r++;
                    return V && (e.dirtyCheckCycleCount = r), r > 0
                }
                function d(e) {
                    for (var t in e) return !1;
                    return !0
                }
                function g(e) {
                    return d(e.added) && d(e.removed) && d(e.changed)
                }
                function b(e, t) {
                    var r = {},
                        n = {},
                        i = {};
                    for (var o in t) {
                        var s = e[o];
                        (void 0 === s || s !== t[o]) && (o in e ? s !== t[o] && (i[o] = s) : n[o] = void 0)
                    }
                    for (var o in e) o in t || (r[o] = e[o]);
                    return Array.isArray(e) && e.length !== t.length && (i.length = e.length), {
                        added: r,
                        removed: n,
                        changed: i
                    }
                }
                function m() {
                    if (!et.length) return !1;
                    for (var e = 0; e < et.length; e++) et[e]();
                    return et.length = 0, !0
                }
                function y() {
                    function e(e) {
                        t && t.state_ === ot && !n && t.check_(e)
                    }
                    var t, r, n = !1,
                        i = !0;
                    return {
                        open: function (r) {
                            if (t) throw Error("ObservedObject in use");
                            i || Object.deliverChangeRecords(e), t = r, i = !1
                        },
                        observe: function (t, n) {
                            r = t, n ? Array.observe(r, e) : Object.observe(r, e)
                        },
                        deliver: function (t) {
                            n = t, Object.deliverChangeRecords(e), n = !1
                        },
                        close: function () {
                            t = void 0, Object.unobserve(r, e), rt.push(this)
                        }
                    }
                }
                function _(e, t, r) {
                    var n = rt.pop() || y();
                    return n.open(e), n.observe(t, r), n
                }
                function w() {
                    function e(t, o) {
                        t && (t === n && (i[o] = !0), u.indexOf(t) < 0 && (u.push(t), Object.observe(t, r)), e(Object.getPrototypeOf(t), o))
                    }
                    function t(e) {
                        for (var t = 0; t < e.length; t++) {
                            var r = e[t];
                            if (r.object !== n || i[r.name] || "setPrototype" === r.type) return !1
                        }
                        return !0
                    }
                    function r(r) {
                        if (!t(r)) {
                            for (var n, i = 0; i < s.length; i++) n = s[i], n.state_ == ot && n.iterateObjects_(e);
                            for (var i = 0; i < s.length; i++) n = s[i], n.state_ == ot && n.check_()
                        }
                    }
                    var n, i, o = 0,
                        s = [],
                        u = [],
                        a = {
                            object: void 0,
                            objects: u,
                            open: function (t, r) {
                                n || (n = r, i = {}), s.push(t), o++, t.iterateObjects_(e)
                            },
                            close: function () {
                                if (o--, !(o > 0)) {
                                    for (var e = 0; e < u.length; e++) Object.unobserve(u[e], r), j.unobservedCount++;
                                    s.length = 0, u.length = 0, n = void 0, i = void 0, nt.push(this)
                                }
                            }
                        };
                    return a
                }
                function O(e, t) {
                    return Y && Y.object === t || (Y = nt.pop() || w(), Y.object = t), Y.open(e, t), Y
                }
                function j() {
                    this.state_ = it, this.callback_ = void 0, this.target_ = void 0, this.directObserver_ = void 0, this.value_ = void 0, this.id_ = at++
                }
                function S(e) {
                    j._allObserversCount++, lt && ct.push(e)
                }
                function x() {
                    j._allObserversCount--
                }
                function E(e) {
                    j.call(this), this.value_ = e, this.oldObject_ = void 0
                }
                function P(e) {
                    if (!Array.isArray(e)) throw Error("Provided object is not an Array");
                    E.call(this, e)
                }
                function C(e, t) {
                    j.call(this), this.object_ = e, this.path_ = h(t), this.directObserver_ = void 0
                }
                function R(e) {
                    j.call(this), this.reportChangesOnOpen_ = e, this.value_ = [], this.directObserver_ = void 0, this.observed_ = []
                }
                function k(e) {
                    return e
                }
                function $(e, t, r, n) {
                    this.callback_ = void 0, this.target_ = void 0, this.value_ = void 0, this.observable_ = e, this.getValueFn_ = t || k, this.setValueFn_ = r || k, this.dontPassThroughSet_ = n
                }
                function I(e, t, r) {
                    for (var n = {}, i = {}, o = 0; o < t.length; o++) {
                        var s = t[o];
                        pt[s.type] ? (s.name in r || (r[s.name] = s.oldValue), "update" != s.type && ("add" != s.type ? s.name in n ? (delete n[s.name], delete r[s.name]) : i[s.name] = !0 : s.name in i ? delete i[s.name] : n[s.name] = !0)) : (console.error("Unknown changeRecord type: " + s.type), console.error(s))
                    }
                    for (var u in n) n[u] = e[u];
                    for (var u in i) i[u] = void 0;
                    var a = {};
                    for (var u in r) if (!(u in n || u in i)) {
                        var c = e[u];
                        r[u] !== c && (a[u] = c)
                    }
                    return {
                        added: n,
                        removed: i,
                        changed: a
                    }
                }
                function A(e, t, r) {
                    return {
                        index: e,
                        removed: t,
                        addedCount: r
                    }
                }
                function M() {}
                function T(e, t, r, n, i, o) {
                    return mt.calcSplices(e, t, r, n, i, o)
                }
                function N(e, t, r, n) {
                    return r > t || e > n ? -1 : t == r || n == e ? 0 : r > e ? n > t ? t - r : n - r : t > n ? n - e : t - e
                }
                function W(e, t, r, n) {
                    for (var i = A(t, r, n), o = !1, s = 0, u = 0; u < e.length; u++) {
                        var a = e[u];
                        if (a.index += s, !o) {
                            var c = N(i.index, i.index + i.removed.length, a.index, a.index + a.addedCount);
                            if (c >= 0) {
                                e.splice(u, 1), u--, s -= a.addedCount - a.removed.length, i.addedCount += a.addedCount - c;
                                var l = i.removed.length + a.removed.length - c;
                                if (i.addedCount || l) {
                                    var r = a.removed;
                                    if (i.index < a.index) {
                                        var f = i.removed.slice(0, a.index - i.index);
                                        Array.prototype.push.apply(f, r), r = f
                                    }
                                    if (i.index + i.removed.length > a.index + a.addedCount) {
                                        var h = i.removed.slice(a.index + a.addedCount - i.index);
                                        Array.prototype.push.apply(r, h)
                                    }
                                    i.removed = r, a.index < i.index && (i.index = a.index)
                                } else o = !0
                            } else if (i.index < a.index) {
                                o = !0, e.splice(u, 0, i), u++;
                                var p = i.addedCount - i.removed.length;
                                a.index += p, s += p
                            }
                        }
                    }
                    o || e.push(i)
                }
                function F(e, t) {
                    for (var r = [], o = 0; o < t.length; o++) {
                        var s = t[o];
                        switch (s.type) {
                        case "splice":
                            W(r, s.index, s.removed.slice(), s.addedCount);
                            break;
                        case "add":
                        case "update":
                        case "delete":
                            if (!n(s.name)) continue;
                            var u = i(s.name);
                            if (0 > u) continue;
                            W(r, u, [s.oldValue], 1);
                            break;
                        default:
                            console.error("Unexpected record type: " + JSON.stringify(s))
                        }
                    }
                    return r
                }
                function L(e, t) {
                    var r = [];
                    return F(e, t).forEach(function (t) {
                        return 1 == t.addedCount && 1 == t.removed.length ? void(t.removed[0] !== e[t.index] && r.push(t)) : void(r = r.concat(T(e, t.index, t.index + t.addedCount, t.removed, 0, t.removed.length)))
                    }), r
                }
                var V = e.testingExposeCycleCount,
                    G = t(),
                    D = r(),
                    U = e.Number.isNaN ||
                    function (t) {
                        return "number" == typeof t && e.isNaN(t)
                    },
                    H = "__proto__" in {} ?
                    function (e) {
                        return e
                    } : function (e) {
                        var t = e.__proto__;
                        if (!t) return e;
                        var r = Object.create(t);
                        return Object.getOwnPropertyNames(e).forEach(function (t) {
                            Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(e, t))
                        }), r
                    },
                    z = "[$_a-zA-Z]",
                    B = "[$_a-zA-Z0-9]",
                    Q = new RegExp("^" + z + "+" + B + "*$"),
                    q = {
                        beforePath: {
                            ws: ["beforePath"],
                            ident: ["inIdent", "append"],
                            "[": ["beforeElement"],
                            eof: ["afterPath"]
                        },
                        inPath: {
                            ws: ["inPath"],
                            ".": ["beforeIdent"],
                            "[": ["beforeElement"],
                            eof: ["afterPath"]
                        },
                        beforeIdent: {
                            ws: ["beforeIdent"],
                            ident: ["inIdent", "append"]
                        },
                        inIdent: {
                            ident: ["inIdent", "append"],
                            0: ["inIdent", "append"],
                            number: ["inIdent", "append"],
                            ws: ["inPath", "push"],
                            ".": ["beforeIdent", "push"],
                            "[": ["beforeElement", "push"],
                            eof: ["afterPath", "push"]
                        },
                        beforeElement: {
                            ws: ["beforeElement"],
                            0: ["afterZero", "append"],
                            number: ["inIndex", "append"],
                            "'": ["inSingleQuote", "append", ""],
                            '"': ["inDoubleQuote", "append", ""]
                        },
                        afterZero: {
                            ws: ["afterElement", "push"],
                            "]": ["inPath", "push"]
                        },
                        inIndex: {
                            0: ["inIndex", "append"],
                            number: ["inIndex", "append"],
                            ws: ["afterElement"],
                            "]": ["inPath", "push"]
                        },
                        inSingleQuote: {
                            "'": ["afterElement"],
                            eof: ["error"],
                            "else": ["inSingleQuote", "append"]
                        },
                        inDoubleQuote: {
                            '"': ["afterElement"],
                            eof: ["error"],
                            "else": ["inDoubleQuote", "append"]
                        },
                        afterElement: {
                            ws: ["afterElement"],
                            "]": ["inPath", "push"]
                        }
                    },
                    K = {},
                    Z = {};
                f.get = h, f.prototype = H({
                    __proto__: [],
                    valid: !0,
                    toString: function () {
                        for (var e = "", t = 0; t < this.length; t++) {
                            var r = this[t];
                            e += l(r) ? t ? "." + r : r : p(r)
                        }
                        return e
                    },
                    getValueFrom: function (e) {
                        for (var t = 0; t < this.length; t++) {
                            if (null == e) return;
                            e = e[this[t]]
                        }
                        return e
                    },
                    iterateObjects: function (e, t) {
                        for (var r = 0; r < this.length; r++) {
                            if (r && (e = e[this[r - 1]]), !o(e)) return;
                            t(e, this[0])
                        }
                    },
                    compiledGetValueFromFn: function () {
                        var e = "",
                            t = "obj";
                        e += "if (obj != null";
                        for (var r, n = 0; n < this.length - 1; n++) r = this[n], t += l(r) ? "." + r : p(r), e += " &&\n     " + t + " != null";
                        e += ")\n";
                        var r = this[n];
                        return t += l(r) ? "." + r : p(r), e += "  return " + t + ";\nelse\n  return undefined;", new Function("obj", e)
                    },
                    setValueFrom: function (e, t) {
                        if (!this.length) return !1;
                        for (var r = 0; r < this.length - 1; r++) {
                            if (!o(e)) return !1;
                            e = e[this[r]]
                        }
                        return o(e) ? (e[this[r]] = t, !0) : !1
                    }
                });
                var X = new f("", K);
                X.valid = !1, X.getValueFrom = X.setValueFrom = function () {};
                var Y, J = 1e3,
                    et = [],
                    tt = G ?
                    function () {
                        var e = {
                            pingPong: !0
                        },
                            t = !1;
                        return Object.observe(e, function () {
                            m(), t = !1
                        }), function (r) {
                            et.push(r), t || (t = !0, e.pingPong = !e.pingPong)
                        }
                    }() : function () {
                        return function (e) {
                            et.push(e)
                        }
                    }(),
                    rt = [],
                    nt = [],
                    it = 0,
                    ot = 1,
                    st = 2,
                    ut = 3,
                    at = 1;
                j.prototype = {
                    open: function (e, t) {
                        if (this.state_ != it) throw Error("Observer has already been opened.");
                        return S(this), this.callback_ = e, this.target_ = t, this.connect_(), this.state_ = ot, this.value_
                    },
                    close: function () {
                        this.state_ == ot && (x(this), this.disconnect_(), this.value_ = void 0, this.callback_ = void 0, this.target_ = void 0, this.state_ = st)
                    },
                    deliver: function () {
                        this.state_ == ot && v(this)
                    },
                    report_: function (e) {
                        try {
                            this.callback_.apply(this.target_, e)
                        } catch (t) {
                            j._errorThrownDuringCallback = !0, console.error("Exception caught during observer callback: " + (t.stack || t))
                        }
                    },
                    discardChanges: function () {
                        return this.check_(void 0, !0), this.value_
                    }
                };
                var ct, lt = !G;
                j._allObserversCount = 0, lt && (ct = []);
                var ft = !1;
                e.Platform = e.Platform || {}, e.Platform.performMicrotaskCheckpoint = function () {
                    if (!ft && lt) {
                        ft = !0;
                        var t, r, n = 0;
                        do {
                            n++, r = ct, ct = [], t = !1;
                            for (var i = 0; i < r.length; i++) {
                                var o = r[i];
                                o.state_ == ot && (o.check_() && (t = !0), ct.push(o))
                            }
                            m() && (t = !0)
                        } while (J > n && t);
                        V && (e.dirtyCheckCycleCount = n), ft = !1
                    }
                }, lt && (e.Platform.clearObservers = function () {
                    ct = []
                }), E.prototype = H({
                    __proto__: j.prototype,
                    arrayObserve: !1,
                    connect_: function () {
                        G ? this.directObserver_ = _(this, this.value_, this.arrayObserve) : this.oldObject_ = this.copyObject(this.value_)
                    },
                    copyObject: function (e) {
                        var t = Array.isArray(e) ? [] : {};
                        for (var r in e) t[r] = e[r];
                        return Array.isArray(e) && (t.length = e.length), t
                    },
                    check_: function (e) {
                        var t, r;
                        if (G) {
                            if (!e) return !1;
                            r = {}, t = I(this.value_, e, r)
                        } else r = this.oldObject_, t = b(this.value_, this.oldObject_);
                        return g(t) ? !1 : (G || (this.oldObject_ = this.copyObject(this.value_)), this.report_([t.added || {},
                        t.removed || {},
                        t.changed || {}, function (e) {
                            return r[e]
                        }]), !0)
                    },
                    disconnect_: function () {
                        G ? (this.directObserver_.close(), this.directObserver_ = void 0) : this.oldObject_ = void 0
                    },
                    deliver: function () {
                        this.state_ == ot && (G ? this.directObserver_.deliver(!1) : v(this))
                    },
                    discardChanges: function () {
                        return this.directObserver_ ? this.directObserver_.deliver(!0) : this.oldObject_ = this.copyObject(this.value_), this.value_
                    }
                }), P.prototype = H({
                    __proto__: E.prototype,
                    arrayObserve: !0,
                    copyObject: function (e) {
                        return e.slice()
                    },
                    check_: function (e) {
                        var t;
                        if (G) {
                            if (!e) return !1;
                            t = L(this.value_, e)
                        } else t = T(this.value_, 0, this.value_.length, this.oldObject_, 0, this.oldObject_.length);
                        return t && t.length ? (G || (this.oldObject_ = this.copyObject(this.value_)), this.report_([t]), !0) : !1
                    }
                }), P.applySplices = function (e, t, r) {
                    r.forEach(function (r) {
                        for (var n = [r.index, r.removed.length], i = r.index; i < r.index + r.addedCount;) n.push(t[i]), i++;
                        Array.prototype.splice.apply(e, n)
                    })
                }, C.prototype = H({
                    __proto__: j.prototype,
                    get path() {
                        return this.path_
                    },
                    connect_: function () {
                        G && (this.directObserver_ = O(this, this.object_)), this.check_(void 0, !0)
                    },
                    disconnect_: function () {
                        this.value_ = void 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
                    },
                    iterateObjects_: function (e) {
                        this.path_.iterateObjects(this.object_, e)
                    },
                    check_: function (e, t) {
                        var r = this.value_;
                        return this.value_ = this.path_.getValueFrom(this.object_), t || s(this.value_, r) ? !1 : (this.report_([this.value_, r, this]), !0)
                    },
                    setValue: function (e) {
                        this.path_ && this.path_.setValueFrom(this.object_, e)
                    }
                });
                var ht = {};
                R.prototype = H({
                    __proto__: j.prototype,
                    connect_: function () {
                        if (G) {
                            for (var e, t = !1, r = 0; r < this.observed_.length; r += 2) if (e = this.observed_[r], e !== ht) {
                                t = !0;
                                break
                            }
                            t && (this.directObserver_ = O(this, e))
                        }
                        this.check_(void 0, !this.reportChangesOnOpen_)
                    },
                    disconnect_: function () {
                        for (var e = 0; e < this.observed_.length; e += 2) this.observed_[e] === ht && this.observed_[e + 1].close();
                        this.observed_.length = 0, this.value_.length = 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
                    },
                    addPath: function (e, t) {
                        if (this.state_ != it && this.state_ != ut) throw Error("Cannot add paths once started.");
                        var t = h(t);
                        if (this.observed_.push(e, t), this.reportChangesOnOpen_) {
                            var r = this.observed_.length / 2 - 1;
                            this.value_[r] = t.getValueFrom(e)
                        }
                    },
                    addObserver: function (e) {
                        if (this.state_ != it && this.state_ != ut) throw Error("Cannot add observers once started.");
                        if (this.observed_.push(ht, e), this.reportChangesOnOpen_) {
                            var t = this.observed_.length / 2 - 1;
                            this.value_[t] = e.open(this.deliver, this)
                        }
                    },
                    startReset: function () {
                        if (this.state_ != ot) throw Error("Can only reset while open");
                        this.state_ = ut, this.disconnect_()
                    },
                    finishReset: function () {
                        if (this.state_ != ut) throw Error("Can only finishReset after startReset");
                        return this.state_ = ot, this.connect_(), this.value_
                    },
                    iterateObjects_: function (e) {
                        for (var t, r = 0; r < this.observed_.length; r += 2) t = this.observed_[r], t !== ht && this.observed_[r + 1].iterateObjects(t, e)
                    },
                    check_: function (e, t) {
                        for (var r, n = 0; n < this.observed_.length; n += 2) {
                            var i, o = this.observed_[n],
                                u = this.observed_[n + 1];
                            if (o === ht) {
                                var a = u;
                                i = this.state_ === it ? a.open(this.deliver, this) : a.discardChanges()
                            } else i = u.getValueFrom(o);
                            t ? this.value_[n / 2] = i : s(i, this.value_[n / 2]) || (r = r || [], r[n / 2] = this.value_[n / 2], this.value_[n / 2] = i)
                        }
                        return r ? (this.report_([this.value_, r, this.observed_]), !0) : !1
                    }
                }), $.prototype = {
                    open: function (e, t) {
                        return this.callback_ = e, this.target_ = t, this.value_ = this.getValueFn_(this.observable_.open(this.observedCallback_, this)), this.value_
                    },
                    observedCallback_: function (e) {
                        if (e = this.getValueFn_(e), !s(e, this.value_)) {
                            var t = this.value_;
                            this.value_ = e, this.callback_.call(this.target_, this.value_, t)
                        }
                    },
                    discardChanges: function () {
                        return this.value_ = this.getValueFn_(this.observable_.discardChanges()), this.value_
                    },
                    deliver: function () {
                        return this.observable_.deliver()
                    },
                    setValue: function (e) {
                        return e = this.setValueFn_(e), !this.dontPassThroughSet_ && this.observable_.setValue ? this.observable_.setValue(e) : void 0
                    },
                    close: function () {
                        this.observable_ && this.observable_.close(), this.callback_ = void 0, this.target_ = void 0, this.observable_ = void 0, this.value_ = void 0, this.getValueFn_ = void 0, this.setValueFn_ = void 0
                    }
                };
                var pt = {
                    add: !0,
                    update: !0,
                    "delete": !0
                },
                    vt = 0,
                    dt = 1,
                    gt = 2,
                    bt = 3;
                M.prototype = {
                    calcEditDistances: function (e, t, r, n, i, o) {
                        for (var s = o - i + 1, u = r - t + 1, a = new Array(s), c = 0; s > c; c++) a[c] = new Array(u), a[c][0] = c;
                        for (var l = 0; u > l; l++) a[0][l] = l;
                        for (var c = 1; s > c; c++) for (var l = 1; u > l; l++) if (this.equals(e[t + l - 1], n[i + c - 1])) a[c][l] = a[c - 1][l - 1];
                        else {
                            var f = a[c - 1][l] + 1,
                                h = a[c][l - 1] + 1;
                            a[c][l] = h > f ? f : h
                        }
                        return a
                    },
                    spliceOperationsFromEditDistances: function (e) {
                        for (var t = e.length - 1, r = e[0].length - 1, n = e[t][r], i = []; t > 0 || r > 0;) if (0 != t) if (0 != r) {
                            var o, s = e[t - 1][r - 1],
                                u = e[t - 1][r],
                                a = e[t][r - 1];
                            o = a > u ? s > u ? u : s : s > a ? a : s, o == s ? (s == n ? i.push(vt) : (i.push(dt), n = s), t--, r--) : o == u ? (i.push(bt), t--, n = u) : (i.push(gt), r--, n = a)
                        } else i.push(bt), t--;
                        else i.push(gt), r--;
                        return i.reverse(), i
                    },
                    calcSplices: function (e, t, r, n, i, o) {
                        var s = 0,
                            u = 0,
                            a = Math.min(r - t, o - i);
                        if (0 == t && 0 == i && (s = this.sharedPrefix(e, n, a)), r == e.length && o == n.length && (u = this.sharedSuffix(e, n, a - s)), t += s, i += s, r -= u, o -= u, r - t == 0 && o - i == 0) return [];
                        if (t == r) {
                            for (var c = A(t, [], 0); o > i;) c.removed.push(n[i++]);
                            return [c]
                        }
                        if (i == o) return [A(t, [], r - t)];
                        for (var l = this.spliceOperationsFromEditDistances(this.calcEditDistances(e, t, r, n, i, o)), c = void 0, f = [], h = t, p = i, v = 0; v < l.length; v++) switch (l[v]) {
                        case vt:
                            c && (f.push(c), c = void 0), h++, p++;
                            break;
                        case dt:
                            c || (c = A(h, [], 0)), c.addedCount++, h++, c.removed.push(n[p]), p++;
                            break;
                        case gt:
                            c || (c = A(h, [], 0)), c.addedCount++, h++;
                            break;
                        case bt:
                            c || (c = A(h, [], 0)), c.removed.push(n[p]), p++
                        }
                        return c && f.push(c), f
                    },
                    sharedPrefix: function (e, t, r) {
                        for (var n = 0; r > n; n++) if (!this.equals(e[n], t[n])) return n;
                        return r
                    },
                    sharedSuffix: function (e, t, r) {
                        for (var n = e.length, i = t.length, o = 0; r > o && this.equals(e[--n], t[--i]);) o++;
                        return o
                    },
                    calculateSplices: function (e, t) {
                        return this.calcSplices(e, 0, e.length, t, 0, t.length)
                    },
                    equals: function (e, t) {
                        return e === t
                    }
                };
                var mt = new M;
                e.Observer = j, e.Observer.runEOM_ = tt, e.Observer.observerSentinel_ = ht, e.Observer.hasObjectObserve = G, e.ArrayObserver = P, e.ArrayObserver.calculateSplices = function (e, t) {
                    return mt.calculateSplices(e, t)
                }, e.ArraySplice = M, e.ObjectObserver = E, e.PathObserver = C, e.CompoundObserver = R, e.Path = f, e.ObserverTransform = $
            }("undefined" != typeof e && e && "undefined" != typeof t && t ? e : this || window)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    },
    {}]
}, {}, [25, 2]);