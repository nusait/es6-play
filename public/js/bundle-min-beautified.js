!
function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.App = t()
    }
}(function () {
    var t;
    return function e(t, r, n) {
        function i(s, a) {
            if (!r[s]) {
                if (!t[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
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
        1: [function (t, e) {
            "use strict";
            var r = t("Wildcat.View.View"),
                n = t("Wildcat.Support.helpers"),
                i = n,
                o = i.log,
                s = i.error,
                a = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    $traceurRuntime.superCall(this, u.prototype, "constructor", $traceurRuntime.spread(t));
                    var r = this.app,
                        n = r.events;
                    n.on("reportWasPosted", function (t) {
                        return o(t.type, t)
                    })
                },
                u = a;
            $traceurRuntime.createClass(a, {
                postReport: function (t, e) {
                    var r = this.app,
                        n = r.make("postReportCommand", [t, e]);
                    this.execute(n)
                },
                getBluelights: function () {
                    var t = this.app,
                        e = t.make("retrieveBluelightsCommand");
                    this.execute(e).then(function (t) {
                        o("got it from thenable ", t)
                    }).
                    catch (function (t) {
                        s("got it from catchable", t.message)
                    })
                },
                onBluelightsDelivered: function (t) {
                    t.value;
                    o("whenBluelightsDelivered")
                },
                onFailRetrieveBluelightsCommand: function (t) {
                    s("onFailRetrieveBluelightsCommand", t)
                }
            }, {}, r), e.exports = a
        },
        {
            "Wildcat.Support.helpers": 49,
            "Wildcat.View.View": 52
        }],
        2: [function (t, e) {
            "use strict";
            var r = function (t, e) {
                this.name = t, this.incident = e
            };
            $traceurRuntime.createClass(r, {}, {
                getName: function () {
                    return "postReportCommand"
                }
            }), e.exports = r
        },
        {}],
        3: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Commander.CommandHandler"),
                n = t("Wildcat.Support.helpers"),
                i = function () {
                    $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
                },
                o = i;
            $traceurRuntime.createClass(i, {
                handle: function (t) {
                    var e = this,
                        r = t,
                        n = r.name,
                        i = r.incident,
                        o = e.app,
                        s = o.make("Report");
                    u($traceurRuntime.initGeneratorFunction(function c() {
                        var t;
                        return $traceurRuntime.createGeneratorInstance(function (r) {
                            for (;;) switch (r.state) {
                            case 0:
                                return r.state = 2, s.post(n, i);
                            case 2:
                                t = r.sent, r.state = 4;
                                break;
                            case 4:
                                e.dispatchEventsFor(t), r.state = -2;
                                break;
                            default:
                                return r.end()
                            }
                        }, c, this)
                    }))().
                    catch (a)
                }
            }, {}, r); {
                var s = n,
                    a = s.terminateError,
                    u = s.async;
                s.log
            }
            e.exports = i
        },
        {
            "Wildcat.Commander.CommandHandler": 23,
            "Wildcat.Support.helpers": 49
        }],
        4: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.helpers"),
                n = function () {
                    var t = void 0 !== arguments[0] ? arguments[0] : {};
                    o(this, t)
                };
            $traceurRuntime.createClass(n, {}, {
                getName: function () {
                    return "app.retrieveBluelightsCommand"
                },
                getShortName: function () {
                    return s(this.getName())
                }
            });
            var i = r,
                o = i.assign,
                s = i.lastSegment;
            e.exports = n
        },
        {
            "Wildcat.Support.helpers": 49
        }],
        5: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Commander.CommandHandler"),
                n = t("Wildcat.Support.helpers"),
                i = function () {
                    $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
                },
                o = i;
            $traceurRuntime.createClass(i, {
                handle: $traceurRuntime.initGeneratorFunction(function a(t) {
                    var e, r, n, i, o, s, u;
                    return $traceurRuntime.createGeneratorInstance(function (a) {
                        for (;;) switch (a.state) {
                        case 0:
                            e = this.app, r = e, n = r.Bluelight, i = r.events, o = t.constructor.getName(), a.state = 19;
                            break;
                        case 19:
                            a.pushTry(9, null), a.state = 12;
                            break;
                        case 12:
                            return a.state = 2, n.get();
                        case 2:
                            s = a.sent, a.state = 4;
                            break;
                        case 4:
                            this.dispatchEventsFor(s), a.state = 8;
                            break;
                        case 8:
                            a.returnValue = s.collection, a.state = -2;
                            break;
                        case 6:
                            a.popTry(), a.state = -2;
                            break;
                        case 9:
                            a.popTry(), u = a.storedException, a.state = 15;
                            break;
                        case 15:
                            throw i.emit(o, u), u;
                        default:
                            return a.end()
                        }
                    }, a, this)
                })
            }, {}, r);
            var s = n.asyncMethods;
            s(i.prototype, "handle"), e.exports = i
        },
        {
            "Wildcat.Commander.CommandHandler": 23,
            "Wildcat.Support.helpers": 49
        }],
        6: [function (t, e) {
            "use strict";
            var r = t("../../../framework/src/Wildcat/Commander/Events/EventGenerator"),
                n = t("Wildcat.Support.helpers"),
                i = function (t, e) {
                    this.name = t, this.incident = e, r.call(this)
                };
            $traceurRuntime.createClass(i, {}, {
                get: $traceurRuntime.initGeneratorFunction(function u() {
                    var t, e, r, n, i, o, s, a, c = arguments;
                    return $traceurRuntime.createGeneratorInstance(function (u) {
                        for (;;) switch (u.state) {
                        case 0:
                            for (t = [], e = 0; e < c.length; e++) t[e] = c[e];
                            r = this.getApplication(), n = r, i = n.bluelightRepository, o = n.bluelight, u.state = 8;
                            break;
                        case 8:
                            return u.state = 2, i.get();
                        case 2:
                            s = u.sent, u.state = 4;
                            break;
                        case 4:
                            o.collection = s, a = r.make("bluelightsDelivered", [s]), u.state = 10;
                            break;
                        case 10:
                            u.returnValue = o.raise(a), u.state = -2;
                            break;
                        default:
                            return u.end()
                        }
                    }, u, this)
                }),
                getApplication: function () {
                    return this.app_
                },
                setApplication: function (t) {
                    return this.app_ = t, this
                }
            });
            var o = n,
                s = (o.log, o.extendProtoOf),
                a = (o.wait, o.asyncMethods);
            s(i, r), a(i, "get"), e.exports = i
        },
        {
            "../../../framework/src/Wildcat/Commander/Events/EventGenerator": 28,
            "Wildcat.Support.helpers": 49
        }],
        7: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.Collection"),
                n = t("../../../framework/src/Wildcat/Support/helpers"),
                i = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    $traceurRuntime.superCall(this, o.prototype, "constructor", $traceurRuntime.spread(t))
                },
                o = i;
            $traceurRuntime.createClass(i, {}, {
                getApplication: function () {
                    return this.app_
                },
                setApplication: function (t) {
                    return this.app_ = t, this
                }
            }, r); {
                var s = n;
                s.extendProtoOf, s.wait
            }
            e.exports = i
        },
        {
            "../../../framework/src/Wildcat/Support/helpers": 49,
            "Wildcat.Support.Collection": 47
        }],
        8: [function (t, e) {
            "use strict";
            var r = function (t) {
                this.value = t, this.type = this.getName(), this.timeStamp = Date.now()
            };
            $traceurRuntime.createClass(r, {
                getName: function () {
                    return "app.bluelightsDelivered"
                }
            }, {}), e.exports = r
        },
        {}],
        9: [function (t, e) {
            "use strict";
            var r = function (t) {
                this.value = t, this.type = this.getName(), this.timeStamp = Date.now()
            };
            $traceurRuntime.createClass(r, {
                getName: function () {
                    return "reportWasPosted"
                }
            }, {}), e.exports = r
        },
        {}],
        10: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Commander.Events.EventGenerator"),
                n = t("Wildcat.Support.helpers"),
                i = (t("Wildcat.Errors.ValidationError"), function (t, e) {
                    this.name = t, this.incident = e, r.call(this)
                });
            $traceurRuntime.createClass(i, {}, {
                persist: $traceurRuntime.initGeneratorFunction(function c() {
                    var t, e;
                    return $traceurRuntime.createGeneratorInstance(function (r) {
                        for (;;) switch (r.state) {
                        case 0:
                            t = this.myName(), console.log("hey report 1: " + t), r.state = 12;
                            break;
                        case 12:
                            return r.state = 2, a();
                        case 2:
                            e = r.sent, r.state = 4;
                            break;
                        case 4:
                            console.log("hey report 2"), r.state = 14;
                            break;
                        case 14:
                            return r.state = 6, a();
                        case 6:
                            r.maybeThrow(), r.state = 8;
                            break;
                        case 8:
                            console.log("hey report 3"), r.state = 16;
                            break;
                        case 16:
                            r.returnValue = "i am done!", r.state = -2;
                            break;
                        default:
                            return r.end()
                        }
                    }, c, this)
                }),
                myName: function () {
                    return "weirdName"
                },
                post: $traceurRuntime.initGeneratorFunction(function l() {
                    var t, e, r, n, i, o, s = arguments;
                    return $traceurRuntime.createGeneratorInstance(function (a) {
                        for (;;) switch (a.state) {
                        case 0:
                            for (t = [], e = 0; e < s.length; e++) t[e] = s[e];
                            r = this.getApplication(), n = r.reportRepository, i = r.make("report", t), a.state = 8;
                            break;
                        case 8:
                            return a.state = 2, n.save(i);
                        case 2:
                            i = a.sent, a.state = 4;
                            break;
                        case 4:
                            o = r.make("reportWasPosted", [i]), a.state = 10;
                            break;
                        case 10:
                            a.returnValue = i.raise(o), a.state = -2;
                            break;
                        default:
                            return a.end()
                        }
                    }, l, this)
                }),
                getApplication: function () {
                    return this.app_
                },
                setApplication: function (t) {
                    return this.app_ = t, this
                }
            });
            var o = n,
                s = (o.log, o.extendProtoOf),
                a = o.wait,
                u = o.asyncMethods;
            s(i, r), u(i, "persist", "post"), e.exports = i
        },
        {
            "Wildcat.Commander.Events.EventGenerator": 28,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.helpers": 49
        }],
        11: [function (t, e) {
            "use strict";

            function r() {
                var t = this.app;
                t.bindShared("Report", function (t) {
                    return o.setApplication(t)
                }), t.bind("report", function (t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    return new(Function.prototype.bind.apply(t.Report, $traceurRuntime.spread([null], e)))
                }), t.bind("reportWasPosted", function () {
                    for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
                    return new(Function.prototype.bind.apply(s, $traceurRuntime.spread([null], t)))
                }), t.bindShared("Bluelight", function (t) {
                    return u.setApplication(t)
                }), t.bind("bluelight", function (t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    return new(Function.prototype.bind.apply(t.Bluelight, $traceurRuntime.spread([null], e)))
                }), t.bindShared("BluelightCollection", function (t) {
                    return c.setApplication(t)
                }), t.bind("bluelightCollection", function (t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    return e.length || (e = [
                        []
                    ]), new(Function.prototype.bind.apply(t.BluelightCollection, $traceurRuntime.spread([null], e)))
                }), t.bind("bluelightsDelivered", function () {
                    for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
                    return new(Function.prototype.bind.apply(f, $traceurRuntime.spread([null], t)))
                })
            }
            function n() {
                var t = this.app;
                t.bindShared("reportRepository", function (t) {
                    return new a(t)
                }), t.bind("xhrLoader", function () {
                    return new h
                }), t.bindShared("bluelightRepository", function (t) {
                    var e = t.xhrLoader;
                    return new l(t, e)
                })
            }
            var i = t("Wildcat.Support.ServiceProvider"),
                o = t("App.Entities.Reports.Report"),
                s = t("App.Entities.Reports.Events.ReportWasPosted"),
                a = t("App.Repositories.ReportRepository"),
                u = t("App.Entities.Bluelights.Bluelight"),
                c = t("App.Entities.Bluelights.BluelightCollection"),
                l = t("App.Repositories.BluelightRepository"),
                f = t("App.Entities.Bluelights.Events.BluelightsDelivered"),
                h = t("Wildcat.Loaders.XHRLoader"),
                p = t("Wildcat.Support.helpers"),
                d = function () {
                    $traceurRuntime.defaultSuperCall(this, v.prototype, arguments)
                },
                v = d;
            $traceurRuntime.createClass(d, {
                boot: function () {},
                register: function () {
                    r.call(this), n.call(this)
                }
            }, {}, i);
            p.log;
            e.exports = d
        },
        {
            "App.Entities.Bluelights.Bluelight": 6,
            "App.Entities.Bluelights.BluelightCollection": 7,
            "App.Entities.Bluelights.Events.BluelightsDelivered": 8,
            "App.Entities.Reports.Events.ReportWasPosted": 9,
            "App.Entities.Reports.Report": 10,
            "App.Repositories.BluelightRepository": 12,
            "App.Repositories.ReportRepository": 13,
            "Wildcat.Loaders.XHRLoader": 44,
            "Wildcat.Support.ServiceProvider": 48,
            "Wildcat.Support.helpers": 49
        }],
        12: [function (t, e) {
            "use strict";
            var r = t("../../framework/src/Wildcat/Support/helpers"),
                n = function (t, e) {
                    this.app = t, this.loader = e
                };
            $traceurRuntime.createClass(n, {
                get: $traceurRuntime.initGeneratorFunction(function s() {
                    var t, e, r, n, i, o, a, u, c, l, f;
                    return $traceurRuntime.createGeneratorInstance(function (s) {
                        for (;;) switch (s.state) {
                        case 0:
                            t = this, e = t.app, r = t.loader, n = t.baseUrl, i = e.BluelightCollection, o = n + "bluelights", s.state = 12;
                            break;
                        case 12:
                            u = r.get, c = u.call(r, {
                                url: o,
                                timeout: 1e4
                            }), s.state = 6;
                            break;
                        case 6:
                            return s.state = 2, c;
                        case 2:
                            l = s.sent, s.state = 4;
                            break;
                        case 4:
                            f = l.features, a = f, s.state = 8;
                            break;
                        case 8:
                            s.returnValue = new i(a), s.state = -2;
                            break;
                        default:
                            return s.end()
                        }
                    }, s, this)
                }),
                get baseUrl() {
                    var t = this.app.config;
                    return t.get("app").apiBaseUrl
                }
            }, {}); {
                var i = r,
                    o = i.asyncMethods;
                i.log
            }
            o(n.prototype, "get"), e.exports = n
        },
        {
            "../../framework/src/Wildcat/Support/helpers": 49
        }],
        13: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.helpers"),
                n = (t("Wildcat.Errors.ValidationError"), t("Wildcat.Errors.AuthenticationError"), function (t) {
                    this.app = t
                });
            $traceurRuntime.createClass(n, {
                save: function (t) {
                    return o("saving report, please wait…"), s().then(function () {
                        return o("report saved, thank you."), t
                    })
                }
            }, {});
            var i = r,
                o = i.log,
                s = i.wait;
            e.exports = n
        },
        {
            "Wildcat.Errors.AuthenticationError": 34,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.helpers": 49
        }],
        14: [function (t, e) {
            "use strict";
            t("traceur/bin/traceur-runtime");
            var r = t("../framework/src/Wildcat/Foundation/Application");
            e.exports = r
        },
        {
            "../framework/src/Wildcat/Foundation/Application": 41,
            "traceur/bin/traceur-runtime": 58
        }],
        15: [function (t, e) {
            (function (r) {
                "use strict";

                function n() {
                    return r.navigator ? r.navigator.userAgent : "not determined"
                }
                var i = t("App.Providers.AppServiceProvider"),
                    o = t("Wildcat.Log.LogServiceProvider"),
                    s = t("Wildcat.DOM.WindowServiceProvider"),
                    a = t("Wildcat.Errors.ErrorServiceProvider"),
                    u = t("Wildcat.View.ViewServiceProvider"),
                    c = t("Wildcat.Commander.CommandServiceProvider"),
                    l = {
                        apiBaseUrl: "https://go.dosa.northwestern.edu/nuhelpapi/api/",
                        debug: !1,
                        providers: [i, o, s, a, u, c],
                        locale: "en",
                        browser: n()
                    };
                e.exports = l
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            "App.Providers.AppServiceProvider": 11,
            "Wildcat.Commander.CommandServiceProvider": 24,
            "Wildcat.DOM.WindowServiceProvider": 33,
            "Wildcat.Errors.ErrorServiceProvider": 35,
            "Wildcat.Log.LogServiceProvider": 46,
            "Wildcat.View.ViewServiceProvider": 53
        }],
        16: [function (t, e) {
            "use strict";
            var r = t("App.Commands.PostReportCommand"),
                n = t("App.Commands.RetrieveBluelightsCommand");
            e.exports = [{
                "abstract": "postReportCommand",
                command: r
            },
            {
                "abstract": "retrieveBluelightsCommand",
                command: n
            }]
        },
        {
            "App.Commands.PostReportCommand": 2,
            "App.Commands.RetrieveBluelightsCommand": 4
        }],
        17: [function (t, e) {
            "use strict";
            e.exports = {
                app: t("./app"),
                "local.app": t("./local/app"),
                "testing.app": t("./testing/app"),
                commands: t("./commands"),
                handlers: t("./handlers"),
                views: t("./views")
            }
        },
        {
            "./app": 15,
            "./commands": 16,
            "./handlers": 18,
            "./local/app": 19,
            "./testing/app": 20,
            "./views": 21
        }],
        18: [function (t, e) {
            "use strict";
            var r = t("App.Commands.PostReportCommandHandler"),
                n = t("App.Commands.RetrieveBluelightsCommandHandler");
            e.exports = [{
                "abstract": "postReportCommandHandler",
                handler: r
            },
            {
                "abstract": "retrieveBluelightsCommandHandler",
                handler: n
            }]
        },
        {
            "App.Commands.PostReportCommandHandler": 3,
            "App.Commands.RetrieveBluelightsCommandHandler": 5
        }],
        19: [function (t, e) {
            "use strict";
            e.exports = {
                apiBaseUrl: "http://nuhelp.api/api/",
                debug: !0
            }
        },
        {}],
        20: [function (t, e) {
            "use strict";
            e.exports = {
                apiBaseUrl: "http://nuhelp.api/api/",
                browser: "console"
            }
        },
        {}],
        21: [function (t, e) {
            "use strict";
            var r = t("App.Browser.Views.IntroView");
            e.exports = [{
                "abstract": "introView",
                $constructor: r,
                build: "singleton"
            }]
        },
        {
            "App.Browser.Views.IntroView": 1
        }],
        22: [function (t, e) {
            "use strict";
            var r = function (t) {
                this.app = t
            };
            $traceurRuntime.createClass(r, {
                execute: function (t) {
                    var e = t.constructor.getShortName(),
                        r = e + "Handler",
                        n = this.app.make(r);
                    return n.handle(t)
                }
            }, {}), e.exports = r
        },
        {}],
        23: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Commander.Events.DispatchableTrait"),
                n = t("Wildcat.Support.helpers"),
                i = function (t) {
                    this.app = t
                };
            $traceurRuntime.createClass(i, {}, {});
            var o = n.extendProtoOf;
            o(i, r), e.exports = i
        },
        {
            "Wildcat.Commander.Events.DispatchableTrait": 26,
            "Wildcat.Support.helpers": 49
        }],
        24: [function (t, e) {
            "use strict";

            function r() {
                this.app.bindShared("commandBus", function (t) {
                    return new a(t)
                })
            }
            function n() {
                for (var t, e = this.app, r = e.config.get("commands"), n = r[Symbol.iterator](); !(t = n.next()).done;) {
                    var i = t.value,
                        o = i.abstract,
                        s = i.command;
                    e.bind(o, function () {
                        for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
                        return new(Function.prototype.bind.apply(s, $traceurRuntime.spread([null], t)))
                    })
                }
            }
            function i() {
                for (var t, e = this.app, r = e.config.get("handlers"), n = r[Symbol.iterator](); !(t = n.next()).done;) {
                    var i = t.value,
                        o = i.abstract,
                        s = i.handler;
                    e.bindShared(o, function (t) {
                        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                        return new(Function.prototype.bind.apply(s, $traceurRuntime.spread([null, t], e)))
                    })
                }
            }
            function o() {
                var t = this.app,
                    e = t,
                    r = e.events,
                    n = e.logger;
                t.bind("eventDispatcher", function () {
                    return new u(r, n)
                })
            }
            var s = (t("Wildcat.Support.helpers").log, t("Wildcat.Support.ServiceProvider")),
                a = t("Wildcat.Commander.CommandBus"),
                u = t("Wildcat.Commander.Events.EventDispatcher"),
                c = function () {
                    $traceurRuntime.defaultSuperCall(this, l.prototype, arguments)
                },
                l = c;
            $traceurRuntime.createClass(c, {
                register: function () {
                    r.call(this), n.call(this), i.call(this), o.call(this)
                }
            }, {}, s), e.exports = c
        },
        {
            "Wildcat.Commander.CommandBus": 22,
            "Wildcat.Commander.Events.EventDispatcher": 27,
            "Wildcat.Support.ServiceProvider": 48,
            "Wildcat.Support.helpers": 49
        }],
        25: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.helpers"),
                n = function () {};
            $traceurRuntime.createClass(n, {
                execute: function (t) {
                    var e = this.getCommandBus();
                    return e.execute(t)
                },
                getCommandBus: function () {
                    return this.app.make("commandBus")
                }
            }, {});
            r.log;
            e.exports = n
        },
        {
            "Wildcat.Support.helpers": 49
        }],
        26: [function (t, e) {
            "use strict";
            var r = function () {};
            $traceurRuntime.createClass(r, {
                dispatchEventsFor: function (t) {
                    var e = this.getDispatcher(),
                        r = t.releaseEvents();
                    e.dispatch(r)
                },
                getDispatcher: function () {
                    return this.app.eventDispatcher
                }
            }, {}), e.exports = r
        },
        {}],
        27: [function (t, e) {
            "use strict";

            function r(t) {
                return t.getName()
            }
            var n = function (t, e) {
                this.events_ = t, this.log_ = e
            };
            $traceurRuntime.createClass(n, {
                dispatch: function (t) {
                    for (var e, n = t[Symbol.iterator](); !(e = n.next()).done;) {
                        var i = e.value,
                            o = r.call(this, i);
                        this.events_.emit(o, i), this.log_.log(o + " was fired.")
                    }
                }
            }, {}), e.exports = n
        },
        {}],
        28: [function (t, e) {
            "use strict";
            var r = function () {
                this.pendingEvents_ = []
            };
            $traceurRuntime.createClass(r, {
                raise: function (t) {
                    return this.pendingEvents_.push(t), this
                },
                releaseEvents: function () {
                    var t = this.pendingEvents_;
                    return this.pendingEvents_ = [], t
                }
            }, {}), e.exports = r
        },
        {}],
        29: [function (t, e) {
            "use strict";

            function r(t) {
                return t = u(t), "on" + t
            }
            function n(t) {
                return c(t)
            }
            var i = t("Wildcat.Support.helpers"),
                o = function () {};
            $traceurRuntime.createClass(o, {
                handle: function (t) {
                    var e = t.getName(),
                        i = n(e),
                        o = r(i),
                        s = a(this[o]);
                    return s ? this[o](t) : void 0
                }
            }, {});
            var s = i,
                a = s.isFunction,
                u = (s.log, s.ucfirst),
                c = s.lastSegment;
            e.exports = o
        },
        {
            "Wildcat.Support.helpers": 49
        }],
        30: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.state"),
                n = function () {
                    var t = void 0 !== arguments[0] ? arguments[0] : {},
                        e = r(this, {});
                    e.configObj = t
                };
            $traceurRuntime.createClass(n, {
                load: function (t, e) {
                    var n = (void 0 !== arguments[2] ? arguments[2] : null, r(this)),
                        i = n.configObj,
                        o = {};
                    return this.exists(e) && (o = i[e]), i[t + "." + e] && Object.assign(o, i[t + "." + e]), o
                },
                exists: function (t) {
                    var e = (void 0 !== arguments[1] ? arguments[1] : null, r(this)),
                        n = e.configObj;
                    return n[t] ? !0 : !1
                }
            }, {}), e.exports = n
        },
        {
            "Wildcat.Support.state": 51
        }],
        31: [function (t, e) {
            "use strict";

            function r(t) {
                var e = t.split(".");
                return n(e)
            }
            function n(t) {
                var e = t[0];
                return 1 === t.length ? [null, e, null] : [null, e, t[1]]
            }
            var i = t("Wildcat.Support.state"),
                o = function (t, e) {
                    var r = i(this, {});
                    r.loader = t, r.environment = e
                };
            $traceurRuntime.createClass(o, {
                has: function () {},
                get: function (t, e) {
                    var n = i(this),
                        o = n.environment,
                        s = r(t),
                        a = s[0],
                        u = s[1],
                        c = s[2],
                        l = n.loader.load(o, u, a);
                    return c ? void 0 !== l[c] ? l[c] : e : l
                },
                set: function () {}
            }, {}), e.exports = o
        },
        {
            "Wildcat.Support.state": 51
        }],
        32: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.state"),
                n = t("events").EventEmitter,
                i = t("Wildcat.Support.helpers"),
                o = function () {
                    n.call(this);
                    var t = r(this, {});
                    t.bindings = {}, t.instances = {}
                };
            $traceurRuntime.createClass(o, {
                make: function (t) {
                    var e = void 0 !== arguments[1] ? arguments[1] : [],
                        r = this.getConcrete(t),
                        n = r.apply(null, $traceurRuntime.spread([this], e));
                    return n
                },
                bind: function (t) {
                    var e = void 0 !== arguments[1] ? arguments[1] : null,
                        n = void 0 !== arguments[2] ? arguments[2] : !1,
                        i = "bind",
                        o = this;
                    r(this).bindings[t] = {
                        concrete: e,
                        shared: n
                    }, this.makeAccessorProperty(t), this.emit("bind." + t, h({
                        type: i + "." + t,
                        target: o,
                        "abstract": t,
                        shared: n
                    })), this.emit("bind", h({
                        type: i,
                        target: o,
                        "abstract": t,
                        shared: n
                    }))
                },
                bindShared: function (t, e) {
                    for (var r, n, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
                    if (p(t)) for (var s, a = t[Symbol.iterator](); !(s = a.next()).done;) {
                        var u = s.value;
                        (r = this).bindShared.apply(r, $traceurRuntime.spread(u))
                    } else this.bind(t, (n = this).share.apply(n, $traceurRuntime.spread([e], i)), !0)
                },
                getConcrete: function (t) {
                    return r(this).bindings[t].concrete
                },
                isShared: function (t) {
                    var e = r(this);
                    return e.instances[t] ? !0 : e.bindings[t] ? r.bindings[t].shared : !1
                },
                getBindings: function () {
                    return r(this).bindings
                },
                getBindingsKeys: function () {
                    return a(this.getBindings())
                },
                newInstanceOf: function (t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
                    this.bind(t, function () {
                        return new(Function.prototype.bind.apply(e, $traceurRuntime.spread([null], r)))
                    }, !1)
                },
                singleton: function (t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
                    this.bindShared(t, function () {
                        return new(Function.prototype.bind.apply(e, $traceurRuntime.spread([null], r)))
                    })
                },
                share: function (t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    var n;
                    return function (r) {
                        return void 0 === n && (n = t.apply(null, $traceurRuntime.spread([r], e))), n
                    }
                },
                forgetInstance: function (t) {
                    delete r(this).instances[t]
                },
                makeAccessorProperty: function (t) {
                    var e = this;
                    this.abstract || Object.defineProperty(this, t, {
                        get: function () {
                            return e.make(t)
                        },
                        configurable: !0
                    })
                },
                getState: function () {
                    console.dir(r)
                },
                getItems: function () {
                    return this.getBindingsKeys()
                },
                forEach: function (t, e) {
                    var r = this;
                    return e = c(e, this), this.getItems().forEach(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                map: function (t, e) {
                    var r = this;
                    return e = c(e, this), this.getItems().map(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                filter: function (t, e) {
                    var r = this;
                    return e = c(e, this), this.getItems().filter(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                getIterator: function () {
                    return l(this.getItems())
                }
            }, {});
            var s = i,
                a = s.keys,
                u = s.implementIterator,
                c = (s.isUndefined, s.isDefined, s.defined),
                l = s.arrayIterator,
                f = s.extendProtoOf,
                h = s.noProto,
                p = s.isArray;
            f(o, n), u(o), e.exports = o
        },
        {
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.state": 51,
            events: 54
        }],
        33: [function (t, e) {
            (function (r) {
                "use strict";
                var n = t("Wildcat.Support.ServiceProvider"),
                    i = function () {
                        $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
                    },
                    o = i;
                $traceurRuntime.createClass(i, {
                    register: function () {
                        var t = this.app;
                        t.bindShared("window", function () {
                            return r
                        })
                    },
                    provides: function () {
                        return ["window"]
                    }
                }, {}, n), e.exports = i
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            "Wildcat.Support.ServiceProvider": 48
        }],
        34: [function (t, e) {
            "use strict";
            var r = t("./errorConstructor"),
                n = r("AuthenticationError", "no way! authenticated");
            e.exports = n
        },
        {
            "./errorConstructor": 39
        }],
        35: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.ServiceProvider"),
                n = t("Wildcat.Errors.ValidationError"),
                i = t("Wildcat.Errors.TimeoutError"),
                o = t("Wildcat.Errors.AuthenticationError"),
                s = t("Wildcat.Errors.NetworkError"),
                a = function () {
                    $traceurRuntime.defaultSuperCall(this, u.prototype, arguments)
                },
                u = a;
            $traceurRuntime.createClass(a, {
                register: function () {
                    this.app.bindShared([
                        ["ValidationError", function () {
                            return n
                        }],
                        ["AuthenticationError", function () {
                            return o
                        }],
                        ["NetworkError", function () {
                            return s
                        }],
                        ["TimeoutError", function () {
                            return i
                        }]
                    ])
                },
                provides: function () {
                    return ["ValidationError", "AuthenticationError", "NetworkError", "TimeoutError"]
                }
            }, {}, r), e.exports = a
        },
        {
            "Wildcat.Errors.AuthenticationError": 34,
            "Wildcat.Errors.NetworkError": 36,
            "Wildcat.Errors.TimeoutError": 37,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.ServiceProvider": 48
        }],
        36: [function (t, e) {
            "use strict";
            var r = t("./errorConstructor"),
                n = r("NetworkError", "network problem");
            e.exports = n
        },
        {
            "./errorConstructor": 39
        }],
        37: [function (t, e) {
            "use strict";
            var r = t("./errorConstructor"),
                n = r("TimeoutError", "timeout error happened");
            e.exports = n
        },
        {
            "./errorConstructor": 39
        }],
        38: [function (t, e) {
            "use strict";
            var r = t("./errorConstructor"),
                n = r("ValidationError", "no way! validated");
            e.exports = n
        },
        {
            "./errorConstructor": 39
        }],
        39: [function (t, e) {
            "use strict";

            function r(t) {
                var e = !0,
                    r = !1,
                    n = !0;
                return t = s(t) ? t : [t], t.reduce(function (t, i) {
                    var o = u(i)[0],
                        s = i[o];
                    return t[o] = {
                        value: s,
                        writable: e,
                        enumerable: r,
                        configurable: n
                    }, t
                }, {})
            }
            function n(t, e) {
                var r = o.captureStackTrace;
                return r ? r(t, e) : t.stack = (new o).stack || "", t
            }
            function i() {
                var t = void 0 !== arguments[0] ? arguments[0] : "CustomError",
                    e = void 0 !== arguments[1] ? arguments[1] : "",
                    i = function (t) {
                        void 0 !== t && c(this, r({
                            message: t
                        })), n(this, s)
                    },
                    s = i;
                return $traceurRuntime.createClass(i, {}, {}, o), c(i.prototype, r([{
                    name: t
                },
                {
                    message: e
                }])), i
            }
            var o = Error,
                s = Array.isArray,
                a = Object,
                u = a.keys,
                c = a.defineProperties;
            e.exports = i
        },
        {}],
        40: [function (t, e) {
            "use strict";

            function r(t) {
                return i(t) ? this.app_[t] : t
            }
            var n = t("eventemitter2").EventEmitter2,
                i = t("Wildcat.Support.helpers").isString,
                o = function (t) {
                    this.app_ = t.app, n.call(this, t)
                };
            $traceurRuntime.createClass(o, {
                subscribe: function (t) {
                    t = r.call(this), t.subscribe(this)
                }
            }, {}, n), e.exports = o
        },
        {
            "Wildcat.Support.helpers": 49,
            eventemitter2: 56
        }],
        41: [function (t, e) {
            "use strict";
            var r = t("../../Wildcat/Container/Container"),
                n = t("../../Wildcat/Config/Repository"),
                i = t("../../Wildcat/Config/ModuleLoader"),
                o = t("../../Wildcat/Events/Dispatcher"),
                s = t("../../Wildcat/Foundation/start"),
                a = t("../../Wildcat/Foundation/ProviderRepository"),
                u = t("../../Wildcat/Commander/CommanderTrait"),
                c = t("../../Wildcat/Support/helpers"),
                l = t("../../../../config/config"),
                f = t("../../Wildcat/Support/helpers").value,
                h = {},
                p = function () {
                    $traceurRuntime.defaultSuperCall(this, d.prototype, arguments)
                },
                d = p;
            $traceurRuntime.createClass(p, {
                detectEnvironment: function (t) {
                    return h.env = f(t)
                },
                isLocal: function () {
                    return this.environment("local")
                },
                environment: function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    return t.length ? -1 !== t.indexOf(h.env) : h.env
                },
                getConfigLoader: function () {
                    return new i(l)
                },
                registerCoreContainerBindings: function () {
                    var t = this,
                        e = t.getConfigLoader(),
                        r = t.environment(),
                        i = {
                            app: t,
                            newListener: !0,
                            wildcard: !0
                        };
                    t.bindShared([
                        ["config", function () {
                            return new n(e, r)
                        }],
                        ["events", function () {
                            return new o(i)
                        }]
                    ])
                },
                getProviderRepository: function () {
                    return new a
                },
                start: function () {
                    s.call(this)
                },
                run: function () {
                    console.log("app running!")
                },
                register: function (t) {
                    return t.register(), t
                }
            }, {}, r);
            var v = c.extendProtoOf;
            v(p, u), e.exports = p
        },
        {
            "../../../../config/config": 17,
            "../../Wildcat/Commander/CommanderTrait": 25,
            "../../Wildcat/Config/ModuleLoader": 30,
            "../../Wildcat/Config/Repository": 31,
            "../../Wildcat/Container/Container": 32,
            "../../Wildcat/Events/Dispatcher": 40,
            "../../Wildcat/Foundation/ProviderRepository": 42,
            "../../Wildcat/Foundation/start": 43,
            "../../Wildcat/Support/helpers": 49
        }],
        42: [function (t, e) {
            "use strict";
            var r = function () {};
            $traceurRuntime.createClass(r, {
                load: function (t, e) {
                    for (var r, n = e[Symbol.iterator](); !(r = n.next()).done;) {
                        var i = r.value;
                        t.register(this.createProvider(t, i))
                    }
                },
                createProvider: function (t, e) {
                    return new e(t)
                }
            }, {}), e.exports = r
        },
        {}],
        43: [function (t, e) {
            "use strict";

            function r() {
                {
                    var t = this;
                    t.environment()
                }
                t.bindShared("app", function () {
                    return t
                }), t.registerCoreContainerBindings();
                var e = t.config,
                    r = e.get("app").providers;
                t.getProviderRepository().load(t, r)
            }
            t("Wildcat.Config.Repository");
            e.exports = r
        },
        {
            "Wildcat.Config.Repository": 31
        }],
        44: [function (t, e) {
            (function (r) {
                "use strict";

                function n(t) {
                    var e = t.target,
                        r = e,
                        n = r.response,
                        i = (r.status, r.statusText, r.resolve);
                    f(n) && "json" === e.responseType && (n = JSON.parse(n)), i(n)
                }
                function i(t) {
                    var e = t.target.reject,
                        r = new s;
                    e(r)
                }
                function o(t) {
                    var e = t.target,
                        r = e,
                        n = (r.response, r.status, r.reject),
                        i = new a;
                    n(i)
                }
                var s = t("Wildcat.Errors.TimeoutError"),
                    a = t("Wildcat.Errors.NetworkError"),
                    u = t("Wildcat.Support.helpers"),
                    c = function (t) {
                        this.Xhr_ = t || r.XMLHttpRequest
                    };
                $traceurRuntime.createClass(c, {
                    send: function (t, e) {
                        var r, s, a, u = e,
                            c = u.url,
                            l = void 0 === (r = u.timeout) ? 5e3 : r,
                            f = void 0 === (s = u.headers) ? {} : s,
                            d = void 0 === (a = u.responseType) ? "json" : a,
                            v = new this.Xhr_,
                            m = new Promise(function (e, r) {
                                v.open(t, c), "json" === d && v.setRequestHeader("Accept", "application/json"), p(f).forEach(function (t) {
                                    var e;
                                    return (e = v).setRequestHeader.apply(e, $traceurRuntime.spread(t))
                                }), h(v, {
                                    resolve: e,
                                    reject: r,
                                    responseType: d,
                                    timeout: l,
                                    onload: n,
                                    ontimeout: i,
                                    onerror: o
                                }).send()
                            });
                        return m.cancel = v.abort.bind(v), m
                    },
                    get: function () {
                        for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                        return (t = this).send.apply(t, $traceurRuntime.spread(["GET"], e))
                    }
                }, {});
                var l = u,
                    f = (l.log, l.error, l.isString),
                    h = l.assign,
                    p = l.entries;
                e.exports = c
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            "Wildcat.Errors.NetworkError": 36,
            "Wildcat.Errors.TimeoutError": 37,
            "Wildcat.Support.helpers": 49
        }],
        45: [function (t, e) {
            (function (r) {
                "use strict";
                var n = t("Wildcat.Support.state"),
                    i = function () {
                        var t = void 0 !== arguments[0] ? arguments[0] : r,
                            e = n(this, {});
                        e.window = t, e.console = t.console
                    };
                $traceurRuntime.createClass(i, {
                    log: function () {
                        for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                        (t = n(this).console).log.apply(t, $traceurRuntime.spread(e))
                    },
                    error: function () {
                        for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                        (t = n(this).console).error.apply(t, $traceurRuntime.spread(e))
                    },
                    dir: function () {
                        for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                        (t = n(this).console).dir.apply(t, $traceurRuntime.spread(e))
                    },
                    get state_() {
                        return n(this)
                    }
                }, {}), e.exports = i
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            "Wildcat.Support.state": 51
        }],
        46: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.ServiceProvider"),
                n = t("Wildcat.Log.ConsoleLogger"),
                i = function () {
                    $traceurRuntime.defaultSuperCall(this, o.prototype, arguments)
                },
                o = i;
            $traceurRuntime.createClass(i, {
                register: function () {
                    this.app.singleton("logger", n)
                },
                provides: function () {
                    return ["log"]
                }
            }, {}, r), e.exports = i
        },
        {
            "Wildcat.Log.ConsoleLogger": 45,
            "Wildcat.Support.ServiceProvider": 48
        }],
        47: [function (t, e) {
            "use strict";
            var r = t("./helpers"),
                n = function (t) {
                    if (!o(t)) throw new TypeError("collection object must be created with an array");
                    this.items_ = t
                };
            $traceurRuntime.createClass(n, {
                getItems: function () {
                    return this.items_
                },
                forEach: function (t, e) {
                    var r = this;
                    return e = s(e, this), this.getItems().forEach(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                filter: function (t, e) {
                    var r = this;
                    return e = s(e, this), this.getItems().filter(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                map: function (t, e) {
                    var r = this;
                    return e = s(e, this), this.getItems().map(function (n, i) {
                        return t.call(e, n, i, r)
                    })
                },
                toJson: function () {
                    var t = this.getItems();
                    return JSON.stringify(t)
                },
                get length() {
                    return this.items_.length
                }
            }, {});
            var i = r,
                o = i.isArray,
                s = i.defined;
            e.exports = n
        },
        {
            "./helpers": 49
        }],
        48: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.state"),
                n = function (t) {
                    var e = r(this, {});
                    e.app = t
                };
            $traceurRuntime.createClass(n, {
                register: function () {},
                get app() {
                    return r(this).app
                }
            }, {}), e.exports = n
        },
        {
            "Wildcat.Support.state": 51
        }],
        49: [function (t, e) {
            (function (t) {
                "use strict";

                function r(t) {
                    if (t instanceof Map) {
                        var e = [];
                        return t.forEach(function (t, r) {
                            e.push(r)
                        }), e
                    }
                    return Object.keys(t)
                }
                function n() {
                    var t = void 0 !== arguments[0] ? arguments[0] : {};
                    if (t instanceof Map) {
                        var e = [];
                        return t.forEach(function (t) {
                            e.push(t)
                        }), e
                    }
                    return r(t).map(function (e) {
                        return t[e]
                    })
                }
                function i() {
                    var t = void 0 !== arguments[0] ? arguments[0] : {};
                    if (t instanceof Map) {
                        var e = [];
                        return t.forEach(function (t, r) {
                            e.push([r, t])
                        }), e
                    }
                    return r(t).map(function (e) {
                        return [e, t[e]]
                    })
                }
                function o(t) {
                    for (var e, r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
                    for (var i, s, a, u, c, l = r[Symbol.iterator](); !(c = l.next()).done;) if (i = c.value, d(i)) {
                        s = {}, e = i, i = e[0], a = Array.prototype.slice.call(e, 1), e;
                        for (var f, h = a[Symbol.iterator](); !(f = h.next()).done;) u = f.value, s[u] = i[u];
                        o(t, s)
                    } else Object.assign(t, i);
                    return t
                }
                function s(t, e) {
                    var n = void 0 !== arguments[2] ? arguments[2] : [];
                    if (l(n)) return void(t.prototype[n] = e.prototype[n]);
                    for (var i, o = r(e.prototype), s = o[Symbol.iterator](); !(i = s.next()).done;) {
                        var n = i.value;
                        t.prototype[n] = e.prototype[n]
                    }
                }
                function a(t) {
                    var e = t.prototype;
                    e[Symbol.iterator] = e.getIterator
                }
                function u(t) {
                    return "function" == typeof t ? t() : t
                }
                function c(t) {
                    return null === t
                }
                function l(t) {
                    return "string" == typeof t
                }
                function f(t) {
                    return "function" == typeof t
                }
                function h(t) {
                    return void 0 === t
                }
                function p(t) {
                    return !h(t)
                }
                function d(t) {
                    return Array.isArray(t)
                }
                function v(t, e) {
                    return p(t) ? t : e
                }
                function m() {
                    for (var t = void 0 !== arguments[0] ? arguments[0] : 500, e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    return new Promise(function (r) {
                        setTimeout(function () {
                            r.apply(null, $traceurRuntime.spread(e))
                        }, t)
                    })
                }
                function g() {
                    for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                    (t = W).log.apply(t, $traceurRuntime.spread(e))
                }
                function b() {
                    for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                    (t = W).dir.apply(t, $traceurRuntime.spread(e))
                }
                function y() {
                    for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                    (t = W).error.apply(t, $traceurRuntime.spread(e))
                }
                function _() {
                    for (var t, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                    (t = W).warn.apply(t, $traceurRuntime.spread(e))
                }
                function w(t) {
                    var e = j(t);
                    e().then(g, C)
                }
                function j(t) {
                    return function () {
                        function e(t) {
                            var i = t.done,
                                o = t.value;
                            return i ? r.resolve(o) : r.resolve(o).then(function (t) {
                                return e(n.next(t))
                            }, function (t) {
                                return e(n.
                                throw (t))
                            })
                        }
                        var r = Promise,
                            n = t.apply(this, arguments);
                        try {
                            return e(n.next())
                        } catch (i) {
                            return r.reject(i)
                        }
                    }
                }
                function O(t) {
                    for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                    for (var n, i = e[Symbol.iterator](); !(n = i.next()).done;) {
                        var o = n.value;
                        t[o] = j(t[o])
                    }
                }
                function S() {
                    var t = void 0 !== arguments[0] ? arguments[0] : [],
                        e = 0,
                        r = t.length;
                    return {
                        next: function () {
                            var n, i;
                            return (i = r > e) && (n = t[e++]), {
                                value: n,
                                done: !i
                            }
                        }
                    }
                }
                function E() {
                    var t = void 0 !== arguments[0] ? arguments[0] : {},
                        e = Object.create(null);
                    return Object.assign(e, t), e
                }
                function C(t) {
                    $(function () {
                        throw _("from [terimateError]:"), _(t.stack), t
                    }, 0)
                }
                function x() {
                    var t = void 0 !== arguments[0] ? arguments[0] : {};
                    if (t instanceof Map) return t;
                    var e = new Map,
                        n = r(t);
                    return n.reduce(function (r, n) {
                        var i = t[n];
                        return e.set(n, i), e
                    }, e)
                }
                function R(t) {
                    var e = t.charAt(0).toUpperCase();
                    return e + t.substr(1)
                }
                function P(t) {
                    return t[0]
                }
                function k(t) {
                    var e = t.length,
                        r = e - 1;
                    return t[r]
                }
                function A(t) {
                    var e = t.split(".");
                    return k(e)
                }
                var W = t.console,
                    $ = t.setTimeout,
                    I = {
                        keys: r,
                        values: n,
                        entries: i,
                        assign: o,
                        extendProtoOf: s,
                        implementIterator: a,
                        value: u,
                        isNull: c,
                        isString: l,
                        isFunction: f,
                        isUndefined: h,
                        isDefined: p,
                        isArray: d,
                        defined: v,
                        wait: m,
                        log: g,
                        dir: b,
                        error: y,
                        warn: _,
                        spawn: w,
                        async: j,
                        asyncMethods: O,
                        arrayIterator: S,
                        noProto: E,
                        terminateError: C,
                        mapFrom: x,
                        ucfirst: R,
                        first: P,
                        last: k,
                        lastSegment: A
                    };
                e.exports = I
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {}],
        50: [function (t, e) {
            (function (r) {
                "use strict";
                t("observe-js");
                e.exports = {
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
            "observe-js": 57
        }],
        51: [function (t, e) {
            (function (r) {
                "use strict";

                function n(t, e, r) {
                    var n = void 0 !== arguments[3] ? arguments[3] : !1;
                    if (f(e)) return y.get(t);
                    if (p(e)) return i.call(t, e, r, n), t;
                    var a = o.call(t, e);
                    return r && s.call(t, a, r), a
                }
                function i(t, e, r) {
                    var i = n(this);
                    i[t] = e, r && i.observer_.discardChanges(), g.performMicrotaskCheckpoint()
                }
                function o(t) {
                    return y.set(this, t), y.get(this)
                }
                function s(t, e) {
                    t.observer_ = new m(t), t.observer_.open(a.bind(this, {
                        _: t,
                        cbs: e
                    }))
                }
                function a(t, e, r, n, i) {
                    var o = t,
                        s = o._,
                        a = o.cbs,
                        c = {
                            added: e,
                            removed: r,
                            changed: n,
                            _: s,
                            cbs: a,
                            getOldValueFn: i
                        };
                    u.call(this, c)
                }
                function u(t) {
                    var e = this;
                    ["added", "removed", "changed"].forEach(function (r) {
                        var n = "function" == typeof t.cbs[r],
                            i = Object.keys(t[r]).length > 0;
                        n && i && c.call(e, t, r)
                    })
                }
                function c(t, e) {
                    var r = t.cbs[e],
                        n = Object.keys(t[e]),
                        i = n.map(function (r) {
                            return h({
                                name: r,
                                type: e,
                                newValue: t._[r],
                                oldValue: t.getOldValueFn(r)
                            })
                        });
                    r.call(this, i)
                }
                var l = t("Wildcat.Support.helpers"),
                    f = l.isUndefined,
                    h = (l.log, l.noProto),
                    p = l.isString,
                    d = t("Wildcat.Support.observe"),
                    v = d,
                    m = v.ObjectObserver,
                    g = v.Platform,
                    b = r.WeakMap || r.Map,
                    y = new b;
                e.exports = n
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.observe": 50
        }],
        52: [function (t, e) {
            "use strict";

            function r(t) {
                h("onStateChanged");
                for (var e, r = t[Symbol.iterator](); !(e = r.next()).done;) {
                    var n = e.value;
                    h(n)
                }
            }
            function n(t) {
                h("onStateAdded");
                for (var e, r = t[Symbol.iterator](); !(e = r.next()).done;) {
                    var n = e.value;
                    h(n)
                }
            }
            var i = t("Wildcat.Support.state"),
                o = t("Wildcat.Support.observe"),
                s = t("Wildcat.Support.helpers"),
                a = t("Wildcat.Commander.CommanderTrait"),
                u = t("Wildcat.Commander.Events.EventListener"),
                c = o,
                l = (c.PathObserver, c.Platform, function (t) {
                    this.app = t;
                    var e = {
                        el: null
                    };
                    i(this, e, {
                        changed: r,
                        added: n
                    })
                });
            $traceurRuntime.createClass(l, {
                setEl: function (t) {
                    var e = void 0 !== arguments[1] ? arguments[1] : !1;
                    return i(this, "el", t, e)
                },
                get el() {
                    return i(this).el
                },
                set el(t) {
                    this.setEl(t)
                },
                render: function () {}
            }, {}, u);
            var f = s,
                h = f.log,
                p = f.extendProtoOf;
            p(l, a), e.exports = l
        },
        {
            "Wildcat.Commander.CommanderTrait": 25,
            "Wildcat.Commander.Events.EventListener": 29,
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.observe": 50,
            "Wildcat.Support.state": 51
        }],
        53: [function (t, e) {
            "use strict";
            var r = t("Wildcat.Support.ServiceProvider"),
                n = (t("Wildcat.View.View"), function () {
                    $traceurRuntime.defaultSuperCall(this, i.prototype, arguments)
                }),
                i = n;
            $traceurRuntime.createClass(n, {
                register: function () {
                    for (var t, e = this.app, r = e.config.get("views"), n = r[Symbol.iterator](); !(t = n.next()).done;) {
                        var i = t.value,
                            o = i.abstract,
                            s = i.$constructor,
                            a = i.build;
                        switch (a) {
                        case "singleton":
                            e.bindShared(o, function (t) {
                                return new s(t)
                            })
                        }
                    }
                }
            }, {}, r), e.exports = n
        },
        {
            "Wildcat.Support.ServiceProvider": 48,
            "Wildcat.View.View": 52
        }],
        54: [function (t, e) {
            function r() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }
            function n(t) {
                return "function" == typeof t
            }
            function i(t) {
                return "number" == typeof t
            }
            function o(t) {
                return "object" == typeof t && null !== t
            }
            function s(t) {
                return void 0 === t
            }
            e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (t) {
                if (!i(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
                return this._maxListeners = t, this
            }, r.prototype.emit = function (t) {
                var e, r, i, a, u, c;
                if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                    if (e = arguments[1], e instanceof Error) throw e;
                    throw TypeError('Uncaught, unspecified "error" event.')
                }
                if (r = this._events[t], s(r)) return !1;
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
                    for (i = arguments.length, a = new Array(i - 1), u = 1; i > u; u++) a[u - 1] = arguments[u];
                    r.apply(this, a)
                } else if (o(r)) {
                    for (i = arguments.length, a = new Array(i - 1), u = 1; i > u; u++) a[u - 1] = arguments[u];
                    for (c = r.slice(), i = c.length, u = 0; i > u; u++) c[u].apply(this, a)
                }
                return !0
            }, r.prototype.addListener = function (t, e) {
                var i;
                if (!n(e)) throw TypeError("listener must be a function");
                if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, n(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned) {
                    var i;
                    i = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())
                }
                return this
            }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (t, e) {
                function r() {
                    this.removeListener(t, r), i || (i = !0, e.apply(this, arguments))
                }
                if (!n(e)) throw TypeError("listener must be a function");
                var i = !1;
                return r.listener = e, this.on(t, r), this
            }, r.prototype.removeListener = function (t, e) {
                var r, i, s, a;
                if (!n(e)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[t]) return this;
                if (r = this._events[t], s = r.length, i = -1, r === e || n(r.listener) && r.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
                else if (o(r)) {
                    for (a = s; a-- > 0;) if (r[a] === e || r[a].listener && r[a].listener === e) {
                        i = a;
                        break
                    }
                    if (0 > i) return this;
                    1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", t, e)
                }
                return this
            }, r.prototype.removeAllListeners = function (t) {
                var e, r;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                if (0 === arguments.length) {
                    for (e in this._events)"removeListener" !== e && this.removeAllListeners(e);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (r = this._events[t], n(r)) this.removeListener(t, r);
                else for (; r.length;) this.removeListener(t, r[r.length - 1]);
                return delete this._events[t], this
            }, r.prototype.listeners = function (t) {
                var e;
                return e = this._events && this._events[t] ? n(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
            }, r.listenerCount = function (t, e) {
                var r;
                return r = t._events && t._events[e] ? n(t._events[e]) ? 1 : t._events[e].length : 0
            }
        },
        {}],
        55: [function (t, e) {
            function r() {}
            var n = e.exports = {};
            n.nextTick = function () {
                var t = "undefined" != typeof window && window.setImmediate,
                    e = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (t) return function (t) {
                    return window.setImmediate(t)
                };
                if (e) {
                    var r = [];
                    return window.addEventListener("message", function (t) {
                        var e = t.source;
                        if ((e === window || null === e) && "process-tick" === t.data && (t.stopPropagation(), r.length > 0)) {
                            var n = r.shift();
                            n()
                        }
                    }, !0), function (t) {
                        r.push(t), window.postMessage("process-tick", "*")
                    }
                }
                return function (t) {
                    setTimeout(t, 0)
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
        56: [function (e, r, n) {
            !
            function () {
                function e() {
                    this._events = {}, this._conf && r.call(this, this._conf)
                }
                function r(t) {
                    t && (this._conf = t, t.delimiter && (this.delimiter = t.delimiter), t.maxListeners && (this._events.maxListeners = t.maxListeners), t.wildcard && (this.wildcard = t.wildcard), t.newListener && (this.newListener = t.newListener), this.wildcard && (this.listenerTree = {}))
                }
                function i(t) {
                    this._events = {}, this.newListener = !1, r.call(this, t)
                }
                function o(t, e, r, n) {
                    if (!r) return [];
                    var i, s, a, u, c, l, f, h = [],
                        p = e.length,
                        d = e[n],
                        v = e[n + 1];
                    if (n === p && r._listeners) {
                        if ("function" == typeof r._listeners) return t && t.push(r._listeners), [r];
                        for (i = 0, s = r._listeners.length; s > i; i++) t && t.push(r._listeners[i]);
                        return [r]
                    }
                    if ("*" === d || "**" === d || r[d]) {
                        if ("*" === d) {
                            for (a in r)"_listeners" !== a && r.hasOwnProperty(a) && (h = h.concat(o(t, e, r[a], n + 1)));
                            return h
                        }
                        if ("**" === d) {
                            f = n + 1 === p || n + 2 === p && "*" === v, f && r._listeners && (h = h.concat(o(t, e, r, p)));
                            for (a in r)"_listeners" !== a && r.hasOwnProperty(a) && ("*" === a || "**" === a ? (r[a]._listeners && !f && (h = h.concat(o(t, e, r[a], p))), h = h.concat(o(t, e, r[a], n))) : h = h.concat(a === v ? o(t, e, r[a], n + 2) : o(t, e, r[a], n)));
                            return h
                        }
                        h = h.concat(o(t, e, r[d], n + 1))
                    }
                    if (u = r["*"], u && o(t, e, u, n + 1), c = r["**"]) if (p > n) {
                        c._listeners && o(t, e, c, p);
                        for (a in c)"_listeners" !== a && c.hasOwnProperty(a) && (a === v ? o(t, e, c[a], n + 2) : a === d ? o(t, e, c[a], n + 1) : (l = {}, l[a] = c[a], o(t, e, {
                            "**": l
                        }, n + 1)))
                    } else c._listeners ? o(t, e, c, p) : c["*"] && c["*"]._listeners && o(t, e, c["*"], p);
                    return h
                }
                function s(t, e) {
                    t = "string" == typeof t ? t.split(this.delimiter) : t.slice();
                    for (var r = 0, n = t.length; n > r + 1; r++) if ("**" === t[r] && "**" === t[r + 1]) return;
                    for (var i = this.listenerTree, o = t.shift(); o;) {
                        if (i[o] || (i[o] = {}), i = i[o], 0 === t.length) {
                            if (i._listeners) {
                                if ("function" == typeof i._listeners) i._listeners = [i._listeners, e];
                                else if (a(i._listeners) && (i._listeners.push(e), !i._listeners.warned)) {
                                    var s = u;
                                    "undefined" != typeof this._events.maxListeners && (s = this._events.maxListeners), s > 0 && i._listeners.length > s && (i._listeners.warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", i._listeners.length), console.trace())
                                }
                            } else i._listeners = e;
                            return !0
                        }
                        o = t.shift()
                    }
                    return !0
                }
                var a = Array.isArray ? Array.isArray : function (t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                    u = 10;
                i.prototype.delimiter = ".", i.prototype.setMaxListeners = function (t) {
                    this._events || e.call(this), this._events.maxListeners = t, this._conf || (this._conf = {}), this._conf.maxListeners = t
                }, i.prototype.event = "", i.prototype.once = function (t, e) {
                    return this.many(t, 1, e), this
                }, i.prototype.many = function (t, e, r) {
                    function n() {
                        0 === --e && i.off(t, n), r.apply(this, arguments)
                    }
                    var i = this;
                    if ("function" != typeof r) throw new Error("many only accepts instances of Function");
                    return n._origin = r, this.on(t, n), i
                }, i.prototype.emit = function () {
                    this._events || e.call(this);
                    var t = arguments[0];
                    if ("newListener" === t && !this.newListener && !this._events.newListener) return !1;
                    if (this._all) {
                        for (var r = arguments.length, n = new Array(r - 1), i = 1; r > i; i++) n[i - 1] = arguments[i];
                        for (i = 0, r = this._all.length; r > i; i++) this.event = t, this._all[i].apply(this, n)
                    }
                    if ("error" === t && !(this._all || this._events.error || this.wildcard && this.listenerTree.error)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                    var s;
                    if (this.wildcard) {
                        s = [];
                        var a = "string" == typeof t ? t.split(this.delimiter) : t.slice();
                        o.call(this, s, a, this.listenerTree, 0)
                    } else s = this._events[t];
                    if ("function" == typeof s) {
                        if (this.event = t, 1 === arguments.length) s.call(this);
                        else if (arguments.length > 1) switch (arguments.length) {
                        case 2:
                            s.call(this, arguments[1]);
                            break;
                        case 3:
                            s.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            for (var r = arguments.length, n = new Array(r - 1), i = 1; r > i; i++) n[i - 1] = arguments[i];
                            s.apply(this, n)
                        }
                        return !0
                    }
                    if (s) {
                        for (var r = arguments.length, n = new Array(r - 1), i = 1; r > i; i++) n[i - 1] = arguments[i];
                        for (var u = s.slice(), i = 0, r = u.length; r > i; i++) this.event = t, u[i].apply(this, n);
                        return u.length > 0 || !! this._all
                    }
                    return !!this._all
                }, i.prototype.on = function (t, r) {
                    if ("function" == typeof t) return this.onAny(t), this;
                    if ("function" != typeof r) throw new Error("on only accepts instances of Function");
                    if (this._events || e.call(this), this.emit("newListener", t, r), this.wildcard) return s.call(this, t, r), this;
                    if (this._events[t]) {
                        if ("function" == typeof this._events[t]) this._events[t] = [this._events[t], r];
                        else if (a(this._events[t]) && (this._events[t].push(r), !this._events[t].warned)) {
                            var n = u;
                            "undefined" != typeof this._events.maxListeners && (n = this._events.maxListeners), n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), console.trace())
                        }
                    } else this._events[t] = r;
                    return this
                }, i.prototype.onAny = function (t) {
                    if ("function" != typeof t) throw new Error("onAny only accepts instances of Function");
                    return this._all || (this._all = []), this._all.push(t), this
                }, i.prototype.addListener = i.prototype.on, i.prototype.off = function (t, e) {
                    if ("function" != typeof e) throw new Error("removeListener only takes instances of Function");
                    var r, n = [];
                    if (this.wildcard) {
                        var i = "string" == typeof t ? t.split(this.delimiter) : t.slice();
                        n = o.call(this, null, i, this.listenerTree, 0)
                    } else {
                        if (!this._events[t]) return this;
                        r = this._events[t], n.push({
                            _listeners: r
                        })
                    }
                    for (var s = 0; s < n.length; s++) {
                        var u = n[s];
                        if (r = u._listeners, a(r)) {
                            for (var c = -1, l = 0, f = r.length; f > l; l++) if (r[l] === e || r[l].listener && r[l].listener === e || r[l]._origin && r[l]._origin === e) {
                                c = l;
                                break
                            }
                            if (0 > c) continue;
                            return this.wildcard ? u._listeners.splice(c, 1) : this._events[t].splice(c, 1), 0 === r.length && (this.wildcard ? delete u._listeners : delete this._events[t]), this
                        }(r === e || r.listener && r.listener === e || r._origin && r._origin === e) && (this.wildcard ? delete u._listeners : delete this._events[t])
                    }
                    return this
                }, i.prototype.offAny = function (t) {
                    var e, r = 0,
                        n = 0;
                    if (t && this._all && this._all.length > 0) {
                        for (e = this._all, r = 0, n = e.length; n > r; r++) if (t === e[r]) return e.splice(r, 1), this
                    } else this._all = [];
                    return this
                }, i.prototype.removeListener = i.prototype.off, i.prototype.removeAllListeners = function (t) {
                    if (0 === arguments.length) return !this._events || e.call(this), this;
                    if (this.wildcard) for (var r = "string" == typeof t ? t.split(this.delimiter) : t.slice(), n = o.call(this, null, r, this.listenerTree, 0), i = 0; i < n.length; i++) {
                        var s = n[i];
                        s._listeners = null
                    } else {
                        if (!this._events[t]) return this;
                        this._events[t] = null
                    }
                    return this
                }, i.prototype.listeners = function (t) {
                    if (this.wildcard) {
                        var r = [],
                            n = "string" == typeof t ? t.split(this.delimiter) : t.slice();
                        return o.call(this, r, n, this.listenerTree, 0), r
                    }
                    return this._events || e.call(this), this._events[t] || (this._events[t] = []), a(this._events[t]) || (this._events[t] = [this._events[t]]), this._events[t]
                }, i.prototype.listenersAny = function () {
                    return this._all ? this._all : []
                }, "function" == typeof t && t.amd ? t(function () {
                    return i
                }) : "object" == typeof n ? n.EventEmitter2 = i : window.EventEmitter2 = i
            }()
        },
        {}],
        57: [function (t, e) {
            (function (t) {
                !
                function (t) {
                    "use strict";

                    function e() {
                        function t(t) {
                            e = t
                        }
                        if ("function" != typeof Object.observe || "function" != typeof Array.observe) return !1;
                        var e = [],
                            r = {},
                            n = [];
                        return Object.observe(r, t), Array.observe(n, t), r.id = 1, r.id = 2, delete r.id, n.push(1, 2), n.length = 0, Object.deliverChangeRecords(t), 5 !== e.length ? !1 : "add" != e[0].type || "update" != e[1].type || "delete" != e[2].type || "splice" != e[3].type || "splice" != e[4].type ? !1 : (Object.unobserve(r, t), Array.unobserve(n, t), !0)
                    }
                    function r() {
                        if ("undefined" != typeof chrome && chrome.app && chrome.app.runtime) return !1;
                        if ("undefined" != typeof navigator && navigator.getDeviceStorage) return !1;
                        try {
                            var t = new Function("", "return true;");
                            return t()
                        } catch (e) {
                            return !1
                        }
                    }
                    function n(t) {
                        return +t === t >>> 0 && "" !== t
                    }
                    function i(t) {
                        return +t
                    }
                    function o(t) {
                        return t === Object(t)
                    }
                    function s(t, e) {
                        return t === e ? 0 !== t || 1 / t === 1 / e : G(t) && G(e) ? !0 : t !== t && e !== e
                    }
                    function a(t) {
                        if (void 0 === t) return "eof";
                        var e = t.charCodeAt(0);
                        switch (e) {
                        case 91:
                        case 93:
                        case 46:
                        case 34:
                        case 39:
                        case 48:
                            return t;
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
                        return e >= 97 && 122 >= e || e >= 65 && 90 >= e ? "ident" : e >= 49 && 57 >= e ? "number" : "else"
                    }
                    function u() {}
                    function c(t) {
                        function e() {
                            if (!(h >= t.length)) {
                                var e = t[h + 1];
                                return "inSingleQuote" == p && "'" == e || "inDoubleQuote" == p && '"' == e ? (h++, n = e, d.append(), !0) : void 0
                            }
                        }
                        for (var r, n, i, o, s, c, l, f = [], h = -1, p = "beforePath", d = {
                            push: function () {
                                void 0 !== i && (f.push(i), i = void 0)
                            },
                            append: function () {
                                void 0 === i ? i = n : i += n
                            }
                        }; p;) if (h++, r = t[h], "\\" != r || !e(p)) {
                            if (o = a(r), l = Q[p], s = l[o] || l["else"] || "error", "error" == s) return;
                            if (p = s[0], c = d[s[1]] || u, n = void 0 === s[2] ? r : s[2], c(), "afterPath" === p) return f
                        }
                    }
                    function l(t) {
                        return q.test(t)
                    }
                    function f(t, e) {
                        if (e !== X) throw Error("Use Path.get to retrieve path objects");
                        for (var r = 0; r < t.length; r++) this.push(String(t[r]));
                        D && this.length && (this.getValueFrom = this.compiledGetValueFromFn())
                    }
                    function h(t) {
                        if (t instanceof f) return t;
                        if ((null == t || 0 == t.length) && (t = ""), "string" != typeof t) {
                            if (n(t.length)) return new f(t, X);
                            t = String(t)
                        }
                        var e = K[t];
                        if (e) return e;
                        var r = c(t);
                        if (!r) return J;
                        var e = new f(r, X);
                        return K[t] = e, e
                    }
                    function p(t) {
                        return n(t) ? "[" + t + "]" : '["' + t.replace(/"/g, '\\"') + '"]'
                    }
                    function d(e) {
                        for (var r = 0; Y > r && e.check_();) r++;
                        return V && (t.dirtyCheckCycleCount = r), r > 0
                    }
                    function v(t) {
                        for (var e in t) return !1;
                        return !0
                    }
                    function m(t) {
                        return v(t.added) && v(t.removed) && v(t.changed)
                    }
                    function g(t, e) {
                        var r = {},
                            n = {},
                            i = {};
                        for (var o in e) {
                            var s = t[o];
                            (void 0 === s || s !== e[o]) && (o in t ? s !== e[o] && (i[o] = s) : n[o] = void 0)
                        }
                        for (var o in t) o in e || (r[o] = t[o]);
                        return Array.isArray(t) && t.length !== e.length && (i.length = t.length), {
                            added: r,
                            removed: n,
                            changed: i
                        }
                    }
                    function b() {
                        if (!te.length) return !1;
                        for (var t = 0; t < te.length; t++) te[t]();
                        return te.length = 0, !0
                    }
                    function y() {
                        function t(t) {
                            e && e.state_ === oe && !n && e.check_(t)
                        }
                        var e, r, n = !1,
                            i = !0;
                        return {
                            open: function (r) {
                                if (e) throw Error("ObservedObject in use");
                                i || Object.deliverChangeRecords(t), e = r, i = !1
                            },
                            observe: function (e, n) {
                                r = e, n ? Array.observe(r, t) : Object.observe(r, t)
                            },
                            deliver: function (e) {
                                n = e, Object.deliverChangeRecords(t), n = !1
                            },
                            close: function () {
                                e = void 0, Object.unobserve(r, t), re.push(this)
                            }
                        }
                    }
                    function _(t, e, r) {
                        var n = re.pop() || y();
                        return n.open(t), n.observe(e, r), n
                    }
                    function w() {
                        function t(e, o) {
                            e && (e === n && (i[o] = !0), a.indexOf(e) < 0 && (a.push(e), Object.observe(e, r)), t(Object.getPrototypeOf(e), o))
                        }
                        function e(t) {
                            for (var e = 0; e < t.length; e++) {
                                var r = t[e];
                                if (r.object !== n || i[r.name] || "setPrototype" === r.type) return !1
                            }
                            return !0
                        }
                        function r(r) {
                            if (!e(r)) {
                                for (var n, i = 0; i < s.length; i++) n = s[i], n.state_ == oe && n.iterateObjects_(t);
                                for (var i = 0; i < s.length; i++) n = s[i], n.state_ == oe && n.check_()
                            }
                        }
                        var n, i, o = 0,
                            s = [],
                            a = [],
                            u = {
                                object: void 0,
                                objects: a,
                                open: function (e, r) {
                                    n || (n = r, i = {}), s.push(e), o++, e.iterateObjects_(t)
                                },
                                close: function () {
                                    if (o--, !(o > 0)) {
                                        for (var t = 0; t < a.length; t++) Object.unobserve(a[t], r), O.unobservedCount++;
                                        s.length = 0, a.length = 0, n = void 0, i = void 0, ne.push(this)
                                    }
                                }
                            };
                        return u
                    }
                    function j(t, e) {
                        return Z && Z.object === e || (Z = ne.pop() || w(), Z.object = e), Z.open(t, e), Z
                    }
                    function O() {
                        this.state_ = ie, this.callback_ = void 0, this.target_ = void 0, this.directObserver_ = void 0, this.value_ = void 0, this.id_ = ue++
                    }
                    function S(t) {
                        O._allObserversCount++, le && ce.push(t)
                    }
                    function E() {
                        O._allObserversCount--
                    }
                    function C(t) {
                        O.call(this), this.value_ = t, this.oldObject_ = void 0
                    }
                    function x(t) {
                        if (!Array.isArray(t)) throw Error("Provided object is not an Array");
                        C.call(this, t)
                    }
                    function R(t, e) {
                        O.call(this), this.object_ = t, this.path_ = h(e), this.directObserver_ = void 0
                    }
                    function P(t) {
                        O.call(this), this.reportChangesOnOpen_ = t, this.value_ = [], this.directObserver_ = void 0, this.observed_ = []
                    }
                    function k(t) {
                        return t
                    }
                    function A(t, e, r, n) {
                        this.callback_ = void 0, this.target_ = void 0, this.value_ = void 0, this.observable_ = t, this.getValueFn_ = e || k, this.setValueFn_ = r || k, this.dontPassThroughSet_ = n
                    }
                    function W(t, e, r) {
                        for (var n = {}, i = {}, o = 0; o < e.length; o++) {
                            var s = e[o];
                            pe[s.type] ? (s.name in r || (r[s.name] = s.oldValue), "update" != s.type && ("add" != s.type ? s.name in n ? (delete n[s.name], delete r[s.name]) : i[s.name] = !0 : s.name in i ? delete i[s.name] : n[s.name] = !0)) : (console.error("Unknown changeRecord type: " + s.type), console.error(s))
                        }
                        for (var a in n) n[a] = t[a];
                        for (var a in i) i[a] = void 0;
                        var u = {};
                        for (var a in r) if (!(a in n || a in i)) {
                            var c = t[a];
                            r[a] !== c && (u[a] = c)
                        }
                        return {
                            added: n,
                            removed: i,
                            changed: u
                        }
                    }
                    function $(t, e, r) {
                        return {
                            index: t,
                            removed: e,
                            addedCount: r
                        }
                    }
                    function I() {}
                    function T(t, e, r, n, i, o) {
                        return be.calcSplices(t, e, r, n, i, o)
                    }
                    function M(t, e, r, n) {
                        return r > e || t > n ? -1 : e == r || n == t ? 0 : r > t ? n > e ? e - r : n - r : e > n ? n - t : e - t
                    }
                    function N(t, e, r, n) {
                        for (var i = $(e, r, n), o = !1, s = 0, a = 0; a < t.length; a++) {
                            var u = t[a];
                            if (u.index += s, !o) {
                                var c = M(i.index, i.index + i.removed.length, u.index, u.index + u.addedCount);
                                if (c >= 0) {
                                    t.splice(a, 1), a--, s -= u.addedCount - u.removed.length, i.addedCount += u.addedCount - c;
                                    var l = i.removed.length + u.removed.length - c;
                                    if (i.addedCount || l) {
                                        var r = u.removed;
                                        if (i.index < u.index) {
                                            var f = i.removed.slice(0, u.index - i.index);
                                            Array.prototype.push.apply(f, r), r = f
                                        }
                                        if (i.index + i.removed.length > u.index + u.addedCount) {
                                            var h = i.removed.slice(u.index + u.addedCount - i.index);
                                            Array.prototype.push.apply(r, h)
                                        }
                                        i.removed = r, u.index < i.index && (i.index = u.index)
                                    } else o = !0
                                } else if (i.index < u.index) {
                                    o = !0, t.splice(a, 0, i), a++;
                                    var p = i.addedCount - i.removed.length;
                                    u.index += p, s += p
                                }
                            }
                        }
                        o || t.push(i)
                    }
                    function F(t, e) {
                        for (var r = [], o = 0; o < e.length; o++) {
                            var s = e[o];
                            switch (s.type) {
                            case "splice":
                                N(r, s.index, s.removed.slice(), s.addedCount);
                                break;
                            case "add":
                            case "update":
                            case "delete":
                                if (!n(s.name)) continue;
                                var a = i(s.name);
                                if (0 > a) continue;
                                N(r, a, [s.oldValue], 1);
                                break;
                            default:
                                console.error("Unexpected record type: " + JSON.stringify(s))
                            }
                        }
                        return r
                    }
                    function L(t, e) {
                        var r = [];
                        return F(t, e).forEach(function (e) {
                            return 1 == e.addedCount && 1 == e.removed.length ? void(e.removed[0] !== t[e.index] && r.push(e)) : void(r = r.concat(T(t, e.index, e.index + e.addedCount, e.removed, 0, e.removed.length)))
                        }), r
                    }
                    var V = t.testingExposeCycleCount,
                        B = e(),
                        D = r(),
                        G = t.Number.isNaN ||
                        function (e) {
                            return "number" == typeof e && t.isNaN(e)
                        },
                        H = "__proto__" in {} ?
                        function (t) {
                            return t
                        } : function (t) {
                            var e = t.__proto__;
                            if (!e) return t;
                            var r = Object.create(e);
                            return Object.getOwnPropertyNames(t).forEach(function (e) {
                                Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e))
                            }), r
                        },
                        U = "[$_a-zA-Z]",
                        z = "[$_a-zA-Z0-9]",
                        q = new RegExp("^" + U + "+" + z + "*$"),
                        Q = {
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
                        X = {},
                        K = {};
                    f.get = h, f.prototype = H({
                        __proto__: [],
                        valid: !0,
                        toString: function () {
                            for (var t = "", e = 0; e < this.length; e++) {
                                var r = this[e];
                                t += l(r) ? e ? "." + r : r : p(r)
                            }
                            return t
                        },
                        getValueFrom: function (t) {
                            for (var e = 0; e < this.length; e++) {
                                if (null == t) return;
                                t = t[this[e]]
                            }
                            return t
                        },
                        iterateObjects: function (t, e) {
                            for (var r = 0; r < this.length; r++) {
                                if (r && (t = t[this[r - 1]]), !o(t)) return;
                                e(t, this[0])
                            }
                        },
                        compiledGetValueFromFn: function () {
                            var t = "",
                                e = "obj";
                            t += "if (obj != null";
                            for (var r, n = 0; n < this.length - 1; n++) r = this[n], e += l(r) ? "." + r : p(r), t += " &&\n     " + e + " != null";
                            t += ")\n";
                            var r = this[n];
                            return e += l(r) ? "." + r : p(r), t += "  return " + e + ";\nelse\n  return undefined;", new Function("obj", t)
                        },
                        setValueFrom: function (t, e) {
                            if (!this.length) return !1;
                            for (var r = 0; r < this.length - 1; r++) {
                                if (!o(t)) return !1;
                                t = t[this[r]]
                            }
                            return o(t) ? (t[this[r]] = e, !0) : !1
                        }
                    });
                    var J = new f("", X);
                    J.valid = !1, J.getValueFrom = J.setValueFrom = function () {};
                    var Z, Y = 1e3,
                        te = [],
                        ee = B ?
                        function () {
                            var t = {
                                pingPong: !0
                            },
                                e = !1;
                            return Object.observe(t, function () {
                                b(), e = !1
                            }), function (r) {
                                te.push(r), e || (e = !0, t.pingPong = !t.pingPong)
                            }
                        }() : function () {
                            return function (t) {
                                te.push(t)
                            }
                        }(),
                        re = [],
                        ne = [],
                        ie = 0,
                        oe = 1,
                        se = 2,
                        ae = 3,
                        ue = 1;
                    O.prototype = {
                        open: function (t, e) {
                            if (this.state_ != ie) throw Error("Observer has already been opened.");
                            return S(this), this.callback_ = t, this.target_ = e, this.connect_(), this.state_ = oe, this.value_
                        },
                        close: function () {
                            this.state_ == oe && (E(this), this.disconnect_(), this.value_ = void 0, this.callback_ = void 0, this.target_ = void 0, this.state_ = se)
                        },
                        deliver: function () {
                            this.state_ == oe && d(this)
                        },
                        report_: function (t) {
                            try {
                                this.callback_.apply(this.target_, t)
                            } catch (e) {
                                O._errorThrownDuringCallback = !0, console.error("Exception caught during observer callback: " + (e.stack || e))
                            }
                        },
                        discardChanges: function () {
                            return this.check_(void 0, !0), this.value_
                        }
                    };
                    var ce, le = !B;
                    O._allObserversCount = 0, le && (ce = []);
                    var fe = !1;
                    t.Platform = t.Platform || {}, t.Platform.performMicrotaskCheckpoint = function () {
                        if (!fe && le) {
                            fe = !0;
                            var e, r, n = 0;
                            do {
                                n++, r = ce, ce = [], e = !1;
                                for (var i = 0; i < r.length; i++) {
                                    var o = r[i];
                                    o.state_ == oe && (o.check_() && (e = !0), ce.push(o))
                                }
                                b() && (e = !0)
                            } while (Y > n && e);
                            V && (t.dirtyCheckCycleCount = n), fe = !1
                        }
                    }, le && (t.Platform.clearObservers = function () {
                        ce = []
                    }), C.prototype = H({
                        __proto__: O.prototype,
                        arrayObserve: !1,
                        connect_: function () {
                            B ? this.directObserver_ = _(this, this.value_, this.arrayObserve) : this.oldObject_ = this.copyObject(this.value_)
                        },
                        copyObject: function (t) {
                            var e = Array.isArray(t) ? [] : {};
                            for (var r in t) e[r] = t[r];
                            return Array.isArray(t) && (e.length = t.length), e
                        },
                        check_: function (t) {
                            var e, r;
                            if (B) {
                                if (!t) return !1;
                                r = {}, e = W(this.value_, t, r)
                            } else r = this.oldObject_, e = g(this.value_, this.oldObject_);
                            return m(e) ? !1 : (B || (this.oldObject_ = this.copyObject(this.value_)), this.report_([e.added || {},
                            e.removed || {},
                            e.changed || {}, function (t) {
                                return r[t]
                            }]), !0)
                        },
                        disconnect_: function () {
                            B ? (this.directObserver_.close(), this.directObserver_ = void 0) : this.oldObject_ = void 0
                        },
                        deliver: function () {
                            this.state_ == oe && (B ? this.directObserver_.deliver(!1) : d(this))
                        },
                        discardChanges: function () {
                            return this.directObserver_ ? this.directObserver_.deliver(!0) : this.oldObject_ = this.copyObject(this.value_), this.value_
                        }
                    }), x.prototype = H({
                        __proto__: C.prototype,
                        arrayObserve: !0,
                        copyObject: function (t) {
                            return t.slice()
                        },
                        check_: function (t) {
                            var e;
                            if (B) {
                                if (!t) return !1;
                                e = L(this.value_, t)
                            } else e = T(this.value_, 0, this.value_.length, this.oldObject_, 0, this.oldObject_.length);
                            return e && e.length ? (B || (this.oldObject_ = this.copyObject(this.value_)), this.report_([e]), !0) : !1
                        }
                    }), x.applySplices = function (t, e, r) {
                        r.forEach(function (r) {
                            for (var n = [r.index, r.removed.length], i = r.index; i < r.index + r.addedCount;) n.push(e[i]), i++;
                            Array.prototype.splice.apply(t, n)
                        })
                    }, R.prototype = H({
                        __proto__: O.prototype,
                        get path() {
                            return this.path_
                        },
                        connect_: function () {
                            B && (this.directObserver_ = j(this, this.object_)), this.check_(void 0, !0)
                        },
                        disconnect_: function () {
                            this.value_ = void 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
                        },
                        iterateObjects_: function (t) {
                            this.path_.iterateObjects(this.object_, t)
                        },
                        check_: function (t, e) {
                            var r = this.value_;
                            return this.value_ = this.path_.getValueFrom(this.object_), e || s(this.value_, r) ? !1 : (this.report_([this.value_, r, this]), !0)
                        },
                        setValue: function (t) {
                            this.path_ && this.path_.setValueFrom(this.object_, t)
                        }
                    });
                    var he = {};
                    P.prototype = H({
                        __proto__: O.prototype,
                        connect_: function () {
                            if (B) {
                                for (var t, e = !1, r = 0; r < this.observed_.length; r += 2) if (t = this.observed_[r], t !== he) {
                                    e = !0;
                                    break
                                }
                                e && (this.directObserver_ = j(this, t))
                            }
                            this.check_(void 0, !this.reportChangesOnOpen_)
                        },
                        disconnect_: function () {
                            for (var t = 0; t < this.observed_.length; t += 2) this.observed_[t] === he && this.observed_[t + 1].close();
                            this.observed_.length = 0, this.value_.length = 0, this.directObserver_ && (this.directObserver_.close(this), this.directObserver_ = void 0)
                        },
                        addPath: function (t, e) {
                            if (this.state_ != ie && this.state_ != ae) throw Error("Cannot add paths once started.");
                            var e = h(e);
                            if (this.observed_.push(t, e), this.reportChangesOnOpen_) {
                                var r = this.observed_.length / 2 - 1;
                                this.value_[r] = e.getValueFrom(t)
                            }
                        },
                        addObserver: function (t) {
                            if (this.state_ != ie && this.state_ != ae) throw Error("Cannot add observers once started.");
                            if (this.observed_.push(he, t), this.reportChangesOnOpen_) {
                                var e = this.observed_.length / 2 - 1;
                                this.value_[e] = t.open(this.deliver, this)
                            }
                        },
                        startReset: function () {
                            if (this.state_ != oe) throw Error("Can only reset while open");
                            this.state_ = ae, this.disconnect_()
                        },
                        finishReset: function () {
                            if (this.state_ != ae) throw Error("Can only finishReset after startReset");
                            return this.state_ = oe, this.connect_(), this.value_
                        },
                        iterateObjects_: function (t) {
                            for (var e, r = 0; r < this.observed_.length; r += 2) e = this.observed_[r], e !== he && this.observed_[r + 1].iterateObjects(e, t)
                        },
                        check_: function (t, e) {
                            for (var r, n = 0; n < this.observed_.length; n += 2) {
                                var i, o = this.observed_[n],
                                    a = this.observed_[n + 1];
                                if (o === he) {
                                    var u = a;
                                    i = this.state_ === ie ? u.open(this.deliver, this) : u.discardChanges()
                                } else i = a.getValueFrom(o);
                                e ? this.value_[n / 2] = i : s(i, this.value_[n / 2]) || (r = r || [], r[n / 2] = this.value_[n / 2], this.value_[n / 2] = i)
                            }
                            return r ? (this.report_([this.value_, r, this.observed_]), !0) : !1
                        }
                    }), A.prototype = {
                        open: function (t, e) {
                            return this.callback_ = t, this.target_ = e, this.value_ = this.getValueFn_(this.observable_.open(this.observedCallback_, this)), this.value_
                        },
                        observedCallback_: function (t) {
                            if (t = this.getValueFn_(t), !s(t, this.value_)) {
                                var e = this.value_;
                                this.value_ = t, this.callback_.call(this.target_, this.value_, e)
                            }
                        },
                        discardChanges: function () {
                            return this.value_ = this.getValueFn_(this.observable_.discardChanges()), this.value_
                        },
                        deliver: function () {
                            return this.observable_.deliver()
                        },
                        setValue: function (t) {
                            return t = this.setValueFn_(t), !this.dontPassThroughSet_ && this.observable_.setValue ? this.observable_.setValue(t) : void 0
                        },
                        close: function () {
                            this.observable_ && this.observable_.close(), this.callback_ = void 0, this.target_ = void 0, this.observable_ = void 0, this.value_ = void 0, this.getValueFn_ = void 0, this.setValueFn_ = void 0
                        }
                    };
                    var pe = {
                        add: !0,
                        update: !0,
                        "delete": !0
                    },
                        de = 0,
                        ve = 1,
                        me = 2,
                        ge = 3;
                    I.prototype = {
                        calcEditDistances: function (t, e, r, n, i, o) {
                            for (var s = o - i + 1, a = r - e + 1, u = new Array(s), c = 0; s > c; c++) u[c] = new Array(a), u[c][0] = c;
                            for (var l = 0; a > l; l++) u[0][l] = l;
                            for (var c = 1; s > c; c++) for (var l = 1; a > l; l++) if (this.equals(t[e + l - 1], n[i + c - 1])) u[c][l] = u[c - 1][l - 1];
                            else {
                                var f = u[c - 1][l] + 1,
                                    h = u[c][l - 1] + 1;
                                u[c][l] = h > f ? f : h
                            }
                            return u
                        },
                        spliceOperationsFromEditDistances: function (t) {
                            for (var e = t.length - 1, r = t[0].length - 1, n = t[e][r], i = []; e > 0 || r > 0;) if (0 != e) if (0 != r) {
                                var o, s = t[e - 1][r - 1],
                                    a = t[e - 1][r],
                                    u = t[e][r - 1];
                                o = u > a ? s > a ? a : s : s > u ? u : s, o == s ? (s == n ? i.push(de) : (i.push(ve), n = s), e--, r--) : o == a ? (i.push(ge), e--, n = a) : (i.push(me), r--, n = u)
                            } else i.push(ge), e--;
                            else i.push(me), r--;
                            return i.reverse(), i
                        },
                        calcSplices: function (t, e, r, n, i, o) {
                            var s = 0,
                                a = 0,
                                u = Math.min(r - e, o - i);
                            if (0 == e && 0 == i && (s = this.sharedPrefix(t, n, u)), r == t.length && o == n.length && (a = this.sharedSuffix(t, n, u - s)), e += s, i += s, r -= a, o -= a, r - e == 0 && o - i == 0) return [];
                            if (e == r) {
                                for (var c = $(e, [], 0); o > i;) c.removed.push(n[i++]);
                                return [c]
                            }
                            if (i == o) return [$(e, [], r - e)];
                            for (var l = this.spliceOperationsFromEditDistances(this.calcEditDistances(t, e, r, n, i, o)), c = void 0, f = [], h = e, p = i, d = 0; d < l.length; d++) switch (l[d]) {
                            case de:
                                c && (f.push(c), c = void 0), h++, p++;
                                break;
                            case ve:
                                c || (c = $(h, [], 0)), c.addedCount++, h++, c.removed.push(n[p]), p++;
                                break;
                            case me:
                                c || (c = $(h, [], 0)), c.addedCount++, h++;
                                break;
                            case ge:
                                c || (c = $(h, [], 0)), c.removed.push(n[p]), p++
                            }
                            return c && f.push(c), f
                        },
                        sharedPrefix: function (t, e, r) {
                            for (var n = 0; r > n; n++) if (!this.equals(t[n], e[n])) return n;
                            return r
                        },
                        sharedSuffix: function (t, e, r) {
                            for (var n = t.length, i = e.length, o = 0; r > o && this.equals(t[--n], e[--i]);) o++;
                            return o
                        },
                        calculateSplices: function (t, e) {
                            return this.calcSplices(t, 0, t.length, e, 0, e.length)
                        },
                        equals: function (t, e) {
                            return t === e
                        }
                    };
                    var be = new I;
                    t.Observer = O, t.Observer.runEOM_ = ee, t.Observer.observerSentinel_ = he, t.Observer.hasObjectObserve = B, t.ArrayObserver = x, t.ArrayObserver.calculateSplices = function (t, e) {
                        return be.calculateSplices(t, e)
                    }, t.ArraySplice = I, t.ObjectObserver = C, t.PathObserver = R, t.CompoundObserver = P, t.Path = f, t.ObserverTransform = A
                }("undefined" != typeof t && t && "undefined" != typeof e && e ? t : this || window)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {}],
        58: [function (t) {
            (function (t, e) {
                !
                function (t) {
                    "use strict";

                    function e(t) {
                        return {
                            configurable: !0,
                            enumerable: !1,
                            value: t,
                            writable: !0
                        }
                    }
                    function r() {
                        return "__$" + Math.floor(1e9 * Math.random()) + "$" + ++B + "$__"
                    }
                    function n() {
                        var t = r();
                        return z[t] = !0, t
                    }
                    function i(t) {
                        return "object" == typeof t && t instanceof a
                    }
                    function o(t) {
                        return i(t) ? "symbol" : typeof t
                    }
                    function s(t) {
                        var e = new a(t);
                        if (!(this instanceof s)) return e;
                        throw new TypeError("Symbol cannot be new'ed")
                    }
                    function a(t) {
                        var e = r();
                        k(this, H, {
                            value: this
                        }), k(this, D, {
                            value: e
                        }), k(this, G, {
                            value: t
                        }), c(this), U[e] = this
                    }
                    function u(t) {
                        var e = t[q];
                        return e && e.self === t ? e : F(t) ? (X.hash.value = K++, X.self.value = t, Q.value = R(null, X), k(t, q, Q), Q.value) : void 0
                    }
                    function c(t) {
                        return u(t), A.apply(this, arguments)
                    }
                    function l(t) {
                        return u(t), M.apply(this, arguments)
                    }
                    function f(t) {
                        return u(t), N.apply(this, arguments)
                    }
                    function h(t) {
                        return i(t) ? t[D] : t
                    }
                    function p(t) {
                        for (var e = [], r = $(t), n = 0; n < r.length; n++) {
                            var i = r[n];
                            U[i] || z[i] || e.push(i)
                        }
                        return e
                    }
                    function d(t, e) {
                        return W(t, h(e))
                    }
                    function v(t) {
                        for (var e = [], r = $(t), n = 0; n < r.length; n++) {
                            var i = U[r[n]];
                            i && e.push(i)
                        }
                        return e
                    }
                    function m(t) {
                        return T.call(this, h(t))
                    }
                    function g(e) {
                        return t.traceur && t.traceur.options[e]
                    }
                    function b(t, e, r) {
                        var n, o;
                        return i(e) && (n = e, e = e[D]), t[e] = r, n && (o = W(t, e)) && k(t, e, {
                            enumerable: !1
                        }), r
                    }
                    function y(t, e, r) {
                        return i(e) && (r.enumerable && (r = R(r, {
                            enumerable: {
                                value: !1
                            }
                        })), e = e[D]), k(t, e, r), t
                    }
                    function _(t) {
                        k(t, "defineProperty", {
                            value: y
                        }), k(t, "getOwnPropertyNames", {
                            value: p
                        }), k(t, "getOwnPropertyDescriptor", {
                            value: d
                        }), k(t.prototype, "hasOwnProperty", {
                            value: m
                        }), k(t, "freeze", {
                            value: c
                        }), k(t, "preventExtensions", {
                            value: l
                        }), k(t, "seal", {
                            value: f
                        }), t.getOwnPropertySymbols = v
                    }
                    function w(t) {
                        for (var e = 1; e < arguments.length; e++) for (var r = $(arguments[e]), n = 0; n < r.length; n++) {
                            var i = r[n];
                            z[i] || !
                            function (e, r) {
                                k(t, r, {
                                    get: function () {
                                        return e[r]
                                    },
                                    enumerable: !0
                                })
                            }(arguments[e], r[n])
                        }
                        return t
                    }
                    function j(t) {
                        return null != t && ("object" == typeof t || "function" == typeof t)
                    }
                    function O(t) {
                        if (null == t) throw x();
                        return C(t)
                    }
                    function S(t) {
                        if (null == t) throw new TypeError("Value cannot be converted to an Object");
                        return t
                    }
                    function E(t) {
                        t.Symbol = s, t.Reflect = t.Reflect || {}, t.Reflect.global = t.Reflect.global || t, _(t.Object)
                    }
                    if (!t.$traceurRuntime) {
                        var C = Object,
                            x = TypeError,
                            R = C.create,
                            P = C.defineProperties,
                            k = C.defineProperty,
                            A = C.freeze,
                            W = C.getOwnPropertyDescriptor,
                            $ = C.getOwnPropertyNames,
                            I = C.keys,
                            T = C.prototype.hasOwnProperty,
                            M = (C.prototype.toString, Object.preventExtensions),
                            N = Object.seal,
                            F = Object.isExtensible,
                            L = {
                                "void": function () {},
                                any: function () {},
                                string: function () {},
                                number: function () {},
                                "boolean": function () {}
                            },
                            V = e,
                            B = 0,
                            D = r(),
                            G = r(),
                            H = r(),
                            U = R(null),
                            z = R(null);
                        k(s.prototype, "constructor", e(s)), k(s.prototype, "toString", V(function () {
                            var t = this[H];
                            if (!g("symbols")) return t[D];
                            if (!t) throw TypeError("Conversion from symbol to string");
                            var e = t[G];
                            return void 0 === e && (e = ""), "Symbol(" + e + ")"
                        })), k(s.prototype, "valueOf", V(function () {
                            var t = this[H];
                            if (!t) throw TypeError("Conversion from symbol to string");
                            return g("symbols") ? t : t[D]
                        })), k(a.prototype, "constructor", e(s)), k(a.prototype, "toString", {
                            value: s.prototype.toString,
                            enumerable: !1
                        }), k(a.prototype, "valueOf", {
                            value: s.prototype.valueOf,
                            enumerable: !1
                        });
                        var q = n(),
                            Q = {
                                value: void 0
                            },
                            X = {
                                hash: {
                                    value: void 0
                                },
                                self: {
                                    value: void 0
                                }
                            },
                            K = 0;
                        s.iterator = s(), c(a.prototype), E(t), t.$traceurRuntime = {
                            createPrivateName: n,
                            exportStar: w,
                            getOwnHashObject: u,
                            privateNames: z,
                            setProperty: b,
                            setupGlobals: E,
                            toObject: O,
                            isObject: j,
                            toProperty: h,
                            type: L,
                            "typeof": o,
                            checkObjectCoercible: S,
                            hasOwnProperty: function (t, e) {
                                return m.call(t, e)
                            },
                            defineProperties: P,
                            defineProperty: k,
                            getOwnPropertyDescriptor: W,
                            getOwnPropertyNames: $,
                            keys: I
                        }
                    }
                }("undefined" != typeof e ? e : this), function () {
                    "use strict";

                    function t() {
                        for (var t, e = [], r = 0, n = 0; n < arguments.length; n++) {
                            var i = $traceurRuntime.checkObjectCoercible(arguments[n]);
                            if ("function" != typeof i[$traceurRuntime.toProperty(Symbol.iterator)]) throw new TypeError("Cannot spread non-iterable object.");
                            for (var o = i[$traceurRuntime.toProperty(Symbol.iterator)](); !(t = o.next()).done;) e[r++] = t.value
                        }
                        return e
                    }
                    $traceurRuntime.spread = t
                }(), function () {
                    "use strict";

                    function t(t, e) {
                        var r = v(t);
                        do {
                            var n = p(r, e);
                            if (n) return n;
                            r = v(r)
                        } while (r);
                        return void 0
                    }
                    function e(t, e, n, i) {
                        return r(t, e, n).apply(t, i)
                    }
                    function r(e, r, n) {
                        var i = t(r, n);
                        return i ? i.get ? i.get.call(e) : i.value : void 0
                    }
                    function n(e, r, n, i) {
                        var o = t(r, n);
                        if (o && o.set) return o.set.call(e, i), i;
                        throw c("super has no setter '" + n + "'.")
                    }
                    function i(t) {
                        for (var e, r = {}, n = d(t), i = 0; i < n.length; i++) {
                            var e = n[i];
                            r[e] = p(t, e)
                        }
                        return r
                    }
                    function o(t, e, r, n) {
                        return h(e, "constructor", {
                            value: t,
                            configurable: !0,
                            enumerable: !1,
                            writable: !0
                        }), arguments.length > 3 ? ("function" == typeof n && (t.__proto__ = n), t.prototype = l(s(n), i(e))) : t.prototype = e, h(t, "prototype", {
                            configurable: !1,
                            writable: !1
                        }), f(t, i(r))
                    }
                    function s(t) {
                        if ("function" == typeof t) {
                            var e = t.prototype;
                            if (u(e) === e || null === e) return t.prototype;
                            throw new c("super prototype must be an Object or null")
                        }
                        if (null === t) return null;
                        throw new c("Super expression must either be null or a function, not " + typeof t + ".")
                    }
                    function a(t, r, n) {
                        null !== v(r) && e(t, r, "constructor", n)
                    }
                    var u = Object,
                        c = TypeError,
                        l = u.create,
                        f = $traceurRuntime.defineProperties,
                        h = $traceurRuntime.defineProperty,
                        p = $traceurRuntime.getOwnPropertyDescriptor,
                        d = $traceurRuntime.getOwnPropertyNames,
                        v = Object.getPrototypeOf;
                    $traceurRuntime.createClass = o, $traceurRuntime.defaultSuperCall = a, $traceurRuntime.superCall = e, $traceurRuntime.superGet = r, $traceurRuntime.superSet = n
                }(), function () {
                    "use strict";

                    function t(t) {
                        return {
                            configurable: !0,
                            enumerable: !1,
                            value: t,
                            writable: !0
                        }
                    }
                    function e(t) {
                        return new Error("Traceur compiler bug: invalid state in state machine: " + t)
                    }
                    function r() {
                        this.state = 0, this.GState = g, this.storedException = void 0, this.finallyFallThrough = void 0, this.sent_ = void 0, this.returnValue = void 0, this.tryStack_ = []
                    }
                    function n(t, e, r, n) {
                        switch (t.GState) {
                        case b:
                            throw new Error('"' + r + '" on executing generator');
                        case _:
                            if ("next" == r) return {
                                value: void 0,
                                done: !0
                            };
                            throw n;
                        case g:
                            if ("throw" === r) throw t.GState = _, n;
                            if (void 0 !== n) throw m("Sent value to newborn generator");
                        case y:
                            t.GState = b, t.action = r, t.sent = n;
                            var i = e(t),
                                o = i === t;
                            return o && (i = t.returnValue), t.GState = o ? _ : y, {
                                value: i,
                                done: o
                            }
                        }
                    }
                    function i() {}
                    function o() {}
                    function s(t, e, n) {
                        var i = l(t, n),
                            o = new r,
                            s = v(e.prototype);
                        return s[O] = o, s[S] = i, s
                    }
                    function a(t) {
                        return t.prototype = v(o.prototype), t.__proto__ = o, t
                    }
                    function u() {
                        r.call(this), this.err = void 0;
                        var t = this;
                        t.result = new Promise(function (e, r) {
                            t.resolve = e, t.reject = r
                        })
                    }
                    function c(t, e) {
                        var r = l(t, e),
                            n = new u;
                        return n.createCallback = function (t) {
                            return function (e) {
                                n.state = t, n.value = e, r(n)
                            }
                        }, n.errback = function (t) {
                            f(n, t), r(n)
                        }, r(n), n.result
                    }
                    function l(t, e) {
                        return function (r) {
                            for (;;) try {
                                return t.call(e, r)
                            } catch (n) {
                                f(r, n)
                            }
                        }
                    }
                    function f(t, e) {
                        t.storedException = e;
                        var r = t.tryStack_[t.tryStack_.length - 1];
                        return r ? (t.state = void 0 !== r.
                        catch ? r.
                        catch : r.
                        finally, void(void 0 !== r.finallyFallThrough && (t.finallyFallThrough = r.finallyFallThrough))) : void t.handleException(e)
                    }
                    var h = $traceurRuntime.createPrivateName,
                        p = $traceurRuntime.defineProperties,
                        d = $traceurRuntime.defineProperty,
                        v = Object.create,
                        m = TypeError,
                        g = 0,
                        b = 1,
                        y = 2,
                        _ = 3,
                        w = -2,
                        j = -3;
                    r.prototype = {
                        pushTry: function (t, e) {
                            if (null !== e) {
                                for (var r = null, n = this.tryStack_.length - 1; n >= 0; n--) if (void 0 !== this.tryStack_[n].
                                catch) {
                                    r = this.tryStack_[n].
                                    catch;
                                    break
                                }
                                null === r && (r = j), this.tryStack_.push({
                                    "finally": e,
                                    finallyFallThrough: r
                                })
                            }
                            null !== t && this.tryStack_.push({
                                "catch": t
                            })
                        },
                        popTry: function () {
                            this.tryStack_.pop()
                        },
                        get sent() {
                            return this.maybeThrow(), this.sent_
                        },
                        set sent(t) {
                            this.sent_ = t
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
                            case j:
                                throw this.storedException;
                            default:
                                throw e(this.state)
                            }
                        },
                        handleException: function (t) {
                            throw this.GState = _, this.state = w, t
                        }
                    };
                    var O = h(),
                        S = h();
                    i.prototype = o, d(o, "constructor", t(i)), o.prototype = {
                        constructor: o,
                        next: function (t) {
                            return n(this[O], this[S], "next", t)
                        },
                        "throw": function (t) {
                            return n(this[O], this[S], "throw", t)
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
                    }), Object.defineProperty(o.prototype, Symbol.iterator, t(function () {
                        return this
                    })), u.prototype = v(r.prototype), u.prototype.end = function () {
                        switch (this.state) {
                        case w:
                            this.resolve(this.returnValue);
                            break;
                        case j:
                            this.reject(this.storedException);
                            break;
                        default:
                            this.reject(e(this.state))
                        }
                    }, u.prototype.handleException = function () {
                        this.state = j
                    }, $traceurRuntime.asyncWrap = c, $traceurRuntime.initGeneratorFunction = a, $traceurRuntime.createGeneratorInstance = s
                }(), function () {
                    function t(t, e, r, n, i, o, s) {
                        var a = [];
                        return t && a.push(t, ":"), r && (a.push("//"), e && a.push(e, "@"), a.push(r), n && a.push(":", n)), i && a.push(i), o && a.push("?", o), s && a.push("#", s), a.join("")
                    }
                    function e(t) {
                        return t.match(a)
                    }
                    function r(t) {
                        if ("/" === t) return "/";
                        for (var e = "/" === t[0] ? "/" : "", r = "/" === t.slice(-1) ? "/" : "", n = t.split("/"), i = [], o = 0, s = 0; s < n.length; s++) {
                            var a = n[s];
                            switch (a) {
                            case "":
                            case ".":
                                break;
                            case "..":
                                i.length ? i.pop() : o++;
                                break;
                            default:
                                i.push(a)
                            }
                        }
                        if (!e) {
                            for (; o-- > 0;) i.unshift("..");
                            0 === i.length && i.push(".")
                        }
                        return e + i.join("/") + r
                    }
                    function n(e) {
                        var n = e[u.PATH] || "";
                        return n = r(n), e[u.PATH] = n, t(e[u.SCHEME], e[u.USER_INFO], e[u.DOMAIN], e[u.PORT], e[u.PATH], e[u.QUERY_DATA], e[u.FRAGMENT])
                    }
                    function i(t) {
                        var r = e(t);
                        return n(r)
                    }
                    function o(t, r) {
                        var i = e(r),
                            o = e(t);
                        if (i[u.SCHEME]) return n(i);
                        i[u.SCHEME] = o[u.SCHEME];
                        for (var s = u.SCHEME; s <= u.PORT; s++) i[s] || (i[s] = o[s]);
                        if ("/" == i[u.PATH][0]) return n(i);
                        var a = o[u.PATH],
                            c = a.lastIndexOf("/");
                        return a = a.slice(0, c + 1) + i[u.PATH], i[u.PATH] = a, n(i)
                    }
                    function s(t) {
                        if (!t) return !1;
                        if ("/" === t[0]) return !0;
                        var r = e(t);
                        return r[u.SCHEME] ? !0 : !1
                    }
                    var a = new RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
                        u = {
                            SCHEME: 1,
                            USER_INFO: 2,
                            DOMAIN: 3,
                            PORT: 4,
                            PATH: 5,
                            QUERY_DATA: 6,
                            FRAGMENT: 7
                        };
                    $traceurRuntime.canonicalizeUrl = i, $traceurRuntime.isAbsolute = s, $traceurRuntime.removeDotSegments = r, $traceurRuntime.resolveUrl = o
                }(), function (t) {
                    "use strict";

                    function e(t) {
                        if (t) {
                            var e = m.normalize(t);
                            return u[e]
                        }
                    }
                    function r(t) {
                        var e = arguments[1],
                            r = Object.create(null);
                        return Object.getOwnPropertyNames(t).forEach(function (n) {
                            var i, o;
                            if (e === v) {
                                var s = Object.getOwnPropertyDescriptor(t, n);
                                s.get && (i = s.get)
                            }
                            i || (o = t[n], i = function () {
                                return o
                            }), Object.defineProperty(r, n, {
                                get: i,
                                enumerable: !0
                            })
                        }), Object.preventExtensions(r), r
                    }
                    var n, i = $traceurRuntime,
                        o = i.canonicalizeUrl,
                        s = i.resolveUrl,
                        a = i.isAbsolute,
                        u = Object.create(null);
                    n = t.location && t.location.href ? s(t.location.href, "./") : "";
                    var c = function (t, e) {
                        this.url = t, this.value_ = e
                    };
                    $traceurRuntime.createClass(c, {}, {});
                    var l = function (t, e) {
                        this.message = this.constructor.name + ": " + this.stripCause(e) + " in " + t, this.stack = e instanceof f || !e.stack ? "" : this.stripStack(e.stack)
                    },
                        f = l;
                    $traceurRuntime.createClass(l, {
                        stripError: function (t) {
                            return t.replace(/.*Error:/, this.constructor.name + ":")
                        },
                        stripCause: function (t) {
                            return t ? t.message ? this.stripError(t.message) : t + "" : ""
                        },
                        loadedBy: function (t) {
                            this.stack += "\n loaded by " + t
                        },
                        stripStack: function (t) {
                            var e = [];
                            return t.split("\n").some(function (t) {
                                return /UncoatedModuleInstantiator/.test(t) ? !0 : void e.push(t)
                            }), e[0] = this.stripError(e[0]), e.join("\n")
                        }
                    }, {}, Error);
                    var h = function (t, e) {
                        $traceurRuntime.superCall(this, p.prototype, "constructor", [t, null]), this.func = e
                    },
                        p = h;
                    $traceurRuntime.createClass(h, {
                        getUncoatedModule: function () {
                            if (this.value_) return this.value_;
                            try {
                                return this.value_ = this.func.call(t)
                            } catch (e) {
                                if (e instanceof l) throw e.loadedBy(this.url), e;
                                throw new l(this.url, e)
                            }
                        }
                    }, {}, c);
                    var d = Object.create(null),
                        v = {},
                        m = {
                            normalize: function (t, e) {
                                if ("string" != typeof t) throw new TypeError("module name must be a string, not " + typeof t);
                                if (a(t)) return o(t);
                                if (/[^\.]\/\.\.\//.test(t)) throw new Error("module name embeds /../: " + t);
                                return "." === t[0] && e ? s(e, t) : o(t)
                            },
                            get: function (t) {
                                var n = e(t);
                                if (!n) return void 0;
                                var i = d[n.url];
                                return i ? i : (i = r(n.getUncoatedModule(), v), d[n.url] = i)
                            },
                            set: function (t, e) {
                                t = String(t), u[t] = new h(t, function () {
                                    return e
                                }), d[t] = e
                            },
                            get baseURL() {
                                return n
                            },
                            set baseURL(t) {
                                n = String(t)
                            },
                            registerModule: function (t, e) {
                                var r = m.normalize(t);
                                if (u[r]) throw new Error("duplicate module named " + r);
                                u[r] = new h(r, e)
                            },
                            bundleStore: Object.create(null),
                            register: function (t, e, r) {
                                e && (e.length || r.length) ? this.bundleStore[t] = {
                                    deps: e,
                                    execute: function () {
                                        var t = arguments,
                                            n = {};
                                        e.forEach(function (e, r) {
                                            return n[e] = t[r]
                                        });
                                        var i = r.call(this, n);
                                        return i.execute.call(this), i.exports
                                    }
                                } : this.registerModule(t, r)
                            },
                            getAnonymousModule: function (e) {
                                return new r(e.call(t), v)
                            },
                            getForTesting: function (t) {
                                var e = this;
                                return this.testingPrefix_ || Object.keys(d).some(function (t) {
                                    var r = /(traceur@[^\/]*\/)/.exec(t);
                                    return r ? (e.testingPrefix_ = r[1], !0) : void 0
                                }), this.get(this.testingPrefix_ + t)
                            }
                        };
                    m.set("@traceur/src/runtime/ModuleStore", new r({
                        ModuleStore: m
                    }));
                    var g = $traceurRuntime.setupGlobals;
                    $traceurRuntime.setupGlobals = function (t) {
                        g(t)
                    }, $traceurRuntime.ModuleStore = m, t.System = {
                        register: m.register.bind(m),
                        get: m.get,
                        set: m.set,
                        normalize: m.normalize
                    }, $traceurRuntime.getModuleImpl = function (t) {
                        var r = e(t);
                        return r && r.getUncoatedModule()
                    }
                }("undefined" != typeof e ? e : this), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/utils", [], function () {
                    "use strict";

                    function t(t) {
                        return t >>> 0
                    }
                    function e(t) {
                        return t && ("object" == typeof t || "function" == typeof t)
                    }
                    function r(t) {
                        return "function" == typeof t
                    }
                    function n(t) {
                        return "number" == typeof t
                    }
                    function i(t) {
                        return t = +t, _(t) ? 0 : 0 !== t && y(t) ? t > 0 ? b(t) : g(t) : t
                    }
                    function o(t) {
                        var e = i(t);
                        return 0 > e ? 0 : j(e, S)
                    }
                    function s(t) {
                        return e(t) ? t[Symbol.iterator] : void 0
                    }
                    function a(t) {
                        return r(t)
                    }
                    function u(t, e) {
                        return {
                            value: t,
                            done: e
                        }
                    }
                    function c(t, e, r) {
                        e in t || Object.defineProperty(t, e, r)
                    }
                    function l(t, e, r) {
                        c(t, e, {
                            value: r,
                            configurable: !0,
                            enumerable: !1,
                            writable: !0
                        })
                    }
                    function f(t, e, r) {
                        c(t, e, {
                            value: r,
                            configurable: !1,
                            enumerable: !1,
                            writable: !1
                        })
                    }
                    function h(t, e) {
                        for (var r = 0; r < e.length; r += 2) {
                            var n = e[r],
                                i = e[r + 1];
                            l(t, n, i)
                        }
                    }
                    function p(t, e) {
                        for (var r = 0; r < e.length; r += 2) {
                            var n = e[r],
                                i = e[r + 1];
                            f(t, n, i)
                        }
                    }
                    function d(t, e, r) {
                        r && r.iterator && !t[r.iterator] && (t["@@iterator"] && (e = t["@@iterator"]), Object.defineProperty(t, r.iterator, {
                            value: e,
                            configurable: !0,
                            enumerable: !1,
                            writable: !0
                        }))
                    }
                    function v(t) {
                        E.push(t)
                    }
                    function m(t) {
                        E.forEach(function (e) {
                            return e(t)
                        })
                    }
                    var g = Math.ceil,
                        b = Math.floor,
                        y = isFinite,
                        _ = isNaN,
                        w = Math.pow,
                        j = Math.min,
                        O = $traceurRuntime.toObject,
                        S = w(2, 53) - 1,
                        E = [];
                    return {
                        get toObject() {
                            return O
                        }, get toUint32() {
                            return t
                        }, get isObject() {
                            return e
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
                            return a
                        }, get createIteratorResultObject() {
                            return u
                        }, get maybeDefine() {
                            return c
                        }, get maybeDefineMethod() {
                            return l
                        }, get maybeDefineConst() {
                            return f
                        }, get maybeAddFunctions() {
                            return h
                        }, get maybeAddConsts() {
                            return p
                        }, get maybeAddIterator() {
                            return d
                        }, get registerPolyfill() {
                            return v
                        }, get polyfillAll() {
                            return m
                        }
                    }
                }), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Map", [], function () {
                    "use strict";

                    function t(t, e) {
                        if (i(e)) {
                            var r = a(e);
                            return r && t.objectIndex_[r.hash]
                        }
                        return "string" == typeof e ? t.stringIndex_[e] : t.primitiveIndex_[e]
                    }
                    function e(t) {
                        t.entries_ = [], t.objectIndex_ = Object.create(null), t.stringIndex_ = Object.create(null), t.primitiveIndex_ = Object.create(null), t.deletedCount_ = 0
                    }
                    function r(t) {
                        var e = t,
                            r = e.Object,
                            n = e.Symbol;
                        t.Map || (t.Map = l);
                        var i = t.Map.prototype;
                        i.entries && (o(i, i.entries, n), o(r.getPrototypeOf((new t.Map).entries()), function () {
                            return this
                        }, n))
                    }
                    var n = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        i = n.isObject,
                        o = n.maybeAddIterator,
                        s = n.registerPolyfill,
                        a = $traceurRuntime.getOwnHashObject,
                        u = Object.prototype.hasOwnProperty,
                        c = {},
                        l = function () {
                            var t = arguments[0];
                            if (!i(this)) throw new TypeError("Map called on incompatible type");
                            if (u.call(this, "entries_")) throw new TypeError("Map can not be reentrantly initialised");
                            if (e(this), null !== t && void 0 !== t) for (var r, n = t[Symbol.iterator](); !(r = n.next()).done;) {
                                var o = r.value,
                                    s = o[0],
                                    a = o[1];
                                this.set(s, a)
                            }
                        };
                    return $traceurRuntime.createClass(l, {
                        get size() {
                            return this.entries_.length / 2 - this.deletedCount_
                        }, get: function (e) {
                            var r = t(this, e);
                            return void 0 !== r ? this.entries_[r + 1] : void 0
                        },
                        set: function (e, r) {
                            var n = i(e),
                                o = "string" == typeof e,
                                s = t(this, e);
                            if (void 0 !== s) this.entries_[s + 1] = r;
                            else if (s = this.entries_.length, this.entries_[s] = e, this.entries_[s + 1] = r, n) {
                                var u = a(e),
                                    c = u.hash;
                                this.objectIndex_[c] = s
                            } else o ? this.stringIndex_[e] = s : this.primitiveIndex_[e] = s;
                            return this
                        },
                        has: function (e) {
                            return void 0 !== t(this, e)
                        },
                        "delete": function (t) {
                            var e, r, n = i(t),
                                o = "string" == typeof t;
                            if (n) {
                                var s = a(t);
                                s && (e = this.objectIndex_[r = s.hash], delete this.objectIndex_[r])
                            } else o ? (e = this.stringIndex_[t], delete this.stringIndex_[t]) : (e = this.primitiveIndex_[t], delete this.primitiveIndex_[t]);
                            return void 0 !== e ? (this.entries_[e] = c, this.entries_[e + 1] = void 0, this.deletedCount_++, !0) : !1
                        },
                        clear: function () {
                            e(this)
                        },
                        forEach: function (t) {
                            for (var e = arguments[1], r = 0; r < this.entries_.length; r += 2) {
                                var n = this.entries_[r],
                                    i = this.entries_[r + 1];
                                n !== c && t.call(e, i, n, this)
                            }
                        },
                        entries: $traceurRuntime.initGeneratorFunction(function f() {
                            var t, e, r;
                            return $traceurRuntime.createGeneratorInstance(function (n) {
                                for (;;) switch (n.state) {
                                case 0:
                                    t = 0, n.state = 12;
                                    break;
                                case 12:
                                    n.state = t < this.entries_.length ? 8 : -2;
                                    break;
                                case 4:
                                    t += 2, n.state = 12;
                                    break;
                                case 8:
                                    e = this.entries_[t], r = this.entries_[t + 1], n.state = 9;
                                    break;
                                case 9:
                                    n.state = e === c ? 4 : 6;
                                    break;
                                case 6:
                                    return n.state = 2, [e, r];
                                case 2:
                                    n.maybeThrow(), n.state = 4;
                                    break;
                                default:
                                    return n.end()
                                }
                            }, f, this)
                        }),
                        keys: $traceurRuntime.initGeneratorFunction(function h() {
                            var t, e, r;
                            return $traceurRuntime.createGeneratorInstance(function (n) {
                                for (;;) switch (n.state) {
                                case 0:
                                    t = 0, n.state = 12;
                                    break;
                                case 12:
                                    n.state = t < this.entries_.length ? 8 : -2;
                                    break;
                                case 4:
                                    t += 2, n.state = 12;
                                    break;
                                case 8:
                                    e = this.entries_[t], r = this.entries_[t + 1], n.state = 9;
                                    break;
                                case 9:
                                    n.state = e === c ? 4 : 6;
                                    break;
                                case 6:
                                    return n.state = 2, e;
                                case 2:
                                    n.maybeThrow(), n.state = 4;
                                    break;
                                default:
                                    return n.end()
                                }
                            }, h, this)
                        }),
                        values: $traceurRuntime.initGeneratorFunction(function p() {
                            var t, e, r;
                            return $traceurRuntime.createGeneratorInstance(function (n) {
                                for (;;) switch (n.state) {
                                case 0:
                                    t = 0, n.state = 12;
                                    break;
                                case 12:
                                    n.state = t < this.entries_.length ? 8 : -2;
                                    break;
                                case 4:
                                    t += 2, n.state = 12;
                                    break;
                                case 8:
                                    e = this.entries_[t], r = this.entries_[t + 1], n.state = 9;
                                    break;
                                case 9:
                                    n.state = e === c ? 4 : 6;
                                    break;
                                case 6:
                                    return n.state = 2, r;
                                case 2:
                                    n.maybeThrow(), n.state = 4;
                                    break;
                                default:
                                    return n.end()
                                }
                            }, p, this)
                        })
                    }, {}), Object.defineProperty(l.prototype, Symbol.iterator, {
                        configurable: !0,
                        writable: !0,
                        value: l.prototype.entries
                    }), s(r), {
                        get Map() {
                            return l
                        }, get polyfillMap() {
                            return r
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function () {
                    "use strict";

                    function t(t) {
                        t.map_ = new s
                    }
                    function e(t) {
                        var e = t,
                            r = e.Object,
                            n = e.Symbol;
                        t.Set || (t.Set = u);
                        var o = t.Set.prototype;
                        o.values && (i(o, o.values, n), i(r.getPrototypeOf((new t.Set).values()), function () {
                            return this
                        }, n))
                    }
                    var r = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        n = r.isObject,
                        i = r.maybeAddIterator,
                        o = r.registerPolyfill,
                        s = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map,
                        a = ($traceurRuntime.getOwnHashObject, Object.prototype.hasOwnProperty),
                        u = function () {
                            var e = arguments[0];
                            if (!n(this)) throw new TypeError("Set called on incompatible type");
                            if (a.call(this, "map_")) throw new TypeError("Set can not be reentrantly initialised");
                            if (t(this), null !== e && void 0 !== e) for (var r, i = e[Symbol.iterator](); !(r = i.next()).done;) {
                                var o = r.value;
                                this.add(o)
                            }
                        };
                    return $traceurRuntime.createClass(u, {
                        get size() {
                            return this.map_.size
                        }, has: function (t) {
                            return this.map_.has(t)
                        },
                        add: function (t) {
                            return this.map_.set(t, t), this
                        },
                        "delete": function (t) {
                            return this.map_.delete(t)
                        },
                        clear: function () {
                            return this.map_.clear()
                        },
                        forEach: function (t) {
                            var e = arguments[1],
                                r = this;
                            return this.map_.forEach(function (n, i) {
                                t.call(e, i, i, r)
                            })
                        },
                        values: $traceurRuntime.initGeneratorFunction(function c() {
                            var t, e;
                            return $traceurRuntime.createGeneratorInstance(function (r) {
                                for (;;) switch (r.state) {
                                case 0:
                                    t = this.map_.keys()[Symbol.iterator](), r.sent = void 0, r.action = "next", r.state = 12;
                                    break;
                                case 12:
                                    e = t[r.action](r.sentIgnoreThrow), r.state = 9;
                                    break;
                                case 9:
                                    r.state = e.done ? 3 : 2;
                                    break;
                                case 3:
                                    r.sent = e.value, r.state = -2;
                                    break;
                                case 2:
                                    return r.state = 12, e.value;
                                default:
                                    return r.end()
                                }
                            }, c, this)
                        }),
                        entries: $traceurRuntime.initGeneratorFunction(function l() {
                            var t, e;
                            return $traceurRuntime.createGeneratorInstance(function (r) {
                                for (;;) switch (r.state) {
                                case 0:
                                    t = this.map_.entries()[Symbol.iterator](), r.sent = void 0, r.action = "next", r.state = 12;
                                    break;
                                case 12:
                                    e = t[r.action](r.sentIgnoreThrow), r.state = 9;
                                    break;
                                case 9:
                                    r.state = e.done ? 3 : 2;
                                    break;
                                case 3:
                                    r.sent = e.value, r.state = -2;
                                    break;
                                case 2:
                                    return r.state = 12, e.value;
                                default:
                                    return r.end()
                                }
                            }, l, this)
                        })
                    }, {}), Object.defineProperty(u.prototype, Symbol.iterator, {
                        configurable: !0,
                        writable: !0,
                        value: u.prototype.values
                    }), Object.defineProperty(u.prototype, "keys", {
                        configurable: !0,
                        writable: !0,
                        value: u.prototype.values
                    }), o(e), {
                        get Set() {
                            return u
                        }, get polyfillSet() {
                            return e
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set"), System.register("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap", [], function () {
                    "use strict";

                    function e(t, e) {
                        p[u] = t, p[u + 1] = e, u += 2, 2 === u && a()
                    }
                    function r() {
                        return function () {
                            t.nextTick(s)
                        }
                    }
                    function n() {
                        var t = 0,
                            e = new f(s),
                            r = document.createTextNode("");
                        return e.observe(r, {
                            characterData: !0
                        }), function () {
                            r.data = t = ++t % 2
                        }
                    }
                    function i() {
                        var t = new MessageChannel;
                        return t.port1.onmessage = s, function () {
                            t.port2.postMessage(0)
                        }
                    }
                    function o() {
                        return function () {
                            setTimeout(s, 1)
                        }
                    }
                    function s() {
                        for (var t = 0; u > t; t += 2) {
                            var e = p[t],
                                r = p[t + 1];
                            e(r), p[t] = void 0, p[t + 1] = void 0
                        }
                        u = 0
                    }
                    var a, u = 0,
                        c = e,
                        l = "undefined" != typeof window ? window : {},
                        f = l.MutationObserver || l.WebKitMutationObserver,
                        h = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                        p = new Array(1e3);
                    return a = "undefined" != typeof t && "[object process]" === {}.toString.call(t) ? r() : f ? n() : h ? i() : o(), {
                        get
                    default () {
                            return c
                        }
                    }
                }), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function () {
                    "use strict";

                    function t(t) {
                        return t && "object" == typeof t && void 0 !== t.status_
                    }
                    function e(t) {
                        return t
                    }
                    function r(t) {
                        throw t
                    }
                    function n(t) {
                        var n = void 0 !== arguments[1] ? arguments[1] : e,
                            o = void 0 !== arguments[2] ? arguments[2] : r,
                            s = i(t.constructor);
                        switch (t.status_) {
                        case void 0:
                            throw TypeError;
                        case 0:
                            t.onResolve_.push(n, s), t.onReject_.push(o, s);
                            break;
                        case 1:
                            l(t.value_, [n, s]);
                            break;
                        case -1:
                            l(t.value_, [o, s])
                        }
                        return s.promise
                    }
                    function i(t) {
                        if (this === y) {
                            var e = s(new y(g));
                            return {
                                promise: e,
                                resolve: function (t) {
                                    a(e, t)
                                },
                                reject: function (t) {
                                    u(e, t)
                                }
                            }
                        }
                        var r = {};
                        return r.promise = new t(function (t, e) {
                            r.resolve = t, r.reject = e
                        }), r
                    }
                    function o(t, e, r, n, i) {
                        return t.status_ = e, t.value_ = r, t.onResolve_ = n, t.onReject_ = i, t
                    }
                    function s(t) {
                        return o(t, 0, void 0, [], [])
                    }
                    function a(t, e) {
                        c(t, 1, e, t.onResolve_)
                    }
                    function u(t, e) {
                        c(t, -1, e, t.onReject_)
                    }
                    function c(t, e, r, n) {
                        0 === t.status_ && (l(r, n), o(t, e, r))
                    }
                    function l(t, e) {
                        v(function () {
                            for (var r = 0; r < e.length; r += 2) f(t, e[r], e[r + 1])
                        })
                    }
                    function f(e, r, i) {
                        try {
                            var o = r(e);
                            if (o === i.promise) throw new TypeError;
                            t(o) ? n(o, i.resolve, i.reject) : i.resolve(o)
                        } catch (s) {
                            try {
                                i.reject(s)
                            } catch (s) {}
                        }
                    }
                    function h(t) {
                        return t && ("object" == typeof t || "function" == typeof t)
                    }
                    function p(e, r) {
                        if (!t(r) && h(r)) {
                            var n;
                            try {
                                n = r.then
                            } catch (o) {
                                var s = _.call(e, o);
                                return r[w] = s, s
                            }
                            if ("function" == typeof n) {
                                var a = r[w];
                                if (a) return a;
                                var u = i(e);
                                r[w] = u.promise;
                                try {
                                    n.call(r, u.resolve, u.reject)
                                } catch (o) {
                                    u.reject(o)
                                }
                                return u.promise
                            }
                        }
                        return r
                    }
                    function d(t) {
                        t.Promise || (t.Promise = b)
                    }
                    var v = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").
                default,
                        m = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill,
                        g = {},
                        b = function (t) {
                            if (t !== g) {
                                if ("function" != typeof t) throw new TypeError;
                                var e = s(this);
                                try {
                                    t(function (t) {
                                        a(e, t)
                                    }, function (t) {
                                        u(e, t)
                                    })
                                } catch (r) {
                                    u(e, r)
                                }
                            }
                        };
                    $traceurRuntime.createClass(b, {
                        "catch": function (t) {
                            return this.then(void 0, t)
                        },
                        then: function (i, o) {
                            "function" != typeof i && (i = e), "function" != typeof o && (o = r);
                            var s = this,
                                a = this.constructor;
                            return n(this, function (e) {
                                return e = p(a, e), e === s ? o(new TypeError) : t(e) ? e.then(i, o) : i(e)
                            }, o)
                        }
                    }, {
                        resolve: function (e) {
                            return this === y ? t(e) ? e : o(new y(g), 1, e) : new this(function (t) {
                                t(e)
                            })
                        },
                        reject: function (t) {
                            return this === y ? o(new y(g), -1, t) : new this(function (e, r) {
                                r(t)
                            })
                        },
                        all: function (t) {
                            var e = i(this),
                                r = [];
                            try {
                                var n = t.length;
                                if (0 === n) e.resolve(r);
                                else for (var o = 0; o < t.length; o++) this.resolve(t[o]).then(function (t, i) {
                                    r[t] = i, 0 === --n && e.resolve(r)
                                }.bind(void 0, o), function (t) {
                                    e.reject(t)
                                })
                            } catch (s) {
                                e.reject(s)
                            }
                            return e.promise
                        },
                        race: function (t) {
                            var e = i(this);
                            try {
                                for (var r = 0; r < t.length; r++) this.resolve(t[r]).then(function (t) {
                                    e.resolve(t)
                                }, function (t) {
                                    e.reject(t)
                                })
                            } catch (n) {
                                e.reject(n)
                            }
                            return e.promise
                        }
                    });
                    var y = b,
                        _ = y.reject,
                        w = "@@thenable";
                    return m(d), {
                        get Promise() {
                            return b
                        }, get polyfillPromise() {
                            return d
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function () {
                    "use strict";

                    function t(t) {
                        var e = String(t),
                            r = Object.create(l.prototype);
                        return r[a(u)] = e, r[a(c)] = 0, r
                    }
                    var e, r = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        n = r.createIteratorResultObject,
                        i = r.isObject,
                        o = $traceurRuntime,
                        s = o.hasOwnProperty,
                        a = o.toProperty,
                        u = Symbol("iteratedString"),
                        c = Symbol("stringIteratorNextIndex"),
                        l = function () {};
                    return $traceurRuntime.createClass(l, (e = {}, Object.defineProperty(e, "next", {
                        value: function () {
                            var t = this;
                            if (!i(t) || !s(t, u)) throw new TypeError("this must be a StringIterator object");
                            var e = t[a(u)];
                            if (void 0 === e) return n(void 0, !0);
                            var r = t[a(c)],
                                o = e.length;
                            if (r >= o) return t[a(u)] = void 0, n(void 0, !0);
                            var l, f = e.charCodeAt(r);
                            if (55296 > f || f > 56319 || r + 1 === o) l = String.fromCharCode(f);
                            else {
                                var h = e.charCodeAt(r + 1);
                                l = 56320 > h || h > 57343 ? String.fromCharCode(f) : String.fromCharCode(f) + String.fromCharCode(h)
                            }
                            return t[a(c)] = r + l.length, n(l, !1)
                        },
                        configurable: !0,
                        enumerable: !0,
                        writable: !0
                    }), Object.defineProperty(e, Symbol.iterator, {
                        value: function () {
                            return this
                        },
                        configurable: !0,
                        enumerable: !0,
                        writable: !0
                    }), e), {}), {
                        get createStringIterator() {
                            return t
                        }
                    }
                }), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function () {
                    "use strict";

                    function t(t) {
                        var e = String(this);
                        if (null == this || "[object RegExp]" == d.call(t)) throw TypeError();
                        var r = e.length,
                            n = String(t),
                            i = (n.length, arguments.length > 1 ? arguments[1] : void 0),
                            o = i ? Number(i) : 0;
                        isNaN(o) && (o = 0);
                        var s = Math.min(Math.max(o, 0), r);
                        return v.call(e, n, o) == s
                    }
                    function e(t) {
                        var e = String(this);
                        if (null == this || "[object RegExp]" == d.call(t)) throw TypeError();
                        var r = e.length,
                            n = String(t),
                            i = n.length,
                            o = r;
                        if (arguments.length > 1) {
                            var s = arguments[1];
                            void 0 !== s && (o = s ? Number(s) : 0, isNaN(o) && (o = 0))
                        }
                        var a = Math.min(Math.max(o, 0), r),
                            u = a - i;
                        return 0 > u ? !1 : m.call(e, n, u) == u
                    }
                    function r(t) {
                        if (null == this) throw TypeError();
                        var e = String(this),
                            r = e.length,
                            n = String(t),
                            i = (n.length, arguments.length > 1 ? arguments[1] : void 0),
                            o = i ? Number(i) : 0;
                        isNaN(o) && (o = 0);
                        Math.min(Math.max(o, 0), r);
                        return -1 != v.call(e, n, o)
                    }
                    function n(t) {
                        if (null == this) throw TypeError();
                        var e = String(this),
                            r = t ? Number(t) : 0;
                        if (isNaN(r) && (r = 0), 0 > r || 1 / 0 == r) throw RangeError();
                        if (0 == r) return "";
                        for (var n = ""; r--;) n += e;
                        return n
                    }
                    function i(t) {
                        if (null == this) throw TypeError();
                        var e = String(this),
                            r = e.length,
                            n = t ? Number(t) : 0;
                        if (isNaN(n) && (n = 0), 0 > n || n >= r) return void 0;
                        var i, o = e.charCodeAt(n);
                        return o >= 55296 && 56319 >= o && r > n + 1 && (i = e.charCodeAt(n + 1), i >= 56320 && 57343 >= i) ? 1024 * (o - 55296) + i - 56320 + 65536 : o
                    }
                    function o(t) {
                        var e = t.raw,
                            r = e.length >>> 0;
                        if (0 === r) return "";
                        for (var n = "", i = 0;;) {
                            if (n += e[i], i + 1 === r) return n;
                            n += arguments[++i]
                        }
                    }
                    function s() {
                        var t, e, r = [],
                            n = Math.floor,
                            i = -1,
                            o = arguments.length;
                        if (!o) return "";
                        for (; ++i < o;) {
                            var s = Number(arguments[i]);
                            if (!isFinite(s) || 0 > s || s > 1114111 || n(s) != s) throw RangeError("Invalid code point: " + s);
                            65535 >= s ? r.push(s) : (s -= 65536, t = (s >> 10) + 55296, e = s % 1024 + 56320, r.push(t, e))
                        }
                        return String.fromCharCode.apply(null, r)
                    }
                    function a() {
                        var t = $traceurRuntime.checkObjectCoercible(this),
                            e = String(t);
                        return c(e)
                    }
                    function u(u) {
                        var c = u.String;
                        f(c.prototype, ["codePointAt", i, "contains", r, "endsWith", e, "startsWith", t, "repeat", n]), f(c, ["fromCodePoint", s, "raw", o]), h(c.prototype, a, Symbol)
                    }
                    var c = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator,
                        l = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        f = l.maybeAddFunctions,
                        h = l.maybeAddIterator,
                        p = l.registerPolyfill,
                        d = Object.prototype.toString,
                        v = String.prototype.indexOf,
                        m = String.prototype.lastIndexOf;
                    return p(u), {
                        get startsWith() {
                            return t
                        }, get endsWith() {
                            return e
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
                            return a
                        }, get polyfillString() {
                            return u
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function () {
                    "use strict";

                    function t(t, e) {
                        var r = s(t),
                            n = new h;
                        return n.iteratorObject_ = r, n.arrayIteratorNextIndex_ = 0, n.arrayIterationKind_ = e, n
                    }
                    function e() {
                        return t(this, f)
                    }
                    function r() {
                        return t(this, c)
                    }
                    function n() {
                        return t(this, l)
                    }
                    var i, o = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        s = o.toObject,
                        a = o.toUint32,
                        u = o.createIteratorResultObject,
                        c = 1,
                        l = 2,
                        f = 3,
                        h = function () {};
                    return $traceurRuntime.createClass(h, (i = {}, Object.defineProperty(i, "next", {
                        value: function () {
                            var t = s(this),
                                e = t.iteratorObject_;
                            if (!e) throw new TypeError("Object is not an ArrayIterator");
                            var r = t.arrayIteratorNextIndex_,
                                n = t.arrayIterationKind_,
                                i = a(e.length);
                            return r >= i ? (t.arrayIteratorNextIndex_ = 1 / 0, u(void 0, !0)) : (t.arrayIteratorNextIndex_ = r + 1, n == l ? u(e[r], !1) : n == f ? u([r, e[r]], !1) : u(r, !1))
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
                            return e
                        }, get keys() {
                            return r
                        }, get values() {
                            return n
                        }
                    }
                }), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function () {
                    "use strict";

                    function t(t) {
                        var e, r, n = arguments[1],
                            i = arguments[2],
                            o = this,
                            s = _(t),
                            a = void 0 !== n,
                            u = 0;
                        if (a && !p(n)) throw TypeError();
                        if (h(s)) {
                            e = d(o) ? new o : [];
                            for (var c, l = s[Symbol.iterator](); !(c = l.next()).done;) {
                                var f = c.value;
                                e[u] = a ? n.call(i, f, u) : f, u++
                            }
                            return e.length = u, e
                        }
                        for (r = y(s.length), e = d(o) ? new o(r) : new Array(r); r > u; u++) e[u] = a ? "undefined" == typeof i ? n(s[u], u) : n.call(i, s[u], u) : s[u];
                        return e.length = r, e
                    }
                    function e() {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        for (var r = this, n = t.length, i = d(r) ? new r(n) : new Array(n), o = 0; n > o; o++) i[o] = t[o];
                        return i.length = n, i
                    }
                    function r(t) {
                        var e = void 0 !== arguments[1] ? arguments[1] : 0,
                            r = arguments[2],
                            n = _(this),
                            i = y(n.length),
                            o = b(e),
                            s = void 0 !== r ? b(r) : i;
                        for (o = 0 > o ? Math.max(i + o, 0) : Math.min(o, i), s = 0 > s ? Math.max(i + s, 0) : Math.min(s, i); s > o;) n[o] = t, o++;
                        return n
                    }
                    function n(t) {
                        var e = arguments[1];
                        return o(this, t, e)
                    }
                    function i(t) {
                        var e = arguments[1];
                        return o(this, t, e, !0)
                    }
                    function o(t, e) {
                        var r = arguments[2],
                            n = void 0 !== arguments[3] ? arguments[3] : !1,
                            i = _(t),
                            o = y(i.length);
                        if (!p(e)) throw TypeError();
                        for (var s = 0; o > s; s++) if (s in i) {
                            var a = i[s];
                            if (e.call(r, a, s, i)) return n ? s : a
                        }
                        return n ? -1 : void 0
                    }
                    function s(o) {
                        var s = o,
                            a = s.Array,
                            f = s.Object,
                            h = s.Symbol;
                        v(a.prototype, ["entries", u, "keys", c, "values", l, "fill", r, "find", n, "findIndex", i]), v(a, ["from", t, "of", e]), m(a.prototype, l, h), m(f.getPrototypeOf([].values()), function () {
                            return this
                        }, h)
                    }
                    var a = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"),
                        u = a.entries,
                        c = a.keys,
                        l = a.values,
                        f = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        h = f.checkIterable,
                        p = f.isCallable,
                        d = f.isConstructor,
                        v = f.maybeAddFunctions,
                        m = f.maybeAddIterator,
                        g = f.registerPolyfill,
                        b = f.toInteger,
                        y = f.toLength,
                        _ = f.toObject;
                    return g(s), {
                        get from() {
                            return t
                        }, get of() {
                            return e
                        }, get fill() {
                            return r
                        }, get find() {
                            return n
                        }, get findIndex() {
                            return i
                        }, get polyfillArray() {
                            return s
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function () {
                    "use strict";

                    function t(t, e) {
                        return t === e ? 0 !== t || 1 / t === 1 / e : t !== t && e !== e
                    }
                    function e(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var r, n = arguments[e],
                                i = f(n),
                                o = i.length;
                            for (r = 0; o > r; r++) {
                                var s = i[r];
                                h[s] || (t[s] = n[s])
                            }
                        }
                        return t
                    }
                    function r(t, e) {
                        var r, n, i = l(e),
                            o = i.length;
                        for (r = 0; o > r; r++) {
                            var s = i[r];
                            h[s] || (n = c(e, i[r]), u(t, i[r], n))
                        }
                        return t
                    }
                    function n(n) {
                        var i = n.Object;
                        o(i, ["assign", e, "is", t, "mixin", r])
                    }
                    var i = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        o = i.maybeAddFunctions,
                        s = i.registerPolyfill,
                        a = $traceurRuntime,
                        u = a.defineProperty,
                        c = a.getOwnPropertyDescriptor,
                        l = a.getOwnPropertyNames,
                        f = a.keys,
                        h = a.privateNames;
                    return s(n), {
                        get is() {
                            return t
                        }, get assign() {
                            return e
                        }, get mixin() {
                            return r
                        }, get polyfillObject() {
                            return n
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function () {
                    "use strict";

                    function t(t) {
                        return s(t) && h(t)
                    }
                    function e(e) {
                        return t(e) && l(e) === e
                    }
                    function r(t) {
                        return s(t) && p(t)
                    }
                    function n(e) {
                        if (t(e)) {
                            var r = l(e);
                            if (r === e) return f(r) <= d
                        }
                        return !1
                    }
                    function i(i) {
                        var o = i.Number;
                        a(o, ["MAX_SAFE_INTEGER", d, "MIN_SAFE_INTEGER", v, "EPSILON", m]), u(o, ["isFinite", t, "isInteger", e, "isNaN", r, "isSafeInteger", n])
                    }
                    var o = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
                        s = o.isNumber,
                        a = o.maybeAddConsts,
                        u = o.maybeAddFunctions,
                        c = o.registerPolyfill,
                        l = o.toInteger,
                        f = Math.abs,
                        h = isFinite,
                        p = isNaN,
                        d = Math.pow(2, 53) - 1,
                        v = -Math.pow(2, 53) + 1,
                        m = Math.pow(2, -52);
                    return c(i), {
                        get MAX_SAFE_INTEGER() {
                            return d
                        }, get MIN_SAFE_INTEGER() {
                            return v
                        }, get EPSILON() {
                            return m
                        }, get isFinite() {
                            return t
                        }, get isInteger() {
                            return e
                        }, get isNaN() {
                            return r
                        }, get isSafeInteger() {
                            return n
                        }, get polyfillNumber() {
                            return i
                        }
                    }
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number"), System.register("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills", [], function () {
                    "use strict";
                    var t = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").polyfillAll;
                    t(this);
                    var e = $traceurRuntime.setupGlobals;
                    return $traceurRuntime.setupGlobals = function (r) {
                        e(r), t(r)
                    }, {}
                }), System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills")
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        },
        {
            _process: 55
        }]
    }, {}, [14])(14)
});