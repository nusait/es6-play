(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var log = $traceurRuntime.assertObject(helpers).log;
var IntroView = function IntroView() {
  for (var args = [],
      $__1 = 0; $__1 < arguments.length; $__1++)
    args[$__1] = arguments[$__1];
  $traceurRuntime.superCall(this, $IntroView.prototype, "constructor", $traceurRuntime.spread(args));
  var app = this.app;
  var events = $traceurRuntime.assertObject(app).events;
  events.on('reportWasPosted', (function(e) {
    return log(e.type, e);
  }));
};
var $IntroView = IntroView;
($traceurRuntime.createClass)(IntroView, {postReport: function(name, incident) {
    var app = this.app;
    var command = app.make('postReportCommand', [name, incident]);
    this.execute(command);
  }}, {}, View);
module.exports = IntroView;


},{"Wildcat.Support.helpers":37,"Wildcat.View.View":40}],2:[function(require,module,exports){
"use strict";
var PostReportCommand = function PostReportCommand(name, incident) {
  this.name = name;
  this.incident = incident;
};
($traceurRuntime.createClass)(PostReportCommand, {}, {getName: function() {
    return 'postReportCommand';
  }});
module.exports = PostReportCommand;


},{}],3:[function(require,module,exports){
"use strict";
var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers = require('Wildcat.Support.helpers');
var PostReportCommandHandler = function PostReportCommandHandler() {
  $traceurRuntime.defaultSuperCall(this, $PostReportCommandHandler.prototype, arguments);
};
var $PostReportCommandHandler = PostReportCommandHandler;
($traceurRuntime.createClass)(PostReportCommandHandler, {handle: function(command) {
    var $this = this;
    var $__1 = $traceurRuntime.assertObject(command),
        name = $__1.name,
        incident = $__1.incident;
    var app = $traceurRuntime.assertObject($this).app;
    var Report = app.make('Report');
    async($traceurRuntime.initGeneratorFunction(function $__2() {
      var report;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
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
  }}, {}, CommandHandler);
var $__1 = $traceurRuntime.assertObject(helpers),
    terminateError = $__1.terminateError,
    async = $__1.async,
    log = $__1.log;
module.exports = PostReportCommandHandler;


},{"Wildcat.Commander.CommandHandler":16,"Wildcat.Support.helpers":37}],4:[function(require,module,exports){
"use strict";
var ReportWasPosted = function ReportWasPosted(report) {
  this.value = report;
  this.type = this.getName();
  this.timeStamp = Date.now();
};
($traceurRuntime.createClass)(ReportWasPosted, {getName: function() {
    return 'reportWasPosted';
  }}, {});
module.exports = ReportWasPosted;


},{}],5:[function(require,module,exports){
"use strict";
var EventGenerator = require('Wildcat.Commander.Events.EventGenerator');
var helpers = require('Wildcat.Support.helpers');
var ValidationError = require('Wildcat.Errors.ValidationError');
var Report = function Report(name, incident) {
  this.name = name;
  this.incident = incident;
  EventGenerator.call(this);
};
var $Report = Report;
($traceurRuntime.createClass)(Report, {}, {
  persist: $traceurRuntime.initGeneratorFunction(function $__3(report) {
    var myName,
        savedReport;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            myName = this.myName();
            console.log(("hey report 1: " + myName));
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
            console.log('hey report 2');
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
            console.log('hey report 3');
            $ctx.state = 16;
            break;
          case 16:
            $ctx.returnValue = 'i am done!';
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__3, this);
  }),
  myName: function() {
    return 'weirdName';
  },
  post: function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    var app = $Report.getApplication();
    var reportRepository = $traceurRuntime.assertObject(app).reportRepository;
    return async($traceurRuntime.initGeneratorFunction(function $__4() {
      var report,
          event;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              report = app.make('report', args);
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
              event = app.make('reportWasPosted', [report]);
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
    }))();
  },
  getApplication: function() {
    return $Report.app_;
  },
  setApplication: function(app) {
    $Report.app_ = app;
  }
});
var $__2 = $traceurRuntime.assertObject(helpers),
    log = $__2.log,
    extendProtoOf = $__2.extendProtoOf,
    wait = $__2.wait,
    async = $__2.async;
extendProtoOf(Report, EventGenerator);
Report.persist = async(Report.persist);
module.exports = Report;


},{"Wildcat.Commander.Events.EventGenerator":21,"Wildcat.Errors.ValidationError":28,"Wildcat.Support.helpers":37}],6:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var Report = require('App.Entities.Reports.Report');
var ReportWasPosted = require('App.Entities.Reports.Events.ReportWasPosted');
var ReportRepository = require('App.Repositories.ReportRepository');
var helpers = require('Wildcat.Support.helpers');
var AppServiceProvider = function AppServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $AppServiceProvider.prototype, arguments);
};
var $AppServiceProvider = AppServiceProvider;
($traceurRuntime.createClass)(AppServiceProvider, {
  boot: function() {},
  register: function() {
    registerEntities.call(this);
    registerRepositories.call(this);
  }
}, {}, ServiceProvider);
function registerEntities() {
  var app = this.app;
  app.bindShared('Report', (function(app) {
    Report.setApplication(app);
    return Report;
  }));
  app.bind('report', (function(app) {
    for (var args = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      args[$__1 - 1] = arguments[$__1];
    return new (Function.prototype.bind.apply(app.Report, $traceurRuntime.spread([null], args)))();
  }));
  app.bind('reportWasPosted', (function(app) {
    for (var args = [],
        $__2 = 1; $__2 < arguments.length; $__2++)
      args[$__2 - 1] = arguments[$__2];
    return new (Function.prototype.bind.apply(ReportWasPosted, $traceurRuntime.spread([null], args)))();
  }));
}
function registerRepositories() {
  var app = this.app;
  app.bindShared('reportRepository', (function(app) {
    return new ReportRepository(app);
  }));
}
var log = $traceurRuntime.assertObject(helpers).log;
module.exports = AppServiceProvider;


},{"App.Entities.Reports.Events.ReportWasPosted":4,"App.Entities.Reports.Report":5,"App.Repositories.ReportRepository":7,"Wildcat.Support.ServiceProvider":36,"Wildcat.Support.helpers":37}],7:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var ValidationError = require('Wildcat.Errors.ValidationError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');
var ReportRepository = function ReportRepository(app) {
  this.app = app;
};
($traceurRuntime.createClass)(ReportRepository, {save: function(report) {
    log("saving report, please wait…");
    return wait().then((function() {
      log("report saved, thank you.");
      return report;
    }));
  }}, {});
var $__1 = $traceurRuntime.assertObject(helpers),
    log = $__1.log,
    wait = $__1.wait;
module.exports = ReportRepository;


},{"Wildcat.Errors.AuthenticationError":26,"Wildcat.Errors.ValidationError":28,"Wildcat.Support.helpers":37}],8:[function(require,module,exports){
"use strict";
var App = require('Wildcat.Foundation.Application');
window.App = App;


},{"Wildcat.Foundation.Application":31}],9:[function(require,module,exports){
"use strict";
var AppServiceProvider = require('App.Providers.AppServiceProvider');
var LogServiceProvider = require('Wildcat.Log.LogServiceProvider');
var WindowServiceProvider = require('Wildcat.DOM.WindowServiceProvider');
var ErrorProvider = require('Wildcat.Errors.ErrorServiceProvider');
var ViewServiceProvider = require('Wildcat.View.ViewServiceProvider');
var CommanderServiceProvider = require('Wildcat.Commander.CommandServiceProvider');
module.exports = {
  debug: false,
  providers: [AppServiceProvider, LogServiceProvider, WindowServiceProvider, ErrorProvider, ViewServiceProvider, CommanderServiceProvider],
  locale: 'en',
  get browser() {
    return window.navigator.userAgent;
  }
};


},{"App.Providers.AppServiceProvider":6,"Wildcat.Commander.CommandServiceProvider":17,"Wildcat.DOM.WindowServiceProvider":25,"Wildcat.Errors.ErrorServiceProvider":27,"Wildcat.Log.LogServiceProvider":35,"Wildcat.View.ViewServiceProvider":41}],10:[function(require,module,exports){
"use strict";
var PostReportCommand = require('App.Commands.PostReportCommand');
module.exports = [{
  'abstract': 'postReportCommand',
  'command': PostReportCommand
}];


},{"App.Commands.PostReportCommand":2}],11:[function(require,module,exports){
"use strict";
module.exports = {
  'app': require('./app'),
  'local.app': require('./local/app'),
  'commands': require('./commands'),
  'handlers': require('./handlers'),
  'views': require('./views')
};


},{"./app":9,"./commands":10,"./handlers":12,"./local/app":13,"./views":14}],12:[function(require,module,exports){
"use strict";
var PostReportCommandHandler = require('App.Commands.PostReportCommandHandler');
module.exports = [{
  'abstract': 'postReportCommandHandler',
  'handler': PostReportCommandHandler
}];


},{"App.Commands.PostReportCommandHandler":3}],13:[function(require,module,exports){
"use strict";
module.exports = {debug: true};


},{}],14:[function(require,module,exports){
"use strict";
var IntroView = require('App.Browser.Views.IntroView');
module.exports = [{
  'abstract': 'introView',
  '$constructor': IntroView,
  'build': 'singleton'
}];


},{"App.Browser.Views.IntroView":1}],15:[function(require,module,exports){
"use strict";
var CommandBus = function CommandBus(app) {
  this.app = app;
};
($traceurRuntime.createClass)(CommandBus, {execute: function(command) {
    var commandName = command.constructor.getName();
    var handlerName = (commandName + "Handler");
    var handler = this.app.make(handlerName);
    handler.handle(command);
  }}, {});
module.exports = CommandBus;


},{}],16:[function(require,module,exports){
"use strict";
var DispatchableTrait = require('Wildcat.Commander.Events.DispatchableTrait');
var helpers = require('Wildcat.Support.helpers');
var CommandHandler = function CommandHandler(app) {
  this.app = app;
};
($traceurRuntime.createClass)(CommandHandler, {}, {});
var extendProtoOf = $traceurRuntime.assertObject(helpers).extendProtoOf;
extendProtoOf(CommandHandler, DispatchableTrait);
module.exports = CommandHandler;


},{"Wildcat.Commander.Events.DispatchableTrait":19,"Wildcat.Support.helpers":37}],17:[function(require,module,exports){
"use strict";
var log = $traceurRuntime.assertObject(require('Wildcat.Support.helpers')).log;
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var CommandBus = require('Wildcat.Commander.CommandBus');
var EventDispatcher = require('Wildcat.Commander.Events.EventDispatcher');
var CommandServiceProvider = function CommandServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $CommandServiceProvider.prototype, arguments);
};
var $CommandServiceProvider = CommandServiceProvider;
($traceurRuntime.createClass)(CommandServiceProvider, {register: function() {
    registerCommandBus.call(this);
    registerCommands.call(this);
    registerHandlers.call(this);
    registerEventDispatcher.call(this);
  }}, {}, ServiceProvider);
