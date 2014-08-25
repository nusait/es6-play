!
function e(t, r, n) {
    function a(u, i) {
        if (!r[u]) {
            if (!t[u]) {
                var s = "function" == typeof require && require;
                if (!i && s) return s(u, !0);
                if (o) return o(u, !0);
                var c = new Error("Cannot find module '" + u + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var f = r[u] = {
                exports: {}
            };
            t[u][0].call(f.exports, function (e) {
                var r = t[u][1][e];
                return a(r ? r : e)
            }, f, f.exports, e, t, r, n)
        }
        return r[u].exports
    }
    for (var o = "function" == typeof require && require, u = 0; u < n.length; u++) a(n[u]);
    return a
}({
    1: [function (e, t) {
        function r(e) {
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
                } catch (a) {
                    return r.reject(a)
                }
            }
        }
        t.exports = r
    },
    {}],
    2: [function (e) {
        var t = e("./test.js"),
            r = new t(window);
        r.run(), r.testAsync()
    },
    {
        "./test.js": 3
    }],
    3: [function (e, t) {
        "use strict";

        function r() {
            o("anotherSpeak: age is " + this.age)
        }
        function n() {
            var e = void 0 !== arguments[0] ? arguments[0] : 500;
            return new u(function (t) {
                o("starting to wait " + e), setTimeout(function () {
                    o("just waited " + e + "."), t()
                }, e)
            })
        }
        var a, o, u, i, s = e("crap"),
            c = function (e) {
                i = e, a = i.console, o = a.log.bind(a), u = i.Promise, o("Test being constructed")
            };
        $traceurRuntime.createClass(c, {
            speak: function () {
                void 0 !== arguments[0] ? arguments[0] : "default message";
                o("speak method called");
                var e = function (e) {
                    return e.toUpperCase()
                };
                o("My " + e("age") + " is " + this.age), this.anotherSpeak()
            },
            run: function () {
                this.speak("hey, what up?"), this.restParameters("one", "two", "three"), this.spread(), this.forOf(), this.destructuring(), this.mapObj()
            },
            testAsync: function () {
                var e = s($traceurRuntime.initGeneratorFunction(function t() {
                    var e;
                    return $traceurRuntime.createGeneratorInstance(function (t) {
                        for (;;) switch (t.state) {
                        case 0:
                            return t.state = 2, n(1e3);
                        case 2:
                            e = t.sent, t.state = 4;
                            break;
                        case 4:
                            o("waited in between"), t.state = 10;
                            break;
                        case 10:
                            return t.state = 6, n(2e3);
                        case 6:
                            t.maybeThrow(), t.state = 8;
                            break;
                        case 8:
                            o("finally all done!"), t.state = -2;
                            break;
                        default:
                            return t.end()
                        }
                    }, t, this)
                }));
                e()
            },
            get wait() {
                return n
            },
            mapObj: function () {
                var e, t = new Map;
                t.set(1, "jik"), o(t.has(1)), t.set(2, "nyi"), o(t.get(1)), o(t.size), o("#forOf on map");
                for (var r, n = t[Symbol.iterator](); !(r = n.next()).done;) {
                    {
                        var a = $traceurRuntime.assertObject(r.value),
                            u = a[0],
                            i = a[1];
                        a[2]
                    }
                    o(u + " + " + i)
                }
                o("map#forEach()"), t.forEach(function (e, t, r) {
                    return o(e, t, r)
                }), o("map#values()");
                for (var s, c = t.values()[Symbol.iterator](); !(s = c.next()).done;) e = s.value, o(e);
                o("map#entries()");
                for (var f, l = t.entries()[Symbol.iterator](); !(f = l.next()).done;) e = f.value, o(e);
                t.delete(1), t.forEach(function (e, t, r) {
                    return o(e, t, r)
                }), t.clear(), t.forEach(function (e, t, r) {
                    return o(e, t, r)
                })
            },
            destructuring: function () {
                var e = {
                    age: 18,
                    gender: "female"
                },
                    t = e.age,
                    r = e.gender;
                o(t), o(r);
                var e = [234.234, 643.234],
                    n = e[0],
                    a = e[1];
                o(n), o(a);
                var u = function (e) {
                    var t = $traceurRuntime.assertObject(e),
                        r = t.lat,
                        n = t.latitude;
                    o("destructuring parameters:"), o(r), o(n)
                };
                u({
                    lat: 45,
                    latitude: 25
                })
            },
            forOf: function () {
                o("forOf test:");
                for (var e, t = ["one", "two", "three"], r = t[Symbol.iterator](); !(e = r.next()).done;) {
                    var n = e.value;
                    o(n)
                }
            },
            spread: function () {
                var e = ["shoulder", "knees"],
                    t = $traceurRuntime.spread(["head"], e, ["and", "toes"]);
                o(t.join(" - "))
            },
            restParameters: function (e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                o(e), o(Array.isArray(t)), o("args.length = " + t.length)
            },
            anotherSpeak: function () {
                return r
            },
            get age() {
                return 15
            }
        }, {
            hello: function () {
                o("helllo")
            }
        }), t.exports = c
    },
    {
        crap: 1
    }]
}, {}, [2]);