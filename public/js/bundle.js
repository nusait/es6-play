!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.App=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var $__2 = helpers,
    log = $__2.log,
    error = $__2.error;
var IntroView = function IntroView() {
  for (var args = [],
      $__1 = 0; $__1 < arguments.length; $__1++)
    args[$__1] = arguments[$__1];
  $traceurRuntime.superCall(this, $IntroView.prototype, "constructor", $traceurRuntime.spread(args));
  var app = (this).app;
  var events = app.events;
  events.on('reportWasPosted', (function(e) {
    return log(e.type, e);
  }));
};
var $IntroView = IntroView;
($traceurRuntime.createClass)(IntroView, {
  postReport: function(name, incident) {
    var app = (this).app;
    var command = app.make('postReportCommand', [name, incident]);
    this.execute(command);
  },
  getBluelights: function() {
    var app = (this).app;
    var command = app.make('retrieveBluelightsCommand');
    this.execute(command).then((function(collection) {
      log("got it from thenable ", collection);
    })).catch((function(err) {
      error('got it from catchable', err.message);
    }));
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


},{"Wildcat.Support.helpers":49,"Wildcat.View.View":52}],2:[function(require,module,exports){
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
    var $__1 = command,
        name = $__1.name,
        incident = $__1.incident;
    var app = $this.app;
    var Report = app.make('Report');
    async($traceurRuntime.initGeneratorFunction(function $__3() {
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
      }, $__3, this);
    }))().catch(terminateError);
  }}, {}, CommandHandler);
var $__1 = helpers,
    terminateError = $__1.terminateError,
    async = $__1.async,
    log = $__1.log;
module.exports = PostReportCommandHandler;


},{"Wildcat.Commander.CommandHandler":23,"Wildcat.Support.helpers":49}],4:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var RetrieveBluelightsCommand = function RetrieveBluelightsCommand() {
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  assign(this, options);
};
($traceurRuntime.createClass)(RetrieveBluelightsCommand, {}, {
  getName: function() {
    return 'app.retrieveBluelightsCommand';
  },
  getShortName: function() {
    return lastSegment(this.getName());
  }
});
var $__1 = helpers,
    assign = $__1.assign,
    lastSegment = $__1.lastSegment;