function registerCommandBus() {
  this.app.bindShared('commandBus', (function(app) {
    return new CommandBus(app);
  }));
}
function registerCommands() {
  var app = this.app;
  var commands = app.config.get('commands');
  for (var $__1 = commands[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var $__4 = $traceurRuntime.assertObject($__2.value),
        abstract = $__4.abstract,
        command = $__4.command;
    {
      app.bind(abstract, function(app) {
        for (var args = [],
            $__3 = 1; $__3 < arguments.length; $__3++)
          args[$__3 - 1] = arguments[$__3];
        return new (Function.prototype.bind.apply(command, $traceurRuntime.spread([null], args)))();
      });
    }
  }
}
function registerHandlers() {
  var app = this.app;
  var handlers = app.config.get('handlers');
  for (var $__1 = handlers[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var $__4 = $traceurRuntime.assertObject($__2.value),
        abstract = $__4.abstract,
        handler = $__4.handler;
    {
      app.bind(abstract, function(app) {
        for (var args = [],
            $__3 = 1; $__3 < arguments.length; $__3++)
          args[$__3 - 1] = arguments[$__3];
        return new (Function.prototype.bind.apply(handler, $traceurRuntime.spread([null, app], args)))();
      });
    }
  }
}
function registerEventDispatcher() {
  var app = this.app;
  var $__4 = $traceurRuntime.assertObject(app),
      events = $__4.events,
      logger = $__4.logger;
  app.bind('eventDispatcher', (function(app) {
    return new EventDispatcher(events, logger);
  }));
}
module.exports = CommandServiceProvider;


},{"Wildcat.Commander.CommandBus":15,"Wildcat.Commander.Events.EventDispatcher":20,"Wildcat.Support.ServiceProvider":36,"Wildcat.Support.helpers":37}],18:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = function CommanderTrait() {};
($traceurRuntime.createClass)(CommanderTrait, {
  execute: function(command, input) {
    var bus = this.getCommandBus();
    bus.execute(command);
  },
  getCommandBus: function() {
    return this.app.make('commandBus');
  }
}, {});
var log = $traceurRuntime.assertObject(helpers).log;
module.exports = CommanderTrait;


},{"Wildcat.Support.helpers":37}],19:[function(require,module,exports){
"use strict";
var DispatchableTrait = function DispatchableTrait() {};
($traceurRuntime.createClass)(DispatchableTrait, {
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


},{}],20:[function(require,module,exports){
"use strict";
var EventDispatcher = function EventDispatcher(events, log) {
  this.events_ = events;
  this.log_ = log;
};
($traceurRuntime.createClass)(EventDispatcher, {dispatch: function(events) {
    for (var $__1 = events[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var event = $__2.value;
      {
        var eventName = getEventName.call(this, event);
        this.events_.emit(eventName, event);
        this.log_.log((eventName + " was fired."));
      }
    }
  }}, {});
function getEventName(event) {
  return event.getName();
}
module.exports = EventDispatcher;


},{}],21:[function(require,module,exports){
"use strict";
var EventGenerator = function EventGenerator() {
  this.pendingEvents_ = [];
};
($traceurRuntime.createClass)(EventGenerator, {
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


},{}],22:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var ModuleLoader = function ModuleLoader() {
  var configObj = arguments[0] !== (void 0) ? arguments[0] : {};
  var _ = state(this, {});
  _.configObj = configObj;
};
($traceurRuntime.createClass)(ModuleLoader, {
  load: function(environment, group) {
    var namespace = arguments[2] !== (void 0) ? arguments[2] : null;
    var _ = state(this);
    var configObj = _.configObj;
    var items = {};
    if (this.exists(group))
      items = configObj[group];
    if (configObj[(environment + "." + group)]) {
      Object.assign(items, configObj[(environment + "." + group)]);
    }
    return items;
  },
  exists: function(group) {
    var namespace = arguments[1] !== (void 0) ? arguments[1] : null;
    var _ = state(this);
    var configObj = _.configObj;
    if (configObj[group])
      return true;
    return false;
  }
}, {});
module.exports = ModuleLoader;


},{"Wildcat.Support.state":39}],23:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var Repository = function Repository(loader, environment) {
  var _ = state(this, {});
  _.loader = loader;
  _.environment = environment;
};
($traceurRuntime.createClass)(Repository, {
  has: function() {},
  get: function(key, defaultVal) {
    var _ = state(this);
    var environment = $traceurRuntime.assertObject(_).environment;
    var $__1 = $traceurRuntime.assertObject(parseKey(key)),
        namespace = $__1[0],
        group = $__1[1],
        item = $__1[2];
    var items = _.loader.load(environment, group, namespace);
    if (!item)
      return items;
    if (items[item] !== undefined)
      return items[item];
    return defaultVal;
  },
  set: function() {}
}, {});
function parseKey(key) {
  var segments = key.split('.');
  return parseBasicSegments(segments);
}
function parseBasicSegments(segments) {
  var group = segments[0];
  if (segments.length === 1) {
    return [null, group, null];
  } else {
    return [null, group, segments[1]];
  }
}
module.exports = Repository;


},{"Wildcat.Support.state":39}],24:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var EventEmitter = require('events').EventEmitter;
var helpers = require('Wildcat.Support.helpers');
var Container = function Container() {
  EventEmitter.call(this);
  var _ = state(this, {});
  _.bindings = {};
  _.instances = {};
};
($traceurRuntime.createClass)(Container, {
  make: function(abstract) {
    var parameters = arguments[1] !== (void 0) ? arguments[1] : [];
    var concrete = this.getConcrete(abstract);
    var object = concrete.apply(null, $traceurRuntime.spread([this], parameters));
    return object;
  },
  bind: function(abstract) {
    var concrete = arguments[1] !== (void 0) ? arguments[1] : null;
    var shared = arguments[2] !== (void 0) ? arguments[2] : false;
    var type = 'bind';
    var target = this;
    state(this).bindings[abstract] = {
      concrete: concrete,
      shared: shared
    };
    this.makeAccessorProperty(abstract);
    this.emit(("bind." + abstract), noProto({
      type: (type + "." + abstract),
      target: target,
      abstract: abstract,
      shared: shared
    }));
    this.emit('bind', noProto({
      type: type,
      target: target,
      abstract: abstract,
      shared: shared
    }));
  },
  bindShared: function(abstract, concrete) {
    var $__9,
        $__10;
    for (var args = [],
        $__4 = 2; $__4 < arguments.length; $__4++)
      args[$__4 - 2] = arguments[$__4];
    if (Array.isArray(abstract)) {
      for (var $__2 = abstract[Symbol.iterator](),
          $__3; !($__3 = $__2.next()).done; ) {
        var $args = $__3.value;
        ($__9 = this).bindShared.apply($__9, $traceurRuntime.spread($args));
      }
      return;
    }
    this.bind(abstract, ($__10 = this).share.apply($__10, $traceurRuntime.spread([concrete], args)), true);
  },
  getConcrete: function(abstract) {
    return state(this).bindings[abstract].concrete;
  },
  isShared: function(abstract) {
    var _ = state(this);
    if (_.instances[abstract])
      return true;
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
    for (var args = [],
        $__5 = 2; $__5 < arguments.length; $__5++)
      args[$__5 - 2] = arguments[$__5];
    this.bind(abstract, function(app) {
      return new (Function.prototype.bind.apply(instantiable, $traceurRuntime.spread([null], args)))();
    }, false);
  },
  singleton: function(abstract, instantiable) {
    for (var args = [],
        $__6 = 2; $__6 < arguments.length; $__6++)
      args[$__6 - 2] = arguments[$__6];
    this.bindShared(abstract, (function(app) {
      return new (Function.prototype.bind.apply(instantiable, $traceurRuntime.spread([null], args)))();
    }));
  },
  share: function(func) {
    for (var args = [],
        $__7 = 1; $__7 < arguments.length; $__7++)
      args[$__7 - 1] = arguments[$__7];
    var object;
    return function(container) {
      if (object === undefined)
        object = func.apply(null, $traceurRuntime.spread([container], args));
      return object;
    };
  },
  forgetInstance: function(abstract) {
    delete state(this).instances[abstract];
  },
  makeAccessorProperty: function(abstract) {
    if (this.abstract)
      return;
    Object.defineProperty(this, abstract, {get: function() {
        return this.make(abstract);
      }});
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
    return this.getItems().forEach((function(value, key) {
      return cb.call(context, value, key, $__0);
    }));
  },
  map: function(cb, context) {
    var $__0 = this;
    context = defined(context, this);
    return this.getItems().map((function(value, key) {
      return cb.call(context, value, key, $__0);
    }));
  },
  filter: function(cb, context) {
    var $__0 = this;
    context = defined(context, this);
    return this.getItems().filter((function(value, key) {
      return cb.call(context, value, key, $__0);
    }));
  },
  getIterator: function() {
    return arrayIterator(this.getItems());
  }
}, {});
var $__8 = $traceurRuntime.assertObject(helpers),
    keys = $__8.keys,
    implementIterator = $__8.implementIterator,
    isUndefined = $__8.isUndefined,
    isDefined = $__8.isDefined,
    defined = $__8.defined,
    arrayIterator = $__8.arrayIterator,
    extendProtoOf = $__8.extendProtoOf,
    noProto = $__8.noProto;
extendProtoOf(Container, EventEmitter);
implementIterator(Container);
module.exports = Container;


},{"Wildcat.Support.helpers":37,"Wildcat.Support.state":39,"events":42}],25:[function(require,module,exports){
(function (global){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var WindowServiceProvider = function WindowServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $WindowServiceProvider.prototype, arguments);
};
var $WindowServiceProvider = WindowServiceProvider;
($traceurRuntime.createClass)(WindowServiceProvider, {
  register: function() {
    var app = this.app;
    app.bindShared('window', (function(app) {
      return global;
    }));
  },
  provides: function() {
    return ['window'];
  }
}, {}, ServiceProvider);
module.exports = WindowServiceProvider;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Support.ServiceProvider":36}],26:[function(require,module,exports){
"use strict";
var errorConstructor = require('Wildcat.Errors.errorConstructor');
var AuthenticationError = errorConstructor('AuthenticationError', 'no way! authenticated');
module.exports = AuthenticationError;


},{"Wildcat.Errors.errorConstructor":29}],27:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var ValidationError = require('Wildcat.Errors.ValidationError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');
var ErrorServiceProvider = function ErrorServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $ErrorServiceProvider.prototype, arguments);
};
var $ErrorServiceProvider = ErrorServiceProvider;
($traceurRuntime.createClass)(ErrorServiceProvider, {
  register: function() {
    var app = this.app;
    app.bindShared('ValidationError', (function(app) {
      return ValidationError;
    }));
    app.bindShared('AuthenticationError', (function(app) {
      return AuthenticationError;
    }));
  },
  provides: function() {
    return ['ValidationError', 'AuthenticationError'];
  }
}, {}, ServiceProvider);
module.exports = ErrorServiceProvider;


},{"Wildcat.Errors.AuthenticationError":26,"Wildcat.Errors.ValidationError":28,"Wildcat.Support.ServiceProvider":36}],28:[function(require,module,exports){
"use strict";
var errorConstructor = require('Wildcat.Errors.errorConstructor');
var ValidationError = errorConstructor('ValidationError', 'no way! validated');
module.exports = ValidationError;


},{"Wildcat.Errors.errorConstructor":29}],29:[function(require,module,exports){
"use strict";
var $Error = Error;
var isArray = $traceurRuntime.assertObject(Array).isArray;
var $__1 = $traceurRuntime.assertObject(Object),
    keys = $__1.keys,
    defineProperties = $__1.defineProperties;
function nonEnum(objects) {
  var writable = true;
  var enumerable = false;
  var configurable = true;
  objects = isArray(objects) ? objects : [objects];
  return objects.reduce((function(result, object) {
    var key = keys(object)[0];
    var value = object[key];
    result[key] = {
      value: value,
      writable: writable,
      enumerable: enumerable,
      configurable: configurable
    };
    return result;
  }), {});
}
function addStackToObject(object, CustomError) {
  var captureStackTrace = $traceurRuntime.assertObject($Error).captureStackTrace;
  if (captureStackTrace) {
    captureStackTrace(object, CustomError);
  } else {
    object.stack = (new $Error).stack || '';
  }
  return object;
}
function errorConstructor() {
  var name = arguments[0] !== (void 0) ? arguments[0] : 'CustomError';
  var message = arguments[1] !== (void 0) ? arguments[1] : '';
  var CustomError = function CustomError(message) {
    if (message !== undefined) {
      defineProperties(this, nonEnum({message: message}));
    }
    addStackToObject(this, $CustomError);
  };
  var $CustomError = CustomError;
  ($traceurRuntime.createClass)(CustomError, {}, {}, $Error);
  defineProperties(CustomError.prototype, nonEnum([{name: name}, {message: message}]));
  return CustomError;
}
module.exports = errorConstructor;


},{}],30:[function(require,module,exports){
"use strict";
var EventEmitter = require('events').EventEmitter;
var $__1 = $traceurRuntime.assertObject(require('Wildcat.Support.helpers')),
    extendProtoOf = $__1.extendProtoOf,
    isString = $__1.isString;
var Dispatcher = function Dispatcher(app) {
  this.app_ = app;
  EventEmitter.call(this);
};
($traceurRuntime.createClass)(Dispatcher, {subscribe: function(subscriber) {
    subscriber = resolveSubscriber.call(this);
    subscriber.subscribe(this);
  }}, {});
extendProtoOf(Dispatcher, EventEmitter);
function resolveSubscriber(subscriber) {
  if (isString(subscriber)) {
    return this.app_[subscriber];
  }
  return subscriber;
}
module.exports = Dispatcher;


},{"Wildcat.Support.helpers":37,"events":42}],31:[function(require,module,exports){
"use strict";
var Container = require('Wildcat.Container.Container');
var Config = require('Wildcat.Config.Repository');
var ModuleLoader = require('Wildcat.Config.ModuleLoader');
var Dispatcher = require('Wildcat.Events.Dispatcher');
var start = require('Wildcat.Foundation.start');
var ProviderRepository = require('Wildcat.Foundation.ProviderRepository');
var config = require('config.config');
var value = $traceurRuntime.assertObject(require('Wildcat.Support.helpers')).value;
var state = {};
var Application = function Application() {
  $traceurRuntime.defaultSuperCall(this, $Application.prototype, arguments);
};
var $Application = Application;
($traceurRuntime.createClass)(Application, {
  detectEnvironment: function(env) {
    return state.env = value(env);
  },
  isLocal: function() {
    return this.environment('local');
  },
  environment: function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
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
    app.bindShared([['config', (function(app) {
      return new Config(configLoader, environment);
    })], ['events', (function(app) {
      return new Dispatcher(app);
    })]]);
  },
  getProviderRepository: function() {
    return new ProviderRepository();
  },
  start: function() {
    start.call(this);
  },
  run: function() {
    console.log('app running!');
  },
  register: function(provider) {
    provider.register();
    return provider;
  }
}, {}, Container);
module.exports = Application;


},{"Wildcat.Config.ModuleLoader":22,"Wildcat.Config.Repository":23,"Wildcat.Container.Container":24,"Wildcat.Events.Dispatcher":30,"Wildcat.Foundation.ProviderRepository":32,"Wildcat.Foundation.start":33,"Wildcat.Support.helpers":37,"config.config":11}],32:[function(require,module,exports){
"use strict";
var ProviderRepository = function ProviderRepository() {};
($traceurRuntime.createClass)(ProviderRepository, {
  load: function(app, providers) {
    for (var $__1 = providers[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
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


},{}],33:[function(require,module,exports){
"use strict";
var Config = require('Wildcat.Config.Repository');
function start() {
  var app = this;
  var env = app.environment();
  var providers,
      config;
  app.bindShared('app', (function() {
    return app;
  }));
  app.registerCoreContainerBindings();
  config = app.config;
  providers = config.get('app').providers;
  app.getProviderRepository().load(app, providers);
}
module.exports = start;


},{"Wildcat.Config.Repository":23}],34:[function(require,module,exports){
(function (global){
"use strict";
var state = require('Wildcat.Support.state');
var ConsoleLogger = function ConsoleLogger() {
  var $window = arguments[0] !== (void 0) ? arguments[0] : global;
  var _ = state(this, {});
  _.window = $window;
  _.console = $window.console;
};
($traceurRuntime.createClass)(ConsoleLogger, {
  log: function() {
    var $__4;
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    ($__4 = state(this).console).log.apply($__4, $traceurRuntime.spread(args));
  },
  error: function() {
    var $__4;
    for (var args = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      args[$__2] = arguments[$__2];
    ($__4 = state(this).console).error.apply($__4, $traceurRuntime.spread(args));
  },
  dir: function() {
    var $__4;
    for (var args = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      args[$__3] = arguments[$__3];
    ($__4 = state(this).console).dir.apply($__4, $traceurRuntime.spread(args));
  },
  get state_() {
    return state(this);
  }
}, {});
module.exports = ConsoleLogger;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Support.state":39}],35:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var ConsoleLogger = require('Wildcat.Log.ConsoleLogger');
var LogServiceProvider = function LogServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $LogServiceProvider.prototype, arguments);
};
var $LogServiceProvider = LogServiceProvider;
($traceurRuntime.createClass)(LogServiceProvider, {
  register: function() {
    this.app.singleton('logger', ConsoleLogger);
  },
  provides: function() {
    return ['log'];
  }
}, {}, ServiceProvider);
module.exports = LogServiceProvider;


},{"Wildcat.Log.ConsoleLogger":34,"Wildcat.Support.ServiceProvider":36}],36:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var ServiceProvider = function ServiceProvider(app) {
  var _ = state(this, {});
  _.app = app;
};
($traceurRuntime.createClass)(ServiceProvider, {
  register: function() {},
  get app() {
    return state(this).app;
  }
}, {});
module.exports = ServiceProvider;


},{"Wildcat.Support.state":39}],37:[function(require,module,exports){
(function (global){
"use strict";
var $console = global.console;
var $setTimeout = global.setTimeout;
function keys(object) {
  return Object.keys(object);
}
function assign(object) {
  var $__6;
  for (var args = [],
      $__2 = 1; $__2 < arguments.length; $__2++)
    args[$__2 - 1] = arguments[$__2];
  return ($__6 = Object).assign.apply($__6, $traceurRuntime.spread(args));
}
function extendProtoOf(target, source) {
  var key = arguments[2] !== (void 0) ? arguments[2] : [];
  if (isString(key)) {
    target.prototype[key] = source.prototype[key];
    return;
  }
  var sourceKeys = keys(source.prototype);
  for (var $__0 = sourceKeys[Symbol.iterator](),
      $__1; !($__1 = $__0.next()).done; ) {
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
  return (typeof val === 'function') ? val() : val;
}
function isNull(val) {
  return val === null;
}
function isString(val) {
  return (typeof val) === 'string';
}
function isUndefined(val) {
  return val === undefined;
}
function isDefined(val) {
  return (!isUndefined(val));
}
function isArray(val) {
  return Array.isArray(val);
}
function defined(val, $default) {
  return isDefined(val) ? val : $default;
}
function wait() {
  var time = arguments[0] !== (void 0) ? arguments[0] : 500;
  return new Promise((function(resolve) {
    setTimeout(resolve, time);
  }));
}
function log() {
  var $__6;
  for (var args = [],
      $__3 = 0; $__3 < arguments.length; $__3++)
    args[$__3] = arguments[$__3];
  ($__6 = $console).log.apply($__6, $traceurRuntime.spread(args));
}
function error() {
  var $__6;
  for (var args = [],
      $__4 = 0; $__4 < arguments.length; $__4++)
    args[$__4] = arguments[$__4];
  ($__6 = $console).error.apply($__6, $traceurRuntime.spread(args));
}
function warn() {
  var $__6;
  for (var args = [],
      $__5 = 0; $__5 < arguments.length; $__5++)
    args[$__5] = arguments[$__5];
  ($__6 = $console).warn.apply($__6, $traceurRuntime.spread(args));
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
      if (done)
        return $Promise.resolve(value);
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
function arrayIterator() {
  var items = arguments[0] !== (void 0) ? arguments[0] : [];
  var i = 0;
  var len = items.length;
  return {next: function() {
      var value,
          notDone;
      if (notDone = i < len)
        value = items[i++];
      return {
        value: value,
        done: !notDone
      };
    }};
}
function noProto() {
  var source = arguments[0] !== (void 0) ? arguments[0] : {};
  var empty = Object.create(null);
  Object.assign(empty, source);
  return empty;
}
function terminateError(error) {
  $setTimeout((function() {
    warn("from [terimateError]:");
    warn(error.stack);
    throw error;
  }), 0);
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
  isArray: isArray,
  defined: defined,
  wait: wait,
  log: log,
  error: error,
  warn: warn,
  spawn: spawn,
  async: async,
  arrayIterator: arrayIterator,
  noProto: noProto,
  terminateError: terminateError
};
module.exports = helpers;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],38:[function(require,module,exports){
(function (global){
"use strict";
var observeJs = require('observe-js');
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"observe-js":45}],39:[function(require,module,exports){
(function (global){
"use strict";
var $__1 = $traceurRuntime.assertObject(require('Wildcat.Support.helpers')),
    isUndefined = $__1.isUndefined,
    log = $__1.log,
    noProto = $__1.noProto,
    isString = $__1.isString;
var observe = require('Wildcat.Support.observe');
var $__1 = $traceurRuntime.assertObject(observe),
    ObjectObserver = $__1.ObjectObserver,
    Platform = $__1.Platform;
var MapConstructor = global.WeakMap || global.Map;
var map = new MapConstructor();
function state(thisArg, val, cbs) {
  var quiet = arguments[3] !== (void 0) ? arguments[3] : false;
  if (isUndefined(val))
    return map.get(thisArg);
  if (isString(val)) {
    setState.call(thisArg, val, cbs, quiet);
    return thisArg;
  }
  var _ = setStateObject.call(thisArg, val);
  if (cbs)
    bindObservable.call(thisArg, _, cbs);
  return _;
}
function setState(key, value, quiet) {
  var _ = state(this);
  _[key] = value;
  if (quiet)
    _.observer_.discardChanges();
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
  var $__2 = $traceurRuntime.assertObject($__1),
      _ = $__2._,
      cbs = $__2.cbs;
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
  ['added', 'removed', 'changed'].forEach((function(type) {
    var hasCallback = (typeof observed.cbs[type] === 'function');
    var isNotEmpty = Object.keys(observed[type]).length > 0;
    if (hasCallback && isNotEmpty)
      invoke.call($__0, observed, type);
  }));
}
function invoke(observed, type) {
  var callback = observed.cbs[type];
  var names = Object.keys(observed[type]);
  var payload = names.map((function(name) {
    return noProto({
      name: name,
      type: type,
      newValue: observed._[name],
      oldValue: observed.getOldValueFn(name)
    });
  }));
  callback.call(this, payload);
}
module.exports = state;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Support.helpers":37,"Wildcat.Support.observe":38}],40:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = require('Wildcat.Commander.CommanderTrait');
var $__3 = $traceurRuntime.assertObject(observe),
    PathObserver = $__3.PathObserver,
    Platform = $__3.Platform;
var View = function View(app, el) {
  this.app = app;
  var defaultState = {el: null};
  state(this, defaultState, {
    changed: changed,
    added: added
  });
};
($traceurRuntime.createClass)(View, {
  setEl: function(element) {
    var quiet = arguments[1] !== (void 0) ? arguments[1] : false;
    return state(this, 'el', element, quiet);
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
  for (var $__1 = changes[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var change = $__2.value;
    log(change);
  }
}
function added(additions) {
  log("onStateAdded");
  for (var $__1 = additions[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var addition = $__2.value;
    log(addition);
  }
}
var $__3 = $traceurRuntime.assertObject(helpers),
    log = $__3.log,
    extendProtoOf = $__3.extendProtoOf;
extendProtoOf(View, CommanderTrait);
module.exports = View;


},{"Wildcat.Commander.CommanderTrait":18,"Wildcat.Support.helpers":37,"Wildcat.Support.observe":38,"Wildcat.Support.state":39}],41:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');
var ViewServiceProvider = function ViewServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $ViewServiceProvider.prototype, arguments);
};
var $ViewServiceProvider = ViewServiceProvider;
($traceurRuntime.createClass)(ViewServiceProvider, {register: function() {
    var app = this.app;
    var views = app.config.get('views');
    for (var $__1 = views[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var $__3 = $traceurRuntime.assertObject($__2.value),
          abstract = $__3.abstract,
          $constructor = $__3.$constructor,
          build = $__3.build;
      {
        switch (build) {
          case 'singleton':
            app.bindShared(abstract, (function(app) {
              return new $constructor(app);
            }));
            break;
        }
      }
    }
  }}, {}, ServiceProvider);
module.exports = ViewServiceProvider;


},{"Wildcat.Support.ServiceProvider":36,"Wildcat.View.View":40}],42:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

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

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],43:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],44:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
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
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
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
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
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
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
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
      if (symbol)
        rv.push(symbol);
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
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
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
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function assertObject(x) {
    if (!isObject(x))
      throw $TypeError(x + ' is not an Object');
    return x;
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
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
    typeof: typeOf,
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
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
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
  'use strict';
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
      if (result)
        return result;
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
      if (!descriptor.get)
        return descriptor.value;
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
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError('Super expression must either be null or a function');
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
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
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
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
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
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
      if (this.action === 'throw') {
        this.action = 'next';
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
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
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
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
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
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
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
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
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
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime.assertObject($traceurRuntime),
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + (cause ? ': \'' + cause + '\'' : '') + ' in ' + erroneousModuleName;
  };
  ($traceurRuntime.createClass)(ModuleEvaluationError, {loadedBy: function(moduleName) {
      this.message += '\n loaded by ' + moduleName;
    }}, {}, Error);
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        return this.value_ = this.func.call(global);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
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
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
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
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
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
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
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
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
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
})(typeof global !== 'undefined' ? global : this);
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
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
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
  var $__3 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      isCallable = $__3.isCallable,
      isConstructor = $__3.isConstructor,
      checkIterable = $__3.checkIterable,
      toInteger = $__3.toInteger,
      toLength = $__3.toLength,
      toObject = $__3.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__4 = items[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
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
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
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
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
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
  var $__6 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      toObject = $__6.toObject,
      toUint32 = $__6.toUint32,
      createIteratorResultObject = $__6.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__8 = {}, Object.defineProperty($__8, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
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
    var iterator = new ArrayIterator;
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
    if (typeof key === 'string')
      return map.stringIndex_[key];
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
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__11 = iterable[Symbol.iterator](),
          $__12; !($__12 = $__11.next()).done; ) {
        var $__13 = $traceurRuntime.assertObject($__12.value),
            key = $__13[0],
            value = $__13[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
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
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
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
      for (var i = 0,
          len = this.entries_.length; i < len; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__14() {
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
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
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
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
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
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
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
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
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
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
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
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
  return {get Map() {
      return Map;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Number";
  var $__17 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      isNumber = $__17.isNumber,
      toInteger = $__17.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
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
  var $__18 = $traceurRuntime.assertObject($traceurRuntime),
      defineProperty = $__18.defineProperty,
      getOwnPropertyDescriptor = $__18.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__18.getOwnPropertyNames,
      keys = $__18.keys,
      privateNames = $__18.privateNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (privateNames[name])
        continue;
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
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
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
  var queue = new Array(1000);
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
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap").default;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
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
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
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
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    cast: function(x) {
      if (x instanceof this)
        return x;
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
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
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
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
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
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
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
      if (typeof then === 'function') {
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
  return {get Promise() {
      return Promise;
    }};
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
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__25 = iterable[Symbol.iterator](),
          $__26; !($__26 = $__25.next()).done; ) {
        var item = $__26.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      return this.map_.set(key, key);
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__23 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__23);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__27() {
      var $__28,
          $__29;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__28 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__29 = $__28[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__29.done) ? 3 : 2;
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
      var $__31,
          $__32;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__31 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__32 = $__31[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__32.done) ? 3 : 2;
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
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  return {get Set() {
      return Set;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__35;
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator";
  var $__33 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__33.createIteratorResultObject,
      isObject = $__33.isObject;
  var $__36 = $traceurRuntime.assertObject($traceurRuntime),
      hasOwnProperty = $__36.hasOwnProperty,
      toProperty = $__36.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__35 = {}, Object.defineProperty($__35, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
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
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
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
  return {get createStringIterator() {
      return createStringIterator;
    }};
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
    if (this == null || $toString.call(search) == '[object RegExp]') {
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
    if (this == null || $toString.call(search) == '[object RegExp]') {
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
      return '';
    }
    var result = '';
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
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
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
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
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
  var $__41 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/String"),
      codePointAt = $__41.codePointAt,
      contains = $__41.contains,
      endsWith = $__41.endsWith,
      fromCodePoint = $__41.fromCodePoint,
      repeat = $__41.repeat,
      raw = $__41.raw,
      startsWith = $__41.startsWith,
      stringPrototypeIterator = $__41.stringPrototypeIterator;
  var $__42 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Array"),
      fill = $__42.fill,
      find = $__42.find,
      findIndex = $__42.findIndex,
      from = $__42.from;
  var $__43 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator"),
      entries = $__43.entries,
      keys = $__43.keys,
      values = $__43.values;
  var $__44 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Object"),
      assign = $__44.assign,
      is = $__44.is,
      mixin = $__44.mixin;
  var $__45 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Number"),
      MAX_SAFE_INTEGER = $__45.MAX_SAFE_INTEGER,
      MIN_SAFE_INTEGER = $__45.MIN_SAFE_INTEGER,
      EPSILON = $__45.EPSILON,
      isFinite = $__45.isFinite,
      isInteger = $__45.isInteger,
      isNaN = $__45.isNaN,
      isSafeInteger = $__45.isSafeInteger;
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
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  function polyfillCollections(global, Symbol) {
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  function polyfillString(String) {
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  function polyfillArray(Array, Symbol) {
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  function polyfillObject(Object) {
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  function polyfillNumber(Number) {
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', isFinite, 'isInteger', isInteger, 'isNaN', isNaN, 'isSafeInteger', isSafeInteger]);
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
System.get("traceur-runtime@0.0.55/src/runtime/polyfill-import" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":43}],45:[function(require,module,exports){
(function (global){
/*
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(global) {
  'use strict';

  var testingExposeCycleCount = global.testingExposeCycleCount;

  // Detect and do basic sanity checking on Object/Array.observe.
  function detectObjectObserve() {
    if (typeof Object.observe !== 'function' ||
        typeof Array.observe !== 'function') {
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
    if (records.length !== 5)
      return false;

    if (records[0].type != 'add' ||
        records[1].type != 'update' ||
        records[2].type != 'delete' ||
        records[3].type != 'splice' ||
        records[4].type != 'splice') {
      return false;
    }

    Object.unobserve(test, callback);
    Array.unobserve(arr, callback);

    return true;
  }

  var hasObserve = detectObjectObserve();

  function detectEval() {
    // Don't test for eval if we're running in a Chrome App environment.
    // We check for APIs set that only exist in a Chrome App context.
    if (typeof chrome !== 'undefined' && chrome.app && chrome.app.runtime) {
      return false;
    }

    // Firefox OS Apps do not allow eval. This feature detection is very hacky
    // but even if some other platform adds support for this function this code
    // will continue to work.
    if (typeof navigator != 'undefined' && navigator.getDeviceStorage) {
      return false;
    }

    try {
      var f = new Function('', 'return true;');
      return f();
    } catch (ex) {
      return false;
    }
  }

  var hasEval = detectEval();

  function isIndex(s) {
    return +s === s >>> 0 && s !== '';
  }

  function toNumber(s) {
    return +s;
  }

  function isObject(obj) {
    return obj === Object(obj);
  }

  var numberIsNaN = global.Number.isNaN || function(value) {
    return typeof value === 'number' && global.isNaN(value);
  }

  function areSameValue(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    if (numberIsNaN(left) && numberIsNaN(right))
      return true;

    return left !== left && right !== right;
  }

  var createObject = ('__proto__' in {}) ?
    function(obj) { return obj; } :
    function(obj) {
      var proto = obj.__proto__;
      if (!proto)
        return obj;
      var newObject = Object.create(proto);
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        Object.defineProperty(newObject, name,
                             Object.getOwnPropertyDescriptor(obj, name));
      });
      return newObject;
    };

  var identStart = '[\$_a-zA-Z]';
  var identPart = '[\$_a-zA-Z0-9]';
  var identRegExp = new RegExp('^' + identStart + '+' + identPart + '*' + '$');

  function getPathCharType(char) {
    if (char === undefined)
      return 'eof';

    var code = char.charCodeAt(0);

    switch(code) {
      case 0x5B: // [
      case 0x5D: // ]
      case 0x2E: // .
      case 0x22: // "
      case 0x27: // '
      case 0x30: // 0
        return char;

      case 0x5F: // _
      case 0x24: // $
        return 'ident';

      case 0x20: // Space
      case 0x09: // Tab
      case 0x0A: // Newline
      case 0x0D: // Return
      case 0xA0:  // No-break space
      case 0xFEFF:  // Byte Order Mark
      case 0x2028:  // Line Separator
      case 0x2029:  // Paragraph Separator
        return 'ws';
    }

    // a-z, A-Z
    if ((0x61 <= code && code <= 0x7A) || (0x41 <= code && code <= 0x5A))
      return 'ident';

    // 1-9
    if (0x31 <= code && code <= 0x39)
      return 'number';

    return 'else';
  }

  var pathStateMachine = {
    'beforePath': {
      'ws': ['beforePath'],
      'ident': ['inIdent', 'append'],
      '[': ['beforeElement'],
      'eof': ['afterPath']
    },

    'inPath': {
      'ws': ['inPath'],
      '.': ['beforeIdent'],
      '[': ['beforeElement'],
      'eof': ['afterPath']
    },

    'beforeIdent': {
      'ws': ['beforeIdent'],
      'ident': ['inIdent', 'append']
    },

    'inIdent': {
      'ident': ['inIdent', 'append'],
      '0': ['inIdent', 'append'],
      'number': ['inIdent', 'append'],
      'ws': ['inPath', 'push'],
      '.': ['beforeIdent', 'push'],
      '[': ['beforeElement', 'push'],
      'eof': ['afterPath', 'push']
    },

    'beforeElement': {
      'ws': ['beforeElement'],
      '0': ['afterZero', 'append'],
      'number': ['inIndex', 'append'],
      "'": ['inSingleQuote', 'append', ''],
      '"': ['inDoubleQuote', 'append', '']
    },

    'afterZero': {
      'ws': ['afterElement', 'push'],
      ']': ['inPath', 'push']
    },

    'inIndex': {
      '0': ['inIndex', 'append'],
      'number': ['inIndex', 'append'],
      'ws': ['afterElement'],
      ']': ['inPath', 'push']
    },

    'inSingleQuote': {
      "'": ['afterElement'],
      'eof': ['error'],
      'else': ['inSingleQuote', 'append']
    },

    'inDoubleQuote': {
      '"': ['afterElement'],
      'eof': ['error'],
      'else': ['inDoubleQuote', 'append']
    },

    'afterElement': {
      'ws': ['afterElement'],
      ']': ['inPath', 'push']
    }
  }

  function noop() {}

  function parsePath(path) {
    var keys = [];
    var index = -1;
    var c, newChar, key, type, transition, action, typeMap, mode = 'beforePath';

    var actions = {
      push: function() {
        if (key === undefined)
          return;

        keys.push(key);
        key = undefined;
      },

      append: function() {
        if (key === undefined)
          key = newChar
        else
          key += newChar;
      }
    };

    function maybeUnescapeQuote() {
      if (index >= path.length)
        return;

      var nextChar = path[index + 1];
      if ((mode == 'inSingleQuote' && nextChar == "'") ||
          (mode == 'inDoubleQuote' && nextChar == '"')) {
        index++;
        newChar = nextChar;
        actions.append();
        return true;
      }
    }

    while (mode) {
      index++;
      c = path[index];

      if (c == '\\' && maybeUnescapeQuote(mode))
        continue;

      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap['else'] || 'error';

      if (transition == 'error')
        return; // parse error;

      mode = transition[0];
      action = actions[transition[1]] || noop;
      newChar = transition[2] === undefined ? c : transition[2];
      action();

      if (mode === 'afterPath') {
        return keys;
      }
    }

    return; // parse error
  }

  function isIdent(s) {
    return identRegExp.test(s);
  }

  var constructorIsPrivate = {};

  function Path(parts, privateToken) {
    if (privateToken !== constructorIsPrivate)
      throw Error('Use Path.get to retrieve path objects');

    for (var i = 0; i < parts.length; i++) {
      this.push(String(parts[i]));
    }

    if (hasEval && this.length) {
      this.getValueFrom = this.compiledGetValueFromFn();
    }
  }

  // TODO(rafaelw): Make simple LRU cache
  var pathCache = {};

  function getPath(pathString) {
    if (pathString instanceof Path)
      return pathString;

    if (pathString == null || pathString.length == 0)
      pathString = '';

    if (typeof pathString != 'string') {
      if (isIndex(pathString.length)) {
        // Constructed with array-like (pre-parsed) keys
        return new Path(pathString, constructorIsPrivate);
      }

      pathString = String(pathString);
    }

    var path = pathCache[pathString];
    if (path)
      return path;

    var parts = parsePath(pathString);
    if (!parts)
      return invalidPath;

    var path = new Path(parts, constructorIsPrivate);
    pathCache[pathString] = path;
    return path;
  }

  Path.get = getPath;

  function formatAccessor(key) {
    if (isIndex(key)) {
      return '[' + key + ']';
    } else {
      return '["' + key.replace(/"/g, '\\"') + '"]';
    }
  }

  Path.prototype = createObject({
    __proto__: [],
    valid: true,

    toString: function() {
      var pathString = '';
      for (var i = 0; i < this.length; i++) {
        var key = this[i];
        if (isIdent(key)) {
          pathString += i ? '.' + key : key;
        } else {
          pathString += formatAccessor(key);
        }
      }

      return pathString;
    },

    getValueFrom: function(obj, directObserver) {
      for (var i = 0; i < this.length; i++) {
        if (obj == null)
          return;
        obj = obj[this[i]];
      }
      return obj;
    },

    iterateObjects: function(obj, observe) {
      for (var i = 0; i < this.length; i++) {
        if (i)
          obj = obj[this[i - 1]];
        if (!isObject(obj))
          return;
        observe(obj, this[0]);
      }
    },

    compiledGetValueFromFn: function() {
      var str = '';
      var pathString = 'obj';
      str += 'if (obj != null';
      var i = 0;
      var key;
      for (; i < (this.length - 1); i++) {
        key = this[i];
        pathString += isIdent(key) ? '.' + key : formatAccessor(key);
        str += ' &&\n     ' + pathString + ' != null';
      }
      str += ')\n';

      var key = this[i];
      pathString += isIdent(key) ? '.' + key : formatAccessor(key);

      str += '  return ' + pathString + ';\nelse\n  return undefined;';
      return new Function('obj', str);
    },

    setValueFrom: function(obj, value) {
      if (!this.length)
        return false;

      for (var i = 0; i < this.length - 1; i++) {
        if (!isObject(obj))
          return false;
        obj = obj[this[i]];
      }

      if (!isObject(obj))
        return false;

      obj[this[i]] = value;
      return true;
    }
  });

  var invalidPath = new Path('', constructorIsPrivate);
  invalidPath.valid = false;
  invalidPath.getValueFrom = invalidPath.setValueFrom = function() {};

  var MAX_DIRTY_CHECK_CYCLES = 1000;

  function dirtyCheck(observer) {
    var cycles = 0;
    while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check_()) {
      cycles++;
    }
    if (testingExposeCycleCount)
      global.dirtyCheckCycleCount = cycles;

    return cycles > 0;
  }

  function objectIsEmpty(object) {
    for (var prop in object)
      return false;
    return true;
  }

  function diffIsEmpty(diff) {
    return objectIsEmpty(diff.added) &&
           objectIsEmpty(diff.removed) &&
           objectIsEmpty(diff.changed);
  }

  function diffObjectFromOldObject(object, oldObject) {
    var added = {};
    var removed = {};
    var changed = {};

    for (var prop in oldObject) {
      var newValue = object[prop];

      if (newValue !== undefined && newValue === oldObject[prop])
        continue;

      if (!(prop in object)) {
        removed[prop] = undefined;
        continue;
      }

      if (newValue !== oldObject[prop])
        changed[prop] = newValue;
    }

    for (var prop in object) {
      if (prop in oldObject)
        continue;

      added[prop] = object[prop];
    }

    if (Array.isArray(object) && object.length !== oldObject.length)
      changed.length = object.length;

    return {
      added: added,
      removed: removed,
      changed: changed
    };
  }

  var eomTasks = [];
  function runEOMTasks() {
    if (!eomTasks.length)
      return false;

    for (var i = 0; i < eomTasks.length; i++) {
      eomTasks[i]();
    }
    eomTasks.length = 0;
    return true;
  }

  var runEOM = hasObserve ? (function(){
    var eomObj = { pingPong: true };
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
  })() :
  (function() {
    return function(fn) {
      eomTasks.push(fn);
    };
  })();

  var observedObjectCache = [];

  function newObservedObject() {
    var observer;
    var object;
    var discardRecords = false;
    var first = true;

    function callback(records) {
      if (observer && observer.state_ === OPENED && !discardRecords)
        observer.check_(records);
    }

    return {
      open: function(obs) {
        if (observer)
          throw Error('ObservedObject in use');

        if (!first)
          Object.deliverChangeRecords(callback);

        observer = obs;
        first = false;
      },
      observe: function(obj, arrayObserve) {
        object = obj;
        if (arrayObserve)
          Array.observe(object, callback);
        else
          Object.observe(object, callback);
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

  /*
   * The observedSet abstraction is a perf optimization which reduces the total
   * number of Object.observe observations of a set of objects. The idea is that
   * groups of Observers will have some object dependencies in common and this
   * observed set ensures that each object in the transitive closure of
   * dependencies is only observed once. The observedSet acts as a write barrier
   * such that whenever any change comes through, all Observers are checked for
   * changed values.
   *
   * Note that this optimization is explicitly moving work from setup-time to
   * change-time.
   *
   * TODO(rafaelw): Implement "garbage collection". In order to move work off
   * the critical path, when Observers are closed, their observed objects are
   * not Object.unobserve(d). As a result, it's possible that if the observedSet
   * is kept open, but some Observers have been closed, it could cause "leaks"
   * (prevent otherwise collectable objects from being collected). At some
   * point, we should implement incremental "gc" which keeps a list of
   * observedSets which may need clean-up and does small amounts of cleanup on a
   * timeout until all is clean.
   */

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
      if (!obj)
        return;

      if (obj === rootObj)
        rootObjProps[prop] = true;

      if (objects.indexOf(obj) < 0) {
        objects.push(obj);
        Object.observe(obj, callback);
      }

      observe(Object.getPrototypeOf(obj), prop);
    }

    function allRootObjNonObservedProps(recs) {
      for (var i = 0; i < recs.length; i++) {
        var rec = recs[i];
        if (rec.object !== rootObj ||
            rootObjProps[rec.name] ||
            rec.type === 'setPrototype') {
          return false;
        }
      }
      return true;
    }

    function callback(recs) {
      if (allRootObjNonObservedProps(recs))
        return;

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
    this.target_ = undefined; // TODO(rafaelw): Should be WeakRef
    this.directObserver_ = undefined;
    this.value_ = undefined;
    this.id_ = nextObserverId++;
  }

  Observer.prototype = {
    open: function(callback, target) {
      if (this.state_ != UNOPENED)
        throw Error('Observer has already been opened.');

      addToAll(this);
      this.callback_ = callback;
      this.target_ = target;
      this.connect_();
      this.state_ = OPENED;
      return this.value_;
    },

    close: function() {
      if (this.state_ != OPENED)
        return;

      removeFromAll(this);
      this.disconnect_();
      this.value_ = undefined;
      this.callback_ = undefined;
      this.target_ = undefined;
      this.state_ = CLOSED;
    },

    deliver: function() {
      if (this.state_ != OPENED)
        return;

      dirtyCheck(this);
    },

    report_: function(changes) {
      try {
        this.callback_.apply(this.target_, changes);
      } catch (ex) {
        Observer._errorThrownDuringCallback = true;
        console.error('Exception caught during observer callback: ' +
                       (ex.stack || ex));
      }
    },

    discardChanges: function() {
      this.check_(undefined, true);
      return this.value_;
    }
  }

  var collectObservers = !hasObserve;
  var allObservers;
  Observer._allObserversCount = 0;

  if (collectObservers) {
    allObservers = [];
  }

  function addToAll(observer) {
    Observer._allObserversCount++;
    if (!collectObservers)
      return;

    allObservers.push(observer);
  }

  function removeFromAll(observer) {
    Observer._allObserversCount--;
  }

  var runningMicrotaskCheckpoint = false;

  global.Platform = global.Platform || {};

  global.Platform.performMicrotaskCheckpoint = function() {
    if (runningMicrotaskCheckpoint)
      return;

    if (!collectObservers)
      return;

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
        if (observer.state_ != OPENED)
          continue;

        if (observer.check_())
          anyChanged = true;

        allObservers.push(observer);
      }
      if (runEOMTasks())
        anyChanged = true;
    } while (cycles < MAX_DIRTY_CHECK_CYCLES && anyChanged);

    if (testingExposeCycleCount)
      global.dirtyCheckCycleCount = cycles;

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
        this.directObserver_ = getObservedObject(this, this.value_,
                                                 this.arrayObserve);
      } else {
        this.oldObject_ = this.copyObject(this.value_);
      }

    },

    copyObject: function(object) {
      var copy = Array.isArray(object) ? [] : {};
      for (var prop in object) {
        copy[prop] = object[prop];
      };
      if (Array.isArray(object))
        copy.length = object.length;
      return copy;
    },

    check_: function(changeRecords, skipChanges) {
      var diff;
      var oldValues;
      if (hasObserve) {
        if (!changeRecords)
          return false;

        oldValues = {};
        diff = diffObjectFromChangeRecords(this.value_, changeRecords,
                                           oldValues);
      } else {
        oldValues = this.oldObject_;
        diff = diffObjectFromOldObject(this.value_, this.oldObject_);
      }

      if (diffIsEmpty(diff))
        return false;

      if (!hasObserve)
        this.oldObject_ = this.copyObject(this.value_);

      this.report_([
        diff.added || {},
        diff.removed || {},
        diff.changed || {},
        function(property) {
          return oldValues[property];
        }
      ]);

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
      if (this.state_ != OPENED)
        return;

      if (hasObserve)
        this.directObserver_.deliver(false);
      else
        dirtyCheck(this);
    },

    discardChanges: function() {
      if (this.directObserver_)
        this.directObserver_.deliver(true);
      else
        this.oldObject_ = this.copyObject(this.value_);

      return this.value_;
    }
  });

  function ArrayObserver(array) {
    if (!Array.isArray(array))
      throw Error('Provided object is not an Array');
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
        if (!changeRecords)
          return false;
        splices = projectArraySplices(this.value_, changeRecords);
      } else {
        splices = calcSplices(this.value_, 0, this.value_.length,
                              this.oldObject_, 0, this.oldObject_.length);
      }

      if (!splices || !splices.length)
        return false;

      if (!hasObserve)
        this.oldObject_ = this.copyObject(this.value_);

      this.report_([splices]);
      return true;
    }
  });

  ArrayObserver.applySplices = function(previous, current, splices) {
    splices.forEach(function(splice) {
      var spliceArgs = [splice.index, splice.removed.length];
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
      if (hasObserve)
        this.directObserver_ = getObservedSet(this, this.object_);

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
      if (skipChanges || areSameValue(this.value_, oldValue))
        return false;

      this.report_([this.value_, oldValue, this]);
      return true;
    },

    setValue: function(newValue) {
      if (this.path_)
        this.path_.setValueFrom(this.object_, newValue);
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
          object = this.observed_[i]
          if (object !== observerSentinel) {
            needsDirectObserver = true;
            break;
          }
        }

        if (needsDirectObserver)
          this.directObserver_ = getObservedSet(this, object);
      }

      this.check_(undefined, !this.reportChangesOnOpen_);
    },

    disconnect_: function() {
      for (var i = 0; i < this.observed_.length; i += 2) {
        if (this.observed_[i] === observerSentinel)
          this.observed_[i + 1].close();
      }
      this.observed_.length = 0;
      this.value_.length = 0;

      if (this.directObserver_) {
        this.directObserver_.close(this);
        this.directObserver_ = undefined;
      }
    },

    addPath: function(object, path) {
      if (this.state_ != UNOPENED && this.state_ != RESETTING)
        throw Error('Cannot add paths once started.');

      var path = getPath(path);
      this.observed_.push(object, path);
      if (!this.reportChangesOnOpen_)
        return;
      var index = this.observed_.length / 2 - 1;
      this.value_[index] = path.getValueFrom(object);
    },

    addObserver: function(observer) {
      if (this.state_ != UNOPENED && this.state_ != RESETTING)
        throw Error('Cannot add observers once started.');

      this.observed_.push(observerSentinel, observer);
      if (!this.reportChangesOnOpen_)
        return;
      var index = this.observed_.length / 2 - 1;
      this.value_[index] = observer.open(this.deliver, this);
    },

    startReset: function() {
      if (this.state_ != OPENED)
        throw Error('Can only reset while open');

      this.state_ = RESETTING;
      this.disconnect_();
    },

    finishReset: function() {
      if (this.state_ != RESETTING)
        throw Error('Can only finishReset after startReset');
      this.state_ = OPENED;
      this.connect_();

      return this.value_;
    },

    iterateObjects_: function(observe) {
      var object;
      for (var i = 0; i < this.observed_.length; i += 2) {
        object = this.observed_[i]
        if (object !== observerSentinel)
          this.observed_[i + 1].iterateObjects(object, observe)
      }
    },

    check_: function(changeRecords, skipChanges) {
      var oldValues;
      for (var i = 0; i < this.observed_.length; i += 2) {
        var object = this.observed_[i];
        var path = this.observed_[i+1];
        var value;
        if (object === observerSentinel) {
          var observable = path;
          value = this.state_ === UNOPENED ?
              observable.open(this.deliver, this) :
              observable.discardChanges();
        } else {
          value = path.getValueFrom(object);
        }

        if (skipChanges) {
          this.value_[i / 2] = value;
          continue;
        }

        if (areSameValue(value, this.value_[i / 2]))
          continue;

        oldValues = oldValues || [];
        oldValues[i / 2] = this.value_[i / 2];
        this.value_[i / 2] = value;
      }

      if (!oldValues)
        return false;

      // TODO(rafaelw): Having observed_ as the third callback arg here is
      // pretty lame API. Fix.
      this.report_([this.value_, oldValues, this.observed_]);
      return true;
    }
  });

  function identFn(value) { return value; }

  function ObserverTransform(observable, getValueFn, setValueFn,
                             dontPassThroughSet) {
    this.callback_ = undefined;
    this.target_ = undefined;
    this.value_ = undefined;
    this.observable_ = observable;
    this.getValueFn_ = getValueFn || identFn;
    this.setValueFn_ = setValueFn || identFn;
    // TODO(rafaelw): This is a temporary hack. PolymerExpressions needs this
    // at the moment because of a bug in it's dependency tracking.
    this.dontPassThroughSet_ = dontPassThroughSet;
  }

  ObserverTransform.prototype = {
    open: function(callback, target) {
      this.callback_ = callback;
      this.target_ = target;
      this.value_ =
          this.getValueFn_(this.observable_.open(this.observedCallback_, this));
      return this.value_;
    },

    observedCallback_: function(value) {
      value = this.getValueFn_(value);
      if (areSameValue(value, this.value_))
        return;
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
      if (!this.dontPassThroughSet_ && this.observable_.setValue)
        return this.observable_.setValue(value);
    },

    close: function() {
      if (this.observable_)
        this.observable_.close();
      this.callback_ = undefined;
      this.target_ = undefined;
      this.observable_ = undefined;
      this.value_ = undefined;
      this.getValueFn_ = undefined;
      this.setValueFn_ = undefined;
    }
  }

  var expectedRecordTypes = {
    add: true,
    update: true,
    delete: true
  };

  function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
    var added = {};
    var removed = {};

    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      if (!expectedRecordTypes[record.type]) {
        console.error('Unknown changeRecord type: ' + record.type);
        console.error(record);
        continue;
      }

      if (!(record.name in oldValues))
        oldValues[record.name] = record.oldValue;

      if (record.type == 'update')
        continue;

      if (record.type == 'add') {
        if (record.name in removed)
          delete removed[record.name];
        else
          added[record.name] = true;

        continue;
      }

      // type = 'delete'
      if (record.name in added) {
        delete added[record.name];
        delete oldValues[record.name];
      } else {
        removed[record.name] = true;
      }
    }

    for (var prop in added)
      added[prop] = object[prop];

    for (var prop in removed)
      removed[prop] = undefined;

    var changed = {};
    for (var prop in oldValues) {
      if (prop in added || prop in removed)
        continue;

      var newValue = object[prop];
      if (oldValues[prop] !== newValue)
        changed[prop] = newValue;
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

    // Note: This function is *based* on the computation of the Levenshtein
    // "edit" distance. The one change is that "updates" are treated as two
    // edits - not one. With Array splices, an update is really a delete
    // followed by an add. By retaining this, we optimize for "keeping" the
    // maximum array items in the original array. For example:
    //
    //   'xxxx123' -> '123yyyy'
    //
    // With 1-edit updates, the shortest path would be just to update all seven
    // characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
    // leaves the substring '123' intact.
    calcEditDistances: function(current, currentStart, currentEnd,
                                old, oldStart, oldEnd) {
      // "Deletion" columns
      var rowCount = oldEnd - oldStart + 1;
      var columnCount = currentEnd - currentStart + 1;
      var distances = new Array(rowCount);

      // "Addition" rows. Initialize null column.
      for (var i = 0; i < rowCount; i++) {
        distances[i] = new Array(columnCount);
        distances[i][0] = i;
      }

      // Initialize null row
      for (var j = 0; j < columnCount; j++)
        distances[0][j] = j;

      for (var i = 1; i < rowCount; i++) {
        for (var j = 1; j < columnCount; j++) {
          if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
            distances[i][j] = distances[i - 1][j - 1];
          else {
            var north = distances[i - 1][j] + 1;
            var west = distances[i][j - 1] + 1;
            distances[i][j] = north < west ? north : west;
          }
        }
      }

      return distances;
    },

    // This starts at the final weight, and walks "backward" by finding
    // the minimum previous weight recursively until the origin of the weight
    // matrix.
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
        if (west < north)
          min = west < northWest ? west : northWest;
        else
          min = north < northWest ? north : northWest;

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

    /**
     * Splice Projection functions:
     *
     * A splice map is a representation of how a previous array of items
     * was transformed into a new array of items. Conceptually it is a list of
     * tuples of
     *
     *   <index, removed, addedCount>
     *
     * which are kept in ascending index order of. The tuple represents that at
     * the |index|, |removed| sequence of items were removed, and counting forward
     * from |index|, |addedCount| items were added.
     */

    /**
     * Lacking individual splice mutation information, the minimal set of
     * splices can be synthesized given the previous state and final state of an
     * array. The basic approach is to calculate the edit distance matrix and
     * choose the shortest path through it.
     *
     * Complexity: O(l * p)
     *   l: The length of the current array
     *   p: The length of the old array
     */
    calcSplices: function(current, currentStart, currentEnd,
                          old, oldStart, oldEnd) {
      var prefixCount = 0;
      var suffixCount = 0;

      var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
      if (currentStart == 0 && oldStart == 0)
        prefixCount = this.sharedPrefix(current, old, minLength);

      if (currentEnd == current.length && oldEnd == old.length)
        suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);

      currentStart += prefixCount;
      oldStart += prefixCount;
      currentEnd -= suffixCount;
      oldEnd -= suffixCount;

      if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
        return [];

      if (currentStart == currentEnd) {
        var splice = newSplice(currentStart, [], 0);
        while (oldStart < oldEnd)
          splice.removed.push(old[oldStart++]);

        return [ splice ];
      } else if (oldStart == oldEnd)
        return [ newSplice(currentStart, [], currentEnd - currentStart) ];

      var ops = this.spliceOperationsFromEditDistances(
          this.calcEditDistances(current, currentStart, currentEnd,
                                 old, oldStart, oldEnd));

      var splice = undefined;
      var splices = [];
      var index = currentStart;
      var oldIndex = oldStart;
      for (var i = 0; i < ops.length; i++) {
        switch(ops[i]) {
          case EDIT_LEAVE:
            if (splice) {
              splices.push(splice);
              splice = undefined;
            }

            index++;
            oldIndex++;
            break;
          case EDIT_UPDATE:
            if (!splice)
              splice = newSplice(index, [], 0);

            splice.addedCount++;
            index++;

            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
          case EDIT_ADD:
            if (!splice)
              splice = newSplice(index, [], 0);

            splice.addedCount++;
            index++;
            break;
          case EDIT_DELETE:
            if (!splice)
              splice = newSplice(index, [], 0);

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
      for (var i = 0; i < searchLength; i++)
        if (!this.equals(current[i], old[i]))
          return i;
      return searchLength;
    },

    sharedSuffix: function(current, old, searchLength) {
      var index1 = current.length;
      var index2 = old.length;
      var count = 0;
      while (count < searchLength && this.equals(current[--index1], old[--index2]))
        count++;

      return count;
    },

    calculateSplices: function(current, previous) {
      return this.calcSplices(current, 0, current.length, previous, 0,
                              previous.length);
    },

    equals: function(currentValue, previousValue) {
      return currentValue === previousValue;
    }
  };

  var arraySplice = new ArraySplice();

  function calcSplices(current, currentStart, currentEnd,
                       old, oldStart, oldEnd) {
    return arraySplice.calcSplices(current, currentStart, currentEnd,
                                   old, oldStart, oldEnd);
  }

  function intersect(start1, end1, start2, end2) {
    // Disjoint
    if (end1 < start2 || end2 < start1)
      return -1;

    // Adjacent
    if (end1 == start2 || end2 == start1)
      return 0;

    // Non-zero intersect, span1 first
    if (start1 < start2) {
      if (end1 < end2)
        return end1 - start2; // Overlap
      else
        return end2 - start2; // Contained
    } else {
      // Non-zero intersect, span2 first
      if (end2 < end1)
        return end2 - start1; // Overlap
      else
        return end1 - start1; // Contained
    }
  }

  function mergeSplice(splices, index, removed, addedCount) {

    var splice = newSplice(index, removed, addedCount);

    var inserted = false;
    var insertionOffset = 0;

    for (var i = 0; i < splices.length; i++) {
      var current = splices[i];
      current.index += insertionOffset;

      if (inserted)
        continue;

      var intersectCount = intersect(splice.index,
                                     splice.index + splice.removed.length,
                                     current.index,
                                     current.index + current.addedCount);

      if (intersectCount >= 0) {
        // Merge the two splices

        splices.splice(i, 1);
        i--;

        insertionOffset -= current.addedCount - current.removed.length;

        splice.addedCount += current.addedCount - intersectCount;
        var deleteCount = splice.removed.length +
                          current.removed.length - intersectCount;

        if (!splice.addedCount && !deleteCount) {
          // merged splice is a noop. discard.
          inserted = true;
        } else {
          var removed = current.removed;

          if (splice.index < current.index) {
            // some prefix of splice.removed is prepended to current.removed.
            var prepend = splice.removed.slice(0, current.index - splice.index);
            Array.prototype.push.apply(prepend, removed);
            removed = prepend;
          }

          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            // some suffix of splice.removed is appended to current.removed.
            var append = splice.removed.slice(current.index + current.addedCount - splice.index);
            Array.prototype.push.apply(removed, append);
          }

          splice.removed = removed;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        // Insert splice here.

        inserted = true;

        splices.splice(i, 0, splice);
        i++;

        var offset = splice.addedCount - splice.removed.length
        current.index += offset;
        insertionOffset += offset;
      }
    }

    if (!inserted)
      splices.push(splice);
  }

  function createInitialSplices(array, changeRecords) {
    var splices = [];

    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      switch(record.type) {
        case 'splice':
          mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
          break;
        case 'add':
        case 'update':
        case 'delete':
          if (!isIndex(record.name))
            continue;
          var index = toNumber(record.name);
          if (index < 0)
            continue;
          mergeSplice(splices, index, [record.oldValue], 1);
          break;
        default:
          console.error('Unexpected record type: ' + JSON.stringify(record));
          break;
      }
    }

    return splices;
  }

  function projectArraySplices(array, changeRecords) {
    var splices = [];

    createInitialSplices(array, changeRecords).forEach(function(splice) {
      if (splice.addedCount == 1 && splice.removed.length == 1) {
        if (splice.removed[0] !== array[splice.index])
          splices.push(splice);

        return
      };

      splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount,
                                           splice.removed, 0, splice.removed.length));
    });

    return splices;
  }

  global.Observer = Observer;
  global.Observer.runEOM_ = runEOM;
  global.Observer.observerSentinel_ = observerSentinel; // for testing.
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
})(typeof global !== 'undefined' && global && typeof module !== 'undefined' && module ? global : this || window);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[44,8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9JbnRyb1ZpZXcuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLmpzIiwiYXBwL0VudGl0aWVzL1JlcG9ydHMvRXZlbnRzL1JlcG9ydFdhc1Bvc3RlZC5qcyIsImFwcC9FbnRpdGllcy9SZXBvcnRzL1JlcG9ydC5qcyIsImFwcC9Qcm92aWRlcnMvQXBwU2VydmljZVByb3ZpZGVyLmpzIiwiYXBwL1JlcG9zaXRvcmllcy9SZXBvcnRSZXBvc2l0b3J5LmpzIiwiYXBwL21haW4uanMiLCJjb25maWcvYXBwLmpzIiwiY29uZmlnL2NvbW1hbmRzLmpzIiwiY29uZmlnL2NvbmZpZy5qcyIsImNvbmZpZy9oYW5kbGVycy5qcyIsImNvbmZpZy9sb2NhbC9hcHAuanMiLCJjb25maWcvdmlld3MuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRCdXMuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRIYW5kbGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9Db21tYW5kU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9Db21tYW5kZXJUcmFpdC5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0Rpc3BhdGNoYWJsZVRyYWl0LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRXZlbnREaXNwYXRjaGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRXZlbnRHZW5lcmF0b3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29uZmlnL01vZHVsZUxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db25maWcvUmVwb3NpdG9yeS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db250YWluZXIvQ29udGFpbmVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0RPTS9XaW5kb3dTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0F1dGhlbnRpY2F0aW9uRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0Vycm9yU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9WYWxpZGF0aW9uRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL2Vycm9yQ29uc3RydWN0b3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXZlbnRzL0Rpc3BhdGNoZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9BcHBsaWNhdGlvbi5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Gb3VuZGF0aW9uL1Byb3ZpZGVyUmVwb3NpdG9yeS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Gb3VuZGF0aW9uL3N0YXJ0LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0xvZy9Db25zb2xlTG9nZ2VyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0xvZy9Mb2dTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9TZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvb2JzZXJ2ZS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L3N0YXRlLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1ZpZXcvVmlldy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9WaWV3L1ZpZXdTZXJ2aWNlUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZXM2aWZ5L25vZGVfbW9kdWxlcy90cmFjZXVyL2Jpbi90cmFjZXVyLXJ1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvb2JzZXJ2ZS1qcy9zcmMvb2JzZXJ2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQUEsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsbUJBQWtCLENBQUMsQ0FBQztBQUN2QyxBQUFJLEVBQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyx5QkFBd0IsQ0FBQyxDQUFDO0FBQ2hELEVBQUssSUFBRSxnQ0FBSyxPQUFNLE1BQUM7Y0FFbkIsU0FBTSxVQUFRLENBRUUsQUFBTTs7Ozs2RkFFTCxJQUFHLEdBQUU7QUFFZCxJQUFLLElBQUUsRUFBSyxLQUFHLEtBQUM7QUFDaEIsSUFBSyxPQUFLLGdDQUFLLEdBQUUsU0FBQztBQUVsQixPQUFLLEdBQUcsQUFBQyxDQUFDLGlCQUFnQixHQUFHLFNBQUEsQ0FBQTtTQUFLLENBQUEsR0FBRSxBQUFDLENBQUMsQ0FBQSxLQUFLLENBQUcsRUFBQSxDQUFDO0VBQUEsRUFBQyxDQUFDO0FBUXpEOzt5Q0FOSSxVQUFTLENBQVQsVUFBVyxJQUFHLENBQUcsQ0FBQSxRQUFPO0FBRXBCLE1BQUssSUFBRSxFQUFLLEtBQUcsS0FBQztBQUNoQixBQUFJLE1BQUEsQ0FBQSxPQUFNLEVBQUksQ0FBQSxHQUFFLEtBQUssQUFBQyxDQUFDLG1CQUFrQixDQUFHLEVBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBQyxDQUFDLENBQUM7QUFDN0QsT0FBRyxRQUFRLEFBQUMsQ0FBQyxPQUFNLENB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3R5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFZpZXcgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlldycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIHtsb2d9ID0gaGVscGVycztcblxuY2xhc3MgSW50cm9WaWV3IGV4dGVuZHMgVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIHtldmVudHN9ID0gYXBwO1xuXG4gICAgICAgIGV2ZW50cy5vbigncmVwb3J0V2FzUG9zdGVkJywgZSA9PiBsb2coZS50eXBlLCBlKSk7IFxuICAgIH1cbiAgICBwb3N0UmVwb3J0KG5hbWUsIGluY2lkZW50KSB7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIGNvbW1hbmQgPSBhcHAubWFrZSgncG9zdFJlcG9ydENvbW1hbmQnLCBbbmFtZSwgaW5jaWRlbnRdKTsgICAgIFxuICAgICAgICB0aGlzLmV4ZWN1dGUoY29tbWFuZCk7IFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1ZpZXc7IiwiXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbmNpZGVudCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5jaWRlbnQgPSBpbmNpZGVudDtcbiAgICB9XG4gICAgc3RhdGljIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdwb3N0UmVwb3J0Q29tbWFuZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RSZXBvcnRDb21tYW5kOyIsInZhciBDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRIYW5kbGVyJyk7XG52YXIgaGVscGVycyAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXIgZXh0ZW5kcyBDb21tYW5kSGFuZGxlciB7XG5cbiAgICBoYW5kbGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB7bmFtZSwgaW5jaWRlbnR9ID0gY29tbWFuZDtcbiAgICAgICAgdmFyIHthcHB9ID0gJHRoaXM7XG4gICAgICAgIHZhciBSZXBvcnQgPSBhcHAubWFrZSgnUmVwb3J0Jyk7XG5cbiAgICAgICAgLy8gUmVwb3J0LnBvc3QobmFtZSwgaW5jaWRlbnQpXG4gICAgICAgIC8vICAgICAudGhlbiggc2F2ZWRSZXBvcnQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudHNGb3Ioc2F2ZWRSZXBvcnQpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5jYXRjaCh0ZXJtaW5hdGVFcnJvcik7XG4gICAgICAgIC8vICAgICBcbiAgICAgICAgXG4gICAgICAgIGFzeW5jKGZ1bmN0aW9uKiAoKSB7XG5cbiAgICAgICAgICAgIHZhciByZXBvcnQgPSB5aWVsZCBSZXBvcnQucG9zdChuYW1lLCBpbmNpZGVudCk7XG4gICAgICAgICAgICAkdGhpcy5kaXNwYXRjaEV2ZW50c0ZvcihyZXBvcnQpO1xuXG4gICAgICAgIH0pKCkuY2F0Y2godGVybWluYXRlRXJyb3IpO1xuICAgIH1cbn1cblxudmFyIHt0ZXJtaW5hdGVFcnJvciwgYXN5bmMsIGxvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlcjsiLCJcbmNsYXNzIFJlcG9ydFdhc1Bvc3RlZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZXBvcnQpIHtcblxuICAgICAgICB0aGlzLnZhbHVlID0gcmVwb3J0O1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmdldE5hbWUoKTtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuXG4gICAgICAgIHJldHVybiAncmVwb3J0V2FzUG9zdGVkJztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3J0V2FzUG9zdGVkOyIsInZhciBFdmVudEdlbmVyYXRvciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudEdlbmVyYXRvcicpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLlZhbGlkYXRpb25FcnJvcicpO1xuXG5jbGFzcyBSZXBvcnQge1xuXG4gICAgLy8gdXNlcyBFdmVudEdlbmVyYXRvclxuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaW5jaWRlbnQpIHtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmluY2lkZW50ID0gaW5jaWRlbnQ7XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHN0YXRpYyAqcGVyc2lzdChyZXBvcnQpIHtcblxuICAgICAgICB2YXIgbXlOYW1lID0gdGhpcy5teU5hbWUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYGhleSByZXBvcnQgMTogJHtteU5hbWV9YCk7XG4gICAgICAgIHZhciBzYXZlZFJlcG9ydCA9IHlpZWxkIHdhaXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2hleSByZXBvcnQgMicpO1xuICAgICAgICB5aWVsZCB3YWl0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXkgcmVwb3J0IDMnKTtcbiAgICAgICAgcmV0dXJuICdpIGFtIGRvbmUhJztcbiAgICB9XG4gICAgc3RhdGljIG15TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ3dlaXJkTmFtZSc7XG4gICAgfVxuICAgIHN0YXRpYyBwb3N0KC4uLmFyZ3MpIHtcblxuICAgICAgICB2YXIgYXBwID0gUmVwb3J0LmdldEFwcGxpY2F0aW9uKCk7XG4gICAgICAgIHZhciB7cmVwb3J0UmVwb3NpdG9yeX0gPSBhcHA7XG5cbiAgICAgICAgLy8gcmV0dXJuIGFwcC5yZXBvcnRSZXBvc2l0b3J5LnNhdmUocmVwb3J0KVxuICAgICAgICAvLyAgICAgIC50aGVuKCBzYXZlZFJlcG9ydCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGV2ZW50ID0gYXBwLm1ha2UoJ3JlcG9ydFdhc1Bvc3RlZCcsIFtzYXZlZFJlcG9ydF0pO1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiBzYXZlZFJlcG9ydC5yYWlzZShldmVudCk7XG4gICAgICAgIC8vICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdzaW11bGF0aW5nIGVycm9yJyk7XG5cblxuICAgICAgICByZXR1cm4gYXN5bmMoZnVuY3Rpb24qICgpIHtcblxuICAgICAgICAgICAgdmFyIHJlcG9ydCA9IGFwcC5tYWtlKCdyZXBvcnQnLCBhcmdzKTtcbiAgICAgICAgICAgIHJlcG9ydCA9IHlpZWxkIHJlcG9ydFJlcG9zaXRvcnkuc2F2ZShyZXBvcnQpO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gYXBwLm1ha2UoJ3JlcG9ydFdhc1Bvc3RlZCcsIFtyZXBvcnRdKTtcbiAgICAgICAgICAgIHJldHVybiByZXBvcnQucmFpc2UoZXZlbnQpO1xuXG4gICAgICAgIH0pKCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gUmVwb3J0LmFwcF87XG4gICAgfVxuICAgIHN0YXRpYyBzZXRBcHBsaWNhdGlvbihhcHApIHtcblxuICAgICAgICBSZXBvcnQuYXBwXyA9IGFwcDtcbiAgICB9XG59XG5cblxudmFyIHtsb2csIGV4dGVuZFByb3RvT2YsIHdhaXQsIGFzeW5jfSA9IGhlbHBlcnM7XG5leHRlbmRQcm90b09mKFJlcG9ydCwgRXZlbnRHZW5lcmF0b3IpO1xuXG5SZXBvcnQucGVyc2lzdCA9IGFzeW5jKFJlcG9ydC5wZXJzaXN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnQ7IiwidmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBSZXBvcnQgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuUmVwb3J0cy5SZXBvcnQnKTtcbnZhciBSZXBvcnRXYXNQb3N0ZWQgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuUmVwb3J0cy5FdmVudHMuUmVwb3J0V2FzUG9zdGVkJyk7XG52YXIgUmVwb3J0UmVwb3NpdG9yeSA9IHJlcXVpcmUoJ0FwcC5SZXBvc2l0b3JpZXMuUmVwb3J0UmVwb3NpdG9yeScpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBBcHBTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgYm9vdCgpIHtcblxuICAgIH1cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgLy8gVGhpcyBzZXJ2aWNlIHByb3ZpZGVyIGlzIGEgY29udmVuaWVudCBwbGFjZSB0byByZWdpc3RlciB5b3VyIHNlcnZpY2VzXG4gICAgICAgIC8vIGluIHRoZSBJb0MgY29udGFpbmVyLlxuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJFbnRpdGllcy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlclJlcG9zaXRvcmllcy5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJFbnRpdGllcygpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG5cbiAgICBhcHAuYmluZFNoYXJlZCgnUmVwb3J0JywgYXBwID0+IHtcbiAgICAgICAgUmVwb3J0LnNldEFwcGxpY2F0aW9uKGFwcCk7XG4gICAgICAgIHJldHVybiBSZXBvcnQ7XG4gICAgfSk7XG4gICAgYXBwLmJpbmQoJ3JlcG9ydCcsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBhcHAuUmVwb3J0KC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIGFwcC5iaW5kKCdyZXBvcnRXYXNQb3N0ZWQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVwb3J0V2FzUG9zdGVkKC4uLmFyZ3MpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJSZXBvc2l0b3JpZXMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuXG4gICAgYXBwLmJpbmRTaGFyZWQoJ3JlcG9ydFJlcG9zaXRvcnknLCBhcHAgPT4gbmV3IFJlcG9ydFJlcG9zaXRvcnkoYXBwKSk7XG59XG5cbnZhciB7bG9nfSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwU2VydmljZVByb3ZpZGVyOyIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuQXV0aGVudGljYXRpb25FcnJvcicpO1xuXG5jbGFzcyBSZXBvcnRSZXBvc2l0b3J5IHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cbiAgICBzYXZlKHJlcG9ydCkge1xuXG4gICAgICAgIGxvZyhgc2F2aW5nIHJlcG9ydCwgcGxlYXNlIHdhaXTigKZgKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB3YWl0KCkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKGBjcmFhcHBwcGApO1xuXG4gICAgICAgICAgICBsb2coYHJlcG9ydCBzYXZlZCwgdGhhbmsgeW91LmApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuXG52YXIge2xvZywgd2FpdH0gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9ydFJlcG9zaXRvcnk7IiwidmFyIEFwcCA9IHJlcXVpcmUoJ1dpbGRjYXQuRm91bmRhdGlvbi5BcHBsaWNhdGlvbicpO1xud2luZG93LkFwcCA9IEFwcDsiLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbi8qXG4gKiBBcHBsaWNhdGlvbiBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICovXG52YXIgQXBwU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnQXBwLlByb3ZpZGVycy5BcHBTZXJ2aWNlUHJvdmlkZXInKTtcblxuLypcbiAqIEZyYW1ld29yayBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICovXG52YXIgTG9nU2VydmljZVByb3ZpZGVyICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2cuTG9nU2VydmljZVByb3ZpZGVyJyk7XG52YXIgV2luZG93U2VydmljZVByb3ZpZGVyICAgID0gcmVxdWlyZSgnV2lsZGNhdC5ET00uV2luZG93U2VydmljZVByb3ZpZGVyJyk7XG52YXIgRXJyb3JQcm92aWRlciAgICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuRXJyb3JTZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBWaWV3U2VydmljZVByb3ZpZGVyICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlld1NlcnZpY2VQcm92aWRlcicpO1xudmFyIENvbW1hbmRlclNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRTZXJ2aWNlUHJvdmlkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVidWc6IGZhbHNlLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvKlxuICAgICAgICAgKiBBcHBsaWNhdGlvbiBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICAgICAgICAgKi9cbiAgICAgICAgIEFwcFNlcnZpY2VQcm92aWRlcixcblxuICAgICAgICAvKlxuICAgICAgICAgKiBGcmFtZXdvcmsgU2VydmljZSBQcm92aWRlcnMuLi5cbiAgICAgICAgICovXG4gICAgICAgIExvZ1NlcnZpY2VQcm92aWRlcixcbiAgICAgICAgV2luZG93U2VydmljZVByb3ZpZGVyLFxuICAgICAgICBFcnJvclByb3ZpZGVyLFxuICAgICAgICBWaWV3U2VydmljZVByb3ZpZGVyLFxuICAgICAgICBDb21tYW5kZXJTZXJ2aWNlUHJvdmlkZXIsXG4gICAgXSxcbiAgICBsb2NhbGU6ICdlbicsXG4gICAgZ2V0IGJyb3dzZXIoKSB7cmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O30sXG59OyIsInZhciBQb3N0UmVwb3J0Q29tbWFuZCA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5Qb3N0UmVwb3J0Q29tbWFuZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgICdhYnN0cmFjdCc6ICdwb3N0UmVwb3J0Q29tbWFuZCcsXG4gICAgICAgICdjb21tYW5kJyA6IFBvc3RSZXBvcnRDb21tYW5kLFxuICAgIH1cbl07IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2FwcCc6ICAgICAgIHJlcXVpcmUoJy4vYXBwJyksXG4gICAgJ2xvY2FsLmFwcCc6IHJlcXVpcmUoJy4vbG9jYWwvYXBwJyksXG4gICAgJ2NvbW1hbmRzJzogIHJlcXVpcmUoJy4vY29tbWFuZHMnKSxcbiAgICAnaGFuZGxlcnMnOiAgcmVxdWlyZSgnLi9oYW5kbGVycycpLFxuICAgICd2aWV3cyc6ICAgICByZXF1aXJlKCcuL3ZpZXdzJyksXG59O1xuIiwidmFyIFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5Qb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICAnYWJzdHJhY3QnOiAncG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyJyxcbiAgICAgICAgJ2hhbmRsZXInIDogUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLFxuICAgIH1cbl07IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVidWc6IHRydWUsXG59OyIsInZhciBJbnRyb1ZpZXcgPSByZXF1aXJlKCdBcHAuQnJvd3Nlci5WaWV3cy5JbnRyb1ZpZXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG5cbiAgICB7XG4gICAgICAgICdhYnN0cmFjdCcgICAgOiAnaW50cm9WaWV3JyxcbiAgICAgICAgJyRjb25zdHJ1Y3Rvcic6IEludHJvVmlldyxcbiAgICAgICAgJ2J1aWxkJyAgICAgICA6ICdzaW5nbGV0b24nLFxuICAgIH1cblxuXTsiLCJcbmNsYXNzIENvbW1hbmRCdXMge1xuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShjb21tYW5kKSB7XG5cbiAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gY29tbWFuZC5jb25zdHJ1Y3Rvci5nZXROYW1lKCk7XG4gICAgICAgIHZhciBoYW5kbGVyTmFtZSA9IGAke2NvbW1hbmROYW1lfUhhbmRsZXJgO1xuICAgICAgICB2YXIgaGFuZGxlciAgICAgPSB0aGlzLmFwcC5tYWtlKGhhbmRsZXJOYW1lKTtcblxuICAgICAgICBoYW5kbGVyLmhhbmRsZShjb21tYW5kKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWFuZEJ1czsiLCJ2YXIgRGlzcGF0Y2hhYmxlVHJhaXQgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5FdmVudHMuRGlzcGF0Y2hhYmxlVHJhaXQnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgQ29tbWFuZEhhbmRsZXIge1xuXG4gICAgLy8gdXNlcyBEaXNwYXRjaGFibGVUcmFpdFxuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxufVxuXG52YXIge2V4dGVuZFByb3RvT2Z9ID0gaGVscGVycztcbmV4dGVuZFByb3RvT2YoQ29tbWFuZEhhbmRsZXIsIERpc3BhdGNoYWJsZVRyYWl0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kSGFuZGxlcjsiLCJ2YXIge2xvZ30gICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29tbWFuZEJ1cyAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZEJ1cycpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudERpc3BhdGNoZXInKTtcblxuY2xhc3MgQ29tbWFuZFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyQ29tbWFuZEJ1cy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlckNvbW1hbmRzLmNhbGwodGhpcyk7XG4gICAgICAgIHJlZ2lzdGVySGFuZGxlcnMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJFdmVudERpc3BhdGNoZXIuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tbWFuZEJ1cygpIHtcblxuICAgIHRoaXMuYXBwLmJpbmRTaGFyZWQoJ2NvbW1hbmRCdXMnLCBhcHAgPT4gbmV3IENvbW1hbmRCdXMoYXBwKSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckNvbW1hbmRzKCkge1xuXG4gICAgdmFyIGFwcCAgICAgID0gdGhpcy5hcHA7XG4gICAgdmFyIGNvbW1hbmRzID0gYXBwLmNvbmZpZy5nZXQoJ2NvbW1hbmRzJyk7XG5cbiAgICBmb3IgKHZhciB7YWJzdHJhY3QsIGNvbW1hbmR9IG9mIGNvbW1hbmRzKSB7XG4gICAgICAgIFxuICAgICAgICBhcHAuYmluZChhYnN0cmFjdCwgZnVuY3Rpb24oYXBwLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGNvbW1hbmQoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcnMoKSB7XG5cbiAgICB2YXIgYXBwICAgICAgPSB0aGlzLmFwcDtcbiAgICB2YXIgaGFuZGxlcnMgPSBhcHAuY29uZmlnLmdldCgnaGFuZGxlcnMnKTtcblxuICAgIGZvciAodmFyIHthYnN0cmFjdCwgaGFuZGxlcn0gb2YgaGFuZGxlcnMpIHtcbiAgICAgICAgXG4gICAgICAgIGFwcC5iaW5kKGFic3RyYWN0LCBmdW5jdGlvbihhcHAsIC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgaGFuZGxlcihhcHAsIC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50RGlzcGF0Y2hlcigpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgdmFyIHtldmVudHMsIGxvZ2dlcn0gPSBhcHA7XG5cbiAgICBhcHAuYmluZCgnZXZlbnREaXNwYXRjaGVyJywgYXBwID0+IG5ldyBFdmVudERpc3BhdGNoZXIoZXZlbnRzLCBsb2dnZXIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kU2VydmljZVByb3ZpZGVyOyIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgQ29tbWFuZGVyVHJhaXQge1xuXG4gICAgZXhlY3V0ZShjb21tYW5kLCBpbnB1dCkge1xuXG4gICAgICAgIHZhciBidXMgPSB0aGlzLmdldENvbW1hbmRCdXMoKTtcbiAgICAgICAgYnVzLmV4ZWN1dGUoY29tbWFuZCk7XG4gICAgfVxuICAgIGdldENvbW1hbmRCdXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLm1ha2UoJ2NvbW1hbmRCdXMnKTtcbiAgICB9XG59XG5cbnZhciB7XG4gICAgbG9nLFxufSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWFuZGVyVHJhaXQ7IiwiXG5jbGFzcyBEaXNwYXRjaGFibGVUcmFpdCB7XG5cbiAgICBkaXNwYXRjaEV2ZW50c0ZvcihlbnRpdHkpIHtcblxuICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IHRoaXMuZ2V0RGlzcGF0Y2hlcigpO1xuICAgICAgICB2YXIgZXZlbnRzICAgICA9IGVudGl0eS5yZWxlYXNlRXZlbnRzKCk7XG5cbiAgICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaChldmVudHMpO1xuICAgIH1cbiAgICBnZXREaXNwYXRjaGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5ldmVudERpc3BhdGNoZXI7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoYWJsZVRyYWl0OyIsIlxuY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGV2ZW50cywgbG9nKSB7XG5cbiAgICAgICAgdGhpcy5ldmVudHNfID0gZXZlbnRzO1xuICAgICAgICB0aGlzLmxvZ18gICAgPSBsb2c7XG4gICAgfVxuICAgIGRpc3BhdGNoKGV2ZW50cykge1xuXG4gICAgICAgIGZvciAodmFyIGV2ZW50IG9mIGV2ZW50cykge1xuXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZ2V0RXZlbnROYW1lLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHNfLmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB0aGlzLmxvZ18ubG9nKGAke2V2ZW50TmFtZX0gd2FzIGZpcmVkLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRFdmVudE5hbWUoZXZlbnQpIHtcblxuICAgIHJldHVybiBldmVudC5nZXROYW1lKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnREaXNwYXRjaGVyOyIsIlxuY2xhc3MgRXZlbnRHZW5lcmF0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXyA9IFtdO1xuICAgIH1cblxuICAgIHJhaXNlKGV2ZW50KSB7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXy5wdXNoKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbGVhc2VFdmVudHMoKSB7XG5cbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMucGVuZGluZ0V2ZW50c187XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXyA9IFtdO1xuXG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50R2VuZXJhdG9yOyIsInZhciBzdGF0ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xuXG5jbGFzcyBNb2R1bGVMb2FkZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnT2JqID0ge30pIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5jb25maWdPYmogPSBjb25maWdPYmo7XG4gICAgfVxuXG4gICAgbG9hZChlbnZpcm9ubWVudCwgZ3JvdXAsIG5hbWVzcGFjZSA9IG51bGwpIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIgY29uZmlnT2JqID0gXy5jb25maWdPYmo7XG4gICAgICAgIHZhciBpdGVtcyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmV4aXN0cyhncm91cCkpIGl0ZW1zID0gY29uZmlnT2JqW2dyb3VwXTtcblxuICAgICAgICBpZiAoY29uZmlnT2JqW2Ake2Vudmlyb25tZW50fS4ke2dyb3VwfWBdKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1zLCBjb25maWdPYmpbYCR7ZW52aXJvbm1lbnR9LiR7Z3JvdXB9YF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuXG4gICAgfVxuICAgIGV4aXN0cyhncm91cCwgbmFtZXNwYWNlID0gbnVsbCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG4gICAgICAgIHZhciBjb25maWdPYmogPSBfLmNvbmZpZ09iajtcblxuICAgICAgICBpZiAoY29uZmlnT2JqW2dyb3VwXSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2R1bGVMb2FkZXI7IiwidmFyIHN0YXRlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJylcblxuY2xhc3MgUmVwb3NpdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXIsIGVudmlyb25tZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8ubG9hZGVyID0gbG9hZGVyO1xuICAgICAgICBfLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgfVxuICAgIGhhcygpIHtcblxuICAgIH1cbiAgICBnZXQoa2V5LCBkZWZhdWx0VmFsKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIge2Vudmlyb25tZW50fSA9IF87XG4gICAgICAgIHZhciBbbmFtZXNwYWNlLCBncm91cCwgaXRlbV0gPSBwYXJzZUtleShrZXkpO1xuXG4gICAgICAgIHZhciBpdGVtcyA9IF8ubG9hZGVyLmxvYWQoZW52aXJvbm1lbnQsIGdyb3VwLCBuYW1lc3BhY2UpO1xuXG4gICAgICAgIGlmICggISBpdGVtKSByZXR1cm4gaXRlbXM7XG5cbiAgICAgICAgaWYgKGl0ZW1zW2l0ZW1dICE9PSB1bmRlZmluZWQpIHJldHVybiBpdGVtc1tpdGVtXTtcblxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbDtcbiAgICB9XG4gICAgc2V0KCkge1xuXG4gICAgfVxufVxuXG4vLyBwcml2YXRlIGZ1bmN0aW9ucyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBwYXJzZUtleShrZXkpIHtcblxuICAgIHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xuXG4gICAgcmV0dXJuIHBhcnNlQmFzaWNTZWdtZW50cyhzZWdtZW50cyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmFzaWNTZWdtZW50cyhzZWdtZW50cykge1xuXG4gICAgdmFyIGdyb3VwID0gc2VnbWVudHNbMF07XG5cbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBbbnVsbCwgZ3JvdXAsIG51bGxdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbbnVsbCwgZ3JvdXAsIHNlZ21lbnRzWzFdXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3NpdG9yeTsiLCJ2YXIgc3RhdGUgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGhlbHBlcnMgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIENvbnRhaW5lciB7XG5cbiAgICAvLyB1c2UgRXZlbnRFbWl0dGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5iaW5kaW5ncyA9IHt9O1xuICAgICAgICBfLmluc3RhbmNlcyA9IHt9O1xuICAgICAgICAvLyBPYmplY3Qub2JzZXJ2ZShzdGF0ZSh0aGlzKSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBtYWtlKGFic3RyYWN0LCBwYXJhbWV0ZXJzID0gW10pIHtcblxuICAgICAgICAvLyBpZiAoc3RhdGUuaW5zdGFuY2VzW2Fic3RyYWN0XSkgcmV0dXJuIHN0YXRlLmluc3RhbmNlc1thYnN0cmFjdF07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3dhcyBub3QgYW4gaW5zdGFuY2UnKTtcblxuICAgICAgICB2YXIgY29uY3JldGUgPSB0aGlzLmdldENvbmNyZXRlKGFic3RyYWN0KTtcbiAgICAgICAgdmFyIG9iamVjdCAgID0gY29uY3JldGUodGhpcywgLi4ucGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaXNTaGFyZWQoYWJzdHJhY3QpKSB7XG4gICAgICAgIC8vICAgICBzdGF0ZS5pbnN0YW5jZXNbYWJzdHJhY3RdID0gb2JqZWN0O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgYmluZChhYnN0cmFjdCwgY29uY3JldGUgPSBudWxsLCBzaGFyZWQgPSBmYWxzZSkge1xuXG4gICAgICAgIHZhciB0eXBlID0gJ2JpbmQnO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcblxuICAgICAgICBzdGF0ZSh0aGlzKS5iaW5kaW5nc1thYnN0cmFjdF0gPSB7Y29uY3JldGUsIHNoYXJlZH07XG4gICAgICAgIHRoaXMubWFrZUFjY2Vzc29yUHJvcGVydHkoYWJzdHJhY3QpO1xuXG4gICAgICAgIHRoaXMuZW1pdChgYmluZC4ke2Fic3RyYWN0fWAsIFxuICAgICAgICAgICAgbm9Qcm90byh7dHlwZTogYCR7dHlwZX0uJHthYnN0cmFjdH1gLCB0YXJnZXQsIGFic3RyYWN0LCBzaGFyZWR9KVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbWl0KCdiaW5kJywgXG4gICAgICAgICAgICBub1Byb3RvKHt0eXBlLCB0YXJnZXQsIGFic3RyYWN0LCBzaGFyZWR9KVxuICAgICAgICApO1xuICAgIH1cbiAgICBiaW5kU2hhcmVkKGFic3RyYWN0LCBjb25jcmV0ZSwgLi4uYXJncykge1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFic3RyYWN0KSkge1xuICAgICAgICAgICAgZm9yICh2YXIgJGFyZ3Mgb2YgYWJzdHJhY3QpIHRoaXMuYmluZFNoYXJlZCguLi4kYXJncyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIHRoaXMuc2hhcmUoY29uY3JldGUsIC4uLmFyZ3MpLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0Q29uY3JldGUoYWJzdHJhY3QpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcykuYmluZGluZ3NbYWJzdHJhY3RdLmNvbmNyZXRlO1xuICAgIH1cbiAgICBpc1NoYXJlZChhYnN0cmFjdCkge1xuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuXG4gICAgICAgIGlmIChfLmluc3RhbmNlc1thYnN0cmFjdF0pIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmIChfLmJpbmRpbmdzW2Fic3RyYWN0XSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmJpbmRpbmdzW2Fic3RyYWN0XS5zaGFyZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldEJpbmRpbmdzKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5iaW5kaW5ncztcbiAgICB9XG4gICAgZ2V0QmluZGluZ3NLZXlzKCkge1xuXG4gICAgICAgIHJldHVybiBrZXlzKHRoaXMuZ2V0QmluZGluZ3MoKSk7XG4gICAgfVxuICAgIG5ld0luc3RhbmNlT2YoYWJzdHJhY3QsIGluc3RhbnRpYWJsZSwgLi4uYXJncykge1xuXG4gICAgICAgIHRoaXMuYmluZChhYnN0cmFjdCwgZnVuY3Rpb24oYXBwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGluc3RhbnRpYWJsZSguLi5hcmdzKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBzaW5nbGV0b24oYWJzdHJhY3QsIGluc3RhbnRpYWJsZSwgLi4uYXJncykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iaW5kU2hhcmVkKGFic3RyYWN0LCBhcHAgPT4gbmV3IGluc3RhbnRpYWJsZSguLi5hcmdzKSk7XG4gICAgfVxuICAgIHNoYXJlKGZ1bmMsIC4uLmFyZ3MpIHtcbiAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgaWYgKG9iamVjdCA9PT0gdW5kZWZpbmVkKSBvYmplY3QgPSBmdW5jKGNvbnRhaW5lciwgLi4uYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmb3JnZXRJbnN0YW5jZShhYnN0cmFjdCkge1xuXG4gICAgICAgIGRlbGV0ZSBzdGF0ZSh0aGlzKS5pbnN0YW5jZXNbYWJzdHJhY3RdO1xuICAgIH1cbiAgICBtYWtlQWNjZXNzb3JQcm9wZXJ0eShhYnN0cmFjdCkge1xuXG4gICAgICAgIGlmICh0aGlzLmFic3RyYWN0KSByZXR1cm47XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGFic3RyYWN0LCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2UoYWJzdHJhY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG5cbiAgICAgICAgY29uc29sZS5kaXIoc3RhdGUpO1xuICAgICAgICAvLyByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIGdldEl0ZW1zKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmluZGluZ3NLZXlzKCk7XG4gICAgfVxuICAgIGZvckVhY2goY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1hcChjYiwgY29udGV4dCkge1xuXG4gICAgICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIGJlIHN1cmUgdGhpcmQgYXJndW1lbnQgaXMgdGhpcyBjb2xsZWN0aW9uLCBub3QgaXRzIGFycmF5O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpLm1hcCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaWx0ZXIoY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5maWx0ZXIoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SXRlcmF0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYXJyYXlJdGVyYXRvcih0aGlzLmdldEl0ZW1zKCkpO1xuICAgIH1cbn1cblxudmFyIHtcblxuICAgIGtleXMsIFxuICAgIGltcGxlbWVudEl0ZXJhdG9yLCBcbiAgICBpc1VuZGVmaW5lZCxcbiAgICBpc0RlZmluZWQsXG4gICAgZGVmaW5lZCxcbiAgICBhcnJheUl0ZXJhdG9yLFxuICAgIGV4dGVuZFByb3RvT2YsXG4gICAgbm9Qcm90byxcblxufSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQ29udGFpbmVyLCBFdmVudEVtaXR0ZXIpO1xuaW1wbGVtZW50SXRlcmF0b3IoQ29udGFpbmVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7IiwidmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcblxuY2xhc3MgV2luZG93U2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIHJlZ2lzdGVyKCkge1xuXG4gICAgICAgIHZhciBhcHAgPSB0aGlzLmFwcDtcbiAgICAgICAgYXBwLmJpbmRTaGFyZWQoJ3dpbmRvdycsIGFwcCA9PiBnbG9iYWwpO1xuICAgIH1cbiAgICBwcm92aWRlcygpIHtcblxuICAgICAgICByZXR1cm4gWyd3aW5kb3cnXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2luZG93U2VydmljZVByb3ZpZGVyOyIsIlxudmFyIGVycm9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5lcnJvckNvbnN0cnVjdG9yJyk7XG5cbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignQXV0aGVudGljYXRpb25FcnJvcicsICdubyB3YXkhIGF1dGhlbnRpY2F0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdXRoZW50aWNhdGlvbkVycm9yOyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xudmFyIFZhbGlkYXRpb25FcnJvciAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuQXV0aGVudGljYXRpb25FcnJvcicpO1xuXG5jbGFzcyBFcnJvclNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcblxuICAgICAgICB2YXIgYXBwID0gdGhpcy5hcHA7XG4gICAgICAgIGFwcC5iaW5kU2hhcmVkKCdWYWxpZGF0aW9uRXJyb3InLCAgICAgYXBwID0+IFZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgIGFwcC5iaW5kU2hhcmVkKCdBdXRoZW50aWNhdGlvbkVycm9yJywgYXBwID0+IEF1dGhlbnRpY2F0aW9uRXJyb3IpO1xuICAgIH1cbiAgICBwcm92aWRlcygpIHtcblxuICAgICAgICByZXR1cm4gWydWYWxpZGF0aW9uRXJyb3InLCAnQXV0aGVudGljYXRpb25FcnJvciddO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFcnJvclNlcnZpY2VQcm92aWRlcjsiLCJcbnZhciBlcnJvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuZXJyb3JDb25zdHJ1Y3RvcicpO1xuXG52YXIgVmFsaWRhdGlvbkVycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignVmFsaWRhdGlvbkVycm9yJywgJ25vIHdheSEgdmFsaWRhdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsaWRhdGlvbkVycm9yOyIsInZhciAkRXJyb3IgPSBFcnJvcjtcbnZhciB7aXNBcnJheX0gPSBBcnJheTtcbnZhciB7a2V5cywgZGVmaW5lUHJvcGVydGllc30gPSBPYmplY3Q7XG5cbmZ1bmN0aW9uIG5vbkVudW0ob2JqZWN0cykge1xuXG4gICAgdmFyIHdyaXRhYmxlID0gdHJ1ZTtcbiAgICB2YXIgZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgIHZhciBjb25maWd1cmFibGUgPSB0cnVlO1xuXG4gICAgb2JqZWN0cyA9IGlzQXJyYXkob2JqZWN0cykgPyBvYmplY3RzIDogW29iamVjdHNdO1xuICAgIFxuICAgIHJldHVybiBvYmplY3RzLnJlZHVjZSgocmVzdWx0LCBvYmplY3QpID0+IHtcbiAgICAgICAgdmFyIGtleSAgICAgPSBrZXlzKG9iamVjdClbMF07XG4gICAgICAgIHZhciB2YWx1ZSAgID0gb2JqZWN0W2tleV07XG4gICAgICAgIHJlc3VsdFtrZXldID0ge3ZhbHVlLCB3cml0YWJsZSwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBhZGRTdGFja1RvT2JqZWN0KG9iamVjdCwgQ3VzdG9tRXJyb3IpIHtcblxuICAgIHZhciB7Y2FwdHVyZVN0YWNrVHJhY2V9ID0gJEVycm9yO1xuXG4gICAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avdjgvd2lraS9KYXZhU2NyaXB0U3RhY2tUcmFjZUFwaVxuICAgIGlmIChjYXB0dXJlU3RhY2tUcmFjZSkge2NhcHR1cmVTdGFja1RyYWNlKG9iamVjdCwgQ3VzdG9tRXJyb3IpO30gXG4gICAgZWxzZSB7b2JqZWN0LnN0YWNrID0gKG5ldyAkRXJyb3IpLnN0YWNrIHx8ICcnO31cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5mdW5jdGlvbiBlcnJvckNvbnN0cnVjdG9yKG5hbWUgPSAnQ3VzdG9tRXJyb3InLCBtZXNzYWdlID0gJycpIHtcblxuICAgIGNsYXNzIEN1c3RvbUVycm9yIGV4dGVuZHMgJEVycm9yIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cbiAgICAgICAgICAgIC8vIHNob3VsZCBub3QgY2FsbCBwYXJlbnQncyBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXModGhpcywgbm9uRW51bSh7bWVzc2FnZX0pKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRTdGFja1RvT2JqZWN0KHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnRpZXMoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBub25FbnVtKFt7bmFtZX0sIHttZXNzYWdlfV0pKTtcbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXJyb3JDb25zdHJ1Y3RvcjsiLCIvKipcbkBtb2R1bGUgV2lsZGNhdC5FdmVudHMuRGlzcGF0Y2hlclxuKi9cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIge2V4dGVuZFByb3RvT2YsIGlzU3RyaW5nfSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgICAgIHRoaXMuYXBwXyA9IGFwcDtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHN1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIgPSByZXNvbHZlU3Vic2NyaWJlci5jYWxsKHRoaXMpO1xuICAgICAgICBzdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzKTtcbiAgICB9XG59XG5leHRlbmRQcm90b09mKERpc3BhdGNoZXIsIEV2ZW50RW1pdHRlcik7XG5cbmZ1bmN0aW9uIHJlc29sdmVTdWJzY3JpYmVyKHN1YnNjcmliZXIpIHtcblxuICAgIGlmIChpc1N0cmluZyhzdWJzY3JpYmVyKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBfW3N1YnNjcmliZXJdO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic2NyaWJlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyOyAiLCJ2YXIgQ29udGFpbmVyICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Db250YWluZXIuQ29udGFpbmVyJyk7XG52YXIgQ29uZmlnICAgICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Db25maWcuUmVwb3NpdG9yeScpO1xudmFyIE1vZHVsZUxvYWRlciAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29uZmlnLk1vZHVsZUxvYWRlcicpO1xudmFyIERpc3BhdGNoZXIgICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXZlbnRzLkRpc3BhdGNoZXInKTtcbnZhciBzdGFydCAgICAgICAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkZvdW5kYXRpb24uc3RhcnQnKTtcbnZhciBQcm92aWRlclJlcG9zaXRvcnkgPSByZXF1aXJlKCdXaWxkY2F0LkZvdW5kYXRpb24uUHJvdmlkZXJSZXBvc2l0b3J5Jyk7XG5cbnZhciBjb25maWcgICAgICAgPSByZXF1aXJlKCdjb25maWcuY29uZmlnJyk7XG52YXIge3ZhbHVlfSAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBzdGF0ZSAgICAgICAgPSB7fTtcblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb250YWluZXIge1xuXG4gICAgZGV0ZWN0RW52aXJvbm1lbnQoZW52KSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlLmVudiA9IHZhbHVlKGVudik7XG4gICAgfVxuICAgIGlzTG9jYWwoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW52aXJvbm1lbnQoJ2xvY2FsJyk7XG4gICAgfVxuICAgIGVudmlyb25tZW50KC4uLmFyZ3MpIHtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmluZGV4T2Yoc3RhdGUuZW52KSAhPT0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZW52O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldENvbmZpZ0xvYWRlcigpIHtcblxuICAgICAgICByZXR1cm4gbmV3IE1vZHVsZUxvYWRlcihjb25maWcpO1xuICAgIH1cbiAgICByZWdpc3RlckNvcmVDb250YWluZXJCaW5kaW5ncygpIHtcblxuICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgdmFyIGNvbmZpZ0xvYWRlciA9IGFwcC5nZXRDb25maWdMb2FkZXIoKTtcbiAgICAgICAgdmFyIGVudmlyb25tZW50ICA9IGFwcC5lbnZpcm9ubWVudCgpO1xuXG4gICAgICAgIGFwcC5iaW5kU2hhcmVkKFtcbiAgICAgICAgICAgIFsnY29uZmlnJywgYXBwID0+IG5ldyBDb25maWcoY29uZmlnTG9hZGVyLCBlbnZpcm9ubWVudCldLFxuICAgICAgICAgICAgWydldmVudHMnLCBhcHAgPT4gbmV3IERpc3BhdGNoZXIoYXBwKV0sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBnZXRQcm92aWRlclJlcG9zaXRvcnkoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm92aWRlclJlcG9zaXRvcnkoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgc3RhcnQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgcnVuKCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhcHAgcnVubmluZyEnKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIocHJvdmlkZXIpIHtcblxuICAgICAgICBwcm92aWRlci5yZWdpc3RlcigpO1xuICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyIsIlxuY2xhc3MgUHJvdmlkZXJSZXBvc2l0b3J5IHtcblxuICAgIGxvYWQoYXBwLCBwcm92aWRlcnMpIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhcHAucmVnaXN0ZXIodGhpcy5jcmVhdGVQcm92aWRlcihhcHAsIHByb3ZpZGVyKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlUHJvdmlkZXIoYXBwLCBwcm92aWRlcikge1xuXG4gICAgICAgIHJldHVybiBuZXcgcHJvdmlkZXIoYXBwKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm92aWRlclJlcG9zaXRvcnk7IiwidmFyIENvbmZpZyA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29uZmlnLlJlcG9zaXRvcnknKTtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgICB2YXIgYXBwICAgID0gdGhpcztcbiAgICB2YXIgZW52ICAgID0gYXBwLmVudmlyb25tZW50KCk7XG4gICAgdmFyIHByb3ZpZGVycywgY29uZmlnO1xuXG4gICAgYXBwLmJpbmRTaGFyZWQoJ2FwcCcsICgpID0+IGFwcCk7XG5cbiAgICBhcHAucmVnaXN0ZXJDb3JlQ29udGFpbmVyQmluZGluZ3MoKTtcblxuICAgIGNvbmZpZyA9IGFwcC5jb25maWc7XG4gICAgcHJvdmlkZXJzID0gY29uZmlnLmdldCgnYXBwJykucHJvdmlkZXJzO1xuICAgIGFwcC5nZXRQcm92aWRlclJlcG9zaXRvcnkoKS5sb2FkKGFwcCwgcHJvdmlkZXJzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydDsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgQ29uc29sZUxvZ2dlciAvKmltcGxlbWVudHMgJ1dpbGRjYXQuQ29udHJhY3RzLkxvZycqLyB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkd2luZG93ID0gZ2xvYmFsKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8ud2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgXy5jb25zb2xlID0gJHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgICBsb2coLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUubG9nKC4uLmFyZ3MpXG4gICAgfVxuICAgIGVycm9yKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdGF0ZSh0aGlzKS5jb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBkaXIoLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUuZGlyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBnZXQgc3RhdGVfKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25zb2xlTG9nZ2VyOyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29uc29sZUxvZ2dlciAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2cuQ29uc29sZUxvZ2dlcicpO1xuXG5jbGFzcyBMb2dTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuIFxuICAgIHJlZ2lzdGVyKCkge1xuXG4gICAgICAgIHRoaXMuYXBwLnNpbmdsZXRvbignbG9nZ2VyJywgQ29uc29sZUxvZ2dlcik7XG4gICAgfVxuICAgIHByb3ZpZGVzKCkge1xuXG4gICAgICAgIHJldHVybiBbJ2xvZyddO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dTZXJ2aWNlUHJvdmlkZXI7IiwidmFyIHN0YXRlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG5cbmNsYXNzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5hcHAgPSBhcHA7XG4gICAgfVxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gYWJzdHJhY3RcbiAgICB9XG4gICAgZ2V0IGFwcCgpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcykuYXBwO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlUHJvdmlkZXI7IiwidmFyICRjb25zb2xlICAgID0gZ2xvYmFsLmNvbnNvbGU7XG52YXIgJHNldFRpbWVvdXQgPSBnbG9iYWwuc2V0VGltZW91dDtcblxuLy8gT2JqZWN0XG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpO1xufVxuZnVuY3Rpb24gYXNzaWduKG9iamVjdCwgLi4uYXJncykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gZXh0ZW5kUHJvdG9PZih0YXJnZXQsIHNvdXJjZSwga2V5ID0gW10pIHtcblxuICAgIGlmIChpc1N0cmluZyhrZXkpKSB7XG4gICAgICAgIHRhcmdldC5wcm90b3R5cGVba2V5XSA9IHNvdXJjZS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc291cmNlS2V5cyA9IGtleXMoc291cmNlLnByb3RvdHlwZSk7XG4gICAgZm9yICh2YXIga2V5IG9mIHNvdXJjZUtleXMpIHtcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZVtrZXldID0gc291cmNlLnByb3RvdHlwZVtrZXldOyAgIFxuICAgIH1cbn1cbmZ1bmN0aW9uIGltcGxlbWVudEl0ZXJhdG9yKHNvdXJjZUNsYXNzKSB7XG5cbiAgICB2YXIgJHByb3RvdHlwZSA9IHNvdXJjZUNsYXNzLnByb3RvdHlwZTtcbiAgICAkcHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSAkcHJvdG90eXBlLmdldEl0ZXJhdG9yO1xufVxuZnVuY3Rpb24gdmFsdWUodmFsKSB7XG5cbiAgICByZXR1cm4gKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpID8gdmFsKCkgOiB2YWw7XG59XG5mdW5jdGlvbiBpc051bGwodmFsKSB7XG5cbiAgICByZXR1cm4gdmFsID09PSBudWxsO1xufVxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgXG4gICAgcmV0dXJuICh0eXBlb2YgdmFsKSA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblxuICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWwpIHtcblxuICAgIHJldHVybiAoICEgaXNVbmRlZmluZWQodmFsKSk7XG59XG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cbmZ1bmN0aW9uIGRlZmluZWQodmFsLCAkZGVmYXVsdCkge1xuXG4gICAgcmV0dXJuIGlzRGVmaW5lZCh2YWwpID8gdmFsIDogJGRlZmF1bHQ7XG59XG5mdW5jdGlvbiB3YWl0KHRpbWUgPSA1MDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuICAgIFxuICAgICRjb25zb2xlLmxvZyguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGVycm9yKC4uLmFyZ3MpIHtcblxuICAgICRjb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gd2FybiguLi5hcmdzKSB7XG4gICAgXG4gICAgJGNvbnNvbGUud2FybiguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHNwYXduKG1ha2VHZW5lcmF0b3IpIHtcblxuICAgIHZhciBwcm9taXNlID0gYXN5bmMobWFrZUdlbmVyYXRvcik7XG5cbiAgICBwcm9taXNlKCkudGhlbihsb2csIHRlcm1pbmF0ZUVycm9yKTtcbn1cbmZ1bmN0aW9uIGFzeW5jKG1ha2VHZW5lcmF0b3IpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkUHJvbWlzZSA9IFByb21pc2U7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKHJlc3VsdCkge1xuXG4gICAgICAgICAgICB2YXIgZG9uZSAgPSByZXN1bHQuZG9uZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybiAkUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTsgXG5cbiAgICAgICAgICAgIHJldHVybiAkUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KHJlcykpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yLnRocm93KGVycikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShnZW5lcmF0b3IubmV4dCgpKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAkUHJvbWlzZS5yZWplY3QoZXgpO1xuICAgICAgICB9XG4gICAgfTsgIFxufVxuZnVuY3Rpb24gYXJyYXlJdGVyYXRvcihpdGVtcyA9IFtdKSB7XG4gICAgdmFyIGkgICAgID0gMDtcbiAgICB2YXIgbGVuICAgPSBpdGVtcy5sZW5ndGg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlLCBub3REb25lO1xuICAgICAgICAgICAgaWYgKG5vdERvbmUgPSBpIDwgbGVuKSB2YWx1ZSA9IGl0ZW1zW2krK107XG4gICAgICAgICAgICByZXR1cm4ge3ZhbHVlLCBkb25lOiAhbm90RG9uZX07XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gbm9Qcm90byhzb3VyY2UgPSB7fSkge1xuXG4gICAgdmFyIGVtcHR5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBPYmplY3QuYXNzaWduKGVtcHR5LCBzb3VyY2UpO1xuICAgIHJldHVybiBlbXB0eTtcbn1cbmZ1bmN0aW9uIHRlcm1pbmF0ZUVycm9yKGVycm9yKSB7XG5cbiAgICAkc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdhcm4oYGZyb20gW3RlcmltYXRlRXJyb3JdOmApO1xuICAgICAgICB3YXJuKGVycm9yLnN0YWNrKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7ICAgIFxuICAgIH0sIDApO1xufVxudmFyIGhlbHBlcnMgPSB7XG4gICAga2V5cyxcbiAgICBhc3NpZ24sXG4gICAgZXh0ZW5kUHJvdG9PZixcbiAgICBpbXBsZW1lbnRJdGVyYXRvcixcbiAgICB2YWx1ZSxcbiAgICBpc051bGwsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNVbmRlZmluZWQsXG4gICAgaXNEZWZpbmVkLFxuICAgIGlzQXJyYXksXG4gICAgZGVmaW5lZCxcbiAgICB3YWl0LFxuICAgIGxvZyxcbiAgICBlcnJvcixcbiAgICB3YXJuLFxuICAgIHNwYXduLFxuICAgIGFzeW5jLFxuICAgIGFycmF5SXRlcmF0b3IsXG4gICAgbm9Qcm90byxcbiAgICB0ZXJtaW5hdGVFcnJvcixcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVyczsiLCJ2YXIgb2JzZXJ2ZUpzID0gcmVxdWlyZSgnb2JzZXJ2ZS1qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBPYnNlcnZlciAgICAgICAgIDogZ2xvYmFsLk9ic2VydmVyLFxuICAgIEFycmF5T2JzZXJ2ZXIgICAgOiBnbG9iYWwuQXJyYXlPYnNlcnZlcixcbiAgICBBcnJheVNwbGljZSAgICAgIDogZ2xvYmFsLkFycmF5U3BsaWNlLFxuICAgIE9iamVjdE9ic2VydmVyICAgOiBnbG9iYWwuT2JqZWN0T2JzZXJ2ZXIsXG4gICAgUGF0aE9ic2VydmVyICAgICA6IGdsb2JhbC5QYXRoT2JzZXJ2ZXIsXG4gICAgQ29tcG91bmRPYnNlcnZlciA6IGdsb2JhbC5Db21wb3VuZE9ic2VydmVyLFxuICAgIFBhdGggICAgICAgICAgICAgOiBnbG9iYWwuUGF0aCxcbiAgICBPYnNlcnZlclRyYW5zZm9ybTogZ2xvYmFsLk9ic2VydmVyVHJhbnNmb3JtLFxuICAgIFBsYXRmb3JtICAgICAgICAgOiBnbG9iYWwuUGxhdGZvcm0sXG59OyIsInZhciB7aXNVbmRlZmluZWQsIGxvZywgbm9Qcm90bywgaXNTdHJpbmd9ID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBvYnNlcnZlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0Lm9ic2VydmUnKTtcbnZhciB7T2JqZWN0T2JzZXJ2ZXIsIFBsYXRmb3JtfSA9IG9ic2VydmU7XG5cbnZhciBNYXBDb25zdHJ1Y3RvciA9IGdsb2JhbC5XZWFrTWFwIHx8IGdsb2JhbC5NYXA7XG52YXIgbWFwID0gbmV3IE1hcENvbnN0cnVjdG9yKCk7XG5cbi8vIGxvZyhgc3VwcG9ydHMgJHtNYXBDb25zdHJ1Y3Rvci5uYW1lfWApO1xuXG5mdW5jdGlvbiBzdGF0ZSh0aGlzQXJnLCB2YWwsIGNicywgcXVpZXQgPSBmYWxzZSkge1xuXG4gICAgLy8gaWYgbm90IHZhbHVlLCBhc3N1bWUgYSBnZXR0ZXIgZm9yIGVudGlyZSBzdGF0ZSBvYmplY3Q7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbCkpIHJldHVybiBtYXAuZ2V0KHRoaXNBcmcpO1xuXG4gICAgLy8gaWYgc2Vjb25kIGFyZ3VtZW50IGlzIGEgc3RyXG4gICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgc2V0U3RhdGUuY2FsbCh0aGlzQXJnLCB2YWwsIGNicywgcXVpZXQpO1xuICAgICAgICByZXR1cm4gdGhpc0FyZztcbiAgICB9XG4gICAgXG4gICAgdmFyIF8gPSBzZXRTdGF0ZU9iamVjdC5jYWxsKHRoaXNBcmcsIHZhbCk7XG5cbiAgICBpZiAoY2JzKSBiaW5kT2JzZXJ2YWJsZS5jYWxsKHRoaXNBcmcsIF8sIGNicyk7XG5cbiAgICByZXR1cm4gXztcbn1cbmZ1bmN0aW9uIHNldFN0YXRlKGtleSwgdmFsdWUsIHF1aWV0KSB7XG5cbiAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgIF9ba2V5XSA9IHZhbHVlO1xuICAgIGlmIChxdWlldCkgXy5vYnNlcnZlcl8uZGlzY2FyZENoYW5nZXMoKTtcbiAgICBQbGF0Zm9ybS5wZXJmb3JtTWljcm90YXNrQ2hlY2twb2ludCgpO1xufVxuZnVuY3Rpb24gc2V0U3RhdGVPYmplY3QodmFsKSB7XG5cbiAgICBtYXAuc2V0KHRoaXMsIHZhbCk7XG4gICAgcmV0dXJuIG1hcC5nZXQodGhpcyk7XG59XG5mdW5jdGlvbiBiaW5kT2JzZXJ2YWJsZShfLCBjYnMpIHtcblxuICAgIF8ub2JzZXJ2ZXJfID0gbmV3IE9iamVjdE9ic2VydmVyKF8pO1xuICAgIF8ub2JzZXJ2ZXJfLm9wZW4ob25PYnNlcnZlLmJpbmQodGhpcywge18sIGNic30pKTtcbn1cbmZ1bmN0aW9uIG9uT2JzZXJ2ZSh7XywgY2JzfSwgYWRkZWQsIHJlbW92ZWQsIGNoYW5nZWQsIGdldE9sZFZhbHVlRm4pIHtcblxuICAgIHZhciBvYnNlcnZlZCA9IHthZGRlZCwgcmVtb3ZlZCwgY2hhbmdlZCwgXywgY2JzLCBnZXRPbGRWYWx1ZUZufTtcbiAgICBpbnZva2VPYnNlcnZhYmxlcy5jYWxsKHRoaXMsIG9ic2VydmVkKTtcbn1cbmZ1bmN0aW9uIGludm9rZU9ic2VydmFibGVzKG9ic2VydmVkKSB7XG5cbiAgICBbJ2FkZGVkJywgJ3JlbW92ZWQnLCAnY2hhbmdlZCddLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgIHZhciBoYXNDYWxsYmFjayA9ICh0eXBlb2Ygb2JzZXJ2ZWQuY2JzW3R5cGVdID09PSAnZnVuY3Rpb24nKTtcbiAgICAgICAgdmFyIGlzTm90RW1wdHkgID0gT2JqZWN0LmtleXMob2JzZXJ2ZWRbdHlwZV0pLmxlbmd0aCA+IDA7XG5cbiAgICAgICAgaWYgKGhhc0NhbGxiYWNrICYmIGlzTm90RW1wdHkpIGludm9rZS5jYWxsKHRoaXMsIG9ic2VydmVkLCB0eXBlKTsgXG4gICAgfSk7XG59XG5mdW5jdGlvbiBpbnZva2Uob2JzZXJ2ZWQsIHR5cGUpIHtcblxuICAgIHZhciBjYWxsYmFjayA9IG9ic2VydmVkLmNic1t0eXBlXTtcbiAgICB2YXIgbmFtZXMgICAgPSBPYmplY3Qua2V5cyhvYnNlcnZlZFt0eXBlXSk7XG5cbiAgICB2YXIgcGF5bG9hZCA9IG5hbWVzLm1hcChuYW1lID0+IHtcblxuICAgICAgICByZXR1cm4gbm9Qcm90byh7XG4gICAgICAgICAgICBuYW1lICAgIDogbmFtZSxcbiAgICAgICAgICAgIHR5cGUgICAgOiB0eXBlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IG9ic2VydmVkLl9bbmFtZV0sXG4gICAgICAgICAgICBvbGRWYWx1ZTogb2JzZXJ2ZWQuZ2V0T2xkVmFsdWVGbihuYW1lKSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHBheWxvYWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRlOyIsInZhciBzdGF0ZSAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG52YXIgb2JzZXJ2ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5vYnNlcnZlJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG52YXIgQ29tbWFuZGVyVHJhaXQgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kZXJUcmFpdCcpO1xudmFyIHtQYXRoT2JzZXJ2ZXIsIFBsYXRmb3JtfSA9IG9ic2VydmU7XG5cbmNsYXNzIFZpZXcge1xuXG4gICAgLy8gdXNlIENvbW1hbmRUcmFpdFxuXG4gICAgY29uc3RydWN0b3IoYXBwLCBlbCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuXG4gICAgICAgIHZhciBkZWZhdWx0U3RhdGUgPSB7XG4gICAgICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICBzdGF0ZSh0aGlzLCBkZWZhdWx0U3RhdGUsIHtjaGFuZ2VkLCBhZGRlZH0pO1xuICAgIH1cbiAgICBzZXRFbChlbGVtZW50LCBxdWlldCA9IGZhbHNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMsICdlbCcsIGVsZW1lbnQsIHF1aWV0KTtcbiAgICB9XG4gICAgZ2V0IGVsKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5lbDtcbiAgICB9XG4gICAgc2V0IGVsKHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5zZXRFbCh2YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlZChjaGFuZ2VzKSB7XG4gICAgbG9nKGBvblN0YXRlQ2hhbmdlZGApO1xuICAgIGZvciAodmFyIGNoYW5nZSBvZiBjaGFuZ2VzKSBsb2coY2hhbmdlKTtcbn1cbmZ1bmN0aW9uIGFkZGVkKGFkZGl0aW9ucykge1xuICAgIGxvZyhgb25TdGF0ZUFkZGVkYCk7XG4gICAgZm9yICh2YXIgYWRkaXRpb24gb2YgYWRkaXRpb25zKSBsb2coYWRkaXRpb24pO1xufVxuXG52YXIge1xuICAgIGxvZyxcbiAgICBleHRlbmRQcm90b09mLFxufSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoVmlldywgQ29tbWFuZGVyVHJhaXQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7ICIsInZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgVmlldyA9IHJlcXVpcmUoJ1dpbGRjYXQuVmlldy5WaWV3Jyk7XG5cbmNsYXNzIFZpZXdTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG5cbiAgICAgICAgdmFyIGFwcCAgID0gdGhpcy5hcHA7XG4gICAgICAgIHZhciB2aWV3cyA9IGFwcC5jb25maWcuZ2V0KCd2aWV3cycpO1xuXG4gICAgICAgIGZvciAodmFyIHthYnN0cmFjdCwgJGNvbnN0cnVjdG9yLCBidWlsZH0gb2Ygdmlld3MpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3dpdGNoIChidWlsZCkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2luZ2xldG9uJzpcbiAgICAgICAgICAgICAgICAgICAgYXBwLmJpbmRTaGFyZWQoYWJzdHJhY3QsIGFwcCA9PiBuZXcgJGNvbnN0cnVjdG9yKGFwcCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld1NlcnZpY2VQcm92aWRlcjsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwpe1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmIChnbG9iYWwuJHRyYWNldXJSdW50aW1lKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciAkT2JqZWN0ID0gT2JqZWN0O1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgdmFyICRjcmVhdGUgPSAkT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRmcmVlemUgPSAkT2JqZWN0LmZyZWV6ZTtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGtleXMgPSAkT2JqZWN0LmtleXM7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSAkT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyICR0b1N0cmluZyA9ICRPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuICB2YXIgJHNlYWwgPSBPYmplY3Quc2VhbDtcbiAgdmFyICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciB0eXBlcyA9IHtcbiAgICB2b2lkOiBmdW5jdGlvbiB2b2lkVHlwZSgpIHt9LFxuICAgIGFueTogZnVuY3Rpb24gYW55KCkge30sXG4gICAgc3RyaW5nOiBmdW5jdGlvbiBzdHJpbmcoKSB7fSxcbiAgICBudW1iZXI6IGZ1bmN0aW9uIG51bWJlcigpIHt9LFxuICAgIGJvb2xlYW46IGZ1bmN0aW9uIGJvb2xlYW4oKSB7fVxuICB9O1xuICB2YXIgbWV0aG9kID0gbm9uRW51bTtcbiAgdmFyIGNvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBuZXdVbmlxdWVTdHJpbmcoKSB7XG4gICAgcmV0dXJuICdfXyQnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU5KSArICckJyArICsrY291bnRlciArICckX18nO1xuICB9XG4gIHZhciBzeW1ib2xJbnRlcm5hbFByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEYXRhUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbFZhbHVlcyA9ICRjcmVhdGUobnVsbCk7XG4gIHZhciBwcml2YXRlTmFtZXMgPSAkY3JlYXRlKG51bGwpO1xuICBmdW5jdGlvbiBjcmVhdGVQcml2YXRlTmFtZSgpIHtcbiAgICB2YXIgcyA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICAgIHByaXZhdGVOYW1lc1tzXSA9IHRydWU7XG4gICAgcmV0dXJuIHM7XG4gIH1cbiAgZnVuY3Rpb24gaXNTeW1ib2woc3ltYm9sKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzeW1ib2wgPT09ICdvYmplY3QnICYmIHN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbFZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIHR5cGVPZih2KSB7XG4gICAgaWYgKGlzU3ltYm9sKHYpKVxuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIHJldHVybiB0eXBlb2YgdjtcbiAgfVxuICBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgdmFsdWUgPSBuZXcgU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N5bWJvbCBjYW5ub3QgYmUgbmV3XFwnZWQnKTtcbiAgfVxuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICBpZiAoIXN5bWJvbFZhbHVlKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdDb252ZXJzaW9uIGZyb20gc3ltYm9sIHRvIHN0cmluZycpO1xuICAgIHZhciBkZXNjID0gc3ltYm9sVmFsdWVbc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eV07XG4gICAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZClcbiAgICAgIGRlc2MgPSAnJztcbiAgICByZXR1cm4gJ1N5bWJvbCgnICsgZGVzYyArICcpJztcbiAgfSkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCBtZXRob2QoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN5bWJvbFZhbHVlID0gdGhpc1tzeW1ib2xEYXRhUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gc3ltYm9sVmFsdWU7XG4gIH0pKTtcbiAgZnVuY3Rpb24gU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pIHtcbiAgICB2YXIga2V5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERhdGFQcm9wZXJ0eSwge3ZhbHVlOiB0aGlzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbEludGVybmFsUHJvcGVydHksIHt2YWx1ZToga2V5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERlc2NyaXB0aW9uUHJvcGVydHksIHt2YWx1ZTogZGVzY3JpcHRpb259KTtcbiAgICBmcmVlemUodGhpcyk7XG4gICAgc3ltYm9sVmFsdWVzW2tleV0gPSB0aGlzO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oU3ltYm9sKSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICd0b1N0cmluZycsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCB7XG4gICAgdmFsdWU6IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZixcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgdmFyIGhhc2hQcm9wZXJ0eSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBoYXNoUHJvcGVydHlEZXNjcmlwdG9yID0ge3ZhbHVlOiB1bmRlZmluZWR9O1xuICB2YXIgaGFzaE9iamVjdFByb3BlcnRpZXMgPSB7XG4gICAgaGFzaDoge3ZhbHVlOiB1bmRlZmluZWR9LFxuICAgIHNlbGY6IHt2YWx1ZTogdW5kZWZpbmVkfVxuICB9O1xuICB2YXIgaGFzaENvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCkge1xuICAgIHZhciBoYXNoT2JqZWN0ID0gb2JqZWN0W2hhc2hQcm9wZXJ0eV07XG4gICAgaWYgKGhhc2hPYmplY3QgJiYgaGFzaE9iamVjdC5zZWxmID09PSBvYmplY3QpXG4gICAgICByZXR1cm4gaGFzaE9iamVjdDtcbiAgICBpZiAoJGlzRXh0ZW5zaWJsZShvYmplY3QpKSB7XG4gICAgICBoYXNoT2JqZWN0UHJvcGVydGllcy5oYXNoLnZhbHVlID0gaGFzaENvdW50ZXIrKztcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLnNlbGYudmFsdWUgPSBvYmplY3Q7XG4gICAgICBoYXNoUHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlID0gJGNyZWF0ZShudWxsLCBoYXNoT2JqZWN0UHJvcGVydGllcyk7XG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBoYXNoUHJvcGVydHksIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgcmV0dXJuIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gZnJlZXplKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJGZyZWV6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gc2VhbChvYmplY3QpIHtcbiAgICBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuICRzZWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgU3ltYm9sLml0ZXJhdG9yID0gU3ltYm9sKCk7XG4gIGZyZWV6ZShTeW1ib2xWYWx1ZS5wcm90b3R5cGUpO1xuICBmdW5jdGlvbiB0b1Byb3BlcnR5KG5hbWUpIHtcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpXG4gICAgICByZXR1cm4gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCkge1xuICAgIHZhciBydiA9IFtdO1xuICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIGlmICghc3ltYm9sVmFsdWVzW25hbWVdICYmICFwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIHJ2LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCB0b1Byb3BlcnR5KG5hbWUpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3ltYm9sID0gc3ltYm9sVmFsdWVzW25hbWVzW2ldXTtcbiAgICAgIGlmIChzeW1ib2wpXG4gICAgICAgIHJ2LnB1c2goc3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG5hbWUpIHtcbiAgICByZXR1cm4gJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgdG9Qcm9wZXJ0eShuYW1lKSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnRyYWNldXIgJiYgZ2xvYmFsLnRyYWNldXIub3B0aW9uc1tuYW1lXTtcbiAgfVxuICBmdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHN5bSxcbiAgICAgICAgZGVzYztcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpIHtcbiAgICAgIHN5bSA9IG5hbWU7XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgaWYgKHN5bSAmJiAoZGVzYyA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSkpXG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7ZW51bWVyYWJsZTogZmFsc2V9KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgaWYgKGlzU3ltYm9sKG5hbWUpKSB7XG4gICAgICBpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgIGRlc2NyaXB0b3IgPSAkY3JlYXRlKGRlc2NyaXB0b3IsIHtlbnVtZXJhYmxlOiB7dmFsdWU6IGZhbHNlfX0pO1xuICAgICAgfVxuICAgICAgbmFtZSA9IG5hbWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgfVxuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxPYmplY3QoT2JqZWN0KSB7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jywge3ZhbHVlOiBkZWZpbmVQcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eU5hbWVzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIHt2YWx1ZTogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdoYXNPd25Qcm9wZXJ0eScsIHt2YWx1ZTogaGFzT3duUHJvcGVydHl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZnJlZXplJywge3ZhbHVlOiBmcmVlemV9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAncHJldmVudEV4dGVuc2lvbnMnLCB7dmFsdWU6IHByZXZlbnRFeHRlbnNpb25zfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ3NlYWwnLCB7dmFsdWU6IHNlYWx9KTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuICB9XG4gIGZ1bmN0aW9uIGV4cG9ydFN0YXIob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3VtZW50c1tpXSk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBuYW1lID0gbmFtZXNbal07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIChmdW5jdGlvbihtb2QsIG5hbWUpIHtcbiAgICAgICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9kW25hbWVdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoYXJndW1lbnRzW2ldLCBuYW1lc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gdG9PYmplY3QoeCkge1xuICAgIGlmICh4ID09IG51bGwpXG4gICAgICB0aHJvdyAkVHlwZUVycm9yKCk7XG4gICAgcmV0dXJuICRPYmplY3QoeCk7XG4gIH1cbiAgZnVuY3Rpb24gYXNzZXJ0T2JqZWN0KHgpIHtcbiAgICBpZiAoIWlzT2JqZWN0KHgpKVxuICAgICAgdGhyb3cgJFR5cGVFcnJvcih4ICsgJyBpcyBub3QgYW4gT2JqZWN0Jyk7XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tPYmplY3RDb2VyY2libGUoYXJndW1lbnQpIHtcbiAgICBpZiAoYXJndW1lbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhbiBPYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50O1xuICB9XG4gIGZ1bmN0aW9uIHNldHVwR2xvYmFscyhnbG9iYWwpIHtcbiAgICBnbG9iYWwuU3ltYm9sID0gU3ltYm9sO1xuICAgIGdsb2JhbC5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3QgfHwge307XG4gICAgZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsID0gZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsIHx8IGdsb2JhbDtcbiAgICBwb2x5ZmlsbE9iamVjdChnbG9iYWwuT2JqZWN0KTtcbiAgfVxuICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgZ2xvYmFsLiR0cmFjZXVyUnVudGltZSA9IHtcbiAgICBhc3NlcnRPYmplY3Q6IGFzc2VydE9iamVjdCxcbiAgICBjcmVhdGVQcml2YXRlTmFtZTogY3JlYXRlUHJpdmF0ZU5hbWUsXG4gICAgZXhwb3J0U3RhcjogZXhwb3J0U3RhcixcbiAgICBnZXRPd25IYXNoT2JqZWN0OiBnZXRPd25IYXNoT2JqZWN0LFxuICAgIHByaXZhdGVOYW1lczogcHJpdmF0ZU5hbWVzLFxuICAgIHNldFByb3BlcnR5OiBzZXRQcm9wZXJ0eSxcbiAgICBzZXR1cEdsb2JhbHM6IHNldHVwR2xvYmFscyxcbiAgICB0b09iamVjdDogdG9PYmplY3QsXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIHRvUHJvcGVydHk6IHRvUHJvcGVydHksXG4gICAgdHlwZTogdHlwZXMsXG4gICAgdHlwZW9mOiB0eXBlT2YsXG4gICAgY2hlY2tPYmplY3RDb2VyY2libGU6IGNoZWNrT2JqZWN0Q29lcmNpYmxlLFxuICAgIGhhc093blByb3BlcnR5OiBmdW5jdGlvbihvLCBwKSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbiAgICB9LFxuICAgIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAgIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgIGtleXM6ICRrZXlzXG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGZ1bmN0aW9uIHNwcmVhZCgpIHtcbiAgICB2YXIgcnYgPSBbXSxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIGl0ZXJSZXN1bHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZVRvU3ByZWFkID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IHNwcmVhZCBub24taXRlcmFibGUgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgdmFyIGl0ZXIgPSB2YWx1ZVRvU3ByZWFkWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildKCk7XG4gICAgICB3aGlsZSAoIShpdGVyUmVzdWx0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgcnZbaisrXSA9IGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuc3ByZWFkID0gc3ByZWFkO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJE9iamVjdCA9IE9iamVjdDtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIHZhciAkY3JlYXRlID0gJE9iamVjdC5jcmVhdGU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICBmdW5jdGlvbiBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBwcm90byA9ICRnZXRQcm90b3R5cGVPZihob21lT2JqZWN0KTtcbiAgICBkbyB7XG4gICAgICB2YXIgcmVzdWx0ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG4gICAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgcHJvdG8gPSAkZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIH0gd2hpbGUgKHByb3RvKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKTtcbiAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgaWYgKCFkZXNjcmlwdG9yLmdldClcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICByZXR1cm4gZGVzY3JpcHRvci5nZXQuY2FsbChzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBzdXBlclNldChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldC5jYWxsKHNlbGYsIHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcInN1cGVyIGhhcyBubyBzZXR0ZXIgJ1wiICsgbmFtZSArIFwiJy5cIik7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcnMob2JqZWN0KSB7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge30sXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgZGVzY3JpcHRvcnNbbmFtZV0gPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhjdG9yLCBvYmplY3QsIHN0YXRpY09iamVjdCwgc3VwZXJDbGFzcykge1xuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsICdjb25zdHJ1Y3RvcicsIHtcbiAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuICAgICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBjdG9yLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9ICRjcmVhdGUoZ2V0UHJvdG9QYXJlbnQoc3VwZXJDbGFzcyksIGdldERlc2NyaXB0b3JzKG9iamVjdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG9iamVjdDtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KGN0b3IsICdwcm90b3R5cGUnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0aWVzKGN0b3IsIGdldERlc2NyaXB0b3JzKHN0YXRpY09iamVjdCkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFByb3RvUGFyZW50KHN1cGVyQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGlmICgkT2JqZWN0KHByb3RvdHlwZSkgPT09IHByb3RvdHlwZSB8fCBwcm90b3R5cGUgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIHRocm93IG5ldyAkVHlwZUVycm9yKCdzdXBlciBwcm90b3R5cGUgbXVzdCBiZSBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAoc3VwZXJDbGFzcyA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIGRlZmF1bHRTdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgYXJncykge1xuICAgIGlmICgkZ2V0UHJvdG90eXBlT2YoaG9tZU9iamVjdCkgIT09IG51bGwpXG4gICAgICBzdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgJ2NvbnN0cnVjdG9yJywgYXJncyk7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzID0gY3JlYXRlQ2xhc3M7XG4gICR0cmFjZXVyUnVudGltZS5kZWZhdWx0U3VwZXJDYWxsID0gZGVmYXVsdFN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ2FsbCA9IHN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyR2V0ID0gc3VwZXJHZXQ7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlclNldCA9IHN1cGVyU2V0O1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgY3JlYXRlUHJpdmF0ZU5hbWUgPSAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlUHJpdmF0ZU5hbWU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciBTVF9ORVdCT1JOID0gMDtcbiAgdmFyIFNUX0VYRUNVVElORyA9IDE7XG4gIHZhciBTVF9TVVNQRU5ERUQgPSAyO1xuICB2YXIgU1RfQ0xPU0VEID0gMztcbiAgdmFyIEVORF9TVEFURSA9IC0yO1xuICB2YXIgUkVUSFJPV19TVEFURSA9IC0zO1xuICBmdW5jdGlvbiBnZXRJbnRlcm5hbEVycm9yKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcignVHJhY2V1ciBjb21waWxlciBidWc6IGludmFsaWQgc3RhdGUgaW4gc3RhdGUgbWFjaGluZTogJyArIHN0YXRlKTtcbiAgfVxuICBmdW5jdGlvbiBHZW5lcmF0b3JDb250ZXh0KCkge1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMuR1N0YXRlID0gU1RfTkVXQk9STjtcbiAgICB0aGlzLnN0b3JlZEV4Y2VwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbmFsbHlGYWxsVGhyb3VnaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNlbnRfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmV0dXJuVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50cnlTdGFja18gPSBbXTtcbiAgfVxuICBHZW5lcmF0b3JDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBwdXNoVHJ5OiBmdW5jdGlvbihjYXRjaFN0YXRlLCBmaW5hbGx5U3RhdGUpIHtcbiAgICAgIGlmIChmaW5hbGx5U3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGZpbmFsbHlGYWxsVGhyb3VnaCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeVN0YWNrXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmICh0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2ggPSB0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWxseUZhbGxUaHJvdWdoID09PSBudWxsKVxuICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaCA9IFJFVEhST1dfU1RBVEU7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe1xuICAgICAgICAgIGZpbmFsbHk6IGZpbmFsbHlTdGF0ZSxcbiAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2g6IGZpbmFsbHlGYWxsVGhyb3VnaFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXRjaFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe2NhdGNoOiBjYXRjaFN0YXRlfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwb3BUcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50cnlTdGFja18ucG9wKCk7XG4gICAgfSxcbiAgICBnZXQgc2VudCgpIHtcbiAgICAgIHRoaXMubWF5YmVUaHJvdygpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VudF87XG4gICAgfSxcbiAgICBzZXQgc2VudCh2KSB7XG4gICAgICB0aGlzLnNlbnRfID0gdjtcbiAgICB9LFxuICAgIGdldCBzZW50SWdub3JlVGhyb3coKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZW50XztcbiAgICB9LFxuICAgIG1heWJlVGhyb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aW9uID09PSAndGhyb3cnKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gJ25leHQnO1xuICAgICAgICB0aHJvdyB0aGlzLnNlbnRfO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIEVORF9TVEFURTpcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY2FzZSBSRVRIUk9XX1NUQVRFOlxuICAgICAgICAgIHRocm93IHRoaXMuc3RvcmVkRXhjZXB0aW9uO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IGdldEludGVybmFsRXJyb3IodGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVFeGNlcHRpb246IGZ1bmN0aW9uKGV4KSB7XG4gICAgICB0aGlzLkdTdGF0ZSA9IFNUX0NMT1NFRDtcbiAgICAgIHRoaXMuc3RhdGUgPSBFTkRfU1RBVEU7XG4gICAgICB0aHJvdyBleDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIG5leHRPclRocm93KGN0eCwgbW92ZU5leHQsIGFjdGlvbiwgeCkge1xuICAgIHN3aXRjaCAoY3R4LkdTdGF0ZSkge1xuICAgICAgY2FzZSBTVF9FWEVDVVRJTkc6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJcXFwiXCIgKyBhY3Rpb24gKyBcIlxcXCIgb24gZXhlY3V0aW5nIGdlbmVyYXRvclwiKSk7XG4gICAgICBjYXNlIFNUX0NMT1NFRDpcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnbmV4dCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHg7XG4gICAgICBjYXNlIFNUX05FV0JPUk46XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICd0aHJvdycpIHtcbiAgICAgICAgICBjdHguR1N0YXRlID0gU1RfQ0xPU0VEO1xuICAgICAgICAgIHRocm93IHg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aHJvdyAkVHlwZUVycm9yKCdTZW50IHZhbHVlIHRvIG5ld2Jvcm4gZ2VuZXJhdG9yJyk7XG4gICAgICBjYXNlIFNUX1NVU1BFTkRFRDpcbiAgICAgICAgY3R4LkdTdGF0ZSA9IFNUX0VYRUNVVElORztcbiAgICAgICAgY3R4LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgY3R4LnNlbnQgPSB4O1xuICAgICAgICB2YXIgdmFsdWUgPSBtb3ZlTmV4dChjdHgpO1xuICAgICAgICB2YXIgZG9uZSA9IHZhbHVlID09PSBjdHg7XG4gICAgICAgIGlmIChkb25lKVxuICAgICAgICAgIHZhbHVlID0gY3R4LnJldHVyblZhbHVlO1xuICAgICAgICBjdHguR1N0YXRlID0gZG9uZSA/IFNUX0NMT1NFRCA6IFNUX1NVU1BFTkRFRDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgZG9uZTogZG9uZVxuICAgICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgY3R4TmFtZSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBtb3ZlTmV4dE5hbWUgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICRkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShHZW5lcmF0b3JGdW5jdGlvbikpO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIG5leHQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiBuZXh0T3JUaHJvdyh0aGlzW2N0eE5hbWVdLCB0aGlzW21vdmVOZXh0TmFtZV0sICduZXh0Jywgdik7XG4gICAgfSxcbiAgICB0aHJvdzogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIG5leHRPclRocm93KHRoaXNbY3R4TmFtZV0sIHRoaXNbbW92ZU5leHROYW1lXSwgJ3Rocm93Jywgdik7XG4gICAgfVxuICB9O1xuICAkZGVmaW5lUHJvcGVydGllcyhHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge2VudW1lcmFibGU6IGZhbHNlfSxcbiAgICBuZXh0OiB7ZW51bWVyYWJsZTogZmFsc2V9LFxuICAgIHRocm93OiB7ZW51bWVyYWJsZTogZmFsc2V9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIG5vbkVudW0oZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pKTtcbiAgZnVuY3Rpb24gY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoaW5uZXJGdW5jdGlvbiwgZnVuY3Rpb25PYmplY3QsIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEdlbmVyYXRvckNvbnRleHQoKTtcbiAgICB2YXIgb2JqZWN0ID0gJGNyZWF0ZShmdW5jdGlvbk9iamVjdC5wcm90b3R5cGUpO1xuICAgIG9iamVjdFtjdHhOYW1lXSA9IGN0eDtcbiAgICBvYmplY3RbbW92ZU5leHROYW1lXSA9IG1vdmVOZXh0O1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uT2JqZWN0KSB7XG4gICAgZnVuY3Rpb25PYmplY3QucHJvdG90eXBlID0gJGNyZWF0ZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUpO1xuICAgIGZ1bmN0aW9uT2JqZWN0Ll9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIHJldHVybiBmdW5jdGlvbk9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0Z1bmN0aW9uQ29udGV4dCgpIHtcbiAgICBHZW5lcmF0b3JDb250ZXh0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5lcnIgPSB1bmRlZmluZWQ7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgY3R4LnJlc3VsdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY3R4LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgY3R4LnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgfVxuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUgPSAkY3JlYXRlKEdlbmVyYXRvckNvbnRleHQucHJvdG90eXBlKTtcbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgY2FzZSBFTkRfU1RBVEU6XG4gICAgICAgIHRoaXMucmVzb2x2ZSh0aGlzLnJldHVyblZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJFVEhST1dfU1RBVEU6XG4gICAgICAgIHRoaXMucmVqZWN0KHRoaXMuc3RvcmVkRXhjZXB0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlamVjdChnZXRJbnRlcm5hbEVycm9yKHRoaXMuc3RhdGUpKTtcbiAgICB9XG4gIH07XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZS5oYW5kbGVFeGNlcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlID0gUkVUSFJPV19TVEFURTtcbiAgfTtcbiAgZnVuY3Rpb24gYXN5bmNXcmFwKGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEFzeW5jRnVuY3Rpb25Db250ZXh0KCk7XG4gICAgY3R4LmNyZWF0ZUNhbGxiYWNrID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjdHguc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgY3R4LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY3R4LmVycmJhY2sgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGhhbmRsZUNhdGNoKGN0eCwgZXJyKTtcbiAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgfTtcbiAgICBtb3ZlTmV4dChjdHgpO1xuICAgIHJldHVybiBjdHgucmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBpbm5lckZ1bmN0aW9uLmNhbGwoc2VsZiwgY3R4KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBoYW5kbGVDYXRjaChjdHgsIGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlQ2F0Y2goY3R4LCBleCkge1xuICAgIGN0eC5zdG9yZWRFeGNlcHRpb24gPSBleDtcbiAgICB2YXIgbGFzdCA9IGN0eC50cnlTdGFja19bY3R4LnRyeVN0YWNrXy5sZW5ndGggLSAxXTtcbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIGN0eC5oYW5kbGVFeGNlcHRpb24oZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdHguc3RhdGUgPSBsYXN0LmNhdGNoICE9PSB1bmRlZmluZWQgPyBsYXN0LmNhdGNoIDogbGFzdC5maW5hbGx5O1xuICAgIGlmIChsYXN0LmZpbmFsbHlGYWxsVGhyb3VnaCAhPT0gdW5kZWZpbmVkKVxuICAgICAgY3R4LmZpbmFsbHlGYWxsVGhyb3VnaCA9IGxhc3QuZmluYWxseUZhbGxUaHJvdWdoO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5hc3luY1dyYXAgPSBhc3luY1dyYXA7XG4gICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24gPSBpbml0R2VuZXJhdG9yRnVuY3Rpb247XG4gICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZSA9IGNyZWF0ZUdlbmVyYXRvckluc3RhbmNlO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKG9wdF9zY2hlbWUsIG9wdF91c2VySW5mbywgb3B0X2RvbWFpbiwgb3B0X3BvcnQsIG9wdF9wYXRoLCBvcHRfcXVlcnlEYXRhLCBvcHRfZnJhZ21lbnQpIHtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaWYgKG9wdF9zY2hlbWUpIHtcbiAgICAgIG91dC5wdXNoKG9wdF9zY2hlbWUsICc6Jyk7XG4gICAgfVxuICAgIGlmIChvcHRfZG9tYWluKSB7XG4gICAgICBvdXQucHVzaCgnLy8nKTtcbiAgICAgIGlmIChvcHRfdXNlckluZm8pIHtcbiAgICAgICAgb3V0LnB1c2gob3B0X3VzZXJJbmZvLCAnQCcpO1xuICAgICAgfVxuICAgICAgb3V0LnB1c2gob3B0X2RvbWFpbik7XG4gICAgICBpZiAob3B0X3BvcnQpIHtcbiAgICAgICAgb3V0LnB1c2goJzonLCBvcHRfcG9ydCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRfcGF0aCkge1xuICAgICAgb3V0LnB1c2gob3B0X3BhdGgpO1xuICAgIH1cbiAgICBpZiAob3B0X3F1ZXJ5RGF0YSkge1xuICAgICAgb3V0LnB1c2goJz8nLCBvcHRfcXVlcnlEYXRhKTtcbiAgICB9XG4gICAgaWYgKG9wdF9mcmFnbWVudCkge1xuICAgICAgb3V0LnB1c2goJyMnLCBvcHRfZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG4gIDtcbiAgdmFyIHNwbGl0UmUgPSBuZXcgUmVnRXhwKCdeJyArICcoPzonICsgJyhbXjovPyMuXSspJyArICc6KT8nICsgJyg/Oi8vJyArICcoPzooW14vPyNdKilAKT8nICsgJyhbXFxcXHdcXFxcZFxcXFwtXFxcXHUwMTAwLVxcXFx1ZmZmZi4lXSopJyArICcoPzo6KFswLTldKykpPycgKyAnKT8nICsgJyhbXj8jXSspPycgKyAnKD86XFxcXD8oW14jXSopKT8nICsgJyg/OiMoLiopKT8nICsgJyQnKTtcbiAgdmFyIENvbXBvbmVudEluZGV4ID0ge1xuICAgIFNDSEVNRTogMSxcbiAgICBVU0VSX0lORk86IDIsXG4gICAgRE9NQUlOOiAzLFxuICAgIFBPUlQ6IDQsXG4gICAgUEFUSDogNSxcbiAgICBRVUVSWV9EQVRBOiA2LFxuICAgIEZSQUdNRU5UOiA3XG4gIH07XG4gIGZ1bmN0aW9uIHNwbGl0KHVyaSkge1xuICAgIHJldHVybiAodXJpLm1hdGNoKHNwbGl0UmUpKTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyhwYXRoKSB7XG4gICAgaWYgKHBhdGggPT09ICcvJylcbiAgICAgIHJldHVybiAnLyc7XG4gICAgdmFyIGxlYWRpbmdTbGFzaCA9IHBhdGhbMF0gPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciB0cmFpbGluZ1NsYXNoID0gcGF0aC5zbGljZSgtMSkgPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIHVwID0gMDtcbiAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBzZWdtZW50cy5sZW5ndGg7IHBvcysrKSB7XG4gICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW3Bvc107XG4gICAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy4uJzpcbiAgICAgICAgICBpZiAob3V0Lmxlbmd0aClcbiAgICAgICAgICAgIG91dC5wb3AoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB1cCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG91dC5wdXNoKHNlZ21lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWxlYWRpbmdTbGFzaCkge1xuICAgICAgd2hpbGUgKHVwLS0gPiAwKSB7XG4gICAgICAgIG91dC51bnNoaWZ0KCcuLicpO1xuICAgICAgfVxuICAgICAgaWYgKG91dC5sZW5ndGggPT09IDApXG4gICAgICAgIG91dC5wdXNoKCcuJyk7XG4gICAgfVxuICAgIHJldHVybiBsZWFkaW5nU2xhc2ggKyBvdXQuam9pbignLycpICsgdHJhaWxpbmdTbGFzaDtcbiAgfVxuICBmdW5jdGlvbiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cykge1xuICAgIHZhciBwYXRoID0gcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gfHwgJyc7XG4gICAgcGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHBhdGgpO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlVTRVJfSU5GT10sIHBhcnRzW0NvbXBvbmVudEluZGV4LkRPTUFJTl0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlBPUlRdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUVVFUllfREFUQV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LkZSQUdNRU5UXSk7XG4gIH1cbiAgZnVuY3Rpb24gY2Fub25pY2FsaXplVXJsKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgfVxuICBmdW5jdGlvbiByZXNvbHZlVXJsKGJhc2UsIHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgdmFyIGJhc2VQYXJ0cyA9IHNwbGl0KGJhc2UpO1xuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdID0gYmFzZVBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBDb21wb25lbnRJbmRleC5TQ0hFTUU7IGkgPD0gQ29tcG9uZW50SW5kZXguUE9SVDsgaSsrKSB7XG4gICAgICBpZiAoIXBhcnRzW2ldKSB7XG4gICAgICAgIHBhcnRzW2ldID0gYmFzZVBhcnRzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF1bMF0gPT0gJy8nKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IGJhc2VQYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXTtcbiAgICB2YXIgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoMCwgaW5kZXggKyAxKSArIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG4gIGZ1bmN0aW9uIGlzQWJzb2x1dGUobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAobmFtZVswXSA9PT0gJy8nKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQobmFtZSk7XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0pXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNhbm9uaWNhbGl6ZVVybCA9IGNhbm9uaWNhbGl6ZVVybDtcbiAgJHRyYWNldXJSdW50aW1lLmlzQWJzb2x1dGUgPSBpc0Fic29sdXRlO1xuICAkdHJhY2V1clJ1bnRpbWUucmVtb3ZlRG90U2VnbWVudHMgPSByZW1vdmVEb3RTZWdtZW50cztcbiAgJHRyYWNldXJSdW50aW1lLnJlc29sdmVVcmwgPSByZXNvbHZlVXJsO1xufSkoKTtcbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJF9fMiA9ICR0cmFjZXVyUnVudGltZS5hc3NlcnRPYmplY3QoJHRyYWNldXJSdW50aW1lKSxcbiAgICAgIGNhbm9uaWNhbGl6ZVVybCA9ICRfXzIuY2Fub25pY2FsaXplVXJsLFxuICAgICAgcmVzb2x2ZVVybCA9ICRfXzIucmVzb2x2ZVVybCxcbiAgICAgIGlzQWJzb2x1dGUgPSAkX18yLmlzQWJzb2x1dGU7XG4gIHZhciBtb2R1bGVJbnN0YW50aWF0b3JzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGJhc2VVUkw7XG4gIGlmIChnbG9iYWwubG9jYXRpb24gJiYgZ2xvYmFsLmxvY2F0aW9uLmhyZWYpXG4gICAgYmFzZVVSTCA9IHJlc29sdmVVcmwoZ2xvYmFsLmxvY2F0aW9uLmhyZWYsICcuLycpO1xuICBlbHNlXG4gICAgYmFzZVVSTCA9ICcnO1xuICB2YXIgVW5jb2F0ZWRNb2R1bGVFbnRyeSA9IGZ1bmN0aW9uIFVuY29hdGVkTW9kdWxlRW50cnkodXJsLCB1bmNvYXRlZE1vZHVsZSkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMudmFsdWVfID0gdW5jb2F0ZWRNb2R1bGU7XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFVuY29hdGVkTW9kdWxlRW50cnksIHt9LCB7fSk7XG4gIHZhciBNb2R1bGVFdmFsdWF0aW9uRXJyb3IgPSBmdW5jdGlvbiBNb2R1bGVFdmFsdWF0aW9uRXJyb3IoZXJyb25lb3VzTW9kdWxlTmFtZSwgY2F1c2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAoY2F1c2UgPyAnOiBcXCcnICsgY2F1c2UgKyAnXFwnJyA6ICcnKSArICcgaW4gJyArIGVycm9uZW91c01vZHVsZU5hbWU7XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKE1vZHVsZUV2YWx1YXRpb25FcnJvciwge2xvYWRlZEJ5OiBmdW5jdGlvbihtb2R1bGVOYW1lKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gJ1xcbiBsb2FkZWQgYnkgJyArIG1vZHVsZU5hbWU7XG4gICAgfX0sIHt9LCBFcnJvcik7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IGZ1bmN0aW9uIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKHVybCwgZnVuYykge1xuICAgICR0cmFjZXVyUnVudGltZS5zdXBlckNhbGwodGhpcywgJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLnByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBbdXJsLCBudWxsXSk7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgfTtcbiAgdmFyICRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciwge2dldFVuY29hdGVkTW9kdWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlXylcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfID0gdGhpcy5mdW5jLmNhbGwoZ2xvYmFsKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChleCBpbnN0YW5jZW9mIE1vZHVsZUV2YWx1YXRpb25FcnJvcikge1xuICAgICAgICAgIGV4LmxvYWRlZEJ5KHRoaXMudXJsKTtcbiAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgTW9kdWxlRXZhbHVhdGlvbkVycm9yKHRoaXMudXJsLCBleCk7XG4gICAgICB9XG4gICAgfX0sIHt9LCBVbmNvYXRlZE1vZHVsZUVudHJ5KTtcbiAgZnVuY3Rpb24gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybjtcbiAgICB2YXIgdXJsID0gTW9kdWxlU3RvcmUubm9ybWFsaXplKG5hbWUpO1xuICAgIHJldHVybiBtb2R1bGVJbnN0YW50aWF0b3JzW3VybF07XG4gIH1cbiAgO1xuICB2YXIgbW9kdWxlSW5zdGFuY2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpdmVNb2R1bGVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBNb2R1bGUodW5jb2F0ZWRNb2R1bGUpIHtcbiAgICB2YXIgaXNMaXZlID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBjb2F0ZWRNb2R1bGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHVuY29hdGVkTW9kdWxlKS5mb3JFYWNoKChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZ2V0dGVyLFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgaWYgKGlzTGl2ZSA9PT0gbGl2ZU1vZHVsZVNlbnRpbmVsKSB7XG4gICAgICAgIHZhciBkZXNjciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodW5jb2F0ZWRNb2R1bGUsIG5hbWUpO1xuICAgICAgICBpZiAoZGVzY3IuZ2V0KVxuICAgICAgICAgIGdldHRlciA9IGRlc2NyLmdldDtcbiAgICAgIH1cbiAgICAgIGlmICghZ2V0dGVyKSB7XG4gICAgICAgIHZhbHVlID0gdW5jb2F0ZWRNb2R1bGVbbmFtZV07XG4gICAgICAgIGdldHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb2F0ZWRNb2R1bGUsIG5hbWUsIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoY29hdGVkTW9kdWxlKTtcbiAgICByZXR1cm4gY29hdGVkTW9kdWxlO1xuICB9XG4gIHZhciBNb2R1bGVTdG9yZSA9IHtcbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uKG5hbWUsIHJlZmVyZXJOYW1lLCByZWZlcmVyQWRkcmVzcykge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibW9kdWxlIG5hbWUgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIG5hbWUpO1xuICAgICAgaWYgKGlzQWJzb2x1dGUobmFtZSkpXG4gICAgICAgIHJldHVybiBjYW5vbmljYWxpemVVcmwobmFtZSk7XG4gICAgICBpZiAoL1teXFwuXVxcL1xcLlxcLlxcLy8udGVzdChuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21vZHVsZSBuYW1lIGVtYmVkcyAvLi4vOiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZVswXSA9PT0gJy4nICYmIHJlZmVyZXJOYW1lKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZVVybChyZWZlcmVyTmFtZSwgbmFtZSk7XG4gICAgICByZXR1cm4gY2Fub25pY2FsaXplVXJsKG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSkge1xuICAgICAgdmFyIG0gPSBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSk7XG4gICAgICBpZiAoIW0pXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB2YXIgbW9kdWxlSW5zdGFuY2UgPSBtb2R1bGVJbnN0YW5jZXNbbS51cmxdO1xuICAgICAgaWYgKG1vZHVsZUluc3RhbmNlKVxuICAgICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2U7XG4gICAgICBtb2R1bGVJbnN0YW5jZSA9IE1vZHVsZShtLmdldFVuY29hdGVkTW9kdWxlKCksIGxpdmVNb2R1bGVTZW50aW5lbCk7XG4gICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2VzW20udXJsXSA9IG1vZHVsZUluc3RhbmNlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSwgbW9kdWxlKSB7XG4gICAgICBub3JtYWxpemVkTmFtZSA9IFN0cmluZyhub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgICAgfSkpO1xuICAgICAgbW9kdWxlSW5zdGFuY2VzW25vcm1hbGl6ZWROYW1lXSA9IG1vZHVsZTtcbiAgICB9LFxuICAgIGdldCBiYXNlVVJMKCkge1xuICAgICAgcmV0dXJuIGJhc2VVUkw7XG4gICAgfSxcbiAgICBzZXQgYmFzZVVSTCh2KSB7XG4gICAgICBiYXNlVVJMID0gU3RyaW5nKHYpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJNb2R1bGU6IGZ1bmN0aW9uKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHZhciBub3JtYWxpemVkTmFtZSA9IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZShuYW1lKTtcbiAgICAgIGlmIChtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUgbW9kdWxlIG5hbWVkICcgKyBub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgZnVuYyk7XG4gICAgfSxcbiAgICBidW5kbGVTdG9yZTogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICByZWdpc3RlcjogZnVuY3Rpb24obmFtZSwgZGVwcywgZnVuYykge1xuICAgICAgaWYgKCFkZXBzIHx8ICFkZXBzLmxlbmd0aCAmJiAhZnVuYy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vZHVsZShuYW1lLCBmdW5jKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnVuZGxlU3RvcmVbbmFtZV0gPSB7XG4gICAgICAgICAgZGVwczogZGVwcyxcbiAgICAgICAgICBleGVjdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkX18wID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGRlcE1hcCA9IHt9O1xuICAgICAgICAgICAgZGVwcy5mb3JFYWNoKChmdW5jdGlvbihkZXAsIGluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXBNYXBbZGVwXSA9ICRfXzBbaW5kZXhdO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdmFyIHJlZ2lzdHJ5RW50cnkgPSBmdW5jLmNhbGwodGhpcywgZGVwTWFwKTtcbiAgICAgICAgICAgIHJlZ2lzdHJ5RW50cnkuZXhlY3V0ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdHJ5RW50cnkuZXhwb3J0cztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRBbm9ueW1vdXNNb2R1bGU6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgIHJldHVybiBuZXcgTW9kdWxlKGZ1bmMuY2FsbChnbG9iYWwpLCBsaXZlTW9kdWxlU2VudGluZWwpO1xuICAgIH0sXG4gICAgZ2V0Rm9yVGVzdGluZzogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgaWYgKCF0aGlzLnRlc3RpbmdQcmVmaXhfKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1vZHVsZUluc3RhbmNlcykuc29tZSgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgdmFyIG0gPSAvKHRyYWNldXJAW15cXC9dKlxcLykvLmV4ZWMoa2V5KTtcbiAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgJF9fMC50ZXN0aW5nUHJlZml4XyA9IG1bMV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLnRlc3RpbmdQcmVmaXhfICsgbmFtZSk7XG4gICAgfVxuICB9O1xuICBNb2R1bGVTdG9yZS5zZXQoJ0B0cmFjZXVyL3NyYy9ydW50aW1lL01vZHVsZVN0b3JlJywgbmV3IE1vZHVsZSh7TW9kdWxlU3RvcmU6IE1vZHVsZVN0b3JlfSkpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICB9O1xuICAkdHJhY2V1clJ1bnRpbWUuTW9kdWxlU3RvcmUgPSBNb2R1bGVTdG9yZTtcbiAgZ2xvYmFsLlN5c3RlbSA9IHtcbiAgICByZWdpc3RlcjogTW9kdWxlU3RvcmUucmVnaXN0ZXIuYmluZChNb2R1bGVTdG9yZSksXG4gICAgZ2V0OiBNb2R1bGVTdG9yZS5nZXQsXG4gICAgc2V0OiBNb2R1bGVTdG9yZS5zZXQsXG4gICAgbm9ybWFsaXplOiBNb2R1bGVTdG9yZS5ub3JtYWxpemVcbiAgfTtcbiAgJHRyYWNldXJSdW50aW1lLmdldE1vZHVsZUltcGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGluc3RhbnRpYXRvciA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5hbWUpO1xuICAgIHJldHVybiBpbnN0YW50aWF0b3IgJiYgaW5zdGFudGlhdG9yLmdldFVuY29hdGVkTW9kdWxlKCk7XG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIjtcbiAgdmFyICRjZWlsID0gTWF0aC5jZWlsO1xuICB2YXIgJGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciAkcG93ID0gTWF0aC5wb3c7XG4gIHZhciAkbWluID0gTWF0aC5taW47XG4gIHZhciB0b09iamVjdCA9ICR0cmFjZXVyUnVudGltZS50b09iamVjdDtcbiAgZnVuY3Rpb24gdG9VaW50MzIoeCkge1xuICAgIHJldHVybiB4ID4+PiAwO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBpc0NhbGxhYmxlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcic7XG4gIH1cbiAgZnVuY3Rpb24gdG9JbnRlZ2VyKHgpIHtcbiAgICB4ID0gK3g7XG4gICAgaWYgKCRpc05hTih4KSlcbiAgICAgIHJldHVybiAwO1xuICAgIGlmICh4ID09PSAwIHx8ICEkaXNGaW5pdGUoeCkpXG4gICAgICByZXR1cm4geDtcbiAgICByZXR1cm4geCA+IDAgPyAkZmxvb3IoeCkgOiAkY2VpbCh4KTtcbiAgfVxuICB2YXIgTUFYX1NBRkVfTEVOR1RIID0gJHBvdygyLCA1MykgLSAxO1xuICBmdW5jdGlvbiB0b0xlbmd0aCh4KSB7XG4gICAgdmFyIGxlbiA9IHRvSW50ZWdlcih4KTtcbiAgICByZXR1cm4gbGVuIDwgMCA/IDAgOiAkbWluKGxlbiwgTUFYX1NBRkVfTEVOR1RIKTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja0l0ZXJhYmxlKHgpIHtcbiAgICByZXR1cm4gIWlzT2JqZWN0KHgpID8gdW5kZWZpbmVkIDogeFtTeW1ib2wuaXRlcmF0b3JdO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoeCkge1xuICAgIHJldHVybiBpc0NhbGxhYmxlKHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHZhbHVlLCBkb25lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGRvbmU6IGRvbmVcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IHRvT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHRvT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IHRvVWludDMyKCkge1xuICAgICAgcmV0dXJuIHRvVWludDMyO1xuICAgIH0sXG4gICAgZ2V0IGlzT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IGlzQ2FsbGFibGUoKSB7XG4gICAgICByZXR1cm4gaXNDYWxsYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc051bWJlcigpIHtcbiAgICAgIHJldHVybiBpc051bWJlcjtcbiAgICB9LFxuICAgIGdldCB0b0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gdG9JbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHRvTGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIHRvTGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IGNoZWNrSXRlcmFibGUoKSB7XG4gICAgICByZXR1cm4gY2hlY2tJdGVyYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc0NvbnN0cnVjdG9yKCkge1xuICAgICAgcmV0dXJuIGlzQ29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBnZXQgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiO1xuICB2YXIgJF9fMyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGlzQ2FsbGFibGUgPSAkX18zLmlzQ2FsbGFibGUsXG4gICAgICBpc0NvbnN0cnVjdG9yID0gJF9fMy5pc0NvbnN0cnVjdG9yLFxuICAgICAgY2hlY2tJdGVyYWJsZSA9ICRfXzMuY2hlY2tJdGVyYWJsZSxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzMudG9JbnRlZ2VyLFxuICAgICAgdG9MZW5ndGggPSAkX18zLnRvTGVuZ3RoLFxuICAgICAgdG9PYmplY3QgPSAkX18zLnRvT2JqZWN0O1xuICBmdW5jdGlvbiBmcm9tKGFyckxpa2UpIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBpdGVtcyA9IHRvT2JqZWN0KGFyckxpa2UpO1xuICAgIHZhciBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIGFycixcbiAgICAgICAgbGVuO1xuICAgIGlmIChtYXBwaW5nICYmICFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChjaGVja0l0ZXJhYmxlKGl0ZW1zKSkge1xuICAgICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKCkgOiBbXTtcbiAgICAgIGZvciAodmFyICRfXzQgPSBpdGVtc1tTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fNTsgISgkX181ID0gJF9fNC5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzUudmFsdWU7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAobWFwcGluZykge1xuICAgICAgICAgICAgYXJyW2tdID0gbWFwRm4uY2FsbCh0aGlzQXJnLCBpdGVtLCBrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyW2tdID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcnIubGVuZ3RoID0gaztcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG4gICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKGxlbikgOiBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IgKDsgayA8IGxlbjsgaysrKSB7XG4gICAgICBpZiAobWFwcGluZykge1xuICAgICAgICBhcnJba10gPSB0eXBlb2YgdGhpc0FyZyA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihpdGVtc1trXSwgaykgOiBtYXBGbi5jYWxsKHRoaXNBcmcsIGl0ZW1zW2tdLCBrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycltrXSA9IGl0ZW1zW2tdO1xuICAgICAgfVxuICAgIH1cbiAgICBhcnIubGVuZ3RoID0gbGVuO1xuICAgIHJldHVybiBhcnI7XG4gIH1cbiAgZnVuY3Rpb24gZmlsbCh2YWx1ZSkge1xuICAgIHZhciBzdGFydCA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgIHZhciBlbmQgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChvYmplY3QubGVuZ3RoKTtcbiAgICB2YXIgZmlsbFN0YXJ0ID0gdG9JbnRlZ2VyKHN0YXJ0KTtcbiAgICB2YXIgZmlsbEVuZCA9IGVuZCAhPT0gdW5kZWZpbmVkID8gdG9JbnRlZ2VyKGVuZCkgOiBsZW47XG4gICAgZmlsbFN0YXJ0ID0gZmlsbFN0YXJ0IDwgMCA/IE1hdGgubWF4KGxlbiArIGZpbGxTdGFydCwgMCkgOiBNYXRoLm1pbihmaWxsU3RhcnQsIGxlbik7XG4gICAgZmlsbEVuZCA9IGZpbGxFbmQgPCAwID8gTWF0aC5tYXgobGVuICsgZmlsbEVuZCwgMCkgOiBNYXRoLm1pbihmaWxsRW5kLCBsZW4pO1xuICAgIHdoaWxlIChmaWxsU3RhcnQgPCBmaWxsRW5kKSB7XG4gICAgICBvYmplY3RbZmlsbFN0YXJ0XSA9IHZhbHVlO1xuICAgICAgZmlsbFN0YXJ0Kys7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gZmluZChwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gZmluZEhlbHBlcih0aGlzLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICB9XG4gIGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gZmluZEhlbHBlcih0aGlzLCBwcmVkaWNhdGUsIHRoaXNBcmcsIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGZpbmRIZWxwZXIoc2VsZiwgcHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIHJldHVybkluZGV4ID0gYXJndW1lbnRzWzNdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdChzZWxmKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgob2JqZWN0Lmxlbmd0aCk7XG4gICAgaWYgKCFpc0NhbGxhYmxlKHByZWRpY2F0ZSkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaSBpbiBvYmplY3QpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIG9iamVjdCkpIHtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuSW5kZXggPyBpIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkluZGV4ID8gLTEgOiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZXQgZnJvbSgpIHtcbiAgICAgIHJldHVybiBmcm9tO1xuICAgIH0sXG4gICAgZ2V0IGZpbGwoKSB7XG4gICAgICByZXR1cm4gZmlsbDtcbiAgICB9LFxuICAgIGdldCBmaW5kKCkge1xuICAgICAgcmV0dXJuIGZpbmQ7XG4gICAgfSxcbiAgICBnZXQgZmluZEluZGV4KCkge1xuICAgICAgcmV0dXJuIGZpbmRJbmRleDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRfXzg7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIjtcbiAgdmFyICRfXzYgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICB0b09iamVjdCA9ICRfXzYudG9PYmplY3QsXG4gICAgICB0b1VpbnQzMiA9ICRfXzYudG9VaW50MzIsXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzYuY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gIHZhciBBUlJBWV9JVEVSQVRPUl9LSU5EX0tFWVMgPSAxO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMgPSAyO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTID0gMztcbiAgdmFyIEFycmF5SXRlcmF0b3IgPSBmdW5jdGlvbiBBcnJheUl0ZXJhdG9yKCkge307XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKEFycmF5SXRlcmF0b3IsICgkX184ID0ge30sIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX184LCBcIm5leHRcIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IHRvT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuaXRlcmF0b3JPYmplY3RfO1xuICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QgaXMgbm90IGFuIEFycmF5SXRlcmF0b3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfO1xuICAgICAgdmFyIGl0ZW1LaW5kID0gaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXztcbiAgICAgIHZhciBsZW5ndGggPSB0b1VpbnQzMihhcnJheS5sZW5ndGgpO1xuICAgICAgaWYgKGluZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IEluZmluaXR5O1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gaW5kZXggKyAxO1xuICAgICAgaWYgKGl0ZW1LaW5kID09IEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoYXJyYXlbaW5kZXhdLCBmYWxzZSk7XG4gICAgICBpZiAoaXRlbUtpbmQgPT0gQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoW2luZGV4LCBhcnJheVtpbmRleF1dLCBmYWxzZSk7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoaW5kZXgsIGZhbHNlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fOCwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fOCksIHt9KTtcbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlJdGVyYXRvcihhcnJheSwga2luZCkge1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdChhcnJheSk7XG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IEFycmF5SXRlcmF0b3I7XG4gICAgaXRlcmF0b3IuaXRlcmF0b3JPYmplY3RfID0gb2JqZWN0O1xuICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gMDtcbiAgICBpdGVyYXRvci5hcnJheUl0ZXJhdGlvbktpbmRfID0ga2luZDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX0VOVFJJRVMpO1xuICB9XG4gIGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9LRVlTKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IGVudHJpZXMoKSB7XG4gICAgICByZXR1cm4gZW50cmllcztcbiAgICB9LFxuICAgIGdldCBrZXlzKCkge1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSxcbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIjtcbiAgdmFyIGlzT2JqZWN0ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLmlzT2JqZWN0O1xuICB2YXIgZ2V0T3duSGFzaE9iamVjdCA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25IYXNoT2JqZWN0O1xuICB2YXIgJGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGRlbGV0ZWRTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBsb29rdXBJbmRleChtYXAsIGtleSkge1xuICAgIGlmIChpc09iamVjdChrZXkpKSB7XG4gICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgIHJldHVybiBoYXNoT2JqZWN0ICYmIG1hcC5vYmplY3RJbmRleF9baGFzaE9iamVjdC5oYXNoXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIG1hcC5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICByZXR1cm4gbWFwLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRNYXAobWFwKSB7XG4gICAgbWFwLmVudHJpZXNfID0gW107XG4gICAgbWFwLm9iamVjdEluZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLnN0cmluZ0luZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLnByaW1pdGl2ZUluZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLmRlbGV0ZWRDb3VudF8gPSAwO1xuICB9XG4gIHZhciBNYXAgPSBmdW5jdGlvbiBNYXAoKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICghaXNPYmplY3QodGhpcykpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgY2FsbGVkIG9uIGluY29tcGF0aWJsZSB0eXBlJyk7XG4gICAgaWYgKCRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdlbnRyaWVzXycpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgY2FuIG5vdCBiZSByZWVudHJhbnRseSBpbml0aWFsaXNlZCcpO1xuICAgIH1cbiAgICBpbml0TWFwKHRoaXMpO1xuICAgIGlmIChpdGVyYWJsZSAhPT0gbnVsbCAmJiBpdGVyYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKHZhciAkX18xMSA9IGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSxcbiAgICAgICAgICAkX18xMjsgISgkX18xMiA9ICRfXzExLm5leHQoKSkuZG9uZTsgKSB7XG4gICAgICAgIHZhciAkX18xMyA9ICR0cmFjZXVyUnVudGltZS5hc3NlcnRPYmplY3QoJF9fMTIudmFsdWUpLFxuICAgICAgICAgICAga2V5ID0gJF9fMTNbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9ICRfXzEzWzFdO1xuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKE1hcCwge1xuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllc18ubGVuZ3RoIC8gMiAtIHRoaXMuZGVsZXRlZENvdW50XztcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBvYmplY3RNb2RlID0gaXNPYmplY3Qoa2V5KTtcbiAgICAgIHZhciBzdHJpbmdNb2RlID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMuZW50cmllc18ubGVuZ3RoO1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4XSA9IGtleTtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICAgIGlmIChvYmplY3RNb2RlKSB7XG4gICAgICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICAgICAgdmFyIGhhc2ggPSBoYXNoT2JqZWN0Lmhhc2g7XG4gICAgICAgICAgdGhpcy5vYmplY3RJbmRleF9baGFzaF0gPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgICAgdGhpcy5zdHJpbmdJbmRleF9ba2V5XSA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV0gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGxvb2t1cEluZGV4KHRoaXMsIGtleSkgIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgb2JqZWN0TW9kZSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICB2YXIgc3RyaW5nTW9kZSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhhc2g7XG4gICAgICBpZiAob2JqZWN0TW9kZSkge1xuICAgICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgICAgaWYgKGhhc2hPYmplY3QpIHtcbiAgICAgICAgICBpbmRleCA9IHRoaXMub2JqZWN0SW5kZXhfW2hhc2ggPSBoYXNoT2JqZWN0Lmhhc2hdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdEluZGV4X1toYXNoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleF0gPSBkZWxldGVkU2VudGluZWw7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kZWxldGVkQ291bnRfKys7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBpbml0TWFwKHRoaXMpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgICBsZW4gPSB0aGlzLmVudHJpZXNfLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzE0KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAgbGVuLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDAsIGxlbiA9IHRoaXMuZW50cmllc18ubGVuZ3RoO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgbGVuKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18xNCwgdGhpcyk7XG4gICAgfSksXG4gICAga2V5czogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18xNSgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbixcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwLCBsZW4gPSB0aGlzLmVudHJpZXNfLmxlbmd0aDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IGxlbikgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMTUsIHRoaXMpO1xuICAgIH0pLFxuICAgIHZhbHVlczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18xNigpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbixcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwLCBsZW4gPSB0aGlzLmVudHJpZXNfLmxlbmd0aDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IGxlbikgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18xNiwgdGhpcyk7XG4gICAgfSlcbiAgfSwge30pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBNYXAucHJvdG90eXBlLmVudHJpZXNcbiAgfSk7XG4gIHJldHVybiB7Z2V0IE1hcCgpIHtcbiAgICAgIHJldHVybiBNYXA7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIjtcbiAgdmFyICRfXzE3ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNOdW1iZXIgPSAkX18xNy5pc051bWJlcixcbiAgICAgIHRvSW50ZWdlciA9ICRfXzE3LnRvSW50ZWdlcjtcbiAgdmFyICRhYnMgPSBNYXRoLmFicztcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgdmFyIE1JTl9TQUZFX0lOVEVHRVIgPSAtTWF0aC5wb3coMiwgNTMpICsgMTtcbiAgdmFyIEVQU0lMT04gPSBNYXRoLnBvdygyLCAtNTIpO1xuICBmdW5jdGlvbiBOdW1iZXJJc0Zpbml0ZShudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNGaW5pdGUobnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzSW50ZWdlcihudW1iZXIpIHtcbiAgICByZXR1cm4gTnVtYmVySXNGaW5pdGUobnVtYmVyKSAmJiB0b0ludGVnZXIobnVtYmVyKSA9PT0gbnVtYmVyO1xuICB9XG4gIGZ1bmN0aW9uIE51bWJlcklzTmFOKG51bWJlcikge1xuICAgIHJldHVybiBpc051bWJlcihudW1iZXIpICYmICRpc05hTihudW1iZXIpO1xuICB9XG4gIDtcbiAgZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVySXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgdmFyIGludGVncmFsID0gdG9JbnRlZ2VyKG51bWJlcik7XG4gICAgICBpZiAoaW50ZWdyYWwgPT09IG51bWJlcilcbiAgICAgICAgcmV0dXJuICRhYnMoaW50ZWdyYWwpIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGdldCBNQVhfU0FGRV9JTlRFR0VSKCkge1xuICAgICAgcmV0dXJuIE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfSxcbiAgICBnZXQgTUlOX1NBRkVfSU5URUdFUigpIHtcbiAgICAgIHJldHVybiBNSU5fU0FGRV9JTlRFR0VSO1xuICAgIH0sXG4gICAgZ2V0IEVQU0lMT04oKSB7XG4gICAgICByZXR1cm4gRVBTSUxPTjtcbiAgICB9LFxuICAgIGdldCBpc0Zpbml0ZSgpIHtcbiAgICAgIHJldHVybiBOdW1iZXJJc0Zpbml0ZTtcbiAgICB9LFxuICAgIGdldCBpc0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gaXNJbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IGlzTmFOKCkge1xuICAgICAgcmV0dXJuIE51bWJlcklzTmFOO1xuICAgIH0sXG4gICAgZ2V0IGlzU2FmZUludGVnZXIoKSB7XG4gICAgICByZXR1cm4gaXNTYWZlSW50ZWdlcjtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIjtcbiAgdmFyICRfXzE4ID0gJHRyYWNldXJSdW50aW1lLmFzc2VydE9iamVjdCgkdHJhY2V1clJ1bnRpbWUpLFxuICAgICAgZGVmaW5lUHJvcGVydHkgPSAkX18xOC5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRfXzE4LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICAgIGdldE93blByb3BlcnR5TmFtZXMgPSAkX18xOC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgICAga2V5cyA9ICRfXzE4LmtleXMsXG4gICAgICBwcml2YXRlTmFtZXMgPSAkX18xOC5wcml2YXRlTmFtZXM7XG4gIGZ1bmN0aW9uIGlzKGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGxlZnQgPT09IHJpZ2h0KVxuICAgICAgcmV0dXJuIGxlZnQgIT09IDAgfHwgMSAvIGxlZnQgPT09IDEgLyByaWdodDtcbiAgICByZXR1cm4gbGVmdCAhPT0gbGVmdCAmJiByaWdodCAhPT0gcmlnaHQ7XG4gIH1cbiAgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICAgICAgdmFyIHAsXG4gICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgICAgZm9yIChwID0gMDsgcCA8IGxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gcHJvcHNbcF07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHNvdXJjZVtuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBwcm9wcyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlKTtcbiAgICB2YXIgcCxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHByb3BzW3BdKTtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcHNbcF0sIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IGlzKCkge1xuICAgICAgcmV0dXJuIGlzO1xuICAgIH0sXG4gICAgZ2V0IGFzc2lnbigpIHtcbiAgICAgIHJldHVybiBhc3NpZ247XG4gICAgfSxcbiAgICBnZXQgbWl4aW4oKSB7XG4gICAgICByZXR1cm4gbWl4aW47XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCI7XG4gIHZhciBsZW5ndGggPSAwO1xuICBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICBxdWV1ZVtsZW5ndGhdID0gY2FsbGJhY2s7XG4gICAgcXVldWVbbGVuZ3RoICsgMV0gPSBhcmc7XG4gICAgbGVuZ3RoICs9IDI7XG4gICAgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxuICB2YXIgJF9fZGVmYXVsdCA9IGFzYXA7XG4gIHZhciBicm93c2VyR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6IHt9O1xuICB2YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuICB2YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuICBmdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIG5vZGUuZGF0YSA9IChpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMik7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmbHVzaCwgMSk7XG4gICAgfTtcbiAgfVxuICB2YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcbiAgICAgIGNhbGxiYWNrKGFyZyk7XG4gICAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGVuZ3RoID0gMDtcbiAgfVxuICB2YXIgc2NoZWR1bGVGbHVzaDtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbiAgfSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gIH0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbiAgfSBlbHNlIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xuICB9XG4gIHJldHVybiB7Z2V0IGRlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gJF9fZGVmYXVsdDtcbiAgICB9fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlXCI7XG4gIHZhciBhc3luYyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIikuZGVmYXVsdDtcbiAgdmFyIHByb21pc2VSYXcgPSB7fTtcbiAgZnVuY3Rpb24gaXNQcm9taXNlKHgpIHtcbiAgICByZXR1cm4geCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeC5zdGF0dXNfICE9PSB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZXNvbHZlSGFuZGxlcih4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZWplY3RIYW5kbGVyKHgpIHtcbiAgICB0aHJvdyB4O1xuICB9XG4gIGZ1bmN0aW9uIGNoYWluKHByb21pc2UpIHtcbiAgICB2YXIgb25SZXNvbHZlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IGlkUmVzb2x2ZUhhbmRsZXI7XG4gICAgdmFyIG9uUmVqZWN0ID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IGlkUmVqZWN0SGFuZGxlcjtcbiAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZChwcm9taXNlLmNvbnN0cnVjdG9yKTtcbiAgICBzd2l0Y2ggKHByb21pc2Uuc3RhdHVzXykge1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHRocm93IFR5cGVFcnJvcjtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcHJvbWlzZS5vblJlc29sdmVfLnB1c2gob25SZXNvbHZlLCBkZWZlcnJlZCk7XG4gICAgICAgIHByb21pc2Uub25SZWplY3RfLnB1c2gob25SZWplY3QsIGRlZmVycmVkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICsxOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVzb2x2ZSwgZGVmZXJyZWRdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVqZWN0LCBkZWZlcnJlZF0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVmZXJyZWQoQykge1xuICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBwcm9taXNlSW5pdChuZXcgJFByb21pc2UocHJvbWlzZVJhdykpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgcmVzb2x2ZTogKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KTtcbiAgICAgICAgfSksXG4gICAgICAgIHJlamVjdDogKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpO1xuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgcmVzdWx0LnByb21pc2UgPSBuZXcgQygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc3VsdC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgcmVzdWx0LnJlamVjdCA9IHJlamVjdDtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VTZXQocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSwgb25SZXNvbHZlLCBvblJlamVjdCkge1xuICAgIHByb21pc2Uuc3RhdHVzXyA9IHN0YXR1cztcbiAgICBwcm9taXNlLnZhbHVlXyA9IHZhbHVlO1xuICAgIHByb21pc2Uub25SZXNvbHZlXyA9IG9uUmVzb2x2ZTtcbiAgICBwcm9taXNlLm9uUmVqZWN0XyA9IG9uUmVqZWN0O1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VJbml0KHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZVNldChwcm9taXNlLCAwLCB1bmRlZmluZWQsIFtdLCBbXSk7XG4gIH1cbiAgdmFyIFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgaWYgKHJlc29sdmVyID09PSBwcm9taXNlUmF3KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgIHZhciBwcm9taXNlID0gcHJvbWlzZUluaXQodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmVyKChmdW5jdGlvbih4KSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpO1xuICAgICAgfSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgcik7XG4gICAgICB9KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCBlKTtcbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFByb21pc2UsIHtcbiAgICBjYXRjaDogZnVuY3Rpb24ob25SZWplY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdCk7XG4gICAgfSxcbiAgICB0aGVuOiBmdW5jdGlvbihvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIG9uUmVzb2x2ZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgb25SZXNvbHZlID0gaWRSZXNvbHZlSGFuZGxlcjtcbiAgICAgIGlmICh0eXBlb2Ygb25SZWplY3QgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uUmVqZWN0ID0gaWRSZWplY3RIYW5kbGVyO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjaGFpbih0aGlzLCBmdW5jdGlvbih4KSB7XG4gICAgICAgIHggPSBwcm9taXNlQ29lcmNlKGNvbnN0cnVjdG9yLCB4KTtcbiAgICAgICAgcmV0dXJuIHggPT09IHRoYXQgPyBvblJlamVjdChuZXcgVHlwZUVycm9yKSA6IGlzUHJvbWlzZSh4KSA/IHgudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KSA6IG9uUmVzb2x2ZSh4KTtcbiAgICAgIH0sIG9uUmVqZWN0KTtcbiAgICB9XG4gIH0sIHtcbiAgICByZXNvbHZlOiBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VTZXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpLCArMSwgeCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVzb2x2ZSh4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZWplY3Q6IGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVNldChuZXcgJFByb21pc2UocHJvbWlzZVJhdyksIC0xLCByKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXN0OiBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoeCBpbnN0YW5jZW9mIHRoaXMpXG4gICAgICAgIHJldHVybiB4O1xuICAgICAgaWYgKGlzUHJvbWlzZSh4KSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0RGVmZXJyZWQodGhpcyk7XG4gICAgICAgIGNoYWluKHgsIHJlc3VsdC5yZXNvbHZlLCByZXN1bHQucmVqZWN0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5wcm9taXNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZSh4KTtcbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZCh0aGlzKTtcbiAgICAgIHZhciByZXNvbHV0aW9ucyA9IFtdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNvdW50ID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHV0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWx1ZXNbaV0pLnRoZW4oZnVuY3Rpb24oaSwgeCkge1xuICAgICAgICAgICAgICByZXNvbHV0aW9uc1tpXSA9IHg7XG4gICAgICAgICAgICAgIGlmICgtLWNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzb2x1dGlvbnMpO1xuICAgICAgICAgICAgfS5iaW5kKHVuZGVmaW5lZCwgaSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfSxcbiAgICByYWNlOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnJlc29sdmUodmFsdWVzW2ldKS50aGVuKChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHgpO1xuICAgICAgICAgIH0pLCAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgJFByb21pc2UgPSBQcm9taXNlO1xuICB2YXIgJFByb21pc2VSZWplY3QgPSAkUHJvbWlzZS5yZWplY3Q7XG4gIGZ1bmN0aW9uIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCArMSwgeCwgcHJvbWlzZS5vblJlc29sdmVfKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCAtMSwgciwgcHJvbWlzZS5vblJlamVjdF8pO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VEb25lKHByb21pc2UsIHN0YXR1cywgdmFsdWUsIHJlYWN0aW9ucykge1xuICAgIGlmIChwcm9taXNlLnN0YXR1c18gIT09IDApXG4gICAgICByZXR1cm47XG4gICAgcHJvbWlzZUVucXVldWUodmFsdWUsIHJlYWN0aW9ucyk7XG4gICAgcHJvbWlzZVNldChwcm9taXNlLCBzdGF0dXMsIHZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlRW5xdWV1ZSh2YWx1ZSwgdGFza3MpIHtcbiAgICBhc3luYygoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHByb21pc2VIYW5kbGUodmFsdWUsIHRhc2tzW2ldLCB0YXNrc1tpICsgMV0pO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlSGFuZGxlKHZhbHVlLCBoYW5kbGVyLCBkZWZlcnJlZCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICBpZiAocmVzdWx0ID09PSBkZWZlcnJlZC5wcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgICAgZWxzZSBpZiAoaXNQcm9taXNlKHJlc3VsdCkpXG4gICAgICAgIGNoYWluKHJlc3VsdCwgZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHZhciB0aGVuYWJsZVN5bWJvbCA9ICdAQHRoZW5hYmxlJztcbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VDb2VyY2UoY29uc3RydWN0b3IsIHgpIHtcbiAgICBpZiAoIWlzUHJvbWlzZSh4KSAmJiBpc09iamVjdCh4KSkge1xuICAgICAgdmFyIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICB0aGVuID0geC50aGVuO1xuICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlUmVqZWN0LmNhbGwoY29uc3RydWN0b3IsIHIpO1xuICAgICAgICB4W3RoZW5hYmxlU3ltYm9sXSA9IHByb21pc2U7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBwID0geFt0aGVuYWJsZVN5bWJvbF07XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQoY29uc3RydWN0b3IpO1xuICAgICAgICAgIHhbdGhlbmFibGVTeW1ib2xdID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHgsIGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuICByZXR1cm4ge2dldCBQcm9taXNlKCkge1xuICAgICAgcmV0dXJuIFByb21pc2U7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIjtcbiAgdmFyIGlzT2JqZWN0ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLmlzT2JqZWN0O1xuICB2YXIgTWFwID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiKS5NYXA7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmdW5jdGlvbiBpbml0U2V0KHNldCkge1xuICAgIHNldC5tYXBfID0gbmV3IE1hcCgpO1xuICB9XG4gIHZhciBTZXQgPSBmdW5jdGlvbiBTZXQoKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICghaXNPYmplY3QodGhpcykpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZXQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSB0eXBlJyk7XG4gICAgaWYgKCRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdtYXBfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRTZXQodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzI1ID0gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzI2OyAhKCRfXzI2ID0gJF9fMjUubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX18yNi52YWx1ZTtcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShTZXQsIHtcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uc2l6ZTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmhhcyhrZXkpO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uc2V0KGtleSwga2V5KTtcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5jbGVhcigpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICB2YXIgJF9fMjMgPSB0aGlzO1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5mb3JFYWNoKChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCBrZXksIGtleSwgJF9fMjMpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzI3KCkge1xuICAgICAgdmFyICRfXzI4LFxuICAgICAgICAgICRfXzI5O1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18yOCA9IHRoaXMubWFwXy5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMjkgPSAkX18yOFskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMjkuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzI5LnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18yOS52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzI3LCB0aGlzKTtcbiAgICB9KSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzMwKCkge1xuICAgICAgdmFyICRfXzMxLFxuICAgICAgICAgICRfXzMyO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18zMSA9IHRoaXMubWFwXy5lbnRyaWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMzIgPSAkX18zMVskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMzIuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzMyLnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18zMi52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzMwLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IFNldC5wcm90b3R5cGUudmFsdWVzXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgJ2tleXMnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBTZXQucHJvdG90eXBlLnZhbHVlc1xuICB9KTtcbiAgcmV0dXJuIHtnZXQgU2V0KCkge1xuICAgICAgcmV0dXJuIFNldDtcbiAgICB9fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRfXzM1O1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiO1xuICB2YXIgJF9fMzMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzMzLmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0LFxuICAgICAgaXNPYmplY3QgPSAkX18zMy5pc09iamVjdDtcbiAgdmFyICRfXzM2ID0gJHRyYWNldXJSdW50aW1lLmFzc2VydE9iamVjdCgkdHJhY2V1clJ1bnRpbWUpLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSAkX18zNi5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHRvUHJvcGVydHkgPSAkX18zNi50b1Byb3BlcnR5O1xuICB2YXIgaXRlcmF0ZWRTdHJpbmcgPSBTeW1ib2woJ2l0ZXJhdGVkU3RyaW5nJyk7XG4gIHZhciBzdHJpbmdJdGVyYXRvck5leHRJbmRleCA9IFN5bWJvbCgnc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgnKTtcbiAgdmFyIFN0cmluZ0l0ZXJhdG9yID0gZnVuY3Rpb24gU3RyaW5nSXRlcmF0b3IoKSB7fTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoU3RyaW5nSXRlcmF0b3IsICgkX18zNSA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMzUsIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG8gPSB0aGlzO1xuICAgICAgaWYgKCFpc09iamVjdChvKSB8fCAhaGFzT3duUHJvcGVydHkobywgaXRlcmF0ZWRTdHJpbmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgbXVzdCBiZSBhIFN0cmluZ0l0ZXJhdG9yIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdmFyIHMgPSBvW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXTtcbiAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgcG9zaXRpb24gPSBvW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXTtcbiAgICAgIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgICAgIGlmIChwb3NpdGlvbiA+PSBsZW4pIHtcbiAgICAgICAgb1t0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0ID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICAgIHZhciByZXN1bHRTdHJpbmc7XG4gICAgICBpZiAoZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBsZW4pIHtcbiAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2Vjb25kID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSk7XG4gICAgICAgIGlmIChzZWNvbmQgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGKSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9bdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gcG9zaXRpb24gKyByZXN1bHRTdHJpbmcubGVuZ3RoO1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHJlc3VsdFN0cmluZywgZmFsc2UpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18zNSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fMzUpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHN0cmluZykge1xuICAgIHZhciBzID0gU3RyaW5nKHN0cmluZyk7XG4gICAgdmFyIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUpO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHM7XG4gICAgaXRlcmF0b3JbdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gMDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgcmV0dXJuIHtnZXQgY3JlYXRlU3RyaW5nSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3I7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIjtcbiAgdmFyIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCIpLmNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICB2YXIgJHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyICRpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuICB2YXIgJGxhc3RJbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5sYXN0SW5kZXhPZjtcbiAgZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICByZXR1cm4gJGluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zKSA9PSBzdGFydDtcbiAgfVxuICBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zID0gc3RyaW5nTGVuZ3RoO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICAgICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgICAgICBwb3MgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBlbmQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHZhciBzdGFydCA9IGVuZCAtIHNlYXJjaExlbmd0aDtcbiAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAkbGFzdEluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgc3RhcnQpID09IHN0YXJ0O1xuICB9XG4gIGZ1bmN0aW9uIGNvbnRhaW5zKHNlYXJjaCkge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICByZXR1cm4gJGluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zKSAhPSAtMTtcbiAgfVxuICBmdW5jdGlvbiByZXBlYXQoY291bnQpIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgbiA9IGNvdW50ID8gTnVtYmVyKGNvdW50KSA6IDA7XG4gICAgaWYgKGlzTmFOKG4pKSB7XG4gICAgICBuID0gMDtcbiAgICB9XG4gICAgaWYgKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpIHtcbiAgICAgIHRocm93IFJhbmdlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKG4gPT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgd2hpbGUgKG4tLSkge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3NpdGlvbikge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBzaXplID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgaW5kZXggPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBzaXplKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCk7XG4gICAgdmFyIHNlY29uZDtcbiAgICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBzaXplID4gaW5kZXggKyAxKSB7XG4gICAgICBzZWNvbmQgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCArIDEpO1xuICAgICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgICByZXR1cm4gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0O1xuICB9XG4gIGZ1bmN0aW9uIHJhdyhjYWxsc2l0ZSkge1xuICAgIHZhciByYXcgPSBjYWxsc2l0ZS5yYXc7XG4gICAgdmFyIGxlbiA9IHJhdy5sZW5ndGggPj4+IDA7XG4gICAgaWYgKGxlbiA9PT0gMClcbiAgICAgIHJldHVybiAnJztcbiAgICB2YXIgcyA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcyArPSByYXdbaV07XG4gICAgICBpZiAoaSArIDEgPT09IGxlbilcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICBzICs9IGFyZ3VtZW50c1srK2ldO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KCkge1xuICAgIHZhciBjb2RlVW5pdHMgPSBbXTtcbiAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgIHZhciBoaWdoU3Vycm9nYXRlO1xuICAgIHZhciBsb3dTdXJyb2dhdGU7XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBjb2RlUG9pbnQgPSBOdW1iZXIoYXJndW1lbnRzW2luZGV4XSk7XG4gICAgICBpZiAoIWlzRmluaXRlKGNvZGVQb2ludCkgfHwgY29kZVBvaW50IDwgMCB8fCBjb2RlUG9pbnQgPiAweDEwRkZGRiB8fCBmbG9vcihjb2RlUG9pbnQpICE9IGNvZGVQb2ludCkge1xuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQ6ICcgKyBjb2RlUG9pbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHtcbiAgICAgICAgY29kZVVuaXRzLnB1c2goY29kZVBvaW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwO1xuICAgICAgICBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyAweEQ4MDA7XG4gICAgICAgIGxvd1N1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgJSAweDQwMCkgKyAweERDMDA7XG4gICAgICAgIGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVVbml0cyk7XG4gIH1cbiAgZnVuY3Rpb24gc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IoKSB7XG4gICAgdmFyIG8gPSAkdHJhY2V1clJ1bnRpbWUuY2hlY2tPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgdmFyIHMgPSBTdHJpbmcobyk7XG4gICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHMpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IHN0YXJ0c1dpdGgoKSB7XG4gICAgICByZXR1cm4gc3RhcnRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBlbmRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBlbmRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBjb250YWlucygpIHtcbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9LFxuICAgIGdldCByZXBlYXQoKSB7XG4gICAgICByZXR1cm4gcmVwZWF0O1xuICAgIH0sXG4gICAgZ2V0IGNvZGVQb2ludEF0KCkge1xuICAgICAgcmV0dXJuIGNvZGVQb2ludEF0O1xuICAgIH0sXG4gICAgZ2V0IHJhdygpIHtcbiAgICAgIHJldHVybiByYXc7XG4gICAgfSxcbiAgICBnZXQgZnJvbUNvZGVQb2ludCgpIHtcbiAgICAgIHJldHVybiBmcm9tQ29kZVBvaW50O1xuICAgIH0sXG4gICAgZ2V0IHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiO1xuICB2YXIgTWFwID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiKS5NYXA7XG4gIHZhciBTZXQgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCIpLlNldDtcbiAgdmFyIFByb21pc2UgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiKS5Qcm9taXNlO1xuICB2YXIgJF9fNDEgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCIpLFxuICAgICAgY29kZVBvaW50QXQgPSAkX180MS5jb2RlUG9pbnRBdCxcbiAgICAgIGNvbnRhaW5zID0gJF9fNDEuY29udGFpbnMsXG4gICAgICBlbmRzV2l0aCA9ICRfXzQxLmVuZHNXaXRoLFxuICAgICAgZnJvbUNvZGVQb2ludCA9ICRfXzQxLmZyb21Db2RlUG9pbnQsXG4gICAgICByZXBlYXQgPSAkX180MS5yZXBlYXQsXG4gICAgICByYXcgPSAkX180MS5yYXcsXG4gICAgICBzdGFydHNXaXRoID0gJF9fNDEuc3RhcnRzV2l0aCxcbiAgICAgIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yID0gJF9fNDEuc3RyaW5nUHJvdG90eXBlSXRlcmF0b3I7XG4gIHZhciAkX180MiA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiKSxcbiAgICAgIGZpbGwgPSAkX180Mi5maWxsLFxuICAgICAgZmluZCA9ICRfXzQyLmZpbmQsXG4gICAgICBmaW5kSW5kZXggPSAkX180Mi5maW5kSW5kZXgsXG4gICAgICBmcm9tID0gJF9fNDIuZnJvbTtcbiAgdmFyICRfXzQzID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIiksXG4gICAgICBlbnRyaWVzID0gJF9fNDMuZW50cmllcyxcbiAgICAgIGtleXMgPSAkX180My5rZXlzLFxuICAgICAgdmFsdWVzID0gJF9fNDMudmFsdWVzO1xuICB2YXIgJF9fNDQgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCIpLFxuICAgICAgYXNzaWduID0gJF9fNDQuYXNzaWduLFxuICAgICAgaXMgPSAkX180NC5pcyxcbiAgICAgIG1peGluID0gJF9fNDQubWl4aW47XG4gIHZhciAkX180NSA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjU1L3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIiksXG4gICAgICBNQVhfU0FGRV9JTlRFR0VSID0gJF9fNDUuTUFYX1NBRkVfSU5URUdFUixcbiAgICAgIE1JTl9TQUZFX0lOVEVHRVIgPSAkX180NS5NSU5fU0FGRV9JTlRFR0VSLFxuICAgICAgRVBTSUxPTiA9ICRfXzQ1LkVQU0lMT04sXG4gICAgICBpc0Zpbml0ZSA9ICRfXzQ1LmlzRmluaXRlLFxuICAgICAgaXNJbnRlZ2VyID0gJF9fNDUuaXNJbnRlZ2VyLFxuICAgICAgaXNOYU4gPSAkX180NS5pc05hTixcbiAgICAgIGlzU2FmZUludGVnZXIgPSAkX180NS5pc1NhZmVJbnRlZ2VyO1xuICB2YXIgZ2V0UHJvdG90eXBlT2YgPSAkdHJhY2V1clJ1bnRpbWUuYXNzZXJ0T2JqZWN0KE9iamVjdCkuZ2V0UHJvdG90eXBlT2Y7XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwgZGVzY3IpIHtcbiAgICBpZiAoIShuYW1lIGluIG9iamVjdCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRGdW5jdGlvbnMob2JqZWN0LCBmdW5jdGlvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBmdW5jdGlvbnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBmdW5jdGlvbnNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkQ29uc3RzKG9iamVjdCwgY29uc3RzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25zdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBuYW1lID0gY29uc3RzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gY29uc3RzW2kgKyAxXTtcbiAgICAgIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkSXRlcmF0b3Iob2JqZWN0LCBmdW5jLCBTeW1ib2wpIHtcbiAgICBpZiAoIVN5bWJvbCB8fCAhU3ltYm9sLml0ZXJhdG9yIHx8IG9iamVjdFtTeW1ib2wuaXRlcmF0b3JdKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChvYmplY3RbJ0BAaXRlcmF0b3InXSlcbiAgICAgIGZ1bmMgPSBvYmplY3RbJ0BAaXRlcmF0b3InXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICAgIHZhbHVlOiBmdW5jLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsUHJvbWlzZShnbG9iYWwpIHtcbiAgICBpZiAoIWdsb2JhbC5Qcm9taXNlKVxuICAgICAgZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsQ29sbGVjdGlvbnMoZ2xvYmFsLCBTeW1ib2wpIHtcbiAgICBpZiAoIWdsb2JhbC5NYXApXG4gICAgICBnbG9iYWwuTWFwID0gTWFwO1xuICAgIHZhciBtYXBQcm90b3R5cGUgPSBnbG9iYWwuTWFwLnByb3RvdHlwZTtcbiAgICBpZiAobWFwUHJvdG90eXBlLmVudHJpZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IobWFwUHJvdG90eXBlLCBtYXBQcm90b3R5cGUuZW50cmllcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoZ2V0UHJvdG90eXBlT2YobmV3IGdsb2JhbC5NYXAoKS5lbnRyaWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgICBpZiAoIWdsb2JhbC5TZXQpXG4gICAgICBnbG9iYWwuU2V0ID0gU2V0O1xuICAgIHZhciBzZXRQcm90b3R5cGUgPSBnbG9iYWwuU2V0LnByb3RvdHlwZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlLnZhbHVlcykge1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihzZXRQcm90b3R5cGUsIHNldFByb3RvdHlwZS52YWx1ZXMsIFN5bWJvbCk7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKGdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuU2V0KCkudmFsdWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFN0cmluZyhTdHJpbmcpIHtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhTdHJpbmcucHJvdG90eXBlLCBbJ2NvZGVQb2ludEF0JywgY29kZVBvaW50QXQsICdjb250YWlucycsIGNvbnRhaW5zLCAnZW5kc1dpdGgnLCBlbmRzV2l0aCwgJ3N0YXJ0c1dpdGgnLCBzdGFydHNXaXRoLCAncmVwZWF0JywgcmVwZWF0XSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLCBbJ2Zyb21Db2RlUG9pbnQnLCBmcm9tQ29kZVBvaW50LCAncmF3JywgcmF3XSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihTdHJpbmcucHJvdG90eXBlLCBzdHJpbmdQcm90b3R5cGVJdGVyYXRvciwgU3ltYm9sKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbEFycmF5KEFycmF5LCBTeW1ib2wpIHtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheS5wcm90b3R5cGUsIFsnZW50cmllcycsIGVudHJpZXMsICdrZXlzJywga2V5cywgJ3ZhbHVlcycsIHZhbHVlcywgJ2ZpbGwnLCBmaWxsLCAnZmluZCcsIGZpbmQsICdmaW5kSW5kZXgnLCBmaW5kSW5kZXhdKTtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheSwgWydmcm9tJywgZnJvbV0pO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoQXJyYXkucHJvdG90eXBlLCB2YWx1ZXMsIFN5bWJvbCk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihnZXRQcm90b3R5cGVPZihbXS52YWx1ZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgU3ltYm9sKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChPYmplY3QpIHtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhPYmplY3QsIFsnYXNzaWduJywgYXNzaWduLCAnaXMnLCBpcywgJ21peGluJywgbWl4aW5dKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE51bWJlcihOdW1iZXIpIHtcbiAgICBtYXliZUFkZENvbnN0cyhOdW1iZXIsIFsnTUFYX1NBRkVfSU5URUdFUicsIE1BWF9TQUZFX0lOVEVHRVIsICdNSU5fU0FGRV9JTlRFR0VSJywgTUlOX1NBRkVfSU5URUdFUiwgJ0VQU0lMT04nLCBFUFNJTE9OXSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoTnVtYmVyLCBbJ2lzRmluaXRlJywgaXNGaW5pdGUsICdpc0ludGVnZXInLCBpc0ludGVnZXIsICdpc05hTicsIGlzTmFOLCAnaXNTYWZlSW50ZWdlcicsIGlzU2FmZUludGVnZXJdKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbChnbG9iYWwpIHtcbiAgICBwb2x5ZmlsbFByb21pc2UoZ2xvYmFsKTtcbiAgICBwb2x5ZmlsbENvbGxlY3Rpb25zKGdsb2JhbCwgZ2xvYmFsLlN5bWJvbCk7XG4gICAgcG9seWZpbGxTdHJpbmcoZ2xvYmFsLlN0cmluZyk7XG4gICAgcG9seWZpbGxBcnJheShnbG9iYWwuQXJyYXksIGdsb2JhbC5TeW1ib2wpO1xuICAgIHBvbHlmaWxsT2JqZWN0KGdsb2JhbC5PYmplY3QpO1xuICAgIHBvbHlmaWxsTnVtYmVyKGdsb2JhbC5OdW1iZXIpO1xuICB9XG4gIHBvbHlmaWxsKHRoaXMpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICAgIHBvbHlmaWxsKGdsb2JhbCk7XG4gIH07XG4gIHJldHVybiB7fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbC1pbXBvcnRcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbC1pbXBvcnRcIjtcbiAgU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNTUvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiKTtcbiAgcmV0dXJuIHt9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC41NS9zcmMvcnVudGltZS9wb2x5ZmlsbC1pbXBvcnRcIiArICcnKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJyksdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudCA9IGdsb2JhbC50ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudDtcblxuICAvLyBEZXRlY3QgYW5kIGRvIGJhc2ljIHNhbml0eSBjaGVja2luZyBvbiBPYmplY3QvQXJyYXkub2JzZXJ2ZS5cbiAgZnVuY3Rpb24gZGV0ZWN0T2JqZWN0T2JzZXJ2ZSgpIHtcbiAgICBpZiAodHlwZW9mIE9iamVjdC5vYnNlcnZlICE9PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIHR5cGVvZiBBcnJheS5vYnNlcnZlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlY3MpIHtcbiAgICAgIHJlY29yZHMgPSByZWNzO1xuICAgIH1cblxuICAgIHZhciB0ZXN0ID0ge307XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIE9iamVjdC5vYnNlcnZlKHRlc3QsIGNhbGxiYWNrKTtcbiAgICBBcnJheS5vYnNlcnZlKGFyciwgY2FsbGJhY2spO1xuICAgIHRlc3QuaWQgPSAxO1xuICAgIHRlc3QuaWQgPSAyO1xuICAgIGRlbGV0ZSB0ZXN0LmlkO1xuICAgIGFyci5wdXNoKDEsIDIpO1xuICAgIGFyci5sZW5ndGggPSAwO1xuXG4gICAgT2JqZWN0LmRlbGl2ZXJDaGFuZ2VSZWNvcmRzKGNhbGxiYWNrKTtcbiAgICBpZiAocmVjb3Jkcy5sZW5ndGggIT09IDUpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAocmVjb3Jkc1swXS50eXBlICE9ICdhZGQnIHx8XG4gICAgICAgIHJlY29yZHNbMV0udHlwZSAhPSAndXBkYXRlJyB8fFxuICAgICAgICByZWNvcmRzWzJdLnR5cGUgIT0gJ2RlbGV0ZScgfHxcbiAgICAgICAgcmVjb3Jkc1szXS50eXBlICE9ICdzcGxpY2UnIHx8XG4gICAgICAgIHJlY29yZHNbNF0udHlwZSAhPSAnc3BsaWNlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIE9iamVjdC51bm9ic2VydmUodGVzdCwgY2FsbGJhY2spO1xuICAgIEFycmF5LnVub2JzZXJ2ZShhcnIsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIGhhc09ic2VydmUgPSBkZXRlY3RPYmplY3RPYnNlcnZlKCk7XG5cbiAgZnVuY3Rpb24gZGV0ZWN0RXZhbCgpIHtcbiAgICAvLyBEb24ndCB0ZXN0IGZvciBldmFsIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBDaHJvbWUgQXBwIGVudmlyb25tZW50LlxuICAgIC8vIFdlIGNoZWNrIGZvciBBUElzIHNldCB0aGF0IG9ubHkgZXhpc3QgaW4gYSBDaHJvbWUgQXBwIGNvbnRleHQuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS5hcHAgJiYgY2hyb21lLmFwcC5ydW50aW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRmlyZWZveCBPUyBBcHBzIGRvIG5vdCBhbGxvdyBldmFsLiBUaGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGlzIHZlcnkgaGFja3lcbiAgICAvLyBidXQgZXZlbiBpZiBzb21lIG90aGVyIHBsYXRmb3JtIGFkZHMgc3VwcG9ydCBmb3IgdGhpcyBmdW5jdGlvbiB0aGlzIGNvZGVcbiAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIHdvcmsuXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFyIGYgPSBuZXcgRnVuY3Rpb24oJycsICdyZXR1cm4gdHJ1ZTsnKTtcbiAgICAgIHJldHVybiBmKCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgaGFzRXZhbCA9IGRldGVjdEV2YWwoKTtcblxuICBmdW5jdGlvbiBpc0luZGV4KHMpIHtcbiAgICByZXR1cm4gK3MgPT09IHMgPj4+IDAgJiYgcyAhPT0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiB0b051bWJlcihzKSB7XG4gICAgcmV0dXJuICtzO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gIH1cblxuICB2YXIgbnVtYmVySXNOYU4gPSBnbG9iYWwuTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsLmlzTmFOKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNhbWVWYWx1ZShsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0ID09PSByaWdodClcbiAgICAgIHJldHVybiBsZWZ0ICE9PSAwIHx8IDEgLyBsZWZ0ID09PSAxIC8gcmlnaHQ7XG4gICAgaWYgKG51bWJlcklzTmFOKGxlZnQpICYmIG51bWJlcklzTmFOKHJpZ2h0KSlcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGxlZnQgIT09IGxlZnQgJiYgcmlnaHQgIT09IHJpZ2h0O1xuICB9XG5cbiAgdmFyIGNyZWF0ZU9iamVjdCA9ICgnX19wcm90b19fJyBpbiB7fSkgP1xuICAgIGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gb2JqOyB9IDpcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBwcm90byA9IG9iai5fX3Byb3RvX187XG4gICAgICBpZiAoIXByb3RvKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgdmFyIG5ld09iamVjdCA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iamVjdCwgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9O1xuXG4gIHZhciBpZGVudFN0YXJ0ID0gJ1tcXCRfYS16QS1aXSc7XG4gIHZhciBpZGVudFBhcnQgPSAnW1xcJF9hLXpBLVowLTldJztcbiAgdmFyIGlkZW50UmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBpZGVudFN0YXJ0ICsgJysnICsgaWRlbnRQYXJ0ICsgJyonICsgJyQnKTtcblxuICBmdW5jdGlvbiBnZXRQYXRoQ2hhclR5cGUoY2hhcikge1xuICAgIGlmIChjaGFyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gJ2VvZic7XG5cbiAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgIHN3aXRjaChjb2RlKSB7XG4gICAgICBjYXNlIDB4NUI6IC8vIFtcbiAgICAgIGNhc2UgMHg1RDogLy8gXVxuICAgICAgY2FzZSAweDJFOiAvLyAuXG4gICAgICBjYXNlIDB4MjI6IC8vIFwiXG4gICAgICBjYXNlIDB4Mjc6IC8vICdcbiAgICAgIGNhc2UgMHgzMDogLy8gMFxuICAgICAgICByZXR1cm4gY2hhcjtcblxuICAgICAgY2FzZSAweDVGOiAvLyBfXG4gICAgICBjYXNlIDB4MjQ6IC8vICRcbiAgICAgICAgcmV0dXJuICdpZGVudCc7XG5cbiAgICAgIGNhc2UgMHgyMDogLy8gU3BhY2VcbiAgICAgIGNhc2UgMHgwOTogLy8gVGFiXG4gICAgICBjYXNlIDB4MEE6IC8vIE5ld2xpbmVcbiAgICAgIGNhc2UgMHgwRDogLy8gUmV0dXJuXG4gICAgICBjYXNlIDB4QTA6ICAvLyBOby1icmVhayBzcGFjZVxuICAgICAgY2FzZSAweEZFRkY6ICAvLyBCeXRlIE9yZGVyIE1hcmtcbiAgICAgIGNhc2UgMHgyMDI4OiAgLy8gTGluZSBTZXBhcmF0b3JcbiAgICAgIGNhc2UgMHgyMDI5OiAgLy8gUGFyYWdyYXBoIFNlcGFyYXRvclxuICAgICAgICByZXR1cm4gJ3dzJztcbiAgICB9XG5cbiAgICAvLyBhLXosIEEtWlxuICAgIGlmICgoMHg2MSA8PSBjb2RlICYmIGNvZGUgPD0gMHg3QSkgfHwgKDB4NDEgPD0gY29kZSAmJiBjb2RlIDw9IDB4NUEpKVxuICAgICAgcmV0dXJuICdpZGVudCc7XG5cbiAgICAvLyAxLTlcbiAgICBpZiAoMHgzMSA8PSBjb2RlICYmIGNvZGUgPD0gMHgzOSlcbiAgICAgIHJldHVybiAnbnVtYmVyJztcblxuICAgIHJldHVybiAnZWxzZSc7XG4gIH1cblxuICB2YXIgcGF0aFN0YXRlTWFjaGluZSA9IHtcbiAgICAnYmVmb3JlUGF0aCc6IHtcbiAgICAgICd3cyc6IFsnYmVmb3JlUGF0aCddLFxuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG4gICAgfSxcblxuICAgICdpblBhdGgnOiB7XG4gICAgICAnd3MnOiBbJ2luUGF0aCddLFxuICAgICAgJy4nOiBbJ2JlZm9yZUlkZW50J10sXG4gICAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJ11cbiAgICB9LFxuXG4gICAgJ2JlZm9yZUlkZW50Jzoge1xuICAgICAgJ3dzJzogWydiZWZvcmVJZGVudCddLFxuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddXG4gICAgfSxcblxuICAgICdpbklkZW50Jzoge1xuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJzAnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG4gICAgICAnbnVtYmVyJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJ3dzJzogWydpblBhdGgnLCAncHVzaCddLFxuICAgICAgJy4nOiBbJ2JlZm9yZUlkZW50JywgJ3B1c2gnXSxcbiAgICAgICdbJzogWydiZWZvcmVFbGVtZW50JywgJ3B1c2gnXSxcbiAgICAgICdlb2YnOiBbJ2FmdGVyUGF0aCcsICdwdXNoJ11cbiAgICB9LFxuXG4gICAgJ2JlZm9yZUVsZW1lbnQnOiB7XG4gICAgICAnd3MnOiBbJ2JlZm9yZUVsZW1lbnQnXSxcbiAgICAgICcwJzogWydhZnRlclplcm8nLCAnYXBwZW5kJ10sXG4gICAgICAnbnVtYmVyJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuICAgICAgXCInXCI6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnLCAnJ10sXG4gICAgICAnXCInOiBbJ2luRG91YmxlUXVvdGUnLCAnYXBwZW5kJywgJyddXG4gICAgfSxcblxuICAgICdhZnRlclplcm8nOiB7XG4gICAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCcsICdwdXNoJ10sXG4gICAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuICAgIH0sXG5cbiAgICAnaW5JbmRleCc6IHtcbiAgICAgICcwJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuICAgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcbiAgICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50J10sXG4gICAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuICAgIH0sXG5cbiAgICAnaW5TaW5nbGVRdW90ZSc6IHtcbiAgICAgIFwiJ1wiOiBbJ2FmdGVyRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnZXJyb3InXSxcbiAgICAgICdlbHNlJzogWydpblNpbmdsZVF1b3RlJywgJ2FwcGVuZCddXG4gICAgfSxcblxuICAgICdpbkRvdWJsZVF1b3RlJzoge1xuICAgICAgJ1wiJzogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2Vycm9yJ10sXG4gICAgICAnZWxzZSc6IFsnaW5Eb3VibGVRdW90ZScsICdhcHBlbmQnXVxuICAgIH0sXG5cbiAgICAnYWZ0ZXJFbGVtZW50Jzoge1xuICAgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICddJzogWydpblBhdGgnLCAncHVzaCddXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBjLCBuZXdDaGFyLCBrZXksIHR5cGUsIHRyYW5zaXRpb24sIGFjdGlvbiwgdHlwZU1hcCwgbW9kZSA9ICdiZWZvcmVQYXRoJztcblxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgcHVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH0sXG5cbiAgICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBrZXkgPSBuZXdDaGFyXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBrZXkgKz0gbmV3Q2hhcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlKCkge1xuICAgICAgaWYgKGluZGV4ID49IHBhdGgubGVuZ3RoKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIHZhciBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXTtcbiAgICAgIGlmICgobW9kZSA9PSAnaW5TaW5nbGVRdW90ZScgJiYgbmV4dENoYXIgPT0gXCInXCIpIHx8XG4gICAgICAgICAgKG1vZGUgPT0gJ2luRG91YmxlUXVvdGUnICYmIG5leHRDaGFyID09ICdcIicpKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIG5ld0NoYXIgPSBuZXh0Q2hhcjtcbiAgICAgICAgYWN0aW9ucy5hcHBlbmQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKG1vZGUpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgICBjID0gcGF0aFtpbmRleF07XG5cbiAgICAgIGlmIChjID09ICdcXFxcJyAmJiBtYXliZVVuZXNjYXBlUXVvdGUobW9kZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB0eXBlID0gZ2V0UGF0aENoYXJUeXBlKGMpO1xuICAgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV07XG4gICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwWydlbHNlJ10gfHwgJ2Vycm9yJztcblxuICAgICAgaWYgKHRyYW5zaXRpb24gPT0gJ2Vycm9yJylcbiAgICAgICAgcmV0dXJuOyAvLyBwYXJzZSBlcnJvcjtcblxuICAgICAgbW9kZSA9IHRyYW5zaXRpb25bMF07XG4gICAgICBhY3Rpb24gPSBhY3Rpb25zW3RyYW5zaXRpb25bMV1dIHx8IG5vb3A7XG4gICAgICBuZXdDaGFyID0gdHJhbnNpdGlvblsyXSA9PT0gdW5kZWZpbmVkID8gYyA6IHRyYW5zaXRpb25bMl07XG4gICAgICBhY3Rpb24oKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZnRlclBhdGgnKSB7XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybjsgLy8gcGFyc2UgZXJyb3JcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSWRlbnQocykge1xuICAgIHJldHVybiBpZGVudFJlZ0V4cC50ZXN0KHMpO1xuICB9XG5cbiAgdmFyIGNvbnN0cnVjdG9ySXNQcml2YXRlID0ge307XG5cbiAgZnVuY3Rpb24gUGF0aChwYXJ0cywgcHJpdmF0ZVRva2VuKSB7XG4gICAgaWYgKHByaXZhdGVUb2tlbiAhPT0gY29uc3RydWN0b3JJc1ByaXZhdGUpXG4gICAgICB0aHJvdyBFcnJvcignVXNlIFBhdGguZ2V0IHRvIHJldHJpZXZlIHBhdGggb2JqZWN0cycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wdXNoKFN0cmluZyhwYXJ0c1tpXSkpO1xuICAgIH1cblxuICAgIGlmIChoYXNFdmFsICYmIHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdldFZhbHVlRnJvbSA9IHRoaXMuY29tcGlsZWRHZXRWYWx1ZUZyb21GbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8ocmFmYWVsdyk6IE1ha2Ugc2ltcGxlIExSVSBjYWNoZVxuICB2YXIgcGF0aENhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0UGF0aChwYXRoU3RyaW5nKSB7XG4gICAgaWYgKHBhdGhTdHJpbmcgaW5zdGFuY2VvZiBQYXRoKVxuICAgICAgcmV0dXJuIHBhdGhTdHJpbmc7XG5cbiAgICBpZiAocGF0aFN0cmluZyA9PSBudWxsIHx8IHBhdGhTdHJpbmcubGVuZ3RoID09IDApXG4gICAgICBwYXRoU3RyaW5nID0gJyc7XG5cbiAgICBpZiAodHlwZW9mIHBhdGhTdHJpbmcgIT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc0luZGV4KHBhdGhTdHJpbmcubGVuZ3RoKSkge1xuICAgICAgICAvLyBDb25zdHJ1Y3RlZCB3aXRoIGFycmF5LWxpa2UgKHByZS1wYXJzZWQpIGtleXNcbiAgICAgICAgcmV0dXJuIG5ldyBQYXRoKHBhdGhTdHJpbmcsIGNvbnN0cnVjdG9ySXNQcml2YXRlKTtcbiAgICAgIH1cblxuICAgICAgcGF0aFN0cmluZyA9IFN0cmluZyhwYXRoU3RyaW5nKTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aCA9IHBhdGhDYWNoZVtwYXRoU3RyaW5nXTtcbiAgICBpZiAocGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgdmFyIHBhcnRzID0gcGFyc2VQYXRoKHBhdGhTdHJpbmcpO1xuICAgIGlmICghcGFydHMpXG4gICAgICByZXR1cm4gaW52YWxpZFBhdGg7XG5cbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoKHBhcnRzLCBjb25zdHJ1Y3RvcklzUHJpdmF0ZSk7XG4gICAgcGF0aENhY2hlW3BhdGhTdHJpbmddID0gcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIFBhdGguZ2V0ID0gZ2V0UGF0aDtcblxuICBmdW5jdGlvbiBmb3JtYXRBY2Nlc3NvcihrZXkpIHtcbiAgICBpZiAoaXNJbmRleChrZXkpKSB7XG4gICAgICByZXR1cm4gJ1snICsga2V5ICsgJ10nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1tcIicgKyBrZXkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXSc7XG4gICAgfVxuICB9XG5cbiAgUGF0aC5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogW10sXG4gICAgdmFsaWQ6IHRydWUsXG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGF0aFN0cmluZyA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzW2ldO1xuICAgICAgICBpZiAoaXNJZGVudChrZXkpKSB7XG4gICAgICAgICAgcGF0aFN0cmluZyArPSBpID8gJy4nICsga2V5IDoga2V5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGhTdHJpbmcgKz0gZm9ybWF0QWNjZXNzb3Ioa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0aFN0cmluZztcbiAgICB9LFxuXG4gICAgZ2V0VmFsdWVGcm9tOiBmdW5jdGlvbihvYmosIGRpcmVjdE9ic2VydmVyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb2JqID0gb2JqW3RoaXNbaV1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuXG4gICAgaXRlcmF0ZU9iamVjdHM6IGZ1bmN0aW9uKG9iaiwgb2JzZXJ2ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpKVxuICAgICAgICAgIG9iaiA9IG9ialt0aGlzW2kgLSAxXV07XG4gICAgICAgIGlmICghaXNPYmplY3Qob2JqKSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIG9ic2VydmUob2JqLCB0aGlzWzBdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcGlsZWRHZXRWYWx1ZUZyb21GbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RyID0gJyc7XG4gICAgICB2YXIgcGF0aFN0cmluZyA9ICdvYmonO1xuICAgICAgc3RyICs9ICdpZiAob2JqICE9IG51bGwnO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGtleTtcbiAgICAgIGZvciAoOyBpIDwgKHRoaXMubGVuZ3RoIC0gMSk7IGkrKykge1xuICAgICAgICBrZXkgPSB0aGlzW2ldO1xuICAgICAgICBwYXRoU3RyaW5nICs9IGlzSWRlbnQoa2V5KSA/ICcuJyArIGtleSA6IGZvcm1hdEFjY2Vzc29yKGtleSk7XG4gICAgICAgIHN0ciArPSAnICYmXFxuICAgICAnICsgcGF0aFN0cmluZyArICcgIT0gbnVsbCc7XG4gICAgICB9XG4gICAgICBzdHIgKz0gJylcXG4nO1xuXG4gICAgICB2YXIga2V5ID0gdGhpc1tpXTtcbiAgICAgIHBhdGhTdHJpbmcgKz0gaXNJZGVudChrZXkpID8gJy4nICsga2V5IDogZm9ybWF0QWNjZXNzb3Ioa2V5KTtcblxuICAgICAgc3RyICs9ICcgIHJldHVybiAnICsgcGF0aFN0cmluZyArICc7XFxuZWxzZVxcbiAgcmV0dXJuIHVuZGVmaW5lZDsnO1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbignb2JqJywgc3RyKTtcbiAgICB9LFxuXG4gICAgc2V0VmFsdWVGcm9tOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKCFpc09iamVjdChvYmopKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgb2JqID0gb2JqW3RoaXNbaV1dO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT2JqZWN0KG9iaikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgb2JqW3RoaXNbaV1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBpbnZhbGlkUGF0aCA9IG5ldyBQYXRoKCcnLCBjb25zdHJ1Y3RvcklzUHJpdmF0ZSk7XG4gIGludmFsaWRQYXRoLnZhbGlkID0gZmFsc2U7XG4gIGludmFsaWRQYXRoLmdldFZhbHVlRnJvbSA9IGludmFsaWRQYXRoLnNldFZhbHVlRnJvbSA9IGZ1bmN0aW9uKCkge307XG5cbiAgdmFyIE1BWF9ESVJUWV9DSEVDS19DWUNMRVMgPSAxMDAwO1xuXG4gIGZ1bmN0aW9uIGRpcnR5Q2hlY2sob2JzZXJ2ZXIpIHtcbiAgICB2YXIgY3ljbGVzID0gMDtcbiAgICB3aGlsZSAoY3ljbGVzIDwgTUFYX0RJUlRZX0NIRUNLX0NZQ0xFUyAmJiBvYnNlcnZlci5jaGVja18oKSkge1xuICAgICAgY3ljbGVzKys7XG4gICAgfVxuICAgIGlmICh0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudClcbiAgICAgIGdsb2JhbC5kaXJ0eUNoZWNrQ3ljbGVDb3VudCA9IGN5Y2xlcztcblxuICAgIHJldHVybiBjeWNsZXMgPiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0SXNFbXB0eShvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZJc0VtcHR5KGRpZmYpIHtcbiAgICByZXR1cm4gb2JqZWN0SXNFbXB0eShkaWZmLmFkZGVkKSAmJlxuICAgICAgICAgICBvYmplY3RJc0VtcHR5KGRpZmYucmVtb3ZlZCkgJiZcbiAgICAgICAgICAgb2JqZWN0SXNFbXB0eShkaWZmLmNoYW5nZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZk9iamVjdEZyb21PbGRPYmplY3Qob2JqZWN0LCBvbGRPYmplY3QpIHtcbiAgICB2YXIgYWRkZWQgPSB7fTtcbiAgICB2YXIgcmVtb3ZlZCA9IHt9O1xuICAgIHZhciBjaGFuZ2VkID0ge307XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIG9sZE9iamVjdCkge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gb2JqZWN0W3Byb3BdO1xuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSA9PT0gb2xkT2JqZWN0W3Byb3BdKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKCEocHJvcCBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJlbW92ZWRbcHJvcF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZE9iamVjdFtwcm9wXSlcbiAgICAgICAgY2hhbmdlZFtwcm9wXSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAocHJvcCBpbiBvbGRPYmplY3QpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhZGRlZFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5sZW5ndGggIT09IG9sZE9iamVjdC5sZW5ndGgpXG4gICAgICBjaGFuZ2VkLmxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGNoYW5nZWQ6IGNoYW5nZWRcbiAgICB9O1xuICB9XG5cbiAgdmFyIGVvbVRhc2tzID0gW107XG4gIGZ1bmN0aW9uIHJ1bkVPTVRhc2tzKCkge1xuICAgIGlmICghZW9tVGFza3MubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlb21UYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgZW9tVGFza3NbaV0oKTtcbiAgICB9XG4gICAgZW9tVGFza3MubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBydW5FT00gPSBoYXNPYnNlcnZlID8gKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVvbU9iaiA9IHsgcGluZ1Bvbmc6IHRydWUgfTtcbiAgICB2YXIgZW9tUnVuU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICBPYmplY3Qub2JzZXJ2ZShlb21PYmosIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuRU9NVGFza3MoKTtcbiAgICAgIGVvbVJ1blNjaGVkdWxlZCA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7XG4gICAgICBlb21UYXNrcy5wdXNoKGZuKTtcbiAgICAgIGlmICghZW9tUnVuU2NoZWR1bGVkKSB7XG4gICAgICAgIGVvbVJ1blNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIGVvbU9iai5waW5nUG9uZyA9ICFlb21PYmoucGluZ1Bvbmc7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG4gIChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZm4pIHtcbiAgICAgIGVvbVRhc2tzLnB1c2goZm4pO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIG9ic2VydmVkT2JqZWN0Q2FjaGUgPSBbXTtcblxuICBmdW5jdGlvbiBuZXdPYnNlcnZlZE9iamVjdCgpIHtcbiAgICB2YXIgb2JzZXJ2ZXI7XG4gICAgdmFyIG9iamVjdDtcbiAgICB2YXIgZGlzY2FyZFJlY29yZHMgPSBmYWxzZTtcbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVjb3Jkcykge1xuICAgICAgaWYgKG9ic2VydmVyICYmIG9ic2VydmVyLnN0YXRlXyA9PT0gT1BFTkVEICYmICFkaXNjYXJkUmVjb3JkcylcbiAgICAgICAgb2JzZXJ2ZXIuY2hlY2tfKHJlY29yZHMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbihvYnMpIHtcbiAgICAgICAgaWYgKG9ic2VydmVyKVxuICAgICAgICAgIHRocm93IEVycm9yKCdPYnNlcnZlZE9iamVjdCBpbiB1c2UnKTtcblxuICAgICAgICBpZiAoIWZpcnN0KVxuICAgICAgICAgIE9iamVjdC5kZWxpdmVyQ2hhbmdlUmVjb3JkcyhjYWxsYmFjayk7XG5cbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnM7XG4gICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgb2JzZXJ2ZTogZnVuY3Rpb24ob2JqLCBhcnJheU9ic2VydmUpIHtcbiAgICAgICAgb2JqZWN0ID0gb2JqO1xuICAgICAgICBpZiAoYXJyYXlPYnNlcnZlKVxuICAgICAgICAgIEFycmF5Lm9ic2VydmUob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBPYmplY3Qub2JzZXJ2ZShvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBkZWxpdmVyOiBmdW5jdGlvbihkaXNjYXJkKSB7XG4gICAgICAgIGRpc2NhcmRSZWNvcmRzID0gZGlzY2FyZDtcbiAgICAgICAgT2JqZWN0LmRlbGl2ZXJDaGFuZ2VSZWNvcmRzKGNhbGxiYWNrKTtcbiAgICAgICAgZGlzY2FyZFJlY29yZHMgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIG9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICBPYmplY3QudW5vYnNlcnZlKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgICBvYnNlcnZlZE9iamVjdENhY2hlLnB1c2godGhpcyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIFRoZSBvYnNlcnZlZFNldCBhYnN0cmFjdGlvbiBpcyBhIHBlcmYgb3B0aW1pemF0aW9uIHdoaWNoIHJlZHVjZXMgdGhlIHRvdGFsXG4gICAqIG51bWJlciBvZiBPYmplY3Qub2JzZXJ2ZSBvYnNlcnZhdGlvbnMgb2YgYSBzZXQgb2Ygb2JqZWN0cy4gVGhlIGlkZWEgaXMgdGhhdFxuICAgKiBncm91cHMgb2YgT2JzZXJ2ZXJzIHdpbGwgaGF2ZSBzb21lIG9iamVjdCBkZXBlbmRlbmNpZXMgaW4gY29tbW9uIGFuZCB0aGlzXG4gICAqIG9ic2VydmVkIHNldCBlbnN1cmVzIHRoYXQgZWFjaCBvYmplY3QgaW4gdGhlIHRyYW5zaXRpdmUgY2xvc3VyZSBvZlxuICAgKiBkZXBlbmRlbmNpZXMgaXMgb25seSBvYnNlcnZlZCBvbmNlLiBUaGUgb2JzZXJ2ZWRTZXQgYWN0cyBhcyBhIHdyaXRlIGJhcnJpZXJcbiAgICogc3VjaCB0aGF0IHdoZW5ldmVyIGFueSBjaGFuZ2UgY29tZXMgdGhyb3VnaCwgYWxsIE9ic2VydmVycyBhcmUgY2hlY2tlZCBmb3JcbiAgICogY2hhbmdlZCB2YWx1ZXMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIG9wdGltaXphdGlvbiBpcyBleHBsaWNpdGx5IG1vdmluZyB3b3JrIGZyb20gc2V0dXAtdGltZSB0b1xuICAgKiBjaGFuZ2UtdGltZS5cbiAgICpcbiAgICogVE9ETyhyYWZhZWx3KTogSW1wbGVtZW50IFwiZ2FyYmFnZSBjb2xsZWN0aW9uXCIuIEluIG9yZGVyIHRvIG1vdmUgd29yayBvZmZcbiAgICogdGhlIGNyaXRpY2FsIHBhdGgsIHdoZW4gT2JzZXJ2ZXJzIGFyZSBjbG9zZWQsIHRoZWlyIG9ic2VydmVkIG9iamVjdHMgYXJlXG4gICAqIG5vdCBPYmplY3QudW5vYnNlcnZlKGQpLiBBcyBhIHJlc3VsdCwgaXQncyBwb3NzaWJsZSB0aGF0IGlmIHRoZSBvYnNlcnZlZFNldFxuICAgKiBpcyBrZXB0IG9wZW4sIGJ1dCBzb21lIE9ic2VydmVycyBoYXZlIGJlZW4gY2xvc2VkLCBpdCBjb3VsZCBjYXVzZSBcImxlYWtzXCJcbiAgICogKHByZXZlbnQgb3RoZXJ3aXNlIGNvbGxlY3RhYmxlIG9iamVjdHMgZnJvbSBiZWluZyBjb2xsZWN0ZWQpLiBBdCBzb21lXG4gICAqIHBvaW50LCB3ZSBzaG91bGQgaW1wbGVtZW50IGluY3JlbWVudGFsIFwiZ2NcIiB3aGljaCBrZWVwcyBhIGxpc3Qgb2ZcbiAgICogb2JzZXJ2ZWRTZXRzIHdoaWNoIG1heSBuZWVkIGNsZWFuLXVwIGFuZCBkb2VzIHNtYWxsIGFtb3VudHMgb2YgY2xlYW51cCBvbiBhXG4gICAqIHRpbWVvdXQgdW50aWwgYWxsIGlzIGNsZWFuLlxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRPYnNlcnZlZE9iamVjdChvYnNlcnZlciwgb2JqZWN0LCBhcnJheU9ic2VydmUpIHtcbiAgICB2YXIgZGlyID0gb2JzZXJ2ZWRPYmplY3RDYWNoZS5wb3AoKSB8fCBuZXdPYnNlcnZlZE9iamVjdCgpO1xuICAgIGRpci5vcGVuKG9ic2VydmVyKTtcbiAgICBkaXIub2JzZXJ2ZShvYmplY3QsIGFycmF5T2JzZXJ2ZSk7XG4gICAgcmV0dXJuIGRpcjtcbiAgfVxuXG4gIHZhciBvYnNlcnZlZFNldENhY2hlID0gW107XG5cbiAgZnVuY3Rpb24gbmV3T2JzZXJ2ZWRTZXQoKSB7XG4gICAgdmFyIG9ic2VydmVyQ291bnQgPSAwO1xuICAgIHZhciBvYnNlcnZlcnMgPSBbXTtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIHZhciByb290T2JqO1xuICAgIHZhciByb290T2JqUHJvcHM7XG5cbiAgICBmdW5jdGlvbiBvYnNlcnZlKG9iaiwgcHJvcCkge1xuICAgICAgaWYgKCFvYmopXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaWYgKG9iaiA9PT0gcm9vdE9iailcbiAgICAgICAgcm9vdE9ialByb3BzW3Byb3BdID0gdHJ1ZTtcblxuICAgICAgaWYgKG9iamVjdHMuaW5kZXhPZihvYmopIDwgMCkge1xuICAgICAgICBvYmplY3RzLnB1c2gob2JqKTtcbiAgICAgICAgT2JqZWN0Lm9ic2VydmUob2JqLCBjYWxsYmFjayk7XG4gICAgICB9XG5cbiAgICAgIG9ic2VydmUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiksIHByb3ApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbFJvb3RPYmpOb25PYnNlcnZlZFByb3BzKHJlY3MpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVjID0gcmVjc1tpXTtcbiAgICAgICAgaWYgKHJlYy5vYmplY3QgIT09IHJvb3RPYmogfHxcbiAgICAgICAgICAgIHJvb3RPYmpQcm9wc1tyZWMubmFtZV0gfHxcbiAgICAgICAgICAgIHJlYy50eXBlID09PSAnc2V0UHJvdG90eXBlJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVjcykge1xuICAgICAgaWYgKGFsbFJvb3RPYmpOb25PYnNlcnZlZFByb3BzKHJlY3MpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIHZhciBvYnNlcnZlcjtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xuICAgICAgICBpZiAob2JzZXJ2ZXIuc3RhdGVfID09IE9QRU5FRCkge1xuICAgICAgICAgIG9ic2VydmVyLml0ZXJhdGVPYmplY3RzXyhvYnNlcnZlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcbiAgICAgICAgaWYgKG9ic2VydmVyLnN0YXRlXyA9PSBPUEVORUQpIHtcbiAgICAgICAgICBvYnNlcnZlci5jaGVja18oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBvYmplY3Q6IHVuZGVmaW5lZCxcbiAgICAgIG9iamVjdHM6IG9iamVjdHMsXG4gICAgICBvcGVuOiBmdW5jdGlvbihvYnMsIG9iamVjdCkge1xuICAgICAgICBpZiAoIXJvb3RPYmopIHtcbiAgICAgICAgICByb290T2JqID0gb2JqZWN0O1xuICAgICAgICAgIHJvb3RPYmpQcm9wcyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzKTtcbiAgICAgICAgb2JzZXJ2ZXJDb3VudCsrO1xuICAgICAgICBvYnMuaXRlcmF0ZU9iamVjdHNfKG9ic2VydmUpO1xuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbihvYnMpIHtcbiAgICAgICAgb2JzZXJ2ZXJDb3VudC0tO1xuICAgICAgICBpZiAob2JzZXJ2ZXJDb3VudCA+IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBPYmplY3QudW5vYnNlcnZlKG9iamVjdHNbaV0sIGNhbGxiYWNrKTtcbiAgICAgICAgICBPYnNlcnZlci51bm9ic2VydmVkQ291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgICAgICBvYmplY3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIHJvb3RPYmogPSB1bmRlZmluZWQ7XG4gICAgICAgIHJvb3RPYmpQcm9wcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgb2JzZXJ2ZWRTZXRDYWNoZS5wdXNoKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgdmFyIGxhc3RPYnNlcnZlZFNldDtcblxuICBmdW5jdGlvbiBnZXRPYnNlcnZlZFNldChvYnNlcnZlciwgb2JqKSB7XG4gICAgaWYgKCFsYXN0T2JzZXJ2ZWRTZXQgfHwgbGFzdE9ic2VydmVkU2V0Lm9iamVjdCAhPT0gb2JqKSB7XG4gICAgICBsYXN0T2JzZXJ2ZWRTZXQgPSBvYnNlcnZlZFNldENhY2hlLnBvcCgpIHx8IG5ld09ic2VydmVkU2V0KCk7XG4gICAgICBsYXN0T2JzZXJ2ZWRTZXQub2JqZWN0ID0gb2JqO1xuICAgIH1cbiAgICBsYXN0T2JzZXJ2ZWRTZXQub3BlbihvYnNlcnZlciwgb2JqKTtcbiAgICByZXR1cm4gbGFzdE9ic2VydmVkU2V0O1xuICB9XG5cbiAgdmFyIFVOT1BFTkVEID0gMDtcbiAgdmFyIE9QRU5FRCA9IDE7XG4gIHZhciBDTE9TRUQgPSAyO1xuICB2YXIgUkVTRVRUSU5HID0gMztcblxuICB2YXIgbmV4dE9ic2VydmVySWQgPSAxO1xuXG4gIGZ1bmN0aW9uIE9ic2VydmVyKCkge1xuICAgIHRoaXMuc3RhdGVfID0gVU5PUEVORUQ7XG4gICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkOyAvLyBUT0RPKHJhZmFlbHcpOiBTaG91bGQgYmUgV2Vha1JlZlxuICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaWRfID0gbmV4dE9ic2VydmVySWQrKztcbiAgfVxuXG4gIE9ic2VydmVyLnByb3RvdHlwZSA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gVU5PUEVORUQpXG4gICAgICAgIHRocm93IEVycm9yKCdPYnNlcnZlciBoYXMgYWxyZWFkeSBiZWVuIG9wZW5lZC4nKTtcblxuICAgICAgYWRkVG9BbGwodGhpcyk7XG4gICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy50YXJnZXRfID0gdGFyZ2V0O1xuICAgICAgdGhpcy5jb25uZWN0XygpO1xuICAgICAgdGhpcy5zdGF0ZV8gPSBPUEVORUQ7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgcmVtb3ZlRnJvbUFsbCh0aGlzKTtcbiAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRhcmdldF8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnN0YXRlXyA9IENMT1NFRDtcbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGRpcnR5Q2hlY2sodGhpcyk7XG4gICAgfSxcblxuICAgIHJlcG9ydF86IGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmFwcGx5KHRoaXMudGFyZ2V0XywgY2hhbmdlcyk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBPYnNlcnZlci5fZXJyb3JUaHJvd25EdXJpbmdDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V4Y2VwdGlvbiBjYXVnaHQgZHVyaW5nIG9ic2VydmVyIGNhbGxiYWNrOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgKGV4LnN0YWNrIHx8IGV4KSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRpc2NhcmRDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2hlY2tfKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbGxlY3RPYnNlcnZlcnMgPSAhaGFzT2JzZXJ2ZTtcbiAgdmFyIGFsbE9ic2VydmVycztcbiAgT2JzZXJ2ZXIuX2FsbE9ic2VydmVyc0NvdW50ID0gMDtcblxuICBpZiAoY29sbGVjdE9ic2VydmVycykge1xuICAgIGFsbE9ic2VydmVycyA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9BbGwob2JzZXJ2ZXIpIHtcbiAgICBPYnNlcnZlci5fYWxsT2JzZXJ2ZXJzQ291bnQrKztcbiAgICBpZiAoIWNvbGxlY3RPYnNlcnZlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBhbGxPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVGcm9tQWxsKG9ic2VydmVyKSB7XG4gICAgT2JzZXJ2ZXIuX2FsbE9ic2VydmVyc0NvdW50LS07XG4gIH1cblxuICB2YXIgcnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQgPSBmYWxzZTtcblxuICBnbG9iYWwuUGxhdGZvcm0gPSBnbG9iYWwuUGxhdGZvcm0gfHwge307XG5cbiAgZ2xvYmFsLlBsYXRmb3JtLnBlcmZvcm1NaWNyb3Rhc2tDaGVja3BvaW50ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50KVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKCFjb2xsZWN0T2JzZXJ2ZXJzKVxuICAgICAgcmV0dXJuO1xuXG4gICAgcnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQgPSB0cnVlO1xuXG4gICAgdmFyIGN5Y2xlcyA9IDA7XG4gICAgdmFyIGFueUNoYW5nZWQsIHRvQ2hlY2s7XG5cbiAgICBkbyB7XG4gICAgICBjeWNsZXMrKztcbiAgICAgIHRvQ2hlY2sgPSBhbGxPYnNlcnZlcnM7XG4gICAgICBhbGxPYnNlcnZlcnMgPSBbXTtcbiAgICAgIGFueUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b0NoZWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IHRvQ2hlY2tbaV07XG4gICAgICAgIGlmIChvYnNlcnZlci5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChvYnNlcnZlci5jaGVja18oKSlcbiAgICAgICAgICBhbnlDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICBhbGxPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICB9XG4gICAgICBpZiAocnVuRU9NVGFza3MoKSlcbiAgICAgICAgYW55Q2hhbmdlZCA9IHRydWU7XG4gICAgfSB3aGlsZSAoY3ljbGVzIDwgTUFYX0RJUlRZX0NIRUNLX0NZQ0xFUyAmJiBhbnlDaGFuZ2VkKTtcblxuICAgIGlmICh0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudClcbiAgICAgIGdsb2JhbC5kaXJ0eUNoZWNrQ3ljbGVDb3VudCA9IGN5Y2xlcztcblxuICAgIHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50ID0gZmFsc2U7XG4gIH07XG5cbiAgaWYgKGNvbGxlY3RPYnNlcnZlcnMpIHtcbiAgICBnbG9iYWwuUGxhdGZvcm0uY2xlYXJPYnNlcnZlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGFsbE9ic2VydmVycyA9IFtdO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBPYmplY3RPYnNlcnZlcihvYmplY3QpIHtcbiAgICBPYnNlcnZlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMudmFsdWVfID0gb2JqZWN0O1xuICAgIHRoaXMub2xkT2JqZWN0XyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIE9iamVjdE9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG4gICAgX19wcm90b19fOiBPYnNlcnZlci5wcm90b3R5cGUsXG5cbiAgICBhcnJheU9ic2VydmU6IGZhbHNlLFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gZ2V0T2JzZXJ2ZWRPYmplY3QodGhpcywgdGhpcy52YWx1ZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU9ic2VydmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb3B5T2JqZWN0OiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHZhciBjb3B5ID0gQXJyYXkuaXNBcnJheShvYmplY3QpID8gW10gOiB7fTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgIGNvcHlbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgICB9O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgICAgY29weS5sZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcywgc2tpcENoYW5nZXMpIHtcbiAgICAgIHZhciBkaWZmO1xuICAgICAgdmFyIG9sZFZhbHVlcztcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIGlmICghY2hhbmdlUmVjb3JkcylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgb2xkVmFsdWVzID0ge307XG4gICAgICAgIGRpZmYgPSBkaWZmT2JqZWN0RnJvbUNoYW5nZVJlY29yZHModGhpcy52YWx1ZV8sIGNoYW5nZVJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9sZFZhbHVlcyA9IHRoaXMub2xkT2JqZWN0XztcbiAgICAgICAgZGlmZiA9IGRpZmZPYmplY3RGcm9tT2xkT2JqZWN0KHRoaXMudmFsdWVfLCB0aGlzLm9sZE9iamVjdF8pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlmZklzRW1wdHkoZGlmZikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKCFoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuXG4gICAgICB0aGlzLnJlcG9ydF8oW1xuICAgICAgICBkaWZmLmFkZGVkIHx8IHt9LFxuICAgICAgICBkaWZmLnJlbW92ZWQgfHwge30sXG4gICAgICAgIGRpZmYuY2hhbmdlZCB8fCB7fSxcbiAgICAgICAgZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gb2xkVmFsdWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgXSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGlmIChoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5kZWxpdmVyKGZhbHNlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGlydHlDaGVjayh0aGlzKTtcbiAgICB9LFxuXG4gICAgZGlzY2FyZENoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0T2JzZXJ2ZXJfKVxuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5kZWxpdmVyKHRydWUpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBBcnJheU9ic2VydmVyKGFycmF5KSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgIHRocm93IEVycm9yKCdQcm92aWRlZCBvYmplY3QgaXMgbm90IGFuIEFycmF5Jyk7XG4gICAgT2JqZWN0T2JzZXJ2ZXIuY2FsbCh0aGlzLCBhcnJheSk7XG4gIH1cblxuICBBcnJheU9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG5cbiAgICBfX3Byb3RvX186IE9iamVjdE9ic2VydmVyLnByb3RvdHlwZSxcblxuICAgIGFycmF5T2JzZXJ2ZTogdHJ1ZSxcblxuICAgIGNvcHlPYmplY3Q6IGZ1bmN0aW9uKGFycikge1xuICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMpIHtcbiAgICAgIHZhciBzcGxpY2VzO1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2VSZWNvcmRzKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgc3BsaWNlcyA9IHByb2plY3RBcnJheVNwbGljZXModGhpcy52YWx1ZV8sIGNoYW5nZVJlY29yZHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaWNlcyA9IGNhbGNTcGxpY2VzKHRoaXMudmFsdWVfLCAwLCB0aGlzLnZhbHVlXy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9sZE9iamVjdF8sIDAsIHRoaXMub2xkT2JqZWN0Xy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNwbGljZXMgfHwgIXNwbGljZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmICghaGFzT2JzZXJ2ZSlcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcblxuICAgICAgdGhpcy5yZXBvcnRfKFtzcGxpY2VzXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIEFycmF5T2JzZXJ2ZXIuYXBwbHlTcGxpY2VzID0gZnVuY3Rpb24ocHJldmlvdXMsIGN1cnJlbnQsIHNwbGljZXMpIHtcbiAgICBzcGxpY2VzLmZvckVhY2goZnVuY3Rpb24oc3BsaWNlKSB7XG4gICAgICB2YXIgc3BsaWNlQXJncyA9IFtzcGxpY2UuaW5kZXgsIHNwbGljZS5yZW1vdmVkLmxlbmd0aF07XG4gICAgICB2YXIgYWRkSW5kZXggPSBzcGxpY2UuaW5kZXg7XG4gICAgICB3aGlsZSAoYWRkSW5kZXggPCBzcGxpY2UuaW5kZXggKyBzcGxpY2UuYWRkZWRDb3VudCkge1xuICAgICAgICBzcGxpY2VBcmdzLnB1c2goY3VycmVudFthZGRJbmRleF0pO1xuICAgICAgICBhZGRJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHByZXZpb3VzLCBzcGxpY2VBcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBQYXRoT2JzZXJ2ZXIob2JqZWN0LCBwYXRoKSB7XG4gICAgT2JzZXJ2ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMub2JqZWN0XyA9IG9iamVjdDtcbiAgICB0aGlzLnBhdGhfID0gZ2V0UGF0aChwYXRoKTtcbiAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIFBhdGhPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogT2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgZ2V0IHBhdGgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoXztcbiAgICB9LFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpXG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gZ2V0T2JzZXJ2ZWRTZXQodGhpcywgdGhpcy5vYmplY3RfKTtcblxuICAgICAgdGhpcy5jaGVja18odW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0aGlzLmRpcmVjdE9ic2VydmVyXykge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5jbG9zZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGl0ZXJhdGVPYmplY3RzXzogZnVuY3Rpb24ob2JzZXJ2ZSkge1xuICAgICAgdGhpcy5wYXRoXy5pdGVyYXRlT2JqZWN0cyh0aGlzLm9iamVjdF8sIG9ic2VydmUpO1xuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMsIHNraXBDaGFuZ2VzKSB7XG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICAgIHRoaXMudmFsdWVfID0gdGhpcy5wYXRoXy5nZXRWYWx1ZUZyb20odGhpcy5vYmplY3RfKTtcbiAgICAgIGlmIChza2lwQ2hhbmdlcyB8fCBhcmVTYW1lVmFsdWUodGhpcy52YWx1ZV8sIG9sZFZhbHVlKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0aGlzLnJlcG9ydF8oW3RoaXMudmFsdWVfLCBvbGRWYWx1ZSwgdGhpc10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHNldFZhbHVlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMucGF0aF8pXG4gICAgICAgIHRoaXMucGF0aF8uc2V0VmFsdWVGcm9tKHRoaXMub2JqZWN0XywgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gQ29tcG91bmRPYnNlcnZlcihyZXBvcnRDaGFuZ2VzT25PcGVuKSB7XG4gICAgT2JzZXJ2ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8gPSByZXBvcnRDaGFuZ2VzT25PcGVuO1xuICAgIHRoaXMudmFsdWVfID0gW107XG4gICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vYnNlcnZlZF8gPSBbXTtcbiAgfVxuXG4gIHZhciBvYnNlcnZlclNlbnRpbmVsID0ge307XG5cbiAgQ29tcG91bmRPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogT2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgdmFyIG5lZWRzRGlyZWN0T2JzZXJ2ZXIgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgIG9iamVjdCA9IHRoaXMub2JzZXJ2ZWRfW2ldXG4gICAgICAgICAgaWYgKG9iamVjdCAhPT0gb2JzZXJ2ZXJTZW50aW5lbCkge1xuICAgICAgICAgICAgbmVlZHNEaXJlY3RPYnNlcnZlciA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmVlZHNEaXJlY3RPYnNlcnZlcilcbiAgICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IGdldE9ic2VydmVkU2V0KHRoaXMsIG9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tfKHVuZGVmaW5lZCwgIXRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8pO1xuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVkX1tpXSA9PT0gb2JzZXJ2ZXJTZW50aW5lbClcbiAgICAgICAgICB0aGlzLm9ic2VydmVkX1tpICsgMV0uY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub2JzZXJ2ZWRfLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnZhbHVlXy5sZW5ndGggPSAwO1xuXG4gICAgICBpZiAodGhpcy5kaXJlY3RPYnNlcnZlcl8pIHtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uY2xvc2UodGhpcyk7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRQYXRoOiBmdW5jdGlvbihvYmplY3QsIHBhdGgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBVTk9QRU5FRCAmJiB0aGlzLnN0YXRlXyAhPSBSRVNFVFRJTkcpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgYWRkIHBhdGhzIG9uY2Ugc3RhcnRlZC4nKTtcblxuICAgICAgdmFyIHBhdGggPSBnZXRQYXRoKHBhdGgpO1xuICAgICAgdGhpcy5vYnNlcnZlZF8ucHVzaChvYmplY3QsIHBhdGgpO1xuICAgICAgaWYgKCF0aGlzLnJlcG9ydENoYW5nZXNPbk9wZW5fKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLm9ic2VydmVkXy5sZW5ndGggLyAyIC0gMTtcbiAgICAgIHRoaXMudmFsdWVfW2luZGV4XSA9IHBhdGguZ2V0VmFsdWVGcm9tKG9iamVjdCk7XG4gICAgfSxcblxuICAgIGFkZE9ic2VydmVyOiBmdW5jdGlvbihvYnNlcnZlcikge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IFVOT1BFTkVEICYmIHRoaXMuc3RhdGVfICE9IFJFU0VUVElORylcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBhZGQgb2JzZXJ2ZXJzIG9uY2Ugc3RhcnRlZC4nKTtcblxuICAgICAgdGhpcy5vYnNlcnZlZF8ucHVzaChvYnNlcnZlclNlbnRpbmVsLCBvYnNlcnZlcik7XG4gICAgICBpZiAoIXRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8pXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciBpbmRleCA9IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgdGhpcy52YWx1ZV9baW5kZXhdID0gb2JzZXJ2ZXIub3Blbih0aGlzLmRlbGl2ZXIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBzdGFydFJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gb25seSByZXNldCB3aGlsZSBvcGVuJyk7XG5cbiAgICAgIHRoaXMuc3RhdGVfID0gUkVTRVRUSU5HO1xuICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xuICAgIH0sXG5cbiAgICBmaW5pc2hSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gUkVTRVRUSU5HKVxuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG9ubHkgZmluaXNoUmVzZXQgYWZ0ZXIgc3RhcnRSZXNldCcpO1xuICAgICAgdGhpcy5zdGF0ZV8gPSBPUEVORUQ7XG4gICAgICB0aGlzLmNvbm5lY3RfKCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgaXRlcmF0ZU9iamVjdHNfOiBmdW5jdGlvbihvYnNlcnZlKSB7XG4gICAgICB2YXIgb2JqZWN0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBvYmplY3QgPSB0aGlzLm9ic2VydmVkX1tpXVxuICAgICAgICBpZiAob2JqZWN0ICE9PSBvYnNlcnZlclNlbnRpbmVsKVxuICAgICAgICAgIHRoaXMub2JzZXJ2ZWRfW2kgKyAxXS5pdGVyYXRlT2JqZWN0cyhvYmplY3QsIG9ic2VydmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcywgc2tpcENoYW5nZXMpIHtcbiAgICAgIHZhciBvbGRWYWx1ZXM7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0aGlzLm9ic2VydmVkX1tpXTtcbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLm9ic2VydmVkX1tpKzFdO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIGlmIChvYmplY3QgPT09IG9ic2VydmVyU2VudGluZWwpIHtcbiAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IHBhdGg7XG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlXyA9PT0gVU5PUEVORUQgP1xuICAgICAgICAgICAgICBvYnNlcnZhYmxlLm9wZW4odGhpcy5kZWxpdmVyLCB0aGlzKSA6XG4gICAgICAgICAgICAgIG9ic2VydmFibGUuZGlzY2FyZENoYW5nZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IHBhdGguZ2V0VmFsdWVGcm9tKG9iamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2tpcENoYW5nZXMpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlX1tpIC8gMl0gPSB2YWx1ZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmVTYW1lVmFsdWUodmFsdWUsIHRoaXMudmFsdWVfW2kgLyAyXSkpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgb2xkVmFsdWVzID0gb2xkVmFsdWVzIHx8IFtdO1xuICAgICAgICBvbGRWYWx1ZXNbaSAvIDJdID0gdGhpcy52YWx1ZV9baSAvIDJdO1xuICAgICAgICB0aGlzLnZhbHVlX1tpIC8gMl0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvbGRWYWx1ZXMpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gVE9ETyhyYWZhZWx3KTogSGF2aW5nIG9ic2VydmVkXyBhcyB0aGUgdGhpcmQgY2FsbGJhY2sgYXJnIGhlcmUgaXNcbiAgICAgIC8vIHByZXR0eSBsYW1lIEFQSS4gRml4LlxuICAgICAgdGhpcy5yZXBvcnRfKFt0aGlzLnZhbHVlXywgb2xkVmFsdWVzLCB0aGlzLm9ic2VydmVkX10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBpZGVudEZuKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gIGZ1bmN0aW9uIE9ic2VydmVyVHJhbnNmb3JtKG9ic2VydmFibGUsIGdldFZhbHVlRm4sIHNldFZhbHVlRm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbnRQYXNzVGhyb3VnaFNldCkge1xuICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGFyZ2V0XyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9ic2VydmFibGVfID0gb2JzZXJ2YWJsZTtcbiAgICB0aGlzLmdldFZhbHVlRm5fID0gZ2V0VmFsdWVGbiB8fCBpZGVudEZuO1xuICAgIHRoaXMuc2V0VmFsdWVGbl8gPSBzZXRWYWx1ZUZuIHx8IGlkZW50Rm47XG4gICAgLy8gVE9ETyhyYWZhZWx3KTogVGhpcyBpcyBhIHRlbXBvcmFyeSBoYWNrLiBQb2x5bWVyRXhwcmVzc2lvbnMgbmVlZHMgdGhpc1xuICAgIC8vIGF0IHRoZSBtb21lbnQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBpdCdzIGRlcGVuZGVuY3kgdHJhY2tpbmcuXG4gICAgdGhpcy5kb250UGFzc1Rocm91Z2hTZXRfID0gZG9udFBhc3NUaHJvdWdoU2V0O1xuICB9XG5cbiAgT2JzZXJ2ZXJUcmFuc2Zvcm0ucHJvdG90eXBlID0ge1xuICAgIG9wZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XG4gICAgICB0aGlzLnRhcmdldF8gPSB0YXJnZXQ7XG4gICAgICB0aGlzLnZhbHVlXyA9XG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZUZuXyh0aGlzLm9ic2VydmFibGVfLm9wZW4odGhpcy5vYnNlcnZlZENhbGxiYWNrXywgdGhpcykpO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH0sXG5cbiAgICBvYnNlcnZlZENhbGxiYWNrXzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZuXyh2YWx1ZSk7XG4gICAgICBpZiAoYXJlU2FtZVZhbHVlKHZhbHVlLCB0aGlzLnZhbHVlXykpXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwodGhpcy50YXJnZXRfLCB0aGlzLnZhbHVlXywgb2xkVmFsdWUpO1xuICAgIH0sXG5cbiAgICBkaXNjYXJkQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnZhbHVlXyA9IHRoaXMuZ2V0VmFsdWVGbl8odGhpcy5vYnNlcnZhYmxlXy5kaXNjYXJkQ2hhbmdlcygpKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnNlcnZhYmxlXy5kZWxpdmVyKCk7XG4gICAgfSxcblxuICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnNldFZhbHVlRm5fKHZhbHVlKTtcbiAgICAgIGlmICghdGhpcy5kb250UGFzc1Rocm91Z2hTZXRfICYmIHRoaXMub2JzZXJ2YWJsZV8uc2V0VmFsdWUpXG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVfLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMub2JzZXJ2YWJsZV8pXG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZV8uY2xvc2UoKTtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5vYnNlcnZhYmxlXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5nZXRWYWx1ZUZuXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuc2V0VmFsdWVGbl8gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIGV4cGVjdGVkUmVjb3JkVHlwZXMgPSB7XG4gICAgYWRkOiB0cnVlLFxuICAgIHVwZGF0ZTogdHJ1ZSxcbiAgICBkZWxldGU6IHRydWVcbiAgfTtcblxuICBmdW5jdGlvbiBkaWZmT2JqZWN0RnJvbUNoYW5nZVJlY29yZHMob2JqZWN0LCBjaGFuZ2VSZWNvcmRzLCBvbGRWYWx1ZXMpIHtcbiAgICB2YXIgYWRkZWQgPSB7fTtcbiAgICB2YXIgcmVtb3ZlZCA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFuZ2VSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVjb3JkID0gY2hhbmdlUmVjb3Jkc1tpXTtcbiAgICAgIGlmICghZXhwZWN0ZWRSZWNvcmRUeXBlc1tyZWNvcmQudHlwZV0pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBjaGFuZ2VSZWNvcmQgdHlwZTogJyArIHJlY29yZC50eXBlKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZWNvcmQpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEocmVjb3JkLm5hbWUgaW4gb2xkVmFsdWVzKSlcbiAgICAgICAgb2xkVmFsdWVzW3JlY29yZC5uYW1lXSA9IHJlY29yZC5vbGRWYWx1ZTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09ICd1cGRhdGUnKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09ICdhZGQnKSB7XG4gICAgICAgIGlmIChyZWNvcmQubmFtZSBpbiByZW1vdmVkKVxuICAgICAgICAgIGRlbGV0ZSByZW1vdmVkW3JlY29yZC5uYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGFkZGVkW3JlY29yZC5uYW1lXSA9IHRydWU7XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHR5cGUgPSAnZGVsZXRlJ1xuICAgICAgaWYgKHJlY29yZC5uYW1lIGluIGFkZGVkKSB7XG4gICAgICAgIGRlbGV0ZSBhZGRlZFtyZWNvcmQubmFtZV07XG4gICAgICAgIGRlbGV0ZSBvbGRWYWx1ZXNbcmVjb3JkLm5hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlZFtyZWNvcmQubmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIHByb3AgaW4gYWRkZWQpXG4gICAgICBhZGRlZFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gcmVtb3ZlZClcbiAgICAgIHJlbW92ZWRbcHJvcF0gPSB1bmRlZmluZWQ7XG5cbiAgICB2YXIgY2hhbmdlZCA9IHt9O1xuICAgIGZvciAodmFyIHByb3AgaW4gb2xkVmFsdWVzKSB7XG4gICAgICBpZiAocHJvcCBpbiBhZGRlZCB8fCBwcm9wIGluIHJlbW92ZWQpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgbmV3VmFsdWUgPSBvYmplY3RbcHJvcF07XG4gICAgICBpZiAob2xkVmFsdWVzW3Byb3BdICE9PSBuZXdWYWx1ZSlcbiAgICAgICAgY2hhbmdlZFtwcm9wXSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhZGRlZDogYWRkZWQsXG4gICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgY2hhbmdlZDogY2hhbmdlZFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBuZXdTcGxpY2UoaW5kZXgsIHJlbW92ZWQsIGFkZGVkQ291bnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGFkZGVkQ291bnQ6IGFkZGVkQ291bnRcbiAgICB9O1xuICB9XG5cbiAgdmFyIEVESVRfTEVBVkUgPSAwO1xuICB2YXIgRURJVF9VUERBVEUgPSAxO1xuICB2YXIgRURJVF9BREQgPSAyO1xuICB2YXIgRURJVF9ERUxFVEUgPSAzO1xuXG4gIGZ1bmN0aW9uIEFycmF5U3BsaWNlKCkge31cblxuICBBcnJheVNwbGljZS5wcm90b3R5cGUgPSB7XG5cbiAgICAvLyBOb3RlOiBUaGlzIGZ1bmN0aW9uIGlzICpiYXNlZCogb24gdGhlIGNvbXB1dGF0aW9uIG9mIHRoZSBMZXZlbnNodGVpblxuICAgIC8vIFwiZWRpdFwiIGRpc3RhbmNlLiBUaGUgb25lIGNoYW5nZSBpcyB0aGF0IFwidXBkYXRlc1wiIGFyZSB0cmVhdGVkIGFzIHR3b1xuICAgIC8vIGVkaXRzIC0gbm90IG9uZS4gV2l0aCBBcnJheSBzcGxpY2VzLCBhbiB1cGRhdGUgaXMgcmVhbGx5IGEgZGVsZXRlXG4gICAgLy8gZm9sbG93ZWQgYnkgYW4gYWRkLiBCeSByZXRhaW5pbmcgdGhpcywgd2Ugb3B0aW1pemUgZm9yIFwia2VlcGluZ1wiIHRoZVxuICAgIC8vIG1heGltdW0gYXJyYXkgaXRlbXMgaW4gdGhlIG9yaWdpbmFsIGFycmF5LiBGb3IgZXhhbXBsZTpcbiAgICAvL1xuICAgIC8vICAgJ3h4eHgxMjMnIC0+ICcxMjN5eXl5J1xuICAgIC8vXG4gICAgLy8gV2l0aCAxLWVkaXQgdXBkYXRlcywgdGhlIHNob3J0ZXN0IHBhdGggd291bGQgYmUganVzdCB0byB1cGRhdGUgYWxsIHNldmVuXG4gICAgLy8gY2hhcmFjdGVycy4gV2l0aCAyLWVkaXQgdXBkYXRlcywgd2UgZGVsZXRlIDQsIGxlYXZlIDMsIGFuZCBhZGQgNC4gVGhpc1xuICAgIC8vIGxlYXZlcyB0aGUgc3Vic3RyaW5nICcxMjMnIGludGFjdC5cbiAgICBjYWxjRWRpdERpc3RhbmNlczogZnVuY3Rpb24oY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpIHtcbiAgICAgIC8vIFwiRGVsZXRpb25cIiBjb2x1bW5zXG4gICAgICB2YXIgcm93Q291bnQgPSBvbGRFbmQgLSBvbGRTdGFydCArIDE7XG4gICAgICB2YXIgY29sdW1uQ291bnQgPSBjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0ICsgMTtcbiAgICAgIHZhciBkaXN0YW5jZXMgPSBuZXcgQXJyYXkocm93Q291bnQpO1xuXG4gICAgICAvLyBcIkFkZGl0aW9uXCIgcm93cy4gSW5pdGlhbGl6ZSBudWxsIGNvbHVtbi5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgICAgICBkaXN0YW5jZXNbaV0gPSBuZXcgQXJyYXkoY29sdW1uQ291bnQpO1xuICAgICAgICBkaXN0YW5jZXNbaV1bMF0gPSBpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIG51bGwgcm93XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbkNvdW50OyBqKyspXG4gICAgICAgIGRpc3RhbmNlc1swXVtqXSA9IGo7XG5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGNvbHVtbkNvdW50OyBqKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5lcXVhbHMoY3VycmVudFtjdXJyZW50U3RhcnQgKyBqIC0gMV0sIG9sZFtvbGRTdGFydCArIGkgLSAxXSkpXG4gICAgICAgICAgICBkaXN0YW5jZXNbaV1bal0gPSBkaXN0YW5jZXNbaSAtIDFdW2ogLSAxXTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBub3J0aCA9IGRpc3RhbmNlc1tpIC0gMV1bal0gKyAxO1xuICAgICAgICAgICAgdmFyIHdlc3QgPSBkaXN0YW5jZXNbaV1baiAtIDFdICsgMTtcbiAgICAgICAgICAgIGRpc3RhbmNlc1tpXVtqXSA9IG5vcnRoIDwgd2VzdCA/IG5vcnRoIDogd2VzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpc3RhbmNlcztcbiAgICB9LFxuXG4gICAgLy8gVGhpcyBzdGFydHMgYXQgdGhlIGZpbmFsIHdlaWdodCwgYW5kIHdhbGtzIFwiYmFja3dhcmRcIiBieSBmaW5kaW5nXG4gICAgLy8gdGhlIG1pbmltdW0gcHJldmlvdXMgd2VpZ2h0IHJlY3Vyc2l2ZWx5IHVudGlsIHRoZSBvcmlnaW4gb2YgdGhlIHdlaWdodFxuICAgIC8vIG1hdHJpeC5cbiAgICBzcGxpY2VPcGVyYXRpb25zRnJvbUVkaXREaXN0YW5jZXM6IGZ1bmN0aW9uKGRpc3RhbmNlcykge1xuICAgICAgdmFyIGkgPSBkaXN0YW5jZXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBqID0gZGlzdGFuY2VzWzBdLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgY3VycmVudCA9IGRpc3RhbmNlc1tpXVtqXTtcbiAgICAgIHZhciBlZGl0cyA9IFtdO1xuICAgICAgd2hpbGUgKGkgPiAwIHx8IGogPiAwKSB7XG4gICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfQUREKTtcbiAgICAgICAgICBqLS07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGogPT0gMCkge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9ERUxFVEUpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9ydGhXZXN0ID0gZGlzdGFuY2VzW2kgLSAxXVtqIC0gMV07XG4gICAgICAgIHZhciB3ZXN0ID0gZGlzdGFuY2VzW2kgLSAxXVtqXTtcbiAgICAgICAgdmFyIG5vcnRoID0gZGlzdGFuY2VzW2ldW2ogLSAxXTtcblxuICAgICAgICB2YXIgbWluO1xuICAgICAgICBpZiAod2VzdCA8IG5vcnRoKVxuICAgICAgICAgIG1pbiA9IHdlc3QgPCBub3J0aFdlc3QgPyB3ZXN0IDogbm9ydGhXZXN0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbWluID0gbm9ydGggPCBub3J0aFdlc3QgPyBub3J0aCA6IG5vcnRoV2VzdDtcblxuICAgICAgICBpZiAobWluID09IG5vcnRoV2VzdCkge1xuICAgICAgICAgIGlmIChub3J0aFdlc3QgPT0gY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdHMucHVzaChFRElUX0xFQVZFKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWRpdHMucHVzaChFRElUX1VQREFURSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gbm9ydGhXZXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpLS07XG4gICAgICAgICAgai0tO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbiA9PSB3ZXN0KSB7XG4gICAgICAgICAgZWRpdHMucHVzaChFRElUX0RFTEVURSk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGN1cnJlbnQgPSB3ZXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9BREQpO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgICBjdXJyZW50ID0gbm9ydGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWRpdHMucmV2ZXJzZSgpO1xuICAgICAgcmV0dXJuIGVkaXRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTcGxpY2UgUHJvamVjdGlvbiBmdW5jdGlvbnM6XG4gICAgICpcbiAgICAgKiBBIHNwbGljZSBtYXAgaXMgYSByZXByZXNlbnRhdGlvbiBvZiBob3cgYSBwcmV2aW91cyBhcnJheSBvZiBpdGVtc1xuICAgICAqIHdhcyB0cmFuc2Zvcm1lZCBpbnRvIGEgbmV3IGFycmF5IG9mIGl0ZW1zLiBDb25jZXB0dWFsbHkgaXQgaXMgYSBsaXN0IG9mXG4gICAgICogdHVwbGVzIG9mXG4gICAgICpcbiAgICAgKiAgIDxpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudD5cbiAgICAgKlxuICAgICAqIHdoaWNoIGFyZSBrZXB0IGluIGFzY2VuZGluZyBpbmRleCBvcmRlciBvZi4gVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhhdCBhdFxuICAgICAqIHRoZSB8aW5kZXh8LCB8cmVtb3ZlZHwgc2VxdWVuY2Ugb2YgaXRlbXMgd2VyZSByZW1vdmVkLCBhbmQgY291bnRpbmcgZm9yd2FyZFxuICAgICAqIGZyb20gfGluZGV4fCwgfGFkZGVkQ291bnR8IGl0ZW1zIHdlcmUgYWRkZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBMYWNraW5nIGluZGl2aWR1YWwgc3BsaWNlIG11dGF0aW9uIGluZm9ybWF0aW9uLCB0aGUgbWluaW1hbCBzZXQgb2ZcbiAgICAgKiBzcGxpY2VzIGNhbiBiZSBzeW50aGVzaXplZCBnaXZlbiB0aGUgcHJldmlvdXMgc3RhdGUgYW5kIGZpbmFsIHN0YXRlIG9mIGFuXG4gICAgICogYXJyYXkuIFRoZSBiYXNpYyBhcHByb2FjaCBpcyB0byBjYWxjdWxhdGUgdGhlIGVkaXQgZGlzdGFuY2UgbWF0cml4IGFuZFxuICAgICAqIGNob29zZSB0aGUgc2hvcnRlc3QgcGF0aCB0aHJvdWdoIGl0LlxuICAgICAqXG4gICAgICogQ29tcGxleGl0eTogTyhsICogcClcbiAgICAgKiAgIGw6IFRoZSBsZW5ndGggb2YgdGhlIGN1cnJlbnQgYXJyYXlcbiAgICAgKiAgIHA6IFRoZSBsZW5ndGggb2YgdGhlIG9sZCBhcnJheVxuICAgICAqL1xuICAgIGNhbGNTcGxpY2VzOiBmdW5jdGlvbihjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkge1xuICAgICAgdmFyIHByZWZpeENvdW50ID0gMDtcbiAgICAgIHZhciBzdWZmaXhDb3VudCA9IDA7XG5cbiAgICAgIHZhciBtaW5MZW5ndGggPSBNYXRoLm1pbihjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0LCBvbGRFbmQgLSBvbGRTdGFydCk7XG4gICAgICBpZiAoY3VycmVudFN0YXJ0ID09IDAgJiYgb2xkU3RhcnQgPT0gMClcbiAgICAgICAgcHJlZml4Q291bnQgPSB0aGlzLnNoYXJlZFByZWZpeChjdXJyZW50LCBvbGQsIG1pbkxlbmd0aCk7XG5cbiAgICAgIGlmIChjdXJyZW50RW5kID09IGN1cnJlbnQubGVuZ3RoICYmIG9sZEVuZCA9PSBvbGQubGVuZ3RoKVxuICAgICAgICBzdWZmaXhDb3VudCA9IHRoaXMuc2hhcmVkU3VmZml4KGN1cnJlbnQsIG9sZCwgbWluTGVuZ3RoIC0gcHJlZml4Q291bnQpO1xuXG4gICAgICBjdXJyZW50U3RhcnQgKz0gcHJlZml4Q291bnQ7XG4gICAgICBvbGRTdGFydCArPSBwcmVmaXhDb3VudDtcbiAgICAgIGN1cnJlbnRFbmQgLT0gc3VmZml4Q291bnQ7XG4gICAgICBvbGRFbmQgLT0gc3VmZml4Q291bnQ7XG5cbiAgICAgIGlmIChjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0ID09IDAgJiYgb2xkRW5kIC0gb2xkU3RhcnQgPT0gMClcbiAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICBpZiAoY3VycmVudFN0YXJ0ID09IGN1cnJlbnRFbmQpIHtcbiAgICAgICAgdmFyIHNwbGljZSA9IG5ld1NwbGljZShjdXJyZW50U3RhcnQsIFtdLCAwKTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0IDwgb2xkRW5kKVxuICAgICAgICAgIHNwbGljZS5yZW1vdmVkLnB1c2gob2xkW29sZFN0YXJ0KytdKTtcblxuICAgICAgICByZXR1cm4gWyBzcGxpY2UgXTtcbiAgICAgIH0gZWxzZSBpZiAob2xkU3RhcnQgPT0gb2xkRW5kKVxuICAgICAgICByZXR1cm4gWyBuZXdTcGxpY2UoY3VycmVudFN0YXJ0LCBbXSwgY3VycmVudEVuZCAtIGN1cnJlbnRTdGFydCkgXTtcblxuICAgICAgdmFyIG9wcyA9IHRoaXMuc3BsaWNlT3BlcmF0aW9uc0Zyb21FZGl0RGlzdGFuY2VzKFxuICAgICAgICAgIHRoaXMuY2FsY0VkaXREaXN0YW5jZXMoY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKSk7XG5cbiAgICAgIHZhciBzcGxpY2UgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgc3BsaWNlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gY3VycmVudFN0YXJ0O1xuICAgICAgdmFyIG9sZEluZGV4ID0gb2xkU3RhcnQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzd2l0Y2gob3BzW2ldKSB7XG4gICAgICAgICAgY2FzZSBFRElUX0xFQVZFOlxuICAgICAgICAgICAgaWYgKHNwbGljZSkge1xuICAgICAgICAgICAgICBzcGxpY2VzLnB1c2goc3BsaWNlKTtcbiAgICAgICAgICAgICAgc3BsaWNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgb2xkSW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRURJVF9VUERBVEU6XG4gICAgICAgICAgICBpZiAoIXNwbGljZSlcbiAgICAgICAgICAgICAgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCBbXSwgMCk7XG5cbiAgICAgICAgICAgIHNwbGljZS5hZGRlZENvdW50Kys7XG4gICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICBzcGxpY2UucmVtb3ZlZC5wdXNoKG9sZFtvbGRJbmRleF0pO1xuICAgICAgICAgICAgb2xkSW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRURJVF9BREQ6XG4gICAgICAgICAgICBpZiAoIXNwbGljZSlcbiAgICAgICAgICAgICAgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCBbXSwgMCk7XG5cbiAgICAgICAgICAgIHNwbGljZS5hZGRlZENvdW50Kys7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFRElUX0RFTEVURTpcbiAgICAgICAgICAgIGlmICghc3BsaWNlKVxuICAgICAgICAgICAgICBzcGxpY2UgPSBuZXdTcGxpY2UoaW5kZXgsIFtdLCAwKTtcblxuICAgICAgICAgICAgc3BsaWNlLnJlbW92ZWQucHVzaChvbGRbb2xkSW5kZXhdKTtcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3BsaWNlKSB7XG4gICAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNwbGljZXM7XG4gICAgfSxcblxuICAgIHNoYXJlZFByZWZpeDogZnVuY3Rpb24oY3VycmVudCwgb2xkLCBzZWFyY2hMZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoTGVuZ3RoOyBpKyspXG4gICAgICAgIGlmICghdGhpcy5lcXVhbHMoY3VycmVudFtpXSwgb2xkW2ldKSlcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgIHJldHVybiBzZWFyY2hMZW5ndGg7XG4gICAgfSxcblxuICAgIHNoYXJlZFN1ZmZpeDogZnVuY3Rpb24oY3VycmVudCwgb2xkLCBzZWFyY2hMZW5ndGgpIHtcbiAgICAgIHZhciBpbmRleDEgPSBjdXJyZW50Lmxlbmd0aDtcbiAgICAgIHZhciBpbmRleDIgPSBvbGQubGVuZ3RoO1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIHdoaWxlIChjb3VudCA8IHNlYXJjaExlbmd0aCAmJiB0aGlzLmVxdWFscyhjdXJyZW50Wy0taW5kZXgxXSwgb2xkWy0taW5kZXgyXSkpXG4gICAgICAgIGNvdW50Kys7XG5cbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9LFxuXG4gICAgY2FsY3VsYXRlU3BsaWNlczogZnVuY3Rpb24oY3VycmVudCwgcHJldmlvdXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGNTcGxpY2VzKGN1cnJlbnQsIDAsIGN1cnJlbnQubGVuZ3RoLCBwcmV2aW91cywgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLmxlbmd0aCk7XG4gICAgfSxcblxuICAgIGVxdWFsczogZnVuY3Rpb24oY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlID09PSBwcmV2aW91c1ZhbHVlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgYXJyYXlTcGxpY2UgPSBuZXcgQXJyYXlTcGxpY2UoKTtcblxuICBmdW5jdGlvbiBjYWxjU3BsaWNlcyhjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkge1xuICAgIHJldHVybiBhcnJheVNwbGljZS5jYWxjU3BsaWNlcyhjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcnNlY3Qoc3RhcnQxLCBlbmQxLCBzdGFydDIsIGVuZDIpIHtcbiAgICAvLyBEaXNqb2ludFxuICAgIGlmIChlbmQxIDwgc3RhcnQyIHx8IGVuZDIgPCBzdGFydDEpXG4gICAgICByZXR1cm4gLTE7XG5cbiAgICAvLyBBZGphY2VudFxuICAgIGlmIChlbmQxID09IHN0YXJ0MiB8fCBlbmQyID09IHN0YXJ0MSlcbiAgICAgIHJldHVybiAwO1xuXG4gICAgLy8gTm9uLXplcm8gaW50ZXJzZWN0LCBzcGFuMSBmaXJzdFxuICAgIGlmIChzdGFydDEgPCBzdGFydDIpIHtcbiAgICAgIGlmIChlbmQxIDwgZW5kMilcbiAgICAgICAgcmV0dXJuIGVuZDEgLSBzdGFydDI7IC8vIE92ZXJsYXBcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGVuZDIgLSBzdGFydDI7IC8vIENvbnRhaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb24temVybyBpbnRlcnNlY3QsIHNwYW4yIGZpcnN0XG4gICAgICBpZiAoZW5kMiA8IGVuZDEpXG4gICAgICAgIHJldHVybiBlbmQyIC0gc3RhcnQxOyAvLyBPdmVybGFwXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBlbmQxIC0gc3RhcnQxOyAvLyBDb250YWluZWRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZVNwbGljZShzcGxpY2VzLCBpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudCkge1xuXG4gICAgdmFyIHNwbGljZSA9IG5ld1NwbGljZShpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudCk7XG5cbiAgICB2YXIgaW5zZXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5zZXJ0aW9uT2Zmc2V0ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBzcGxpY2VzW2ldO1xuICAgICAgY3VycmVudC5pbmRleCArPSBpbnNlcnRpb25PZmZzZXQ7XG5cbiAgICAgIGlmIChpbnNlcnRlZClcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHZhciBpbnRlcnNlY3RDb3VudCA9IGludGVyc2VjdChzcGxpY2UuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BsaWNlLmluZGV4ICsgc3BsaWNlLnJlbW92ZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5pbmRleCArIGN1cnJlbnQuYWRkZWRDb3VudCk7XG5cbiAgICAgIGlmIChpbnRlcnNlY3RDb3VudCA+PSAwKSB7XG4gICAgICAgIC8vIE1lcmdlIHRoZSB0d28gc3BsaWNlc1xuXG4gICAgICAgIHNwbGljZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG5cbiAgICAgICAgaW5zZXJ0aW9uT2Zmc2V0IC09IGN1cnJlbnQuYWRkZWRDb3VudCAtIGN1cnJlbnQucmVtb3ZlZC5sZW5ndGg7XG5cbiAgICAgICAgc3BsaWNlLmFkZGVkQ291bnQgKz0gY3VycmVudC5hZGRlZENvdW50IC0gaW50ZXJzZWN0Q291bnQ7XG4gICAgICAgIHZhciBkZWxldGVDb3VudCA9IHNwbGljZS5yZW1vdmVkLmxlbmd0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucmVtb3ZlZC5sZW5ndGggLSBpbnRlcnNlY3RDb3VudDtcblxuICAgICAgICBpZiAoIXNwbGljZS5hZGRlZENvdW50ICYmICFkZWxldGVDb3VudCkge1xuICAgICAgICAgIC8vIG1lcmdlZCBzcGxpY2UgaXMgYSBub29wLiBkaXNjYXJkLlxuICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGN1cnJlbnQucmVtb3ZlZDtcblxuICAgICAgICAgIGlmIChzcGxpY2UuaW5kZXggPCBjdXJyZW50LmluZGV4KSB7XG4gICAgICAgICAgICAvLyBzb21lIHByZWZpeCBvZiBzcGxpY2UucmVtb3ZlZCBpcyBwcmVwZW5kZWQgdG8gY3VycmVudC5yZW1vdmVkLlxuICAgICAgICAgICAgdmFyIHByZXBlbmQgPSBzcGxpY2UucmVtb3ZlZC5zbGljZSgwLCBjdXJyZW50LmluZGV4IC0gc3BsaWNlLmluZGV4KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHByZXBlbmQsIHJlbW92ZWQpO1xuICAgICAgICAgICAgcmVtb3ZlZCA9IHByZXBlbmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNwbGljZS5pbmRleCArIHNwbGljZS5yZW1vdmVkLmxlbmd0aCA+IGN1cnJlbnQuaW5kZXggKyBjdXJyZW50LmFkZGVkQ291bnQpIHtcbiAgICAgICAgICAgIC8vIHNvbWUgc3VmZml4IG9mIHNwbGljZS5yZW1vdmVkIGlzIGFwcGVuZGVkIHRvIGN1cnJlbnQucmVtb3ZlZC5cbiAgICAgICAgICAgIHZhciBhcHBlbmQgPSBzcGxpY2UucmVtb3ZlZC5zbGljZShjdXJyZW50LmluZGV4ICsgY3VycmVudC5hZGRlZENvdW50IC0gc3BsaWNlLmluZGV4KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlbW92ZWQsIGFwcGVuZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3BsaWNlLnJlbW92ZWQgPSByZW1vdmVkO1xuICAgICAgICAgIGlmIChjdXJyZW50LmluZGV4IDwgc3BsaWNlLmluZGV4KSB7XG4gICAgICAgICAgICBzcGxpY2UuaW5kZXggPSBjdXJyZW50LmluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzcGxpY2UuaW5kZXggPCBjdXJyZW50LmluZGV4KSB7XG4gICAgICAgIC8vIEluc2VydCBzcGxpY2UgaGVyZS5cblxuICAgICAgICBpbnNlcnRlZCA9IHRydWU7XG5cbiAgICAgICAgc3BsaWNlcy5zcGxpY2UoaSwgMCwgc3BsaWNlKTtcbiAgICAgICAgaSsrO1xuXG4gICAgICAgIHZhciBvZmZzZXQgPSBzcGxpY2UuYWRkZWRDb3VudCAtIHNwbGljZS5yZW1vdmVkLmxlbmd0aFxuICAgICAgICBjdXJyZW50LmluZGV4ICs9IG9mZnNldDtcbiAgICAgICAgaW5zZXJ0aW9uT2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWluc2VydGVkKVxuICAgICAgc3BsaWNlcy5wdXNoKHNwbGljZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbml0aWFsU3BsaWNlcyhhcnJheSwgY2hhbmdlUmVjb3Jkcykge1xuICAgIHZhciBzcGxpY2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZVJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByZWNvcmQgPSBjaGFuZ2VSZWNvcmRzW2ldO1xuICAgICAgc3dpdGNoKHJlY29yZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgICAgbWVyZ2VTcGxpY2Uoc3BsaWNlcywgcmVjb3JkLmluZGV4LCByZWNvcmQucmVtb3ZlZC5zbGljZSgpLCByZWNvcmQuYWRkZWRDb3VudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgIGNhc2UgJ3VwZGF0ZSc6XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgaWYgKCFpc0luZGV4KHJlY29yZC5uYW1lKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHZhciBpbmRleCA9IHRvTnVtYmVyKHJlY29yZC5uYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgbWVyZ2VTcGxpY2Uoc3BsaWNlcywgaW5kZXgsIFtyZWNvcmQub2xkVmFsdWVdLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIHJlY29yZCB0eXBlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwbGljZXM7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9qZWN0QXJyYXlTcGxpY2VzKGFycmF5LCBjaGFuZ2VSZWNvcmRzKSB7XG4gICAgdmFyIHNwbGljZXMgPSBbXTtcblxuICAgIGNyZWF0ZUluaXRpYWxTcGxpY2VzKGFycmF5LCBjaGFuZ2VSZWNvcmRzKS5mb3JFYWNoKGZ1bmN0aW9uKHNwbGljZSkge1xuICAgICAgaWYgKHNwbGljZS5hZGRlZENvdW50ID09IDEgJiYgc3BsaWNlLnJlbW92ZWQubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKHNwbGljZS5yZW1vdmVkWzBdICE9PSBhcnJheVtzcGxpY2UuaW5kZXhdKVxuICAgICAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuXG4gICAgICAgIHJldHVyblxuICAgICAgfTtcblxuICAgICAgc3BsaWNlcyA9IHNwbGljZXMuY29uY2F0KGNhbGNTcGxpY2VzKGFycmF5LCBzcGxpY2UuaW5kZXgsIHNwbGljZS5pbmRleCArIHNwbGljZS5hZGRlZENvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGljZS5yZW1vdmVkLCAwLCBzcGxpY2UucmVtb3ZlZC5sZW5ndGgpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzcGxpY2VzO1xuICB9XG5cbiAgZ2xvYmFsLk9ic2VydmVyID0gT2JzZXJ2ZXI7XG4gIGdsb2JhbC5PYnNlcnZlci5ydW5FT01fID0gcnVuRU9NO1xuICBnbG9iYWwuT2JzZXJ2ZXIub2JzZXJ2ZXJTZW50aW5lbF8gPSBvYnNlcnZlclNlbnRpbmVsOyAvLyBmb3IgdGVzdGluZy5cbiAgZ2xvYmFsLk9ic2VydmVyLmhhc09iamVjdE9ic2VydmUgPSBoYXNPYnNlcnZlO1xuICBnbG9iYWwuQXJyYXlPYnNlcnZlciA9IEFycmF5T2JzZXJ2ZXI7XG4gIGdsb2JhbC5BcnJheU9ic2VydmVyLmNhbGN1bGF0ZVNwbGljZXMgPSBmdW5jdGlvbihjdXJyZW50LCBwcmV2aW91cykge1xuICAgIHJldHVybiBhcnJheVNwbGljZS5jYWxjdWxhdGVTcGxpY2VzKGN1cnJlbnQsIHByZXZpb3VzKTtcbiAgfTtcblxuICBnbG9iYWwuQXJyYXlTcGxpY2UgPSBBcnJheVNwbGljZTtcbiAgZ2xvYmFsLk9iamVjdE9ic2VydmVyID0gT2JqZWN0T2JzZXJ2ZXI7XG4gIGdsb2JhbC5QYXRoT2JzZXJ2ZXIgPSBQYXRoT2JzZXJ2ZXI7XG4gIGdsb2JhbC5Db21wb3VuZE9ic2VydmVyID0gQ29tcG91bmRPYnNlcnZlcjtcbiAgZ2xvYmFsLlBhdGggPSBQYXRoO1xuICBnbG9iYWwuT2JzZXJ2ZXJUcmFuc2Zvcm0gPSBPYnNlcnZlclRyYW5zZm9ybTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbCAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdyk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
