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
        "use strict";
        var View = require("Wildcat.View.View");
        var IntroView = function IntroView() {
            $traceurRuntime.defaultSuperCall(this, $IntroView.prototype, arguments);
        };
        var $IntroView = IntroView;
        $traceurRuntime.createClass(IntroView, {
            postReport: function(name, incident) {
                var command = this.app.make("postReportCommand", [ name, incident ]);
                this.execute(command);
            }
        }, {}, View);
        module.exports = IntroView;
    }, {
        "Wildcat.View.View": 36
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
                var $__1 = $traceurRuntime.assertObject(command), name = $__1.name, incident = $__1.incident;
                var app = $traceurRuntime.assertObject($this).app;
                var Report = app.make("Report");
                async($traceurRuntime.initGeneratorFunction(function $__2() {
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
                    }, $__2, this);
                }))().catch(terminateError);
            }
        }, {}, CommandHandler);
        var $__1 = $traceurRuntime.assertObject(helpers), terminateError = $__1.terminateError, async = $__1.async;
        module.exports = PostReportCommandHandler;
    }, {
        "Wildcat.Commander.CommandHandler": 16,
        "Wildcat.Support.helpers": 33
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        var ReportWasPosted = function ReportWasPosted(report) {
            this.report = report;
        };
        $traceurRuntime.createClass(ReportWasPosted, {
            getName: function() {
                return "reportWasPosted";
            }
        }, {});
        module.exports = ReportWasPosted;
    }, {} ],
    5: [ function(require, module, exports) {
        "use strict";
        var EventGenerator = require("Wildcat.Commander.Events.EventGenerator");
        var helpers = require("Wildcat.Support.helpers");
        var Report = function Report(name, incident) {
            this.name = name;
            this.incident = incident;
            EventGenerator.call(this);
        };
        var $Report = Report;
        $traceurRuntime.createClass(Report, {}, {
            post: function() {
                for (var args = [], $__1 = 0; $__1 < arguments.length; $__1++) args[$__1] = arguments[$__1];
                var app = $Report.getApplication();
                var reportRepository = $traceurRuntime.assertObject(app).reportRepository;
                return async($traceurRuntime.initGeneratorFunction(function $__3() {
                    var report, event;
                    return $traceurRuntime.createGeneratorInstance(function($ctx) {
                        while (true) switch ($ctx.state) {
                          case 0:
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
                    }, $__3, this);
                }))();
            },
            getApplication: function() {
                return $Report.app_;
            },
            setApplication: function(app) {
                $Report.app_ = app;
            }
        });
        var $__2 = $traceurRuntime.assertObject(helpers), log = $__2.log, extendProtoOf = $__2.extendProtoOf;
        extendProtoOf(Report, EventGenerator);
        module.exports = Report;
    }, {
        "Wildcat.Commander.Events.EventGenerator": 21,
        "Wildcat.Support.helpers": 33
    } ],
    6: [ function(require, module, exports) {
        "use strict";
        var ServiceProvider = require("Wildcat.Support.ServiceProvider");
        var Report = require("App.Entities.Reports.Report");
        var ReportWasPosted = require("App.Entities.Reports.Events.ReportWasPosted");
        var ReportRepository = require("App.Repositories.ReportRepository");
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
                Report.setApplication(app);
                return Report;
            });
            app.bind("report", function(app) {
                for (var args = [], $__1 = 1; $__1 < arguments.length; $__1++) args[$__1 - 1] = arguments[$__1];
                return new (Function.prototype.bind.apply(app.Report, $traceurRuntime.spread([ null ], args)))();
            });
            app.bind("reportWasPosted", function(app) {
                for (var args = [], $__2 = 1; $__2 < arguments.length; $__2++) args[$__2 - 1] = arguments[$__2];
                return new (Function.prototype.bind.apply(ReportWasPosted, $traceurRuntime.spread([ null ], args)))();
            });
        }
        function registerRepositories() {
            var app = this.app;
            app.bindShared("reportRepository", function(app) {
                return new ReportRepository(app);
            });
        }
        var log = $traceurRuntime.assertObject(helpers).log;
        module.exports = AppServiceProvider;
    }, {
        "App.Entities.Reports.Events.ReportWasPosted": 4,
        "App.Entities.Reports.Report": 5,
        "App.Repositories.ReportRepository": 7,
        "Wildcat.Support.ServiceProvider": 32,
        "Wildcat.Support.helpers": 33
    } ],
    7: [ function(require, module, exports) {
        "use strict";
        var helpers = require("Wildcat.Support.helpers");
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
        var $__1 = $traceurRuntime.assertObject(helpers), log = $__1.log, wait = $__1.wait;
        module.exports = ReportRepository;
    }, {
        "Wildcat.Support.helpers": 33
    } ],
    8: [ function(require, module, exports) {
        "use strict";
        var App = require("Wildcat.Foundation.Application");
        window.App = App;
    }, {
        "Wildcat.Foundation.Application": 27
    } ],
    9: [ function(require, module, exports) {
        "use strict";
        var AppServiceProvider = require("App.Providers.AppServiceProvider");
        var LogServiceProvider = require("Wildcat.Log.LogServiceProvider");
        var WindowServiceProvider = require("Wildcat.DOM.WindowServiceProvider");
        var ViewServiceProvider = require("Wildcat.View.ViewServiceProvider");
        var CommanderServiceProvider = require("Wildcat.Commander.CommandServiceProvider");
        module.exports = {
            debug: false,
            providers: [ AppServiceProvider, LogServiceProvider, WindowServiceProvider, ViewServiceProvider, CommanderServiceProvider ],
            locale: "en",
            get browser() {
                return window.navigator.userAgent;
            }
        };
    }, {
        "App.Providers.AppServiceProvider": 6,
        "Wildcat.Commander.CommandServiceProvider": 17,
        "Wildcat.DOM.WindowServiceProvider": 25,
        "Wildcat.Log.LogServiceProvider": 31,
        "Wildcat.View.ViewServiceProvider": 37
    } ],
    10: [ function(require, module, exports) {
        "use strict";
        var PostReportCommand = require("App.Commands.PostReportCommand");
        module.exports = [ {
            "abstract": "postReportCommand",
            command: PostReportCommand
        } ];
    }, {
        "App.Commands.PostReportCommand": 2
    } ],
    11: [ function(require, module, exports) {
        "use strict";
        module.exports = {
            app: require("./app"),
            "local.app": require("./local/app"),
            commands: require("./commands"),
            handlers: require("./handlers"),
            views: require("./views")
        };
    }, {
        "./app": 9,
        "./commands": 10,
        "./handlers": 12,
        "./local/app": 13,
        "./views": 14
    } ],
    12: [ function(require, module, exports) {
        "use strict";
        var PostReportCommandHandler = require("App.Commands.PostReportCommandHandler");
        module.exports = [ {
            "abstract": "postReportCommandHandler",
            handler: PostReportCommandHandler
        } ];
    }, {
        "App.Commands.PostReportCommandHandler": 3
    } ],
    13: [ function(require, module, exports) {
        "use strict";
        module.exports = {
            debug: true
        };
    }, {} ],
    14: [ function(require, module, exports) {
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
    15: [ function(require, module, exports) {
        "use strict";
        var CommandBus = function CommandBus(app) {
            this.app = app;
        };
        $traceurRuntime.createClass(CommandBus, {
            execute: function(command) {
                var commandName = command.constructor.getName();
                var handlerName = commandName + "Handler";
                var handler = this.app.make(handlerName);
                handler.handle(command);
            }
        }, {});
        module.exports = CommandBus;
    }, {} ],
    16: [ function(require, module, exports) {
        "use strict";
        var DispatchableTrait = require("Wildcat.Commander.Events.DispatchableTrait");
        var helpers = require("Wildcat.Support.helpers");
        var CommandHandler = function CommandHandler(app) {
            this.app = app;
        };
        $traceurRuntime.createClass(CommandHandler, {}, {});
        var extendProtoOf = $traceurRuntime.assertObject(helpers).extendProtoOf;
        extendProtoOf(CommandHandler, DispatchableTrait);
        module.exports = CommandHandler;
    }, {
        "Wildcat.Commander.Events.DispatchableTrait": 19,
        "Wildcat.Support.helpers": 33
    } ],
    17: [ function(require, module, exports) {
        "use strict";
        var log = $traceurRuntime.assertObject(require("Wildcat.Support.helpers")).log;
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
                var $__4 = $traceurRuntime.assertObject($__2.value), abstract = $__4.abstract, command = $__4.command;
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
                var $__4 = $traceurRuntime.assertObject($__2.value), abstract = $__4.abstract, handler = $__4.handler;
                {
                    app.bind(abstract, function(app) {
                        for (var args = [], $__3 = 1; $__3 < arguments.length; $__3++) args[$__3 - 1] = arguments[$__3];
                        return new (Function.prototype.bind.apply(handler, $traceurRuntime.spread([ null, app ], args)))();
                    });
                }
            }
        }
        function registerEventDispatcher() {
            var app = this.app;
            var $__4 = $traceurRuntime.assertObject(app), events = $__4.events, log = $__4.log;
            app.bind("eventDispatcher", function(app) {
                return new EventDispatcher(events, log);
            });
        }
        module.exports = CommandServiceProvider;
    }, {
        "Wildcat.Commander.CommandBus": 15,
        "Wildcat.Commander.Events.EventDispatcher": 20,
        "Wildcat.Support.ServiceProvider": 32,
        "Wildcat.Support.helpers": 33
    } ],
    18: [ function(require, module, exports) {
        "use strict";
        var helpers = require("Wildcat.Support.helpers");
        var CommanderTrait = function CommanderTrait() {};
        $traceurRuntime.createClass(CommanderTrait, {
            execute: function(command, input) {
                var bus = this.getCommandBus();
                bus.execute(command);
            },
            getCommandBus: function() {
                return this.app.make("commandBus");
            }
        }, {});
        var log = $traceurRuntime.assertObject(helpers).log;
        module.exports = CommanderTrait;
    }, {
        "Wildcat.Support.helpers": 33
    } ],
    19: [ function(require, module, exports) {
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
    20: [ function(require, module, exports) {
        "use strict";
        var EventDispatcher = function EventDispatcher(event, log) {
            this.event_ = event;
            this.log_ = log;
        };
        $traceurRuntime.createClass(EventDispatcher, {
            dispatch: function(events) {
                for (var $__1 = events[Symbol.iterator](), $__2; !($__2 = $__1.next()).done; ) {
                    var event = $__2.value;
                    {
                        var eventName = getEventName.call(this, event);
                        this.event_.emit(eventName, event);
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
    21: [ function(require, module, exports) {
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
    22: [ function(require, module, exports) {
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
        "Wildcat.Support.state": 35
    } ],
    23: [ function(require, module, exports) {
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
                var environment = $traceurRuntime.assertObject(_).environment;
                var $__1 = $traceurRuntime.assertObject(parseKey(key)), namespace = $__1[0], group = $__1[1], item = $__1[2];
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
        "Wildcat.Support.state": 35
    } ],
    24: [ function(require, module, exports) {
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
                if (Array.isArray(abstract)) {
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
                if (this.abstract) return;
                Object.defineProperty(this, abstract, {
                    get: function() {
                        return this.make(abstract);
                    }
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
        var $__8 = $traceurRuntime.assertObject(helpers), keys = $__8.keys, implementIterator = $__8.implementIterator, isUndefined = $__8.isUndefined, isDefined = $__8.isDefined, defined = $__8.defined, arrayIterator = $__8.arrayIterator, extendProtoOf = $__8.extendProtoOf, noProto = $__8.noProto;
        extendProtoOf(Container, EventEmitter);
        implementIterator(Container);
        module.exports = Container;
    }, {
        "Wildcat.Support.helpers": 33,
        "Wildcat.Support.state": 35,
        events: 38
    } ],
    25: [ function(require, module, exports) {
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
        "Wildcat.Support.ServiceProvider": 32
    } ],
    26: [ function(require, module, exports) {
        "use strict";
        var EventEmitter = require("events").EventEmitter;
        var $__1 = $traceurRuntime.assertObject(require("Wildcat.Support.helpers")), extendProtoOf = $__1.extendProtoOf, isString = $__1.isString;
        var Dispatcher = function Dispatcher(app) {
            this.app_ = app;
            EventEmitter.call(this);
        };
        $traceurRuntime.createClass(Dispatcher, {
            subscribe: function(subscriber) {
                subscriber = resolveSubscriber.call(this);
                subscriber.subscribe(this);
            }
        }, {});
        extendProtoOf(Dispatcher, EventEmitter);
        function resolveSubscriber(subscriber) {
            if (isString(subscriber)) {
                return this.app_[subscriber];
            }
            return subscriber;
        }
        module.exports = Dispatcher;
    }, {
        "Wildcat.Support.helpers": 33,
        events: 38
    } ],
    27: [ function(require, module, exports) {
        "use strict";
        var Container = require("Wildcat.Container.Container");
        var Config = require("Wildcat.Config.Repository");
        var ModuleLoader = require("Wildcat.Config.ModuleLoader");
        var Dispatcher = require("Wildcat.Events.Dispatcher");
        var start = require("Wildcat.Foundation.start");
        var ProviderRepository = require("Wildcat.Foundation.ProviderRepository");
        var config = require("config.config");
        var value = $traceurRuntime.assertObject(require("Wildcat.Support.helpers")).value;
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
                app.bindShared([ [ "config", function(app) {
                    return new Config(configLoader, environment);
                } ], [ "events", function(app) {
                    return new Dispatcher(app);
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
        module.exports = Application;
    }, {
        "Wildcat.Config.ModuleLoader": 22,
        "Wildcat.Config.Repository": 23,
        "Wildcat.Container.Container": 24,
        "Wildcat.Events.Dispatcher": 26,
        "Wildcat.Foundation.ProviderRepository": 28,
        "Wildcat.Foundation.start": 29,
        "Wildcat.Support.helpers": 33,
        "config.config": 11
    } ],
    28: [ function(require, module, exports) {
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
    29: [ function(require, module, exports) {
        "use strict";
        var Config = require("Wildcat.Config.Repository");
        function start() {
            var app = this;
            var env = app.environment();
            var providers, config;
            app.bindShared("app", function() {
                return app;
            });
            app.registerCoreContainerBindings();
            config = app.config;
            providers = config.get("app").providers;
            app.getProviderRepository().load(app, providers);
        }
        module.exports = start;
    }, {
        "Wildcat.Config.Repository": 23
    } ],
    30: [ function(require, module, exports) {
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
                }
            }, {});
            module.exports = ConsoleLogger;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "Wildcat.Support.state": 35
    } ],
    31: [ function(require, module, exports) {
        "use strict";
        var ServiceProvider = require("Wildcat.Support.ServiceProvider");
        var ConsoleLogger = require("Wildcat.Log.ConsoleLogger");
        var LogServiceProvider = function LogServiceProvider() {
            $traceurRuntime.defaultSuperCall(this, $LogServiceProvider.prototype, arguments);
        };
        var $LogServiceProvider = LogServiceProvider;
        $traceurRuntime.createClass(LogServiceProvider, {
            register: function() {
                this.app.singleton("log", ConsoleLogger);
            },
            provides: function() {
                return [ "log" ];
            }
        }, {}, ServiceProvider);
        module.exports = LogServiceProvider;
    }, {
        "Wildcat.Log.ConsoleLogger": 30,
        "Wildcat.Support.ServiceProvider": 32
    } ],
    32: [ function(require, module, exports) {
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
        "Wildcat.Support.state": 35
    } ],
    33: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $console = global.console;
            var $setTimeout = global.setTimeout;
            function keys(object) {
                return Object.keys(object);
            }
            function assign(object) {
                var $__5;
                for (var args = [], $__2 = 1; $__2 < arguments.length; $__2++) args[$__2 - 1] = arguments[$__2];
                return ($__5 = Object).assign.apply($__5, $traceurRuntime.spread(args));
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
            function isUndefined(val) {
                return val === undefined;
            }
            function isDefined(val) {
                return !isUndefined(val);
            }
            function defined(val, $default) {
                return isDefined(val) ? val : $default;
            }
            function wait() {
                var time = arguments[0] !== void 0 ? arguments[0] : 500;
                return new Promise(function(resolve) {
                    setTimeout(resolve, time);
                });
            }
            function log() {
                var $__5;
                for (var args = [], $__3 = 0; $__3 < arguments.length; $__3++) args[$__3] = arguments[$__3];
                ($__5 = $console).log.apply($__5, $traceurRuntime.spread(args));
            }
            function warn() {
                var $__5;
                for (var args = [], $__4 = 0; $__4 < arguments.length; $__4++) args[$__4] = arguments[$__4];
                ($__5 = $console).warn.apply($__5, $traceurRuntime.spread(args));
            }
            function async(makeGenerator) {
                return function() {
                    var $Promise = Promise;
                    var generator = makeGenerator.apply(this, arguments);
                    function handle(result) {
                        if (result.done) return $Promise.resolve(result.value);
                        return $Promise.resolve(result.value).then(function(res) {
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
            var helpers = {
                keys: keys,
                assign: assign,
                extendProtoOf: extendProtoOf,
                implementIterator: implementIterator,
                value: value,
                isNull: isNull,
                isString: isString,
                isUndefined: isUndefined,
                isDefined: isDefined,
                defined: defined,
                wait: wait,
                log: log,
                warn: warn,
                async: async,
                arrayIterator: arrayIterator,
                noProto: noProto,
                terminateError: terminateError
            };
            module.exports = helpers;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    34: [ function(require, module, exports) {
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
        "observe-js": 41
    } ],
    35: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $__1 = $traceurRuntime.assertObject(require("Wildcat.Support.helpers")), isUndefined = $__1.isUndefined, log = $__1.log, noProto = $__1.noProto, isString = $__1.isString;
            var observe = require("Wildcat.Support.observe");
            var $__1 = $traceurRuntime.assertObject(observe), ObjectObserver = $__1.ObjectObserver, Platform = $__1.Platform;
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
            function onObserve($__1, added, removed, changed, getOldValueFn) {
                var $__2 = $traceurRuntime.assertObject($__1), _ = $__2._, cbs = $__2.cbs;
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
        "Wildcat.Support.helpers": 33,
        "Wildcat.Support.observe": 34
    } ],
    36: [ function(require, module, exports) {
        "use strict";
        var state = require("Wildcat.Support.state");
        var observe = require("Wildcat.Support.observe");
        var helpers = require("Wildcat.Support.helpers");
        var CommanderTrait = require("Wildcat.Commander.CommanderTrait");
        var $__3 = $traceurRuntime.assertObject(observe), PathObserver = $__3.PathObserver, Platform = $__3.Platform;
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
        }, {});
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
        var $__3 = $traceurRuntime.assertObject(helpers), log = $__3.log, extendProtoOf = $__3.extendProtoOf;
        extendProtoOf(View, CommanderTrait);
        module.exports = View;
    }, {
        "Wildcat.Commander.CommanderTrait": 18,
        "Wildcat.Support.helpers": 33,
        "Wildcat.Support.observe": 34,
        "Wildcat.Support.state": 35
    } ],
    37: [ function(require, module, exports) {
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
                    var $__3 = $traceurRuntime.assertObject($__2.value), abstract = $__3.abstract, $constructor = $__3.$constructor, build = $__3.build;
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
        "Wildcat.Support.ServiceProvider": 32,
        "Wildcat.View.View": 36
    } ],
    38: [ function(require, module, exports) {
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
    39: [ function(require, module, exports) {
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
    40: [ function(require, module, exports) {
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
                function assertObject(x) {
                    if (!isObject(x)) throw $TypeError(x + " is not an Object");
                    return x;
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
                    assertObject: assertObject,
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
                    throw new $TypeError("Super expression must either be null or a function");
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
                var $__2 = $traceurRuntime.assertObject($traceurRuntime), canonicalizeUrl = $__2.canonicalizeUrl, resolveUrl = $__2.resolveUrl, isAbsolute = $__2.isAbsolute;
                var moduleInstantiators = Object.create(null);
                var baseURL;
                if (global.location && global.location.href) baseURL = resolveUrl(global.location.href, "./"); else baseURL = "";
                var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
                    this.url = url;
                    this.value_ = uncoatedModule;
                };
                $traceurRuntime.createClass(UncoatedModuleEntry, {}, {});
                var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
                    this.message = this.constructor.name + (cause ? ": '" + cause + "'" : "") + " in " + erroneousModuleName;
                };
                $traceurRuntime.createClass(ModuleEvaluationError, {
                    loadedBy: function(moduleName) {
                        this.message += "\n loaded by " + moduleName;
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
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/utils", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/utils";
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
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Array", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Array";
                var $__3 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"), isCallable = $__3.isCallable, isConstructor = $__3.isConstructor, checkIterable = $__3.checkIterable, toInteger = $__3.toInteger, toLength = $__3.toLength, toObject = $__3.toObject;
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
                        for (var $__4 = items[Symbol.iterator](), $__5; !($__5 = $__4.next()).done; ) {
                            var item = $__5.value;
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
                return {
                    get from() {
                        return from;
                    },
                    get fill() {
                        return fill;
                    },
                    get find() {
                        return find;
                    },
                    get findIndex() {
                        return findIndex;
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator", [], function() {
                "use strict";
                var $__8;
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator";
                var $__6 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"), toObject = $__6.toObject, toUint32 = $__6.toUint32, createIteratorResultObject = $__6.createIteratorResultObject;
                var ARRAY_ITERATOR_KIND_KEYS = 1;
                var ARRAY_ITERATOR_KIND_VALUES = 2;
                var ARRAY_ITERATOR_KIND_ENTRIES = 3;
                var ArrayIterator = function ArrayIterator() {};
                $traceurRuntime.createClass(ArrayIterator, ($__8 = {}, Object.defineProperty($__8, "next", {
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
                }), Object.defineProperty($__8, Symbol.iterator, {
                    value: function() {
                        return this;
                    },
                    configurable: true,
                    enumerable: true,
                    writable: true
                }), $__8), {});
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
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Map", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Map";
                var isObject = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject;
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
                        for (var $__11 = iterable[Symbol.iterator](), $__12; !($__12 = $__11.next()).done; ) {
                            var $__13 = $traceurRuntime.assertObject($__12.value), key = $__13[0], value = $__13[1];
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
                        }
                    },
                    clear: function() {
                        initMap(this);
                    },
                    forEach: function(callbackFn) {
                        var thisArg = arguments[1];
                        for (var i = 0, len = this.entries_.length; i < len; i += 2) {
                            var key = this.entries_[i];
                            var value = this.entries_[i + 1];
                            if (key === deletedSentinel) continue;
                            callbackFn.call(thisArg, value, key, this);
                        }
                    },
                    entries: $traceurRuntime.initGeneratorFunction(function $__14() {
                        var i, len, key, value;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                i = 0, len = this.entries_.length;
                                $ctx.state = 12;
                                break;

                              case 12:
                                $ctx.state = i < len ? 8 : -2;
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
                        }, $__14, this);
                    }),
                    keys: $traceurRuntime.initGeneratorFunction(function $__15() {
                        var i, len, key, value;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                i = 0, len = this.entries_.length;
                                $ctx.state = 12;
                                break;

                              case 12:
                                $ctx.state = i < len ? 8 : -2;
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
                        }, $__15, this);
                    }),
                    values: $traceurRuntime.initGeneratorFunction(function $__16() {
                        var i, len, key, value;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                i = 0, len = this.entries_.length;
                                $ctx.state = 12;
                                break;

                              case 12:
                                $ctx.state = i < len ? 8 : -2;
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
                        }, $__16, this);
                    })
                }, {});
                Object.defineProperty(Map.prototype, Symbol.iterator, {
                    configurable: true,
                    writable: true,
                    value: Map.prototype.entries
                });
                return {
                    get Map() {
                        return Map;
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Number", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Number";
                var $__17 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"), isNumber = $__17.isNumber, toInteger = $__17.toInteger;
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
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Object", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Object";
                var $__18 = $traceurRuntime.assertObject($traceurRuntime), defineProperty = $__18.defineProperty, getOwnPropertyDescriptor = $__18.getOwnPropertyDescriptor, getOwnPropertyNames = $__18.getOwnPropertyNames, keys = $__18.keys, privateNames = $__18.privateNames;
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
                return {
                    get is() {
                        return is;
                    },
                    get assign() {
                        return assign;
                    },
                    get mixin() {
                        return mixin;
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap";
                var length = 0;
                function asap(callback, arg) {
                    queue[length] = callback;
                    queue[length + 1] = arg;
                    length += 2;
                    if (length === 2) {
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
                    for (var i = 0; i < length; i += 2) {
                        var callback = queue[i];
                        var arg = queue[i + 1];
                        callback(arg);
                        queue[i] = undefined;
                        queue[i + 1] = undefined;
                    }
                    length = 0;
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
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Promise", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Promise";
                var async = System.get("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap").default;
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
                    cast: function(x) {
                        if (x instanceof this) return x;
                        if (isPromise(x)) {
                            var result = getDeferred(this);
                            chain(x, result.resolve, result.reject);
                            return result.promise;
                        }
                        return this.resolve(x);
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
                return {
                    get Promise() {
                        return Promise;
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Set", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Set";
                var isObject = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject;
                var Map = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map;
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
                        for (var $__25 = iterable[Symbol.iterator](), $__26; !($__26 = $__25.next()).done; ) {
                            var item = $__26.value;
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
                        return this.map_.set(key, key);
                    },
                    "delete": function(key) {
                        return this.map_.delete(key);
                    },
                    clear: function() {
                        return this.map_.clear();
                    },
                    forEach: function(callbackFn) {
                        var thisArg = arguments[1];
                        var $__23 = this;
                        return this.map_.forEach(function(value, key) {
                            callbackFn.call(thisArg, key, key, $__23);
                        });
                    },
                    values: $traceurRuntime.initGeneratorFunction(function $__27() {
                        var $__28, $__29;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                $__28 = this.map_.keys()[Symbol.iterator]();
                                $ctx.sent = void 0;
                                $ctx.action = "next";
                                $ctx.state = 12;
                                break;

                              case 12:
                                $__29 = $__28[$ctx.action]($ctx.sentIgnoreThrow);
                                $ctx.state = 9;
                                break;

                              case 9:
                                $ctx.state = $__29.done ? 3 : 2;
                                break;

                              case 3:
                                $ctx.sent = $__29.value;
                                $ctx.state = -2;
                                break;

                              case 2:
                                $ctx.state = 12;
                                return $__29.value;

                              default:
                                return $ctx.end();
                            }
                        }, $__27, this);
                    }),
                    entries: $traceurRuntime.initGeneratorFunction(function $__30() {
                        var $__31, $__32;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true) switch ($ctx.state) {
                              case 0:
                                $__31 = this.map_.entries()[Symbol.iterator]();
                                $ctx.sent = void 0;
                                $ctx.action = "next";
                                $ctx.state = 12;
                                break;

                              case 12:
                                $__32 = $__31[$ctx.action]($ctx.sentIgnoreThrow);
                                $ctx.state = 9;
                                break;

                              case 9:
                                $ctx.state = $__32.done ? 3 : 2;
                                break;

                              case 3:
                                $ctx.sent = $__32.value;
                                $ctx.state = -2;
                                break;

                              case 2:
                                $ctx.state = 12;
                                return $__32.value;

                              default:
                                return $ctx.end();
                            }
                        }, $__30, this);
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
                return {
                    get Set() {
                        return Set;
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator", [], function() {
                "use strict";
                var $__35;
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator";
                var $__33 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"), createIteratorResultObject = $__33.createIteratorResultObject, isObject = $__33.isObject;
                var $__36 = $traceurRuntime.assertObject($traceurRuntime), hasOwnProperty = $__36.hasOwnProperty, toProperty = $__36.toProperty;
                var iteratedString = Symbol("iteratedString");
                var stringIteratorNextIndex = Symbol("stringIteratorNextIndex");
                var StringIterator = function StringIterator() {};
                $traceurRuntime.createClass(StringIterator, ($__35 = {}, Object.defineProperty($__35, "next", {
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
                }), Object.defineProperty($__35, Symbol.iterator, {
                    value: function() {
                        return this;
                    },
                    configurable: true,
                    enumerable: true,
                    writable: true
                }), $__35), {});
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
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/String", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/String";
                var createStringIterator = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator").createStringIterator;
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
                    }
                };
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/polyfills";
                var Map = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map;
                var Set = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Set").Set;
                var Promise = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Promise").Promise;
                var $__41 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/String"), codePointAt = $__41.codePointAt, contains = $__41.contains, endsWith = $__41.endsWith, fromCodePoint = $__41.fromCodePoint, repeat = $__41.repeat, raw = $__41.raw, startsWith = $__41.startsWith, stringPrototypeIterator = $__41.stringPrototypeIterator;
                var $__42 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Array"), fill = $__42.fill, find = $__42.find, findIndex = $__42.findIndex, from = $__42.from;
                var $__43 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator"), entries = $__43.entries, keys = $__43.keys, values = $__43.values;
                var $__44 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Object"), assign = $__44.assign, is = $__44.is, mixin = $__44.mixin;
                var $__45 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Number"), MAX_SAFE_INTEGER = $__45.MAX_SAFE_INTEGER, MIN_SAFE_INTEGER = $__45.MIN_SAFE_INTEGER, EPSILON = $__45.EPSILON, isFinite = $__45.isFinite, isInteger = $__45.isInteger, isNaN = $__45.isNaN, isSafeInteger = $__45.isSafeInteger;
                var getPrototypeOf = $traceurRuntime.assertObject(Object).getPrototypeOf;
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
                function polyfillPromise(global) {
                    if (!global.Promise) global.Promise = Promise;
                }
                function polyfillCollections(global, Symbol) {
                    if (!global.Map) global.Map = Map;
                    var mapPrototype = global.Map.prototype;
                    if (mapPrototype.entries) {
                        maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
                        maybeAddIterator(getPrototypeOf(new global.Map().entries()), function() {
                            return this;
                        }, Symbol);
                    }
                    if (!global.Set) global.Set = Set;
                    var setPrototype = global.Set.prototype;
                    if (setPrototype.values) {
                        maybeAddIterator(setPrototype, setPrototype.values, Symbol);
                        maybeAddIterator(getPrototypeOf(new global.Set().values()), function() {
                            return this;
                        }, Symbol);
                    }
                }
                function polyfillString(String) {
                    maybeAddFunctions(String.prototype, [ "codePointAt", codePointAt, "contains", contains, "endsWith", endsWith, "startsWith", startsWith, "repeat", repeat ]);
                    maybeAddFunctions(String, [ "fromCodePoint", fromCodePoint, "raw", raw ]);
                    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
                }
                function polyfillArray(Array, Symbol) {
                    maybeAddFunctions(Array.prototype, [ "entries", entries, "keys", keys, "values", values, "fill", fill, "find", find, "findIndex", findIndex ]);
                    maybeAddFunctions(Array, [ "from", from ]);
                    maybeAddIterator(Array.prototype, values, Symbol);
                    maybeAddIterator(getPrototypeOf([].values()), function() {
                        return this;
                    }, Symbol);
                }
                function polyfillObject(Object) {
                    maybeAddFunctions(Object, [ "assign", assign, "is", is, "mixin", mixin ]);
                }
                function polyfillNumber(Number) {
                    maybeAddConsts(Number, [ "MAX_SAFE_INTEGER", MAX_SAFE_INTEGER, "MIN_SAFE_INTEGER", MIN_SAFE_INTEGER, "EPSILON", EPSILON ]);
                    maybeAddFunctions(Number, [ "isFinite", isFinite, "isInteger", isInteger, "isNaN", isNaN, "isSafeInteger", isSafeInteger ]);
                }
                function polyfill(global) {
                    polyfillPromise(global);
                    polyfillCollections(global, global.Symbol);
                    polyfillString(global.String);
                    polyfillArray(global.Array, global.Symbol);
                    polyfillObject(global.Object);
                    polyfillNumber(global.Number);
                }
                polyfill(this);
                var setupGlobals = $traceurRuntime.setupGlobals;
                $traceurRuntime.setupGlobals = function(global) {
                    setupGlobals(global);
                    polyfill(global);
                };
                return {};
            });
            System.register("traceur-runtime@0.0.55/src/runtime/polyfill-import", [], function() {
                "use strict";
                var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfill-import";
                System.get("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills");
                return {};
            });
            System.get("traceur-runtime@0.0.55/src/runtime/polyfill-import" + "");
        }).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        _process: 39
    } ],
    41: [ function(require, module, exports) {
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
    }, {} ]
}, {}, [ 40, 8 ]);