module.exports = RetrieveBluelightsCommand;


},{"Wildcat.Support.helpers":49}],5:[function(require,module,exports){
"use strict";
var CommandHandler = require('Wildcat.Commander.CommandHandler');
var helpers = require('Wildcat.Support.helpers');
var RetrieveBluelightsCommandHandler = function RetrieveBluelightsCommandHandler() {
  $traceurRuntime.defaultSuperCall(this, $RetrieveBluelightsCommandHandler.prototype, arguments);
};
var $RetrieveBluelightsCommandHandler = RetrieveBluelightsCommandHandler;
($traceurRuntime.createClass)(RetrieveBluelightsCommandHandler, {handle: $traceurRuntime.initGeneratorFunction(function $__3(command) {
    var app,
        $__2,
        Bluelight,
        events,
        commandName,
        bluelight,
        err;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            app = (this).app;
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
  })}, {}, CommandHandler);
var asyncMethods = helpers.asyncMethods;
asyncMethods(RetrieveBluelightsCommandHandler.prototype, 'handle');
module.exports = RetrieveBluelightsCommandHandler;


},{"Wildcat.Commander.CommandHandler":23,"Wildcat.Support.helpers":49}],6:[function(require,module,exports){
"use strict";
var EventGenerator = require('../../../framework/src/Wildcat/Commander/Events/EventGenerator');
var helpers = require('Wildcat.Support.helpers');
var Bluelight = function Bluelight(name, incident) {
  this.name = name;
  this.incident = incident;
  EventGenerator.call(this);
};
($traceurRuntime.createClass)(Bluelight, {}, {
  get: $traceurRuntime.initGeneratorFunction(function $__3() {
    var args,
        $__1,
        app,
        $__2,
        bluelightRepository,
        bluelight,
        collection,
        event;
    var $arguments = arguments;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            for (args = [], $__1 = 0; $__1 < $arguments.length; $__1++)
              args[$__1] = $arguments[$__1];
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
            event = app.make('bluelightsDelivered', [collection]);
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
var $__2 = helpers,
    log = $__2.log,
    extendProtoOf = $__2.extendProtoOf,
    wait = $__2.wait,
    asyncMethods = $__2.asyncMethods;
extendProtoOf(Bluelight, EventGenerator);
asyncMethods(Bluelight, 'get');
module.exports = Bluelight;


},{"../../../framework/src/Wildcat/Commander/Events/EventGenerator":28,"Wildcat.Support.helpers":49}],7:[function(require,module,exports){
"use strict";
var Collection = require('Wildcat.Support.Collection');
var helpers = require('../../../framework/src/Wildcat/Support/helpers');
var BluelightCollection = function BluelightCollection() {
  for (var args = [],
      $__1 = 0; $__1 < arguments.length; $__1++)
    args[$__1] = arguments[$__1];
  $traceurRuntime.superCall(this, $BluelightCollection.prototype, "constructor", $traceurRuntime.spread(args));
};
var $BluelightCollection = BluelightCollection;
($traceurRuntime.createClass)(BluelightCollection, {}, {
  getApplication: function() {
    return this.app_;
  },
  setApplication: function(app) {
    this.app_ = app;
    return this;
  }
}, Collection);
var $__2 = helpers,
    extendProtoOf = $__2.extendProtoOf,
    wait = $__2.wait;
module.exports = BluelightCollection;


},{"../../../framework/src/Wildcat/Support/helpers":49,"Wildcat.Support.Collection":47}],8:[function(require,module,exports){
"use strict";
var BluelightsDelivered = function BluelightsDelivered(bluelightCollection) {
  this.value = bluelightCollection;
  this.type = this.getName();
  this.timeStamp = Date.now();
};
($traceurRuntime.createClass)(BluelightsDelivered, {getName: function() {
    return 'app.bluelightsDelivered';
  }}, {});
module.exports = BluelightsDelivered;


},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
"use strict";
var EventGenerator = require('Wildcat.Commander.Events.EventGenerator');
var helpers = require('Wildcat.Support.helpers');
var ValidationError = require('Wildcat.Errors.ValidationError');
var Report = function Report(name, incident) {
  this.name = name;
  this.incident = incident;
  EventGenerator.call(this);
};
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
  post: $traceurRuntime.initGeneratorFunction(function $__4() {
    var args,
        $__1,
        app,
        reportRepository,
        report,
        event;
    var $arguments = arguments;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            for (args = [], $__1 = 0; $__1 < $arguments.length; $__1++)
              args[$__1] = $arguments[$__1];
            app = this.getApplication();
            reportRepository = app.reportRepository;
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
  }),
  getApplication: function() {
    return this.app_;
  },
  setApplication: function(app) {
    this.app_ = app;
    return this;
  }
});
var $__2 = helpers,
    log = $__2.log,
    extendProtoOf = $__2.extendProtoOf,
    wait = $__2.wait,
    asyncMethods = $__2.asyncMethods;
extendProtoOf(Report, EventGenerator);
asyncMethods(Report, 'persist', 'post');
module.exports = Report;


},{"Wildcat.Commander.Events.EventGenerator":28,"Wildcat.Errors.ValidationError":38,"Wildcat.Support.helpers":49}],11:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var Report = require('App.Entities.Reports.Report');
var ReportWasPosted = require('App.Entities.Reports.Events.ReportWasPosted');
var ReportRepository = require('App.Repositories.ReportRepository');
var Bluelight = require('App.Entities.Bluelights.Bluelight');
var BluelightCollection = require('App.Entities.Bluelights.BluelightCollection');
var BluelightRepository = require('App.Repositories.BluelightRepository');
var BluelightsDelivered = require('App.Entities.Bluelights.Events.BluelightsDelivered');
var XHRLoader = require('Wildcat.Loaders.XHRLoader');
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
  var app = (this).app;
  app.bindShared('Report', (function(app) {
    return Report.setApplication(app);
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
  app.bindShared('Bluelight', (function(app) {
    return Bluelight.setApplication(app);
  }));
  app.bind('bluelight', (function(app) {
    for (var args = [],
        $__3 = 1; $__3 < arguments.length; $__3++)
      args[$__3 - 1] = arguments[$__3];
    return new (Function.prototype.bind.apply(app.Bluelight, $traceurRuntime.spread([null], args)))();
  }));
  app.bindShared('BluelightCollection', (function(app) {
    return BluelightCollection.setApplication(app);
  }));
  app.bind('bluelightCollection', (function(app) {
    for (var args = [],
        $__4 = 1; $__4 < arguments.length; $__4++)
      args[$__4 - 1] = arguments[$__4];
    if (!args.length)
      args = [[]];
    return new (Function.prototype.bind.apply(app.BluelightCollection, $traceurRuntime.spread([null], args)))();
  }));
  app.bind('bluelightsDelivered', (function(app) {
    for (var args = [],
        $__5 = 1; $__5 < arguments.length; $__5++)
      args[$__5 - 1] = arguments[$__5];
    return new (Function.prototype.bind.apply(BluelightsDelivered, $traceurRuntime.spread([null], args)))();
  }));
}
function registerRepositories() {
  var app = (this).app;
  app.bindShared('reportRepository', (function(app) {
    return new ReportRepository(app);
  }));
  app.bind('xhrLoader', (function(app) {
    return new XHRLoader;
  }));
  app.bindShared('bluelightRepository', (function(app) {
    var xhrLoader = app.xhrLoader;
    return new BluelightRepository(app, xhrLoader);
  }));
}
var log = helpers.log;
module.exports = AppServiceProvider;


},{"App.Entities.Bluelights.Bluelight":6,"App.Entities.Bluelights.BluelightCollection":7,"App.Entities.Bluelights.Events.BluelightsDelivered":8,"App.Entities.Reports.Events.ReportWasPosted":9,"App.Entities.Reports.Report":10,"App.Repositories.BluelightRepository":12,"App.Repositories.ReportRepository":13,"Wildcat.Loaders.XHRLoader":44,"Wildcat.Support.ServiceProvider":48,"Wildcat.Support.helpers":49}],12:[function(require,module,exports){
"use strict";
var helpers = require('../../framework/src/Wildcat/Support/helpers');
var BluelightRepository = function BluelightRepository(app, loader) {
  this.app = app;
  this.loader = loader;
};
($traceurRuntime.createClass)(BluelightRepository, {
  get: $traceurRuntime.initGeneratorFunction(function $__4() {
    var $__1,
        app,
        loader,
        baseUrl,
        BluelightCollection,
        url,
        features,
        $__5,
        $__6,
        $__7,
        $__8;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__1 = this, app = $__1.app, loader = $__1.loader, baseUrl = $__1.baseUrl;
            BluelightCollection = app.BluelightCollection;
            url = (baseUrl + "bluelights");
            $ctx.state = 12;
            break;
          case 12:
            $__5 = loader.get;
            $__6 = $__5.call(loader, {
              url: url,
              timeout: 10000
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
    return config.get('app').apiBaseUrl;
  }
}, {});
var $__1 = helpers,
    asyncMethods = $__1.asyncMethods,
    log = $__1.log;
asyncMethods(BluelightRepository.prototype, 'get');
module.exports = BluelightRepository;


},{"../../framework/src/Wildcat/Support/helpers":49}],13:[function(require,module,exports){
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
var $__1 = helpers,
    log = $__1.log,
    wait = $__1.wait;
module.exports = ReportRepository;


},{"Wildcat.Errors.AuthenticationError":34,"Wildcat.Errors.ValidationError":38,"Wildcat.Support.helpers":49}],14:[function(require,module,exports){
"use strict";
require('traceur/bin/traceur-runtime');
var App = require('../framework/src/Wildcat/Foundation/Application');
module.exports = App;


},{"../framework/src/Wildcat/Foundation/Application":41,"traceur/bin/traceur-runtime":58}],15:[function(require,module,exports){
(function (global){
"use strict";
var AppServiceProvider = require('App.Providers.AppServiceProvider');
var LogServiceProvider = require('Wildcat.Log.LogServiceProvider');
var WindowServiceProvider = require('Wildcat.DOM.WindowServiceProvider');
var ErrorProvider = require('Wildcat.Errors.ErrorServiceProvider');
var ViewServiceProvider = require('Wildcat.View.ViewServiceProvider');
var CommanderServiceProvider = require('Wildcat.Commander.CommandServiceProvider');
function browser() {
  if (global.navigator) {
    return global.navigator.userAgent;
  } else {
    return 'not determined';
  }
}
var configObject = {
  apiBaseUrl: 'https://go.dosa.northwestern.edu/nuhelpapi/api/',
  debug: false,
  providers: [AppServiceProvider, LogServiceProvider, WindowServiceProvider, ErrorProvider, ViewServiceProvider, CommanderServiceProvider],
  locale: 'en',
  browser: browser()
};
module.exports = configObject;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"App.Providers.AppServiceProvider":11,"Wildcat.Commander.CommandServiceProvider":24,"Wildcat.DOM.WindowServiceProvider":33,"Wildcat.Errors.ErrorServiceProvider":35,"Wildcat.Log.LogServiceProvider":46,"Wildcat.View.ViewServiceProvider":53}],16:[function(require,module,exports){
"use strict";
var PostReportCommand = require('App.Commands.PostReportCommand');
var RetrieveBluelightsCommand = require('App.Commands.RetrieveBluelightsCommand');
module.exports = [{
  abstract: 'postReportCommand',
  command: PostReportCommand
}, {
  abstract: 'retrieveBluelightsCommand',
  command: RetrieveBluelightsCommand
}];


},{"App.Commands.PostReportCommand":2,"App.Commands.RetrieveBluelightsCommand":4}],17:[function(require,module,exports){
"use strict";
module.exports = {
  'app': require('./app'),
  'local.app': require('./local/app'),
  'testing.app': require('./testing/app'),
  'commands': require('./commands'),
  'handlers': require('./handlers'),
  'views': require('./views')
};


},{"./app":15,"./commands":16,"./handlers":18,"./local/app":19,"./testing/app":20,"./views":21}],18:[function(require,module,exports){
"use strict";
var PostReportCommandHandler = require('App.Commands.PostReportCommandHandler');
var RetrieveBluelightsCommandHandler = require('App.Commands.RetrieveBluelightsCommandHandler');
module.exports = [{
  abstract: 'postReportCommandHandler',
  handler: PostReportCommandHandler
}, {
  abstract: 'retrieveBluelightsCommandHandler',
  handler: RetrieveBluelightsCommandHandler
}];


},{"App.Commands.PostReportCommandHandler":3,"App.Commands.RetrieveBluelightsCommandHandler":5}],19:[function(require,module,exports){
"use strict";
module.exports = {
  apiBaseUrl: 'http://nuhelp.api/api/',
  debug: true
};


},{}],20:[function(require,module,exports){
"use strict";
module.exports = {
  apiBaseUrl: 'http://nuhelp.api/api/',
  browser: 'console'
};


},{}],21:[function(require,module,exports){
"use strict";
var IntroView = require('App.Browser.Views.IntroView');
module.exports = [{
  'abstract': 'introView',
  '$constructor': IntroView,
  'build': 'singleton'
}];


},{"App.Browser.Views.IntroView":1}],22:[function(require,module,exports){
"use strict";
var CommandBus = function CommandBus(app) {
  this.app = app;
};
($traceurRuntime.createClass)(CommandBus, {execute: function(command) {
    var commandName = command.constructor.getShortName();
    var handlerName = (commandName + "Handler");
    var handler = this.app.make(handlerName);
    return handler.handle(command);
  }}, {});
module.exports = CommandBus;


},{}],23:[function(require,module,exports){
"use strict";
var DispatchableTrait = require('Wildcat.Commander.Events.DispatchableTrait');
var helpers = require('Wildcat.Support.helpers');
var CommandHandler = function CommandHandler(app) {
  this.app = app;
};
($traceurRuntime.createClass)(CommandHandler, {}, {});
var extendProtoOf = helpers.extendProtoOf;
extendProtoOf(CommandHandler, DispatchableTrait);
module.exports = CommandHandler;


},{"Wildcat.Commander.Events.DispatchableTrait":26,"Wildcat.Support.helpers":49}],24:[function(require,module,exports){
"use strict";
var log = require('Wildcat.Support.helpers').log;
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
  var app = (this).app;
  var commands = app.config.get('commands');
  for (var $__1 = commands[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var $__6 = $__2.value,
        abstract = $__6.abstract,
        command = $__6.command;
    {
      app.bind(abstract, (function(app) {
        for (var args = [],
            $__3 = 1; $__3 < arguments.length; $__3++)
          args[$__3 - 1] = arguments[$__3];
        return new (Function.prototype.bind.apply(command, $traceurRuntime.spread([null], args)))();
      }));
    }
  }
}
function registerHandlers() {
  var app = (this).app;
  var handlers = app.config.get('handlers');
  for (var $__1 = handlers[Symbol.iterator](),
      $__2; !($__2 = $__1.next()).done; ) {
    var $__6 = $__2.value,
        abstract = $__6.abstract,
        handler = $__6.handler;
    {
      app.bindShared(abstract, (function(app) {
        for (var args = [],
            $__3 = 1; $__3 < arguments.length; $__3++)
          args[$__3 - 1] = arguments[$__3];
        return new (Function.prototype.bind.apply(handler, $traceurRuntime.spread([null, app], args)))();
      }));
    }
  }
}
function registerEventDispatcher() {
  var app = (this).app;
  var $__6 = app,
      events = $__6.events,
      logger = $__6.logger;
  app.bind('eventDispatcher', (function(app) {
    return new EventDispatcher(events, logger);
  }));
}
module.exports = CommandServiceProvider;


},{"Wildcat.Commander.CommandBus":22,"Wildcat.Commander.Events.EventDispatcher":27,"Wildcat.Support.ServiceProvider":48,"Wildcat.Support.helpers":49}],25:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = function CommanderTrait() {};
($traceurRuntime.createClass)(CommanderTrait, {
  execute: function(command, input) {
    var bus = this.getCommandBus();
    return bus.execute(command);
  },
  getCommandBus: function() {
    return this.app.make('commandBus');
  }
}, {});
var log = helpers.log;
module.exports = CommanderTrait;


},{"Wildcat.Support.helpers":49}],26:[function(require,module,exports){
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


},{}],27:[function(require,module,exports){
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


},{}],28:[function(require,module,exports){
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


},{}],29:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var EventListener = function EventListener() {};
($traceurRuntime.createClass)(EventListener, {handle: function(event) {
    var eventName = event.getName();
    var shortName = getShortname(eventName);
    var targetName = getTargetname(shortName);
    var isRegistered = isFunction(this[targetName]);
    if (isRegistered)
      return this[targetName](event);
  }}, {});
function getTargetname(shortName) {
  shortName = ucfirst(shortName);
  return ("on" + shortName);
}
function getShortname(eventName) {
  return lastSegment(eventName);
}
var $__1 = helpers,
    isFunction = $__1.isFunction,
    log = $__1.log,
    ucfirst = $__1.ucfirst,
    lastSegment = $__1.lastSegment;
module.exports = EventListener;


},{"Wildcat.Support.helpers":49}],30:[function(require,module,exports){
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


},{"Wildcat.Support.state":51}],31:[function(require,module,exports){
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
    var environment = _.environment;
    var $__2 = parseKey(key),
        namespace = $__2[0],
        group = $__2[1],
        item = $__2[2];
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


},{"Wildcat.Support.state":51}],32:[function(require,module,exports){
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
    if (isArray(abstract)) {
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
    var $__0 = this;
    if (this.abstract)
      return;
    Object.defineProperty(this, abstract, {
      get: (function() {
        return $__0.make(abstract);
      }),
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
var $__8 = helpers,
    keys = $__8.keys,
    implementIterator = $__8.implementIterator,
    isUndefined = $__8.isUndefined,
    isDefined = $__8.isDefined,
    defined = $__8.defined,
    arrayIterator = $__8.arrayIterator,
    extendProtoOf = $__8.extendProtoOf,
    noProto = $__8.noProto,
    isArray = $__8.isArray;
extendProtoOf(Container, EventEmitter);
implementIterator(Container);
module.exports = Container;


},{"Wildcat.Support.helpers":49,"Wildcat.Support.state":51,"events":54}],33:[function(require,module,exports){
(function (global){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var WindowServiceProvider = function WindowServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $WindowServiceProvider.prototype, arguments);
};
var $WindowServiceProvider = WindowServiceProvider;
($traceurRuntime.createClass)(WindowServiceProvider, {
  register: function() {
    var app = (this).app;
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
},{"Wildcat.Support.ServiceProvider":48}],34:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var AuthenticationError = errorConstructor('AuthenticationError', 'no way! authenticated');
module.exports = AuthenticationError;


},{"./errorConstructor":39}],35:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var ValidationError = require('Wildcat.Errors.ValidationError');
var TimeoutError = require('Wildcat.Errors.TimeoutError');
var AuthenticationError = require('Wildcat.Errors.AuthenticationError');
var NetworkError = require('Wildcat.Errors.NetworkError');
var ErrorServiceProvider = function ErrorServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $ErrorServiceProvider.prototype, arguments);
};
var $ErrorServiceProvider = ErrorServiceProvider;
($traceurRuntime.createClass)(ErrorServiceProvider, {
  register: function() {
    this.app.bindShared([['ValidationError', (function() {
      return ValidationError;
    })], ['AuthenticationError', (function() {
      return AuthenticationError;
    })], ['NetworkError', (function() {
      return NetworkError;
    })], ['TimeoutError', (function() {
      return TimeoutError;
    })]]);
  },
  provides: function() {
    return ['ValidationError', 'AuthenticationError', 'NetworkError', 'TimeoutError'];
  }
}, {}, ServiceProvider);
module.exports = ErrorServiceProvider;


},{"Wildcat.Errors.AuthenticationError":34,"Wildcat.Errors.NetworkError":36,"Wildcat.Errors.TimeoutError":37,"Wildcat.Errors.ValidationError":38,"Wildcat.Support.ServiceProvider":48}],36:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var NetworkError = errorConstructor('NetworkError', 'network problem');
module.exports = NetworkError;


},{"./errorConstructor":39}],37:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var TimeoutError = errorConstructor('TimeoutError', 'timeout error happened');
module.exports = TimeoutError;


},{"./errorConstructor":39}],38:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var ValidationError = errorConstructor('ValidationError', 'no way! validated');
module.exports = ValidationError;


},{"./errorConstructor":39}],39:[function(require,module,exports){
"use strict";
var $Error = Error;
var isArray = Array.isArray;
var $__2 = Object,
    keys = $__2.keys,
    defineProperties = $__2.defineProperties;
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
  var captureStackTrace = $Error.captureStackTrace;
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


},{}],40:[function(require,module,exports){
"use strict";
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var isString = require('Wildcat.Support.helpers').isString;
var Dispatcher = function Dispatcher(options) {
  this.app_ = options.app;
  EventEmitter2.call(this, options);
};
($traceurRuntime.createClass)(Dispatcher, {subscribe: function(subscriber) {
    subscriber = resolveSubscriber.call(this);
    subscriber.subscribe(this);
  }}, {}, EventEmitter2);
function resolveSubscriber(subscriber) {
  if (isString(subscriber)) {
    return this.app_[subscriber];
  }
  return subscriber;
}
module.exports = Dispatcher;


},{"Wildcat.Support.helpers":49,"eventemitter2":56}],41:[function(require,module,exports){
"use strict";
var Container = require('../../Wildcat/Container/Container');
var Config = require('../../Wildcat/Config/Repository');
var ModuleLoader = require('../../Wildcat/Config/ModuleLoader');
var Dispatcher = require('../../Wildcat/Events/Dispatcher');
var start = require('../../Wildcat/Foundation/start');
var ProviderRepository = require('../../Wildcat/Foundation/ProviderRepository');
var CommanderTrait = require('../../Wildcat/Commander/CommanderTrait');
var helpers = require('../../Wildcat/Support/helpers');
var config = require('../../../../config/config');
var value = require('../../Wildcat/Support/helpers').value;
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
    var dispatcherOptions = {
      app: app,
      newListener: true,
      wildcard: true
    };
    app.bindShared([['config', (function(app) {
      return new Config(configLoader, environment);
    })], ['events', (function(app) {
      return new Dispatcher(dispatcherOptions);
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
var extendProtoOf = helpers.extendProtoOf;
extendProtoOf(Application, CommanderTrait);
module.exports = Application;


},{"../../../../config/config":17,"../../Wildcat/Commander/CommanderTrait":25,"../../Wildcat/Config/ModuleLoader":30,"../../Wildcat/Config/Repository":31,"../../Wildcat/Container/Container":32,"../../Wildcat/Events/Dispatcher":40,"../../Wildcat/Foundation/ProviderRepository":42,"../../Wildcat/Foundation/start":43,"../../Wildcat/Support/helpers":49}],42:[function(require,module,exports){
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


},{}],43:[function(require,module,exports){
"use strict";
var Config = require('Wildcat.Config.Repository');
function start() {
  var app = this;
  var env = app.environment();
  app.bindShared('app', (function() {
    return app;
  }));
  app.registerCoreContainerBindings();
  var config = app.config;
  var providers = config.get('app').providers;
  app.getProviderRepository().load(app, providers);
}
module.exports = start;


},{"Wildcat.Config.Repository":31}],44:[function(require,module,exports){
(function (global){
"use strict";
var TimeoutError = require('Wildcat.Errors.TimeoutError');
var NetworkError = require('Wildcat.Errors.NetworkError');
var helpers = require('Wildcat.Support.helpers');
var XHRLoader = function XHRLoader(XMLHttpRequest) {
  this.Xhr_ = XMLHttpRequest || global.XMLHttpRequest;
};
($traceurRuntime.createClass)(XHRLoader, {
  send: function(method, $__2) {
    var $__4,
        $__5,
        $__6;
    var $__3 = $__2,
        url = $__3.url,
        timeout = ($__4 = $__3.timeout) === void 0 ? 5000 : $__4,
        headers = ($__5 = $__3.headers) === void 0 ? {} : $__5,
        responseType = ($__6 = $__3.responseType) === void 0 ? 'json' : $__6;
    var xhr = new this.Xhr_();
    var promise = new Promise((function(resolve, reject) {
      xhr.open(method, url);
      if (responseType === 'json') {
        xhr.setRequestHeader('Accept', 'application/json');
      }
      entries(headers).forEach((function(entry) {
        var $__7;
        return ($__7 = xhr).setRequestHeader.apply($__7, $traceurRuntime.spread(entry));
      }));
      assign(xhr, {
        resolve: resolve,
        reject: reject,
        responseType: responseType,
        timeout: timeout,
        onload: onload,
        ontimeout: ontimeout,
        onerror: onerror
      }).send();
    }));
    promise.cancel = xhr.abort.bind(xhr);
    return promise;
  },
  get: function() {
    var $__7;
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    return ($__7 = this).send.apply($__7, $traceurRuntime.spread(['GET'], args));
  }
}, {});
function onload($__2) {
  var xhr = $__2.target;
  var $__4 = xhr,
      response = $__4.response,
      status = $__4.status,
      statusText = $__4.statusText,
      resolve = $__4.resolve;
  if (isString(response) && xhr.responseType === 'json')
    response = JSON.parse(response);
  resolve(response);
}
function ontimeout($__2) {
  var reject = $__2.target.reject;
  var timeoutError = new TimeoutError();
  reject(timeoutError);
}
function onerror($__2) {
  var xhr = $__2.target;
  var $__4 = xhr,
      response = $__4.response,
      status = $__4.status,
      reject = $__4.reject;
  var networkError = new NetworkError();
  reject(networkError);
}
var $__2 = helpers,
    log = $__2.log,
    error = $__2.error,
    isString = $__2.isString,
    assign = $__2.assign,
    entries = $__2.entries;
module.exports = XHRLoader;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Errors.NetworkError":36,"Wildcat.Errors.TimeoutError":37,"Wildcat.Support.helpers":49}],45:[function(require,module,exports){
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
},{"Wildcat.Support.state":51}],46:[function(require,module,exports){
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


},{"Wildcat.Log.ConsoleLogger":45,"Wildcat.Support.ServiceProvider":48}],47:[function(require,module,exports){
"use strict";
var helpers = require('./helpers');
var Collection = function Collection(items) {
  if (!isArray(items)) {
    throw new TypeError('collection object must be created with an array');
  }
  this.items_ = items;
};
($traceurRuntime.createClass)(Collection, {
  getItems: function() {
    return this.items_;
  },
  forEach: function(cb, context) {
    var $__0 = this;
    context = defined(context, this);
    return this.getItems().forEach((function(value, key) {
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
  map: function(cb, context) {
    var $__0 = this;
    context = defined(context, this);
    return this.getItems().map((function(value, key) {
      return cb.call(context, value, key, $__0);
    }));
  },
  toJson: function() {
    var items = this.getItems();
    return JSON.stringify(items);
  },
  get length() {
    return this.items_.length;
  }
}, {});
var $__2 = helpers,
    isArray = $__2.isArray,
    defined = $__2.defined;
module.exports = Collection;


},{"./helpers":49}],48:[function(require,module,exports){
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


},{"Wildcat.Support.state":51}],49:[function(require,module,exports){
(function (global){
"use strict";
var $console = global.console;
var $setTimeout = global.setTimeout;
function keys(object) {
  if (object instanceof Map) {
    var result = [];
    object.forEach((function(value, key) {
      result.push(key);
    }));
    return result;
  }
  return Object.keys(object);
}
function values() {
  var object = arguments[0] !== (void 0) ? arguments[0] : {};
  if (object instanceof Map) {
    var result = [];
    object.forEach((function(value, key) {
      result.push(value);
    }));
    return result;
  }
  return keys(object).map((function(key) {
    return object[key];
  }));
}
function entries() {
  var object = arguments[0] !== (void 0) ? arguments[0] : {};
  if (object instanceof Map) {
    var result = [];
    object.forEach((function(value, key) {
      result.push([key, value]);
    }));
    return result;
  }
  return keys(object).map((function(key) {
    return [key, object[key]];
  }));
}
function assign(target) {
  var $__11;
  for (var sources = [],
      $__4 = 1; $__4 < arguments.length; $__4++)
    sources[$__4 - 1] = arguments[$__4];
  var source,
      temp,
      props,
      prop;
  for (var $__2 = sources[Symbol.iterator](),
      $__3; !($__3 = $__2.next()).done; ) {
    source = $__3.value;
    {
      if (isArray(source)) {
        temp = {};
        ($__11 = source, source = $__11[0], props = Array.prototype.slice.call($__11, 1), $__11);
        for (var $__0 = props[Symbol.iterator](),
            $__1; !($__1 = $__0.next()).done; ) {
          prop = $__1.value;
          temp[prop] = source[prop];
        }
        assign(target, temp);
      } else
        Object.assign(target, source);
    }
  }
  return target;
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
  return typeof val === 'string';
}
function isFunction(val) {
  return typeof val === 'function';
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
  for (var args = [],
      $__5 = 1; $__5 < arguments.length; $__5++)
    args[$__5 - 1] = arguments[$__5];
  return new Promise((function(resolve, reject) {
    setTimeout((function() {
      resolve.apply(null, $traceurRuntime.spread(args));
    }), time);
  }));
}
function log() {
  var $__12;
  for (var args = [],
      $__6 = 0; $__6 < arguments.length; $__6++)
    args[$__6] = arguments[$__6];
  ($__12 = $console).log.apply($__12, $traceurRuntime.spread(args));
}
function dir() {
  var $__12;
  for (var args = [],
      $__7 = 0; $__7 < arguments.length; $__7++)
    args[$__7] = arguments[$__7];
  ($__12 = $console).dir.apply($__12, $traceurRuntime.spread(args));
}
function error() {
  var $__12;
  for (var args = [],
      $__8 = 0; $__8 < arguments.length; $__8++)
    args[$__8] = arguments[$__8];
  ($__12 = $console).error.apply($__12, $traceurRuntime.spread(args));
}
function warn() {
  var $__12;
  for (var args = [],
      $__9 = 0; $__9 < arguments.length; $__9++)
    args[$__9] = arguments[$__9];
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
function asyncMethods(object) {
  for (var methods = [],
      $__10 = 1; $__10 < arguments.length; $__10++)
    methods[$__10 - 1] = arguments[$__10];
  for (var $__0 = methods[Symbol.iterator](),
      $__1; !($__1 = $__0.next()).done; ) {
    var method = $__1.value;
    {
      object[method] = async(object[method]);
    }
  }
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
function mapFrom() {
  var object = arguments[0] !== (void 0) ? arguments[0] : {};
  if (object instanceof Map)
    return object;
  var map = new Map();
  var objectKeys = keys(object);
  return objectKeys.reduce((function(result, key) {
    var value = object[key];
    map.set(key, value);
    return map;
  }), map);
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
  var segments = array.split('.');
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],50:[function(require,module,exports){
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
},{"observe-js":57}],51:[function(require,module,exports){
(function (global){
"use strict";
var $__1 = require('Wildcat.Support.helpers'),
    isUndefined = $__1.isUndefined,
    log = $__1.log,
    noProto = $__1.noProto,
    isString = $__1.isString;
var observe = require('Wildcat.Support.observe');
var $__2 = observe,
    ObjectObserver = $__2.ObjectObserver,
    Platform = $__2.Platform;
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
function onObserve($__3, added, removed, changed, getOldValueFn) {
  var $__4 = $__3,
      _ = $__4._,
      cbs = $__4.cbs;
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
},{"Wildcat.Support.helpers":49,"Wildcat.Support.observe":50}],52:[function(require,module,exports){
"use strict";
var state = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = require('Wildcat.Commander.CommanderTrait');
var EventListener = require('Wildcat.Commander.Events.EventListener');
var $__3 = observe,
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
}, {}, EventListener);
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
var $__4 = helpers,
    log = $__4.log,
    extendProtoOf = $__4.extendProtoOf;
extendProtoOf(View, CommanderTrait);
module.exports = View;


},{"Wildcat.Commander.CommanderTrait":25,"Wildcat.Commander.Events.EventListener":29,"Wildcat.Support.helpers":49,"Wildcat.Support.observe":50,"Wildcat.Support.state":51}],53:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');
var ViewServiceProvider = function ViewServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $ViewServiceProvider.prototype, arguments);
};
var $ViewServiceProvider = ViewServiceProvider;
($traceurRuntime.createClass)(ViewServiceProvider, {register: function() {
    var app = (this).app;
    var views = app.config.get('views');
    for (var $__1 = views[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var $__4 = $__2.value,
          abstract = $__4.abstract,
          $constructor = $__4.$constructor,
          build = $__4.build;
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


},{"Wildcat.Support.ServiceProvider":48,"Wildcat.View.View":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

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

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
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
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
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

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
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

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
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
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
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

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

},{}],57:[function(require,module,exports){
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
},{}],58:[function(require,module,exports){
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
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
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
  var $__2 = $traceurRuntime,
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
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
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
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
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
  var $__3 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__3.isObject,
      maybeAddIterator = $__3.maybeAddIterator,
      registerPolyfill = $__3.registerPolyfill;
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
      for (var $__5 = iterable[Symbol.iterator](),
          $__6; !($__6 = $__5.next()).done; ) {
        var $__7 = $__6.value,
            key = $__7[0],
            value = $__7[1];
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
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__8() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
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
      }, $__8, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__9() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
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
      }, $__9, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__10() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
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
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__7 = global,
        Object = $__7.Object,
        Symbol = $__7.Symbol;
    if (!global.Map)
      global.Map = Map;
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Set";
  var $__11 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__11.isObject,
      maybeAddIterator = $__11.maybeAddIterator,
      registerPolyfill = $__11.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map;
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
      for (var $__15 = iterable[Symbol.iterator](),
          $__16; !($__16 = $__15.next()).done; ) {
        var item = $__16.value;
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
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__13 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__13);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__18() {
      var $__19,
          $__20;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__19 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__20.done) ? 3 : 2;
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
      var $__22,
          $__23;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__22 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__23.done) ? 3 : 2;
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
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__17 = global,
        Object = $__17.Object,
        Symbol = $__17.Symbol;
    if (!global.Set)
      global.Set = Set;
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set" + '');
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
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill;
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
        return new this((function(resolve, reject) {
          reject(r);
        }));
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
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__29;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator";
  var $__27 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__27.createIteratorResultObject,
      isObject = $__27.isObject;
  var $__30 = $traceurRuntime,
      hasOwnProperty = $__30.hasOwnProperty,
      toProperty = $__30.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
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
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/String";
  var createStringIterator = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator;
  var $__32 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__32.maybeAddFunctions,
      maybeAddIterator = $__32.maybeAddIterator,
      registerPolyfill = $__32.registerPolyfill;
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
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__36;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator";
  var $__34 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      toObject = $__34.toObject,
      toUint32 = $__34.toUint32,
      createIteratorResultObject = $__34.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
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
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Array";
  var $__37 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"),
      entries = $__37.entries,
      keys = $__37.keys,
      values = $__37.values;
  var $__38 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      checkIterable = $__38.checkIterable,
      isCallable = $__38.isCallable,
      isConstructor = $__38.isConstructor,
      maybeAddFunctions = $__38.maybeAddFunctions,
      maybeAddIterator = $__38.maybeAddIterator,
      registerPolyfill = $__38.registerPolyfill,
      toInteger = $__38.toInteger,
      toLength = $__38.toLength,
      toObject = $__38.toObject;
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
      for (var $__39 = items[Symbol.iterator](),
          $__40; !($__40 = $__39.next()).done; ) {
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
  function of() {
    for (var items = [],
        $__41 = 0; $__41 < arguments.length; $__41++)
      items[$__41] = arguments[$__41];
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
  function polyfillArray(global) {
    var $__42 = global,
        Array = $__42.Array,
        Object = $__42.Object,
        Symbol = $__42.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Object";
  var $__43 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__43.maybeAddFunctions,
      registerPolyfill = $__43.registerPolyfill;
  var $__44 = $traceurRuntime,
      defineProperty = $__44.defineProperty,
      getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__44.getOwnPropertyNames,
      keys = $__44.keys,
      privateNames = $__44.privateNames;
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
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Number";
  var $__46 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isNumber = $__46.isNumber,
      maybeAddConsts = $__46.maybeAddConsts,
      maybeAddFunctions = $__46.maybeAddFunctions,
      registerPolyfill = $__46.registerPolyfill,
      toInteger = $__46.toInteger;
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
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number" + '');
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
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":55}]},{},[14])(14)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9JbnRyb1ZpZXcuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLmpzIiwiYXBwL0NvbW1hbmRzL1JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHQuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHRDb2xsZWN0aW9uLmpzIiwiYXBwL0VudGl0aWVzL0JsdWVsaWdodHMvRXZlbnRzL0JsdWVsaWdodHNEZWxpdmVyZWQuanMiLCJhcHAvRW50aXRpZXMvUmVwb3J0cy9FdmVudHMvUmVwb3J0V2FzUG9zdGVkLmpzIiwiYXBwL0VudGl0aWVzL1JlcG9ydHMvUmVwb3J0LmpzIiwiYXBwL1Byb3ZpZGVycy9BcHBTZXJ2aWNlUHJvdmlkZXIuanMiLCJhcHAvUmVwb3NpdG9yaWVzL0JsdWVsaWdodFJlcG9zaXRvcnkuanMiLCJhcHAvUmVwb3NpdG9yaWVzL1JlcG9ydFJlcG9zaXRvcnkuanMiLCJhcHAvbWFpbi5qcyIsImNvbmZpZy9hcHAuanMiLCJjb25maWcvY29tbWFuZHMuanMiLCJjb25maWcvY29uZmlnLmpzIiwiY29uZmlnL2hhbmRsZXJzLmpzIiwiY29uZmlnL2xvY2FsL2FwcC5qcyIsImNvbmZpZy90ZXN0aW5nL2FwcC5qcyIsImNvbmZpZy92aWV3cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEJ1cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEhhbmRsZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRlclRyYWl0LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRGlzcGF0Y2hhYmxlVHJhaXQuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudEdlbmVyYXRvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50TGlzdGVuZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29uZmlnL01vZHVsZUxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db25maWcvUmVwb3NpdG9yeS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db250YWluZXIvQ29udGFpbmVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0RPTS9XaW5kb3dTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0F1dGhlbnRpY2F0aW9uRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0Vycm9yU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9OZXR3b3JrRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL1RpbWVvdXRFcnJvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9FcnJvcnMvVmFsaWRhdGlvbkVycm9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9lcnJvckNvbnN0cnVjdG9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0V2ZW50cy9EaXNwYXRjaGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0ZvdW5kYXRpb24vQXBwbGljYXRpb24uanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9Qcm92aWRlclJlcG9zaXRvcnkuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9zdGFydC5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2FkZXJzL1hIUkxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvQ29uc29sZUxvZ2dlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvTG9nU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvQ29sbGVjdGlvbi5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9vYnNlcnZlLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvc3RhdGUuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvVmlldy9WaWV3LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1ZpZXcvVmlld1NlcnZpY2VQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIyL2xpYi9ldmVudGVtaXR0ZXIyLmpzIiwibm9kZV9tb2R1bGVzL29ic2VydmUtanMvc3JjL29ic2VydmUuanMiLCJub2RlX21vZHVsZXMvdHJhY2V1ci9iaW4vdHJhY2V1ci1ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxJQUFH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Sjs7RUFDSixNQWpCOEIsZ0JBQWM7QUFvQmhELEtBQUssUUFBUSxFQUFJLG9CQUFrQixDQUFDO0FBQUE7OztBQ3ZCcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBWaWV3ID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXcnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciB7bG9nLCBlcnJvcn0gPSBoZWxwZXJzO1xuXG5jbGFzcyBJbnRyb1ZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIge2V2ZW50c30gPSBhcHA7XG5cbiAgICAgICAgZXZlbnRzLm9uKCdyZXBvcnRXYXNQb3N0ZWQnLCBlID0+IGxvZyhlLnR5cGUsIGUpKTsgXG4gICAgfVxuICAgIHBvc3RSZXBvcnQobmFtZSwgaW5jaWRlbnQpIHtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIgY29tbWFuZCA9IGFwcC5tYWtlKCdwb3N0UmVwb3J0Q29tbWFuZCcsIFtuYW1lLCBpbmNpZGVudF0pOyAgICAgXG4gICAgICAgIHRoaXMuZXhlY3V0ZShjb21tYW5kKTsgXG4gICAgfVxuICAgIGdldEJsdWVsaWdodHMoKSB7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIGNvbW1hbmQgPSBhcHAubWFrZSgncmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCcpO1xuXG4gICAgICAgIHRoaXMuZXhlY3V0ZShjb21tYW5kKVxuICAgICAgICAgICAgLnRoZW4oY29sbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgbG9nKGBnb3QgaXQgZnJvbSB0aGVuYWJsZSBgLCBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGVycm9yKCdnb3QgaXQgZnJvbSBjYXRjaGFibGUnLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb25CbHVlbGlnaHRzRGVsaXZlcmVkKHt2YWx1ZTogY29sbGVjdGlvbn0pIHtcblxuICAgICAgICBsb2coYHdoZW5CbHVlbGlnaHRzRGVsaXZlcmVkYCk7XG4gICAgfVxuICAgIG9uRmFpbFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQoZXJyKSB7XG5cbiAgICAgICAgZXJyb3IoYG9uRmFpbFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRgLCBlcnIpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1ZpZXc7IiwiXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbmNpZGVudCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5jaWRlbnQgPSBpbmNpZGVudDtcbiAgICB9XG4gICAgc3RhdGljIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdwb3N0UmVwb3J0Q29tbWFuZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RSZXBvcnRDb21tYW5kOyIsInZhciBDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRIYW5kbGVyJyk7XG52YXIgaGVscGVycyAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXIgZXh0ZW5kcyBDb21tYW5kSGFuZGxlciB7XG5cbiAgICBoYW5kbGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB7bmFtZSwgaW5jaWRlbnR9ID0gY29tbWFuZDtcbiAgICAgICAgdmFyIHthcHB9ID0gJHRoaXM7XG4gICAgICAgIHZhciBSZXBvcnQgPSBhcHAubWFrZSgnUmVwb3J0Jyk7XG4gICAgICAgIFxuICAgICAgICBhc3luYyhmdW5jdGlvbiogKCkge1xuXG4gICAgICAgICAgICB2YXIgcmVwb3J0ID0geWllbGQgUmVwb3J0LnBvc3QobmFtZSwgaW5jaWRlbnQpO1xuICAgICAgICAgICAgJHRoaXMuZGlzcGF0Y2hFdmVudHNGb3IocmVwb3J0KTtcblxuICAgICAgICB9KSgpLmNhdGNoKHRlcm1pbmF0ZUVycm9yKTtcbiAgICB9XG59XG5cbnZhciB7dGVybWluYXRlRXJyb3IsIGFzeW5jLCBsb2d9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXI7IiwiXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ2FwcC5yZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kJztcbiAgICB9XG4gICAgc3RhdGljIGdldFNob3J0TmFtZSgpIHtcblxuICAgIFx0cmV0dXJuIGxhc3RTZWdtZW50KCB0aGlzLmdldE5hbWUoKSApO1xuICAgIH1cbn1cblxudmFyIHthc3NpZ24sIGxhc3RTZWdtZW50fSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZDsiLCJ2YXIgQ29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kSGFuZGxlcicpO1xudmFyIGhlbHBlcnMgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIgZXh0ZW5kcyBDb21tYW5kSGFuZGxlciB7XG5cbiAgICAqaGFuZGxlKGNvbW1hbmQpIHtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIge0JsdWVsaWdodCwgZXZlbnRzfSA9IGFwcDtcbiAgICAgICAgdmFyIGNvbW1hbmROYW1lICA9IGNvbW1hbmQuY29uc3RydWN0b3IuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgdmFyIGJsdWVsaWdodCA9IHlpZWxkIEJsdWVsaWdodC5nZXQoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudHNGb3IoYmx1ZWxpZ2h0KTsgICBcbiAgICAgICAgICAgIHJldHVybiBibHVlbGlnaHQuY29sbGVjdGlvbjtcblxuICAgICAgICB9IGNhdGNoKGVycikge1xuXG4gICAgICAgICAgICBldmVudHMuZW1pdChjb21tYW5kTmFtZSwgZXJyKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHthc3luY01ldGhvZHN9ID0gaGVscGVycztcblxuYXN5bmNNZXRob2RzKFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyLnByb3RvdHlwZSwgJ2hhbmRsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyOyIsInZhciBFdmVudEdlbmVyYXRvciA9IHJlcXVpcmUoJy4uLy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50R2VuZXJhdG9yJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIEJsdWVsaWdodCB7XG5cblx0Ly8gdXNlcyBFdmVudEdlbmVyYXRvclxuXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGluY2lkZW50KSB7IFxuXG5cdCAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgdGhpcy5pbmNpZGVudCA9IGluY2lkZW50O1xuXHQgICAgRXZlbnRHZW5lcmF0b3IuY2FsbCh0aGlzKTtcblx0fVxuXHRzdGF0aWMgKmdldCguLi5hcmdzKSB7XG5cblx0XHR2YXIgYXBwID0gdGhpcy5nZXRBcHBsaWNhdGlvbigpO1xuXHRcdHZhciB7Ymx1ZWxpZ2h0UmVwb3NpdG9yeSwgYmx1ZWxpZ2h0fSA9IGFwcDtcblxuXHRcdHZhciBjb2xsZWN0aW9uID0geWllbGQgYmx1ZWxpZ2h0UmVwb3NpdG9yeS5nZXQoKTtcblx0XHRibHVlbGlnaHQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cdFx0XG5cdFx0dmFyIGV2ZW50ID0gYXBwLm1ha2UoJ2JsdWVsaWdodHNEZWxpdmVyZWQnLCBbY29sbGVjdGlvbl0pO1xuXHRcdHJldHVybiBibHVlbGlnaHQucmFpc2UoZXZlbnQpO1xuXHR9XG5cdHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuXHQgICAgcmV0dXJuIHRoaXMuYXBwXztcblx0fVxuXHRzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cblx0ICAgIHRoaXMuYXBwXyA9IGFwcDtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9XG59XG5cbnZhciB7bG9nLCBleHRlbmRQcm90b09mLCB3YWl0LCBhc3luY01ldGhvZHN9ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihCbHVlbGlnaHQsIEV2ZW50R2VuZXJhdG9yKTtcbmFzeW5jTWV0aG9kcyhCbHVlbGlnaHQsICdnZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCbHVlbGlnaHQ7IiwiLy8gQmx1ZWxpZ2h0Q29sbGVjdGlvbi5qc1xuXG52YXIgQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5Db2xsZWN0aW9uJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uLy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcblxuLy8gdmFyIEV2ZW50R2VuZXJhdG9yID0gcmVxdWlyZSgnLi4vLi4vLi4vZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRXZlbnRHZW5lcmF0b3InKTtcblxuY2xhc3MgQmx1ZWxpZ2h0Q29sbGVjdGlvbiBleHRlbmRzIENvbGxlY3Rpb24ge1xuXG5cdC8vIHVzZXMgRXZlbnRHZW5lcmF0b3JcblxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncylcblx0XHQvLyBFdmVudEdlbmVyYXRvci5jYWxsKHRoaXMpO1xuXHR9XG5cdC8vIHN0YXRpYyAqZ2V0KC4uLmFyZ3MpIHtcblxuXHQvLyBcdHZhciByZXN1bHQgPSB5aWVsZCB3YWl0KDAsIFs1LDMsMl0pO1xuXHQvLyBcdHJldHVybiBuZXcgQmx1ZWxpZ2h0Q29sbGVjdGlvbihyZXN1bHQpO1xuXHQvLyB9XG5cdHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuXHQgICAgcmV0dXJuIHRoaXMuYXBwXztcblx0fVxuXHRzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cblx0ICAgIHRoaXMuYXBwXyA9IGFwcDtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9XG59XG5cbnZhciB7ZXh0ZW5kUHJvdG9PZiwgLyphc3luY01ldGhvZHMsICovd2FpdH0gPSBoZWxwZXJzO1xuXG4vLyBleHRlbmRQcm90b09mKEJsdWVsaWdodENvbGxlY3Rpb24sIEV2ZW50R2VuZXJhdG9yKTtcbi8vIGFzeW5jTWV0aG9kcyhCbHVlbGlnaHRDb2xsZWN0aW9uLCAnZ2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmx1ZWxpZ2h0Q29sbGVjdGlvbjsiLCIvLyBCbHVlbGlnaHRzRGVsaXZlcmVkLmpzXG5cblxuY2xhc3MgQmx1ZWxpZ2h0c0RlbGl2ZXJlZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihibHVlbGlnaHRDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGJsdWVsaWdodENvbGxlY3Rpb247XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdhcHAuYmx1ZWxpZ2h0c0RlbGl2ZXJlZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJsdWVsaWdodHNEZWxpdmVyZWQ7IiwiXG5jbGFzcyBSZXBvcnRXYXNQb3N0ZWQge1xuXG4gICAgY29uc3RydWN0b3IocmVwb3J0KSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHJlcG9ydDtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5nZXROYW1lKCk7XG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ3JlcG9ydFdhc1Bvc3RlZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9ydFdhc1Bvc3RlZDsiLCJ2YXIgRXZlbnRHZW5lcmF0b3IgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5FdmVudHMuRXZlbnRHZW5lcmF0b3InKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcblxuY2xhc3MgUmVwb3J0IHtcblxuICAgIC8vIHVzZXMgRXZlbnRHZW5lcmF0b3JcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGluY2lkZW50KSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmNpZGVudCA9IGluY2lkZW50O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBzdGF0aWMgKnBlcnNpc3QocmVwb3J0KSB7XG5cbiAgICAgICAgdmFyIG15TmFtZSA9IHRoaXMubXlOYW1lKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBoZXkgcmVwb3J0IDE6ICR7bXlOYW1lfWApO1xuICAgICAgICB2YXIgc2F2ZWRSZXBvcnQgPSB5aWVsZCB3YWl0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXkgcmVwb3J0IDInKTtcbiAgICAgICAgeWllbGQgd2FpdCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGV5IHJlcG9ydCAzJyk7XG4gICAgICAgIHJldHVybiAnaSBhbSBkb25lISc7XG4gICAgfVxuICAgIHN0YXRpYyBteU5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICd3ZWlyZE5hbWUnO1xuICAgIH1cbiAgICBzdGF0aWMgKnBvc3QoLi4uYXJncykge1xuXG4gICAgICAgIHZhciBhcHAgPSB0aGlzLmdldEFwcGxpY2F0aW9uKCk7XG4gICAgICAgIHZhciB7cmVwb3J0UmVwb3NpdG9yeX0gPSBhcHA7XG5cbiAgICAgICAgdmFyIHJlcG9ydCA9IGFwcC5tYWtlKCdyZXBvcnQnLCBhcmdzKTtcbiAgICAgICAgcmVwb3J0ID0geWllbGQgcmVwb3J0UmVwb3NpdG9yeS5zYXZlKHJlcG9ydCk7XG5cbiAgICAgICAgdmFyIGV2ZW50ID0gYXBwLm1ha2UoJ3JlcG9ydFdhc1Bvc3RlZCcsIFtyZXBvcnRdKTtcbiAgICAgICAgcmV0dXJuIHJlcG9ydC5yYWlzZShldmVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHBfO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHBfID0gYXBwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxudmFyIHtsb2csIGV4dGVuZFByb3RvT2YsIHdhaXQsIGFzeW5jTWV0aG9kc30gPSBoZWxwZXJzO1xuZXh0ZW5kUHJvdG9PZihSZXBvcnQsIEV2ZW50R2VuZXJhdG9yKTtcbmFzeW5jTWV0aG9kcyhSZXBvcnQsICdwZXJzaXN0JywgJ3Bvc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnQ7IiwidmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcblxudmFyIFJlcG9ydCA9IHJlcXVpcmUoJ0FwcC5FbnRpdGllcy5SZXBvcnRzLlJlcG9ydCcpO1xudmFyIFJlcG9ydFdhc1Bvc3RlZCAgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuUmVwb3J0cy5FdmVudHMuUmVwb3J0V2FzUG9zdGVkJyk7XG52YXIgUmVwb3J0UmVwb3NpdG9yeSA9IHJlcXVpcmUoJ0FwcC5SZXBvc2l0b3JpZXMuUmVwb3J0UmVwb3NpdG9yeScpO1xuXG52YXIgQmx1ZWxpZ2h0ICAgICAgICAgICA9IHJlcXVpcmUoJ0FwcC5FbnRpdGllcy5CbHVlbGlnaHRzLkJsdWVsaWdodCcpO1xudmFyIEJsdWVsaWdodENvbGxlY3Rpb24gPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuQmx1ZWxpZ2h0cy5CbHVlbGlnaHRDb2xsZWN0aW9uJyk7XG52YXIgQmx1ZWxpZ2h0UmVwb3NpdG9yeSA9IHJlcXVpcmUoJ0FwcC5SZXBvc2l0b3JpZXMuQmx1ZWxpZ2h0UmVwb3NpdG9yeScpO1xudmFyIEJsdWVsaWdodHNEZWxpdmVyZWQgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuQmx1ZWxpZ2h0cy5FdmVudHMuQmx1ZWxpZ2h0c0RlbGl2ZXJlZCcpO1xuXG52YXIgWEhSTG9hZGVyID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2FkZXJzLlhIUkxvYWRlcicpO1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIEFwcFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICBib290KCkge1xuXG4gICAgfVxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICAvLyBUaGlzIHNlcnZpY2UgcHJvdmlkZXIgaXMgYSBjb252ZW5pZW50IHBsYWNlIHRvIHJlZ2lzdGVyIHlvdXIgc2VydmljZXNcbiAgICAgICAgLy8gaW4gdGhlIElvQyBjb250YWluZXIuXG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckVudGl0aWVzLmNhbGwodGhpcyk7XG4gICAgICAgIHJlZ2lzdGVyUmVwb3NpdG9yaWVzLmNhbGwodGhpcyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWdpc3RlckVudGl0aWVzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcblxuICAgIC8vIFJlcG9ydFxuICAgIGFwcC5iaW5kU2hhcmVkKCdSZXBvcnQnLCBhcHAgPT4gUmVwb3J0LnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdyZXBvcnQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgYXBwLlJlcG9ydCguLi5hcmdzKTtcbiAgICB9KTtcbiAgICBhcHAuYmluZCgncmVwb3J0V2FzUG9zdGVkJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9ydFdhc1Bvc3RlZCguLi5hcmdzKTtcbiAgICB9KTtcblxuICAgIC8vIEJsdWVsaWdodFxuICAgIGFwcC5iaW5kU2hhcmVkKCdCbHVlbGlnaHQnLCBhcHAgPT4gQmx1ZWxpZ2h0LnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgYXBwLkJsdWVsaWdodCguLi5hcmdzKTtcbiAgICB9KTtcbiAgICBhcHAuYmluZFNoYXJlZCgnQmx1ZWxpZ2h0Q29sbGVjdGlvbicsIGFwcCA9PiBCbHVlbGlnaHRDb2xsZWN0aW9uLnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHRDb2xsZWN0aW9uJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoICEgYXJncy5sZW5ndGgpIGFyZ3MgPSBbW11dO1xuICAgICAgICByZXR1cm4gbmV3IGFwcC5CbHVlbGlnaHRDb2xsZWN0aW9uKC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHRzRGVsaXZlcmVkJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEJsdWVsaWdodHNEZWxpdmVyZWQoLi4uYXJncyk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlclJlcG9zaXRvcmllcygpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG5cbiAgICBhcHAuYmluZFNoYXJlZCgncmVwb3J0UmVwb3NpdG9yeScsIGFwcCA9PiBuZXcgUmVwb3J0UmVwb3NpdG9yeShhcHApKTtcblxuICAgIGFwcC5iaW5kKCd4aHJMb2FkZXInLCBhcHAgPT4gbmV3IFhIUkxvYWRlcik7XG4gICAgYXBwLmJpbmRTaGFyZWQoJ2JsdWVsaWdodFJlcG9zaXRvcnknLCBhcHAgPT4ge1xuICAgICAgICB2YXIgeGhyTG9hZGVyID0gYXBwLnhockxvYWRlcjtcbiAgICAgICAgcmV0dXJuIG5ldyBCbHVlbGlnaHRSZXBvc2l0b3J5KGFwcCwgeGhyTG9hZGVyKTtcbiAgICB9KTtcbn1cblxudmFyIHtsb2d9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBTZXJ2aWNlUHJvdmlkZXI7IiwidmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuLi8uLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG5cbmNsYXNzIEJsdWVsaWdodFJlcG9zaXRvcnkge1xuXG4gICAgY29uc3RydWN0b3IoYXBwLCBsb2FkZXIpIHtcblxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gICAgfVxuICAgICpnZXQoKSB7XG5cbiAgICBcdHZhciB7YXBwLCBsb2FkZXIsIGJhc2VVcmx9ID0gdGhpcztcbiAgICBcdHZhciB7Qmx1ZWxpZ2h0Q29sbGVjdGlvbn0gPSBhcHA7XG4gICAgXHR2YXIgdXJsID0gYCR7YmFzZVVybH1ibHVlbGlnaHRzYDtcblxuICAgIFx0dmFyIHtmZWF0dXJlc30gPSB5aWVsZCBsb2FkZXIuZ2V0KHt1cmwsIHRpbWVvdXQ6IDEwMDAwfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBCbHVlbGlnaHRDb2xsZWN0aW9uKGZlYXR1cmVzKTtcbiAgICB9XG4gICAgZ2V0IGJhc2VVcmwoKSB7XG5cbiAgICBcdHZhciB7Y29uZmlnfSA9IHRoaXMuYXBwO1xuICAgIFx0cmV0dXJuIGNvbmZpZy5nZXQoJ2FwcCcpLmFwaUJhc2VVcmw7XG4gICAgfVxufVxuXG52YXIge2FzeW5jTWV0aG9kcywgbG9nfSA9IGhlbHBlcnM7XG5cbmFzeW5jTWV0aG9kcyhCbHVlbGlnaHRSZXBvc2l0b3J5LnByb3RvdHlwZSwgJ2dldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsdWVsaWdodFJlcG9zaXRvcnk7IiwidmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIFZhbGlkYXRpb25FcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLlZhbGlkYXRpb25FcnJvcicpO1xudmFyIEF1dGhlbnRpY2F0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5BdXRoZW50aWNhdGlvbkVycm9yJyk7XG5cbmNsYXNzIFJlcG9ydFJlcG9zaXRvcnkge1xuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxuICAgIHNhdmUocmVwb3J0KSB7XG5cbiAgICAgICAgbG9nKGBzYXZpbmcgcmVwb3J0LCBwbGVhc2Ugd2FpdOKApmApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdhaXQoKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gdGhyb3cgbmV3IEF1dGhlbnRpY2F0aW9uRXJyb3IoYGNyYWFwcHBwYCk7XG5cbiAgICAgICAgICAgIGxvZyhgcmVwb3J0IHNhdmVkLCB0aGFuayB5b3UuYCk7XG4gICAgICAgICAgICByZXR1cm4gcmVwb3J0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbnZhciB7bG9nLCB3YWl0fSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3J0UmVwb3NpdG9yeTsiLCJyZXF1aXJlKCd0cmFjZXVyL2Jpbi90cmFjZXVyLXJ1bnRpbWUnKTtcblxudmFyIEFwcCA9IHJlcXVpcmUoJy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9Gb3VuZGF0aW9uL0FwcGxpY2F0aW9uJyk7XG5cbi8vIGNvdWxkIGV4dGVuZCBBcHAsIHNvIGxlYXZlIHRoaXMgZmlsZTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG4vKlxuICogQXBwbGljYXRpb24gU2VydmljZSBQcm92aWRlcnMuLi5cbiAqL1xudmFyIEFwcFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ0FwcC5Qcm92aWRlcnMuQXBwU2VydmljZVByb3ZpZGVyJyk7XG5cbi8qXG4gKiBGcmFtZXdvcmsgU2VydmljZSBQcm92aWRlcnMuLi5cbiAqL1xudmFyIExvZ1NlcnZpY2VQcm92aWRlciAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuTG9nLkxvZ1NlcnZpY2VQcm92aWRlcicpO1xudmFyIFdpbmRvd1NlcnZpY2VQcm92aWRlciAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRE9NLldpbmRvd1NlcnZpY2VQcm92aWRlcicpO1xudmFyIEVycm9yUHJvdmlkZXIgICAgICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLkVycm9yU2VydmljZVByb3ZpZGVyJyk7XG52YXIgVmlld1NlcnZpY2VQcm92aWRlciAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXdTZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBDb21tYW5kZXJTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kU2VydmljZVByb3ZpZGVyJyk7XG5cbmZ1bmN0aW9uIGJyb3dzZXIoKSB7XG5cbiAgICBpZiAoZ2xvYmFsLm5hdmlnYXRvcikge1xuICAgICAgICByZXR1cm4gZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdub3QgZGV0ZXJtaW5lZCc7XG4gICAgfVxufVxuXG52YXIgY29uZmlnT2JqZWN0ID0ge1xuICAgIGFwaUJhc2VVcmw6ICdodHRwczovL2dvLmRvc2Eubm9ydGh3ZXN0ZXJuLmVkdS9udWhlbHBhcGkvYXBpLycsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvKlxuICAgICAgICAgKiBBcHBsaWNhdGlvbiBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICAgICAgICAgKi9cbiAgICAgICAgIEFwcFNlcnZpY2VQcm92aWRlcixcblxuICAgICAgICAvKlxuICAgICAgICAgKiBGcmFtZXdvcmsgU2VydmljZSBQcm92aWRlcnMuLi5cbiAgICAgICAgICovXG4gICAgICAgIExvZ1NlcnZpY2VQcm92aWRlcixcbiAgICAgICAgV2luZG93U2VydmljZVByb3ZpZGVyLFxuICAgICAgICBFcnJvclByb3ZpZGVyLFxuICAgICAgICBWaWV3U2VydmljZVByb3ZpZGVyLFxuICAgICAgICBDb21tYW5kZXJTZXJ2aWNlUHJvdmlkZXIsXG4gICAgXSxcbiAgICBsb2NhbGU6ICdlbicsXG4gICAgYnJvd3NlcjogYnJvd3NlcigpLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWdPYmplY3Q7IiwidmFyIFBvc3RSZXBvcnRDb21tYW5kID0gcmVxdWlyZSgnQXBwLkNvbW1hbmRzLlBvc3RSZXBvcnRDb21tYW5kJyk7XG52YXIgUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5SZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgYWJzdHJhY3Q6ICdwb3N0UmVwb3J0Q29tbWFuZCcsXG4gICAgICAgIGNvbW1hbmQgOiBQb3N0UmVwb3J0Q29tbWFuZCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYWJzdHJhY3Q6ICdyZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kJyxcbiAgICAgICAgY29tbWFuZCA6IFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQsXG4gICAgfSxcbl07IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2FwcCc6ICAgICAgICAgcmVxdWlyZSgnLi9hcHAnKSxcbiAgICAnbG9jYWwuYXBwJzogICByZXF1aXJlKCcuL2xvY2FsL2FwcCcpLFxuICAgICd0ZXN0aW5nLmFwcCc6IHJlcXVpcmUoJy4vdGVzdGluZy9hcHAnKSxcbiAgICAnY29tbWFuZHMnOiAgICByZXF1aXJlKCcuL2NvbW1hbmRzJyksXG4gICAgJ2hhbmRsZXJzJzogICAgcmVxdWlyZSgnLi9oYW5kbGVycycpLFxuICAgICd2aWV3cyc6ICAgICAgIHJlcXVpcmUoJy4vdmlld3MnKSxcbn07XG4iLCJ2YXIgUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnQXBwLkNvbW1hbmRzLlBvc3RSZXBvcnRDb21tYW5kSGFuZGxlcicpO1xudmFyIFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnQXBwLkNvbW1hbmRzLlJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAgIHtcbiAgICAgICAgYWJzdHJhY3Q6ICdwb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXInLFxuICAgICAgICBoYW5kbGVyIDogUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgICBhYnN0cmFjdDogJ3JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyJyxcbiAgICAgICAgaGFuZGxlciA6IFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyLFxuICAgIH0sXG5dOyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0YXBpQmFzZVVybDogJ2h0dHA6Ly9udWhlbHAuYXBpL2FwaS8nLFxuXHQvLyBhcGlCYXNlVXJsOiAnaHR0cHM6Ly9nby5kb3NhLm5vcnRod2VzdGVybi5lZHUvbnVoZWxwYXBpL2FwaS8nLFxuICAgIGRlYnVnOiB0cnVlLFxufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcbiAgICBhcGlCYXNlVXJsOiAnaHR0cDovL251aGVscC5hcGkvYXBpLycsXG4gICAgYnJvd3NlcjogJ2NvbnNvbGUnLFxufTsiLCJ2YXIgSW50cm9WaWV3ID0gcmVxdWlyZSgnQXBwLkJyb3dzZXIuVmlld3MuSW50cm9WaWV3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuXG4gICAge1xuICAgICAgICAnYWJzdHJhY3QnICAgIDogJ2ludHJvVmlldycsXG4gICAgICAgICckY29uc3RydWN0b3InOiBJbnRyb1ZpZXcsXG4gICAgICAgICdidWlsZCcgICAgICAgOiAnc2luZ2xldG9uJyxcbiAgICB9XG5cbl07IiwiXG5jbGFzcyBDb21tYW5kQnVzIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciBjb21tYW5kTmFtZSA9IGNvbW1hbmQuY29uc3RydWN0b3IuZ2V0U2hvcnROYW1lKCk7XG4gICAgICAgIHZhciBoYW5kbGVyTmFtZSA9IGAke2NvbW1hbmROYW1lfUhhbmRsZXJgO1xuICAgICAgICB2YXIgaGFuZGxlciAgICAgPSB0aGlzLmFwcC5tYWtlKGhhbmRsZXJOYW1lKTtcblxuICAgICAgICByZXR1cm4gaGFuZGxlci5oYW5kbGUoY29tbWFuZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRCdXM7IiwidmFyIERpc3BhdGNoYWJsZVRyYWl0ID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuRXZlbnRzLkRpc3BhdGNoYWJsZVRyYWl0Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIENvbW1hbmRIYW5kbGVyIHtcblxuICAgIC8vIHVzZXMgRGlzcGF0Y2hhYmxlVHJhaXRcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cbn1cblxudmFyIHtleHRlbmRQcm90b09mfSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQ29tbWFuZEhhbmRsZXIsIERpc3BhdGNoYWJsZVRyYWl0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kSGFuZGxlcjsiLCJ2YXIge2xvZ30gICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29tbWFuZEJ1cyAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZEJ1cycpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudERpc3BhdGNoZXInKTtcblxuY2xhc3MgQ29tbWFuZFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyQ29tbWFuZEJ1cy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlckNvbW1hbmRzLmNhbGwodGhpcyk7XG4gICAgICAgIHJlZ2lzdGVySGFuZGxlcnMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJFdmVudERpc3BhdGNoZXIuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tbWFuZEJ1cygpIHtcblxuICAgIHRoaXMuYXBwLmJpbmRTaGFyZWQoJ2NvbW1hbmRCdXMnLCBhcHAgPT4gbmV3IENvbW1hbmRCdXMoYXBwKSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckNvbW1hbmRzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICB2YXIgY29tbWFuZHMgPSBhcHAuY29uZmlnLmdldCgnY29tbWFuZHMnKTtcblxuICAgIGZvciAodmFyIHthYnN0cmFjdCwgY29tbWFuZH0gb2YgY29tbWFuZHMpIHtcbiAgICAgICAgXG4gICAgICAgIGFwcC5iaW5kKGFic3RyYWN0LCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGNvbW1hbmQoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcnMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVycyA9IGFwcC5jb25maWcuZ2V0KCdoYW5kbGVycycpO1xuXG4gICAgZm9yICh2YXIge2Fic3RyYWN0LCBoYW5kbGVyfSBvZiBoYW5kbGVycykge1xuICAgICAgICBcbiAgICAgICAgYXBwLmJpbmRTaGFyZWQoYWJzdHJhY3QsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgaGFuZGxlcihhcHAsIC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50RGlzcGF0Y2hlcigpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgdmFyIHtldmVudHMsIGxvZ2dlcn0gPSBhcHA7XG5cbiAgICBhcHAuYmluZCgnZXZlbnREaXNwYXRjaGVyJywgYXBwID0+IG5ldyBFdmVudERpc3BhdGNoZXIoZXZlbnRzLCBsb2dnZXIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kU2VydmljZVByb3ZpZGVyOyIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgQ29tbWFuZGVyVHJhaXQge1xuXG4gICAgZXhlY3V0ZShjb21tYW5kLCBpbnB1dCkge1xuXG4gICAgICAgIHZhciBidXMgPSB0aGlzLmdldENvbW1hbmRCdXMoKTtcbiAgICAgICAgcmV0dXJuIGJ1cy5leGVjdXRlKGNvbW1hbmQpO1xuICAgIH1cbiAgICBnZXRDb21tYW5kQnVzKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5tYWtlKCdjb21tYW5kQnVzJyk7XG4gICAgfVxufVxuXG52YXIge2xvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRlclRyYWl0OyIsIlxuY2xhc3MgRGlzcGF0Y2hhYmxlVHJhaXQge1xuXG4gICAgZGlzcGF0Y2hFdmVudHNGb3IoZW50aXR5KSB7XG5cbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSB0aGlzLmdldERpc3BhdGNoZXIoKTtcbiAgICAgICAgdmFyIGV2ZW50cyAgICAgPSBlbnRpdHkucmVsZWFzZUV2ZW50cygpO1xuXG4gICAgICAgIGRpc3BhdGNoZXIuZGlzcGF0Y2goZXZlbnRzKTtcbiAgICB9XG4gICAgZ2V0RGlzcGF0Y2hlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHAuZXZlbnREaXNwYXRjaGVyO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGFibGVUcmFpdDsiLCJcbmNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihldmVudHMsIGxvZykge1xuXG4gICAgICAgIHRoaXMuZXZlbnRzXyA9IGV2ZW50cztcbiAgICAgICAgdGhpcy5sb2dfICAgID0gbG9nO1xuICAgIH1cbiAgICBkaXNwYXRjaChldmVudHMpIHtcblxuICAgICAgICBmb3IgKHZhciBldmVudCBvZiBldmVudHMpIHtcblxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGdldEV2ZW50TmFtZS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzXy5lbWl0KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5sb2dfLmxvZyhgJHtldmVudE5hbWV9IHdhcyBmaXJlZC5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnROYW1lKGV2ZW50KSB7XG5cbiAgICByZXR1cm4gZXZlbnQuZ2V0TmFtZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjsiLCJcbmNsYXNzIEV2ZW50R2VuZXJhdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18gPSBbXTtcbiAgICB9XG5cbiAgICByYWlzZShldmVudCkge1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18ucHVzaChldmVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWxlYXNlRXZlbnRzKCkge1xuXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLnBlbmRpbmdFdmVudHNfO1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18gPSBbXTtcblxuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEdlbmVyYXRvcjsiLCJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuLyphYnN0cmFjdCovIGNsYXNzIEV2ZW50TGlzdGVuZXIge1xuXG5cdGhhbmRsZShldmVudCkge1xuXG5cdFx0dmFyIGV2ZW50TmFtZSAgICA9IGV2ZW50LmdldE5hbWUoKTtcblx0XHR2YXIgc2hvcnROYW1lICAgID0gZ2V0U2hvcnRuYW1lKGV2ZW50TmFtZSk7XG5cdFx0dmFyIHRhcmdldE5hbWUgICA9IGdldFRhcmdldG5hbWUoc2hvcnROYW1lKTtcblx0XHR2YXIgaXNSZWdpc3RlcmVkID0gaXNGdW5jdGlvbiggdGhpc1t0YXJnZXROYW1lXSApO1xuXG5cdFx0aWYgKGlzUmVnaXN0ZXJlZCkgcmV0dXJuIHRoaXNbdGFyZ2V0TmFtZV0oZXZlbnQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFRhcmdldG5hbWUoc2hvcnROYW1lKSB7XG5cblx0c2hvcnROYW1lID0gdWNmaXJzdChzaG9ydE5hbWUpO1xuXHRyZXR1cm4gYG9uJHtzaG9ydE5hbWV9YDtcbn1cbmZ1bmN0aW9uIGdldFNob3J0bmFtZShldmVudE5hbWUpIHtcblxuXHRyZXR1cm4gbGFzdFNlZ21lbnQoZXZlbnROYW1lKTtcbn1cblxudmFyIHtpc0Z1bmN0aW9uLCBsb2csIHVjZmlyc3QsIGxhc3RTZWdtZW50fSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRMaXN0ZW5lcjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgTW9kdWxlTG9hZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ09iaiA9IHt9KSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8uY29uZmlnT2JqID0gY29uZmlnT2JqO1xuICAgIH1cblxuICAgIGxvYWQoZW52aXJvbm1lbnQsIGdyb3VwLCBuYW1lc3BhY2UgPSBudWxsKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICAgICAgdmFyIGNvbmZpZ09iaiA9IF8uY29uZmlnT2JqO1xuICAgICAgICB2YXIgaXRlbXMgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5leGlzdHMoZ3JvdXApKSBpdGVtcyA9IGNvbmZpZ09ialtncm91cF07XG5cbiAgICAgICAgaWYgKGNvbmZpZ09ialtgJHtlbnZpcm9ubWVudH0uJHtncm91cH1gXSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtcywgY29uZmlnT2JqW2Ake2Vudmlyb25tZW50fS4ke2dyb3VwfWBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtcztcblxuICAgIH1cbiAgICBleGlzdHMoZ3JvdXAsIG5hbWVzcGFjZSA9IG51bGwpIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIgY29uZmlnT2JqID0gXy5jb25maWdPYmo7XG5cbiAgICAgICAgaWYgKGNvbmZpZ09ialtncm91cF0pIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kdWxlTG9hZGVyOyIsInZhciBzdGF0ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpXG5cbmNsYXNzIFJlcG9zaXRvcnkge1xuXG4gICAgY29uc3RydWN0b3IobG9hZGVyLCBlbnZpcm9ubWVudCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcywge30pO1xuICAgICAgICBfLmxvYWRlciA9IGxvYWRlcjtcbiAgICAgICAgXy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIH1cbiAgICBoYXMoKSB7XG5cbiAgICB9XG4gICAgZ2V0KGtleSwgZGVmYXVsdFZhbCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICAgICAgdmFyIHtlbnZpcm9ubWVudH0gPSBfO1xuICAgICAgICB2YXIgW25hbWVzcGFjZSwgZ3JvdXAsIGl0ZW1dID0gcGFyc2VLZXkoa2V5KTtcblxuICAgICAgICB2YXIgaXRlbXMgPSBfLmxvYWRlci5sb2FkKGVudmlyb25tZW50LCBncm91cCwgbmFtZXNwYWNlKTtcblxuICAgICAgICBpZiAoICEgaXRlbSkgcmV0dXJuIGl0ZW1zO1xuXG4gICAgICAgIGlmIChpdGVtc1tpdGVtXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaXRlbXNbaXRlbV07XG5cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWw7XG4gICAgfVxuICAgIHNldCgpIHtcblxuICAgIH1cbn1cblxuLy8gcHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gcGFyc2VLZXkoa2V5KSB7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBrZXkuc3BsaXQoJy4nKTtcblxuICAgIHJldHVybiBwYXJzZUJhc2ljU2VnbWVudHMoc2VnbWVudHMpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUJhc2ljU2VnbWVudHMoc2VnbWVudHMpIHtcblxuICAgIHZhciBncm91cCA9IHNlZ21lbnRzWzBdO1xuXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gW251bGwsIGdyb3VwLCBudWxsXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW251bGwsIGdyb3VwLCBzZWdtZW50c1sxXV07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9zaXRvcnk7IiwidmFyIHN0YXRlICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBoZWxwZXJzICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBDb250YWluZXIge1xuXG4gICAgLy8gdXNlIEV2ZW50RW1pdHRlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBcbiAgICAgICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8uYmluZGluZ3MgPSB7fTtcbiAgICAgICAgXy5pbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgLy8gT2JqZWN0Lm9ic2VydmUoc3RhdGUodGhpcyksIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgbWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XG5cbiAgICAgICAgLy8gaWYgKHN0YXRlLmluc3RhbmNlc1thYnN0cmFjdF0pIHJldHVybiBzdGF0ZS5pbnN0YW5jZXNbYWJzdHJhY3RdO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3YXMgbm90IGFuIGluc3RhbmNlJyk7XG5cbiAgICAgICAgdmFyIGNvbmNyZXRlID0gdGhpcy5nZXRDb25jcmV0ZShhYnN0cmFjdCk7XG4gICAgICAgIHZhciBvYmplY3QgICA9IGNvbmNyZXRlKHRoaXMsIC4uLnBhcmFtZXRlcnMpO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLmlzU2hhcmVkKGFic3RyYWN0KSkge1xuICAgICAgICAvLyAgICAgc3RhdGUuaW5zdGFuY2VzW2Fic3RyYWN0XSA9IG9iamVjdDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGJpbmQoYWJzdHJhY3QsIGNvbmNyZXRlID0gbnVsbCwgc2hhcmVkID0gZmFsc2UpIHtcblxuICAgICAgICB2YXIgdHlwZSA9ICdiaW5kJztcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XG5cbiAgICAgICAgc3RhdGUodGhpcykuYmluZGluZ3NbYWJzdHJhY3RdID0ge2NvbmNyZXRlLCBzaGFyZWR9O1xuICAgICAgICB0aGlzLm1ha2VBY2Nlc3NvclByb3BlcnR5KGFic3RyYWN0KTtcblxuICAgICAgICB0aGlzLmVtaXQoYGJpbmQuJHthYnN0cmFjdH1gLCBcbiAgICAgICAgICAgIG5vUHJvdG8oe3R5cGU6IGAke3R5cGV9LiR7YWJzdHJhY3R9YCwgdGFyZ2V0LCBhYnN0cmFjdCwgc2hhcmVkfSlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW1pdCgnYmluZCcsIFxuICAgICAgICAgICAgbm9Qcm90byh7dHlwZSwgdGFyZ2V0LCBhYnN0cmFjdCwgc2hhcmVkfSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgYmluZFNoYXJlZChhYnN0cmFjdCwgY29uY3JldGUsIC4uLmFyZ3MpIHtcblxuICAgICAgICBpZiAoaXNBcnJheShhYnN0cmFjdCkpIHtcbiAgICAgICAgICAgIGZvciAodmFyICRhcmdzIG9mIGFic3RyYWN0KSB0aGlzLmJpbmRTaGFyZWQoLi4uJGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kKGFic3RyYWN0LCB0aGlzLnNoYXJlKGNvbmNyZXRlLCAuLi5hcmdzKSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldENvbmNyZXRlKGFic3RyYWN0KSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMpLmJpbmRpbmdzW2Fic3RyYWN0XS5jb25jcmV0ZTtcbiAgICB9XG4gICAgaXNTaGFyZWQoYWJzdHJhY3QpIHtcbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcblxuICAgICAgICBpZiAoXy5pbnN0YW5jZXNbYWJzdHJhY3RdKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoXy5iaW5kaW5nc1thYnN0cmFjdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5iaW5kaW5nc1thYnN0cmFjdF0uc2hhcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXRCaW5kaW5ncygpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcykuYmluZGluZ3M7XG4gICAgfVxuICAgIGdldEJpbmRpbmdzS2V5cygpIHtcblxuICAgICAgICByZXR1cm4ga2V5cyh0aGlzLmdldEJpbmRpbmdzKCkpO1xuICAgIH1cbiAgICBuZXdJbnN0YW5jZU9mKGFic3RyYWN0LCBpbnN0YW50aWFibGUsIC4uLmFyZ3MpIHtcblxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIGZ1bmN0aW9uKGFwcCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbnN0YW50aWFibGUoLi4uYXJncyk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgc2luZ2xldG9uKGFic3RyYWN0LCBpbnN0YW50aWFibGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmluZFNoYXJlZChhYnN0cmFjdCwgYXBwID0+IG5ldyBpbnN0YW50aWFibGUoLi4uYXJncykpO1xuICAgIH1cbiAgICBzaGFyZShmdW5jLCAuLi5hcmdzKSB7XG4gICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QgPT09IHVuZGVmaW5lZCkgb2JqZWN0ID0gZnVuYyhjb250YWluZXIsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZm9yZ2V0SW5zdGFuY2UoYWJzdHJhY3QpIHtcblxuICAgICAgICBkZWxldGUgc3RhdGUodGhpcykuaW5zdGFuY2VzW2Fic3RyYWN0XTtcbiAgICB9XG4gICAgbWFrZUFjY2Vzc29yUHJvcGVydHkoYWJzdHJhY3QpIHtcblxuICAgICAgICBpZiAodGhpcy5hYnN0cmFjdCkgcmV0dXJuO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhYnN0cmFjdCwge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiB0aGlzLm1ha2UoYWJzdHJhY3QpLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG5cbiAgICAgICAgY29uc29sZS5kaXIoc3RhdGUpO1xuICAgICAgICAvLyByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIGdldEl0ZW1zKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmluZGluZ3NLZXlzKCk7XG4gICAgfVxuICAgIGZvckVhY2goY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1hcChjYiwgY29udGV4dCkge1xuXG4gICAgICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIGJlIHN1cmUgdGhpcmQgYXJndW1lbnQgaXMgdGhpcyBjb2xsZWN0aW9uLCBub3QgaXRzIGFycmF5O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpLm1hcCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaWx0ZXIoY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5maWx0ZXIoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SXRlcmF0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYXJyYXlJdGVyYXRvcih0aGlzLmdldEl0ZW1zKCkpO1xuICAgIH1cbn1cblxudmFyIHtcblxuICAgIGtleXMsIFxuICAgIGltcGxlbWVudEl0ZXJhdG9yLCBcbiAgICBpc1VuZGVmaW5lZCxcbiAgICBpc0RlZmluZWQsXG4gICAgZGVmaW5lZCxcbiAgICBhcnJheUl0ZXJhdG9yLFxuICAgIGV4dGVuZFByb3RvT2YsXG4gICAgbm9Qcm90byxcbiAgICBpc0FycmF5LFxuXG59ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihDb250YWluZXIsIEV2ZW50RW1pdHRlcik7XG5pbXBsZW1lbnRJdGVyYXRvcihDb250YWluZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjsiLCJ2YXIgU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xuXG5jbGFzcyBXaW5kb3dTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgYXBwLmJpbmRTaGFyZWQoJ3dpbmRvdycsIGFwcCA9PiBnbG9iYWwpO1xuICAgIH1cbiAgICBwcm92aWRlcygpIHtcblxuICAgICAgICByZXR1cm4gWyd3aW5kb3cnXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2luZG93U2VydmljZVByb3ZpZGVyOyIsIlxudmFyIGVycm9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL2Vycm9yQ29uc3RydWN0b3InKTtcblxudmFyIEF1dGhlbnRpY2F0aW9uRXJyb3IgPSBlcnJvckNvbnN0cnVjdG9yKCdBdXRoZW50aWNhdGlvbkVycm9yJywgJ25vIHdheSEgYXV0aGVudGljYXRlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dGhlbnRpY2F0aW9uRXJyb3I7IiwidmFyIFNlcnZpY2VQcm92aWRlciAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgVmFsaWRhdGlvbkVycm9yICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLlZhbGlkYXRpb25FcnJvcicpO1xudmFyIFRpbWVvdXRFcnJvciAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5UaW1lb3V0RXJyb3InKTtcbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuQXV0aGVudGljYXRpb25FcnJvcicpO1xudmFyIE5ldHdvcmtFcnJvciAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5OZXR3b3JrRXJyb3InKTtcblxuY2xhc3MgRXJyb3JTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG5cbiAgICAgICAgdGhpcy5hcHAuYmluZFNoYXJlZChbXG4gICAgICAgICAgICBbJ1ZhbGlkYXRpb25FcnJvcicsICAgICAoKSA9PiBWYWxpZGF0aW9uRXJyb3JdLFxuICAgICAgICAgICAgWydBdXRoZW50aWNhdGlvbkVycm9yJywgKCkgPT4gQXV0aGVudGljYXRpb25FcnJvcl0sXG4gICAgICAgICAgICBbJ05ldHdvcmtFcnJvcicsICAgICAgICAoKSA9PiBOZXR3b3JrRXJyb3JdLFxuICAgICAgICAgICAgWydUaW1lb3V0RXJyb3InLCAgICAgICAgKCkgPT4gVGltZW91dEVycm9yXSxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHByb3ZpZGVzKCkge1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnVmFsaWRhdGlvbkVycm9yJywgXG4gICAgICAgICAgICAnQXV0aGVudGljYXRpb25FcnJvcicsIFxuICAgICAgICAgICAgJ05ldHdvcmtFcnJvcicsIFxuICAgICAgICAgICAgJ1RpbWVvdXRFcnJvcidcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXJyb3JTZXJ2aWNlUHJvdmlkZXI7IiwiXG5cbnZhciBlcnJvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9lcnJvckNvbnN0cnVjdG9yJyk7XG5cbnZhciBOZXR3b3JrRXJyb3IgPSBlcnJvckNvbnN0cnVjdG9yKCdOZXR3b3JrRXJyb3InLCAnbmV0d29yayBwcm9ibGVtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmV0d29ya0Vycm9yOyIsIlxudmFyIGVycm9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL2Vycm9yQ29uc3RydWN0b3InKTtcblxudmFyIFRpbWVvdXRFcnJvciA9IGVycm9yQ29uc3RydWN0b3IoJ1RpbWVvdXRFcnJvcicsICd0aW1lb3V0IGVycm9yIGhhcHBlbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZW91dEVycm9yOyIsIlxudmFyIGVycm9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL2Vycm9yQ29uc3RydWN0b3InKTtcblxudmFyIFZhbGlkYXRpb25FcnJvciA9IGVycm9yQ29uc3RydWN0b3IoJ1ZhbGlkYXRpb25FcnJvcicsICdubyB3YXkhIHZhbGlkYXRlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbGlkYXRpb25FcnJvcjsiLCJ2YXIgJEVycm9yID0gRXJyb3I7XG52YXIge2lzQXJyYXl9ID0gQXJyYXk7XG52YXIge2tleXMsIGRlZmluZVByb3BlcnRpZXN9ID0gT2JqZWN0O1xuXG5mdW5jdGlvbiBub25FbnVtKG9iamVjdHMpIHtcblxuICAgIHZhciB3cml0YWJsZSA9IHRydWU7XG4gICAgdmFyIGVudW1lcmFibGUgPSBmYWxzZTtcbiAgICB2YXIgY29uZmlndXJhYmxlID0gdHJ1ZTtcblxuICAgIG9iamVjdHMgPSBpc0FycmF5KG9iamVjdHMpID8gb2JqZWN0cyA6IFtvYmplY3RzXTtcbiAgICBcbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHJlc3VsdCwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHZhciBrZXkgICAgID0ga2V5cyhvYmplY3QpWzBdO1xuICAgICAgICB2YXIgdmFsdWUgICA9IG9iamVjdFtrZXldO1xuICAgICAgICByZXN1bHRba2V5XSA9IHt2YWx1ZSwgd3JpdGFibGUsIGVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZX07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xufVxuZnVuY3Rpb24gYWRkU3RhY2tUb09iamVjdChvYmplY3QsIEN1c3RvbUVycm9yKSB7XG5cbiAgICB2YXIge2NhcHR1cmVTdGFja1RyYWNlfSA9ICRFcnJvcjtcblxuICAgIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L3dpa2kvSmF2YVNjcmlwdFN0YWNrVHJhY2VBcGlcbiAgICBpZiAoY2FwdHVyZVN0YWNrVHJhY2UpIHtjYXB0dXJlU3RhY2tUcmFjZShvYmplY3QsIEN1c3RvbUVycm9yKTt9IFxuICAgIGVsc2Uge29iamVjdC5zdGFjayA9IChuZXcgJEVycm9yKS5zdGFjayB8fCAnJzt9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuZnVuY3Rpb24gZXJyb3JDb25zdHJ1Y3RvcihuYW1lID0gJ0N1c3RvbUVycm9yJywgbWVzc2FnZSA9ICcnKSB7XG5cbiAgICBjbGFzcyBDdXN0b21FcnJvciBleHRlbmRzICRFcnJvciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuXG4gICAgICAgICAgICAvLyBzaG91bGQgbm90IGNhbGwgcGFyZW50J3MgY29uc3RydWN0b3JcbiAgICAgICAgICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIG5vbkVudW0oe21lc3NhZ2V9KSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkU3RhY2tUb09iamVjdCh0aGlzLCBDdXN0b21FcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0aWVzKEN1c3RvbUVycm9yLnByb3RvdHlwZSwgbm9uRW51bShbe25hbWV9LCB7bWVzc2FnZX1dKSk7XG4gICAgcmV0dXJuIEN1c3RvbUVycm9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVycm9yQ29uc3RydWN0b3I7IiwiXG4vLyB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIHtFdmVudEVtaXR0ZXIyfSA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjInKTtcbnZhciB7LypleHRlbmRQcm90b09mLCAqL2lzU3RyaW5nfSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIERpc3BhdGNoZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIyIHtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hcHBfID0gb3B0aW9ucy5hcHA7XG4gICAgICAgIEV2ZW50RW1pdHRlcjIuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlciA9IHJlc29sdmVTdWJzY3JpYmVyLmNhbGwodGhpcyk7XG4gICAgICAgIHN1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMpO1xuICAgIH1cbn1cbi8vIGV4dGVuZFByb3RvT2YoRGlzcGF0Y2hlciwgRXZlbnRFbWl0dGVyKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVN1YnNjcmliZXIoc3Vic2NyaWJlcikge1xuXG4gICAgaWYgKGlzU3RyaW5nKHN1YnNjcmliZXIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcF9bc3Vic2NyaWJlcl07XG4gICAgfVxuICAgIHJldHVybiBzdWJzY3JpYmVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7ICIsInZhciBDb250YWluZXIgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0NvbnRhaW5lci9Db250YWluZXInKTtcbnZhciBDb25maWcgICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0NvbmZpZy9SZXBvc2l0b3J5Jyk7XG52YXIgTW9kdWxlTG9hZGVyICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Db25maWcvTW9kdWxlTG9hZGVyJyk7XG52YXIgRGlzcGF0Y2hlciAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9FdmVudHMvRGlzcGF0Y2hlcicpO1xudmFyIHN0YXJ0ICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvRm91bmRhdGlvbi9zdGFydCcpO1xudmFyIFByb3ZpZGVyUmVwb3NpdG9yeSA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvRm91bmRhdGlvbi9Qcm92aWRlclJlcG9zaXRvcnknKTtcbnZhciBDb21tYW5kZXJUcmFpdCAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0NvbW1hbmRlci9Db21tYW5kZXJUcmFpdCcpO1xudmFyIGhlbHBlcnMgICAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG5cbnZhciBjb25maWcgICAgICAgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9jb25maWcvY29uZmlnJyk7XG52YXIge3ZhbHVlfSAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcbnZhciBzdGF0ZSAgICAgICAgPSB7fTtcblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb250YWluZXIge1xuXG4gICAgZGV0ZWN0RW52aXJvbm1lbnQoZW52KSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlLmVudiA9IHZhbHVlKGVudik7XG4gICAgfVxuICAgIGlzTG9jYWwoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW52aXJvbm1lbnQoJ2xvY2FsJyk7XG4gICAgfVxuICAgIGVudmlyb25tZW50KC4uLmFyZ3MpIHtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmluZGV4T2Yoc3RhdGUuZW52KSAhPT0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZW52O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldENvbmZpZ0xvYWRlcigpIHtcblxuICAgICAgICByZXR1cm4gbmV3IE1vZHVsZUxvYWRlcihjb25maWcpO1xuICAgIH1cbiAgICByZWdpc3RlckNvcmVDb250YWluZXJCaW5kaW5ncygpIHtcblxuICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgdmFyIGNvbmZpZ0xvYWRlciA9IGFwcC5nZXRDb25maWdMb2FkZXIoKTtcbiAgICAgICAgdmFyIGVudmlyb25tZW50ICA9IGFwcC5lbnZpcm9ubWVudCgpO1xuXG4gICAgICAgIHZhciBkaXNwYXRjaGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFwcCxcbiAgICAgICAgICAgIG5ld0xpc3RlbmVyOiB0cnVlLFxuICAgICAgICAgICAgd2lsZGNhcmQ6IHRydWUsXG4gICAgICAgIH1cblxuICAgICAgICBhcHAuYmluZFNoYXJlZChbXG4gICAgICAgICAgICBbJ2NvbmZpZycsIGFwcCA9PiBuZXcgQ29uZmlnKGNvbmZpZ0xvYWRlciwgZW52aXJvbm1lbnQpXSxcbiAgICAgICAgICAgIFsnZXZlbnRzJywgYXBwID0+IG5ldyBEaXNwYXRjaGVyKGRpc3BhdGNoZXJPcHRpb25zKV0sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBnZXRQcm92aWRlclJlcG9zaXRvcnkoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm92aWRlclJlcG9zaXRvcnkoKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIFxuICAgICAgICBzdGFydC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBydW4oKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FwcCBydW5uaW5nIScpO1xuICAgIH1cbiAgICByZWdpc3Rlcihwcm92aWRlcikge1xuXG4gICAgICAgIHByb3ZpZGVyLnJlZ2lzdGVyKCk7XG4gICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICB9XG59XG5cbnZhciB7ZXh0ZW5kUHJvdG9PZn0gPSBoZWxwZXJzO1xuXG5leHRlbmRQcm90b09mKEFwcGxpY2F0aW9uLCBDb21tYW5kZXJUcmFpdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IiwiXG5jbGFzcyBQcm92aWRlclJlcG9zaXRvcnkge1xuXG4gICAgbG9hZChhcHAsIHByb3ZpZGVycykge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgcHJvdmlkZXIgb2YgcHJvdmlkZXJzKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFwcC5yZWdpc3Rlcih0aGlzLmNyZWF0ZVByb3ZpZGVyKGFwcCwgcHJvdmlkZXIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVQcm92aWRlcihhcHAsIHByb3ZpZGVyKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBwcm92aWRlcihhcHApO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3ZpZGVyUmVwb3NpdG9yeTsiLCJ2YXIgQ29uZmlnID0gcmVxdWlyZSgnV2lsZGNhdC5Db25maWcuUmVwb3NpdG9yeScpO1xuXG5mdW5jdGlvbiBzdGFydCgpIHtcblxuICAgIHZhciBhcHAgICAgPSB0aGlzO1xuICAgIHZhciBlbnYgICAgPSBhcHAuZW52aXJvbm1lbnQoKTtcblxuICAgIGFwcC5iaW5kU2hhcmVkKCdhcHAnLCAoKSA9PiBhcHApO1xuICAgIGFwcC5yZWdpc3RlckNvcmVDb250YWluZXJCaW5kaW5ncygpO1xuXG4gICAgdmFyIHtjb25maWd9ID0gYXBwO1xuICAgIHZhciB7cHJvdmlkZXJzfSA9IGNvbmZpZy5nZXQoJ2FwcCcpO1xuICAgIFxuICAgIGFwcC5nZXRQcm92aWRlclJlcG9zaXRvcnkoKS5sb2FkKGFwcCwgcHJvdmlkZXJzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFydDsiLCJ2YXIgVGltZW91dEVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuVGltZW91dEVycm9yJyk7XG52YXIgTmV0d29ya0Vycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuTmV0d29ya0Vycm9yJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFhIUkxvYWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihYTUxIdHRwUmVxdWVzdCkge1xuXG4gICAgICAgIHRoaXMuWGhyXyA9IFhNTEh0dHBSZXF1ZXN0IHx8IGdsb2JhbC5YTUxIdHRwUmVxdWVzdDtcbiAgICB9XG4gICAgc2VuZChtZXRob2QsIHt1cmwsIHRpbWVvdXQgPSA1MDAwLCBoZWFkZXJzID0ge30sIHJlc3BvbnNlVHlwZSA9ICdqc29uJ30pIHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IHRoaXMuWGhyXygpO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbnRyaWVzKGhlYWRlcnMpLmZvckVhY2goZW50cnkgPT4geGhyLnNldFJlcXVlc3RIZWFkZXIoLi4uZW50cnkpKTtcblxuICAgICAgICAgICAgYXNzaWduKHhociwge1xuICAgICAgICAgICAgICAgIHJlc29sdmUsIHJlamVjdCxcbiAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUsIHRpbWVvdXQsIFxuICAgICAgICAgICAgICAgIG9ubG9hZCwgb250aW1lb3V0LCBvbmVycm9yLCBcbiAgICAgICAgICAgIH0pLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gXG4gICAgICAgIHByb21pc2UuY2FuY2VsID0geGhyLmFib3J0LmJpbmQoeGhyKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgZ2V0KC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdHRVQnLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9ubG9hZCh7dGFyZ2V0OiB4aHJ9KSB7XG5cbiAgICB2YXIge3Jlc3BvbnNlLCBzdGF0dXMsIHN0YXR1c1RleHQsIHJlc29sdmV9ID0geGhyO1xuXG4gICAgaWYgKGlzU3RyaW5nKHJlc3BvbnNlKSAmJiB4aHIucmVzcG9uc2VUeXBlID09PSAnanNvbicpXG4gICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG5cbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbn1cbmZ1bmN0aW9uIG9udGltZW91dCh7dGFyZ2V0OiB7cmVqZWN0fX0pIHtcblxuICAgIHZhciB0aW1lb3V0RXJyb3IgPSBuZXcgVGltZW91dEVycm9yKCk7XG4gICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG59XG5mdW5jdGlvbiBvbmVycm9yKHt0YXJnZXQ6IHhocn0pIHtcbiAgICBcbiAgICB2YXIge3Jlc3BvbnNlLCBzdGF0dXMsIHJlamVjdH0gPSB4aHI7XG5cbiAgICAvLyBjdWUgb2Ygc3RhdHVzIG51bWJlciwgYW5kIG1lc3NhZ2Ugb24gcmVzcG9uc2VcblxuICAgIHZhciBuZXR3b3JrRXJyb3IgPSBuZXcgTmV0d29ya0Vycm9yKCk7XG4gICAgcmVqZWN0KG5ldHdvcmtFcnJvcik7XG59XG5cbnZhciB7bG9nLCBlcnJvciwgaXNTdHJpbmcsIGFzc2lnbiwgZW50cmllc30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUkxvYWRlcjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgQ29uc29sZUxvZ2dlciAvKmltcGxlbWVudHMgJ1dpbGRjYXQuQ29udHJhY3RzLkxvZycqLyB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkd2luZG93ID0gZ2xvYmFsKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8ud2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgXy5jb25zb2xlID0gJHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgICBsb2coLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUubG9nKC4uLmFyZ3MpXG4gICAgfVxuICAgIGVycm9yKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdGF0ZSh0aGlzKS5jb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBkaXIoLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUuZGlyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBnZXQgc3RhdGVfKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25zb2xlTG9nZ2VyOyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29uc29sZUxvZ2dlciAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2cuQ29uc29sZUxvZ2dlcicpO1xuXG5jbGFzcyBMb2dTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuIFxuICAgIHJlZ2lzdGVyKCkge1xuXG4gICAgICAgIHRoaXMuYXBwLnNpbmdsZXRvbignbG9nZ2VyJywgQ29uc29sZUxvZ2dlcik7XG4gICAgfVxuICAgIHByb3ZpZGVzKCkge1xuXG4gICAgICAgIHJldHVybiBbJ2xvZyddO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dTZXJ2aWNlUHJvdmlkZXI7IiwiLy8gQ29sbGVjdGlvbi5qc1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG5jbGFzcyBDb2xsZWN0aW9uIHtcblxuXHRjb25zdHJ1Y3RvcihpdGVtcykge1xuXG5cdFx0aWYgKCAhIGlzQXJyYXkoaXRlbXMpKSB7XG5cblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbGxlY3Rpb24gb2JqZWN0IG11c3QgYmUgY3JlYXRlZCB3aXRoIGFuIGFycmF5Jyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pdGVtc18gPSBpdGVtcztcblx0XHRcblx0fVxuXHRnZXRJdGVtcygpIHtcblxuXHRcdHJldHVybiB0aGlzLml0ZW1zXztcblx0fVxuXHRmb3JFYWNoKGNiLCBjb250ZXh0KSB7XG5cblx0ICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG5cdCAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcblx0ICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuXHQgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuXHQgICAgfSk7XG5cdH1cblx0ZmlsdGVyKGNiLCBjb250ZXh0KSB7XG5cblx0ICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG5cdCAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcblx0ICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZmlsdGVyKCh2YWx1ZSwga2V5KSA9PiB7XG5cdCAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG5cdCAgICB9KTtcblx0fVxuXHRtYXAoY2IsIGNvbnRleHQpIHtcblxuXHQgICAgY29udGV4dCA9IGRlZmluZWQoY29udGV4dCwgdGhpcyk7XG5cblx0ICAgIC8vIGJlIHN1cmUgdGhpcmQgYXJndW1lbnQgaXMgdGhpcyBjb2xsZWN0aW9uLCBub3QgaXRzIGFycmF5O1xuXHQgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5tYXAoKHZhbHVlLCBrZXkpID0+IHtcblx0ICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcblx0ICAgIH0pO1xuXHR9XG5cdHRvSnNvbigpIHtcblxuXHRcdHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoaXRlbXMpO1xuXHR9XG5cdGdldCBsZW5ndGgoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5pdGVtc18ubGVuZ3RoO1xuXHR9XG59XG5cbnZhciB7aXNBcnJheSwgZGVmaW5lZH0gPSBoZWxwZXJzO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcywge30pO1xuICAgICAgICBfLmFwcCA9IGFwcDtcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBhYnN0cmFjdFxuICAgIH1cbiAgICBnZXQgYXBwKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5hcHA7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VQcm92aWRlcjsiLCJcbnZhciAkY29uc29sZSAgICA9IGdsb2JhbC5jb25zb2xlO1xudmFyICRzZXRUaW1lb3V0ID0gZ2xvYmFsLnNldFRpbWVvdXQ7XG5cbi8vIE9iamVjdFxuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBvYmplY3QuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAgICAgfSk7IFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpO1xufVxuZnVuY3Rpb24gdmFsdWVzKG9iamVjdCA9IHt9KSB7XG5cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgb2JqZWN0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBrZXlzKG9iamVjdCkubWFwKGtleSA9PiBvYmplY3Rba2V5XSk7XG59XG5mdW5jdGlvbiBlbnRyaWVzKG9iamVjdCA9IHt9KSB7XG5cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgb2JqZWN0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pO1xufVxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgLi4uc291cmNlcykge1xuXG4gICAgdmFyIHNvdXJjZSwgdGVtcCwgcHJvcHMsIHByb3A7XG5cbiAgICBmb3IgKHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cbiAgICAgICAgaWYgKCBpc0FycmF5KHNvdXJjZSkgKSB7XG5cbiAgICAgICAgICAgIHRlbXAgPSB7fTtcbiAgICAgICAgICAgIFtzb3VyY2UsIC4uLnByb3BzXSA9IHNvdXJjZTtcbiAgICAgICAgICAgIGZvciAocHJvcCBvZiBwcm9wcykgdGVtcFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgIGFzc2lnbih0YXJnZXQsIHRlbXApO1xuXG4gICAgICAgIH0gZWxzZSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcblxuICAgIC8vIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uYXJncyk7XG59XG5mdW5jdGlvbiBleHRlbmRQcm90b09mKHRhcmdldCwgc291cmNlLCBrZXkgPSBbXSkge1xuXG4gICAgaWYgKGlzU3RyaW5nKGtleSkpIHtcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZVtrZXldID0gc291cmNlLnByb3RvdHlwZVtrZXldO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHZhciBzb3VyY2VLZXlzID0ga2V5cyhzb3VyY2UucHJvdG90eXBlKTtcbiAgICBmb3IgKHZhciBrZXkgb2Ygc291cmNlS2V5cykge1xuICAgICAgICB0YXJnZXQucHJvdG90eXBlW2tleV0gPSBzb3VyY2UucHJvdG90eXBlW2tleV07ICAgXG4gICAgfVxufVxuZnVuY3Rpb24gaW1wbGVtZW50SXRlcmF0b3Ioc291cmNlQ2xhc3MpIHtcblxuICAgIHZhciAkcHJvdG90eXBlID0gc291cmNlQ2xhc3MucHJvdG90eXBlO1xuICAgICRwcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9ICRwcm90b3R5cGUuZ2V0SXRlcmF0b3I7XG59XG5mdW5jdGlvbiB2YWx1ZSh2YWwpIHtcblxuICAgIHJldHVybiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykgPyB2YWwoKSA6IHZhbDtcbn1cbmZ1bmN0aW9uIGlzTnVsbCh2YWwpIHtcblxuICAgIHJldHVybiB2YWwgPT09IG51bGw7XG59XG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcblxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuXG4gICAgcmV0dXJuIHZhbCA9PT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuXG4gICAgcmV0dXJuICggISBpc1VuZGVmaW5lZCh2YWwpKTtcbn1cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xufVxuZnVuY3Rpb24gZGVmaW5lZCh2YWwsICRkZWZhdWx0KSB7XG5cbiAgICByZXR1cm4gaXNEZWZpbmVkKHZhbCkgPyB2YWwgOiAkZGVmYXVsdDtcbn1cbmZ1bmN0aW9uIHdhaXQodGltZSA9IDUwMCwgLi4uYXJncykge1xuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSguLi5hcmdzKTtcbiAgICAgICAgfSwgdGltZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuICAgIFxuICAgICRjb25zb2xlLmxvZyguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGRpciguLi5hcmdzKSB7XG5cbiAgICAkY29uc29sZS5kaXIoLi4uYXJncyk7XG59XG5mdW5jdGlvbiBlcnJvciguLi5hcmdzKSB7XG5cbiAgICAkY29uc29sZS5lcnJvciguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHdhcm4oLi4uYXJncykge1xuICAgIFxuICAgICRjb25zb2xlLndhcm4oLi4uYXJncyk7XG59XG5mdW5jdGlvbiBzcGF3bihtYWtlR2VuZXJhdG9yKSB7XG5cbiAgICB2YXIgcHJvbWlzZSA9IGFzeW5jKG1ha2VHZW5lcmF0b3IpO1xuXG4gICAgcHJvbWlzZSgpLnRoZW4obG9nLCB0ZXJtaW5hdGVFcnJvcik7XG59XG5mdW5jdGlvbiBhc3luYyhtYWtlR2VuZXJhdG9yKSB7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJFByb21pc2UgPSBQcm9taXNlO1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gbWFrZUdlbmVyYXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZShyZXN1bHQpIHtcblxuICAgICAgICAgICAgdmFyIGRvbmUgID0gcmVzdWx0LmRvbmU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm4gJFByb21pc2UucmVzb2x2ZSh2YWx1ZSk7IFxuXG4gICAgICAgICAgICByZXR1cm4gJFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShnZW5lcmF0b3IubmV4dChyZXMpKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGdlbmVyYXRvci50aHJvdyhlcnIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yLm5leHQoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gJFByb21pc2UucmVqZWN0KGV4KTtcbiAgICAgICAgfVxuICAgIH07ICBcbn1cbmZ1bmN0aW9uIGFzeW5jTWV0aG9kcyhvYmplY3QsIC4uLm1ldGhvZHMpIHtcblxuICAgIGZvciAodmFyIG1ldGhvZCBvZiBtZXRob2RzKSB7XG5cbiAgICAgICAgb2JqZWN0W21ldGhvZF0gPSBhc3luYyhvYmplY3RbbWV0aG9kXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXJyYXlJdGVyYXRvcihpdGVtcyA9IFtdKSB7XG4gICAgXG4gICAgdmFyIGkgICAgID0gMDtcbiAgICB2YXIgbGVuICAgPSBpdGVtcy5sZW5ndGg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlLCBub3REb25lO1xuICAgICAgICAgICAgaWYgKG5vdERvbmUgPSBpIDwgbGVuKSB2YWx1ZSA9IGl0ZW1zW2krK107XG4gICAgICAgICAgICByZXR1cm4ge3ZhbHVlLCBkb25lOiAhbm90RG9uZX07XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gbm9Qcm90byhzb3VyY2UgPSB7fSkge1xuXG4gICAgdmFyIGVtcHR5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBPYmplY3QuYXNzaWduKGVtcHR5LCBzb3VyY2UpO1xuICAgIHJldHVybiBlbXB0eTtcbn1cbmZ1bmN0aW9uIHRlcm1pbmF0ZUVycm9yKGVycm9yKSB7XG5cbiAgICAkc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdhcm4oYGZyb20gW3RlcmltYXRlRXJyb3JdOmApO1xuICAgICAgICB3YXJuKGVycm9yLnN0YWNrKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7ICAgIFxuICAgIH0sIDApO1xufVxuZnVuY3Rpb24gbWFwRnJvbShvYmplY3QgPSB7fSkge1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkgcmV0dXJuIG9iamVjdDtcblxuICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgdmFyIG9iamVjdEtleXMgPSBrZXlzKG9iamVjdCk7XG5cbiAgICByZXR1cm4gb2JqZWN0S2V5cy5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH0sIG1hcCk7XG59XG5mdW5jdGlvbiB1Y2ZpcnN0KHN0cikge1xuXG4gIHZhciBmID0gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gZiArIHN0ci5zdWJzdHIoMSk7XG59XG5mdW5jdGlvbiBmaXJzdChhcnJheSkge1xuXG4gICAgcmV0dXJuIGFycmF5WzBdO1xufVxuZnVuY3Rpb24gbGFzdChhcnJheSkge1xuXG4gICAgdmFyIGxlbmd0aCAgICA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gYXJyYXlbbGFzdEluZGV4XTtcbn1cbmZ1bmN0aW9uIGxhc3RTZWdtZW50KGFycmF5KSB7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBhcnJheS5zcGxpdCgnLicpO1xuICAgIHJldHVybiBsYXN0KHNlZ21lbnRzKTtcbn1cblxudmFyIGhlbHBlcnMgPSB7XG4gICAga2V5cyxcbiAgICB2YWx1ZXMsXG4gICAgZW50cmllcyxcbiAgICBhc3NpZ24sXG4gICAgZXh0ZW5kUHJvdG9PZixcbiAgICBpbXBsZW1lbnRJdGVyYXRvcixcbiAgICB2YWx1ZSxcbiAgICBpc051bGwsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNGdW5jdGlvbixcbiAgICBpc1VuZGVmaW5lZCxcbiAgICBpc0RlZmluZWQsXG4gICAgaXNBcnJheSxcbiAgICBkZWZpbmVkLFxuICAgIHdhaXQsXG4gICAgbG9nLFxuICAgIGRpcixcbiAgICBlcnJvcixcbiAgICB3YXJuLFxuICAgIHNwYXduLFxuICAgIGFzeW5jLFxuICAgIGFzeW5jTWV0aG9kcyxcbiAgICBhcnJheUl0ZXJhdG9yLFxuICAgIG5vUHJvdG8sXG4gICAgdGVybWluYXRlRXJyb3IsXG4gICAgbWFwRnJvbSxcbiAgICB1Y2ZpcnN0LFxuICAgIGZpcnN0LFxuICAgIGxhc3QsXG4gICAgbGFzdFNlZ21lbnQsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcnM7IiwidmFyIG9ic2VydmVKcyA9IHJlcXVpcmUoJ29ic2VydmUtanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgT2JzZXJ2ZXIgICAgICAgICA6IGdsb2JhbC5PYnNlcnZlcixcbiAgICBBcnJheU9ic2VydmVyICAgIDogZ2xvYmFsLkFycmF5T2JzZXJ2ZXIsXG4gICAgQXJyYXlTcGxpY2UgICAgICA6IGdsb2JhbC5BcnJheVNwbGljZSxcbiAgICBPYmplY3RPYnNlcnZlciAgIDogZ2xvYmFsLk9iamVjdE9ic2VydmVyLFxuICAgIFBhdGhPYnNlcnZlciAgICAgOiBnbG9iYWwuUGF0aE9ic2VydmVyLFxuICAgIENvbXBvdW5kT2JzZXJ2ZXIgOiBnbG9iYWwuQ29tcG91bmRPYnNlcnZlcixcbiAgICBQYXRoICAgICAgICAgICAgIDogZ2xvYmFsLlBhdGgsXG4gICAgT2JzZXJ2ZXJUcmFuc2Zvcm06IGdsb2JhbC5PYnNlcnZlclRyYW5zZm9ybSxcbiAgICBQbGF0Zm9ybSAgICAgICAgIDogZ2xvYmFsLlBsYXRmb3JtLFxufTsiLCJ2YXIge2lzVW5kZWZpbmVkLCBsb2csIG5vUHJvdG8sIGlzU3RyaW5nfSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG52YXIgb2JzZXJ2ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5vYnNlcnZlJyk7XG52YXIge09iamVjdE9ic2VydmVyLCBQbGF0Zm9ybX0gPSBvYnNlcnZlO1xuXG52YXIgTWFwQ29uc3RydWN0b3IgPSBnbG9iYWwuV2Vha01hcCB8fCBnbG9iYWwuTWFwO1xudmFyIG1hcCA9IG5ldyBNYXBDb25zdHJ1Y3RvcigpO1xuXG4vLyBsb2coYHN1cHBvcnRzICR7TWFwQ29uc3RydWN0b3IubmFtZX1gKTtcblxuZnVuY3Rpb24gc3RhdGUodGhpc0FyZywgdmFsLCBjYnMsIHF1aWV0ID0gZmFsc2UpIHtcblxuICAgIC8vIGlmIG5vdCB2YWx1ZSwgYXNzdW1lIGEgZ2V0dGVyIGZvciBlbnRpcmUgc3RhdGUgb2JqZWN0O1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gbWFwLmdldCh0aGlzQXJnKTtcblxuICAgIC8vIGlmIHNlY29uZCBhcmd1bWVudCBpcyBhIHN0clxuICAgIGlmIChpc1N0cmluZyh2YWwpKSB7XG4gICAgICAgIHNldFN0YXRlLmNhbGwodGhpc0FyZywgdmFsLCBjYnMsIHF1aWV0KTtcbiAgICAgICAgcmV0dXJuIHRoaXNBcmc7XG4gICAgfVxuICAgIFxuICAgIHZhciBfID0gc2V0U3RhdGVPYmplY3QuY2FsbCh0aGlzQXJnLCB2YWwpO1xuXG4gICAgaWYgKGNicykgYmluZE9ic2VydmFibGUuY2FsbCh0aGlzQXJnLCBfLCBjYnMpO1xuXG4gICAgcmV0dXJuIF87XG59XG5mdW5jdGlvbiBzZXRTdGF0ZShrZXksIHZhbHVlLCBxdWlldCkge1xuXG4gICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICBfW2tleV0gPSB2YWx1ZTtcbiAgICBpZiAocXVpZXQpIF8ub2JzZXJ2ZXJfLmRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgUGxhdGZvcm0ucGVyZm9ybU1pY3JvdGFza0NoZWNrcG9pbnQoKTtcbn1cbmZ1bmN0aW9uIHNldFN0YXRlT2JqZWN0KHZhbCkge1xuXG4gICAgbWFwLnNldCh0aGlzLCB2YWwpO1xuICAgIHJldHVybiBtYXAuZ2V0KHRoaXMpO1xufVxuZnVuY3Rpb24gYmluZE9ic2VydmFibGUoXywgY2JzKSB7XG5cbiAgICBfLm9ic2VydmVyXyA9IG5ldyBPYmplY3RPYnNlcnZlcihfKTtcbiAgICBfLm9ic2VydmVyXy5vcGVuKG9uT2JzZXJ2ZS5iaW5kKHRoaXMsIHtfLCBjYnN9KSk7XG59XG5mdW5jdGlvbiBvbk9ic2VydmUoe18sIGNic30sIGFkZGVkLCByZW1vdmVkLCBjaGFuZ2VkLCBnZXRPbGRWYWx1ZUZuKSB7XG5cbiAgICB2YXIgb2JzZXJ2ZWQgPSB7YWRkZWQsIHJlbW92ZWQsIGNoYW5nZWQsIF8sIGNicywgZ2V0T2xkVmFsdWVGbn07XG4gICAgaW52b2tlT2JzZXJ2YWJsZXMuY2FsbCh0aGlzLCBvYnNlcnZlZCk7XG59XG5mdW5jdGlvbiBpbnZva2VPYnNlcnZhYmxlcyhvYnNlcnZlZCkge1xuXG4gICAgWydhZGRlZCcsICdyZW1vdmVkJywgJ2NoYW5nZWQnXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICB2YXIgaGFzQ2FsbGJhY2sgPSAodHlwZW9mIG9ic2VydmVkLmNic1t0eXBlXSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgIHZhciBpc05vdEVtcHR5ICA9IE9iamVjdC5rZXlzKG9ic2VydmVkW3R5cGVdKS5sZW5ndGggPiAwO1xuXG4gICAgICAgIGlmIChoYXNDYWxsYmFjayAmJiBpc05vdEVtcHR5KSBpbnZva2UuY2FsbCh0aGlzLCBvYnNlcnZlZCwgdHlwZSk7IFxuICAgIH0pO1xufVxuZnVuY3Rpb24gaW52b2tlKG9ic2VydmVkLCB0eXBlKSB7XG5cbiAgICB2YXIgY2FsbGJhY2sgPSBvYnNlcnZlZC5jYnNbdHlwZV07XG4gICAgdmFyIG5hbWVzICAgID0gT2JqZWN0LmtleXMob2JzZXJ2ZWRbdHlwZV0pO1xuXG4gICAgdmFyIHBheWxvYWQgPSBuYW1lcy5tYXAobmFtZSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIG5vUHJvdG8oe1xuICAgICAgICAgICAgbmFtZSAgICA6IG5hbWUsXG4gICAgICAgICAgICB0eXBlICAgIDogdHlwZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBvYnNlcnZlZC5fW25hbWVdLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmVkLmdldE9sZFZhbHVlRm4obmFtZSksXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY2FsbGJhY2suY2FsbCh0aGlzLCBwYXlsb2FkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZTsiLCJ2YXIgc3RhdGUgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xudmFyIG9ic2VydmUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQub2JzZXJ2ZScpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIENvbW1hbmRlclRyYWl0ID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZGVyVHJhaXQnKTtcbnZhciBFdmVudExpc3RlbmVyICA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudExpc3RlbmVyJyk7XG52YXIge1BhdGhPYnNlcnZlciwgUGxhdGZvcm19ID0gb2JzZXJ2ZTtcblxuY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50TGlzdGVuZXIge1xuXG4gICAgLy8gdXNlIENvbW1hbmRUcmFpdFxuXG4gICAgY29uc3RydWN0b3IoYXBwLCBlbCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuXG4gICAgICAgIHZhciBkZWZhdWx0U3RhdGUgPSB7XG4gICAgICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICBzdGF0ZSh0aGlzLCBkZWZhdWx0U3RhdGUsIHtjaGFuZ2VkLCBhZGRlZH0pO1xuICAgIH1cbiAgICBzZXRFbChlbGVtZW50LCBxdWlldCA9IGZhbHNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMsICdlbCcsIGVsZW1lbnQsIHF1aWV0KTtcbiAgICB9XG4gICAgZ2V0IGVsKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5lbDtcbiAgICB9XG4gICAgc2V0IGVsKHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5zZXRFbCh2YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlZChjaGFuZ2VzKSB7XG4gICAgbG9nKGBvblN0YXRlQ2hhbmdlZGApO1xuICAgIGZvciAodmFyIGNoYW5nZSBvZiBjaGFuZ2VzKSBsb2coY2hhbmdlKTtcbn1cbmZ1bmN0aW9uIGFkZGVkKGFkZGl0aW9ucykge1xuICAgIGxvZyhgb25TdGF0ZUFkZGVkYCk7XG4gICAgZm9yICh2YXIgYWRkaXRpb24gb2YgYWRkaXRpb25zKSBsb2coYWRkaXRpb24pO1xufVxuXG52YXIge1xuICAgIGxvZyxcbiAgICBleHRlbmRQcm90b09mLFxufSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoVmlldywgQ29tbWFuZGVyVHJhaXQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7ICIsInZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgVmlldyA9IHJlcXVpcmUoJ1dpbGRjYXQuVmlldy5WaWV3Jyk7XG5cbmNsYXNzIFZpZXdTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIHZpZXdzID0gYXBwLmNvbmZpZy5nZXQoJ3ZpZXdzJyk7XG5cbiAgICAgICAgZm9yICh2YXIge2Fic3RyYWN0LCAkY29uc3RydWN0b3IsIGJ1aWxkfSBvZiB2aWV3cykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1aWxkKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzaW5nbGV0b24nOlxuICAgICAgICAgICAgICAgICAgICBhcHAuYmluZFNoYXJlZChhYnN0cmFjdCwgYXBwID0+IG5ldyAkY29uc3RydWN0b3IoYXBwKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3U2VydmljZVByb3ZpZGVyOyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IDA7XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24oZW1pdHRlci5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSAxO1xuICBlbHNlXG4gICAgcmV0ID0gZW1pdHRlci5fZXZlbnRzW3R5cGVdLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vaGlqMW54L0V2ZW50RW1pdHRlcjJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgaGlqMW54XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbjshZnVuY3Rpb24odW5kZWZpbmVkKSB7XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheSA6IGZ1bmN0aW9uIF9pc0FycmF5KG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9O1xuICB2YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgaWYgKHRoaXMuX2NvbmYpIHtcbiAgICAgIGNvbmZpZ3VyZS5jYWxsKHRoaXMsIHRoaXMuX2NvbmYpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25mKSB7XG4gICAgaWYgKGNvbmYpIHtcblxuICAgICAgdGhpcy5fY29uZiA9IGNvbmY7XG5cbiAgICAgIGNvbmYuZGVsaW1pdGVyICYmICh0aGlzLmRlbGltaXRlciA9IGNvbmYuZGVsaW1pdGVyKTtcbiAgICAgIGNvbmYubWF4TGlzdGVuZXJzICYmICh0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzID0gY29uZi5tYXhMaXN0ZW5lcnMpO1xuICAgICAgY29uZi53aWxkY2FyZCAmJiAodGhpcy53aWxkY2FyZCA9IGNvbmYud2lsZGNhcmQpO1xuICAgICAgY29uZi5uZXdMaXN0ZW5lciAmJiAodGhpcy5uZXdMaXN0ZW5lciA9IGNvbmYubmV3TGlzdGVuZXIpO1xuXG4gICAgICBpZiAodGhpcy53aWxkY2FyZCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyVHJlZSA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcihjb25mKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgdGhpcy5uZXdMaXN0ZW5lciA9IGZhbHNlO1xuICAgIGNvbmZpZ3VyZS5jYWxsKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgLy9cbiAgLy8gQXR0ZW50aW9uLCBmdW5jdGlvbiByZXR1cm4gdHlwZSBub3cgaXMgYXJyYXksIGFsd2F5cyAhXG4gIC8vIEl0IGhhcyB6ZXJvIGVsZW1lbnRzIGlmIG5vIGFueSBtYXRjaGVzIGZvdW5kIGFuZCBvbmUgb3IgbW9yZVxuICAvLyBlbGVtZW50cyAobGVhZnMpIGlmIHRoZXJlIGFyZSBtYXRjaGVzXG4gIC8vXG4gIGZ1bmN0aW9uIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgaSkge1xuICAgIGlmICghdHJlZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgbGlzdGVuZXJzPVtdLCBsZWFmLCBsZW4sIGJyYW5jaCwgeFRyZWUsIHh4VHJlZSwgaXNvbGF0ZWRCcmFuY2gsIGVuZFJlYWNoZWQsXG4gICAgICAgIHR5cGVMZW5ndGggPSB0eXBlLmxlbmd0aCwgY3VycmVudFR5cGUgPSB0eXBlW2ldLCBuZXh0VHlwZSA9IHR5cGVbaSsxXTtcbiAgICBpZiAoaSA9PT0gdHlwZUxlbmd0aCAmJiB0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiBhdCB0aGUgZW5kIG9mIHRoZSBldmVudChzKSBsaXN0IGFuZCB0aGUgdHJlZSBoYXMgbGlzdGVuZXJzXG4gICAgICAvLyBpbnZva2UgdGhvc2UgbGlzdGVuZXJzLlxuICAgICAgLy9cbiAgICAgIGlmICh0eXBlb2YgdHJlZS5fbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2godHJlZS5fbGlzdGVuZXJzKTtcbiAgICAgICAgcmV0dXJuIFt0cmVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGVhZiA9IDAsIGxlbiA9IHRyZWUuX2xpc3RlbmVycy5sZW5ndGg7IGxlYWYgPCBsZW47IGxlYWYrKykge1xuICAgICAgICAgIGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2godHJlZS5fbGlzdGVuZXJzW2xlYWZdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RyZWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgoY3VycmVudFR5cGUgPT09ICcqJyB8fCBjdXJyZW50VHlwZSA9PT0gJyoqJykgfHwgdHJlZVtjdXJyZW50VHlwZV0pIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiB0aGUgZXZlbnQgZW1pdHRlZCBpcyAnKicgYXQgdGhpcyBwYXJ0XG4gICAgICAvLyBvciB0aGVyZSBpcyBhIGNvbmNyZXRlIG1hdGNoIGF0IHRoaXMgcGF0Y2hcbiAgICAgIC8vXG4gICAgICBpZiAoY3VycmVudFR5cGUgPT09ICcqJykge1xuICAgICAgICBmb3IgKGJyYW5jaCBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHRyZWUuaGFzT3duUHJvcGVydHkoYnJhbmNoKSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSsxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gICAgICB9IGVsc2UgaWYoY3VycmVudFR5cGUgPT09ICcqKicpIHtcbiAgICAgICAgZW5kUmVhY2hlZCA9IChpKzEgPT09IHR5cGVMZW5ndGggfHwgKGkrMiA9PT0gdHlwZUxlbmd0aCAmJiBuZXh0VHlwZSA9PT0gJyonKSk7XG4gICAgICAgIGlmKGVuZFJlYWNoZWQgJiYgdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgLy8gVGhlIG5leHQgZWxlbWVudCBoYXMgYSBfbGlzdGVuZXJzLCBhZGQgaXQgdG8gdGhlIGhhbmRsZXJzLlxuICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlLCB0eXBlTGVuZ3RoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGJyYW5jaCBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHRyZWUuaGFzT3duUHJvcGVydHkoYnJhbmNoKSkge1xuICAgICAgICAgICAgaWYoYnJhbmNoID09PSAnKicgfHwgYnJhbmNoID09PSAnKionKSB7XG4gICAgICAgICAgICAgIGlmKHRyZWVbYnJhbmNoXS5fbGlzdGVuZXJzICYmICFlbmRSZWFjaGVkKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgdHlwZUxlbmd0aCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihicmFuY2ggPT09IG5leHRUeXBlKSB7XG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkrMikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gTm8gbWF0Y2ggb24gdGhpcyBvbmUsIHNoaWZ0IGludG8gdGhlIHRyZWUgYnV0IG5vdCBpbiB0aGUgdHlwZSBhcnJheS5cbiAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVtjdXJyZW50VHlwZV0sIGkrMSkpO1xuICAgIH1cblxuICAgIHhUcmVlID0gdHJlZVsnKiddO1xuICAgIGlmICh4VHJlZSkge1xuICAgICAgLy9cbiAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciB0cmVlIHdpbGwgYWxsb3cgYW55IG1hdGNoIGZvciB0aGlzIHBhcnQsXG4gICAgICAvLyB0aGVuIHJlY3Vyc2l2ZWx5IGV4cGxvcmUgYWxsIGJyYW5jaGVzIG9mIHRoZSB0cmVlXG4gICAgICAvL1xuICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4VHJlZSwgaSsxKTtcbiAgICB9XG5cbiAgICB4eFRyZWUgPSB0cmVlWycqKiddO1xuICAgIGlmKHh4VHJlZSkge1xuICAgICAgaWYoaSA8IHR5cGVMZW5ndGgpIHtcbiAgICAgICAgaWYoeHhUcmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgbGlzdGVuZXIgb24gYSAnKionLCBpdCB3aWxsIGNhdGNoIGFsbCwgc28gYWRkIGl0cyBoYW5kbGVyLlxuICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlLCB0eXBlTGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGFycmF5cyBvZiBtYXRjaGluZyBuZXh0IGJyYW5jaGVzIGFuZCBvdGhlcnMuXG4gICAgICAgIGZvcihicmFuY2ggaW4geHhUcmVlKSB7XG4gICAgICAgICAgaWYoYnJhbmNoICE9PSAnX2xpc3RlbmVycycgJiYgeHhUcmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGlmKGJyYW5jaCA9PT0gbmV4dFR5cGUpIHtcbiAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGUgbmV4dCBlbGVtZW50IHdpbGwgbWF0Y2gsIHNvIGp1bXAgdHdpY2UuXG4gICAgICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlW2JyYW5jaF0sIGkrMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYnJhbmNoID09PSBjdXJyZW50VHlwZSkge1xuICAgICAgICAgICAgICAvLyBDdXJyZW50IG5vZGUgbWF0Y2hlcywgbW92ZSBpbnRvIHRoZSB0cmVlLlxuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVticmFuY2hdLCBpKzEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNvbGF0ZWRCcmFuY2ggPSB7fTtcbiAgICAgICAgICAgICAgaXNvbGF0ZWRCcmFuY2hbYnJhbmNoXSA9IHh4VHJlZVticmFuY2hdO1xuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHsgJyoqJzogaXNvbGF0ZWRCcmFuY2ggfSwgaSsxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZih4eFRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAvLyBXZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCBhbmQgc3RpbGwgb24gYSAnKionXG4gICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlLCB0eXBlTGVuZ3RoKTtcbiAgICAgIH0gZWxzZSBpZih4eFRyZWVbJyonXSAmJiB4eFRyZWVbJyonXS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlWycqJ10sIHR5cGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gIH1cblxuICBmdW5jdGlvbiBncm93TGlzdGVuZXJUcmVlKHR5cGUsIGxpc3RlbmVyKSB7XG5cbiAgICB0eXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG5cbiAgICAvL1xuICAgIC8vIExvb2tzIGZvciB0d28gY29uc2VjdXRpdmUgJyoqJywgaWYgc28sIGRvbid0IGFkZCB0aGUgZXZlbnQgYXQgYWxsLlxuICAgIC8vXG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gdHlwZS5sZW5ndGg7IGkrMSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZih0eXBlW2ldID09PSAnKionICYmIHR5cGVbaSsxXSA9PT0gJyoqJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRyZWUgPSB0aGlzLmxpc3RlbmVyVHJlZTtcbiAgICB2YXIgbmFtZSA9IHR5cGUuc2hpZnQoKTtcblxuICAgIHdoaWxlIChuYW1lKSB7XG5cbiAgICAgIGlmICghdHJlZVtuYW1lXSkge1xuICAgICAgICB0cmVlW25hbWVdID0ge307XG4gICAgICB9XG5cbiAgICAgIHRyZWUgPSB0cmVlW25hbWVdO1xuXG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICBpZiAoIXRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycyA9IGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHRyZWUuX2xpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycyA9IFt0cmVlLl9saXN0ZW5lcnMsIGxpc3RlbmVyXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0FycmF5KHRyZWUuX2xpc3RlbmVycykpIHtcblxuICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgICAgIGlmICghdHJlZS5fbGlzdGVuZXJzLndhcm5lZCkge1xuXG4gICAgICAgICAgICB2YXIgbSA9IGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgbSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtID4gMCAmJiB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoID4gbSkge1xuXG4gICAgICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy53YXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIG5hbWUgPSB0eXBlLnNoaWZ0KCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhblxuICAvLyAxMCBsaXN0ZW5lcnMgYXJlIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2hcbiAgLy8gaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG4gIC8vXG4gIC8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuICAvLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmRlbGltaXRlciA9ICcuJztcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgPSBuO1xuICAgIGlmICghdGhpcy5fY29uZikgdGhpcy5fY29uZiA9IHt9O1xuICAgIHRoaXMuX2NvbmYubWF4TGlzdGVuZXJzID0gbjtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50ID0gJyc7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgdGhpcy5tYW55KGV2ZW50LCAxLCBmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5tYW55ID0gZnVuY3Rpb24oZXZlbnQsIHR0bCwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hbnkgb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKC0tdHRsID09PSAwKSB7XG4gICAgICAgIHNlbGYub2ZmKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLl9vcmlnaW4gPSBmbjtcblxuICAgIHRoaXMub24oZXZlbnQsIGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKHR5cGUgPT09ICduZXdMaXN0ZW5lcicgJiYgIXRoaXMubmV3TGlzdGVuZXIpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgKl9hbGwqIGZ1bmN0aW9ucyBhbmQgaW52b2tlIHRoZW0uXG4gICAgaWYgKHRoaXMuX2FsbCkge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuX2FsbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gICAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcblxuICAgICAgaWYgKCF0aGlzLl9hbGwgJiZcbiAgICAgICAgIXRoaXMuX2V2ZW50cy5lcnJvciAmJlxuICAgICAgICAhKHRoaXMud2lsZGNhcmQgJiYgdGhpcy5saXN0ZW5lclRyZWUuZXJyb3IpKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgYXJndW1lbnRzWzFdOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXI7XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICBoYW5kbGVyID0gW107XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIGhhbmRsZXIsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIHNsb3dlclxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGw7IGkrKykgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaGFuZGxlcikge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICB2YXIgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGxpc3RlbmVycy5sZW5ndGggPiAwKSB8fCAhIXRoaXMuX2FsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gISF0aGlzLl9hbGw7XG4gICAgfVxuXG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG5cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25BbnkodHlwZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uIG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT0gXCJuZXdMaXN0ZW5lcnNcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lcnNcIi5cbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgZ3Jvd0xpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB7XG4gICAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiB0aGlzLl9ldmVudHNbdHlwZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0FycmF5KHRoaXMuX2V2ZW50c1t0eXBlXSkpIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuXG4gICAgICAgIHZhciBtID0gZGVmYXVsdE1heExpc3RlbmVycztcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcblxuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uQW55ID0gZnVuY3Rpb24oZm4pIHtcblxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25Bbnkgb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLl9hbGwpIHtcbiAgICAgIHRoaXMuX2FsbCA9IFtdO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgZnVuY3Rpb24gdG8gdGhlIGV2ZW50IGxpc3RlbmVyIGNvbGxlY3Rpb24uXG4gICAgdGhpcy5fYWxsLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXJzLGxlYWZzPVtdO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBsZWFmcyA9IHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIG51bGwsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gZG9lcyBub3QgdXNlIGxpc3RlbmVycygpLCBzbyBubyBzaWRlIGVmZmVjdCBvZiBjcmVhdGluZyBfZXZlbnRzW3R5cGVdXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG4gICAgICBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgIGxlYWZzLnB1c2goe19saXN0ZW5lcnM6aGFuZGxlcnN9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpTGVhZj0wOyBpTGVhZjxsZWFmcy5sZW5ndGg7IGlMZWFmKyspIHtcbiAgICAgIHZhciBsZWFmID0gbGVhZnNbaUxlYWZdO1xuICAgICAgaGFuZGxlcnMgPSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoaXNBcnJheShoYW5kbGVycykpIHtcblxuICAgICAgICB2YXIgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFuZGxlcnNbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAoaGFuZGxlcnNbaV0ubGlzdGVuZXIgJiYgaGFuZGxlcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB8fFxuICAgICAgICAgICAgKGhhbmRsZXJzW2ldLl9vcmlnaW4gJiYgaGFuZGxlcnNbaV0uX29yaWdpbiA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgbGVhZi5fbGlzdGVuZXJzLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgICAgZGVsZXRlIGxlYWYuX2xpc3RlbmVycztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGhhbmRsZXJzID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAoaGFuZGxlcnMubGlzdGVuZXIgJiYgaGFuZGxlcnMubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB8fFxuICAgICAgICAoaGFuZGxlcnMuX29yaWdpbiAmJiBoYW5kbGVycy5fb3JpZ2luID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgIGRlbGV0ZSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmQW55ID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgaSA9IDAsIGwgPSAwLCBmbnM7XG4gICAgaWYgKGZuICYmIHRoaXMuX2FsbCAmJiB0aGlzLl9hbGwubGVuZ3RoID4gMCkge1xuICAgICAgZm5zID0gdGhpcy5fYWxsO1xuICAgICAgZm9yKGkgPSAwLCBsID0gZm5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZihmbiA9PT0gZm5zW2ldKSB7XG4gICAgICAgICAgZm5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAhdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgdmFyIGxlYWZzID0gc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgbnVsbCwgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcblxuICAgICAgZm9yICh2YXIgaUxlYWY9MDsgaUxlYWY8bGVhZnMubGVuZ3RoOyBpTGVhZisrKSB7XG4gICAgICAgIHZhciBsZWFmID0gbGVhZnNbaUxlYWZdO1xuICAgICAgICBsZWFmLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBoYW5kbGVycyA9IFtdO1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVycywgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcbiAgICAgIHJldHVybiBoYW5kbGVycztcbiAgICB9XG5cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdO1xuICAgIGlmICghaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyc0FueSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5fYWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgfTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHdpbmRvdy5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuICB9XG59KCk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudCA9IGdsb2JhbC50ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudDtcblxuICAvLyBEZXRlY3QgYW5kIGRvIGJhc2ljIHNhbml0eSBjaGVja2luZyBvbiBPYmplY3QvQXJyYXkub2JzZXJ2ZS5cbiAgZnVuY3Rpb24gZGV0ZWN0T2JqZWN0T2JzZXJ2ZSgpIHtcbiAgICBpZiAodHlwZW9mIE9iamVjdC5vYnNlcnZlICE9PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIHR5cGVvZiBBcnJheS5vYnNlcnZlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlY3MpIHtcbiAgICAgIHJlY29yZHMgPSByZWNzO1xuICAgIH1cblxuICAgIHZhciB0ZXN0ID0ge307XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIE9iamVjdC5vYnNlcnZlKHRlc3QsIGNhbGxiYWNrKTtcbiAgICBBcnJheS5vYnNlcnZlKGFyciwgY2FsbGJhY2spO1xuICAgIHRlc3QuaWQgPSAxO1xuICAgIHRlc3QuaWQgPSAyO1xuICAgIGRlbGV0ZSB0ZXN0LmlkO1xuICAgIGFyci5wdXNoKDEsIDIpO1xuICAgIGFyci5sZW5ndGggPSAwO1xuXG4gICAgT2JqZWN0LmRlbGl2ZXJDaGFuZ2VSZWNvcmRzKGNhbGxiYWNrKTtcbiAgICBpZiAocmVjb3Jkcy5sZW5ndGggIT09IDUpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAocmVjb3Jkc1swXS50eXBlICE9ICdhZGQnIHx8XG4gICAgICAgIHJlY29yZHNbMV0udHlwZSAhPSAndXBkYXRlJyB8fFxuICAgICAgICByZWNvcmRzWzJdLnR5cGUgIT0gJ2RlbGV0ZScgfHxcbiAgICAgICAgcmVjb3Jkc1szXS50eXBlICE9ICdzcGxpY2UnIHx8XG4gICAgICAgIHJlY29yZHNbNF0udHlwZSAhPSAnc3BsaWNlJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIE9iamVjdC51bm9ic2VydmUodGVzdCwgY2FsbGJhY2spO1xuICAgIEFycmF5LnVub2JzZXJ2ZShhcnIsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIGhhc09ic2VydmUgPSBkZXRlY3RPYmplY3RPYnNlcnZlKCk7XG5cbiAgZnVuY3Rpb24gZGV0ZWN0RXZhbCgpIHtcbiAgICAvLyBEb24ndCB0ZXN0IGZvciBldmFsIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBDaHJvbWUgQXBwIGVudmlyb25tZW50LlxuICAgIC8vIFdlIGNoZWNrIGZvciBBUElzIHNldCB0aGF0IG9ubHkgZXhpc3QgaW4gYSBDaHJvbWUgQXBwIGNvbnRleHQuXG4gICAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS5hcHAgJiYgY2hyb21lLmFwcC5ydW50aW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRmlyZWZveCBPUyBBcHBzIGRvIG5vdCBhbGxvdyBldmFsLiBUaGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGlzIHZlcnkgaGFja3lcbiAgICAvLyBidXQgZXZlbiBpZiBzb21lIG90aGVyIHBsYXRmb3JtIGFkZHMgc3VwcG9ydCBmb3IgdGhpcyBmdW5jdGlvbiB0aGlzIGNvZGVcbiAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIHdvcmsuXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLmdldERldmljZVN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFyIGYgPSBuZXcgRnVuY3Rpb24oJycsICdyZXR1cm4gdHJ1ZTsnKTtcbiAgICAgIHJldHVybiBmKCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgaGFzRXZhbCA9IGRldGVjdEV2YWwoKTtcblxuICBmdW5jdGlvbiBpc0luZGV4KHMpIHtcbiAgICByZXR1cm4gK3MgPT09IHMgPj4+IDAgJiYgcyAhPT0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiB0b051bWJlcihzKSB7XG4gICAgcmV0dXJuICtzO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gIH1cblxuICB2YXIgbnVtYmVySXNOYU4gPSBnbG9iYWwuTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsLmlzTmFOKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFyZVNhbWVWYWx1ZShsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0ID09PSByaWdodClcbiAgICAgIHJldHVybiBsZWZ0ICE9PSAwIHx8IDEgLyBsZWZ0ID09PSAxIC8gcmlnaHQ7XG4gICAgaWYgKG51bWJlcklzTmFOKGxlZnQpICYmIG51bWJlcklzTmFOKHJpZ2h0KSlcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGxlZnQgIT09IGxlZnQgJiYgcmlnaHQgIT09IHJpZ2h0O1xuICB9XG5cbiAgdmFyIGNyZWF0ZU9iamVjdCA9ICgnX19wcm90b19fJyBpbiB7fSkgP1xuICAgIGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gb2JqOyB9IDpcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBwcm90byA9IG9iai5fX3Byb3RvX187XG4gICAgICBpZiAoIXByb3RvKVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgdmFyIG5ld09iamVjdCA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iamVjdCwgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9O1xuXG4gIHZhciBpZGVudFN0YXJ0ID0gJ1tcXCRfYS16QS1aXSc7XG4gIHZhciBpZGVudFBhcnQgPSAnW1xcJF9hLXpBLVowLTldJztcbiAgdmFyIGlkZW50UmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBpZGVudFN0YXJ0ICsgJysnICsgaWRlbnRQYXJ0ICsgJyonICsgJyQnKTtcblxuICBmdW5jdGlvbiBnZXRQYXRoQ2hhclR5cGUoY2hhcikge1xuICAgIGlmIChjaGFyID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gJ2VvZic7XG5cbiAgICB2YXIgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgIHN3aXRjaChjb2RlKSB7XG4gICAgICBjYXNlIDB4NUI6IC8vIFtcbiAgICAgIGNhc2UgMHg1RDogLy8gXVxuICAgICAgY2FzZSAweDJFOiAvLyAuXG4gICAgICBjYXNlIDB4MjI6IC8vIFwiXG4gICAgICBjYXNlIDB4Mjc6IC8vICdcbiAgICAgIGNhc2UgMHgzMDogLy8gMFxuICAgICAgICByZXR1cm4gY2hhcjtcblxuICAgICAgY2FzZSAweDVGOiAvLyBfXG4gICAgICBjYXNlIDB4MjQ6IC8vICRcbiAgICAgICAgcmV0dXJuICdpZGVudCc7XG5cbiAgICAgIGNhc2UgMHgyMDogLy8gU3BhY2VcbiAgICAgIGNhc2UgMHgwOTogLy8gVGFiXG4gICAgICBjYXNlIDB4MEE6IC8vIE5ld2xpbmVcbiAgICAgIGNhc2UgMHgwRDogLy8gUmV0dXJuXG4gICAgICBjYXNlIDB4QTA6ICAvLyBOby1icmVhayBzcGFjZVxuICAgICAgY2FzZSAweEZFRkY6ICAvLyBCeXRlIE9yZGVyIE1hcmtcbiAgICAgIGNhc2UgMHgyMDI4OiAgLy8gTGluZSBTZXBhcmF0b3JcbiAgICAgIGNhc2UgMHgyMDI5OiAgLy8gUGFyYWdyYXBoIFNlcGFyYXRvclxuICAgICAgICByZXR1cm4gJ3dzJztcbiAgICB9XG5cbiAgICAvLyBhLXosIEEtWlxuICAgIGlmICgoMHg2MSA8PSBjb2RlICYmIGNvZGUgPD0gMHg3QSkgfHwgKDB4NDEgPD0gY29kZSAmJiBjb2RlIDw9IDB4NUEpKVxuICAgICAgcmV0dXJuICdpZGVudCc7XG5cbiAgICAvLyAxLTlcbiAgICBpZiAoMHgzMSA8PSBjb2RlICYmIGNvZGUgPD0gMHgzOSlcbiAgICAgIHJldHVybiAnbnVtYmVyJztcblxuICAgIHJldHVybiAnZWxzZSc7XG4gIH1cblxuICB2YXIgcGF0aFN0YXRlTWFjaGluZSA9IHtcbiAgICAnYmVmb3JlUGF0aCc6IHtcbiAgICAgICd3cyc6IFsnYmVmb3JlUGF0aCddLFxuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG4gICAgfSxcblxuICAgICdpblBhdGgnOiB7XG4gICAgICAnd3MnOiBbJ2luUGF0aCddLFxuICAgICAgJy4nOiBbJ2JlZm9yZUlkZW50J10sXG4gICAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJ11cbiAgICB9LFxuXG4gICAgJ2JlZm9yZUlkZW50Jzoge1xuICAgICAgJ3dzJzogWydiZWZvcmVJZGVudCddLFxuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddXG4gICAgfSxcblxuICAgICdpbklkZW50Jzoge1xuICAgICAgJ2lkZW50JzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJzAnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG4gICAgICAnbnVtYmVyJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJ3dzJzogWydpblBhdGgnLCAncHVzaCddLFxuICAgICAgJy4nOiBbJ2JlZm9yZUlkZW50JywgJ3B1c2gnXSxcbiAgICAgICdbJzogWydiZWZvcmVFbGVtZW50JywgJ3B1c2gnXSxcbiAgICAgICdlb2YnOiBbJ2FmdGVyUGF0aCcsICdwdXNoJ11cbiAgICB9LFxuXG4gICAgJ2JlZm9yZUVsZW1lbnQnOiB7XG4gICAgICAnd3MnOiBbJ2JlZm9yZUVsZW1lbnQnXSxcbiAgICAgICcwJzogWydhZnRlclplcm8nLCAnYXBwZW5kJ10sXG4gICAgICAnbnVtYmVyJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuICAgICAgXCInXCI6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnLCAnJ10sXG4gICAgICAnXCInOiBbJ2luRG91YmxlUXVvdGUnLCAnYXBwZW5kJywgJyddXG4gICAgfSxcblxuICAgICdhZnRlclplcm8nOiB7XG4gICAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCcsICdwdXNoJ10sXG4gICAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuICAgIH0sXG5cbiAgICAnaW5JbmRleCc6IHtcbiAgICAgICcwJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuICAgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcbiAgICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50J10sXG4gICAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuICAgIH0sXG5cbiAgICAnaW5TaW5nbGVRdW90ZSc6IHtcbiAgICAgIFwiJ1wiOiBbJ2FmdGVyRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnZXJyb3InXSxcbiAgICAgICdlbHNlJzogWydpblNpbmdsZVF1b3RlJywgJ2FwcGVuZCddXG4gICAgfSxcblxuICAgICdpbkRvdWJsZVF1b3RlJzoge1xuICAgICAgJ1wiJzogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2Vycm9yJ10sXG4gICAgICAnZWxzZSc6IFsnaW5Eb3VibGVRdW90ZScsICdhcHBlbmQnXVxuICAgIH0sXG5cbiAgICAnYWZ0ZXJFbGVtZW50Jzoge1xuICAgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICddJzogWydpblBhdGgnLCAncHVzaCddXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBjLCBuZXdDaGFyLCBrZXksIHR5cGUsIHRyYW5zaXRpb24sIGFjdGlvbiwgdHlwZU1hcCwgbW9kZSA9ICdiZWZvcmVQYXRoJztcblxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgcHVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH0sXG5cbiAgICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBrZXkgPSBuZXdDaGFyXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBrZXkgKz0gbmV3Q2hhcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlKCkge1xuICAgICAgaWYgKGluZGV4ID49IHBhdGgubGVuZ3RoKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIHZhciBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXTtcbiAgICAgIGlmICgobW9kZSA9PSAnaW5TaW5nbGVRdW90ZScgJiYgbmV4dENoYXIgPT0gXCInXCIpIHx8XG4gICAgICAgICAgKG1vZGUgPT0gJ2luRG91YmxlUXVvdGUnICYmIG5leHRDaGFyID09ICdcIicpKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIG5ld0NoYXIgPSBuZXh0Q2hhcjtcbiAgICAgICAgYWN0aW9ucy5hcHBlbmQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKG1vZGUpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgICBjID0gcGF0aFtpbmRleF07XG5cbiAgICAgIGlmIChjID09ICdcXFxcJyAmJiBtYXliZVVuZXNjYXBlUXVvdGUobW9kZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB0eXBlID0gZ2V0UGF0aENoYXJUeXBlKGMpO1xuICAgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV07XG4gICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwWydlbHNlJ10gfHwgJ2Vycm9yJztcblxuICAgICAgaWYgKHRyYW5zaXRpb24gPT0gJ2Vycm9yJylcbiAgICAgICAgcmV0dXJuOyAvLyBwYXJzZSBlcnJvcjtcblxuICAgICAgbW9kZSA9IHRyYW5zaXRpb25bMF07XG4gICAgICBhY3Rpb24gPSBhY3Rpb25zW3RyYW5zaXRpb25bMV1dIHx8IG5vb3A7XG4gICAgICBuZXdDaGFyID0gdHJhbnNpdGlvblsyXSA9PT0gdW5kZWZpbmVkID8gYyA6IHRyYW5zaXRpb25bMl07XG4gICAgICBhY3Rpb24oKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZnRlclBhdGgnKSB7XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybjsgLy8gcGFyc2UgZXJyb3JcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSWRlbnQocykge1xuICAgIHJldHVybiBpZGVudFJlZ0V4cC50ZXN0KHMpO1xuICB9XG5cbiAgdmFyIGNvbnN0cnVjdG9ySXNQcml2YXRlID0ge307XG5cbiAgZnVuY3Rpb24gUGF0aChwYXJ0cywgcHJpdmF0ZVRva2VuKSB7XG4gICAgaWYgKHByaXZhdGVUb2tlbiAhPT0gY29uc3RydWN0b3JJc1ByaXZhdGUpXG4gICAgICB0aHJvdyBFcnJvcignVXNlIFBhdGguZ2V0IHRvIHJldHJpZXZlIHBhdGggb2JqZWN0cycpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wdXNoKFN0cmluZyhwYXJ0c1tpXSkpO1xuICAgIH1cblxuICAgIGlmIChoYXNFdmFsICYmIHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdldFZhbHVlRnJvbSA9IHRoaXMuY29tcGlsZWRHZXRWYWx1ZUZyb21GbigpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8ocmFmYWVsdyk6IE1ha2Ugc2ltcGxlIExSVSBjYWNoZVxuICB2YXIgcGF0aENhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0UGF0aChwYXRoU3RyaW5nKSB7XG4gICAgaWYgKHBhdGhTdHJpbmcgaW5zdGFuY2VvZiBQYXRoKVxuICAgICAgcmV0dXJuIHBhdGhTdHJpbmc7XG5cbiAgICBpZiAocGF0aFN0cmluZyA9PSBudWxsIHx8IHBhdGhTdHJpbmcubGVuZ3RoID09IDApXG4gICAgICBwYXRoU3RyaW5nID0gJyc7XG5cbiAgICBpZiAodHlwZW9mIHBhdGhTdHJpbmcgIT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc0luZGV4KHBhdGhTdHJpbmcubGVuZ3RoKSkge1xuICAgICAgICAvLyBDb25zdHJ1Y3RlZCB3aXRoIGFycmF5LWxpa2UgKHByZS1wYXJzZWQpIGtleXNcbiAgICAgICAgcmV0dXJuIG5ldyBQYXRoKHBhdGhTdHJpbmcsIGNvbnN0cnVjdG9ySXNQcml2YXRlKTtcbiAgICAgIH1cblxuICAgICAgcGF0aFN0cmluZyA9IFN0cmluZyhwYXRoU3RyaW5nKTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aCA9IHBhdGhDYWNoZVtwYXRoU3RyaW5nXTtcbiAgICBpZiAocGF0aClcbiAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgdmFyIHBhcnRzID0gcGFyc2VQYXRoKHBhdGhTdHJpbmcpO1xuICAgIGlmICghcGFydHMpXG4gICAgICByZXR1cm4gaW52YWxpZFBhdGg7XG5cbiAgICB2YXIgcGF0aCA9IG5ldyBQYXRoKHBhcnRzLCBjb25zdHJ1Y3RvcklzUHJpdmF0ZSk7XG4gICAgcGF0aENhY2hlW3BhdGhTdHJpbmddID0gcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIFBhdGguZ2V0ID0gZ2V0UGF0aDtcblxuICBmdW5jdGlvbiBmb3JtYXRBY2Nlc3NvcihrZXkpIHtcbiAgICBpZiAoaXNJbmRleChrZXkpKSB7XG4gICAgICByZXR1cm4gJ1snICsga2V5ICsgJ10nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1tcIicgKyBrZXkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXSc7XG4gICAgfVxuICB9XG5cbiAgUGF0aC5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogW10sXG4gICAgdmFsaWQ6IHRydWUsXG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGF0aFN0cmluZyA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzW2ldO1xuICAgICAgICBpZiAoaXNJZGVudChrZXkpKSB7XG4gICAgICAgICAgcGF0aFN0cmluZyArPSBpID8gJy4nICsga2V5IDoga2V5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGhTdHJpbmcgKz0gZm9ybWF0QWNjZXNzb3Ioa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0aFN0cmluZztcbiAgICB9LFxuXG4gICAgZ2V0VmFsdWVGcm9tOiBmdW5jdGlvbihvYmosIGRpcmVjdE9ic2VydmVyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb2JqID0gb2JqW3RoaXNbaV1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuXG4gICAgaXRlcmF0ZU9iamVjdHM6IGZ1bmN0aW9uKG9iaiwgb2JzZXJ2ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpKVxuICAgICAgICAgIG9iaiA9IG9ialt0aGlzW2kgLSAxXV07XG4gICAgICAgIGlmICghaXNPYmplY3Qob2JqKSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIG9ic2VydmUob2JqLCB0aGlzWzBdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcGlsZWRHZXRWYWx1ZUZyb21GbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RyID0gJyc7XG4gICAgICB2YXIgcGF0aFN0cmluZyA9ICdvYmonO1xuICAgICAgc3RyICs9ICdpZiAob2JqICE9IG51bGwnO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGtleTtcbiAgICAgIGZvciAoOyBpIDwgKHRoaXMubGVuZ3RoIC0gMSk7IGkrKykge1xuICAgICAgICBrZXkgPSB0aGlzW2ldO1xuICAgICAgICBwYXRoU3RyaW5nICs9IGlzSWRlbnQoa2V5KSA/ICcuJyArIGtleSA6IGZvcm1hdEFjY2Vzc29yKGtleSk7XG4gICAgICAgIHN0ciArPSAnICYmXFxuICAgICAnICsgcGF0aFN0cmluZyArICcgIT0gbnVsbCc7XG4gICAgICB9XG4gICAgICBzdHIgKz0gJylcXG4nO1xuXG4gICAgICB2YXIga2V5ID0gdGhpc1tpXTtcbiAgICAgIHBhdGhTdHJpbmcgKz0gaXNJZGVudChrZXkpID8gJy4nICsga2V5IDogZm9ybWF0QWNjZXNzb3Ioa2V5KTtcblxuICAgICAgc3RyICs9ICcgIHJldHVybiAnICsgcGF0aFN0cmluZyArICc7XFxuZWxzZVxcbiAgcmV0dXJuIHVuZGVmaW5lZDsnO1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbignb2JqJywgc3RyKTtcbiAgICB9LFxuXG4gICAgc2V0VmFsdWVGcm9tOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKCFpc09iamVjdChvYmopKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgb2JqID0gb2JqW3RoaXNbaV1dO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzT2JqZWN0KG9iaikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgb2JqW3RoaXNbaV1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBpbnZhbGlkUGF0aCA9IG5ldyBQYXRoKCcnLCBjb25zdHJ1Y3RvcklzUHJpdmF0ZSk7XG4gIGludmFsaWRQYXRoLnZhbGlkID0gZmFsc2U7XG4gIGludmFsaWRQYXRoLmdldFZhbHVlRnJvbSA9IGludmFsaWRQYXRoLnNldFZhbHVlRnJvbSA9IGZ1bmN0aW9uKCkge307XG5cbiAgdmFyIE1BWF9ESVJUWV9DSEVDS19DWUNMRVMgPSAxMDAwO1xuXG4gIGZ1bmN0aW9uIGRpcnR5Q2hlY2sob2JzZXJ2ZXIpIHtcbiAgICB2YXIgY3ljbGVzID0gMDtcbiAgICB3aGlsZSAoY3ljbGVzIDwgTUFYX0RJUlRZX0NIRUNLX0NZQ0xFUyAmJiBvYnNlcnZlci5jaGVja18oKSkge1xuICAgICAgY3ljbGVzKys7XG4gICAgfVxuICAgIGlmICh0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudClcbiAgICAgIGdsb2JhbC5kaXJ0eUNoZWNrQ3ljbGVDb3VudCA9IGN5Y2xlcztcblxuICAgIHJldHVybiBjeWNsZXMgPiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JqZWN0SXNFbXB0eShvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZJc0VtcHR5KGRpZmYpIHtcbiAgICByZXR1cm4gb2JqZWN0SXNFbXB0eShkaWZmLmFkZGVkKSAmJlxuICAgICAgICAgICBvYmplY3RJc0VtcHR5KGRpZmYucmVtb3ZlZCkgJiZcbiAgICAgICAgICAgb2JqZWN0SXNFbXB0eShkaWZmLmNoYW5nZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZk9iamVjdEZyb21PbGRPYmplY3Qob2JqZWN0LCBvbGRPYmplY3QpIHtcbiAgICB2YXIgYWRkZWQgPSB7fTtcbiAgICB2YXIgcmVtb3ZlZCA9IHt9O1xuICAgIHZhciBjaGFuZ2VkID0ge307XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIG9sZE9iamVjdCkge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gb2JqZWN0W3Byb3BdO1xuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZSA9PT0gb2xkT2JqZWN0W3Byb3BdKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKCEocHJvcCBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJlbW92ZWRbcHJvcF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZE9iamVjdFtwcm9wXSlcbiAgICAgICAgY2hhbmdlZFtwcm9wXSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAocHJvcCBpbiBvbGRPYmplY3QpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhZGRlZFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5sZW5ndGggIT09IG9sZE9iamVjdC5sZW5ndGgpXG4gICAgICBjaGFuZ2VkLmxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGNoYW5nZWQ6IGNoYW5nZWRcbiAgICB9O1xuICB9XG5cbiAgdmFyIGVvbVRhc2tzID0gW107XG4gIGZ1bmN0aW9uIHJ1bkVPTVRhc2tzKCkge1xuICAgIGlmICghZW9tVGFza3MubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlb21UYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgZW9tVGFza3NbaV0oKTtcbiAgICB9XG4gICAgZW9tVGFza3MubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBydW5FT00gPSBoYXNPYnNlcnZlID8gKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVvbU9iaiA9IHsgcGluZ1Bvbmc6IHRydWUgfTtcbiAgICB2YXIgZW9tUnVuU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICBPYmplY3Qub2JzZXJ2ZShlb21PYmosIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuRU9NVGFza3MoKTtcbiAgICAgIGVvbVJ1blNjaGVkdWxlZCA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7XG4gICAgICBlb21UYXNrcy5wdXNoKGZuKTtcbiAgICAgIGlmICghZW9tUnVuU2NoZWR1bGVkKSB7XG4gICAgICAgIGVvbVJ1blNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIGVvbU9iai5waW5nUG9uZyA9ICFlb21PYmoucGluZ1Bvbmc7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG4gIChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZm4pIHtcbiAgICAgIGVvbVRhc2tzLnB1c2goZm4pO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIG9ic2VydmVkT2JqZWN0Q2FjaGUgPSBbXTtcblxuICBmdW5jdGlvbiBuZXdPYnNlcnZlZE9iamVjdCgpIHtcbiAgICB2YXIgb2JzZXJ2ZXI7XG4gICAgdmFyIG9iamVjdDtcbiAgICB2YXIgZGlzY2FyZFJlY29yZHMgPSBmYWxzZTtcbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVjb3Jkcykge1xuICAgICAgaWYgKG9ic2VydmVyICYmIG9ic2VydmVyLnN0YXRlXyA9PT0gT1BFTkVEICYmICFkaXNjYXJkUmVjb3JkcylcbiAgICAgICAgb2JzZXJ2ZXIuY2hlY2tfKHJlY29yZHMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiBmdW5jdGlvbihvYnMpIHtcbiAgICAgICAgaWYgKG9ic2VydmVyKVxuICAgICAgICAgIHRocm93IEVycm9yKCdPYnNlcnZlZE9iamVjdCBpbiB1c2UnKTtcblxuICAgICAgICBpZiAoIWZpcnN0KVxuICAgICAgICAgIE9iamVjdC5kZWxpdmVyQ2hhbmdlUmVjb3JkcyhjYWxsYmFjayk7XG5cbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnM7XG4gICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgb2JzZXJ2ZTogZnVuY3Rpb24ob2JqLCBhcnJheU9ic2VydmUpIHtcbiAgICAgICAgb2JqZWN0ID0gb2JqO1xuICAgICAgICBpZiAoYXJyYXlPYnNlcnZlKVxuICAgICAgICAgIEFycmF5Lm9ic2VydmUob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBPYmplY3Qub2JzZXJ2ZShvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBkZWxpdmVyOiBmdW5jdGlvbihkaXNjYXJkKSB7XG4gICAgICAgIGRpc2NhcmRSZWNvcmRzID0gZGlzY2FyZDtcbiAgICAgICAgT2JqZWN0LmRlbGl2ZXJDaGFuZ2VSZWNvcmRzKGNhbGxiYWNrKTtcbiAgICAgICAgZGlzY2FyZFJlY29yZHMgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIG9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICBPYmplY3QudW5vYnNlcnZlKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgICBvYnNlcnZlZE9iamVjdENhY2hlLnB1c2godGhpcyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICAqIFRoZSBvYnNlcnZlZFNldCBhYnN0cmFjdGlvbiBpcyBhIHBlcmYgb3B0aW1pemF0aW9uIHdoaWNoIHJlZHVjZXMgdGhlIHRvdGFsXG4gICAqIG51bWJlciBvZiBPYmplY3Qub2JzZXJ2ZSBvYnNlcnZhdGlvbnMgb2YgYSBzZXQgb2Ygb2JqZWN0cy4gVGhlIGlkZWEgaXMgdGhhdFxuICAgKiBncm91cHMgb2YgT2JzZXJ2ZXJzIHdpbGwgaGF2ZSBzb21lIG9iamVjdCBkZXBlbmRlbmNpZXMgaW4gY29tbW9uIGFuZCB0aGlzXG4gICAqIG9ic2VydmVkIHNldCBlbnN1cmVzIHRoYXQgZWFjaCBvYmplY3QgaW4gdGhlIHRyYW5zaXRpdmUgY2xvc3VyZSBvZlxuICAgKiBkZXBlbmRlbmNpZXMgaXMgb25seSBvYnNlcnZlZCBvbmNlLiBUaGUgb2JzZXJ2ZWRTZXQgYWN0cyBhcyBhIHdyaXRlIGJhcnJpZXJcbiAgICogc3VjaCB0aGF0IHdoZW5ldmVyIGFueSBjaGFuZ2UgY29tZXMgdGhyb3VnaCwgYWxsIE9ic2VydmVycyBhcmUgY2hlY2tlZCBmb3JcbiAgICogY2hhbmdlZCB2YWx1ZXMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIG9wdGltaXphdGlvbiBpcyBleHBsaWNpdGx5IG1vdmluZyB3b3JrIGZyb20gc2V0dXAtdGltZSB0b1xuICAgKiBjaGFuZ2UtdGltZS5cbiAgICpcbiAgICogVE9ETyhyYWZhZWx3KTogSW1wbGVtZW50IFwiZ2FyYmFnZSBjb2xsZWN0aW9uXCIuIEluIG9yZGVyIHRvIG1vdmUgd29yayBvZmZcbiAgICogdGhlIGNyaXRpY2FsIHBhdGgsIHdoZW4gT2JzZXJ2ZXJzIGFyZSBjbG9zZWQsIHRoZWlyIG9ic2VydmVkIG9iamVjdHMgYXJlXG4gICAqIG5vdCBPYmplY3QudW5vYnNlcnZlKGQpLiBBcyBhIHJlc3VsdCwgaXQncyBwb3NzaWJsZSB0aGF0IGlmIHRoZSBvYnNlcnZlZFNldFxuICAgKiBpcyBrZXB0IG9wZW4sIGJ1dCBzb21lIE9ic2VydmVycyBoYXZlIGJlZW4gY2xvc2VkLCBpdCBjb3VsZCBjYXVzZSBcImxlYWtzXCJcbiAgICogKHByZXZlbnQgb3RoZXJ3aXNlIGNvbGxlY3RhYmxlIG9iamVjdHMgZnJvbSBiZWluZyBjb2xsZWN0ZWQpLiBBdCBzb21lXG4gICAqIHBvaW50LCB3ZSBzaG91bGQgaW1wbGVtZW50IGluY3JlbWVudGFsIFwiZ2NcIiB3aGljaCBrZWVwcyBhIGxpc3Qgb2ZcbiAgICogb2JzZXJ2ZWRTZXRzIHdoaWNoIG1heSBuZWVkIGNsZWFuLXVwIGFuZCBkb2VzIHNtYWxsIGFtb3VudHMgb2YgY2xlYW51cCBvbiBhXG4gICAqIHRpbWVvdXQgdW50aWwgYWxsIGlzIGNsZWFuLlxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRPYnNlcnZlZE9iamVjdChvYnNlcnZlciwgb2JqZWN0LCBhcnJheU9ic2VydmUpIHtcbiAgICB2YXIgZGlyID0gb2JzZXJ2ZWRPYmplY3RDYWNoZS5wb3AoKSB8fCBuZXdPYnNlcnZlZE9iamVjdCgpO1xuICAgIGRpci5vcGVuKG9ic2VydmVyKTtcbiAgICBkaXIub2JzZXJ2ZShvYmplY3QsIGFycmF5T2JzZXJ2ZSk7XG4gICAgcmV0dXJuIGRpcjtcbiAgfVxuXG4gIHZhciBvYnNlcnZlZFNldENhY2hlID0gW107XG5cbiAgZnVuY3Rpb24gbmV3T2JzZXJ2ZWRTZXQoKSB7XG4gICAgdmFyIG9ic2VydmVyQ291bnQgPSAwO1xuICAgIHZhciBvYnNlcnZlcnMgPSBbXTtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIHZhciByb290T2JqO1xuICAgIHZhciByb290T2JqUHJvcHM7XG5cbiAgICBmdW5jdGlvbiBvYnNlcnZlKG9iaiwgcHJvcCkge1xuICAgICAgaWYgKCFvYmopXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaWYgKG9iaiA9PT0gcm9vdE9iailcbiAgICAgICAgcm9vdE9ialByb3BzW3Byb3BdID0gdHJ1ZTtcblxuICAgICAgaWYgKG9iamVjdHMuaW5kZXhPZihvYmopIDwgMCkge1xuICAgICAgICBvYmplY3RzLnB1c2gob2JqKTtcbiAgICAgICAgT2JqZWN0Lm9ic2VydmUob2JqLCBjYWxsYmFjayk7XG4gICAgICB9XG5cbiAgICAgIG9ic2VydmUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiksIHByb3ApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbFJvb3RPYmpOb25PYnNlcnZlZFByb3BzKHJlY3MpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVjID0gcmVjc1tpXTtcbiAgICAgICAgaWYgKHJlYy5vYmplY3QgIT09IHJvb3RPYmogfHxcbiAgICAgICAgICAgIHJvb3RPYmpQcm9wc1tyZWMubmFtZV0gfHxcbiAgICAgICAgICAgIHJlYy50eXBlID09PSAnc2V0UHJvdG90eXBlJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVjcykge1xuICAgICAgaWYgKGFsbFJvb3RPYmpOb25PYnNlcnZlZFByb3BzKHJlY3MpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIHZhciBvYnNlcnZlcjtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xuICAgICAgICBpZiAob2JzZXJ2ZXIuc3RhdGVfID09IE9QRU5FRCkge1xuICAgICAgICAgIG9ic2VydmVyLml0ZXJhdGVPYmplY3RzXyhvYnNlcnZlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcbiAgICAgICAgaWYgKG9ic2VydmVyLnN0YXRlXyA9PSBPUEVORUQpIHtcbiAgICAgICAgICBvYnNlcnZlci5jaGVja18oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB7XG4gICAgICBvYmplY3Q6IHVuZGVmaW5lZCxcbiAgICAgIG9iamVjdHM6IG9iamVjdHMsXG4gICAgICBvcGVuOiBmdW5jdGlvbihvYnMsIG9iamVjdCkge1xuICAgICAgICBpZiAoIXJvb3RPYmopIHtcbiAgICAgICAgICByb290T2JqID0gb2JqZWN0O1xuICAgICAgICAgIHJvb3RPYmpQcm9wcyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzKTtcbiAgICAgICAgb2JzZXJ2ZXJDb3VudCsrO1xuICAgICAgICBvYnMuaXRlcmF0ZU9iamVjdHNfKG9ic2VydmUpO1xuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbihvYnMpIHtcbiAgICAgICAgb2JzZXJ2ZXJDb3VudC0tO1xuICAgICAgICBpZiAob2JzZXJ2ZXJDb3VudCA+IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBPYmplY3QudW5vYnNlcnZlKG9iamVjdHNbaV0sIGNhbGxiYWNrKTtcbiAgICAgICAgICBPYnNlcnZlci51bm9ic2VydmVkQ291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgICAgICBvYmplY3RzLmxlbmd0aCA9IDA7XG4gICAgICAgIHJvb3RPYmogPSB1bmRlZmluZWQ7XG4gICAgICAgIHJvb3RPYmpQcm9wcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgb2JzZXJ2ZWRTZXRDYWNoZS5wdXNoKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgdmFyIGxhc3RPYnNlcnZlZFNldDtcblxuICBmdW5jdGlvbiBnZXRPYnNlcnZlZFNldChvYnNlcnZlciwgb2JqKSB7XG4gICAgaWYgKCFsYXN0T2JzZXJ2ZWRTZXQgfHwgbGFzdE9ic2VydmVkU2V0Lm9iamVjdCAhPT0gb2JqKSB7XG4gICAgICBsYXN0T2JzZXJ2ZWRTZXQgPSBvYnNlcnZlZFNldENhY2hlLnBvcCgpIHx8IG5ld09ic2VydmVkU2V0KCk7XG4gICAgICBsYXN0T2JzZXJ2ZWRTZXQub2JqZWN0ID0gb2JqO1xuICAgIH1cbiAgICBsYXN0T2JzZXJ2ZWRTZXQub3BlbihvYnNlcnZlciwgb2JqKTtcbiAgICByZXR1cm4gbGFzdE9ic2VydmVkU2V0O1xuICB9XG5cbiAgdmFyIFVOT1BFTkVEID0gMDtcbiAgdmFyIE9QRU5FRCA9IDE7XG4gIHZhciBDTE9TRUQgPSAyO1xuICB2YXIgUkVTRVRUSU5HID0gMztcblxuICB2YXIgbmV4dE9ic2VydmVySWQgPSAxO1xuXG4gIGZ1bmN0aW9uIE9ic2VydmVyKCkge1xuICAgIHRoaXMuc3RhdGVfID0gVU5PUEVORUQ7XG4gICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkOyAvLyBUT0RPKHJhZmFlbHcpOiBTaG91bGQgYmUgV2Vha1JlZlxuICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaWRfID0gbmV4dE9ic2VydmVySWQrKztcbiAgfVxuXG4gIE9ic2VydmVyLnByb3RvdHlwZSA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gVU5PUEVORUQpXG4gICAgICAgIHRocm93IEVycm9yKCdPYnNlcnZlciBoYXMgYWxyZWFkeSBiZWVuIG9wZW5lZC4nKTtcblxuICAgICAgYWRkVG9BbGwodGhpcyk7XG4gICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy50YXJnZXRfID0gdGFyZ2V0O1xuICAgICAgdGhpcy5jb25uZWN0XygpO1xuICAgICAgdGhpcy5zdGF0ZV8gPSBPUEVORUQ7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgcmVtb3ZlRnJvbUFsbCh0aGlzKTtcbiAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRhcmdldF8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnN0YXRlXyA9IENMT1NFRDtcbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGRpcnR5Q2hlY2sodGhpcyk7XG4gICAgfSxcblxuICAgIHJlcG9ydF86IGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmFwcGx5KHRoaXMudGFyZ2V0XywgY2hhbmdlcyk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBPYnNlcnZlci5fZXJyb3JUaHJvd25EdXJpbmdDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V4Y2VwdGlvbiBjYXVnaHQgZHVyaW5nIG9ic2VydmVyIGNhbGxiYWNrOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgKGV4LnN0YWNrIHx8IGV4KSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRpc2NhcmRDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2hlY2tfKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbGxlY3RPYnNlcnZlcnMgPSAhaGFzT2JzZXJ2ZTtcbiAgdmFyIGFsbE9ic2VydmVycztcbiAgT2JzZXJ2ZXIuX2FsbE9ic2VydmVyc0NvdW50ID0gMDtcblxuICBpZiAoY29sbGVjdE9ic2VydmVycykge1xuICAgIGFsbE9ic2VydmVycyA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9BbGwob2JzZXJ2ZXIpIHtcbiAgICBPYnNlcnZlci5fYWxsT2JzZXJ2ZXJzQ291bnQrKztcbiAgICBpZiAoIWNvbGxlY3RPYnNlcnZlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBhbGxPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVGcm9tQWxsKG9ic2VydmVyKSB7XG4gICAgT2JzZXJ2ZXIuX2FsbE9ic2VydmVyc0NvdW50LS07XG4gIH1cblxuICB2YXIgcnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQgPSBmYWxzZTtcblxuICBnbG9iYWwuUGxhdGZvcm0gPSBnbG9iYWwuUGxhdGZvcm0gfHwge307XG5cbiAgZ2xvYmFsLlBsYXRmb3JtLnBlcmZvcm1NaWNyb3Rhc2tDaGVja3BvaW50ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50KVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKCFjb2xsZWN0T2JzZXJ2ZXJzKVxuICAgICAgcmV0dXJuO1xuXG4gICAgcnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQgPSB0cnVlO1xuXG4gICAgdmFyIGN5Y2xlcyA9IDA7XG4gICAgdmFyIGFueUNoYW5nZWQsIHRvQ2hlY2s7XG5cbiAgICBkbyB7XG4gICAgICBjeWNsZXMrKztcbiAgICAgIHRvQ2hlY2sgPSBhbGxPYnNlcnZlcnM7XG4gICAgICBhbGxPYnNlcnZlcnMgPSBbXTtcbiAgICAgIGFueUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b0NoZWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IHRvQ2hlY2tbaV07XG4gICAgICAgIGlmIChvYnNlcnZlci5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChvYnNlcnZlci5jaGVja18oKSlcbiAgICAgICAgICBhbnlDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICBhbGxPYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICB9XG4gICAgICBpZiAocnVuRU9NVGFza3MoKSlcbiAgICAgICAgYW55Q2hhbmdlZCA9IHRydWU7XG4gICAgfSB3aGlsZSAoY3ljbGVzIDwgTUFYX0RJUlRZX0NIRUNLX0NZQ0xFUyAmJiBhbnlDaGFuZ2VkKTtcblxuICAgIGlmICh0ZXN0aW5nRXhwb3NlQ3ljbGVDb3VudClcbiAgICAgIGdsb2JhbC5kaXJ0eUNoZWNrQ3ljbGVDb3VudCA9IGN5Y2xlcztcblxuICAgIHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50ID0gZmFsc2U7XG4gIH07XG5cbiAgaWYgKGNvbGxlY3RPYnNlcnZlcnMpIHtcbiAgICBnbG9iYWwuUGxhdGZvcm0uY2xlYXJPYnNlcnZlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGFsbE9ic2VydmVycyA9IFtdO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBPYmplY3RPYnNlcnZlcihvYmplY3QpIHtcbiAgICBPYnNlcnZlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMudmFsdWVfID0gb2JqZWN0O1xuICAgIHRoaXMub2xkT2JqZWN0XyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIE9iamVjdE9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG4gICAgX19wcm90b19fOiBPYnNlcnZlci5wcm90b3R5cGUsXG5cbiAgICBhcnJheU9ic2VydmU6IGZhbHNlLFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gZ2V0T2JzZXJ2ZWRPYmplY3QodGhpcywgdGhpcy52YWx1ZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU9ic2VydmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb3B5T2JqZWN0OiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIHZhciBjb3B5ID0gQXJyYXkuaXNBcnJheShvYmplY3QpID8gW10gOiB7fTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgIGNvcHlbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgICB9O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgICAgY29weS5sZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcywgc2tpcENoYW5nZXMpIHtcbiAgICAgIHZhciBkaWZmO1xuICAgICAgdmFyIG9sZFZhbHVlcztcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIGlmICghY2hhbmdlUmVjb3JkcylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgb2xkVmFsdWVzID0ge307XG4gICAgICAgIGRpZmYgPSBkaWZmT2JqZWN0RnJvbUNoYW5nZVJlY29yZHModGhpcy52YWx1ZV8sIGNoYW5nZVJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9sZFZhbHVlcyA9IHRoaXMub2xkT2JqZWN0XztcbiAgICAgICAgZGlmZiA9IGRpZmZPYmplY3RGcm9tT2xkT2JqZWN0KHRoaXMudmFsdWVfLCB0aGlzLm9sZE9iamVjdF8pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlmZklzRW1wdHkoZGlmZikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKCFoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuXG4gICAgICB0aGlzLnJlcG9ydF8oW1xuICAgICAgICBkaWZmLmFkZGVkIHx8IHt9LFxuICAgICAgICBkaWZmLnJlbW92ZWQgfHwge30sXG4gICAgICAgIGRpZmYuY2hhbmdlZCB8fCB7fSxcbiAgICAgICAgZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gb2xkVmFsdWVzW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgXSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGlmIChoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5kZWxpdmVyKGZhbHNlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGlydHlDaGVjayh0aGlzKTtcbiAgICB9LFxuXG4gICAgZGlzY2FyZENoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0T2JzZXJ2ZXJfKVxuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5kZWxpdmVyKHRydWUpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBBcnJheU9ic2VydmVyKGFycmF5KSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSlcbiAgICAgIHRocm93IEVycm9yKCdQcm92aWRlZCBvYmplY3QgaXMgbm90IGFuIEFycmF5Jyk7XG4gICAgT2JqZWN0T2JzZXJ2ZXIuY2FsbCh0aGlzLCBhcnJheSk7XG4gIH1cblxuICBBcnJheU9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG5cbiAgICBfX3Byb3RvX186IE9iamVjdE9ic2VydmVyLnByb3RvdHlwZSxcblxuICAgIGFycmF5T2JzZXJ2ZTogdHJ1ZSxcblxuICAgIGNvcHlPYmplY3Q6IGZ1bmN0aW9uKGFycikge1xuICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMpIHtcbiAgICAgIHZhciBzcGxpY2VzO1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2VSZWNvcmRzKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgc3BsaWNlcyA9IHByb2plY3RBcnJheVNwbGljZXModGhpcy52YWx1ZV8sIGNoYW5nZVJlY29yZHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaWNlcyA9IGNhbGNTcGxpY2VzKHRoaXMudmFsdWVfLCAwLCB0aGlzLnZhbHVlXy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9sZE9iamVjdF8sIDAsIHRoaXMub2xkT2JqZWN0Xy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNwbGljZXMgfHwgIXNwbGljZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmICghaGFzT2JzZXJ2ZSlcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcblxuICAgICAgdGhpcy5yZXBvcnRfKFtzcGxpY2VzXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIEFycmF5T2JzZXJ2ZXIuYXBwbHlTcGxpY2VzID0gZnVuY3Rpb24ocHJldmlvdXMsIGN1cnJlbnQsIHNwbGljZXMpIHtcbiAgICBzcGxpY2VzLmZvckVhY2goZnVuY3Rpb24oc3BsaWNlKSB7XG4gICAgICB2YXIgc3BsaWNlQXJncyA9IFtzcGxpY2UuaW5kZXgsIHNwbGljZS5yZW1vdmVkLmxlbmd0aF07XG4gICAgICB2YXIgYWRkSW5kZXggPSBzcGxpY2UuaW5kZXg7XG4gICAgICB3aGlsZSAoYWRkSW5kZXggPCBzcGxpY2UuaW5kZXggKyBzcGxpY2UuYWRkZWRDb3VudCkge1xuICAgICAgICBzcGxpY2VBcmdzLnB1c2goY3VycmVudFthZGRJbmRleF0pO1xuICAgICAgICBhZGRJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHByZXZpb3VzLCBzcGxpY2VBcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBQYXRoT2JzZXJ2ZXIob2JqZWN0LCBwYXRoKSB7XG4gICAgT2JzZXJ2ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMub2JqZWN0XyA9IG9iamVjdDtcbiAgICB0aGlzLnBhdGhfID0gZ2V0UGF0aChwYXRoKTtcbiAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIFBhdGhPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogT2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgZ2V0IHBhdGgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoXztcbiAgICB9LFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpXG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gZ2V0T2JzZXJ2ZWRTZXQodGhpcywgdGhpcy5vYmplY3RfKTtcblxuICAgICAgdGhpcy5jaGVja18odW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0aGlzLmRpcmVjdE9ic2VydmVyXykge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5jbG9zZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGl0ZXJhdGVPYmplY3RzXzogZnVuY3Rpb24ob2JzZXJ2ZSkge1xuICAgICAgdGhpcy5wYXRoXy5pdGVyYXRlT2JqZWN0cyh0aGlzLm9iamVjdF8sIG9ic2VydmUpO1xuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMsIHNraXBDaGFuZ2VzKSB7XG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICAgIHRoaXMudmFsdWVfID0gdGhpcy5wYXRoXy5nZXRWYWx1ZUZyb20odGhpcy5vYmplY3RfKTtcbiAgICAgIGlmIChza2lwQ2hhbmdlcyB8fCBhcmVTYW1lVmFsdWUodGhpcy52YWx1ZV8sIG9sZFZhbHVlKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0aGlzLnJlcG9ydF8oW3RoaXMudmFsdWVfLCBvbGRWYWx1ZSwgdGhpc10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHNldFZhbHVlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMucGF0aF8pXG4gICAgICAgIHRoaXMucGF0aF8uc2V0VmFsdWVGcm9tKHRoaXMub2JqZWN0XywgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gQ29tcG91bmRPYnNlcnZlcihyZXBvcnRDaGFuZ2VzT25PcGVuKSB7XG4gICAgT2JzZXJ2ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8gPSByZXBvcnRDaGFuZ2VzT25PcGVuO1xuICAgIHRoaXMudmFsdWVfID0gW107XG4gICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vYnNlcnZlZF8gPSBbXTtcbiAgfVxuXG4gIHZhciBvYnNlcnZlclNlbnRpbmVsID0ge307XG5cbiAgQ29tcG91bmRPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogT2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgdmFyIG5lZWRzRGlyZWN0T2JzZXJ2ZXIgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgIG9iamVjdCA9IHRoaXMub2JzZXJ2ZWRfW2ldXG4gICAgICAgICAgaWYgKG9iamVjdCAhPT0gb2JzZXJ2ZXJTZW50aW5lbCkge1xuICAgICAgICAgICAgbmVlZHNEaXJlY3RPYnNlcnZlciA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmVlZHNEaXJlY3RPYnNlcnZlcilcbiAgICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IGdldE9ic2VydmVkU2V0KHRoaXMsIG9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hlY2tfKHVuZGVmaW5lZCwgIXRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8pO1xuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVkX1tpXSA9PT0gb2JzZXJ2ZXJTZW50aW5lbClcbiAgICAgICAgICB0aGlzLm9ic2VydmVkX1tpICsgMV0uY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub2JzZXJ2ZWRfLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnZhbHVlXy5sZW5ndGggPSAwO1xuXG4gICAgICBpZiAodGhpcy5kaXJlY3RPYnNlcnZlcl8pIHtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uY2xvc2UodGhpcyk7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRQYXRoOiBmdW5jdGlvbihvYmplY3QsIHBhdGgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBVTk9QRU5FRCAmJiB0aGlzLnN0YXRlXyAhPSBSRVNFVFRJTkcpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgYWRkIHBhdGhzIG9uY2Ugc3RhcnRlZC4nKTtcblxuICAgICAgdmFyIHBhdGggPSBnZXRQYXRoKHBhdGgpO1xuICAgICAgdGhpcy5vYnNlcnZlZF8ucHVzaChvYmplY3QsIHBhdGgpO1xuICAgICAgaWYgKCF0aGlzLnJlcG9ydENoYW5nZXNPbk9wZW5fKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLm9ic2VydmVkXy5sZW5ndGggLyAyIC0gMTtcbiAgICAgIHRoaXMudmFsdWVfW2luZGV4XSA9IHBhdGguZ2V0VmFsdWVGcm9tKG9iamVjdCk7XG4gICAgfSxcblxuICAgIGFkZE9ic2VydmVyOiBmdW5jdGlvbihvYnNlcnZlcikge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IFVOT1BFTkVEICYmIHRoaXMuc3RhdGVfICE9IFJFU0VUVElORylcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBhZGQgb2JzZXJ2ZXJzIG9uY2Ugc3RhcnRlZC4nKTtcblxuICAgICAgdGhpcy5vYnNlcnZlZF8ucHVzaChvYnNlcnZlclNlbnRpbmVsLCBvYnNlcnZlcik7XG4gICAgICBpZiAoIXRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8pXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciBpbmRleCA9IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgdGhpcy52YWx1ZV9baW5kZXhdID0gb2JzZXJ2ZXIub3Blbih0aGlzLmRlbGl2ZXIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBzdGFydFJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gb25seSByZXNldCB3aGlsZSBvcGVuJyk7XG5cbiAgICAgIHRoaXMuc3RhdGVfID0gUkVTRVRUSU5HO1xuICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xuICAgIH0sXG5cbiAgICBmaW5pc2hSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gUkVTRVRUSU5HKVxuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG9ubHkgZmluaXNoUmVzZXQgYWZ0ZXIgc3RhcnRSZXNldCcpO1xuICAgICAgdGhpcy5zdGF0ZV8gPSBPUEVORUQ7XG4gICAgICB0aGlzLmNvbm5lY3RfKCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgaXRlcmF0ZU9iamVjdHNfOiBmdW5jdGlvbihvYnNlcnZlKSB7XG4gICAgICB2YXIgb2JqZWN0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBvYmplY3QgPSB0aGlzLm9ic2VydmVkX1tpXVxuICAgICAgICBpZiAob2JqZWN0ICE9PSBvYnNlcnZlclNlbnRpbmVsKVxuICAgICAgICAgIHRoaXMub2JzZXJ2ZWRfW2kgKyAxXS5pdGVyYXRlT2JqZWN0cyhvYmplY3QsIG9ic2VydmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcywgc2tpcENoYW5nZXMpIHtcbiAgICAgIHZhciBvbGRWYWx1ZXM7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSB0aGlzLm9ic2VydmVkX1tpXTtcbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLm9ic2VydmVkX1tpKzFdO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIGlmIChvYmplY3QgPT09IG9ic2VydmVyU2VudGluZWwpIHtcbiAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IHBhdGg7XG4gICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlXyA9PT0gVU5PUEVORUQgP1xuICAgICAgICAgICAgICBvYnNlcnZhYmxlLm9wZW4odGhpcy5kZWxpdmVyLCB0aGlzKSA6XG4gICAgICAgICAgICAgIG9ic2VydmFibGUuZGlzY2FyZENoYW5nZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IHBhdGguZ2V0VmFsdWVGcm9tKG9iamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2tpcENoYW5nZXMpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlX1tpIC8gMl0gPSB2YWx1ZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmVTYW1lVmFsdWUodmFsdWUsIHRoaXMudmFsdWVfW2kgLyAyXSkpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgb2xkVmFsdWVzID0gb2xkVmFsdWVzIHx8IFtdO1xuICAgICAgICBvbGRWYWx1ZXNbaSAvIDJdID0gdGhpcy52YWx1ZV9baSAvIDJdO1xuICAgICAgICB0aGlzLnZhbHVlX1tpIC8gMl0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvbGRWYWx1ZXMpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gVE9ETyhyYWZhZWx3KTogSGF2aW5nIG9ic2VydmVkXyBhcyB0aGUgdGhpcmQgY2FsbGJhY2sgYXJnIGhlcmUgaXNcbiAgICAgIC8vIHByZXR0eSBsYW1lIEFQSS4gRml4LlxuICAgICAgdGhpcy5yZXBvcnRfKFt0aGlzLnZhbHVlXywgb2xkVmFsdWVzLCB0aGlzLm9ic2VydmVkX10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBpZGVudEZuKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gIGZ1bmN0aW9uIE9ic2VydmVyVHJhbnNmb3JtKG9ic2VydmFibGUsIGdldFZhbHVlRm4sIHNldFZhbHVlRm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbnRQYXNzVGhyb3VnaFNldCkge1xuICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGFyZ2V0XyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9ic2VydmFibGVfID0gb2JzZXJ2YWJsZTtcbiAgICB0aGlzLmdldFZhbHVlRm5fID0gZ2V0VmFsdWVGbiB8fCBpZGVudEZuO1xuICAgIHRoaXMuc2V0VmFsdWVGbl8gPSBzZXRWYWx1ZUZuIHx8IGlkZW50Rm47XG4gICAgLy8gVE9ETyhyYWZhZWx3KTogVGhpcyBpcyBhIHRlbXBvcmFyeSBoYWNrLiBQb2x5bWVyRXhwcmVzc2lvbnMgbmVlZHMgdGhpc1xuICAgIC8vIGF0IHRoZSBtb21lbnQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBpdCdzIGRlcGVuZGVuY3kgdHJhY2tpbmcuXG4gICAgdGhpcy5kb250UGFzc1Rocm91Z2hTZXRfID0gZG9udFBhc3NUaHJvdWdoU2V0O1xuICB9XG5cbiAgT2JzZXJ2ZXJUcmFuc2Zvcm0ucHJvdG90eXBlID0ge1xuICAgIG9wZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XG4gICAgICB0aGlzLnRhcmdldF8gPSB0YXJnZXQ7XG4gICAgICB0aGlzLnZhbHVlXyA9XG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZUZuXyh0aGlzLm9ic2VydmFibGVfLm9wZW4odGhpcy5vYnNlcnZlZENhbGxiYWNrXywgdGhpcykpO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH0sXG5cbiAgICBvYnNlcnZlZENhbGxiYWNrXzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWx1ZUZuXyh2YWx1ZSk7XG4gICAgICBpZiAoYXJlU2FtZVZhbHVlKHZhbHVlLCB0aGlzLnZhbHVlXykpXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwodGhpcy50YXJnZXRfLCB0aGlzLnZhbHVlXywgb2xkVmFsdWUpO1xuICAgIH0sXG5cbiAgICBkaXNjYXJkQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnZhbHVlXyA9IHRoaXMuZ2V0VmFsdWVGbl8odGhpcy5vYnNlcnZhYmxlXy5kaXNjYXJkQ2hhbmdlcygpKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgZGVsaXZlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnNlcnZhYmxlXy5kZWxpdmVyKCk7XG4gICAgfSxcblxuICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnNldFZhbHVlRm5fKHZhbHVlKTtcbiAgICAgIGlmICghdGhpcy5kb250UGFzc1Rocm91Z2hTZXRfICYmIHRoaXMub2JzZXJ2YWJsZV8uc2V0VmFsdWUpXG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVfLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMub2JzZXJ2YWJsZV8pXG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZV8uY2xvc2UoKTtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5vYnNlcnZhYmxlXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5nZXRWYWx1ZUZuXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuc2V0VmFsdWVGbl8gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIGV4cGVjdGVkUmVjb3JkVHlwZXMgPSB7XG4gICAgYWRkOiB0cnVlLFxuICAgIHVwZGF0ZTogdHJ1ZSxcbiAgICBkZWxldGU6IHRydWVcbiAgfTtcblxuICBmdW5jdGlvbiBkaWZmT2JqZWN0RnJvbUNoYW5nZVJlY29yZHMob2JqZWN0LCBjaGFuZ2VSZWNvcmRzLCBvbGRWYWx1ZXMpIHtcbiAgICB2YXIgYWRkZWQgPSB7fTtcbiAgICB2YXIgcmVtb3ZlZCA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFuZ2VSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVjb3JkID0gY2hhbmdlUmVjb3Jkc1tpXTtcbiAgICAgIGlmICghZXhwZWN0ZWRSZWNvcmRUeXBlc1tyZWNvcmQudHlwZV0pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBjaGFuZ2VSZWNvcmQgdHlwZTogJyArIHJlY29yZC50eXBlKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZWNvcmQpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEocmVjb3JkLm5hbWUgaW4gb2xkVmFsdWVzKSlcbiAgICAgICAgb2xkVmFsdWVzW3JlY29yZC5uYW1lXSA9IHJlY29yZC5vbGRWYWx1ZTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09ICd1cGRhdGUnKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09ICdhZGQnKSB7XG4gICAgICAgIGlmIChyZWNvcmQubmFtZSBpbiByZW1vdmVkKVxuICAgICAgICAgIGRlbGV0ZSByZW1vdmVkW3JlY29yZC5uYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGFkZGVkW3JlY29yZC5uYW1lXSA9IHRydWU7XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHR5cGUgPSAnZGVsZXRlJ1xuICAgICAgaWYgKHJlY29yZC5uYW1lIGluIGFkZGVkKSB7XG4gICAgICAgIGRlbGV0ZSBhZGRlZFtyZWNvcmQubmFtZV07XG4gICAgICAgIGRlbGV0ZSBvbGRWYWx1ZXNbcmVjb3JkLm5hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlZFtyZWNvcmQubmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIHByb3AgaW4gYWRkZWQpXG4gICAgICBhZGRlZFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gcmVtb3ZlZClcbiAgICAgIHJlbW92ZWRbcHJvcF0gPSB1bmRlZmluZWQ7XG5cbiAgICB2YXIgY2hhbmdlZCA9IHt9O1xuICAgIGZvciAodmFyIHByb3AgaW4gb2xkVmFsdWVzKSB7XG4gICAgICBpZiAocHJvcCBpbiBhZGRlZCB8fCBwcm9wIGluIHJlbW92ZWQpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgbmV3VmFsdWUgPSBvYmplY3RbcHJvcF07XG4gICAgICBpZiAob2xkVmFsdWVzW3Byb3BdICE9PSBuZXdWYWx1ZSlcbiAgICAgICAgY2hhbmdlZFtwcm9wXSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhZGRlZDogYWRkZWQsXG4gICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgY2hhbmdlZDogY2hhbmdlZFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBuZXdTcGxpY2UoaW5kZXgsIHJlbW92ZWQsIGFkZGVkQ291bnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGFkZGVkQ291bnQ6IGFkZGVkQ291bnRcbiAgICB9O1xuICB9XG5cbiAgdmFyIEVESVRfTEVBVkUgPSAwO1xuICB2YXIgRURJVF9VUERBVEUgPSAxO1xuICB2YXIgRURJVF9BREQgPSAyO1xuICB2YXIgRURJVF9ERUxFVEUgPSAzO1xuXG4gIGZ1bmN0aW9uIEFycmF5U3BsaWNlKCkge31cblxuICBBcnJheVNwbGljZS5wcm90b3R5cGUgPSB7XG5cbiAgICAvLyBOb3RlOiBUaGlzIGZ1bmN0aW9uIGlzICpiYXNlZCogb24gdGhlIGNvbXB1dGF0aW9uIG9mIHRoZSBMZXZlbnNodGVpblxuICAgIC8vIFwiZWRpdFwiIGRpc3RhbmNlLiBUaGUgb25lIGNoYW5nZSBpcyB0aGF0IFwidXBkYXRlc1wiIGFyZSB0cmVhdGVkIGFzIHR3b1xuICAgIC8vIGVkaXRzIC0gbm90IG9uZS4gV2l0aCBBcnJheSBzcGxpY2VzLCBhbiB1cGRhdGUgaXMgcmVhbGx5IGEgZGVsZXRlXG4gICAgLy8gZm9sbG93ZWQgYnkgYW4gYWRkLiBCeSByZXRhaW5pbmcgdGhpcywgd2Ugb3B0aW1pemUgZm9yIFwia2VlcGluZ1wiIHRoZVxuICAgIC8vIG1heGltdW0gYXJyYXkgaXRlbXMgaW4gdGhlIG9yaWdpbmFsIGFycmF5LiBGb3IgZXhhbXBsZTpcbiAgICAvL1xuICAgIC8vICAgJ3h4eHgxMjMnIC0+ICcxMjN5eXl5J1xuICAgIC8vXG4gICAgLy8gV2l0aCAxLWVkaXQgdXBkYXRlcywgdGhlIHNob3J0ZXN0IHBhdGggd291bGQgYmUganVzdCB0byB1cGRhdGUgYWxsIHNldmVuXG4gICAgLy8gY2hhcmFjdGVycy4gV2l0aCAyLWVkaXQgdXBkYXRlcywgd2UgZGVsZXRlIDQsIGxlYXZlIDMsIGFuZCBhZGQgNC4gVGhpc1xuICAgIC8vIGxlYXZlcyB0aGUgc3Vic3RyaW5nICcxMjMnIGludGFjdC5cbiAgICBjYWxjRWRpdERpc3RhbmNlczogZnVuY3Rpb24oY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpIHtcbiAgICAgIC8vIFwiRGVsZXRpb25cIiBjb2x1bW5zXG4gICAgICB2YXIgcm93Q291bnQgPSBvbGRFbmQgLSBvbGRTdGFydCArIDE7XG4gICAgICB2YXIgY29sdW1uQ291bnQgPSBjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0ICsgMTtcbiAgICAgIHZhciBkaXN0YW5jZXMgPSBuZXcgQXJyYXkocm93Q291bnQpO1xuXG4gICAgICAvLyBcIkFkZGl0aW9uXCIgcm93cy4gSW5pdGlhbGl6ZSBudWxsIGNvbHVtbi5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgICAgICBkaXN0YW5jZXNbaV0gPSBuZXcgQXJyYXkoY29sdW1uQ291bnQpO1xuICAgICAgICBkaXN0YW5jZXNbaV1bMF0gPSBpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIG51bGwgcm93XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbkNvdW50OyBqKyspXG4gICAgICAgIGRpc3RhbmNlc1swXVtqXSA9IGo7XG5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGNvbHVtbkNvdW50OyBqKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5lcXVhbHMoY3VycmVudFtjdXJyZW50U3RhcnQgKyBqIC0gMV0sIG9sZFtvbGRTdGFydCArIGkgLSAxXSkpXG4gICAgICAgICAgICBkaXN0YW5jZXNbaV1bal0gPSBkaXN0YW5jZXNbaSAtIDFdW2ogLSAxXTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBub3J0aCA9IGRpc3RhbmNlc1tpIC0gMV1bal0gKyAxO1xuICAgICAgICAgICAgdmFyIHdlc3QgPSBkaXN0YW5jZXNbaV1baiAtIDFdICsgMTtcbiAgICAgICAgICAgIGRpc3RhbmNlc1tpXVtqXSA9IG5vcnRoIDwgd2VzdCA/IG5vcnRoIDogd2VzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpc3RhbmNlcztcbiAgICB9LFxuXG4gICAgLy8gVGhpcyBzdGFydHMgYXQgdGhlIGZpbmFsIHdlaWdodCwgYW5kIHdhbGtzIFwiYmFja3dhcmRcIiBieSBmaW5kaW5nXG4gICAgLy8gdGhlIG1pbmltdW0gcHJldmlvdXMgd2VpZ2h0IHJlY3Vyc2l2ZWx5IHVudGlsIHRoZSBvcmlnaW4gb2YgdGhlIHdlaWdodFxuICAgIC8vIG1hdHJpeC5cbiAgICBzcGxpY2VPcGVyYXRpb25zRnJvbUVkaXREaXN0YW5jZXM6IGZ1bmN0aW9uKGRpc3RhbmNlcykge1xuICAgICAgdmFyIGkgPSBkaXN0YW5jZXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBqID0gZGlzdGFuY2VzWzBdLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgY3VycmVudCA9IGRpc3RhbmNlc1tpXVtqXTtcbiAgICAgIHZhciBlZGl0cyA9IFtdO1xuICAgICAgd2hpbGUgKGkgPiAwIHx8IGogPiAwKSB7XG4gICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfQUREKTtcbiAgICAgICAgICBqLS07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGogPT0gMCkge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9ERUxFVEUpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9ydGhXZXN0ID0gZGlzdGFuY2VzW2kgLSAxXVtqIC0gMV07XG4gICAgICAgIHZhciB3ZXN0ID0gZGlzdGFuY2VzW2kgLSAxXVtqXTtcbiAgICAgICAgdmFyIG5vcnRoID0gZGlzdGFuY2VzW2ldW2ogLSAxXTtcblxuICAgICAgICB2YXIgbWluO1xuICAgICAgICBpZiAod2VzdCA8IG5vcnRoKVxuICAgICAgICAgIG1pbiA9IHdlc3QgPCBub3J0aFdlc3QgPyB3ZXN0IDogbm9ydGhXZXN0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbWluID0gbm9ydGggPCBub3J0aFdlc3QgPyBub3J0aCA6IG5vcnRoV2VzdDtcblxuICAgICAgICBpZiAobWluID09IG5vcnRoV2VzdCkge1xuICAgICAgICAgIGlmIChub3J0aFdlc3QgPT0gY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdHMucHVzaChFRElUX0xFQVZFKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWRpdHMucHVzaChFRElUX1VQREFURSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gbm9ydGhXZXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpLS07XG4gICAgICAgICAgai0tO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbiA9PSB3ZXN0KSB7XG4gICAgICAgICAgZWRpdHMucHVzaChFRElUX0RFTEVURSk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGN1cnJlbnQgPSB3ZXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9BREQpO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgICBjdXJyZW50ID0gbm9ydGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWRpdHMucmV2ZXJzZSgpO1xuICAgICAgcmV0dXJuIGVkaXRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTcGxpY2UgUHJvamVjdGlvbiBmdW5jdGlvbnM6XG4gICAgICpcbiAgICAgKiBBIHNwbGljZSBtYXAgaXMgYSByZXByZXNlbnRhdGlvbiBvZiBob3cgYSBwcmV2aW91cyBhcnJheSBvZiBpdGVtc1xuICAgICAqIHdhcyB0cmFuc2Zvcm1lZCBpbnRvIGEgbmV3IGFycmF5IG9mIGl0ZW1zLiBDb25jZXB0dWFsbHkgaXQgaXMgYSBsaXN0IG9mXG4gICAgICogdHVwbGVzIG9mXG4gICAgICpcbiAgICAgKiAgIDxpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudD5cbiAgICAgKlxuICAgICAqIHdoaWNoIGFyZSBrZXB0IGluIGFzY2VuZGluZyBpbmRleCBvcmRlciBvZi4gVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhhdCBhdFxuICAgICAqIHRoZSB8aW5kZXh8LCB8cmVtb3ZlZHwgc2VxdWVuY2Ugb2YgaXRlbXMgd2VyZSByZW1vdmVkLCBhbmQgY291bnRpbmcgZm9yd2FyZFxuICAgICAqIGZyb20gfGluZGV4fCwgfGFkZGVkQ291bnR8IGl0ZW1zIHdlcmUgYWRkZWQuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBMYWNraW5nIGluZGl2aWR1YWwgc3BsaWNlIG11dGF0aW9uIGluZm9ybWF0aW9uLCB0aGUgbWluaW1hbCBzZXQgb2ZcbiAgICAgKiBzcGxpY2VzIGNhbiBiZSBzeW50aGVzaXplZCBnaXZlbiB0aGUgcHJldmlvdXMgc3RhdGUgYW5kIGZpbmFsIHN0YXRlIG9mIGFuXG4gICAgICogYXJyYXkuIFRoZSBiYXNpYyBhcHByb2FjaCBpcyB0byBjYWxjdWxhdGUgdGhlIGVkaXQgZGlzdGFuY2UgbWF0cml4IGFuZFxuICAgICAqIGNob29zZSB0aGUgc2hvcnRlc3QgcGF0aCB0aHJvdWdoIGl0LlxuICAgICAqXG4gICAgICogQ29tcGxleGl0eTogTyhsICogcClcbiAgICAgKiAgIGw6IFRoZSBsZW5ndGggb2YgdGhlIGN1cnJlbnQgYXJyYXlcbiAgICAgKiAgIHA6IFRoZSBsZW5ndGggb2YgdGhlIG9sZCBhcnJheVxuICAgICAqL1xuICAgIGNhbGNTcGxpY2VzOiBmdW5jdGlvbihjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkge1xuICAgICAgdmFyIHByZWZpeENvdW50ID0gMDtcbiAgICAgIHZhciBzdWZmaXhDb3VudCA9IDA7XG5cbiAgICAgIHZhciBtaW5MZW5ndGggPSBNYXRoLm1pbihjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0LCBvbGRFbmQgLSBvbGRTdGFydCk7XG4gICAgICBpZiAoY3VycmVudFN0YXJ0ID09IDAgJiYgb2xkU3RhcnQgPT0gMClcbiAgICAgICAgcHJlZml4Q291bnQgPSB0aGlzLnNoYXJlZFByZWZpeChjdXJyZW50LCBvbGQsIG1pbkxlbmd0aCk7XG5cbiAgICAgIGlmIChjdXJyZW50RW5kID09IGN1cnJlbnQubGVuZ3RoICYmIG9sZEVuZCA9PSBvbGQubGVuZ3RoKVxuICAgICAgICBzdWZmaXhDb3VudCA9IHRoaXMuc2hhcmVkU3VmZml4KGN1cnJlbnQsIG9sZCwgbWluTGVuZ3RoIC0gcHJlZml4Q291bnQpO1xuXG4gICAgICBjdXJyZW50U3RhcnQgKz0gcHJlZml4Q291bnQ7XG4gICAgICBvbGRTdGFydCArPSBwcmVmaXhDb3VudDtcbiAgICAgIGN1cnJlbnRFbmQgLT0gc3VmZml4Q291bnQ7XG4gICAgICBvbGRFbmQgLT0gc3VmZml4Q291bnQ7XG5cbiAgICAgIGlmIChjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0ID09IDAgJiYgb2xkRW5kIC0gb2xkU3RhcnQgPT0gMClcbiAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICBpZiAoY3VycmVudFN0YXJ0ID09IGN1cnJlbnRFbmQpIHtcbiAgICAgICAgdmFyIHNwbGljZSA9IG5ld1NwbGljZShjdXJyZW50U3RhcnQsIFtdLCAwKTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0IDwgb2xkRW5kKVxuICAgICAgICAgIHNwbGljZS5yZW1vdmVkLnB1c2gob2xkW29sZFN0YXJ0KytdKTtcblxuICAgICAgICByZXR1cm4gWyBzcGxpY2UgXTtcbiAgICAgIH0gZWxzZSBpZiAob2xkU3RhcnQgPT0gb2xkRW5kKVxuICAgICAgICByZXR1cm4gWyBuZXdTcGxpY2UoY3VycmVudFN0YXJ0LCBbXSwgY3VycmVudEVuZCAtIGN1cnJlbnRTdGFydCkgXTtcblxuICAgICAgdmFyIG9wcyA9IHRoaXMuc3BsaWNlT3BlcmF0aW9uc0Zyb21FZGl0RGlzdGFuY2VzKFxuICAgICAgICAgIHRoaXMuY2FsY0VkaXREaXN0YW5jZXMoY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKSk7XG5cbiAgICAgIHZhciBzcGxpY2UgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgc3BsaWNlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gY3VycmVudFN0YXJ0O1xuICAgICAgdmFyIG9sZEluZGV4ID0gb2xkU3RhcnQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzd2l0Y2gob3BzW2ldKSB7XG4gICAgICAgICAgY2FzZSBFRElUX0xFQVZFOlxuICAgICAgICAgICAgaWYgKHNwbGljZSkge1xuICAgICAgICAgICAgICBzcGxpY2VzLnB1c2goc3BsaWNlKTtcbiAgICAgICAgICAgICAgc3BsaWNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgb2xkSW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRURJVF9VUERBVEU6XG4gICAgICAgICAgICBpZiAoIXNwbGljZSlcbiAgICAgICAgICAgICAgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCBbXSwgMCk7XG5cbiAgICAgICAgICAgIHNwbGljZS5hZGRlZENvdW50Kys7XG4gICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICBzcGxpY2UucmVtb3ZlZC5wdXNoKG9sZFtvbGRJbmRleF0pO1xuICAgICAgICAgICAgb2xkSW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRURJVF9BREQ6XG4gICAgICAgICAgICBpZiAoIXNwbGljZSlcbiAgICAgICAgICAgICAgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCBbXSwgMCk7XG5cbiAgICAgICAgICAgIHNwbGljZS5hZGRlZENvdW50Kys7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFRElUX0RFTEVURTpcbiAgICAgICAgICAgIGlmICghc3BsaWNlKVxuICAgICAgICAgICAgICBzcGxpY2UgPSBuZXdTcGxpY2UoaW5kZXgsIFtdLCAwKTtcblxuICAgICAgICAgICAgc3BsaWNlLnJlbW92ZWQucHVzaChvbGRbb2xkSW5kZXhdKTtcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3BsaWNlKSB7XG4gICAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNwbGljZXM7XG4gICAgfSxcblxuICAgIHNoYXJlZFByZWZpeDogZnVuY3Rpb24oY3VycmVudCwgb2xkLCBzZWFyY2hMZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoTGVuZ3RoOyBpKyspXG4gICAgICAgIGlmICghdGhpcy5lcXVhbHMoY3VycmVudFtpXSwgb2xkW2ldKSlcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgIHJldHVybiBzZWFyY2hMZW5ndGg7XG4gICAgfSxcblxuICAgIHNoYXJlZFN1ZmZpeDogZnVuY3Rpb24oY3VycmVudCwgb2xkLCBzZWFyY2hMZW5ndGgpIHtcbiAgICAgIHZhciBpbmRleDEgPSBjdXJyZW50Lmxlbmd0aDtcbiAgICAgIHZhciBpbmRleDIgPSBvbGQubGVuZ3RoO1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIHdoaWxlIChjb3VudCA8IHNlYXJjaExlbmd0aCAmJiB0aGlzLmVxdWFscyhjdXJyZW50Wy0taW5kZXgxXSwgb2xkWy0taW5kZXgyXSkpXG4gICAgICAgIGNvdW50Kys7XG5cbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9LFxuXG4gICAgY2FsY3VsYXRlU3BsaWNlczogZnVuY3Rpb24oY3VycmVudCwgcHJldmlvdXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGNTcGxpY2VzKGN1cnJlbnQsIDAsIGN1cnJlbnQubGVuZ3RoLCBwcmV2aW91cywgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLmxlbmd0aCk7XG4gICAgfSxcblxuICAgIGVxdWFsczogZnVuY3Rpb24oY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlID09PSBwcmV2aW91c1ZhbHVlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgYXJyYXlTcGxpY2UgPSBuZXcgQXJyYXlTcGxpY2UoKTtcblxuICBmdW5jdGlvbiBjYWxjU3BsaWNlcyhjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkge1xuICAgIHJldHVybiBhcnJheVNwbGljZS5jYWxjU3BsaWNlcyhjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcnNlY3Qoc3RhcnQxLCBlbmQxLCBzdGFydDIsIGVuZDIpIHtcbiAgICAvLyBEaXNqb2ludFxuICAgIGlmIChlbmQxIDwgc3RhcnQyIHx8IGVuZDIgPCBzdGFydDEpXG4gICAgICByZXR1cm4gLTE7XG5cbiAgICAvLyBBZGphY2VudFxuICAgIGlmIChlbmQxID09IHN0YXJ0MiB8fCBlbmQyID09IHN0YXJ0MSlcbiAgICAgIHJldHVybiAwO1xuXG4gICAgLy8gTm9uLXplcm8gaW50ZXJzZWN0LCBzcGFuMSBmaXJzdFxuICAgIGlmIChzdGFydDEgPCBzdGFydDIpIHtcbiAgICAgIGlmIChlbmQxIDwgZW5kMilcbiAgICAgICAgcmV0dXJuIGVuZDEgLSBzdGFydDI7IC8vIE92ZXJsYXBcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGVuZDIgLSBzdGFydDI7IC8vIENvbnRhaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb24temVybyBpbnRlcnNlY3QsIHNwYW4yIGZpcnN0XG4gICAgICBpZiAoZW5kMiA8IGVuZDEpXG4gICAgICAgIHJldHVybiBlbmQyIC0gc3RhcnQxOyAvLyBPdmVybGFwXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBlbmQxIC0gc3RhcnQxOyAvLyBDb250YWluZWRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZVNwbGljZShzcGxpY2VzLCBpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudCkge1xuXG4gICAgdmFyIHNwbGljZSA9IG5ld1NwbGljZShpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudCk7XG5cbiAgICB2YXIgaW5zZXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5zZXJ0aW9uT2Zmc2V0ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBzcGxpY2VzW2ldO1xuICAgICAgY3VycmVudC5pbmRleCArPSBpbnNlcnRpb25PZmZzZXQ7XG5cbiAgICAgIGlmIChpbnNlcnRlZClcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHZhciBpbnRlcnNlY3RDb3VudCA9IGludGVyc2VjdChzcGxpY2UuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BsaWNlLmluZGV4ICsgc3BsaWNlLnJlbW92ZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5pbmRleCArIGN1cnJlbnQuYWRkZWRDb3VudCk7XG5cbiAgICAgIGlmIChpbnRlcnNlY3RDb3VudCA+PSAwKSB7XG4gICAgICAgIC8vIE1lcmdlIHRoZSB0d28gc3BsaWNlc1xuXG4gICAgICAgIHNwbGljZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG5cbiAgICAgICAgaW5zZXJ0aW9uT2Zmc2V0IC09IGN1cnJlbnQuYWRkZWRDb3VudCAtIGN1cnJlbnQucmVtb3ZlZC5sZW5ndGg7XG5cbiAgICAgICAgc3BsaWNlLmFkZGVkQ291bnQgKz0gY3VycmVudC5hZGRlZENvdW50IC0gaW50ZXJzZWN0Q291bnQ7XG4gICAgICAgIHZhciBkZWxldGVDb3VudCA9IHNwbGljZS5yZW1vdmVkLmxlbmd0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucmVtb3ZlZC5sZW5ndGggLSBpbnRlcnNlY3RDb3VudDtcblxuICAgICAgICBpZiAoIXNwbGljZS5hZGRlZENvdW50ICYmICFkZWxldGVDb3VudCkge1xuICAgICAgICAgIC8vIG1lcmdlZCBzcGxpY2UgaXMgYSBub29wLiBkaXNjYXJkLlxuICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGN1cnJlbnQucmVtb3ZlZDtcblxuICAgICAgICAgIGlmIChzcGxpY2UuaW5kZXggPCBjdXJyZW50LmluZGV4KSB7XG4gICAgICAgICAgICAvLyBzb21lIHByZWZpeCBvZiBzcGxpY2UucmVtb3ZlZCBpcyBwcmVwZW5kZWQgdG8gY3VycmVudC5yZW1vdmVkLlxuICAgICAgICAgICAgdmFyIHByZXBlbmQgPSBzcGxpY2UucmVtb3ZlZC5zbGljZSgwLCBjdXJyZW50LmluZGV4IC0gc3BsaWNlLmluZGV4KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHByZXBlbmQsIHJlbW92ZWQpO1xuICAgICAgICAgICAgcmVtb3ZlZCA9IHByZXBlbmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNwbGljZS5pbmRleCArIHNwbGljZS5yZW1vdmVkLmxlbmd0aCA+IGN1cnJlbnQuaW5kZXggKyBjdXJyZW50LmFkZGVkQ291bnQpIHtcbiAgICAgICAgICAgIC8vIHNvbWUgc3VmZml4IG9mIHNwbGljZS5yZW1vdmVkIGlzIGFwcGVuZGVkIHRvIGN1cnJlbnQucmVtb3ZlZC5cbiAgICAgICAgICAgIHZhciBhcHBlbmQgPSBzcGxpY2UucmVtb3ZlZC5zbGljZShjdXJyZW50LmluZGV4ICsgY3VycmVudC5hZGRlZENvdW50IC0gc3BsaWNlLmluZGV4KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlbW92ZWQsIGFwcGVuZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3BsaWNlLnJlbW92ZWQgPSByZW1vdmVkO1xuICAgICAgICAgIGlmIChjdXJyZW50LmluZGV4IDwgc3BsaWNlLmluZGV4KSB7XG4gICAgICAgICAgICBzcGxpY2UuaW5kZXggPSBjdXJyZW50LmluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzcGxpY2UuaW5kZXggPCBjdXJyZW50LmluZGV4KSB7XG4gICAgICAgIC8vIEluc2VydCBzcGxpY2UgaGVyZS5cblxuICAgICAgICBpbnNlcnRlZCA9IHRydWU7XG5cbiAgICAgICAgc3BsaWNlcy5zcGxpY2UoaSwgMCwgc3BsaWNlKTtcbiAgICAgICAgaSsrO1xuXG4gICAgICAgIHZhciBvZmZzZXQgPSBzcGxpY2UuYWRkZWRDb3VudCAtIHNwbGljZS5yZW1vdmVkLmxlbmd0aFxuICAgICAgICBjdXJyZW50LmluZGV4ICs9IG9mZnNldDtcbiAgICAgICAgaW5zZXJ0aW9uT2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWluc2VydGVkKVxuICAgICAgc3BsaWNlcy5wdXNoKHNwbGljZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbml0aWFsU3BsaWNlcyhhcnJheSwgY2hhbmdlUmVjb3Jkcykge1xuICAgIHZhciBzcGxpY2VzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZVJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByZWNvcmQgPSBjaGFuZ2VSZWNvcmRzW2ldO1xuICAgICAgc3dpdGNoKHJlY29yZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgICAgbWVyZ2VTcGxpY2Uoc3BsaWNlcywgcmVjb3JkLmluZGV4LCByZWNvcmQucmVtb3ZlZC5zbGljZSgpLCByZWNvcmQuYWRkZWRDb3VudCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgIGNhc2UgJ3VwZGF0ZSc6XG4gICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgaWYgKCFpc0luZGV4KHJlY29yZC5uYW1lKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHZhciBpbmRleCA9IHRvTnVtYmVyKHJlY29yZC5uYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgbWVyZ2VTcGxpY2Uoc3BsaWNlcywgaW5kZXgsIFtyZWNvcmQub2xkVmFsdWVdLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIHJlY29yZCB0eXBlOiAnICsgSlNPTi5zdHJpbmdpZnkocmVjb3JkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwbGljZXM7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9qZWN0QXJyYXlTcGxpY2VzKGFycmF5LCBjaGFuZ2VSZWNvcmRzKSB7XG4gICAgdmFyIHNwbGljZXMgPSBbXTtcblxuICAgIGNyZWF0ZUluaXRpYWxTcGxpY2VzKGFycmF5LCBjaGFuZ2VSZWNvcmRzKS5mb3JFYWNoKGZ1bmN0aW9uKHNwbGljZSkge1xuICAgICAgaWYgKHNwbGljZS5hZGRlZENvdW50ID09IDEgJiYgc3BsaWNlLnJlbW92ZWQubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaWYgKHNwbGljZS5yZW1vdmVkWzBdICE9PSBhcnJheVtzcGxpY2UuaW5kZXhdKVxuICAgICAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuXG4gICAgICAgIHJldHVyblxuICAgICAgfTtcblxuICAgICAgc3BsaWNlcyA9IHNwbGljZXMuY29uY2F0KGNhbGNTcGxpY2VzKGFycmF5LCBzcGxpY2UuaW5kZXgsIHNwbGljZS5pbmRleCArIHNwbGljZS5hZGRlZENvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGljZS5yZW1vdmVkLCAwLCBzcGxpY2UucmVtb3ZlZC5sZW5ndGgpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzcGxpY2VzO1xuICB9XG5cbiAgZ2xvYmFsLk9ic2VydmVyID0gT2JzZXJ2ZXI7XG4gIGdsb2JhbC5PYnNlcnZlci5ydW5FT01fID0gcnVuRU9NO1xuICBnbG9iYWwuT2JzZXJ2ZXIub2JzZXJ2ZXJTZW50aW5lbF8gPSBvYnNlcnZlclNlbnRpbmVsOyAvLyBmb3IgdGVzdGluZy5cbiAgZ2xvYmFsLk9ic2VydmVyLmhhc09iamVjdE9ic2VydmUgPSBoYXNPYnNlcnZlO1xuICBnbG9iYWwuQXJyYXlPYnNlcnZlciA9IEFycmF5T2JzZXJ2ZXI7XG4gIGdsb2JhbC5BcnJheU9ic2VydmVyLmNhbGN1bGF0ZVNwbGljZXMgPSBmdW5jdGlvbihjdXJyZW50LCBwcmV2aW91cykge1xuICAgIHJldHVybiBhcnJheVNwbGljZS5jYWxjdWxhdGVTcGxpY2VzKGN1cnJlbnQsIHByZXZpb3VzKTtcbiAgfTtcblxuICBnbG9iYWwuQXJyYXlTcGxpY2UgPSBBcnJheVNwbGljZTtcbiAgZ2xvYmFsLk9iamVjdE9ic2VydmVyID0gT2JqZWN0T2JzZXJ2ZXI7XG4gIGdsb2JhbC5QYXRoT2JzZXJ2ZXIgPSBQYXRoT2JzZXJ2ZXI7XG4gIGdsb2JhbC5Db21wb3VuZE9ic2VydmVyID0gQ29tcG91bmRPYnNlcnZlcjtcbiAgZ2xvYmFsLlBhdGggPSBQYXRoO1xuICBnbG9iYWwuT2JzZXJ2ZXJUcmFuc2Zvcm0gPSBPYnNlcnZlclRyYW5zZm9ybTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbCAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdyk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwpe1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmIChnbG9iYWwuJHRyYWNldXJSdW50aW1lKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciAkT2JqZWN0ID0gT2JqZWN0O1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgdmFyICRjcmVhdGUgPSAkT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRmcmVlemUgPSAkT2JqZWN0LmZyZWV6ZTtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGtleXMgPSAkT2JqZWN0LmtleXM7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSAkT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyICR0b1N0cmluZyA9ICRPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuICB2YXIgJHNlYWwgPSBPYmplY3Quc2VhbDtcbiAgdmFyICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciB0eXBlcyA9IHtcbiAgICB2b2lkOiBmdW5jdGlvbiB2b2lkVHlwZSgpIHt9LFxuICAgIGFueTogZnVuY3Rpb24gYW55KCkge30sXG4gICAgc3RyaW5nOiBmdW5jdGlvbiBzdHJpbmcoKSB7fSxcbiAgICBudW1iZXI6IGZ1bmN0aW9uIG51bWJlcigpIHt9LFxuICAgIGJvb2xlYW46IGZ1bmN0aW9uIGJvb2xlYW4oKSB7fVxuICB9O1xuICB2YXIgbWV0aG9kID0gbm9uRW51bTtcbiAgdmFyIGNvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBuZXdVbmlxdWVTdHJpbmcoKSB7XG4gICAgcmV0dXJuICdfXyQnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU5KSArICckJyArICsrY291bnRlciArICckX18nO1xuICB9XG4gIHZhciBzeW1ib2xJbnRlcm5hbFByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEYXRhUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbFZhbHVlcyA9ICRjcmVhdGUobnVsbCk7XG4gIHZhciBwcml2YXRlTmFtZXMgPSAkY3JlYXRlKG51bGwpO1xuICBmdW5jdGlvbiBjcmVhdGVQcml2YXRlTmFtZSgpIHtcbiAgICB2YXIgcyA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICAgIHByaXZhdGVOYW1lc1tzXSA9IHRydWU7XG4gICAgcmV0dXJuIHM7XG4gIH1cbiAgZnVuY3Rpb24gaXNTeW1ib2woc3ltYm9sKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzeW1ib2wgPT09ICdvYmplY3QnICYmIHN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbFZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIHR5cGVPZih2KSB7XG4gICAgaWYgKGlzU3ltYm9sKHYpKVxuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIHJldHVybiB0eXBlb2YgdjtcbiAgfVxuICBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgdmFsdWUgPSBuZXcgU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N5bWJvbCBjYW5ub3QgYmUgbmV3XFwnZWQnKTtcbiAgfVxuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICBpZiAoIXN5bWJvbFZhbHVlKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdDb252ZXJzaW9uIGZyb20gc3ltYm9sIHRvIHN0cmluZycpO1xuICAgIHZhciBkZXNjID0gc3ltYm9sVmFsdWVbc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eV07XG4gICAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZClcbiAgICAgIGRlc2MgPSAnJztcbiAgICByZXR1cm4gJ1N5bWJvbCgnICsgZGVzYyArICcpJztcbiAgfSkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCBtZXRob2QoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN5bWJvbFZhbHVlID0gdGhpc1tzeW1ib2xEYXRhUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gc3ltYm9sVmFsdWU7XG4gIH0pKTtcbiAgZnVuY3Rpb24gU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pIHtcbiAgICB2YXIga2V5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERhdGFQcm9wZXJ0eSwge3ZhbHVlOiB0aGlzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbEludGVybmFsUHJvcGVydHksIHt2YWx1ZToga2V5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERlc2NyaXB0aW9uUHJvcGVydHksIHt2YWx1ZTogZGVzY3JpcHRpb259KTtcbiAgICBmcmVlemUodGhpcyk7XG4gICAgc3ltYm9sVmFsdWVzW2tleV0gPSB0aGlzO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oU3ltYm9sKSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICd0b1N0cmluZycsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCB7XG4gICAgdmFsdWU6IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZixcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgdmFyIGhhc2hQcm9wZXJ0eSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBoYXNoUHJvcGVydHlEZXNjcmlwdG9yID0ge3ZhbHVlOiB1bmRlZmluZWR9O1xuICB2YXIgaGFzaE9iamVjdFByb3BlcnRpZXMgPSB7XG4gICAgaGFzaDoge3ZhbHVlOiB1bmRlZmluZWR9LFxuICAgIHNlbGY6IHt2YWx1ZTogdW5kZWZpbmVkfVxuICB9O1xuICB2YXIgaGFzaENvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCkge1xuICAgIHZhciBoYXNoT2JqZWN0ID0gb2JqZWN0W2hhc2hQcm9wZXJ0eV07XG4gICAgaWYgKGhhc2hPYmplY3QgJiYgaGFzaE9iamVjdC5zZWxmID09PSBvYmplY3QpXG4gICAgICByZXR1cm4gaGFzaE9iamVjdDtcbiAgICBpZiAoJGlzRXh0ZW5zaWJsZShvYmplY3QpKSB7XG4gICAgICBoYXNoT2JqZWN0UHJvcGVydGllcy5oYXNoLnZhbHVlID0gaGFzaENvdW50ZXIrKztcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLnNlbGYudmFsdWUgPSBvYmplY3Q7XG4gICAgICBoYXNoUHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlID0gJGNyZWF0ZShudWxsLCBoYXNoT2JqZWN0UHJvcGVydGllcyk7XG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBoYXNoUHJvcGVydHksIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgcmV0dXJuIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gZnJlZXplKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJGZyZWV6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gc2VhbChvYmplY3QpIHtcbiAgICBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuICRzZWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgU3ltYm9sLml0ZXJhdG9yID0gU3ltYm9sKCk7XG4gIGZyZWV6ZShTeW1ib2xWYWx1ZS5wcm90b3R5cGUpO1xuICBmdW5jdGlvbiB0b1Byb3BlcnR5KG5hbWUpIHtcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpXG4gICAgICByZXR1cm4gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCkge1xuICAgIHZhciBydiA9IFtdO1xuICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIGlmICghc3ltYm9sVmFsdWVzW25hbWVdICYmICFwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIHJ2LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCB0b1Byb3BlcnR5KG5hbWUpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3ltYm9sID0gc3ltYm9sVmFsdWVzW25hbWVzW2ldXTtcbiAgICAgIGlmIChzeW1ib2wpXG4gICAgICAgIHJ2LnB1c2goc3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG5hbWUpIHtcbiAgICByZXR1cm4gJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgdG9Qcm9wZXJ0eShuYW1lKSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnRyYWNldXIgJiYgZ2xvYmFsLnRyYWNldXIub3B0aW9uc1tuYW1lXTtcbiAgfVxuICBmdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHN5bSxcbiAgICAgICAgZGVzYztcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpIHtcbiAgICAgIHN5bSA9IG5hbWU7XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgaWYgKHN5bSAmJiAoZGVzYyA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSkpXG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7ZW51bWVyYWJsZTogZmFsc2V9KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgaWYgKGlzU3ltYm9sKG5hbWUpKSB7XG4gICAgICBpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgIGRlc2NyaXB0b3IgPSAkY3JlYXRlKGRlc2NyaXB0b3IsIHtlbnVtZXJhYmxlOiB7dmFsdWU6IGZhbHNlfX0pO1xuICAgICAgfVxuICAgICAgbmFtZSA9IG5hbWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgfVxuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxPYmplY3QoT2JqZWN0KSB7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jywge3ZhbHVlOiBkZWZpbmVQcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eU5hbWVzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIHt2YWx1ZTogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdoYXNPd25Qcm9wZXJ0eScsIHt2YWx1ZTogaGFzT3duUHJvcGVydHl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZnJlZXplJywge3ZhbHVlOiBmcmVlemV9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAncHJldmVudEV4dGVuc2lvbnMnLCB7dmFsdWU6IHByZXZlbnRFeHRlbnNpb25zfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ3NlYWwnLCB7dmFsdWU6IHNlYWx9KTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuICB9XG4gIGZ1bmN0aW9uIGV4cG9ydFN0YXIob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3VtZW50c1tpXSk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBuYW1lID0gbmFtZXNbal07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIChmdW5jdGlvbihtb2QsIG5hbWUpIHtcbiAgICAgICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9kW25hbWVdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoYXJndW1lbnRzW2ldLCBuYW1lc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gdG9PYmplY3QoeCkge1xuICAgIGlmICh4ID09IG51bGwpXG4gICAgICB0aHJvdyAkVHlwZUVycm9yKCk7XG4gICAgcmV0dXJuICRPYmplY3QoeCk7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tPYmplY3RDb2VyY2libGUoYXJndW1lbnQpIHtcbiAgICBpZiAoYXJndW1lbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhbiBPYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50O1xuICB9XG4gIGZ1bmN0aW9uIHNldHVwR2xvYmFscyhnbG9iYWwpIHtcbiAgICBnbG9iYWwuU3ltYm9sID0gU3ltYm9sO1xuICAgIGdsb2JhbC5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3QgfHwge307XG4gICAgZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsID0gZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsIHx8IGdsb2JhbDtcbiAgICBwb2x5ZmlsbE9iamVjdChnbG9iYWwuT2JqZWN0KTtcbiAgfVxuICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgZ2xvYmFsLiR0cmFjZXVyUnVudGltZSA9IHtcbiAgICBjcmVhdGVQcml2YXRlTmFtZTogY3JlYXRlUHJpdmF0ZU5hbWUsXG4gICAgZXhwb3J0U3RhcjogZXhwb3J0U3RhcixcbiAgICBnZXRPd25IYXNoT2JqZWN0OiBnZXRPd25IYXNoT2JqZWN0LFxuICAgIHByaXZhdGVOYW1lczogcHJpdmF0ZU5hbWVzLFxuICAgIHNldFByb3BlcnR5OiBzZXRQcm9wZXJ0eSxcbiAgICBzZXR1cEdsb2JhbHM6IHNldHVwR2xvYmFscyxcbiAgICB0b09iamVjdDogdG9PYmplY3QsXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIHRvUHJvcGVydHk6IHRvUHJvcGVydHksXG4gICAgdHlwZTogdHlwZXMsXG4gICAgdHlwZW9mOiB0eXBlT2YsXG4gICAgY2hlY2tPYmplY3RDb2VyY2libGU6IGNoZWNrT2JqZWN0Q29lcmNpYmxlLFxuICAgIGhhc093blByb3BlcnR5OiBmdW5jdGlvbihvLCBwKSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbiAgICB9LFxuICAgIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAgIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgIGtleXM6ICRrZXlzXG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGZ1bmN0aW9uIHNwcmVhZCgpIHtcbiAgICB2YXIgcnYgPSBbXSxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIGl0ZXJSZXN1bHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZVRvU3ByZWFkID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IHNwcmVhZCBub24taXRlcmFibGUgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgdmFyIGl0ZXIgPSB2YWx1ZVRvU3ByZWFkWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildKCk7XG4gICAgICB3aGlsZSAoIShpdGVyUmVzdWx0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgcnZbaisrXSA9IGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuc3ByZWFkID0gc3ByZWFkO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJE9iamVjdCA9IE9iamVjdDtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIHZhciAkY3JlYXRlID0gJE9iamVjdC5jcmVhdGU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICBmdW5jdGlvbiBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBwcm90byA9ICRnZXRQcm90b3R5cGVPZihob21lT2JqZWN0KTtcbiAgICBkbyB7XG4gICAgICB2YXIgcmVzdWx0ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG4gICAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgcHJvdG8gPSAkZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIH0gd2hpbGUgKHByb3RvKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKTtcbiAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgaWYgKCFkZXNjcmlwdG9yLmdldClcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICByZXR1cm4gZGVzY3JpcHRvci5nZXQuY2FsbChzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBzdXBlclNldChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldC5jYWxsKHNlbGYsIHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcInN1cGVyIGhhcyBubyBzZXR0ZXIgJ1wiICsgbmFtZSArIFwiJy5cIik7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcnMob2JqZWN0KSB7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge30sXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgZGVzY3JpcHRvcnNbbmFtZV0gPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhjdG9yLCBvYmplY3QsIHN0YXRpY09iamVjdCwgc3VwZXJDbGFzcykge1xuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsICdjb25zdHJ1Y3RvcicsIHtcbiAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuICAgICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBjdG9yLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9ICRjcmVhdGUoZ2V0UHJvdG9QYXJlbnQoc3VwZXJDbGFzcyksIGdldERlc2NyaXB0b3JzKG9iamVjdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG9iamVjdDtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KGN0b3IsICdwcm90b3R5cGUnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0aWVzKGN0b3IsIGdldERlc2NyaXB0b3JzKHN0YXRpY09iamVjdCkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFByb3RvUGFyZW50KHN1cGVyQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGlmICgkT2JqZWN0KHByb3RvdHlwZSkgPT09IHByb3RvdHlwZSB8fCBwcm90b3R5cGUgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIHRocm93IG5ldyAkVHlwZUVycm9yKCdzdXBlciBwcm90b3R5cGUgbXVzdCBiZSBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAoc3VwZXJDbGFzcyA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKChcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyArIFwiLlwiKSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVmYXVsdFN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCBhcmdzKSB7XG4gICAgaWYgKCRnZXRQcm90b3R5cGVPZihob21lT2JqZWN0KSAhPT0gbnVsbClcbiAgICAgIHN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCAnY29uc3RydWN0b3InLCBhcmdzKTtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MgPSBjcmVhdGVDbGFzcztcbiAgJHRyYWNldXJSdW50aW1lLmRlZmF1bHRTdXBlckNhbGwgPSBkZWZhdWx0U3VwZXJDYWxsO1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJDYWxsID0gc3VwZXJDYWxsO1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJHZXQgPSBzdXBlckdldDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyU2V0ID0gc3VwZXJTZXQ7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBjcmVhdGVQcml2YXRlTmFtZSA9ICR0cmFjZXVyUnVudGltZS5jcmVhdGVQcml2YXRlTmFtZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydHk7XG4gIHZhciAkY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIGZ1bmN0aW9uIG5vbkVudW0odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgdmFyIFNUX05FV0JPUk4gPSAwO1xuICB2YXIgU1RfRVhFQ1VUSU5HID0gMTtcbiAgdmFyIFNUX1NVU1BFTkRFRCA9IDI7XG4gIHZhciBTVF9DTE9TRUQgPSAzO1xuICB2YXIgRU5EX1NUQVRFID0gLTI7XG4gIHZhciBSRVRIUk9XX1NUQVRFID0gLTM7XG4gIGZ1bmN0aW9uIGdldEludGVybmFsRXJyb3Ioc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdUcmFjZXVyIGNvbXBpbGVyIGJ1ZzogaW52YWxpZCBzdGF0ZSBpbiBzdGF0ZSBtYWNoaW5lOiAnICsgc3RhdGUpO1xuICB9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckNvbnRleHQoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy5HU3RhdGUgPSBTVF9ORVdCT1JOO1xuICAgIHRoaXMuc3RvcmVkRXhjZXB0aW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmluYWxseUZhbGxUaHJvdWdoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VudF8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRyeVN0YWNrXyA9IFtdO1xuICB9XG4gIEdlbmVyYXRvckNvbnRleHQucHJvdG90eXBlID0ge1xuICAgIHB1c2hUcnk6IGZ1bmN0aW9uKGNhdGNoU3RhdGUsIGZpbmFsbHlTdGF0ZSkge1xuICAgICAgaWYgKGZpbmFsbHlTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmluYWxseUZhbGxUaHJvdWdoID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5U3RhY2tfLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKHRoaXMudHJ5U3RhY2tfW2ldLmNhdGNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaCA9IHRoaXMudHJ5U3RhY2tfW2ldLmNhdGNoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbGx5RmFsbFRocm91Z2ggPT09IG51bGwpXG4gICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoID0gUkVUSFJPV19TVEFURTtcbiAgICAgICAgdGhpcy50cnlTdGFja18ucHVzaCh7XG4gICAgICAgICAgZmluYWxseTogZmluYWxseVN0YXRlLFxuICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaDogZmluYWxseUZhbGxUaHJvdWdoXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNhdGNoU3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy50cnlTdGFja18ucHVzaCh7Y2F0Y2g6IGNhdGNoU3RhdGV9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBvcFRyeTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRyeVN0YWNrXy5wb3AoKTtcbiAgICB9LFxuICAgIGdldCBzZW50KCkge1xuICAgICAgdGhpcy5tYXliZVRocm93KCk7XG4gICAgICByZXR1cm4gdGhpcy5zZW50XztcbiAgICB9LFxuICAgIHNldCBzZW50KHYpIHtcbiAgICAgIHRoaXMuc2VudF8gPSB2O1xuICAgIH0sXG4gICAgZ2V0IHNlbnRJZ25vcmVUaHJvdygpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbnRfO1xuICAgIH0sXG4gICAgbWF5YmVUaHJvdzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5hY3Rpb24gPT09ICd0aHJvdycpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgIHRocm93IHRoaXMuc2VudF87XG4gICAgICB9XG4gICAgfSxcbiAgICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgIGNhc2UgRU5EX1NUQVRFOlxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjYXNlIFJFVEhST1dfU1RBVEU6XG4gICAgICAgICAgdGhyb3cgdGhpcy5zdG9yZWRFeGNlcHRpb247XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgZ2V0SW50ZXJuYWxFcnJvcih0aGlzLnN0YXRlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZUV4Y2VwdGlvbjogZnVuY3Rpb24oZXgpIHtcbiAgICAgIHRoaXMuR1N0YXRlID0gU1RfQ0xPU0VEO1xuICAgICAgdGhpcy5zdGF0ZSA9IEVORF9TVEFURTtcbiAgICAgIHRocm93IGV4O1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gbmV4dE9yVGhyb3coY3R4LCBtb3ZlTmV4dCwgYWN0aW9uLCB4KSB7XG4gICAgc3dpdGNoIChjdHguR1N0YXRlKSB7XG4gICAgICBjYXNlIFNUX0VYRUNVVElORzpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcIlxcXCJcIiArIGFjdGlvbiArIFwiXFxcIiBvbiBleGVjdXRpbmcgZ2VuZXJhdG9yXCIpKTtcbiAgICAgIGNhc2UgU1RfQ0xPU0VEOlxuICAgICAgICBpZiAoYWN0aW9uID09ICduZXh0Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgeDtcbiAgICAgIGNhc2UgU1RfTkVXQk9STjpcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgIGN0eC5HU3RhdGUgPSBTVF9DTE9TRUQ7XG4gICAgICAgICAgdGhyb3cgeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRocm93ICRUeXBlRXJyb3IoJ1NlbnQgdmFsdWUgdG8gbmV3Ym9ybiBnZW5lcmF0b3InKTtcbiAgICAgIGNhc2UgU1RfU1VTUEVOREVEOlxuICAgICAgICBjdHguR1N0YXRlID0gU1RfRVhFQ1VUSU5HO1xuICAgICAgICBjdHguYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICBjdHguc2VudCA9IHg7XG4gICAgICAgIHZhciB2YWx1ZSA9IG1vdmVOZXh0KGN0eCk7XG4gICAgICAgIHZhciBkb25lID0gdmFsdWUgPT09IGN0eDtcbiAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgdmFsdWUgPSBjdHgucmV0dXJuVmFsdWU7XG4gICAgICAgIGN0eC5HU3RhdGUgPSBkb25lID8gU1RfQ0xPU0VEIDogU1RfU1VTUEVOREVEO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBkb25lOiBkb25lXG4gICAgICAgIH07XG4gICAgfVxuICB9XG4gIHZhciBjdHhOYW1lID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgdmFyIG1vdmVOZXh0TmFtZSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgJGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKEdlbmVyYXRvckZ1bmN0aW9uKSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgbmV4dDogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIG5leHRPclRocm93KHRoaXNbY3R4TmFtZV0sIHRoaXNbbW92ZU5leHROYW1lXSwgJ25leHQnLCB2KTtcbiAgICB9LFxuICAgIHRocm93OiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gbmV4dE9yVGhyb3codGhpc1tjdHhOYW1lXSwgdGhpc1ttb3ZlTmV4dE5hbWVdLCAndGhyb3cnLCB2KTtcbiAgICB9XG4gIH07XG4gICRkZWZpbmVQcm9wZXJ0aWVzKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7ZW51bWVyYWJsZTogZmFsc2V9LFxuICAgIG5leHQ6IHtlbnVtZXJhYmxlOiBmYWxzZX0sXG4gICAgdGhyb3c6IHtlbnVtZXJhYmxlOiBmYWxzZX1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwgbm9uRW51bShmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSkpO1xuICBmdW5jdGlvbiBjcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShpbm5lckZ1bmN0aW9uLCBmdW5jdGlvbk9iamVjdCwgc2VsZikge1xuICAgIHZhciBtb3ZlTmV4dCA9IGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpO1xuICAgIHZhciBjdHggPSBuZXcgR2VuZXJhdG9yQ29udGV4dCgpO1xuICAgIHZhciBvYmplY3QgPSAkY3JlYXRlKGZ1bmN0aW9uT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgb2JqZWN0W2N0eE5hbWVdID0gY3R4O1xuICAgIG9iamVjdFttb3ZlTmV4dE5hbWVdID0gbW92ZU5leHQ7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBpbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb25PYmplY3QpIHtcbiAgICBmdW5jdGlvbk9iamVjdC5wcm90b3R5cGUgPSAkY3JlYXRlKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSk7XG4gICAgZnVuY3Rpb25PYmplY3QuX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uT2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jRnVuY3Rpb25Db250ZXh0KCkge1xuICAgIEdlbmVyYXRvckNvbnRleHQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmVyciA9IHVuZGVmaW5lZDtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICBjdHgucmVzdWx0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjdHgucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBjdHgucmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICB9XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZSA9ICRjcmVhdGUoR2VuZXJhdG9yQ29udGV4dC5wcm90b3R5cGUpO1xuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICBjYXNlIEVORF9TVEFURTpcbiAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMucmV0dXJuVmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUkVUSFJPV19TVEFURTpcbiAgICAgICAgdGhpcy5yZWplY3QodGhpcy5zdG9yZWRFeGNlcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVqZWN0KGdldEludGVybmFsRXJyb3IodGhpcy5zdGF0ZSkpO1xuICAgIH1cbiAgfTtcbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlLmhhbmRsZUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhdGUgPSBSRVRIUk9XX1NUQVRFO1xuICB9O1xuICBmdW5jdGlvbiBhc3luY1dyYXAoaW5uZXJGdW5jdGlvbiwgc2VsZikge1xuICAgIHZhciBtb3ZlTmV4dCA9IGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpO1xuICAgIHZhciBjdHggPSBuZXcgQXN5bmNGdW5jdGlvbkNvbnRleHQoKTtcbiAgICBjdHguY3JlYXRlQ2FsbGJhY2sgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGN0eC5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICBjdHgudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgbW92ZU5leHQoY3R4KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBjdHguZXJyYmFjayA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaGFuZGxlQ2F0Y2goY3R4LCBlcnIpO1xuICAgICAgbW92ZU5leHQoY3R4KTtcbiAgICB9O1xuICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgcmV0dXJuIGN0eC5yZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZikge1xuICAgIHJldHVybiBmdW5jdGlvbihjdHgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGlubmVyRnVuY3Rpb24uY2FsbChzZWxmLCBjdHgpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGhhbmRsZUNhdGNoKGN0eCwgZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVDYXRjaChjdHgsIGV4KSB7XG4gICAgY3R4LnN0b3JlZEV4Y2VwdGlvbiA9IGV4O1xuICAgIHZhciBsYXN0ID0gY3R4LnRyeVN0YWNrX1tjdHgudHJ5U3RhY2tfLmxlbmd0aCAtIDFdO1xuICAgIGlmICghbGFzdCkge1xuICAgICAgY3R4LmhhbmRsZUV4Y2VwdGlvbihleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGN0eC5zdGF0ZSA9IGxhc3QuY2F0Y2ggIT09IHVuZGVmaW5lZCA/IGxhc3QuY2F0Y2ggOiBsYXN0LmZpbmFsbHk7XG4gICAgaWYgKGxhc3QuZmluYWxseUZhbGxUaHJvdWdoICE9PSB1bmRlZmluZWQpXG4gICAgICBjdHguZmluYWxseUZhbGxUaHJvdWdoID0gbGFzdC5maW5hbGx5RmFsbFRocm91Z2g7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmFzeW5jV3JhcCA9IGFzeW5jV3JhcDtcbiAgJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbiA9IGluaXRHZW5lcmF0b3JGdW5jdGlvbjtcbiAgJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlID0gY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2U7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBidWlsZEZyb21FbmNvZGVkUGFydHMob3B0X3NjaGVtZSwgb3B0X3VzZXJJbmZvLCBvcHRfZG9tYWluLCBvcHRfcG9ydCwgb3B0X3BhdGgsIG9wdF9xdWVyeURhdGEsIG9wdF9mcmFnbWVudCkge1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBpZiAob3B0X3NjaGVtZSkge1xuICAgICAgb3V0LnB1c2gob3B0X3NjaGVtZSwgJzonKTtcbiAgICB9XG4gICAgaWYgKG9wdF9kb21haW4pIHtcbiAgICAgIG91dC5wdXNoKCcvLycpO1xuICAgICAgaWYgKG9wdF91c2VySW5mbykge1xuICAgICAgICBvdXQucHVzaChvcHRfdXNlckluZm8sICdAJyk7XG4gICAgICB9XG4gICAgICBvdXQucHVzaChvcHRfZG9tYWluKTtcbiAgICAgIGlmIChvcHRfcG9ydCkge1xuICAgICAgICBvdXQucHVzaCgnOicsIG9wdF9wb3J0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdF9wYXRoKSB7XG4gICAgICBvdXQucHVzaChvcHRfcGF0aCk7XG4gICAgfVxuICAgIGlmIChvcHRfcXVlcnlEYXRhKSB7XG4gICAgICBvdXQucHVzaCgnPycsIG9wdF9xdWVyeURhdGEpO1xuICAgIH1cbiAgICBpZiAob3B0X2ZyYWdtZW50KSB7XG4gICAgICBvdXQucHVzaCgnIycsIG9wdF9mcmFnbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gIH1cbiAgO1xuICB2YXIgc3BsaXRSZSA9IG5ldyBSZWdFeHAoJ14nICsgJyg/OicgKyAnKFteOi8/Iy5dKyknICsgJzopPycgKyAnKD86Ly8nICsgJyg/OihbXi8/I10qKUApPycgKyAnKFtcXFxcd1xcXFxkXFxcXC1cXFxcdTAxMDAtXFxcXHVmZmZmLiVdKiknICsgJyg/OjooWzAtOV0rKSk/JyArICcpPycgKyAnKFtePyNdKyk/JyArICcoPzpcXFxcPyhbXiNdKikpPycgKyAnKD86IyguKikpPycgKyAnJCcpO1xuICB2YXIgQ29tcG9uZW50SW5kZXggPSB7XG4gICAgU0NIRU1FOiAxLFxuICAgIFVTRVJfSU5GTzogMixcbiAgICBET01BSU46IDMsXG4gICAgUE9SVDogNCxcbiAgICBQQVRIOiA1LFxuICAgIFFVRVJZX0RBVEE6IDYsXG4gICAgRlJBR01FTlQ6IDdcbiAgfTtcbiAgZnVuY3Rpb24gc3BsaXQodXJpKSB7XG4gICAgcmV0dXJuICh1cmkubWF0Y2goc3BsaXRSZSkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKHBhdGgpIHtcbiAgICBpZiAocGF0aCA9PT0gJy8nKVxuICAgICAgcmV0dXJuICcvJztcbiAgICB2YXIgbGVhZGluZ1NsYXNoID0gcGF0aFswXSA9PT0gJy8nID8gJy8nIDogJyc7XG4gICAgdmFyIHRyYWlsaW5nU2xhc2ggPSBwYXRoLnNsaWNlKC0xKSA9PT0gJy8nID8gJy8nIDogJyc7XG4gICAgdmFyIHNlZ21lbnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICB2YXIgdXAgPSAwO1xuICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IHNlZ21lbnRzLmxlbmd0aDsgcG9zKyspIHtcbiAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbcG9zXTtcbiAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICcuJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLi4nOlxuICAgICAgICAgIGlmIChvdXQubGVuZ3RoKVxuICAgICAgICAgICAgb3V0LnBvcCgpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHVwKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgb3V0LnB1c2goc2VnbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghbGVhZGluZ1NsYXNoKSB7XG4gICAgICB3aGlsZSAodXAtLSA+IDApIHtcbiAgICAgICAgb3V0LnVuc2hpZnQoJy4uJyk7XG4gICAgICB9XG4gICAgICBpZiAob3V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgb3V0LnB1c2goJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWRpbmdTbGFzaCArIG91dC5qb2luKCcvJykgKyB0cmFpbGluZ1NsYXNoO1xuICB9XG4gIGZ1bmN0aW9uIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKSB7XG4gICAgdmFyIHBhdGggPSBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSB8fCAnJztcbiAgICBwYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocGF0aCk7XG4gICAgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gPSBwYXRoO1xuICAgIHJldHVybiBidWlsZEZyb21FbmNvZGVkUGFydHMocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSwgcGFydHNbQ29tcG9uZW50SW5kZXguVVNFUl9JTkZPXSwgcGFydHNbQ29tcG9uZW50SW5kZXguRE9NQUlOXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUE9SVF0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5RVUVSWV9EQVRBXSwgcGFydHNbQ29tcG9uZW50SW5kZXguRlJBR01FTlRdKTtcbiAgfVxuICBmdW5jdGlvbiBjYW5vbmljYWxpemVVcmwodXJsKSB7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQodXJsKTtcbiAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZSwgdXJsKSB7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQodXJsKTtcbiAgICB2YXIgYmFzZVBhcnRzID0gc3BsaXQoYmFzZSk7XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0pIHtcbiAgICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0gPSBiYXNlUGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IENvbXBvbmVudEluZGV4LlNDSEVNRTsgaSA8PSBDb21wb25lbnRJbmRleC5QT1JUOyBpKyspIHtcbiAgICAgIGlmICghcGFydHNbaV0pIHtcbiAgICAgICAgcGFydHNbaV0gPSBiYXNlUGFydHNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXVswXSA9PSAnLycpIHtcbiAgICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gICAgfVxuICAgIHZhciBwYXRoID0gYmFzZVBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdO1xuICAgIHZhciBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICBwYXRoID0gcGF0aC5zbGljZSgwLCBpbmRleCArIDEpICsgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF07XG4gICAgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gPSBwYXRoO1xuICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gIH1cbiAgZnVuY3Rpb24gaXNBYnNvbHV0ZShuYW1lKSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChuYW1lWzBdID09PSAnLycpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgcGFydHMgPSBzcGxpdChuYW1lKTtcbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuY2Fub25pY2FsaXplVXJsID0gY2Fub25pY2FsaXplVXJsO1xuICAkdHJhY2V1clJ1bnRpbWUuaXNBYnNvbHV0ZSA9IGlzQWJzb2x1dGU7XG4gICR0cmFjZXVyUnVudGltZS5yZW1vdmVEb3RTZWdtZW50cyA9IHJlbW92ZURvdFNlZ21lbnRzO1xuICAkdHJhY2V1clJ1bnRpbWUucmVzb2x2ZVVybCA9IHJlc29sdmVVcmw7XG59KSgpO1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciAkX18yID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgY2Fub25pY2FsaXplVXJsID0gJF9fMi5jYW5vbmljYWxpemVVcmwsXG4gICAgICByZXNvbHZlVXJsID0gJF9fMi5yZXNvbHZlVXJsLFxuICAgICAgaXNBYnNvbHV0ZSA9ICRfXzIuaXNBYnNvbHV0ZTtcbiAgdmFyIG1vZHVsZUluc3RhbnRpYXRvcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgYmFzZVVSTDtcbiAgaWYgKGdsb2JhbC5sb2NhdGlvbiAmJiBnbG9iYWwubG9jYXRpb24uaHJlZilcbiAgICBiYXNlVVJMID0gcmVzb2x2ZVVybChnbG9iYWwubG9jYXRpb24uaHJlZiwgJy4vJyk7XG4gIGVsc2VcbiAgICBiYXNlVVJMID0gJyc7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUVudHJ5ID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVFbnRyeSh1cmwsIHVuY29hdGVkTW9kdWxlKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy52YWx1ZV8gPSB1bmNvYXRlZE1vZHVsZTtcbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoVW5jb2F0ZWRNb2R1bGVFbnRyeSwge30sIHt9KTtcbiAgdmFyIE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IGZ1bmN0aW9uIE1vZHVsZUV2YWx1YXRpb25FcnJvcihlcnJvbmVvdXNNb2R1bGVOYW1lLCBjYXVzZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyB0aGlzLnN0cmlwQ2F1c2UoY2F1c2UpICsgJyBpbiAnICsgZXJyb25lb3VzTW9kdWxlTmFtZTtcbiAgICBpZiAoIShjYXVzZSBpbnN0YW5jZW9mICRNb2R1bGVFdmFsdWF0aW9uRXJyb3IpICYmIGNhdXNlLnN0YWNrKVxuICAgICAgdGhpcy5zdGFjayA9IHRoaXMuc3RyaXBTdGFjayhjYXVzZS5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5zdGFjayA9ICcnO1xuICB9O1xuICB2YXIgJE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IE1vZHVsZUV2YWx1YXRpb25FcnJvcjtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoTW9kdWxlRXZhbHVhdGlvbkVycm9yLCB7XG4gICAgc3RyaXBFcnJvcjogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZSgvLipFcnJvcjovLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnOicpO1xuICAgIH0sXG4gICAgc3RyaXBDYXVzZTogZnVuY3Rpb24oY2F1c2UpIHtcbiAgICAgIGlmICghY2F1c2UpXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIGlmICghY2F1c2UubWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIGNhdXNlICsgJyc7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpcEVycm9yKGNhdXNlLm1lc3NhZ2UpO1xuICAgIH0sXG4gICAgbG9hZGVkQnk6IGZ1bmN0aW9uKG1vZHVsZU5hbWUpIHtcbiAgICAgIHRoaXMuc3RhY2sgKz0gJ1xcbiBsb2FkZWQgYnkgJyArIG1vZHVsZU5hbWU7XG4gICAgfSxcbiAgICBzdHJpcFN0YWNrOiBmdW5jdGlvbihjYXVzZVN0YWNrKSB7XG4gICAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICAgIGNhdXNlU3RhY2suc3BsaXQoJ1xcbicpLnNvbWUoKGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgIGlmICgvVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IvLnRlc3QoZnJhbWUpKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBzdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgIH0pKTtcbiAgICAgIHN0YWNrWzBdID0gdGhpcy5zdHJpcEVycm9yKHN0YWNrWzBdKTtcbiAgICAgIHJldHVybiBzdGFjay5qb2luKCdcXG4nKTtcbiAgICB9XG4gIH0sIHt9LCBFcnJvcik7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IGZ1bmN0aW9uIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKHVybCwgZnVuYykge1xuICAgICR0cmFjZXVyUnVudGltZS5zdXBlckNhbGwodGhpcywgJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLnByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBbdXJsLCBudWxsXSk7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgfTtcbiAgdmFyICRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciwge2dldFVuY29hdGVkTW9kdWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlXylcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfID0gdGhpcy5mdW5jLmNhbGwoZ2xvYmFsKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChleCBpbnN0YW5jZW9mIE1vZHVsZUV2YWx1YXRpb25FcnJvcikge1xuICAgICAgICAgIGV4LmxvYWRlZEJ5KHRoaXMudXJsKTtcbiAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgTW9kdWxlRXZhbHVhdGlvbkVycm9yKHRoaXMudXJsLCBleCk7XG4gICAgICB9XG4gICAgfX0sIHt9LCBVbmNvYXRlZE1vZHVsZUVudHJ5KTtcbiAgZnVuY3Rpb24gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybjtcbiAgICB2YXIgdXJsID0gTW9kdWxlU3RvcmUubm9ybWFsaXplKG5hbWUpO1xuICAgIHJldHVybiBtb2R1bGVJbnN0YW50aWF0b3JzW3VybF07XG4gIH1cbiAgO1xuICB2YXIgbW9kdWxlSW5zdGFuY2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpdmVNb2R1bGVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBNb2R1bGUodW5jb2F0ZWRNb2R1bGUpIHtcbiAgICB2YXIgaXNMaXZlID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBjb2F0ZWRNb2R1bGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHVuY29hdGVkTW9kdWxlKS5mb3JFYWNoKChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZ2V0dGVyLFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgaWYgKGlzTGl2ZSA9PT0gbGl2ZU1vZHVsZVNlbnRpbmVsKSB7XG4gICAgICAgIHZhciBkZXNjciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodW5jb2F0ZWRNb2R1bGUsIG5hbWUpO1xuICAgICAgICBpZiAoZGVzY3IuZ2V0KVxuICAgICAgICAgIGdldHRlciA9IGRlc2NyLmdldDtcbiAgICAgIH1cbiAgICAgIGlmICghZ2V0dGVyKSB7XG4gICAgICAgIHZhbHVlID0gdW5jb2F0ZWRNb2R1bGVbbmFtZV07XG4gICAgICAgIGdldHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb2F0ZWRNb2R1bGUsIG5hbWUsIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoY29hdGVkTW9kdWxlKTtcbiAgICByZXR1cm4gY29hdGVkTW9kdWxlO1xuICB9XG4gIHZhciBNb2R1bGVTdG9yZSA9IHtcbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uKG5hbWUsIHJlZmVyZXJOYW1lLCByZWZlcmVyQWRkcmVzcykge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibW9kdWxlIG5hbWUgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIG5hbWUpO1xuICAgICAgaWYgKGlzQWJzb2x1dGUobmFtZSkpXG4gICAgICAgIHJldHVybiBjYW5vbmljYWxpemVVcmwobmFtZSk7XG4gICAgICBpZiAoL1teXFwuXVxcL1xcLlxcLlxcLy8udGVzdChuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21vZHVsZSBuYW1lIGVtYmVkcyAvLi4vOiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZVswXSA9PT0gJy4nICYmIHJlZmVyZXJOYW1lKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZVVybChyZWZlcmVyTmFtZSwgbmFtZSk7XG4gICAgICByZXR1cm4gY2Fub25pY2FsaXplVXJsKG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSkge1xuICAgICAgdmFyIG0gPSBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSk7XG4gICAgICBpZiAoIW0pXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB2YXIgbW9kdWxlSW5zdGFuY2UgPSBtb2R1bGVJbnN0YW5jZXNbbS51cmxdO1xuICAgICAgaWYgKG1vZHVsZUluc3RhbmNlKVxuICAgICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2U7XG4gICAgICBtb2R1bGVJbnN0YW5jZSA9IE1vZHVsZShtLmdldFVuY29hdGVkTW9kdWxlKCksIGxpdmVNb2R1bGVTZW50aW5lbCk7XG4gICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2VzW20udXJsXSA9IG1vZHVsZUluc3RhbmNlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSwgbW9kdWxlKSB7XG4gICAgICBub3JtYWxpemVkTmFtZSA9IFN0cmluZyhub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgICAgfSkpO1xuICAgICAgbW9kdWxlSW5zdGFuY2VzW25vcm1hbGl6ZWROYW1lXSA9IG1vZHVsZTtcbiAgICB9LFxuICAgIGdldCBiYXNlVVJMKCkge1xuICAgICAgcmV0dXJuIGJhc2VVUkw7XG4gICAgfSxcbiAgICBzZXQgYmFzZVVSTCh2KSB7XG4gICAgICBiYXNlVVJMID0gU3RyaW5nKHYpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJNb2R1bGU6IGZ1bmN0aW9uKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHZhciBub3JtYWxpemVkTmFtZSA9IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZShuYW1lKTtcbiAgICAgIGlmIChtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUgbW9kdWxlIG5hbWVkICcgKyBub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgZnVuYyk7XG4gICAgfSxcbiAgICBidW5kbGVTdG9yZTogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICByZWdpc3RlcjogZnVuY3Rpb24obmFtZSwgZGVwcywgZnVuYykge1xuICAgICAgaWYgKCFkZXBzIHx8ICFkZXBzLmxlbmd0aCAmJiAhZnVuYy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vZHVsZShuYW1lLCBmdW5jKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnVuZGxlU3RvcmVbbmFtZV0gPSB7XG4gICAgICAgICAgZGVwczogZGVwcyxcbiAgICAgICAgICBleGVjdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkX18wID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGRlcE1hcCA9IHt9O1xuICAgICAgICAgICAgZGVwcy5mb3JFYWNoKChmdW5jdGlvbihkZXAsIGluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXBNYXBbZGVwXSA9ICRfXzBbaW5kZXhdO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdmFyIHJlZ2lzdHJ5RW50cnkgPSBmdW5jLmNhbGwodGhpcywgZGVwTWFwKTtcbiAgICAgICAgICAgIHJlZ2lzdHJ5RW50cnkuZXhlY3V0ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdHJ5RW50cnkuZXhwb3J0cztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRBbm9ueW1vdXNNb2R1bGU6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgIHJldHVybiBuZXcgTW9kdWxlKGZ1bmMuY2FsbChnbG9iYWwpLCBsaXZlTW9kdWxlU2VudGluZWwpO1xuICAgIH0sXG4gICAgZ2V0Rm9yVGVzdGluZzogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgaWYgKCF0aGlzLnRlc3RpbmdQcmVmaXhfKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1vZHVsZUluc3RhbmNlcykuc29tZSgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgdmFyIG0gPSAvKHRyYWNldXJAW15cXC9dKlxcLykvLmV4ZWMoa2V5KTtcbiAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgJF9fMC50ZXN0aW5nUHJlZml4XyA9IG1bMV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLnRlc3RpbmdQcmVmaXhfICsgbmFtZSk7XG4gICAgfVxuICB9O1xuICBNb2R1bGVTdG9yZS5zZXQoJ0B0cmFjZXVyL3NyYy9ydW50aW1lL01vZHVsZVN0b3JlJywgbmV3IE1vZHVsZSh7TW9kdWxlU3RvcmU6IE1vZHVsZVN0b3JlfSkpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICB9O1xuICAkdHJhY2V1clJ1bnRpbWUuTW9kdWxlU3RvcmUgPSBNb2R1bGVTdG9yZTtcbiAgZ2xvYmFsLlN5c3RlbSA9IHtcbiAgICByZWdpc3RlcjogTW9kdWxlU3RvcmUucmVnaXN0ZXIuYmluZChNb2R1bGVTdG9yZSksXG4gICAgZ2V0OiBNb2R1bGVTdG9yZS5nZXQsXG4gICAgc2V0OiBNb2R1bGVTdG9yZS5zZXQsXG4gICAgbm9ybWFsaXplOiBNb2R1bGVTdG9yZS5ub3JtYWxpemVcbiAgfTtcbiAgJHRyYWNldXJSdW50aW1lLmdldE1vZHVsZUltcGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGluc3RhbnRpYXRvciA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5hbWUpO1xuICAgIHJldHVybiBpbnN0YW50aWF0b3IgJiYgaW5zdGFudGlhdG9yLmdldFVuY29hdGVkTW9kdWxlKCk7XG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIjtcbiAgdmFyICRjZWlsID0gTWF0aC5jZWlsO1xuICB2YXIgJGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciAkcG93ID0gTWF0aC5wb3c7XG4gIHZhciAkbWluID0gTWF0aC5taW47XG4gIHZhciB0b09iamVjdCA9ICR0cmFjZXVyUnVudGltZS50b09iamVjdDtcbiAgZnVuY3Rpb24gdG9VaW50MzIoeCkge1xuICAgIHJldHVybiB4ID4+PiAwO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBpc0NhbGxhYmxlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcic7XG4gIH1cbiAgZnVuY3Rpb24gdG9JbnRlZ2VyKHgpIHtcbiAgICB4ID0gK3g7XG4gICAgaWYgKCRpc05hTih4KSlcbiAgICAgIHJldHVybiAwO1xuICAgIGlmICh4ID09PSAwIHx8ICEkaXNGaW5pdGUoeCkpXG4gICAgICByZXR1cm4geDtcbiAgICByZXR1cm4geCA+IDAgPyAkZmxvb3IoeCkgOiAkY2VpbCh4KTtcbiAgfVxuICB2YXIgTUFYX1NBRkVfTEVOR1RIID0gJHBvdygyLCA1MykgLSAxO1xuICBmdW5jdGlvbiB0b0xlbmd0aCh4KSB7XG4gICAgdmFyIGxlbiA9IHRvSW50ZWdlcih4KTtcbiAgICByZXR1cm4gbGVuIDwgMCA/IDAgOiAkbWluKGxlbiwgTUFYX1NBRkVfTEVOR1RIKTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja0l0ZXJhYmxlKHgpIHtcbiAgICByZXR1cm4gIWlzT2JqZWN0KHgpID8gdW5kZWZpbmVkIDogeFtTeW1ib2wuaXRlcmF0b3JdO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoeCkge1xuICAgIHJldHVybiBpc0NhbGxhYmxlKHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHZhbHVlLCBkb25lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGRvbmU6IGRvbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwgZGVzY3IpIHtcbiAgICBpZiAoIShuYW1lIGluIG9iamVjdCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRGdW5jdGlvbnMob2JqZWN0LCBmdW5jdGlvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBmdW5jdGlvbnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBmdW5jdGlvbnNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkQ29uc3RzKG9iamVjdCwgY29uc3RzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25zdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBuYW1lID0gY29uc3RzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gY29uc3RzW2kgKyAxXTtcbiAgICAgIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkSXRlcmF0b3Iob2JqZWN0LCBmdW5jLCBTeW1ib2wpIHtcbiAgICBpZiAoIVN5bWJvbCB8fCAhU3ltYm9sLml0ZXJhdG9yIHx8IG9iamVjdFtTeW1ib2wuaXRlcmF0b3JdKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChvYmplY3RbJ0BAaXRlcmF0b3InXSlcbiAgICAgIGZ1bmMgPSBvYmplY3RbJ0BAaXRlcmF0b3InXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICAgIHZhbHVlOiBmdW5jLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHZhciBwb2x5ZmlsbHMgPSBbXTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQb2x5ZmlsbChmdW5jKSB7XG4gICAgcG9seWZpbGxzLnB1c2goZnVuYyk7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxBbGwoZ2xvYmFsKSB7XG4gICAgcG9seWZpbGxzLmZvckVhY2goKGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKGdsb2JhbCk7XG4gICAgfSkpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IHRvT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHRvT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IHRvVWludDMyKCkge1xuICAgICAgcmV0dXJuIHRvVWludDMyO1xuICAgIH0sXG4gICAgZ2V0IGlzT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IGlzQ2FsbGFibGUoKSB7XG4gICAgICByZXR1cm4gaXNDYWxsYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc051bWJlcigpIHtcbiAgICAgIHJldHVybiBpc051bWJlcjtcbiAgICB9LFxuICAgIGdldCB0b0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gdG9JbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHRvTGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIHRvTGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IGNoZWNrSXRlcmFibGUoKSB7XG4gICAgICByZXR1cm4gY2hlY2tJdGVyYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc0NvbnN0cnVjdG9yKCkge1xuICAgICAgcmV0dXJuIGlzQ29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBnZXQgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmUoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmU7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVNZXRob2QoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmVNZXRob2Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVDb25zdCgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZUNvbnN0O1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkRnVuY3Rpb25zKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkRnVuY3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkQ29uc3RzKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkQ29uc3RzO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRJdGVyYXRvcjtcbiAgICB9LFxuICAgIGdldCByZWdpc3RlclBvbHlmaWxsKCkge1xuICAgICAgcmV0dXJuIHJlZ2lzdGVyUG9seWZpbGw7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxBbGwoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxBbGw7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCI7XG4gIHZhciAkX18zID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18zLmlzT2JqZWN0LFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzMubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18zLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVsZXRlZFNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIGxvb2t1cEluZGV4KG1hcCwga2V5KSB7XG4gICAgaWYgKGlzT2JqZWN0KGtleSkpIHtcbiAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgcmV0dXJuIGhhc2hPYmplY3QgJiYgbWFwLm9iamVjdEluZGV4X1toYXNoT2JqZWN0Lmhhc2hdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gbWFwLnN0cmluZ0luZGV4X1trZXldO1xuICAgIHJldHVybiBtYXAucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gIH1cbiAgZnVuY3Rpb24gaW5pdE1hcChtYXApIHtcbiAgICBtYXAuZW50cmllc18gPSBbXTtcbiAgICBtYXAub2JqZWN0SW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuc3RyaW5nSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAucHJpbWl0aXZlSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuZGVsZXRlZENvdW50XyA9IDA7XG4gIH1cbiAgdmFyIE1hcCA9IGZ1bmN0aW9uIE1hcCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ2VudHJpZXNfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRNYXAodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzUgPSBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fNjsgISgkX182ID0gJF9fNS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgJF9fNyA9ICRfXzYudmFsdWUsXG4gICAgICAgICAgICBrZXkgPSAkX183WzBdLFxuICAgICAgICAgICAgdmFsdWUgPSAkX183WzFdO1xuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKE1hcCwge1xuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllc18ubGVuZ3RoIC8gMiAtIHRoaXMuZGVsZXRlZENvdW50XztcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBvYmplY3RNb2RlID0gaXNPYmplY3Qoa2V5KTtcbiAgICAgIHZhciBzdHJpbmdNb2RlID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMuZW50cmllc18ubGVuZ3RoO1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4XSA9IGtleTtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICAgIGlmIChvYmplY3RNb2RlKSB7XG4gICAgICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICAgICAgdmFyIGhhc2ggPSBoYXNoT2JqZWN0Lmhhc2g7XG4gICAgICAgICAgdGhpcy5vYmplY3RJbmRleF9baGFzaF0gPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgICAgdGhpcy5zdHJpbmdJbmRleF9ba2V5XSA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV0gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGxvb2t1cEluZGV4KHRoaXMsIGtleSkgIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgb2JqZWN0TW9kZSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICB2YXIgc3RyaW5nTW9kZSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhhc2g7XG4gICAgICBpZiAob2JqZWN0TW9kZSkge1xuICAgICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgICAgaWYgKGhhc2hPYmplY3QpIHtcbiAgICAgICAgICBpbmRleCA9IHRoaXMub2JqZWN0SW5kZXhfW2hhc2ggPSBoYXNoT2JqZWN0Lmhhc2hdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdEluZGV4X1toYXNoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleF0gPSBkZWxldGVkU2VudGluZWw7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kZWxldGVkQ291bnRfKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdE1hcCh0aGlzKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrRm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzgoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzgsIHRoaXMpO1xuICAgIH0pLFxuICAgIGtleXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fOSgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aCkgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fOSwgdGhpcyk7XG4gICAgfSksXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzEwKCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzEwLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IE1hcC5wcm90b3R5cGUuZW50cmllc1xuICB9KTtcbiAgZnVuY3Rpb24gcG9seWZpbGxNYXAoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzcgPSBnbG9iYWwsXG4gICAgICAgIE9iamVjdCA9ICRfXzcuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX183LlN5bWJvbDtcbiAgICBpZiAoIWdsb2JhbC5NYXApXG4gICAgICBnbG9iYWwuTWFwID0gTWFwO1xuICAgIHZhciBtYXBQcm90b3R5cGUgPSBnbG9iYWwuTWFwLnByb3RvdHlwZTtcbiAgICBpZiAobWFwUHJvdG90eXBlLmVudHJpZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IobWFwUHJvdG90eXBlLCBtYXBQcm90b3R5cGUuZW50cmllcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuTWFwKCkuZW50cmllcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSwgU3ltYm9sKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE1hcCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1hcCgpIHtcbiAgICAgIHJldHVybiBNYXA7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxNYXAoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxNYXA7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCI7XG4gIHZhciAkX18xMSA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGlzT2JqZWN0ID0gJF9fMTEuaXNPYmplY3QsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMTEubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18xMS5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgTWFwID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiKS5NYXA7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmdW5jdGlvbiBpbml0U2V0KHNldCkge1xuICAgIHNldC5tYXBfID0gbmV3IE1hcCgpO1xuICB9XG4gIHZhciBTZXQgPSBmdW5jdGlvbiBTZXQoKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICghaXNPYmplY3QodGhpcykpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZXQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSB0eXBlJyk7XG4gICAgaWYgKCRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdtYXBfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRTZXQodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzE1ID0gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzE2OyAhKCRfXzE2ID0gJF9fMTUubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX18xNi52YWx1ZTtcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShTZXQsIHtcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uc2l6ZTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmhhcyhrZXkpO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHRoaXMubWFwXy5zZXQoa2V5LCBrZXkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5kZWxldGUoa2V5KTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uY2xlYXIoKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrRm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgdmFyICRfXzEzID0gdGhpcztcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uZm9yRWFjaCgoZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywga2V5LCBrZXksICRfXzEzKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIHZhbHVlczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18xOCgpIHtcbiAgICAgIHZhciAkX18xOSxcbiAgICAgICAgICAkX18yMDtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgJF9fMTkgPSB0aGlzLm1hcF8ua2V5cygpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAkY3R4LmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRfXzIwID0gJF9fMTlbJGN0eC5hY3Rpb25dKCRjdHguc2VudElnbm9yZVRocm93KTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKCRfXzIwLmRvbmUpID8gMyA6IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSAkX18yMC52YWx1ZTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gJF9fMjAudmFsdWU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18xOCwgdGhpcyk7XG4gICAgfSksXG4gICAgZW50cmllczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18yMSgpIHtcbiAgICAgIHZhciAkX18yMixcbiAgICAgICAgICAkX18yMztcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgJF9fMjIgPSB0aGlzLm1hcF8uZW50cmllcygpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAkY3R4LmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRfXzIzID0gJF9fMjJbJGN0eC5hY3Rpb25dKCRjdHguc2VudElnbm9yZVRocm93KTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKCRfXzIzLmRvbmUpID8gMyA6IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSAkX18yMy52YWx1ZTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gJF9fMjMudmFsdWU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18yMSwgdGhpcyk7XG4gICAgfSlcbiAgfSwge30pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBTZXQucHJvdG90eXBlLnZhbHVlc1xuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsICdrZXlzJywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogU2V0LnByb3RvdHlwZS52YWx1ZXNcbiAgfSk7XG4gIGZ1bmN0aW9uIHBvbHlmaWxsU2V0KGdsb2JhbCkge1xuICAgIHZhciAkX18xNyA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fMTcuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX18xNy5TeW1ib2w7XG4gICAgaWYgKCFnbG9iYWwuU2V0KVxuICAgICAgZ2xvYmFsLlNldCA9IFNldDtcbiAgICB2YXIgc2V0UHJvdG90eXBlID0gZ2xvYmFsLlNldC5wcm90b3R5cGU7XG4gICAgaWYgKHNldFByb3RvdHlwZS52YWx1ZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3Ioc2V0UHJvdG90eXBlLCBzZXRQcm90b3R5cGUudmFsdWVzLCBTeW1ib2wpO1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IGdsb2JhbC5TZXQoKS52YWx1ZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sIFN5bWJvbCk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxTZXQpO1xuICByZXR1cm4ge1xuICAgIGdldCBTZXQoKSB7XG4gICAgICByZXR1cm4gU2V0O1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsU2V0KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsU2V0O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcFwiO1xuICB2YXIgbGVuID0gMDtcbiAgZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICAgIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICAgIGxlbiArPSAyO1xuICAgIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbiAgdmFyICRfX2RlZmF1bHQgPSBhc2FwO1xuICB2YXIgYnJvd3Nlckdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiB7fTtcbiAgdmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgdmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcbiAgZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBub2RlLmRhdGEgPSAoaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDIpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICAgIH07XG4gIH1cbiAgdmFyIHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG4gICAgICBjYWxsYmFjayhhcmcpO1xuICAgICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGxlbiA9IDA7XG4gIH1cbiAgdmFyIHNjaGVkdWxlRmx1c2g7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU5leHRUaWNrKCk7XG4gIH0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xuICB9IGVsc2UgaWYgKGlzV29ya2VyKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gIH0gZWxzZSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZVNldFRpbWVvdXQoKTtcbiAgfVxuICByZXR1cm4ge2dldCBkZWZhdWx0KCkge1xuICAgICAgcmV0dXJuICRfX2RlZmF1bHQ7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2VcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiO1xuICB2YXIgYXN5bmMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCIpLmRlZmF1bHQ7XG4gIHZhciByZWdpc3RlclBvbHlmaWxsID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBwcm9taXNlUmF3ID0ge307XG4gIGZ1bmN0aW9uIGlzUHJvbWlzZSh4KSB7XG4gICAgcmV0dXJuIHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHguc3RhdHVzXyAhPT0gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIGlkUmVzb2x2ZUhhbmRsZXIoeCkge1xuICAgIHJldHVybiB4O1xuICB9XG4gIGZ1bmN0aW9uIGlkUmVqZWN0SGFuZGxlcih4KSB7XG4gICAgdGhyb3cgeDtcbiAgfVxuICBmdW5jdGlvbiBjaGFpbihwcm9taXNlKSB7XG4gICAgdmFyIG9uUmVzb2x2ZSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBpZFJlc29sdmVIYW5kbGVyO1xuICAgIHZhciBvblJlamVjdCA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiBpZFJlamVjdEhhbmRsZXI7XG4gICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQocHJvbWlzZS5jb25zdHJ1Y3Rvcik7XG4gICAgc3dpdGNoIChwcm9taXNlLnN0YXR1c18pIHtcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICB0aHJvdyBUeXBlRXJyb3I7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHByb21pc2Uub25SZXNvbHZlXy5wdXNoKG9uUmVzb2x2ZSwgZGVmZXJyZWQpO1xuICAgICAgICBwcm9taXNlLm9uUmVqZWN0Xy5wdXNoKG9uUmVqZWN0LCBkZWZlcnJlZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSArMTpcbiAgICAgICAgcHJvbWlzZUVucXVldWUocHJvbWlzZS52YWx1ZV8sIFtvblJlc29sdmUsIGRlZmVycmVkXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgcHJvbWlzZUVucXVldWUocHJvbWlzZS52YWx1ZV8sIFtvblJlamVjdCwgZGVmZXJyZWRdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIGdldERlZmVycmVkKEMpIHtcbiAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgIHZhciBwcm9taXNlID0gcHJvbWlzZUluaXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IHByb21pc2UsXG4gICAgICAgIHJlc29sdmU6IChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCk7XG4gICAgICAgIH0pLFxuICAgICAgICByZWplY3Q6IChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCByKTtcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIHJlc3VsdC5wcm9taXNlID0gbmV3IEMoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXN1bHQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHJlc3VsdC5yZWplY3QgPSByZWplY3Q7XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlU2V0KHByb21pc2UsIHN0YXR1cywgdmFsdWUsIG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgICBwcm9taXNlLnN0YXR1c18gPSBzdGF0dXM7XG4gICAgcHJvbWlzZS52YWx1ZV8gPSB2YWx1ZTtcbiAgICBwcm9taXNlLm9uUmVzb2x2ZV8gPSBvblJlc29sdmU7XG4gICAgcHJvbWlzZS5vblJlamVjdF8gPSBvblJlamVjdDtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlSW5pdChwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2VTZXQocHJvbWlzZSwgMCwgdW5kZWZpbmVkLCBbXSwgW10pO1xuICB9XG4gIHZhciBQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICAgIGlmIChyZXNvbHZlciA9PT0gcHJvbWlzZVJhdylcbiAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VJbml0KHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICByZXNvbHZlcigoZnVuY3Rpb24oeCkge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KTtcbiAgICAgIH0pLCAoZnVuY3Rpb24ocikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpO1xuICAgICAgfSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgZSk7XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShQcm9taXNlLCB7XG4gICAgY2F0Y2g6IGZ1bmN0aW9uKG9uUmVqZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3QpO1xuICAgIH0sXG4gICAgdGhlbjogZnVuY3Rpb24ob25SZXNvbHZlLCBvblJlamVjdCkge1xuICAgICAgaWYgKHR5cGVvZiBvblJlc29sdmUgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uUmVzb2x2ZSA9IGlkUmVzb2x2ZUhhbmRsZXI7XG4gICAgICBpZiAodHlwZW9mIG9uUmVqZWN0ICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBvblJlamVjdCA9IGlkUmVqZWN0SGFuZGxlcjtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY2hhaW4odGhpcywgZnVuY3Rpb24oeCkge1xuICAgICAgICB4ID0gcHJvbWlzZUNvZXJjZShjb25zdHJ1Y3RvciwgeCk7XG4gICAgICAgIHJldHVybiB4ID09PSB0aGF0ID8gb25SZWplY3QobmV3IFR5cGVFcnJvcikgOiBpc1Byb21pc2UoeCkgPyB4LnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCkgOiBvblJlc29sdmUoeCk7XG4gICAgICB9LCBvblJlamVjdCk7XG4gICAgfVxuICB9LCB7XG4gICAgcmVzb2x2ZTogZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICAgIGlmIChpc1Byb21pc2UoeCkpIHtcbiAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZVNldChuZXcgJFByb21pc2UocHJvbWlzZVJhdyksICsxLCB4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZXNvbHZlKHgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlamVjdDogZnVuY3Rpb24ocikge1xuICAgICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlU2V0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSwgLTEsIHIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3Qocik7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZCh0aGlzKTtcbiAgICAgIHZhciByZXNvbHV0aW9ucyA9IFtdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNvdW50ID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHV0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWx1ZXNbaV0pLnRoZW4oZnVuY3Rpb24oaSwgeCkge1xuICAgICAgICAgICAgICByZXNvbHV0aW9uc1tpXSA9IHg7XG4gICAgICAgICAgICAgIGlmICgtLWNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzb2x1dGlvbnMpO1xuICAgICAgICAgICAgfS5iaW5kKHVuZGVmaW5lZCwgaSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfSxcbiAgICByYWNlOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnJlc29sdmUodmFsdWVzW2ldKS50aGVuKChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHgpO1xuICAgICAgICAgIH0pLCAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgJFByb21pc2UgPSBQcm9taXNlO1xuICB2YXIgJFByb21pc2VSZWplY3QgPSAkUHJvbWlzZS5yZWplY3Q7XG4gIGZ1bmN0aW9uIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCArMSwgeCwgcHJvbWlzZS5vblJlc29sdmVfKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCAtMSwgciwgcHJvbWlzZS5vblJlamVjdF8pO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VEb25lKHByb21pc2UsIHN0YXR1cywgdmFsdWUsIHJlYWN0aW9ucykge1xuICAgIGlmIChwcm9taXNlLnN0YXR1c18gIT09IDApXG4gICAgICByZXR1cm47XG4gICAgcHJvbWlzZUVucXVldWUodmFsdWUsIHJlYWN0aW9ucyk7XG4gICAgcHJvbWlzZVNldChwcm9taXNlLCBzdGF0dXMsIHZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlRW5xdWV1ZSh2YWx1ZSwgdGFza3MpIHtcbiAgICBhc3luYygoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHByb21pc2VIYW5kbGUodmFsdWUsIHRhc2tzW2ldLCB0YXNrc1tpICsgMV0pO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlSGFuZGxlKHZhbHVlLCBoYW5kbGVyLCBkZWZlcnJlZCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICBpZiAocmVzdWx0ID09PSBkZWZlcnJlZC5wcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgICAgZWxzZSBpZiAoaXNQcm9taXNlKHJlc3VsdCkpXG4gICAgICAgIGNoYWluKHJlc3VsdCwgZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHZhciB0aGVuYWJsZVN5bWJvbCA9ICdAQHRoZW5hYmxlJztcbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VDb2VyY2UoY29uc3RydWN0b3IsIHgpIHtcbiAgICBpZiAoIWlzUHJvbWlzZSh4KSAmJiBpc09iamVjdCh4KSkge1xuICAgICAgdmFyIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICB0aGVuID0geC50aGVuO1xuICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlUmVqZWN0LmNhbGwoY29uc3RydWN0b3IsIHIpO1xuICAgICAgICB4W3RoZW5hYmxlU3ltYm9sXSA9IHByb21pc2U7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBwID0geFt0aGVuYWJsZVN5bWJvbF07XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQoY29uc3RydWN0b3IpO1xuICAgICAgICAgIHhbdGhlbmFibGVTeW1ib2xdID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHgsIGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFByb21pc2UoZ2xvYmFsKSB7XG4gICAgaWYgKCFnbG9iYWwuUHJvbWlzZSlcbiAgICAgIGdsb2JhbC5Qcm9taXNlID0gUHJvbWlzZTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsUHJvbWlzZSk7XG4gIHJldHVybiB7XG4gICAgZ2V0IFByb21pc2UoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZTtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbFByb21pc2UoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxQcm9taXNlO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2VcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkX18yOTtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIjtcbiAgdmFyICRfXzI3ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QgPSAkX18yNy5jcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCxcbiAgICAgIGlzT2JqZWN0ID0gJF9fMjcuaXNPYmplY3Q7XG4gIHZhciAkX18zMCA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGhhc093blByb3BlcnR5ID0gJF9fMzAuaGFzT3duUHJvcGVydHksXG4gICAgICB0b1Byb3BlcnR5ID0gJF9fMzAudG9Qcm9wZXJ0eTtcbiAgdmFyIGl0ZXJhdGVkU3RyaW5nID0gU3ltYm9sKCdpdGVyYXRlZFN0cmluZycpO1xuICB2YXIgc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXggPSBTeW1ib2woJ3N0cmluZ0l0ZXJhdG9yTmV4dEluZGV4Jyk7XG4gIHZhciBTdHJpbmdJdGVyYXRvciA9IGZ1bmN0aW9uIFN0cmluZ0l0ZXJhdG9yKCkge307XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFN0cmluZ0l0ZXJhdG9yLCAoJF9fMjkgPSB7fSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzI5LCBcIm5leHRcIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvID0gdGhpcztcbiAgICAgIGlmICghaXNPYmplY3QobykgfHwgIWhhc093blByb3BlcnR5KG8sIGl0ZXJhdGVkU3RyaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIG11c3QgYmUgYSBTdHJpbmdJdGVyYXRvciBvYmplY3QnKTtcbiAgICAgIH1cbiAgICAgIHZhciBzID0gb1t0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV07XG4gICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIHBvc2l0aW9uID0gb1t0b1Byb3BlcnR5KHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4KV07XG4gICAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgICBpZiAocG9zaXRpb24gPj0gbGVuKSB7XG4gICAgICAgIG9bdG9Qcm9wZXJ0eShpdGVyYXRlZFN0cmluZyldID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHZhciBmaXJzdCA9IHMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgICB2YXIgcmVzdWx0U3RyaW5nO1xuICAgICAgaWYgKGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gbGVuKSB7XG4gICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNlY29uZCA9IHMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpO1xuICAgICAgICBpZiAoc2Vjb25kIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpICsgU3RyaW5nLmZyb21DaGFyQ29kZShzZWNvbmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXSA9IHBvc2l0aW9uICsgcmVzdWx0U3RyaW5nLmxlbmd0aDtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChyZXN1bHRTdHJpbmcsIGZhbHNlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMjksIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzI5KSwge30pO1xuICBmdW5jdGlvbiBjcmVhdGVTdHJpbmdJdGVyYXRvcihzdHJpbmcpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhzdHJpbmcpO1xuICAgIHZhciBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoU3RyaW5nSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgICBpdGVyYXRvclt0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV0gPSBzO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXSA9IDA7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIHJldHVybiB7Z2V0IGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICAgIH19O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCI7XG4gIHZhciBjcmVhdGVTdHJpbmdJdGVyYXRvciA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiKS5jcmVhdGVTdHJpbmdJdGVyYXRvcjtcbiAgdmFyICRfXzMyID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgbWF5YmVBZGRGdW5jdGlvbnMgPSAkX18zMi5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18zMi5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzMyLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciAkdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgJGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG4gIHZhciAkbGFzdEluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmxhc3RJbmRleE9mO1xuICBmdW5jdGlvbiBzdGFydHNXaXRoKHNlYXJjaCkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCB8fCAkdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICBwb3MgPSAwO1xuICAgIH1cbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHJldHVybiAkaW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3MpID09IHN0YXJ0O1xuICB9XG4gIGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaCkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCB8fCAkdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3MgPSBzdHJpbmdMZW5ndGg7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAocG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgICAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVuZCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgdmFyIHN0YXJ0ID0gZW5kIC0gc2VhcmNoTGVuZ3RoO1xuICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICRsYXN0SW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBzdGFydCkgPT0gc3RhcnQ7XG4gIH1cbiAgZnVuY3Rpb24gY29udGFpbnMoc2VhcmNoKSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICBwb3MgPSAwO1xuICAgIH1cbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHJldHVybiAkaW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3MpICE9IC0xO1xuICB9XG4gIGZ1bmN0aW9uIHJlcGVhdChjb3VudCkge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBuID0gY291bnQgPyBOdW1iZXIoY291bnQpIDogMDtcbiAgICBpZiAoaXNOYU4obikpIHtcbiAgICAgIG4gPSAwO1xuICAgIH1cbiAgICBpZiAobiA8IDAgfHwgbiA9PSBJbmZpbml0eSkge1xuICAgICAgdGhyb3cgUmFuZ2VFcnJvcigpO1xuICAgIH1cbiAgICBpZiAobiA9PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB3aGlsZSAobi0tKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIHNpemUgPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBpbmRleCA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHNpemUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBmaXJzdCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICB2YXIgc2Vjb25kO1xuICAgIGlmIChmaXJzdCA+PSAweEQ4MDAgJiYgZmlyc3QgPD0gMHhEQkZGICYmIHNpemUgPiBpbmRleCArIDEpIHtcbiAgICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICAgIHJldHVybiAoZmlyc3QgLSAweEQ4MDApICogMHg0MDAgKyBzZWNvbmQgLSAweERDMDAgKyAweDEwMDAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlyc3Q7XG4gIH1cbiAgZnVuY3Rpb24gcmF3KGNhbGxzaXRlKSB7XG4gICAgdmFyIHJhdyA9IGNhbGxzaXRlLnJhdztcbiAgICB2YXIgbGVuID0gcmF3Lmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAobGVuID09PSAwKVxuICAgICAgcmV0dXJuICcnO1xuICAgIHZhciBzID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBzICs9IHJhd1tpXTtcbiAgICAgIGlmIChpICsgMSA9PT0gbGVuKVxuICAgICAgICByZXR1cm4gcztcbiAgICAgIHMgKz0gYXJndW1lbnRzWysraV07XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoKSB7XG4gICAgdmFyIGNvZGVVbml0cyA9IFtdO1xuICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIGhpZ2hTdXJyb2dhdGU7XG4gICAgdmFyIGxvd1N1cnJvZ2F0ZTtcbiAgICB2YXIgaW5kZXggPSAtMTtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGNvZGVQb2ludCA9IE51bWJlcihhcmd1bWVudHNbaW5kZXhdKTtcbiAgICAgIGlmICghaXNGaW5pdGUoY29kZVBvaW50KSB8fCBjb2RlUG9pbnQgPCAwIHx8IGNvZGVQb2ludCA+IDB4MTBGRkZGIHx8IGZsb29yKGNvZGVQb2ludCkgIT0gY29kZVBvaW50KSB7XG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludDogJyArIGNvZGVQb2ludCk7XG4gICAgICB9XG4gICAgICBpZiAoY29kZVBvaW50IDw9IDB4RkZGRikge1xuICAgICAgICBjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29kZVBvaW50IC09IDB4MTAwMDA7XG4gICAgICAgIGhpZ2hTdXJyb2dhdGUgPSAoY29kZVBvaW50ID4+IDEwKSArIDB4RDgwMDtcbiAgICAgICAgbG93U3Vycm9nYXRlID0gKGNvZGVQb2ludCAlIDB4NDAwKSArIDB4REMwMDtcbiAgICAgICAgY29kZVVuaXRzLnB1c2goaGlnaFN1cnJvZ2F0ZSwgbG93U3Vycm9nYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcbiAgfVxuICBmdW5jdGlvbiBzdHJpbmdQcm90b3R5cGVJdGVyYXRvcigpIHtcbiAgICB2YXIgbyA9ICR0cmFjZXVyUnVudGltZS5jaGVja09iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICB2YXIgcyA9IFN0cmluZyhvKTtcbiAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3Iocyk7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxTdHJpbmcoZ2xvYmFsKSB7XG4gICAgdmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLnByb3RvdHlwZSwgWydjb2RlUG9pbnRBdCcsIGNvZGVQb2ludEF0LCAnY29udGFpbnMnLCBjb250YWlucywgJ2VuZHNXaXRoJywgZW5kc1dpdGgsICdzdGFydHNXaXRoJywgc3RhcnRzV2l0aCwgJ3JlcGVhdCcsIHJlcGVhdF0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKFN0cmluZywgWydmcm9tQ29kZVBvaW50JywgZnJvbUNvZGVQb2ludCwgJ3JhdycsIHJhd10pO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoU3RyaW5nLnByb3RvdHlwZSwgc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IsIFN5bWJvbCk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFN0cmluZyk7XG4gIHJldHVybiB7XG4gICAgZ2V0IHN0YXJ0c1dpdGgoKSB7XG4gICAgICByZXR1cm4gc3RhcnRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBlbmRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBlbmRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBjb250YWlucygpIHtcbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9LFxuICAgIGdldCByZXBlYXQoKSB7XG4gICAgICByZXR1cm4gcmVwZWF0O1xuICAgIH0sXG4gICAgZ2V0IGNvZGVQb2ludEF0KCkge1xuICAgICAgcmV0dXJuIGNvZGVQb2ludEF0O1xuICAgIH0sXG4gICAgZ2V0IHJhdygpIHtcbiAgICAgIHJldHVybiByYXc7XG4gICAgfSxcbiAgICBnZXQgZnJvbUNvZGVQb2ludCgpIHtcbiAgICAgIHJldHVybiBmcm9tQ29kZVBvaW50O1xuICAgIH0sXG4gICAgZ2V0IHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsU3RyaW5nO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJF9fMzY7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIjtcbiAgdmFyICRfXzM0ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgdG9PYmplY3QgPSAkX18zNC50b09iamVjdCxcbiAgICAgIHRvVWludDMyID0gJF9fMzQudG9VaW50MzIsXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzM0LmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0O1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9LRVlTID0gMTtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTID0gMjtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUyA9IDM7XG4gIHZhciBBcnJheUl0ZXJhdG9yID0gZnVuY3Rpb24gQXJyYXlJdGVyYXRvcigpIHt9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShBcnJheUl0ZXJhdG9yLCAoJF9fMzYgPSB7fSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzM2LCBcIm5leHRcIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IHRvT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuaXRlcmF0b3JPYmplY3RfO1xuICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QgaXMgbm90IGFuIEFycmF5SXRlcmF0b3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfO1xuICAgICAgdmFyIGl0ZW1LaW5kID0gaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXztcbiAgICAgIHZhciBsZW5ndGggPSB0b1VpbnQzMihhcnJheS5sZW5ndGgpO1xuICAgICAgaWYgKGluZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IEluZmluaXR5O1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gaW5kZXggKyAxO1xuICAgICAgaWYgKGl0ZW1LaW5kID09IEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoYXJyYXlbaW5kZXhdLCBmYWxzZSk7XG4gICAgICBpZiAoaXRlbUtpbmQgPT0gQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoW2luZGV4LCBhcnJheVtpbmRleF1dLCBmYWxzZSk7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoaW5kZXgsIGZhbHNlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMzYsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzM2KSwge30pO1xuICBmdW5jdGlvbiBjcmVhdGVBcnJheUl0ZXJhdG9yKGFycmF5LCBraW5kKSB7XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KGFycmF5KTtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgQXJyYXlJdGVyYXRvcjtcbiAgICBpdGVyYXRvci5pdGVyYXRvck9iamVjdF8gPSBvYmplY3Q7XG4gICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSAwO1xuICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0aW9uS2luZF8gPSBraW5kO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUyk7XG4gIH1cbiAgZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX0tFWVMpO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX1ZBTFVFUyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZXQgZW50cmllcygpIHtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH0sXG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlcIjtcbiAgdmFyICRfXzM3ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIiksXG4gICAgICBlbnRyaWVzID0gJF9fMzcuZW50cmllcyxcbiAgICAgIGtleXMgPSAkX18zNy5rZXlzLFxuICAgICAgdmFsdWVzID0gJF9fMzcudmFsdWVzO1xuICB2YXIgJF9fMzggPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBjaGVja0l0ZXJhYmxlID0gJF9fMzguY2hlY2tJdGVyYWJsZSxcbiAgICAgIGlzQ2FsbGFibGUgPSAkX18zOC5pc0NhbGxhYmxlLFxuICAgICAgaXNDb25zdHJ1Y3RvciA9ICRfXzM4LmlzQ29uc3RydWN0b3IsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzM4Lm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzM4Lm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMzgucmVnaXN0ZXJQb2x5ZmlsbCxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzM4LnRvSW50ZWdlcixcbiAgICAgIHRvTGVuZ3RoID0gJF9fMzgudG9MZW5ndGgsXG4gICAgICB0b09iamVjdCA9ICRfXzM4LnRvT2JqZWN0O1xuICBmdW5jdGlvbiBmcm9tKGFyckxpa2UpIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBpdGVtcyA9IHRvT2JqZWN0KGFyckxpa2UpO1xuICAgIHZhciBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIGFycixcbiAgICAgICAgbGVuO1xuICAgIGlmIChtYXBwaW5nICYmICFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChjaGVja0l0ZXJhYmxlKGl0ZW1zKSkge1xuICAgICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKCkgOiBbXTtcbiAgICAgIGZvciAodmFyICRfXzM5ID0gaXRlbXNbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzQwOyAhKCRfXzQwID0gJF9fMzkubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX180MC52YWx1ZTtcbiAgICAgICAge1xuICAgICAgICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICAgICAgICBhcnJba10gPSBtYXBGbi5jYWxsKHRoaXNBcmcsIGl0ZW0sIGspO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJba10gPSBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICBrKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFyci5sZW5ndGggPSBrO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcbiAgICBhcnIgPSBpc0NvbnN0cnVjdG9yKEMpID8gbmV3IEMobGVuKSA6IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICAgIGFycltrXSA9IHR5cGVvZiB0aGlzQXJnID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGl0ZW1zW2tdLCBrKSA6IG1hcEZuLmNhbGwodGhpc0FyZywgaXRlbXNba10sIGspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyW2tdID0gaXRlbXNba107XG4gICAgICB9XG4gICAgfVxuICAgIGFyci5sZW5ndGggPSBsZW47XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBmdW5jdGlvbiBvZigpIHtcbiAgICBmb3IgKHZhciBpdGVtcyA9IFtdLFxuICAgICAgICAkX180MSA9IDA7ICRfXzQxIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNDErKylcbiAgICAgIGl0ZW1zWyRfXzQxXSA9IGFyZ3VtZW50c1skX180MV07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47IGsrKykge1xuICAgICAgYXJyW2tdID0gaXRlbXNba107XG4gICAgfVxuICAgIGFyci5sZW5ndGggPSBsZW47XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBmdW5jdGlvbiBmaWxsKHZhbHVlKSB7XG4gICAgdmFyIHN0YXJ0ID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgdmFyIGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKG9iamVjdC5sZW5ndGgpO1xuICAgIHZhciBmaWxsU3RhcnQgPSB0b0ludGVnZXIoc3RhcnQpO1xuICAgIHZhciBmaWxsRW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyB0b0ludGVnZXIoZW5kKSA6IGxlbjtcbiAgICBmaWxsU3RhcnQgPSBmaWxsU3RhcnQgPCAwID8gTWF0aC5tYXgobGVuICsgZmlsbFN0YXJ0LCAwKSA6IE1hdGgubWluKGZpbGxTdGFydCwgbGVuKTtcbiAgICBmaWxsRW5kID0gZmlsbEVuZCA8IDAgPyBNYXRoLm1heChsZW4gKyBmaWxsRW5kLCAwKSA6IE1hdGgubWluKGZpbGxFbmQsIGxlbik7XG4gICAgd2hpbGUgKGZpbGxTdGFydCA8IGZpbGxFbmQpIHtcbiAgICAgIG9iamVjdFtmaWxsU3RhcnRdID0gdmFsdWU7XG4gICAgICBmaWxsU3RhcnQrKztcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZywgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEhlbHBlcihzZWxmLCBwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgcmV0dXJuSW5kZXggPSBhcmd1bWVudHNbM10gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHNlbGYpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChvYmplY3QubGVuZ3RoKTtcbiAgICBpZiAoIWlzQ2FsbGFibGUocHJlZGljYXRlKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIG9iamVjdCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgb2JqZWN0KSkge1xuICAgICAgICAgIHJldHVybiByZXR1cm5JbmRleCA/IGkgOiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuSW5kZXggPyAtMSA6IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbEFycmF5KGdsb2JhbCkge1xuICAgIHZhciAkX180MiA9IGdsb2JhbCxcbiAgICAgICAgQXJyYXkgPSAkX180Mi5BcnJheSxcbiAgICAgICAgT2JqZWN0ID0gJF9fNDIuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX180Mi5TeW1ib2w7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoQXJyYXkucHJvdG90eXBlLCBbJ2VudHJpZXMnLCBlbnRyaWVzLCAna2V5cycsIGtleXMsICd2YWx1ZXMnLCB2YWx1ZXMsICdmaWxsJywgZmlsbCwgJ2ZpbmQnLCBmaW5kLCAnZmluZEluZGV4JywgZmluZEluZGV4XSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoQXJyYXksIFsnZnJvbScsIGZyb20sICdvZicsIG9mXSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihBcnJheS5wcm90b3R5cGUsIHZhbHVlcywgU3ltYm9sKTtcbiAgICBtYXliZUFkZEl0ZXJhdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihbXS52YWx1ZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgU3ltYm9sKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsQXJyYXkpO1xuICByZXR1cm4ge1xuICAgIGdldCBmcm9tKCkge1xuICAgICAgcmV0dXJuIGZyb207XG4gICAgfSxcbiAgICBnZXQgb2YoKSB7XG4gICAgICByZXR1cm4gb2Y7XG4gICAgfSxcbiAgICBnZXQgZmlsbCgpIHtcbiAgICAgIHJldHVybiBmaWxsO1xuICAgIH0sXG4gICAgZ2V0IGZpbmQoKSB7XG4gICAgICByZXR1cm4gZmluZDtcbiAgICB9LFxuICAgIGdldCBmaW5kSW5kZXgoKSB7XG4gICAgICByZXR1cm4gZmluZEluZGV4O1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsQXJyYXkoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxBcnJheTtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiO1xuICB2YXIgJF9fNDMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzQzLm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzQzLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciAkX180NCA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGRlZmluZVByb3BlcnR5ID0gJF9fNDQuZGVmaW5lUHJvcGVydHksXG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkX180NC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gICAgICBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJF9fNDQuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgICAgIGtleXMgPSAkX180NC5rZXlzLFxuICAgICAgcHJpdmF0ZU5hbWVzID0gJF9fNDQucHJpdmF0ZU5hbWVzO1xuICBmdW5jdGlvbiBpcyhsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0ID09PSByaWdodClcbiAgICAgIHJldHVybiBsZWZ0ICE9PSAwIHx8IDEgLyBsZWZ0ID09PSAxIC8gcmlnaHQ7XG4gICAgcmV0dXJuIGxlZnQgIT09IGxlZnQgJiYgcmlnaHQgIT09IHJpZ2h0O1xuICB9XG4gIGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMoc291cmNlKTtcbiAgICAgIHZhciBwLFxuICAgICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgICB2YXIgbmFtZSA9IHByb3BzW3BdO1xuICAgICAgICBpZiAocHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBzb3VyY2VbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgZnVuY3Rpb24gbWl4aW4odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgcHJvcHMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSk7XG4gICAgdmFyIHAsXG4gICAgICAgIGRlc2NyaXB0b3IsXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgICBmb3IgKHAgPSAwOyBwIDwgbGVuZ3RoOyBwKyspIHtcbiAgICAgIHZhciBuYW1lID0gcHJvcHNbcF07XG4gICAgICBpZiAocHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wc1twXSk7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BzW3BdLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChnbG9iYWwpIHtcbiAgICB2YXIgT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhPYmplY3QsIFsnYXNzaWduJywgYXNzaWduLCAnaXMnLCBpcywgJ21peGluJywgbWl4aW5dKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsT2JqZWN0KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgaXMoKSB7XG4gICAgICByZXR1cm4gaXM7XG4gICAgfSxcbiAgICBnZXQgYXNzaWduKCkge1xuICAgICAgcmV0dXJuIGFzc2lnbjtcbiAgICB9LFxuICAgIGdldCBtaXhpbigpIHtcbiAgICAgIHJldHVybiBtaXhpbjtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE9iamVjdCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE9iamVjdDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIjtcbiAgdmFyICRfXzQ2ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNOdW1iZXIgPSAkX180Ni5pc051bWJlcixcbiAgICAgIG1heWJlQWRkQ29uc3RzID0gJF9fNDYubWF5YmVBZGRDb25zdHMsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzQ2Lm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzQ2LnJlZ2lzdGVyUG9seWZpbGwsXG4gICAgICB0b0ludGVnZXIgPSAkX180Ni50b0ludGVnZXI7XG4gIHZhciAkYWJzID0gTWF0aC5hYnM7XG4gIHZhciAkaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgdmFyICRpc05hTiA9IGlzTmFOO1xuICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBNSU5fU0FGRV9JTlRFR0VSID0gLU1hdGgucG93KDIsIDUzKSArIDE7XG4gIHZhciBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcbiAgZnVuY3Rpb24gTnVtYmVySXNGaW5pdGUobnVtYmVyKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG51bWJlcikgJiYgJGlzRmluaXRlKG51bWJlcik7XG4gIH1cbiAgO1xuICBmdW5jdGlvbiBpc0ludGVnZXIobnVtYmVyKSB7XG4gICAgcmV0dXJuIE51bWJlcklzRmluaXRlKG51bWJlcikgJiYgdG9JbnRlZ2VyKG51bWJlcikgPT09IG51bWJlcjtcbiAgfVxuICBmdW5jdGlvbiBOdW1iZXJJc05hTihudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNOYU4obnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKSB7XG4gICAgaWYgKE51bWJlcklzRmluaXRlKG51bWJlcikpIHtcbiAgICAgIHZhciBpbnRlZ3JhbCA9IHRvSW50ZWdlcihudW1iZXIpO1xuICAgICAgaWYgKGludGVncmFsID09PSBudW1iZXIpXG4gICAgICAgIHJldHVybiAkYWJzKGludGVncmFsKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxOdW1iZXIoZ2xvYmFsKSB7XG4gICAgdmFyIE51bWJlciA9IGdsb2JhbC5OdW1iZXI7XG4gICAgbWF5YmVBZGRDb25zdHMoTnVtYmVyLCBbJ01BWF9TQUZFX0lOVEVHRVInLCBNQVhfU0FGRV9JTlRFR0VSLCAnTUlOX1NBRkVfSU5URUdFUicsIE1JTl9TQUZFX0lOVEVHRVIsICdFUFNJTE9OJywgRVBTSUxPTl0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKE51bWJlciwgWydpc0Zpbml0ZScsIE51bWJlcklzRmluaXRlLCAnaXNJbnRlZ2VyJywgaXNJbnRlZ2VyLCAnaXNOYU4nLCBOdW1iZXJJc05hTiwgJ2lzU2FmZUludGVnZXInLCBpc1NhZmVJbnRlZ2VyXSk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE51bWJlcik7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1BWF9TQUZFX0lOVEVHRVIoKSB7XG4gICAgICByZXR1cm4gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9LFxuICAgIGdldCBNSU5fU0FGRV9JTlRFR0VSKCkge1xuICAgICAgcmV0dXJuIE1JTl9TQUZFX0lOVEVHRVI7XG4gICAgfSxcbiAgICBnZXQgRVBTSUxPTigpIHtcbiAgICAgIHJldHVybiBFUFNJTE9OO1xuICAgIH0sXG4gICAgZ2V0IGlzRmluaXRlKCkge1xuICAgICAgcmV0dXJuIE51bWJlcklzRmluaXRlO1xuICAgIH0sXG4gICAgZ2V0IGlzSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc0ludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgaXNOYU4oKSB7XG4gICAgICByZXR1cm4gTnVtYmVySXNOYU47XG4gICAgfSxcbiAgICBnZXQgaXNTYWZlSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc1NhZmVJbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsTnVtYmVyO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiO1xuICB2YXIgcG9seWZpbGxBbGwgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIikucG9seWZpbGxBbGw7XG4gIHBvbHlmaWxsQWxsKHRoaXMpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICAgIHBvbHlmaWxsQWxsKGdsb2JhbCk7XG4gIH07XG4gIHJldHVybiB7fTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiICsgJycpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
