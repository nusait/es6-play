!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.App=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var BaseApplication = require('../framework/src/Wildcat/Foundation/Application');
var helpers = require('../framework/src/Wildcat/Support/helpers');
var log = helpers.log;
var Application = function Application() {
  $traceurRuntime.defaultSuperCall(this, $Application.prototype, arguments);
};
var $Application = Application;
($traceurRuntime.createClass)(Application, {
  start: function() {
    log('::#start class Application extends BaseApplication');
    if (this.isLocal()) {
      log("::i am local!!");
      this.on('bind', log);
    }
    $traceurRuntime.superCall(this, $Application.prototype, "start", []);
  },
  run: function() {
    log('::#run class Application extends BaseApplication');
    $traceurRuntime.superCall(this, $Application.prototype, "run", []);
    this.debugOnGlobal();
    this.proceed();
  },
  proceed: function() {
    var viewManager = (this).viewManager;
    viewManager.init();
  },
  debugOnGlobal: function() {
    log("debugOnGlobal");
    var app = this;
    if (app.isLocal()) {
      log(("=== NEW app.environment() is " + app.environment()));
      for (var $__1 = app[Symbol.iterator](),
          $__2; !($__2 = $__1.next()).done; ) {
        var key = $__2.value;
        {
          if (!global[key])
            global[key] = app[key];
        }
      }
      global.helpers = helpers;
      for (var key in helpers) {
        if (!global[key])
          global[key] = helpers[key];
      }
    }
    return app;
  }
}, {}, BaseApplication);
module.exports = Application;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../framework/src/Wildcat/Foundation/Application":46,"../framework/src/Wildcat/Support/helpers":54}],2:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var AboutView = function AboutView(app, template) {
  this.name = 'about';
  $traceurRuntime.superCall(this, $AboutView.prototype, "constructor", [app]);
  assign(this, {
    template: template,
    name: 'about'
  });
};
var $AboutView = AboutView;
($traceurRuntime.createClass)(AboutView, {}, {}, View);
var $__1 = helpers,
    log = $__1.log,
    assign = $__1.assign;
module.exports = AboutView;


},{"Wildcat.Support.helpers":54,"Wildcat.View.View":57}],3:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var IntroView = function IntroView(app) {
  for (var args = [],
      $__1 = 1; $__1 < arguments.length; $__1++)
    args[$__1 - 1] = arguments[$__1];
  this.name = 'intro';
  $traceurRuntime.superCall(this, $IntroView.prototype, "constructor", [app]);
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
    log("::introView#getBluelights");
    var app = (this).app;
    var command = app.make('retrieveBluelightsCommand');
    return this.execute(command).then((function(collection) {
      log("::got it from thenable ", collection);
    })).catch((function(err) {
      error('::got it from catchable', err.message);
    }));
  },
  onBluelightsDelivered: function($__2) {
    var collection = $__2.value;
    log("whenBluelightsDelivered");
  },
  onFailRetrieveBluelightsCommand: function(err) {
    error("onFailRetrieveBluelightsCommand", err);
  }
}, {}, View);
var $__2 = helpers,
    log = $__2.log,
    error = $__2.error;
module.exports = IntroView;


},{"Wildcat.Support.helpers":54,"Wildcat.View.View":57}],4:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var MenuView = function MenuView(app, template) {
  this.name = 'menu';
  $traceurRuntime.superCall(this, $MenuView.prototype, "constructor", [app]);
  assign(this, {template: template});
};
var $MenuView = MenuView;
($traceurRuntime.createClass)(MenuView, {
  bindEvents: function() {
    $traceurRuntime.superCall(this, $MenuView.prototype, "bindEvents", []);
    var document = this.app.window.document;
    var body = document.body;
  },
  toggleMenu: function() {
    var $__1 = this,
        moveableEl = $__1.moveableEl,
        screenEl = $__1.screenEl;
    var moveableElCL = moveableEl.classList;
    var screenElCL = screenEl.classList;
    var isShowing = moveableElCL.contains('show');
    if (isShowing) {
      this.remove('show');
      moveableElCL.add('transition');
      wait(40).then((function() {
        moveableElCL.remove('show');
        wait(300).then((function() {
          moveableElCL.remove('transition');
          moveableElCL.add('done');
          screenElCL.add('hide');
        }));
      }));
    } else {
      this.add('show');
      screenElCL.remove('hide');
      moveableElCL.remove('done');
      wait(10).then((function() {
        return moveableElCL.add('transition');
      })).then((function() {
        return wait(20);
      })).then((function() {
        moveableElCL.add('show');
        wait(300).then((function() {
          return moveableElCL.remove('transition');
        }));
      }));
    }
  },
  onClickToggle: function(target) {
    this.toggleMenu();
  },
  onClickScreen: function() {
    this.toggleMenu();
  },
  onClickItem: function(target) {
    log(target.parentNode.className);
  },
  onHighlightstart: function(e) {
    var target = e.target;
    if (target.matches('.menu button')) {
      this.ancestorOf(target, 'div').classList.add('active');
    } else {
      $traceurRuntime.superCall(this, $MenuView.prototype, "onHighlightstart", [e]);
    }
  },
  onHighlightend: function(e) {
    var target = e.target;
    if (target.matches('.menu button')) {
      this.ancestorOf(target, 'div').classList.remove('active');
    } else {
      $traceurRuntime.superCall(this, $MenuView.prototype, "onHighlightend", [e]);
    }
  },
  get menuEl() {
    return this.$('.menu');
  },
  get barEl() {
    return this.$('.bar');
  },
  get moveableEl() {
    return this.$('.moveable');
  },
  get screenEl() {
    return this.$('.screen');
  }
}, {}, View);
var $__1 = helpers,
    log = $__1.log,
    assign = $__1.assign,
    wait = $__1.wait,
    nextFrame = $__1.nextFrame;
module.exports = MenuView;


},{"Wildcat.Support.helpers":54,"Wildcat.View.View":57}],5:[function(require,module,exports){
"use strict";
var View = require('Wildcat.View.View');
var helpers = require('Wildcat.Support.helpers');
var ServiceView = function ServiceView(app, template) {
  this.name = 'service';
  $traceurRuntime.superCall(this, $ServiceView.prototype, "constructor", [app]);
  assign(this, {template: template});
};
var $ServiceView = ServiceView;
($traceurRuntime.createClass)(ServiceView, {
  bindEvents: function() {
    var el = (this).el;
    var elOn = el.addEventListener.bind(el);
    elOn('touchstart', this.onTouchstart.bind(this, '.detail-action'));
    elOn('click', this.onClick.bind(this));
  },
  onClick: function(e) {
    var target = this.getDesiredTarget(e.target);
    if (target.matches('.detail-action'))
      this.onClickDetailAction(target);
    if (target.matches('.close-action'))
      this.onClickCloseAction(target);
  },
  getDesiredTarget: function(node) {
    if (node.matches('.detail-action *')) {
      return this.ancestorOf(node, '.detail-action');
    }
    if (node.matches('.close-action *')) {
      return this.ancestorOf(node, '.close-action');
    }
    return node;
  },
  onClickDetailAction: function(target) {
    var typeEl = (this).typeEl;
    var clickedItem = this.ancestorOf(target, '.service-listitem');
    this.$$('.service-listitem').forEach((function(item) {
      if (item !== clickedItem)
        item.classList.add('closed');
    }));
    typeEl.classList.remove('list');
    typeEl.classList.add('detail');
  },
  onClickCloseAction: function(target) {
    var typeEl = (this).typeEl;
    var clickedItem = this.ancestorOf(target, '.service-listitem');
    this.$$('.service-listitem').forEach((function(item) {
      item.classList.remove('closed');
    }));
    typeEl.classList.add('list');
    typeEl.classList.remove('detail');
  },
  get typeEl() {
    return this.$('.type');
  }
}, {}, View);
var $__1 = helpers,
    log = $__1.log,
    assign = $__1.assign;
module.exports = ServiceView;


},{"Wildcat.Support.helpers":54,"Wildcat.View.View":57}],6:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var ViewManager = function ViewManager(app) {
  this.app = app;
};
($traceurRuntime.createClass)(ViewManager, {
  init: function() {
    this.createViews();
    this.removeNotouchOnTouch();
  },
  removeNotouchOnTouch: function() {
    log('removeNotouchOnTouch');
    var document = this.app.window.document;
    var $__2 = document,
        documentElement = $__2.documentElement,
        body = $__2.body;
    var remove = (function() {
      log("remove");
      documentElement.classList.remove('no-touch');
      body.removeEventListener('touchstart', remove);
    });
    body.addEventListener('touchstart', remove);
  },
  createViews: function() {
    var app = (this).app;
    var events = app.events;
    var window = app.window;
    var document = window.document;
    var body = document.body;
    var $__6 = app,
        introView = $__6.introView,
        aboutView = $__6.aboutView,
        menuView = $__6.menuView,
        serviceView = $__6.serviceView;
    var views = [aboutView, serviceView, menuView];
    var html = views.reduce((function(str, view) {
      return str += view.render();
    }), '');
    html = ("<div class=\"statusbar-container\">\n\t\t\t<div class=\"statusbar-faker\">\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"left\">●●●○○ Verizon <span class=\"icon-local-phone\" /></div>\n\t\t\t\t\t<div class=\"middle\">9:09 AM</div>\n\t\t\t\t\t<div class=\"right\">58% ▭</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"wrapper\">\n\t\t\t" + html + "\n\t\t</div>");
    body.insertAdjacentHTML('beforeend', html);
    views.forEach((function(view) {
      return view.bindEvents();
    }));
  }
}, {});
var $__1 = helpers,
    log = $__1.log,
    assign = $__1.assign;
module.exports = ViewManager;


},{"Wildcat.Support.helpers":54}],7:[function(require,module,exports){
"use strict";
var PostReportCommand = function PostReportCommand(name, incident) {
  this.name = name;
  this.incident = incident;
};
($traceurRuntime.createClass)(PostReportCommand, {}, {getName: function() {
    return 'postReportCommand';
  }});
module.exports = PostReportCommand;


},{}],8:[function(require,module,exports){
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


},{"Wildcat.Commander.CommandHandler":28,"Wildcat.Support.helpers":54}],9:[function(require,module,exports){
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


},{"Wildcat.Support.helpers":54}],10:[function(require,module,exports){
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
            log(':: crap 2');
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
            log(":: big error");
            events.emit(commandName, err);
            throw err;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__3, this);
  })}, {}, CommandHandler);
var $__1 = helpers,
    asyncMethods = $__1.asyncMethods,
    log = $__1.log;
asyncMethods(RetrieveBluelightsCommandHandler.prototype, 'handle');
module.exports = RetrieveBluelightsCommandHandler;


},{"Wildcat.Commander.CommandHandler":28,"Wildcat.Support.helpers":54}],11:[function(require,module,exports){
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
            log(":: Bluelight.get 3");
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


},{"../../../framework/src/Wildcat/Commander/Events/EventGenerator":33,"Wildcat.Support.helpers":54}],12:[function(require,module,exports){
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


},{"../../../framework/src/Wildcat/Support/helpers":54,"Wildcat.Support.Collection":52}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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


},{"Wildcat.Commander.Events.EventGenerator":33,"Wildcat.Errors.ValidationError":43,"Wildcat.Support.helpers":54}],16:[function(require,module,exports){
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
var ViewManager = require('../Browser/Views/ViewManager');
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
    registerOthers.call(this);
  }
}, {}, ServiceProvider);
function registerOthers() {
  var app = (this).app;
  app.bindShared('viewManager', (function(app) {
    return new ViewManager(app);
  }));
}
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


},{"../Browser/Views/ViewManager":6,"App.Entities.Bluelights.Bluelight":11,"App.Entities.Bluelights.BluelightCollection":12,"App.Entities.Bluelights.Events.BluelightsDelivered":13,"App.Entities.Reports.Events.ReportWasPosted":14,"App.Entities.Reports.Report":15,"App.Repositories.BluelightRepository":17,"App.Repositories.ReportRepository":18,"Wildcat.Loaders.XHRLoader":49,"Wildcat.Support.ServiceProvider":53,"Wildcat.Support.helpers":54}],17:[function(require,module,exports){
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
            log(":: BluelightRepository.get");
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


},{"../../framework/src/Wildcat/Support/helpers":54}],18:[function(require,module,exports){
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


},{"Wildcat.Errors.AuthenticationError":39,"Wildcat.Errors.ValidationError":43,"Wildcat.Support.helpers":54}],19:[function(require,module,exports){
"use strict";
require('traceur/bin/traceur-runtime');
var App = require('./Application');
module.exports = App;


},{"./Application":1,"traceur/bin/traceur-runtime":71}],20:[function(require,module,exports){
(function (global){
"use strict";
var AppServiceProvider = require('App.Providers.AppServiceProvider');
var LogServiceProvider = require('Wildcat.Log.LogServiceProvider');
var WindowServiceProvider = require('Wildcat.DOM.WindowServiceProvider');
var ErrorProvider = require('Wildcat.Errors.ErrorServiceProvider');
var ViewServiceProvider = require('Wildcat.View.ViewServiceProvider');
var CommanderServiceProvider = require('Wildcat.Commander.CommandServiceProvider');
function getNavigatorProperty(prop) {
  var navigator = global.navigator;
  var parent = Object.getPrototypeOf(navigator);
  try {
    var result = parent[prop];
    if (parent[prop] !== undefined)
      return parent[prop];
    return navigator[prop];
  } catch (err) {
    return navigator[prop];
  }
}
function browser() {
  if (global.navigator) {
    return getNavigatorProperty('userAgent');
  } else {
    return 'not determined';
  }
}
var configObject = {
  apiBaseUrl: 'https://go.dosa.northwestern.edu/nuhelpapi/api/',
  debug: false,
  providers: [AppServiceProvider, WindowServiceProvider, LogServiceProvider, ErrorProvider, ViewServiceProvider, CommanderServiceProvider],
  locale: 'en',
  browser: browser()
};
module.exports = configObject;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"App.Providers.AppServiceProvider":16,"Wildcat.Commander.CommandServiceProvider":29,"Wildcat.DOM.WindowServiceProvider":38,"Wildcat.Errors.ErrorServiceProvider":40,"Wildcat.Log.LogServiceProvider":51,"Wildcat.View.ViewServiceProvider":58}],21:[function(require,module,exports){
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


},{"App.Commands.PostReportCommand":7,"App.Commands.RetrieveBluelightsCommand":9}],22:[function(require,module,exports){
"use strict";
module.exports = {
  'app': require('./app'),
  'local.app': require('./local/app'),
  'testing.app': require('./testing/app'),
  'commands': require('./commands'),
  'handlers': require('./handlers'),
  'views': require('./views')
};


},{"./app":20,"./commands":21,"./handlers":23,"./local/app":24,"./testing/app":25,"./views":26}],23:[function(require,module,exports){
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


},{"App.Commands.PostReportCommandHandler":8,"App.Commands.RetrieveBluelightsCommandHandler":10}],24:[function(require,module,exports){
"use strict";
module.exports = {
  apiBaseUrl: 'https://go.dosa.northwestern.edu/nuhelpapi/api/',
  debug: true
};


},{}],25:[function(require,module,exports){
"use strict";
module.exports = {
  apiBaseUrl: 'http://nuhelp.api/api/',
  browser: 'console'
};


},{}],26:[function(require,module,exports){
"use strict";
var IntroView = require('../app/Browser/Views/IntroView');
var MenuView = require('../app/Browser/Views/MenuView');
var AboutView = require('../app/Browser/Views/AboutView');
var ServiceView = require('../app/Browser/Views/ServiceView');
var menuTemplate = require('../templates/built/menu.hbs');
var aboutTemplate = require('../templates/built/about.hbs');
var serviceTemplate = require('../templates/built/service.hbs');
module.exports = [{
  'abstract': 'introView',
  '$constructor': IntroView,
  'build': 'singleton',
  'args': []
}, {
  'abstract': 'menuView',
  '$constructor': MenuView,
  'build': 'singleton',
  'args': [menuTemplate]
}, {
  'abstract': 'aboutView',
  '$constructor': AboutView,
  'build': 'singleton',
  'args': [aboutTemplate]
}, {
  'abstract': 'serviceView',
  '$constructor': ServiceView,
  'build': 'singleton',
  'args': [serviceTemplate]
}];


},{"../app/Browser/Views/AboutView":2,"../app/Browser/Views/IntroView":3,"../app/Browser/Views/MenuView":4,"../app/Browser/Views/ServiceView":5,"../templates/built/about.hbs":72,"../templates/built/menu.hbs":73,"../templates/built/service.hbs":74}],27:[function(require,module,exports){
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


},{}],28:[function(require,module,exports){
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


},{"Wildcat.Commander.Events.DispatchableTrait":31,"Wildcat.Support.helpers":54}],29:[function(require,module,exports){
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


},{"Wildcat.Commander.CommandBus":27,"Wildcat.Commander.Events.EventDispatcher":32,"Wildcat.Support.ServiceProvider":53,"Wildcat.Support.helpers":54}],30:[function(require,module,exports){
"use strict";
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = function CommanderTrait() {};
($traceurRuntime.createClass)(CommanderTrait, {
  execute: function(command, input) {
    log("::executing from commander trait");
    var bus = this.getCommandBus();
    return bus.execute(command);
  },
  getCommandBus: function() {
    return this.app.make('commandBus');
  }
}, {});
var log = helpers.log;
module.exports = CommanderTrait;


},{"Wildcat.Support.helpers":54}],31:[function(require,module,exports){
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


},{}],32:[function(require,module,exports){
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


},{}],33:[function(require,module,exports){
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


},{}],34:[function(require,module,exports){
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


},{"Wildcat.Support.helpers":54}],35:[function(require,module,exports){
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


},{"Wildcat.Support.state":56}],36:[function(require,module,exports){
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


},{"Wildcat.Support.state":56}],37:[function(require,module,exports){
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
    this.bind(abstract, ($__10 = this).share.apply($__10, $traceurRuntime.spread([abstract, concrete], args)), true);
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
  share: function(abstract, func) {
    for (var args = [],
        $__7 = 2; $__7 < arguments.length; $__7++)
      args[$__7 - 2] = arguments[$__7];
    var _ = state(this);
    var instances = _.instances;
    return function(container) {
      var obj = instances[abstract];
      if (obj)
        return obj;
      obj = func.apply(null, $traceurRuntime.spread([container], args));
      instances[abstract] = obj;
      return obj;
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


},{"Wildcat.Support.helpers":54,"Wildcat.Support.state":56,"events":59}],38:[function(require,module,exports){
(function (global){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var WindowServiceProvider = function WindowServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $WindowServiceProvider.prototype, arguments);
};
var $WindowServiceProvider = WindowServiceProvider;
($traceurRuntime.createClass)(WindowServiceProvider, {
  register: function() {
    this.shimMatches(global);
    this.shimRequestAnimationFrame(global);
    var app = (this).app;
    app.bindShared('window', (function(app) {
      return global;
    }));
  },
  provides: function() {
    return ['window'];
  },
  shimMatches: function(global) {
    var ElementProto = global.Element.prototype;
    if (ElementProto.matches)
      return;
    ElementProto.matches = ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector;
  },
  shimRequestAnimationFrame: function(global) {
    (function(window, rAF, cAF) {
      var lastTime = 0,
          vendors = ['ms', 'moz', 'webkit', 'o'],
          x;
      for (x = 0; x < vendors.length && !window[rAF]; ++x) {
        window[rAF] = window[vendors[x] + 'RequestAnimationFrame'];
        window[cAF] = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        if (window[rAF]) {
          log('shimRequestAnimationFrame using ' + vendors[x] + ' prefix');
        }
      }
      if (!window[rAF]) {
        log('shimRequestAnimationFrame using setTimeout');
        window[rAF] = function(callback) {
          var currTime = new Date().getTime(),
              timeToCall = Math.max(0, 16 - (currTime - lastTime)),
              id = window.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
      if (!window[cAF]) {
        window[cAF] = function(id) {
          window.clearTimeout(id);
        };
      }
    }(global, 'requestAnimationFrame', 'cancelAnimationFrame'));
  }
}, {}, ServiceProvider);
module.exports = WindowServiceProvider;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Support.ServiceProvider":53}],39:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var AuthenticationError = errorConstructor('AuthenticationError', 'no way! authenticated');
module.exports = AuthenticationError;


},{"./errorConstructor":44}],40:[function(require,module,exports){
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


},{"Wildcat.Errors.AuthenticationError":39,"Wildcat.Errors.NetworkError":41,"Wildcat.Errors.TimeoutError":42,"Wildcat.Errors.ValidationError":43,"Wildcat.Support.ServiceProvider":53}],41:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var NetworkError = errorConstructor('NetworkError', 'network problem');
module.exports = NetworkError;


},{"./errorConstructor":44}],42:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var TimeoutError = errorConstructor('TimeoutError', 'timeout error happened');
module.exports = TimeoutError;


},{"./errorConstructor":44}],43:[function(require,module,exports){
"use strict";
var errorConstructor = require('./errorConstructor');
var ValidationError = errorConstructor('ValidationError', 'no way! validated');
module.exports = ValidationError;


},{"./errorConstructor":44}],44:[function(require,module,exports){
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


},{}],45:[function(require,module,exports){
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


},{"Wildcat.Support.helpers":54,"eventemitter2":61}],46:[function(require,module,exports){
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
    log('::app starting!');
    start.call(this);
  },
  run: function() {
    log("#run Foundation Application");
    log('::app running2!');
  },
  register: function(provider) {
    provider.register();
    return provider;
  }
}, {}, Container);
var $__3 = helpers,
    extendProtoOf = $__3.extendProtoOf,
    log = $__3.log;
extendProtoOf(Application, CommanderTrait);
module.exports = Application;


},{"../../../../config/config":22,"../../Wildcat/Commander/CommanderTrait":30,"../../Wildcat/Config/ModuleLoader":35,"../../Wildcat/Config/Repository":36,"../../Wildcat/Container/Container":37,"../../Wildcat/Events/Dispatcher":45,"../../Wildcat/Foundation/ProviderRepository":47,"../../Wildcat/Foundation/start":48,"../../Wildcat/Support/helpers":54}],47:[function(require,module,exports){
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


},{}],48:[function(require,module,exports){
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


},{"Wildcat.Config.Repository":36}],49:[function(require,module,exports){
(function (global){
"use strict";
var TimeoutError = require('Wildcat.Errors.TimeoutError');
var NetworkError = require('Wildcat.Errors.NetworkError');
var helpers = require('Wildcat.Support.helpers');
var XHRLoader = function XHRLoader(XMLHttpRequest) {
  this.Xhr_ = XMLHttpRequest || global.XMLHttpRequest;
};
($traceurRuntime.createClass)(XHRLoader, {
  send: function(method, $__3) {
    var $__5,
        $__6,
        $__7;
    var $__4 = $__3,
        url = $__4.url,
        timeout = ($__5 = $__4.timeout) === void 0 ? 5000 : $__5,
        headers = ($__6 = $__4.headers) === void 0 ? {} : $__6,
        responseType = ($__7 = $__4.responseType) === void 0 ? 'json' : $__7;
    var $__0 = this;
    log(":: xhrloader.send");
    var xhr = new this.Xhr_();
    var promise = new Promise((function(resolve, reject) {
      xhr.open(method, url);
      log(":: xhrloader.send-promise");
      if (responseType === 'json') {
        xhr.setRequestHeader('Accept', 'application/json');
        $__0.responseType = responseType;
      }
      entries(headers).forEach((function(entry) {
        var $__8;
        return ($__8 = xhr).setRequestHeader.apply($__8, $traceurRuntime.spread(entry));
      }));
      log(":: xhrloader.xhr-before-eassign");
      assign(xhr, {
        resolve: resolve,
        reject: reject,
        timeout: timeout,
        onload: onload.bind($__0),
        ontimeout: ontimeout.bind($__0),
        onerror: onerror.bind($__0)
      });
      xhr.send();
    }));
    promise.cancel = xhr.abort.bind(xhr);
    return promise;
  },
  get: function() {
    var $__8;
    for (var args = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      args[$__2] = arguments[$__2];
    log(":: xhrloader.get");
    return ($__8 = this).send.apply($__8, $traceurRuntime.spread(['GET'], args));
  }
}, {});
function onload($__3) {
  var xhr = $__3.target;
  var $__5 = xhr,
      response = $__5.response,
      status = $__5.status,
      statusText = $__5.statusText,
      resolve = $__5.resolve;
  var wantsJson = (xhr.responseType === 'json') || (this.responseType === 'json');
  if (isString(response) && wantsJson)
    response = JSON.parse(response);
  resolve(response);
}
function ontimeout($__3) {
  var reject = $__3.target.reject;
  var timeoutError = new TimeoutError();
  reject(timeoutError);
}
function onerror($__3) {
  var xhr = $__3.target;
  var $__5 = xhr,
      response = $__5.response,
      status = $__5.status,
      reject = $__5.reject;
  var networkError = new NetworkError();
  reject(networkError);
}
var $__3 = helpers,
    log = $__3.log,
    error = $__3.error,
    isString = $__3.isString,
    assign = $__3.assign,
    entries = $__3.entries;
module.exports = XHRLoader;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Errors.NetworkError":41,"Wildcat.Errors.TimeoutError":42,"Wildcat.Support.helpers":54}],50:[function(require,module,exports){
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
},{"Wildcat.Support.state":56}],51:[function(require,module,exports){
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


},{"Wildcat.Log.ConsoleLogger":50,"Wildcat.Support.ServiceProvider":53}],52:[function(require,module,exports){
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


},{"./helpers":54}],53:[function(require,module,exports){
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


},{"Wildcat.Support.state":56}],54:[function(require,module,exports){
(function (global){
"use strict";
var $console = global.console;
var setTimeout = global.setTimeout;
var clearTimeout = global.clearTimeout;
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
  var $__13;
  for (var args = [],
      $__6 = 0; $__6 < arguments.length; $__6++)
    args[$__6] = arguments[$__6];
  var document = global.document;
  if ((typeof args[0] === 'string') && (args[0].startsWith('::')) && (document)) {
    var body = document.body;
    var outputEl = document.querySelector('output.log');
    if (!outputEl) {
      body.insertAdjacentHTML('afterbegin', '<output class=log />');
      outputEl = document.querySelector('output.log');
    }
    outputEl.insertAdjacentHTML('beforeend', ("<p>" + args[0] + "</p>"));
  } else {
    ($__13 = $console).log.apply($__13, $traceurRuntime.spread(args));
  }
}
function dir() {
  var $__13;
  for (var args = [],
      $__7 = 0; $__7 < arguments.length; $__7++)
    args[$__7] = arguments[$__7];
  ($__13 = $console).dir.apply($__13, $traceurRuntime.spread(args));
}
function error() {
  var $__13;
  for (var args = [],
      $__8 = 0; $__8 < arguments.length; $__8++)
    args[$__8] = arguments[$__8];
  ($__13 = $console).error.apply($__13, $traceurRuntime.spread(args));
}
function warn() {
  var $__13;
  for (var args = [],
      $__9 = 0; $__9 < arguments.length; $__9++)
    args[$__9] = arguments[$__9];
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
  setTimeout((function() {
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
function nextFrame() {
  return new Promise((function(resolve) {
    global.requestAnimationFrame(resolve);
  }));
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],55:[function(require,module,exports){
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
},{"observe-js":70}],56:[function(require,module,exports){
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
},{"Wildcat.Support.helpers":54,"Wildcat.Support.observe":55}],57:[function(require,module,exports){
(function (global){
"use strict";
var state = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = require('Wildcat.Commander.CommanderTrait');
var EventListener = require('Wildcat.Commander.Events.EventListener');
var EventEmitter = require('events').EventEmitter;
var $__11 = observe,
    PathObserver = $__11.PathObserver,
    Platform = $__11.Platform;
var View = function View(app) {
  EventListener.call(this);
  this.app = app;
  state(this, {}, {
    changed: changed,
    added: added
  });
};
($traceurRuntime.createClass)(View, {
  bindEvents: function() {
    var opts = arguments[0] !== (void 0) ? arguments[0] : 'standard';
    if (opts === 'standard') {
      var el = (this).el;
      var elOn = el.addEventListener.bind(el);
      var insOn = this.on.bind(this);
      elOn('touchstart', this.onTouchstart.bind(this, '[data-click]'));
      elOn('touchmove', this.onTouchmove.bind(this));
      elOn('touchend', this.onTouchend.bind(this));
      elOn('click', this.onClick.bind(this));
      insOn('highlightstart', this.onHighlightstart.bind(this));
      insOn('highlightend', this.onHighlightend.bind(this));
    }
  },
  getDesiredTarget: function(node) {
    if (node.matches('[data-click] *')) {
      return this.ancestorOf(node, '[data-click]');
    }
    return node;
  },
  onClick: function(e) {
    if (this.clickedOnTouch(e))
      return;
    var target = this.getDesiredTarget(e.target);
    var method = target.dataset.click;
    if (isDefined(method)) {
      method = 'onClick' + ucfirst(method);
      if (this[method]) {
        this[method](target);
      } else {
        throw new Error((method + " does not exist"));
      }
    }
  },
  onTouchstart: function(selectors, e) {
    var ins = this,
        window = ins.app.window,
        target = ins.getDesiredTarget(e.target),
        targetIsScrollable = target.classList.contains('scroll'),
        emitHighlight = ins.emit.bind(ins, 'highlightstart', {target: target}),
        delay = 50,
        emitHighlightAfterDelay = setTimeout.bind(window, emitHighlight, delay);
    if (target.matches(selectors)) {
      ins.touchstartEl = target;
      ins.touchstartY = e.targetTouches[0].clientY;
      if (targetIsScrollable) {
        ins.emitHighlightTimeout = emitHighlightAfterDelay();
      } else {
        emitHighlight();
      }
    }
  },
  onTouchmove: function(e) {
    if (!this.touchstartEl)
      return;
    e.preventDefault();
    var ins = this,
        touchstartEl = ins.touchstartEl,
        touch = e.targetTouches[0],
        touchstartY = ins.touchstartY,
        newY = touch.clientY,
        differenceInY = (newY !== this.touchY),
        touchTarget = ins.getDesiredTarget(touch.target),
        targetIsScrollable = touchTarget.classList.contains('scroll');
    if (touchTarget === touchstartEl) {
      if (targetIsScrollable) {
        if (differenceInY) {
          this.clearTouchstart();
        }
      } else {
        return this.onToucharound(touchstartEl, e);
      }
    }
  },
  onToucharound: function(touchstartEl, e) {
    var ins = this,
        touch = e.targetTouches[0],
        exceeds = ins.exceedsElement(touch, touchstartEl);
    if (exceeds) {
      ins.emit('highlightend', {target: touchstartEl});
    } else {
      ins.emit('highlightstart', {target: touchstartEl});
    }
  },
  onTouchend: function(e) {
    if (!this.touchstartEl)
      return;
    var ins = this,
        touch = e.changedTouches[0],
        touchTarget = ins.getDesiredTarget(touch.target),
        touchstartEl = ins.touchstartEl,
        exceeds = ins.exceedsElement(touch, touchstartEl);
    this.clearTouchstart(ins);
    if ((touchTarget === touchstartEl) && (!exceeds)) {
      log("touchend going to click");
      ins.onClick(e);
    }
  },
  clearTouchstart: function() {
    var ins = this,
        touchstartEl = ins.touchstartEl,
        emitHighlightTimeout = ins.emitHighlightTimeout;
    if (emitHighlightTimeout)
      clearTimeout(emitHighlightTimeout);
    if (touchstartEl)
      ins.emit('highlightend', {target: touchstartEl});
    delete ins.touchstartEl;
    delete ins.touchstartY;
  },
  exceedsElement: function(touch, el) {
    var padding = 20,
        elBox = el.getBoundingClientRect(),
        touchX = touch.clientX,
        touchY = touch.clientY,
        tooLeft = (touchX - (elBox.left - padding)) < 0,
        tooRight = (touchX - (elBox.right + padding)) > 0,
        tooAbove = (touchY - (elBox.top - padding)) < 0,
        tooBelow = (touchY - (elBox.bottom + padding)) > 0;
    return (tooLeft || tooRight || tooAbove || tooBelow);
  },
  onHighlightstart: function(e) {
    e.target.classList.add('active');
  },
  onHighlightend: function(e) {
    e.target.classList.remove('active');
  },
  clickedOnTouch: function(e) {
    var isClick = (e.type === 'click');
    var touchable = (this).touchable;
    return (isClick && touchable);
  },
  get touchable() {
    var documentElement = this.app.window.document.documentElement;
    return (!documentElement.classList.contains('no-touch'));
  },
  ancestorOf: function(el, selector) {
    var document = global.document;
    while (!el.matches(selector)) {
      el = el.parentNode;
      if (el === document)
        return null;
    }
    return el;
  },
  setEl: function(element) {
    var quiet = arguments[1] !== (void 0) ? arguments[1] : false;
    return state(this, 'el', element, quiet);
  },
  get el() {
    var _ = state(this);
    if (!_.el) {
      if (!this.name)
        throw Error("this.name not defined on view");
      var className = ("." + this.name + "-view");
      var document = this.app.window.document;
      var el = document.querySelector(className);
      if (!el)
        throw Error((className + " not found"));
      _.el = el;
    }
    return _.el;
  },
  set el(value) {
    this.setEl(value);
  },
  render: function() {
    var template = this.getTemplate();
    return template();
  },
  getTemplate: function() {
    return this.template;
  },
  $: function() {
    var $__13;
    for (var args = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      args[$__3] = arguments[$__3];
    return ($__13 = this.el).querySelector.apply($__13, $traceurRuntime.spread(args));
  },
  $$: function() {
    var $__13;
    for (var args = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      args[$__4] = arguments[$__4];
    return Array.from(($__13 = this.el).querySelectorAll.apply($__13, $traceurRuntime.spread(args)));
  },
  toggle: function() {
    var $__13;
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    return ($__13 = this.el.classList).toggle.apply($__13, $traceurRuntime.spread(args));
  },
  remove: function() {
    var $__13;
    for (var args = [],
        $__6 = 0; $__6 < arguments.length; $__6++)
      args[$__6] = arguments[$__6];
    return ($__13 = this.el.classList).remove.apply($__13, $traceurRuntime.spread(args));
  },
  contains: function() {
    var $__13;
    for (var args = [],
        $__7 = 0; $__7 < arguments.length; $__7++)
      args[$__7] = arguments[$__7];
    return ($__13 = this.el.classList).contains.apply($__13, $traceurRuntime.spread(args));
  },
  add: function() {
    var $__13;
    for (var args = [],
        $__8 = 0; $__8 < arguments.length; $__8++)
      args[$__8] = arguments[$__8];
    return ($__13 = this.el.classList).add.apply($__13, $traceurRuntime.spread(args));
  },
  elOn: function() {
    var $__13;
    for (var args = [],
        $__9 = 0; $__9 < arguments.length; $__9++)
      args[$__9] = arguments[$__9];
    return ($__13 = this.el).addEventListener.apply($__13, $traceurRuntime.spread(args));
  },
  elOff: function() {
    var $__13;
    for (var args = [],
        $__10 = 0; $__10 < arguments.length; $__10++)
      args[$__10] = arguments[$__10];
    return ($__13 = this.el).removeEventListener.apply($__13, $traceurRuntime.spread(args));
  }
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
var $__12 = helpers,
    log = $__12.log,
    extendProtoOf = $__12.extendProtoOf,
    setTimeout = $__12.setTimeout,
    clearTimeout = $__12.clearTimeout,
    isDefined = $__12.isDefined,
    ucfirst = $__12.ucfirst;
extendProtoOf(View, EventEmitter);
extendProtoOf(View, CommanderTrait);
module.exports = View;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"Wildcat.Commander.CommanderTrait":30,"Wildcat.Commander.Events.EventListener":34,"Wildcat.Support.helpers":54,"Wildcat.Support.observe":55,"Wildcat.Support.state":56,"events":59}],58:[function(require,module,exports){
"use strict";
var ServiceProvider = require('Wildcat.Support.ServiceProvider');
var View = require('Wildcat.View.View');
var helpers = require('../Support/helpers');
var ViewServiceProvider = function ViewServiceProvider() {
  $traceurRuntime.defaultSuperCall(this, $ViewServiceProvider.prototype, arguments);
};
var $ViewServiceProvider = ViewServiceProvider;
($traceurRuntime.createClass)(ViewServiceProvider, {register: function() {
    var app = (this).app;
    var views = app.config.get('views');
    views.forEach((function(view) {
      var $__2 = view,
          abstract = $__2.abstract,
          $constructor = $__2.$constructor,
          build = $__2.build,
          args = $__2.args;
      switch (build) {
        case 'singleton':
          app.bindShared(abstract, (function(app) {
            return new (Function.prototype.bind.apply($constructor, $traceurRuntime.spread([null, app], args)))();
          }));
          break;
      }
    }));
  }}, {}, ServiceProvider);
var log = helpers.log;
module.exports = ViewServiceProvider;


},{"../Support/helpers":54,"Wildcat.Support.ServiceProvider":53,"Wildcat.View.View":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":63,"./handlebars/exception":64,"./handlebars/runtime":65,"./handlebars/safe-string":66,"./handlebars/utils":67}],63:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":64,"./utils":67}],64:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],65:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":63,"./exception":64,"./utils":67}],66:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],67:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":66}],68:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":62}],69:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":68}],70:[function(require,module,exports){
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
},{}],71:[function(require,module,exports){
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
},{"_process":60}],72:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"about-view\">\n	<h1>About US!!!</h1>\n</div>\n";
  });

},{"hbsfy/runtime":69}],73:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"menu-view show\">\n	<div class=\"screen\"><button data-click=\"screen\"></button></div>\n	<div class=\"moveable show transition\">\n		<div class=\"bar\">\n			<div class=\"message\"><span>Some important message</span></div>\n			<div class=\"menu-btn\"><button data-click=\"toggle\"><i>menu</i><b aria-hidden=\"true\">&#8801;</b></button></div>\n		</div>\n\n		<div class=\"menu\">\n			<div class=\"two-row\">\n				<div class=\"row\">\n					<div class=\"bluelights\"><button data-click=\"item\"><b>Bluelights</b></button></div>\n					<div class=\"call\"><button data-click=\"item\"><b>Call</b></button></div>\n					<div class=\"report\"><button data-click=\"item\"><b>Report</b></button></div>\n				</div>\n				<div class=\"row\">\n					<div class=\"about\"><button data-click=\"item\"><b>About</b></button></div>\n					<div class=\"services\"><button data-click=\"item\"><b>Services</b></button></div>\n					<div class=\"profile\"><button data-click=\"item\"><b>Profile</b></button></div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
  });

},{"hbsfy/runtime":69}],74:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"service-view\">\n    <div class=\"statusbar-buffer\"></div>\n    <div class=\"list-container\">\n        <div class=\"type list\">\n            <div class=\"list-scrollable\">\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/field-landscape-meadow-3170-824x550.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Evanston Health Service</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action phone-action\"><i class=\" icon-call\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                    <div class=\"details-actions\">\n                        <div class=\"action close-action\"><i class=\"icon-close\"></i></div>\n                    </div>\n                    <div class=\"details\">\n                        <div class=\"title-section\">\n                            <img class=\"service-image\" src=\"css/imgs/random-images/field-landscape-meadow-3170-824x550.jpg\" alt=\"\">\n                            <div class=\"service-name\">Evanston Health Service</div>\n                        </div>\n                        <div class=\"info-section\">\n                            <div class=\"service-description\">If you are experiencing a medical emergency, <a href=\"sms:1-408-555-1212\">New SMS Message</a>including those due to excessive alcohol consumption, call 911 to summon paramedics or go to the nearest hospital emergency room.</div>\n\n                            <div class=\"action-section phone-section\">\n                                <div class=\"info service-phone\">234-234-2342</div>\n                                <div class=\"action phone-action\"><i class=\"icon-call\"></i></div>\n                            </div>\n                            <div class=\"action-section email-section\">\n                                <div class=\"info service-email\">hao@northwestern.edu</div>\n                                <div class=\"action email-action\"><i class=\"icon-mail\"></i></div>\n                            </div>\n                            <div class=\"action-section website-section\">\n                                <div class=\"info service-website\">northwestern.edu</div>\n                                <div class=\"action website-action\"><i class=\"icon-publ\"></i></div>\n                            </div>\n                            <div class=\"location-section\">\n                                <div class=\"address\">330 University Place, Evanston IL, 60208</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/bar-feet-legs.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Safe Ride</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action mail-action\"><i class=\" icon-mail\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                </div>\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/evening-lake-people-1402.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Counseling and Psychological Services</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action phone-action\"><i class=\" icon-call\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                </div>\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/field-landscape-meadow-3170-824x550.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Evanston Health Service</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action phone-action\"><i class=\" icon-call\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                    <div class=\"details-actions\">\n                        <div class=\"action close-action\"><i class=\"icon-close\"></i></div>\n                    </div>\n                    <div class=\"details\">\n                        <div class=\"title-section\">\n                            <img class=\"service-image\" src=\"css/imgs/random-images/field-landscape-meadow-3170-824x550.jpg\" alt=\"\">\n                            <div class=\"service-name\">Evanston Health Service</div>\n                        </div>\n                        <div class=\"info-section\">\n                            <div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads adsf asdf asd fdsfrwg fgh fgh e fsdf wsdf wfa df asdf asdf asdfa sdfadsfa sdf</div>\n\n                            <div class=\"action-section phone-section\">\n                                <div class=\"info service-phone\">234-234-2342</div>\n                                <div class=\"action phone-action\"><i class=\"icon-call\"></i></div>\n                            </div>\n                            <div class=\"action-section email-section\">\n                                <div class=\"info service-email\">hao@northwestern.edu</div>\n                                <div class=\"action email-action\"><i class=\"icon-mail\"></i></div>\n                            </div>\n                            <div class=\"action-section website-section\">\n                                <div class=\"info service-website\">northwestern.edu/health-evanston</div>\n                                <div class=\"action website-action\"><i class=\"icon-publ\"></i></div>\n                            </div>\n                            <div class=\"location-section\">\n                                <div class=\"address\">330 University Place, Evanston IL, 60208</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/bar-feet-legs.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Safe Ride</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action mail-action\"><i class=\" icon-mail\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                </div>\n                <div class=\"service-listitem\">\n                    <div class=\"overview\">\n                        <img class=\"service-image\" src=\"css/imgs/random-images/evening-lake-people-1402.jpg\" alt=\"\">\n                        <div class=\"service-info\">\n                            <div class=\"service-name\">Counseling and Psychological Services</div>\n                            <!--<div class=\"service-description\">asdf asd asdfds fasdf asdf asdf asd fasd fasd fasd asdf asd asdf asdf asd fa sf asdf asdf asdf asdf asd fads ...</div>-->\n                        </div>\n                    </div>\n                    <div class=\"overview-actions\">\n                        <div class=\"action phone-action\"><i class=\" icon-call\"></i></div>\n                        <div class=\"action detail-action\"><i class=\"icon-more-horiz\"></i></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"menu-buffer\"></div>\n</div>\n\n";
  });

},{"hbsfy/runtime":69}]},{},[19])(19)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQXBwbGljYXRpb24uanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9BYm91dFZpZXcuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9JbnRyb1ZpZXcuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9NZW51Vmlldy5qcyIsImFwcC9Ccm93c2VyL1ZpZXdzL1NlcnZpY2VWaWV3LmpzIiwiYXBwL0Jyb3dzZXIvVmlld3MvVmlld01hbmFnZXIuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLmpzIiwiYXBwL0NvbW1hbmRzL1JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHQuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHRDb2xsZWN0aW9uLmpzIiwiYXBwL0VudGl0aWVzL0JsdWVsaWdodHMvRXZlbnRzL0JsdWVsaWdodHNEZWxpdmVyZWQuanMiLCJhcHAvRW50aXRpZXMvUmVwb3J0cy9FdmVudHMvUmVwb3J0V2FzUG9zdGVkLmpzIiwiYXBwL0VudGl0aWVzL1JlcG9ydHMvUmVwb3J0LmpzIiwiYXBwL1Byb3ZpZGVycy9BcHBTZXJ2aWNlUHJvdmlkZXIuanMiLCJhcHAvUmVwb3NpdG9yaWVzL0JsdWVsaWdodFJlcG9zaXRvcnkuanMiLCJhcHAvUmVwb3NpdG9yaWVzL1JlcG9ydFJlcG9zaXRvcnkuanMiLCJhcHAvbWFpbi5qcyIsImNvbmZpZy9hcHAuanMiLCJjb25maWcvY29tbWFuZHMuanMiLCJjb25maWcvY29uZmlnLmpzIiwiY29uZmlnL2hhbmRsZXJzLmpzIiwiY29uZmlnL2xvY2FsL2FwcC5qcyIsImNvbmZpZy90ZXN0aW5nL2FwcC5qcyIsImNvbmZpZy92aWV3cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEJ1cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEhhbmRsZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRlclRyYWl0LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRGlzcGF0Y2hhYmxlVHJhaXQuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudEdlbmVyYXRvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50TGlzdGVuZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29uZmlnL01vZHVsZUxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db25maWcvUmVwb3NpdG9yeS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db250YWluZXIvQ29udGFpbmVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0RPTS9XaW5kb3dTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0F1dGhlbnRpY2F0aW9uRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0Vycm9yU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9OZXR3b3JrRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL1RpbWVvdXRFcnJvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9FcnJvcnMvVmFsaWRhdGlvbkVycm9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9lcnJvckNvbnN0cnVjdG9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0V2ZW50cy9EaXNwYXRjaGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0ZvdW5kYXRpb24vQXBwbGljYXRpb24uanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9Qcm92aWRlclJlcG9zaXRvcnkuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9zdGFydC5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2FkZXJzL1hIUkxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvQ29uc29sZUxvZ2dlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvTG9nU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvQ29sbGVjdGlvbi5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9vYnNlcnZlLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvc3RhdGUuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvVmlldy9WaWV3LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1ZpZXcvVmlld1NlcnZpY2VQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIyL2xpYi9ldmVudGVtaXR0ZXIyLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGJzZnkvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9vYnNlcnZlLWpzL3NyYy9vYnNlcnZlLmpzIiwibm9kZV9tb2R1bGVzL3RyYWNldXIvYmluL3RyYWNldXItcnVudGltZS5qcyIsInRlbXBsYXRlcy9idWlsdC9hYm91dC5oYnMiLCJ0ZW1wbGF0ZXMvYnVpbHQvbWVudS5oYnMiLCJ0ZW1wbGF0ZXMvYnVpbHQvc2VydmljZS5oYnMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNFQTtBQUFBLEFBQUksRUFBQSxDQUFBLGVBQWMsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGlEQUFnRCxDQUFDLENBQUM7QUFDaEYsQUFBSSxFQUFBLENBQUEsT0FBTSxFQUFZLENBQUEsT0FBTSxBQUFDLENBQUMsMENBQXlDLENBQUMsQ0FBQztBQUV6RSxFQUFLLElBQUUsRUFBSyxRQUFNLEtBQUM7Z0JBRW5CLFNBQU0sWUFBVTs7QUE0RGhCOzs7QUExREMsTUFBSSxDQUFKLFVBQUssQUFBQyxDQUFFO0FBQ0osTUFBRSxBQUFDLENBQUMsb0RBQW1ELENBQUMsQ0FBQztBQUV6RCxPQUFJ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5cURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcjRFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBBcHBsaWNhdGlvbi5qc1xuXG52YXIgQmFzZUFwcGxpY2F0aW9uID0gcmVxdWlyZSgnLi4vZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0ZvdW5kYXRpb24vQXBwbGljYXRpb24nKTtcbnZhciBoZWxwZXJzICAgICAgICAgPSByZXF1aXJlKCcuLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG5cbnZhciB7bG9nfSA9IGhlbHBlcnM7XG5cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQmFzZUFwcGxpY2F0aW9uIHtcblxuXHRzdGFydCgpIHtcblx0ICAgIGxvZygnOjojc3RhcnQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBCYXNlQXBwbGljYXRpb24nKTtcblxuXHQgICAgaWYgKHRoaXMuaXNMb2NhbCgpKSB7XG5cdCAgICAgICAgbG9nKGA6OmkgYW0gbG9jYWwhIWApO1xuXHQgICAgICAgIHRoaXMub24oJ2JpbmQnLCBsb2cpO1xuXHQgICAgfVxuXG5cdCAgICBzdXBlcigpO1xuXHR9XG5cblx0cnVuKCkge1xuXHRcdGxvZygnOjojcnVuIGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQmFzZUFwcGxpY2F0aW9uJyk7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuZGVidWdPbkdsb2JhbCgpO1xuXHRcdHRoaXMucHJvY2VlZCgpO1xuXHR9XG5cblx0cHJvY2VlZCgpIHtcblxuXHRcdHZhciB7dmlld01hbmFnZXJ9ID0gdGhpcztcblx0XHR2aWV3TWFuYWdlci5pbml0KCk7XG5cblxuXG5cdFx0Ly8gbG9nKGA6OiBwcm9jZWVkYCk7XG5cdFx0Ly8gZXZlbnRzLm9uKCdhcHAuKicsIGludHJvVmlldy5oYW5kbGUuYmluZChpbnRyb1ZpZXcpKTtcblx0XHQvLyBpbnRyb1ZpZXcuZ2V0Qmx1ZWxpZ2h0cygpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0Ly8gICAgIGxvZygnOjpnb3QgYmx1ZWxpZ2h0cycpO1xuXHRcdC8vIH0pO1xuXHRcdFxuXHR9XG5cblx0ZGVidWdPbkdsb2JhbCgpIHtcblx0XHRsb2coYGRlYnVnT25HbG9iYWxgKTtcblxuXHRcdHZhciBhcHAgPSB0aGlzO1xuXG5cdFx0aWYgKGFwcC5pc0xvY2FsKCkpIHtcblxuXHRcdCAgICBsb2coYD09PSBORVcgYXBwLmVudmlyb25tZW50KCkgaXMgJHthcHAuZW52aXJvbm1lbnQoKX1gKTtcblxuXHRcdCAgICAvLyBhZGQgYWxsIElPQyBiaW5kaW5ncyB0byB3aW5kb3dcblx0XHQgICAgZm9yICh2YXIga2V5IG9mIGFwcCkge1xuXHRcdCAgICAgICAgaWYgKCAhIGdsb2JhbFtrZXldICkgZ2xvYmFsW2tleV0gPSBhcHBba2V5XTtcblx0XHQgICAgfVxuXG5cdFx0ICAgIC8vIGFkZCBhbGwgaGVscGVyIGZ1bmN0aW9ucyB0byBnbG9iYWxcblx0XHQgICAgZ2xvYmFsLmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdCAgICBmb3IgKHZhciBrZXkgaW4gaGVscGVycykge1xuXHRcdCAgICAgICAgLy8gbG9nKGBhZGRpbmcgaGVscGVycy4ke2tleX0gdG8gZ2xvYmFsYCk7XG5cdFx0ICAgICAgICBpZiAoICEgZ2xvYmFsW2tleV0gKSBnbG9iYWxba2V5XSA9IGhlbHBlcnNba2V5XTtcblx0XHQgICAgfVxuXHRcdH1cblx0XHRyZXR1cm4gYXBwO1xuXHR9XG5cbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IiwidmFyIFZpZXcgICAgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlldycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBBYm91dFZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihhcHAsIHRlbXBsYXRlKSB7XG5cblx0XHR0aGlzLm5hbWUgPSAnYWJvdXQnO1xuXHQgICAgc3VwZXIoYXBwKTtcblx0ICAgIGFzc2lnbih0aGlzLCB7dGVtcGxhdGUsIG5hbWU6ICdhYm91dCd9KTtcblx0fVxufVxuXG52YXIge2xvZywgYXNzaWdufSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRWaWV3OyIsInZhciBWaWV3ID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXcnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgSW50cm9WaWV3IGV4dGVuZHMgVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHAsIC4uLmFyZ3MpIHtcblxuICAgICAgICB0aGlzLm5hbWUgPSAnaW50cm8nO1xuICAgICAgICBcbiAgICAgICAgc3VwZXIoYXBwKTtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIge2V2ZW50c30gPSBhcHA7XG5cbiAgICAgICAgZXZlbnRzLm9uKCdyZXBvcnRXYXNQb3N0ZWQnLCBlID0+IGxvZyhlLnR5cGUsIGUpKTsgXG4gICAgfVxuICAgIHBvc3RSZXBvcnQobmFtZSwgaW5jaWRlbnQpIHtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIgY29tbWFuZCA9IGFwcC5tYWtlKCdwb3N0UmVwb3J0Q29tbWFuZCcsIFtuYW1lLCBpbmNpZGVudF0pOyAgICAgXG4gICAgICAgIHRoaXMuZXhlY3V0ZShjb21tYW5kKTsgXG4gICAgfVxuICAgIGdldEJsdWVsaWdodHMoKSB7XG5cbiAgICAgICAgbG9nKGA6OmludHJvVmlldyNnZXRCbHVlbGlnaHRzYCk7XG4gICAgICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgICAgIHZhciBjb21tYW5kID0gYXBwLm1ha2UoJ3JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKGNvbW1hbmQpXG4gICAgICAgICAgICAudGhlbihjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBsb2coYDo6Z290IGl0IGZyb20gdGhlbmFibGUgYCwgY29sbGVjdGlvbilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvcignOjpnb3QgaXQgZnJvbSBjYXRjaGFibGUnLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb25CbHVlbGlnaHRzRGVsaXZlcmVkKHt2YWx1ZTogY29sbGVjdGlvbn0pIHtcblxuICAgICAgICBsb2coYHdoZW5CbHVlbGlnaHRzRGVsaXZlcmVkYCk7XG4gICAgfVxuICAgIG9uRmFpbFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQoZXJyKSB7XG5cbiAgICAgICAgZXJyb3IoYG9uRmFpbFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRgLCBlcnIpO1xuICAgIH1cbn1cblxudmFyIHtsb2csIGVycm9yfSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50cm9WaWV3OyIsInZhciBWaWV3ICAgID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXcnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgTWVudVZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuXHRjb25zdHJ1Y3RvcihhcHAsIHRlbXBsYXRlKSB7XG5cblx0XHR0aGlzLm5hbWUgPSAnbWVudSc7XG5cdCAgICBzdXBlcihhcHApO1xuXHQgICAgYXNzaWduKHRoaXMsIHt0ZW1wbGF0ZX0pO1xuXHR9XG5cdGJpbmRFdmVudHMoKSB7XG5cblx0XHRzdXBlci5iaW5kRXZlbnRzKCk7XG5cblx0XHR2YXIge2RvY3VtZW50fSA9IHRoaXMuYXBwLndpbmRvdztcblx0XHR2YXIge2JvZHl9ID0gZG9jdW1lbnQ7XG5cblx0XHQvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZSA9PiB7XG5cdFx0Ly8gXHRsb2coJ2JvZHkgc2Nyb2xsJyk7XG5cdFx0Ly8gXHR2YXIge3RhcmdldH0gPSBlO1xuXHRcdC8vIFx0aWYgKHRoaXMuYW5jZXN0b3JPZih0YXJnZXQsICcubWVudS12aWV3JykpIHtcblx0XHQvLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH0pO1xuXG5cdFx0Ly8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZSA9PiB7XG5cdFx0XHRcblx0XHQvLyBcdGJvZHkuc2Nyb2xsVG9wID0gMDtcblx0XHQvLyBcdHZhciB7dGFyZ2V0fSA9IGU7XG5cdFx0Ly8gXHRpZiAodGhpcy5hbmNlc3Rvck9mKHRhcmdldCwgJy5tZW51LXZpZXcnKSkge1xuXHRcdC8vIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSk7XG5cdH1cblx0dG9nZ2xlTWVudSgpIHtcblxuXHRcdHZhciB7bW92ZWFibGVFbCwgc2NyZWVuRWx9ID0gdGhpcztcblx0XHR2YXIgbW92ZWFibGVFbENMID0gbW92ZWFibGVFbC5jbGFzc0xpc3Q7XG5cdFx0dmFyIHNjcmVlbkVsQ0wgICA9IHNjcmVlbkVsLmNsYXNzTGlzdDtcblxuXHRcdHZhciBpc1Nob3dpbmcgPSBtb3ZlYWJsZUVsQ0wuY29udGFpbnMoJ3Nob3cnKTtcblxuXHRcdGlmIChpc1Nob3dpbmcpIHtcblx0XHRcdHRoaXMucmVtb3ZlKCdzaG93Jyk7XG5cdFx0XHRtb3ZlYWJsZUVsQ0wuYWRkKCd0cmFuc2l0aW9uJyk7XG5cdFx0XHR3YWl0KDQwKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0bW92ZWFibGVFbENMLnJlbW92ZSgnc2hvdycpO1xuXHRcdFx0XHRcdHdhaXQoMzAwKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdG1vdmVhYmxlRWxDTC5yZW1vdmUoJ3RyYW5zaXRpb24nKTtcdFxuXHRcdFx0XHRcdFx0bW92ZWFibGVFbENMLmFkZCgnZG9uZScpO1xuXHRcdFx0XHRcdFx0c2NyZWVuRWxDTC5hZGQoJ2hpZGUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5hZGQoJ3Nob3cnKTtcblx0XHRcdHNjcmVlbkVsQ0wucmVtb3ZlKCdoaWRlJyk7XG5cdFx0XHRtb3ZlYWJsZUVsQ0wucmVtb3ZlKCdkb25lJyk7XG5cdFx0XHR3YWl0KDEwKVxuXHRcdFx0XHQudGhlbigoKSA9PiBtb3ZlYWJsZUVsQ0wuYWRkKCd0cmFuc2l0aW9uJykpXG5cdFx0XHRcdC50aGVuKCgpID0+IHdhaXQoMjApKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0bW92ZWFibGVFbENMLmFkZCgnc2hvdycpO1xuXHRcdFx0XHRcdHdhaXQoMzAwKS50aGVuKCgpID0+IG1vdmVhYmxlRWxDTC5yZW1vdmUoJ3RyYW5zaXRpb24nKSk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cdFxuXHR9XG5cdG9uQ2xpY2tUb2dnbGUodGFyZ2V0KSB7XG5cblx0XHR0aGlzLnRvZ2dsZU1lbnUoKTtcblx0fVxuXHRvbkNsaWNrU2NyZWVuKCkge1xuXHRcdFxuXHRcdHRoaXMudG9nZ2xlTWVudSgpO1xuXHR9XG5cdG9uQ2xpY2tJdGVtKHRhcmdldCkge1xuXG5cdFx0Ly8gbG9nKGBvbkNsaWNrTWVudUJ1dHRvbmAsIHRhcmdldCk7XG5cdFx0bG9nKHRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSk7XG5cdH1cblx0b25IaWdobGlnaHRzdGFydChlKSB7XG5cblx0XHR2YXIge3RhcmdldH0gPSBlO1xuXG5cdFx0aWYgKHRhcmdldC5tYXRjaGVzKCcubWVudSBidXR0b24nKSkge1xuXHRcdFx0dGhpcy5hbmNlc3Rvck9mKHRhcmdldCwgJ2RpdicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdXBlci5vbkhpZ2hsaWdodHN0YXJ0KGUpO1xuXHRcdH1cblx0fVxuXHRvbkhpZ2hsaWdodGVuZChlKSB7XG5cdFx0Ly8gZGVidWdnZXI7XG5cdCAgICB2YXIge3RhcmdldH0gPSBlO1xuXG5cdCAgICBpZiAodGFyZ2V0Lm1hdGNoZXMoJy5tZW51IGJ1dHRvbicpKSB7XG5cdCAgICBcdHRoaXMuYW5jZXN0b3JPZih0YXJnZXQsICdkaXYnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdHN1cGVyLm9uSGlnaGxpZ2h0ZW5kKGUpO1xuXHQgICAgfVxuXHR9XG5cdGdldCBtZW51RWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcubWVudScpO1xuXHR9XG5cdGdldCBiYXJFbCgpIHtcblxuXHRcdHJldHVybiB0aGlzLiQoJy5iYXInKTtcblx0fVxuXHRnZXQgbW92ZWFibGVFbCgpIHtcblxuXHRcdHJldHVybiB0aGlzLiQoJy5tb3ZlYWJsZScpO1xuXHR9XG5cdGdldCBzY3JlZW5FbCgpIHtcblxuXHRcdHJldHVybiB0aGlzLiQoJy5zY3JlZW4nKTtcblx0fVxufVxuXG52YXIge2xvZywgYXNzaWduLCB3YWl0LCBuZXh0RnJhbWV9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51VmlldzsiLCIvLyBzZXJ2aWNlVmlldy5qc1xuXG52YXIgVmlldyAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuVmlldy5WaWV3Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFNlcnZpY2VWaWV3IGV4dGVuZHMgVmlldyB7XG5cblx0Y29uc3RydWN0b3IoYXBwLCB0ZW1wbGF0ZSkge1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9ICdzZXJ2aWNlJztcblxuXHQgICAgc3VwZXIoYXBwKTtcblx0ICAgIGFzc2lnbih0aGlzLCB7dGVtcGxhdGV9KTtcblx0fVxuXHRiaW5kRXZlbnRzKCkge1xuXG5cdFx0dmFyIHtlbH0gPSB0aGlzO1xuXHRcdHZhciBlbE9uID0gZWwuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKGVsKTtcblxuXHRcdGVsT24oJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hzdGFydC5iaW5kKHRoaXMsICcuZGV0YWlsLWFjdGlvbicpKTtcblx0XHRlbE9uKCdjbGljaycsICAgICAgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xuXHR9XG5cdG9uQ2xpY2soZSkge1xuXHRcdHZhciB0YXJnZXQgPSB0aGlzLmdldERlc2lyZWRUYXJnZXQoZS50YXJnZXQpO1xuXG5cdFx0aWYgKHRhcmdldC5tYXRjaGVzKCcuZGV0YWlsLWFjdGlvbicpKSB0aGlzLm9uQ2xpY2tEZXRhaWxBY3Rpb24odGFyZ2V0KTtcblx0XHRpZiAodGFyZ2V0Lm1hdGNoZXMoJy5jbG9zZS1hY3Rpb24nKSkgIHRoaXMub25DbGlja0Nsb3NlQWN0aW9uKHRhcmdldCk7XG5cblx0fVxuXHRnZXREZXNpcmVkVGFyZ2V0KG5vZGUpIHtcblxuXHQgICAgaWYgKG5vZGUubWF0Y2hlcygnLmRldGFpbC1hY3Rpb24gKicpKSB7XG5cdCAgICBcdHJldHVybiB0aGlzLmFuY2VzdG9yT2Yobm9kZSwgJy5kZXRhaWwtYWN0aW9uJyk7XHRcblx0ICAgIH1cblx0ICAgIGlmIChub2RlLm1hdGNoZXMoJy5jbG9zZS1hY3Rpb24gKicpKSB7XG5cdCAgICBcdHJldHVybiB0aGlzLmFuY2VzdG9yT2Yobm9kZSwgJy5jbG9zZS1hY3Rpb24nKTtcdFxuXHQgICAgfVxuXHQgICAgXHRcblx0ICAgIHJldHVybiBub2RlO1xuXHR9XG5cdG9uQ2xpY2tEZXRhaWxBY3Rpb24odGFyZ2V0KSB7XG5cblx0XHR2YXIge3R5cGVFbH0gICAgPSB0aGlzO1xuXHRcdHZhciBjbGlja2VkSXRlbSA9IHRoaXMuYW5jZXN0b3JPZih0YXJnZXQsICcuc2VydmljZS1saXN0aXRlbScpO1xuXG5cdFx0dGhpcy4kJCgnLnNlcnZpY2UtbGlzdGl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0aWYgKCBpdGVtICE9PSBjbGlja2VkSXRlbSkgaXRlbS5jbGFzc0xpc3QuYWRkKCdjbG9zZWQnKTtcblx0XHR9KTtcblxuXHRcdHR5cGVFbC5jbGFzc0xpc3QucmVtb3ZlKCdsaXN0Jyk7XG5cdFx0dHlwZUVsLmNsYXNzTGlzdC5hZGQoJ2RldGFpbCcpO1xuXG5cdH1cblx0b25DbGlja0Nsb3NlQWN0aW9uKHRhcmdldCkge1xuXG5cdFx0dmFyIHt0eXBlRWx9ICAgID0gdGhpcztcblx0XHR2YXIgY2xpY2tlZEl0ZW0gPSB0aGlzLmFuY2VzdG9yT2YodGFyZ2V0LCAnLnNlcnZpY2UtbGlzdGl0ZW0nKTtcblxuXHRcdHRoaXMuJCQoJy5zZXJ2aWNlLWxpc3RpdGVtJykuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2VkJyk7XG5cdFx0fSk7XG5cblx0XHR0eXBlRWwuY2xhc3NMaXN0LmFkZCgnbGlzdCcpO1xuXHRcdHR5cGVFbC5jbGFzc0xpc3QucmVtb3ZlKCdkZXRhaWwnKTtcblxuXHR9XG5cdGdldCB0eXBlRWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcudHlwZScpO1xuXHR9XG59XG5cbnZhciB7bG9nLCBhc3NpZ259ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlVmlldzsiLCJ2YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFZpZXdNYW5hZ2VyIHtcblxuXHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHR9XG5cdGluaXQoKSB7XG5cblx0XHR0aGlzLmNyZWF0ZVZpZXdzKCk7XG5cdFx0dGhpcy5yZW1vdmVOb3RvdWNoT25Ub3VjaCgpO1xuXHR9XG5cdHJlbW92ZU5vdG91Y2hPblRvdWNoKCkge1xuXHRcdGxvZygncmVtb3ZlTm90b3VjaE9uVG91Y2gnKTtcblxuXHRcdHZhciB7ZG9jdW1lbnR9ID0gdGhpcy5hcHAud2luZG93O1xuXHRcdHZhciB7ZG9jdW1lbnRFbGVtZW50LCBib2R5fSA9IGRvY3VtZW50O1xuXG5cdFx0dmFyIHJlbW92ZSA9ICgpID0+IHtcblx0XHRcdGxvZyhgcmVtb3ZlYCk7XG5cdFx0XHRkb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdG91Y2gnKTtcblx0XHRcdGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHJlbW92ZSk7XG5cdFx0fTtcblx0XHRib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCByZW1vdmUpO1xuXHR9O1xuXHRjcmVhdGVWaWV3cygpIHtcblxuXHRcdHZhciB7YXBwfSAgICAgID0gdGhpcztcblx0XHR2YXIge2V2ZW50c30gPSBhcHA7XG5cdFx0dmFyIHt3aW5kb3d9ID0gYXBwO1xuXHRcdHZhciB7ZG9jdW1lbnR9ID0gd2luZG93O1xuXHRcdHZhciB7Ym9keX0gPSBkb2N1bWVudDtcblx0XHRcblx0XHR2YXIge2ludHJvVmlldywgYWJvdXRWaWV3LCBtZW51Vmlldywgc2VydmljZVZpZXd9ID0gYXBwO1xuXG5cdFx0dmFyIHZpZXdzID0gW2Fib3V0Vmlldywgc2VydmljZVZpZXcsIG1lbnVWaWV3XTtcblx0XHRcblx0XHR2YXIgaHRtbCA9IHZpZXdzLnJlZHVjZSgoc3RyLCB2aWV3KSA9PiBzdHIgKz0gdmlldy5yZW5kZXIoKSwgJycpO1xuXG5cdFx0Ly8gaHRtbCA9IGA8ZGl2IGNsYXNzPXdyYXBwZXI+JHtodG1sfTwvZGl2PmA7XG5cdFx0aHRtbCA9IFxuXHRcdGA8ZGl2IGNsYXNzPVwic3RhdHVzYmFyLWNvbnRhaW5lclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInN0YXR1c2Jhci1mYWtlclwiPlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0XCI+4peP4peP4peP4peL4peLIFZlcml6b24gPHNwYW4gY2xhc3M9XCJpY29uLWxvY2FsLXBob25lXCIgLz48L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWlkZGxlXCI+OTowOSBBTTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaWdodFwiPjU4JSDilq08L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuXHRcdFx0JHtodG1sfVxuXHRcdDwvZGl2PmA7XG5cblx0XHRib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG5cblx0XHR2aWV3cy5mb3JFYWNoKHZpZXcgPT4gdmlldy5iaW5kRXZlbnRzKCkpO1xuXHR9XG59XG5cbnZhciB7bG9nLCBhc3NpZ259ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3TWFuYWdlcjsiLCJcbmNsYXNzIFBvc3RSZXBvcnRDb21tYW5kIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGluY2lkZW50KSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmNpZGVudCA9IGluY2lkZW50O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ3Bvc3RSZXBvcnRDb21tYW5kJztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdFJlcG9ydENvbW1hbmQ7IiwidmFyIENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZEhhbmRsZXInKTtcbnZhciBoZWxwZXJzICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlciBleHRlbmRzIENvbW1hbmRIYW5kbGVyIHtcblxuICAgIGhhbmRsZShjb21tYW5kKSB7XG5cbiAgICAgICAgdmFyICR0aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHtuYW1lLCBpbmNpZGVudH0gPSBjb21tYW5kO1xuICAgICAgICB2YXIge2FwcH0gPSAkdGhpcztcbiAgICAgICAgdmFyIFJlcG9ydCA9IGFwcC5tYWtlKCdSZXBvcnQnKTtcbiAgICAgICAgXG4gICAgICAgIGFzeW5jKGZ1bmN0aW9uKiAoKSB7XG5cbiAgICAgICAgICAgIHZhciByZXBvcnQgPSB5aWVsZCBSZXBvcnQucG9zdChuYW1lLCBpbmNpZGVudCk7XG4gICAgICAgICAgICAkdGhpcy5kaXNwYXRjaEV2ZW50c0ZvcihyZXBvcnQpO1xuXG4gICAgICAgIH0pKCkuY2F0Y2godGVybWluYXRlRXJyb3IpO1xuICAgIH1cbn1cblxudmFyIHt0ZXJtaW5hdGVFcnJvciwgYXN5bmMsIGxvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlcjsiLCJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblxuICAgICAgICBhc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXROYW1lKCkge1xuXG4gICAgICAgIHJldHVybiAnYXBwLnJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0U2hvcnROYW1lKCkge1xuXG4gICAgXHRyZXR1cm4gbGFzdFNlZ21lbnQoIHRoaXMuZ2V0TmFtZSgpICk7XG4gICAgfVxufVxuXG52YXIge2Fzc2lnbiwgbGFzdFNlZ21lbnR9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kOyIsInZhciBDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRIYW5kbGVyJyk7XG52YXIgaGVscGVycyAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlciBleHRlbmRzIENvbW1hbmRIYW5kbGVyIHtcblxuICAgICpoYW5kbGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgICAgIHZhciB7Qmx1ZWxpZ2h0LCBldmVudHN9ID0gYXBwO1xuICAgICAgICB2YXIgY29tbWFuZE5hbWUgID0gY29tbWFuZC5jb25zdHJ1Y3Rvci5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGJsdWVsaWdodCA9IHlpZWxkIEJsdWVsaWdodC5nZXQoKTtcbiAgICAgICAgICAgIGxvZygnOjogY3JhcCAyJyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnRzRm9yKGJsdWVsaWdodCk7ICAgXG4gICAgICAgICAgICByZXR1cm4gYmx1ZWxpZ2h0LmNvbGxlY3Rpb247XG5cbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgXG4gICAgICAgICAgICBsb2coYDo6IGJpZyBlcnJvcmApO1xuICAgICAgICAgICAgZXZlbnRzLmVtaXQoY29tbWFuZE5hbWUsIGVycik7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciB7YXN5bmNNZXRob2RzLCBsb2d9ID0gaGVscGVycztcblxuYXN5bmNNZXRob2RzKFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyLnByb3RvdHlwZSwgJ2hhbmRsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmRIYW5kbGVyOyIsInZhciBFdmVudEdlbmVyYXRvciA9IHJlcXVpcmUoJy4uLy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50R2VuZXJhdG9yJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIEJsdWVsaWdodCB7XG5cblx0Ly8gdXNlcyBFdmVudEdlbmVyYXRvclxuXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGluY2lkZW50KSB7IFxuXG5cdCAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXHQgICAgdGhpcy5pbmNpZGVudCA9IGluY2lkZW50O1xuXHQgICAgRXZlbnRHZW5lcmF0b3IuY2FsbCh0aGlzKTtcblx0fVxuXHRzdGF0aWMgKmdldCguLi5hcmdzKSB7XG5cdFx0dmFyIGFwcCA9IHRoaXMuZ2V0QXBwbGljYXRpb24oKTtcblx0XHR2YXIge2JsdWVsaWdodFJlcG9zaXRvcnksIGJsdWVsaWdodH0gPSBhcHA7XG5cblx0XHR2YXIgY29sbGVjdGlvbiA9IHlpZWxkIGJsdWVsaWdodFJlcG9zaXRvcnkuZ2V0KCk7XG5cdFx0bG9nKGA6OiBCbHVlbGlnaHQuZ2V0IDNgKTtcblx0XHRibHVlbGlnaHQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cdFx0XG5cdFx0dmFyIGV2ZW50ID0gYXBwLm1ha2UoJ2JsdWVsaWdodHNEZWxpdmVyZWQnLCBbY29sbGVjdGlvbl0pO1xuXHRcdHJldHVybiBibHVlbGlnaHQucmFpc2UoZXZlbnQpO1xuXHR9XG5cdHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuXHQgICAgcmV0dXJuIHRoaXMuYXBwXztcblx0fVxuXHRzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cblx0ICAgIHRoaXMuYXBwXyA9IGFwcDtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9XG59XG5cbnZhciB7bG9nLCBleHRlbmRQcm90b09mLCB3YWl0LCBhc3luY01ldGhvZHN9ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihCbHVlbGlnaHQsIEV2ZW50R2VuZXJhdG9yKTtcbmFzeW5jTWV0aG9kcyhCbHVlbGlnaHQsICdnZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCbHVlbGlnaHQ7IiwiLy8gQmx1ZWxpZ2h0Q29sbGVjdGlvbi5qc1xuXG52YXIgQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5Db2xsZWN0aW9uJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uLy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcblxuLy8gdmFyIEV2ZW50R2VuZXJhdG9yID0gcmVxdWlyZSgnLi4vLi4vLi4vZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRXZlbnRHZW5lcmF0b3InKTtcblxuY2xhc3MgQmx1ZWxpZ2h0Q29sbGVjdGlvbiBleHRlbmRzIENvbGxlY3Rpb24ge1xuXG5cdC8vIHVzZXMgRXZlbnRHZW5lcmF0b3JcblxuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncylcblx0XHQvLyBFdmVudEdlbmVyYXRvci5jYWxsKHRoaXMpO1xuXHR9XG5cdC8vIHN0YXRpYyAqZ2V0KC4uLmFyZ3MpIHtcblxuXHQvLyBcdHZhciByZXN1bHQgPSB5aWVsZCB3YWl0KDAsIFs1LDMsMl0pO1xuXHQvLyBcdHJldHVybiBuZXcgQmx1ZWxpZ2h0Q29sbGVjdGlvbihyZXN1bHQpO1xuXHQvLyB9XG5cdHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuXHQgICAgcmV0dXJuIHRoaXMuYXBwXztcblx0fVxuXHRzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cblx0ICAgIHRoaXMuYXBwXyA9IGFwcDtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9XG59XG5cbnZhciB7ZXh0ZW5kUHJvdG9PZiwgLyphc3luY01ldGhvZHMsICovd2FpdH0gPSBoZWxwZXJzO1xuXG4vLyBleHRlbmRQcm90b09mKEJsdWVsaWdodENvbGxlY3Rpb24sIEV2ZW50R2VuZXJhdG9yKTtcbi8vIGFzeW5jTWV0aG9kcyhCbHVlbGlnaHRDb2xsZWN0aW9uLCAnZ2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmx1ZWxpZ2h0Q29sbGVjdGlvbjsiLCIvLyBCbHVlbGlnaHRzRGVsaXZlcmVkLmpzXG5cblxuY2xhc3MgQmx1ZWxpZ2h0c0RlbGl2ZXJlZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihibHVlbGlnaHRDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGJsdWVsaWdodENvbGxlY3Rpb247XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdhcHAuYmx1ZWxpZ2h0c0RlbGl2ZXJlZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJsdWVsaWdodHNEZWxpdmVyZWQ7IiwiXG5jbGFzcyBSZXBvcnRXYXNQb3N0ZWQge1xuXG4gICAgY29uc3RydWN0b3IocmVwb3J0KSB7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHJlcG9ydDtcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5nZXROYW1lKCk7XG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB9XG4gICAgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ3JlcG9ydFdhc1Bvc3RlZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9ydFdhc1Bvc3RlZDsiLCJ2YXIgRXZlbnRHZW5lcmF0b3IgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5FdmVudHMuRXZlbnRHZW5lcmF0b3InKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcblxuY2xhc3MgUmVwb3J0IHtcblxuICAgIC8vIHVzZXMgRXZlbnRHZW5lcmF0b3JcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGluY2lkZW50KSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmNpZGVudCA9IGluY2lkZW50O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBzdGF0aWMgKnBlcnNpc3QocmVwb3J0KSB7XG5cbiAgICAgICAgdmFyIG15TmFtZSA9IHRoaXMubXlOYW1lKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBoZXkgcmVwb3J0IDE6ICR7bXlOYW1lfWApO1xuICAgICAgICB2YXIgc2F2ZWRSZXBvcnQgPSB5aWVsZCB3YWl0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXkgcmVwb3J0IDInKTtcbiAgICAgICAgeWllbGQgd2FpdCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGV5IHJlcG9ydCAzJyk7XG4gICAgICAgIHJldHVybiAnaSBhbSBkb25lISc7XG4gICAgfVxuICAgIHN0YXRpYyBteU5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICd3ZWlyZE5hbWUnO1xuICAgIH1cbiAgICBzdGF0aWMgKnBvc3QoLi4uYXJncykge1xuXG4gICAgICAgIHZhciBhcHAgPSB0aGlzLmdldEFwcGxpY2F0aW9uKCk7XG4gICAgICAgIHZhciB7cmVwb3J0UmVwb3NpdG9yeX0gPSBhcHA7XG5cbiAgICAgICAgdmFyIHJlcG9ydCA9IGFwcC5tYWtlKCdyZXBvcnQnLCBhcmdzKTtcbiAgICAgICAgcmVwb3J0ID0geWllbGQgcmVwb3J0UmVwb3NpdG9yeS5zYXZlKHJlcG9ydCk7XG5cbiAgICAgICAgdmFyIGV2ZW50ID0gYXBwLm1ha2UoJ3JlcG9ydFdhc1Bvc3RlZCcsIFtyZXBvcnRdKTtcbiAgICAgICAgcmV0dXJuIHJlcG9ydC5yYWlzZShldmVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRBcHBsaWNhdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHBfO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0QXBwbGljYXRpb24oYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHBfID0gYXBwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxudmFyIHtsb2csIGV4dGVuZFByb3RvT2YsIHdhaXQsIGFzeW5jTWV0aG9kc30gPSBoZWxwZXJzO1xuZXh0ZW5kUHJvdG9PZihSZXBvcnQsIEV2ZW50R2VuZXJhdG9yKTtcbmFzeW5jTWV0aG9kcyhSZXBvcnQsICdwZXJzaXN0JywgJ3Bvc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnQ7IiwidmFyIFNlcnZpY2VQcm92aWRlciAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgUmVwb3J0ICAgICAgICAgICA9IHJlcXVpcmUoJ0FwcC5FbnRpdGllcy5SZXBvcnRzLlJlcG9ydCcpO1xudmFyIFJlcG9ydFdhc1Bvc3RlZCAgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuUmVwb3J0cy5FdmVudHMuUmVwb3J0V2FzUG9zdGVkJyk7XG52YXIgUmVwb3J0UmVwb3NpdG9yeSA9IHJlcXVpcmUoJ0FwcC5SZXBvc2l0b3JpZXMuUmVwb3J0UmVwb3NpdG9yeScpO1xuXG52YXIgQmx1ZWxpZ2h0ICAgICAgICAgICA9IHJlcXVpcmUoJ0FwcC5FbnRpdGllcy5CbHVlbGlnaHRzLkJsdWVsaWdodCcpO1xudmFyIEJsdWVsaWdodENvbGxlY3Rpb24gPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuQmx1ZWxpZ2h0cy5CbHVlbGlnaHRDb2xsZWN0aW9uJyk7XG52YXIgQmx1ZWxpZ2h0UmVwb3NpdG9yeSA9IHJlcXVpcmUoJ0FwcC5SZXBvc2l0b3JpZXMuQmx1ZWxpZ2h0UmVwb3NpdG9yeScpO1xudmFyIEJsdWVsaWdodHNEZWxpdmVyZWQgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuQmx1ZWxpZ2h0cy5FdmVudHMuQmx1ZWxpZ2h0c0RlbGl2ZXJlZCcpO1xuXG52YXIgWEhSTG9hZGVyICAgPSByZXF1aXJlKCdXaWxkY2F0LkxvYWRlcnMuWEhSTG9hZGVyJyk7XG52YXIgVmlld01hbmFnZXIgPSByZXF1aXJlKCcuLi9Ccm93c2VyL1ZpZXdzL1ZpZXdNYW5hZ2VyJyk7XG5cbnZhciBoZWxwZXJzICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG4gXG5jbGFzcyBBcHBTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgYm9vdCgpIHtcblxuICAgIH1cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgLy8gVGhpcyBzZXJ2aWNlIHByb3ZpZGVyIGlzIGEgY29udmVuaWVudCBwbGFjZSB0byByZWdpc3RlciB5b3VyIHNlcnZpY2VzXG4gICAgICAgIC8vIGluIHRoZSBJb0MgY29udGFpbmVyLlxuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJFbnRpdGllcy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlclJlcG9zaXRvcmllcy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3Rlck90aGVycy5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJPdGhlcnMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuXG4gICAgYXBwLmJpbmRTaGFyZWQoJ3ZpZXdNYW5hZ2VyJywgYXBwID0+IG5ldyBWaWV3TWFuYWdlcihhcHApKTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyRW50aXRpZXMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuXG4gICAgLy8gUmVwb3J0XG4gICAgYXBwLmJpbmRTaGFyZWQoJ1JlcG9ydCcsIGFwcCA9PiBSZXBvcnQuc2V0QXBwbGljYXRpb24oYXBwKSk7XG4gICAgYXBwLmJpbmQoJ3JlcG9ydCcsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBhcHAuUmVwb3J0KC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIGFwcC5iaW5kKCdyZXBvcnRXYXNQb3N0ZWQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVwb3J0V2FzUG9zdGVkKC4uLmFyZ3MpO1xuICAgIH0pO1xuXG4gICAgLy8gQmx1ZWxpZ2h0XG4gICAgYXBwLmJpbmRTaGFyZWQoJ0JsdWVsaWdodCcsIGFwcCA9PiBCbHVlbGlnaHQuc2V0QXBwbGljYXRpb24oYXBwKSk7XG4gICAgYXBwLmJpbmQoJ2JsdWVsaWdodCcsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBhcHAuQmx1ZWxpZ2h0KC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIGFwcC5iaW5kU2hhcmVkKCdCbHVlbGlnaHRDb2xsZWN0aW9uJywgYXBwID0+IEJsdWVsaWdodENvbGxlY3Rpb24uc2V0QXBwbGljYXRpb24oYXBwKSk7XG4gICAgYXBwLmJpbmQoJ2JsdWVsaWdodENvbGxlY3Rpb24nLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmICggISBhcmdzLmxlbmd0aCkgYXJncyA9IFtbXV07XG4gICAgICAgIHJldHVybiBuZXcgYXBwLkJsdWVsaWdodENvbGxlY3Rpb24oLi4uYXJncyk7XG4gICAgfSk7XG4gICAgYXBwLmJpbmQoJ2JsdWVsaWdodHNEZWxpdmVyZWQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQmx1ZWxpZ2h0c0RlbGl2ZXJlZCguLi5hcmdzKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVwb3NpdG9yaWVzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcblxuICAgIGFwcC5iaW5kU2hhcmVkKCdyZXBvcnRSZXBvc2l0b3J5JywgYXBwID0+IG5ldyBSZXBvcnRSZXBvc2l0b3J5KGFwcCkpO1xuXG4gICAgYXBwLmJpbmQoJ3hockxvYWRlcicsIGFwcCA9PiBuZXcgWEhSTG9hZGVyKTtcbiAgICBhcHAuYmluZFNoYXJlZCgnYmx1ZWxpZ2h0UmVwb3NpdG9yeScsIGFwcCA9PiB7XG4gICAgICAgIHZhciB4aHJMb2FkZXIgPSBhcHAueGhyTG9hZGVyO1xuICAgICAgICByZXR1cm4gbmV3IEJsdWVsaWdodFJlcG9zaXRvcnkoYXBwLCB4aHJMb2FkZXIpO1xuICAgIH0pO1xufVxuXG52YXIge2xvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFNlcnZpY2VQcm92aWRlcjsiLCJ2YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcblxuY2xhc3MgQmx1ZWxpZ2h0UmVwb3NpdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHAsIGxvYWRlcikge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgICB9XG4gICAgKmdldCgpIHtcbiAgICAgICAgbG9nKGA6OiBCbHVlbGlnaHRSZXBvc2l0b3J5LmdldGApXG4gICAgXHR2YXIge2FwcCwgbG9hZGVyLCBiYXNlVXJsfSA9IHRoaXM7XG4gICAgXHR2YXIge0JsdWVsaWdodENvbGxlY3Rpb259ID0gYXBwO1xuICAgIFx0dmFyIHVybCA9IGAke2Jhc2VVcmx9Ymx1ZWxpZ2h0c2A7XG5cbiAgICBcdHZhciB7ZmVhdHVyZXN9ID0geWllbGQgbG9hZGVyLmdldCh7dXJsLCB0aW1lb3V0OiAxMDAwMH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgQmx1ZWxpZ2h0Q29sbGVjdGlvbihmZWF0dXJlcyk7XG4gICAgfVxuICAgIGdldCBiYXNlVXJsKCkge1xuXG4gICAgXHR2YXIge2NvbmZpZ30gPSB0aGlzLmFwcDtcbiAgICBcdHJldHVybiBjb25maWcuZ2V0KCdhcHAnKS5hcGlCYXNlVXJsO1xuICAgIH1cbn1cblxudmFyIHthc3luY01ldGhvZHMsIGxvZ30gPSBoZWxwZXJzO1xuXG5hc3luY01ldGhvZHMoQmx1ZWxpZ2h0UmVwb3NpdG9yeS5wcm90b3R5cGUsICdnZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBCbHVlbGlnaHRSZXBvc2l0b3J5OyIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBWYWxpZGF0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuQXV0aGVudGljYXRpb25FcnJvcicpO1xuXG5jbGFzcyBSZXBvcnRSZXBvc2l0b3J5IHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cbiAgICBzYXZlKHJlcG9ydCkge1xuXG4gICAgICAgIGxvZyhgc2F2aW5nIHJlcG9ydCwgcGxlYXNlIHdhaXTigKZgKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB3YWl0KCkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKGBjcmFhcHBwcGApO1xuXG4gICAgICAgICAgICBsb2coYHJlcG9ydCBzYXZlZCwgdGhhbmsgeW91LmApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG52YXIge2xvZywgd2FpdH0gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9ydFJlcG9zaXRvcnk7IiwicmVxdWlyZSgndHJhY2V1ci9iaW4vdHJhY2V1ci1ydW50aW1lJyk7XG5cbi8vIHZhciBBcHAgPSByZXF1aXJlKCcuLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9BcHBsaWNhdGlvbicpO1xudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwbGljYXRpb24nKTtcblxuLy8gY291bGQgZXh0ZW5kIEFwcCwgc28gbGVhdmUgdGhpcyBmaWxlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbi8qXG4gKiBBcHBsaWNhdGlvbiBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICovXG52YXIgQXBwU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnQXBwLlByb3ZpZGVycy5BcHBTZXJ2aWNlUHJvdmlkZXInKTtcblxuLypcbiAqIEZyYW1ld29yayBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICovXG52YXIgTG9nU2VydmljZVByb3ZpZGVyICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2cuTG9nU2VydmljZVByb3ZpZGVyJyk7XG52YXIgV2luZG93U2VydmljZVByb3ZpZGVyICAgID0gcmVxdWlyZSgnV2lsZGNhdC5ET00uV2luZG93U2VydmljZVByb3ZpZGVyJyk7XG52YXIgRXJyb3JQcm92aWRlciAgICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuRXJyb3JTZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBWaWV3U2VydmljZVByb3ZpZGVyICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlld1NlcnZpY2VQcm92aWRlcicpO1xudmFyIENvbW1hbmRlclNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRTZXJ2aWNlUHJvdmlkZXInKTtcblxuZnVuY3Rpb24gZ2V0TmF2aWdhdG9yUHJvcGVydHkocHJvcCkge1xuXG4gICAgLy8gZGVhbCB3aXRoIGN1cnJlbnQgYnVnIGluIENvcmRvdmE6XG4gICAgLy8gXCJEZXByZWNhdGVkIGF0dGVtcHQgdG8gYWNjZXNzIHByb3BlcnR5Li4uXCJcbiAgICAvLyAuLi5wcm9iYWJseSB3aWxsIGZpeCBzb29uXG5cbiAgICB2YXIgbmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvcjtcbiAgICB2YXIgcGFyZW50ICAgID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5hdmlnYXRvcik7XG5cbiAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcGFyZW50W3Byb3BdO1xuICAgICAgICBpZiAocGFyZW50W3Byb3BdICE9PSB1bmRlZmluZWQpIHJldHVybiBwYXJlbnRbcHJvcF07XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3JbcHJvcF07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3JbcHJvcF07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBicm93c2VyKCkge1xuXG4gICAgaWYgKGdsb2JhbC5uYXZpZ2F0b3IpIHtcbiAgICAgICAgcmV0dXJuIGdldE5hdmlnYXRvclByb3BlcnR5KCd1c2VyQWdlbnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ25vdCBkZXRlcm1pbmVkJztcbiAgICB9XG59XG5cbnZhciBjb25maWdPYmplY3QgPSB7XG4gICAgYXBpQmFzZVVybDogJ2h0dHBzOi8vZ28uZG9zYS5ub3J0aHdlc3Rlcm4uZWR1L251aGVscGFwaS9hcGkvJyxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8qXG4gICAgICAgICAqIEFwcGxpY2F0aW9uIFNlcnZpY2UgUHJvdmlkZXJzLi4uXG4gICAgICAgICAqL1xuICAgICAgICBBcHBTZXJ2aWNlUHJvdmlkZXIsXG5cbiAgICAgICAgLypcbiAgICAgICAgICogRnJhbWV3b3JrIFNlcnZpY2UgUHJvdmlkZXJzLi4uXG4gICAgICAgICAqL1xuICAgICAgICBXaW5kb3dTZXJ2aWNlUHJvdmlkZXIsXG4gICAgICAgIExvZ1NlcnZpY2VQcm92aWRlcixcbiAgICAgICAgRXJyb3JQcm92aWRlcixcbiAgICAgICAgVmlld1NlcnZpY2VQcm92aWRlcixcbiAgICAgICAgQ29tbWFuZGVyU2VydmljZVByb3ZpZGVyLFxuICAgIF0sXG4gICAgbG9jYWxlOiAnZW4nLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIoKSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uZmlnT2JqZWN0OyIsInZhciBQb3N0UmVwb3J0Q29tbWFuZCA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5Qb3N0UmVwb3J0Q29tbWFuZCcpO1xudmFyIFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQgPSByZXF1aXJlKCdBcHAuQ29tbWFuZHMuUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgIGFic3RyYWN0OiAncG9zdFJlcG9ydENvbW1hbmQnLFxuICAgICAgICBjb21tYW5kIDogUG9zdFJlcG9ydENvbW1hbmQsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFic3RyYWN0OiAncmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCcsXG4gICAgICAgIGNvbW1hbmQgOiBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kLFxuICAgIH0sXG5dOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdhcHAnOiAgICAgICAgIHJlcXVpcmUoJy4vYXBwJyksXG4gICAgJ2xvY2FsLmFwcCc6ICAgcmVxdWlyZSgnLi9sb2NhbC9hcHAnKSxcbiAgICAndGVzdGluZy5hcHAnOiByZXF1aXJlKCcuL3Rlc3RpbmcvYXBwJyksXG4gICAgJ2NvbW1hbmRzJzogICAgcmVxdWlyZSgnLi9jb21tYW5kcycpLFxuICAgICdoYW5kbGVycyc6ICAgIHJlcXVpcmUoJy4vaGFuZGxlcnMnKSxcbiAgICAndmlld3MnOiAgICAgICByZXF1aXJlKCcuL3ZpZXdzJyksXG59O1xuIiwidmFyIFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5Qb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXInKTtcbnZhciBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ0FwcC5Db21tYW5kcy5SZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgICB7XG4gICAgICAgIGFic3RyYWN0OiAncG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyJyxcbiAgICAgICAgaGFuZGxlciA6IFBvc3RSZXBvcnRDb21tYW5kSGFuZGxlcixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgYWJzdHJhY3Q6ICdyZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlcicsXG4gICAgICAgIGhhbmRsZXIgOiBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlcixcbiAgICB9LFxuXTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG5cdC8vIGFwaUJhc2VVcmw6ICdodHRwOi8vbnVoZWxwLmFwaS9hcGkvJyxcblx0YXBpQmFzZVVybDogJ2h0dHBzOi8vZ28uZG9zYS5ub3J0aHdlc3Rlcm4uZWR1L251aGVscGFwaS9hcGkvJyxcbiAgICBkZWJ1ZzogdHJ1ZSxcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XG4gICAgYXBpQmFzZVVybDogJ2h0dHA6Ly9udWhlbHAuYXBpL2FwaS8nLFxuICAgIGJyb3dzZXI6ICdjb25zb2xlJyxcbn07IiwidmFyIEludHJvVmlldyA9IHJlcXVpcmUoJy4uL2FwcC9Ccm93c2VyL1ZpZXdzL0ludHJvVmlldycpO1xudmFyIE1lbnVWaWV3ICA9IHJlcXVpcmUoJy4uL2FwcC9Ccm93c2VyL1ZpZXdzL01lbnVWaWV3Jyk7XG52YXIgQWJvdXRWaWV3ICA9IHJlcXVpcmUoJy4uL2FwcC9Ccm93c2VyL1ZpZXdzL0Fib3V0VmlldycpO1xudmFyIFNlcnZpY2VWaWV3ICA9IHJlcXVpcmUoJy4uL2FwcC9Ccm93c2VyL1ZpZXdzL1NlcnZpY2VWaWV3Jyk7XG5cbnZhciBtZW51VGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvYnVpbHQvbWVudS5oYnMnKTtcbnZhciBhYm91dFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL2J1aWx0L2Fib3V0LmhicycpO1xudmFyIHNlcnZpY2VUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9idWlsdC9zZXJ2aWNlLmhicycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcblxuICAgIHtcbiAgICAgICAgJ2Fic3RyYWN0JyAgICA6ICdpbnRyb1ZpZXcnLFxuICAgICAgICAnJGNvbnN0cnVjdG9yJzogSW50cm9WaWV3LFxuICAgICAgICAnYnVpbGQnICAgICAgIDogJ3NpbmdsZXRvbicsXG4gICAgICAgICdhcmdzJyAgICAgICAgOiBbXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2Fic3RyYWN0JyAgICA6ICdtZW51VmlldycsXG4gICAgICAgICckY29uc3RydWN0b3InOiBNZW51VmlldyxcbiAgICAgICAgJ2J1aWxkJyAgICAgICA6ICdzaW5nbGV0b24nLFxuICAgICAgICAnYXJncycgICAgICAgIDogW21lbnVUZW1wbGF0ZV0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdhYnN0cmFjdCcgICAgOiAnYWJvdXRWaWV3JyxcbiAgICAgICAgJyRjb25zdHJ1Y3Rvcic6IEFib3V0VmlldyxcbiAgICAgICAgJ2J1aWxkJyAgICAgICA6ICdzaW5nbGV0b24nLFxuICAgICAgICAnYXJncycgICAgICAgIDogW2Fib3V0VGVtcGxhdGVdLFxuICAgIH0sXG4gICAge1xuICAgICAgICAnYWJzdHJhY3QnICAgIDogJ3NlcnZpY2VWaWV3JyxcbiAgICAgICAgJyRjb25zdHJ1Y3Rvcic6IFNlcnZpY2VWaWV3LFxuICAgICAgICAnYnVpbGQnICAgICAgIDogJ3NpbmdsZXRvbicsXG4gICAgICAgICdhcmdzJyAgICAgICAgOiBbc2VydmljZVRlbXBsYXRlXSxcbiAgICB9LFxuXTsiLCJcbmNsYXNzIENvbW1hbmRCdXMge1xuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxuXG4gICAgZXhlY3V0ZShjb21tYW5kKSB7XG5cbiAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gY29tbWFuZC5jb25zdHJ1Y3Rvci5nZXRTaG9ydE5hbWUoKTtcbiAgICAgICAgdmFyIGhhbmRsZXJOYW1lID0gYCR7Y29tbWFuZE5hbWV9SGFuZGxlcmA7XG4gICAgICAgIHZhciBoYW5kbGVyICAgICA9IHRoaXMuYXBwLm1ha2UoaGFuZGxlck5hbWUpO1xuXG4gICAgICAgIHJldHVybiBoYW5kbGVyLmhhbmRsZShjb21tYW5kKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWFuZEJ1czsiLCJ2YXIgRGlzcGF0Y2hhYmxlVHJhaXQgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5FdmVudHMuRGlzcGF0Y2hhYmxlVHJhaXQnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgQ29tbWFuZEhhbmRsZXIge1xuXG4gICAgLy8gdXNlcyBEaXNwYXRjaGFibGVUcmFpdFxuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxufVxuXG52YXIge2V4dGVuZFByb3RvT2Z9ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihDb21tYW5kSGFuZGxlciwgRGlzcGF0Y2hhYmxlVHJhaXQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRIYW5kbGVyOyIsInZhciB7bG9nfSAgICAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBDb21tYW5kQnVzICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kQnVzJyk7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuRXZlbnRzLkV2ZW50RGlzcGF0Y2hlcicpO1xuXG5jbGFzcyBDb21tYW5kU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJDb21tYW5kQnVzLmNhbGwodGhpcyk7XG4gICAgICAgIHJlZ2lzdGVyQ29tbWFuZHMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJIYW5kbGVycy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlckV2ZW50RGlzcGF0Y2hlci5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJDb21tYW5kQnVzKCkge1xuXG4gICAgdGhpcy5hcHAuYmluZFNoYXJlZCgnY29tbWFuZEJ1cycsIGFwcCA9PiBuZXcgQ29tbWFuZEJ1cyhhcHApKTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tbWFuZHMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgIHZhciBjb21tYW5kcyA9IGFwcC5jb25maWcuZ2V0KCdjb21tYW5kcycpO1xuXG4gICAgZm9yICh2YXIge2Fic3RyYWN0LCBjb21tYW5kfSBvZiBjb21tYW5kcykge1xuICAgICAgICBcbiAgICAgICAgYXBwLmJpbmQoYWJzdHJhY3QsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgY29tbWFuZCguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVnaXN0ZXJIYW5kbGVycygpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgdmFyIGhhbmRsZXJzID0gYXBwLmNvbmZpZy5nZXQoJ2hhbmRsZXJzJyk7XG5cbiAgICBmb3IgKHZhciB7YWJzdHJhY3QsIGhhbmRsZXJ9IG9mIGhhbmRsZXJzKSB7XG4gICAgICAgIFxuICAgICAgICBhcHAuYmluZFNoYXJlZChhYnN0cmFjdCwgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBoYW5kbGVyKGFwcCwgLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnREaXNwYXRjaGVyKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICB2YXIge2V2ZW50cywgbG9nZ2VyfSA9IGFwcDtcblxuICAgIGFwcC5iaW5kKCdldmVudERpc3BhdGNoZXInLCBhcHAgPT4gbmV3IEV2ZW50RGlzcGF0Y2hlcihldmVudHMsIGxvZ2dlcikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRTZXJ2aWNlUHJvdmlkZXI7IiwidmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBDb21tYW5kZXJUcmFpdCB7XG5cbiAgICBleGVjdXRlKGNvbW1hbmQsIGlucHV0KSB7XG4gICAgXHRcbiAgICBcdGxvZyhgOjpleGVjdXRpbmcgZnJvbSBjb21tYW5kZXIgdHJhaXRgKTtcbiAgICAgICAgdmFyIGJ1cyA9IHRoaXMuZ2V0Q29tbWFuZEJ1cygpO1xuICAgICAgICByZXR1cm4gYnVzLmV4ZWN1dGUoY29tbWFuZCk7XG4gICAgfVxuICAgIGdldENvbW1hbmRCdXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLm1ha2UoJ2NvbW1hbmRCdXMnKTtcbiAgICB9XG59XG5cbnZhciB7bG9nfSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tbWFuZGVyVHJhaXQ7IiwiXG5jbGFzcyBEaXNwYXRjaGFibGVUcmFpdCB7XG5cbiAgICBkaXNwYXRjaEV2ZW50c0ZvcihlbnRpdHkpIHtcblxuICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IHRoaXMuZ2V0RGlzcGF0Y2hlcigpO1xuICAgICAgICB2YXIgZXZlbnRzICAgICA9IGVudGl0eS5yZWxlYXNlRXZlbnRzKCk7XG5cbiAgICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaChldmVudHMpO1xuICAgIH1cbiAgICBnZXREaXNwYXRjaGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5ldmVudERpc3BhdGNoZXI7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoYWJsZVRyYWl0OyIsIlxuY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGV2ZW50cywgbG9nKSB7XG5cbiAgICAgICAgdGhpcy5ldmVudHNfID0gZXZlbnRzO1xuICAgICAgICB0aGlzLmxvZ18gICAgPSBsb2c7XG4gICAgfVxuICAgIGRpc3BhdGNoKGV2ZW50cykge1xuXG4gICAgICAgIGZvciAodmFyIGV2ZW50IG9mIGV2ZW50cykge1xuXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZ2V0RXZlbnROYW1lLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHNfLmVtaXQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB0aGlzLmxvZ18ubG9nKGAke2V2ZW50TmFtZX0gd2FzIGZpcmVkLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRFdmVudE5hbWUoZXZlbnQpIHtcblxuICAgIHJldHVybiBldmVudC5nZXROYW1lKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnREaXNwYXRjaGVyOyIsIlxuY2xhc3MgRXZlbnRHZW5lcmF0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXyA9IFtdO1xuICAgIH1cblxuICAgIHJhaXNlKGV2ZW50KSB7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXy5wdXNoKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbGVhc2VFdmVudHMoKSB7XG5cbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMucGVuZGluZ0V2ZW50c187XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nRXZlbnRzXyA9IFtdO1xuXG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50R2VuZXJhdG9yOyIsIlxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG4vKmFic3RyYWN0Ki8gY2xhc3MgRXZlbnRMaXN0ZW5lciB7XG5cblx0aGFuZGxlKGV2ZW50KSB7XG5cblx0XHR2YXIgZXZlbnROYW1lICAgID0gZXZlbnQuZ2V0TmFtZSgpO1xuXHRcdHZhciBzaG9ydE5hbWUgICAgPSBnZXRTaG9ydG5hbWUoZXZlbnROYW1lKTtcblx0XHR2YXIgdGFyZ2V0TmFtZSAgID0gZ2V0VGFyZ2V0bmFtZShzaG9ydE5hbWUpO1xuXHRcdHZhciBpc1JlZ2lzdGVyZWQgPSBpc0Z1bmN0aW9uKCB0aGlzW3RhcmdldE5hbWVdICk7XG5cblx0XHRpZiAoaXNSZWdpc3RlcmVkKSByZXR1cm4gdGhpc1t0YXJnZXROYW1lXShldmVudCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0bmFtZShzaG9ydE5hbWUpIHtcblxuXHRzaG9ydE5hbWUgPSB1Y2ZpcnN0KHNob3J0TmFtZSk7XG5cdHJldHVybiBgb24ke3Nob3J0TmFtZX1gO1xufVxuZnVuY3Rpb24gZ2V0U2hvcnRuYW1lKGV2ZW50TmFtZSkge1xuXG5cdHJldHVybiBsYXN0U2VnbWVudChldmVudE5hbWUpO1xufVxuXG52YXIge2lzRnVuY3Rpb24sIGxvZywgdWNmaXJzdCwgbGFzdFNlZ21lbnR9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudExpc3RlbmVyOyIsInZhciBzdGF0ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xuXG5jbGFzcyBNb2R1bGVMb2FkZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnT2JqID0ge30pIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5jb25maWdPYmogPSBjb25maWdPYmo7XG4gICAgfVxuXG4gICAgbG9hZChlbnZpcm9ubWVudCwgZ3JvdXAsIG5hbWVzcGFjZSA9IG51bGwpIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIgY29uZmlnT2JqID0gXy5jb25maWdPYmo7XG4gICAgICAgIHZhciBpdGVtcyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLmV4aXN0cyhncm91cCkpIGl0ZW1zID0gY29uZmlnT2JqW2dyb3VwXTtcblxuICAgICAgICBpZiAoY29uZmlnT2JqW2Ake2Vudmlyb25tZW50fS4ke2dyb3VwfWBdKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW1zLCBjb25maWdPYmpbYCR7ZW52aXJvbm1lbnR9LiR7Z3JvdXB9YF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuXG4gICAgfVxuICAgIGV4aXN0cyhncm91cCwgbmFtZXNwYWNlID0gbnVsbCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG4gICAgICAgIHZhciBjb25maWdPYmogPSBfLmNvbmZpZ09iajtcblxuICAgICAgICBpZiAoY29uZmlnT2JqW2dyb3VwXSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2R1bGVMb2FkZXI7IiwidmFyIHN0YXRlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJylcblxuY2xhc3MgUmVwb3NpdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXIsIGVudmlyb25tZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8ubG9hZGVyID0gbG9hZGVyO1xuICAgICAgICBfLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgfVxuICAgIGhhcygpIHtcblxuICAgIH1cbiAgICBnZXQoa2V5LCBkZWZhdWx0VmFsKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIge2Vudmlyb25tZW50fSA9IF87XG4gICAgICAgIHZhciBbbmFtZXNwYWNlLCBncm91cCwgaXRlbV0gPSBwYXJzZUtleShrZXkpO1xuXG4gICAgICAgIHZhciBpdGVtcyA9IF8ubG9hZGVyLmxvYWQoZW52aXJvbm1lbnQsIGdyb3VwLCBuYW1lc3BhY2UpO1xuXG4gICAgICAgIGlmICggISBpdGVtKSByZXR1cm4gaXRlbXM7XG5cbiAgICAgICAgaWYgKGl0ZW1zW2l0ZW1dICE9PSB1bmRlZmluZWQpIHJldHVybiBpdGVtc1tpdGVtXTtcblxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbDtcbiAgICB9XG4gICAgc2V0KCkge1xuXG4gICAgfVxufVxuXG4vLyBwcml2YXRlIGZ1bmN0aW9ucyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBwYXJzZUtleShrZXkpIHtcblxuICAgIHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xuXG4gICAgcmV0dXJuIHBhcnNlQmFzaWNTZWdtZW50cyhzZWdtZW50cyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmFzaWNTZWdtZW50cyhzZWdtZW50cykge1xuXG4gICAgdmFyIGdyb3VwID0gc2VnbWVudHNbMF07XG5cbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBbbnVsbCwgZ3JvdXAsIG51bGxdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbbnVsbCwgZ3JvdXAsIHNlZ21lbnRzWzFdXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3NpdG9yeTsiLCJ2YXIgc3RhdGUgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGhlbHBlcnMgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIENvbnRhaW5lciB7XG5cbiAgICAvLyB1c2UgRXZlbnRFbWl0dGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5iaW5kaW5ncyA9IHt9O1xuICAgICAgICBfLmluc3RhbmNlcyA9IHt9O1xuICAgICAgICAvLyBPYmplY3Qub2JzZXJ2ZShzdGF0ZSh0aGlzKSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBtYWtlKGFic3RyYWN0LCBwYXJhbWV0ZXJzID0gW10pIHtcblxuICAgICAgICAvLyBpZiAoc3RhdGUuaW5zdGFuY2VzW2Fic3RyYWN0XSkgcmV0dXJuIHN0YXRlLmluc3RhbmNlc1thYnN0cmFjdF07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3dhcyBub3QgYW4gaW5zdGFuY2UnKTtcblxuICAgICAgICB2YXIgY29uY3JldGUgPSB0aGlzLmdldENvbmNyZXRlKGFic3RyYWN0KTtcbiAgICAgICAgdmFyIG9iamVjdCAgID0gY29uY3JldGUodGhpcywgLi4ucGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaXNTaGFyZWQoYWJzdHJhY3QpKSB7XG4gICAgICAgIC8vICAgICBzdGF0ZS5pbnN0YW5jZXNbYWJzdHJhY3RdID0gb2JqZWN0O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgYmluZChhYnN0cmFjdCwgY29uY3JldGUgPSBudWxsLCBzaGFyZWQgPSBmYWxzZSkge1xuXG4gICAgICAgIHZhciB0eXBlID0gJ2JpbmQnO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcblxuICAgICAgICBzdGF0ZSh0aGlzKS5iaW5kaW5nc1thYnN0cmFjdF0gPSB7Y29uY3JldGUsIHNoYXJlZH07XG4gICAgICAgIHRoaXMubWFrZUFjY2Vzc29yUHJvcGVydHkoYWJzdHJhY3QpO1xuXG4gICAgICAgIHRoaXMuZW1pdChgYmluZC4ke2Fic3RyYWN0fWAsIFxuICAgICAgICAgICAgbm9Qcm90byh7dHlwZTogYCR7dHlwZX0uJHthYnN0cmFjdH1gLCB0YXJnZXQsIGFic3RyYWN0LCBzaGFyZWR9KVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbWl0KCdiaW5kJywgXG4gICAgICAgICAgICBub1Byb3RvKHt0eXBlLCB0YXJnZXQsIGFic3RyYWN0LCBzaGFyZWR9KVxuICAgICAgICApO1xuICAgIH1cbiAgICBiaW5kU2hhcmVkKGFic3RyYWN0LCBjb25jcmV0ZSwgLi4uYXJncykge1xuXG4gICAgICAgIGlmIChpc0FycmF5KGFic3RyYWN0KSkge1xuICAgICAgICAgICAgZm9yICh2YXIgJGFyZ3Mgb2YgYWJzdHJhY3QpIHRoaXMuYmluZFNoYXJlZCguLi4kYXJncyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIHRoaXMuc2hhcmUoYWJzdHJhY3QsIGNvbmNyZXRlLCAuLi5hcmdzKSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldENvbmNyZXRlKGFic3RyYWN0KSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMpLmJpbmRpbmdzW2Fic3RyYWN0XS5jb25jcmV0ZTtcbiAgICB9XG4gICAgaXNTaGFyZWQoYWJzdHJhY3QpIHtcbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcblxuICAgICAgICBpZiAoXy5pbnN0YW5jZXNbYWJzdHJhY3RdKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBpZiAoXy5iaW5kaW5nc1thYnN0cmFjdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5iaW5kaW5nc1thYnN0cmFjdF0uc2hhcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXRCaW5kaW5ncygpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcykuYmluZGluZ3M7XG4gICAgfVxuICAgIGdldEJpbmRpbmdzS2V5cygpIHtcblxuICAgICAgICByZXR1cm4ga2V5cyh0aGlzLmdldEJpbmRpbmdzKCkpO1xuICAgIH1cbiAgICBuZXdJbnN0YW5jZU9mKGFic3RyYWN0LCBpbnN0YW50aWFibGUsIC4uLmFyZ3MpIHtcblxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIGZ1bmN0aW9uKGFwcCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbnN0YW50aWFibGUoLi4uYXJncyk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgc2luZ2xldG9uKGFic3RyYWN0LCBpbnN0YW50aWFibGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmluZFNoYXJlZChhYnN0cmFjdCwgYXBwID0+IG5ldyBpbnN0YW50aWFibGUoLi4uYXJncykpO1xuICAgIH1cbiAgICBzaGFyZShhYnN0cmFjdCwgZnVuYywgLi4uYXJncykge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG4gICAgICAgIHZhciB7aW5zdGFuY2VzfSA9IF87IFxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICAgICAgICAgIC8vIGlmIChhYnN0cmFjdCA9PT0gJ2ludHJvVmlldycpIGRlYnVnZ2VyO1xuICAgICAgICAgICAgdmFyIG9iaiA9IGluc3RhbmNlc1thYnN0cmFjdF07XG4gICAgICAgICAgICBpZiAob2JqKSByZXR1cm4gb2JqO1xuXG4gICAgICAgICAgICBvYmogPSBmdW5jKGNvbnRhaW5lciwgLi4uYXJncyk7XG4gICAgICAgICAgICBpbnN0YW5jZXNbYWJzdHJhY3RdID0gb2JqO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZm9yZ2V0SW5zdGFuY2UoYWJzdHJhY3QpIHtcblxuICAgICAgICBkZWxldGUgc3RhdGUodGhpcykuaW5zdGFuY2VzW2Fic3RyYWN0XTtcbiAgICB9XG4gICAgbWFrZUFjY2Vzc29yUHJvcGVydHkoYWJzdHJhY3QpIHtcblxuICAgICAgICBpZiAodGhpcy5hYnN0cmFjdCkgcmV0dXJuO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhYnN0cmFjdCwge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiB0aGlzLm1ha2UoYWJzdHJhY3QpLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG5cbiAgICAgICAgY29uc29sZS5kaXIoc3RhdGUpO1xuICAgICAgICAvLyByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIGdldEl0ZW1zKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmluZGluZ3NLZXlzKCk7XG4gICAgfVxuICAgIGZvckVhY2goY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1hcChjYiwgY29udGV4dCkge1xuXG4gICAgICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG4gICAgICAgIC8vIGJlIHN1cmUgdGhpcmQgYXJndW1lbnQgaXMgdGhpcyBjb2xsZWN0aW9uLCBub3QgaXRzIGFycmF5O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpLm1hcCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaWx0ZXIoY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5maWx0ZXIoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SXRlcmF0b3IoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYXJyYXlJdGVyYXRvcih0aGlzLmdldEl0ZW1zKCkpO1xuICAgIH1cbn1cblxudmFyIHtcblxuICAgIGtleXMsIFxuICAgIGltcGxlbWVudEl0ZXJhdG9yLCBcbiAgICBpc1VuZGVmaW5lZCxcbiAgICBpc0RlZmluZWQsXG4gICAgZGVmaW5lZCxcbiAgICBhcnJheUl0ZXJhdG9yLFxuICAgIGV4dGVuZFByb3RvT2YsXG4gICAgbm9Qcm90byxcbiAgICBpc0FycmF5LFxuXG59ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihDb250YWluZXIsIEV2ZW50RW1pdHRlcik7XG5pbXBsZW1lbnRJdGVyYXRvcihDb250YWluZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRhaW5lcjsiLCJ2YXIgU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xuXG5jbGFzcyBXaW5kb3dTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgXHQvLyBzZXBhcmF0ZSBvdXQgdGhpcyBhcyBTaGltbWVkV2luZG93OlxuXG4gICAgICAgIHRoaXMuc2hpbU1hdGNoZXMoZ2xvYmFsKTtcbiAgICBcdHRoaXMuc2hpbVJlcXVlc3RBbmltYXRpb25GcmFtZShnbG9iYWwpO1xuICAgIFx0XG4gICAgICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgICAgIGFwcC5iaW5kU2hhcmVkKCd3aW5kb3cnLCBhcHAgPT4gZ2xvYmFsKTtcbiAgICB9XG4gICAgcHJvdmlkZXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIFsnd2luZG93J107XG4gICAgfVxuICAgIHNoaW1NYXRjaGVzKGdsb2JhbCkge1xuICAgIFx0dmFyIFxuICAgIFx0ICAgIEVsZW1lbnRQcm90byA9IGdsb2JhbC5FbGVtZW50LnByb3RvdHlwZTtcblxuICAgIFx0aWYgKEVsZW1lbnRQcm90by5tYXRjaGVzKSByZXR1cm47XG5cbiAgICBcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gXG4gICAgXHQgICAgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBcbiAgICBcdCAgICAgICAgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBcbiAgICBcdCAgICAgICAgICAgIEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICB9XG4gICAgc2hpbVJlcXVlc3RBbmltYXRpb25GcmFtZShnbG9iYWwpIHtcbiAgICAgICAgLy8gc2VlIGNvbW1lbnRzIGluXG4gICAgICAgIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG4gICAgICAgIC8vIGh0dHA6Ly9jcmVhdGl2ZWpzLmNvbS9yZXNvdXJjZXMvcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgICAgICAoZnVuY3Rpb24gKHdpbmRvdywgckFGLCBjQUYpIHtcbiAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IDAsIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddLCB4O1xuXG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvd1tyQUZdOyArK3gpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbckFGXSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgICAgIHdpbmRvd1tjQUZdID0gd2luZG93W3ZlbmRvcnNbeF0gKyBcbiAgICAgICAgICAgICAgICAgICAgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyBcbiAgICAgICAgICAgICAgICAgICAgICAgICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93W3JBRl0pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdzaGltUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHVzaW5nICcrdmVuZG9yc1t4XSsnIHByZWZpeCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF3aW5kb3dbckFGXSkge1xuICAgICAgICAgICAgICAgIGxvZygnc2hpbVJlcXVlc3RBbmltYXRpb25GcmFtZSB1c2luZyBzZXRUaW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgd2luZG93W3JBRl0gPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXdpbmRvd1tjQUZdKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W2NBRl0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChpZCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfShnbG9iYWwsICdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLCAnY2FuY2VsQW5pbWF0aW9uRnJhbWUnKSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdpbmRvd1NlcnZpY2VQcm92aWRlcjsiLCJcbnZhciBlcnJvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9lcnJvckNvbnN0cnVjdG9yJyk7XG5cbnZhciBBdXRoZW50aWNhdGlvbkVycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignQXV0aGVudGljYXRpb25FcnJvcicsICdubyB3YXkhIGF1dGhlbnRpY2F0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdXRoZW50aWNhdGlvbkVycm9yOyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xudmFyIFZhbGlkYXRpb25FcnJvciAgICAgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5WYWxpZGF0aW9uRXJyb3InKTtcbnZhciBUaW1lb3V0RXJyb3IgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuVGltZW91dEVycm9yJyk7XG52YXIgQXV0aGVudGljYXRpb25FcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLkF1dGhlbnRpY2F0aW9uRXJyb3InKTtcbnZhciBOZXR3b3JrRXJyb3IgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuTmV0d29ya0Vycm9yJyk7XG5cbmNsYXNzIEVycm9yU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIHJlZ2lzdGVyKCkge1xuXG4gICAgICAgIHRoaXMuYXBwLmJpbmRTaGFyZWQoW1xuICAgICAgICAgICAgWydWYWxpZGF0aW9uRXJyb3InLCAgICAgKCkgPT4gVmFsaWRhdGlvbkVycm9yXSxcbiAgICAgICAgICAgIFsnQXV0aGVudGljYXRpb25FcnJvcicsICgpID0+IEF1dGhlbnRpY2F0aW9uRXJyb3JdLFxuICAgICAgICAgICAgWydOZXR3b3JrRXJyb3InLCAgICAgICAgKCkgPT4gTmV0d29ya0Vycm9yXSxcbiAgICAgICAgICAgIFsnVGltZW91dEVycm9yJywgICAgICAgICgpID0+IFRpbWVvdXRFcnJvcl0sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBwcm92aWRlcygpIHtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ1ZhbGlkYXRpb25FcnJvcicsIFxuICAgICAgICAgICAgJ0F1dGhlbnRpY2F0aW9uRXJyb3InLCBcbiAgICAgICAgICAgICdOZXR3b3JrRXJyb3InLCBcbiAgICAgICAgICAgICdUaW1lb3V0RXJyb3InXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVycm9yU2VydmljZVByb3ZpZGVyOyIsIlxuXG52YXIgZXJyb3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vZXJyb3JDb25zdHJ1Y3RvcicpO1xuXG52YXIgTmV0d29ya0Vycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignTmV0d29ya0Vycm9yJywgJ25ldHdvcmsgcHJvYmxlbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5ldHdvcmtFcnJvcjsiLCJcbnZhciBlcnJvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9lcnJvckNvbnN0cnVjdG9yJyk7XG5cbnZhciBUaW1lb3V0RXJyb3IgPSBlcnJvckNvbnN0cnVjdG9yKCdUaW1lb3V0RXJyb3InLCAndGltZW91dCBlcnJvciBoYXBwZW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVvdXRFcnJvcjsiLCJcbnZhciBlcnJvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9lcnJvckNvbnN0cnVjdG9yJyk7XG5cbnZhciBWYWxpZGF0aW9uRXJyb3IgPSBlcnJvckNvbnN0cnVjdG9yKCdWYWxpZGF0aW9uRXJyb3InLCAnbm8gd2F5ISB2YWxpZGF0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWxpZGF0aW9uRXJyb3I7IiwidmFyICRFcnJvciA9IEVycm9yO1xudmFyIHtpc0FycmF5fSA9IEFycmF5O1xudmFyIHtrZXlzLCBkZWZpbmVQcm9wZXJ0aWVzfSA9IE9iamVjdDtcblxuZnVuY3Rpb24gbm9uRW51bShvYmplY3RzKSB7XG5cbiAgICB2YXIgd3JpdGFibGUgPSB0cnVlO1xuICAgIHZhciBlbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgdmFyIGNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cbiAgICBvYmplY3RzID0gaXNBcnJheShvYmplY3RzKSA/IG9iamVjdHMgOiBbb2JqZWN0c107XG4gICAgXG4gICAgcmV0dXJuIG9iamVjdHMucmVkdWNlKChyZXN1bHQsIG9iamVjdCkgPT4ge1xuICAgICAgICB2YXIga2V5ICAgICA9IGtleXMob2JqZWN0KVswXTtcbiAgICAgICAgdmFyIHZhbHVlICAgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB7dmFsdWUsIHdyaXRhYmxlLCBlbnVtZXJhYmxlLCBjb25maWd1cmFibGV9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIGFkZFN0YWNrVG9PYmplY3Qob2JqZWN0LCBDdXN0b21FcnJvcikge1xuXG4gICAgdmFyIHtjYXB0dXJlU3RhY2tUcmFjZX0gPSAkRXJyb3I7XG5cbiAgICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC93aWtpL0phdmFTY3JpcHRTdGFja1RyYWNlQXBpXG4gICAgaWYgKGNhcHR1cmVTdGFja1RyYWNlKSB7Y2FwdHVyZVN0YWNrVHJhY2Uob2JqZWN0LCBDdXN0b21FcnJvcik7fSBcbiAgICBlbHNlIHtvYmplY3Quc3RhY2sgPSAobmV3ICRFcnJvcikuc3RhY2sgfHwgJyc7fVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cbmZ1bmN0aW9uIGVycm9yQ29uc3RydWN0b3IobmFtZSA9ICdDdXN0b21FcnJvcicsIG1lc3NhZ2UgPSAnJykge1xuXG4gICAgY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyAkRXJyb3Ige1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgLy8gc2hvdWxkIG5vdCBjYWxsIHBhcmVudCdzIGNvbnN0cnVjdG9yXG4gICAgICAgICAgICBpZiAobWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydGllcyh0aGlzLCBub25FbnVtKHttZXNzYWdlfSkpOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFN0YWNrVG9PYmplY3QodGhpcywgQ3VzdG9tRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydGllcyhDdXN0b21FcnJvci5wcm90b3R5cGUsIG5vbkVudW0oW3tuYW1lfSwge21lc3NhZ2V9XSkpO1xuICAgIHJldHVybiBDdXN0b21FcnJvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcnJvckNvbnN0cnVjdG9yOyIsIlxuLy8gdmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciB7RXZlbnRFbWl0dGVyMn0gPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJyk7XG52YXIgey8qZXh0ZW5kUHJvdG9PZiwgKi9pc1N0cmluZ30gPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBEaXNwYXRjaGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyMiB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYXBwXyA9IG9wdGlvbnMuYXBwO1xuICAgICAgICBFdmVudEVtaXR0ZXIyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIgPSByZXNvbHZlU3Vic2NyaWJlci5jYWxsKHRoaXMpO1xuICAgICAgICBzdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzKTtcbiAgICB9XG59XG4vLyBleHRlbmRQcm90b09mKERpc3BhdGNoZXIsIEV2ZW50RW1pdHRlcik7XG5cbmZ1bmN0aW9uIHJlc29sdmVTdWJzY3JpYmVyKHN1YnNjcmliZXIpIHtcblxuICAgIGlmIChpc1N0cmluZyhzdWJzY3JpYmVyKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBfW3N1YnNjcmliZXJdO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic2NyaWJlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyOyAiLCJ2YXIgQ29udGFpbmVyICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Db250YWluZXIvQ29udGFpbmVyJyk7XG52YXIgQ29uZmlnICAgICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Db25maWcvUmVwb3NpdG9yeScpO1xudmFyIE1vZHVsZUxvYWRlciAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvQ29uZmlnL01vZHVsZUxvYWRlcicpO1xudmFyIERpc3BhdGNoZXIgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvRXZlbnRzL0Rpc3BhdGNoZXInKTtcbnZhciBzdGFydCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0ZvdW5kYXRpb24vc3RhcnQnKTtcbnZhciBQcm92aWRlclJlcG9zaXRvcnkgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0ZvdW5kYXRpb24vUHJvdmlkZXJSZXBvc2l0b3J5Jyk7XG52YXIgQ29tbWFuZGVyVHJhaXQgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZGVyVHJhaXQnKTtcbnZhciBoZWxwZXJzICAgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L1N1cHBvcnQvaGVscGVycycpO1xuXG52YXIgY29uZmlnICAgICAgID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vY29uZmlnL2NvbmZpZycpO1xudmFyIHt2YWx1ZX0gICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG52YXIgc3RhdGUgICAgICAgID0ge307XG5cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29udGFpbmVyIHtcblxuICAgIGRldGVjdEVudmlyb25tZW50KGVudikge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZS5lbnYgPSB2YWx1ZShlbnYpO1xuICAgIH1cbiAgICBpc0xvY2FsKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVudmlyb25tZW50KCdsb2NhbCcpO1xuICAgIH1cbiAgICBlbnZpcm9ubWVudCguLi5hcmdzKSB7XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5pbmRleE9mKHN0YXRlLmVudikgIT09IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmVudjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDb25maWdMb2FkZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBNb2R1bGVMb2FkZXIoY29uZmlnKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJDb3JlQ29udGFpbmVyQmluZGluZ3MoKSB7XG5cbiAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgIHZhciBjb25maWdMb2FkZXIgPSBhcHAuZ2V0Q29uZmlnTG9hZGVyKCk7XG4gICAgICAgIHZhciBlbnZpcm9ubWVudCAgPSBhcHAuZW52aXJvbm1lbnQoKTtcblxuICAgICAgICB2YXIgZGlzcGF0Y2hlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhcHAsXG4gICAgICAgICAgICBuZXdMaXN0ZW5lcjogdHJ1ZSxcbiAgICAgICAgICAgIHdpbGRjYXJkOiB0cnVlLFxuICAgICAgICB9XG5cbiAgICAgICAgYXBwLmJpbmRTaGFyZWQoW1xuICAgICAgICAgICAgWydjb25maWcnLCBhcHAgPT4gbmV3IENvbmZpZyhjb25maWdMb2FkZXIsIGVudmlyb25tZW50KV0sXG4gICAgICAgICAgICBbJ2V2ZW50cycsIGFwcCA9PiBuZXcgRGlzcGF0Y2hlcihkaXNwYXRjaGVyT3B0aW9ucyldLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgZ2V0UHJvdmlkZXJSZXBvc2l0b3J5KCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvdmlkZXJSZXBvc2l0b3J5KCk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBsb2coJzo6YXBwIHN0YXJ0aW5nIScpO1xuICAgICAgICBzdGFydC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIGxvZyhgI3J1biBGb3VuZGF0aW9uIEFwcGxpY2F0aW9uYCk7XG4gICAgICAgIGxvZygnOjphcHAgcnVubmluZzIhJyk7XG4gICAgfVxuICAgIHJlZ2lzdGVyKHByb3ZpZGVyKSB7XG5cbiAgICAgICAgcHJvdmlkZXIucmVnaXN0ZXIoKTtcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgIH1cbn1cblxudmFyIHtleHRlbmRQcm90b09mLCBsb2d9ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihBcHBsaWNhdGlvbiwgQ29tbWFuZGVyVHJhaXQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyIsIlxuY2xhc3MgUHJvdmlkZXJSZXBvc2l0b3J5IHtcblxuICAgIGxvYWQoYXBwLCBwcm92aWRlcnMpIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIHByb3ZpZGVyIG9mIHByb3ZpZGVycykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhcHAucmVnaXN0ZXIodGhpcy5jcmVhdGVQcm92aWRlcihhcHAsIHByb3ZpZGVyKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlUHJvdmlkZXIoYXBwLCBwcm92aWRlcikge1xuXG4gICAgICAgIHJldHVybiBuZXcgcHJvdmlkZXIoYXBwKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm92aWRlclJlcG9zaXRvcnk7IiwidmFyIENvbmZpZyA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29uZmlnLlJlcG9zaXRvcnknKTtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgICB2YXIgYXBwICAgID0gdGhpcztcbiAgICB2YXIgZW52ICAgID0gYXBwLmVudmlyb25tZW50KCk7XG5cbiAgICBhcHAuYmluZFNoYXJlZCgnYXBwJywgKCkgPT4gYXBwKTtcbiAgICBhcHAucmVnaXN0ZXJDb3JlQ29udGFpbmVyQmluZGluZ3MoKTtcblxuICAgIHZhciB7Y29uZmlnfSA9IGFwcDtcbiAgICB2YXIge3Byb3ZpZGVyc30gPSBjb25maWcuZ2V0KCdhcHAnKTtcbiAgICBcbiAgICBhcHAuZ2V0UHJvdmlkZXJSZXBvc2l0b3J5KCkubG9hZChhcHAsIHByb3ZpZGVycyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnQ7IiwidmFyIFRpbWVvdXRFcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLlRpbWVvdXRFcnJvcicpO1xudmFyIE5ldHdvcmtFcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLk5ldHdvcmtFcnJvcicpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBYSFJMb2FkZXIge1xuXG4gICAgY29uc3RydWN0b3IoWE1MSHR0cFJlcXVlc3QpIHtcblxuICAgICAgICB0aGlzLlhocl8gPSBYTUxIdHRwUmVxdWVzdCB8fCBnbG9iYWwuWE1MSHR0cFJlcXVlc3Q7XG4gICAgfVxuICAgIHNlbmQobWV0aG9kLCB7dXJsLCB0aW1lb3V0ID0gNTAwMCwgaGVhZGVycyA9IHt9LCByZXNwb25zZVR5cGUgPSAnanNvbid9KSB7XG4gICAgICAgIGxvZyhgOjogeGhybG9hZGVyLnNlbmRgKTtcbiAgICAgICAgdmFyIHhociA9IG5ldyB0aGlzLlhocl8oKTtcblxuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgICAgICAgbG9nKGA6OiB4aHJsb2FkZXIuc2VuZC1wcm9taXNlYCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW50cmllcyhoZWFkZXJzKS5mb3JFYWNoKGVudHJ5ID0+IHhoci5zZXRSZXF1ZXN0SGVhZGVyKC4uLmVudHJ5KSk7XG5cbiAgICAgICAgICAgIGxvZyhgOjogeGhybG9hZGVyLnhoci1iZWZvcmUtZWFzc2lnbmApO1xuXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHJlc3BvbnNlVHlwZSBicmVha3MgYW5kcm9pZCBhdCBsZWFzdCA8PSA0LjNcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXNzaWduKHhociwge1xuICAgICAgICAgICAgICAgIHJlc29sdmUsIHJlamVjdCxcbiAgICAgICAgICAgICAgICAvKnJlc3BvbnNlVHlwZSwqLyB0aW1lb3V0LCBcbiAgICAgICAgICAgICAgICBvbmxvYWQ6IG9ubG9hZC5iaW5kKHRoaXMpLCBcbiAgICAgICAgICAgICAgICBvbnRpbWVvdXQ6IG9udGltZW91dC5iaW5kKHRoaXMpLCBcbiAgICAgICAgICAgICAgICBvbmVycm9yOiBvbmVycm9yLmJpbmQodGhpcyksIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuIFxuICAgICAgICBwcm9taXNlLmNhbmNlbCA9IHhoci5hYm9ydC5iaW5kKHhocik7XG5cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIGdldCguLi5hcmdzKSB7XG4gICAgICAgIGxvZyhgOjogeGhybG9hZGVyLmdldGApO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKCdHRVQnLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9ubG9hZCh7dGFyZ2V0OiB4aHJ9KSB7XG4gICAgXG4gICAgdmFyIHtyZXNwb25zZSwgc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNvbHZlfSA9IHhocjtcblxuICAgIHZhciB3YW50c0pzb24gPSBcbiAgICAgICAgKHhoci5yZXNwb25zZVR5cGUgID09PSAnanNvbicpICB8fCBcbiAgICAgICAgKHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbicpO1xuXG4gICAgaWYgKGlzU3RyaW5nKHJlc3BvbnNlKSAmJiB3YW50c0pzb24pIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG5cbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbn1cbmZ1bmN0aW9uIG9udGltZW91dCh7dGFyZ2V0OiB7cmVqZWN0fX0pIHtcblxuICAgIHZhciB0aW1lb3V0RXJyb3IgPSBuZXcgVGltZW91dEVycm9yKCk7XG4gICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG59XG5mdW5jdGlvbiBvbmVycm9yKHt0YXJnZXQ6IHhocn0pIHtcbiAgICBcbiAgICB2YXIge3Jlc3BvbnNlLCBzdGF0dXMsIHJlamVjdH0gPSB4aHI7XG5cbiAgICAvLyBjdWUgb2Ygc3RhdHVzIG51bWJlciwgYW5kIG1lc3NhZ2Ugb24gcmVzcG9uc2VcblxuICAgIHZhciBuZXR3b3JrRXJyb3IgPSBuZXcgTmV0d29ya0Vycm9yKCk7XG4gICAgcmVqZWN0KG5ldHdvcmtFcnJvcik7XG59XG5cbnZhciB7bG9nLCBlcnJvciwgaXNTdHJpbmcsIGFzc2lnbiwgZW50cmllc30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUkxvYWRlcjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgQ29uc29sZUxvZ2dlciAvKmltcGxlbWVudHMgJ1dpbGRjYXQuQ29udHJhY3RzLkxvZycqLyB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkd2luZG93ID0gZ2xvYmFsKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8ud2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgXy5jb25zb2xlID0gJHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgICBsb2coLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUubG9nKC4uLmFyZ3MpXG4gICAgfVxuICAgIGVycm9yKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdGF0ZSh0aGlzKS5jb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBkaXIoLi4uYXJncykge1xuXG4gICAgICAgIHN0YXRlKHRoaXMpLmNvbnNvbGUuZGlyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBnZXQgc3RhdGVfKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25zb2xlTG9nZ2VyOyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29uc29sZUxvZ2dlciAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2cuQ29uc29sZUxvZ2dlcicpO1xuXG5jbGFzcyBMb2dTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuIFxuICAgIHJlZ2lzdGVyKCkge1xuXG4gICAgICAgIHRoaXMuYXBwLnNpbmdsZXRvbignbG9nZ2VyJywgQ29uc29sZUxvZ2dlcik7XG4gICAgfVxuICAgIHByb3ZpZGVzKCkge1xuXG4gICAgICAgIHJldHVybiBbJ2xvZyddO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dTZXJ2aWNlUHJvdmlkZXI7IiwiLy8gQ29sbGVjdGlvbi5qc1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG5jbGFzcyBDb2xsZWN0aW9uIHtcblxuXHRjb25zdHJ1Y3RvcihpdGVtcykge1xuXG5cdFx0aWYgKCAhIGlzQXJyYXkoaXRlbXMpKSB7XG5cblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbGxlY3Rpb24gb2JqZWN0IG11c3QgYmUgY3JlYXRlZCB3aXRoIGFuIGFycmF5Jyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pdGVtc18gPSBpdGVtcztcblx0XHRcblx0fVxuXHRnZXRJdGVtcygpIHtcblxuXHRcdHJldHVybiB0aGlzLml0ZW1zXztcblx0fVxuXHRmb3JFYWNoKGNiLCBjb250ZXh0KSB7XG5cblx0ICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG5cdCAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcblx0ICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuXHQgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuXHQgICAgfSk7XG5cdH1cblx0ZmlsdGVyKGNiLCBjb250ZXh0KSB7XG5cblx0ICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG5cdCAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcblx0ICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZmlsdGVyKCh2YWx1ZSwga2V5KSA9PiB7XG5cdCAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG5cdCAgICB9KTtcblx0fVxuXHRtYXAoY2IsIGNvbnRleHQpIHtcblxuXHQgICAgY29udGV4dCA9IGRlZmluZWQoY29udGV4dCwgdGhpcyk7XG5cblx0ICAgIC8vIGJlIHN1cmUgdGhpcmQgYXJndW1lbnQgaXMgdGhpcyBjb2xsZWN0aW9uLCBub3QgaXRzIGFycmF5O1xuXHQgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5tYXAoKHZhbHVlLCBrZXkpID0+IHtcblx0ICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcblx0ICAgIH0pO1xuXHR9XG5cdHRvSnNvbigpIHtcblxuXHRcdHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoaXRlbXMpO1xuXHR9XG5cdGdldCBsZW5ndGgoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5pdGVtc18ubGVuZ3RoO1xuXHR9XG59XG5cbnZhciB7aXNBcnJheSwgZGVmaW5lZH0gPSBoZWxwZXJzO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcywge30pO1xuICAgICAgICBfLmFwcCA9IGFwcDtcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBhYnN0cmFjdFxuICAgIH1cbiAgICBnZXQgYXBwKCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5hcHA7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VQcm92aWRlcjsiLCJcbnZhciAkY29uc29sZSAgICA9IGdsb2JhbC5jb25zb2xlO1xudmFyIHNldFRpbWVvdXQgPSBnbG9iYWwuc2V0VGltZW91dDtcbnZhciBjbGVhclRpbWVvdXQgPSBnbG9iYWwuY2xlYXJUaW1lb3V0O1xuXG4vLyBPYmplY3RcbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgb2JqZWN0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICAgIH0pOyBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KTtcbn1cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QgPSB7fSkge1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIG9iamVjdC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4ga2V5cyhvYmplY3QpLm1hcChrZXkgPT4gb2JqZWN0W2tleV0pO1xufVxuZnVuY3Rpb24gZW50cmllcyhvYmplY3QgPSB7fSkge1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIG9iamVjdC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cyhvYmplY3QpLm1hcChrZXkgPT4gW2tleSwgb2JqZWN0W2tleV1dKTtcbn1cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblxuICAgIHZhciBzb3VyY2UsIHRlbXAsIHByb3BzLCBwcm9wO1xuXG4gICAgZm9yIChzb3VyY2Ugb2Ygc291cmNlcykge1xuXG4gICAgICAgIGlmICggaXNBcnJheShzb3VyY2UpICkge1xuXG4gICAgICAgICAgICB0ZW1wID0ge307XG4gICAgICAgICAgICBbc291cmNlLCAuLi5wcm9wc10gPSBzb3VyY2U7XG4gICAgICAgICAgICBmb3IgKHByb3Agb2YgcHJvcHMpIHRlbXBbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICBhc3NpZ24odGFyZ2V0LCB0ZW1wKTtcblxuICAgICAgICB9IGVsc2UgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG5cbiAgICAvLyByZXR1cm4gT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gZXh0ZW5kUHJvdG9PZih0YXJnZXQsIHNvdXJjZSwga2V5ID0gW10pIHtcblxuICAgIGlmIChpc1N0cmluZyhrZXkpKSB7XG4gICAgICAgIHRhcmdldC5wcm90b3R5cGVba2V5XSA9IHNvdXJjZS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc291cmNlS2V5cyA9IGtleXMoc291cmNlLnByb3RvdHlwZSk7XG4gICAgZm9yICh2YXIga2V5IG9mIHNvdXJjZUtleXMpIHtcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZVtrZXldID0gc291cmNlLnByb3RvdHlwZVtrZXldOyAgIFxuICAgIH1cbn1cbmZ1bmN0aW9uIGltcGxlbWVudEl0ZXJhdG9yKHNvdXJjZUNsYXNzKSB7XG5cbiAgICB2YXIgJHByb3RvdHlwZSA9IHNvdXJjZUNsYXNzLnByb3RvdHlwZTtcbiAgICAkcHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSAkcHJvdG90eXBlLmdldEl0ZXJhdG9yO1xufVxuZnVuY3Rpb24gdmFsdWUodmFsKSB7XG5cbiAgICByZXR1cm4gKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpID8gdmFsKCkgOiB2YWw7XG59XG5mdW5jdGlvbiBpc051bGwodmFsKSB7XG5cbiAgICByZXR1cm4gdmFsID09PSBudWxsO1xufVxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblxuICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzRGVmaW5lZCh2YWwpIHtcblxuICAgIHJldHVybiAoICEgaXNVbmRlZmluZWQodmFsKSk7XG59XG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cbmZ1bmN0aW9uIGRlZmluZWQodmFsLCAkZGVmYXVsdCkge1xuXG4gICAgcmV0dXJuIGlzRGVmaW5lZCh2YWwpID8gdmFsIDogJGRlZmF1bHQ7XG59XG5mdW5jdGlvbiB3YWl0KHRpbWUgPSA1MDAsIC4uLmFyZ3MpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoLi4uYXJncyk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblxuICAgIHZhciB7ZG9jdW1lbnR9ID0gZ2xvYmFsO1xuXG4gICAgaWYgKFxuICAgICAgICAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSAmJiBcbiAgICAgICAgKGFyZ3NbMF0uc3RhcnRzV2l0aCgnOjonKSkgJiZcbiAgICAgICAgKGRvY3VtZW50KVxuICAgICkge1xuICAgICAgICB2YXIge2JvZHl9ICAgPSBkb2N1bWVudDtcbiAgICAgICAgdmFyIG91dHB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3V0cHV0LmxvZycpO1xuXG4gICAgICAgIGlmICggISBvdXRwdXRFbCkge1xuICAgICAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPG91dHB1dCBjbGFzcz1sb2cgLz4nKTtcbiAgICAgICAgICAgIG91dHB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3V0cHV0LmxvZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0RWxcbiAgICAgICAgICAgIC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8cD4ke2FyZ3NbMF19PC9wPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkaXIoLi4uYXJncykge1xuXG4gICAgJGNvbnNvbGUuZGlyKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gZXJyb3IoLi4uYXJncykge1xuXG4gICAgJGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XG59XG5mdW5jdGlvbiB3YXJuKC4uLmFyZ3MpIHtcbiAgICBcbiAgICAkY29uc29sZS53YXJuKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gc3Bhd24obWFrZUdlbmVyYXRvcikge1xuXG4gICAgdmFyIHByb21pc2UgPSBhc3luYyhtYWtlR2VuZXJhdG9yKTtcblxuICAgIHByb21pc2UoKS50aGVuKGxvZywgdGVybWluYXRlRXJyb3IpO1xufVxuZnVuY3Rpb24gYXN5bmMobWFrZUdlbmVyYXRvcikge1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRQcm9taXNlID0gUHJvbWlzZTtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IG1ha2VHZW5lcmF0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGUocmVzdWx0KSB7XG5cbiAgICAgICAgICAgIHZhciBkb25lICA9IHJlc3VsdC5kb25lO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuICRQcm9taXNlLnJlc29sdmUodmFsdWUpOyBcblxuICAgICAgICAgICAgcmV0dXJuICRQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yLm5leHQocmVzKSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShnZW5lcmF0b3IudGhyb3coZXJyKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KCkpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgcmV0dXJuICRQcm9taXNlLnJlamVjdChleCk7XG4gICAgICAgIH1cbiAgICB9OyAgXG59XG5mdW5jdGlvbiBhc3luY01ldGhvZHMob2JqZWN0LCAuLi5tZXRob2RzKSB7XG5cbiAgICBmb3IgKHZhciBtZXRob2Qgb2YgbWV0aG9kcykge1xuXG4gICAgICAgIG9iamVjdFttZXRob2RdID0gYXN5bmMob2JqZWN0W21ldGhvZF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFycmF5SXRlcmF0b3IoaXRlbXMgPSBbXSkge1xuICAgIFxuICAgIHZhciBpICAgICA9IDA7XG4gICAgdmFyIGxlbiAgID0gaXRlbXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSwgbm90RG9uZTtcbiAgICAgICAgICAgIGlmIChub3REb25lID0gaSA8IGxlbikgdmFsdWUgPSBpdGVtc1tpKytdO1xuICAgICAgICAgICAgcmV0dXJuIHt2YWx1ZSwgZG9uZTogIW5vdERvbmV9O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG5vUHJvdG8oc291cmNlID0ge30pIHtcblxuICAgIHZhciBlbXB0eSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgT2JqZWN0LmFzc2lnbihlbXB0eSwgc291cmNlKTtcbiAgICByZXR1cm4gZW1wdHk7XG59XG5mdW5jdGlvbiB0ZXJtaW5hdGVFcnJvcihlcnJvcikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdhcm4oYGZyb20gW3RlcmltYXRlRXJyb3JdOmApO1xuICAgICAgICB3YXJuKGVycm9yLnN0YWNrKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7ICAgIFxuICAgIH0sIDApO1xufVxuZnVuY3Rpb24gbWFwRnJvbShvYmplY3QgPSB7fSkge1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkgcmV0dXJuIG9iamVjdDtcblxuICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgdmFyIG9iamVjdEtleXMgPSBrZXlzKG9iamVjdCk7XG5cbiAgICByZXR1cm4gb2JqZWN0S2V5cy5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH0sIG1hcCk7XG59XG5mdW5jdGlvbiB1Y2ZpcnN0KHN0cikge1xuXG4gIHZhciBmID0gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gZiArIHN0ci5zdWJzdHIoMSk7XG59XG5mdW5jdGlvbiBmaXJzdChhcnJheSkge1xuXG4gICAgcmV0dXJuIGFycmF5WzBdO1xufVxuZnVuY3Rpb24gbGFzdChhcnJheSkge1xuXG4gICAgdmFyIGxlbmd0aCAgICA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gYXJyYXlbbGFzdEluZGV4XTtcbn1cbmZ1bmN0aW9uIGxhc3RTZWdtZW50KGFycmF5KSB7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBhcnJheS5zcGxpdCgnLicpO1xuICAgIHJldHVybiBsYXN0KHNlZ21lbnRzKTtcbn1cblxuLy8gd2luZG93IGhlbHBlcnNcbmZ1bmN0aW9uIG5leHRGcmFtZSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKTtcbiAgICB9KTtcbn1cblxudmFyIGhlbHBlcnMgPSB7XG4gICAga2V5cyxcbiAgICB2YWx1ZXMsXG4gICAgZW50cmllcyxcbiAgICBhc3NpZ24sXG4gICAgZXh0ZW5kUHJvdG9PZixcbiAgICBpbXBsZW1lbnRJdGVyYXRvcixcbiAgICB2YWx1ZSxcbiAgICBpc051bGwsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNGdW5jdGlvbixcbiAgICBpc1VuZGVmaW5lZCxcbiAgICBpc0RlZmluZWQsXG4gICAgaXNBcnJheSxcbiAgICBkZWZpbmVkLFxuICAgIHdhaXQsXG4gICAgbG9nLFxuICAgIGRpcixcbiAgICBlcnJvcixcbiAgICB3YXJuLFxuICAgIHNwYXduLFxuICAgIGFzeW5jLFxuICAgIGFzeW5jTWV0aG9kcyxcbiAgICBhcnJheUl0ZXJhdG9yLFxuICAgIG5vUHJvdG8sXG4gICAgdGVybWluYXRlRXJyb3IsXG4gICAgbWFwRnJvbSxcbiAgICB1Y2ZpcnN0LFxuICAgIGZpcnN0LFxuICAgIGxhc3QsXG4gICAgbGFzdFNlZ21lbnQsXG4gICAgc2V0VGltZW91dCxcbiAgICBjbGVhclRpbWVvdXQsXG5cbiAgICBuZXh0RnJhbWUsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcnM7IiwidmFyIG9ic2VydmVKcyA9IHJlcXVpcmUoJ29ic2VydmUtanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgT2JzZXJ2ZXIgICAgICAgICA6IGdsb2JhbC5PYnNlcnZlcixcbiAgICBBcnJheU9ic2VydmVyICAgIDogZ2xvYmFsLkFycmF5T2JzZXJ2ZXIsXG4gICAgQXJyYXlTcGxpY2UgICAgICA6IGdsb2JhbC5BcnJheVNwbGljZSxcbiAgICBPYmplY3RPYnNlcnZlciAgIDogZ2xvYmFsLk9iamVjdE9ic2VydmVyLFxuICAgIFBhdGhPYnNlcnZlciAgICAgOiBnbG9iYWwuUGF0aE9ic2VydmVyLFxuICAgIENvbXBvdW5kT2JzZXJ2ZXIgOiBnbG9iYWwuQ29tcG91bmRPYnNlcnZlcixcbiAgICBQYXRoICAgICAgICAgICAgIDogZ2xvYmFsLlBhdGgsXG4gICAgT2JzZXJ2ZXJUcmFuc2Zvcm06IGdsb2JhbC5PYnNlcnZlclRyYW5zZm9ybSxcbiAgICBQbGF0Zm9ybSAgICAgICAgIDogZ2xvYmFsLlBsYXRmb3JtLFxufTsiLCJ2YXIge2lzVW5kZWZpbmVkLCBsb2csIG5vUHJvdG8sIGlzU3RyaW5nfSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG52YXIgb2JzZXJ2ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5vYnNlcnZlJyk7XG52YXIge09iamVjdE9ic2VydmVyLCBQbGF0Zm9ybX0gPSBvYnNlcnZlO1xuXG52YXIgTWFwQ29uc3RydWN0b3IgPSBnbG9iYWwuV2Vha01hcCB8fCBnbG9iYWwuTWFwO1xudmFyIG1hcCA9IG5ldyBNYXBDb25zdHJ1Y3RvcigpO1xuXG4vLyBsb2coYHN1cHBvcnRzICR7TWFwQ29uc3RydWN0b3IubmFtZX1gKTtcblxuZnVuY3Rpb24gc3RhdGUodGhpc0FyZywgdmFsLCBjYnMsIHF1aWV0ID0gZmFsc2UpIHtcblxuICAgIC8vIGlmIG5vdCB2YWx1ZSwgYXNzdW1lIGEgZ2V0dGVyIGZvciBlbnRpcmUgc3RhdGUgb2JqZWN0O1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gbWFwLmdldCh0aGlzQXJnKTtcblxuICAgIC8vIGlmIHNlY29uZCBhcmd1bWVudCBpcyBhIHN0clxuICAgIGlmIChpc1N0cmluZyh2YWwpKSB7XG4gICAgICAgIHNldFN0YXRlLmNhbGwodGhpc0FyZywgdmFsLCBjYnMsIHF1aWV0KTtcbiAgICAgICAgcmV0dXJuIHRoaXNBcmc7XG4gICAgfVxuICAgIFxuICAgIHZhciBfID0gc2V0U3RhdGVPYmplY3QuY2FsbCh0aGlzQXJnLCB2YWwpO1xuXG4gICAgaWYgKGNicykgYmluZE9ic2VydmFibGUuY2FsbCh0aGlzQXJnLCBfLCBjYnMpO1xuXG4gICAgcmV0dXJuIF87XG59XG5mdW5jdGlvbiBzZXRTdGF0ZShrZXksIHZhbHVlLCBxdWlldCkge1xuXG4gICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICBfW2tleV0gPSB2YWx1ZTtcbiAgICBpZiAocXVpZXQpIF8ub2JzZXJ2ZXJfLmRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgUGxhdGZvcm0ucGVyZm9ybU1pY3JvdGFza0NoZWNrcG9pbnQoKTtcbn1cbmZ1bmN0aW9uIHNldFN0YXRlT2JqZWN0KHZhbCkge1xuXG4gICAgbWFwLnNldCh0aGlzLCB2YWwpO1xuICAgIHJldHVybiBtYXAuZ2V0KHRoaXMpO1xufVxuZnVuY3Rpb24gYmluZE9ic2VydmFibGUoXywgY2JzKSB7XG5cbiAgICBfLm9ic2VydmVyXyA9IG5ldyBPYmplY3RPYnNlcnZlcihfKTtcbiAgICBfLm9ic2VydmVyXy5vcGVuKG9uT2JzZXJ2ZS5iaW5kKHRoaXMsIHtfLCBjYnN9KSk7XG59XG5mdW5jdGlvbiBvbk9ic2VydmUoe18sIGNic30sIGFkZGVkLCByZW1vdmVkLCBjaGFuZ2VkLCBnZXRPbGRWYWx1ZUZuKSB7XG5cbiAgICB2YXIgb2JzZXJ2ZWQgPSB7YWRkZWQsIHJlbW92ZWQsIGNoYW5nZWQsIF8sIGNicywgZ2V0T2xkVmFsdWVGbn07XG4gICAgaW52b2tlT2JzZXJ2YWJsZXMuY2FsbCh0aGlzLCBvYnNlcnZlZCk7XG59XG5mdW5jdGlvbiBpbnZva2VPYnNlcnZhYmxlcyhvYnNlcnZlZCkge1xuXG4gICAgWydhZGRlZCcsICdyZW1vdmVkJywgJ2NoYW5nZWQnXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICB2YXIgaGFzQ2FsbGJhY2sgPSAodHlwZW9mIG9ic2VydmVkLmNic1t0eXBlXSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgIHZhciBpc05vdEVtcHR5ICA9IE9iamVjdC5rZXlzKG9ic2VydmVkW3R5cGVdKS5sZW5ndGggPiAwO1xuXG4gICAgICAgIGlmIChoYXNDYWxsYmFjayAmJiBpc05vdEVtcHR5KSBpbnZva2UuY2FsbCh0aGlzLCBvYnNlcnZlZCwgdHlwZSk7IFxuICAgIH0pO1xufVxuZnVuY3Rpb24gaW52b2tlKG9ic2VydmVkLCB0eXBlKSB7XG5cbiAgICB2YXIgY2FsbGJhY2sgPSBvYnNlcnZlZC5jYnNbdHlwZV07XG4gICAgdmFyIG5hbWVzICAgID0gT2JqZWN0LmtleXMob2JzZXJ2ZWRbdHlwZV0pO1xuXG4gICAgdmFyIHBheWxvYWQgPSBuYW1lcy5tYXAobmFtZSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIG5vUHJvdG8oe1xuICAgICAgICAgICAgbmFtZSAgICA6IG5hbWUsXG4gICAgICAgICAgICB0eXBlICAgIDogdHlwZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBvYnNlcnZlZC5fW25hbWVdLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmVkLmdldE9sZFZhbHVlRm4obmFtZSksXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY2FsbGJhY2suY2FsbCh0aGlzLCBwYXlsb2FkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZTsiLCJ2YXIgc3RhdGUgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xudmFyIG9ic2VydmUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQub2JzZXJ2ZScpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIENvbW1hbmRlclRyYWl0ID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZGVyVHJhaXQnKTtcbnZhciBFdmVudExpc3RlbmVyICA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudExpc3RlbmVyJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuLy8gdmFyIEhhbmRsZWJhcnMgICA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbnZhciB7UGF0aE9ic2VydmVyLCBQbGF0Zm9ybX0gPSBvYnNlcnZlO1xuXG4vKmFic3RyYWN0Ki8gY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50TGlzdGVuZXIge1xuXG4gICAgLy8gdXNlIENvbW1hbmRUcmFpdFxuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICBzdGF0ZSh0aGlzLCB7fSwge2NoYW5nZWQsIGFkZGVkfSk7XG4gICAgfVxuICAgIGJpbmRFdmVudHMob3B0cyA9ICdzdGFuZGFyZCcpIHtcblxuICAgICAgICBpZiAob3B0cyA9PT0gJ3N0YW5kYXJkJykge1xuXG4gICAgICAgICAgICB2YXIge2VsfSAgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGVsT24gID0gZWwuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKGVsKTtcbiAgICAgICAgICAgIHZhciBpbnNPbiA9IHRoaXMub24uYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgZWxPbigndG91Y2hzdGFydCcsICAgICAgdGhpcy5vblRvdWNoc3RhcnQuYmluZCh0aGlzLCAnW2RhdGEtY2xpY2tdJykpO1xuICAgICAgICAgICAgZWxPbigndG91Y2htb3ZlJywgICAgICAgdGhpcy5vblRvdWNobW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGVsT24oJ3RvdWNoZW5kJywgICAgICAgIHRoaXMub25Ub3VjaGVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGVsT24oJ2NsaWNrJywgICAgICAgICAgIHRoaXMub25DbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgaW5zT24oJ2hpZ2hsaWdodHN0YXJ0JywgdGhpcy5vbkhpZ2hsaWdodHN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgaW5zT24oJ2hpZ2hsaWdodGVuZCcsICAgdGhpcy5vbkhpZ2hsaWdodGVuZC5iaW5kKHRoaXMpKTsgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RGVzaXJlZFRhcmdldChub2RlKSB7XG5cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcygnW2RhdGEtY2xpY2tdIConKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5jZXN0b3JPZihub2RlLCAnW2RhdGEtY2xpY2tdJyk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIG9uQ2xpY2soZSkge1xuXG4gICAgICAgIGlmICh0aGlzLmNsaWNrZWRPblRvdWNoKGUpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuZ2V0RGVzaXJlZFRhcmdldChlLnRhcmdldCk7XG4gICAgICAgIHZhciBtZXRob2QgPSB0YXJnZXQuZGF0YXNldC5jbGljaztcblxuICAgICAgICBpZiAoaXNEZWZpbmVkKG1ldGhvZCkpIHtcblxuICAgICAgICAgICAgbWV0aG9kID0gJ29uQ2xpY2snICsgdWNmaXJzdChtZXRob2QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpc1ttZXRob2RdKSB7IHRoaXNbbWV0aG9kXSh0YXJnZXQpOyB9IFxuICAgICAgICAgICAgZWxzZSB7IHRocm93IG5ldyBFcnJvcihgJHttZXRob2R9IGRvZXMgbm90IGV4aXN0YCk7IH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRvdWNoc3RhcnQoc2VsZWN0b3JzLCBlKSB7XG4gICAgICAgIC8vIGVtaXQgaGlnaGxpZ2h0IGV2ZW4gcmlnaHQgYXdheSAob3IgYWZ0ZXIgZGVsYXkgaWYgc2Nyb2xsYWJsZSlcbiAgICAgICAgLy8gYW5kIHNldCBpbnMudG91Y2hzdGFydEVsIHRvIHRhcmdldFxuXG4gICAgICAgIHZhclxuICAgICAgICAgICAgaW5zID0gdGhpcyxcbiAgICAgICAgICAgIHdpbmRvdyA9IGlucy5hcHAud2luZG93LFxuICAgICAgICAgICAgdGFyZ2V0ID0gaW5zLmdldERlc2lyZWRUYXJnZXQoZS50YXJnZXQpLFxuICAgICAgICAgICAgdGFyZ2V0SXNTY3JvbGxhYmxlID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJyksXG4gICAgICAgICAgICBlbWl0SGlnaGxpZ2h0ID0gaW5zLmVtaXQuYmluZChpbnMsICdoaWdobGlnaHRzdGFydCcsIHt0YXJnZXQ6IHRhcmdldH0pLFxuICAgICAgICAgICAgZGVsYXkgPSA1MCxcbiAgICAgICAgICAgIGVtaXRIaWdobGlnaHRBZnRlckRlbGF5ID0gc2V0VGltZW91dC5iaW5kKHdpbmRvdywgZW1pdEhpZ2hsaWdodCwgZGVsYXkpO1xuXG4gICAgICAgIGlmICh0YXJnZXQubWF0Y2hlcyhzZWxlY3RvcnMpKSB7XG4gICAgICAgICAgICBpbnMudG91Y2hzdGFydEVsID0gdGFyZ2V0O1xuICAgICAgICAgICAgaW5zLnRvdWNoc3RhcnRZID0gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0SXNTY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgaW5zLmVtaXRIaWdobGlnaHRUaW1lb3V0ID0gZW1pdEhpZ2hsaWdodEFmdGVyRGVsYXkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW1pdEhpZ2hsaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uVG91Y2htb3ZlKGUpIHtcbiAgICAgICAgaWYgKCAhIHRoaXMudG91Y2hzdGFydEVsKSByZXR1cm47XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGlmIHdlJ3JlIG1vdmluZyBhcm91bmQgc2FtZSB0b3VjaCBhcyB3aGF0IGlkZW50aWZpZWRcbiAgICAgICAgLy8gdGhlIHRvdWNoc3RhcnRFbCwgdGhlbiBjYWxsIGBvblRvdWNoYXJvdW5kYFxuICAgICAgICB2YXJcbiAgICAgICAgICAgIGlucyA9IHRoaXMsXG4gICAgICAgICAgICB0b3VjaHN0YXJ0RWwgPSBpbnMudG91Y2hzdGFydEVsLFxuICAgICAgICAgICAgdG91Y2ggPSBlLnRhcmdldFRvdWNoZXNbMF0sXG5cbiAgICAgICAgICAgIHRvdWNoc3RhcnRZID0gaW5zLnRvdWNoc3RhcnRZLFxuICAgICAgICAgICAgbmV3WSA9IHRvdWNoLmNsaWVudFksXG4gICAgICAgICAgICBkaWZmZXJlbmNlSW5ZID0gKG5ld1kgIT09IHRoaXMudG91Y2hZKSxcblxuICAgICAgICAgICAgdG91Y2hUYXJnZXQgPSBpbnMuZ2V0RGVzaXJlZFRhcmdldCh0b3VjaC50YXJnZXQpLFxuICAgICAgICAgICAgdGFyZ2V0SXNTY3JvbGxhYmxlID0gdG91Y2hUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKTtcblxuICAgICAgICBpZiAodG91Y2hUYXJnZXQgPT09IHRvdWNoc3RhcnRFbCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldElzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlSW5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUb3VjaHN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25Ub3VjaGFyb3VuZCh0b3VjaHN0YXJ0RWwsIGUpOyAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uVG91Y2hhcm91bmQodG91Y2hzdGFydEVsLCBlKSB7XG4gICAgICAgIC8vIGlmIHRvdWNoYXJvdW5kIHRvbyBmYXIgZnJvbSB0b3VjaHN0YXJ0RWxcbiAgICAgICAgLy8gdGhlbiByZW1vdmUgaGlnaGxpZ2h0O1xuICAgICAgICAvLyBhZGQgYmFjayBpbiBtb3ZlIGluIGNsb3NlIGFnYWluXG4gICAgICAgIHZhciBcbiAgICAgICAgICAgIGlucyA9IHRoaXMsXG4gICAgICAgICAgICB0b3VjaCA9IGUudGFyZ2V0VG91Y2hlc1swXSxcbiAgICAgICAgICAgIGV4Y2VlZHMgPSBpbnMuZXhjZWVkc0VsZW1lbnQodG91Y2gsIHRvdWNoc3RhcnRFbCk7XG5cbiAgICAgICAgaWYgKGV4Y2VlZHMpIHtcbiAgICAgICAgICAgIGlucy5lbWl0KCdoaWdobGlnaHRlbmQnLCB7dGFyZ2V0OiB0b3VjaHN0YXJ0RWx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucy5lbWl0KCdoaWdobGlnaHRzdGFydCcsIHt0YXJnZXQ6IHRvdWNoc3RhcnRFbH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uVG91Y2hlbmQoZSkgey8vIHJldHVybiBpbiBubyB0b3VjaHN0YXJ0RWwsIG9yXG4gICAgICAgIC8vIGltbWVkaWF0ZWx5IHJlbW92ZSBoaWdobGlnaHRpbmcgb24gdG91Y2hzdGFydEVsIGFuZFxuICAgICAgICAvLyBkZWxlZ2F0ZSB0byBvbmNsaWNrIGlmIHdpdGhpbiBib3VuZHMgb2YgdG91Y2hzdGFydEVsXG5cbiAgICAgICAgaWYgKCAhIHRoaXMudG91Y2hzdGFydEVsKSByZXR1cm47XG5cbiAgICAgICAgdmFyXG4gICAgICAgICAgICBpbnMgPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLFxuICAgICAgICAgICAgdG91Y2hUYXJnZXQgPSBpbnMuZ2V0RGVzaXJlZFRhcmdldCh0b3VjaC50YXJnZXQpLFxuICAgICAgICAgICAgdG91Y2hzdGFydEVsID0gaW5zLnRvdWNoc3RhcnRFbCxcbiAgICAgICAgICAgIGV4Y2VlZHMgPSBpbnMuZXhjZWVkc0VsZW1lbnQodG91Y2gsIHRvdWNoc3RhcnRFbCk7XG5cbiAgICAgICAgdGhpcy5jbGVhclRvdWNoc3RhcnQoaW5zKTtcbiAgICAgICAgaWYgKCh0b3VjaFRhcmdldCA9PT0gdG91Y2hzdGFydEVsKSAmJiAoICEgZXhjZWVkcykpIHtcbiAgICAgICAgICAgIGxvZyhgdG91Y2hlbmQgZ29pbmcgdG8gY2xpY2tgKTtcbiAgICAgICAgICAgIGlucy5vbkNsaWNrKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyVG91Y2hzdGFydCgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBpbnMgPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2hzdGFydEVsID0gaW5zLnRvdWNoc3RhcnRFbCxcbiAgICAgICAgICAgIGVtaXRIaWdobGlnaHRUaW1lb3V0ID0gaW5zLmVtaXRIaWdobGlnaHRUaW1lb3V0O1xuXG4gICAgICAgIGlmIChlbWl0SGlnaGxpZ2h0VGltZW91dCkgY2xlYXJUaW1lb3V0KGVtaXRIaWdobGlnaHRUaW1lb3V0KTtcbiAgICAgICAgaWYgKHRvdWNoc3RhcnRFbCkgaW5zLmVtaXQoJ2hpZ2hsaWdodGVuZCcsIHt0YXJnZXQ6IHRvdWNoc3RhcnRFbH0pO1xuICAgICAgICBkZWxldGUgaW5zLnRvdWNoc3RhcnRFbDsgXG4gICAgICAgIGRlbGV0ZSBpbnMudG91Y2hzdGFydFk7ICBcbiAgICB9XG4gICAgZXhjZWVkc0VsZW1lbnQodG91Y2gsIGVsKSB7XG4gICAgICAgIHZhciBcbiAgICAgICAgICAgIHBhZGRpbmcgPSAyMCxcbiAgICAgICAgICAgIGVsQm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cbiAgICAgICAgICAgIHRvdWNoWCA9IHRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICB0b3VjaFkgPSB0b3VjaC5jbGllbnRZLFxuXG4gICAgICAgICAgICB0b29MZWZ0ICA9ICh0b3VjaFggLSAoZWxCb3gubGVmdCAgIC0gcGFkZGluZykpIDwgMCxcbiAgICAgICAgICAgIHRvb1JpZ2h0ID0gKHRvdWNoWCAtIChlbEJveC5yaWdodCAgKyBwYWRkaW5nKSkgPiAwLFxuICAgICAgICAgICAgdG9vQWJvdmUgPSAodG91Y2hZIC0gKGVsQm94LnRvcCAgICAtIHBhZGRpbmcpKSA8IDAsXG4gICAgICAgICAgICB0b29CZWxvdyA9ICh0b3VjaFkgLSAoZWxCb3guYm90dG9tICsgcGFkZGluZykpID4gMDtcblxuICAgICAgICByZXR1cm4gKHRvb0xlZnQgfHwgdG9vUmlnaHQgfHwgdG9vQWJvdmUgfHwgdG9vQmVsb3cpO1xuICAgIH1cbiAgICBvbkhpZ2hsaWdodHN0YXJ0KGUpIHtcblxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgb25IaWdobGlnaHRlbmQoZSkge1xuXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBjbGlja2VkT25Ub3VjaChlKSB7XG5cbiAgICAgICAgdmFyIGlzQ2xpY2sgPSAoZS50eXBlID09PSAnY2xpY2snKTtcbiAgICAgICAgdmFyIHt0b3VjaGFibGV9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKGlzQ2xpY2sgJiYgdG91Y2hhYmxlKTtcbiAgICB9XG4gICAgZ2V0IHRvdWNoYWJsZSgpIHtcblxuICAgICAgICB2YXIge2RvY3VtZW50RWxlbWVudH0gPSB0aGlzLmFwcC53aW5kb3cuZG9jdW1lbnQ7XG4gICAgICAgIHJldHVybiAoICEgZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbm8tdG91Y2gnKSk7ICAgXG4gICAgfVxuICAgIGFuY2VzdG9yT2YoZWwsIHNlbGVjdG9yKSB7XG5cbiAgICAgICAgdmFyIHtkb2N1bWVudH0gPSBnbG9iYWw7XG5cbiAgICAgICAgd2hpbGUgKCAhIGVsLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAoZWwgPT09IGRvY3VtZW50KSByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIHNldEVsKGVsZW1lbnQsIHF1aWV0ID0gZmFsc2UpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcywgJ2VsJywgZWxlbWVudCwgcXVpZXQpO1xuICAgIH1cbiAgICBnZXQgZWwoKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcblxuICAgICAgICBpZiAoICEgXy5lbCkge1xuXG4gICAgICAgICAgICBpZiAoICEgdGhpcy5uYW1lKSB0aHJvdyBFcnJvcihgdGhpcy5uYW1lIG5vdCBkZWZpbmVkIG9uIHZpZXdgKTtcblxuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGAuJHt0aGlzLm5hbWV9LXZpZXdgO1xuICAgICAgICAgICAgdmFyIHtkb2N1bWVudH0gPSB0aGlzLmFwcC53aW5kb3c7XG4gICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7IFxuXG4gICAgICAgICAgICBpZiAoICEgZWwpIHRocm93IEVycm9yKGAke2NsYXNzTmFtZX0gbm90IGZvdW5kYCk7ICBcblxuICAgICAgICAgICAgXy5lbCA9IGVsO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBfLmVsO1xuICAgIH1cbiAgICBzZXQgZWwodmFsdWUpIHtcblxuICAgICAgICB0aGlzLnNldEVsKHZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy5nZXRUZW1wbGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGUoKTtcbiAgICB9XG4gICAgZ2V0VGVtcGxhdGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGU7XG4gICAgfVxuICAgICQoLi4uYXJncykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoLi4uYXJncyk7XG4gICAgfVxuICAgICQkKC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoLi4uYXJncykpO1xuICAgIH1cbiAgICB0b2dnbGUoLi4uYXJncykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoLi4uYXJncyk7XG4gICAgfVxuICAgIHJlbW92ZSguLi5hcmdzKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5hcmdzKTtcbiAgICB9XG4gICAgY29udGFpbnMoLi4uYXJncykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVsLmNsYXNzTGlzdC5jb250YWlucyguLi5hcmdzKTtcbiAgICB9XG4gICAgYWRkKC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlbE9uKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcbiAgICB9XG4gICAgZWxPZmYoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlZChjaGFuZ2VzKSB7XG5cbiAgICBsb2coYG9uU3RhdGVDaGFuZ2VkYCk7XG4gICAgZm9yICh2YXIgY2hhbmdlIG9mIGNoYW5nZXMpIGxvZyhjaGFuZ2UpO1xufVxuZnVuY3Rpb24gYWRkZWQoYWRkaXRpb25zKSB7XG5cbiAgICBsb2coYG9uU3RhdGVBZGRlZGApO1xuICAgIGZvciAodmFyIGFkZGl0aW9uIG9mIGFkZGl0aW9ucykgbG9nKGFkZGl0aW9uKTtcbn1cblxudmFyIHtcbiAgICBsb2csXG4gICAgZXh0ZW5kUHJvdG9PZixcbiAgICBzZXRUaW1lb3V0LFxuICAgIGNsZWFyVGltZW91dCxcbiAgICBpc0RlZmluZWQsXG4gICAgdWNmaXJzdCxcbn0gPSBoZWxwZXJzO1xuXG5leHRlbmRQcm90b09mKFZpZXcsIEV2ZW50RW1pdHRlcik7XG5leHRlbmRQcm90b09mKFZpZXcsIENvbW1hbmRlclRyYWl0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3OyAiLCJ2YXIgU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlldycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuLi9TdXBwb3J0L2hlbHBlcnMnKTtcblxuY2xhc3MgVmlld1NlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIgdmlld3MgPSBhcHAuY29uZmlnLmdldCgndmlld3MnKTtcblxuICAgICAgICB2aWV3cy5mb3JFYWNoKHZpZXcgPT4ge1xuXG4gICAgICAgICAgICB2YXIge2Fic3RyYWN0LCAkY29uc3RydWN0b3IsIGJ1aWxkLCBhcmdzfSA9IHZpZXc7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYnVpbGQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzaW5nbGV0b24nOlxuICAgICAgICAgICAgICAgICAgICBhcHAuYmluZFNoYXJlZChhYnN0cmFjdCwgYXBwID0+IG5ldyAkY29uc3RydWN0b3IoYXBwLCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbnZhciB7bG9nfSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld1NlcnZpY2VQcm92aWRlcjsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyMlxuICogaHR0cHM6Ly9naXRodWIuY29tL2hpajFueC9FdmVudEVtaXR0ZXIyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIGhpajFueFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG47IWZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSA/IEFycmF5LmlzQXJyYXkgOiBmdW5jdGlvbiBfaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfTtcbiAgdmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGlmICh0aGlzLl9jb25mKSB7XG4gICAgICBjb25maWd1cmUuY2FsbCh0aGlzLCB0aGlzLl9jb25mKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb25maWd1cmUoY29uZikge1xuICAgIGlmIChjb25mKSB7XG5cbiAgICAgIHRoaXMuX2NvbmYgPSBjb25mO1xuXG4gICAgICBjb25mLmRlbGltaXRlciAmJiAodGhpcy5kZWxpbWl0ZXIgPSBjb25mLmRlbGltaXRlcik7XG4gICAgICBjb25mLm1heExpc3RlbmVycyAmJiAodGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyA9IGNvbmYubWF4TGlzdGVuZXJzKTtcbiAgICAgIGNvbmYud2lsZGNhcmQgJiYgKHRoaXMud2lsZGNhcmQgPSBjb25mLndpbGRjYXJkKTtcbiAgICAgIGNvbmYubmV3TGlzdGVuZXIgJiYgKHRoaXMubmV3TGlzdGVuZXIgPSBjb25mLm5ld0xpc3RlbmVyKTtcblxuICAgICAgaWYgKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lclRyZWUgPSB7fTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoY29uZikge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMubmV3TGlzdGVuZXIgPSBmYWxzZTtcbiAgICBjb25maWd1cmUuY2FsbCh0aGlzLCBjb25mKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEF0dGVudGlvbiwgZnVuY3Rpb24gcmV0dXJuIHR5cGUgbm93IGlzIGFycmF5LCBhbHdheXMgIVxuICAvLyBJdCBoYXMgemVybyBlbGVtZW50cyBpZiBubyBhbnkgbWF0Y2hlcyBmb3VuZCBhbmQgb25lIG9yIG1vcmVcbiAgLy8gZWxlbWVudHMgKGxlYWZzKSBpZiB0aGVyZSBhcmUgbWF0Y2hlc1xuICAvL1xuICBmdW5jdGlvbiBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWUsIGkpIHtcbiAgICBpZiAoIXRyZWUpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycz1bXSwgbGVhZiwgbGVuLCBicmFuY2gsIHhUcmVlLCB4eFRyZWUsIGlzb2xhdGVkQnJhbmNoLCBlbmRSZWFjaGVkLFxuICAgICAgICB0eXBlTGVuZ3RoID0gdHlwZS5sZW5ndGgsIGN1cnJlbnRUeXBlID0gdHlwZVtpXSwgbmV4dFR5cGUgPSB0eXBlW2krMV07XG4gICAgaWYgKGkgPT09IHR5cGVMZW5ndGggJiYgdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAvL1xuICAgICAgLy8gSWYgYXQgdGhlIGVuZCBvZiB0aGUgZXZlbnQocykgbGlzdCBhbmQgdGhlIHRyZWUgaGFzIGxpc3RlbmVyc1xuICAgICAgLy8gaW52b2tlIHRob3NlIGxpc3RlbmVycy5cbiAgICAgIC8vXG4gICAgICBpZiAodHlwZW9mIHRyZWUuX2xpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKHRyZWUuX2xpc3RlbmVycyk7XG4gICAgICAgIHJldHVybiBbdHJlZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxlYWYgPSAwLCBsZW4gPSB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoOyBsZWFmIDwgbGVuOyBsZWFmKyspIHtcbiAgICAgICAgICBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKHRyZWUuX2xpc3RlbmVyc1tsZWFmXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt0cmVlXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKGN1cnJlbnRUeXBlID09PSAnKicgfHwgY3VycmVudFR5cGUgPT09ICcqKicpIHx8IHRyZWVbY3VycmVudFR5cGVdKSB7XG4gICAgICAvL1xuICAgICAgLy8gSWYgdGhlIGV2ZW50IGVtaXR0ZWQgaXMgJyonIGF0IHRoaXMgcGFydFxuICAgICAgLy8gb3IgdGhlcmUgaXMgYSBjb25jcmV0ZSBtYXRjaCBhdCB0aGlzIHBhdGNoXG4gICAgICAvL1xuICAgICAgaWYgKGN1cnJlbnRUeXBlID09PSAnKicpIHtcbiAgICAgICAgZm9yIChicmFuY2ggaW4gdHJlZSkge1xuICAgICAgICAgIGlmIChicmFuY2ggIT09ICdfbGlzdGVuZXJzJyAmJiB0cmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkrMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzO1xuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRUeXBlID09PSAnKionKSB7XG4gICAgICAgIGVuZFJlYWNoZWQgPSAoaSsxID09PSB0eXBlTGVuZ3RoIHx8IChpKzIgPT09IHR5cGVMZW5ndGggJiYgbmV4dFR5cGUgPT09ICcqJykpO1xuICAgICAgICBpZihlbmRSZWFjaGVkICYmIHRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIC8vIFRoZSBuZXh0IGVsZW1lbnQgaGFzIGEgX2xpc3RlbmVycywgYWRkIGl0IHRvIHRoZSBoYW5kbGVycy5cbiAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgdHlwZUxlbmd0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChicmFuY2ggaW4gdHJlZSkge1xuICAgICAgICAgIGlmIChicmFuY2ggIT09ICdfbGlzdGVuZXJzJyAmJiB0cmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGlmKGJyYW5jaCA9PT0gJyonIHx8IGJyYW5jaCA9PT0gJyoqJykge1xuICAgICAgICAgICAgICBpZih0cmVlW2JyYW5jaF0uX2xpc3RlbmVycyAmJiAhZW5kUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIHR5cGVMZW5ndGgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYnJhbmNoID09PSBuZXh0VHlwZSkge1xuICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKzIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIE5vIG1hdGNoIG9uIHRoaXMgb25lLCBzaGlmdCBpbnRvIHRoZSB0cmVlIGJ1dCBub3QgaW4gdGhlIHR5cGUgYXJyYXkuXG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbY3VycmVudFR5cGVdLCBpKzEpKTtcbiAgICB9XG5cbiAgICB4VHJlZSA9IHRyZWVbJyonXTtcbiAgICBpZiAoeFRyZWUpIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgdHJlZSB3aWxsIGFsbG93IGFueSBtYXRjaCBmb3IgdGhpcyBwYXJ0LFxuICAgICAgLy8gdGhlbiByZWN1cnNpdmVseSBleHBsb3JlIGFsbCBicmFuY2hlcyBvZiB0aGUgdHJlZVxuICAgICAgLy9cbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeFRyZWUsIGkrMSk7XG4gICAgfVxuXG4gICAgeHhUcmVlID0gdHJlZVsnKionXTtcbiAgICBpZih4eFRyZWUpIHtcbiAgICAgIGlmKGkgPCB0eXBlTGVuZ3RoKSB7XG4gICAgICAgIGlmKHh4VHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGxpc3RlbmVyIG9uIGEgJyoqJywgaXQgd2lsbCBjYXRjaCBhbGwsIHNvIGFkZCBpdHMgaGFuZGxlci5cbiAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZSwgdHlwZUxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdWlsZCBhcnJheXMgb2YgbWF0Y2hpbmcgbmV4dCBicmFuY2hlcyBhbmQgb3RoZXJzLlxuICAgICAgICBmb3IoYnJhbmNoIGluIHh4VHJlZSkge1xuICAgICAgICAgIGlmKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHh4VHJlZS5oYXNPd25Qcm9wZXJ0eShicmFuY2gpKSB7XG4gICAgICAgICAgICBpZihicmFuY2ggPT09IG5leHRUeXBlKSB7XG4gICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhlIG5leHQgZWxlbWVudCB3aWxsIG1hdGNoLCBzbyBqdW1wIHR3aWNlLlxuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVticmFuY2hdLCBpKzIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGJyYW5jaCA9PT0gY3VycmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgLy8gQ3VycmVudCBub2RlIG1hdGNoZXMsIG1vdmUgaW50byB0aGUgdHJlZS5cbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWVbYnJhbmNoXSwgaSsxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoID0ge307XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoW2JyYW5jaF0gPSB4eFRyZWVbYnJhbmNoXTtcbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB7ICcqKic6IGlzb2xhdGVkQnJhbmNoIH0sIGkrMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoeHhUcmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSByZWFjaGVkIHRoZSBlbmQgYW5kIHN0aWxsIG9uIGEgJyoqJ1xuICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZSwgdHlwZUxlbmd0aCk7XG4gICAgICB9IGVsc2UgaWYoeHhUcmVlWycqJ10gJiYgeHhUcmVlWycqJ10uX2xpc3RlbmVycykge1xuICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVsnKiddLCB0eXBlTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdGVuZXJzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ3Jvd0xpc3RlbmVyVHJlZSh0eXBlLCBsaXN0ZW5lcikge1xuXG4gICAgdHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuXG4gICAgLy9cbiAgICAvLyBMb29rcyBmb3IgdHdvIGNvbnNlY3V0aXZlICcqKicsIGlmIHNvLCBkb24ndCBhZGQgdGhlIGV2ZW50IGF0IGFsbC5cbiAgICAvL1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHR5cGUubGVuZ3RoOyBpKzEgPCBsZW47IGkrKykge1xuICAgICAgaWYodHlwZVtpXSA9PT0gJyoqJyAmJiB0eXBlW2krMV0gPT09ICcqKicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cmVlID0gdGhpcy5saXN0ZW5lclRyZWU7XG4gICAgdmFyIG5hbWUgPSB0eXBlLnNoaWZ0KCk7XG5cbiAgICB3aGlsZSAobmFtZSkge1xuXG4gICAgICBpZiAoIXRyZWVbbmFtZV0pIHtcbiAgICAgICAgdHJlZVtuYW1lXSA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0cmVlID0gdHJlZVtuYW1lXTtcblxuICAgICAgaWYgKHR5cGUubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgaWYgKCF0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMgPSBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiB0cmVlLl9saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMgPSBbdHJlZS5fbGlzdGVuZXJzLCBsaXN0ZW5lcl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNBcnJheSh0cmVlLl9saXN0ZW5lcnMpKSB7XG5cbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgICAgICBpZiAoIXRyZWUuX2xpc3RlbmVycy53YXJuZWQpIHtcblxuICAgICAgICAgICAgdmFyIG0gPSBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIG0gPSB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobSA+IDAgJiYgdHJlZS5fbGlzdGVuZXJzLmxlbmd0aCA+IG0pIHtcblxuICAgICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5fbGlzdGVuZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBuYW1lID0gdHlwZS5zaGlmdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW5cbiAgLy8gMTAgbGlzdGVuZXJzIGFyZSBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoXG4gIC8vIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuICAvL1xuICAvLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3NcbiAgLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5kZWxpbWl0ZXIgPSAnLic7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzID0gbjtcbiAgICBpZiAoIXRoaXMuX2NvbmYpIHRoaXMuX2NvbmYgPSB7fTtcbiAgICB0aGlzLl9jb25mLm1heExpc3RlbmVycyA9IG47XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudCA9ICcnO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgIHRoaXMubWFueShldmVudCwgMSwgZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubWFueSA9IGZ1bmN0aW9uKGV2ZW50LCB0dGwsIGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYW55IG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICgtLXR0bCA9PT0gMCkge1xuICAgICAgICBzZWxmLm9mZihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lci5fb3JpZ2luID0gZm47XG5cbiAgICB0aGlzLm9uKGV2ZW50LCBsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG5cbiAgICB2YXIgdHlwZSA9IGFyZ3VtZW50c1swXTtcblxuICAgIGlmICh0eXBlID09PSAnbmV3TGlzdGVuZXInICYmICF0aGlzLm5ld0xpc3RlbmVyKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcikgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlICpfYWxsKiBmdW5jdGlvbnMgYW5kIGludm9rZSB0aGVtLlxuICAgIGlmICh0aGlzLl9hbGwpIHtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbDsgaSsrKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLl9hbGwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgICB0aGlzLl9hbGxbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICAgIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG5cbiAgICAgIGlmICghdGhpcy5fYWxsICYmXG4gICAgICAgICF0aGlzLl9ldmVudHMuZXJyb3IgJiZcbiAgICAgICAgISh0aGlzLndpbGRjYXJkICYmIHRoaXMubGlzdGVuZXJUcmVlLmVycm9yKSkge1xuXG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHRocm93IGFyZ3VtZW50c1sxXTsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmNhdWdodCwgdW5zcGVjaWZpZWQgJ2Vycm9yJyBldmVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYW5kbGVyO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgaGFuZGxlciA9IFtdO1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVyLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBzbG93ZXJcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhhbmRsZXIpIHtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbDsgaSsrKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChsaXN0ZW5lcnMubGVuZ3RoID4gMCkgfHwgISF0aGlzLl9hbGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICEhdGhpcy5fYWxsO1xuICAgIH1cblxuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9uQW55KHR5cGUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbiBvbmx5IGFjY2VwdHMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG5cbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09IFwibmV3TGlzdGVuZXJzXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJzXCIuXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIGdyb3dMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCB0eXBlLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkge1xuICAgICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgdGhpcy5fZXZlbnRzW3R5cGVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcblxuICAgICAgICB2YXIgbSA9IGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIG0gPSB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG5cbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbkFueSA9IGZ1bmN0aW9uKGZuKSB7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uQW55IG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZighdGhpcy5fYWxsKSB7XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZ1bmN0aW9uIHRvIHRoZSBldmVudCBsaXN0ZW5lciBjb2xsZWN0aW9uLlxuICAgIHRoaXMuX2FsbC5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVycyxsZWFmcz1bXTtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgbGVhZnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBudWxsLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGRvZXMgbm90IHVzZSBsaXN0ZW5lcnMoKSwgc28gbm8gc2lkZSBlZmZlY3Qgb2YgY3JlYXRpbmcgX2V2ZW50c1t0eXBlXVxuICAgICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHJldHVybiB0aGlzO1xuICAgICAgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICBsZWFmcy5wdXNoKHtfbGlzdGVuZXJzOmhhbmRsZXJzfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaUxlYWY9MDsgaUxlYWY8bGVhZnMubGVuZ3RoOyBpTGVhZisrKSB7XG4gICAgICB2YXIgbGVhZiA9IGxlYWZzW2lMZWFmXTtcbiAgICAgIGhhbmRsZXJzID0gbGVhZi5fbGlzdGVuZXJzO1xuICAgICAgaWYgKGlzQXJyYXkoaGFuZGxlcnMpKSB7XG5cbiAgICAgICAgdmFyIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGhhbmRsZXJzW2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgICAgKGhhbmRsZXJzW2ldLmxpc3RlbmVyICYmIGhhbmRsZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikgfHxcbiAgICAgICAgICAgIChoYW5kbGVyc1tpXS5fb3JpZ2luICYmIGhhbmRsZXJzW2ldLl9vcmlnaW4gPT09IGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgIGxlYWYuX2xpc3RlbmVycy5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChoYW5kbGVycyA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgKGhhbmRsZXJzLmxpc3RlbmVyICYmIGhhbmRsZXJzLmxpc3RlbmVyID09PSBsaXN0ZW5lcikgfHxcbiAgICAgICAgKGhhbmRsZXJzLl9vcmlnaW4gJiYgaGFuZGxlcnMuX29yaWdpbiA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgICBkZWxldGUgbGVhZi5fbGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZkFueSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIGkgPSAwLCBsID0gMCwgZm5zO1xuICAgIGlmIChmbiAmJiB0aGlzLl9hbGwgJiYgdGhpcy5fYWxsLmxlbmd0aCA+IDApIHtcbiAgICAgIGZucyA9IHRoaXMuX2FsbDtcbiAgICAgIGZvcihpID0gMCwgbCA9IGZucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYoZm4gPT09IGZuc1tpXSkge1xuICAgICAgICAgIGZucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWxsID0gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZjtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgIXRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHZhciBsZWFmcyA9IHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIG51bGwsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG5cbiAgICAgIGZvciAodmFyIGlMZWFmPTA7IGlMZWFmPGxlYWZzLmxlbmd0aDsgaUxlYWYrKykge1xuICAgICAgICB2YXIgbGVhZiA9IGxlYWZzW2lMZWFmXTtcbiAgICAgICAgbGVhZi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgaGFuZGxlcnMsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgICByZXR1cm4gaGFuZGxlcnM7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB0aGlzLl9ldmVudHNbdHlwZV0gPSBbXTtcbiAgICBpZiAoIWlzQXJyYXkodGhpcy5fZXZlbnRzW3R5cGVdKSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ldmVudHNbdHlwZV07XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnNBbnkgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmKHRoaXMuX2FsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbC5cbiAgICB3aW5kb3cuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbiAgfVxufSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKmdsb2JhbHMgSGFuZGxlYmFyczogdHJ1ZSAqL1xudmFyIGJhc2UgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2Jhc2VcIik7XG5cbi8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbi8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG52YXIgU2FmZVN0cmluZyA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmdcIilbXCJkZWZhdWx0XCJdO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvZXhjZXB0aW9uXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvdXRpbHNcIik7XG52YXIgcnVudGltZSA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvcnVudGltZVwiKTtcblxuLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG52YXIgY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gIGhiLlNhZmVTdHJpbmcgPSBTYWZlU3RyaW5nO1xuICBoYi5FeGNlcHRpb24gPSBFeGNlcHRpb247XG4gIGhiLlV0aWxzID0gVXRpbHM7XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufTtcblxudmFyIEhhbmRsZWJhcnMgPSBjcmVhdGUoKTtcbkhhbmRsZWJhcnMuY3JlYXRlID0gY3JlYXRlO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEhhbmRsZWJhcnM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9leGNlcHRpb25cIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgVkVSU0lPTiA9IFwiMS4zLjBcIjtcbmV4cG9ydHMuVkVSU0lPTiA9IFZFUlNJT047dmFyIENPTVBJTEVSX1JFVklTSU9OID0gNDtcbmV4cG9ydHMuQ09NUElMRVJfUkVWSVNJT04gPSBDT01QSUxFUl9SRVZJU0lPTjtcbnZhciBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz49IDEuMC4wJ1xufTtcbmV4cG9ydHMuUkVWSVNJT05fQ0hBTkdFUyA9IFJFVklTSU9OX0NIQU5HRVM7XG52YXIgaXNBcnJheSA9IFV0aWxzLmlzQXJyYXksXG4gICAgaXNGdW5jdGlvbiA9IFV0aWxzLmlzRnVuY3Rpb24sXG4gICAgdG9TdHJpbmcgPSBVdGlscy50b1N0cmluZyxcbiAgICBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbn1cblxuZXhwb3J0cy5IYW5kbGViYXJzRW52aXJvbm1lbnQgPSBIYW5kbGViYXJzRW52aXJvbm1lbnQ7SGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuLCBpbnZlcnNlKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChpbnZlcnNlIHx8IGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICBVdGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGludmVyc2UpIHsgZm4ubm90ID0gaW52ZXJzZTsgfVxuICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgfVxuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgc3RyKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIFV0aWxzLmV4dGVuZCh0aGlzLnBhcnRpYWxzLCAgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBzdHI7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgaGVscGVyOiAnXCIgKyBhcmcgKyBcIidcIik7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIHZhciBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlIHx8IGZ1bmN0aW9uKCkge30sIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICB9IGVsc2UgaWYoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihjb250ZXh0KTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sIGludmVyc2UgPSBvcHRpb25zLmludmVyc2U7XG4gICAgdmFyIGkgPSAwLCByZXQgPSBcIlwiLCBkYXRhO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgaWYoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICBkYXRhLmxhc3QgID0gKGkgPT09IChjb250ZXh0Lmxlbmd0aC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbaV0sIHsgZGF0YTogZGF0YSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgaWYoZGF0YSkgeyBcbiAgICAgICAgICAgICAgZGF0YS5rZXkgPSBrZXk7IFxuICAgICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgICAgZGF0YS5maXJzdCA9IChpID09PSAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRba2V5XSwge2RhdGE6IGRhdGF9KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihpID09PSAwKXtcbiAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb25kaXRpb25hbCkpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJlbmRlciB0aGUgcG9zaXRpdmUgcGF0aCBpZiB0aGUgdmFsdWUgaXMgdHJ1dGh5IGFuZCBub3QgZW1wdHkuXG4gICAgLy8gVGhlIGBpbmNsdWRlWmVyb2Agb3B0aW9uIG1heSBiZSBzZXQgdG8gdHJlYXQgdGhlIGNvbmR0aW9uYWwgYXMgcHVyZWx5IG5vdCBlbXB0eSBiYXNlZCBvbiB0aGVcbiAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuICAgIGlmICgoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwpIHx8IFV0aWxzLmlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2h9KTtcbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKCFVdGlscy5pc0VtcHR5KGNvbnRleHQpKSByZXR1cm4gb3B0aW9ucy5mbihjb250ZXh0KTtcbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGV2ZWwgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwgPyBwYXJzZUludChvcHRpb25zLmRhdGEubGV2ZWwsIDEwKSA6IDE7XG4gICAgaW5zdGFuY2UubG9nKGxldmVsLCBjb250ZXh0KTtcbiAgfSk7XG59XG5cbnZhciBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogeyAwOiAnZGVidWcnLCAxOiAnaW5mbycsIDI6ICd3YXJuJywgMzogJ2Vycm9yJyB9LFxuXG4gIC8vIFN0YXRlIGVudW1cbiAgREVCVUc6IDAsXG4gIElORk86IDEsXG4gIFdBUk46IDIsXG4gIEVSUk9SOiAzLFxuICBsZXZlbDogMyxcblxuICAvLyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICBsb2c6IGZ1bmN0aW9uKGxldmVsLCBvYmopIHtcbiAgICBpZiAobG9nZ2VyLmxldmVsIDw9IGxldmVsKSB7XG4gICAgICB2YXIgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGVbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlW21ldGhvZF0uY2FsbChjb25zb2xlLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbmV4cG9ydHMubG9nZ2VyID0gbG9nZ2VyO1xuZnVuY3Rpb24gbG9nKGxldmVsLCBvYmopIHsgbG9nZ2VyLmxvZyhsZXZlbCwgb2JqKTsgfVxuXG5leHBvcnRzLmxvZyA9IGxvZzt2YXIgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICBVdGlscy5leHRlbmQob2JqLCBvYmplY3QpO1xuICByZXR1cm4gb2JqO1xufTtcbmV4cG9ydHMuY3JlYXRlRnJhbWUgPSBjcmVhdGVGcmFtZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICB2YXIgbGluZTtcbiAgaWYgKG5vZGUgJiYgbm9kZS5maXJzdExpbmUpIHtcbiAgICBsaW5lID0gbm9kZS5maXJzdExpbmU7XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIG5vZGUuZmlyc3RDb2x1bW47XG4gIH1cblxuICB2YXIgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgaWYgKGxpbmUpIHtcbiAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuICAgIHRoaXMuY29sdW1uID0gbm9kZS5maXJzdENvbHVtbjtcbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRXhjZXB0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG52YXIgRXhjZXB0aW9uID0gcmVxdWlyZShcIi4vZXhjZXB0aW9uXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBDT01QSUxFUl9SRVZJU0lPTiA9IHJlcXVpcmUoXCIuL2Jhc2VcIikuQ09NUElMRVJfUkVWSVNJT047XG52YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHJlcXVpcmUoXCIuL2Jhc2VcIikuUkVWSVNJT05fQ0hBTkdFUztcblxuZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKFwiK3J1bnRpbWVWZXJzaW9ucytcIikgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uIChcIitjb21waWxlclZlcnNpb25zK1wiKS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJJbmZvWzFdK1wiKS5cIik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY2hlY2tSZXZpc2lvbiA9IGNoZWNrUmV2aXNpb247Ly8gVE9ETzogUmVtb3ZlIHRoaXMgbGluZSBhbmQgYnJlYWsgdXAgY29tcGlsZVBhcnRpYWxcblxuZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlXCIpO1xuICB9XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgdmFyIGludm9rZVBhcnRpYWxXcmFwcGVyID0gZnVuY3Rpb24ocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEpIHtcbiAgICB2YXIgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHsgcmV0dXJuIHJlc3VsdDsgfVxuXG4gICAgaWYgKGVudi5jb21waWxlKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHsgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhIH07XG4gICAgICBwYXJ0aWFsc1tuYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHsgZGF0YTogZGF0YSAhPT0gdW5kZWZpbmVkIH0sIGVudik7XG4gICAgICByZXR1cm4gcGFydGlhbHNbbmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBKdXN0IGFkZCB3YXRlclxuICB2YXIgY29udGFpbmVyID0ge1xuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGZuLCBkYXRhKSB7XG4gICAgICB2YXIgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldO1xuICAgICAgaWYoZGF0YSkge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHByb2dyYW0oaSwgZm4sIGRhdGEpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gcHJvZ3JhbShpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcbiAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgdmFyIHJldCA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgcmV0ID0ge307XG4gICAgICAgIFV0aWxzLmV4dGVuZChyZXQsIGNvbW1vbik7XG4gICAgICAgIFV0aWxzLmV4dGVuZChyZXQsIHBhcmFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICBwcm9ncmFtV2l0aERlcHRoOiBlbnYuVk0ucHJvZ3JhbVdpdGhEZXB0aCxcbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IG51bGxcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBuYW1lc3BhY2UgPSBvcHRpb25zLnBhcnRpYWwgPyBvcHRpb25zIDogZW52LFxuICAgICAgICBoZWxwZXJzLFxuICAgICAgICBwYXJ0aWFscztcblxuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBoZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgcGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gdGVtcGxhdGVTcGVjLmNhbGwoXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIG5hbWVzcGFjZSwgY29udGV4dCxcbiAgICAgICAgICBoZWxwZXJzLFxuICAgICAgICAgIHBhcnRpYWxzLFxuICAgICAgICAgIG9wdGlvbnMuZGF0YSk7XG5cbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgZW52LlZNLmNoZWNrUmV2aXNpb24oY29udGFpbmVyLmNvbXBpbGVySW5mbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0cy50ZW1wbGF0ZSA9IHRlbXBsYXRlO2Z1bmN0aW9uIHByb2dyYW1XaXRoRGVwdGgoaSwgZm4sIGRhdGEgLyosICRkZXB0aCAqLykge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyk7XG5cbiAgdmFyIHByb2cgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgW2NvbnRleHQsIG9wdGlvbnMuZGF0YSB8fCBkYXRhXS5jb25jYXQoYXJncykpO1xuICB9O1xuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gYXJncy5sZW5ndGg7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnRzLnByb2dyYW1XaXRoRGVwdGggPSBwcm9ncmFtV2l0aERlcHRoO2Z1bmN0aW9uIHByb2dyYW0oaSwgZm4sIGRhdGEpIHtcbiAgdmFyIHByb2cgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucy5kYXRhIHx8IGRhdGEpO1xuICB9O1xuICBwcm9nLnByb2dyYW0gPSBpO1xuICBwcm9nLmRlcHRoID0gMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydHMucHJvZ3JhbSA9IHByb2dyYW07ZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBuYW1lLCBjb250ZXh0LCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSkge1xuICB2YXIgb3B0aW9ucyA9IHsgcGFydGlhbDogdHJ1ZSwgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhIH07XG5cbiAgaWYocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRoZSBwYXJ0aWFsIFwiICsgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBmb3VuZFwiKTtcbiAgfSBlbHNlIGlmKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydHMuaW52b2tlUGFydGlhbCA9IGludm9rZVBhcnRpYWw7ZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuIFwiXCI7IH1cblxuZXhwb3J0cy5ub29wID0gbm9vcDsiLCJcInVzZSBzdHJpY3RcIjtcbi8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG5mdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICB0aGlzLnN0cmluZyA9IHN0cmluZztcbn1cblxuU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFwiXCIgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU2FmZVN0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcbi8qanNoaW50IC1XMDA0ICovXG52YXIgU2FmZVN0cmluZyA9IHJlcXVpcmUoXCIuL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIGVzY2FwZSA9IHtcbiAgXCImXCI6IFwiJmFtcDtcIixcbiAgXCI8XCI6IFwiJmx0O1wiLFxuICBcIj5cIjogXCImZ3Q7XCIsXG4gICdcIic6IFwiJnF1b3Q7XCIsXG4gIFwiJ1wiOiBcIiYjeDI3O1wiLFxuICBcImBcIjogXCImI3g2MDtcIlxufTtcblxudmFyIGJhZENoYXJzID0gL1smPD5cIidgXS9nO1xudmFyIHBvc3NpYmxlID0gL1smPD5cIidgXS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXSB8fCBcIiZhbXA7XCI7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmosIHZhbHVlKSB7XG4gIGZvcih2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO3ZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4vLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG5pZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG59XG52YXIgaXNGdW5jdGlvbjtcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICBpZiAoc3RyaW5nIGluc3RhbmNlb2YgU2FmZVN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICghc3RyaW5nICYmIHN0cmluZyAhPT0gMCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgc3RyaW5nID0gXCJcIiArIHN0cmluZztcblxuICBpZighcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0cy5lc2NhcGVFeHByZXNzaW9uID0gZXNjYXBlRXhwcmVzc2lvbjtmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTsiLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzL3J1bnRpbWVcIilbXCJkZWZhdWx0XCJdO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNCBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdGVzdGluZ0V4cG9zZUN5Y2xlQ291bnQgPSBnbG9iYWwudGVzdGluZ0V4cG9zZUN5Y2xlQ291bnQ7XG5cbiAgLy8gRGV0ZWN0IGFuZCBkbyBiYXNpYyBzYW5pdHkgY2hlY2tpbmcgb24gT2JqZWN0L0FycmF5Lm9ic2VydmUuXG4gIGZ1bmN0aW9uIGRldGVjdE9iamVjdE9ic2VydmUoKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3Qub2JzZXJ2ZSAhPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICB0eXBlb2YgQXJyYXkub2JzZXJ2ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZWNvcmRzID0gW107XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZWNzKSB7XG4gICAgICByZWNvcmRzID0gcmVjcztcbiAgICB9XG5cbiAgICB2YXIgdGVzdCA9IHt9O1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICBPYmplY3Qub2JzZXJ2ZSh0ZXN0LCBjYWxsYmFjayk7XG4gICAgQXJyYXkub2JzZXJ2ZShhcnIsIGNhbGxiYWNrKTtcbiAgICB0ZXN0LmlkID0gMTtcbiAgICB0ZXN0LmlkID0gMjtcbiAgICBkZWxldGUgdGVzdC5pZDtcbiAgICBhcnIucHVzaCgxLCAyKTtcbiAgICBhcnIubGVuZ3RoID0gMDtcblxuICAgIE9iamVjdC5kZWxpdmVyQ2hhbmdlUmVjb3JkcyhjYWxsYmFjayk7XG4gICAgaWYgKHJlY29yZHMubGVuZ3RoICE9PSA1KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHJlY29yZHNbMF0udHlwZSAhPSAnYWRkJyB8fFxuICAgICAgICByZWNvcmRzWzFdLnR5cGUgIT0gJ3VwZGF0ZScgfHxcbiAgICAgICAgcmVjb3Jkc1syXS50eXBlICE9ICdkZWxldGUnIHx8XG4gICAgICAgIHJlY29yZHNbM10udHlwZSAhPSAnc3BsaWNlJyB8fFxuICAgICAgICByZWNvcmRzWzRdLnR5cGUgIT0gJ3NwbGljZScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBPYmplY3QudW5vYnNlcnZlKHRlc3QsIGNhbGxiYWNrKTtcbiAgICBBcnJheS51bm9ic2VydmUoYXJyLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBoYXNPYnNlcnZlID0gZGV0ZWN0T2JqZWN0T2JzZXJ2ZSgpO1xuXG4gIGZ1bmN0aW9uIGRldGVjdEV2YWwoKSB7XG4gICAgLy8gRG9uJ3QgdGVzdCBmb3IgZXZhbCBpZiB3ZSdyZSBydW5uaW5nIGluIGEgQ2hyb21lIEFwcCBlbnZpcm9ubWVudC5cbiAgICAvLyBXZSBjaGVjayBmb3IgQVBJcyBzZXQgdGhhdCBvbmx5IGV4aXN0IGluIGEgQ2hyb21lIEFwcCBjb250ZXh0LlxuICAgIGlmICh0eXBlb2YgY2hyb21lICE9PSAndW5kZWZpbmVkJyAmJiBjaHJvbWUuYXBwICYmIGNocm9tZS5hcHAucnVudGltZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZpcmVmb3ggT1MgQXBwcyBkbyBub3QgYWxsb3cgZXZhbC4gVGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpcyB2ZXJ5IGhhY2t5XG4gICAgLy8gYnV0IGV2ZW4gaWYgc29tZSBvdGhlciBwbGF0Zm9ybSBhZGRzIHN1cHBvcnQgZm9yIHRoaXMgZnVuY3Rpb24gdGhpcyBjb2RlXG4gICAgLy8gd2lsbCBjb250aW51ZSB0byB3b3JrLlxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5nZXREZXZpY2VTdG9yYWdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBmID0gbmV3IEZ1bmN0aW9uKCcnLCAncmV0dXJuIHRydWU7Jyk7XG4gICAgICByZXR1cm4gZigpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdmFyIGhhc0V2YWwgPSBkZXRlY3RFdmFsKCk7XG5cbiAgZnVuY3Rpb24gaXNJbmRleChzKSB7XG4gICAgcmV0dXJuICtzID09PSBzID4+PiAwICYmIHMgIT09ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9OdW1iZXIocykge1xuICAgIHJldHVybiArcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICB9XG5cbiAgdmFyIG51bWJlcklzTmFOID0gZ2xvYmFsLk51bWJlci5pc05hTiB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGdsb2JhbC5pc05hTih2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcmVTYW1lVmFsdWUobGVmdCwgcmlnaHQpIHtcbiAgICBpZiAobGVmdCA9PT0gcmlnaHQpXG4gICAgICByZXR1cm4gbGVmdCAhPT0gMCB8fCAxIC8gbGVmdCA9PT0gMSAvIHJpZ2h0O1xuICAgIGlmIChudW1iZXJJc05hTihsZWZ0KSAmJiBudW1iZXJJc05hTihyaWdodCkpXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBsZWZ0ICE9PSBsZWZ0ICYmIHJpZ2h0ICE9PSByaWdodDtcbiAgfVxuXG4gIHZhciBjcmVhdGVPYmplY3QgPSAoJ19fcHJvdG9fXycgaW4ge30pID9cbiAgICBmdW5jdGlvbihvYmopIHsgcmV0dXJuIG9iajsgfSA6XG4gICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgcHJvdG8gPSBvYmouX19wcm90b19fO1xuICAgICAgaWYgKCFwcm90bylcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIHZhciBuZXdPYmplY3QgPSBPYmplY3QuY3JlYXRlKHByb3RvKTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmplY3QsIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdPYmplY3Q7XG4gICAgfTtcblxuICB2YXIgaWRlbnRTdGFydCA9ICdbXFwkX2EtekEtWl0nO1xuICB2YXIgaWRlbnRQYXJ0ID0gJ1tcXCRfYS16QS1aMC05XSc7XG4gIHZhciBpZGVudFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgaWRlbnRTdGFydCArICcrJyArIGlkZW50UGFydCArICcqJyArICckJyk7XG5cbiAgZnVuY3Rpb24gZ2V0UGF0aENoYXJUeXBlKGNoYXIpIHtcbiAgICBpZiAoY2hhciA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuICdlb2YnO1xuXG4gICAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cbiAgICBzd2l0Y2goY29kZSkge1xuICAgICAgY2FzZSAweDVCOiAvLyBbXG4gICAgICBjYXNlIDB4NUQ6IC8vIF1cbiAgICAgIGNhc2UgMHgyRTogLy8gLlxuICAgICAgY2FzZSAweDIyOiAvLyBcIlxuICAgICAgY2FzZSAweDI3OiAvLyAnXG4gICAgICBjYXNlIDB4MzA6IC8vIDBcbiAgICAgICAgcmV0dXJuIGNoYXI7XG5cbiAgICAgIGNhc2UgMHg1RjogLy8gX1xuICAgICAgY2FzZSAweDI0OiAvLyAkXG4gICAgICAgIHJldHVybiAnaWRlbnQnO1xuXG4gICAgICBjYXNlIDB4MjA6IC8vIFNwYWNlXG4gICAgICBjYXNlIDB4MDk6IC8vIFRhYlxuICAgICAgY2FzZSAweDBBOiAvLyBOZXdsaW5lXG4gICAgICBjYXNlIDB4MEQ6IC8vIFJldHVyblxuICAgICAgY2FzZSAweEEwOiAgLy8gTm8tYnJlYWsgc3BhY2VcbiAgICAgIGNhc2UgMHhGRUZGOiAgLy8gQnl0ZSBPcmRlciBNYXJrXG4gICAgICBjYXNlIDB4MjAyODogIC8vIExpbmUgU2VwYXJhdG9yXG4gICAgICBjYXNlIDB4MjAyOTogIC8vIFBhcmFncmFwaCBTZXBhcmF0b3JcbiAgICAgICAgcmV0dXJuICd3cyc7XG4gICAgfVxuXG4gICAgLy8gYS16LCBBLVpcbiAgICBpZiAoKDB4NjEgPD0gY29kZSAmJiBjb2RlIDw9IDB4N0EpIHx8ICgweDQxIDw9IGNvZGUgJiYgY29kZSA8PSAweDVBKSlcbiAgICAgIHJldHVybiAnaWRlbnQnO1xuXG4gICAgLy8gMS05XG4gICAgaWYgKDB4MzEgPD0gY29kZSAmJiBjb2RlIDw9IDB4MzkpXG4gICAgICByZXR1cm4gJ251bWJlcic7XG5cbiAgICByZXR1cm4gJ2Vsc2UnO1xuICB9XG5cbiAgdmFyIHBhdGhTdGF0ZU1hY2hpbmUgPSB7XG4gICAgJ2JlZm9yZVBhdGgnOiB7XG4gICAgICAnd3MnOiBbJ2JlZm9yZVBhdGgnXSxcbiAgICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcbiAgICAgICdbJzogWydiZWZvcmVFbGVtZW50J10sXG4gICAgICAnZW9mJzogWydhZnRlclBhdGgnXVxuICAgIH0sXG5cbiAgICAnaW5QYXRoJzoge1xuICAgICAgJ3dzJzogWydpblBhdGgnXSxcbiAgICAgICcuJzogWydiZWZvcmVJZGVudCddLFxuICAgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2FmdGVyUGF0aCddXG4gICAgfSxcblxuICAgICdiZWZvcmVJZGVudCc6IHtcbiAgICAgICd3cyc6IFsnYmVmb3JlSWRlbnQnXSxcbiAgICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXVxuICAgIH0sXG5cbiAgICAnaW5JZGVudCc6IHtcbiAgICAgICdpZGVudCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcbiAgICAgICcwJzogWydpbklkZW50JywgJ2FwcGVuZCddLFxuICAgICAgJ251bWJlcic6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcbiAgICAgICd3cyc6IFsnaW5QYXRoJywgJ3B1c2gnXSxcbiAgICAgICcuJzogWydiZWZvcmVJZGVudCcsICdwdXNoJ10sXG4gICAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCcsICdwdXNoJ10sXG4gICAgICAnZW9mJzogWydhZnRlclBhdGgnLCAncHVzaCddXG4gICAgfSxcblxuICAgICdiZWZvcmVFbGVtZW50Jzoge1xuICAgICAgJ3dzJzogWydiZWZvcmVFbGVtZW50J10sXG4gICAgICAnMCc6IFsnYWZ0ZXJaZXJvJywgJ2FwcGVuZCddLFxuICAgICAgJ251bWJlcic6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcbiAgICAgIFwiJ1wiOiBbJ2luU2luZ2xlUXVvdGUnLCAnYXBwZW5kJywgJyddLFxuICAgICAgJ1wiJzogWydpbkRvdWJsZVF1b3RlJywgJ2FwcGVuZCcsICcnXVxuICAgIH0sXG5cbiAgICAnYWZ0ZXJaZXJvJzoge1xuICAgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnLCAncHVzaCddLFxuICAgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cbiAgICB9LFxuXG4gICAgJ2luSW5kZXgnOiB7XG4gICAgICAnMCc6IFsnaW5JbmRleCcsICdhcHBlbmQnXSxcbiAgICAgICdudW1iZXInOiBbJ2luSW5kZXgnLCAnYXBwZW5kJ10sXG4gICAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCddLFxuICAgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cbiAgICB9LFxuXG4gICAgJ2luU2luZ2xlUXVvdGUnOiB7XG4gICAgICBcIidcIjogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICdlb2YnOiBbJ2Vycm9yJ10sXG4gICAgICAnZWxzZSc6IFsnaW5TaW5nbGVRdW90ZScsICdhcHBlbmQnXVxuICAgIH0sXG5cbiAgICAnaW5Eb3VibGVRdW90ZSc6IHtcbiAgICAgICdcIic6IFsnYWZ0ZXJFbGVtZW50J10sXG4gICAgICAnZW9mJzogWydlcnJvciddLFxuICAgICAgJ2Vsc2UnOiBbJ2luRG91YmxlUXVvdGUnLCAnYXBwZW5kJ11cbiAgICB9LFxuXG4gICAgJ2FmdGVyRWxlbWVudCc6IHtcbiAgICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50J10sXG4gICAgICAnXSc6IFsnaW5QYXRoJywgJ3B1c2gnXVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gIGZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICB2YXIgaW5kZXggPSAtMTtcbiAgICB2YXIgYywgbmV3Q2hhciwga2V5LCB0eXBlLCB0cmFuc2l0aW9uLCBhY3Rpb24sIHR5cGVNYXAsIG1vZGUgPSAnYmVmb3JlUGF0aCc7XG5cbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgIHB1c2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICB9LFxuXG4gICAgICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAga2V5ID0gbmV3Q2hhclxuICAgICAgICBlbHNlXG4gICAgICAgICAga2V5ICs9IG5ld0NoYXI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlVW5lc2NhcGVRdW90ZSgpIHtcbiAgICAgIGlmIChpbmRleCA+PSBwYXRoLmxlbmd0aClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB2YXIgbmV4dENoYXIgPSBwYXRoW2luZGV4ICsgMV07XG4gICAgICBpZiAoKG1vZGUgPT0gJ2luU2luZ2xlUXVvdGUnICYmIG5leHRDaGFyID09IFwiJ1wiKSB8fFxuICAgICAgICAgIChtb2RlID09ICdpbkRvdWJsZVF1b3RlJyAmJiBuZXh0Q2hhciA9PSAnXCInKSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBuZXdDaGFyID0gbmV4dENoYXI7XG4gICAgICAgIGFjdGlvbnMuYXBwZW5kKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlIChtb2RlKSB7XG4gICAgICBpbmRleCsrO1xuICAgICAgYyA9IHBhdGhbaW5kZXhdO1xuXG4gICAgICBpZiAoYyA9PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKG1vZGUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdHlwZSA9IGdldFBhdGhDaGFyVHlwZShjKTtcbiAgICAgIHR5cGVNYXAgPSBwYXRoU3RhdGVNYWNoaW5lW21vZGVdO1xuICAgICAgdHJhbnNpdGlvbiA9IHR5cGVNYXBbdHlwZV0gfHwgdHlwZU1hcFsnZWxzZSddIHx8ICdlcnJvcic7XG5cbiAgICAgIGlmICh0cmFuc2l0aW9uID09ICdlcnJvcicpXG4gICAgICAgIHJldHVybjsgLy8gcGFyc2UgZXJyb3I7XG5cbiAgICAgIG1vZGUgPSB0cmFuc2l0aW9uWzBdO1xuICAgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXSB8fCBub29wO1xuICAgICAgbmV3Q2hhciA9IHRyYW5zaXRpb25bMl0gPT09IHVuZGVmaW5lZCA/IGMgOiB0cmFuc2l0aW9uWzJdO1xuICAgICAgYWN0aW9uKCk7XG5cbiAgICAgIGlmIChtb2RlID09PSAnYWZ0ZXJQYXRoJykge1xuICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47IC8vIHBhcnNlIGVycm9yXG4gIH1cblxuICBmdW5jdGlvbiBpc0lkZW50KHMpIHtcbiAgICByZXR1cm4gaWRlbnRSZWdFeHAudGVzdChzKTtcbiAgfVxuXG4gIHZhciBjb25zdHJ1Y3RvcklzUHJpdmF0ZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIFBhdGgocGFydHMsIHByaXZhdGVUb2tlbikge1xuICAgIGlmIChwcml2YXRlVG9rZW4gIT09IGNvbnN0cnVjdG9ySXNQcml2YXRlKVxuICAgICAgdGhyb3cgRXJyb3IoJ1VzZSBQYXRoLmdldCB0byByZXRyaWV2ZSBwYXRoIG9iamVjdHMnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucHVzaChTdHJpbmcocGFydHNbaV0pKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzRXZhbCAmJiB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZXRWYWx1ZUZyb20gPSB0aGlzLmNvbXBpbGVkR2V0VmFsdWVGcm9tRm4oKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPKHJhZmFlbHcpOiBNYWtlIHNpbXBsZSBMUlUgY2FjaGVcbiAgdmFyIHBhdGhDYWNoZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldFBhdGgocGF0aFN0cmluZykge1xuICAgIGlmIChwYXRoU3RyaW5nIGluc3RhbmNlb2YgUGF0aClcbiAgICAgIHJldHVybiBwYXRoU3RyaW5nO1xuXG4gICAgaWYgKHBhdGhTdHJpbmcgPT0gbnVsbCB8fCBwYXRoU3RyaW5nLmxlbmd0aCA9PSAwKVxuICAgICAgcGF0aFN0cmluZyA9ICcnO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoU3RyaW5nICE9ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNJbmRleChwYXRoU3RyaW5nLmxlbmd0aCkpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0ZWQgd2l0aCBhcnJheS1saWtlIChwcmUtcGFyc2VkKSBrZXlzXG4gICAgICAgIHJldHVybiBuZXcgUGF0aChwYXRoU3RyaW5nLCBjb25zdHJ1Y3RvcklzUHJpdmF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHBhdGhTdHJpbmcgPSBTdHJpbmcocGF0aFN0cmluZyk7XG4gICAgfVxuXG4gICAgdmFyIHBhdGggPSBwYXRoQ2FjaGVbcGF0aFN0cmluZ107XG4gICAgaWYgKHBhdGgpXG4gICAgICByZXR1cm4gcGF0aDtcblxuICAgIHZhciBwYXJ0cyA9IHBhcnNlUGF0aChwYXRoU3RyaW5nKTtcbiAgICBpZiAoIXBhcnRzKVxuICAgICAgcmV0dXJuIGludmFsaWRQYXRoO1xuXG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aChwYXJ0cywgY29uc3RydWN0b3JJc1ByaXZhdGUpO1xuICAgIHBhdGhDYWNoZVtwYXRoU3RyaW5nXSA9IHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBQYXRoLmdldCA9IGdldFBhdGg7XG5cbiAgZnVuY3Rpb24gZm9ybWF0QWNjZXNzb3Ioa2V5KSB7XG4gICAgaWYgKGlzSW5kZXgoa2V5KSkge1xuICAgICAgcmV0dXJuICdbJyArIGtleSArICddJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdbXCInICsga2V5LnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nO1xuICAgIH1cbiAgfVxuXG4gIFBhdGgucHJvdG90eXBlID0gY3JlYXRlT2JqZWN0KHtcbiAgICBfX3Byb3RvX186IFtdLFxuICAgIHZhbGlkOiB0cnVlLFxuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBhdGhTdHJpbmcgPSAnJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gdGhpc1tpXTtcbiAgICAgICAgaWYgKGlzSWRlbnQoa2V5KSkge1xuICAgICAgICAgIHBhdGhTdHJpbmcgKz0gaSA/ICcuJyArIGtleSA6IGtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoU3RyaW5nICs9IGZvcm1hdEFjY2Vzc29yKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdGhTdHJpbmc7XG4gICAgfSxcblxuICAgIGdldFZhbHVlRnJvbTogZnVuY3Rpb24ob2JqLCBkaXJlY3RPYnNlcnZlcikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbClcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIG9iaiA9IG9ialt0aGlzW2ldXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcblxuICAgIGl0ZXJhdGVPYmplY3RzOiBmdW5jdGlvbihvYmosIG9ic2VydmUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSlcbiAgICAgICAgICBvYmogPSBvYmpbdGhpc1tpIC0gMV1dO1xuICAgICAgICBpZiAoIWlzT2JqZWN0KG9iaikpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvYnNlcnZlKG9iaiwgdGhpc1swXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBpbGVkR2V0VmFsdWVGcm9tRm46IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgdmFyIHBhdGhTdHJpbmcgPSAnb2JqJztcbiAgICAgIHN0ciArPSAnaWYgKG9iaiAhPSBudWxsJztcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBrZXk7XG4gICAgICBmb3IgKDsgaSA8ICh0aGlzLmxlbmd0aCAtIDEpOyBpKyspIHtcbiAgICAgICAga2V5ID0gdGhpc1tpXTtcbiAgICAgICAgcGF0aFN0cmluZyArPSBpc0lkZW50KGtleSkgPyAnLicgKyBrZXkgOiBmb3JtYXRBY2Nlc3NvcihrZXkpO1xuICAgICAgICBzdHIgKz0gJyAmJlxcbiAgICAgJyArIHBhdGhTdHJpbmcgKyAnICE9IG51bGwnO1xuICAgICAgfVxuICAgICAgc3RyICs9ICcpXFxuJztcblxuICAgICAgdmFyIGtleSA9IHRoaXNbaV07XG4gICAgICBwYXRoU3RyaW5nICs9IGlzSWRlbnQoa2V5KSA/ICcuJyArIGtleSA6IGZvcm1hdEFjY2Vzc29yKGtleSk7XG5cbiAgICAgIHN0ciArPSAnICByZXR1cm4gJyArIHBhdGhTdHJpbmcgKyAnO1xcbmVsc2VcXG4gIHJldHVybiB1bmRlZmluZWQ7JztcbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ29iaicsIHN0cik7XG4gICAgfSxcblxuICAgIHNldFZhbHVlRnJvbTogZnVuY3Rpb24ob2JqLCB2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qob2JqKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIG9iaiA9IG9ialt0aGlzW2ldXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc09iamVjdChvYmopKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIG9ialt0aGlzW2ldXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICB2YXIgaW52YWxpZFBhdGggPSBuZXcgUGF0aCgnJywgY29uc3RydWN0b3JJc1ByaXZhdGUpO1xuICBpbnZhbGlkUGF0aC52YWxpZCA9IGZhbHNlO1xuICBpbnZhbGlkUGF0aC5nZXRWYWx1ZUZyb20gPSBpbnZhbGlkUGF0aC5zZXRWYWx1ZUZyb20gPSBmdW5jdGlvbigpIHt9O1xuXG4gIHZhciBNQVhfRElSVFlfQ0hFQ0tfQ1lDTEVTID0gMTAwMDtcblxuICBmdW5jdGlvbiBkaXJ0eUNoZWNrKG9ic2VydmVyKSB7XG4gICAgdmFyIGN5Y2xlcyA9IDA7XG4gICAgd2hpbGUgKGN5Y2xlcyA8IE1BWF9ESVJUWV9DSEVDS19DWUNMRVMgJiYgb2JzZXJ2ZXIuY2hlY2tfKCkpIHtcbiAgICAgIGN5Y2xlcysrO1xuICAgIH1cbiAgICBpZiAodGVzdGluZ0V4cG9zZUN5Y2xlQ291bnQpXG4gICAgICBnbG9iYWwuZGlydHlDaGVja0N5Y2xlQ291bnQgPSBjeWNsZXM7XG5cbiAgICByZXR1cm4gY3ljbGVzID4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdElzRW1wdHkob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBkaWZmSXNFbXB0eShkaWZmKSB7XG4gICAgcmV0dXJuIG9iamVjdElzRW1wdHkoZGlmZi5hZGRlZCkgJiZcbiAgICAgICAgICAgb2JqZWN0SXNFbXB0eShkaWZmLnJlbW92ZWQpICYmXG4gICAgICAgICAgIG9iamVjdElzRW1wdHkoZGlmZi5jaGFuZ2VkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZPYmplY3RGcm9tT2xkT2JqZWN0KG9iamVjdCwgb2xkT2JqZWN0KSB7XG4gICAgdmFyIGFkZGVkID0ge307XG4gICAgdmFyIHJlbW92ZWQgPSB7fTtcbiAgICB2YXIgY2hhbmdlZCA9IHt9O1xuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBvbGRPYmplY3QpIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IG9iamVjdFtwcm9wXTtcblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWUgPT09IG9sZE9iamVjdFtwcm9wXSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmICghKHByb3AgaW4gb2JqZWN0KSkge1xuICAgICAgICByZW1vdmVkW3Byb3BdID0gdW5kZWZpbmVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRPYmplY3RbcHJvcF0pXG4gICAgICAgIGNoYW5nZWRbcHJvcF0gPSBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdCkge1xuICAgICAgaWYgKHByb3AgaW4gb2xkT2JqZWN0KVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgYWRkZWRbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSAmJiBvYmplY3QubGVuZ3RoICE9PSBvbGRPYmplY3QubGVuZ3RoKVxuICAgICAgY2hhbmdlZC5sZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZGVkOiBhZGRlZCxcbiAgICAgIHJlbW92ZWQ6IHJlbW92ZWQsXG4gICAgICBjaGFuZ2VkOiBjaGFuZ2VkXG4gICAgfTtcbiAgfVxuXG4gIHZhciBlb21UYXNrcyA9IFtdO1xuICBmdW5jdGlvbiBydW5FT01UYXNrcygpIHtcbiAgICBpZiAoIWVvbVRhc2tzLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW9tVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVvbVRhc2tzW2ldKCk7XG4gICAgfVxuICAgIGVvbVRhc2tzLmxlbmd0aCA9IDA7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgcnVuRU9NID0gaGFzT2JzZXJ2ZSA/IChmdW5jdGlvbigpe1xuICAgIHZhciBlb21PYmogPSB7IHBpbmdQb25nOiB0cnVlIH07XG4gICAgdmFyIGVvbVJ1blNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gICAgT2JqZWN0Lm9ic2VydmUoZW9tT2JqLCBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bkVPTVRhc2tzKCk7XG4gICAgICBlb21SdW5TY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgZW9tVGFza3MucHVzaChmbik7XG4gICAgICBpZiAoIWVvbVJ1blNjaGVkdWxlZCkge1xuICAgICAgICBlb21SdW5TY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICBlb21PYmoucGluZ1BvbmcgPSAhZW9tT2JqLnBpbmdQb25nO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7XG4gICAgICBlb21UYXNrcy5wdXNoKGZuKTtcbiAgICB9O1xuICB9KSgpO1xuXG4gIHZhciBvYnNlcnZlZE9iamVjdENhY2hlID0gW107XG5cbiAgZnVuY3Rpb24gbmV3T2JzZXJ2ZWRPYmplY3QoKSB7XG4gICAgdmFyIG9ic2VydmVyO1xuICAgIHZhciBvYmplY3Q7XG4gICAgdmFyIGRpc2NhcmRSZWNvcmRzID0gZmFsc2U7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlY29yZHMpIHtcbiAgICAgIGlmIChvYnNlcnZlciAmJiBvYnNlcnZlci5zdGF0ZV8gPT09IE9QRU5FRCAmJiAhZGlzY2FyZFJlY29yZHMpXG4gICAgICAgIG9ic2VydmVyLmNoZWNrXyhyZWNvcmRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb3BlbjogZnVuY3Rpb24ob2JzKSB7XG4gICAgICAgIGlmIChvYnNlcnZlcilcbiAgICAgICAgICB0aHJvdyBFcnJvcignT2JzZXJ2ZWRPYmplY3QgaW4gdXNlJyk7XG5cbiAgICAgICAgaWYgKCFmaXJzdClcbiAgICAgICAgICBPYmplY3QuZGVsaXZlckNoYW5nZVJlY29yZHMoY2FsbGJhY2spO1xuXG4gICAgICAgIG9ic2VydmVyID0gb2JzO1xuICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIG9ic2VydmU6IGZ1bmN0aW9uKG9iaiwgYXJyYXlPYnNlcnZlKSB7XG4gICAgICAgIG9iamVjdCA9IG9iajtcbiAgICAgICAgaWYgKGFycmF5T2JzZXJ2ZSlcbiAgICAgICAgICBBcnJheS5vYnNlcnZlKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgT2JqZWN0Lm9ic2VydmUob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgZGVsaXZlcjogZnVuY3Rpb24oZGlzY2FyZCkge1xuICAgICAgICBkaXNjYXJkUmVjb3JkcyA9IGRpc2NhcmQ7XG4gICAgICAgIE9iamVjdC5kZWxpdmVyQ2hhbmdlUmVjb3JkcyhjYWxsYmFjayk7XG4gICAgICAgIGRpc2NhcmRSZWNvcmRzID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBvYnNlcnZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgT2JqZWN0LnVub2JzZXJ2ZShvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgICAgb2JzZXJ2ZWRPYmplY3RDYWNoZS5wdXNoKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgKiBUaGUgb2JzZXJ2ZWRTZXQgYWJzdHJhY3Rpb24gaXMgYSBwZXJmIG9wdGltaXphdGlvbiB3aGljaCByZWR1Y2VzIHRoZSB0b3RhbFxuICAgKiBudW1iZXIgb2YgT2JqZWN0Lm9ic2VydmUgb2JzZXJ2YXRpb25zIG9mIGEgc2V0IG9mIG9iamVjdHMuIFRoZSBpZGVhIGlzIHRoYXRcbiAgICogZ3JvdXBzIG9mIE9ic2VydmVycyB3aWxsIGhhdmUgc29tZSBvYmplY3QgZGVwZW5kZW5jaWVzIGluIGNvbW1vbiBhbmQgdGhpc1xuICAgKiBvYnNlcnZlZCBzZXQgZW5zdXJlcyB0aGF0IGVhY2ggb2JqZWN0IGluIHRoZSB0cmFuc2l0aXZlIGNsb3N1cmUgb2ZcbiAgICogZGVwZW5kZW5jaWVzIGlzIG9ubHkgb2JzZXJ2ZWQgb25jZS4gVGhlIG9ic2VydmVkU2V0IGFjdHMgYXMgYSB3cml0ZSBiYXJyaWVyXG4gICAqIHN1Y2ggdGhhdCB3aGVuZXZlciBhbnkgY2hhbmdlIGNvbWVzIHRocm91Z2gsIGFsbCBPYnNlcnZlcnMgYXJlIGNoZWNrZWQgZm9yXG4gICAqIGNoYW5nZWQgdmFsdWVzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBvcHRpbWl6YXRpb24gaXMgZXhwbGljaXRseSBtb3Zpbmcgd29yayBmcm9tIHNldHVwLXRpbWUgdG9cbiAgICogY2hhbmdlLXRpbWUuXG4gICAqXG4gICAqIFRPRE8ocmFmYWVsdyk6IEltcGxlbWVudCBcImdhcmJhZ2UgY29sbGVjdGlvblwiLiBJbiBvcmRlciB0byBtb3ZlIHdvcmsgb2ZmXG4gICAqIHRoZSBjcml0aWNhbCBwYXRoLCB3aGVuIE9ic2VydmVycyBhcmUgY2xvc2VkLCB0aGVpciBvYnNlcnZlZCBvYmplY3RzIGFyZVxuICAgKiBub3QgT2JqZWN0LnVub2JzZXJ2ZShkKS4gQXMgYSByZXN1bHQsIGl0J3MgcG9zc2libGUgdGhhdCBpZiB0aGUgb2JzZXJ2ZWRTZXRcbiAgICogaXMga2VwdCBvcGVuLCBidXQgc29tZSBPYnNlcnZlcnMgaGF2ZSBiZWVuIGNsb3NlZCwgaXQgY291bGQgY2F1c2UgXCJsZWFrc1wiXG4gICAqIChwcmV2ZW50IG90aGVyd2lzZSBjb2xsZWN0YWJsZSBvYmplY3RzIGZyb20gYmVpbmcgY29sbGVjdGVkKS4gQXQgc29tZVxuICAgKiBwb2ludCwgd2Ugc2hvdWxkIGltcGxlbWVudCBpbmNyZW1lbnRhbCBcImdjXCIgd2hpY2gga2VlcHMgYSBsaXN0IG9mXG4gICAqIG9ic2VydmVkU2V0cyB3aGljaCBtYXkgbmVlZCBjbGVhbi11cCBhbmQgZG9lcyBzbWFsbCBhbW91bnRzIG9mIGNsZWFudXAgb24gYVxuICAgKiB0aW1lb3V0IHVudGlsIGFsbCBpcyBjbGVhbi5cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0T2JzZXJ2ZWRPYmplY3Qob2JzZXJ2ZXIsIG9iamVjdCwgYXJyYXlPYnNlcnZlKSB7XG4gICAgdmFyIGRpciA9IG9ic2VydmVkT2JqZWN0Q2FjaGUucG9wKCkgfHwgbmV3T2JzZXJ2ZWRPYmplY3QoKTtcbiAgICBkaXIub3BlbihvYnNlcnZlcik7XG4gICAgZGlyLm9ic2VydmUob2JqZWN0LCBhcnJheU9ic2VydmUpO1xuICAgIHJldHVybiBkaXI7XG4gIH1cblxuICB2YXIgb2JzZXJ2ZWRTZXRDYWNoZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIG5ld09ic2VydmVkU2V0KCkge1xuICAgIHZhciBvYnNlcnZlckNvdW50ID0gMDtcbiAgICB2YXIgb2JzZXJ2ZXJzID0gW107XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICB2YXIgcm9vdE9iajtcbiAgICB2YXIgcm9vdE9ialByb3BzO1xuXG4gICAgZnVuY3Rpb24gb2JzZXJ2ZShvYmosIHByb3ApIHtcbiAgICAgIGlmICghb2JqKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGlmIChvYmogPT09IHJvb3RPYmopXG4gICAgICAgIHJvb3RPYmpQcm9wc1twcm9wXSA9IHRydWU7XG5cbiAgICAgIGlmIChvYmplY3RzLmluZGV4T2Yob2JqKSA8IDApIHtcbiAgICAgICAgb2JqZWN0cy5wdXNoKG9iaik7XG4gICAgICAgIE9iamVjdC5vYnNlcnZlKG9iaiwgY2FsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICBvYnNlcnZlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopLCBwcm9wKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbGxSb290T2JqTm9uT2JzZXJ2ZWRQcm9wcyhyZWNzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJlYyA9IHJlY3NbaV07XG4gICAgICAgIGlmIChyZWMub2JqZWN0ICE9PSByb290T2JqIHx8XG4gICAgICAgICAgICByb290T2JqUHJvcHNbcmVjLm5hbWVdIHx8XG4gICAgICAgICAgICByZWMudHlwZSA9PT0gJ3NldFByb3RvdHlwZScpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlY3MpIHtcbiAgICAgIGlmIChhbGxSb290T2JqTm9uT2JzZXJ2ZWRQcm9wcyhyZWNzKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB2YXIgb2JzZXJ2ZXI7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcbiAgICAgICAgaWYgKG9ic2VydmVyLnN0YXRlXyA9PSBPUEVORUQpIHtcbiAgICAgICAgICBvYnNlcnZlci5pdGVyYXRlT2JqZWN0c18ob2JzZXJ2ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XG4gICAgICAgIGlmIChvYnNlcnZlci5zdGF0ZV8gPT0gT1BFTkVEKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuY2hlY2tfKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgb2JqZWN0OiB1bmRlZmluZWQsXG4gICAgICBvYmplY3RzOiBvYmplY3RzLFxuICAgICAgb3BlbjogZnVuY3Rpb24ob2JzLCBvYmplY3QpIHtcbiAgICAgICAgaWYgKCFyb290T2JqKSB7XG4gICAgICAgICAgcm9vdE9iaiA9IG9iamVjdDtcbiAgICAgICAgICByb290T2JqUHJvcHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVycy5wdXNoKG9icyk7XG4gICAgICAgIG9ic2VydmVyQ291bnQrKztcbiAgICAgICAgb2JzLml0ZXJhdGVPYmplY3RzXyhvYnNlcnZlKTtcbiAgICAgIH0sXG4gICAgICBjbG9zZTogZnVuY3Rpb24ob2JzKSB7XG4gICAgICAgIG9ic2VydmVyQ291bnQtLTtcbiAgICAgICAgaWYgKG9ic2VydmVyQ291bnQgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgT2JqZWN0LnVub2JzZXJ2ZShvYmplY3RzW2ldLCBjYWxsYmFjayk7XG4gICAgICAgICAgT2JzZXJ2ZXIudW5vYnNlcnZlZENvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgb2JqZWN0cy5sZW5ndGggPSAwO1xuICAgICAgICByb290T2JqID0gdW5kZWZpbmVkO1xuICAgICAgICByb290T2JqUHJvcHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIG9ic2VydmVkU2V0Q2FjaGUucHVzaCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxuXG4gIHZhciBsYXN0T2JzZXJ2ZWRTZXQ7XG5cbiAgZnVuY3Rpb24gZ2V0T2JzZXJ2ZWRTZXQob2JzZXJ2ZXIsIG9iaikge1xuICAgIGlmICghbGFzdE9ic2VydmVkU2V0IHx8IGxhc3RPYnNlcnZlZFNldC5vYmplY3QgIT09IG9iaikge1xuICAgICAgbGFzdE9ic2VydmVkU2V0ID0gb2JzZXJ2ZWRTZXRDYWNoZS5wb3AoKSB8fCBuZXdPYnNlcnZlZFNldCgpO1xuICAgICAgbGFzdE9ic2VydmVkU2V0Lm9iamVjdCA9IG9iajtcbiAgICB9XG4gICAgbGFzdE9ic2VydmVkU2V0Lm9wZW4ob2JzZXJ2ZXIsIG9iaik7XG4gICAgcmV0dXJuIGxhc3RPYnNlcnZlZFNldDtcbiAgfVxuXG4gIHZhciBVTk9QRU5FRCA9IDA7XG4gIHZhciBPUEVORUQgPSAxO1xuICB2YXIgQ0xPU0VEID0gMjtcbiAgdmFyIFJFU0VUVElORyA9IDM7XG5cbiAgdmFyIG5leHRPYnNlcnZlcklkID0gMTtcblxuICBmdW5jdGlvbiBPYnNlcnZlcigpIHtcbiAgICB0aGlzLnN0YXRlXyA9IFVOT1BFTkVEO1xuICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGFyZ2V0XyA9IHVuZGVmaW5lZDsgLy8gVE9ETyhyYWZhZWx3KTogU2hvdWxkIGJlIFdlYWtSZWZcbiAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmlkXyA9IG5leHRPYnNlcnZlcklkKys7XG4gIH1cblxuICBPYnNlcnZlci5wcm90b3R5cGUgPSB7XG4gICAgb3BlbjogZnVuY3Rpb24oY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IFVOT1BFTkVEKVxuICAgICAgICB0aHJvdyBFcnJvcignT2JzZXJ2ZXIgaGFzIGFscmVhZHkgYmVlbiBvcGVuZWQuJyk7XG5cbiAgICAgIGFkZFRvQWxsKHRoaXMpO1xuICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcbiAgICAgIHRoaXMudGFyZ2V0XyA9IHRhcmdldDtcbiAgICAgIHRoaXMuY29ubmVjdF8oKTtcbiAgICAgIHRoaXMuc3RhdGVfID0gT1BFTkVEO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIHJlbW92ZUZyb21BbGwodGhpcyk7XG4gICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XG4gICAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5zdGF0ZV8gPSBDTE9TRUQ7XG4gICAgfSxcblxuICAgIGRlbGl2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IE9QRU5FRClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBkaXJ0eUNoZWNrKHRoaXMpO1xuICAgIH0sXG5cbiAgICByZXBvcnRfOiBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrXy5hcHBseSh0aGlzLnRhcmdldF8sIGNoYW5nZXMpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgT2JzZXJ2ZXIuX2Vycm9yVGhyb3duRHVyaW5nQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFeGNlcHRpb24gY2F1Z2h0IGR1cmluZyBvYnNlcnZlciBjYWxsYmFjazogJyArXG4gICAgICAgICAgICAgICAgICAgICAgIChleC5zdGFjayB8fCBleCkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNjYXJkQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNoZWNrXyh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2xsZWN0T2JzZXJ2ZXJzID0gIWhhc09ic2VydmU7XG4gIHZhciBhbGxPYnNlcnZlcnM7XG4gIE9ic2VydmVyLl9hbGxPYnNlcnZlcnNDb3VudCA9IDA7XG5cbiAgaWYgKGNvbGxlY3RPYnNlcnZlcnMpIHtcbiAgICBhbGxPYnNlcnZlcnMgPSBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRvQWxsKG9ic2VydmVyKSB7XG4gICAgT2JzZXJ2ZXIuX2FsbE9ic2VydmVyc0NvdW50Kys7XG4gICAgaWYgKCFjb2xsZWN0T2JzZXJ2ZXJzKVxuICAgICAgcmV0dXJuO1xuXG4gICAgYWxsT2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRnJvbUFsbChvYnNlcnZlcikge1xuICAgIE9ic2VydmVyLl9hbGxPYnNlcnZlcnNDb3VudC0tO1xuICB9XG5cbiAgdmFyIHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50ID0gZmFsc2U7XG5cbiAgZ2xvYmFsLlBsYXRmb3JtID0gZ2xvYmFsLlBsYXRmb3JtIHx8IHt9O1xuXG4gIGdsb2JhbC5QbGF0Zm9ybS5wZXJmb3JtTWljcm90YXNrQ2hlY2twb2ludCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChydW5uaW5nTWljcm90YXNrQ2hlY2twb2ludClcbiAgICAgIHJldHVybjtcblxuICAgIGlmICghY29sbGVjdE9ic2VydmVycylcbiAgICAgIHJldHVybjtcblxuICAgIHJ1bm5pbmdNaWNyb3Rhc2tDaGVja3BvaW50ID0gdHJ1ZTtcblxuICAgIHZhciBjeWNsZXMgPSAwO1xuICAgIHZhciBhbnlDaGFuZ2VkLCB0b0NoZWNrO1xuXG4gICAgZG8ge1xuICAgICAgY3ljbGVzKys7XG4gICAgICB0b0NoZWNrID0gYWxsT2JzZXJ2ZXJzO1xuICAgICAgYWxsT2JzZXJ2ZXJzID0gW107XG4gICAgICBhbnlDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9DaGVjay5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSB0b0NoZWNrW2ldO1xuICAgICAgICBpZiAob2JzZXJ2ZXIuc3RhdGVfICE9IE9QRU5FRClcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBpZiAob2JzZXJ2ZXIuY2hlY2tfKCkpXG4gICAgICAgICAgYW55Q2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgYWxsT2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHJ1bkVPTVRhc2tzKCkpXG4gICAgICAgIGFueUNoYW5nZWQgPSB0cnVlO1xuICAgIH0gd2hpbGUgKGN5Y2xlcyA8IE1BWF9ESVJUWV9DSEVDS19DWUNMRVMgJiYgYW55Q2hhbmdlZCk7XG5cbiAgICBpZiAodGVzdGluZ0V4cG9zZUN5Y2xlQ291bnQpXG4gICAgICBnbG9iYWwuZGlydHlDaGVja0N5Y2xlQ291bnQgPSBjeWNsZXM7XG5cbiAgICBydW5uaW5nTWljcm90YXNrQ2hlY2twb2ludCA9IGZhbHNlO1xuICB9O1xuXG4gIGlmIChjb2xsZWN0T2JzZXJ2ZXJzKSB7XG4gICAgZ2xvYmFsLlBsYXRmb3JtLmNsZWFyT2JzZXJ2ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICBhbGxPYnNlcnZlcnMgPSBbXTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gT2JqZWN0T2JzZXJ2ZXIob2JqZWN0KSB7XG4gICAgT2JzZXJ2ZXIuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnZhbHVlXyA9IG9iamVjdDtcbiAgICB0aGlzLm9sZE9iamVjdF8gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBPYmplY3RPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuICAgIF9fcHJvdG9fXzogT2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgYXJyYXlPYnNlcnZlOiBmYWxzZSxcblxuICAgIGNvbm5lY3RfOiBmdW5jdGlvbihjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IGdldE9ic2VydmVkT2JqZWN0KHRoaXMsIHRoaXMudmFsdWVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPYnNlcnZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHRoaXMuY29weU9iamVjdCh0aGlzLnZhbHVlXyk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29weU9iamVjdDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICB2YXIgY29weSA9IEFycmF5LmlzQXJyYXkob2JqZWN0KSA/IFtdIDoge307XG4gICAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdCkge1xuICAgICAgICBjb3B5W3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuICAgICAgfTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpXG4gICAgICAgIGNvcHkubGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgICAgIHJldHVybiBjb3B5O1xuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMsIHNraXBDaGFuZ2VzKSB7XG4gICAgICB2YXIgZGlmZjtcbiAgICAgIHZhciBvbGRWYWx1ZXM7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICBpZiAoIWNoYW5nZVJlY29yZHMpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIG9sZFZhbHVlcyA9IHt9O1xuICAgICAgICBkaWZmID0gZGlmZk9iamVjdEZyb21DaGFuZ2VSZWNvcmRzKHRoaXMudmFsdWVfLCBjaGFuZ2VSZWNvcmRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbGRWYWx1ZXMgPSB0aGlzLm9sZE9iamVjdF87XG4gICAgICAgIGRpZmYgPSBkaWZmT2JqZWN0RnJvbU9sZE9iamVjdCh0aGlzLnZhbHVlXywgdGhpcy5vbGRPYmplY3RfKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpZmZJc0VtcHR5KGRpZmYpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmICghaGFzT2JzZXJ2ZSlcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcblxuICAgICAgdGhpcy5yZXBvcnRfKFtcbiAgICAgICAgZGlmZi5hZGRlZCB8fCB7fSxcbiAgICAgICAgZGlmZi5yZW1vdmVkIHx8IHt9LFxuICAgICAgICBkaWZmLmNoYW5nZWQgfHwge30sXG4gICAgICAgIGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgICAgcmV0dXJuIG9sZFZhbHVlc1twcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIF0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uY2xvc2UoKTtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRlbGl2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IE9QRU5FRClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAoaGFzT2JzZXJ2ZSlcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uZGVsaXZlcihmYWxzZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGRpcnR5Q2hlY2sodGhpcyk7XG4gICAgfSxcblxuICAgIGRpc2NhcmRDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmRpcmVjdE9ic2VydmVyXylcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uZGVsaXZlcih0cnVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdGhpcy5jb3B5T2JqZWN0KHRoaXMudmFsdWVfKTtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gQXJyYXlPYnNlcnZlcihhcnJheSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpXG4gICAgICB0aHJvdyBFcnJvcignUHJvdmlkZWQgb2JqZWN0IGlzIG5vdCBhbiBBcnJheScpO1xuICAgIE9iamVjdE9ic2VydmVyLmNhbGwodGhpcywgYXJyYXkpO1xuICB9XG5cbiAgQXJyYXlPYnNlcnZlci5wcm90b3R5cGUgPSBjcmVhdGVPYmplY3Qoe1xuXG4gICAgX19wcm90b19fOiBPYmplY3RPYnNlcnZlci5wcm90b3R5cGUsXG5cbiAgICBhcnJheU9ic2VydmU6IHRydWUsXG5cbiAgICBjb3B5T2JqZWN0OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcbiAgICB9LFxuXG4gICAgY2hlY2tfOiBmdW5jdGlvbihjaGFuZ2VSZWNvcmRzKSB7XG4gICAgICB2YXIgc3BsaWNlcztcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIGlmICghY2hhbmdlUmVjb3JkcylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHNwbGljZXMgPSBwcm9qZWN0QXJyYXlTcGxpY2VzKHRoaXMudmFsdWVfLCBjaGFuZ2VSZWNvcmRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwbGljZXMgPSBjYWxjU3BsaWNlcyh0aGlzLnZhbHVlXywgMCwgdGhpcy52YWx1ZV8ubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGRPYmplY3RfLCAwLCB0aGlzLm9sZE9iamVjdF8ubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzcGxpY2VzIHx8ICFzcGxpY2VzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBpZiAoIWhhc09ic2VydmUpXG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHRoaXMuY29weU9iamVjdCh0aGlzLnZhbHVlXyk7XG5cbiAgICAgIHRoaXMucmVwb3J0Xyhbc3BsaWNlc10pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBBcnJheU9ic2VydmVyLmFwcGx5U3BsaWNlcyA9IGZ1bmN0aW9uKHByZXZpb3VzLCBjdXJyZW50LCBzcGxpY2VzKSB7XG4gICAgc3BsaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHNwbGljZSkge1xuICAgICAgdmFyIHNwbGljZUFyZ3MgPSBbc3BsaWNlLmluZGV4LCBzcGxpY2UucmVtb3ZlZC5sZW5ndGhdO1xuICAgICAgdmFyIGFkZEluZGV4ID0gc3BsaWNlLmluZGV4O1xuICAgICAgd2hpbGUgKGFkZEluZGV4IDwgc3BsaWNlLmluZGV4ICsgc3BsaWNlLmFkZGVkQ291bnQpIHtcbiAgICAgICAgc3BsaWNlQXJncy5wdXNoKGN1cnJlbnRbYWRkSW5kZXhdKTtcbiAgICAgICAgYWRkSW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShwcmV2aW91cywgc3BsaWNlQXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gUGF0aE9ic2VydmVyKG9iamVjdCwgcGF0aCkge1xuICAgIE9ic2VydmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLm9iamVjdF8gPSBvYmplY3Q7XG4gICAgdGhpcy5wYXRoXyA9IGdldFBhdGgocGF0aCk7XG4gICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBQYXRoT2JzZXJ2ZXIucHJvdG90eXBlID0gY3JlYXRlT2JqZWN0KHtcbiAgICBfX3Byb3RvX186IE9ic2VydmVyLnByb3RvdHlwZSxcblxuICAgIGdldCBwYXRoKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aF87XG4gICAgfSxcblxuICAgIGNvbm5lY3RfOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IGdldE9ic2VydmVkU2V0KHRoaXMsIHRoaXMub2JqZWN0Xyk7XG5cbiAgICAgIHRoaXMuY2hlY2tfKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGRpc2Nvbm5lY3RfOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodGhpcy5kaXJlY3RPYnNlcnZlcl8pIHtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8uY2xvc2UodGhpcyk7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBpdGVyYXRlT2JqZWN0c186IGZ1bmN0aW9uKG9ic2VydmUpIHtcbiAgICAgIHRoaXMucGF0aF8uaXRlcmF0ZU9iamVjdHModGhpcy5vYmplY3RfLCBvYnNlcnZlKTtcbiAgICB9LFxuXG4gICAgY2hlY2tfOiBmdW5jdGlvbihjaGFuZ2VSZWNvcmRzLCBza2lwQ2hhbmdlcykge1xuICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZV87XG4gICAgICB0aGlzLnZhbHVlXyA9IHRoaXMucGF0aF8uZ2V0VmFsdWVGcm9tKHRoaXMub2JqZWN0Xyk7XG4gICAgICBpZiAoc2tpcENoYW5nZXMgfHwgYXJlU2FtZVZhbHVlKHRoaXMudmFsdWVfLCBvbGRWYWx1ZSkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgdGhpcy5yZXBvcnRfKFt0aGlzLnZhbHVlXywgb2xkVmFsdWUsIHRoaXNdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnBhdGhfKVxuICAgICAgICB0aGlzLnBhdGhfLnNldFZhbHVlRnJvbSh0aGlzLm9iamVjdF8sIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIENvbXBvdW5kT2JzZXJ2ZXIocmVwb3J0Q2hhbmdlc09uT3Blbikge1xuICAgIE9ic2VydmVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnJlcG9ydENoYW5nZXNPbk9wZW5fID0gcmVwb3J0Q2hhbmdlc09uT3BlbjtcbiAgICB0aGlzLnZhbHVlXyA9IFtdO1xuICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub2JzZXJ2ZWRfID0gW107XG4gIH1cblxuICB2YXIgb2JzZXJ2ZXJTZW50aW5lbCA9IHt9O1xuXG4gIENvbXBvdW5kT2JzZXJ2ZXIucHJvdG90eXBlID0gY3JlYXRlT2JqZWN0KHtcbiAgICBfX3Byb3RvX186IE9ic2VydmVyLnByb3RvdHlwZSxcblxuICAgIGNvbm5lY3RfOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgIHZhciBuZWVkc0RpcmVjdE9ic2VydmVyID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vYnNlcnZlZF8ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICBvYmplY3QgPSB0aGlzLm9ic2VydmVkX1tpXVxuICAgICAgICAgIGlmIChvYmplY3QgIT09IG9ic2VydmVyU2VudGluZWwpIHtcbiAgICAgICAgICAgIG5lZWRzRGlyZWN0T2JzZXJ2ZXIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5lZWRzRGlyZWN0T2JzZXJ2ZXIpXG4gICAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSBnZXRPYnNlcnZlZFNldCh0aGlzLCBvYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrXyh1bmRlZmluZWQsICF0aGlzLnJlcG9ydENoYW5nZXNPbk9wZW5fKTtcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdF86IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBpZiAodGhpcy5vYnNlcnZlZF9baV0gPT09IG9ic2VydmVyU2VudGluZWwpXG4gICAgICAgICAgdGhpcy5vYnNlcnZlZF9baSArIDFdLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9ic2VydmVkXy5sZW5ndGggPSAwO1xuICAgICAgdGhpcy52YWx1ZV8ubGVuZ3RoID0gMDtcblxuICAgICAgaWYgKHRoaXMuZGlyZWN0T2JzZXJ2ZXJfKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfLmNsb3NlKHRoaXMpO1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkUGF0aDogZnVuY3Rpb24ob2JqZWN0LCBwYXRoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gVU5PUEVORUQgJiYgdGhpcy5zdGF0ZV8gIT0gUkVTRVRUSU5HKVxuICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGFkZCBwYXRocyBvbmNlIHN0YXJ0ZWQuJyk7XG5cbiAgICAgIHZhciBwYXRoID0gZ2V0UGF0aChwYXRoKTtcbiAgICAgIHRoaXMub2JzZXJ2ZWRfLnB1c2gob2JqZWN0LCBwYXRoKTtcbiAgICAgIGlmICghdGhpcy5yZXBvcnRDaGFuZ2VzT25PcGVuXylcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIGluZGV4ID0gdGhpcy5vYnNlcnZlZF8ubGVuZ3RoIC8gMiAtIDE7XG4gICAgICB0aGlzLnZhbHVlX1tpbmRleF0gPSBwYXRoLmdldFZhbHVlRnJvbShvYmplY3QpO1xuICAgIH0sXG5cbiAgICBhZGRPYnNlcnZlcjogZnVuY3Rpb24ob2JzZXJ2ZXIpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBVTk9QRU5FRCAmJiB0aGlzLnN0YXRlXyAhPSBSRVNFVFRJTkcpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgYWRkIG9ic2VydmVycyBvbmNlIHN0YXJ0ZWQuJyk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZWRfLnB1c2gob2JzZXJ2ZXJTZW50aW5lbCwgb2JzZXJ2ZXIpO1xuICAgICAgaWYgKCF0aGlzLnJlcG9ydENoYW5nZXNPbk9wZW5fKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLm9ic2VydmVkXy5sZW5ndGggLyAyIC0gMTtcbiAgICAgIHRoaXMudmFsdWVfW2luZGV4XSA9IG9ic2VydmVyLm9wZW4odGhpcy5kZWxpdmVyLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgc3RhcnRSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gT1BFTkVEKVxuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG9ubHkgcmVzZXQgd2hpbGUgb3BlbicpO1xuXG4gICAgICB0aGlzLnN0YXRlXyA9IFJFU0VUVElORztcbiAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcbiAgICB9LFxuXG4gICAgZmluaXNoUmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IFJFU0VUVElORylcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBvbmx5IGZpbmlzaFJlc2V0IGFmdGVyIHN0YXJ0UmVzZXQnKTtcbiAgICAgIHRoaXMuc3RhdGVfID0gT1BFTkVEO1xuICAgICAgdGhpcy5jb25uZWN0XygpO1xuXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfSxcblxuICAgIGl0ZXJhdGVPYmplY3RzXzogZnVuY3Rpb24ob2JzZXJ2ZSkge1xuICAgICAgdmFyIG9iamVjdDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vYnNlcnZlZF8ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgb2JqZWN0ID0gdGhpcy5vYnNlcnZlZF9baV1cbiAgICAgICAgaWYgKG9iamVjdCAhPT0gb2JzZXJ2ZXJTZW50aW5lbClcbiAgICAgICAgICB0aGlzLm9ic2VydmVkX1tpICsgMV0uaXRlcmF0ZU9iamVjdHMob2JqZWN0LCBvYnNlcnZlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja186IGZ1bmN0aW9uKGNoYW5nZVJlY29yZHMsIHNraXBDaGFuZ2VzKSB7XG4gICAgICB2YXIgb2xkVmFsdWVzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9ic2VydmVkXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5vYnNlcnZlZF9baV07XG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5vYnNlcnZlZF9baSsxXTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBpZiAob2JqZWN0ID09PSBvYnNlcnZlclNlbnRpbmVsKSB7XG4gICAgICAgICAgdmFyIG9ic2VydmFibGUgPSBwYXRoO1xuICAgICAgICAgIHZhbHVlID0gdGhpcy5zdGF0ZV8gPT09IFVOT1BFTkVEID9cbiAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5vcGVuKHRoaXMuZGVsaXZlciwgdGhpcykgOlxuICAgICAgICAgICAgICBvYnNlcnZhYmxlLmRpc2NhcmRDaGFuZ2VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBwYXRoLmdldFZhbHVlRnJvbShvYmplY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNraXBDaGFuZ2VzKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZV9baSAvIDJdID0gdmFsdWU7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJlU2FtZVZhbHVlKHZhbHVlLCB0aGlzLnZhbHVlX1tpIC8gMl0pKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIG9sZFZhbHVlcyA9IG9sZFZhbHVlcyB8fCBbXTtcbiAgICAgICAgb2xkVmFsdWVzW2kgLyAyXSA9IHRoaXMudmFsdWVfW2kgLyAyXTtcbiAgICAgICAgdGhpcy52YWx1ZV9baSAvIDJdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghb2xkVmFsdWVzKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIFRPRE8ocmFmYWVsdyk6IEhhdmluZyBvYnNlcnZlZF8gYXMgdGhlIHRoaXJkIGNhbGxiYWNrIGFyZyBoZXJlIGlzXG4gICAgICAvLyBwcmV0dHkgbGFtZSBBUEkuIEZpeC5cbiAgICAgIHRoaXMucmVwb3J0XyhbdGhpcy52YWx1ZV8sIG9sZFZhbHVlcywgdGhpcy5vYnNlcnZlZF9dKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gaWRlbnRGbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cblxuICBmdW5jdGlvbiBPYnNlcnZlclRyYW5zZm9ybShvYnNlcnZhYmxlLCBnZXRWYWx1ZUZuLCBzZXRWYWx1ZUZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb250UGFzc1Rocm91Z2hTZXQpIHtcbiAgICB0aGlzLmNhbGxiYWNrXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRhcmdldF8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vYnNlcnZhYmxlXyA9IG9ic2VydmFibGU7XG4gICAgdGhpcy5nZXRWYWx1ZUZuXyA9IGdldFZhbHVlRm4gfHwgaWRlbnRGbjtcbiAgICB0aGlzLnNldFZhbHVlRm5fID0gc2V0VmFsdWVGbiB8fCBpZGVudEZuO1xuICAgIC8vIFRPRE8ocmFmYWVsdyk6IFRoaXMgaXMgYSB0ZW1wb3JhcnkgaGFjay4gUG9seW1lckV4cHJlc3Npb25zIG5lZWRzIHRoaXNcbiAgICAvLyBhdCB0aGUgbW9tZW50IGJlY2F1c2Ugb2YgYSBidWcgaW4gaXQncyBkZXBlbmRlbmN5IHRyYWNraW5nLlxuICAgIHRoaXMuZG9udFBhc3NUaHJvdWdoU2V0XyA9IGRvbnRQYXNzVGhyb3VnaFNldDtcbiAgfVxuXG4gIE9ic2VydmVyVHJhbnNmb3JtLnByb3RvdHlwZSA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy50YXJnZXRfID0gdGFyZ2V0O1xuICAgICAgdGhpcy52YWx1ZV8gPVxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWVGbl8odGhpcy5vYnNlcnZhYmxlXy5vcGVuKHRoaXMub2JzZXJ2ZWRDYWxsYmFja18sIHRoaXMpKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgb2JzZXJ2ZWRDYWxsYmFja186IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWVGbl8odmFsdWUpO1xuICAgICAgaWYgKGFyZVNhbWVWYWx1ZSh2YWx1ZSwgdGhpcy52YWx1ZV8pKVxuICAgICAgICByZXR1cm47XG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICAgIHRoaXMudmFsdWVfID0gdmFsdWU7XG4gICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKHRoaXMudGFyZ2V0XywgdGhpcy52YWx1ZV8sIG9sZFZhbHVlKTtcbiAgICB9LFxuXG4gICAgZGlzY2FyZENoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy52YWx1ZV8gPSB0aGlzLmdldFZhbHVlRm5fKHRoaXMub2JzZXJ2YWJsZV8uZGlzY2FyZENoYW5nZXMoKSk7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfSxcblxuICAgIGRlbGl2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2YWJsZV8uZGVsaXZlcigpO1xuICAgIH0sXG5cbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5zZXRWYWx1ZUZuXyh2YWx1ZSk7XG4gICAgICBpZiAoIXRoaXMuZG9udFBhc3NUaHJvdWdoU2V0XyAmJiB0aGlzLm9ic2VydmFibGVfLnNldFZhbHVlKVxuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZhYmxlXy5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLm9ic2VydmFibGVfKVxuICAgICAgICB0aGlzLm9ic2VydmFibGVfLmNsb3NlKCk7XG4gICAgICB0aGlzLmNhbGxiYWNrXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudGFyZ2V0XyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMub2JzZXJ2YWJsZV8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZ2V0VmFsdWVGbl8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnNldFZhbHVlRm5fID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHZhciBleHBlY3RlZFJlY29yZFR5cGVzID0ge1xuICAgIGFkZDogdHJ1ZSxcbiAgICB1cGRhdGU6IHRydWUsXG4gICAgZGVsZXRlOiB0cnVlXG4gIH07XG5cbiAgZnVuY3Rpb24gZGlmZk9iamVjdEZyb21DaGFuZ2VSZWNvcmRzKG9iamVjdCwgY2hhbmdlUmVjb3Jkcywgb2xkVmFsdWVzKSB7XG4gICAgdmFyIGFkZGVkID0ge307XG4gICAgdmFyIHJlbW92ZWQgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJlY29yZCA9IGNoYW5nZVJlY29yZHNbaV07XG4gICAgICBpZiAoIWV4cGVjdGVkUmVjb3JkVHlwZXNbcmVjb3JkLnR5cGVdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vua25vd24gY2hhbmdlUmVjb3JkIHR5cGU6ICcgKyByZWNvcmQudHlwZSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVjb3JkKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghKHJlY29yZC5uYW1lIGluIG9sZFZhbHVlcykpXG4gICAgICAgIG9sZFZhbHVlc1tyZWNvcmQubmFtZV0gPSByZWNvcmQub2xkVmFsdWU7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PSAndXBkYXRlJylcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PSAnYWRkJykge1xuICAgICAgICBpZiAocmVjb3JkLm5hbWUgaW4gcmVtb3ZlZClcbiAgICAgICAgICBkZWxldGUgcmVtb3ZlZFtyZWNvcmQubmFtZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhZGRlZFtyZWNvcmQubmFtZV0gPSB0cnVlO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyB0eXBlID0gJ2RlbGV0ZSdcbiAgICAgIGlmIChyZWNvcmQubmFtZSBpbiBhZGRlZCkge1xuICAgICAgICBkZWxldGUgYWRkZWRbcmVjb3JkLm5hbWVdO1xuICAgICAgICBkZWxldGUgb2xkVmFsdWVzW3JlY29yZC5uYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZWRbcmVjb3JkLm5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIGFkZGVkKVxuICAgICAgYWRkZWRbcHJvcF0gPSBvYmplY3RbcHJvcF07XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHJlbW92ZWQpXG4gICAgICByZW1vdmVkW3Byb3BdID0gdW5kZWZpbmVkO1xuXG4gICAgdmFyIGNoYW5nZWQgPSB7fTtcbiAgICBmb3IgKHZhciBwcm9wIGluIG9sZFZhbHVlcykge1xuICAgICAgaWYgKHByb3AgaW4gYWRkZWQgfHwgcHJvcCBpbiByZW1vdmVkKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdmFyIG5ld1ZhbHVlID0gb2JqZWN0W3Byb3BdO1xuICAgICAgaWYgKG9sZFZhbHVlc1twcm9wXSAhPT0gbmV3VmFsdWUpXG4gICAgICAgIGNoYW5nZWRbcHJvcF0gPSBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGNoYW5nZWQ6IGNoYW5nZWRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3U3BsaWNlKGluZGV4LCByZW1vdmVkLCBhZGRlZENvdW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIHJlbW92ZWQ6IHJlbW92ZWQsXG4gICAgICBhZGRlZENvdW50OiBhZGRlZENvdW50XG4gICAgfTtcbiAgfVxuXG4gIHZhciBFRElUX0xFQVZFID0gMDtcbiAgdmFyIEVESVRfVVBEQVRFID0gMTtcbiAgdmFyIEVESVRfQUREID0gMjtcbiAgdmFyIEVESVRfREVMRVRFID0gMztcblxuICBmdW5jdGlvbiBBcnJheVNwbGljZSgpIHt9XG5cbiAgQXJyYXlTcGxpY2UucHJvdG90eXBlID0ge1xuXG4gICAgLy8gTm90ZTogVGhpcyBmdW5jdGlvbiBpcyAqYmFzZWQqIG9uIHRoZSBjb21wdXRhdGlvbiBvZiB0aGUgTGV2ZW5zaHRlaW5cbiAgICAvLyBcImVkaXRcIiBkaXN0YW5jZS4gVGhlIG9uZSBjaGFuZ2UgaXMgdGhhdCBcInVwZGF0ZXNcIiBhcmUgdHJlYXRlZCBhcyB0d29cbiAgICAvLyBlZGl0cyAtIG5vdCBvbmUuIFdpdGggQXJyYXkgc3BsaWNlcywgYW4gdXBkYXRlIGlzIHJlYWxseSBhIGRlbGV0ZVxuICAgIC8vIGZvbGxvd2VkIGJ5IGFuIGFkZC4gQnkgcmV0YWluaW5nIHRoaXMsIHdlIG9wdGltaXplIGZvciBcImtlZXBpbmdcIiB0aGVcbiAgICAvLyBtYXhpbXVtIGFycmF5IGl0ZW1zIGluIHRoZSBvcmlnaW5hbCBhcnJheS4gRm9yIGV4YW1wbGU6XG4gICAgLy9cbiAgICAvLyAgICd4eHh4MTIzJyAtPiAnMTIzeXl5eSdcbiAgICAvL1xuICAgIC8vIFdpdGggMS1lZGl0IHVwZGF0ZXMsIHRoZSBzaG9ydGVzdCBwYXRoIHdvdWxkIGJlIGp1c3QgdG8gdXBkYXRlIGFsbCBzZXZlblxuICAgIC8vIGNoYXJhY3RlcnMuIFdpdGggMi1lZGl0IHVwZGF0ZXMsIHdlIGRlbGV0ZSA0LCBsZWF2ZSAzLCBhbmQgYWRkIDQuIFRoaXNcbiAgICAvLyBsZWF2ZXMgdGhlIHN1YnN0cmluZyAnMTIzJyBpbnRhY3QuXG4gICAgY2FsY0VkaXREaXN0YW5jZXM6IGZ1bmN0aW9uKGN1cnJlbnQsIGN1cnJlbnRTdGFydCwgY3VycmVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKSB7XG4gICAgICAvLyBcIkRlbGV0aW9uXCIgY29sdW1uc1xuICAgICAgdmFyIHJvd0NvdW50ID0gb2xkRW5kIC0gb2xkU3RhcnQgKyAxO1xuICAgICAgdmFyIGNvbHVtbkNvdW50ID0gY3VycmVudEVuZCAtIGN1cnJlbnRTdGFydCArIDE7XG4gICAgICB2YXIgZGlzdGFuY2VzID0gbmV3IEFycmF5KHJvd0NvdW50KTtcblxuICAgICAgLy8gXCJBZGRpdGlvblwiIHJvd3MuIEluaXRpYWxpemUgbnVsbCBjb2x1bW4uXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd0NvdW50OyBpKyspIHtcbiAgICAgICAgZGlzdGFuY2VzW2ldID0gbmV3IEFycmF5KGNvbHVtbkNvdW50KTtcbiAgICAgICAgZGlzdGFuY2VzW2ldWzBdID0gaTtcbiAgICAgIH1cblxuICAgICAgLy8gSW5pdGlhbGl6ZSBudWxsIHJvd1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2x1bW5Db3VudDsgaisrKVxuICAgICAgICBkaXN0YW5jZXNbMF1bal0gPSBqO1xuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJvd0NvdW50OyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBjb2x1bW5Db3VudDsgaisrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZXF1YWxzKGN1cnJlbnRbY3VycmVudFN0YXJ0ICsgaiAtIDFdLCBvbGRbb2xkU3RhcnQgKyBpIC0gMV0pKVxuICAgICAgICAgICAgZGlzdGFuY2VzW2ldW2pdID0gZGlzdGFuY2VzW2kgLSAxXVtqIC0gMV07XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbm9ydGggPSBkaXN0YW5jZXNbaSAtIDFdW2pdICsgMTtcbiAgICAgICAgICAgIHZhciB3ZXN0ID0gZGlzdGFuY2VzW2ldW2ogLSAxXSArIDE7XG4gICAgICAgICAgICBkaXN0YW5jZXNbaV1bal0gPSBub3J0aCA8IHdlc3QgPyBub3J0aCA6IHdlc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXN0YW5jZXM7XG4gICAgfSxcblxuICAgIC8vIFRoaXMgc3RhcnRzIGF0IHRoZSBmaW5hbCB3ZWlnaHQsIGFuZCB3YWxrcyBcImJhY2t3YXJkXCIgYnkgZmluZGluZ1xuICAgIC8vIHRoZSBtaW5pbXVtIHByZXZpb3VzIHdlaWdodCByZWN1cnNpdmVseSB1bnRpbCB0aGUgb3JpZ2luIG9mIHRoZSB3ZWlnaHRcbiAgICAvLyBtYXRyaXguXG4gICAgc3BsaWNlT3BlcmF0aW9uc0Zyb21FZGl0RGlzdGFuY2VzOiBmdW5jdGlvbihkaXN0YW5jZXMpIHtcbiAgICAgIHZhciBpID0gZGlzdGFuY2VzLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgaiA9IGRpc3RhbmNlc1swXS5sZW5ndGggLSAxO1xuICAgICAgdmFyIGN1cnJlbnQgPSBkaXN0YW5jZXNbaV1bal07XG4gICAgICB2YXIgZWRpdHMgPSBbXTtcbiAgICAgIHdoaWxlIChpID4gMCB8fCBqID4gMCkge1xuICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgZWRpdHMucHVzaChFRElUX0FERCk7XG4gICAgICAgICAgai0tO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqID09IDApIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfREVMRVRFKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vcnRoV2VzdCA9IGRpc3RhbmNlc1tpIC0gMV1baiAtIDFdO1xuICAgICAgICB2YXIgd2VzdCA9IGRpc3RhbmNlc1tpIC0gMV1bal07XG4gICAgICAgIHZhciBub3J0aCA9IGRpc3RhbmNlc1tpXVtqIC0gMV07XG5cbiAgICAgICAgdmFyIG1pbjtcbiAgICAgICAgaWYgKHdlc3QgPCBub3J0aClcbiAgICAgICAgICBtaW4gPSB3ZXN0IDwgbm9ydGhXZXN0ID8gd2VzdCA6IG5vcnRoV2VzdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG1pbiA9IG5vcnRoIDwgbm9ydGhXZXN0ID8gbm9ydGggOiBub3J0aFdlc3Q7XG5cbiAgICAgICAgaWYgKG1pbiA9PSBub3J0aFdlc3QpIHtcbiAgICAgICAgICBpZiAobm9ydGhXZXN0ID09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9MRUFWRSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9VUERBVEUpO1xuICAgICAgICAgICAgY3VycmVudCA9IG5vcnRoV2VzdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgfSBlbHNlIGlmIChtaW4gPT0gd2VzdCkge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9ERUxFVEUpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjdXJyZW50ID0gd2VzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfQUREKTtcbiAgICAgICAgICBqLS07XG4gICAgICAgICAgY3VycmVudCA9IG5vcnRoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGVkaXRzLnJldmVyc2UoKTtcbiAgICAgIHJldHVybiBlZGl0cztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3BsaWNlIFByb2plY3Rpb24gZnVuY3Rpb25zOlxuICAgICAqXG4gICAgICogQSBzcGxpY2UgbWFwIGlzIGEgcmVwcmVzZW50YXRpb24gb2YgaG93IGEgcHJldmlvdXMgYXJyYXkgb2YgaXRlbXNcbiAgICAgKiB3YXMgdHJhbnNmb3JtZWQgaW50byBhIG5ldyBhcnJheSBvZiBpdGVtcy4gQ29uY2VwdHVhbGx5IGl0IGlzIGEgbGlzdCBvZlxuICAgICAqIHR1cGxlcyBvZlxuICAgICAqXG4gICAgICogICA8aW5kZXgsIHJlbW92ZWQsIGFkZGVkQ291bnQ+XG4gICAgICpcbiAgICAgKiB3aGljaCBhcmUga2VwdCBpbiBhc2NlbmRpbmcgaW5kZXggb3JkZXIgb2YuIFRoZSB0dXBsZSByZXByZXNlbnRzIHRoYXQgYXRcbiAgICAgKiB0aGUgfGluZGV4fCwgfHJlbW92ZWR8IHNlcXVlbmNlIG9mIGl0ZW1zIHdlcmUgcmVtb3ZlZCwgYW5kIGNvdW50aW5nIGZvcndhcmRcbiAgICAgKiBmcm9tIHxpbmRleHwsIHxhZGRlZENvdW50fCBpdGVtcyB3ZXJlIGFkZGVkLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogTGFja2luZyBpbmRpdmlkdWFsIHNwbGljZSBtdXRhdGlvbiBpbmZvcm1hdGlvbiwgdGhlIG1pbmltYWwgc2V0IG9mXG4gICAgICogc3BsaWNlcyBjYW4gYmUgc3ludGhlc2l6ZWQgZ2l2ZW4gdGhlIHByZXZpb3VzIHN0YXRlIGFuZCBmaW5hbCBzdGF0ZSBvZiBhblxuICAgICAqIGFycmF5LiBUaGUgYmFzaWMgYXBwcm9hY2ggaXMgdG8gY2FsY3VsYXRlIHRoZSBlZGl0IGRpc3RhbmNlIG1hdHJpeCBhbmRcbiAgICAgKiBjaG9vc2UgdGhlIHNob3J0ZXN0IHBhdGggdGhyb3VnaCBpdC5cbiAgICAgKlxuICAgICAqIENvbXBsZXhpdHk6IE8obCAqIHApXG4gICAgICogICBsOiBUaGUgbGVuZ3RoIG9mIHRoZSBjdXJyZW50IGFycmF5XG4gICAgICogICBwOiBUaGUgbGVuZ3RoIG9mIHRoZSBvbGQgYXJyYXlcbiAgICAgKi9cbiAgICBjYWxjU3BsaWNlczogZnVuY3Rpb24oY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpIHtcbiAgICAgIHZhciBwcmVmaXhDb3VudCA9IDA7XG4gICAgICB2YXIgc3VmZml4Q291bnQgPSAwO1xuXG4gICAgICB2YXIgbWluTGVuZ3RoID0gTWF0aC5taW4oY3VycmVudEVuZCAtIGN1cnJlbnRTdGFydCwgb2xkRW5kIC0gb2xkU3RhcnQpO1xuICAgICAgaWYgKGN1cnJlbnRTdGFydCA9PSAwICYmIG9sZFN0YXJ0ID09IDApXG4gICAgICAgIHByZWZpeENvdW50ID0gdGhpcy5zaGFyZWRQcmVmaXgoY3VycmVudCwgb2xkLCBtaW5MZW5ndGgpO1xuXG4gICAgICBpZiAoY3VycmVudEVuZCA9PSBjdXJyZW50Lmxlbmd0aCAmJiBvbGRFbmQgPT0gb2xkLmxlbmd0aClcbiAgICAgICAgc3VmZml4Q291bnQgPSB0aGlzLnNoYXJlZFN1ZmZpeChjdXJyZW50LCBvbGQsIG1pbkxlbmd0aCAtIHByZWZpeENvdW50KTtcblxuICAgICAgY3VycmVudFN0YXJ0ICs9IHByZWZpeENvdW50O1xuICAgICAgb2xkU3RhcnQgKz0gcHJlZml4Q291bnQ7XG4gICAgICBjdXJyZW50RW5kIC09IHN1ZmZpeENvdW50O1xuICAgICAgb2xkRW5kIC09IHN1ZmZpeENvdW50O1xuXG4gICAgICBpZiAoY3VycmVudEVuZCAtIGN1cnJlbnRTdGFydCA9PSAwICYmIG9sZEVuZCAtIG9sZFN0YXJ0ID09IDApXG4gICAgICAgIHJldHVybiBbXTtcblxuICAgICAgaWYgKGN1cnJlbnRTdGFydCA9PSBjdXJyZW50RW5kKSB7XG4gICAgICAgIHZhciBzcGxpY2UgPSBuZXdTcGxpY2UoY3VycmVudFN0YXJ0LCBbXSwgMCk7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydCA8IG9sZEVuZClcbiAgICAgICAgICBzcGxpY2UucmVtb3ZlZC5wdXNoKG9sZFtvbGRTdGFydCsrXSk7XG5cbiAgICAgICAgcmV0dXJuIFsgc3BsaWNlIF07XG4gICAgICB9IGVsc2UgaWYgKG9sZFN0YXJ0ID09IG9sZEVuZClcbiAgICAgICAgcmV0dXJuIFsgbmV3U3BsaWNlKGN1cnJlbnRTdGFydCwgW10sIGN1cnJlbnRFbmQgLSBjdXJyZW50U3RhcnQpIF07XG5cbiAgICAgIHZhciBvcHMgPSB0aGlzLnNwbGljZU9wZXJhdGlvbnNGcm9tRWRpdERpc3RhbmNlcyhcbiAgICAgICAgICB0aGlzLmNhbGNFZGl0RGlzdGFuY2VzKGN1cnJlbnQsIGN1cnJlbnRTdGFydCwgY3VycmVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkpO1xuXG4gICAgICB2YXIgc3BsaWNlID0gdW5kZWZpbmVkO1xuICAgICAgdmFyIHNwbGljZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IGN1cnJlbnRTdGFydDtcbiAgICAgIHZhciBvbGRJbmRleCA9IG9sZFN0YXJ0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3dpdGNoKG9wc1tpXSkge1xuICAgICAgICAgIGNhc2UgRURJVF9MRUFWRTpcbiAgICAgICAgICAgIGlmIChzcGxpY2UpIHtcbiAgICAgICAgICAgICAgc3BsaWNlcy5wdXNoKHNwbGljZSk7XG4gICAgICAgICAgICAgIHNwbGljZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVESVRfVVBEQVRFOlxuICAgICAgICAgICAgaWYgKCFzcGxpY2UpXG4gICAgICAgICAgICAgIHNwbGljZSA9IG5ld1NwbGljZShpbmRleCwgW10sIDApO1xuXG4gICAgICAgICAgICBzcGxpY2UuYWRkZWRDb3VudCsrO1xuICAgICAgICAgICAgaW5kZXgrKztcblxuICAgICAgICAgICAgc3BsaWNlLnJlbW92ZWQucHVzaChvbGRbb2xkSW5kZXhdKTtcbiAgICAgICAgICAgIG9sZEluZGV4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVESVRfQUREOlxuICAgICAgICAgICAgaWYgKCFzcGxpY2UpXG4gICAgICAgICAgICAgIHNwbGljZSA9IG5ld1NwbGljZShpbmRleCwgW10sIDApO1xuXG4gICAgICAgICAgICBzcGxpY2UuYWRkZWRDb3VudCsrO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgRURJVF9ERUxFVEU6XG4gICAgICAgICAgICBpZiAoIXNwbGljZSlcbiAgICAgICAgICAgICAgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCBbXSwgMCk7XG5cbiAgICAgICAgICAgIHNwbGljZS5yZW1vdmVkLnB1c2gob2xkW29sZEluZGV4XSk7XG4gICAgICAgICAgICBvbGRJbmRleCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNwbGljZSkge1xuICAgICAgICBzcGxpY2VzLnB1c2goc3BsaWNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzcGxpY2VzO1xuICAgIH0sXG5cbiAgICBzaGFyZWRQcmVmaXg6IGZ1bmN0aW9uKGN1cnJlbnQsIG9sZCwgc2VhcmNoTGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaExlbmd0aDsgaSsrKVxuICAgICAgICBpZiAoIXRoaXMuZXF1YWxzKGN1cnJlbnRbaV0sIG9sZFtpXSkpXG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICByZXR1cm4gc2VhcmNoTGVuZ3RoO1xuICAgIH0sXG5cbiAgICBzaGFyZWRTdWZmaXg6IGZ1bmN0aW9uKGN1cnJlbnQsIG9sZCwgc2VhcmNoTGVuZ3RoKSB7XG4gICAgICB2YXIgaW5kZXgxID0gY3VycmVudC5sZW5ndGg7XG4gICAgICB2YXIgaW5kZXgyID0gb2xkLmxlbmd0aDtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICB3aGlsZSAoY291bnQgPCBzZWFyY2hMZW5ndGggJiYgdGhpcy5lcXVhbHMoY3VycmVudFstLWluZGV4MV0sIG9sZFstLWluZGV4Ml0pKVxuICAgICAgICBjb3VudCsrO1xuXG4gICAgICByZXR1cm4gY291bnQ7XG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZVNwbGljZXM6IGZ1bmN0aW9uKGN1cnJlbnQsIHByZXZpb3VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxjU3BsaWNlcyhjdXJyZW50LCAwLCBjdXJyZW50Lmxlbmd0aCwgcHJldmlvdXMsIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5sZW5ndGgpO1xuICAgIH0sXG5cbiAgICBlcXVhbHM6IGZ1bmN0aW9uKGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZSA9PT0gcHJldmlvdXNWYWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGFycmF5U3BsaWNlID0gbmV3IEFycmF5U3BsaWNlKCk7XG5cbiAgZnVuY3Rpb24gY2FsY1NwbGljZXMoY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpIHtcbiAgICByZXR1cm4gYXJyYXlTcGxpY2UuY2FsY1NwbGljZXMoY3VycmVudCwgY3VycmVudFN0YXJ0LCBjdXJyZW50RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJzZWN0KHN0YXJ0MSwgZW5kMSwgc3RhcnQyLCBlbmQyKSB7XG4gICAgLy8gRGlzam9pbnRcbiAgICBpZiAoZW5kMSA8IHN0YXJ0MiB8fCBlbmQyIDwgc3RhcnQxKVxuICAgICAgcmV0dXJuIC0xO1xuXG4gICAgLy8gQWRqYWNlbnRcbiAgICBpZiAoZW5kMSA9PSBzdGFydDIgfHwgZW5kMiA9PSBzdGFydDEpXG4gICAgICByZXR1cm4gMDtcblxuICAgIC8vIE5vbi16ZXJvIGludGVyc2VjdCwgc3BhbjEgZmlyc3RcbiAgICBpZiAoc3RhcnQxIDwgc3RhcnQyKSB7XG4gICAgICBpZiAoZW5kMSA8IGVuZDIpXG4gICAgICAgIHJldHVybiBlbmQxIC0gc3RhcnQyOyAvLyBPdmVybGFwXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiBlbmQyIC0gc3RhcnQyOyAvLyBDb250YWluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm9uLXplcm8gaW50ZXJzZWN0LCBzcGFuMiBmaXJzdFxuICAgICAgaWYgKGVuZDIgPCBlbmQxKVxuICAgICAgICByZXR1cm4gZW5kMiAtIHN0YXJ0MTsgLy8gT3ZlcmxhcFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gZW5kMSAtIHN0YXJ0MTsgLy8gQ29udGFpbmVkXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VTcGxpY2Uoc3BsaWNlcywgaW5kZXgsIHJlbW92ZWQsIGFkZGVkQ291bnQpIHtcblxuICAgIHZhciBzcGxpY2UgPSBuZXdTcGxpY2UoaW5kZXgsIHJlbW92ZWQsIGFkZGVkQ291bnQpO1xuXG4gICAgdmFyIGluc2VydGVkID0gZmFsc2U7XG4gICAgdmFyIGluc2VydGlvbk9mZnNldCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwbGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjdXJyZW50ID0gc3BsaWNlc1tpXTtcbiAgICAgIGN1cnJlbnQuaW5kZXggKz0gaW5zZXJ0aW9uT2Zmc2V0O1xuXG4gICAgICBpZiAoaW5zZXJ0ZWQpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgaW50ZXJzZWN0Q291bnQgPSBpbnRlcnNlY3Qoc3BsaWNlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwbGljZS5pbmRleCArIHNwbGljZS5yZW1vdmVkLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuaW5kZXggKyBjdXJyZW50LmFkZGVkQ291bnQpO1xuXG4gICAgICBpZiAoaW50ZXJzZWN0Q291bnQgPj0gMCkge1xuICAgICAgICAvLyBNZXJnZSB0aGUgdHdvIHNwbGljZXNcblxuICAgICAgICBzcGxpY2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuXG4gICAgICAgIGluc2VydGlvbk9mZnNldCAtPSBjdXJyZW50LmFkZGVkQ291bnQgLSBjdXJyZW50LnJlbW92ZWQubGVuZ3RoO1xuXG4gICAgICAgIHNwbGljZS5hZGRlZENvdW50ICs9IGN1cnJlbnQuYWRkZWRDb3VudCAtIGludGVyc2VjdENvdW50O1xuICAgICAgICB2YXIgZGVsZXRlQ291bnQgPSBzcGxpY2UucmVtb3ZlZC5sZW5ndGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnJlbW92ZWQubGVuZ3RoIC0gaW50ZXJzZWN0Q291bnQ7XG5cbiAgICAgICAgaWYgKCFzcGxpY2UuYWRkZWRDb3VudCAmJiAhZGVsZXRlQ291bnQpIHtcbiAgICAgICAgICAvLyBtZXJnZWQgc3BsaWNlIGlzIGEgbm9vcC4gZGlzY2FyZC5cbiAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlbW92ZWQgPSBjdXJyZW50LnJlbW92ZWQ7XG5cbiAgICAgICAgICBpZiAoc3BsaWNlLmluZGV4IDwgY3VycmVudC5pbmRleCkge1xuICAgICAgICAgICAgLy8gc29tZSBwcmVmaXggb2Ygc3BsaWNlLnJlbW92ZWQgaXMgcHJlcGVuZGVkIHRvIGN1cnJlbnQucmVtb3ZlZC5cbiAgICAgICAgICAgIHZhciBwcmVwZW5kID0gc3BsaWNlLnJlbW92ZWQuc2xpY2UoMCwgY3VycmVudC5pbmRleCAtIHNwbGljZS5pbmRleCk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShwcmVwZW5kLCByZW1vdmVkKTtcbiAgICAgICAgICAgIHJlbW92ZWQgPSBwcmVwZW5kO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzcGxpY2UuaW5kZXggKyBzcGxpY2UucmVtb3ZlZC5sZW5ndGggPiBjdXJyZW50LmluZGV4ICsgY3VycmVudC5hZGRlZENvdW50KSB7XG4gICAgICAgICAgICAvLyBzb21lIHN1ZmZpeCBvZiBzcGxpY2UucmVtb3ZlZCBpcyBhcHBlbmRlZCB0byBjdXJyZW50LnJlbW92ZWQuXG4gICAgICAgICAgICB2YXIgYXBwZW5kID0gc3BsaWNlLnJlbW92ZWQuc2xpY2UoY3VycmVudC5pbmRleCArIGN1cnJlbnQuYWRkZWRDb3VudCAtIHNwbGljZS5pbmRleCk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZW1vdmVkLCBhcHBlbmQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNwbGljZS5yZW1vdmVkID0gcmVtb3ZlZDtcbiAgICAgICAgICBpZiAoY3VycmVudC5pbmRleCA8IHNwbGljZS5pbmRleCkge1xuICAgICAgICAgICAgc3BsaWNlLmluZGV4ID0gY3VycmVudC5pbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3BsaWNlLmluZGV4IDwgY3VycmVudC5pbmRleCkge1xuICAgICAgICAvLyBJbnNlcnQgc3BsaWNlIGhlcmUuXG5cbiAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHNwbGljZXMuc3BsaWNlKGksIDAsIHNwbGljZSk7XG4gICAgICAgIGkrKztcblxuICAgICAgICB2YXIgb2Zmc2V0ID0gc3BsaWNlLmFkZGVkQ291bnQgLSBzcGxpY2UucmVtb3ZlZC5sZW5ndGhcbiAgICAgICAgY3VycmVudC5pbmRleCArPSBvZmZzZXQ7XG4gICAgICAgIGluc2VydGlvbk9mZnNldCArPSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbnNlcnRlZClcbiAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5pdGlhbFNwbGljZXMoYXJyYXksIGNoYW5nZVJlY29yZHMpIHtcbiAgICB2YXIgc3BsaWNlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFuZ2VSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVjb3JkID0gY2hhbmdlUmVjb3Jkc1tpXTtcbiAgICAgIHN3aXRjaChyZWNvcmQudHlwZSkge1xuICAgICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICAgIG1lcmdlU3BsaWNlKHNwbGljZXMsIHJlY29yZC5pbmRleCwgcmVjb3JkLnJlbW92ZWQuc2xpY2UoKSwgcmVjb3JkLmFkZGVkQ291bnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICBjYXNlICd1cGRhdGUnOlxuICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgIGlmICghaXNJbmRleChyZWNvcmQubmFtZSkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB2YXIgaW5kZXggPSB0b051bWJlcihyZWNvcmQubmFtZSk7XG4gICAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIG1lcmdlU3BsaWNlKHNwbGljZXMsIGluZGV4LCBbcmVjb3JkLm9sZFZhbHVlXSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCByZWNvcmQgdHlwZTogJyArIEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcGxpY2VzO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdEFycmF5U3BsaWNlcyhhcnJheSwgY2hhbmdlUmVjb3Jkcykge1xuICAgIHZhciBzcGxpY2VzID0gW107XG5cbiAgICBjcmVhdGVJbml0aWFsU3BsaWNlcyhhcnJheSwgY2hhbmdlUmVjb3JkcykuZm9yRWFjaChmdW5jdGlvbihzcGxpY2UpIHtcbiAgICAgIGlmIChzcGxpY2UuYWRkZWRDb3VudCA9PSAxICYmIHNwbGljZS5yZW1vdmVkLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChzcGxpY2UucmVtb3ZlZFswXSAhPT0gYXJyYXlbc3BsaWNlLmluZGV4XSlcbiAgICAgICAgICBzcGxpY2VzLnB1c2goc3BsaWNlKTtcblxuICAgICAgICByZXR1cm5cbiAgICAgIH07XG5cbiAgICAgIHNwbGljZXMgPSBzcGxpY2VzLmNvbmNhdChjYWxjU3BsaWNlcyhhcnJheSwgc3BsaWNlLmluZGV4LCBzcGxpY2UuaW5kZXggKyBzcGxpY2UuYWRkZWRDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGxpY2UucmVtb3ZlZCwgMCwgc3BsaWNlLnJlbW92ZWQubGVuZ3RoKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3BsaWNlcztcbiAgfVxuXG4gIGdsb2JhbC5PYnNlcnZlciA9IE9ic2VydmVyO1xuICBnbG9iYWwuT2JzZXJ2ZXIucnVuRU9NXyA9IHJ1bkVPTTtcbiAgZ2xvYmFsLk9ic2VydmVyLm9ic2VydmVyU2VudGluZWxfID0gb2JzZXJ2ZXJTZW50aW5lbDsgLy8gZm9yIHRlc3RpbmcuXG4gIGdsb2JhbC5PYnNlcnZlci5oYXNPYmplY3RPYnNlcnZlID0gaGFzT2JzZXJ2ZTtcbiAgZ2xvYmFsLkFycmF5T2JzZXJ2ZXIgPSBBcnJheU9ic2VydmVyO1xuICBnbG9iYWwuQXJyYXlPYnNlcnZlci5jYWxjdWxhdGVTcGxpY2VzID0gZnVuY3Rpb24oY3VycmVudCwgcHJldmlvdXMpIHtcbiAgICByZXR1cm4gYXJyYXlTcGxpY2UuY2FsY3VsYXRlU3BsaWNlcyhjdXJyZW50LCBwcmV2aW91cyk7XG4gIH07XG5cbiAgZ2xvYmFsLkFycmF5U3BsaWNlID0gQXJyYXlTcGxpY2U7XG4gIGdsb2JhbC5PYmplY3RPYnNlcnZlciA9IE9iamVjdE9ic2VydmVyO1xuICBnbG9iYWwuUGF0aE9ic2VydmVyID0gUGF0aE9ic2VydmVyO1xuICBnbG9iYWwuQ29tcG91bmRPYnNlcnZlciA9IENvbXBvdW5kT2JzZXJ2ZXI7XG4gIGdsb2JhbC5QYXRoID0gUGF0aDtcbiAgZ2xvYmFsLk9ic2VydmVyVHJhbnNmb3JtID0gT2JzZXJ2ZXJUcmFuc2Zvcm07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlID8gZ2xvYmFsIDogdGhpcyB8fCB3aW5kb3cpO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsKXtcbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAoZ2xvYmFsLiR0cmFjZXVyUnVudGltZSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgJE9iamVjdCA9IE9iamVjdDtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIHZhciAkY3JlYXRlID0gJE9iamVjdC5jcmVhdGU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICRPYmplY3QuZGVmaW5lUHJvcGVydGllcztcbiAgdmFyICRkZWZpbmVQcm9wZXJ0eSA9ICRPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gIHZhciAkZnJlZXplID0gJE9iamVjdC5mcmVlemU7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9ICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyICRrZXlzID0gJE9iamVjdC5rZXlzO1xuICB2YXIgJGhhc093blByb3BlcnR5ID0gJE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciAkdG9TdHJpbmcgPSAkT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyICRwcmV2ZW50RXh0ZW5zaW9ucyA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcbiAgdmFyICRzZWFsID0gT2JqZWN0LnNlYWw7XG4gIHZhciAkaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcbiAgZnVuY3Rpb24gbm9uRW51bSh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfTtcbiAgfVxuICB2YXIgdHlwZXMgPSB7XG4gICAgdm9pZDogZnVuY3Rpb24gdm9pZFR5cGUoKSB7fSxcbiAgICBhbnk6IGZ1bmN0aW9uIGFueSgpIHt9LFxuICAgIHN0cmluZzogZnVuY3Rpb24gc3RyaW5nKCkge30sXG4gICAgbnVtYmVyOiBmdW5jdGlvbiBudW1iZXIoKSB7fSxcbiAgICBib29sZWFuOiBmdW5jdGlvbiBib29sZWFuKCkge31cbiAgfTtcbiAgdmFyIG1ldGhvZCA9IG5vbkVudW07XG4gIHZhciBjb3VudGVyID0gMDtcbiAgZnVuY3Rpb24gbmV3VW5pcXVlU3RyaW5nKCkge1xuICAgIHJldHVybiAnX18kJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlOSkgKyAnJCcgKyArK2NvdW50ZXIgKyAnJF9fJztcbiAgfVxuICB2YXIgc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sRGF0YVByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xWYWx1ZXMgPSAkY3JlYXRlKG51bGwpO1xuICB2YXIgcHJpdmF0ZU5hbWVzID0gJGNyZWF0ZShudWxsKTtcbiAgZnVuY3Rpb24gY3JlYXRlUHJpdmF0ZU5hbWUoKSB7XG4gICAgdmFyIHMgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgICBwcml2YXRlTmFtZXNbc10gPSB0cnVlO1xuICAgIHJldHVybiBzO1xuICB9XG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHN5bWJvbCkge1xuICAgIHJldHVybiB0eXBlb2Ygc3ltYm9sID09PSAnb2JqZWN0JyAmJiBzeW1ib2wgaW5zdGFuY2VvZiBTeW1ib2xWYWx1ZTtcbiAgfVxuICBmdW5jdGlvbiB0eXBlT2Yodikge1xuICAgIGlmIChpc1N5bWJvbCh2KSlcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICByZXR1cm4gdHlwZW9mIHY7XG4gIH1cbiAgZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHZhbHVlID0gbmV3IFN5bWJvbFZhbHVlKGRlc2NyaXB0aW9uKTtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSlcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTeW1ib2wgY2Fubm90IGJlIG5ld1xcJ2VkJyk7XG4gIH1cbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oU3ltYm9sKSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAndG9TdHJpbmcnLCBtZXRob2QoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN5bWJvbFZhbHVlID0gdGhpc1tzeW1ib2xEYXRhUHJvcGVydHldO1xuICAgIGlmICghZ2V0T3B0aW9uKCdzeW1ib2xzJykpXG4gICAgICByZXR1cm4gc3ltYm9sVmFsdWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgaWYgKCFzeW1ib2xWYWx1ZSlcbiAgICAgIHRocm93IFR5cGVFcnJvcignQ29udmVyc2lvbiBmcm9tIHN5bWJvbCB0byBzdHJpbmcnKTtcbiAgICB2YXIgZGVzYyA9IHN5bWJvbFZhbHVlW3N5bWJvbERlc2NyaXB0aW9uUHJvcGVydHldO1xuICAgIGlmIChkZXNjID09PSB1bmRlZmluZWQpXG4gICAgICBkZXNjID0gJyc7XG4gICAgcmV0dXJuICdTeW1ib2woJyArIGRlc2MgKyAnKSc7XG4gIH0pKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsICd2YWx1ZU9mJywgbWV0aG9kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzeW1ib2xWYWx1ZSA9IHRoaXNbc3ltYm9sRGF0YVByb3BlcnR5XTtcbiAgICBpZiAoIXN5bWJvbFZhbHVlKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdDb252ZXJzaW9uIGZyb20gc3ltYm9sIHRvIHN0cmluZycpO1xuICAgIGlmICghZ2V0T3B0aW9uKCdzeW1ib2xzJykpXG4gICAgICByZXR1cm4gc3ltYm9sVmFsdWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgcmV0dXJuIHN5bWJvbFZhbHVlO1xuICB9KSk7XG4gIGZ1bmN0aW9uIFN5bWJvbFZhbHVlKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGtleSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICAgICRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBzeW1ib2xEYXRhUHJvcGVydHksIHt2YWx1ZTogdGhpc30pO1xuICAgICRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBzeW1ib2xJbnRlcm5hbFByb3BlcnR5LCB7dmFsdWU6IGtleX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5LCB7dmFsdWU6IGRlc2NyaXB0aW9ufSk7XG4gICAgZnJlZXplKHRoaXMpO1xuICAgIHN5bWJvbFZhbHVlc1trZXldID0gdGhpcztcbiAgfVxuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sVmFsdWUucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKFN5bWJvbCkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sVmFsdWUucHJvdG90eXBlLCAndG9TdHJpbmcnLCB7XG4gICAgdmFsdWU6IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcsXG4gICAgZW51bWVyYWJsZTogZmFsc2VcbiAgfSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICd2YWx1ZU9mJywge1xuICAgIHZhbHVlOiBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YsXG4gICAgZW51bWVyYWJsZTogZmFsc2VcbiAgfSk7XG4gIHZhciBoYXNoUHJvcGVydHkgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICB2YXIgaGFzaFByb3BlcnR5RGVzY3JpcHRvciA9IHt2YWx1ZTogdW5kZWZpbmVkfTtcbiAgdmFyIGhhc2hPYmplY3RQcm9wZXJ0aWVzID0ge1xuICAgIGhhc2g6IHt2YWx1ZTogdW5kZWZpbmVkfSxcbiAgICBzZWxmOiB7dmFsdWU6IHVuZGVmaW5lZH1cbiAgfTtcbiAgdmFyIGhhc2hDb3VudGVyID0gMDtcbiAgZnVuY3Rpb24gZ2V0T3duSGFzaE9iamVjdChvYmplY3QpIHtcbiAgICB2YXIgaGFzaE9iamVjdCA9IG9iamVjdFtoYXNoUHJvcGVydHldO1xuICAgIGlmIChoYXNoT2JqZWN0ICYmIGhhc2hPYmplY3Quc2VsZiA9PT0gb2JqZWN0KVxuICAgICAgcmV0dXJuIGhhc2hPYmplY3Q7XG4gICAgaWYgKCRpc0V4dGVuc2libGUob2JqZWN0KSkge1xuICAgICAgaGFzaE9iamVjdFByb3BlcnRpZXMuaGFzaC52YWx1ZSA9IGhhc2hDb3VudGVyKys7XG4gICAgICBoYXNoT2JqZWN0UHJvcGVydGllcy5zZWxmLnZhbHVlID0gb2JqZWN0O1xuICAgICAgaGFzaFByb3BlcnR5RGVzY3JpcHRvci52YWx1ZSA9ICRjcmVhdGUobnVsbCwgaGFzaE9iamVjdFByb3BlcnRpZXMpO1xuICAgICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgaGFzaFByb3BlcnR5LCBoYXNoUHJvcGVydHlEZXNjcmlwdG9yKTtcbiAgICAgIHJldHVybiBoYXNoUHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIGZyZWV6ZShvYmplY3QpIHtcbiAgICBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuICRmcmVlemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyhvYmplY3QpIHtcbiAgICBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuICRwcmV2ZW50RXh0ZW5zaW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIGZ1bmN0aW9uIHNlYWwob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkc2VhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIFN5bWJvbC5pdGVyYXRvciA9IFN5bWJvbCgpO1xuICBmcmVlemUoU3ltYm9sVmFsdWUucHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gdG9Qcm9wZXJ0eShuYW1lKSB7XG4gICAgaWYgKGlzU3ltYm9sKG5hbWUpKVxuICAgICAgcmV0dXJuIG5hbWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpIHtcbiAgICB2YXIgcnYgPSBbXTtcbiAgICB2YXIgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lID0gbmFtZXNbaV07XG4gICAgICBpZiAoIXN5bWJvbFZhbHVlc1tuYW1lXSAmJiAhcHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICBydi5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gcnY7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgdG9Qcm9wZXJ0eShuYW1lKSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCkge1xuICAgIHZhciBydiA9IFtdO1xuICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHN5bWJvbCA9IHN5bWJvbFZhbHVlc1tuYW1lc1tpXV07XG4gICAgICBpZiAoc3ltYm9sKVxuICAgICAgICBydi5wdXNoKHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShuYW1lKSB7XG4gICAgcmV0dXJuICRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsIHRvUHJvcGVydHkobmFtZSkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldE9wdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGdsb2JhbC50cmFjZXVyICYmIGdsb2JhbC50cmFjZXVyLm9wdGlvbnNbbmFtZV07XG4gIH1cbiAgZnVuY3Rpb24gc2V0UHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBzeW0sXG4gICAgICAgIGRlc2M7XG4gICAgaWYgKGlzU3ltYm9sKG5hbWUpKSB7XG4gICAgICBzeW0gPSBuYW1lO1xuICAgICAgbmFtZSA9IG5hbWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgfVxuICAgIG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIGlmIChzeW0gJiYgKGRlc2MgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSkpKVxuICAgICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge2VudW1lcmFibGU6IGZhbHNlfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3JpcHRvcikge1xuICAgIGlmIChpc1N5bWJvbChuYW1lKSkge1xuICAgICAgaWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICBkZXNjcmlwdG9yID0gJGNyZWF0ZShkZXNjcmlwdG9yLCB7ZW51bWVyYWJsZToge3ZhbHVlOiBmYWxzZX19KTtcbiAgICAgIH1cbiAgICAgIG5hbWUgPSBuYW1lW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIH1cbiAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsT2JqZWN0KE9iamVjdCkge1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdkZWZpbmVQcm9wZXJ0eScsIHt2YWx1ZTogZGVmaW5lUHJvcGVydHl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZ2V0T3duUHJvcGVydHlOYW1lcycsIHt2YWx1ZTogZ2V0T3duUHJvcGVydHlOYW1lc30pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCB7dmFsdWU6IGdldE93blByb3BlcnR5RGVzY3JpcHRvcn0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnaGFzT3duUHJvcGVydHknLCB7dmFsdWU6IGhhc093blByb3BlcnR5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2ZyZWV6ZScsIHt2YWx1ZTogZnJlZXplfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ3ByZXZlbnRFeHRlbnNpb25zJywge3ZhbHVlOiBwcmV2ZW50RXh0ZW5zaW9uc30pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdzZWFsJywge3ZhbHVlOiBzZWFsfSk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scztcbiAgfVxuICBmdW5jdGlvbiBleHBvcnRTdGFyKG9iamVjdCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhhcmd1bWVudHNbaV0pO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbmFtZSA9IG5hbWVzW2pdO1xuICAgICAgICBpZiAocHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAoZnVuY3Rpb24obW9kLCBuYW1lKSB7XG4gICAgICAgICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vZFtuYW1lXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKGFyZ3VtZW50c1tpXSwgbmFtZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPSBudWxsICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIHRvT2JqZWN0KHgpIHtcbiAgICBpZiAoeCA9PSBudWxsKVxuICAgICAgdGhyb3cgJFR5cGVFcnJvcigpO1xuICAgIHJldHVybiAkT2JqZWN0KHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSB7XG4gICAgaWYgKGFyZ3VtZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYW4gT2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBhcmd1bWVudDtcbiAgfVxuICBmdW5jdGlvbiBzZXR1cEdsb2JhbHMoZ2xvYmFsKSB7XG4gICAgZ2xvYmFsLlN5bWJvbCA9IFN5bWJvbDtcbiAgICBnbG9iYWwuUmVmbGVjdCA9IGdsb2JhbC5SZWZsZWN0IHx8IHt9O1xuICAgIGdsb2JhbC5SZWZsZWN0Lmdsb2JhbCA9IGdsb2JhbC5SZWZsZWN0Lmdsb2JhbCB8fCBnbG9iYWw7XG4gICAgcG9seWZpbGxPYmplY3QoZ2xvYmFsLk9iamVjdCk7XG4gIH1cbiAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gIGdsb2JhbC4kdHJhY2V1clJ1bnRpbWUgPSB7XG4gICAgY3JlYXRlUHJpdmF0ZU5hbWU6IGNyZWF0ZVByaXZhdGVOYW1lLFxuICAgIGV4cG9ydFN0YXI6IGV4cG9ydFN0YXIsXG4gICAgZ2V0T3duSGFzaE9iamVjdDogZ2V0T3duSGFzaE9iamVjdCxcbiAgICBwcml2YXRlTmFtZXM6IHByaXZhdGVOYW1lcyxcbiAgICBzZXRQcm9wZXJ0eTogc2V0UHJvcGVydHksXG4gICAgc2V0dXBHbG9iYWxzOiBzZXR1cEdsb2JhbHMsXG4gICAgdG9PYmplY3Q6IHRvT2JqZWN0LFxuICAgIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgICB0b1Byb3BlcnR5OiB0b1Byb3BlcnR5LFxuICAgIHR5cGU6IHR5cGVzLFxuICAgIHR5cGVvZjogdHlwZU9mLFxuICAgIGNoZWNrT2JqZWN0Q29lcmNpYmxlOiBjaGVja09iamVjdENvZXJjaWJsZSxcbiAgICBoYXNPd25Qcm9wZXJ0eTogZnVuY3Rpb24obywgcCkge1xuICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwobywgcCk7XG4gICAgfSxcbiAgICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgICBrZXlzOiAka2V5c1xuICB9O1xufSkodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0aGlzKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBmdW5jdGlvbiBzcHJlYWQoKSB7XG4gICAgdmFyIHJ2ID0gW10sXG4gICAgICAgIGogPSAwLFxuICAgICAgICBpdGVyUmVzdWx0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWVUb1NwcmVhZCA9ICR0cmFjZXVyUnVudGltZS5jaGVja09iamVjdENvZXJjaWJsZShhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZVRvU3ByZWFkWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBzcHJlYWQgbm9uLWl0ZXJhYmxlIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBpdGVyID0gdmFsdWVUb1NwcmVhZFskdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSgpO1xuICAgICAgd2hpbGUgKCEoaXRlclJlc3VsdCA9IGl0ZXIubmV4dCgpKS5kb25lKSB7XG4gICAgICAgIHJ2W2orK10gPSBpdGVyUmVzdWx0LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnY7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLnNwcmVhZCA9IHNwcmVhZDtcbn0pKCk7XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyICRPYmplY3QgPSBPYmplY3Q7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICB2YXIgJGNyZWF0ZSA9ICRPYmplY3QuY3JlYXRlO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydGllcztcbiAgdmFyICRkZWZpbmVQcm9wZXJ0eSA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICB2YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyICRnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgZnVuY3Rpb24gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpIHtcbiAgICB2YXIgcHJvdG8gPSAkZ2V0UHJvdG90eXBlT2YoaG9tZU9iamVjdCk7XG4gICAgZG8ge1xuICAgICAgdmFyIHJlc3VsdCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIG5hbWUpO1xuICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIHByb3RvID0gJGdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9IHdoaWxlIChwcm90byk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBzdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSwgYXJncykge1xuICAgIHJldHVybiBzdXBlckdldChzZWxmLCBob21lT2JqZWN0LCBuYW1lKS5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuICBmdW5jdGlvbiBzdXBlckdldChzZWxmLCBob21lT2JqZWN0LCBuYW1lKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgIGlmICghZGVzY3JpcHRvci5nZXQpXG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgcmV0dXJuIGRlc2NyaXB0b3IuZ2V0LmNhbGwoc2VsZik7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJTZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKTtcbiAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQuY2FsbChzZWxmLCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHRocm93ICRUeXBlRXJyb3IoXCJzdXBlciBoYXMgbm8gc2V0dGVyICdcIiArIG5hbWUgKyBcIicuXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGdldERlc2NyaXB0b3JzKG9iamVjdCkge1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9LFxuICAgICAgICBuYW1lLFxuICAgICAgICBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIGRlc2NyaXB0b3JzW25hbWVdID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlQ2xhc3MoY3Rvciwgb2JqZWN0LCBzdGF0aWNPYmplY3QsIHN1cGVyQ2xhc3MpIHtcbiAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCAnY29uc3RydWN0b3InLCB7XG4gICAgICB2YWx1ZTogY3RvcixcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcbiAgICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY3Rvci5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSAkY3JlYXRlKGdldFByb3RvUGFyZW50KHN1cGVyQ2xhc3MpLCBnZXREZXNjcmlwdG9ycyhvYmplY3QpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBvYmplY3Q7XG4gICAgfVxuICAgICRkZWZpbmVQcm9wZXJ0eShjdG9yLCAncHJvdG90eXBlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgIH0pO1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydGllcyhjdG9yLCBnZXREZXNjcmlwdG9ycyhzdGF0aWNPYmplY3QpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRQcm90b1BhcmVudChzdXBlckNsYXNzKSB7XG4gICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gc3VwZXJDbGFzcy5wcm90b3R5cGU7XG4gICAgICBpZiAoJE9iamVjdChwcm90b3R5cGUpID09PSBwcm90b3R5cGUgfHwgcHJvdG90eXBlID09PSBudWxsKVxuICAgICAgICByZXR1cm4gc3VwZXJDbGFzcy5wcm90b3R5cGU7XG4gICAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcignc3VwZXIgcHJvdG90eXBlIG11c3QgYmUgYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgaWYgKHN1cGVyQ2xhc3MgPT09IG51bGwpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcigoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MgKyBcIi5cIikpO1xuICB9XG4gIGZ1bmN0aW9uIGRlZmF1bHRTdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgYXJncykge1xuICAgIGlmICgkZ2V0UHJvdG90eXBlT2YoaG9tZU9iamVjdCkgIT09IG51bGwpXG4gICAgICBzdXBlckNhbGwoc2VsZiwgaG9tZU9iamVjdCwgJ2NvbnN0cnVjdG9yJywgYXJncyk7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzID0gY3JlYXRlQ2xhc3M7XG4gICR0cmFjZXVyUnVudGltZS5kZWZhdWx0U3VwZXJDYWxsID0gZGVmYXVsdFN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ2FsbCA9IHN1cGVyQ2FsbDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyR2V0ID0gc3VwZXJHZXQ7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlclNldCA9IHN1cGVyU2V0O1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgY3JlYXRlUHJpdmF0ZU5hbWUgPSAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlUHJpdmF0ZU5hbWU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciBTVF9ORVdCT1JOID0gMDtcbiAgdmFyIFNUX0VYRUNVVElORyA9IDE7XG4gIHZhciBTVF9TVVNQRU5ERUQgPSAyO1xuICB2YXIgU1RfQ0xPU0VEID0gMztcbiAgdmFyIEVORF9TVEFURSA9IC0yO1xuICB2YXIgUkVUSFJPV19TVEFURSA9IC0zO1xuICBmdW5jdGlvbiBnZXRJbnRlcm5hbEVycm9yKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcignVHJhY2V1ciBjb21waWxlciBidWc6IGludmFsaWQgc3RhdGUgaW4gc3RhdGUgbWFjaGluZTogJyArIHN0YXRlKTtcbiAgfVxuICBmdW5jdGlvbiBHZW5lcmF0b3JDb250ZXh0KCkge1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMuR1N0YXRlID0gU1RfTkVXQk9STjtcbiAgICB0aGlzLnN0b3JlZEV4Y2VwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbmFsbHlGYWxsVGhyb3VnaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNlbnRfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmV0dXJuVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50cnlTdGFja18gPSBbXTtcbiAgfVxuICBHZW5lcmF0b3JDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBwdXNoVHJ5OiBmdW5jdGlvbihjYXRjaFN0YXRlLCBmaW5hbGx5U3RhdGUpIHtcbiAgICAgIGlmIChmaW5hbGx5U3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGZpbmFsbHlGYWxsVGhyb3VnaCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeVN0YWNrXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmICh0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2ggPSB0aGlzLnRyeVN0YWNrX1tpXS5jYXRjaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZmluYWxseUZhbGxUaHJvdWdoID09PSBudWxsKVxuICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaCA9IFJFVEhST1dfU1RBVEU7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe1xuICAgICAgICAgIGZpbmFsbHk6IGZpbmFsbHlTdGF0ZSxcbiAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2g6IGZpbmFsbHlGYWxsVGhyb3VnaFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXRjaFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJ5U3RhY2tfLnB1c2goe2NhdGNoOiBjYXRjaFN0YXRlfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwb3BUcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50cnlTdGFja18ucG9wKCk7XG4gICAgfSxcbiAgICBnZXQgc2VudCgpIHtcbiAgICAgIHRoaXMubWF5YmVUaHJvdygpO1xuICAgICAgcmV0dXJuIHRoaXMuc2VudF87XG4gICAgfSxcbiAgICBzZXQgc2VudCh2KSB7XG4gICAgICB0aGlzLnNlbnRfID0gdjtcbiAgICB9LFxuICAgIGdldCBzZW50SWdub3JlVGhyb3coKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZW50XztcbiAgICB9LFxuICAgIG1heWJlVGhyb3c6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aW9uID09PSAndGhyb3cnKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gJ25leHQnO1xuICAgICAgICB0aHJvdyB0aGlzLnNlbnRfO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIEVORF9TVEFURTpcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY2FzZSBSRVRIUk9XX1NUQVRFOlxuICAgICAgICAgIHRocm93IHRoaXMuc3RvcmVkRXhjZXB0aW9uO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IGdldEludGVybmFsRXJyb3IodGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVFeGNlcHRpb246IGZ1bmN0aW9uKGV4KSB7XG4gICAgICB0aGlzLkdTdGF0ZSA9IFNUX0NMT1NFRDtcbiAgICAgIHRoaXMuc3RhdGUgPSBFTkRfU1RBVEU7XG4gICAgICB0aHJvdyBleDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIG5leHRPclRocm93KGN0eCwgbW92ZU5leHQsIGFjdGlvbiwgeCkge1xuICAgIHN3aXRjaCAoY3R4LkdTdGF0ZSkge1xuICAgICAgY2FzZSBTVF9FWEVDVVRJTkc6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJcXFwiXCIgKyBhY3Rpb24gKyBcIlxcXCIgb24gZXhlY3V0aW5nIGdlbmVyYXRvclwiKSk7XG4gICAgICBjYXNlIFNUX0NMT1NFRDpcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnbmV4dCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHg7XG4gICAgICBjYXNlIFNUX05FV0JPUk46XG4gICAgICAgIGlmIChhY3Rpb24gPT09ICd0aHJvdycpIHtcbiAgICAgICAgICBjdHguR1N0YXRlID0gU1RfQ0xPU0VEO1xuICAgICAgICAgIHRocm93IHg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aHJvdyAkVHlwZUVycm9yKCdTZW50IHZhbHVlIHRvIG5ld2Jvcm4gZ2VuZXJhdG9yJyk7XG4gICAgICBjYXNlIFNUX1NVU1BFTkRFRDpcbiAgICAgICAgY3R4LkdTdGF0ZSA9IFNUX0VYRUNVVElORztcbiAgICAgICAgY3R4LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgY3R4LnNlbnQgPSB4O1xuICAgICAgICB2YXIgdmFsdWUgPSBtb3ZlTmV4dChjdHgpO1xuICAgICAgICB2YXIgZG9uZSA9IHZhbHVlID09PSBjdHg7XG4gICAgICAgIGlmIChkb25lKVxuICAgICAgICAgIHZhbHVlID0gY3R4LnJldHVyblZhbHVlO1xuICAgICAgICBjdHguR1N0YXRlID0gZG9uZSA/IFNUX0NMT1NFRCA6IFNUX1NVU1BFTkRFRDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgZG9uZTogZG9uZVxuICAgICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgY3R4TmFtZSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBtb3ZlTmV4dE5hbWUgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICRkZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShHZW5lcmF0b3JGdW5jdGlvbikpO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIG5leHQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiBuZXh0T3JUaHJvdyh0aGlzW2N0eE5hbWVdLCB0aGlzW21vdmVOZXh0TmFtZV0sICduZXh0Jywgdik7XG4gICAgfSxcbiAgICB0aHJvdzogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIG5leHRPclRocm93KHRoaXNbY3R4TmFtZV0sIHRoaXNbbW92ZU5leHROYW1lXSwgJ3Rocm93Jywgdik7XG4gICAgfVxuICB9O1xuICAkZGVmaW5lUHJvcGVydGllcyhHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge2VudW1lcmFibGU6IGZhbHNlfSxcbiAgICBuZXh0OiB7ZW51bWVyYWJsZTogZmFsc2V9LFxuICAgIHRocm93OiB7ZW51bWVyYWJsZTogZmFsc2V9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIG5vbkVudW0oZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pKTtcbiAgZnVuY3Rpb24gY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoaW5uZXJGdW5jdGlvbiwgZnVuY3Rpb25PYmplY3QsIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEdlbmVyYXRvckNvbnRleHQoKTtcbiAgICB2YXIgb2JqZWN0ID0gJGNyZWF0ZShmdW5jdGlvbk9iamVjdC5wcm90b3R5cGUpO1xuICAgIG9iamVjdFtjdHhOYW1lXSA9IGN0eDtcbiAgICBvYmplY3RbbW92ZU5leHROYW1lXSA9IG1vdmVOZXh0O1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uT2JqZWN0KSB7XG4gICAgZnVuY3Rpb25PYmplY3QucHJvdG90eXBlID0gJGNyZWF0ZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUpO1xuICAgIGZ1bmN0aW9uT2JqZWN0Ll9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIHJldHVybiBmdW5jdGlvbk9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBBc3luY0Z1bmN0aW9uQ29udGV4dCgpIHtcbiAgICBHZW5lcmF0b3JDb250ZXh0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5lcnIgPSB1bmRlZmluZWQ7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgY3R4LnJlc3VsdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY3R4LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgY3R4LnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgfVxuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUgPSAkY3JlYXRlKEdlbmVyYXRvckNvbnRleHQucHJvdG90eXBlKTtcbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgY2FzZSBFTkRfU1RBVEU6XG4gICAgICAgIHRoaXMucmVzb2x2ZSh0aGlzLnJldHVyblZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJFVEhST1dfU1RBVEU6XG4gICAgICAgIHRoaXMucmVqZWN0KHRoaXMuc3RvcmVkRXhjZXB0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnJlamVjdChnZXRJbnRlcm5hbEVycm9yKHRoaXMuc3RhdGUpKTtcbiAgICB9XG4gIH07XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZS5oYW5kbGVFeGNlcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlID0gUkVUSFJPV19TVEFURTtcbiAgfTtcbiAgZnVuY3Rpb24gYXN5bmNXcmFwKGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICB2YXIgbW92ZU5leHQgPSBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKTtcbiAgICB2YXIgY3R4ID0gbmV3IEFzeW5jRnVuY3Rpb25Db250ZXh0KCk7XG4gICAgY3R4LmNyZWF0ZUNhbGxiYWNrID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjdHguc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgY3R4LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY3R4LmVycmJhY2sgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGhhbmRsZUNhdGNoKGN0eCwgZXJyKTtcbiAgICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgfTtcbiAgICBtb3ZlTmV4dChjdHgpO1xuICAgIHJldHVybiBjdHgucmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY3R4KSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBpbm5lckZ1bmN0aW9uLmNhbGwoc2VsZiwgY3R4KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBoYW5kbGVDYXRjaChjdHgsIGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlQ2F0Y2goY3R4LCBleCkge1xuICAgIGN0eC5zdG9yZWRFeGNlcHRpb24gPSBleDtcbiAgICB2YXIgbGFzdCA9IGN0eC50cnlTdGFja19bY3R4LnRyeVN0YWNrXy5sZW5ndGggLSAxXTtcbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIGN0eC5oYW5kbGVFeGNlcHRpb24oZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdHguc3RhdGUgPSBsYXN0LmNhdGNoICE9PSB1bmRlZmluZWQgPyBsYXN0LmNhdGNoIDogbGFzdC5maW5hbGx5O1xuICAgIGlmIChsYXN0LmZpbmFsbHlGYWxsVGhyb3VnaCAhPT0gdW5kZWZpbmVkKVxuICAgICAgY3R4LmZpbmFsbHlGYWxsVGhyb3VnaCA9IGxhc3QuZmluYWxseUZhbGxUaHJvdWdoO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5hc3luY1dyYXAgPSBhc3luY1dyYXA7XG4gICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24gPSBpbml0R2VuZXJhdG9yRnVuY3Rpb247XG4gICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZSA9IGNyZWF0ZUdlbmVyYXRvckluc3RhbmNlO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKG9wdF9zY2hlbWUsIG9wdF91c2VySW5mbywgb3B0X2RvbWFpbiwgb3B0X3BvcnQsIG9wdF9wYXRoLCBvcHRfcXVlcnlEYXRhLCBvcHRfZnJhZ21lbnQpIHtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgaWYgKG9wdF9zY2hlbWUpIHtcbiAgICAgIG91dC5wdXNoKG9wdF9zY2hlbWUsICc6Jyk7XG4gICAgfVxuICAgIGlmIChvcHRfZG9tYWluKSB7XG4gICAgICBvdXQucHVzaCgnLy8nKTtcbiAgICAgIGlmIChvcHRfdXNlckluZm8pIHtcbiAgICAgICAgb3V0LnB1c2gob3B0X3VzZXJJbmZvLCAnQCcpO1xuICAgICAgfVxuICAgICAgb3V0LnB1c2gob3B0X2RvbWFpbik7XG4gICAgICBpZiAob3B0X3BvcnQpIHtcbiAgICAgICAgb3V0LnB1c2goJzonLCBvcHRfcG9ydCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRfcGF0aCkge1xuICAgICAgb3V0LnB1c2gob3B0X3BhdGgpO1xuICAgIH1cbiAgICBpZiAob3B0X3F1ZXJ5RGF0YSkge1xuICAgICAgb3V0LnB1c2goJz8nLCBvcHRfcXVlcnlEYXRhKTtcbiAgICB9XG4gICAgaWYgKG9wdF9mcmFnbWVudCkge1xuICAgICAgb3V0LnB1c2goJyMnLCBvcHRfZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG4gIDtcbiAgdmFyIHNwbGl0UmUgPSBuZXcgUmVnRXhwKCdeJyArICcoPzonICsgJyhbXjovPyMuXSspJyArICc6KT8nICsgJyg/Oi8vJyArICcoPzooW14vPyNdKilAKT8nICsgJyhbXFxcXHdcXFxcZFxcXFwtXFxcXHUwMTAwLVxcXFx1ZmZmZi4lXSopJyArICcoPzo6KFswLTldKykpPycgKyAnKT8nICsgJyhbXj8jXSspPycgKyAnKD86XFxcXD8oW14jXSopKT8nICsgJyg/OiMoLiopKT8nICsgJyQnKTtcbiAgdmFyIENvbXBvbmVudEluZGV4ID0ge1xuICAgIFNDSEVNRTogMSxcbiAgICBVU0VSX0lORk86IDIsXG4gICAgRE9NQUlOOiAzLFxuICAgIFBPUlQ6IDQsXG4gICAgUEFUSDogNSxcbiAgICBRVUVSWV9EQVRBOiA2LFxuICAgIEZSQUdNRU5UOiA3XG4gIH07XG4gIGZ1bmN0aW9uIHNwbGl0KHVyaSkge1xuICAgIHJldHVybiAodXJpLm1hdGNoKHNwbGl0UmUpKTtcbiAgfVxuICBmdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyhwYXRoKSB7XG4gICAgaWYgKHBhdGggPT09ICcvJylcbiAgICAgIHJldHVybiAnLyc7XG4gICAgdmFyIGxlYWRpbmdTbGFzaCA9IHBhdGhbMF0gPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciB0cmFpbGluZ1NsYXNoID0gcGF0aC5zbGljZSgtMSkgPT09ICcvJyA/ICcvJyA6ICcnO1xuICAgIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIHVwID0gMDtcbiAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBzZWdtZW50cy5sZW5ndGg7IHBvcysrKSB7XG4gICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW3Bvc107XG4gICAgICBzd2l0Y2ggKHNlZ21lbnQpIHtcbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy4uJzpcbiAgICAgICAgICBpZiAob3V0Lmxlbmd0aClcbiAgICAgICAgICAgIG91dC5wb3AoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB1cCsrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG91dC5wdXNoKHNlZ21lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWxlYWRpbmdTbGFzaCkge1xuICAgICAgd2hpbGUgKHVwLS0gPiAwKSB7XG4gICAgICAgIG91dC51bnNoaWZ0KCcuLicpO1xuICAgICAgfVxuICAgICAgaWYgKG91dC5sZW5ndGggPT09IDApXG4gICAgICAgIG91dC5wdXNoKCcuJyk7XG4gICAgfVxuICAgIHJldHVybiBsZWFkaW5nU2xhc2ggKyBvdXQuam9pbignLycpICsgdHJhaWxpbmdTbGFzaDtcbiAgfVxuICBmdW5jdGlvbiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cykge1xuICAgIHZhciBwYXRoID0gcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gfHwgJyc7XG4gICAgcGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHBhdGgpO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gYnVpbGRGcm9tRW5jb2RlZFBhcnRzKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlVTRVJfSU5GT10sIHBhcnRzW0NvbXBvbmVudEluZGV4LkRPTUFJTl0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlBPUlRdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUVVFUllfREFUQV0sIHBhcnRzW0NvbXBvbmVudEluZGV4LkZSQUdNRU5UXSk7XG4gIH1cbiAgZnVuY3Rpb24gY2Fub25pY2FsaXplVXJsKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgfVxuICBmdW5jdGlvbiByZXNvbHZlVXJsKGJhc2UsIHVybCkge1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KHVybCk7XG4gICAgdmFyIGJhc2VQYXJ0cyA9IHNwbGl0KGJhc2UpO1xuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdID0gYmFzZVBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSBDb21wb25lbnRJbmRleC5TQ0hFTUU7IGkgPD0gQ29tcG9uZW50SW5kZXguUE9SVDsgaSsrKSB7XG4gICAgICBpZiAoIXBhcnRzW2ldKSB7XG4gICAgICAgIHBhcnRzW2ldID0gYmFzZVBhcnRzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF1bMF0gPT0gJy8nKSB7XG4gICAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IGJhc2VQYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXTtcbiAgICB2YXIgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoMCwgaW5kZXggKyAxKSArIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdO1xuICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdID0gcGF0aDtcbiAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG4gIGZ1bmN0aW9uIGlzQWJzb2x1dGUobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAobmFtZVswXSA9PT0gJy8nKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQobmFtZSk7XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0pXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmNhbm9uaWNhbGl6ZVVybCA9IGNhbm9uaWNhbGl6ZVVybDtcbiAgJHRyYWNldXJSdW50aW1lLmlzQWJzb2x1dGUgPSBpc0Fic29sdXRlO1xuICAkdHJhY2V1clJ1bnRpbWUucmVtb3ZlRG90U2VnbWVudHMgPSByZW1vdmVEb3RTZWdtZW50cztcbiAgJHRyYWNldXJSdW50aW1lLnJlc29sdmVVcmwgPSByZXNvbHZlVXJsO1xufSkoKTtcbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJF9fMiA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGNhbm9uaWNhbGl6ZVVybCA9ICRfXzIuY2Fub25pY2FsaXplVXJsLFxuICAgICAgcmVzb2x2ZVVybCA9ICRfXzIucmVzb2x2ZVVybCxcbiAgICAgIGlzQWJzb2x1dGUgPSAkX18yLmlzQWJzb2x1dGU7XG4gIHZhciBtb2R1bGVJbnN0YW50aWF0b3JzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGJhc2VVUkw7XG4gIGlmIChnbG9iYWwubG9jYXRpb24gJiYgZ2xvYmFsLmxvY2F0aW9uLmhyZWYpXG4gICAgYmFzZVVSTCA9IHJlc29sdmVVcmwoZ2xvYmFsLmxvY2F0aW9uLmhyZWYsICcuLycpO1xuICBlbHNlXG4gICAgYmFzZVVSTCA9ICcnO1xuICB2YXIgVW5jb2F0ZWRNb2R1bGVFbnRyeSA9IGZ1bmN0aW9uIFVuY29hdGVkTW9kdWxlRW50cnkodXJsLCB1bmNvYXRlZE1vZHVsZSkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMudmFsdWVfID0gdW5jb2F0ZWRNb2R1bGU7XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFVuY29hdGVkTW9kdWxlRW50cnksIHt9LCB7fSk7XG4gIHZhciBNb2R1bGVFdmFsdWF0aW9uRXJyb3IgPSBmdW5jdGlvbiBNb2R1bGVFdmFsdWF0aW9uRXJyb3IoZXJyb25lb3VzTW9kdWxlTmFtZSwgY2F1c2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnOiAnICsgdGhpcy5zdHJpcENhdXNlKGNhdXNlKSArICcgaW4gJyArIGVycm9uZW91c01vZHVsZU5hbWU7XG4gICAgaWYgKCEoY2F1c2UgaW5zdGFuY2VvZiAkTW9kdWxlRXZhbHVhdGlvbkVycm9yKSAmJiBjYXVzZS5zdGFjaylcbiAgICAgIHRoaXMuc3RhY2sgPSB0aGlzLnN0cmlwU3RhY2soY2F1c2Uuc3RhY2spO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfTtcbiAgdmFyICRNb2R1bGVFdmFsdWF0aW9uRXJyb3IgPSBNb2R1bGVFdmFsdWF0aW9uRXJyb3I7XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKE1vZHVsZUV2YWx1YXRpb25FcnJvciwge1xuICAgIHN0cmlwRXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGxhY2UoLy4qRXJyb3I6LywgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJzonKTtcbiAgICB9LFxuICAgIHN0cmlwQ2F1c2U6IGZ1bmN0aW9uKGNhdXNlKSB7XG4gICAgICBpZiAoIWNhdXNlKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICBpZiAoIWNhdXNlLm1lc3NhZ2UpXG4gICAgICAgIHJldHVybiBjYXVzZSArICcnO1xuICAgICAgcmV0dXJuIHRoaXMuc3RyaXBFcnJvcihjYXVzZS5tZXNzYWdlKTtcbiAgICB9LFxuICAgIGxvYWRlZEJ5OiBmdW5jdGlvbihtb2R1bGVOYW1lKSB7XG4gICAgICB0aGlzLnN0YWNrICs9ICdcXG4gbG9hZGVkIGJ5ICcgKyBtb2R1bGVOYW1lO1xuICAgIH0sXG4gICAgc3RyaXBTdGFjazogZnVuY3Rpb24oY2F1c2VTdGFjaykge1xuICAgICAgdmFyIHN0YWNrID0gW107XG4gICAgICBjYXVzZVN0YWNrLnNwbGl0KCdcXG4nKS5zb21lKChmdW5jdGlvbihmcmFtZSkge1xuICAgICAgICBpZiAoL1VuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLy50ZXN0KGZyYW1lKSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgc3RhY2sucHVzaChmcmFtZSk7XG4gICAgICB9KSk7XG4gICAgICBzdGFja1swXSA9IHRoaXMuc3RyaXBFcnJvcihzdGFja1swXSk7XG4gICAgICByZXR1cm4gc3RhY2suam9pbignXFxuJyk7XG4gICAgfVxuICB9LCB7fSwgRXJyb3IpO1xuICB2YXIgVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IgPSBmdW5jdGlvbiBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcih1cmwsIGZ1bmMpIHtcbiAgICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJDYWxsKHRoaXMsICRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvci5wcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgW3VybCwgbnVsbF0pO1xuICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gIH07XG4gIHZhciAkVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IgPSBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcjtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IsIHtnZXRVbmNvYXRlZE1vZHVsZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZV8pXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXyA9IHRoaXMuZnVuYy5jYWxsKGdsb2JhbCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBpZiAoZXggaW5zdGFuY2VvZiBNb2R1bGVFdmFsdWF0aW9uRXJyb3IpIHtcbiAgICAgICAgICBleC5sb2FkZWRCeSh0aGlzLnVybCk7XG4gICAgICAgICAgdGhyb3cgZXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IE1vZHVsZUV2YWx1YXRpb25FcnJvcih0aGlzLnVybCwgZXgpO1xuICAgICAgfVxuICAgIH19LCB7fSwgVW5jb2F0ZWRNb2R1bGVFbnRyeSk7XG4gIGZ1bmN0aW9uIGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm47XG4gICAgdmFyIHVybCA9IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZShuYW1lKTtcbiAgICByZXR1cm4gbW9kdWxlSW5zdGFudGlhdG9yc1t1cmxdO1xuICB9XG4gIDtcbiAgdmFyIG1vZHVsZUluc3RhbmNlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBsaXZlTW9kdWxlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gTW9kdWxlKHVuY29hdGVkTW9kdWxlKSB7XG4gICAgdmFyIGlzTGl2ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgY29hdGVkTW9kdWxlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh1bmNvYXRlZE1vZHVsZSkuZm9yRWFjaCgoZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGdldHRlcixcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIGlmIChpc0xpdmUgPT09IGxpdmVNb2R1bGVTZW50aW5lbCkge1xuICAgICAgICB2YXIgZGVzY3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHVuY29hdGVkTW9kdWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGRlc2NyLmdldClcbiAgICAgICAgICBnZXR0ZXIgPSBkZXNjci5nZXQ7XG4gICAgICB9XG4gICAgICBpZiAoIWdldHRlcikge1xuICAgICAgICB2YWx1ZSA9IHVuY29hdGVkTW9kdWxlW25hbWVdO1xuICAgICAgICBnZXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29hdGVkTW9kdWxlLCBuYW1lLCB7XG4gICAgICAgIGdldDogZ2V0dGVyLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KSk7XG4gICAgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKGNvYXRlZE1vZHVsZSk7XG4gICAgcmV0dXJuIGNvYXRlZE1vZHVsZTtcbiAgfVxuICB2YXIgTW9kdWxlU3RvcmUgPSB7XG4gICAgbm9ybWFsaXplOiBmdW5jdGlvbihuYW1lLCByZWZlcmVyTmFtZSwgcmVmZXJlckFkZHJlc3MpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm1vZHVsZSBuYW1lIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiBuYW1lKTtcbiAgICAgIGlmIChpc0Fic29sdXRlKG5hbWUpKVxuICAgICAgICByZXR1cm4gY2Fub25pY2FsaXplVXJsKG5hbWUpO1xuICAgICAgaWYgKC9bXlxcLl1cXC9cXC5cXC5cXC8vLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb2R1bGUgbmFtZSBlbWJlZHMgLy4uLzogJyArIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWVbMF0gPT09ICcuJyAmJiByZWZlcmVyTmFtZSlcbiAgICAgICAgcmV0dXJuIHJlc29sdmVVcmwocmVmZXJlck5hbWUsIG5hbWUpO1xuICAgICAgcmV0dXJuIGNhbm9uaWNhbGl6ZVVybChuYW1lKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24obm9ybWFsaXplZE5hbWUpIHtcbiAgICAgIHZhciBtID0gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUpO1xuICAgICAgaWYgKCFtKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgdmFyIG1vZHVsZUluc3RhbmNlID0gbW9kdWxlSW5zdGFuY2VzW20udXJsXTtcbiAgICAgIGlmIChtb2R1bGVJbnN0YW5jZSlcbiAgICAgICAgcmV0dXJuIG1vZHVsZUluc3RhbmNlO1xuICAgICAgbW9kdWxlSW5zdGFuY2UgPSBNb2R1bGUobS5nZXRVbmNvYXRlZE1vZHVsZSgpLCBsaXZlTW9kdWxlU2VudGluZWwpO1xuICAgICAgcmV0dXJuIG1vZHVsZUluc3RhbmNlc1ttLnVybF0gPSBtb2R1bGVJbnN0YW5jZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24obm9ybWFsaXplZE5hbWUsIG1vZHVsZSkge1xuICAgICAgbm9ybWFsaXplZE5hbWUgPSBTdHJpbmcobm9ybWFsaXplZE5hbWUpO1xuICAgICAgbW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0gPSBuZXcgVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUsIChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgIH0pKTtcbiAgICAgIG1vZHVsZUluc3RhbmNlc1tub3JtYWxpemVkTmFtZV0gPSBtb2R1bGU7XG4gICAgfSxcbiAgICBnZXQgYmFzZVVSTCgpIHtcbiAgICAgIHJldHVybiBiYXNlVVJMO1xuICAgIH0sXG4gICAgc2V0IGJhc2VVUkwodikge1xuICAgICAgYmFzZVVSTCA9IFN0cmluZyh2KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyTW9kdWxlOiBmdW5jdGlvbihuYW1lLCBmdW5jKSB7XG4gICAgICB2YXIgbm9ybWFsaXplZE5hbWUgPSBNb2R1bGVTdG9yZS5ub3JtYWxpemUobmFtZSk7XG4gICAgICBpZiAobW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZHVwbGljYXRlIG1vZHVsZSBuYW1lZCAnICsgbm9ybWFsaXplZE5hbWUpO1xuICAgICAgbW9kdWxlSW5zdGFudGlhdG9yc1tub3JtYWxpemVkTmFtZV0gPSBuZXcgVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3Iobm9ybWFsaXplZE5hbWUsIGZ1bmMpO1xuICAgIH0sXG4gICAgYnVuZGxlU3RvcmU6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUsIGRlcHMsIGZ1bmMpIHtcbiAgICAgIGlmICghZGVwcyB8fCAhZGVwcy5sZW5ndGggJiYgIWZ1bmMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb2R1bGUobmFtZSwgZnVuYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJ1bmRsZVN0b3JlW25hbWVdID0ge1xuICAgICAgICAgIGRlcHM6IGRlcHMsXG4gICAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJF9fMCA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHZhciBkZXBNYXAgPSB7fTtcbiAgICAgICAgICAgIGRlcHMuZm9yRWFjaCgoZnVuY3Rpb24oZGVwLCBpbmRleCkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVwTWFwW2RlcF0gPSAkX18wW2luZGV4XTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHZhciByZWdpc3RyeUVudHJ5ID0gZnVuYy5jYWxsKHRoaXMsIGRlcE1hcCk7XG4gICAgICAgICAgICByZWdpc3RyeUVudHJ5LmV4ZWN1dGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiByZWdpc3RyeUVudHJ5LmV4cG9ydHM7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5vbnltb3VzTW9kdWxlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICByZXR1cm4gbmV3IE1vZHVsZShmdW5jLmNhbGwoZ2xvYmFsKSwgbGl2ZU1vZHVsZVNlbnRpbmVsKTtcbiAgICB9LFxuICAgIGdldEZvclRlc3Rpbmc6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgIGlmICghdGhpcy50ZXN0aW5nUHJlZml4Xykge1xuICAgICAgICBPYmplY3Qua2V5cyhtb2R1bGVJbnN0YW5jZXMpLnNvbWUoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHZhciBtID0gLyh0cmFjZXVyQFteXFwvXSpcXC8pLy5leGVjKGtleSk7XG4gICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICRfXzAudGVzdGluZ1ByZWZpeF8gPSBtWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy50ZXN0aW5nUHJlZml4XyArIG5hbWUpO1xuICAgIH1cbiAgfTtcbiAgTW9kdWxlU3RvcmUuc2V0KCdAdHJhY2V1ci9zcmMvcnVudGltZS9Nb2R1bGVTdG9yZScsIG5ldyBNb2R1bGUoe01vZHVsZVN0b3JlOiBNb2R1bGVTdG9yZX0pKTtcbiAgdmFyIHNldHVwR2xvYmFscyA9ICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHM7XG4gICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHMgPSBmdW5jdGlvbihnbG9iYWwpIHtcbiAgICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgfTtcbiAgJHRyYWNldXJSdW50aW1lLk1vZHVsZVN0b3JlID0gTW9kdWxlU3RvcmU7XG4gIGdsb2JhbC5TeXN0ZW0gPSB7XG4gICAgcmVnaXN0ZXI6IE1vZHVsZVN0b3JlLnJlZ2lzdGVyLmJpbmQoTW9kdWxlU3RvcmUpLFxuICAgIGdldDogTW9kdWxlU3RvcmUuZ2V0LFxuICAgIHNldDogTW9kdWxlU3RvcmUuc2V0LFxuICAgIG5vcm1hbGl6ZTogTW9kdWxlU3RvcmUubm9ybWFsaXplXG4gIH07XG4gICR0cmFjZXVyUnVudGltZS5nZXRNb2R1bGVJbXBsID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpbnN0YW50aWF0b3IgPSBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihuYW1lKTtcbiAgICByZXR1cm4gaW5zdGFudGlhdG9yICYmIGluc3RhbnRpYXRvci5nZXRVbmNvYXRlZE1vZHVsZSgpO1xuICB9O1xufSkodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0aGlzKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCI7XG4gIHZhciAkY2VpbCA9IE1hdGguY2VpbDtcbiAgdmFyICRmbG9vciA9IE1hdGguZmxvb3I7XG4gIHZhciAkaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgdmFyICRpc05hTiA9IGlzTmFOO1xuICB2YXIgJHBvdyA9IE1hdGgucG93O1xuICB2YXIgJG1pbiA9IE1hdGgubWluO1xuICB2YXIgdG9PYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUudG9PYmplY3Q7XG4gIGZ1bmN0aW9uIHRvVWludDMyKHgpIHtcbiAgICByZXR1cm4geCA+Pj4gMDtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gaXNDYWxsYWJsZSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xuICB9XG4gIGZ1bmN0aW9uIGlzTnVtYmVyKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInO1xuICB9XG4gIGZ1bmN0aW9uIHRvSW50ZWdlcih4KSB7XG4gICAgeCA9ICt4O1xuICAgIGlmICgkaXNOYU4oeCkpXG4gICAgICByZXR1cm4gMDtcbiAgICBpZiAoeCA9PT0gMCB8fCAhJGlzRmluaXRlKHgpKVxuICAgICAgcmV0dXJuIHg7XG4gICAgcmV0dXJuIHggPiAwID8gJGZsb29yKHgpIDogJGNlaWwoeCk7XG4gIH1cbiAgdmFyIE1BWF9TQUZFX0xFTkdUSCA9ICRwb3coMiwgNTMpIC0gMTtcbiAgZnVuY3Rpb24gdG9MZW5ndGgoeCkge1xuICAgIHZhciBsZW4gPSB0b0ludGVnZXIoeCk7XG4gICAgcmV0dXJuIGxlbiA8IDAgPyAwIDogJG1pbihsZW4sIE1BWF9TQUZFX0xFTkdUSCk7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tJdGVyYWJsZSh4KSB7XG4gICAgcmV0dXJuICFpc09iamVjdCh4KSA/IHVuZGVmaW5lZCA6IHhbU3ltYm9sLml0ZXJhdG9yXTtcbiAgfVxuICBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKHgpIHtcbiAgICByZXR1cm4gaXNDYWxsYWJsZSh4KTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh2YWx1ZSwgZG9uZSkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBkb25lOiBkb25lXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZURlZmluZShvYmplY3QsIG5hbWUsIGRlc2NyKSB7XG4gICAgaWYgKCEobmFtZSBpbiBvYmplY3QpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCBkZXNjcik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lTWV0aG9kKG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgICBtYXliZURlZmluZShvYmplY3QsIG5hbWUsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZURlZmluZUNvbnN0KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgICBtYXliZURlZmluZShvYmplY3QsIG5hbWUsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkRnVuY3Rpb25zKG9iamVjdCwgZnVuY3Rpb25zKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jdGlvbnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBuYW1lID0gZnVuY3Rpb25zW2ldO1xuICAgICAgdmFyIHZhbHVlID0gZnVuY3Rpb25zW2kgKyAxXTtcbiAgICAgIG1heWJlRGVmaW5lTWV0aG9kKG9iamVjdCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZUFkZENvbnN0cyhvYmplY3QsIGNvbnN0cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uc3RzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB2YXIgbmFtZSA9IGNvbnN0c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IGNvbnN0c1tpICsgMV07XG4gICAgICBtYXliZURlZmluZUNvbnN0KG9iamVjdCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZUFkZEl0ZXJhdG9yKG9iamVjdCwgZnVuYywgU3ltYm9sKSB7XG4gICAgaWYgKCFTeW1ib2wgfHwgIVN5bWJvbC5pdGVyYXRvciB8fCBvYmplY3RbU3ltYm9sLml0ZXJhdG9yXSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAob2JqZWN0WydAQGl0ZXJhdG9yJ10pXG4gICAgICBmdW5jID0gb2JqZWN0WydAQGl0ZXJhdG9yJ107XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgICB2YWx1ZTogZnVuYyxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICB2YXIgcG9seWZpbGxzID0gW107XG4gIGZ1bmN0aW9uIHJlZ2lzdGVyUG9seWZpbGwoZnVuYykge1xuICAgIHBvbHlmaWxscy5wdXNoKGZ1bmMpO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsQWxsKGdsb2JhbCkge1xuICAgIHBvbHlmaWxscy5mb3JFYWNoKChmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZihnbG9iYWwpO1xuICAgIH0pKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGdldCB0b09iamVjdCgpIHtcbiAgICAgIHJldHVybiB0b09iamVjdDtcbiAgICB9LFxuICAgIGdldCB0b1VpbnQzMigpIHtcbiAgICAgIHJldHVybiB0b1VpbnQzMjtcbiAgICB9LFxuICAgIGdldCBpc09iamVjdCgpIHtcbiAgICAgIHJldHVybiBpc09iamVjdDtcbiAgICB9LFxuICAgIGdldCBpc0NhbGxhYmxlKCkge1xuICAgICAgcmV0dXJuIGlzQ2FsbGFibGU7XG4gICAgfSxcbiAgICBnZXQgaXNOdW1iZXIoKSB7XG4gICAgICByZXR1cm4gaXNOdW1iZXI7XG4gICAgfSxcbiAgICBnZXQgdG9JbnRlZ2VyKCkge1xuICAgICAgcmV0dXJuIHRvSW50ZWdlcjtcbiAgICB9LFxuICAgIGdldCB0b0xlbmd0aCgpIHtcbiAgICAgIHJldHVybiB0b0xlbmd0aDtcbiAgICB9LFxuICAgIGdldCBjaGVja0l0ZXJhYmxlKCkge1xuICAgICAgcmV0dXJuIGNoZWNrSXRlcmFibGU7XG4gICAgfSxcbiAgICBnZXQgaXNDb25zdHJ1Y3RvcigpIHtcbiAgICAgIHJldHVybiBpc0NvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZ2V0IGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IG1heWJlRGVmaW5lKCkge1xuICAgICAgcmV0dXJuIG1heWJlRGVmaW5lO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlRGVmaW5lTWV0aG9kKCkge1xuICAgICAgcmV0dXJuIG1heWJlRGVmaW5lTWV0aG9kO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlRGVmaW5lQ29uc3QoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmVDb25zdDtcbiAgICB9LFxuICAgIGdldCBtYXliZUFkZEZ1bmN0aW9ucygpIHtcbiAgICAgIHJldHVybiBtYXliZUFkZEZ1bmN0aW9ucztcbiAgICB9LFxuICAgIGdldCBtYXliZUFkZENvbnN0cygpIHtcbiAgICAgIHJldHVybiBtYXliZUFkZENvbnN0cztcbiAgICB9LFxuICAgIGdldCBtYXliZUFkZEl0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkSXRlcmF0b3I7XG4gICAgfSxcbiAgICBnZXQgcmVnaXN0ZXJQb2x5ZmlsbCgpIHtcbiAgICAgIHJldHVybiByZWdpc3RlclBvbHlmaWxsO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsQWxsKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsQWxsO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiO1xuICB2YXIgJF9fMyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGlzT2JqZWN0ID0gJF9fMy5pc09iamVjdCxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18zLm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMy5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgZ2V0T3duSGFzaE9iamVjdCA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25IYXNoT2JqZWN0O1xuICB2YXIgJGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGRlbGV0ZWRTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBsb29rdXBJbmRleChtYXAsIGtleSkge1xuICAgIGlmIChpc09iamVjdChrZXkpKSB7XG4gICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgIHJldHVybiBoYXNoT2JqZWN0ICYmIG1hcC5vYmplY3RJbmRleF9baGFzaE9iamVjdC5oYXNoXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIG1hcC5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICByZXR1cm4gbWFwLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRNYXAobWFwKSB7XG4gICAgbWFwLmVudHJpZXNfID0gW107XG4gICAgbWFwLm9iamVjdEluZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLnN0cmluZ0luZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLnByaW1pdGl2ZUluZGV4XyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgbWFwLmRlbGV0ZWRDb3VudF8gPSAwO1xuICB9XG4gIHZhciBNYXAgPSBmdW5jdGlvbiBNYXAoKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICghaXNPYmplY3QodGhpcykpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgY2FsbGVkIG9uIGluY29tcGF0aWJsZSB0eXBlJyk7XG4gICAgaWYgKCRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdlbnRyaWVzXycpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgY2FuIG5vdCBiZSByZWVudHJhbnRseSBpbml0aWFsaXNlZCcpO1xuICAgIH1cbiAgICBpbml0TWFwKHRoaXMpO1xuICAgIGlmIChpdGVyYWJsZSAhPT0gbnVsbCAmJiBpdGVyYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKHZhciAkX181ID0gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzY7ICEoJF9fNiA9ICRfXzUubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyICRfXzcgPSAkX182LnZhbHVlLFxuICAgICAgICAgICAga2V5ID0gJF9fN1swXSxcbiAgICAgICAgICAgIHZhbHVlID0gJF9fN1sxXTtcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShNYXAsIHtcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXNfLmxlbmd0aCAvIDIgLSB0aGlzLmRlbGV0ZWRDb3VudF87XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGluZGV4ID0gbG9va3VwSW5kZXgodGhpcywga2V5KTtcbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgb2JqZWN0TW9kZSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICB2YXIgc3RyaW5nTW9kZSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGluZGV4ID0gbG9va3VwSW5kZXgodGhpcywga2V5KTtcbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLmVudHJpZXNfLmxlbmd0aDtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleF0gPSBrZXk7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHZhbHVlO1xuICAgICAgICBpZiAob2JqZWN0TW9kZSkge1xuICAgICAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgICAgIHZhciBoYXNoID0gaGFzaE9iamVjdC5oYXNoO1xuICAgICAgICAgIHRoaXMub2JqZWN0SW5kZXhfW2hhc2hdID0gaW5kZXg7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyaW5nTW9kZSkge1xuICAgICAgICAgIHRoaXMuc3RyaW5nSW5kZXhfW2tleV0gPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBsb29rdXBJbmRleCh0aGlzLCBrZXkpICE9PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIG9iamVjdE1vZGUgPSBpc09iamVjdChrZXkpO1xuICAgICAgdmFyIHN0cmluZ01vZGUgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoYXNoO1xuICAgICAgaWYgKG9iamVjdE1vZGUpIHtcbiAgICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICAgIGlmIChoYXNoT2JqZWN0KSB7XG4gICAgICAgICAgaW5kZXggPSB0aGlzLm9iamVjdEluZGV4X1toYXNoID0gaGFzaE9iamVjdC5oYXNoXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5vYmplY3RJbmRleF9baGFzaF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RyaW5nTW9kZSkge1xuICAgICAgICBpbmRleCA9IHRoaXMuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnN0cmluZ0luZGV4X1trZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXhdID0gZGVsZXRlZFNlbnRpbmVsO1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZGVsZXRlZENvdW50XysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGluaXRNYXAodGhpcyk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFja0ZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgIGlmIChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbClcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY2FsbGJhY2tGbi5jYWxsKHRoaXNBcmcsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW50cmllczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX184KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX184LCB0aGlzKTtcbiAgICB9KSxcbiAgICBrZXlzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzkoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzksIHRoaXMpO1xuICAgIH0pLFxuICAgIHZhbHVlczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18xMCgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aCkgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18xMCwgdGhpcyk7XG4gICAgfSlcbiAgfSwge30pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBNYXAucHJvdG90eXBlLmVudHJpZXNcbiAgfSk7XG4gIGZ1bmN0aW9uIHBvbHlmaWxsTWFwKGdsb2JhbCkge1xuICAgIHZhciAkX183ID0gZ2xvYmFsLFxuICAgICAgICBPYmplY3QgPSAkX183Lk9iamVjdCxcbiAgICAgICAgU3ltYm9sID0gJF9fNy5TeW1ib2w7XG4gICAgaWYgKCFnbG9iYWwuTWFwKVxuICAgICAgZ2xvYmFsLk1hcCA9IE1hcDtcbiAgICB2YXIgbWFwUHJvdG90eXBlID0gZ2xvYmFsLk1hcC5wcm90b3R5cGU7XG4gICAgaWYgKG1hcFByb3RvdHlwZS5lbnRyaWVzKSB7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKG1hcFByb3RvdHlwZSwgbWFwUHJvdG90eXBlLmVudHJpZXMsIFN5bWJvbCk7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgZ2xvYmFsLk1hcCgpLmVudHJpZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sIFN5bWJvbCk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxNYXApO1xuICByZXR1cm4ge1xuICAgIGdldCBNYXAoKSB7XG4gICAgICByZXR1cm4gTWFwO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsTWFwKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsTWFwO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiO1xuICB2YXIgJF9fMTEgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBpc09iamVjdCA9ICRfXzExLmlzT2JqZWN0LFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzExLm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMTEucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyIE1hcCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIikuTWFwO1xuICB2YXIgZ2V0T3duSGFzaE9iamVjdCA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25IYXNoT2JqZWN0O1xuICB2YXIgJGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgZnVuY3Rpb24gaW5pdFNldChzZXQpIHtcbiAgICBzZXQubWFwXyA9IG5ldyBNYXAoKTtcbiAgfVxuICB2YXIgU2V0ID0gZnVuY3Rpb24gU2V0KCkge1xuICAgIHZhciBpdGVyYWJsZSA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAoIWlzT2JqZWN0KHRoaXMpKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgdHlwZScpO1xuICAgIGlmICgkaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnbWFwXycpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZXQgY2FuIG5vdCBiZSByZWVudHJhbnRseSBpbml0aWFsaXNlZCcpO1xuICAgIH1cbiAgICBpbml0U2V0KHRoaXMpO1xuICAgIGlmIChpdGVyYWJsZSAhPT0gbnVsbCAmJiBpdGVyYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKHZhciAkX18xNSA9IGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSxcbiAgICAgICAgICAkX18xNjsgISgkX18xNiA9ICRfXzE1Lm5leHQoKSkuZG9uZTsgKSB7XG4gICAgICAgIHZhciBpdGVtID0gJF9fMTYudmFsdWU7XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLmFkZChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoU2V0LCB7XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLnNpemU7XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5oYXMoa2V5KTtcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB0aGlzLm1hcF8uc2V0KGtleSwga2V5KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uZGVsZXRlKGtleSk7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmNsZWFyKCk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFja0ZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIHZhciAkX18xMyA9IHRoaXM7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmZvckVhY2goKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgY2FsbGJhY2tGbi5jYWxsKHRoaXNBcmcsIGtleSwga2V5LCAkX18xMyk7XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICB2YWx1ZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fMTgoKSB7XG4gICAgICB2YXIgJF9fMTksXG4gICAgICAgICAgJF9fMjA7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICRfXzE5ID0gdGhpcy5tYXBfLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICAgICRjdHguc2VudCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgJGN0eC5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkX18yMCA9ICRfXzE5WyRjdHguYWN0aW9uXSgkY3R4LnNlbnRJZ25vcmVUaHJvdyk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9ICgkX18yMC5kb25lKSA/IDMgOiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gJF9fMjAudmFsdWU7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgcmV0dXJuICRfXzIwLnZhbHVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMTgsIHRoaXMpO1xuICAgIH0pLFxuICAgIGVudHJpZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fMjEoKSB7XG4gICAgICB2YXIgJF9fMjIsXG4gICAgICAgICAgJF9fMjM7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICRfXzIyID0gdGhpcy5tYXBfLmVudHJpZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICAgICRjdHguc2VudCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgJGN0eC5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkX18yMyA9ICRfXzIyWyRjdHguYWN0aW9uXSgkY3R4LnNlbnRJZ25vcmVUaHJvdyk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9ICgkX18yMy5kb25lKSA/IDMgOiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gJF9fMjMudmFsdWU7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgcmV0dXJuICRfXzIzLnZhbHVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMjEsIHRoaXMpO1xuICAgIH0pXG4gIH0sIHt9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogU2V0LnByb3RvdHlwZS52YWx1ZXNcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCAna2V5cycsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IFNldC5wcm90b3R5cGUudmFsdWVzXG4gIH0pO1xuICBmdW5jdGlvbiBwb2x5ZmlsbFNldChnbG9iYWwpIHtcbiAgICB2YXIgJF9fMTcgPSBnbG9iYWwsXG4gICAgICAgIE9iamVjdCA9ICRfXzE3Lk9iamVjdCxcbiAgICAgICAgU3ltYm9sID0gJF9fMTcuU3ltYm9sO1xuICAgIGlmICghZ2xvYmFsLlNldClcbiAgICAgIGdsb2JhbC5TZXQgPSBTZXQ7XG4gICAgdmFyIHNldFByb3RvdHlwZSA9IGdsb2JhbC5TZXQucHJvdG90eXBlO1xuICAgIGlmIChzZXRQcm90b3R5cGUudmFsdWVzKSB7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKHNldFByb3RvdHlwZSwgc2V0UHJvdG90eXBlLnZhbHVlcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuU2V0KCkudmFsdWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsU2V0KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgU2V0KCkge1xuICAgICAgcmV0dXJuIFNldDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbFNldCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbFNldDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIjtcbiAgdmFyIGxlbiA9IDA7XG4gIGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICAgIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgICBsZW4gKz0gMjtcbiAgICBpZiAobGVuID09PSAyKSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG4gIHZhciAkX19kZWZhdWx0ID0gYXNhcDtcbiAgdmFyIGJyb3dzZXJHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDoge307XG4gIHZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gIHZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG4gIGZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgICB9O1xuICB9XG4gIHZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xuICAgICAgY2FsbGJhY2soYXJnKTtcbiAgICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZW4gPSAwO1xuICB9XG4gIHZhciBzY2hlZHVsZUZsdXNoO1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xuICB9IGVsc2UgaWYgKEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbiAgfSBlbHNlIGlmIChpc1dvcmtlcikge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VNZXNzYWdlQ2hhbm5lbCgpO1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbiAgcmV0dXJuIHtnZXQgZGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiAkX19kZWZhdWx0O1xuICAgIH19O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2VcIjtcbiAgdmFyIGFzeW5jID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcFwiKS5kZWZhdWx0O1xuICB2YXIgcmVnaXN0ZXJQb2x5ZmlsbCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKS5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgcHJvbWlzZVJhdyA9IHt9O1xuICBmdW5jdGlvbiBpc1Byb21pc2UoeCkge1xuICAgIHJldHVybiB4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4LnN0YXR1c18gIT09IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBpZFJlc29sdmVIYW5kbGVyKHgpIHtcbiAgICByZXR1cm4geDtcbiAgfVxuICBmdW5jdGlvbiBpZFJlamVjdEhhbmRsZXIoeCkge1xuICAgIHRocm93IHg7XG4gIH1cbiAgZnVuY3Rpb24gY2hhaW4ocHJvbWlzZSkge1xuICAgIHZhciBvblJlc29sdmUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDogaWRSZXNvbHZlSGFuZGxlcjtcbiAgICB2YXIgb25SZWplY3QgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDogaWRSZWplY3RIYW5kbGVyO1xuICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHByb21pc2UuY29uc3RydWN0b3IpO1xuICAgIHN3aXRjaCAocHJvbWlzZS5zdGF0dXNfKSB7XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBwcm9taXNlLm9uUmVzb2x2ZV8ucHVzaChvblJlc29sdmUsIGRlZmVycmVkKTtcbiAgICAgICAgcHJvbWlzZS5vblJlamVjdF8ucHVzaChvblJlamVjdCwgZGVmZXJyZWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKzE6XG4gICAgICAgIHByb21pc2VFbnF1ZXVlKHByb21pc2UudmFsdWVfLCBbb25SZXNvbHZlLCBkZWZlcnJlZF0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIHByb21pc2VFbnF1ZXVlKHByb21pc2UudmFsdWVfLCBbb25SZWplY3QsIGRlZmVycmVkXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgfVxuICBmdW5jdGlvbiBnZXREZWZlcnJlZChDKSB7XG4gICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VJbml0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICByZXNvbHZlOiAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpO1xuICAgICAgICB9KSxcbiAgICAgICAgcmVqZWN0OiAoZnVuY3Rpb24ocikge1xuICAgICAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgcik7XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICByZXN1bHQucHJvbWlzZSA9IG5ldyBDKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzdWx0LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICByZXN1bHQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZVNldChwcm9taXNlLCBzdGF0dXMsIHZhbHVlLCBvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gICAgcHJvbWlzZS5zdGF0dXNfID0gc3RhdHVzO1xuICAgIHByb21pc2UudmFsdWVfID0gdmFsdWU7XG4gICAgcHJvbWlzZS5vblJlc29sdmVfID0gb25SZXNvbHZlO1xuICAgIHByb21pc2Uub25SZWplY3RfID0gb25SZWplY3Q7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUluaXQocHJvbWlzZSkge1xuICAgIHJldHVybiBwcm9taXNlU2V0KHByb21pc2UsIDAsIHVuZGVmaW5lZCwgW10sIFtdKTtcbiAgfVxuICB2YXIgUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICBpZiAocmVzb2x2ZXIgPT09IHByb21pc2VSYXcpXG4gICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gICAgdmFyIHByb21pc2UgPSBwcm9taXNlSW5pdCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgcmVzb2x2ZXIoKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCk7XG4gICAgICB9KSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCByKTtcbiAgICAgIH0pKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIGUpO1xuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoUHJvbWlzZSwge1xuICAgIGNhdGNoOiBmdW5jdGlvbihvblJlamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0KTtcbiAgICB9LFxuICAgIHRoZW46IGZ1bmN0aW9uKG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgICAgIGlmICh0eXBlb2Ygb25SZXNvbHZlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBvblJlc29sdmUgPSBpZFJlc29sdmVIYW5kbGVyO1xuICAgICAgaWYgKHR5cGVvZiBvblJlamVjdCAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgb25SZWplY3QgPSBpZFJlamVjdEhhbmRsZXI7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNoYWluKHRoaXMsIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgeCA9IHByb21pc2VDb2VyY2UoY29uc3RydWN0b3IsIHgpO1xuICAgICAgICByZXR1cm4geCA9PT0gdGhhdCA/IG9uUmVqZWN0KG5ldyBUeXBlRXJyb3IpIDogaXNQcm9taXNlKHgpID8geC50aGVuKG9uUmVzb2x2ZSwgb25SZWplY3QpIDogb25SZXNvbHZlKHgpO1xuICAgICAgfSwgb25SZWplY3QpO1xuICAgIH1cbiAgfSwge1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgICBpZiAoaXNQcm9taXNlKHgpKSB7XG4gICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2VTZXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpLCArMSwgeCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVzb2x2ZSh4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZWplY3Q6IGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVNldChuZXcgJFByb21pc2UocHJvbWlzZVJhdyksIC0xLCByKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhbGw6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQodGhpcyk7XG4gICAgICB2YXIgcmVzb2x1dGlvbnMgPSBbXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBjb3VudCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzb2x1dGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUodmFsdWVzW2ldKS50aGVuKGZ1bmN0aW9uKGksIHgpIHtcbiAgICAgICAgICAgICAgcmVzb2x1dGlvbnNbaV0gPSB4O1xuICAgICAgICAgICAgICBpZiAoLS1jb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc29sdXRpb25zKTtcbiAgICAgICAgICAgIH0uYmluZCh1bmRlZmluZWQsIGkpLCAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH0sXG4gICAgcmFjZTogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZCh0aGlzKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5yZXNvbHZlKHZhbHVlc1tpXSkudGhlbigoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh4KTtcbiAgICAgICAgICB9KSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICB9KTtcbiAgdmFyICRQcm9taXNlID0gUHJvbWlzZTtcbiAgdmFyICRQcm9taXNlUmVqZWN0ID0gJFByb21pc2UucmVqZWN0O1xuICBmdW5jdGlvbiBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KSB7XG4gICAgcHJvbWlzZURvbmUocHJvbWlzZSwgKzEsIHgsIHByb21pc2Uub25SZXNvbHZlXyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZVJlamVjdChwcm9taXNlLCByKSB7XG4gICAgcHJvbWlzZURvbmUocHJvbWlzZSwgLTEsIHIsIHByb21pc2Uub25SZWplY3RfKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlRG9uZShwcm9taXNlLCBzdGF0dXMsIHZhbHVlLCByZWFjdGlvbnMpIHtcbiAgICBpZiAocHJvbWlzZS5zdGF0dXNfICE9PSAwKVxuICAgICAgcmV0dXJuO1xuICAgIHByb21pc2VFbnF1ZXVlKHZhbHVlLCByZWFjdGlvbnMpO1xuICAgIHByb21pc2VTZXQocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUVucXVldWUodmFsdWUsIHRhc2tzKSB7XG4gICAgYXN5bmMoKGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBwcm9taXNlSGFuZGxlKHZhbHVlLCB0YXNrc1tpXSwgdGFza3NbaSArIDFdKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUhhbmRsZSh2YWx1ZSwgaGFuZGxlciwgZGVmZXJyZWQpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZGVmZXJyZWQucHJvbWlzZSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgICAgIGVsc2UgaWYgKGlzUHJvbWlzZShyZXN1bHQpKVxuICAgICAgICBjaGFpbihyZXN1bHQsIGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCk7XG4gICAgICBlbHNlXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgfVxuICB2YXIgdGhlbmFibGVTeW1ib2wgPSAnQEB0aGVuYWJsZSc7XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlQ29lcmNlKGNvbnN0cnVjdG9yLCB4KSB7XG4gICAgaWYgKCFpc1Byb21pc2UoeCkgJiYgaXNPYmplY3QoeCkpIHtcbiAgICAgIHZhciB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhlbiA9IHgudGhlbjtcbiAgICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSAkUHJvbWlzZVJlamVjdC5jYWxsKGNvbnN0cnVjdG9yLCByKTtcbiAgICAgICAgeFt0aGVuYWJsZVN5bWJvbF0gPSBwcm9taXNlO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcCA9IHhbdGhlbmFibGVTeW1ib2xdO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKGNvbnN0cnVjdG9yKTtcbiAgICAgICAgICB4W3RoZW5hYmxlU3ltYm9sXSA9IGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoZW4uY2FsbCh4LCBkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxQcm9taXNlKGdsb2JhbCkge1xuICAgIGlmICghZ2xvYmFsLlByb21pc2UpXG4gICAgICBnbG9iYWwuUHJvbWlzZSA9IFByb21pc2U7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFByb21pc2UpO1xuICByZXR1cm4ge1xuICAgIGdldCBQcm9taXNlKCkge1xuICAgICAgcmV0dXJuIFByb21pc2U7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxQcm9taXNlKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsUHJvbWlzZTtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJF9fMjk7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCI7XG4gIHZhciAkX18yNyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0ID0gJF9fMjcuY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QsXG4gICAgICBpc09iamVjdCA9ICRfXzI3LmlzT2JqZWN0O1xuICB2YXIgJF9fMzAgPSAkdHJhY2V1clJ1bnRpbWUsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9ICRfXzMwLmhhc093blByb3BlcnR5LFxuICAgICAgdG9Qcm9wZXJ0eSA9ICRfXzMwLnRvUHJvcGVydHk7XG4gIHZhciBpdGVyYXRlZFN0cmluZyA9IFN5bWJvbCgnaXRlcmF0ZWRTdHJpbmcnKTtcbiAgdmFyIHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4ID0gU3ltYm9sKCdzdHJpbmdJdGVyYXRvck5leHRJbmRleCcpO1xuICB2YXIgU3RyaW5nSXRlcmF0b3IgPSBmdW5jdGlvbiBTdHJpbmdJdGVyYXRvcigpIHt9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShTdHJpbmdJdGVyYXRvciwgKCRfXzI5ID0ge30sIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18yOSwgXCJuZXh0XCIsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbyA9IHRoaXM7XG4gICAgICBpZiAoIWlzT2JqZWN0KG8pIHx8ICFoYXNPd25Qcm9wZXJ0eShvLCBpdGVyYXRlZFN0cmluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBtdXN0IGJlIGEgU3RyaW5nSXRlcmF0b3Igb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgICB2YXIgcyA9IG9bdG9Qcm9wZXJ0eShpdGVyYXRlZFN0cmluZyldO1xuICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHZhciBwb3NpdGlvbiA9IG9bdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldO1xuICAgICAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICAgICAgaWYgKHBvc2l0aW9uID49IGxlbikge1xuICAgICAgICBvW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgZmlyc3QgPSBzLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgICAgdmFyIHJlc3VsdFN0cmluZztcbiAgICAgIGlmIChmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IGxlbikge1xuICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZWNvbmQgPSBzLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKTtcbiAgICAgICAgaWYgKHNlY29uZCA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkYpIHtcbiAgICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGZpcnN0KSArIFN0cmluZy5mcm9tQ2hhckNvZGUoc2Vjb25kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb1t0b1Byb3BlcnR5KHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4KV0gPSBwb3NpdGlvbiArIHJlc3VsdFN0cmluZy5sZW5ndGg7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QocmVzdWx0U3RyaW5nLCBmYWxzZSk7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzI5LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCAkX18yOSksIHt9KTtcbiAgZnVuY3Rpb24gY3JlYXRlU3RyaW5nSXRlcmF0b3Ioc3RyaW5nKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoc3RyaW5nKTtcbiAgICB2YXIgaXRlcmF0b3IgPSBPYmplY3QuY3JlYXRlKFN0cmluZ0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgaXRlcmF0b3JbdG9Qcm9wZXJ0eShpdGVyYXRlZFN0cmluZyldID0gcztcbiAgICBpdGVyYXRvclt0b1Byb3BlcnR5KHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4KV0gPSAwO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbiAgfVxuICByZXR1cm4ge2dldCBjcmVhdGVTdHJpbmdJdGVyYXRvcigpIHtcbiAgICAgIHJldHVybiBjcmVhdGVTdHJpbmdJdGVyYXRvcjtcbiAgICB9fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiO1xuICB2YXIgY3JlYXRlU3RyaW5nSXRlcmF0b3IgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIikuY3JlYXRlU3RyaW5nSXRlcmF0b3I7XG4gIHZhciAkX18zMiA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fMzIubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMzIubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18zMi5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgJHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyICRpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuICB2YXIgJGxhc3RJbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5sYXN0SW5kZXhPZjtcbiAgZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICByZXR1cm4gJGluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zKSA9PSBzdGFydDtcbiAgfVxuICBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2gpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIGlmICh0aGlzID09IG51bGwgfHwgJHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zID0gc3RyaW5nTGVuZ3RoO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICAgICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgICAgICBwb3MgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBlbmQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHZhciBzdGFydCA9IGVuZCAtIHNlYXJjaExlbmd0aDtcbiAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAkbGFzdEluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgc3RhcnQpID09IHN0YXJ0O1xuICB9XG4gIGZ1bmN0aW9uIGNvbnRhaW5zKHNlYXJjaCkge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcG9zID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgcG9zID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICByZXR1cm4gJGluZGV4T2YuY2FsbChzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zKSAhPSAtMTtcbiAgfVxuICBmdW5jdGlvbiByZXBlYXQoY291bnQpIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgbiA9IGNvdW50ID8gTnVtYmVyKGNvdW50KSA6IDA7XG4gICAgaWYgKGlzTmFOKG4pKSB7XG4gICAgICBuID0gMDtcbiAgICB9XG4gICAgaWYgKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpIHtcbiAgICAgIHRocm93IFJhbmdlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKG4gPT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgd2hpbGUgKG4tLSkge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3NpdGlvbikge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBzaXplID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgaW5kZXggPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBzaXplKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCk7XG4gICAgdmFyIHNlY29uZDtcbiAgICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBzaXplID4gaW5kZXggKyAxKSB7XG4gICAgICBzZWNvbmQgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCArIDEpO1xuICAgICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgICByZXR1cm4gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0O1xuICB9XG4gIGZ1bmN0aW9uIHJhdyhjYWxsc2l0ZSkge1xuICAgIHZhciByYXcgPSBjYWxsc2l0ZS5yYXc7XG4gICAgdmFyIGxlbiA9IHJhdy5sZW5ndGggPj4+IDA7XG4gICAgaWYgKGxlbiA9PT0gMClcbiAgICAgIHJldHVybiAnJztcbiAgICB2YXIgcyA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcyArPSByYXdbaV07XG4gICAgICBpZiAoaSArIDEgPT09IGxlbilcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICBzICs9IGFyZ3VtZW50c1srK2ldO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KCkge1xuICAgIHZhciBjb2RlVW5pdHMgPSBbXTtcbiAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgIHZhciBoaWdoU3Vycm9nYXRlO1xuICAgIHZhciBsb3dTdXJyb2dhdGU7XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBjb2RlUG9pbnQgPSBOdW1iZXIoYXJndW1lbnRzW2luZGV4XSk7XG4gICAgICBpZiAoIWlzRmluaXRlKGNvZGVQb2ludCkgfHwgY29kZVBvaW50IDwgMCB8fCBjb2RlUG9pbnQgPiAweDEwRkZGRiB8fCBmbG9vcihjb2RlUG9pbnQpICE9IGNvZGVQb2ludCkge1xuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQ6ICcgKyBjb2RlUG9pbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHtcbiAgICAgICAgY29kZVVuaXRzLnB1c2goY29kZVBvaW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwO1xuICAgICAgICBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyAweEQ4MDA7XG4gICAgICAgIGxvd1N1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgJSAweDQwMCkgKyAweERDMDA7XG4gICAgICAgIGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVVbml0cyk7XG4gIH1cbiAgZnVuY3Rpb24gc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IoKSB7XG4gICAgdmFyIG8gPSAkdHJhY2V1clJ1bnRpbWUuY2hlY2tPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgdmFyIHMgPSBTdHJpbmcobyk7XG4gICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHMpO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsU3RyaW5nKGdsb2JhbCkge1xuICAgIHZhciBTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKFN0cmluZy5wcm90b3R5cGUsIFsnY29kZVBvaW50QXQnLCBjb2RlUG9pbnRBdCwgJ2NvbnRhaW5zJywgY29udGFpbnMsICdlbmRzV2l0aCcsIGVuZHNXaXRoLCAnc3RhcnRzV2l0aCcsIHN0YXJ0c1dpdGgsICdyZXBlYXQnLCByZXBlYXRdKTtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhTdHJpbmcsIFsnZnJvbUNvZGVQb2ludCcsIGZyb21Db2RlUG9pbnQsICdyYXcnLCByYXddKTtcbiAgICBtYXliZUFkZEl0ZXJhdG9yKFN0cmluZy5wcm90b3R5cGUsIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yLCBTeW1ib2wpO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxTdHJpbmcpO1xuICByZXR1cm4ge1xuICAgIGdldCBzdGFydHNXaXRoKCkge1xuICAgICAgcmV0dXJuIHN0YXJ0c1dpdGg7XG4gICAgfSxcbiAgICBnZXQgZW5kc1dpdGgoKSB7XG4gICAgICByZXR1cm4gZW5kc1dpdGg7XG4gICAgfSxcbiAgICBnZXQgY29udGFpbnMoKSB7XG4gICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgfSxcbiAgICBnZXQgcmVwZWF0KCkge1xuICAgICAgcmV0dXJuIHJlcGVhdDtcbiAgICB9LFxuICAgIGdldCBjb2RlUG9pbnRBdCgpIHtcbiAgICAgIHJldHVybiBjb2RlUG9pbnRBdDtcbiAgICB9LFxuICAgIGdldCByYXcoKSB7XG4gICAgICByZXR1cm4gcmF3O1xuICAgIH0sXG4gICAgZ2V0IGZyb21Db2RlUG9pbnQoKSB7XG4gICAgICByZXR1cm4gZnJvbUNvZGVQb2ludDtcbiAgICB9LFxuICAgIGdldCBzdHJpbmdQcm90b3R5cGVJdGVyYXRvcigpIHtcbiAgICAgIHJldHVybiBzdHJpbmdQcm90b3R5cGVJdGVyYXRvcjtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbFN0cmluZygpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbFN0cmluZztcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRfXzM2O1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yXCI7XG4gIHZhciAkX18zNCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIHRvT2JqZWN0ID0gJF9fMzQudG9PYmplY3QsXG4gICAgICB0b1VpbnQzMiA9ICRfXzM0LnRvVWludDMyLFxuICAgICAgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QgPSAkX18zNC5jcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdDtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfS0VZUyA9IDE7XG4gIHZhciBBUlJBWV9JVEVSQVRPUl9LSU5EX1ZBTFVFUyA9IDI7XG4gIHZhciBBUlJBWV9JVEVSQVRPUl9LSU5EX0VOVFJJRVMgPSAzO1xuICB2YXIgQXJyYXlJdGVyYXRvciA9IGZ1bmN0aW9uIEFycmF5SXRlcmF0b3IoKSB7fTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoQXJyYXlJdGVyYXRvciwgKCRfXzM2ID0ge30sIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18zNiwgXCJuZXh0XCIsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSB0b09iamVjdCh0aGlzKTtcbiAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLml0ZXJhdG9yT2JqZWN0XztcbiAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0IGlzIG5vdCBhbiBBcnJheUl0ZXJhdG9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XztcbiAgICAgIHZhciBpdGVtS2luZCA9IGl0ZXJhdG9yLmFycmF5SXRlcmF0aW9uS2luZF87XG4gICAgICB2YXIgbGVuZ3RoID0gdG9VaW50MzIoYXJyYXkubGVuZ3RoKTtcbiAgICAgIGlmIChpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSBJbmZpbml0eTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IGluZGV4ICsgMTtcbiAgICAgIGlmIChpdGVtS2luZCA9PSBBUlJBWV9JVEVSQVRPUl9LSU5EX1ZBTFVFUylcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KGFycmF5W2luZGV4XSwgZmFsc2UpO1xuICAgICAgaWYgKGl0ZW1LaW5kID09IEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUylcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KFtpbmRleCwgYXJyYXlbaW5kZXhdXSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KGluZGV4LCBmYWxzZSk7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzM2LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCAkX18zNiksIHt9KTtcbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlJdGVyYXRvcihhcnJheSwga2luZCkge1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdChhcnJheSk7XG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IEFycmF5SXRlcmF0b3I7XG4gICAgaXRlcmF0b3IuaXRlcmF0b3JPYmplY3RfID0gb2JqZWN0O1xuICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gMDtcbiAgICBpdGVyYXRvci5hcnJheUl0ZXJhdGlvbktpbmRfID0ga2luZDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX0VOVFJJRVMpO1xuICB9XG4gIGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9LRVlTKTtcbiAgfVxuICBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IGVudHJpZXMoKSB7XG4gICAgICByZXR1cm4gZW50cmllcztcbiAgICB9LFxuICAgIGdldCBrZXlzKCkge1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSxcbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5XCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5XCI7XG4gIHZhciAkX18zNyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yXCIpLFxuICAgICAgZW50cmllcyA9ICRfXzM3LmVudHJpZXMsXG4gICAgICBrZXlzID0gJF9fMzcua2V5cyxcbiAgICAgIHZhbHVlcyA9ICRfXzM3LnZhbHVlcztcbiAgdmFyICRfXzM4ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgY2hlY2tJdGVyYWJsZSA9ICRfXzM4LmNoZWNrSXRlcmFibGUsXG4gICAgICBpc0NhbGxhYmxlID0gJF9fMzguaXNDYWxsYWJsZSxcbiAgICAgIGlzQ29uc3RydWN0b3IgPSAkX18zOC5pc0NvbnN0cnVjdG9yLFxuICAgICAgbWF5YmVBZGRGdW5jdGlvbnMgPSAkX18zOC5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18zOC5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzM4LnJlZ2lzdGVyUG9seWZpbGwsXG4gICAgICB0b0ludGVnZXIgPSAkX18zOC50b0ludGVnZXIsXG4gICAgICB0b0xlbmd0aCA9ICRfXzM4LnRvTGVuZ3RoLFxuICAgICAgdG9PYmplY3QgPSAkX18zOC50b09iamVjdDtcbiAgZnVuY3Rpb24gZnJvbShhcnJMaWtlKSB7XG4gICAgdmFyIG1hcEZuID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgaXRlbXMgPSB0b09iamVjdChhcnJMaWtlKTtcbiAgICB2YXIgbWFwcGluZyA9IG1hcEZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGsgPSAwO1xuICAgIHZhciBhcnIsXG4gICAgICAgIGxlbjtcbiAgICBpZiAobWFwcGluZyAmJiAhaXNDYWxsYWJsZShtYXBGbikpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tJdGVyYWJsZShpdGVtcykpIHtcbiAgICAgIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQygpIDogW107XG4gICAgICBmb3IgKHZhciAkX18zOSA9IGl0ZW1zW1N5bWJvbC5pdGVyYXRvcl0oKSxcbiAgICAgICAgICAkX180MDsgISgkX180MCA9ICRfXzM5Lm5leHQoKSkuZG9uZTsgKSB7XG4gICAgICAgIHZhciBpdGVtID0gJF9fNDAudmFsdWU7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAobWFwcGluZykge1xuICAgICAgICAgICAgYXJyW2tdID0gbWFwRm4uY2FsbCh0aGlzQXJnLCBpdGVtLCBrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyW2tdID0gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcnIubGVuZ3RoID0gaztcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG4gICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKGxlbikgOiBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IgKDsgayA8IGxlbjsgaysrKSB7XG4gICAgICBpZiAobWFwcGluZykge1xuICAgICAgICBhcnJba10gPSB0eXBlb2YgdGhpc0FyZyA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihpdGVtc1trXSwgaykgOiBtYXBGbi5jYWxsKHRoaXNBcmcsIGl0ZW1zW2tdLCBrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycltrXSA9IGl0ZW1zW2tdO1xuICAgICAgfVxuICAgIH1cbiAgICBhcnIubGVuZ3RoID0gbGVuO1xuICAgIHJldHVybiBhcnI7XG4gIH1cbiAgZnVuY3Rpb24gb2YoKSB7XG4gICAgZm9yICh2YXIgaXRlbXMgPSBbXSxcbiAgICAgICAgJF9fNDEgPSAwOyAkX180MSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzQxKyspXG4gICAgICBpdGVtc1skX180MV0gPSBhcmd1bWVudHNbJF9fNDFdO1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgbGVuID0gaXRlbXMubGVuZ3RoO1xuICAgIHZhciBhcnIgPSBpc0NvbnN0cnVjdG9yKEMpID8gbmV3IEMobGVuKSA6IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIGFycltrXSA9IGl0ZW1zW2tdO1xuICAgIH1cbiAgICBhcnIubGVuZ3RoID0gbGVuO1xuICAgIHJldHVybiBhcnI7XG4gIH1cbiAgZnVuY3Rpb24gZmlsbCh2YWx1ZSkge1xuICAgIHZhciBzdGFydCA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAgIHZhciBlbmQgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChvYmplY3QubGVuZ3RoKTtcbiAgICB2YXIgZmlsbFN0YXJ0ID0gdG9JbnRlZ2VyKHN0YXJ0KTtcbiAgICB2YXIgZmlsbEVuZCA9IGVuZCAhPT0gdW5kZWZpbmVkID8gdG9JbnRlZ2VyKGVuZCkgOiBsZW47XG4gICAgZmlsbFN0YXJ0ID0gZmlsbFN0YXJ0IDwgMCA/IE1hdGgubWF4KGxlbiArIGZpbGxTdGFydCwgMCkgOiBNYXRoLm1pbihmaWxsU3RhcnQsIGxlbik7XG4gICAgZmlsbEVuZCA9IGZpbGxFbmQgPCAwID8gTWF0aC5tYXgobGVuICsgZmlsbEVuZCwgMCkgOiBNYXRoLm1pbihmaWxsRW5kLCBsZW4pO1xuICAgIHdoaWxlIChmaWxsU3RhcnQgPCBmaWxsRW5kKSB7XG4gICAgICBvYmplY3RbZmlsbFN0YXJ0XSA9IHZhbHVlO1xuICAgICAgZmlsbFN0YXJ0Kys7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gZmluZChwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gZmluZEhlbHBlcih0aGlzLCBwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICB9XG4gIGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICByZXR1cm4gZmluZEhlbHBlcih0aGlzLCBwcmVkaWNhdGUsIHRoaXNBcmcsIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGZpbmRIZWxwZXIoc2VsZiwgcHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIHJldHVybkluZGV4ID0gYXJndW1lbnRzWzNdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdChzZWxmKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgob2JqZWN0Lmxlbmd0aCk7XG4gICAgaWYgKCFpc0NhbGxhYmxlKHByZWRpY2F0ZSkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaSBpbiBvYmplY3QpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2ldO1xuICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIG9iamVjdCkpIHtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuSW5kZXggPyBpIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkluZGV4ID8gLTEgOiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxBcnJheShnbG9iYWwpIHtcbiAgICB2YXIgJF9fNDIgPSBnbG9iYWwsXG4gICAgICAgIEFycmF5ID0gJF9fNDIuQXJyYXksXG4gICAgICAgIE9iamVjdCA9ICRfXzQyLk9iamVjdCxcbiAgICAgICAgU3ltYm9sID0gJF9fNDIuU3ltYm9sO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKEFycmF5LnByb3RvdHlwZSwgWydlbnRyaWVzJywgZW50cmllcywgJ2tleXMnLCBrZXlzLCAndmFsdWVzJywgdmFsdWVzLCAnZmlsbCcsIGZpbGwsICdmaW5kJywgZmluZCwgJ2ZpbmRJbmRleCcsIGZpbmRJbmRleF0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKEFycmF5LCBbJ2Zyb20nLCBmcm9tLCAnb2YnLCBvZl0pO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoQXJyYXkucHJvdG90eXBlLCB2YWx1ZXMsIFN5bWJvbCk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW10udmFsdWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIFN5bWJvbCk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbEFycmF5KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgZnJvbSgpIHtcbiAgICAgIHJldHVybiBmcm9tO1xuICAgIH0sXG4gICAgZ2V0IG9mKCkge1xuICAgICAgcmV0dXJuIG9mO1xuICAgIH0sXG4gICAgZ2V0IGZpbGwoKSB7XG4gICAgICByZXR1cm4gZmlsbDtcbiAgICB9LFxuICAgIGdldCBmaW5kKCkge1xuICAgICAgcmV0dXJuIGZpbmQ7XG4gICAgfSxcbiAgICBnZXQgZmluZEluZGV4KCkge1xuICAgICAgcmV0dXJuIGZpbmRJbmRleDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbEFycmF5KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsQXJyYXk7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIjtcbiAgdmFyICRfXzQzID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgbWF5YmVBZGRGdW5jdGlvbnMgPSAkX180My5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX180My5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgJF9fNDQgPSAkdHJhY2V1clJ1bnRpbWUsXG4gICAgICBkZWZpbmVQcm9wZXJ0eSA9ICRfXzQ0LmRlZmluZVByb3BlcnR5LFxuICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gJF9fNDQuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgICAgZ2V0T3duUHJvcGVydHlOYW1lcyA9ICRfXzQ0LmdldE93blByb3BlcnR5TmFtZXMsXG4gICAgICBrZXlzID0gJF9fNDQua2V5cyxcbiAgICAgIHByaXZhdGVOYW1lcyA9ICRfXzQ0LnByaXZhdGVOYW1lcztcbiAgZnVuY3Rpb24gaXMobGVmdCwgcmlnaHQpIHtcbiAgICBpZiAobGVmdCA9PT0gcmlnaHQpXG4gICAgICByZXR1cm4gbGVmdCAhPT0gMCB8fCAxIC8gbGVmdCA9PT0gMSAvIHJpZ2h0O1xuICAgIHJldHVybiBsZWZ0ICE9PSBsZWZ0ICYmIHJpZ2h0ICE9PSByaWdodDtcbiAgfVxuICBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSk7XG4gICAgICB2YXIgcCxcbiAgICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgICBmb3IgKHAgPSAwOyBwIDwgbGVuZ3RoOyBwKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgICAgaWYgKHByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gc291cmNlW25hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGZ1bmN0aW9uIG1peGluKHRhcmdldCwgc291cmNlKSB7XG4gICAgdmFyIHByb3BzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpO1xuICAgIHZhciBwLFxuICAgICAgICBkZXNjcmlwdG9yLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgZm9yIChwID0gMDsgcCA8IGxlbmd0aDsgcCsrKSB7XG4gICAgICB2YXIgbmFtZSA9IHByb3BzW3BdO1xuICAgICAgaWYgKHByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgY29udGludWU7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgcHJvcHNbcF0pO1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wc1twXSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxPYmplY3QoZ2xvYmFsKSB7XG4gICAgdmFyIE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoT2JqZWN0LCBbJ2Fzc2lnbicsIGFzc2lnbiwgJ2lzJywgaXMsICdtaXhpbicsIG1peGluXSk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE9iamVjdCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IGlzKCkge1xuICAgICAgcmV0dXJuIGlzO1xuICAgIH0sXG4gICAgZ2V0IGFzc2lnbigpIHtcbiAgICAgIHJldHVybiBhc3NpZ247XG4gICAgfSxcbiAgICBnZXQgbWl4aW4oKSB7XG4gICAgICByZXR1cm4gbWl4aW47XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxPYmplY3QoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxPYmplY3Q7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTnVtYmVyXCI7XG4gIHZhciAkX180NiA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGlzTnVtYmVyID0gJF9fNDYuaXNOdW1iZXIsXG4gICAgICBtYXliZUFkZENvbnN0cyA9ICRfXzQ2Lm1heWJlQWRkQ29uc3RzLFxuICAgICAgbWF5YmVBZGRGdW5jdGlvbnMgPSAkX180Ni5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX180Ni5yZWdpc3RlclBvbHlmaWxsLFxuICAgICAgdG9JbnRlZ2VyID0gJF9fNDYudG9JbnRlZ2VyO1xuICB2YXIgJGFicyA9IE1hdGguYWJzO1xuICB2YXIgJGlzRmluaXRlID0gaXNGaW5pdGU7XG4gIHZhciAkaXNOYU4gPSBpc05hTjtcbiAgdmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICB2YXIgTUlOX1NBRkVfSU5URUdFUiA9IC1NYXRoLnBvdygyLCA1MykgKyAxO1xuICB2YXIgRVBTSUxPTiA9IE1hdGgucG93KDIsIC01Mik7XG4gIGZ1bmN0aW9uIE51bWJlcklzRmluaXRlKG51bWJlcikge1xuICAgIHJldHVybiBpc051bWJlcihudW1iZXIpICYmICRpc0Zpbml0ZShudW1iZXIpO1xuICB9XG4gIDtcbiAgZnVuY3Rpb24gaXNJbnRlZ2VyKG51bWJlcikge1xuICAgIHJldHVybiBOdW1iZXJJc0Zpbml0ZShudW1iZXIpICYmIHRvSW50ZWdlcihudW1iZXIpID09PSBudW1iZXI7XG4gIH1cbiAgZnVuY3Rpb24gTnVtYmVySXNOYU4obnVtYmVyKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG51bWJlcikgJiYgJGlzTmFOKG51bWJlcik7XG4gIH1cbiAgO1xuICBmdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKG51bWJlcikge1xuICAgIGlmIChOdW1iZXJJc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICB2YXIgaW50ZWdyYWwgPSB0b0ludGVnZXIobnVtYmVyKTtcbiAgICAgIGlmIChpbnRlZ3JhbCA9PT0gbnVtYmVyKVxuICAgICAgICByZXR1cm4gJGFicyhpbnRlZ3JhbCkgPD0gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsTnVtYmVyKGdsb2JhbCkge1xuICAgIHZhciBOdW1iZXIgPSBnbG9iYWwuTnVtYmVyO1xuICAgIG1heWJlQWRkQ29uc3RzKE51bWJlciwgWydNQVhfU0FGRV9JTlRFR0VSJywgTUFYX1NBRkVfSU5URUdFUiwgJ01JTl9TQUZFX0lOVEVHRVInLCBNSU5fU0FGRV9JTlRFR0VSLCAnRVBTSUxPTicsIEVQU0lMT05dKTtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhOdW1iZXIsIFsnaXNGaW5pdGUnLCBOdW1iZXJJc0Zpbml0ZSwgJ2lzSW50ZWdlcicsIGlzSW50ZWdlciwgJ2lzTmFOJywgTnVtYmVySXNOYU4sICdpc1NhZmVJbnRlZ2VyJywgaXNTYWZlSW50ZWdlcl0pO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxOdW1iZXIpO1xuICByZXR1cm4ge1xuICAgIGdldCBNQVhfU0FGRV9JTlRFR0VSKCkge1xuICAgICAgcmV0dXJuIE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfSxcbiAgICBnZXQgTUlOX1NBRkVfSU5URUdFUigpIHtcbiAgICAgIHJldHVybiBNSU5fU0FGRV9JTlRFR0VSO1xuICAgIH0sXG4gICAgZ2V0IEVQU0lMT04oKSB7XG4gICAgICByZXR1cm4gRVBTSUxPTjtcbiAgICB9LFxuICAgIGdldCBpc0Zpbml0ZSgpIHtcbiAgICAgIHJldHVybiBOdW1iZXJJc0Zpbml0ZTtcbiAgICB9LFxuICAgIGdldCBpc0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gaXNJbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IGlzTmFOKCkge1xuICAgICAgcmV0dXJuIE51bWJlcklzTmFOO1xuICAgIH0sXG4gICAgZ2V0IGlzU2FmZUludGVnZXIoKSB7XG4gICAgICByZXR1cm4gaXNTYWZlSW50ZWdlcjtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE51bWJlcigpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE51bWJlcjtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9wb2x5ZmlsbHNcIjtcbiAgdmFyIHBvbHlmaWxsQWxsID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLnBvbHlmaWxsQWxsO1xuICBwb2x5ZmlsbEFsbCh0aGlzKTtcbiAgdmFyIHNldHVwR2xvYmFscyA9ICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHM7XG4gICR0cmFjZXVyUnVudGltZS5zZXR1cEdsb2JhbHMgPSBmdW5jdGlvbihnbG9iYWwpIHtcbiAgICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgICBwb2x5ZmlsbEFsbChnbG9iYWwpO1xuICB9O1xuICByZXR1cm4ge307XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9wb2x5ZmlsbHNcIiArICcnKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJyksdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIFxuXG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwiYWJvdXQtdmlld1xcXCI+XFxuXHQ8aDE+QWJvdXQgVVMhISE8L2gxPlxcbjwvZGl2PlxcblwiO1xuICB9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgXG5cblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJtZW51LXZpZXcgc2hvd1xcXCI+XFxuXHQ8ZGl2IGNsYXNzPVxcXCJzY3JlZW5cXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwic2NyZWVuXFxcIj48L2J1dHRvbj48L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XFxcIm1vdmVhYmxlIHNob3cgdHJhbnNpdGlvblxcXCI+XFxuXHRcdDxkaXYgY2xhc3M9XFxcImJhclxcXCI+XFxuXHRcdFx0PGRpdiBjbGFzcz1cXFwibWVzc2FnZVxcXCI+PHNwYW4+U29tZSBpbXBvcnRhbnQgbWVzc2FnZTwvc3Bhbj48L2Rpdj5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVxcXCJtZW51LWJ0blxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJ0b2dnbGVcXFwiPjxpPm1lbnU8L2k+PGIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiYjODgwMTs8L2I+PC9idXR0b24+PC9kaXY+XFxuXHRcdDwvZGl2Plxcblxcblx0XHQ8ZGl2IGNsYXNzPVxcXCJtZW51XFxcIj5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVxcXCJ0d28tcm93XFxcIj5cXG5cdFx0XHRcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XFxcImJsdWVsaWdodHNcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiaXRlbVxcXCI+PGI+Qmx1ZWxpZ2h0czwvYj48L2J1dHRvbj48L2Rpdj5cXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cXFwiY2FsbFxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5DYWxsPC9iPjwvYnV0dG9uPjwvZGl2Plxcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJyZXBvcnRcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiaXRlbVxcXCI+PGI+UmVwb3J0PC9iPjwvYnV0dG9uPjwvZGl2Plxcblx0XHRcdFx0PC9kaXY+XFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJhYm91dFxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5BYm91dDwvYj48L2J1dHRvbj48L2Rpdj5cXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cXFwic2VydmljZXNcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiaXRlbVxcXCI+PGI+U2VydmljZXM8L2I+PC9idXR0b24+PC9kaXY+XFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XFxcInByb2ZpbGVcXFwiPjxidXR0b24gZGF0YS1jbGljaz1cXFwiaXRlbVxcXCI+PGI+UHJvZmlsZTwvYj48L2J1dHRvbj48L2Rpdj5cXG5cdFx0XHRcdDwvZGl2Plxcblx0XHRcdDwvZGl2Plxcblx0XHQ8L2Rpdj5cXG5cdDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuICB9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgXG5cblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLXZpZXdcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzdGF0dXNiYXItYnVmZmVyXFxcIj48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibGlzdC1jb250YWluZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidHlwZSBsaXN0XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsaXN0LXNjcm9sbGFibGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWxpc3RpdGVtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJzZXJ2aWNlLWltYWdlXFxcIiBzcmM9XFxcImNzcy9pbWdzL3JhbmRvbS1pbWFnZXMvZmllbGQtbGFuZHNjYXBlLW1lYWRvdy0zMTcwLTgyNHg1NTAuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5FdmFuc3RvbiBIZWFsdGggU2VydmljZTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cXFwic2VydmljZS1kZXNjcmlwdGlvblxcXCI+YXNkZiBhc2QgYXNkZmRzIGZhc2RmIGFzZGYgYXNkZiBhc2QgZmFzZCBmYXNkIGZhc2QgYXNkZiBhc2QgYXNkZiBhc2RmIGFzZCBmYSBzZiBhc2RmIGFzZGYgYXNkZiBhc2RmIGFzZCBmYWRzIC4uLjwvZGl2Pi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlldy1hY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gcGhvbmUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiIGljb24tY2FsbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBkZXRhaWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tb3JlLWhvcml6XFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRldGFpbHMtYWN0aW9uc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGNsb3NlLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tY2xvc2VcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGV0YWlsc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidGl0bGUtc2VjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9maWVsZC1sYW5kc2NhcGUtbWVhZG93LTMxNzAtODI0eDU1MC5qcGdcXFwiIGFsdD1cXFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5FdmFuc3RvbiBIZWFsdGggU2VydmljZTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImluZm8tc2VjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtZGVzY3JpcHRpb25cXFwiPklmIHlvdSBhcmUgZXhwZXJpZW5jaW5nIGEgbWVkaWNhbCBlbWVyZ2VuY3ksIDxhIGhyZWY9XFxcInNtczoxLTQwOC01NTUtMTIxMlxcXCI+TmV3IFNNUyBNZXNzYWdlPC9hPmluY2x1ZGluZyB0aG9zZSBkdWUgdG8gZXhjZXNzaXZlIGFsY29ob2wgY29uc3VtcHRpb24sIGNhbGwgOTExIHRvIHN1bW1vbiBwYXJhbWVkaWNzIG9yIGdvIHRvIHRoZSBuZWFyZXN0IGhvc3BpdGFsIGVtZXJnZW5jeSByb29tLjwvZGl2PlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24tc2VjdGlvbiBwaG9uZS1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImluZm8gc2VydmljZS1waG9uZVxcXCI+MjM0LTIzNC0yMzQyPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gcGhvbmUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1jYWxsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24tc2VjdGlvbiBlbWFpbC1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImluZm8gc2VydmljZS1lbWFpbFxcXCI+aGFvQG5vcnRod2VzdGVybi5lZHU8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBlbWFpbC1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLW1haWxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbi1zZWN0aW9uIHdlYnNpdGUtc2VjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbmZvIHNlcnZpY2Utd2Vic2l0ZVxcXCI+bm9ydGh3ZXN0ZXJuLmVkdTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIHdlYnNpdGUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1wdWJsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsb2NhdGlvbi1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFkZHJlc3NcXFwiPjMzMCBVbml2ZXJzaXR5IFBsYWNlLCBFdmFuc3RvbiBJTCwgNjAyMDg8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9iYXItZmVldC1sZWdzLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+U2FmZSBSaWRlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBtYWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcIiBpY29uLW1haWxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gZGV0YWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tbW9yZS1ob3JpelxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWxpc3RpdGVtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJzZXJ2aWNlLWltYWdlXFxcIiBzcmM9XFxcImNzcy9pbWdzL3JhbmRvbS1pbWFnZXMvZXZlbmluZy1sYWtlLXBlb3BsZS0xNDAyLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+Q291bnNlbGluZyBhbmQgUHN5Y2hvbG9naWNhbCBTZXJ2aWNlczwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cXFwic2VydmljZS1kZXNjcmlwdGlvblxcXCI+YXNkZiBhc2QgYXNkZmRzIGZhc2RmIGFzZGYgYXNkZiBhc2QgZmFzZCBmYXNkIGZhc2QgYXNkZiBhc2QgYXNkZiBhc2RmIGFzZCBmYSBzZiBhc2RmIGFzZGYgYXNkZiBhc2RmIGFzZCBmYWRzIC4uLjwvZGl2Pi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlldy1hY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gcGhvbmUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiIGljb24tY2FsbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBkZXRhaWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tb3JlLWhvcml6XFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9maWVsZC1sYW5kc2NhcGUtbWVhZG93LTMxNzAtODI0eDU1MC5qcGdcXFwiIGFsdD1cXFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLW5hbWVcXFwiPkV2YW5zdG9uIEhlYWx0aCBTZXJ2aWNlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCIgaWNvbi1jYWxsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGRldGFpbC1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLW1vcmUtaG9yaXpcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGV0YWlscy1hY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gY2xvc2UtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1jbG9zZVxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXRhaWxzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aXRsZS1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwic2VydmljZS1pbWFnZVxcXCIgc3JjPVxcXCJjc3MvaW1ncy9yYW5kb20taW1hZ2VzL2ZpZWxkLWxhbmRzY2FwZS1tZWFkb3ctMzE3MC04MjR4NTUwLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLW5hbWVcXFwiPkV2YW5zdG9uIEhlYWx0aCBTZXJ2aWNlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mby1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1kZXNjcmlwdGlvblxcXCI+YXNkZiBhc2QgYXNkZmRzIGZhc2RmIGFzZGYgYXNkZiBhc2QgZmFzZCBmYXNkIGZhc2QgYXNkZiBhc2QgYXNkZiBhc2RmIGFzZCBmYSBzZiBhc2RmIGFzZGYgYXNkZiBhc2RmIGFzZCBmYWRzIGFkc2YgYXNkZiBhc2QgZmRzZnJ3ZyBmZ2ggZmdoIGUgZnNkZiB3c2RmIHdmYSBkZiBhc2RmIGFzZGYgYXNkZmEgc2RmYWRzZmEgc2RmPC9kaXY+XFxuXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbi1zZWN0aW9uIHBob25lLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mbyBzZXJ2aWNlLXBob25lXFxcIj4yMzQtMjM0LTIzNDI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLWNhbGxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbi1zZWN0aW9uIGVtYWlsLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mbyBzZXJ2aWNlLWVtYWlsXFxcIj5oYW9Abm9ydGh3ZXN0ZXJuLmVkdTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGVtYWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tbWFpbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uLXNlY3Rpb24gd2Vic2l0ZS1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImluZm8gc2VydmljZS13ZWJzaXRlXFxcIj5ub3J0aHdlc3Rlcm4uZWR1L2hlYWx0aC1ldmFuc3RvbjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIHdlYnNpdGUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1wdWJsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsb2NhdGlvbi1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFkZHJlc3NcXFwiPjMzMCBVbml2ZXJzaXR5IFBsYWNlLCBFdmFuc3RvbiBJTCwgNjAyMDg8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9iYXItZmVldC1sZWdzLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+U2FmZSBSaWRlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBtYWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcIiBpY29uLW1haWxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gZGV0YWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tbW9yZS1ob3JpelxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWxpc3RpdGVtXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJzZXJ2aWNlLWltYWdlXFxcIiBzcmM9XFxcImNzcy9pbWdzL3JhbmRvbS1pbWFnZXMvZXZlbmluZy1sYWtlLXBlb3BsZS0xNDAyLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+Q291bnNlbGluZyBhbmQgUHN5Y2hvbG9naWNhbCBTZXJ2aWNlczwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cXFwic2VydmljZS1kZXNjcmlwdGlvblxcXCI+YXNkZiBhc2QgYXNkZmRzIGZhc2RmIGFzZGYgYXNkZiBhc2QgZmFzZCBmYXNkIGZhc2QgYXNkZiBhc2QgYXNkZiBhc2RmIGFzZCBmYSBzZiBhc2RmIGFzZGYgYXNkZiBhc2RmIGFzZCBmYWRzIC4uLjwvZGl2Pi0tPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlldy1hY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gcGhvbmUtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiIGljb24tY2FsbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBkZXRhaWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tb3JlLWhvcml6XFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1lbnUtYnVmZmVyXFxcIj48L2Rpdj5cXG48L2Rpdj5cXG5cXG5cIjtcbiAgfSk7XG4iXX0=
