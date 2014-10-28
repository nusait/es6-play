!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.App = e();
    }
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
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
    }({
        1: [ function(require, module, exports) {
            "use strict";
            var View = require("Wildcat.View.View");
            var helpers = require("Wildcat.Support.helpers");
            var $__2 = helpers, log = $__2.log, error = $__2.error;
            var IntroView = function IntroView() {
                for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                $traceurRuntime.superCall(this, $IntroView.prototype, "constructor", $traceurRuntime.spread(args));
                var app = this.app;
                var events = app.events;
                events.on("reportWasPosted", function(e) {
                    return log(e.type, e);
                });
            };
            var $IntroView = IntroView;
            $traceurRuntime.createClass(IntroView, {
                postReport: function(name, incident) {
                    var app = this.app;
                    var command = app.make("postReportCommand", [ name, incident ]);
                    this.execute(command);
                },
                getBluelights: function() {
                    var app = this.app;
                    var command = app.make("retrieveBluelightsCommand");
                    this.execute(command).then(function(collection) {
                        log("got it from thenable ", collection);
                    }).catch(function(err) {
                        error("got it from catchable", err.message);
                    });
                },
                onBluelightsDelivered: function($__3) {
                    var collection = $__3.value;
                    log("whenBluelightsDelivered");
                },
                onFailRetrieveBluelightsCommand: function(err) {
                    error("onFailRetrieveBluelightsCommand", err);
                }
            }, {}, View);
            module.exports = IntroView;
        }, {
            "Wildcat.Support.helpers": 49,
            "Wildcat.View.View": 52
        } ],
        2: [ function(require, module, exports) {
            "use strict";
            var PostReportCommand = function PostReportCommand(name, incident) {
                this.name = name;
                this.incident = incident;
            };
            $traceurRuntime.createClass(PostReportCommand, {}, {
                getName: function() {
                    return "postReportCommand";
                }
            });
            module.exports = PostReportCommand;
        }, {} ],
        3: [ function(require, module, exports) {
            "use strict";
            var CommandHandler = require("Wildcat.Commander.CommandHandler");
            var helpers = require("Wildcat.Support.helpers");
            var PostReportCommandHandler = function PostReportCommandHandler() {
                $traceurRuntime.defaultSuperCall(this, $PostReportCommandHandler.prototype, arguments);
            };
            var $PostReportCommandHandler = PostReportCommandHandler;
            $traceurRuntime.createClass(PostReportCommandHandler, {
                handle: function(command) {
                    var $this = this;
                    var $__1 = command, name = $__1.name, incident = $__1.incident;
                    var app = $this.app;
                    var Report = app.make("Report");
                    async($traceurRuntime.initGeneratorFunction(function $__3() {
                        var report;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                $ctx.state = 2;
                                return Report.post(name, incident);

                              case 2:
                                report = $ctx.sent;
                                $ctx.state = 4;
                                break;

                              case 4:
                                $this.dispatchEventsFor(report);
                                $ctx.state = -2;
                                break;

                              default:
                                return $ctx.end();
                            }
                        }, $__3, this);
                    }))().catch(terminateError);
                }
            }, {}, CommandHandler);
            var $__1 = helpers, terminateError = $__1.terminateError, async = $__1.async, log = $__1.log;
            module.exports = PostReportCommandHandler;
        }, {
            "Wildcat.Commander.CommandHandler": 23,
            "Wildcat.Support.helpers": 49
        } ],
        4: [ function(require, module, exports) {
            "use strict";
            var helpers = require("Wildcat.Support.helpers");
            var RetrieveBluelightsCommand = function RetrieveBluelightsCommand() {
                var options = arguments[0] !== void 0 ? arguments[0] : {};
                assign(this, options);
            };
            $traceurRuntime.createClass(RetrieveBluelightsCommand, {}, {
                getName: function() {
                    return "app.retrieveBluelightsCommand";
                },
                getShortName: function() {
                    return lastSegment(this.getName());
                }
            });
            var $__1 = helpers, assign = $__1.assign, lastSegment = $__1.lastSegment;
            module.exports = RetrieveBluelightsCommand;
        }, {
            "Wildcat.Support.helpers": 49
        } ],
        5: [ function(require, module, exports) {
            "use strict";
            var CommandHandler = require("Wildcat.Commander.CommandHandler");
            var helpers = require("Wildcat.Support.helpers");
            var RetrieveBluelightsCommandHandler = function RetrieveBluelightsCommandHandler() {
                $traceurRuntime.defaultSuperCall(this, $RetrieveBluelightsCommandHandler.prototype, arguments);
            };
            var $RetrieveBluelightsCommandHandler = RetrieveBluelightsCommandHandler;
            $traceurRuntime.createClass(RetrieveBluelightsCommandHandler, {
                handle: $traceurRuntime.initGeneratorFunction(function $__3(command) {
                    var app, $__2, Bluelight, events, commandName, bluelight, err;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
                            app = this.app;
                            $__2 = app, Bluelight = $__2.Bluelight, events = $__2.events;
                            commandName = command.constructor.getName();
                            $ctx.state = 19;
                            break;

                          case 19:
                            $ctx.pushTry(9, null);
                            $ctx.state = 12;
                            break;

                          case 12:
                            $ctx.state = 2;
                            return Bluelight.get();

                          case 2:
                            bluelight = $ctx.sent;
                            $ctx.state = 4;
                            break;

                          case 4:
                            this.dispatchEventsFor(bluelight);
                            $ctx.state = 8;
                            break;

                          case 8:
                            $ctx.returnValue = bluelight.collection;
                            $ctx.state = -2;
                            break;

                          case 6:
                            $ctx.popTry();
                            $ctx.state = -2;
                            break;

                          case 9:
                            $ctx.popTry();
                            err = $ctx.storedException;
                            $ctx.state = 15;
                            break;

                          case 15:
                            events.emit(commandName, err);
                            throw err;
                            $ctx.state = -2;
                            break;

                          default:
                            return $ctx.end();
                        }
                    }, $__3, this);
                })
            }, {}, CommandHandler);
            var asyncMethods = helpers.asyncMethods;
            asyncMethods(RetrieveBluelightsCommandHandler.prototype, "handle");
            module.exports = RetrieveBluelightsCommandHandler;
        }, {
            "Wildcat.Commander.CommandHandler": 23,
            "Wildcat.Support.helpers": 49
        } ],
        6: [ function(require, module, exports) {
            "use strict";
            var EventGenerator = require("../../../framework/src/Wildcat/Commander/Events/EventGenerator");
            var helpers = require("Wildcat.Support.helpers");
            var Bluelight = function Bluelight(name, incident) {
                this.name = name;
                this.incident = incident;
                EventGenerator.call(this);
            };
            $traceurRuntime.createClass(Bluelight, {}, {
                get: $traceurRuntime.initGeneratorFunction(function $__3() {
                    var args, $__1, app, $__2, bluelightRepository, bluelight, collection, event;
                    var $arguments = arguments;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
                            for (args = [], $__1 = 0; $__1 < $arguments.length; $__1++) args[$__1] = $arguments[$__1];
                            app = this.getApplication();
                            $__2 = app, bluelightRepository = $__2.bluelightRepository, bluelight = $__2.bluelight;
                            $ctx.state = 8;
                            break;

                          case 8:
                            $ctx.state = 2;
                            return bluelightRepository.get();

                          case 2:
                            collection = $ctx.sent;
                            $ctx.state = 4;
                            break;

                          case 4:
                            bluelight.collection = collection;
                            event = app.make("bluelightsDelivered", [ collection ]);
                            $ctx.state = 10;
                            break;

                          case 10:
                            $ctx.returnValue = bluelight.raise(event);
                            $ctx.state = -2;
                            break;

                          default:
                            return $ctx.end();
                        }
                    }, $__3, this);
                }),
                getApplication: function() {
                    return this.app_;
                },
                setApplication: function(app) {
                    this.app_ = app;
                    return this;
                }
            });
            var $__2 = helpers, log = $__2.log, extendProtoOf = $__2.extendProtoOf, wait = $__2.wait, asyncMethods = $__2.asyncMethods;
            extendProtoOf(Bluelight, EventGenerator);
            asyncMethods(Bluelight, "get");
            module.exports = Bluelight;
        }, {
            "../../../framework/src/Wildcat/Commander/Events/EventGenerator": 28,
            "Wildcat.Support.helpers": 49
        } ],
        7: [ function(require, module, exports) {
            "use strict";
            var Collection = require("Wildcat.Support.Collection");
            var helpers = require("../../../framework/src/Wildcat/Support/helpers");
            var BluelightCollection = function BluelightCollection() {
                for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                $traceurRuntime.superCall(this, $BluelightCollection.prototype, "constructor", $traceurRuntime.spread(args));
            };
            var $BluelightCollection = BluelightCollection;
            $traceurRuntime.createClass(BluelightCollection, {}, {
                getApplication: function() {
                    return this.app_;
                },
                setApplication: function(app) {
                    this.app_ = app;
                    return this;
                }
            }, Collection);
            var $__2 = helpers, extendProtoOf = $__2.extendProtoOf, wait = $__2.wait;
            module.exports = BluelightCollection;
        }, {
            "../../../framework/src/Wildcat/Support/helpers": 49,
            "Wildcat.Support.Collection": 47
        } ],
        8: [ function(require, module, exports) {
            "use strict";
            var BluelightsDelivered = function BluelightsDelivered(bluelightCollection) {
                this.value = bluelightCollection;
                this.type = this.getName();
                this.timeStamp = Date.now();
            };
            $traceurRuntime.createClass(BluelightsDelivered, {
                getName: function() {
                    return "app.bluelightsDelivered";
                }
            }, {});
            module.exports = BluelightsDelivered;
        }, {} ],
        9: [ function(require, module, exports) {
            "use strict";
            var ReportWasPosted = function ReportWasPosted(report) {
                this.value = report;
                this.type = this.getName();
                this.timeStamp = Date.now();
            };
            $traceurRuntime.createClass(ReportWasPosted, {
                getName: function() {
                    return "reportWasPosted";
                }
            }, {});
            module.exports = ReportWasPosted;
        }, {} ],
        10: [ function(require, module, exports) {
            "use strict";
            var EventGenerator = require("Wildcat.Commander.Events.EventGenerator");
            var helpers = require("Wildcat.Support.helpers");
            var ValidationError = require("Wildcat.Errors.ValidationError");
            var Report = function Report(name, incident) {
                this.name = name;
                this.incident = incident;
                EventGenerator.call(this);
            };
            $traceurRuntime.createClass(Report, {}, {
                persist: $traceurRuntime.initGeneratorFunction(function $__3(report) {
                    var myName, savedReport;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
                            myName = this.myName();
                            console.log("hey report 1: " + myName);
                            $ctx.state = 12;
                            break;

                          case 12:
                            $ctx.state = 2;
                            return wait();

                          case 2:
                            savedReport = $ctx.sent;
                            $ctx.state = 4;
                            break;

                          case 4:
                            console.log("hey report 2");
                            $ctx.state = 14;
                            break;

                          case 14:
                            $ctx.state = 6;
                            return wait();

                          case 6:
                            $ctx.maybeThrow();
                            $ctx.state = 8;
                            break;

                          case 8:
                            console.log("hey report 3");
                            $ctx.state = 16;
                            break;

                          case 16:
                            $ctx.returnValue = "i am done!";
                            $ctx.state = -2;
                            break;

                          default:
                            return $ctx.end();
                        }
                    }, $__3, this);
                }),
                myName: function() {
                    return "weirdName";
                },
                post: $traceurRuntime.initGeneratorFunction(function $__4() {
                    var args, $__1, app, reportRepository, report, event;
                    var $arguments = arguments;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
                            for (args = [], $__1 = 0; $__1 < $arguments.length; $__1++) args[$__1] = $arguments[$__1];
                            app = this.getApplication();
                            reportRepository = app.reportRepository;
                            report = app.make("report", args);
                            $ctx.state = 8;
                            break;

                          case 8:
                            $ctx.state = 2;
                            return reportRepository.save(report);

                          case 2:
                            report = $ctx.sent;
                            $ctx.state = 4;
                            break;

                          case 4:
                            event = app.make("reportWasPosted", [ report ]);
                            $ctx.state = 10;
                            break;

                          case 10:
                            $ctx.returnValue = report.raise(event);
                            $ctx.state = -2;
                            break;

                          default:
                            return $ctx.end();
                        }
                    }, $__4, this);
                }),
                getApplication: function() {
                    return this.app_;
                },
                setApplication: function(app) {
                    this.app_ = app;
                    return this;
                }
            });
            var $__2 = helpers, log = $__2.log, extendProtoOf = $__2.extendProtoOf, wait = $__2.wait, asyncMethods = $__2.asyncMethods;
            extendProtoOf(Report, EventGenerator);
            asyncMethods(Report, "persist", "post");
            module.exports = Report;
        }, {
            "Wildcat.Commander.Events.EventGenerator": 28,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.helpers": 49
        } ],
        11: [ function(require, module, exports) {
            "use strict";
            var ServiceProvider = require("Wildcat.Support.ServiceProvider");
            var Report = require("App.Entities.Reports.Report");
            var ReportWasPosted = require("App.Entities.Reports.Events.ReportWasPosted");
            var ReportRepository = require("App.Repositories.ReportRepository");
            var Bluelight = require("App.Entities.Bluelights.Bluelight");
            var BluelightCollection = require("App.Entities.Bluelights.BluelightCollection");
            var BluelightRepository = require("App.Repositories.BluelightRepository");
            var BluelightsDelivered = require("App.Entities.Bluelights.Events.BluelightsDelivered");
            var XHRLoader = require("Wildcat.Loaders.XHRLoader");
            var helpers = require("Wildcat.Support.helpers");
            var AppServiceProvider = function AppServiceProvider() {
                $traceurRuntime.defaultSuperCall(this, $AppServiceProvider.prototype, arguments);
            };
            var $AppServiceProvider = AppServiceProvider;
            $traceurRuntime.createClass(AppServiceProvider, {
                boot: function() {},
                register: function() {
                    registerEntities.call(this);
                    registerRepositories.call(this);
                }
            }, {}, ServiceProvider);
            function registerEntities() {
                var app = this.app;
                app.bindShared("Report", function(app) {
                    return Report.setApplication(app);
                });
                app.bind("report", function(app) {
                    for (var args = [], $__1 = 1; $__1 < arguments.length; $__1++) args[$__1 - 1] = arguments[$__1];
                    return new (Function.prototype.bind.apply(app.Report, $traceurRuntime.spread([ null ], args)))();
                });
                app.bind("reportWasPosted", function(app) {
                    for (var args = [], $__2 = 1; $__2 < arguments.length; $__2++) args[$__2 - 1] = arguments[$__2];
                    return new (Function.prototype.bind.apply(ReportWasPosted, $traceurRuntime.spread([ null ], args)))();
                });
                app.bindShared("Bluelight", function(app) {
                    return Bluelight.setApplication(app);
                });
                app.bind("bluelight", function(app) {
                    for (var args = [], $__3 = 1; $__3 < arguments.length; $__3++) args[$__3 - 1] = arguments[$__3];
                    return new (Function.prototype.bind.apply(app.Bluelight, $traceurRuntime.spread([ null ], args)))();
                });
                app.bindShared("BluelightCollection", function(app) {
                    return BluelightCollection.setApplication(app);
                });
                app.bind("bluelightCollection", function(app) {
                    for (var args = [], $__4 = 1; $__4 < arguments.length; $__4++) args[$__4 - 1] = arguments[$__4];
                    if (!args.length) args = [ [] ];
                    return new (Function.prototype.bind.apply(app.BluelightCollection, $traceurRuntime.spread([ null ], args)))();
                });
                app.bind("bluelightsDelivered", function(app) {
                    for (var args = [], $__5 = 1; $__5 < arguments.length; $__5++) args[$__5 - 1] = arguments[$__5];
                    return new (Function.prototype.bind.apply(BluelightsDelivered, $traceurRuntime.spread([ null ], args)))();
                });
            }
            function registerRepositories() {
                var app = this.app;
                app.bindShared("reportRepository", function(app) {
                    return new ReportRepository(app);
                });
                app.bind("xhrLoader", function(app) {
                    return new XHRLoader();
                });
                app.bindShared("bluelightRepository", function(app) {
                    var xhrLoader = app.xhrLoader;
                    return new BluelightRepository(app, xhrLoader);
                });
            }
            var log = helpers.log;
            module.exports = AppServiceProvider;
        }, {
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
        } ],
        12: [ function(require, module, exports) {
            "use strict";
            var helpers = require("../../framework/src/Wildcat/Support/helpers");
            var BluelightRepository = function BluelightRepository(app, loader) {
                this.app = app;
                this.loader = loader;
            };
            $traceurRuntime.createClass(BluelightRepository, {
                get: $traceurRuntime.initGeneratorFunction(function $__4() {
                    var $__1, app, loader, baseUrl, BluelightCollection, url, features, $__5, $__6, $__7, $__8;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
                            $__1 = this, app = $__1.app, loader = $__1.loader, baseUrl = $__1.baseUrl;
                            BluelightCollection = app.BluelightCollection;
                            url = baseUrl + "bluelights";
                            $ctx.state = 12;
                            break;

                          case 12:
                            $__5 = loader.get;
                            $__6 = $__5.call(loader, {
                                url: url,
                                timeout: 1e4
                            });
                            $ctx.state = 6;
                            break;

                          case 6:
                            $ctx.state = 2;
                            return $__6;

                          case 2:
                            $__7 = $ctx.sent;
                            $ctx.state = 4;
                            break;

                          case 4:
                            $__8 = $__7.features;
                            features = $__8;
                            $ctx.state = 8;
                            break;

                          case 8:
                            $ctx.returnValue = new BluelightCollection(features);
                            $ctx.state = -2;
                            break;

                          default:
                            return $ctx.end();
                        }
                    }, $__4, this);
                }),
                get baseUrl() {
                    var config = this.app.config;
                    return config.get("app").apiBaseUrl;
                }
            }, {});
            var $__1 = helpers, asyncMethods = $__1.asyncMethods, log = $__1.log;
            asyncMethods(BluelightRepository.prototype, "get");
            module.exports = BluelightRepository;
        }, {
            "../../framework/src/Wildcat/Support/helpers": 49
        } ],
        13: [ function(require, module, exports) {
            "use strict";
            var helpers = require("Wildcat.Support.helpers");
            var ValidationError = require("Wildcat.Errors.ValidationError");
            var AuthenticationError = require("Wildcat.Errors.AuthenticationError");
            var ReportRepository = function ReportRepository(app) {
                this.app = app;
            };
            $traceurRuntime.createClass(ReportRepository, {
                save: function(report) {
                    log("saving report, please wait…");
                    return wait().then(function() {
                        log("report saved, thank you.");
                        return report;
                    });
                }
            }, {});
            var $__1 = helpers, log = $__1.log, wait = $__1.wait;
            module.exports = ReportRepository;
        }, {
            "Wildcat.Errors.AuthenticationError": 34,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.helpers": 49
        } ],
        14: [ function(require, module, exports) {
            "use strict";
            require("traceur/bin/traceur-runtime");
            var App = require("../framework/src/Wildcat/Foundation/Application");
            module.exports = App;
        }, {
            "../framework/src/Wildcat/Foundation/Application": 41,
            "traceur/bin/traceur-runtime": 58
        } ],
        15: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var AppServiceProvider = require("App.Providers.AppServiceProvider");
                var LogServiceProvider = require("Wildcat.Log.LogServiceProvider");
                var WindowServiceProvider = require("Wildcat.DOM.WindowServiceProvider");
                var ErrorProvider = require("Wildcat.Errors.ErrorServiceProvider");
                var ViewServiceProvider = require("Wildcat.View.ViewServiceProvider");
                var CommanderServiceProvider = require("Wildcat.Commander.CommandServiceProvider");
                function browser() {
                    if (global.navigator) {
                        return global.navigator.userAgent;
                    } else {
                        return "not determined";
                    }
                }
                var configObject = {
                    apiBaseUrl: "https://go.dosa.northwestern.edu/nuhelpapi/api/",
                    debug: false,
                    providers: [ AppServiceProvider, LogServiceProvider, WindowServiceProvider, ErrorProvider, ViewServiceProvider, CommanderServiceProvider ],
                    locale: "en",
                    browser: browser()
                };
                module.exports = configObject;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "App.Providers.AppServiceProvider": 11,
            "Wildcat.Commander.CommandServiceProvider": 24,
            "Wildcat.DOM.WindowServiceProvider": 33,
            "Wildcat.Errors.ErrorServiceProvider": 35,
            "Wildcat.Log.LogServiceProvider": 46,
            "Wildcat.View.ViewServiceProvider": 53
        } ],
        16: [ function(require, module, exports) {
            "use strict";
            var PostReportCommand = require("App.Commands.PostReportCommand");
            var RetrieveBluelightsCommand = require("App.Commands.RetrieveBluelightsCommand");
            module.exports = [ {
                "abstract": "postReportCommand",
                command: PostReportCommand
            }, {
                "abstract": "retrieveBluelightsCommand",
                command: RetrieveBluelightsCommand
            } ];
        }, {
            "App.Commands.PostReportCommand": 2,
            "App.Commands.RetrieveBluelightsCommand": 4
        } ],
        17: [ function(require, module, exports) {
            "use strict";
            module.exports = {
                app: require("./app"),
                "local.app": require("./local/app"),
                "testing.app": require("./testing/app"),
                commands: require("./commands"),
                handlers: require("./handlers"),
                views: require("./views")
            };
        }, {
            "./app": 15,
            "./commands": 16,
            "./handlers": 18,
            "./local/app": 19,
            "./testing/app": 20,
            "./views": 21
        } ],
        18: [ function(require, module, exports) {
            "use strict";
            var PostReportCommandHandler = require("App.Commands.PostReportCommandHandler");
            var RetrieveBluelightsCommandHandler = require("App.Commands.RetrieveBluelightsCommandHandler");
            module.exports = [ {
                "abstract": "postReportCommandHandler",
                handler: PostReportCommandHandler
            }, {
                "abstract": "retrieveBluelightsCommandHandler",
                handler: RetrieveBluelightsCommandHandler
            } ];
        }, {
            "App.Commands.PostReportCommandHandler": 3,
            "App.Commands.RetrieveBluelightsCommandHandler": 5
        } ],
        19: [ function(require, module, exports) {
            "use strict";
            module.exports = {
                apiBaseUrl: "http://nuhelp.api/api/",
                debug: true
            };
        }, {} ],
        20: [ function(require, module, exports) {
            "use strict";
            module.exports = {
                apiBaseUrl: "http://nuhelp.api/api/",
                browser: "console"
            };
        }, {} ],
        21: [ function(require, module, exports) {
            "use strict";
            var IntroView = require("App.Browser.Views.IntroView");
            module.exports = [ {
                "abstract": "introView",
                $constructor: IntroView,
                build: "singleton"
            } ];
        }, {
            "App.Browser.Views.IntroView": 1
        } ],
        22: [ function(require, module, exports) {
            "use strict";
            var CommandBus = function CommandBus(app) {
                this.app = app;
            };
            $traceurRuntime.createClass(CommandBus, {
                execute: function(command) {
                    var commandName = command.constructor.getShortName();
                    var handlerName = commandName + "Handler";
                    var handler = this.app.make(handlerName);
                    return handler.handle(command);
                }
            }, {});
            module.exports = CommandBus;
        }, {} ],
        23: [ function(require, module, exports) {
            "use strict";
            var DispatchableTrait = require("Wildcat.Commander.Events.DispatchableTrait");
            var helpers = require("Wildcat.Support.helpers");
            var CommandHandler = function CommandHandler(app) {
                this.app = app;
            };
            $traceurRuntime.createClass(CommandHandler, {}, {});
            var extendProtoOf = helpers.extendProtoOf;
            extendProtoOf(CommandHandler, DispatchableTrait);
            module.exports = CommandHandler;
        }, {
            "Wildcat.Commander.Events.DispatchableTrait": 26,
            "Wildcat.Support.helpers": 49
        } ],
        24: [ function(require, module, exports) {
            "use strict";
            var log = require("Wildcat.Support.helpers").log;
            var ServiceProvider = require("Wildcat.Support.ServiceProvider");
            var CommandBus = require("Wildcat.Commander.CommandBus");
            var EventDispatcher = require("Wildcat.Commander.Events.EventDispatcher");
            var CommandServiceProvider = function CommandServiceProvider() {
                $traceurRuntime.defaultSuperCall(this, $CommandServiceProvider.prototype, arguments);
            };
            var $CommandServiceProvider = CommandServiceProvider;
            $traceurRuntime.createClass(CommandServiceProvider, {
                register: function() {
                    registerCommandBus.call(this);
                    registerCommands.call(this);
                    registerHandlers.call(this);
                    registerEventDispatcher.call(this);
                }
            }, {}, ServiceProvider);
            function registerCommandBus() {
                this.app.bindShared("commandBus", function(app) {
                    return new CommandBus(app);
                });
            }
            function registerCommands() {
                var app = this.app;
                var commands = app.config.get("commands");
                for (var $__1 = commands[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                    var $__6 = $__2.value, abstract = $__6.abstract, command = $__6.command;
                    {
                        app.bind(abstract, function(app) {
                            for (var args = [], $__3 = 1; $__3 < arguments.length; $__3++) args[$__3 - 1] = arguments[$__3];
                            return new (Function.prototype.bind.apply(command, $traceurRuntime.spread([ null ], args)))();
                        });
                    }
                }
            }
            function registerHandlers() {
                var app = this.app;
                var handlers = app.config.get("handlers");
                for (var $__1 = handlers[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                    var $__6 = $__2.value, abstract = $__6.abstract, handler = $__6.handler;
                    {
                        app.bindShared(abstract, function(app) {
                            for (var args = [], $__3 = 1; $__3 < arguments.length; $__3++) args[$__3 - 1] = arguments[$__3];
                            return new (Function.prototype.bind.apply(handler, $traceurRuntime.spread([ null, app ], args)))();
                        });
                    }
                }
            }
            function registerEventDispatcher() {
                var app = this.app;
                var $__6 = app, events = $__6.events, logger = $__6.logger;
                app.bind("eventDispatcher", function(app) {
                    return new EventDispatcher(events, logger);
                });
            }
            module.exports = CommandServiceProvider;
        }, {
            "Wildcat.Commander.CommandBus": 22,
            "Wildcat.Commander.Events.EventDispatcher": 27,
            "Wildcat.Support.ServiceProvider": 48,
            "Wildcat.Support.helpers": 49
        } ],
        25: [ function(require, module, exports) {
            "use strict";
            var helpers = require("Wildcat.Support.helpers");
            var CommanderTrait = function CommanderTrait() {};
            $traceurRuntime.createClass(CommanderTrait, {
                execute: function(command, input) {
                    var bus = this.getCommandBus();
                    return bus.execute(command);
                },
                getCommandBus: function() {
                    return this.app.make("commandBus");
                }
            }, {});
            var log = helpers.log;
            module.exports = CommanderTrait;
        }, {
            "Wildcat.Support.helpers": 49
        } ],
        26: [ function(require, module, exports) {
            "use strict";
            var DispatchableTrait = function DispatchableTrait() {};
            $traceurRuntime.createClass(DispatchableTrait, {
                dispatchEventsFor: function(entity) {
                    var dispatcher = this.getDispatcher();
                    var events = entity.releaseEvents();
                    dispatcher.dispatch(events);
                },
                getDispatcher: function() {
                    return this.app.eventDispatcher;
                }
            }, {});
            module.exports = DispatchableTrait;
        }, {} ],
        27: [ function(require, module, exports) {
            "use strict";
            var EventDispatcher = function EventDispatcher(events, log) {
                this.events_ = events;
                this.log_ = log;
            };
            $traceurRuntime.createClass(EventDispatcher, {
                dispatch: function(events) {
                    for (var $__1 = events[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                        var event = $__2.value;
                        {
                            var eventName = getEventName.call(this, event);
                            this.events_.emit(eventName, event);
                            this.log_.log(eventName + " was fired.");
                        }
                    }
                }
            }, {});
            function getEventName(event) {
                return event.getName();
            }
            module.exports = EventDispatcher;
        }, {} ],
        28: [ function(require, module, exports) {
            "use strict";
            var EventGenerator = function EventGenerator() {
                this.pendingEvents_ = [];
            };
            $traceurRuntime.createClass(EventGenerator, {
                raise: function(event) {
                    this.pendingEvents_.push(event);
                    return this;
                },
                releaseEvents: function() {
                    var events = this.pendingEvents_;
                    this.pendingEvents_ = [];
                    return events;
                }
            }, {});
            module.exports = EventGenerator;
        }, {} ],
        29: [ function(require, module, exports) {
            "use strict";
            var helpers = require("Wildcat.Support.helpers");
            var EventListener = function EventListener() {};
            $traceurRuntime.createClass(EventListener, {
                handle: function(event) {
                    var eventName = event.getName();
                    var shortName = getShortname(eventName);
                    var targetName = getTargetname(shortName);
                    var isRegistered = isFunction(this[targetName]);
                    if (isRegistered) return this[targetName](event);
                }
            }, {});
            function getTargetname(shortName) {
                shortName = ucfirst(shortName);
                return "on" + shortName;
            }
            function getShortname(eventName) {
                return lastSegment(eventName);
            }
            var $__1 = helpers, isFunction = $__1.isFunction, log = $__1.log, ucfirst = $__1.ucfirst, lastSegment = $__1.lastSegment;
            module.exports = EventListener;
        }, {
            "Wildcat.Support.helpers": 49
        } ],
        30: [ function(require, module, exports) {
            "use strict";
            var state = require("Wildcat.Support.state");
            var ModuleLoader = function ModuleLoader() {
                var configObj = arguments[0] !== void 0 ? arguments[0] : {};
                var _ = state(this, {});
                _.configObj = configObj;
            };
            $traceurRuntime.createClass(ModuleLoader, {
                load: function(environment, group) {
                    var namespace = arguments[2] !== void 0 ? arguments[2] : null;
                    var _ = state(this);
                    var configObj = _.configObj;
                    var items = {};
                    if (this.exists(group)) items = configObj[group];
                    if (configObj[environment + "." + group]) {
                        Object.assign(items, configObj[environment + "." + group]);
                    }
                    return items;
                },
                exists: function(group) {
                    var namespace = arguments[1] !== void 0 ? arguments[1] : null;
                    var _ = state(this);
                    var configObj = _.configObj;
                    if (configObj[group]) return true;
                    return false;
                }
            }, {});
            module.exports = ModuleLoader;
        }, {
            "Wildcat.Support.state": 51
        } ],
        31: [ function(require, module, exports) {
            "use strict";
            var state = require("Wildcat.Support.state");
            var Repository = function Repository(loader, environment) {
                var _ = state(this, {});
                _.loader = loader;
                _.environment = environment;
            };
            $traceurRuntime.createClass(Repository, {
                has: function() {},
                get: function(key, defaultVal) {
                    var _ = state(this);
                    var environment = _.environment;
                    var $__2 = parseKey(key), namespace = $__2[0], group = $__2[1], item = $__2[2];
                    var items = _.loader.load(environment, group, namespace);
                    if (!item) return items;
                    if (items[item] !== undefined) return items[item];
                    return defaultVal;
                },
                set: function() {}
            }, {});
            function parseKey(key) {
                var segments = key.split(".");
                return parseBasicSegments(segments);
            }
            function parseBasicSegments(segments) {
                var group = segments[0];
                if (segments.length === 1) {
                    return [ null, group, null ];
                } else {
                    return [ null, group, segments[1] ];
                }
            }
            module.exports = Repository;
        }, {
            "Wildcat.Support.state": 51
        } ],
        32: [ function(require, module, exports) {
            "use strict";
            var state = require("Wildcat.Support.state");
            var EventEmitter = require("events").EventEmitter;
            var helpers = require("Wildcat.Support.helpers");
            var Container = function Container() {
                EventEmitter.call(this);
                var _ = state(this, {});
                _.bindings = {};
                _.instances = {};
            };
            $traceurRuntime.createClass(Container, {
                make: function(abstract) {
                    var parameters = arguments[1] !== void 0 ? arguments[1] : [];
                    var concrete = this.getConcrete(abstract);
                    var object = concrete.apply(null, $traceurRuntime.spread([ this ], parameters));
                    return object;
                },
                bind: function(abstract) {
                    var concrete = arguments[1] !== void 0 ? arguments[1] : null;
                    var shared = arguments[2] !== void 0 ? arguments[2] : false;
                    var type = "bind";
                    var target = this;
                    state(this).bindings[abstract] = {
                        concrete: concrete,
                        shared: shared
                    };
                    this.makeAccessorProperty(abstract);
                    this.emit("bind." + abstract, noProto({
                        type: type + "." + abstract,
                        target: target,
                        "abstract": abstract,
                        shared: shared
                    }));
                    this.emit("bind", noProto({
                        type: type,
                        target: target,
                        "abstract": abstract,
                        shared: shared
                    }));
                },
                bindShared: function(abstract, concrete) {
                    var $__9, $__10;
                    for (var args = [], $__4 = 2; $__4 < arguments.length; $__4++) args[$__4 - 2] = arguments[$__4];
                    if (isArray(abstract)) {
                        for (var $__2 = abstract[Symbol.iterator](), $__3; !($__3 = $__2.next()).done; ) {
                            var $args = $__3.value;
                            ($__9 = this).bindShared.apply($__9, $traceurRuntime.spread($args));
                        }
                        return;
                    }
                    this.bind(abstract, ($__10 = this).share.apply($__10, $traceurRuntime.spread([ concrete ], args)), true);
                },
                getConcrete: function(abstract) {
                    return state(this).bindings[abstract].concrete;
                },
                isShared: function(abstract) {
                    var _ = state(this);
                    if (_.instances[abstract]) return true;
                    if (_.bindings[abstract]) {
                        return state.bindings[abstract].shared;
                    }
                    return false;
                },
                getBindings: function() {
                    return state(this).bindings;
                },
                getBindingsKeys: function() {
                    return keys(this.getBindings());
                },
                newInstanceOf: function(abstract, instantiable) {
                    for (var args = [], $__5 = 2; $__5 < arguments.length; $__5++) args[$__5 - 2] = arguments[$__5];
                    this.bind(abstract, function(app) {
                        return new (Function.prototype.bind.apply(instantiable, $traceurRuntime.spread([ null ], args)))();
                    }, false);
                },
                singleton: function(abstract, instantiable) {
                    for (var args = [], $__6 = 2; $__6 < arguments.length; $__6++) args[$__6 - 2] = arguments[$__6];
                    this.bindShared(abstract, function(app) {
                        return new (Function.prototype.bind.apply(instantiable, $traceurRuntime.spread([ null ], args)))();
                    });
                },
                share: function(func) {
                    for (var args = [], $__7 = 1; $__7 < arguments.length; $__7++) args[$__7 - 1] = arguments[$__7];
                    var object;
                    return function(container) {
                        if (object === undefined) object = func.apply(null, $traceurRuntime.spread([ container ], args));
                        return object;
                    };
                },
                forgetInstance: function(abstract) {
                    delete state(this).instances[abstract];
                },
                makeAccessorProperty: function(abstract) {
                    var $__0 = this;
                    if (this.abstract) return;
                    Object.defineProperty(this, abstract, {
                        get: function() {
                            return $__0.make(abstract);
                        },
                        configurable: true
                    });
                },
                getState: function() {
                    console.dir(state);
                },
                getItems: function() {
                    return this.getBindingsKeys();
                },
                forEach: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().forEach(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                map: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().map(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                filter: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().filter(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                getIterator: function() {
                    return arrayIterator(this.getItems());
                }
            }, {});
            var $__8 = helpers, keys = $__8.keys, implementIterator = $__8.implementIterator, isUndefined = $__8.isUndefined, isDefined = $__8.isDefined, defined = $__8.defined, arrayIterator = $__8.arrayIterator, extendProtoOf = $__8.extendProtoOf, noProto = $__8.noProto, isArray = $__8.isArray;
            extendProtoOf(Container, EventEmitter);
            implementIterator(Container);
            module.exports = Container;
        }, {
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.state": 51,
            events: 54
        } ],
        33: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var ServiceProvider = require("Wildcat.Support.ServiceProvider");
                var WindowServiceProvider = function WindowServiceProvider() {
                    $traceurRuntime.defaultSuperCall(this, $WindowServiceProvider.prototype, arguments);
                };
                var $WindowServiceProvider = WindowServiceProvider;
                $traceurRuntime.createClass(WindowServiceProvider, {
                    register: function() {
                        var app = this.app;
                        app.bindShared("window", function(app) {
                            return global;
                        });
                    },
                    provides: function() {
                        return [ "window" ];
                    }
                }, {}, ServiceProvider);
                module.exports = WindowServiceProvider;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "Wildcat.Support.ServiceProvider": 48
        } ],
        34: [ function(require, module, exports) {
            "use strict";
            var errorConstructor = require("./errorConstructor");
            var AuthenticationError = errorConstructor("AuthenticationError", "no way! authenticated");
            module.exports = AuthenticationError;
        }, {
            "./errorConstructor": 39
        } ],
        35: [ function(require, module, exports) {
            "use strict";
            var ServiceProvider = require("Wildcat.Support.ServiceProvider");
            var ValidationError = require("Wildcat.Errors.ValidationError");
            var TimeoutError = require("Wildcat.Errors.TimeoutError");
            var AuthenticationError = require("Wildcat.Errors.AuthenticationError");
            var NetworkError = require("Wildcat.Errors.NetworkError");
            var ErrorServiceProvider = function ErrorServiceProvider() {
                $traceurRuntime.defaultSuperCall(this, $ErrorServiceProvider.prototype, arguments);
            };
            var $ErrorServiceProvider = ErrorServiceProvider;
            $traceurRuntime.createClass(ErrorServiceProvider, {
                register: function() {
                    this.app.bindShared([ [ "ValidationError", function() {
                        return ValidationError;
                    } ], [ "AuthenticationError", function() {
                        return AuthenticationError;
                    } ], [ "NetworkError", function() {
                        return NetworkError;
                    } ], [ "TimeoutError", function() {
                        return TimeoutError;
                    } ] ]);
                },
                provides: function() {
                    return [ "ValidationError", "AuthenticationError", "NetworkError", "TimeoutError" ];
                }
            }, {}, ServiceProvider);
            module.exports = ErrorServiceProvider;
        }, {
            "Wildcat.Errors.AuthenticationError": 34,
            "Wildcat.Errors.NetworkError": 36,
            "Wildcat.Errors.TimeoutError": 37,
            "Wildcat.Errors.ValidationError": 38,
            "Wildcat.Support.ServiceProvider": 48
        } ],
        36: [ function(require, module, exports) {
            "use strict";
            var errorConstructor = require("./errorConstructor");
            var NetworkError = errorConstructor("NetworkError", "network problem");
            module.exports = NetworkError;
        }, {
            "./errorConstructor": 39
        } ],
        37: [ function(require, module, exports) {
            "use strict";
            var errorConstructor = require("./errorConstructor");
            var TimeoutError = errorConstructor("TimeoutError", "timeout error happened");
            module.exports = TimeoutError;
        }, {
            "./errorConstructor": 39
        } ],
        38: [ function(require, module, exports) {
            "use strict";
            var errorConstructor = require("./errorConstructor");
            var ValidationError = errorConstructor("ValidationError", "no way! validated");
            module.exports = ValidationError;
        }, {
            "./errorConstructor": 39
        } ],
        39: [ function(require, module, exports) {
            "use strict";
            var $Error = Error;
            var isArray = Array.isArray;
            var $__2 = Object, keys = $__2.keys, defineProperties = $__2.defineProperties;
            function nonEnum(objects) {
                var writable = true;
                var enumerable = false;
                var configurable = true;
                objects = isArray(objects) ? objects : [ objects ];
                return objects.reduce(function(result, object) {
                    var key = keys(object)[0];
                    var value = object[key];
                    result[key] = {
                        value: value,
                        writable: writable,
                        enumerable: enumerable,
                        configurable: configurable
                    };
                    return result;
                }, {});
            }
            function addStackToObject(object, CustomError) {
                var captureStackTrace = $Error.captureStackTrace;
                if (captureStackTrace) {
                    captureStackTrace(object, CustomError);
                } else {
                    object.stack = new $Error().stack || "";
                }
                return object;
            }
            function errorConstructor() {
                var name = arguments[0] !== void 0 ? arguments[0] : "CustomError";
                var message = arguments[1] !== void 0 ? arguments[1] : "";
                var CustomError = function CustomError(message) {
                    if (message !== undefined) {
                        defineProperties(this, nonEnum({
                            message: message
                        }));
                    }
                    addStackToObject(this, $CustomError);
                };
                var $CustomError = CustomError;
                $traceurRuntime.createClass(CustomError, {}, {}, $Error);
                defineProperties(CustomError.prototype, nonEnum([ {
                    name: name
                }, {
                    message: message
                } ]));
                return CustomError;
            }
            module.exports = errorConstructor;
        }, {} ],
        40: [ function(require, module, exports) {
            "use strict";
            var EventEmitter2 = require("eventemitter2").EventEmitter2;
            var isString = require("Wildcat.Support.helpers").isString;
            var Dispatcher = function Dispatcher(options) {
                this.app_ = options.app;
                EventEmitter2.call(this, options);
            };
            $traceurRuntime.createClass(Dispatcher, {
                subscribe: function(subscriber) {
                    subscriber = resolveSubscriber.call(this);
                    subscriber.subscribe(this);
                }
            }, {}, EventEmitter2);
            function resolveSubscriber(subscriber) {
                if (isString(subscriber)) {
                    return this.app_[subscriber];
                }
                return subscriber;
            }
            module.exports = Dispatcher;
        }, {
            "Wildcat.Support.helpers": 49,
            eventemitter2: 56
        } ],
        41: [ function(require, module, exports) {
            "use strict";
            var Container = require("../../Wildcat/Container/Container");
            var Config = require("../../Wildcat/Config/Repository");
            var ModuleLoader = require("../../Wildcat/Config/ModuleLoader");
            var Dispatcher = require("../../Wildcat/Events/Dispatcher");
            var start = require("../../Wildcat/Foundation/start");
            var ProviderRepository = require("../../Wildcat/Foundation/ProviderRepository");
            var CommanderTrait = require("../../Wildcat/Commander/CommanderTrait");
            var helpers = require("../../Wildcat/Support/helpers");
            var config = require("../../../../config/config");
            var value = require("../../Wildcat/Support/helpers").value;
            var state = {};
            var Application = function Application() {
                $traceurRuntime.defaultSuperCall(this, $Application.prototype, arguments);
            };
            var $Application = Application;
            $traceurRuntime.createClass(Application, {
                detectEnvironment: function(env) {
                    return state.env = value(env);
                },
                isLocal: function() {
                    return this.environment("local");
                },
                environment: function() {
                    for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                    if (args.length) {
                        return args.indexOf(state.env) !== -1;
                    } else {
                        return state.env;
                    }
                },
                getConfigLoader: function() {
                    return new ModuleLoader(config);
                },
                registerCoreContainerBindings: function() {
                    var app = this;
                    var configLoader = app.getConfigLoader();
                    var environment = app.environment();
                    var dispatcherOptions = {
                        app: app,
                        newListener: true,
                        wildcard: true
                    };
                    app.bindShared([ [ "config", function(app) {
                        return new Config(configLoader, environment);
                    } ], [ "events", function(app) {
                        return new Dispatcher(dispatcherOptions);
                    } ] ]);
                },
                getProviderRepository: function() {
                    return new ProviderRepository();
                },
                start: function() {
                    start.call(this);
                },
                run: function() {
                    console.log("app running!");
                },
                register: function(provider) {
                    provider.register();
                    return provider;
                }
            }, {}, Container);
            var extendProtoOf = helpers.extendProtoOf;
            extendProtoOf(Application, CommanderTrait);
            module.exports = Application;
        }, {
            "../../../../config/config": 17,
            "../../Wildcat/Commander/CommanderTrait": 25,
            "../../Wildcat/Config/ModuleLoader": 30,
            "../../Wildcat/Config/Repository": 31,
            "../../Wildcat/Container/Container": 32,
            "../../Wildcat/Events/Dispatcher": 40,
            "../../Wildcat/Foundation/ProviderRepository": 42,
            "../../Wildcat/Foundation/start": 43,
            "../../Wildcat/Support/helpers": 49
        } ],
        42: [ function(require, module, exports) {
            "use strict";
            var ProviderRepository = function ProviderRepository() {};
            $traceurRuntime.createClass(ProviderRepository, {
                load: function(app, providers) {
                    for (var $__1 = providers[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                        var provider = $__2.value;
                        {
                            app.register(this.createProvider(app, provider));
                        }
                    }
                },
                createProvider: function(app, provider) {
                    return new provider(app);
                }
            }, {});
            module.exports = ProviderRepository;
        }, {} ],
        43: [ function(require, module, exports) {
            "use strict";
            var Config = require("Wildcat.Config.Repository");
            function start() {
                var app = this;
                var env = app.environment();
                app.bindShared("app", function() {
                    return app;
                });
                app.registerCoreContainerBindings();
                var config = app.config;
                var providers = config.get("app").providers;
                app.getProviderRepository().load(app, providers);
            }
            module.exports = start;
        }, {
            "Wildcat.Config.Repository": 31
        } ],
        44: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var TimeoutError = require("Wildcat.Errors.TimeoutError");
                var NetworkError = require("Wildcat.Errors.NetworkError");
                var helpers = require("Wildcat.Support.helpers");
                var XHRLoader = function XHRLoader(XMLHttpRequest) {
                    this.Xhr_ = XMLHttpRequest || global.XMLHttpRequest;
                };
                $traceurRuntime.createClass(XHRLoader, {
                    send: function(method, $__2) {
                        var $__4, $__5, $__6;
                        var $__3 = $__2, url = $__3.url, timeout = ($__4 = $__3.timeout) === void 0 ? 5e3 : $__4, headers = ($__5 = $__3.headers) === void 0 ? {} : $__5, responseType = ($__6 = $__3.responseType) === void 0 ? "json" : $__6;
                        var xhr = new this.Xhr_();
                        var promise = new Promise(function(resolve, reject) {
                            xhr.open(method, url);
                            if (responseType === "json") {
                                xhr.setRequestHeader("Accept", "application/json");
                            }
                            entries(headers).forEach(function(entry) {
                                var $__7;
                                return ($__7 = xhr).setRequestHeader.apply($__7, $traceurRuntime.spread(entry));
                            });
                            assign(xhr, {
                                resolve: resolve,
                                reject: reject,
                                responseType: responseType,
                                timeout: timeout,
                                onload: onload,
                                ontimeout: ontimeout,
                                onerror: onerror
                            }).send();
                        });
                        promise.cancel = xhr.abort.bind(xhr);
                        return promise;
                    },
                    get: function() {
                        var $__7;
                        for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                        return ($__7 = this).send.apply($__7, $traceurRuntime.spread([ "GET" ], args));
                    }
                }, {});
                function onload($__2) {
                    var xhr = $__2.target;
                    var $__4 = xhr, response = $__4.response, status = $__4.status, statusText = $__4.statusText, resolve = $__4.resolve;
                    if (isString(response) && xhr.responseType === "json") response = JSON.parse(response);
                    resolve(response);
                }
                function ontimeout($__2) {
                    var reject = $__2.target.reject;
                    var timeoutError = new TimeoutError();
                    reject(timeoutError);
                }
                function onerror($__2) {
                    var xhr = $__2.target;
                    var $__4 = xhr, response = $__4.response, status = $__4.status, reject = $__4.reject;
                    var networkError = new NetworkError();
                    reject(networkError);
                }
                var $__2 = helpers, log = $__2.log, error = $__2.error, isString = $__2.isString, assign = $__2.assign, entries = $__2.entries;
                module.exports = XHRLoader;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "Wildcat.Errors.NetworkError": 36,
            "Wildcat.Errors.TimeoutError": 37,
            "Wildcat.Support.helpers": 49
        } ],
        45: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var state = require("Wildcat.Support.state");
                var ConsoleLogger = function ConsoleLogger() {
                    var $window = arguments[0] !== void 0 ? arguments[0] : global;
                    var _ = state(this, {});
                    _.window = $window;
                    _.console = $window.console;
                };
                $traceurRuntime.createClass(ConsoleLogger, {
                    log: function() {
                        var $__4;
                        for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                        ($__4 = state(this).console).log.apply($__4, $traceurRuntime.spread(args));
                    },
                    error: function() {
                        var $__4;
                        for (var args = [], $__2 = 0; $__2 < arguments.length; $__2++) args[$__2] = arguments[$__2];
                        ($__4 = state(this).console).error.apply($__4, $traceurRuntime.spread(args));
                    },
                    dir: function() {
                        var $__4;
                        for (var args = [], $__3 = 0; $__3 < arguments.length; $__3++) args[$__3] = arguments[$__3];
                        ($__4 = state(this).console).dir.apply($__4, $traceurRuntime.spread(args));
                    },
                    get state_() {
                        return state(this);
                    }
                }, {});
                module.exports = ConsoleLogger;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "Wildcat.Support.state": 51
        } ],
        46: [ function(require, module, exports) {
            "use strict";
            var ServiceProvider = require("Wildcat.Support.ServiceProvider");
            var ConsoleLogger = require("Wildcat.Log.ConsoleLogger");
            var LogServiceProvider = function LogServiceProvider() {
                $traceurRuntime.defaultSuperCall(this, $LogServiceProvider.prototype, arguments);
            };
            var $LogServiceProvider = LogServiceProvider;
            $traceurRuntime.createClass(LogServiceProvider, {
                register: function() {
                    this.app.singleton("logger", ConsoleLogger);
                },
                provides: function() {
                    return [ "log" ];
                }
            }, {}, ServiceProvider);
            module.exports = LogServiceProvider;
        }, {
            "Wildcat.Log.ConsoleLogger": 45,
            "Wildcat.Support.ServiceProvider": 48
        } ],
        47: [ function(require, module, exports) {
            "use strict";
            var helpers = require("./helpers");
            var Collection = function Collection(items) {
                if (!isArray(items)) {
                    throw new TypeError("collection object must be created with an array");
                }
                this.items_ = items;
            };
            $traceurRuntime.createClass(Collection, {
                getItems: function() {
                    return this.items_;
                },
                forEach: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().forEach(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                filter: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().filter(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                map: function(cb, context) {
                    var $__0 = this;
                    context = defined(context, this);
                    return this.getItems().map(function(value, key) {
                        return cb.call(context, value, key, $__0);
                    });
                },
                toJson: function() {
                    var items = this.getItems();
                    return JSON.stringify(items);
                },
                get length() {
                    return this.items_.length;
                }
            }, {});
            var $__2 = helpers, isArray = $__2.isArray, defined = $__2.defined;
            module.exports = Collection;
        }, {
            "./helpers": 49
        } ],
        48: [ function(require, module, exports) {
            "use strict";
            var state = require("Wildcat.Support.state");
            var ServiceProvider = function ServiceProvider(app) {
                var _ = state(this, {});
                _.app = app;
            };
            $traceurRuntime.createClass(ServiceProvider, {
                register: function() {},
                get app() {
                    return state(this).app;
                }
            }, {});
            module.exports = ServiceProvider;
        }, {
            "Wildcat.Support.state": 51
        } ],
        49: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var $console = global.console;
                var $setTimeout = global.setTimeout;
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
                    var $__12;
                    for (var args = [], $__6 = 0; $__6 < arguments.length; $__6++) args[$__6] = arguments[$__6];
                    ($__12 = $console).log.apply($__12, $traceurRuntime.spread(args));
                }
                function dir() {
                    var $__12;
                    for (var args = [], $__7 = 0; $__7 < arguments.length; $__7++) args[$__7] = arguments[$__7];
                    ($__12 = $console).dir.apply($__12, $traceurRuntime.spread(args));
                }
                function error() {
                    var $__12;
                    for (var args = [], $__8 = 0; $__8 < arguments.length; $__8++) args[$__8] = arguments[$__8];
                    ($__12 = $console).error.apply($__12, $traceurRuntime.spread(args));
                }
                function warn() {
                    var $__12;
                    for (var args = [], $__9 = 0; $__9 < arguments.length; $__9++) args[$__9] = arguments[$__9];
                    ($__12 = $console).warn.apply($__12, $traceurRuntime.spread(args));
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
                    $setTimeout(function() {
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
                    lastSegment: lastSegment
                };
                module.exports = helpers;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {} ],
        50: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var observeJs = require("observe-js");
                module.exports = {
                    Observer: global.Observer,
                    ArrayObserver: global.ArrayObserver,
                    ArraySplice: global.ArraySplice,
                    ObjectObserver: global.ObjectObserver,
                    PathObserver: global.PathObserver,
                    CompoundObserver: global.CompoundObserver,
                    Path: global.Path,
                    ObserverTransform: global.ObserverTransform,
                    Platform: global.Platform
                };
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "observe-js": 57
        } ],
        51: [ function(require, module, exports) {
            (function(global) {
                "use strict";
                var $__1 = require("Wildcat.Support.helpers"), isUndefined = $__1.isUndefined, log = $__1.log, noProto = $__1.noProto, isString = $__1.isString;
                var observe = require("Wildcat.Support.observe");
                var $__2 = observe, ObjectObserver = $__2.ObjectObserver, Platform = $__2.Platform;
                var MapConstructor = global.WeakMap || global.Map;
                var map = new MapConstructor();
                function state(thisArg, val, cbs) {
                    var quiet = arguments[3] !== void 0 ? arguments[3] : false;
                    if (isUndefined(val)) return map.get(thisArg);
                    if (isString(val)) {
                        setState.call(thisArg, val, cbs, quiet);
                        return thisArg;
                    }
                    var _ = setStateObject.call(thisArg, val);
                    if (cbs) bindObservable.call(thisArg, _, cbs);
                    return _;
                }
                function setState(key, value, quiet) {
                    var _ = state(this);
                    _[key] = value;
                    if (quiet) _.observer_.discardChanges();
                    Platform.performMicrotaskCheckpoint();
                }
                function setStateObject(val) {
                    map.set(this, val);
                    return map.get(this);
                }
                function bindObservable(_, cbs) {
                    _.observer_ = new ObjectObserver(_);
                    _.observer_.open(onObserve.bind(this, {
                        _: _,
                        cbs: cbs
                    }));
                }
                function onObserve($__3, added, removed, changed, getOldValueFn) {
                    var $__4 = $__3, _ = $__4._, cbs = $__4.cbs;
                    var observed = {
                        added: added,
                        removed: removed,
                        changed: changed,
                        _: _,
                        cbs: cbs,
                        getOldValueFn: getOldValueFn
                    };
                    invokeObservables.call(this, observed);
                }
                function invokeObservables(observed) {
                    var $__0 = this;
                    [ "added", "removed", "changed" ].forEach(function(type) {
                        var hasCallback = typeof observed.cbs[type] === "function";
                        var isNotEmpty = Object.keys(observed[type]).length > 0;
                        if (hasCallback && isNotEmpty) invoke.call($__0, observed, type);
                    });
                }
                function invoke(observed, type) {
                    var callback = observed.cbs[type];
                    var names = Object.keys(observed[type]);
                    var payload = names.map(function(name) {
                        return noProto({
                            name: name,
                            type: type,
                            newValue: observed._[name],
                            oldValue: observed.getOldValueFn(name)
                        });
                    });
                    callback.call(this, payload);
                }
                module.exports = state;
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.observe": 50
        } ],
        52: [ function(require, module, exports) {
            "use strict";
            var state = require("Wildcat.Support.state");
            var observe = require("Wildcat.Support.observe");
            var helpers = require("Wildcat.Support.helpers");
            var CommanderTrait = require("Wildcat.Commander.CommanderTrait");
            var EventListener = require("Wildcat.Commander.Events.EventListener");
            var $__3 = observe, PathObserver = $__3.PathObserver, Platform = $__3.Platform;
            var View = function View(app, el) {
                this.app = app;
                var defaultState = {
                    el: null
                };
                state(this, defaultState, {
                    changed: changed,
                    added: added
                });
            };
            $traceurRuntime.createClass(View, {
                setEl: function(element) {
                    var quiet = arguments[1] !== void 0 ? arguments[1] : false;
                    return state(this, "el", element, quiet);
                },
                get el() {
                    return state(this).el;
                },
                set el(value) {
                    this.setEl(value);
                },
                render: function() {}
            }, {}, EventListener);
            function changed(changes) {
                log("onStateChanged");
                for (var $__1 = changes[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                    var change = $__2.value;
                    log(change);
                }
            }
            function added(additions) {
                log("onStateAdded");
                for (var $__1 = additions[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                    var addition = $__2.value;
                    log(addition);
                }
            }
            var $__4 = helpers, log = $__4.log, extendProtoOf = $__4.extendProtoOf;
            extendProtoOf(View, CommanderTrait);
            module.exports = View;
        }, {
            "Wildcat.Commander.CommanderTrait": 25,
            "Wildcat.Commander.Events.EventListener": 29,
            "Wildcat.Support.helpers": 49,
            "Wildcat.Support.observe": 50,
            "Wildcat.Support.state": 51
        } ],
        53: [ function(require, module, exports) {
            "use strict";
            var ServiceProvider = require("Wildcat.Support.ServiceProvider");
            var View = require("Wildcat.View.View");
            var ViewServiceProvider = function ViewServiceProvider() {
                $traceurRuntime.defaultSuperCall(this, $ViewServiceProvider.prototype, arguments);
            };
            var $ViewServiceProvider = ViewServiceProvider;
            $traceurRuntime.createClass(ViewServiceProvider, {
                register: function() {
                    var app = this.app;
                    var views = app.config.get("views");
                    for (var $__1 = views[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                        var $__4 = $__2.value, abstract = $__4.abstract, $constructor = $__4.$constructor, build = $__4.build;
                        {
                            switch (build) {
                              case "singleton":
                                app.bindShared(abstract, function(app) {
                                    return new $constructor(app);
                                });
                                break;
                            }
                        }
                    }
                }
            }, {}, ServiceProvider);
            module.exports = ViewServiceProvider;
        }, {
            "Wildcat.Support.ServiceProvider": 48,
            "Wildcat.View.View": 52
        } ],
        54: [ function(require, module, exports) {
            function EventEmitter() {
                this._events = this._events || {};
                this._maxListeners = this._maxListeners || undefined;
            }
            module.exports = EventEmitter;
            EventEmitter.EventEmitter = EventEmitter;
            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype._maxListeners = undefined;
            EventEmitter.defaultMaxListeners = 10;
            EventEmitter.prototype.setMaxListeners = function(n) {
                if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
                this._maxListeners = n;
                return this;
            };
            EventEmitter.prototype.emit = function(type) {
                var er, handler, len, args, i, listeners;
                if (!this._events) this._events = {};
                if (type === "error") {
                    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                        er = arguments[1];
                        if (er instanceof Error) {
                            throw er;
                        }
                        throw TypeError('Uncaught, unspecified "error" event.');
                    }
                }
                handler = this._events[type];
                if (isUndefined(handler)) return false;
                if (isFunction(handler)) {
                    switch (arguments.length) {
                      case 1:
                        handler.call(this);
                        break;

                      case 2:
                        handler.call(this, arguments[1]);
                        break;

                      case 3:
                        handler.call(this, arguments[1], arguments[2]);
                        break;

                      default:
                        len = arguments.length;
                        args = new Array(len - 1);
                        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
                        handler.apply(this, args);
                    }
                } else if (isObject(handler)) {
                    len = arguments.length;
                    args = new Array(len - 1);
                    for (i = 1; i < len; i++) args[i - 1] = arguments[i];
                    listeners = handler.slice();
                    len = listeners.length;
                    for (i = 0; i < len; i++) listeners[i].apply(this, args);
                }
                return true;
            };
            EventEmitter.prototype.addListener = function(type, listener) {
                var m;
                if (!isFunction(listener)) throw TypeError("listener must be a function");
                if (!this._events) this._events = {};
                if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
                if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [ this._events[type], listener ];
                if (isObject(this._events[type]) && !this._events[type].warned) {
                    var m;
                    if (!isUndefined(this._maxListeners)) {
                        m = this._maxListeners;
                    } else {
                        m = EventEmitter.defaultMaxListeners;
                    }
                    if (m && m > 0 && this._events[type].length > m) {
                        this._events[type].warned = true;
                        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                        if (typeof console.trace === "function") {
                            console.trace();
                        }
                    }
                }
                return this;
            };
            EventEmitter.prototype.on = EventEmitter.prototype.addListener;
            EventEmitter.prototype.once = function(type, listener) {
                if (!isFunction(listener)) throw TypeError("listener must be a function");
                var fired = false;
                function g() {
                    this.removeListener(type, g);
                    if (!fired) {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }
                g.listener = listener;
                this.on(type, g);
                return this;
            };
            EventEmitter.prototype.removeListener = function(type, listener) {
                var list, position, length, i;
                if (!isFunction(listener)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[type]) return this;
                list = this._events[type];
                length = list.length;
                position = -1;
                if (list === listener || isFunction(list.listener) && list.listener === listener) {
                    delete this._events[type];
                    if (this._events.removeListener) this.emit("removeListener", type, listener);
                } else if (isObject(list)) {
                    for (i = length; i-- > 0; ) {
                        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                            position = i;
                            break;
                        }
                    }
                    if (position < 0) return this;
                    if (list.length === 1) {
                        list.length = 0;
                        delete this._events[type];
                    } else {
                        list.splice(position, 1);
                    }
                    if (this._events.removeListener) this.emit("removeListener", type, listener);
                }
                return this;
            };
            EventEmitter.prototype.removeAllListeners = function(type) {
                var key, listeners;
                if (!this._events) return this;
                if (!this._events.removeListener) {
                    if (arguments.length === 0) this._events = {}; else if (this._events[type]) delete this._events[type];
                    return this;
                }
                if (arguments.length === 0) {
                    for (key in this._events) {
                        if (key === "removeListener") continue;
                        this.removeAllListeners(key);
                    }
                    this.removeAllListeners("removeListener");
                    this._events = {};
                    return this;
                }
                listeners = this._events[type];
                if (isFunction(listeners)) {
                    this.removeListener(type, listeners);
                } else {
                    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
                }
                delete this._events[type];
                return this;
            };
            EventEmitter.prototype.listeners = function(type) {
                var ret;
                if (!this._events || !this._events[type]) ret = []; else if (isFunction(this._events[type])) ret = [ this._events[type] ]; else ret = this._events[type].slice();
                return ret;
            };
            EventEmitter.listenerCount = function(emitter, type) {
                var ret;
                if (!emitter._events || !emitter._events[type]) ret = 0; else if (isFunction(emitter._events[type])) ret = 1; else ret = emitter._events[type].length;
                return ret;
            };
            function isFunction(arg) {
                return typeof arg === "function";
            }
            function isNumber(arg) {
                return typeof arg === "number";
            }
            function isObject(arg) {
                return typeof arg === "object" && arg !== null;
            }
            function isUndefined(arg) {
                return arg === void 0;
            }
        }, {} ],
        55: [ function(require, module, exports) {
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
        56: [ function(require, module, exports) {
            !function(undefined) {
                var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
                    return Object.prototype.toString.call(obj) === "[object Array]";
                };
                var defaultMaxListeners = 10;
                function init() {
                    this._events = {};
                    if (this._conf) {
                        configure.call(this, this._conf);
                    }
                }
                function configure(conf) {
                    if (conf) {
                        this._conf = conf;
                        conf.delimiter && (this.delimiter = conf.delimiter);
                        conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
                        conf.wildcard && (this.wildcard = conf.wildcard);
                        conf.newListener && (this.newListener = conf.newListener);
                        if (this.wildcard) {
                            this.listenerTree = {};
                        }
                    }
                }
                function EventEmitter(conf) {
                    this._events = {};
                    this.newListener = false;
                    configure.call(this, conf);
                }
                function searchListenerTree(handlers, type, tree, i) {
                    if (!tree) {
                        return [];
                    }
                    var listeners = [], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached, typeLength = type.length, currentType = type[i], nextType = type[i + 1];
                    if (i === typeLength && tree._listeners) {
                        if (typeof tree._listeners === "function") {
                            handlers && handlers.push(tree._listeners);
                            return [ tree ];
                        } else {
                            for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
                                handlers && handlers.push(tree._listeners[leaf]);
                            }
                            return [ tree ];
                        }
                    }
                    if (currentType === "*" || currentType === "**" || tree[currentType]) {
                        if (currentType === "*") {
                            for (branch in tree) {
                                if (branch !== "_listeners" && tree.hasOwnProperty(branch)) {
                                    listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
                                }
                            }
                            return listeners;
                        } else if (currentType === "**") {
                            endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === "*";
                            if (endReached && tree._listeners) {
                                listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
                            }
                            for (branch in tree) {
                                if (branch !== "_listeners" && tree.hasOwnProperty(branch)) {
                                    if (branch === "*" || branch === "**") {
                                        if (tree[branch]._listeners && !endReached) {
                                            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
                                        }
                                        listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
                                    } else if (branch === nextType) {
                                        listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
                                    } else {
                                        listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
                                    }
                                }
                            }
                            return listeners;
                        }
                        listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
                    }
                    xTree = tree["*"];
                    if (xTree) {
                        searchListenerTree(handlers, type, xTree, i + 1);
                    }
                    xxTree = tree["**"];
                    if (xxTree) {
                        if (i < typeLength) {
                            if (xxTree._listeners) {
                                searchListenerTree(handlers, type, xxTree, typeLength);
                            }
                            for (branch in xxTree) {
                                if (branch !== "_listeners" && xxTree.hasOwnProperty(branch)) {
                                    if (branch === nextType) {
                                        searchListenerTree(handlers, type, xxTree[branch], i + 2);
                                    } else if (branch === currentType) {
                                        searchListenerTree(handlers, type, xxTree[branch], i + 1);
                                    } else {
                                        isolatedBranch = {};
                                        isolatedBranch[branch] = xxTree[branch];
                                        searchListenerTree(handlers, type, {
                                            "**": isolatedBranch
                                        }, i + 1);
                                    }
                                }
                            }
                        } else if (xxTree._listeners) {
                            searchListenerTree(handlers, type, xxTree, typeLength);
                        } else if (xxTree["*"] && xxTree["*"]._listeners) {
                            searchListenerTree(handlers, type, xxTree["*"], typeLength);
                        }
                    }
                    return listeners;
                }
                function growListenerTree(type, listener) {
                    type = typeof type === "string" ? type.split(this.delimiter) : type.slice();
                    for (var i = 0, len = type.length; i + 1 < len; i++) {
                        if (type[i] === "**" && type[i + 1] === "**") {
                            return;
                        }
                    }
                    var tree = this.listenerTree;
                    var name = type.shift();
                    while (name) {
                        if (!tree[name]) {
                            tree[name] = {};
                        }
                        tree = tree[name];
                        if (type.length === 0) {
                            if (!tree._listeners) {
                                tree._listeners = listener;
                            } else if (typeof tree._listeners === "function") {
                                tree._listeners = [ tree._listeners, listener ];
                            } else if (isArray(tree._listeners)) {
                                tree._listeners.push(listener);
                                if (!tree._listeners.warned) {
                                    var m = defaultMaxListeners;
                                    if (typeof this._events.maxListeners !== "undefined") {
                                        m = this._events.maxListeners;
                                    }
                                    if (m > 0 && tree._listeners.length > m) {
                                        tree._listeners.warned = true;
                                        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", tree._listeners.length);
                                        console.trace();
                                    }
                                }
                            }
                            return true;
                        }
                        name = type.shift();
                    }
                    return true;
                }
                EventEmitter.prototype.delimiter = ".";
                EventEmitter.prototype.setMaxListeners = function(n) {
                    this._events || init.call(this);
                    this._events.maxListeners = n;
                    if (!this._conf) this._conf = {};
                    this._conf.maxListeners = n;
                };
                EventEmitter.prototype.event = "";
                EventEmitter.prototype.once = function(event, fn) {
                    this.many(event, 1, fn);
                    return this;
                };
                EventEmitter.prototype.many = function(event, ttl, fn) {
                    var self = this;
                    if (typeof fn !== "function") {
                        throw new Error("many only accepts instances of Function");
                    }
                    function listener() {
                        if (--ttl === 0) {
                            self.off(event, listener);
                        }
                        fn.apply(this, arguments);
                    }
                    listener._origin = fn;
                    this.on(event, listener);
                    return self;
                };
                EventEmitter.prototype.emit = function() {
                    this._events || init.call(this);
                    var type = arguments[0];
                    if (type === "newListener" && !this.newListener) {
                        if (!this._events.newListener) {
                            return false;
                        }
                    }
                    if (this._all) {
                        var l = arguments.length;
                        var args = new Array(l - 1);
                        for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                        for (i = 0, l = this._all.length; i < l; i++) {
                            this.event = type;
                            this._all[i].apply(this, args);
                        }
                    }
                    if (type === "error") {
                        if (!this._all && !this._events.error && !(this.wildcard && this.listenerTree.error)) {
                            if (arguments[1] instanceof Error) {
                                throw arguments[1];
                            } else {
                                throw new Error("Uncaught, unspecified 'error' event.");
                            }
                            return false;
                        }
                    }
                    var handler;
                    if (this.wildcard) {
                        handler = [];
                        var ns = typeof type === "string" ? type.split(this.delimiter) : type.slice();
                        searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
                    } else {
                        handler = this._events[type];
                    }
                    if (typeof handler === "function") {
                        this.event = type;
                        if (arguments.length === 1) {
                            handler.call(this);
                        } else if (arguments.length > 1) switch (arguments.length) {
                          case 2:
                            handler.call(this, arguments[1]);
                            break;

                          case 3:
                            handler.call(this, arguments[1], arguments[2]);
                            break;

                          default:
                            var l = arguments.length;
                            var args = new Array(l - 1);
                            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                            handler.apply(this, args);
                        }
                        return true;
                    } else if (handler) {
                        var l = arguments.length;
                        var args = new Array(l - 1);
                        for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
                        var listeners = handler.slice();
                        for (var i = 0, l = listeners.length; i < l; i++) {
                            this.event = type;
                            listeners[i].apply(this, args);
                        }
                        return listeners.length > 0 || !!this._all;
                    } else {
                        return !!this._all;
                    }
                };
                EventEmitter.prototype.on = function(type, listener) {
                    if (typeof type === "function") {
                        this.onAny(type);
                        return this;
                    }
                    if (typeof listener !== "function") {
                        throw new Error("on only accepts instances of Function");
                    }
                    this._events || init.call(this);
                    this.emit("newListener", type, listener);
                    if (this.wildcard) {
                        growListenerTree.call(this, type, listener);
                        return this;
                    }
                    if (!this._events[type]) {
                        this._events[type] = listener;
                    } else if (typeof this._events[type] === "function") {
                        this._events[type] = [ this._events[type], listener ];
                    } else if (isArray(this._events[type])) {
                        this._events[type].push(listener);
                        if (!this._events[type].warned) {
                            var m = defaultMaxListeners;
                            if (typeof this._events.maxListeners !== "undefined") {
                                m = this._events.maxListeners;
                            }
                            if (m > 0 && this._events[type].length > m) {
                                this._events[type].warned = true;
                                console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                                console.trace();
                            }
                        }
                    }
                    return this;
                };
                EventEmitter.prototype.onAny = function(fn) {
                    if (typeof fn !== "function") {
                        throw new Error("onAny only accepts instances of Function");
                    }
                    if (!this._all) {
                        this._all = [];
                    }
                    this._all.push(fn);
                    return this;
                };
                EventEmitter.prototype.addListener = EventEmitter.prototype.on;
                EventEmitter.prototype.off = function(type, listener) {
                    if (typeof listener !== "function") {
                        throw new Error("removeListener only takes instances of Function");
                    }
                    var handlers, leafs = [];
                    if (this.wildcard) {
                        var ns = typeof type === "string" ? type.split(this.delimiter) : type.slice();
                        leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
                    } else {
                        if (!this._events[type]) return this;
                        handlers = this._events[type];
                        leafs.push({
                            _listeners: handlers
                        });
                    }
                    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
                        var leaf = leafs[iLeaf];
                        handlers = leaf._listeners;
                        if (isArray(handlers)) {
                            var position = -1;
                            for (var i = 0, length = handlers.length; i < length; i++) {
                                if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
                                    position = i;
                                    break;
                                }
                            }
                            if (position < 0) {
                                continue;
                            }
                            if (this.wildcard) {
                                leaf._listeners.splice(position, 1);
                            } else {
                                this._events[type].splice(position, 1);
                            }
                            if (handlers.length === 0) {
                                if (this.wildcard) {
                                    delete leaf._listeners;
                                } else {
                                    delete this._events[type];
                                }
                            }
                            return this;
                        } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
                            if (this.wildcard) {
                                delete leaf._listeners;
                            } else {
                                delete this._events[type];
                            }
                        }
                    }
                    return this;
                };
                EventEmitter.prototype.offAny = function(fn) {
                    var i = 0, l = 0, fns;
                    if (fn && this._all && this._all.length > 0) {
                        fns = this._all;
                        for (i = 0, l = fns.length; i < l; i++) {
                            if (fn === fns[i]) {
                                fns.splice(i, 1);
                                return this;
                            }
                        }
                    } else {
                        this._all = [];
                    }
                    return this;
                };
                EventEmitter.prototype.removeListener = EventEmitter.prototype.off;
                EventEmitter.prototype.removeAllListeners = function(type) {
                    if (arguments.length === 0) {
                        !this._events || init.call(this);
                        return this;
                    }
                    if (this.wildcard) {
                        var ns = typeof type === "string" ? type.split(this.delimiter) : type.slice();
                        var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
                        for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
                            var leaf = leafs[iLeaf];
                            leaf._listeners = null;
                        }
                    } else {
                        if (!this._events[type]) return this;
                        this._events[type] = null;
                    }
                    return this;
                };
                EventEmitter.prototype.listeners = function(type) {
                    if (this.wildcard) {
                        var handlers = [];
                        var ns = typeof type === "string" ? type.split(this.delimiter) : type.slice();
                        searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
                        return handlers;
                    }
                    this._events || init.call(this);
                    if (!this._events[type]) this._events[type] = [];
                    if (!isArray(this._events[type])) {
                        this._events[type] = [ this._events[type] ];
                    }
                    return this._events[type];
                };
                EventEmitter.prototype.listenersAny = function() {
                    if (this._all) {
                        return this._all;
                    } else {
                        return [];
                    }
                };
                if (typeof define === "function" && define.amd) {
                    define(function() {
                        return EventEmitter;
                    });
                } else if (typeof exports === "object") {
                    exports.EventEmitter2 = EventEmitter;
                } else {
                    window.EventEmitter2 = EventEmitter;
                }
            }();
        }, {} ],
        57: [ function(require, module, exports) {
            (function(global) {
                (function(global) {
                    "use strict";
                    var testingExposeCycleCount = global.testingExposeCycleCount;
                    function detectObjectObserve() {
                        if (typeof Object.observe !== "function" || typeof Array.observe !== "function") {
                            return false;
                        }
                        var records = [];
                        function callback(recs) {
                            records = recs;
                        }
                        var test = {};
                        var arr = [];
                        Object.observe(test, callback);
                        Array.observe(arr, callback);
                        test.id = 1;
                        test.id = 2;
                        delete test.id;
                        arr.push(1, 2);
                        arr.length = 0;
                        Object.deliverChangeRecords(callback);
                        if (records.length !== 5) return false;
                        if (records[0].type != "add" || records[1].type != "update" || records[2].type != "delete" || records[3].type != "splice" || records[4].type != "splice") {
                            return false;
                        }
                        Object.unobserve(test, callback);
                        Array.unobserve(arr, callback);
                        return true;
                    }
                    var hasObserve = detectObjectObserve();
                    function detectEval() {
                        if (typeof chrome !== "undefined" && chrome.app && chrome.app.runtime) {
                            return false;
                        }
                        if (typeof navigator != "undefined" && navigator.getDeviceStorage) {
                            return false;
                        }
                        try {
                            var f = new Function("", "return true;");
                            return f();
                        } catch (ex) {
                            return false;
                        }
                    }
                    var hasEval = detectEval();
                    function isIndex(s) {
                        return +s === s >>> 0 && s !== "";
                    }
                    function toNumber(s) {
                        return +s;
                    }
                    function isObject(obj) {
                        return obj === Object(obj);
                    }
                    var numberIsNaN = global.Number.isNaN || function(value) {
                        return typeof value === "number" && global.isNaN(value);
                    };
                    function areSameValue(left, right) {
                        if (left === right) return left !== 0 || 1 / left === 1 / right;
                        if (numberIsNaN(left) && numberIsNaN(right)) return true;
                        return left !== left && right !== right;
                    }
                    var createObject = "__proto__" in {} ? function(obj) {
                        return obj;
                    } : function(obj) {
                        var proto = obj.__proto__;
                        if (!proto) return obj;
                        var newObject = Object.create(proto);
                        Object.getOwnPropertyNames(obj).forEach(function(name) {
                            Object.defineProperty(newObject, name, Object.getOwnPropertyDescriptor(obj, name));
                        });
                        return newObject;
                    };
                    var identStart = "[$_a-zA-Z]";
                    var identPart = "[$_a-zA-Z0-9]";
                    var identRegExp = new RegExp("^" + identStart + "+" + identPart + "*" + "$");
                    function getPathCharType(char) {
                        if (char === undefined) return "eof";
                        var code = char.charCodeAt(0);
                        switch (code) {
                          case 91:
                          case 93:
                          case 46:
                          case 34:
                          case 39:
                          case 48:
                            return char;

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
                            return "ws";
                        }
                        if (97 <= code && code <= 122 || 65 <= code && code <= 90) return "ident";
                        if (49 <= code && code <= 57) return "number";
                        return "else";
                    }
                    var pathStateMachine = {
                        beforePath: {
                            ws: [ "beforePath" ],
                            ident: [ "inIdent", "append" ],
                            "[": [ "beforeElement" ],
                            eof: [ "afterPath" ]
                        },
                        inPath: {
                            ws: [ "inPath" ],
                            ".": [ "beforeIdent" ],
                            "[": [ "beforeElement" ],
                            eof: [ "afterPath" ]
                        },
                        beforeIdent: {
                            ws: [ "beforeIdent" ],
                            ident: [ "inIdent", "append" ]
                        },
                        inIdent: {
                            ident: [ "inIdent", "append" ],
                            "0": [ "inIdent", "append" ],
                            number: [ "inIdent", "append" ],
                            ws: [ "inPath", "push" ],
                            ".": [ "beforeIdent", "push" ],
                            "[": [ "beforeElement", "push" ],
                            eof: [ "afterPath", "push" ]
                        },
                        beforeElement: {
                            ws: [ "beforeElement" ],
                            "0": [ "afterZero", "append" ],
                            number: [ "inIndex", "append" ],
                            "'": [ "inSingleQuote", "append", "" ],
                            '"': [ "inDoubleQuote", "append", "" ]
                        },
                        afterZero: {
                            ws: [ "afterElement", "push" ],
                            "]": [ "inPath", "push" ]
                        },
                        inIndex: {
                            "0": [ "inIndex", "append" ],
                            number: [ "inIndex", "append" ],
                            ws: [ "afterElement" ],
                            "]": [ "inPath", "push" ]
                        },
                        inSingleQuote: {
                            "'": [ "afterElement" ],
                            eof: [ "error" ],
                            "else": [ "inSingleQuote", "append" ]
                        },
                        inDoubleQuote: {
                            '"': [ "afterElement" ],
                            eof: [ "error" ],
                            "else": [ "inDoubleQuote", "append" ]
                        },
                        afterElement: {
                            ws: [ "afterElement" ],
                            "]": [ "inPath", "push" ]
                        }
                    };
                    function noop() {}
                    function parsePath(path) {
                        var keys = [];
                        var index = -1;
                        var c, newChar, key, type, transition, action, typeMap, mode = "beforePath";
                        var actions = {
                            push: function() {
                                if (key === undefined) return;
                                keys.push(key);
                                key = undefined;
                            },
                            append: function() {
                                if (key === undefined) key = newChar; else key += newChar;
                            }
                        };
                        function maybeUnescapeQuote() {
                            if (index >= path.length) return;
                            var nextChar = path[index + 1];
                            if (mode == "inSingleQuote" && nextChar == "'" || mode == "inDoubleQuote" && nextChar == '"') {
                                index++;
                                newChar = nextChar;
                                actions.append();
                                return true;
                            }
                        }
                        while (mode) {
                            index++;
                            c = path[index];
                            if (c == "\\" && maybeUnescapeQuote(mode)) continue;
                            type = getPathCharType(c);
                            typeMap = pathStateMachine[mode];
                            transition = typeMap[type] || typeMap["else"] || "error";
                            if (transition == "error") return;
                            mode = transition[0];
                            action = actions[transition[1]] || noop;
                            newChar = transition[2] === undefined ? c : transition[2];
                            action();
                            if (mode === "afterPath") {
                                return keys;
                            }
                        }
                        return;
                    }
                    function isIdent(s) {
                        return identRegExp.test(s);
                    }
                    var constructorIsPrivate = {};
                    function Path(parts, privateToken) {
                        if (privateToken !== constructorIsPrivate) throw Error("Use Path.get to retrieve path objects");
                        for (var i = 0; i < parts.length; i++) {
                            this.push(String(parts[i]));
                        }
                        if (hasEval && this.length) {
                            this.getValueFrom = this.compiledGetValueFromFn();
                        }
                    }
                    var pathCache = {};
                    function getPath(pathString) {
                        if (pathString instanceof Path) return pathString;
                        if (pathString == null || pathString.length == 0) pathString = "";
                        if (typeof pathString != "string") {
                            if (isIndex(pathString.length)) {
                                return new Path(pathString, constructorIsPrivate);
                            }
                            pathString = String(pathString);
                        }
                        var path = pathCache[pathString];
                        if (path) return path;
                        var parts = parsePath(pathString);
                        if (!parts) return invalidPath;
                        var path = new Path(parts, constructorIsPrivate);
                        pathCache[pathString] = path;
                        return path;
                    }
                    Path.get = getPath;
                    function formatAccessor(key) {
                        if (isIndex(key)) {
                            return "[" + key + "]";
                        } else {
                            return '["' + key.replace(/"/g, '\\"') + '"]';
                        }
                    }
                    Path.prototype = createObject({
                        __proto__: [],
                        valid: true,
                        toString: function() {
                            var pathString = "";
                            for (var i = 0; i < this.length; i++) {
                                var key = this[i];
                                if (isIdent(key)) {
                                    pathString += i ? "." + key : key;
                                } else {
                                    pathString += formatAccessor(key);
                                }
                            }
                            return pathString;
                        },
                        getValueFrom: function(obj, directObserver) {
                            for (var i = 0; i < this.length; i++) {
                                if (obj == null) return;
                                obj = obj[this[i]];
                            }
                            return obj;
                        },
                        iterateObjects: function(obj, observe) {
                            for (var i = 0; i < this.length; i++) {
                                if (i) obj = obj[this[i - 1]];
                                if (!isObject(obj)) return;
                                observe(obj, this[0]);
                            }
                        },
                        compiledGetValueFromFn: function() {
                            var str = "";
                            var pathString = "obj";
                            str += "if (obj != null";
                            var i = 0;
                            var key;
                            for (;i < this.length - 1; i++) {
                                key = this[i];
                                pathString += isIdent(key) ? "." + key : formatAccessor(key);
                                str += " &&\n     " + pathString + " != null";
                            }
                            str += ")\n";
                            var key = this[i];
                            pathString += isIdent(key) ? "." + key : formatAccessor(key);
                            str += "  return " + pathString + ";\nelse\n  return undefined;";
                            return new Function("obj", str);
                        },
                        setValueFrom: function(obj, value) {
                            if (!this.length) return false;
                            for (var i = 0; i < this.length - 1; i++) {
                                if (!isObject(obj)) return false;
                                obj = obj[this[i]];
                            }
                            if (!isObject(obj)) return false;
                            obj[this[i]] = value;
                            return true;
                        }
                    });
                    var invalidPath = new Path("", constructorIsPrivate);
                    invalidPath.valid = false;
                    invalidPath.getValueFrom = invalidPath.setValueFrom = function() {};
                    var MAX_DIRTY_CHECK_CYCLES = 1e3;
                    function dirtyCheck(observer) {
                        var cycles = 0;
                        while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check_()) {
                            cycles++;
                        }
                        if (testingExposeCycleCount) global.dirtyCheckCycleCount = cycles;
                        return cycles > 0;
                    }
                    function objectIsEmpty(object) {
                        for (var prop in object) return false;
                        return true;
                    }
                    function diffIsEmpty(diff) {
                        return objectIsEmpty(diff.added) && objectIsEmpty(diff.removed) && objectIsEmpty(diff.changed);
                    }
                    function diffObjectFromOldObject(object, oldObject) {
                        var added = {};
                        var removed = {};
                        var changed = {};
                        for (var prop in oldObject) {
                            var newValue = object[prop];
                            if (newValue !== undefined && newValue === oldObject[prop]) continue;
                            if (!(prop in object)) {
                                removed[prop] = undefined;
                                continue;
                            }
                            if (newValue !== oldObject[prop]) changed[prop] = newValue;
                        }
                        for (var prop in object) {
                            if (prop in oldObject) continue;
                            added[prop] = object[prop];
                        }
                        if (Array.isArray(object) && object.length !== oldObject.length) changed.length = object.length;
                        return {
                            added: added,
                            removed: removed,
                            changed: changed
                        };
                    }
                    var eomTasks = [];
                    function runEOMTasks() {
                        if (!eomTasks.length) return false;
                        for (var i = 0; i < eomTasks.length; i++) {
                            eomTasks[i]();
                        }
                        eomTasks.length = 0;
                        return true;
                    }
                    var runEOM = hasObserve ? function() {
                        var eomObj = {
                            pingPong: true
                        };
                        var eomRunScheduled = false;
                        Object.observe(eomObj, function() {
                            runEOMTasks();
                            eomRunScheduled = false;
                        });
                        return function(fn) {
                            eomTasks.push(fn);
                            if (!eomRunScheduled) {
                                eomRunScheduled = true;
                                eomObj.pingPong = !eomObj.pingPong;
                            }
                        };
                    }() : function() {
                        return function(fn) {
                            eomTasks.push(fn);
                        };
                    }();
                    var observedObjectCache = [];
                    function newObservedObject() {
                        var observer;
                        var object;
                        var discardRecords = false;
                        var first = true;
                        function callback(records) {
                            if (observer && observer.state_ === OPENED && !discardRecords) observer.check_(records);
                        }
                        return {
                            open: function(obs) {
                                if (observer) throw Error("ObservedObject in use");
                                if (!first) Object.deliverChangeRecords(callback);
                                observer = obs;
                                first = false;
                            },
                            observe: function(obj, arrayObserve) {
                                object = obj;
                                if (arrayObserve) Array.observe(object, callback); else Object.observe(object, callback);
                            },
                            deliver: function(discard) {
                                discardRecords = discard;
                                Object.deliverChangeRecords(callback);
                                discardRecords = false;
                            },
                            close: function() {
                                observer = undefined;
                                Object.unobserve(object, callback);
                                observedObjectCache.push(this);
                            }
                        };
                    }
                    function getObservedObject(observer, object, arrayObserve) {
                        var dir = observedObjectCache.pop() || newObservedObject();
                        dir.open(observer);
                        dir.observe(object, arrayObserve);
                        return dir;
                    }
                    var observedSetCache = [];
                    function newObservedSet() {
                        var observerCount = 0;
                        var observers = [];
                        var objects = [];
                        var rootObj;
                        var rootObjProps;
                        function observe(obj, prop) {
                            if (!obj) return;
                            if (obj === rootObj) rootObjProps[prop] = true;
                            if (objects.indexOf(obj) < 0) {
                                objects.push(obj);
                                Object.observe(obj, callback);
                            }
                            observe(Object.getPrototypeOf(obj), prop);
                        }
                        function allRootObjNonObservedProps(recs) {
                            for (var i = 0; i < recs.length; i++) {
                                var rec = recs[i];
                                if (rec.object !== rootObj || rootObjProps[rec.name] || rec.type === "setPrototype") {
                                    return false;
                                }
                            }
                            return true;
                        }
                        function callback(recs) {
                            if (allRootObjNonObservedProps(recs)) return;
                            var observer;
                            for (var i = 0; i < observers.length; i++) {
                                observer = observers[i];
                                if (observer.state_ == OPENED) {
                                    observer.iterateObjects_(observe);
                                }
                            }
                            for (var i = 0; i < observers.length; i++) {
                                observer = observers[i];
                                if (observer.state_ == OPENED) {
                                    observer.check_();
                                }
                            }
                        }
                        var record = {
                            object: undefined,
                            objects: objects,
                            open: function(obs, object) {
                                if (!rootObj) {
                                    rootObj = object;
                                    rootObjProps = {};
                                }
                                observers.push(obs);
                                observerCount++;
                                obs.iterateObjects_(observe);
                            },
                            close: function(obs) {
                                observerCount--;
                                if (observerCount > 0) {
                                    return;
                                }
                                for (var i = 0; i < objects.length; i++) {
                                    Object.unobserve(objects[i], callback);
                                    Observer.unobservedCount++;
                                }
                                observers.length = 0;
                                objects.length = 0;
                                rootObj = undefined;
                                rootObjProps = undefined;
                                observedSetCache.push(this);
                            }
                        };
                        return record;
                    }
                    var lastObservedSet;
                    function getObservedSet(observer, obj) {
                        if (!lastObservedSet || lastObservedSet.object !== obj) {
                            lastObservedSet = observedSetCache.pop() || newObservedSet();
                            lastObservedSet.object = obj;
                        }
                        lastObservedSet.open(observer, obj);
                        return lastObservedSet;
                    }
                    var UNOPENED = 0;
                    var OPENED = 1;
                    var CLOSED = 2;
                    var RESETTING = 3;
                    var nextObserverId = 1;
                    function Observer() {
                        this.state_ = UNOPENED;
                        this.callback_ = undefined;
                        this.target_ = undefined;
                        this.directObserver_ = undefined;
                        this.value_ = undefined;
                        this.id_ = nextObserverId++;
                    }
                    Observer.prototype = {
                        open: function(callback, target) {
                            if (this.state_ != UNOPENED) throw Error("Observer has already been opened.");
                            addToAll(this);
                            this.callback_ = callback;
                            this.target_ = target;
                            this.connect_();
                            this.state_ = OPENED;
                            return this.value_;
                        },
                        close: function() {
                            if (this.state_ != OPENED) return;
                            removeFromAll(this);
                            this.disconnect_();
                            this.value_ = undefined;
                            this.callback_ = undefined;
                            this.target_ = undefined;
                            this.state_ = CLOSED;
                        },
                        deliver: function() {
                            if (this.state_ != OPENED) return;
                            dirtyCheck(this);
                        },
                        report_: function(changes) {
                            try {
                                this.callback_.apply(this.target_, changes);
                            } catch (ex) {
                                Observer._errorThrownDuringCallback = true;
                                console.error("Exception caught during observer callback: " + (ex.stack || ex));
                            }
                        },
                        discardChanges: function() {
                            this.check_(undefined, true);
                            return this.value_;
                        }
                    };
                    var collectObservers = !hasObserve;
                    var allObservers;
                    Observer._allObserversCount = 0;
                    if (collectObservers) {
                        allObservers = [];
                    }
                    function addToAll(observer) {
                        Observer._allObserversCount++;
                        if (!collectObservers) return;
                        allObservers.push(observer);
                    }
                    function removeFromAll(observer) {
                        Observer._allObserversCount--;
                    }
                    var runningMicrotaskCheckpoint = false;
                    global.Platform = global.Platform || {};
                    global.Platform.performMicrotaskCheckpoint = function() {
                        if (runningMicrotaskCheckpoint) return;
                        if (!collectObservers) return;
                        runningMicrotaskCheckpoint = true;
                        var cycles = 0;
                        var anyChanged, toCheck;
                        do {
                            cycles++;
                            toCheck = allObservers;
                            allObservers = [];
                            anyChanged = false;
                            for (var i = 0; i < toCheck.length; i++) {
                                var observer = toCheck[i];
                                if (observer.state_ != OPENED) continue;
                                if (observer.check_()) anyChanged = true;
                                allObservers.push(observer);
                            }
                            if (runEOMTasks()) anyChanged = true;
                        } while (cycles < MAX_DIRTY_CHECK_CYCLES && anyChanged);
                        if (testingExposeCycleCount) global.dirtyCheckCycleCount = cycles;
                        runningMicrotaskCheckpoint = false;
                    };
                    if (collectObservers) {
                        global.Platform.clearObservers = function() {
                            allObservers = [];
                        };
                    }
                    function ObjectObserver(object) {
                        Observer.call(this);
                        this.value_ = object;
                        this.oldObject_ = undefined;
                    }
                    ObjectObserver.prototype = createObject({
                        __proto__: Observer.prototype,
                        arrayObserve: false,
                        connect_: function(callback, target) {
                            if (hasObserve) {
                                this.directObserver_ = getObservedObject(this, this.value_, this.arrayObserve);
                            } else {
                                this.oldObject_ = this.copyObject(this.value_);
                            }
                        },
                        copyObject: function(object) {
                            var copy = Array.isArray(object) ? [] : {};
                            for (var prop in object) {
                                copy[prop] = object[prop];
                            }
                            if (Array.isArray(object)) copy.length = object.length;
                            return copy;
                        },
                        check_: function(changeRecords, skipChanges) {
                            var diff;
                            var oldValues;
                            if (hasObserve) {
                                if (!changeRecords) return false;
                                oldValues = {};
                                diff = diffObjectFromChangeRecords(this.value_, changeRecords, oldValues);
                            } else {
                                oldValues = this.oldObject_;
                                diff = diffObjectFromOldObject(this.value_, this.oldObject_);
                            }
                            if (diffIsEmpty(diff)) return false;
                            if (!hasObserve) this.oldObject_ = this.copyObject(this.value_);
                            this.report_([ diff.added || {}, diff.removed || {}, diff.changed || {}, function(property) {
                                return oldValues[property];
                            } ]);
                            return true;
                        },
                        disconnect_: function() {
                            if (hasObserve) {
                                this.directObserver_.close();
                                this.directObserver_ = undefined;
                            } else {
                                this.oldObject_ = undefined;
                            }
                        },
                        deliver: function() {
                            if (this.state_ != OPENED) return;
                            if (hasObserve) this.directObserver_.deliver(false); else dirtyCheck(this);
                        },
                        discardChanges: function() {
                            if (this.directObserver_) this.directObserver_.deliver(true); else this.oldObject_ = this.copyObject(this.value_);
                            return this.value_;
                        }
                    });
                    function ArrayObserver(array) {
                        if (!Array.isArray(array)) throw Error("Provided object is not an Array");
                        ObjectObserver.call(this, array);
                    }
                    ArrayObserver.prototype = createObject({
                        __proto__: ObjectObserver.prototype,
                        arrayObserve: true,
                        copyObject: function(arr) {
                            return arr.slice();
                        },
                        check_: function(changeRecords) {
                            var splices;
                            if (hasObserve) {
                                if (!changeRecords) return false;
                                splices = projectArraySplices(this.value_, changeRecords);
                            } else {
                                splices = calcSplices(this.value_, 0, this.value_.length, this.oldObject_, 0, this.oldObject_.length);
                            }
                            if (!splices || !splices.length) return false;
                            if (!hasObserve) this.oldObject_ = this.copyObject(this.value_);
                            this.report_([ splices ]);
                            return true;
                        }
                    });
                    ArrayObserver.applySplices = function(previous, current, splices) {
                        splices.forEach(function(splice) {
                            var spliceArgs = [ splice.index, splice.removed.length ];
                            var addIndex = splice.index;
                            while (addIndex < splice.index + splice.addedCount) {
                                spliceArgs.push(current[addIndex]);
                                addIndex++;
                            }
                            Array.prototype.splice.apply(previous, spliceArgs);
                        });
                    };
                    function PathObserver(object, path) {
                        Observer.call(this);
                        this.object_ = object;
                        this.path_ = getPath(path);
                        this.directObserver_ = undefined;
                    }
                    PathObserver.prototype = createObject({
                        __proto__: Observer.prototype,
                        get path() {
                            return this.path_;
                        },
                        connect_: function() {
                            if (hasObserve) this.directObserver_ = getObservedSet(this, this.object_);
                            this.check_(undefined, true);
                        },
                        disconnect_: function() {
                            this.value_ = undefined;
                            if (this.directObserver_) {
                                this.directObserver_.close(this);
                                this.directObserver_ = undefined;
                            }
                        },
                        iterateObjects_: function(observe) {
                            this.path_.iterateObjects(this.object_, observe);
                        },
                        check_: function(changeRecords, skipChanges) {
                            var oldValue = this.value_;
                            this.value_ = this.path_.getValueFrom(this.object_);
                            if (skipChanges || areSameValue(this.value_, oldValue)) return false;
                            this.report_([ this.value_, oldValue, this ]);
                            return true;
                        },
                        setValue: function(newValue) {
                            if (this.path_) this.path_.setValueFrom(this.object_, newValue);
                        }
                    });
                    function CompoundObserver(reportChangesOnOpen) {
                        Observer.call(this);
                        this.reportChangesOnOpen_ = reportChangesOnOpen;
                        this.value_ = [];
                        this.directObserver_ = undefined;
                        this.observed_ = [];
                    }
                    var observerSentinel = {};
                    CompoundObserver.prototype = createObject({
                        __proto__: Observer.prototype,
                        connect_: function() {
                            if (hasObserve) {
                                var object;
                                var needsDirectObserver = false;
                                for (var i = 0; i < this.observed_.length; i += 2) {
                                    object = this.observed_[i];
                                    if (object !== observerSentinel) {
                                        needsDirectObserver = true;
                                        break;
                                    }
                                }
                                if (needsDirectObserver) this.directObserver_ = getObservedSet(this, object);
                            }
                            this.check_(undefined, !this.reportChangesOnOpen_);
                        },
                        disconnect_: function() {
                            for (var i = 0; i < this.observed_.length; i += 2) {
                                if (this.observed_[i] === observerSentinel) this.observed_[i + 1].close();
                            }
                            this.observed_.length = 0;
                            this.value_.length = 0;
                            if (this.directObserver_) {
                                this.directObserver_.close(this);
                                this.directObserver_ = undefined;
                            }
                        },
                        addPath: function(object, path) {
                            if (this.state_ != UNOPENED && this.state_ != RESETTING) throw Error("Cannot add paths once started.");
                            var path = getPath(path);
                            this.observed_.push(object, path);
                            if (!this.reportChangesOnOpen_) return;
                            var index = this.observed_.length / 2 - 1;
                            this.value_[index] = path.getValueFrom(object);
                        },
                        addObserver: function(observer) {
                            if (this.state_ != UNOPENED && this.state_ != RESETTING) throw Error("Cannot add observers once started.");
                            this.observed_.push(observerSentinel, observer);
                            if (!this.reportChangesOnOpen_) return;
                            var index = this.observed_.length / 2 - 1;
                            this.value_[index] = observer.open(this.deliver, this);
                        },
                        startReset: function() {
                            if (this.state_ != OPENED) throw Error("Can only reset while open");
                            this.state_ = RESETTING;
                            this.disconnect_();
                        },
                        finishReset: function() {
                            if (this.state_ != RESETTING) throw Error("Can only finishReset after startReset");
                            this.state_ = OPENED;
                            this.connect_();
                            return this.value_;
                        },
                        iterateObjects_: function(observe) {
                            var object;
                            for (var i = 0; i < this.observed_.length; i += 2) {
                                object = this.observed_[i];
                                if (object !== observerSentinel) this.observed_[i + 1].iterateObjects(object, observe);
                            }
                        },
                        check_: function(changeRecords, skipChanges) {
                            var oldValues;
                            for (var i = 0; i < this.observed_.length; i += 2) {
                                var object = this.observed_[i];
                                var path = this.observed_[i + 1];
                                var value;
                                if (object === observerSentinel) {
                                    var observable = path;
                                    value = this.state_ === UNOPENED ? observable.open(this.deliver, this) : observable.discardChanges();
                                } else {
                                    value = path.getValueFrom(object);
                                }
                                if (skipChanges) {
                                    this.value_[i / 2] = value;
                                    continue;
                                }
                                if (areSameValue(value, this.value_[i / 2])) continue;
                                oldValues = oldValues || [];
                                oldValues[i / 2] = this.value_[i / 2];
                                this.value_[i / 2] = value;
                            }
                            if (!oldValues) return false;
                            this.report_([ this.value_, oldValues, this.observed_ ]);
                            return true;
                        }
                    });
                    function identFn(value) {
                        return value;
                    }
                    function ObserverTransform(observable, getValueFn, setValueFn, dontPassThroughSet) {
                        this.callback_ = undefined;
                        this.target_ = undefined;
                        this.value_ = undefined;
                        this.observable_ = observable;
                        this.getValueFn_ = getValueFn || identFn;
                        this.setValueFn_ = setValueFn || identFn;
                        this.dontPassThroughSet_ = dontPassThroughSet;
                    }
                    ObserverTransform.prototype = {
                        open: function(callback, target) {
                            this.callback_ = callback;
                            this.target_ = target;
                            this.value_ = this.getValueFn_(this.observable_.open(this.observedCallback_, this));
                            return this.value_;
                        },
                        observedCallback_: function(value) {
                            value = this.getValueFn_(value);
                            if (areSameValue(value, this.value_)) return;
                            var oldValue = this.value_;
                            this.value_ = value;
                            this.callback_.call(this.target_, this.value_, oldValue);
                        },
                        discardChanges: function() {
                            this.value_ = this.getValueFn_(this.observable_.discardChanges());
                            return this.value_;
                        },
                        deliver: function() {
                            return this.observable_.deliver();
                        },
                        setValue: function(value) {
                            value = this.setValueFn_(value);
                            if (!this.dontPassThroughSet_ && this.observable_.setValue) return this.observable_.setValue(value);
                        },
                        close: function() {
                            if (this.observable_) this.observable_.close();
                            this.callback_ = undefined;
                            this.target_ = undefined;
                            this.observable_ = undefined;
                            this.value_ = undefined;
                            this.getValueFn_ = undefined;
                            this.setValueFn_ = undefined;
                        }
                    };
                    var expectedRecordTypes = {
                        add: true,
                        update: true,
                        "delete": true
                    };
                    function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
                        var added = {};
                        var removed = {};
                        for (var i = 0; i < changeRecords.length; i++) {
                            var record = changeRecords[i];
                            if (!expectedRecordTypes[record.type]) {
                                console.error("Unknown changeRecord type: " + record.type);
                                console.error(record);
                                continue;
                            }
                            if (!(record.name in oldValues)) oldValues[record.name] = record.oldValue;
                            if (record.type == "update") continue;
                            if (record.type == "add") {
                                if (record.name in removed) delete removed[record.name]; else added[record.name] = true;
                                continue;
                            }
                            if (record.name in added) {
                                delete added[record.name];
                                delete oldValues[record.name];
                            } else {
                                removed[record.name] = true;
                            }
                        }
                        for (var prop in added) added[prop] = object[prop];
                        for (var prop in removed) removed[prop] = undefined;
                        var changed = {};
                        for (var prop in oldValues) {
                            if (prop in added || prop in removed) continue;
                            var newValue = object[prop];
                            if (oldValues[prop] !== newValue) changed[prop] = newValue;
                        }
                        return {
                            added: added,
                            removed: removed,
                            changed: changed
                        };
                    }
                    function newSplice(index, removed, addedCount) {
                        return {
                            index: index,
                            removed: removed,
                            addedCount: addedCount
                        };
                    }
                    var EDIT_LEAVE = 0;
                    var EDIT_UPDATE = 1;
                    var EDIT_ADD = 2;
                    var EDIT_DELETE = 3;
                    function ArraySplice() {}
                    ArraySplice.prototype = {
                        calcEditDistances: function(current, currentStart, currentEnd, old, oldStart, oldEnd) {
                            var rowCount = oldEnd - oldStart + 1;
                            var columnCount = currentEnd - currentStart + 1;
                            var distances = new Array(rowCount);
                            for (var i = 0; i < rowCount; i++) {
                                distances[i] = new Array(columnCount);
                                distances[i][0] = i;
                            }
                            for (var j = 0; j < columnCount; j++) distances[0][j] = j;
                            for (var i = 1; i < rowCount; i++) {
                                for (var j = 1; j < columnCount; j++) {
                                    if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1])) distances[i][j] = distances[i - 1][j - 1]; else {
                                        var north = distances[i - 1][j] + 1;
                                        var west = distances[i][j - 1] + 1;
                                        distances[i][j] = north < west ? north : west;
                                    }
                                }
                            }
                            return distances;
                        },
                        spliceOperationsFromEditDistances: function(distances) {
                            var i = distances.length - 1;
                            var j = distances[0].length - 1;
                            var current = distances[i][j];
                            var edits = [];
                            while (i > 0 || j > 0) {
                                if (i == 0) {
                                    edits.push(EDIT_ADD);
                                    j--;
                                    continue;
                                }
                                if (j == 0) {
                                    edits.push(EDIT_DELETE);
                                    i--;
                                    continue;
                                }
                                var northWest = distances[i - 1][j - 1];
                                var west = distances[i - 1][j];
                                var north = distances[i][j - 1];
                                var min;
                                if (west < north) min = west < northWest ? west : northWest; else min = north < northWest ? north : northWest;
                                if (min == northWest) {
                                    if (northWest == current) {
                                        edits.push(EDIT_LEAVE);
                                    } else {
                                        edits.push(EDIT_UPDATE);
                                        current = northWest;
                                    }
                                    i--;
                                    j--;
                                } else if (min == west) {
                                    edits.push(EDIT_DELETE);
                                    i--;
                                    current = west;
                                } else {
                                    edits.push(EDIT_ADD);
                                    j--;
                                    current = north;
                                }
                            }
                            edits.reverse();
                            return edits;
                        },
                        calcSplices: function(current, currentStart, currentEnd, old, oldStart, oldEnd) {
                            var prefixCount = 0;
                            var suffixCount = 0;
                            var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
                            if (currentStart == 0 && oldStart == 0) prefixCount = this.sharedPrefix(current, old, minLength);
                            if (currentEnd == current.length && oldEnd == old.length) suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
                            currentStart += prefixCount;
                            oldStart += prefixCount;
                            currentEnd -= suffixCount;
                            oldEnd -= suffixCount;
                            if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0) return [];
                            if (currentStart == currentEnd) {
                                var splice = newSplice(currentStart, [], 0);
                                while (oldStart < oldEnd) splice.removed.push(old[oldStart++]);
                                return [ splice ];
                            } else if (oldStart == oldEnd) return [ newSplice(currentStart, [], currentEnd - currentStart) ];
                            var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
                            var splice = undefined;
                            var splices = [];
                            var index = currentStart;
                            var oldIndex = oldStart;
                            for (var i = 0; i < ops.length; i++) {
                                switch (ops[i]) {
                                  case EDIT_LEAVE:
                                    if (splice) {
                                        splices.push(splice);
                                        splice = undefined;
                                    }
                                    index++;
                                    oldIndex++;
                                    break;

                                  case EDIT_UPDATE:
                                    if (!splice) splice = newSplice(index, [], 0);
                                    splice.addedCount++;
                                    index++;
                                    splice.removed.push(old[oldIndex]);
                                    oldIndex++;
                                    break;

                                  case EDIT_ADD:
                                    if (!splice) splice = newSplice(index, [], 0);
                                    splice.addedCount++;
                                    index++;
                                    break;

                                  case EDIT_DELETE:
                                    if (!splice) splice = newSplice(index, [], 0);
                                    splice.removed.push(old[oldIndex]);
                                    oldIndex++;
                                    break;
                                }
                            }
                            if (splice) {
                                splices.push(splice);
                            }
                            return splices;
                        },
                        sharedPrefix: function(current, old, searchLength) {
                            for (var i = 0; i < searchLength; i++) if (!this.equals(current[i], old[i])) return i;
                            return searchLength;
                        },
                        sharedSuffix: function(current, old, searchLength) {
                            var index1 = current.length;
                            var index2 = old.length;
                            var count = 0;
                            while (count < searchLength && this.equals(current[--index1], old[--index2])) count++;
                            return count;
                        },
                        calculateSplices: function(current, previous) {
                            return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
                        },
                        equals: function(currentValue, previousValue) {
                            return currentValue === previousValue;
                        }
                    };
                    var arraySplice = new ArraySplice();
                    function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
                        return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
                    }
                    function intersect(start1, end1, start2, end2) {
                        if (end1 < start2 || end2 < start1) return -1;
                        if (end1 == start2 || end2 == start1) return 0;
                        if (start1 < start2) {
                            if (end1 < end2) return end1 - start2; else return end2 - start2;
                        } else {
                            if (end2 < end1) return end2 - start1; else return end1 - start1;
                        }
                    }
                    function mergeSplice(splices, index, removed, addedCount) {
                        var splice = newSplice(index, removed, addedCount);
                        var inserted = false;
                        var insertionOffset = 0;
                        for (var i = 0; i < splices.length; i++) {
                            var current = splices[i];
                            current.index += insertionOffset;
                            if (inserted) continue;
                            var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
                            if (intersectCount >= 0) {
                                splices.splice(i, 1);
                                i--;
                                insertionOffset -= current.addedCount - current.removed.length;
                                splice.addedCount += current.addedCount - intersectCount;
                                var deleteCount = splice.removed.length + current.removed.length - intersectCount;
                                if (!splice.addedCount && !deleteCount) {
                                    inserted = true;
                                } else {
                                    var removed = current.removed;
                                    if (splice.index < current.index) {
                                        var prepend = splice.removed.slice(0, current.index - splice.index);
                                        Array.prototype.push.apply(prepend, removed);
                                        removed = prepend;
                                    }
                                    if (splice.index + splice.removed.length > current.index + current.addedCount) {
                                        var append = splice.removed.slice(current.index + current.addedCount - splice.index);
                                        Array.prototype.push.apply(removed, append);
                                    }
                                    splice.removed = removed;
                                    if (current.index < splice.index) {
                                        splice.index = current.index;
                                    }
                                }
                            } else if (splice.index < current.index) {
                                inserted = true;
                                splices.splice(i, 0, splice);
                                i++;
                                var offset = splice.addedCount - splice.removed.length;
                                current.index += offset;
                                insertionOffset += offset;
                            }
                        }
                        if (!inserted) splices.push(splice);
                    }
                    function createInitialSplices(array, changeRecords) {
                        var splices = [];
                        for (var i = 0; i < changeRecords.length; i++) {
                            var record = changeRecords[i];
                            switch (record.type) {
                              case "splice":
                                mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
                                break;

                              case "add":
                              case "update":
                              case "delete":
                                if (!isIndex(record.name)) continue;
                                var index = toNumber(record.name);
                                if (index < 0) continue;
                                mergeSplice(splices, index, [ record.oldValue ], 1);
                                break;

                              default:
                                console.error("Unexpected record type: " + JSON.stringify(record));
                                break;
                            }
                        }
                        return splices;
                    }
                    function projectArraySplices(array, changeRecords) {
                        var splices = [];
                        createInitialSplices(array, changeRecords).forEach(function(splice) {
                            if (splice.addedCount == 1 && splice.removed.length == 1) {
                                if (splice.removed[0] !== array[splice.index]) splices.push(splice);
                                return;
                            }
                            splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
                        });
                        return splices;
                    }
                    global.Observer = Observer;
                    global.Observer.runEOM_ = runEOM;
                    global.Observer.observerSentinel_ = observerSentinel;
                    global.Observer.hasObjectObserve = hasObserve;
                    global.ArrayObserver = ArrayObserver;
                    global.ArrayObserver.calculateSplices = function(current, previous) {
                        return arraySplice.calculateSplices(current, previous);
                    };
                    global.ArraySplice = ArraySplice;
                    global.ObjectObserver = ObjectObserver;
                    global.PathObserver = PathObserver;
                    global.CompoundObserver = CompoundObserver;
                    global.Path = Path;
                    global.ObserverTransform = ObserverTransform;
                })(typeof global !== "undefined" && global && typeof module !== "undefined" && module ? global : this || window);
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {} ],
        58: [ function(require, module, exports) {
            (function(process, global) {
                (function(global) {
                    "use strict";
                    if (global.$traceurRuntime) {
                        return;
                    }
                    var $Object = Object;
                    var $TypeError = TypeError;
                    var $create = $Object.create;
                    var $defineProperties = $Object.defineProperties;
                    var $defineProperty = $Object.defineProperty;
                    var $freeze = $Object.freeze;
                    var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
                    var $getOwnPropertyNames = $Object.getOwnPropertyNames;
                    var $keys = $Object.keys;
                    var $hasOwnProperty = $Object.prototype.hasOwnProperty;
                    var $toString = $Object.prototype.toString;
                    var $preventExtensions = Object.preventExtensions;
                    var $seal = Object.seal;
                    var $isExtensible = Object.isExtensible;
                    function nonEnum(value) {
                        return {
                            configurable: true,
                            enumerable: false,
                            value: value,
                            writable: true
                        };
                    }
                    var types = {
                        "void": function voidType() {},
                        any: function any() {},
                        string: function string() {},
                        number: function number() {},
                        "boolean": function boolean() {}
                    };
                    var method = nonEnum;
                    var counter = 0;
                    function newUniqueString() {
                        return "__$" + Math.floor(Math.random() * 1e9) + "$" + ++counter + "$__";
                    }
                    var symbolInternalProperty = newUniqueString();
                    var symbolDescriptionProperty = newUniqueString();
                    var symbolDataProperty = newUniqueString();
                    var symbolValues = $create(null);
                    var privateNames = $create(null);
                    function createPrivateName() {
                        var s = newUniqueString();
                        privateNames[s] = true;
                        return s;
                    }
                    function isSymbol(symbol) {
                        return typeof symbol === "object" && symbol instanceof SymbolValue;
                    }
                    function typeOf(v) {
                        if (isSymbol(v)) return "symbol";
                        return typeof v;
                    }
                    function Symbol(description) {
                        var value = new SymbolValue(description);
                        if (!(this instanceof Symbol)) return value;
                        throw new TypeError("Symbol cannot be new'ed");
                    }
                    $defineProperty(Symbol.prototype, "constructor", nonEnum(Symbol));
                    $defineProperty(Symbol.prototype, "toString", method(function() {
                        var symbolValue = this[symbolDataProperty];
                        if (!getOption("symbols")) return symbolValue[symbolInternalProperty];
                        if (!symbolValue) throw TypeError("Conversion from symbol to string");
                        var desc = symbolValue[symbolDescriptionProperty];
                        if (desc === undefined) desc = "";
                        return "Symbol(" + desc + ")";
                    }));
                    $defineProperty(Symbol.prototype, "valueOf", method(function() {
                        var symbolValue = this[symbolDataProperty];
                        if (!symbolValue) throw TypeError("Conversion from symbol to string");
                        if (!getOption("symbols")) return symbolValue[symbolInternalProperty];
                        return symbolValue;
                    }));
                    function SymbolValue(description) {
                        var key = newUniqueString();
                        $defineProperty(this, symbolDataProperty, {
                            value: this
                        });
                        $defineProperty(this, symbolInternalProperty, {
                            value: key
                        });
                        $defineProperty(this, symbolDescriptionProperty, {
                            value: description
                        });
                        freeze(this);
                        symbolValues[key] = this;
                    }
                    $defineProperty(SymbolValue.prototype, "constructor", nonEnum(Symbol));
                    $defineProperty(SymbolValue.prototype, "toString", {
                        value: Symbol.prototype.toString,
                        enumerable: false
                    });
                    $defineProperty(SymbolValue.prototype, "valueOf", {
                        value: Symbol.prototype.valueOf,
                        enumerable: false
                    });
                    var hashProperty = createPrivateName();
                    var hashPropertyDescriptor = {
                        value: undefined
                    };
                    var hashObjectProperties = {
                        hash: {
                            value: undefined
                        },
                        self: {
                            value: undefined
                        }
                    };
                    var hashCounter = 0;
                    function getOwnHashObject(object) {
                        var hashObject = object[hashProperty];
                        if (hashObject && hashObject.self === object) return hashObject;
                        if ($isExtensible(object)) {
                            hashObjectProperties.hash.value = hashCounter++;
                            hashObjectProperties.self.value = object;
                            hashPropertyDescriptor.value = $create(null, hashObjectProperties);
                            $defineProperty(object, hashProperty, hashPropertyDescriptor);
                            return hashPropertyDescriptor.value;
                        }
                        return undefined;
                    }
                    function freeze(object) {
                        getOwnHashObject(object);
                        return $freeze.apply(this, arguments);
                    }
                    function preventExtensions(object) {
                        getOwnHashObject(object);
                        return $preventExtensions.apply(this, arguments);
                    }
                    function seal(object) {
                        getOwnHashObject(object);
                        return $seal.apply(this, arguments);
                    }
                    Symbol.iterator = Symbol();
                    freeze(SymbolValue.prototype);
                    function toProperty(name) {
                        if (isSymbol(name)) return name[symbolInternalProperty];
                        return name;
                    }
                    function getOwnPropertyNames(object) {
                        var rv = [];
                        var names = $getOwnPropertyNames(object);
                        for (var i = 0; i < names.length; i++) {
                            var name = names[i];
                            if (!symbolValues[name] && !privateNames[name]) rv.push(name);
                        }
                        return rv;
                    }
                    function getOwnPropertyDescriptor(object, name) {
                        return $getOwnPropertyDescriptor(object, toProperty(name));
                    }
                    function getOwnPropertySymbols(object) {
                        var rv = [];
                        var names = $getOwnPropertyNames(object);
                        for (var i = 0; i < names.length; i++) {
                            var symbol = symbolValues[names[i]];
                            if (symbol) rv.push(symbol);
                        }
                        return rv;
                    }
                    function hasOwnProperty(name) {
                        return $hasOwnProperty.call(this, toProperty(name));
                    }
                    function getOption(name) {
                        return global.traceur && global.traceur.options[name];
                    }
                    function setProperty(object, name, value) {
                        var sym, desc;
                        if (isSymbol(name)) {
                            sym = name;
                            name = name[symbolInternalProperty];
                        }
                        object[name] = value;
                        if (sym && (desc = $getOwnPropertyDescriptor(object, name))) $defineProperty(object, name, {
                            enumerable: false
                        });
                        return value;
                    }
                    function defineProperty(object, name, descriptor) {
                        if (isSymbol(name)) {
                            if (descriptor.enumerable) {
                                descriptor = $create(descriptor, {
                                    enumerable: {
                                        value: false
                                    }
                                });
                            }
                            name = name[symbolInternalProperty];
                        }
                        $defineProperty(object, name, descriptor);
                        return object;
                    }
                    function polyfillObject(Object) {
                        $defineProperty(Object, "defineProperty", {
                            value: defineProperty
                        });
                        $defineProperty(Object, "getOwnPropertyNames", {
                            value: getOwnPropertyNames
                        });
                        $defineProperty(Object, "getOwnPropertyDescriptor", {
                            value: getOwnPropertyDescriptor
                        });
                        $defineProperty(Object.prototype, "hasOwnProperty", {
                            value: hasOwnProperty
                        });
                        $defineProperty(Object, "freeze", {
                            value: freeze
                        });
                        $defineProperty(Object, "preventExtensions", {
                            value: preventExtensions
                        });
                        $defineProperty(Object, "seal", {
                            value: seal
                        });
                        Object.getOwnPropertySymbols = getOwnPropertySymbols;
                    }
                    function exportStar(object) {
                        for (var i = 1; i < arguments.length; i++) {
                            var names = $getOwnPropertyNames(arguments[i]);
                            for (var j = 0; j < names.length; j++) {
                                var name = names[j];
                                if (privateNames[name]) continue;
                                (function(mod, name) {
                                    $defineProperty(object, name, {
                                        get: function() {
                                            return mod[name];
                                        },
                                        enumerable: true
                                    });
                                })(arguments[i], names[j]);
                            }
                        }
                        return object;
                    }
                    function isObject(x) {
                        return x != null && (typeof x === "object" || typeof x === "function");
                    }
                    function toObject(x) {
                        if (x == null) throw $TypeError();
                        return $Object(x);
                    }
                    function checkObjectCoercible(argument) {
                        if (argument == null) {
                            throw new TypeError("Value cannot be converted to an Object");
                        }
                        return argument;
                    }
                    function setupGlobals(global) {
                        global.Symbol = Symbol;
                        global.Reflect = global.Reflect || {};
                        global.Reflect.global = global.Reflect.global || global;
                        polyfillObject(global.Object);
                    }
                    setupGlobals(global);
                    global.$traceurRuntime = {
                        createPrivateName: createPrivateName,
                        exportStar: exportStar,
                        getOwnHashObject: getOwnHashObject,
                        privateNames: privateNames,
                        setProperty: setProperty,
                        setupGlobals: setupGlobals,
                        toObject: toObject,
                        isObject: isObject,
                        toProperty: toProperty,
                        type: types,
                        "typeof": typeOf,
                        checkObjectCoercible: checkObjectCoercible,
                        hasOwnProperty: function(o, p) {
                            return hasOwnProperty.call(o, p);
                        },
                        defineProperties: $defineProperties,
                        defineProperty: $defineProperty,
                        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
                        getOwnPropertyNames: $getOwnPropertyNames,
                        keys: $keys
                    };
                })(typeof global !== "undefined" ? global : this);
                (function() {
                    "use strict";
                    function spread() {
                        var rv = [], j = 0, iterResult;
                        for (var i = 0; i < arguments.length; i++) {
                            var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
                            if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== "function") {
                                throw new TypeError("Cannot spread non-iterable object.");
                            }
                            var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
                            while (!(iterResult = iter.next()).done) {
                                rv[j++] = iterResult.value;
                            }
                        }
                        return rv;
                    }
                    $traceurRuntime.spread = spread;
                })();
                (function() {
                    "use strict";
                    var $Object = Object;
                    var $TypeError = TypeError;
                    var $create = $Object.create;
                    var $defineProperties = $traceurRuntime.defineProperties;
                    var $defineProperty = $traceurRuntime.defineProperty;
                    var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
                    var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
                    var $getPrototypeOf = Object.getPrototypeOf;
                    function superDescriptor(homeObject, name) {
                        var proto = $getPrototypeOf(homeObject);
                        do {
                            var result = $getOwnPropertyDescriptor(proto, name);
                            if (result) return result;
                            proto = $getPrototypeOf(proto);
                        } while (proto);
                        return undefined;
                    }
                    function superCall(self, homeObject, name, args) {
                        return superGet(self, homeObject, name).apply(self, args);
                    }
                    function superGet(self, homeObject, name) {
                        var descriptor = superDescriptor(homeObject, name);
                        if (descriptor) {
                            if (!descriptor.get) return descriptor.value;
                            return descriptor.get.call(self);
                        }
                        return undefined;
                    }
                    function superSet(self, homeObject, name, value) {
                        var descriptor = superDescriptor(homeObject, name);
                        if (descriptor && descriptor.set) {
                            descriptor.set.call(self, value);
                            return value;
                        }
                        throw $TypeError("super has no setter '" + name + "'.");
                    }
                    function getDescriptors(object) {
                        var descriptors = {}, name, names = $getOwnPropertyNames(object);
                        for (var i = 0; i < names.length; i++) {
                            var name = names[i];
                            descriptors[name] = $getOwnPropertyDescriptor(object, name);
                        }
                        return descriptors;
                    }
                    function createClass(ctor, object, staticObject, superClass) {
                        $defineProperty(object, "constructor", {
                            value: ctor,
                            configurable: true,
                            enumerable: false,
                            writable: true
                        });
                        if (arguments.length > 3) {
                            if (typeof superClass === "function") ctor.__proto__ = superClass;
                            ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
                        } else {
                            ctor.prototype = object;
                        }
                        $defineProperty(ctor, "prototype", {
                            configurable: false,
                            writable: false
                        });
                        return $defineProperties(ctor, getDescriptors(staticObject));
                    }
                    function getProtoParent(superClass) {
                        if (typeof superClass === "function") {
                            var prototype = superClass.prototype;
                            if ($Object(prototype) === prototype || prototype === null) return superClass.prototype;
                            throw new $TypeError("super prototype must be an Object or null");
                        }
                        if (superClass === null) return null;
                        throw new $TypeError("Super expression must either be null or a function, not " + typeof superClass + ".");
                    }
                    function defaultSuperCall(self, homeObject, args) {
                        if ($getPrototypeOf(homeObject) !== null) superCall(self, homeObject, "constructor", args);
                    }
                    $traceurRuntime.createClass = createClass;
                    $traceurRuntime.defaultSuperCall = defaultSuperCall;
                    $traceurRuntime.superCall = superCall;
                    $traceurRuntime.superGet = superGet;
                    $traceurRuntime.superSet = superSet;
                })();
                (function() {
                    "use strict";
                    var createPrivateName = $traceurRuntime.createPrivateName;
                    var $defineProperties = $traceurRuntime.defineProperties;
                    var $defineProperty = $traceurRuntime.defineProperty;
                    var $create = Object.create;
                    var $TypeError = TypeError;
                    function nonEnum(value) {
                        return {
                            configurable: true,
                            enumerable: false,
                            value: value,
                            writable: true
                        };
                    }
                    var ST_NEWBORN = 0;
                    var ST_EXECUTING = 1;
                    var ST_SUSPENDED = 2;
                    var ST_CLOSED = 3;
                    var END_STATE = -2;
                    var RETHROW_STATE = -3;
                    function getInternalError(state) {
                        return new Error("Traceur compiler bug: invalid state in state machine: " + state);
                    }
                    function GeneratorContext() {
                        this.state = 0;
                        this.GState = ST_NEWBORN;
                        this.storedException = undefined;
                        this.finallyFallThrough = undefined;
                        this.sent_ = undefined;
                        this.returnValue = undefined;
                        this.tryStack_ = [];
                    }
                    GeneratorContext.prototype = {
                        pushTry: function(catchState, finallyState) {
                            if (finallyState !== null) {
                                var finallyFallThrough = null;
                                for (var i = this.tryStack_.length - 1; i >= 0; i--) {
                                    if (this.tryStack_[i].catch !== undefined) {
                                        finallyFallThrough = this.tryStack_[i].catch;
                                        break;
                                    }
                                }
                                if (finallyFallThrough === null) finallyFallThrough = RETHROW_STATE;
                                this.tryStack_.push({
                                    "finally": finallyState,
                                    finallyFallThrough: finallyFallThrough
                                });
                            }
                            if (catchState !== null) {
                                this.tryStack_.push({
                                    "catch": catchState
                                });
                            }
                        },
                        popTry: function() {
                            this.tryStack_.pop();
                        },
                        get sent() {
                            this.maybeThrow();
                            return this.sent_;
                        },
                        set sent(v) {
                            this.sent_ = v;
                        },
                        get sentIgnoreThrow() {
                            return this.sent_;
                        },
                        maybeThrow: function() {
                            if (this.action === "throw") {
                                this.action = "next";
                                throw this.sent_;
                            }
                        },
                        end: function() {
                            switch (this.state) {
                              case END_STATE:
                                return this;

                              case RETHROW_STATE:
                                throw this.storedException;

                              default:
                                throw getInternalError(this.state);
                            }
                        },
                        handleException: function(ex) {
                            this.GState = ST_CLOSED;
                            this.state = END_STATE;
                            throw ex;
                        }
                    };
                    function nextOrThrow(ctx, moveNext, action, x) {
                        switch (ctx.GState) {
                          case ST_EXECUTING:
                            throw new Error('"' + action + '" on executing generator');

                          case ST_CLOSED:
                            if (action == "next") {
                                return {
                                    value: undefined,
                                    done: true
                                };
                            }
                            throw x;

                          case ST_NEWBORN:
                            if (action === "throw") {
                                ctx.GState = ST_CLOSED;
                                throw x;
                            }
                            if (x !== undefined) throw $TypeError("Sent value to newborn generator");

                          case ST_SUSPENDED:
                            ctx.GState = ST_EXECUTING;
                            ctx.action = action;
                            ctx.sent = x;
                            var value = moveNext(ctx);
                            var done = value === ctx;
                            if (done) value = ctx.returnValue;
                            ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
                            return {
                                value: value,
                                done: done
                            };
                        }
                    }
                    var ctxName = createPrivateName();
                    var moveNextName = createPrivateName();
                    function GeneratorFunction() {}
                    function GeneratorFunctionPrototype() {}
                    GeneratorFunction.prototype = GeneratorFunctionPrototype;
                    $defineProperty(GeneratorFunctionPrototype, "constructor", nonEnum(GeneratorFunction));
                    GeneratorFunctionPrototype.prototype = {
                        constructor: GeneratorFunctionPrototype,
                        next: function(v) {
                            return nextOrThrow(this[ctxName], this[moveNextName], "next", v);
                        },
                        "throw": function(v) {
                            return nextOrThrow(this[ctxName], this[moveNextName], "throw", v);
                        }
                    };
                    $defineProperties(GeneratorFunctionPrototype.prototype, {
                        constructor: {
                            enumerable: false
                        },
                        next: {
                            enumerable: false
                        },
                        "throw": {
                            enumerable: false
                        }
                    });
                    Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
                        return this;
                    }));
                    function createGeneratorInstance(innerFunction, functionObject, self) {
                        var moveNext = getMoveNext(innerFunction, self);
                        var ctx = new GeneratorContext();
                        var object = $create(functionObject.prototype);
                        object[ctxName] = ctx;
                        object[moveNextName] = moveNext;
                        return object;
                    }
                    function initGeneratorFunction(functionObject) {
                        functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
                        functionObject.__proto__ = GeneratorFunctionPrototype;
                        return functionObject;
                    }
                    function AsyncFunctionContext() {
                        GeneratorContext.call(this);
                        this.err = undefined;
                        var ctx = this;
                        ctx.result = new Promise(function(resolve, reject) {
                            ctx.resolve = resolve;
                            ctx.reject = reject;
                        });
                    }
                    AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
                    AsyncFunctionContext.prototype.end = function() {
                        switch (this.state) {
                          case END_STATE:
                            this.resolve(this.returnValue);
                            break;

                          case RETHROW_STATE:
                            this.reject(this.storedException);
                            break;

                          default:
                            this.reject(getInternalError(this.state));
                        }
                    };
                    AsyncFunctionContext.prototype.handleException = function() {
                        this.state = RETHROW_STATE;
                    };
                    function asyncWrap(innerFunction, self) {
                        var moveNext = getMoveNext(innerFunction, self);
                        var ctx = new AsyncFunctionContext();
                        ctx.createCallback = function(newState) {
                            return function(value) {
                                ctx.state = newState;
                                ctx.value = value;
                                moveNext(ctx);
                            };
                        };
                        ctx.errback = function(err) {
                            handleCatch(ctx, err);
                            moveNext(ctx);
                        };
                        moveNext(ctx);
                        return ctx.result;
                    }
                    function getMoveNext(innerFunction, self) {
                        return function(ctx) {
                            while (true) {
                                try {
                                    return innerFunction.call(self, ctx);
                                } catch (ex) {
                                    handleCatch(ctx, ex);
                                }
                            }
                        };
                    }
                    function handleCatch(ctx, ex) {
                        ctx.storedException = ex;
                        var last = ctx.tryStack_[ctx.tryStack_.length - 1];
                        if (!last) {
                            ctx.handleException(ex);
                            return;
                        }
                        ctx.state = last.catch !== undefined ? last.catch : last.finally;
                        if (last.finallyFallThrough !== undefined) ctx.finallyFallThrough = last.finallyFallThrough;
                    }
                    $traceurRuntime.asyncWrap = asyncWrap;
                    $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
                    $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
                })();
                (function() {
                    function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
                        var out = [];
                        if (opt_scheme) {
                            out.push(opt_scheme, ":");
                        }
                        if (opt_domain) {
                            out.push("//");
                            if (opt_userInfo) {
                                out.push(opt_userInfo, "@");
                            }
                            out.push(opt_domain);
                            if (opt_port) {
                                out.push(":", opt_port);
                            }
                        }
                        if (opt_path) {
                            out.push(opt_path);
                        }
                        if (opt_queryData) {
                            out.push("?", opt_queryData);
                        }
                        if (opt_fragment) {
                            out.push("#", opt_fragment);
                        }
                        return out.join("");
                    }
                    var splitRe = new RegExp("^" + "(?:" + "([^:/?#.]+)" + ":)?" + "(?://" + "(?:([^/?#]*)@)?" + "([\\w\\d\\-\\u0100-\\uffff.%]*)" + "(?::([0-9]+))?" + ")?" + "([^?#]+)?" + "(?:\\?([^#]*))?" + "(?:#(.*))?" + "$");
                    var ComponentIndex = {
                        SCHEME: 1,
                        USER_INFO: 2,
                        DOMAIN: 3,
                        PORT: 4,
                        PATH: 5,
                        QUERY_DATA: 6,
                        FRAGMENT: 7
                    };
                    function split(uri) {
                        return uri.match(splitRe);
                    }
                    function removeDotSegments(path) {
                        if (path === "/") return "/";
                        var leadingSlash = path[0] === "/" ? "/" : "";
                        var trailingSlash = path.slice(-1) === "/" ? "/" : "";
                        var segments = path.split("/");
                        var out = [];
                        var up = 0;
                        for (var pos = 0; pos < segments.length; pos++) {
                            var segment = segments[pos];
                            switch (segment) {
                              case "":
                              case ".":
                                break;

                              case "..":
                                if (out.length) out.pop(); else up++;
                                break;

                              default:
                                out.push(segment);
                            }
                        }
                        if (!leadingSlash) {
                            while (up-- > 0) {
                                out.unshift("..");
                            }
                            if (out.length === 0) out.push(".");
                        }
                        return leadingSlash + out.join("/") + trailingSlash;
                    }
                    function joinAndCanonicalizePath(parts) {
                        var path = parts[ComponentIndex.PATH] || "";
                        path = removeDotSegments(path);
                        parts[ComponentIndex.PATH] = path;
                        return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
                    }
                    function canonicalizeUrl(url) {
                        var parts = split(url);
                        return joinAndCanonicalizePath(parts);
                    }
                    function resolveUrl(base, url) {
                        var parts = split(url);
                        var baseParts = split(base);
                        if (parts[ComponentIndex.SCHEME]) {
                            return joinAndCanonicalizePath(parts);
                        } else {
                            parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
                        }
                        for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
                            if (!parts[i]) {
                                parts[i] = baseParts[i];
                            }
                        }
                        if (parts[ComponentIndex.PATH][0] == "/") {
                            return joinAndCanonicalizePath(parts);
                        }
                        var path = baseParts[ComponentIndex.PATH];
                        var index = path.lastIndexOf("/");
                        path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
                        parts[ComponentIndex.PATH] = path;
                        return joinAndCanonicalizePath(parts);
                    }
                    function isAbsolute(name) {
                        if (!name) return false;
                        if (name[0] === "/") return true;
                        var parts = split(name);
                        if (parts[ComponentIndex.SCHEME]) return true;
                        return false;
                    }
                    $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
                    $traceurRuntime.isAbsolute = isAbsolute;
                    $traceurRuntime.removeDotSegments = removeDotSegments;
                    $traceurRuntime.resolveUrl = resolveUrl;
                })();
                (function(global) {
                    "use strict";
                    var $__2 = $traceurRuntime, canonicalizeUrl = $__2.canonicalizeUrl, resolveUrl = $__2.resolveUrl, isAbsolute = $__2.isAbsolute;
                    var moduleInstantiators = Object.create(null);
                    var baseURL;
                    if (global.location && global.location.href) baseURL = resolveUrl(global.location.href, "./"); else baseURL = "";
                    var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
                        this.url = url;
                        this.value_ = uncoatedModule;
                    };
                    $traceurRuntime.createClass(UncoatedModuleEntry, {}, {});
                    var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
                        this.message = this.constructor.name + ": " + this.stripCause(cause) + " in " + erroneousModuleName;
                        if (!(cause instanceof $ModuleEvaluationError) && cause.stack) this.stack = this.stripStack(cause.stack); else this.stack = "";
                    };
                    var $ModuleEvaluationError = ModuleEvaluationError;
                    $traceurRuntime.createClass(ModuleEvaluationError, {
                        stripError: function(message) {
                            return message.replace(/.*Error:/, this.constructor.name + ":");
                        },
                        stripCause: function(cause) {
                            if (!cause) return "";
                            if (!cause.message) return cause + "";
                            return this.stripError(cause.message);
                        },
                        loadedBy: function(moduleName) {
                            this.stack += "\n loaded by " + moduleName;
                        },
                        stripStack: function(causeStack) {
                            var stack = [];
                            causeStack.split("\n").some(function(frame) {
                                if (/UncoatedModuleInstantiator/.test(frame)) return true;
                                stack.push(frame);
                            });
                            stack[0] = this.stripError(stack[0]);
                            return stack.join("\n");
                        }
                    }, {}, Error);
                    var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
                        $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [ url, null ]);
                        this.func = func;
                    };
                    var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
                    $traceurRuntime.createClass(UncoatedModuleInstantiator, {
                        getUncoatedModule: function() {
                            if (this.value_) return this.value_;
                            try {
                                return this.value_ = this.func.call(global);
                            } catch (ex) {
                                if (ex instanceof ModuleEvaluationError) {
                                    ex.loadedBy(this.url);
                                    throw ex;
                                }
                                throw new ModuleEvaluationError(this.url, ex);
                            }
                        }
                    }, {}, UncoatedModuleEntry);
                    function getUncoatedModuleInstantiator(name) {
                        if (!name) return;
                        var url = ModuleStore.normalize(name);
                        return moduleInstantiators[url];
                    }
                    var moduleInstances = Object.create(null);
                    var liveModuleSentinel = {};
                    function Module(uncoatedModule) {
                        var isLive = arguments[1];
                        var coatedModule = Object.create(null);
                        Object.getOwnPropertyNames(uncoatedModule).forEach(function(name) {
                            var getter, value;
                            if (isLive === liveModuleSentinel) {
                                var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
                                if (descr.get) getter = descr.get;
                            }
                            if (!getter) {
                                value = uncoatedModule[name];
                                getter = function() {
                                    return value;
                                };
                            }
                            Object.defineProperty(coatedModule, name, {
                                get: getter,
                                enumerable: true
                            });
                        });
                        Object.preventExtensions(coatedModule);
                        return coatedModule;
                    }
                    var ModuleStore = {
                        normalize: function(name, refererName, refererAddress) {
                            if (typeof name !== "string") throw new TypeError("module name must be a string, not " + typeof name);
                            if (isAbsolute(name)) return canonicalizeUrl(name);
                            if (/[^\.]\/\.\.\//.test(name)) {
                                throw new Error("module name embeds /../: " + name);
                            }
                            if (name[0] === "." && refererName) return resolveUrl(refererName, name);
                            return canonicalizeUrl(name);
                        },
                        get: function(normalizedName) {
                            var m = getUncoatedModuleInstantiator(normalizedName);
                            if (!m) return undefined;
                            var moduleInstance = moduleInstances[m.url];
                            if (moduleInstance) return moduleInstance;
                            moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
                            return moduleInstances[m.url] = moduleInstance;
                        },
                        set: function(normalizedName, module) {
                            normalizedName = String(normalizedName);
                            moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, function() {
                                return module;
                            });
                            moduleInstances[normalizedName] = module;
                        },
                        get baseURL() {
                            return baseURL;
                        },
                        set baseURL(v) {
                            baseURL = String(v);
                        },
                        registerModule: function(name, func) {
                            var normalizedName = ModuleStore.normalize(name);
                            if (moduleInstantiators[normalizedName]) throw new Error("duplicate module named " + normalizedName);
                            moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
                        },
                        bundleStore: Object.create(null),
                        register: function(name, deps, func) {
                            if (!deps || !deps.length && !func.length) {
                                this.registerModule(name, func);
                            } else {
                                this.bundleStore[name] = {
                                    deps: deps,
                                    execute: function() {
                                        var $__0 = arguments;
                                        var depMap = {};
                                        deps.forEach(function(dep, index) {
                                            return depMap[dep] = $__0[index];
                                        });
                                        var registryEntry = func.call(this, depMap);
                                        registryEntry.execute.call(this);
                                        return registryEntry.exports;
                                    }
                                };
                            }
                        },
                        getAnonymousModule: function(func) {
                            return new Module(func.call(global), liveModuleSentinel);
                        },
                        getForTesting: function(name) {
                            var $__0 = this;
                            if (!this.testingPrefix_) {
                                Object.keys(moduleInstances).some(function(key) {
                                    var m = /(traceur@[^\/]*\/)/.exec(key);
                                    if (m) {
                                        $__0.testingPrefix_ = m[1];
                                        return true;
                                    }
                                });
                            }
                            return this.get(this.testingPrefix_ + name);
                        }
                    };
                    ModuleStore.set("@traceur/src/runtime/ModuleStore", new Module({
                        ModuleStore: ModuleStore
                    }));
                    var setupGlobals = $traceurRuntime.setupGlobals;
                    $traceurRuntime.setupGlobals = function(global) {
                        setupGlobals(global);
                    };
                    $traceurRuntime.ModuleStore = ModuleStore;
                    global.System = {
                        register: ModuleStore.register.bind(ModuleStore),
                        get: ModuleStore.get,
                        set: ModuleStore.set,
                        normalize: ModuleStore.normalize
                    };
                    $traceurRuntime.getModuleImpl = function(name) {
                        var instantiator = getUncoatedModuleInstantiator(name);
                        return instantiator && instantiator.getUncoatedModule();
                    };
                })(typeof global !== "undefined" ? global : this);
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/utils", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/utils";
                    var $ceil = Math.ceil;
                    var $floor = Math.floor;
                    var $isFinite = isFinite;
                    var $isNaN = isNaN;
                    var $pow = Math.pow;
                    var $min = Math.min;
                    var toObject = $traceurRuntime.toObject;
                    function toUint32(x) {
                        return x >>> 0;
                    }
                    function isObject(x) {
                        return x && (typeof x === "object" || typeof x === "function");
                    }
                    function isCallable(x) {
                        return typeof x === "function";
                    }
                    function isNumber(x) {
                        return typeof x === "number";
                    }
                    function toInteger(x) {
                        x = +x;
                        if ($isNaN(x)) return 0;
                        if (x === 0 || !$isFinite(x)) return x;
                        return x > 0 ? $floor(x) : $ceil(x);
                    }
                    var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
                    function toLength(x) {
                        var len = toInteger(x);
                        return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
                    }
                    function checkIterable(x) {
                        return !isObject(x) ? undefined : x[Symbol.iterator];
                    }
                    function isConstructor(x) {
                        return isCallable(x);
                    }
                    function createIteratorResultObject(value, done) {
                        return {
                            value: value,
                            done: done
                        };
                    }
                    function maybeDefine(object, name, descr) {
                        if (!(name in object)) {
                            Object.defineProperty(object, name, descr);
                        }
                    }
                    function maybeDefineMethod(object, name, value) {
                        maybeDefine(object, name, {
                            value: value,
                            configurable: true,
                            enumerable: false,
                            writable: true
                        });
                    }
                    function maybeDefineConst(object, name, value) {
                        maybeDefine(object, name, {
                            value: value,
                            configurable: false,
                            enumerable: false,
                            writable: false
                        });
                    }
                    function maybeAddFunctions(object, functions) {
                        for (var i = 0; i < functions.length; i += 2) {
                            var name = functions[i];
                            var value = functions[i + 1];
                            maybeDefineMethod(object, name, value);
                        }
                    }
                    function maybeAddConsts(object, consts) {
                        for (var i = 0; i < consts.length; i += 2) {
                            var name = consts[i];
                            var value = consts[i + 1];
                            maybeDefineConst(object, name, value);
                        }
                    }
                    function maybeAddIterator(object, func, Symbol) {
                        if (!Symbol || !Symbol.iterator || object[Symbol.iterator]) return;
                        if (object["@@iterator"]) func = object["@@iterator"];
                        Object.defineProperty(object, Symbol.iterator, {
                            value: func,
                            configurable: true,
                            enumerable: false,
                            writable: true
                        });
                    }
                    var polyfills = [];
                    function registerPolyfill(func) {
                        polyfills.push(func);
                    }
                    function polyfillAll(global) {
                        polyfills.forEach(function(f) {
                            return f(global);
                        });
                    }
                    return {
                        get toObject() {
                            return toObject;
                        },
                        get toUint32() {
                            return toUint32;
                        },
                        get isObject() {
                            return isObject;
                        },
                        get isCallable() {
                            return isCallable;
                        },
                        get isNumber() {
                            return isNumber;
                        },
                        get toInteger() {
                            return toInteger;
                        },
                        get toLength() {
                            return toLength;
                        },
                        get checkIterable() {
                            return checkIterable;
                        },
                        get isConstructor() {
                            return isConstructor;
                        },
                        get createIteratorResultObject() {
                            return createIteratorResultObject;
                        },
                        get maybeDefine() {
                            return maybeDefine;
                        },
                        get maybeDefineMethod() {
                            return maybeDefineMethod;
                        },
                        get maybeDefineConst() {
                            return maybeDefineConst;
                        },
                        get maybeAddFunctions() {
                            return maybeAddFunctions;
                        },
                        get maybeAddConsts() {
                            return maybeAddConsts;
                        },
                        get maybeAddIterator() {
                            return maybeAddIterator;
                        },
                        get registerPolyfill() {
                            return registerPolyfill;
                        },
                        get polyfillAll() {
                            return polyfillAll;
                        }
                    };
                });
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Map", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Map";
                    var $__3 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), isObject = $__3.isObject, maybeAddIterator = $__3.maybeAddIterator, registerPolyfill = $__3.registerPolyfill;
                    var getOwnHashObject = $traceurRuntime.getOwnHashObject;
                    var $hasOwnProperty = Object.prototype.hasOwnProperty;
                    var deletedSentinel = {};
                    function lookupIndex(map, key) {
                        if (isObject(key)) {
                            var hashObject = getOwnHashObject(key);
                            return hashObject && map.objectIndex_[hashObject.hash];
                        }
                        if (typeof key === "string") return map.stringIndex_[key];
                        return map.primitiveIndex_[key];
                    }
                    function initMap(map) {
                        map.entries_ = [];
                        map.objectIndex_ = Object.create(null);
                        map.stringIndex_ = Object.create(null);
                        map.primitiveIndex_ = Object.create(null);
                        map.deletedCount_ = 0;
                    }
                    var Map = function Map() {
                        var iterable = arguments[0];
                        if (!isObject(this)) throw new TypeError("Map called on incompatible type");
                        if ($hasOwnProperty.call(this, "entries_")) {
                            throw new TypeError("Map can not be reentrantly initialised");
                        }
                        initMap(this);
                        if (iterable !== null && iterable !== undefined) {
                            for (var $__5 = iterable[Symbol.iterator](), $__6; !($__6 = $__5.next()).done; ) {
                                var $__7 = $__6.value, key = $__7[0], value = $__7[1];
                                {
                                    this.set(key, value);
                                }
                            }
                        }
                    };
                    $traceurRuntime.createClass(Map, {
                        get size() {
                            return this.entries_.length / 2 - this.deletedCount_;
                        },
                        get: function(key) {
                            var index = lookupIndex(this, key);
                            if (index !== undefined) return this.entries_[index + 1];
                        },
                        set: function(key, value) {
                            var objectMode = isObject(key);
                            var stringMode = typeof key === "string";
                            var index = lookupIndex(this, key);
                            if (index !== undefined) {
                                this.entries_[index + 1] = value;
                            } else {
                                index = this.entries_.length;
                                this.entries_[index] = key;
                                this.entries_[index + 1] = value;
                                if (objectMode) {
                                    var hashObject = getOwnHashObject(key);
                                    var hash = hashObject.hash;
                                    this.objectIndex_[hash] = index;
                                } else if (stringMode) {
                                    this.stringIndex_[key] = index;
                                } else {
                                    this.primitiveIndex_[key] = index;
                                }
                            }
                            return this;
                        },
                        has: function(key) {
                            return lookupIndex(this, key) !== undefined;
                        },
                        "delete": function(key) {
                            var objectMode = isObject(key);
                            var stringMode = typeof key === "string";
                            var index;
                            var hash;
                            if (objectMode) {
                                var hashObject = getOwnHashObject(key);
                                if (hashObject) {
                                    index = this.objectIndex_[hash = hashObject.hash];
                                    delete this.objectIndex_[hash];
                                }
                            } else if (stringMode) {
                                index = this.stringIndex_[key];
                                delete this.stringIndex_[key];
                            } else {
                                index = this.primitiveIndex_[key];
                                delete this.primitiveIndex_[key];
                            }
                            if (index !== undefined) {
                                this.entries_[index] = deletedSentinel;
                                this.entries_[index + 1] = undefined;
                                this.deletedCount_++;
                                return true;
                            }
                            return false;
                        },
                        clear: function() {
                            initMap(this);
                        },
                        forEach: function(callbackFn) {
                            var thisArg = arguments[1];
                            for (var i = 0; i < this.entries_.length; i += 2) {
                                var key = this.entries_[i];
                                var value = this.entries_[i + 1];
                                if (key === deletedSentinel) continue;
                                callbackFn.call(thisArg, value, key, this);
                            }
                        },
                        entries: $traceurRuntime.initGeneratorFunction(function $__8() {
                            var i, key, value;
                            return $traceurRuntime.createGeneratorInstance(function($ctx) {
                                while (true) switch ($ctx.state) {
                                  case 0:
                                    i = 0;
                                    $ctx.state = 12;
                                    break;

                                  case 12:
                                    $ctx.state = i < this.entries_.length ? 8 : -2;
                                    break;

                                  case 4:
                                    i += 2;
                                    $ctx.state = 12;
                                    break;

                                  case 8:
                                    key = this.entries_[i];
                                    value = this.entries_[i + 1];
                                    $ctx.state = 9;
                                    break;

                                  case 9:
                                    $ctx.state = key === deletedSentinel ? 4 : 6;
                                    break;

                                  case 6:
                                    $ctx.state = 2;
                                    return [ key, value ];

                                  case 2:
                                    $ctx.maybeThrow();
                                    $ctx.state = 4;
                                    break;

                                  default:
                                    return $ctx.end();
                                }
                            }, $__8, this);
                        }),
                        keys: $traceurRuntime.initGeneratorFunction(function $__9() {
                            var i, key, value;
                            return $traceurRuntime.createGeneratorInstance(function($ctx) {
                                while (true) switch ($ctx.state) {
                                  case 0:
                                    i = 0;
                                    $ctx.state = 12;
                                    break;

                                  case 12:
                                    $ctx.state = i < this.entries_.length ? 8 : -2;
                                    break;

                                  case 4:
                                    i += 2;
                                    $ctx.state = 12;
                                    break;

                                  case 8:
                                    key = this.entries_[i];
                                    value = this.entries_[i + 1];
                                    $ctx.state = 9;
                                    break;

                                  case 9:
                                    $ctx.state = key === deletedSentinel ? 4 : 6;
                                    break;

                                  case 6:
                                    $ctx.state = 2;
                                    return key;

                                  case 2:
                                    $ctx.maybeThrow();
                                    $ctx.state = 4;
                                    break;

                                  default:
                                    return $ctx.end();
                                }
                            }, $__9, this);
                        }),
                        values: $traceurRuntime.initGeneratorFunction(function $__10() {
                            var i, key, value;
                            return $traceurRuntime.createGeneratorInstance(function($ctx) {
                                while (true) switch ($ctx.state) {
                                  case 0:
                                    i = 0;
                                    $ctx.state = 12;
                                    break;

                                  case 12:
                                    $ctx.state = i < this.entries_.length ? 8 : -2;
                                    break;

                                  case 4:
                                    i += 2;
                                    $ctx.state = 12;
                                    break;

                                  case 8:
                                    key = this.entries_[i];
                                    value = this.entries_[i + 1];
                                    $ctx.state = 9;
                                    break;

                                  case 9:
                                    $ctx.state = key === deletedSentinel ? 4 : 6;
                                    break;

                                  case 6:
                                    $ctx.state = 2;
                                    return value;

                                  case 2:
                                    $ctx.maybeThrow();
                                    $ctx.state = 4;
                                    break;

                                  default:
                                    return $ctx.end();
                                }
                            }, $__10, this);
                        })
                    }, {});
                    Object.defineProperty(Map.prototype, Symbol.iterator, {
                        configurable: true,
                        writable: true,
                        value: Map.prototype.entries
                    });
                    function polyfillMap(global) {
                        var $__7 = global, Object = $__7.Object, Symbol = $__7.Symbol;
                        if (!global.Map) global.Map = Map;
                        var mapPrototype = global.Map.prototype;
                        if (mapPrototype.entries) {
                            maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
                            maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
                                return this;
                            }, Symbol);
                        }
                    }
                    registerPolyfill(polyfillMap);
                    return {
                        get Map() {
                            return Map;
                        },
                        get polyfillMap() {
                            return polyfillMap;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Set";
                    var $__11 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), isObject = $__11.isObject, maybeAddIterator = $__11.maybeAddIterator, registerPolyfill = $__11.registerPolyfill;
                    var Map = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map;
                    var getOwnHashObject = $traceurRuntime.getOwnHashObject;
                    var $hasOwnProperty = Object.prototype.hasOwnProperty;
                    function initSet(set) {
                        set.map_ = new Map();
                    }
                    var Set = function Set() {
                        var iterable = arguments[0];
                        if (!isObject(this)) throw new TypeError("Set called on incompatible type");
                        if ($hasOwnProperty.call(this, "map_")) {
                            throw new TypeError("Set can not be reentrantly initialised");
                        }
                        initSet(this);
                        if (iterable !== null && iterable !== undefined) {
                            for (var $__15 = iterable[Symbol.iterator](), $__16; !($__16 = $__15.next()).done; ) {
                                var item = $__16.value;
                                {
                                    this.add(item);
                                }
                            }
                        }
                    };
                    $traceurRuntime.createClass(Set, {
                        get size() {
                            return this.map_.size;
                        },
                        has: function(key) {
                            return this.map_.has(key);
                        },
                        add: function(key) {
                            this.map_.set(key, key);
                            return this;
                        },
                        "delete": function(key) {
                            return this.map_.delete(key);
                        },
                        clear: function() {
                            return this.map_.clear();
                        },
                        forEach: function(callbackFn) {
                            var thisArg = arguments[1];
                            var $__13 = this;
                            return this.map_.forEach(function(value, key) {
                                callbackFn.call(thisArg, key, key, $__13);
                            });
                        },
                        values: $traceurRuntime.initGeneratorFunction(function $__18() {
                            var $__19, $__20;
                            return $traceurRuntime.createGeneratorInstance(function($ctx) {
                                while (true) switch ($ctx.state) {
                                  case 0:
                                    $__19 = this.map_.keys()[Symbol.iterator]();
                                    $ctx.sent = void 0;
                                    $ctx.action = "next";
                                    $ctx.state = 12;
                                    break;

                                  case 12:
                                    $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
                                    $ctx.state = 9;
                                    break;

                                  case 9:
                                    $ctx.state = $__20.done ? 3 : 2;
                                    break;

                                  case 3:
                                    $ctx.sent = $__20.value;
                                    $ctx.state = -2;
                                    break;

                                  case 2:
                                    $ctx.state = 12;
                                    return $__20.value;

                                  default:
                                    return $ctx.end();
                                }
                            }, $__18, this);
                        }),
                        entries: $traceurRuntime.initGeneratorFunction(function $__21() {
                            var $__22, $__23;
                            return $traceurRuntime.createGeneratorInstance(function($ctx) {
                                while (true) switch ($ctx.state) {
                                  case 0:
                                    $__22 = this.map_.entries()[Symbol.iterator]();
                                    $ctx.sent = void 0;
                                    $ctx.action = "next";
                                    $ctx.state = 12;
                                    break;

                                  case 12:
                                    $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
                                    $ctx.state = 9;
                                    break;

                                  case 9:
                                    $ctx.state = $__23.done ? 3 : 2;
                                    break;

                                  case 3:
                                    $ctx.sent = $__23.value;
                                    $ctx.state = -2;
                                    break;

                                  case 2:
                                    $ctx.state = 12;
                                    return $__23.value;

                                  default:
                                    return $ctx.end();
                                }
                            }, $__21, this);
                        })
                    }, {});
                    Object.defineProperty(Set.prototype, Symbol.iterator, {
                        configurable: true,
                        writable: true,
                        value: Set.prototype.values
                    });
                    Object.defineProperty(Set.prototype, "keys", {
                        configurable: true,
                        writable: true,
                        value: Set.prototype.values
                    });
                    function polyfillSet(global) {
                        var $__17 = global, Object = $__17.Object, Symbol = $__17.Symbol;
                        if (!global.Set) global.Set = Set;
                        var setPrototype = global.Set.prototype;
                        if (setPrototype.values) {
                            maybeAddIterator(setPrototype, setPrototype.values, Symbol);
                            maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
                                return this;
                            }, Symbol);
                        }
                    }
                    registerPolyfill(polyfillSet);
                    return {
                        get Set() {
                            return Set;
                        },
                        get polyfillSet() {
                            return polyfillSet;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set" + "");
                System.register("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap";
                    var len = 0;
                    function asap(callback, arg) {
                        queue[len] = callback;
                        queue[len + 1] = arg;
                        len += 2;
                        if (len === 2) {
                            scheduleFlush();
                        }
                    }
                    var $__default = asap;
                    var browserGlobal = typeof window !== "undefined" ? window : {};
                    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
                    var isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
                    function useNextTick() {
                        return function() {
                            process.nextTick(flush);
                        };
                    }
                    function useMutationObserver() {
                        var iterations = 0;
                        var observer = new BrowserMutationObserver(flush);
                        var node = document.createTextNode("");
                        observer.observe(node, {
                            characterData: true
                        });
                        return function() {
                            node.data = iterations = ++iterations % 2;
                        };
                    }
                    function useMessageChannel() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = flush;
                        return function() {
                            channel.port2.postMessage(0);
                        };
                    }
                    function useSetTimeout() {
                        return function() {
                            setTimeout(flush, 1);
                        };
                    }
                    var queue = new Array(1e3);
                    function flush() {
                        for (var i = 0; i < len; i += 2) {
                            var callback = queue[i];
                            var arg = queue[i + 1];
                            callback(arg);
                            queue[i] = undefined;
                            queue[i + 1] = undefined;
                        }
                        len = 0;
                    }
                    var scheduleFlush;
                    if (typeof process !== "undefined" && {}.toString.call(process) === "[object process]") {
                        scheduleFlush = useNextTick();
                    } else if (BrowserMutationObserver) {
                        scheduleFlush = useMutationObserver();
                    } else if (isWorker) {
                        scheduleFlush = useMessageChannel();
                    } else {
                        scheduleFlush = useSetTimeout();
                    }
                    return {
                        get default() {
                            return $__default;
                        }
                    };
                });
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Promise";
                    var async = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").default;
                    var registerPolyfill = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill;
                    var promiseRaw = {};
                    function isPromise(x) {
                        return x && typeof x === "object" && x.status_ !== undefined;
                    }
                    function idResolveHandler(x) {
                        return x;
                    }
                    function idRejectHandler(x) {
                        throw x;
                    }
                    function chain(promise) {
                        var onResolve = arguments[1] !== void 0 ? arguments[1] : idResolveHandler;
                        var onReject = arguments[2] !== void 0 ? arguments[2] : idRejectHandler;
                        var deferred = getDeferred(promise.constructor);
                        switch (promise.status_) {
                          case undefined:
                            throw TypeError;

                          case 0:
                            promise.onResolve_.push(onResolve, deferred);
                            promise.onReject_.push(onReject, deferred);
                            break;

                          case +1:
                            promiseEnqueue(promise.value_, [ onResolve, deferred ]);
                            break;

                          case -1:
                            promiseEnqueue(promise.value_, [ onReject, deferred ]);
                            break;
                        }
                        return deferred.promise;
                    }
                    function getDeferred(C) {
                        if (this === $Promise) {
                            var promise = promiseInit(new $Promise(promiseRaw));
                            return {
                                promise: promise,
                                resolve: function(x) {
                                    promiseResolve(promise, x);
                                },
                                reject: function(r) {
                                    promiseReject(promise, r);
                                }
                            };
                        } else {
                            var result = {};
                            result.promise = new C(function(resolve, reject) {
                                result.resolve = resolve;
                                result.reject = reject;
                            });
                            return result;
                        }
                    }
                    function promiseSet(promise, status, value, onResolve, onReject) {
                        promise.status_ = status;
                        promise.value_ = value;
                        promise.onResolve_ = onResolve;
                        promise.onReject_ = onReject;
                        return promise;
                    }
                    function promiseInit(promise) {
                        return promiseSet(promise, 0, undefined, [], []);
                    }
                    var Promise = function Promise(resolver) {
                        if (resolver === promiseRaw) return;
                        if (typeof resolver !== "function") throw new TypeError();
                        var promise = promiseInit(this);
                        try {
                            resolver(function(x) {
                                promiseResolve(promise, x);
                            }, function(r) {
                                promiseReject(promise, r);
                            });
                        } catch (e) {
                            promiseReject(promise, e);
                        }
                    };
                    $traceurRuntime.createClass(Promise, {
                        "catch": function(onReject) {
                            return this.then(undefined, onReject);
                        },
                        then: function(onResolve, onReject) {
                            if (typeof onResolve !== "function") onResolve = idResolveHandler;
                            if (typeof onReject !== "function") onReject = idRejectHandler;
                            var that = this;
                            var constructor = this.constructor;
                            return chain(this, function(x) {
                                x = promiseCoerce(constructor, x);
                                return x === that ? onReject(new TypeError()) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
                            }, onReject);
                        }
                    }, {
                        resolve: function(x) {
                            if (this === $Promise) {
                                if (isPromise(x)) {
                                    return x;
                                }
                                return promiseSet(new $Promise(promiseRaw), +1, x);
                            } else {
                                return new this(function(resolve, reject) {
                                    resolve(x);
                                });
                            }
                        },
                        reject: function(r) {
                            if (this === $Promise) {
                                return promiseSet(new $Promise(promiseRaw), -1, r);
                            } else {
                                return new this(function(resolve, reject) {
                                    reject(r);
                                });
                            }
                        },
                        all: function(values) {
                            var deferred = getDeferred(this);
                            var resolutions = [];
                            try {
                                var count = values.length;
                                if (count === 0) {
                                    deferred.resolve(resolutions);
                                } else {
                                    for (var i = 0; i < values.length; i++) {
                                        this.resolve(values[i]).then(function(i, x) {
                                            resolutions[i] = x;
                                            if (--count === 0) deferred.resolve(resolutions);
                                        }.bind(undefined, i), function(r) {
                                            deferred.reject(r);
                                        });
                                    }
                                }
                            } catch (e) {
                                deferred.reject(e);
                            }
                            return deferred.promise;
                        },
                        race: function(values) {
                            var deferred = getDeferred(this);
                            try {
                                for (var i = 0; i < values.length; i++) {
                                    this.resolve(values[i]).then(function(x) {
                                        deferred.resolve(x);
                                    }, function(r) {
                                        deferred.reject(r);
                                    });
                                }
                            } catch (e) {
                                deferred.reject(e);
                            }
                            return deferred.promise;
                        }
                    });
                    var $Promise = Promise;
                    var $PromiseReject = $Promise.reject;
                    function promiseResolve(promise, x) {
                        promiseDone(promise, +1, x, promise.onResolve_);
                    }
                    function promiseReject(promise, r) {
                        promiseDone(promise, -1, r, promise.onReject_);
                    }
                    function promiseDone(promise, status, value, reactions) {
                        if (promise.status_ !== 0) return;
                        promiseEnqueue(value, reactions);
                        promiseSet(promise, status, value);
                    }
                    function promiseEnqueue(value, tasks) {
                        async(function() {
                            for (var i = 0; i < tasks.length; i += 2) {
                                promiseHandle(value, tasks[i], tasks[i + 1]);
                            }
                        });
                    }
                    function promiseHandle(value, handler, deferred) {
                        try {
                            var result = handler(value);
                            if (result === deferred.promise) throw new TypeError(); else if (isPromise(result)) chain(result, deferred.resolve, deferred.reject); else deferred.resolve(result);
                        } catch (e) {
                            try {
                                deferred.reject(e);
                            } catch (e) {}
                        }
                    }
                    var thenableSymbol = "@@thenable";
                    function isObject(x) {
                        return x && (typeof x === "object" || typeof x === "function");
                    }
                    function promiseCoerce(constructor, x) {
                        if (!isPromise(x) && isObject(x)) {
                            var then;
                            try {
                                then = x.then;
                            } catch (r) {
                                var promise = $PromiseReject.call(constructor, r);
                                x[thenableSymbol] = promise;
                                return promise;
                            }
                            if (typeof then === "function") {
                                var p = x[thenableSymbol];
                                if (p) {
                                    return p;
                                } else {
                                    var deferred = getDeferred(constructor);
                                    x[thenableSymbol] = deferred.promise;
                                    try {
                                        then.call(x, deferred.resolve, deferred.reject);
                                    } catch (r) {
                                        deferred.reject(r);
                                    }
                                    return deferred.promise;
                                }
                            }
                        }
                        return x;
                    }
                    function polyfillPromise(global) {
                        if (!global.Promise) global.Promise = Promise;
                    }
                    registerPolyfill(polyfillPromise);
                    return {
                        get Promise() {
                            return Promise;
                        },
                        get polyfillPromise() {
                            return polyfillPromise;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function() {
                    "use strict";
                    var $__29;
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator";
                    var $__27 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), createIteratorResultObject = $__27.createIteratorResultObject, isObject = $__27.isObject;
                    var $__30 = $traceurRuntime, hasOwnProperty = $__30.hasOwnProperty, toProperty = $__30.toProperty;
                    var iteratedString = Symbol("iteratedString");
                    var stringIteratorNextIndex = Symbol("stringIteratorNextIndex");
                    var StringIterator = function StringIterator() {};
                    $traceurRuntime.createClass(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
                        value: function() {
                            var o = this;
                            if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
                                throw new TypeError("this must be a StringIterator object");
                            }
                            var s = o[toProperty(iteratedString)];
                            if (s === undefined) {
                                return createIteratorResultObject(undefined, true);
                            }
                            var position = o[toProperty(stringIteratorNextIndex)];
                            var len = s.length;
                            if (position >= len) {
                                o[toProperty(iteratedString)] = undefined;
                                return createIteratorResultObject(undefined, true);
                            }
                            var first = s.charCodeAt(position);
                            var resultString;
                            if (first < 55296 || first > 56319 || position + 1 === len) {
                                resultString = String.fromCharCode(first);
                            } else {
                                var second = s.charCodeAt(position + 1);
                                if (second < 56320 || second > 57343) {
                                    resultString = String.fromCharCode(first);
                                } else {
                                    resultString = String.fromCharCode(first) + String.fromCharCode(second);
                                }
                            }
                            o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
                            return createIteratorResultObject(resultString, false);
                        },
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }), Object.defineProperty($__29, Symbol.iterator, {
                        value: function() {
                            return this;
                        },
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }), $__29), {});
                    function createStringIterator(string) {
                        var s = String(string);
                        var iterator = Object.create(StringIterator.prototype);
                        iterator[toProperty(iteratedString)] = s;
                        iterator[toProperty(stringIteratorNextIndex)] = 0;
                        return iterator;
                    }
                    return {
                        get createStringIterator() {
                            return createStringIterator;
                        }
                    };
                });
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/String";
                    var createStringIterator = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator;
                    var $__32 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), maybeAddFunctions = $__32.maybeAddFunctions, maybeAddIterator = $__32.maybeAddIterator, registerPolyfill = $__32.registerPolyfill;
                    var $toString = Object.prototype.toString;
                    var $indexOf = String.prototype.indexOf;
                    var $lastIndexOf = String.prototype.lastIndexOf;
                    function startsWith(search) {
                        var string = String(this);
                        if (this == null || $toString.call(search) == "[object RegExp]") {
                            throw TypeError();
                        }
                        var stringLength = string.length;
                        var searchString = String(search);
                        var searchLength = searchString.length;
                        var position = arguments.length > 1 ? arguments[1] : undefined;
                        var pos = position ? Number(position) : 0;
                        if (isNaN(pos)) {
                            pos = 0;
                        }
                        var start = Math.min(Math.max(pos, 0), stringLength);
                        return $indexOf.call(string, searchString, pos) == start;
                    }
                    function endsWith(search) {
                        var string = String(this);
                        if (this == null || $toString.call(search) == "[object RegExp]") {
                            throw TypeError();
                        }
                        var stringLength = string.length;
                        var searchString = String(search);
                        var searchLength = searchString.length;
                        var pos = stringLength;
                        if (arguments.length > 1) {
                            var position = arguments[1];
                            if (position !== undefined) {
                                pos = position ? Number(position) : 0;
                                if (isNaN(pos)) {
                                    pos = 0;
                                }
                            }
                        }
                        var end = Math.min(Math.max(pos, 0), stringLength);
                        var start = end - searchLength;
                        if (start < 0) {
                            return false;
                        }
                        return $lastIndexOf.call(string, searchString, start) == start;
                    }
                    function contains(search) {
                        if (this == null) {
                            throw TypeError();
                        }
                        var string = String(this);
                        var stringLength = string.length;
                        var searchString = String(search);
                        var searchLength = searchString.length;
                        var position = arguments.length > 1 ? arguments[1] : undefined;
                        var pos = position ? Number(position) : 0;
                        if (isNaN(pos)) {
                            pos = 0;
                        }
                        var start = Math.min(Math.max(pos, 0), stringLength);
                        return $indexOf.call(string, searchString, pos) != -1;
                    }
                    function repeat(count) {
                        if (this == null) {
                            throw TypeError();
                        }
                        var string = String(this);
                        var n = count ? Number(count) : 0;
                        if (isNaN(n)) {
                            n = 0;
                        }
                        if (n < 0 || n == Infinity) {
                            throw RangeError();
                        }
                        if (n == 0) {
                            return "";
                        }
                        var result = "";
                        while (n--) {
                            result += string;
                        }
                        return result;
                    }
                    function codePointAt(position) {
                        if (this == null) {
                            throw TypeError();
                        }
                        var string = String(this);
                        var size = string.length;
                        var index = position ? Number(position) : 0;
                        if (isNaN(index)) {
                            index = 0;
                        }
                        if (index < 0 || index >= size) {
                            return undefined;
                        }
                        var first = string.charCodeAt(index);
                        var second;
                        if (first >= 55296 && first <= 56319 && size > index + 1) {
                            second = string.charCodeAt(index + 1);
                            if (second >= 56320 && second <= 57343) {
                                return (first - 55296) * 1024 + second - 56320 + 65536;
                            }
                        }
                        return first;
                    }
                    function raw(callsite) {
                        var raw = callsite.raw;
                        var len = raw.length >>> 0;
                        if (len === 0) return "";
                        var s = "";
                        var i = 0;
                        while (true) {
                            s += raw[i];
                            if (i + 1 === len) return s;
                            s += arguments[++i];
                        }
                    }
                    function fromCodePoint() {
                        var codeUnits = [];
                        var floor = Math.floor;
                        var highSurrogate;
                        var lowSurrogate;
                        var index = -1;
                        var length = arguments.length;
                        if (!length) {
                            return "";
                        }
                        while (++index < length) {
                            var codePoint = Number(arguments[index]);
                            if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) != codePoint) {
                                throw RangeError("Invalid code point: " + codePoint);
                            }
                            if (codePoint <= 65535) {
                                codeUnits.push(codePoint);
                            } else {
                                codePoint -= 65536;
                                highSurrogate = (codePoint >> 10) + 55296;
                                lowSurrogate = codePoint % 1024 + 56320;
                                codeUnits.push(highSurrogate, lowSurrogate);
                            }
                        }
                        return String.fromCharCode.apply(null, codeUnits);
                    }
                    function stringPrototypeIterator() {
                        var o = $traceurRuntime.checkObjectCoercible(this);
                        var s = String(o);
                        return createStringIterator(s);
                    }
                    function polyfillString(global) {
                        var String = global.String;
                        maybeAddFunctions(String.prototype, [ "codePointAt", codePointAt, "contains", contains, "endsWith", endsWith, "startsWith", startsWith, "repeat", repeat ]);
                        maybeAddFunctions(String, [ "fromCodePoint", fromCodePoint, "raw", raw ]);
                        maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
                    }
                    registerPolyfill(polyfillString);
                    return {
                        get startsWith() {
                            return startsWith;
                        },
                        get endsWith() {
                            return endsWith;
                        },
                        get contains() {
                            return contains;
                        },
                        get repeat() {
                            return repeat;
                        },
                        get codePointAt() {
                            return codePointAt;
                        },
                        get raw() {
                            return raw;
                        },
                        get fromCodePoint() {
                            return fromCodePoint;
                        },
                        get stringPrototypeIterator() {
                            return stringPrototypeIterator;
                        },
                        get polyfillString() {
                            return polyfillString;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function() {
                    "use strict";
                    var $__36;
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator";
                    var $__34 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), toObject = $__34.toObject, toUint32 = $__34.toUint32, createIteratorResultObject = $__34.createIteratorResultObject;
                    var ARRAY_ITERATOR_KIND_KEYS = 1;
                    var ARRAY_ITERATOR_KIND_VALUES = 2;
                    var ARRAY_ITERATOR_KIND_ENTRIES = 3;
                    var ArrayIterator = function ArrayIterator() {};
                    $traceurRuntime.createClass(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
                        value: function() {
                            var iterator = toObject(this);
                            var array = iterator.iteratorObject_;
                            if (!array) {
                                throw new TypeError("Object is not an ArrayIterator");
                            }
                            var index = iterator.arrayIteratorNextIndex_;
                            var itemKind = iterator.arrayIterationKind_;
                            var length = toUint32(array.length);
                            if (index >= length) {
                                iterator.arrayIteratorNextIndex_ = Infinity;
                                return createIteratorResultObject(undefined, true);
                            }
                            iterator.arrayIteratorNextIndex_ = index + 1;
                            if (itemKind == ARRAY_ITERATOR_KIND_VALUES) return createIteratorResultObject(array[index], false);
                            if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES) return createIteratorResultObject([ index, array[index] ], false);
                            return createIteratorResultObject(index, false);
                        },
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }), Object.defineProperty($__36, Symbol.iterator, {
                        value: function() {
                            return this;
                        },
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }), $__36), {});
                    function createArrayIterator(array, kind) {
                        var object = toObject(array);
                        var iterator = new ArrayIterator();
                        iterator.iteratorObject_ = object;
                        iterator.arrayIteratorNextIndex_ = 0;
                        iterator.arrayIterationKind_ = kind;
                        return iterator;
                    }
                    function entries() {
                        return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
                    }
                    function keys() {
                        return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
                    }
                    function values() {
                        return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
                    }
                    return {
                        get entries() {
                            return entries;
                        },
                        get keys() {
                            return keys;
                        },
                        get values() {
                            return values;
                        }
                    };
                });
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Array";
                    var $__37 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"), entries = $__37.entries, keys = $__37.keys, values = $__37.values;
                    var $__38 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), checkIterable = $__38.checkIterable, isCallable = $__38.isCallable, isConstructor = $__38.isConstructor, maybeAddFunctions = $__38.maybeAddFunctions, maybeAddIterator = $__38.maybeAddIterator, registerPolyfill = $__38.registerPolyfill, toInteger = $__38.toInteger, toLength = $__38.toLength, toObject = $__38.toObject;
                    function from(arrLike) {
                        var mapFn = arguments[1];
                        var thisArg = arguments[2];
                        var C = this;
                        var items = toObject(arrLike);
                        var mapping = mapFn !== undefined;
                        var k = 0;
                        var arr, len;
                        if (mapping && !isCallable(mapFn)) {
                            throw TypeError();
                        }
                        if (checkIterable(items)) {
                            arr = isConstructor(C) ? new C() : [];
                            for (var $__39 = items[Symbol.iterator](), $__40; !($__40 = $__39.next()).done; ) {
                                var item = $__40.value;
                                {
                                    if (mapping) {
                                        arr[k] = mapFn.call(thisArg, item, k);
                                    } else {
                                        arr[k] = item;
                                    }
                                    k++;
                                }
                            }
                            arr.length = k;
                            return arr;
                        }
                        len = toLength(items.length);
                        arr = isConstructor(C) ? new C(len) : new Array(len);
                        for (;k < len; k++) {
                            if (mapping) {
                                arr[k] = typeof thisArg === "undefined" ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
                            } else {
                                arr[k] = items[k];
                            }
                        }
                        arr.length = len;
                        return arr;
                    }
                    function of() {
                        for (var items = [], $__41 = 0; $__41 < arguments.length; $__41++) items[$__41] = arguments[$__41];
                        var C = this;
                        var len = items.length;
                        var arr = isConstructor(C) ? new C(len) : new Array(len);
                        for (var k = 0; k < len; k++) {
                            arr[k] = items[k];
                        }
                        arr.length = len;
                        return arr;
                    }
                    function fill(value) {
                        var start = arguments[1] !== void 0 ? arguments[1] : 0;
                        var end = arguments[2];
                        var object = toObject(this);
                        var len = toLength(object.length);
                        var fillStart = toInteger(start);
                        var fillEnd = end !== undefined ? toInteger(end) : len;
                        fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
                        fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
                        while (fillStart < fillEnd) {
                            object[fillStart] = value;
                            fillStart++;
                        }
                        return object;
                    }
                    function find(predicate) {
                        var thisArg = arguments[1];
                        return findHelper(this, predicate, thisArg);
                    }
                    function findIndex(predicate) {
                        var thisArg = arguments[1];
                        return findHelper(this, predicate, thisArg, true);
                    }
                    function findHelper(self, predicate) {
                        var thisArg = arguments[2];
                        var returnIndex = arguments[3] !== void 0 ? arguments[3] : false;
                        var object = toObject(self);
                        var len = toLength(object.length);
                        if (!isCallable(predicate)) {
                            throw TypeError();
                        }
                        for (var i = 0; i < len; i++) {
                            if (i in object) {
                                var value = object[i];
                                if (predicate.call(thisArg, value, i, object)) {
                                    return returnIndex ? i : value;
                                }
                            }
                        }
                        return returnIndex ? -1 : undefined;
                    }
                    function polyfillArray(global) {
                        var $__42 = global, Array = $__42.Array, Object = $__42.Object, Symbol = $__42.Symbol;
                        maybeAddFunctions(Array.prototype, [ "entries", entries, "keys", keys, "values", values, "fill", fill, "find", find, "findIndex", findIndex ]);
                        maybeAddFunctions(Array, [ "from", from, "of", of ]);
                        maybeAddIterator(Array.prototype, values, Symbol);
                        maybeAddIterator(Object.getPrototypeOf([].values()), function() {
                            return this;
                        }, Symbol);
                    }
                    registerPolyfill(polyfillArray);
                    return {
                        get from() {
                            return from;
                        },
                        get of() {
                            return of;
                        },
                        get fill() {
                            return fill;
                        },
                        get find() {
                            return find;
                        },
                        get findIndex() {
                            return findIndex;
                        },
                        get polyfillArray() {
                            return polyfillArray;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Object";
                    var $__43 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), maybeAddFunctions = $__43.maybeAddFunctions, registerPolyfill = $__43.registerPolyfill;
                    var $__44 = $traceurRuntime, defineProperty = $__44.defineProperty, getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor, getOwnPropertyNames = $__44.getOwnPropertyNames, keys = $__44.keys, privateNames = $__44.privateNames;
                    function is(left, right) {
                        if (left === right) return left !== 0 || 1 / left === 1 / right;
                        return left !== left && right !== right;
                    }
                    function assign(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            var props = keys(source);
                            var p, length = props.length;
                            for (p = 0; p < length; p++) {
                                var name = props[p];
                                if (privateNames[name]) continue;
                                target[name] = source[name];
                            }
                        }
                        return target;
                    }
                    function mixin(target, source) {
                        var props = getOwnPropertyNames(source);
                        var p, descriptor, length = props.length;
                        for (p = 0; p < length; p++) {
                            var name = props[p];
                            if (privateNames[name]) continue;
                            descriptor = getOwnPropertyDescriptor(source, props[p]);
                            defineProperty(target, props[p], descriptor);
                        }
                        return target;
                    }
                    function polyfillObject(global) {
                        var Object = global.Object;
                        maybeAddFunctions(Object, [ "assign", assign, "is", is, "mixin", mixin ]);
                    }
                    registerPolyfill(polyfillObject);
                    return {
                        get is() {
                            return is;
                        },
                        get assign() {
                            return assign;
                        },
                        get mixin() {
                            return mixin;
                        },
                        get polyfillObject() {
                            return polyfillObject;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Number";
                    var $__46 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"), isNumber = $__46.isNumber, maybeAddConsts = $__46.maybeAddConsts, maybeAddFunctions = $__46.maybeAddFunctions, registerPolyfill = $__46.registerPolyfill, toInteger = $__46.toInteger;
                    var $abs = Math.abs;
                    var $isFinite = isFinite;
                    var $isNaN = isNaN;
                    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
                    var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
                    var EPSILON = Math.pow(2, -52);
                    function NumberIsFinite(number) {
                        return isNumber(number) && $isFinite(number);
                    }
                    function isInteger(number) {
                        return NumberIsFinite(number) && toInteger(number) === number;
                    }
                    function NumberIsNaN(number) {
                        return isNumber(number) && $isNaN(number);
                    }
                    function isSafeInteger(number) {
                        if (NumberIsFinite(number)) {
                            var integral = toInteger(number);
                            if (integral === number) return $abs(integral) <= MAX_SAFE_INTEGER;
                        }
                        return false;
                    }
                    function polyfillNumber(global) {
                        var Number = global.Number;
                        maybeAddConsts(Number, [ "MAX_SAFE_INTEGER", MAX_SAFE_INTEGER, "MIN_SAFE_INTEGER", MIN_SAFE_INTEGER, "EPSILON", EPSILON ]);
                        maybeAddFunctions(Number, [ "isFinite", NumberIsFinite, "isInteger", isInteger, "isNaN", NumberIsNaN, "isSafeInteger", isSafeInteger ]);
                    }
                    registerPolyfill(polyfillNumber);
                    return {
                        get MAX_SAFE_INTEGER() {
                            return MAX_SAFE_INTEGER;
                        },
                        get MIN_SAFE_INTEGER() {
                            return MIN_SAFE_INTEGER;
                        },
                        get EPSILON() {
                            return EPSILON;
                        },
                        get isFinite() {
                            return NumberIsFinite;
                        },
                        get isInteger() {
                            return isInteger;
                        },
                        get isNaN() {
                            return NumberIsNaN;
                        },
                        get isSafeInteger() {
                            return isSafeInteger;
                        },
                        get polyfillNumber() {
                            return polyfillNumber;
                        }
                    };
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number" + "");
                System.register("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills", [], function() {
                    "use strict";
                    var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/polyfills";
                    var polyfillAll = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").polyfillAll;
                    polyfillAll(this);
                    var setupGlobals = $traceurRuntime.setupGlobals;
                    $traceurRuntime.setupGlobals = function(global) {
                        setupGlobals(global);
                        polyfillAll(global);
                    };
                    return {};
                });
                System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills" + "");
            }).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {
            _process: 55
        } ]
    }, {}, [ 14 ])(14);
});