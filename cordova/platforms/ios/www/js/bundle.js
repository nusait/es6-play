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
    var document = this.app.window.document;
    var $__2 = this,
        moveableEl = $__2.moveableEl,
        screenEl = $__2.screenEl,
        wrapperEl = $__2.wrapperEl;
    var moveableElCL = moveableEl.classList;
    var screenElCL = screenEl.classList;
    var wrapperElCL = wrapperEl.classList;
    var isShowing = moveableElCL.contains('show');
    if (isShowing) {
      this.remove('show');
      moveableElCL.add('transition');
      wait(40).then((function() {
        moveableElCL.remove('show');
        screenElCL.remove('shaded');
        wrapperElCL.remove('menu-showing');
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
      wrapperElCL.add('menu-showing');
      wait(40).then((function() {
        return moveableElCL.add('transition');
      })).then((function() {
        return wait(20);
      })).then((function() {
        return screenElCL.add('shaded');
      })).then((function() {
        moveableElCL.add('show');
        wait(300).then((function() {
          moveableElCL.remove('transition');
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
  },
  get wrapperEl() {
    return this.app.window.document.querySelector('.wrapper');
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
    html = ("<div class=\"statusbar-container\">\n\t\t\t<div class=\"statusbar-faker\">\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"left\">●●●○○ Verizon <span class=\"icon-local-phone\" /></div>\n\t\t\t\t\t<div class=\"middle\">9:09 AM</div>\n\t\t\t\t\t<div class=\"right\">58% ▭</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"wrapper menu-showing\">\n\t\t\t" + html + "\n\t\t</div>");
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
  


  return "<div class=\"menu-view show\">\n	<div class=\"screen shaded\"><button data-click=\"screen\"></button></div>\n	<div class=\"moveable show transition\">\n		<div class=\"bar\">\n			<div class=\"message\"><span>Some important message</span></div>\n			<div class=\"menu-btn\"><button data-click=\"toggle\"><i>menu</i><b aria-hidden=\"true\">&#8801;</b></button></div>\n		</div>\n\n		<div class=\"menu\">\n			<div class=\"two-row\">\n				<div class=\"row\">\n					<div class=\"bluelights\"><button data-click=\"item\"><b>Bluelights</b></button></div>\n					<div class=\"call\"><button data-click=\"item\"><b>Call</b></button></div>\n					<div class=\"report\"><button data-click=\"item\"><b>Report</b></button></div>\n				</div>\n				<div class=\"row\">\n					<div class=\"about\"><button data-click=\"item\"><b>About</b></button></div>\n					<div class=\"services\"><button data-click=\"item\"><b>Services</b></button></div>\n					<div class=\"profile\"><button data-click=\"item\"><b>Profile</b></button></div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQXBwbGljYXRpb24uanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9BYm91dFZpZXcuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9JbnRyb1ZpZXcuanMiLCJhcHAvQnJvd3Nlci9WaWV3cy9NZW51Vmlldy5qcyIsImFwcC9Ccm93c2VyL1ZpZXdzL1NlcnZpY2VWaWV3LmpzIiwiYXBwL0Jyb3dzZXIvVmlld3MvVmlld01hbmFnZXIuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyLmpzIiwiYXBwL0NvbW1hbmRzL1JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQuanMiLCJhcHAvQ29tbWFuZHMvUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHQuanMiLCJhcHAvRW50aXRpZXMvQmx1ZWxpZ2h0cy9CbHVlbGlnaHRDb2xsZWN0aW9uLmpzIiwiYXBwL0VudGl0aWVzL0JsdWVsaWdodHMvRXZlbnRzL0JsdWVsaWdodHNEZWxpdmVyZWQuanMiLCJhcHAvRW50aXRpZXMvUmVwb3J0cy9FdmVudHMvUmVwb3J0V2FzUG9zdGVkLmpzIiwiYXBwL0VudGl0aWVzL1JlcG9ydHMvUmVwb3J0LmpzIiwiYXBwL1Byb3ZpZGVycy9BcHBTZXJ2aWNlUHJvdmlkZXIuanMiLCJhcHAvUmVwb3NpdG9yaWVzL0JsdWVsaWdodFJlcG9zaXRvcnkuanMiLCJhcHAvUmVwb3NpdG9yaWVzL1JlcG9ydFJlcG9zaXRvcnkuanMiLCJhcHAvbWFpbi5qcyIsImNvbmZpZy9hcHAuanMiLCJjb25maWcvY29tbWFuZHMuanMiLCJjb25maWcvY29uZmlnLmpzIiwiY29uZmlnL2hhbmRsZXJzLmpzIiwiY29uZmlnL2xvY2FsL2FwcC5qcyIsImNvbmZpZy90ZXN0aW5nL2FwcC5qcyIsImNvbmZpZy92aWV3cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEJ1cy5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvQ29tbWFuZEhhbmRsZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRlclRyYWl0LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0NvbW1hbmRlci9FdmVudHMvRGlzcGF0Y2hhYmxlVHJhaXQuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudEdlbmVyYXRvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50TGlzdGVuZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29uZmlnL01vZHVsZUxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db25maWcvUmVwb3NpdG9yeS5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Db250YWluZXIvQ29udGFpbmVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0RPTS9XaW5kb3dTZXJ2aWNlUHJvdmlkZXIuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0F1dGhlbnRpY2F0aW9uRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL0Vycm9yU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9OZXR3b3JrRXJyb3IuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRXJyb3JzL1RpbWVvdXRFcnJvci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9FcnJvcnMvVmFsaWRhdGlvbkVycm9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0Vycm9ycy9lcnJvckNvbnN0cnVjdG9yLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0V2ZW50cy9EaXNwYXRjaGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0ZvdW5kYXRpb24vQXBwbGljYXRpb24uanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9Qcm92aWRlclJlcG9zaXRvcnkuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9zdGFydC5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2FkZXJzL1hIUkxvYWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvQ29uc29sZUxvZ2dlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9Mb2cvTG9nU2VydmljZVByb3ZpZGVyLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvQ29sbGVjdGlvbi5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsImZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9vYnNlcnZlLmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1N1cHBvcnQvc3RhdGUuanMiLCJmcmFtZXdvcmsvc3JjL1dpbGRjYXQvVmlldy9WaWV3LmpzIiwiZnJhbWV3b3JrL3NyYy9XaWxkY2F0L1ZpZXcvVmlld1NlcnZpY2VQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIyL2xpYi9ldmVudGVtaXR0ZXIyLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGJzZnkvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9vYnNlcnZlLWpzL3NyYy9vYnNlcnZlLmpzIiwibm9kZV9tb2R1bGVzL3RyYWNldXIvYmluL3RyYWNldXItcnVudGltZS5qcyIsInRlbXBsYXRlcy9idWlsdC9hYm91dC5oYnMiLCJ0ZW1wbGF0ZXMvYnVpbHQvbWVudS5oYnMiLCJ0ZW1wbGF0ZXMvYnVpbHQvc2VydmljZS5oYnMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNFQTtBQUFBLEFBQUksRUFBQSxDQUFBLGVBQWMsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLGlEQUFnRCxDQUFDLENBQUM7QUFDaEYsQUFBSSxFQUFBLENBQUEsT0FBTSxFQUFZLENBQUEsT0FBTSxBQUFDLENBQUMsMENBQXlDLENBQUMsQ0FBQztBQUV6RSxFQUFLLElBQUUsRUFBSyxRQUFNLEtBQUM7Z0JBRW5CLFNBQU0sWUFBVTs7QUE0RGhCOzs7QUExREMsTUFBSSxDQUFKLFVBQUssQUFBQyxDQUFFO0FBQ0osTUFBRSxBQUFDLENBQUMsb0RBQW1ELENBQUMsQ0FBQztBQUV6RCxPQUFJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyNEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEFwcGxpY2F0aW9uLmpzXG5cbnZhciBCYXNlQXBwbGljYXRpb24gPSByZXF1aXJlKCcuLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvRm91bmRhdGlvbi9BcHBsaWNhdGlvbicpO1xudmFyIGhlbHBlcnMgICAgICAgICA9IHJlcXVpcmUoJy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcblxudmFyIHtsb2d9ID0gaGVscGVycztcblxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBCYXNlQXBwbGljYXRpb24ge1xuXG5cdHN0YXJ0KCkge1xuXHQgICAgbG9nKCc6OiNzdGFydCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIEJhc2VBcHBsaWNhdGlvbicpO1xuXG5cdCAgICBpZiAodGhpcy5pc0xvY2FsKCkpIHtcblx0ICAgICAgICBsb2coYDo6aSBhbSBsb2NhbCEhYCk7XG5cdCAgICAgICAgdGhpcy5vbignYmluZCcsIGxvZyk7XG5cdCAgICB9XG5cblx0ICAgIHN1cGVyKCk7XG5cdH1cblxuXHRydW4oKSB7XG5cdFx0bG9nKCc6OiNydW4gY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBCYXNlQXBwbGljYXRpb24nKTtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5kZWJ1Z09uR2xvYmFsKCk7XG5cdFx0dGhpcy5wcm9jZWVkKCk7XG5cdH1cblxuXHRwcm9jZWVkKCkge1xuXG5cdFx0dmFyIHt2aWV3TWFuYWdlcn0gPSB0aGlzO1xuXHRcdHZpZXdNYW5hZ2VyLmluaXQoKTtcblxuXG5cblx0XHQvLyBsb2coYDo6IHByb2NlZWRgKTtcblx0XHQvLyBldmVudHMub24oJ2FwcC4qJywgaW50cm9WaWV3LmhhbmRsZS5iaW5kKGludHJvVmlldykpO1xuXHRcdC8vIGludHJvVmlldy5nZXRCbHVlbGlnaHRzKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHQvLyAgICAgbG9nKCc6OmdvdCBibHVlbGlnaHRzJyk7XG5cdFx0Ly8gfSk7XG5cdFx0XG5cdH1cblxuXHRkZWJ1Z09uR2xvYmFsKCkge1xuXHRcdGxvZyhgZGVidWdPbkdsb2JhbGApO1xuXG5cdFx0dmFyIGFwcCA9IHRoaXM7XG5cblx0XHRpZiAoYXBwLmlzTG9jYWwoKSkge1xuXG5cdFx0ICAgIGxvZyhgPT09IE5FVyBhcHAuZW52aXJvbm1lbnQoKSBpcyAke2FwcC5lbnZpcm9ubWVudCgpfWApO1xuXG5cdFx0ICAgIC8vIGFkZCBhbGwgSU9DIGJpbmRpbmdzIHRvIHdpbmRvd1xuXHRcdCAgICBmb3IgKHZhciBrZXkgb2YgYXBwKSB7XG5cdFx0ICAgICAgICBpZiAoICEgZ2xvYmFsW2tleV0gKSBnbG9iYWxba2V5XSA9IGFwcFtrZXldO1xuXHRcdCAgICB9XG5cblx0XHQgICAgLy8gYWRkIGFsbCBoZWxwZXIgZnVuY3Rpb25zIHRvIGdsb2JhbFxuXHRcdCAgICBnbG9iYWwuaGVscGVycyA9IGhlbHBlcnM7XG5cdFx0ICAgIGZvciAodmFyIGtleSBpbiBoZWxwZXJzKSB7XG5cdFx0ICAgICAgICAvLyBsb2coYGFkZGluZyBoZWxwZXJzLiR7a2V5fSB0byBnbG9iYWxgKTtcblx0XHQgICAgICAgIGlmICggISBnbG9iYWxba2V5XSApIGdsb2JhbFtrZXldID0gaGVscGVyc1trZXldO1xuXHRcdCAgICB9XG5cdFx0fVxuXHRcdHJldHVybiBhcHA7XG5cdH1cblxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvbjsiLCJ2YXIgVmlldyAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuVmlldy5WaWV3Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIEFib3V0VmlldyBleHRlbmRzIFZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKGFwcCwgdGVtcGxhdGUpIHtcblxuXHRcdHRoaXMubmFtZSA9ICdhYm91dCc7XG5cdCAgICBzdXBlcihhcHApO1xuXHQgICAgYXNzaWduKHRoaXMsIHt0ZW1wbGF0ZSwgbmFtZTogJ2Fib3V0J30pO1xuXHR9XG59XG5cbnZhciB7bG9nLCBhc3NpZ259ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dFZpZXc7IiwidmFyIFZpZXcgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlldycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBJbnRyb1ZpZXcgZXh0ZW5kcyBWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCwgLi4uYXJncykge1xuXG4gICAgICAgIHRoaXMubmFtZSA9ICdpbnRybyc7XG4gICAgICAgIFxuICAgICAgICBzdXBlcihhcHApO1xuXG4gICAgICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgICAgIHZhciB7ZXZlbnRzfSA9IGFwcDtcblxuICAgICAgICBldmVudHMub24oJ3JlcG9ydFdhc1Bvc3RlZCcsIGUgPT4gbG9nKGUudHlwZSwgZSkpOyBcbiAgICB9XG4gICAgcG9zdFJlcG9ydChuYW1lLCBpbmNpZGVudCkge1xuXG4gICAgICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgICAgIHZhciBjb21tYW5kID0gYXBwLm1ha2UoJ3Bvc3RSZXBvcnRDb21tYW5kJywgW25hbWUsIGluY2lkZW50XSk7ICAgICBcbiAgICAgICAgdGhpcy5leGVjdXRlKGNvbW1hbmQpOyBcbiAgICB9XG4gICAgZ2V0Qmx1ZWxpZ2h0cygpIHtcblxuICAgICAgICBsb2coYDo6aW50cm9WaWV3I2dldEJsdWVsaWdodHNgKTtcbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIGNvbW1hbmQgPSBhcHAubWFrZSgncmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGUoY29tbWFuZClcbiAgICAgICAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIGxvZyhgOjpnb3QgaXQgZnJvbSB0aGVuYWJsZSBgLCBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGVycm9yKCc6OmdvdCBpdCBmcm9tIGNhdGNoYWJsZScsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkJsdWVsaWdodHNEZWxpdmVyZWQoe3ZhbHVlOiBjb2xsZWN0aW9ufSkge1xuXG4gICAgICAgIGxvZyhgd2hlbkJsdWVsaWdodHNEZWxpdmVyZWRgKTtcbiAgICB9XG4gICAgb25GYWlsUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZChlcnIpIHtcblxuICAgICAgICBlcnJvcihgb25GYWlsUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZGAsIGVycik7XG4gICAgfVxufVxuXG52YXIge2xvZywgZXJyb3J9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1ZpZXc7IiwidmFyIFZpZXcgICAgPSByZXF1aXJlKCdXaWxkY2F0LlZpZXcuVmlldycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBNZW51VmlldyBleHRlbmRzIFZpZXcge1xuXG5cdGNvbnN0cnVjdG9yKGFwcCwgdGVtcGxhdGUpIHtcblxuXHRcdHRoaXMubmFtZSA9ICdtZW51Jztcblx0ICAgIHN1cGVyKGFwcCk7XG5cdCAgICBhc3NpZ24odGhpcywge3RlbXBsYXRlfSk7XG5cdH1cblx0YmluZEV2ZW50cygpIHtcblxuXHRcdHN1cGVyLmJpbmRFdmVudHMoKTtcblxuXHRcdHZhciB7ZG9jdW1lbnR9ID0gdGhpcy5hcHAud2luZG93O1xuXHRcdHZhciB7Ym9keX0gPSBkb2N1bWVudDtcblx0fVxuXHR0b2dnbGVNZW51KCkge1xuXG5cdFx0dmFyIHtkb2N1bWVudH0gPSB0aGlzLmFwcC53aW5kb3c7XG5cdFx0dmFyIHttb3ZlYWJsZUVsLCBzY3JlZW5FbCwgd3JhcHBlckVsfSA9IHRoaXM7XG5cdFx0dmFyIG1vdmVhYmxlRWxDTCA9IG1vdmVhYmxlRWwuY2xhc3NMaXN0O1xuXHRcdHZhciBzY3JlZW5FbENMICAgPSBzY3JlZW5FbC5jbGFzc0xpc3Q7XG5cdFx0dmFyIHdyYXBwZXJFbENMICAgPSB3cmFwcGVyRWwuY2xhc3NMaXN0O1xuXG5cdFx0dmFyIGlzU2hvd2luZyA9IG1vdmVhYmxlRWxDTC5jb250YWlucygnc2hvdycpO1xuXG5cdFx0aWYgKGlzU2hvd2luZykge1xuXHRcdFx0dGhpcy5yZW1vdmUoJ3Nob3cnKTtcblx0XHRcdG1vdmVhYmxlRWxDTC5hZGQoJ3RyYW5zaXRpb24nKTtcblx0XHRcdHdhaXQoNDApXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRtb3ZlYWJsZUVsQ0wucmVtb3ZlKCdzaG93Jyk7XG5cdFx0XHRcdFx0c2NyZWVuRWxDTC5yZW1vdmUoJ3NoYWRlZCcpO1xuXHRcdFx0XHRcdHdyYXBwZXJFbENMLnJlbW92ZSgnbWVudS1zaG93aW5nJyk7XG5cdFx0XHRcdFx0d2FpdCgzMDApLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0bW92ZWFibGVFbENMLnJlbW92ZSgndHJhbnNpdGlvbicpO1x0XG5cdFx0XHRcdFx0XHRtb3ZlYWJsZUVsQ0wuYWRkKCdkb25lJyk7XG5cdFx0XHRcdFx0XHRzY3JlZW5FbENMLmFkZCgnaGlkZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmFkZCgnc2hvdycpO1xuXHRcdFx0c2NyZWVuRWxDTC5yZW1vdmUoJ2hpZGUnKTtcblx0XHRcdG1vdmVhYmxlRWxDTC5yZW1vdmUoJ2RvbmUnKTtcblx0XHRcdHdyYXBwZXJFbENMLmFkZCgnbWVudS1zaG93aW5nJyk7XG5cdFx0XHR3YWl0KDQwKVxuXHRcdFx0XHQudGhlbigoKSA9PiBtb3ZlYWJsZUVsQ0wuYWRkKCd0cmFuc2l0aW9uJykpXG5cdFx0XHRcdC50aGVuKCgpID0+IHdhaXQoMjApKVxuXHRcdFx0XHQudGhlbigoKSA9PiBzY3JlZW5FbENMLmFkZCgnc2hhZGVkJykpXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRtb3ZlYWJsZUVsQ0wuYWRkKCdzaG93Jyk7XG5cdFx0XHRcdFx0d2FpdCgzMDApLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0bW92ZWFibGVFbENMLnJlbW92ZSgndHJhbnNpdGlvbicpO1xuXHRcdFx0XHRcdFx0Ly8gc2NyZWVuRWxDTC5hZGQoJ3NoYWRlZCcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9XHRcblx0fVxuXHRvbkNsaWNrVG9nZ2xlKHRhcmdldCkge1xuXG5cdFx0dGhpcy50b2dnbGVNZW51KCk7XG5cdH1cblx0b25DbGlja1NjcmVlbigpIHtcblx0XHRcblx0XHR0aGlzLnRvZ2dsZU1lbnUoKTtcblx0fVxuXHRvbkNsaWNrSXRlbSh0YXJnZXQpIHtcblxuXHRcdC8vIGxvZyhgb25DbGlja01lbnVCdXR0b25gLCB0YXJnZXQpO1xuXHRcdGxvZyh0YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUpO1xuXHR9XG5cdG9uSGlnaGxpZ2h0c3RhcnQoZSkge1xuXG5cdFx0dmFyIHt0YXJnZXR9ID0gZTtcblxuXHRcdGlmICh0YXJnZXQubWF0Y2hlcygnLm1lbnUgYnV0dG9uJykpIHtcblx0XHRcdHRoaXMuYW5jZXN0b3JPZih0YXJnZXQsICdkaXYnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3VwZXIub25IaWdobGlnaHRzdGFydChlKTtcblx0XHR9XG5cdH1cblx0b25IaWdobGlnaHRlbmQoZSkge1xuXHRcdC8vIGRlYnVnZ2VyO1xuXHQgICAgdmFyIHt0YXJnZXR9ID0gZTtcblxuXHQgICAgaWYgKHRhcmdldC5tYXRjaGVzKCcubWVudSBidXR0b24nKSkge1xuXHQgICAgXHR0aGlzLmFuY2VzdG9yT2YodGFyZ2V0LCAnZGl2JykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHRzdXBlci5vbkhpZ2hsaWdodGVuZChlKTtcblx0ICAgIH1cblx0fVxuXHRnZXQgbWVudUVsKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuJCgnLm1lbnUnKTtcblx0fVxuXHRnZXQgYmFyRWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcuYmFyJyk7XG5cdH1cblx0Z2V0IG1vdmVhYmxlRWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcubW92ZWFibGUnKTtcblx0fVxuXHRnZXQgc2NyZWVuRWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcuc2NyZWVuJyk7XG5cdH1cblx0Z2V0IHdyYXBwZXJFbCgpIHtcblxuXHRcdHJldHVybiB0aGlzLmFwcC53aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcblx0fVxufVxuXG52YXIge2xvZywgYXNzaWduLCB3YWl0LCBuZXh0RnJhbWV9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51VmlldzsiLCIvLyBzZXJ2aWNlVmlldy5qc1xuXG52YXIgVmlldyAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuVmlldy5WaWV3Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFNlcnZpY2VWaWV3IGV4dGVuZHMgVmlldyB7XG5cblx0Y29uc3RydWN0b3IoYXBwLCB0ZW1wbGF0ZSkge1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9ICdzZXJ2aWNlJztcblxuXHQgICAgc3VwZXIoYXBwKTtcblx0ICAgIGFzc2lnbih0aGlzLCB7dGVtcGxhdGV9KTtcblx0fVxuXHRiaW5kRXZlbnRzKCkge1xuXG5cdFx0dmFyIHtlbH0gPSB0aGlzO1xuXHRcdHZhciBlbE9uID0gZWwuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKGVsKTtcblxuXHRcdGVsT24oJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hzdGFydC5iaW5kKHRoaXMsICcuZGV0YWlsLWFjdGlvbicpKTtcblx0XHRlbE9uKCdjbGljaycsICAgICAgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xuXHR9XG5cdG9uQ2xpY2soZSkge1xuXHRcdHZhciB0YXJnZXQgPSB0aGlzLmdldERlc2lyZWRUYXJnZXQoZS50YXJnZXQpO1xuXG5cdFx0aWYgKHRhcmdldC5tYXRjaGVzKCcuZGV0YWlsLWFjdGlvbicpKSB0aGlzLm9uQ2xpY2tEZXRhaWxBY3Rpb24odGFyZ2V0KTtcblx0XHRpZiAodGFyZ2V0Lm1hdGNoZXMoJy5jbG9zZS1hY3Rpb24nKSkgIHRoaXMub25DbGlja0Nsb3NlQWN0aW9uKHRhcmdldCk7XG5cblx0fVxuXHRnZXREZXNpcmVkVGFyZ2V0KG5vZGUpIHtcblxuXHQgICAgaWYgKG5vZGUubWF0Y2hlcygnLmRldGFpbC1hY3Rpb24gKicpKSB7XG5cdCAgICBcdHJldHVybiB0aGlzLmFuY2VzdG9yT2Yobm9kZSwgJy5kZXRhaWwtYWN0aW9uJyk7XHRcblx0ICAgIH1cblx0ICAgIGlmIChub2RlLm1hdGNoZXMoJy5jbG9zZS1hY3Rpb24gKicpKSB7XG5cdCAgICBcdHJldHVybiB0aGlzLmFuY2VzdG9yT2Yobm9kZSwgJy5jbG9zZS1hY3Rpb24nKTtcdFxuXHQgICAgfVxuXHQgICAgXHRcblx0ICAgIHJldHVybiBub2RlO1xuXHR9XG5cdG9uQ2xpY2tEZXRhaWxBY3Rpb24odGFyZ2V0KSB7XG5cblx0XHR2YXIge3R5cGVFbH0gICAgPSB0aGlzO1xuXHRcdHZhciBjbGlja2VkSXRlbSA9IHRoaXMuYW5jZXN0b3JPZih0YXJnZXQsICcuc2VydmljZS1saXN0aXRlbScpO1xuXG5cdFx0dGhpcy4kJCgnLnNlcnZpY2UtbGlzdGl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuXHRcdFx0aWYgKCBpdGVtICE9PSBjbGlja2VkSXRlbSkgaXRlbS5jbGFzc0xpc3QuYWRkKCdjbG9zZWQnKTtcblx0XHR9KTtcblxuXHRcdHR5cGVFbC5jbGFzc0xpc3QucmVtb3ZlKCdsaXN0Jyk7XG5cdFx0dHlwZUVsLmNsYXNzTGlzdC5hZGQoJ2RldGFpbCcpO1xuXG5cdH1cblx0b25DbGlja0Nsb3NlQWN0aW9uKHRhcmdldCkge1xuXG5cdFx0dmFyIHt0eXBlRWx9ICAgID0gdGhpcztcblx0XHR2YXIgY2xpY2tlZEl0ZW0gPSB0aGlzLmFuY2VzdG9yT2YodGFyZ2V0LCAnLnNlcnZpY2UtbGlzdGl0ZW0nKTtcblxuXHRcdHRoaXMuJCQoJy5zZXJ2aWNlLWxpc3RpdGVtJykuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2VkJyk7XG5cdFx0fSk7XG5cblx0XHR0eXBlRWwuY2xhc3NMaXN0LmFkZCgnbGlzdCcpO1xuXHRcdHR5cGVFbC5jbGFzc0xpc3QucmVtb3ZlKCdkZXRhaWwnKTtcblxuXHR9XG5cdGdldCB0eXBlRWwoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy4kKCcudHlwZScpO1xuXHR9XG59XG5cbnZhciB7bG9nLCBhc3NpZ259ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlVmlldzsiLCJ2YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFZpZXdNYW5hZ2VyIHtcblxuXHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHR9XG5cdGluaXQoKSB7XG5cblx0XHR0aGlzLmNyZWF0ZVZpZXdzKCk7XG5cdFx0dGhpcy5yZW1vdmVOb3RvdWNoT25Ub3VjaCgpO1xuXHR9XG5cdHJlbW92ZU5vdG91Y2hPblRvdWNoKCkge1xuXHRcdGxvZygncmVtb3ZlTm90b3VjaE9uVG91Y2gnKTtcblxuXHRcdHZhciB7ZG9jdW1lbnR9ID0gdGhpcy5hcHAud2luZG93O1xuXHRcdHZhciB7ZG9jdW1lbnRFbGVtZW50LCBib2R5fSA9IGRvY3VtZW50O1xuXG5cdFx0dmFyIHJlbW92ZSA9ICgpID0+IHtcblx0XHRcdGxvZyhgcmVtb3ZlYCk7XG5cdFx0XHRkb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdG91Y2gnKTtcblx0XHRcdGJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHJlbW92ZSk7XG5cdFx0fTtcblx0XHRib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCByZW1vdmUpO1xuXHR9O1xuXHRjcmVhdGVWaWV3cygpIHtcblxuXHRcdHZhciB7YXBwfSAgICAgID0gdGhpcztcblx0XHR2YXIge2V2ZW50c30gPSBhcHA7XG5cdFx0dmFyIHt3aW5kb3d9ID0gYXBwO1xuXHRcdHZhciB7ZG9jdW1lbnR9ID0gd2luZG93O1xuXHRcdHZhciB7Ym9keX0gPSBkb2N1bWVudDtcblx0XHRcblx0XHR2YXIge2ludHJvVmlldywgYWJvdXRWaWV3LCBtZW51Vmlldywgc2VydmljZVZpZXd9ID0gYXBwO1xuXG5cdFx0dmFyIHZpZXdzID0gW2Fib3V0Vmlldywgc2VydmljZVZpZXcsIG1lbnVWaWV3XTtcblx0XHRcblx0XHR2YXIgaHRtbCA9IHZpZXdzLnJlZHVjZSgoc3RyLCB2aWV3KSA9PiBzdHIgKz0gdmlldy5yZW5kZXIoKSwgJycpO1xuXG5cdFx0Ly8gaHRtbCA9IGA8ZGl2IGNsYXNzPXdyYXBwZXI+JHtodG1sfTwvZGl2PmA7XG5cdFx0aHRtbCA9IFxuXHRcdGA8ZGl2IGNsYXNzPVwic3RhdHVzYmFyLWNvbnRhaW5lclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInN0YXR1c2Jhci1mYWtlclwiPlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJsZWZ0XCI+4peP4peP4peP4peL4peLIFZlcml6b24gPHNwYW4gY2xhc3M9XCJpY29uLWxvY2FsLXBob25lXCIgLz48L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWlkZGxlXCI+OTowOSBBTTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaWdodFwiPjU4JSDilq08L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwid3JhcHBlciBtZW51LXNob3dpbmdcIj5cblx0XHRcdCR7aHRtbH1cblx0XHQ8L2Rpdj5gO1xuXG5cdFx0Ym9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuXG5cdFx0dmlld3MuZm9yRWFjaCh2aWV3ID0+IHZpZXcuYmluZEV2ZW50cygpKTtcblx0fVxufVxuXG52YXIge2xvZywgYXNzaWdufSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld01hbmFnZXI7IiwiXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbmNpZGVudCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5jaWRlbnQgPSBpbmNpZGVudDtcbiAgICB9XG4gICAgc3RhdGljIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdwb3N0UmVwb3J0Q29tbWFuZCc7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RSZXBvcnRDb21tYW5kOyIsInZhciBDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRIYW5kbGVyJyk7XG52YXIgaGVscGVycyAgICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXIgZXh0ZW5kcyBDb21tYW5kSGFuZGxlciB7XG5cbiAgICBoYW5kbGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB7bmFtZSwgaW5jaWRlbnR9ID0gY29tbWFuZDtcbiAgICAgICAgdmFyIHthcHB9ID0gJHRoaXM7XG4gICAgICAgIHZhciBSZXBvcnQgPSBhcHAubWFrZSgnUmVwb3J0Jyk7XG4gICAgICAgIFxuICAgICAgICBhc3luYyhmdW5jdGlvbiogKCkge1xuXG4gICAgICAgICAgICB2YXIgcmVwb3J0ID0geWllbGQgUmVwb3J0LnBvc3QobmFtZSwgaW5jaWRlbnQpO1xuICAgICAgICAgICAgJHRoaXMuZGlzcGF0Y2hFdmVudHNGb3IocmVwb3J0KTtcblxuICAgICAgICB9KSgpLmNhdGNoKHRlcm1pbmF0ZUVycm9yKTtcbiAgICB9XG59XG5cbnZhciB7dGVybWluYXRlRXJyb3IsIGFzeW5jLCBsb2d9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXI7IiwiXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIFJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cbiAgICAgICAgYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gJ2FwcC5yZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kJztcbiAgICB9XG4gICAgc3RhdGljIGdldFNob3J0TmFtZSgpIHtcblxuICAgIFx0cmV0dXJuIGxhc3RTZWdtZW50KCB0aGlzLmdldE5hbWUoKSApO1xuICAgIH1cbn1cblxudmFyIHthc3NpZ24sIGxhc3RTZWdtZW50fSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZDsiLCJ2YXIgQ29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kSGFuZGxlcicpO1xudmFyIGhlbHBlcnMgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIgZXh0ZW5kcyBDb21tYW5kSGFuZGxlciB7XG5cbiAgICAqaGFuZGxlKGNvbW1hbmQpIHtcblxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICB2YXIge0JsdWVsaWdodCwgZXZlbnRzfSA9IGFwcDtcbiAgICAgICAgdmFyIGNvbW1hbmROYW1lICA9IGNvbW1hbmQuY29uc3RydWN0b3IuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBibHVlbGlnaHQgPSB5aWVsZCBCbHVlbGlnaHQuZ2V0KCk7XG4gICAgICAgICAgICBsb2coJzo6IGNyYXAgMicpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50c0ZvcihibHVlbGlnaHQpOyAgIFxuICAgICAgICAgICAgcmV0dXJuIGJsdWVsaWdodC5jb2xsZWN0aW9uO1xuXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgbG9nKGA6OiBiaWcgZXJyb3JgKTtcbiAgICAgICAgICAgIGV2ZW50cy5lbWl0KGNvbW1hbmROYW1lLCBlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIge2FzeW5jTWV0aG9kcywgbG9nfSA9IGhlbHBlcnM7XG5cbmFzeW5jTWV0aG9kcyhSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlci5wcm90b3R5cGUsICdoYW5kbGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kSGFuZGxlcjsiLCJ2YXIgRXZlbnRHZW5lcmF0b3IgPSByZXF1aXJlKCcuLi8uLi8uLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvQ29tbWFuZGVyL0V2ZW50cy9FdmVudEdlbmVyYXRvcicpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBCbHVlbGlnaHQge1xuXG5cdC8vIHVzZXMgRXZlbnRHZW5lcmF0b3JcblxuXHRjb25zdHJ1Y3RvcihuYW1lLCBpbmNpZGVudCkgeyBcblxuXHQgICAgdGhpcy5uYW1lID0gbmFtZTtcblx0ICAgIHRoaXMuaW5jaWRlbnQgPSBpbmNpZGVudDtcblx0ICAgIEV2ZW50R2VuZXJhdG9yLmNhbGwodGhpcyk7XG5cdH1cblx0c3RhdGljICpnZXQoLi4uYXJncykge1xuXHRcdHZhciBhcHAgPSB0aGlzLmdldEFwcGxpY2F0aW9uKCk7XG5cdFx0dmFyIHtibHVlbGlnaHRSZXBvc2l0b3J5LCBibHVlbGlnaHR9ID0gYXBwO1xuXG5cdFx0dmFyIGNvbGxlY3Rpb24gPSB5aWVsZCBibHVlbGlnaHRSZXBvc2l0b3J5LmdldCgpO1xuXHRcdGxvZyhgOjogQmx1ZWxpZ2h0LmdldCAzYCk7XG5cdFx0Ymx1ZWxpZ2h0LmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuXHRcdFxuXHRcdHZhciBldmVudCA9IGFwcC5tYWtlKCdibHVlbGlnaHRzRGVsaXZlcmVkJywgW2NvbGxlY3Rpb25dKTtcblx0XHRyZXR1cm4gYmx1ZWxpZ2h0LnJhaXNlKGV2ZW50KTtcblx0fVxuXHRzdGF0aWMgZ2V0QXBwbGljYXRpb24oKSB7XG5cblx0ICAgIHJldHVybiB0aGlzLmFwcF87XG5cdH1cblx0c3RhdGljIHNldEFwcGxpY2F0aW9uKGFwcCkge1xuXG5cdCAgICB0aGlzLmFwcF8gPSBhcHA7XG5cdCAgICByZXR1cm4gdGhpcztcblx0fVxufVxuXG52YXIge2xvZywgZXh0ZW5kUHJvdG9PZiwgd2FpdCwgYXN5bmNNZXRob2RzfSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQmx1ZWxpZ2h0LCBFdmVudEdlbmVyYXRvcik7XG5hc3luY01ldGhvZHMoQmx1ZWxpZ2h0LCAnZ2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmx1ZWxpZ2h0OyIsIi8vIEJsdWVsaWdodENvbGxlY3Rpb24uanNcblxudmFyIENvbGxlY3Rpb24gPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuQ29sbGVjdGlvbicpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuLi8uLi8uLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG5cbi8vIHZhciBFdmVudEdlbmVyYXRvciA9IHJlcXVpcmUoJy4uLy4uLy4uL2ZyYW1ld29yay9zcmMvV2lsZGNhdC9Db21tYW5kZXIvRXZlbnRzL0V2ZW50R2VuZXJhdG9yJyk7XG5cbmNsYXNzIEJsdWVsaWdodENvbGxlY3Rpb24gZXh0ZW5kcyBDb2xsZWN0aW9uIHtcblxuXHQvLyB1c2VzIEV2ZW50R2VuZXJhdG9yXG5cblx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdHN1cGVyKC4uLmFyZ3MpXG5cdFx0Ly8gRXZlbnRHZW5lcmF0b3IuY2FsbCh0aGlzKTtcblx0fVxuXHQvLyBzdGF0aWMgKmdldCguLi5hcmdzKSB7XG5cblx0Ly8gXHR2YXIgcmVzdWx0ID0geWllbGQgd2FpdCgwLCBbNSwzLDJdKTtcblx0Ly8gXHRyZXR1cm4gbmV3IEJsdWVsaWdodENvbGxlY3Rpb24ocmVzdWx0KTtcblx0Ly8gfVxuXHRzdGF0aWMgZ2V0QXBwbGljYXRpb24oKSB7XG5cblx0ICAgIHJldHVybiB0aGlzLmFwcF87XG5cdH1cblx0c3RhdGljIHNldEFwcGxpY2F0aW9uKGFwcCkge1xuXG5cdCAgICB0aGlzLmFwcF8gPSBhcHA7XG5cdCAgICByZXR1cm4gdGhpcztcblx0fVxufVxuXG52YXIge2V4dGVuZFByb3RvT2YsIC8qYXN5bmNNZXRob2RzLCAqL3dhaXR9ID0gaGVscGVycztcblxuLy8gZXh0ZW5kUHJvdG9PZihCbHVlbGlnaHRDb2xsZWN0aW9uLCBFdmVudEdlbmVyYXRvcik7XG4vLyBhc3luY01ldGhvZHMoQmx1ZWxpZ2h0Q29sbGVjdGlvbiwgJ2dldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsdWVsaWdodENvbGxlY3Rpb247IiwiLy8gQmx1ZWxpZ2h0c0RlbGl2ZXJlZC5qc1xuXG5cbmNsYXNzIEJsdWVsaWdodHNEZWxpdmVyZWQge1xuXG4gICAgY29uc3RydWN0b3IoYmx1ZWxpZ2h0Q29sbGVjdGlvbikge1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBibHVlbGlnaHRDb2xsZWN0aW9uO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmdldE5hbWUoKTtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIH1cbiAgICBnZXROYW1lKCkge1xuXG4gICAgICAgIHJldHVybiAnYXBwLmJsdWVsaWdodHNEZWxpdmVyZWQnO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCbHVlbGlnaHRzRGVsaXZlcmVkOyIsIlxuY2xhc3MgUmVwb3J0V2FzUG9zdGVkIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlcG9ydCkge1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSByZXBvcnQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgfVxuICAgIGdldE5hbWUoKSB7XG5cbiAgICAgICAgcmV0dXJuICdyZXBvcnRXYXNQb3N0ZWQnO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnRXYXNQb3N0ZWQ7IiwidmFyIEV2ZW50R2VuZXJhdG9yID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuRXZlbnRzLkV2ZW50R2VuZXJhdG9yJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG52YXIgVmFsaWRhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuVmFsaWRhdGlvbkVycm9yJyk7XG5cbmNsYXNzIFJlcG9ydCB7XG5cbiAgICAvLyB1c2VzIEV2ZW50R2VuZXJhdG9yXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpbmNpZGVudCkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5jaWRlbnQgPSBpbmNpZGVudDtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgc3RhdGljICpwZXJzaXN0KHJlcG9ydCkge1xuXG4gICAgICAgIHZhciBteU5hbWUgPSB0aGlzLm15TmFtZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgaGV5IHJlcG9ydCAxOiAke215TmFtZX1gKTtcbiAgICAgICAgdmFyIHNhdmVkUmVwb3J0ID0geWllbGQgd2FpdCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGV5IHJlcG9ydCAyJyk7XG4gICAgICAgIHlpZWxkIHdhaXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2hleSByZXBvcnQgMycpO1xuICAgICAgICByZXR1cm4gJ2kgYW0gZG9uZSEnO1xuICAgIH1cbiAgICBzdGF0aWMgbXlOYW1lKCkge1xuXG4gICAgICAgIHJldHVybiAnd2VpcmROYW1lJztcbiAgICB9XG4gICAgc3RhdGljICpwb3N0KC4uLmFyZ3MpIHtcblxuICAgICAgICB2YXIgYXBwID0gdGhpcy5nZXRBcHBsaWNhdGlvbigpO1xuICAgICAgICB2YXIge3JlcG9ydFJlcG9zaXRvcnl9ID0gYXBwO1xuXG4gICAgICAgIHZhciByZXBvcnQgPSBhcHAubWFrZSgncmVwb3J0JywgYXJncyk7XG4gICAgICAgIHJlcG9ydCA9IHlpZWxkIHJlcG9ydFJlcG9zaXRvcnkuc2F2ZShyZXBvcnQpO1xuXG4gICAgICAgIHZhciBldmVudCA9IGFwcC5tYWtlKCdyZXBvcnRXYXNQb3N0ZWQnLCBbcmVwb3J0XSk7XG4gICAgICAgIHJldHVybiByZXBvcnQucmFpc2UoZXZlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0QXBwbGljYXRpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwXztcbiAgICB9XG4gICAgc3RhdGljIHNldEFwcGxpY2F0aW9uKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwXyA9IGFwcDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5cbnZhciB7bG9nLCBleHRlbmRQcm90b09mLCB3YWl0LCBhc3luY01ldGhvZHN9ID0gaGVscGVycztcbmV4dGVuZFByb3RvT2YoUmVwb3J0LCBFdmVudEdlbmVyYXRvcik7XG5hc3luY01ldGhvZHMoUmVwb3J0LCAncGVyc2lzdCcsICdwb3N0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3J0OyIsInZhciBTZXJ2aWNlUHJvdmlkZXIgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xudmFyIFJlcG9ydCAgICAgICAgICAgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuUmVwb3J0cy5SZXBvcnQnKTtcbnZhciBSZXBvcnRXYXNQb3N0ZWQgID0gcmVxdWlyZSgnQXBwLkVudGl0aWVzLlJlcG9ydHMuRXZlbnRzLlJlcG9ydFdhc1Bvc3RlZCcpO1xudmFyIFJlcG9ydFJlcG9zaXRvcnkgPSByZXF1aXJlKCdBcHAuUmVwb3NpdG9yaWVzLlJlcG9ydFJlcG9zaXRvcnknKTtcblxudmFyIEJsdWVsaWdodCAgICAgICAgICAgPSByZXF1aXJlKCdBcHAuRW50aXRpZXMuQmx1ZWxpZ2h0cy5CbHVlbGlnaHQnKTtcbnZhciBCbHVlbGlnaHRDb2xsZWN0aW9uID0gcmVxdWlyZSgnQXBwLkVudGl0aWVzLkJsdWVsaWdodHMuQmx1ZWxpZ2h0Q29sbGVjdGlvbicpO1xudmFyIEJsdWVsaWdodFJlcG9zaXRvcnkgPSByZXF1aXJlKCdBcHAuUmVwb3NpdG9yaWVzLkJsdWVsaWdodFJlcG9zaXRvcnknKTtcbnZhciBCbHVlbGlnaHRzRGVsaXZlcmVkID0gcmVxdWlyZSgnQXBwLkVudGl0aWVzLkJsdWVsaWdodHMuRXZlbnRzLkJsdWVsaWdodHNEZWxpdmVyZWQnKTtcblxudmFyIFhIUkxvYWRlciAgID0gcmVxdWlyZSgnV2lsZGNhdC5Mb2FkZXJzLlhIUkxvYWRlcicpO1xudmFyIFZpZXdNYW5hZ2VyID0gcmVxdWlyZSgnLi4vQnJvd3Nlci9WaWV3cy9WaWV3TWFuYWdlcicpO1xuXG52YXIgaGVscGVycyAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuIFxuY2xhc3MgQXBwU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIGJvb3QoKSB7XG5cbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIC8vIFRoaXMgc2VydmljZSBwcm92aWRlciBpcyBhIGNvbnZlbmllbnQgcGxhY2UgdG8gcmVnaXN0ZXIgeW91ciBzZXJ2aWNlc1xuICAgICAgICAvLyBpbiB0aGUgSW9DIGNvbnRhaW5lci5cbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyRW50aXRpZXMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJSZXBvc2l0b3JpZXMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJPdGhlcnMuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyT3RoZXJzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcblxuICAgIGFwcC5iaW5kU2hhcmVkKCd2aWV3TWFuYWdlcicsIGFwcCA9PiBuZXcgVmlld01hbmFnZXIoYXBwKSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckVudGl0aWVzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcblxuICAgIC8vIFJlcG9ydFxuICAgIGFwcC5iaW5kU2hhcmVkKCdSZXBvcnQnLCBhcHAgPT4gUmVwb3J0LnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdyZXBvcnQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgYXBwLlJlcG9ydCguLi5hcmdzKTtcbiAgICB9KTtcbiAgICBhcHAuYmluZCgncmVwb3J0V2FzUG9zdGVkJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlcG9ydFdhc1Bvc3RlZCguLi5hcmdzKTtcbiAgICB9KTtcblxuICAgIC8vIEJsdWVsaWdodFxuICAgIGFwcC5iaW5kU2hhcmVkKCdCbHVlbGlnaHQnLCBhcHAgPT4gQmx1ZWxpZ2h0LnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHQnLCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgYXBwLkJsdWVsaWdodCguLi5hcmdzKTtcbiAgICB9KTtcbiAgICBhcHAuYmluZFNoYXJlZCgnQmx1ZWxpZ2h0Q29sbGVjdGlvbicsIGFwcCA9PiBCbHVlbGlnaHRDb2xsZWN0aW9uLnNldEFwcGxpY2F0aW9uKGFwcCkpO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHRDb2xsZWN0aW9uJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoICEgYXJncy5sZW5ndGgpIGFyZ3MgPSBbW11dO1xuICAgICAgICByZXR1cm4gbmV3IGFwcC5CbHVlbGlnaHRDb2xsZWN0aW9uKC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIGFwcC5iaW5kKCdibHVlbGlnaHRzRGVsaXZlcmVkJywgKGFwcCwgLi4uYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEJsdWVsaWdodHNEZWxpdmVyZWQoLi4uYXJncyk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlclJlcG9zaXRvcmllcygpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG5cbiAgICBhcHAuYmluZFNoYXJlZCgncmVwb3J0UmVwb3NpdG9yeScsIGFwcCA9PiBuZXcgUmVwb3J0UmVwb3NpdG9yeShhcHApKTtcblxuICAgIGFwcC5iaW5kKCd4aHJMb2FkZXInLCBhcHAgPT4gbmV3IFhIUkxvYWRlcik7XG4gICAgYXBwLmJpbmRTaGFyZWQoJ2JsdWVsaWdodFJlcG9zaXRvcnknLCBhcHAgPT4ge1xuICAgICAgICB2YXIgeGhyTG9hZGVyID0gYXBwLnhockxvYWRlcjtcbiAgICAgICAgcmV0dXJuIG5ldyBCbHVlbGlnaHRSZXBvc2l0b3J5KGFwcCwgeGhyTG9hZGVyKTtcbiAgICB9KTtcbn1cblxudmFyIHtsb2d9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBTZXJ2aWNlUHJvdmlkZXI7IiwidmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuLi8uLi9mcmFtZXdvcmsvc3JjL1dpbGRjYXQvU3VwcG9ydC9oZWxwZXJzJyk7XG5cbmNsYXNzIEJsdWVsaWdodFJlcG9zaXRvcnkge1xuXG4gICAgY29uc3RydWN0b3IoYXBwLCBsb2FkZXIpIHtcblxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gICAgfVxuICAgICpnZXQoKSB7XG4gICAgICAgIGxvZyhgOjogQmx1ZWxpZ2h0UmVwb3NpdG9yeS5nZXRgKVxuICAgIFx0dmFyIHthcHAsIGxvYWRlciwgYmFzZVVybH0gPSB0aGlzO1xuICAgIFx0dmFyIHtCbHVlbGlnaHRDb2xsZWN0aW9ufSA9IGFwcDtcbiAgICBcdHZhciB1cmwgPSBgJHtiYXNlVXJsfWJsdWVsaWdodHNgO1xuXG4gICAgXHR2YXIge2ZlYXR1cmVzfSA9IHlpZWxkIGxvYWRlci5nZXQoe3VybCwgdGltZW91dDogMTAwMDB9KTtcblxuICAgICAgICByZXR1cm4gbmV3IEJsdWVsaWdodENvbGxlY3Rpb24oZmVhdHVyZXMpO1xuICAgIH1cbiAgICBnZXQgYmFzZVVybCgpIHtcblxuICAgIFx0dmFyIHtjb25maWd9ID0gdGhpcy5hcHA7XG4gICAgXHRyZXR1cm4gY29uZmlnLmdldCgnYXBwJykuYXBpQmFzZVVybDtcbiAgICB9XG59XG5cbnZhciB7YXN5bmNNZXRob2RzLCBsb2d9ID0gaGVscGVycztcblxuYXN5bmNNZXRob2RzKEJsdWVsaWdodFJlcG9zaXRvcnkucHJvdG90eXBlLCAnZ2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmx1ZWxpZ2h0UmVwb3NpdG9yeTsiLCJ2YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG52YXIgVmFsaWRhdGlvbkVycm9yID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuVmFsaWRhdGlvbkVycm9yJyk7XG52YXIgQXV0aGVudGljYXRpb25FcnJvciA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLkF1dGhlbnRpY2F0aW9uRXJyb3InKTtcblxuY2xhc3MgUmVwb3J0UmVwb3NpdG9yeSB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcblxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB9XG4gICAgc2F2ZShyZXBvcnQpIHtcblxuICAgICAgICBsb2coYHNhdmluZyByZXBvcnQsIHBsZWFzZSB3YWl04oCmYCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gd2FpdCgpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyB0aHJvdyBuZXcgQXV0aGVudGljYXRpb25FcnJvcihgY3JhYXBwcHBgKTtcblxuICAgICAgICAgICAgbG9nKGByZXBvcnQgc2F2ZWQsIHRoYW5rIHlvdS5gKTtcbiAgICAgICAgICAgIHJldHVybiByZXBvcnQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxudmFyIHtsb2csIHdhaXR9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnRSZXBvc2l0b3J5OyIsInJlcXVpcmUoJ3RyYWNldXIvYmluL3RyYWNldXItcnVudGltZScpO1xuXG4vLyB2YXIgQXBwID0gcmVxdWlyZSgnLi4vZnJhbWV3b3JrL3NyYy9XaWxkY2F0L0ZvdW5kYXRpb24vQXBwbGljYXRpb24nKTtcbnZhciBBcHAgPSByZXF1aXJlKCcuL0FwcGxpY2F0aW9uJyk7XG5cbi8vIGNvdWxkIGV4dGVuZCBBcHAsIHNvIGxlYXZlIHRoaXMgZmlsZTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG4vKlxuICogQXBwbGljYXRpb24gU2VydmljZSBQcm92aWRlcnMuLi5cbiAqL1xudmFyIEFwcFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ0FwcC5Qcm92aWRlcnMuQXBwU2VydmljZVByb3ZpZGVyJyk7XG5cbi8qXG4gKiBGcmFtZXdvcmsgU2VydmljZSBQcm92aWRlcnMuLi5cbiAqL1xudmFyIExvZ1NlcnZpY2VQcm92aWRlciAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuTG9nLkxvZ1NlcnZpY2VQcm92aWRlcicpO1xudmFyIFdpbmRvd1NlcnZpY2VQcm92aWRlciAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRE9NLldpbmRvd1NlcnZpY2VQcm92aWRlcicpO1xudmFyIEVycm9yUHJvdmlkZXIgICAgICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLkVycm9yU2VydmljZVByb3ZpZGVyJyk7XG52YXIgVmlld1NlcnZpY2VQcm92aWRlciAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXdTZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBDb21tYW5kZXJTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5Db21tYW5kU2VydmljZVByb3ZpZGVyJyk7XG5cbmZ1bmN0aW9uIGdldE5hdmlnYXRvclByb3BlcnR5KHByb3ApIHtcblxuICAgIC8vIGRlYWwgd2l0aCBjdXJyZW50IGJ1ZyBpbiBDb3Jkb3ZhOlxuICAgIC8vIFwiRGVwcmVjYXRlZCBhdHRlbXB0IHRvIGFjY2VzcyBwcm9wZXJ0eS4uLlwiXG4gICAgLy8gLi4ucHJvYmFibHkgd2lsbCBmaXggc29vblxuXG4gICAgdmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG4gICAgdmFyIHBhcmVudCAgICA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihuYXZpZ2F0b3IpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcmVudFtwcm9wXTtcbiAgICAgICAgaWYgKHBhcmVudFtwcm9wXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcGFyZW50W3Byb3BdO1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yW3Byb3BdO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yW3Byb3BdO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYnJvd3NlcigpIHtcblxuICAgIGlmIChnbG9iYWwubmF2aWdhdG9yKSB7XG4gICAgICAgIHJldHVybiBnZXROYXZpZ2F0b3JQcm9wZXJ0eSgndXNlckFnZW50Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdub3QgZGV0ZXJtaW5lZCc7XG4gICAgfVxufVxuXG52YXIgY29uZmlnT2JqZWN0ID0ge1xuICAgIGFwaUJhc2VVcmw6ICdodHRwczovL2dvLmRvc2Eubm9ydGh3ZXN0ZXJuLmVkdS9udWhlbHBhcGkvYXBpLycsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvKlxuICAgICAgICAgKiBBcHBsaWNhdGlvbiBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICAgICAgICAgKi9cbiAgICAgICAgQXBwU2VydmljZVByb3ZpZGVyLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIEZyYW1ld29yayBTZXJ2aWNlIFByb3ZpZGVycy4uLlxuICAgICAgICAgKi9cbiAgICAgICAgV2luZG93U2VydmljZVByb3ZpZGVyLFxuICAgICAgICBMb2dTZXJ2aWNlUHJvdmlkZXIsXG4gICAgICAgIEVycm9yUHJvdmlkZXIsXG4gICAgICAgIFZpZXdTZXJ2aWNlUHJvdmlkZXIsXG4gICAgICAgIENvbW1hbmRlclNlcnZpY2VQcm92aWRlcixcbiAgICBdLFxuICAgIGxvY2FsZTogJ2VuJyxcbiAgICBicm93c2VyOiBicm93c2VyKCksXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZ09iamVjdDsiLCJ2YXIgUG9zdFJlcG9ydENvbW1hbmQgPSByZXF1aXJlKCdBcHAuQ29tbWFuZHMuUG9zdFJlcG9ydENvbW1hbmQnKTtcbnZhciBSZXRyaWV2ZUJsdWVsaWdodHNDb21tYW5kID0gcmVxdWlyZSgnQXBwLkNvbW1hbmRzLlJldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBhYnN0cmFjdDogJ3Bvc3RSZXBvcnRDb21tYW5kJyxcbiAgICAgICAgY29tbWFuZCA6IFBvc3RSZXBvcnRDb21tYW5kLFxuICAgIH0sXG4gICAge1xuICAgICAgICBhYnN0cmFjdDogJ3JldHJpZXZlQmx1ZWxpZ2h0c0NvbW1hbmQnLFxuICAgICAgICBjb21tYW5kIDogUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZCxcbiAgICB9LFxuXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnYXBwJzogICAgICAgICByZXF1aXJlKCcuL2FwcCcpLFxuICAgICdsb2NhbC5hcHAnOiAgIHJlcXVpcmUoJy4vbG9jYWwvYXBwJyksXG4gICAgJ3Rlc3RpbmcuYXBwJzogcmVxdWlyZSgnLi90ZXN0aW5nL2FwcCcpLFxuICAgICdjb21tYW5kcyc6ICAgIHJlcXVpcmUoJy4vY29tbWFuZHMnKSxcbiAgICAnaGFuZGxlcnMnOiAgICByZXF1aXJlKCcuL2hhbmRsZXJzJyksXG4gICAgJ3ZpZXdzJzogICAgICAgcmVxdWlyZSgnLi92aWV3cycpLFxufTtcbiIsInZhciBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCdBcHAuQ29tbWFuZHMuUG9zdFJlcG9ydENvbW1hbmRIYW5kbGVyJyk7XG52YXIgUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCdBcHAuQ29tbWFuZHMuUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAge1xuICAgICAgICBhYnN0cmFjdDogJ3Bvc3RSZXBvcnRDb21tYW5kSGFuZGxlcicsXG4gICAgICAgIGhhbmRsZXIgOiBQb3N0UmVwb3J0Q29tbWFuZEhhbmRsZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFic3RyYWN0OiAncmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXInLFxuICAgICAgICBoYW5kbGVyIDogUmV0cmlldmVCbHVlbGlnaHRzQ29tbWFuZEhhbmRsZXIsXG4gICAgfSxcbl07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuXHQvLyBhcGlCYXNlVXJsOiAnaHR0cDovL251aGVscC5hcGkvYXBpLycsXG5cdGFwaUJhc2VVcmw6ICdodHRwczovL2dvLmRvc2Eubm9ydGh3ZXN0ZXJuLmVkdS9udWhlbHBhcGkvYXBpLycsXG4gICAgZGVidWc6IHRydWUsXG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFxuICAgIGFwaUJhc2VVcmw6ICdodHRwOi8vbnVoZWxwLmFwaS9hcGkvJyxcbiAgICBicm93c2VyOiAnY29uc29sZScsXG59OyIsInZhciBJbnRyb1ZpZXcgPSByZXF1aXJlKCcuLi9hcHAvQnJvd3Nlci9WaWV3cy9JbnRyb1ZpZXcnKTtcbnZhciBNZW51VmlldyAgPSByZXF1aXJlKCcuLi9hcHAvQnJvd3Nlci9WaWV3cy9NZW51VmlldycpO1xudmFyIEFib3V0VmlldyAgPSByZXF1aXJlKCcuLi9hcHAvQnJvd3Nlci9WaWV3cy9BYm91dFZpZXcnKTtcbnZhciBTZXJ2aWNlVmlldyAgPSByZXF1aXJlKCcuLi9hcHAvQnJvd3Nlci9WaWV3cy9TZXJ2aWNlVmlldycpO1xuXG52YXIgbWVudVRlbXBsYXRlID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL2J1aWx0L21lbnUuaGJzJyk7XG52YXIgYWJvdXRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9idWlsdC9hYm91dC5oYnMnKTtcbnZhciBzZXJ2aWNlVGVtcGxhdGUgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvYnVpbHQvc2VydmljZS5oYnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG5cbiAgICB7XG4gICAgICAgICdhYnN0cmFjdCcgICAgOiAnaW50cm9WaWV3JyxcbiAgICAgICAgJyRjb25zdHJ1Y3Rvcic6IEludHJvVmlldyxcbiAgICAgICAgJ2J1aWxkJyAgICAgICA6ICdzaW5nbGV0b24nLFxuICAgICAgICAnYXJncycgICAgICAgIDogW10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdhYnN0cmFjdCcgICAgOiAnbWVudVZpZXcnLFxuICAgICAgICAnJGNvbnN0cnVjdG9yJzogTWVudVZpZXcsXG4gICAgICAgICdidWlsZCcgICAgICAgOiAnc2luZ2xldG9uJyxcbiAgICAgICAgJ2FyZ3MnICAgICAgICA6IFttZW51VGVtcGxhdGVdLFxuICAgIH0sXG4gICAge1xuICAgICAgICAnYWJzdHJhY3QnICAgIDogJ2Fib3V0VmlldycsXG4gICAgICAgICckY29uc3RydWN0b3InOiBBYm91dFZpZXcsXG4gICAgICAgICdidWlsZCcgICAgICAgOiAnc2luZ2xldG9uJyxcbiAgICAgICAgJ2FyZ3MnICAgICAgICA6IFthYm91dFRlbXBsYXRlXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2Fic3RyYWN0JyAgICA6ICdzZXJ2aWNlVmlldycsXG4gICAgICAgICckY29uc3RydWN0b3InOiBTZXJ2aWNlVmlldyxcbiAgICAgICAgJ2J1aWxkJyAgICAgICA6ICdzaW5nbGV0b24nLFxuICAgICAgICAnYXJncycgICAgICAgIDogW3NlcnZpY2VUZW1wbGF0ZV0sXG4gICAgfSxcbl07IiwiXG5jbGFzcyBDb21tYW5kQnVzIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cblxuICAgIGV4ZWN1dGUoY29tbWFuZCkge1xuXG4gICAgICAgIHZhciBjb21tYW5kTmFtZSA9IGNvbW1hbmQuY29uc3RydWN0b3IuZ2V0U2hvcnROYW1lKCk7XG4gICAgICAgIHZhciBoYW5kbGVyTmFtZSA9IGAke2NvbW1hbmROYW1lfUhhbmRsZXJgO1xuICAgICAgICB2YXIgaGFuZGxlciAgICAgPSB0aGlzLmFwcC5tYWtlKGhhbmRsZXJOYW1lKTtcblxuICAgICAgICByZXR1cm4gaGFuZGxlci5oYW5kbGUoY29tbWFuZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRCdXM7IiwidmFyIERpc3BhdGNoYWJsZVRyYWl0ID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuRXZlbnRzLkRpc3BhdGNoYWJsZVRyYWl0Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5oZWxwZXJzJyk7XG5cbmNsYXNzIENvbW1hbmRIYW5kbGVyIHtcblxuICAgIC8vIHVzZXMgRGlzcGF0Y2hhYmxlVHJhaXRcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cbn1cblxudmFyIHtleHRlbmRQcm90b09mfSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQ29tbWFuZEhhbmRsZXIsIERpc3BhdGNoYWJsZVRyYWl0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kSGFuZGxlcjsiLCJ2YXIge2xvZ30gICAgICAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBTZXJ2aWNlUHJvdmlkZXIgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuU2VydmljZVByb3ZpZGVyJyk7XG52YXIgQ29tbWFuZEJ1cyAgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5Db21tYW5kZXIuQ29tbWFuZEJ1cycpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkV2ZW50cy5FdmVudERpc3BhdGNoZXInKTtcblxuY2xhc3MgQ29tbWFuZFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyQ29tbWFuZEJ1cy5jYWxsKHRoaXMpO1xuICAgICAgICByZWdpc3RlckNvbW1hbmRzLmNhbGwodGhpcyk7XG4gICAgICAgIHJlZ2lzdGVySGFuZGxlcnMuY2FsbCh0aGlzKTtcbiAgICAgICAgcmVnaXN0ZXJFdmVudERpc3BhdGNoZXIuY2FsbCh0aGlzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tbWFuZEJ1cygpIHtcblxuICAgIHRoaXMuYXBwLmJpbmRTaGFyZWQoJ2NvbW1hbmRCdXMnLCBhcHAgPT4gbmV3IENvbW1hbmRCdXMoYXBwKSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckNvbW1hbmRzKCkge1xuXG4gICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICB2YXIgY29tbWFuZHMgPSBhcHAuY29uZmlnLmdldCgnY29tbWFuZHMnKTtcblxuICAgIGZvciAodmFyIHthYnN0cmFjdCwgY29tbWFuZH0gb2YgY29tbWFuZHMpIHtcbiAgICAgICAgXG4gICAgICAgIGFwcC5iaW5kKGFic3RyYWN0LCAoYXBwLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGNvbW1hbmQoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcnMoKSB7XG5cbiAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVycyA9IGFwcC5jb25maWcuZ2V0KCdoYW5kbGVycycpO1xuXG4gICAgZm9yICh2YXIge2Fic3RyYWN0LCBoYW5kbGVyfSBvZiBoYW5kbGVycykge1xuICAgICAgICBcbiAgICAgICAgYXBwLmJpbmRTaGFyZWQoYWJzdHJhY3QsIChhcHAsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgaGFuZGxlcihhcHAsIC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50RGlzcGF0Y2hlcigpIHtcblxuICAgIHZhciB7YXBwfSA9IHRoaXM7XG4gICAgdmFyIHtldmVudHMsIGxvZ2dlcn0gPSBhcHA7XG5cbiAgICBhcHAuYmluZCgnZXZlbnREaXNwYXRjaGVyJywgYXBwID0+IG5ldyBFdmVudERpc3BhdGNoZXIoZXZlbnRzLCBsb2dnZXIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21tYW5kU2VydmljZVByb3ZpZGVyOyIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgQ29tbWFuZGVyVHJhaXQge1xuXG4gICAgZXhlY3V0ZShjb21tYW5kLCBpbnB1dCkge1xuICAgIFx0XG4gICAgXHRsb2coYDo6ZXhlY3V0aW5nIGZyb20gY29tbWFuZGVyIHRyYWl0YCk7XG4gICAgICAgIHZhciBidXMgPSB0aGlzLmdldENvbW1hbmRCdXMoKTtcbiAgICAgICAgcmV0dXJuIGJ1cy5leGVjdXRlKGNvbW1hbmQpO1xuICAgIH1cbiAgICBnZXRDb21tYW5kQnVzKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5tYWtlKCdjb21tYW5kQnVzJyk7XG4gICAgfVxufVxuXG52YXIge2xvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1hbmRlclRyYWl0OyIsIlxuY2xhc3MgRGlzcGF0Y2hhYmxlVHJhaXQge1xuXG4gICAgZGlzcGF0Y2hFdmVudHNGb3IoZW50aXR5KSB7XG5cbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSB0aGlzLmdldERpc3BhdGNoZXIoKTtcbiAgICAgICAgdmFyIGV2ZW50cyAgICAgPSBlbnRpdHkucmVsZWFzZUV2ZW50cygpO1xuXG4gICAgICAgIGRpc3BhdGNoZXIuZGlzcGF0Y2goZXZlbnRzKTtcbiAgICB9XG4gICAgZ2V0RGlzcGF0Y2hlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcHAuZXZlbnREaXNwYXRjaGVyO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGFibGVUcmFpdDsiLCJcbmNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihldmVudHMsIGxvZykge1xuXG4gICAgICAgIHRoaXMuZXZlbnRzXyA9IGV2ZW50cztcbiAgICAgICAgdGhpcy5sb2dfICAgID0gbG9nO1xuICAgIH1cbiAgICBkaXNwYXRjaChldmVudHMpIHtcblxuICAgICAgICBmb3IgKHZhciBldmVudCBvZiBldmVudHMpIHtcblxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGdldEV2ZW50TmFtZS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzXy5lbWl0KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5sb2dfLmxvZyhgJHtldmVudE5hbWV9IHdhcyBmaXJlZC5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnROYW1lKGV2ZW50KSB7XG5cbiAgICByZXR1cm4gZXZlbnQuZ2V0TmFtZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjsiLCJcbmNsYXNzIEV2ZW50R2VuZXJhdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18gPSBbXTtcbiAgICB9XG5cbiAgICByYWlzZShldmVudCkge1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18ucHVzaChldmVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWxlYXNlRXZlbnRzKCkge1xuXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLnBlbmRpbmdFdmVudHNfO1xuXG4gICAgICAgIHRoaXMucGVuZGluZ0V2ZW50c18gPSBbXTtcblxuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEdlbmVyYXRvcjsiLCJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuLyphYnN0cmFjdCovIGNsYXNzIEV2ZW50TGlzdGVuZXIge1xuXG5cdGhhbmRsZShldmVudCkge1xuXG5cdFx0dmFyIGV2ZW50TmFtZSAgICA9IGV2ZW50LmdldE5hbWUoKTtcblx0XHR2YXIgc2hvcnROYW1lICAgID0gZ2V0U2hvcnRuYW1lKGV2ZW50TmFtZSk7XG5cdFx0dmFyIHRhcmdldE5hbWUgICA9IGdldFRhcmdldG5hbWUoc2hvcnROYW1lKTtcblx0XHR2YXIgaXNSZWdpc3RlcmVkID0gaXNGdW5jdGlvbiggdGhpc1t0YXJnZXROYW1lXSApO1xuXG5cdFx0aWYgKGlzUmVnaXN0ZXJlZCkgcmV0dXJuIHRoaXNbdGFyZ2V0TmFtZV0oZXZlbnQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFRhcmdldG5hbWUoc2hvcnROYW1lKSB7XG5cblx0c2hvcnROYW1lID0gdWNmaXJzdChzaG9ydE5hbWUpO1xuXHRyZXR1cm4gYG9uJHtzaG9ydE5hbWV9YDtcbn1cbmZ1bmN0aW9uIGdldFNob3J0bmFtZShldmVudE5hbWUpIHtcblxuXHRyZXR1cm4gbGFzdFNlZ21lbnQoZXZlbnROYW1lKTtcbn1cblxudmFyIHtpc0Z1bmN0aW9uLCBsb2csIHVjZmlyc3QsIGxhc3RTZWdtZW50fSA9IGhlbHBlcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRMaXN0ZW5lcjsiLCJ2YXIgc3RhdGUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcblxuY2xhc3MgTW9kdWxlTG9hZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ09iaiA9IHt9KSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8uY29uZmlnT2JqID0gY29uZmlnT2JqO1xuICAgIH1cblxuICAgIGxvYWQoZW52aXJvbm1lbnQsIGdyb3VwLCBuYW1lc3BhY2UgPSBudWxsKSB7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICAgICAgdmFyIGNvbmZpZ09iaiA9IF8uY29uZmlnT2JqO1xuICAgICAgICB2YXIgaXRlbXMgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5leGlzdHMoZ3JvdXApKSBpdGVtcyA9IGNvbmZpZ09ialtncm91cF07XG5cbiAgICAgICAgaWYgKGNvbmZpZ09ialtgJHtlbnZpcm9ubWVudH0uJHtncm91cH1gXSkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpdGVtcywgY29uZmlnT2JqW2Ake2Vudmlyb25tZW50fS4ke2dyb3VwfWBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtcztcblxuICAgIH1cbiAgICBleGlzdHMoZ3JvdXAsIG5hbWVzcGFjZSA9IG51bGwpIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIgY29uZmlnT2JqID0gXy5jb25maWdPYmo7XG5cbiAgICAgICAgaWYgKGNvbmZpZ09ialtncm91cF0pIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kdWxlTG9hZGVyOyIsInZhciBzdGF0ZSA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpXG5cbmNsYXNzIFJlcG9zaXRvcnkge1xuXG4gICAgY29uc3RydWN0b3IobG9hZGVyLCBlbnZpcm9ubWVudCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcywge30pO1xuICAgICAgICBfLmxvYWRlciA9IGxvYWRlcjtcbiAgICAgICAgXy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIH1cbiAgICBoYXMoKSB7XG5cbiAgICB9XG4gICAgZ2V0KGtleSwgZGVmYXVsdFZhbCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzKTtcbiAgICAgICAgdmFyIHtlbnZpcm9ubWVudH0gPSBfO1xuICAgICAgICB2YXIgW25hbWVzcGFjZSwgZ3JvdXAsIGl0ZW1dID0gcGFyc2VLZXkoa2V5KTtcblxuICAgICAgICB2YXIgaXRlbXMgPSBfLmxvYWRlci5sb2FkKGVudmlyb25tZW50LCBncm91cCwgbmFtZXNwYWNlKTtcblxuICAgICAgICBpZiAoICEgaXRlbSkgcmV0dXJuIGl0ZW1zO1xuXG4gICAgICAgIGlmIChpdGVtc1tpdGVtXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaXRlbXNbaXRlbV07XG5cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWw7XG4gICAgfVxuICAgIHNldCgpIHtcblxuICAgIH1cbn1cblxuLy8gcHJpdmF0ZSBmdW5jdGlvbnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gcGFyc2VLZXkoa2V5KSB7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBrZXkuc3BsaXQoJy4nKTtcblxuICAgIHJldHVybiBwYXJzZUJhc2ljU2VnbWVudHMoc2VnbWVudHMpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUJhc2ljU2VnbWVudHMoc2VnbWVudHMpIHtcblxuICAgIHZhciBncm91cCA9IHNlZ21lbnRzWzBdO1xuXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gW251bGwsIGdyb3VwLCBudWxsXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW251bGwsIGdyb3VwLCBzZWdtZW50c1sxXV07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9zaXRvcnk7IiwidmFyIHN0YXRlICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5zdGF0ZScpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBoZWxwZXJzICAgICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xuXG5jbGFzcyBDb250YWluZXIge1xuXG4gICAgLy8gdXNlIEV2ZW50RW1pdHRlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBcbiAgICAgICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdmFyIF8gPSBzdGF0ZSh0aGlzLCB7fSk7XG4gICAgICAgIF8uYmluZGluZ3MgPSB7fTtcbiAgICAgICAgXy5pbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgLy8gT2JqZWN0Lm9ic2VydmUoc3RhdGUodGhpcyksIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgbWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XG5cbiAgICAgICAgLy8gaWYgKHN0YXRlLmluc3RhbmNlc1thYnN0cmFjdF0pIHJldHVybiBzdGF0ZS5pbnN0YW5jZXNbYWJzdHJhY3RdO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3YXMgbm90IGFuIGluc3RhbmNlJyk7XG5cbiAgICAgICAgdmFyIGNvbmNyZXRlID0gdGhpcy5nZXRDb25jcmV0ZShhYnN0cmFjdCk7XG4gICAgICAgIHZhciBvYmplY3QgICA9IGNvbmNyZXRlKHRoaXMsIC4uLnBhcmFtZXRlcnMpO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLmlzU2hhcmVkKGFic3RyYWN0KSkge1xuICAgICAgICAvLyAgICAgc3RhdGUuaW5zdGFuY2VzW2Fic3RyYWN0XSA9IG9iamVjdDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGJpbmQoYWJzdHJhY3QsIGNvbmNyZXRlID0gbnVsbCwgc2hhcmVkID0gZmFsc2UpIHtcblxuICAgICAgICB2YXIgdHlwZSA9ICdiaW5kJztcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XG5cbiAgICAgICAgc3RhdGUodGhpcykuYmluZGluZ3NbYWJzdHJhY3RdID0ge2NvbmNyZXRlLCBzaGFyZWR9O1xuICAgICAgICB0aGlzLm1ha2VBY2Nlc3NvclByb3BlcnR5KGFic3RyYWN0KTtcblxuICAgICAgICB0aGlzLmVtaXQoYGJpbmQuJHthYnN0cmFjdH1gLCBcbiAgICAgICAgICAgIG5vUHJvdG8oe3R5cGU6IGAke3R5cGV9LiR7YWJzdHJhY3R9YCwgdGFyZ2V0LCBhYnN0cmFjdCwgc2hhcmVkfSlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW1pdCgnYmluZCcsIFxuICAgICAgICAgICAgbm9Qcm90byh7dHlwZSwgdGFyZ2V0LCBhYnN0cmFjdCwgc2hhcmVkfSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgYmluZFNoYXJlZChhYnN0cmFjdCwgY29uY3JldGUsIC4uLmFyZ3MpIHtcblxuICAgICAgICBpZiAoaXNBcnJheShhYnN0cmFjdCkpIHtcbiAgICAgICAgICAgIGZvciAodmFyICRhcmdzIG9mIGFic3RyYWN0KSB0aGlzLmJpbmRTaGFyZWQoLi4uJGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kKGFic3RyYWN0LCB0aGlzLnNoYXJlKGFic3RyYWN0LCBjb25jcmV0ZSwgLi4uYXJncyksIHRydWUpO1xuICAgIH1cbiAgICBnZXRDb25jcmV0ZShhYnN0cmFjdCkge1xuXG4gICAgICAgIHJldHVybiBzdGF0ZSh0aGlzKS5iaW5kaW5nc1thYnN0cmFjdF0uY29uY3JldGU7XG4gICAgfVxuICAgIGlzU2hhcmVkKGFic3RyYWN0KSB7XG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG5cbiAgICAgICAgaWYgKF8uaW5zdGFuY2VzW2Fic3RyYWN0XSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKF8uYmluZGluZ3NbYWJzdHJhY3RdKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuYmluZGluZ3NbYWJzdHJhY3RdLnNoYXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0QmluZGluZ3MoKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMpLmJpbmRpbmdzO1xuICAgIH1cbiAgICBnZXRCaW5kaW5nc0tleXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIGtleXModGhpcy5nZXRCaW5kaW5ncygpKTtcbiAgICB9XG4gICAgbmV3SW5zdGFuY2VPZihhYnN0cmFjdCwgaW5zdGFudGlhYmxlLCAuLi5hcmdzKSB7XG5cbiAgICAgICAgdGhpcy5iaW5kKGFic3RyYWN0LCBmdW5jdGlvbihhcHApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgaW5zdGFudGlhYmxlKC4uLmFyZ3MpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICAgIHNpbmdsZXRvbihhYnN0cmFjdCwgaW5zdGFudGlhYmxlLCAuLi5hcmdzKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJpbmRTaGFyZWQoYWJzdHJhY3QsIGFwcCA9PiBuZXcgaW5zdGFudGlhYmxlKC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgc2hhcmUoYWJzdHJhY3QsIGZ1bmMsIC4uLmFyZ3MpIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMpO1xuICAgICAgICB2YXIge2luc3RhbmNlc30gPSBfOyBcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgICAgICAgICAvLyBpZiAoYWJzdHJhY3QgPT09ICdpbnRyb1ZpZXcnKSBkZWJ1Z2dlcjtcbiAgICAgICAgICAgIHZhciBvYmogPSBpbnN0YW5jZXNbYWJzdHJhY3RdO1xuICAgICAgICAgICAgaWYgKG9iaikgcmV0dXJuIG9iajtcblxuICAgICAgICAgICAgb2JqID0gZnVuYyhjb250YWluZXIsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgaW5zdGFuY2VzW2Fic3RyYWN0XSA9IG9iajtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZvcmdldEluc3RhbmNlKGFic3RyYWN0KSB7XG5cbiAgICAgICAgZGVsZXRlIHN0YXRlKHRoaXMpLmluc3RhbmNlc1thYnN0cmFjdF07XG4gICAgfVxuICAgIG1ha2VBY2Nlc3NvclByb3BlcnR5KGFic3RyYWN0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuYWJzdHJhY3QpIHJldHVybjtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgYWJzdHJhY3QsIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4gdGhpcy5tYWtlKGFic3RyYWN0KSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuXG4gICAgICAgIGNvbnNvbGUuZGlyKHN0YXRlKTtcbiAgICAgICAgLy8gcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBnZXRJdGVtcygpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmdldEJpbmRpbmdzS2V5cygpO1xuICAgIH1cbiAgICBmb3JFYWNoKGNiLCBjb250ZXh0KSB7XG5cbiAgICAgICAgY29udGV4dCA9IGRlZmluZWQoY29udGV4dCwgdGhpcyk7XG5cbiAgICAgICAgLy8gYmUgc3VyZSB0aGlyZCBhcmd1bWVudCBpcyB0aGlzIGNvbGxlY3Rpb24sIG5vdCBpdHMgYXJyYXk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYXAoY2IsIGNvbnRleHQpIHtcblxuICAgICAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuICAgICAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoKS5tYXAoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmlsdGVyKGNiLCBjb250ZXh0KSB7XG5cbiAgICAgICAgY29udGV4dCA9IGRlZmluZWQoY29udGV4dCwgdGhpcyk7XG5cbiAgICAgICAgLy8gYmUgc3VyZSB0aGlyZCBhcmd1bWVudCBpcyB0aGlzIGNvbGxlY3Rpb24sIG5vdCBpdHMgYXJyYXk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkuZmlsdGVyKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEl0ZXJhdG9yKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGFycmF5SXRlcmF0b3IodGhpcy5nZXRJdGVtcygpKTtcbiAgICB9XG59XG5cbnZhciB7XG5cbiAgICBrZXlzLCBcbiAgICBpbXBsZW1lbnRJdGVyYXRvciwgXG4gICAgaXNVbmRlZmluZWQsXG4gICAgaXNEZWZpbmVkLFxuICAgIGRlZmluZWQsXG4gICAgYXJyYXlJdGVyYXRvcixcbiAgICBleHRlbmRQcm90b09mLFxuICAgIG5vUHJvdG8sXG4gICAgaXNBcnJheSxcblxufSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQ29udGFpbmVyLCBFdmVudEVtaXR0ZXIpO1xuaW1wbGVtZW50SXRlcmF0b3IoQ29udGFpbmVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7IiwidmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcblxuY2xhc3MgV2luZG93U2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcblxuICAgIHJlZ2lzdGVyKCkge1xuICAgIFx0Ly8gc2VwYXJhdGUgb3V0IHRoaXMgYXMgU2hpbW1lZFdpbmRvdzpcblxuICAgICAgICB0aGlzLnNoaW1NYXRjaGVzKGdsb2JhbCk7XG4gICAgXHR0aGlzLnNoaW1SZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2xvYmFsKTtcbiAgICBcdFxuICAgICAgICB2YXIge2FwcH0gPSB0aGlzO1xuICAgICAgICBhcHAuYmluZFNoYXJlZCgnd2luZG93JywgYXBwID0+IGdsb2JhbCk7XG4gICAgfVxuICAgIHByb3ZpZGVzKCkge1xuXG4gICAgICAgIHJldHVybiBbJ3dpbmRvdyddO1xuICAgIH1cbiAgICBzaGltTWF0Y2hlcyhnbG9iYWwpIHtcbiAgICBcdHZhciBcbiAgICBcdCAgICBFbGVtZW50UHJvdG8gPSBnbG9iYWwuRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICBcdGlmIChFbGVtZW50UHJvdG8ubWF0Y2hlcykgcmV0dXJuO1xuXG4gICAgXHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IFxuICAgIFx0ICAgIEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgXG4gICAgXHQgICAgICAgIEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgXG4gICAgXHQgICAgICAgICAgICBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgfVxuICAgIHNoaW1SZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2xvYmFsKSB7XG4gICAgICAgIC8vIHNlZSBjb21tZW50cyBpblxuICAgICAgICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuICAgICAgICAvLyBodHRwOi8vY3JlYXRpdmVqcy5jb20vcmVzb3VyY2VzL3JlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICAgICAgKGZ1bmN0aW9uICh3aW5kb3csIHJBRiwgY0FGKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFRpbWUgPSAwLCB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXSwgeDtcblxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3dbckFGXTsgKyt4KSB7XG4gICAgICAgICAgICAgICAgd2luZG93W3JBRl0gPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgICAgICB3aW5kb3dbY0FGXSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgXG4gICAgICAgICAgICAgICAgICAgICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdpbmRvd1t2ZW5kb3JzW3hdICsgXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvd1tyQUZdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZygnc2hpbVJlcXVlc3RBbmltYXRpb25GcmFtZSB1c2luZyAnK3ZlbmRvcnNbeF0rJyBwcmVmaXgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghd2luZG93W3JBRl0pIHtcbiAgICAgICAgICAgICAgICBsb2coJ3NoaW1SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdXNpbmcgc2V0VGltZW91dCcpO1xuICAgICAgICAgICAgICAgIHdpbmRvd1tyQUZdID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lVG9DYWxsKTtcblxuICAgICAgICAgICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF3aW5kb3dbY0FGXSkge1xuICAgICAgICAgICAgICAgIHdpbmRvd1tjQUZdID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oZ2xvYmFsLCAncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgJ2NhbmNlbEFuaW1hdGlvbkZyYW1lJykpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXaW5kb3dTZXJ2aWNlUHJvdmlkZXI7IiwiXG52YXIgZXJyb3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vZXJyb3JDb25zdHJ1Y3RvcicpO1xuXG52YXIgQXV0aGVudGljYXRpb25FcnJvciA9IGVycm9yQ29uc3RydWN0b3IoJ0F1dGhlbnRpY2F0aW9uRXJyb3InLCAnbm8gd2F5ISBhdXRoZW50aWNhdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0aGVudGljYXRpb25FcnJvcjsiLCJ2YXIgU2VydmljZVByb3ZpZGVyICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBWYWxpZGF0aW9uRXJyb3IgICAgID0gcmVxdWlyZSgnV2lsZGNhdC5FcnJvcnMuVmFsaWRhdGlvbkVycm9yJyk7XG52YXIgVGltZW91dEVycm9yICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLlRpbWVvdXRFcnJvcicpO1xudmFyIEF1dGhlbnRpY2F0aW9uRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5BdXRoZW50aWNhdGlvbkVycm9yJyk7XG52YXIgTmV0d29ya0Vycm9yICAgICAgICA9IHJlcXVpcmUoJ1dpbGRjYXQuRXJyb3JzLk5ldHdvcmtFcnJvcicpO1xuXG5jbGFzcyBFcnJvclNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcblxuICAgICAgICB0aGlzLmFwcC5iaW5kU2hhcmVkKFtcbiAgICAgICAgICAgIFsnVmFsaWRhdGlvbkVycm9yJywgICAgICgpID0+IFZhbGlkYXRpb25FcnJvcl0sXG4gICAgICAgICAgICBbJ0F1dGhlbnRpY2F0aW9uRXJyb3InLCAoKSA9PiBBdXRoZW50aWNhdGlvbkVycm9yXSxcbiAgICAgICAgICAgIFsnTmV0d29ya0Vycm9yJywgICAgICAgICgpID0+IE5ldHdvcmtFcnJvcl0sXG4gICAgICAgICAgICBbJ1RpbWVvdXRFcnJvcicsICAgICAgICAoKSA9PiBUaW1lb3V0RXJyb3JdLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgcHJvdmlkZXMoKSB7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdWYWxpZGF0aW9uRXJyb3InLCBcbiAgICAgICAgICAgICdBdXRoZW50aWNhdGlvbkVycm9yJywgXG4gICAgICAgICAgICAnTmV0d29ya0Vycm9yJywgXG4gICAgICAgICAgICAnVGltZW91dEVycm9yJ1xuICAgICAgICBdO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFcnJvclNlcnZpY2VQcm92aWRlcjsiLCJcblxudmFyIGVycm9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL2Vycm9yQ29uc3RydWN0b3InKTtcblxudmFyIE5ldHdvcmtFcnJvciA9IGVycm9yQ29uc3RydWN0b3IoJ05ldHdvcmtFcnJvcicsICduZXR3b3JrIHByb2JsZW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOZXR3b3JrRXJyb3I7IiwiXG52YXIgZXJyb3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vZXJyb3JDb25zdHJ1Y3RvcicpO1xuXG52YXIgVGltZW91dEVycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignVGltZW91dEVycm9yJywgJ3RpbWVvdXQgZXJyb3IgaGFwcGVuZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lb3V0RXJyb3I7IiwiXG52YXIgZXJyb3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vZXJyb3JDb25zdHJ1Y3RvcicpO1xuXG52YXIgVmFsaWRhdGlvbkVycm9yID0gZXJyb3JDb25zdHJ1Y3RvcignVmFsaWRhdGlvbkVycm9yJywgJ25vIHdheSEgdmFsaWRhdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsaWRhdGlvbkVycm9yOyIsInZhciAkRXJyb3IgPSBFcnJvcjtcbnZhciB7aXNBcnJheX0gPSBBcnJheTtcbnZhciB7a2V5cywgZGVmaW5lUHJvcGVydGllc30gPSBPYmplY3Q7XG5cbmZ1bmN0aW9uIG5vbkVudW0ob2JqZWN0cykge1xuXG4gICAgdmFyIHdyaXRhYmxlID0gdHJ1ZTtcbiAgICB2YXIgZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgIHZhciBjb25maWd1cmFibGUgPSB0cnVlO1xuXG4gICAgb2JqZWN0cyA9IGlzQXJyYXkob2JqZWN0cykgPyBvYmplY3RzIDogW29iamVjdHNdO1xuICAgIFxuICAgIHJldHVybiBvYmplY3RzLnJlZHVjZSgocmVzdWx0LCBvYmplY3QpID0+IHtcbiAgICAgICAgdmFyIGtleSAgICAgPSBrZXlzKG9iamVjdClbMF07XG4gICAgICAgIHZhciB2YWx1ZSAgID0gb2JqZWN0W2tleV07XG4gICAgICAgIHJlc3VsdFtrZXldID0ge3ZhbHVlLCB3cml0YWJsZSwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBhZGRTdGFja1RvT2JqZWN0KG9iamVjdCwgQ3VzdG9tRXJyb3IpIHtcblxuICAgIHZhciB7Y2FwdHVyZVN0YWNrVHJhY2V9ID0gJEVycm9yO1xuXG4gICAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avdjgvd2lraS9KYXZhU2NyaXB0U3RhY2tUcmFjZUFwaVxuICAgIGlmIChjYXB0dXJlU3RhY2tUcmFjZSkge2NhcHR1cmVTdGFja1RyYWNlKG9iamVjdCwgQ3VzdG9tRXJyb3IpO30gXG4gICAgZWxzZSB7b2JqZWN0LnN0YWNrID0gKG5ldyAkRXJyb3IpLnN0YWNrIHx8ICcnO31cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5mdW5jdGlvbiBlcnJvckNvbnN0cnVjdG9yKG5hbWUgPSAnQ3VzdG9tRXJyb3InLCBtZXNzYWdlID0gJycpIHtcblxuICAgIGNsYXNzIEN1c3RvbUVycm9yIGV4dGVuZHMgJEVycm9yIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cbiAgICAgICAgICAgIC8vIHNob3VsZCBub3QgY2FsbCBwYXJlbnQncyBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXModGhpcywgbm9uRW51bSh7bWVzc2FnZX0pKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRTdGFja1RvT2JqZWN0KHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnRpZXMoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBub25FbnVtKFt7bmFtZX0sIHttZXNzYWdlfV0pKTtcbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXJyb3JDb25zdHJ1Y3RvcjsiLCJcbi8vIHZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIge0V2ZW50RW1pdHRlcjJ9ID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMicpO1xudmFyIHsvKmV4dGVuZFByb3RvT2YsICovaXNTdHJpbmd9ID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgRGlzcGF0Y2hlciBleHRlbmRzIEV2ZW50RW1pdHRlcjIge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmFwcF8gPSBvcHRpb25zLmFwcDtcbiAgICAgICAgRXZlbnRFbWl0dGVyMi5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcikge1xuICAgICAgICBzdWJzY3JpYmVyID0gcmVzb2x2ZVN1YnNjcmliZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgc3Vic2NyaWJlci5zdWJzY3JpYmUodGhpcyk7XG4gICAgfVxufVxuLy8gZXh0ZW5kUHJvdG9PZihEaXNwYXRjaGVyLCBFdmVudEVtaXR0ZXIpO1xuXG5mdW5jdGlvbiByZXNvbHZlU3Vic2NyaWJlcihzdWJzY3JpYmVyKSB7XG5cbiAgICBpZiAoaXNTdHJpbmcoc3Vic2NyaWJlcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwX1tzdWJzY3JpYmVyXTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnNjcmliZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjsgIiwidmFyIENvbnRhaW5lciAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvQ29udGFpbmVyL0NvbnRhaW5lcicpO1xudmFyIENvbmZpZyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvQ29uZmlnL1JlcG9zaXRvcnknKTtcbnZhciBNb2R1bGVMb2FkZXIgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0NvbmZpZy9Nb2R1bGVMb2FkZXInKTtcbnZhciBEaXNwYXRjaGVyICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L0V2ZW50cy9EaXNwYXRjaGVyJyk7XG52YXIgc3RhcnQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Gb3VuZGF0aW9uL3N0YXJ0Jyk7XG52YXIgUHJvdmlkZXJSZXBvc2l0b3J5ID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9Gb3VuZGF0aW9uL1Byb3ZpZGVyUmVwb3NpdG9yeScpO1xudmFyIENvbW1hbmRlclRyYWl0ICAgICA9IHJlcXVpcmUoJy4uLy4uL1dpbGRjYXQvQ29tbWFuZGVyL0NvbW1hbmRlclRyYWl0Jyk7XG52YXIgaGVscGVycyAgICAgICAgICAgID0gcmVxdWlyZSgnLi4vLi4vV2lsZGNhdC9TdXBwb3J0L2hlbHBlcnMnKTtcblxudmFyIGNvbmZpZyAgICAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2NvbmZpZy9jb25maWcnKTtcbnZhciB7dmFsdWV9ICAgICAgPSByZXF1aXJlKCcuLi8uLi9XaWxkY2F0L1N1cHBvcnQvaGVscGVycycpO1xudmFyIHN0YXRlICAgICAgICA9IHt9O1xuXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIENvbnRhaW5lciB7XG5cbiAgICBkZXRlY3RFbnZpcm9ubWVudChlbnYpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUuZW52ID0gdmFsdWUoZW52KTtcbiAgICB9XG4gICAgaXNMb2NhbCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnZpcm9ubWVudCgnbG9jYWwnKTtcbiAgICB9XG4gICAgZW52aXJvbm1lbnQoLi4uYXJncykge1xuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MuaW5kZXhPZihzdGF0ZS5lbnYpICE9PSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5lbnY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q29uZmlnTG9hZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgTW9kdWxlTG9hZGVyKGNvbmZpZyk7XG4gICAgfVxuICAgIHJlZ2lzdGVyQ29yZUNvbnRhaW5lckJpbmRpbmdzKCkge1xuXG4gICAgICAgIHZhciBhcHAgPSB0aGlzO1xuICAgICAgICB2YXIgY29uZmlnTG9hZGVyID0gYXBwLmdldENvbmZpZ0xvYWRlcigpO1xuICAgICAgICB2YXIgZW52aXJvbm1lbnQgID0gYXBwLmVudmlyb25tZW50KCk7XG5cbiAgICAgICAgdmFyIGRpc3BhdGNoZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgYXBwLFxuICAgICAgICAgICAgbmV3TGlzdGVuZXI6IHRydWUsXG4gICAgICAgICAgICB3aWxkY2FyZDogdHJ1ZSxcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcC5iaW5kU2hhcmVkKFtcbiAgICAgICAgICAgIFsnY29uZmlnJywgYXBwID0+IG5ldyBDb25maWcoY29uZmlnTG9hZGVyLCBlbnZpcm9ubWVudCldLFxuICAgICAgICAgICAgWydldmVudHMnLCBhcHAgPT4gbmV3IERpc3BhdGNoZXIoZGlzcGF0Y2hlck9wdGlvbnMpXSxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGdldFByb3ZpZGVyUmVwb3NpdG9yeSgpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3ZpZGVyUmVwb3NpdG9yeSgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgbG9nKCc6OmFwcCBzdGFydGluZyEnKTtcbiAgICAgICAgc3RhcnQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICBsb2coYCNydW4gRm91bmRhdGlvbiBBcHBsaWNhdGlvbmApO1xuICAgICAgICBsb2coJzo6YXBwIHJ1bm5pbmcyIScpO1xuICAgIH1cbiAgICByZWdpc3Rlcihwcm92aWRlcikge1xuXG4gICAgICAgIHByb3ZpZGVyLnJlZ2lzdGVyKCk7XG4gICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICB9XG59XG5cbnZhciB7ZXh0ZW5kUHJvdG9PZiwgbG9nfSA9IGhlbHBlcnM7XG5cbmV4dGVuZFByb3RvT2YoQXBwbGljYXRpb24sIENvbW1hbmRlclRyYWl0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvbjsiLCJcbmNsYXNzIFByb3ZpZGVyUmVwb3NpdG9yeSB7XG5cbiAgICBsb2FkKGFwcCwgcHJvdmlkZXJzKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBwcm92aWRlciBvZiBwcm92aWRlcnMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXBwLnJlZ2lzdGVyKHRoaXMuY3JlYXRlUHJvdmlkZXIoYXBwLCBwcm92aWRlcikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVByb3ZpZGVyKGFwcCwgcHJvdmlkZXIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IHByb3ZpZGVyKGFwcCk7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvdmlkZXJSZXBvc2l0b3J5OyIsInZhciBDb25maWcgPSByZXF1aXJlKCdXaWxkY2F0LkNvbmZpZy5SZXBvc2l0b3J5Jyk7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXG4gICAgdmFyIGFwcCAgICA9IHRoaXM7XG4gICAgdmFyIGVudiAgICA9IGFwcC5lbnZpcm9ubWVudCgpO1xuXG4gICAgYXBwLmJpbmRTaGFyZWQoJ2FwcCcsICgpID0+IGFwcCk7XG4gICAgYXBwLnJlZ2lzdGVyQ29yZUNvbnRhaW5lckJpbmRpbmdzKCk7XG5cbiAgICB2YXIge2NvbmZpZ30gPSBhcHA7XG4gICAgdmFyIHtwcm92aWRlcnN9ID0gY29uZmlnLmdldCgnYXBwJyk7XG4gICAgXG4gICAgYXBwLmdldFByb3ZpZGVyUmVwb3NpdG9yeSgpLmxvYWQoYXBwLCBwcm92aWRlcnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0OyIsInZhciBUaW1lb3V0RXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5UaW1lb3V0RXJyb3InKTtcbnZhciBOZXR3b3JrRXJyb3IgPSByZXF1aXJlKCdXaWxkY2F0LkVycm9ycy5OZXR3b3JrRXJyb3InKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcblxuY2xhc3MgWEhSTG9hZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFhNTEh0dHBSZXF1ZXN0KSB7XG5cbiAgICAgICAgdGhpcy5YaHJfID0gWE1MSHR0cFJlcXVlc3QgfHwgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0O1xuICAgIH1cbiAgICBzZW5kKG1ldGhvZCwge3VybCwgdGltZW91dCA9IDUwMDAsIGhlYWRlcnMgPSB7fSwgcmVzcG9uc2VUeXBlID0gJ2pzb24nfSkge1xuICAgICAgICBsb2coYDo6IHhocmxvYWRlci5zZW5kYCk7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgdGhpcy5YaHJfKCk7XG5cbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgICAgIGxvZyhgOjogeGhybG9hZGVyLnNlbmQtcHJvbWlzZWApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVudHJpZXMoaGVhZGVycykuZm9yRWFjaChlbnRyeSA9PiB4aHIuc2V0UmVxdWVzdEhlYWRlciguLi5lbnRyeSkpO1xuXG4gICAgICAgICAgICBsb2coYDo6IHhocmxvYWRlci54aHItYmVmb3JlLWVhc3NpZ25gKTtcblxuICAgICAgICAgICAgLy8gc2V0dGluZyByZXNwb25zZVR5cGUgYnJlYWtzIGFuZHJvaWQgYXQgbGVhc3QgPD0gNC4zXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFzc2lnbih4aHIsIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLCByZWplY3QsXG4gICAgICAgICAgICAgICAgLypyZXNwb25zZVR5cGUsKi8gdGltZW91dCwgXG4gICAgICAgICAgICAgICAgb25sb2FkOiBvbmxvYWQuYmluZCh0aGlzKSwgXG4gICAgICAgICAgICAgICAgb250aW1lb3V0OiBvbnRpbWVvdXQuYmluZCh0aGlzKSwgXG4gICAgICAgICAgICAgICAgb25lcnJvcjogb25lcnJvci5iaW5kKHRoaXMpLCBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiBcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwgPSB4aHIuYWJvcnQuYmluZCh4aHIpO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBnZXQoLi4uYXJncykge1xuICAgICAgICBsb2coYDo6IHhocmxvYWRlci5nZXRgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZCgnR0VUJywgLi4uYXJncyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbmxvYWQoe3RhcmdldDogeGhyfSkge1xuICAgIFxuICAgIHZhciB7cmVzcG9uc2UsIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzb2x2ZX0gPSB4aHI7XG5cbiAgICB2YXIgd2FudHNKc29uID0gXG4gICAgICAgICh4aHIucmVzcG9uc2VUeXBlICA9PT0gJ2pzb24nKSAgfHwgXG4gICAgICAgICh0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nKTtcblxuICAgIGlmIChpc1N0cmluZyhyZXNwb25zZSkgJiYgd2FudHNKc29uKSByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuXG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG59XG5mdW5jdGlvbiBvbnRpbWVvdXQoe3RhcmdldDoge3JlamVjdH19KSB7XG5cbiAgICB2YXIgdGltZW91dEVycm9yID0gbmV3IFRpbWVvdXRFcnJvcigpO1xuICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xufVxuZnVuY3Rpb24gb25lcnJvcih7dGFyZ2V0OiB4aHJ9KSB7XG4gICAgXG4gICAgdmFyIHtyZXNwb25zZSwgc3RhdHVzLCByZWplY3R9ID0geGhyO1xuXG4gICAgLy8gY3VlIG9mIHN0YXR1cyBudW1iZXIsIGFuZCBtZXNzYWdlIG9uIHJlc3BvbnNlXG5cbiAgICB2YXIgbmV0d29ya0Vycm9yID0gbmV3IE5ldHdvcmtFcnJvcigpO1xuICAgIHJlamVjdChuZXR3b3JrRXJyb3IpO1xufVxuXG52YXIge2xvZywgZXJyb3IsIGlzU3RyaW5nLCBhc3NpZ24sIGVudHJpZXN9ID0gaGVscGVycztcblxubW9kdWxlLmV4cG9ydHMgPSBYSFJMb2FkZXI7IiwidmFyIHN0YXRlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG5cbmNsYXNzIENvbnNvbGVMb2dnZXIgLyppbXBsZW1lbnRzICdXaWxkY2F0LkNvbnRyYWN0cy5Mb2cnKi8ge1xuXG4gICAgY29uc3RydWN0b3IoJHdpbmRvdyA9IGdsb2JhbCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcywge30pO1xuICAgICAgICBfLndpbmRvdyA9ICR3aW5kb3c7XG4gICAgICAgIF8uY29uc29sZSA9ICR3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdGF0ZSh0aGlzKS5jb25zb2xlLmxvZyguLi5hcmdzKVxuICAgIH1cbiAgICBlcnJvciguLi5hcmdzKSB7XG5cbiAgICAgICAgc3RhdGUodGhpcykuY29uc29sZS5lcnJvciguLi5hcmdzKTtcbiAgICB9XG4gICAgZGlyKC4uLmFyZ3MpIHtcblxuICAgICAgICBzdGF0ZSh0aGlzKS5jb25zb2xlLmRpciguLi5hcmdzKTtcbiAgICB9XG4gICAgZ2V0IHN0YXRlXygpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcyk7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uc29sZUxvZ2dlcjsiLCJ2YXIgU2VydmljZVByb3ZpZGVyID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcicpO1xudmFyIENvbnNvbGVMb2dnZXIgICA9IHJlcXVpcmUoJ1dpbGRjYXQuTG9nLkNvbnNvbGVMb2dnZXInKTtcblxuY2xhc3MgTG9nU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcbiBcbiAgICByZWdpc3RlcigpIHtcblxuICAgICAgICB0aGlzLmFwcC5zaW5nbGV0b24oJ2xvZ2dlcicsIENvbnNvbGVMb2dnZXIpO1xuICAgIH1cbiAgICBwcm92aWRlcygpIHtcblxuICAgICAgICByZXR1cm4gWydsb2cnXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nU2VydmljZVByb3ZpZGVyOyIsIi8vIENvbGxlY3Rpb24uanNcblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuY2xhc3MgQ29sbGVjdGlvbiB7XG5cblx0Y29uc3RydWN0b3IoaXRlbXMpIHtcblxuXHRcdGlmICggISBpc0FycmF5KGl0ZW1zKSkge1xuXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdjb2xsZWN0aW9uIG9iamVjdCBtdXN0IGJlIGNyZWF0ZWQgd2l0aCBhbiBhcnJheScpO1xuXHRcdH1cblxuXHRcdHRoaXMuaXRlbXNfID0gaXRlbXM7XG5cdFx0XG5cdH1cblx0Z2V0SXRlbXMoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5pdGVtc187XG5cdH1cblx0Zm9yRWFjaChjYiwgY29udGV4dCkge1xuXG5cdCAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuXHQgICAgLy8gYmUgc3VyZSB0aGlyZCBhcmd1bWVudCBpcyB0aGlzIGNvbGxlY3Rpb24sIG5vdCBpdHMgYXJyYXk7XG5cdCAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcblx0ICAgICAgICByZXR1cm4gY2IuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCB0aGlzKTtcblx0ICAgIH0pO1xuXHR9XG5cdGZpbHRlcihjYiwgY29udGV4dCkge1xuXG5cdCAgICBjb250ZXh0ID0gZGVmaW5lZChjb250ZXh0LCB0aGlzKTtcblxuXHQgICAgLy8gYmUgc3VyZSB0aGlyZCBhcmd1bWVudCBpcyB0aGlzIGNvbGxlY3Rpb24sIG5vdCBpdHMgYXJyYXk7XG5cdCAgICByZXR1cm4gdGhpcy5nZXRJdGVtcygpLmZpbHRlcigodmFsdWUsIGtleSkgPT4ge1xuXHQgICAgICAgIHJldHVybiBjYi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIHRoaXMpO1xuXHQgICAgfSk7XG5cdH1cblx0bWFwKGNiLCBjb250ZXh0KSB7XG5cblx0ICAgIGNvbnRleHQgPSBkZWZpbmVkKGNvbnRleHQsIHRoaXMpO1xuXG5cdCAgICAvLyBiZSBzdXJlIHRoaXJkIGFyZ3VtZW50IGlzIHRoaXMgY29sbGVjdGlvbiwgbm90IGl0cyBhcnJheTtcblx0ICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKCkubWFwKCh2YWx1ZSwga2V5KSA9PiB7XG5cdCAgICAgICAgcmV0dXJuIGNiLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgdGhpcyk7XG5cdCAgICB9KTtcblx0fVxuXHR0b0pzb24oKSB7XG5cblx0XHR2YXIgaXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGl0ZW1zKTtcblx0fVxuXHRnZXQgbGVuZ3RoKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuaXRlbXNfLmxlbmd0aDtcblx0fVxufVxuXG52YXIge2lzQXJyYXksIGRlZmluZWR9ID0gaGVscGVycztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb247IiwidmFyIHN0YXRlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LnN0YXRlJyk7XG5cbmNsYXNzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcblxuICAgICAgICB2YXIgXyA9IHN0YXRlKHRoaXMsIHt9KTtcbiAgICAgICAgXy5hcHAgPSBhcHA7XG4gICAgfVxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gYWJzdHJhY3RcbiAgICB9XG4gICAgZ2V0IGFwcCgpIHtcblxuICAgICAgICByZXR1cm4gc3RhdGUodGhpcykuYXBwO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlUHJvdmlkZXI7IiwiXG52YXIgJGNvbnNvbGUgICAgPSBnbG9iYWwuY29uc29sZTtcbnZhciBzZXRUaW1lb3V0ID0gZ2xvYmFsLnNldFRpbWVvdXQ7XG52YXIgY2xlYXJUaW1lb3V0ID0gZ2xvYmFsLmNsZWFyVGltZW91dDtcblxuLy8gT2JqZWN0XG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuXG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIG9iamVjdC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICB9KTsgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdCk7XG59XG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0ID0ge30pIHtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBvYmplY3QuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIGtleXMob2JqZWN0KS5tYXAoa2V5ID0+IG9iamVjdFtrZXldKTtcbn1cbmZ1bmN0aW9uIGVudHJpZXMob2JqZWN0ID0ge30pIHtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBvYmplY3QuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSk7XG59XG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cbiAgICB2YXIgc291cmNlLCB0ZW1wLCBwcm9wcywgcHJvcDtcblxuICAgIGZvciAoc291cmNlIG9mIHNvdXJjZXMpIHtcblxuICAgICAgICBpZiAoIGlzQXJyYXkoc291cmNlKSApIHtcblxuICAgICAgICAgICAgdGVtcCA9IHt9O1xuICAgICAgICAgICAgW3NvdXJjZSwgLi4ucHJvcHNdID0gc291cmNlO1xuICAgICAgICAgICAgZm9yIChwcm9wIG9mIHByb3BzKSB0ZW1wW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICAgICAgYXNzaWduKHRhcmdldCwgdGVtcCk7XG5cbiAgICAgICAgfSBlbHNlIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuXG4gICAgLy8gcmV0dXJuIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZFByb3RvT2YodGFyZ2V0LCBzb3VyY2UsIGtleSA9IFtdKSB7XG5cbiAgICBpZiAoaXNTdHJpbmcoa2V5KSkge1xuICAgICAgICB0YXJnZXQucHJvdG90eXBlW2tleV0gPSBzb3VyY2UucHJvdG90eXBlW2tleV07XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgdmFyIHNvdXJjZUtleXMgPSBrZXlzKHNvdXJjZS5wcm90b3R5cGUpO1xuICAgIGZvciAodmFyIGtleSBvZiBzb3VyY2VLZXlzKSB7XG4gICAgICAgIHRhcmdldC5wcm90b3R5cGVba2V5XSA9IHNvdXJjZS5wcm90b3R5cGVba2V5XTsgICBcbiAgICB9XG59XG5mdW5jdGlvbiBpbXBsZW1lbnRJdGVyYXRvcihzb3VyY2VDbGFzcykge1xuXG4gICAgdmFyICRwcm90b3R5cGUgPSBzb3VyY2VDbGFzcy5wcm90b3R5cGU7XG4gICAgJHByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gJHByb3RvdHlwZS5nZXRJdGVyYXRvcjtcbn1cbmZ1bmN0aW9uIHZhbHVlKHZhbCkge1xuXG4gICAgcmV0dXJuICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSA/IHZhbCgpIDogdmFsO1xufVxuZnVuY3Rpb24gaXNOdWxsKHZhbCkge1xuXG4gICAgcmV0dXJuIHZhbCA9PT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcblxuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG5cbiAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc0RlZmluZWQodmFsKSB7XG5cbiAgICByZXR1cm4gKCAhIGlzVW5kZWZpbmVkKHZhbCkpO1xufVxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcblxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG59XG5mdW5jdGlvbiBkZWZpbmVkKHZhbCwgJGRlZmF1bHQpIHtcblxuICAgIHJldHVybiBpc0RlZmluZWQodmFsKSA/IHZhbCA6ICRkZWZhdWx0O1xufVxuZnVuY3Rpb24gd2FpdCh0aW1lID0gNTAwLCAuLi5hcmdzKSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKC4uLmFyZ3MpO1xuICAgICAgICB9LCB0aW1lKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGxvZyguLi5hcmdzKSB7XG5cbiAgICB2YXIge2RvY3VtZW50fSA9IGdsb2JhbDtcblxuICAgIGlmIChcbiAgICAgICAgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykgJiYgXG4gICAgICAgIChhcmdzWzBdLnN0YXJ0c1dpdGgoJzo6JykpICYmXG4gICAgICAgIChkb2N1bWVudClcbiAgICApIHtcbiAgICAgICAgdmFyIHtib2R5fSAgID0gZG9jdW1lbnQ7XG4gICAgICAgIHZhciBvdXRwdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ291dHB1dC5sb2cnKTtcblxuICAgICAgICBpZiAoICEgb3V0cHV0RWwpIHtcbiAgICAgICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxvdXRwdXQgY2xhc3M9bG9nIC8+Jyk7XG4gICAgICAgICAgICBvdXRwdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ291dHB1dC5sb2cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dHB1dEVsXG4gICAgICAgICAgICAuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPHA+JHthcmdzWzBdfTwvcD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkY29uc29sZS5sb2coLi4uYXJncyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGlyKC4uLmFyZ3MpIHtcblxuICAgICRjb25zb2xlLmRpciguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGVycm9yKC4uLmFyZ3MpIHtcblxuICAgICRjb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gd2FybiguLi5hcmdzKSB7XG4gICAgXG4gICAgJGNvbnNvbGUud2FybiguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHNwYXduKG1ha2VHZW5lcmF0b3IpIHtcblxuICAgIHZhciBwcm9taXNlID0gYXN5bmMobWFrZUdlbmVyYXRvcik7XG5cbiAgICBwcm9taXNlKCkudGhlbihsb2csIHRlcm1pbmF0ZUVycm9yKTtcbn1cbmZ1bmN0aW9uIGFzeW5jKG1ha2VHZW5lcmF0b3IpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkUHJvbWlzZSA9IFByb21pc2U7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKHJlc3VsdCkge1xuXG4gICAgICAgICAgICB2YXIgZG9uZSAgPSByZXN1bHQuZG9uZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybiAkUHJvbWlzZS5yZXNvbHZlKHZhbHVlKTsgXG5cbiAgICAgICAgICAgIHJldHVybiAkUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGdlbmVyYXRvci5uZXh0KHJlcykpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZ2VuZXJhdG9yLnRocm93KGVycikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShnZW5lcmF0b3IubmV4dCgpKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIHJldHVybiAkUHJvbWlzZS5yZWplY3QoZXgpO1xuICAgICAgICB9XG4gICAgfTsgIFxufVxuZnVuY3Rpb24gYXN5bmNNZXRob2RzKG9iamVjdCwgLi4ubWV0aG9kcykge1xuXG4gICAgZm9yICh2YXIgbWV0aG9kIG9mIG1ldGhvZHMpIHtcblxuICAgICAgICBvYmplY3RbbWV0aG9kXSA9IGFzeW5jKG9iamVjdFttZXRob2RdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcnJheUl0ZXJhdG9yKGl0ZW1zID0gW10pIHtcbiAgICBcbiAgICB2YXIgaSAgICAgPSAwO1xuICAgIHZhciBsZW4gICA9IGl0ZW1zLmxlbmd0aDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5leHQoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUsIG5vdERvbmU7XG4gICAgICAgICAgICBpZiAobm90RG9uZSA9IGkgPCBsZW4pIHZhbHVlID0gaXRlbXNbaSsrXTtcbiAgICAgICAgICAgIHJldHVybiB7dmFsdWUsIGRvbmU6ICFub3REb25lfTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBub1Byb3RvKHNvdXJjZSA9IHt9KSB7XG5cbiAgICB2YXIgZW1wdHkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIE9iamVjdC5hc3NpZ24oZW1wdHksIHNvdXJjZSk7XG4gICAgcmV0dXJuIGVtcHR5O1xufVxuZnVuY3Rpb24gdGVybWluYXRlRXJyb3IoZXJyb3IpIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3YXJuKGBmcm9tIFt0ZXJpbWF0ZUVycm9yXTpgKTtcbiAgICAgICAgd2FybihlcnJvci5zdGFjayk7XG4gICAgICAgIHRocm93IGVycm9yOyAgICBcbiAgICB9LCAwKTtcbn1cbmZ1bmN0aW9uIG1hcEZyb20ob2JqZWN0ID0ge30pIHtcblxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBNYXApIHJldHVybiBvYmplY3Q7XG5cbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIHZhciBvYmplY3RLZXlzID0ga2V5cyhvYmplY3QpO1xuXG4gICAgcmV0dXJuIG9iamVjdEtleXMucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9LCBtYXApO1xufVxuZnVuY3Rpb24gdWNmaXJzdChzdHIpIHtcblxuICB2YXIgZiA9IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuIGYgKyBzdHIuc3Vic3RyKDEpO1xufVxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHtcblxuICAgIHJldHVybiBhcnJheVswXTtcbn1cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcblxuICAgIHZhciBsZW5ndGggICAgPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGFycmF5W2xhc3RJbmRleF07XG59XG5mdW5jdGlvbiBsYXN0U2VnbWVudChhcnJheSkge1xuXG4gICAgdmFyIHNlZ21lbnRzID0gYXJyYXkuc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gbGFzdChzZWdtZW50cyk7XG59XG5cbi8vIHdpbmRvdyBoZWxwZXJzXG5mdW5jdGlvbiBuZXh0RnJhbWUoKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgfSk7XG59XG5cbnZhciBoZWxwZXJzID0ge1xuICAgIGtleXMsXG4gICAgdmFsdWVzLFxuICAgIGVudHJpZXMsXG4gICAgYXNzaWduLFxuICAgIGV4dGVuZFByb3RvT2YsXG4gICAgaW1wbGVtZW50SXRlcmF0b3IsXG4gICAgdmFsdWUsXG4gICAgaXNOdWxsLFxuICAgIGlzU3RyaW5nLFxuICAgIGlzRnVuY3Rpb24sXG4gICAgaXNVbmRlZmluZWQsXG4gICAgaXNEZWZpbmVkLFxuICAgIGlzQXJyYXksXG4gICAgZGVmaW5lZCxcbiAgICB3YWl0LFxuICAgIGxvZyxcbiAgICBkaXIsXG4gICAgZXJyb3IsXG4gICAgd2FybixcbiAgICBzcGF3bixcbiAgICBhc3luYyxcbiAgICBhc3luY01ldGhvZHMsXG4gICAgYXJyYXlJdGVyYXRvcixcbiAgICBub1Byb3RvLFxuICAgIHRlcm1pbmF0ZUVycm9yLFxuICAgIG1hcEZyb20sXG4gICAgdWNmaXJzdCxcbiAgICBmaXJzdCxcbiAgICBsYXN0LFxuICAgIGxhc3RTZWdtZW50LFxuICAgIHNldFRpbWVvdXQsXG4gICAgY2xlYXJUaW1lb3V0LFxuXG4gICAgbmV4dEZyYW1lLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoZWxwZXJzOyIsInZhciBvYnNlcnZlSnMgPSByZXF1aXJlKCdvYnNlcnZlLWpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE9ic2VydmVyICAgICAgICAgOiBnbG9iYWwuT2JzZXJ2ZXIsXG4gICAgQXJyYXlPYnNlcnZlciAgICA6IGdsb2JhbC5BcnJheU9ic2VydmVyLFxuICAgIEFycmF5U3BsaWNlICAgICAgOiBnbG9iYWwuQXJyYXlTcGxpY2UsXG4gICAgT2JqZWN0T2JzZXJ2ZXIgICA6IGdsb2JhbC5PYmplY3RPYnNlcnZlcixcbiAgICBQYXRoT2JzZXJ2ZXIgICAgIDogZ2xvYmFsLlBhdGhPYnNlcnZlcixcbiAgICBDb21wb3VuZE9ic2VydmVyIDogZ2xvYmFsLkNvbXBvdW5kT2JzZXJ2ZXIsXG4gICAgUGF0aCAgICAgICAgICAgICA6IGdsb2JhbC5QYXRoLFxuICAgIE9ic2VydmVyVHJhbnNmb3JtOiBnbG9iYWwuT2JzZXJ2ZXJUcmFuc2Zvcm0sXG4gICAgUGxhdGZvcm0gICAgICAgICA6IGdsb2JhbC5QbGF0Zm9ybSxcbn07IiwidmFyIHtpc1VuZGVmaW5lZCwgbG9nLCBub1Byb3RvLCBpc1N0cmluZ30gPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuaGVscGVycycpO1xudmFyIG9ic2VydmUgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQub2JzZXJ2ZScpO1xudmFyIHtPYmplY3RPYnNlcnZlciwgUGxhdGZvcm19ID0gb2JzZXJ2ZTtcblxudmFyIE1hcENvbnN0cnVjdG9yID0gZ2xvYmFsLldlYWtNYXAgfHwgZ2xvYmFsLk1hcDtcbnZhciBtYXAgPSBuZXcgTWFwQ29uc3RydWN0b3IoKTtcblxuLy8gbG9nKGBzdXBwb3J0cyAke01hcENvbnN0cnVjdG9yLm5hbWV9YCk7XG5cbmZ1bmN0aW9uIHN0YXRlKHRoaXNBcmcsIHZhbCwgY2JzLCBxdWlldCA9IGZhbHNlKSB7XG5cbiAgICAvLyBpZiBub3QgdmFsdWUsIGFzc3VtZSBhIGdldHRlciBmb3IgZW50aXJlIHN0YXRlIG9iamVjdDtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFsKSkgcmV0dXJuIG1hcC5nZXQodGhpc0FyZyk7XG5cbiAgICAvLyBpZiBzZWNvbmQgYXJndW1lbnQgaXMgYSBzdHJcbiAgICBpZiAoaXNTdHJpbmcodmFsKSkge1xuICAgICAgICBzZXRTdGF0ZS5jYWxsKHRoaXNBcmcsIHZhbCwgY2JzLCBxdWlldCk7XG4gICAgICAgIHJldHVybiB0aGlzQXJnO1xuICAgIH1cbiAgICBcbiAgICB2YXIgXyA9IHNldFN0YXRlT2JqZWN0LmNhbGwodGhpc0FyZywgdmFsKTtcblxuICAgIGlmIChjYnMpIGJpbmRPYnNlcnZhYmxlLmNhbGwodGhpc0FyZywgXywgY2JzKTtcblxuICAgIHJldHVybiBfO1xufVxuZnVuY3Rpb24gc2V0U3RhdGUoa2V5LCB2YWx1ZSwgcXVpZXQpIHtcblxuICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG4gICAgX1trZXldID0gdmFsdWU7XG4gICAgaWYgKHF1aWV0KSBfLm9ic2VydmVyXy5kaXNjYXJkQ2hhbmdlcygpO1xuICAgIFBsYXRmb3JtLnBlcmZvcm1NaWNyb3Rhc2tDaGVja3BvaW50KCk7XG59XG5mdW5jdGlvbiBzZXRTdGF0ZU9iamVjdCh2YWwpIHtcblxuICAgIG1hcC5zZXQodGhpcywgdmFsKTtcbiAgICByZXR1cm4gbWFwLmdldCh0aGlzKTtcbn1cbmZ1bmN0aW9uIGJpbmRPYnNlcnZhYmxlKF8sIGNicykge1xuXG4gICAgXy5vYnNlcnZlcl8gPSBuZXcgT2JqZWN0T2JzZXJ2ZXIoXyk7XG4gICAgXy5vYnNlcnZlcl8ub3Blbihvbk9ic2VydmUuYmluZCh0aGlzLCB7XywgY2JzfSkpO1xufVxuZnVuY3Rpb24gb25PYnNlcnZlKHtfLCBjYnN9LCBhZGRlZCwgcmVtb3ZlZCwgY2hhbmdlZCwgZ2V0T2xkVmFsdWVGbikge1xuXG4gICAgdmFyIG9ic2VydmVkID0ge2FkZGVkLCByZW1vdmVkLCBjaGFuZ2VkLCBfLCBjYnMsIGdldE9sZFZhbHVlRm59O1xuICAgIGludm9rZU9ic2VydmFibGVzLmNhbGwodGhpcywgb2JzZXJ2ZWQpO1xufVxuZnVuY3Rpb24gaW52b2tlT2JzZXJ2YWJsZXMob2JzZXJ2ZWQpIHtcblxuICAgIFsnYWRkZWQnLCAncmVtb3ZlZCcsICdjaGFuZ2VkJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgdmFyIGhhc0NhbGxiYWNrID0gKHR5cGVvZiBvYnNlcnZlZC5jYnNbdHlwZV0gPT09ICdmdW5jdGlvbicpO1xuICAgICAgICB2YXIgaXNOb3RFbXB0eSAgPSBPYmplY3Qua2V5cyhvYnNlcnZlZFt0eXBlXSkubGVuZ3RoID4gMDtcblxuICAgICAgICBpZiAoaGFzQ2FsbGJhY2sgJiYgaXNOb3RFbXB0eSkgaW52b2tlLmNhbGwodGhpcywgb2JzZXJ2ZWQsIHR5cGUpOyBcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGludm9rZShvYnNlcnZlZCwgdHlwZSkge1xuXG4gICAgdmFyIGNhbGxiYWNrID0gb2JzZXJ2ZWQuY2JzW3R5cGVdO1xuICAgIHZhciBuYW1lcyAgICA9IE9iamVjdC5rZXlzKG9ic2VydmVkW3R5cGVdKTtcblxuICAgIHZhciBwYXlsb2FkID0gbmFtZXMubWFwKG5hbWUgPT4ge1xuXG4gICAgICAgIHJldHVybiBub1Byb3RvKHtcbiAgICAgICAgICAgIG5hbWUgICAgOiBuYW1lLFxuICAgICAgICAgICAgdHlwZSAgICA6IHR5cGUsXG4gICAgICAgICAgICBuZXdWYWx1ZTogb2JzZXJ2ZWQuX1tuYW1lXSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiBvYnNlcnZlZC5nZXRPbGRWYWx1ZUZuKG5hbWUpLFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgcGF5bG9hZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGU7IiwidmFyIHN0YXRlICAgPSByZXF1aXJlKCdXaWxkY2F0LlN1cHBvcnQuc3RhdGUnKTtcbnZhciBvYnNlcnZlID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0Lm9ic2VydmUnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnV2lsZGNhdC5TdXBwb3J0LmhlbHBlcnMnKTtcbnZhciBDb21tYW5kZXJUcmFpdCA9IHJlcXVpcmUoJ1dpbGRjYXQuQ29tbWFuZGVyLkNvbW1hbmRlclRyYWl0Jyk7XG52YXIgRXZlbnRMaXN0ZW5lciAgPSByZXF1aXJlKCdXaWxkY2F0LkNvbW1hbmRlci5FdmVudHMuRXZlbnRMaXN0ZW5lcicpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbi8vIHZhciBIYW5kbGViYXJzICAgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG52YXIge1BhdGhPYnNlcnZlciwgUGxhdGZvcm19ID0gb2JzZXJ2ZTtcblxuLyphYnN0cmFjdCovIGNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudExpc3RlbmVyIHtcblxuICAgIC8vIHVzZSBDb21tYW5kVHJhaXRcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIEV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzKTtcblxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgICAgc3RhdGUodGhpcywge30sIHtjaGFuZ2VkLCBhZGRlZH0pO1xuICAgIH1cbiAgICBiaW5kRXZlbnRzKG9wdHMgPSAnc3RhbmRhcmQnKSB7XG5cbiAgICAgICAgaWYgKG9wdHMgPT09ICdzdGFuZGFyZCcpIHtcblxuICAgICAgICAgICAgdmFyIHtlbH0gID0gdGhpcztcbiAgICAgICAgICAgIHZhciBlbE9uICA9IGVsLmFkZEV2ZW50TGlzdGVuZXIuYmluZChlbCk7XG4gICAgICAgICAgICB2YXIgaW5zT24gPSB0aGlzLm9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIGVsT24oJ3RvdWNoc3RhcnQnLCAgICAgIHRoaXMub25Ub3VjaHN0YXJ0LmJpbmQodGhpcywgJ1tkYXRhLWNsaWNrXScpKTtcbiAgICAgICAgICAgIGVsT24oJ3RvdWNobW92ZScsICAgICAgIHRoaXMub25Ub3VjaG1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbE9uKCd0b3VjaGVuZCcsICAgICAgICB0aGlzLm9uVG91Y2hlbmQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbE9uKCdjbGljaycsICAgICAgICAgICB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIGluc09uKCdoaWdobGlnaHRzdGFydCcsIHRoaXMub25IaWdobGlnaHRzdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGluc09uKCdoaWdobGlnaHRlbmQnLCAgIHRoaXMub25IaWdobGlnaHRlbmQuYmluZCh0aGlzKSk7ICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIGdldERlc2lyZWRUYXJnZXQobm9kZSkge1xuXG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoJ1tkYXRhLWNsaWNrXSAqJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuY2VzdG9yT2Yobm9kZSwgJ1tkYXRhLWNsaWNrXScpOyBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBvbkNsaWNrKGUpIHtcblxuICAgICAgICBpZiAodGhpcy5jbGlja2VkT25Ub3VjaChlKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldERlc2lyZWRUYXJnZXQoZS50YXJnZXQpO1xuICAgICAgICB2YXIgbWV0aG9kID0gdGFyZ2V0LmRhdGFzZXQuY2xpY2s7XG5cbiAgICAgICAgaWYgKGlzRGVmaW5lZChtZXRob2QpKSB7XG5cbiAgICAgICAgICAgIG1ldGhvZCA9ICdvbkNsaWNrJyArIHVjZmlyc3QobWV0aG9kKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXNbbWV0aG9kXSkgeyB0aGlzW21ldGhvZF0odGFyZ2V0KTsgfSBcbiAgICAgICAgICAgIGVsc2UgeyB0aHJvdyBuZXcgRXJyb3IoYCR7bWV0aG9kfSBkb2VzIG5vdCBleGlzdGApOyB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Ub3VjaHN0YXJ0KHNlbGVjdG9ycywgZSkge1xuICAgICAgICAvLyBlbWl0IGhpZ2hsaWdodCBldmVuIHJpZ2h0IGF3YXkgKG9yIGFmdGVyIGRlbGF5IGlmIHNjcm9sbGFibGUpXG4gICAgICAgIC8vIGFuZCBzZXQgaW5zLnRvdWNoc3RhcnRFbCB0byB0YXJnZXRcblxuICAgICAgICB2YXJcbiAgICAgICAgICAgIGlucyA9IHRoaXMsXG4gICAgICAgICAgICB3aW5kb3cgPSBpbnMuYXBwLndpbmRvdyxcbiAgICAgICAgICAgIHRhcmdldCA9IGlucy5nZXREZXNpcmVkVGFyZ2V0KGUudGFyZ2V0KSxcbiAgICAgICAgICAgIHRhcmdldElzU2Nyb2xsYWJsZSA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpLFxuICAgICAgICAgICAgZW1pdEhpZ2hsaWdodCA9IGlucy5lbWl0LmJpbmQoaW5zLCAnaGlnaGxpZ2h0c3RhcnQnLCB7dGFyZ2V0OiB0YXJnZXR9KSxcbiAgICAgICAgICAgIGRlbGF5ID0gNTAsXG4gICAgICAgICAgICBlbWl0SGlnaGxpZ2h0QWZ0ZXJEZWxheSA9IHNldFRpbWVvdXQuYmluZCh3aW5kb3csIGVtaXRIaWdobGlnaHQsIGRlbGF5KTtcblxuICAgICAgICBpZiAodGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3JzKSkge1xuICAgICAgICAgICAgaW5zLnRvdWNoc3RhcnRFbCA9IHRhcmdldDtcbiAgICAgICAgICAgIGlucy50b3VjaHN0YXJ0WSA9IGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgaWYgKHRhcmdldElzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgICAgIGlucy5lbWl0SGlnaGxpZ2h0VGltZW91dCA9IGVtaXRIaWdobGlnaHRBZnRlckRlbGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVtaXRIaWdobGlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRvdWNobW92ZShlKSB7XG4gICAgICAgIGlmICggISB0aGlzLnRvdWNoc3RhcnRFbCkgcmV0dXJuO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBpZiB3ZSdyZSBtb3ZpbmcgYXJvdW5kIHNhbWUgdG91Y2ggYXMgd2hhdCBpZGVudGlmaWVkXG4gICAgICAgIC8vIHRoZSB0b3VjaHN0YXJ0RWwsIHRoZW4gY2FsbCBgb25Ub3VjaGFyb3VuZGBcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBpbnMgPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2hzdGFydEVsID0gaW5zLnRvdWNoc3RhcnRFbCxcbiAgICAgICAgICAgIHRvdWNoID0gZS50YXJnZXRUb3VjaGVzWzBdLFxuXG4gICAgICAgICAgICB0b3VjaHN0YXJ0WSA9IGlucy50b3VjaHN0YXJ0WSxcbiAgICAgICAgICAgIG5ld1kgPSB0b3VjaC5jbGllbnRZLFxuICAgICAgICAgICAgZGlmZmVyZW5jZUluWSA9IChuZXdZICE9PSB0aGlzLnRvdWNoWSksXG5cbiAgICAgICAgICAgIHRvdWNoVGFyZ2V0ID0gaW5zLmdldERlc2lyZWRUYXJnZXQodG91Y2gudGFyZ2V0KSxcbiAgICAgICAgICAgIHRhcmdldElzU2Nyb2xsYWJsZSA9IHRvdWNoVGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJyk7XG5cbiAgICAgICAgaWYgKHRvdWNoVGFyZ2V0ID09PSB0b3VjaHN0YXJ0RWwpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRJc1Njcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW5jZUluWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVG91Y2hzdGFydCgpO1xuICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uVG91Y2hhcm91bmQodG91Y2hzdGFydEVsLCBlKTsgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRvdWNoYXJvdW5kKHRvdWNoc3RhcnRFbCwgZSkge1xuICAgICAgICAvLyBpZiB0b3VjaGFyb3VuZCB0b28gZmFyIGZyb20gdG91Y2hzdGFydEVsXG4gICAgICAgIC8vIHRoZW4gcmVtb3ZlIGhpZ2hsaWdodDtcbiAgICAgICAgLy8gYWRkIGJhY2sgaW4gbW92ZSBpbiBjbG9zZSBhZ2FpblxuICAgICAgICB2YXIgXG4gICAgICAgICAgICBpbnMgPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2ggPSBlLnRhcmdldFRvdWNoZXNbMF0sXG4gICAgICAgICAgICBleGNlZWRzID0gaW5zLmV4Y2VlZHNFbGVtZW50KHRvdWNoLCB0b3VjaHN0YXJ0RWwpO1xuXG4gICAgICAgIGlmIChleGNlZWRzKSB7XG4gICAgICAgICAgICBpbnMuZW1pdCgnaGlnaGxpZ2h0ZW5kJywge3RhcmdldDogdG91Y2hzdGFydEVsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnMuZW1pdCgnaGlnaGxpZ2h0c3RhcnQnLCB7dGFyZ2V0OiB0b3VjaHN0YXJ0RWx9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRvdWNoZW5kKGUpIHsvLyByZXR1cm4gaW4gbm8gdG91Y2hzdGFydEVsLCBvclxuICAgICAgICAvLyBpbW1lZGlhdGVseSByZW1vdmUgaGlnaGxpZ2h0aW5nIG9uIHRvdWNoc3RhcnRFbCBhbmRcbiAgICAgICAgLy8gZGVsZWdhdGUgdG8gb25jbGljayBpZiB3aXRoaW4gYm91bmRzIG9mIHRvdWNoc3RhcnRFbFxuXG4gICAgICAgIGlmICggISB0aGlzLnRvdWNoc3RhcnRFbCkgcmV0dXJuO1xuXG4gICAgICAgIHZhclxuICAgICAgICAgICAgaW5zID0gdGhpcyxcbiAgICAgICAgICAgIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXSxcbiAgICAgICAgICAgIHRvdWNoVGFyZ2V0ID0gaW5zLmdldERlc2lyZWRUYXJnZXQodG91Y2gudGFyZ2V0KSxcbiAgICAgICAgICAgIHRvdWNoc3RhcnRFbCA9IGlucy50b3VjaHN0YXJ0RWwsXG4gICAgICAgICAgICBleGNlZWRzID0gaW5zLmV4Y2VlZHNFbGVtZW50KHRvdWNoLCB0b3VjaHN0YXJ0RWwpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUb3VjaHN0YXJ0KGlucyk7XG4gICAgICAgIGlmICgodG91Y2hUYXJnZXQgPT09IHRvdWNoc3RhcnRFbCkgJiYgKCAhIGV4Y2VlZHMpKSB7XG4gICAgICAgICAgICBsb2coYHRvdWNoZW5kIGdvaW5nIHRvIGNsaWNrYCk7XG4gICAgICAgICAgICBpbnMub25DbGljayhlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclRvdWNoc3RhcnQoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgaW5zID0gdGhpcyxcbiAgICAgICAgICAgIHRvdWNoc3RhcnRFbCA9IGlucy50b3VjaHN0YXJ0RWwsXG4gICAgICAgICAgICBlbWl0SGlnaGxpZ2h0VGltZW91dCA9IGlucy5lbWl0SGlnaGxpZ2h0VGltZW91dDtcblxuICAgICAgICBpZiAoZW1pdEhpZ2hsaWdodFRpbWVvdXQpIGNsZWFyVGltZW91dChlbWl0SGlnaGxpZ2h0VGltZW91dCk7XG4gICAgICAgIGlmICh0b3VjaHN0YXJ0RWwpIGlucy5lbWl0KCdoaWdobGlnaHRlbmQnLCB7dGFyZ2V0OiB0b3VjaHN0YXJ0RWx9KTtcbiAgICAgICAgZGVsZXRlIGlucy50b3VjaHN0YXJ0RWw7IFxuICAgICAgICBkZWxldGUgaW5zLnRvdWNoc3RhcnRZOyAgXG4gICAgfVxuICAgIGV4Y2VlZHNFbGVtZW50KHRvdWNoLCBlbCkge1xuICAgICAgICB2YXIgXG4gICAgICAgICAgICBwYWRkaW5nID0gMjAsXG4gICAgICAgICAgICBlbEJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXG4gICAgICAgICAgICB0b3VjaFggPSB0b3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgdG91Y2hZID0gdG91Y2guY2xpZW50WSxcblxuICAgICAgICAgICAgdG9vTGVmdCAgPSAodG91Y2hYIC0gKGVsQm94LmxlZnQgICAtIHBhZGRpbmcpKSA8IDAsXG4gICAgICAgICAgICB0b29SaWdodCA9ICh0b3VjaFggLSAoZWxCb3gucmlnaHQgICsgcGFkZGluZykpID4gMCxcbiAgICAgICAgICAgIHRvb0Fib3ZlID0gKHRvdWNoWSAtIChlbEJveC50b3AgICAgLSBwYWRkaW5nKSkgPCAwLFxuICAgICAgICAgICAgdG9vQmVsb3cgPSAodG91Y2hZIC0gKGVsQm94LmJvdHRvbSArIHBhZGRpbmcpKSA+IDA7XG5cbiAgICAgICAgcmV0dXJuICh0b29MZWZ0IHx8IHRvb1JpZ2h0IHx8IHRvb0Fib3ZlIHx8IHRvb0JlbG93KTtcbiAgICB9XG4gICAgb25IaWdobGlnaHRzdGFydChlKSB7XG5cbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIG9uSGlnaGxpZ2h0ZW5kKGUpIHtcblxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgY2xpY2tlZE9uVG91Y2goZSkge1xuXG4gICAgICAgIHZhciBpc0NsaWNrID0gKGUudHlwZSA9PT0gJ2NsaWNrJyk7XG4gICAgICAgIHZhciB7dG91Y2hhYmxlfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChpc0NsaWNrICYmIHRvdWNoYWJsZSk7XG4gICAgfVxuICAgIGdldCB0b3VjaGFibGUoKSB7XG5cbiAgICAgICAgdmFyIHtkb2N1bWVudEVsZW1lbnR9ID0gdGhpcy5hcHAud2luZG93LmRvY3VtZW50O1xuICAgICAgICByZXR1cm4gKCAhIGRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXRvdWNoJykpOyAgIFxuICAgIH1cbiAgICBhbmNlc3Rvck9mKGVsLCBzZWxlY3Rvcikge1xuXG4gICAgICAgIHZhciB7ZG9jdW1lbnR9ID0gZ2xvYmFsO1xuXG4gICAgICAgIHdoaWxlICggISBlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKGVsID09PSBkb2N1bWVudCkgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICBzZXRFbChlbGVtZW50LCBxdWlldCA9IGZhbHNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlKHRoaXMsICdlbCcsIGVsZW1lbnQsIHF1aWV0KTtcbiAgICB9XG4gICAgZ2V0IGVsKCkge1xuXG4gICAgICAgIHZhciBfID0gc3RhdGUodGhpcyk7XG5cbiAgICAgICAgaWYgKCAhIF8uZWwpIHtcblxuICAgICAgICAgICAgaWYgKCAhIHRoaXMubmFtZSkgdGhyb3cgRXJyb3IoYHRoaXMubmFtZSBub3QgZGVmaW5lZCBvbiB2aWV3YCk7XG5cbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBgLiR7dGhpcy5uYW1lfS12aWV3YDtcbiAgICAgICAgICAgIHZhciB7ZG9jdW1lbnR9ID0gdGhpcy5hcHAud2luZG93O1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpOyBcblxuICAgICAgICAgICAgaWYgKCAhIGVsKSB0aHJvdyBFcnJvcihgJHtjbGFzc05hbWV9IG5vdCBmb3VuZGApOyAgXG5cbiAgICAgICAgICAgIF8uZWwgPSBlbDtcbiAgICAgICAgfSBcblxuICAgICAgICByZXR1cm4gXy5lbDtcbiAgICB9XG4gICAgc2V0IGVsKHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5zZXRFbCh2YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlKCk7XG4gICAgfVxuICAgIGdldFRlbXBsYXRlKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlO1xuICAgIH1cbiAgICAkKC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKC4uLmFyZ3MpO1xuICAgIH1cbiAgICAkJCguLi5hcmdzKSB7XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgdG9nZ2xlKC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKC4uLmFyZ3MpO1xuICAgIH1cbiAgICByZW1vdmUoLi4uYXJncykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uYXJncyk7XG4gICAgfVxuICAgIGNvbnRhaW5zKC4uLmFyZ3MpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbC5jbGFzc0xpc3QuY29udGFpbnMoLi4uYXJncyk7XG4gICAgfVxuICAgIGFkZCguLi5hcmdzKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCguLi5hcmdzKTtcbiAgICB9XG4gICAgZWxPbiguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XG4gICAgfVxuICAgIGVsT2ZmKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZWQoY2hhbmdlcykge1xuXG4gICAgbG9nKGBvblN0YXRlQ2hhbmdlZGApO1xuICAgIGZvciAodmFyIGNoYW5nZSBvZiBjaGFuZ2VzKSBsb2coY2hhbmdlKTtcbn1cbmZ1bmN0aW9uIGFkZGVkKGFkZGl0aW9ucykge1xuXG4gICAgbG9nKGBvblN0YXRlQWRkZWRgKTtcbiAgICBmb3IgKHZhciBhZGRpdGlvbiBvZiBhZGRpdGlvbnMpIGxvZyhhZGRpdGlvbik7XG59XG5cbnZhciB7XG4gICAgbG9nLFxuICAgIGV4dGVuZFByb3RvT2YsXG4gICAgc2V0VGltZW91dCxcbiAgICBjbGVhclRpbWVvdXQsXG4gICAgaXNEZWZpbmVkLFxuICAgIHVjZmlyc3QsXG59ID0gaGVscGVycztcblxuZXh0ZW5kUHJvdG9PZihWaWV3LCBFdmVudEVtaXR0ZXIpO1xuZXh0ZW5kUHJvdG9PZihWaWV3LCBDb21tYW5kZXJUcmFpdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlldzsgIiwidmFyIFNlcnZpY2VQcm92aWRlciA9IHJlcXVpcmUoJ1dpbGRjYXQuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXInKTtcbnZhciBWaWV3ID0gcmVxdWlyZSgnV2lsZGNhdC5WaWV3LlZpZXcnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi4vU3VwcG9ydC9oZWxwZXJzJyk7XG5cbmNsYXNzIFZpZXdTZXJ2aWNlUHJvdmlkZXIgZXh0ZW5kcyBTZXJ2aWNlUHJvdmlkZXIge1xuXG4gICAgcmVnaXN0ZXIoKSB7XG5cbiAgICAgICAgdmFyIHthcHB9ID0gdGhpcztcbiAgICAgICAgdmFyIHZpZXdzID0gYXBwLmNvbmZpZy5nZXQoJ3ZpZXdzJyk7XG5cbiAgICAgICAgdmlld3MuZm9yRWFjaCh2aWV3ID0+IHtcblxuICAgICAgICAgICAgdmFyIHthYnN0cmFjdCwgJGNvbnN0cnVjdG9yLCBidWlsZCwgYXJnc30gPSB2aWV3O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2luZ2xldG9uJzpcbiAgICAgICAgICAgICAgICAgICAgYXBwLmJpbmRTaGFyZWQoYWJzdHJhY3QsIGFwcCA9PiBuZXcgJGNvbnN0cnVjdG9yKGFwcCwgLi4uYXJncykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG52YXIge2xvZ30gPSBoZWxwZXJzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdTZXJ2aWNlUHJvdmlkZXI7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIHZhciBtO1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gMDtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbWl0dGVyLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IDE7XG4gIGVsc2VcbiAgICByZXQgPSBlbWl0dGVyLl9ldmVudHNbdHlwZV0ubGVuZ3RoO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCIvKiFcbiAqIEV2ZW50RW1pdHRlcjJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9oaWoxbngvRXZlbnRFbWl0dGVyMlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBoaWoxbnhcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuOyFmdW5jdGlvbih1bmRlZmluZWQpIHtcblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgPyBBcnJheS5pc0FycmF5IDogZnVuY3Rpb24gX2lzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIH07XG4gIHZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBpZiAodGhpcy5fY29uZikge1xuICAgICAgY29uZmlndXJlLmNhbGwodGhpcywgdGhpcy5fY29uZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlndXJlKGNvbmYpIHtcbiAgICBpZiAoY29uZikge1xuXG4gICAgICB0aGlzLl9jb25mID0gY29uZjtcblxuICAgICAgY29uZi5kZWxpbWl0ZXIgJiYgKHRoaXMuZGVsaW1pdGVyID0gY29uZi5kZWxpbWl0ZXIpO1xuICAgICAgY29uZi5tYXhMaXN0ZW5lcnMgJiYgKHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgPSBjb25mLm1heExpc3RlbmVycyk7XG4gICAgICBjb25mLndpbGRjYXJkICYmICh0aGlzLndpbGRjYXJkID0gY29uZi53aWxkY2FyZCk7XG4gICAgICBjb25mLm5ld0xpc3RlbmVyICYmICh0aGlzLm5ld0xpc3RlbmVyID0gY29uZi5uZXdMaXN0ZW5lcik7XG5cbiAgICAgIGlmICh0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJUcmVlID0ge307XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKGNvbmYpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB0aGlzLm5ld0xpc3RlbmVyID0gZmFsc2U7XG4gICAgY29uZmlndXJlLmNhbGwodGhpcywgY29uZik7XG4gIH1cblxuICAvL1xuICAvLyBBdHRlbnRpb24sIGZ1bmN0aW9uIHJldHVybiB0eXBlIG5vdyBpcyBhcnJheSwgYWx3YXlzICFcbiAgLy8gSXQgaGFzIHplcm8gZWxlbWVudHMgaWYgbm8gYW55IG1hdGNoZXMgZm91bmQgYW5kIG9uZSBvciBtb3JlXG4gIC8vIGVsZW1lbnRzIChsZWFmcykgaWYgdGhlcmUgYXJlIG1hdGNoZXNcbiAgLy9cbiAgZnVuY3Rpb24gc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlLCBpKSB7XG4gICAgaWYgKCF0cmVlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHZhciBsaXN0ZW5lcnM9W10sIGxlYWYsIGxlbiwgYnJhbmNoLCB4VHJlZSwgeHhUcmVlLCBpc29sYXRlZEJyYW5jaCwgZW5kUmVhY2hlZCxcbiAgICAgICAgdHlwZUxlbmd0aCA9IHR5cGUubGVuZ3RoLCBjdXJyZW50VHlwZSA9IHR5cGVbaV0sIG5leHRUeXBlID0gdHlwZVtpKzFdO1xuICAgIGlmIChpID09PSB0eXBlTGVuZ3RoICYmIHRyZWUuX2xpc3RlbmVycykge1xuICAgICAgLy9cbiAgICAgIC8vIElmIGF0IHRoZSBlbmQgb2YgdGhlIGV2ZW50KHMpIGxpc3QgYW5kIHRoZSB0cmVlIGhhcyBsaXN0ZW5lcnNcbiAgICAgIC8vIGludm9rZSB0aG9zZSBsaXN0ZW5lcnMuXG4gICAgICAvL1xuICAgICAgaWYgKHR5cGVvZiB0cmVlLl9saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlcnMgJiYgaGFuZGxlcnMucHVzaCh0cmVlLl9saXN0ZW5lcnMpO1xuICAgICAgICByZXR1cm4gW3RyZWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZWFmID0gMCwgbGVuID0gdHJlZS5fbGlzdGVuZXJzLmxlbmd0aDsgbGVhZiA8IGxlbjsgbGVhZisrKSB7XG4gICAgICAgICAgaGFuZGxlcnMgJiYgaGFuZGxlcnMucHVzaCh0cmVlLl9saXN0ZW5lcnNbbGVhZl0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdHJlZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChjdXJyZW50VHlwZSA9PT0gJyonIHx8IGN1cnJlbnRUeXBlID09PSAnKionKSB8fCB0cmVlW2N1cnJlbnRUeXBlXSkge1xuICAgICAgLy9cbiAgICAgIC8vIElmIHRoZSBldmVudCBlbWl0dGVkIGlzICcqJyBhdCB0aGlzIHBhcnRcbiAgICAgIC8vIG9yIHRoZXJlIGlzIGEgY29uY3JldGUgbWF0Y2ggYXQgdGhpcyBwYXRjaFxuICAgICAgLy9cbiAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gJyonKSB7XG4gICAgICAgIGZvciAoYnJhbmNoIGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAoYnJhbmNoICE9PSAnX2xpc3RlbmVycycgJiYgdHJlZS5oYXNPd25Qcm9wZXJ0eShicmFuY2gpKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKzEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VHlwZSA9PT0gJyoqJykge1xuICAgICAgICBlbmRSZWFjaGVkID0gKGkrMSA9PT0gdHlwZUxlbmd0aCB8fCAoaSsyID09PSB0eXBlTGVuZ3RoICYmIG5leHRUeXBlID09PSAnKicpKTtcbiAgICAgICAgaWYoZW5kUmVhY2hlZCAmJiB0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAvLyBUaGUgbmV4dCBlbGVtZW50IGhhcyBhIF9saXN0ZW5lcnMsIGFkZCBpdCB0byB0aGUgaGFuZGxlcnMuXG4gICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWUsIHR5cGVMZW5ndGgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoYnJhbmNoIGluIHRyZWUpIHtcbiAgICAgICAgICBpZiAoYnJhbmNoICE9PSAnX2xpc3RlbmVycycgJiYgdHJlZS5oYXNPd25Qcm9wZXJ0eShicmFuY2gpKSB7XG4gICAgICAgICAgICBpZihicmFuY2ggPT09ICcqJyB8fCBicmFuY2ggPT09ICcqKicpIHtcbiAgICAgICAgICAgICAgaWYodHJlZVticmFuY2hdLl9saXN0ZW5lcnMgJiYgIWVuZFJlYWNoZWQpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCB0eXBlTGVuZ3RoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGJyYW5jaCA9PT0gbmV4dFR5cGUpIHtcbiAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbYnJhbmNoXSwgaSsyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBObyBtYXRjaCBvbiB0aGlzIG9uZSwgc2hpZnQgaW50byB0aGUgdHJlZSBidXQgbm90IGluIHRoZSB0eXBlIGFycmF5LlxuICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2N1cnJlbnRUeXBlXSwgaSsxKSk7XG4gICAgfVxuXG4gICAgeFRyZWUgPSB0cmVlWycqJ107XG4gICAgaWYgKHhUcmVlKSB7XG4gICAgICAvL1xuICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHRyZWUgd2lsbCBhbGxvdyBhbnkgbWF0Y2ggZm9yIHRoaXMgcGFydCxcbiAgICAgIC8vIHRoZW4gcmVjdXJzaXZlbHkgZXhwbG9yZSBhbGwgYnJhbmNoZXMgb2YgdGhlIHRyZWVcbiAgICAgIC8vXG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHhUcmVlLCBpKzEpO1xuICAgIH1cblxuICAgIHh4VHJlZSA9IHRyZWVbJyoqJ107XG4gICAgaWYoeHhUcmVlKSB7XG4gICAgICBpZihpIDwgdHlwZUxlbmd0aCkge1xuICAgICAgICBpZih4eFRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBsaXN0ZW5lciBvbiBhICcqKicsIGl0IHdpbGwgY2F0Y2ggYWxsLCBzbyBhZGQgaXRzIGhhbmRsZXIuXG4gICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWUsIHR5cGVMZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQnVpbGQgYXJyYXlzIG9mIG1hdGNoaW5nIG5leHQgYnJhbmNoZXMgYW5kIG90aGVycy5cbiAgICAgICAgZm9yKGJyYW5jaCBpbiB4eFRyZWUpIHtcbiAgICAgICAgICBpZihicmFuY2ggIT09ICdfbGlzdGVuZXJzJyAmJiB4eFRyZWUuaGFzT3duUHJvcGVydHkoYnJhbmNoKSkge1xuICAgICAgICAgICAgaWYoYnJhbmNoID09PSBuZXh0VHlwZSkge1xuICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoZSBuZXh0IGVsZW1lbnQgd2lsbCBtYXRjaCwgc28ganVtcCB0d2ljZS5cbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWVbYnJhbmNoXSwgaSsyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihicmFuY2ggPT09IGN1cnJlbnRUeXBlKSB7XG4gICAgICAgICAgICAgIC8vIEN1cnJlbnQgbm9kZSBtYXRjaGVzLCBtb3ZlIGludG8gdGhlIHRyZWUuXG4gICAgICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeHhUcmVlW2JyYW5jaF0sIGkrMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpc29sYXRlZEJyYW5jaCA9IHt9O1xuICAgICAgICAgICAgICBpc29sYXRlZEJyYW5jaFticmFuY2hdID0geHhUcmVlW2JyYW5jaF07XG4gICAgICAgICAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeyAnKionOiBpc29sYXRlZEJyYW5jaCB9LCBpKzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKHh4VHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgcmVhY2hlZCB0aGUgZW5kIGFuZCBzdGlsbCBvbiBhICcqKidcbiAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWUsIHR5cGVMZW5ndGgpO1xuICAgICAgfSBlbHNlIGlmKHh4VHJlZVsnKiddICYmIHh4VHJlZVsnKiddLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWVbJyonXSwgdHlwZUxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RlbmVycztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdyb3dMaXN0ZW5lclRyZWUodHlwZSwgbGlzdGVuZXIpIHtcblxuICAgIHR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcblxuICAgIC8vXG4gICAgLy8gTG9va3MgZm9yIHR3byBjb25zZWN1dGl2ZSAnKionLCBpZiBzbywgZG9uJ3QgYWRkIHRoZSBldmVudCBhdCBhbGwuXG4gICAgLy9cbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0eXBlLmxlbmd0aDsgaSsxIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmKHR5cGVbaV0gPT09ICcqKicgJiYgdHlwZVtpKzFdID09PSAnKionKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdHJlZSA9IHRoaXMubGlzdGVuZXJUcmVlO1xuICAgIHZhciBuYW1lID0gdHlwZS5zaGlmdCgpO1xuXG4gICAgd2hpbGUgKG5hbWUpIHtcblxuICAgICAgaWYgKCF0cmVlW25hbWVdKSB7XG4gICAgICAgIHRyZWVbbmFtZV0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgdHJlZSA9IHRyZWVbbmFtZV07XG5cbiAgICAgIGlmICh0eXBlLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICAgIGlmICghdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgdHJlZS5fbGlzdGVuZXJzID0gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2YgdHJlZS5fbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJlZS5fbGlzdGVuZXJzID0gW3RyZWUuX2xpc3RlbmVycywgbGlzdGVuZXJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQXJyYXkodHJlZS5fbGlzdGVuZXJzKSkge1xuXG4gICAgICAgICAgdHJlZS5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICAgICAgaWYgKCF0cmVlLl9saXN0ZW5lcnMud2FybmVkKSB7XG5cbiAgICAgICAgICAgIHZhciBtID0gZGVmYXVsdE1heExpc3RlbmVycztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBtID0gdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG0gPiAwICYmIHRyZWUuX2xpc3RlbmVycy5sZW5ndGggPiBtKSB7XG5cbiAgICAgICAgICAgICAgdHJlZS5fbGlzdGVuZXJzLndhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWUuX2xpc3RlbmVycy5sZW5ndGgpO1xuICAgICAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgbmFtZSA9IHR5cGUuc2hpZnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuXG4gIC8vIDEwIGxpc3RlbmVycyBhcmUgYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaFxuICAvLyBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbiAgLy9cbiAgLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4gIC8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZGVsaW1pdGVyID0gJy4nO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyA9IG47XG4gICAgaWYgKCF0aGlzLl9jb25mKSB0aGlzLl9jb25mID0ge307XG4gICAgdGhpcy5fY29uZi5tYXhMaXN0ZW5lcnMgPSBuO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnQgPSAnJztcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICB0aGlzLm1hbnkoZXZlbnQsIDEsIGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm1hbnkgPSBmdW5jdGlvbihldmVudCwgdHRsLCBmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFueSBvbmx5IGFjY2VwdHMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoLS10dGwgPT09IDApIHtcbiAgICAgICAgc2VsZi5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXIuX29yaWdpbiA9IGZuO1xuXG4gICAgdGhpcy5vbihldmVudCwgbGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHR5cGUgPSBhcmd1bWVudHNbMF07XG5cbiAgICBpZiAodHlwZSA9PT0gJ25ld0xpc3RlbmVyJyAmJiAhdGhpcy5uZXdMaXN0ZW5lcikge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSAqX2FsbCogZnVuY3Rpb25zIGFuZCBpbnZva2UgdGhlbS5cbiAgICBpZiAodGhpcy5fYWxsKSB7XG4gICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGw7IGkrKykgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5fYWxsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgICAgdGhpcy5fYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuXG4gICAgICBpZiAoIXRoaXMuX2FsbCAmJlxuICAgICAgICAhdGhpcy5fZXZlbnRzLmVycm9yICYmXG4gICAgICAgICEodGhpcy53aWxkY2FyZCAmJiB0aGlzLmxpc3RlbmVyVHJlZS5lcnJvcikpIHtcblxuICAgICAgICBpZiAoYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBhcmd1bWVudHNbMV07IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5jYXVnaHQsIHVuc3BlY2lmaWVkICdlcnJvcicgZXZlbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlcjtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIGhhbmRsZXIgPSBbXTtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgaGFuZGxlciwgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gc2xvd2VyXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbDsgaSsrKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYW5kbGVyKSB7XG4gICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGw7IGkrKykgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IHR5cGU7XG4gICAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAobGlzdGVuZXJzLmxlbmd0aCA+IDApIHx8ICEhdGhpcy5fYWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAhIXRoaXMuX2FsbDtcbiAgICB9XG5cbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5vbkFueSh0eXBlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb24gb25seSBhY2NlcHRzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PSBcIm5ld0xpc3RlbmVyc1wiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyc1wiLlxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICBncm93TGlzdGVuZXJUcmVlLmNhbGwodGhpcywgdHlwZSwgbGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHtcbiAgICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgfVxuICAgIGVsc2UgaWYodHlwZW9mIHRoaXMuX2V2ZW50c1t0eXBlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQXJyYXkodGhpcy5fZXZlbnRzW3R5cGVdKSkge1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG5cbiAgICAgICAgdmFyIG0gPSBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBtID0gdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuXG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25BbnkgPSBmdW5jdGlvbihmbikge1xuXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbkFueSBvbmx5IGFjY2VwdHMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYoIXRoaXMuX2FsbCkge1xuICAgICAgdGhpcy5fYWxsID0gW107XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBmdW5jdGlvbiB0byB0aGUgZXZlbnQgbGlzdGVuZXIgY29sbGVjdGlvbi5cbiAgICB0aGlzLl9hbGwucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlTGlzdGVuZXIgb25seSB0YWtlcyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlcnMsbGVhZnM9W107XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIGxlYWZzID0gc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgbnVsbCwgbnMsIHRoaXMubGlzdGVuZXJUcmVlLCAwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBkb2VzIG5vdCB1c2UgbGlzdGVuZXJzKCksIHNvIG5vIHNpZGUgZWZmZWN0IG9mIGNyZWF0aW5nIF9ldmVudHNbdHlwZV1cbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSByZXR1cm4gdGhpcztcbiAgICAgIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgbGVhZnMucHVzaCh7X2xpc3RlbmVyczpoYW5kbGVyc30pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGlMZWFmPTA7IGlMZWFmPGxlYWZzLmxlbmd0aDsgaUxlYWYrKykge1xuICAgICAgdmFyIGxlYWYgPSBsZWFmc1tpTGVhZl07XG4gICAgICBoYW5kbGVycyA9IGxlYWYuX2xpc3RlbmVycztcbiAgICAgIGlmIChpc0FycmF5KGhhbmRsZXJzKSkge1xuXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChoYW5kbGVyc1tpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAgIChoYW5kbGVyc1tpXS5saXN0ZW5lciAmJiBoYW5kbGVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHx8XG4gICAgICAgICAgICAoaGFuZGxlcnNbaV0uX29yaWdpbiAmJiBoYW5kbGVyc1tpXS5fb3JpZ2luID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgICBsZWFmLl9saXN0ZW5lcnMuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0uc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgICBkZWxldGUgbGVhZi5fbGlzdGVuZXJzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaGFuZGxlcnMgPT09IGxpc3RlbmVyIHx8XG4gICAgICAgIChoYW5kbGVycy5saXN0ZW5lciAmJiBoYW5kbGVycy5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHx8XG4gICAgICAgIChoYW5kbGVycy5fb3JpZ2luICYmIGhhbmRsZXJzLl9vcmlnaW4gPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICAgICAgZGVsZXRlIGxlYWYuX2xpc3RlbmVycztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmZBbnkgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciBpID0gMCwgbCA9IDAsIGZucztcbiAgICBpZiAoZm4gJiYgdGhpcy5fYWxsICYmIHRoaXMuX2FsbC5sZW5ndGggPiAwKSB7XG4gICAgICBmbnMgPSB0aGlzLl9hbGw7XG4gICAgICBmb3IoaSA9IDAsIGwgPSBmbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmKGZuID09PSBmbnNbaV0pIHtcbiAgICAgICAgICBmbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FsbCA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmY7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICF0aGlzLl9ldmVudHMgfHwgaW5pdC5jYWxsKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICB2YXIgbGVhZnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBudWxsLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuXG4gICAgICBmb3IgKHZhciBpTGVhZj0wOyBpTGVhZjxsZWFmcy5sZW5ndGg7IGlMZWFmKyspIHtcbiAgICAgICAgdmFyIGxlYWYgPSBsZWFmc1tpTGVhZl07XG4gICAgICAgIGxlYWYuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIGhhbmRsZXJzLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgICAgcmV0dXJuIGhhbmRsZXJzO1xuICAgIH1cblxuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgdGhpcy5fZXZlbnRzW3R5cGVdID0gW107XG4gICAgaWYgKCFpc0FycmF5KHRoaXMuX2V2ZW50c1t0eXBlXSkpIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzQW55ID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZih0aGlzLl9hbGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hbGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBleHBvcnRzLkV2ZW50RW1pdHRlcjIgPSBFdmVudEVtaXR0ZXI7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWwuXG4gICAgd2luZG93LkV2ZW50RW1pdHRlcjIgPSBFdmVudEVtaXR0ZXI7XG4gIH1cbn0oKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLypnbG9iYWxzIEhhbmRsZWJhcnM6IHRydWUgKi9cbnZhciBiYXNlID0gcmVxdWlyZShcIi4vaGFuZGxlYmFycy9iYXNlXCIpO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3V0aWxzXCIpO1xudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3J1bnRpbWVcIik7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICB9O1xuXG4gIHJldHVybiBoYjtcbn07XG5cbnZhciBIYW5kbGViYXJzID0gY3JlYXRlKCk7XG5IYW5kbGViYXJzLmNyZWF0ZSA9IGNyZWF0ZTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBIYW5kbGViYXJzOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG52YXIgRXhjZXB0aW9uID0gcmVxdWlyZShcIi4vZXhjZXB0aW9uXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIFZFUlNJT04gPSBcIjEuMy4wXCI7XG5leHBvcnRzLlZFUlNJT04gPSBWRVJTSU9OO3ZhciBDT01QSUxFUl9SRVZJU0lPTiA9IDQ7XG5leHBvcnRzLkNPTVBJTEVSX1JFVklTSU9OID0gQ09NUElMRVJfUkVWSVNJT047XG52YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc+PSAxLjAuMCdcbn07XG5leHBvcnRzLlJFVklTSU9OX0NIQU5HRVMgPSBSRVZJU0lPTl9DSEFOR0VTO1xudmFyIGlzQXJyYXkgPSBVdGlscy5pc0FycmF5LFxuICAgIGlzRnVuY3Rpb24gPSBVdGlscy5pc0Z1bmN0aW9uLFxuICAgIHRvU3RyaW5nID0gVXRpbHMudG9TdHJpbmcsXG4gICAgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5mdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG59XG5cbmV4cG9ydHMuSGFuZGxlYmFyc0Vudmlyb25tZW50ID0gSGFuZGxlYmFyc0Vudmlyb25tZW50O0hhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbiwgaW52ZXJzZSkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoaW52ZXJzZSB8fCBmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbnZlcnNlKSB7IGZuLm5vdCA9IGludmVyc2U7IH1cbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHN0cikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBVdGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gc3RyO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGFyZykge1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJNaXNzaW5nIGhlbHBlcjogJ1wiICsgYXJnICsgXCInXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSB8fCBmdW5jdGlvbigpIHt9LCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZihjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZihjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuLCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlO1xuICAgIHZhciBpID0gMCwgcmV0ID0gXCJcIiwgZGF0YTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGlmKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuICAgICAgICAgICAgZGF0YS5sYXN0ICA9IChpID09PSAoY29udGV4dC5sZW5ndGgtMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZihjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmKGRhdGEpIHsgXG4gICAgICAgICAgICAgIGRhdGEua2V5ID0ga2V5OyBcbiAgICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2tleV0sIHtkYXRhOiBkYXRhfSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoaSA9PT0gMCl7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBVdGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmICghVXRpbHMuaXNFbXB0eShjb250ZXh0KSkgcmV0dXJuIG9wdGlvbnMuZm4oY29udGV4dCk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgY29udGV4dCk7XG4gIH0pO1xufVxuXG52YXIgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IHsgMDogJ2RlYnVnJywgMTogJ2luZm8nLCAyOiAnd2FybicsIDM6ICdlcnJvcicgfSxcblxuICAvLyBTdGF0ZSBlbnVtXG4gIERFQlVHOiAwLFxuICBJTkZPOiAxLFxuICBXQVJOOiAyLFxuICBFUlJPUjogMyxcbiAgbGV2ZWw6IDMsXG5cbiAgLy8gY2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgb2JqKSB7XG4gICAgaWYgKGxvZ2dlci5sZXZlbCA8PSBsZXZlbCkge1xuICAgICAgdmFyIG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlW21ldGhvZF0pIHtcbiAgICAgICAgY29uc29sZVttZXRob2RdLmNhbGwoY29uc29sZSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5leHBvcnRzLmxvZ2dlciA9IGxvZ2dlcjtcbmZ1bmN0aW9uIGxvZyhsZXZlbCwgb2JqKSB7IGxvZ2dlci5sb2cobGV2ZWwsIG9iaik7IH1cblxuZXhwb3J0cy5sb2cgPSBsb2c7dmFyIGNyZWF0ZUZyYW1lID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBvYmogPSB7fTtcbiAgVXRpbHMuZXh0ZW5kKG9iaiwgb2JqZWN0KTtcbiAgcmV0dXJuIG9iajtcbn07XG5leHBvcnRzLmNyZWF0ZUZyYW1lID0gY3JlYXRlRnJhbWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgdmFyIGxpbmU7XG4gIGlmIChub2RlICYmIG5vZGUuZmlyc3RMaW5lKSB7XG4gICAgbGluZSA9IG5vZGUuZmlyc3RMaW5lO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBub2RlLmZpcnN0Q29sdW1uO1xuICB9XG5cbiAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIGlmIChsaW5lKSB7XG4gICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcbiAgICB0aGlzLmNvbHVtbiA9IG5vZGUuZmlyc3RDb2x1bW47XG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4Y2VwdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgQ09NUElMRVJfUkVWSVNJT04gPSByZXF1aXJlKFwiLi9iYXNlXCIpLkNPTVBJTEVSX1JFVklTSU9OO1xudmFyIFJFVklTSU9OX0NIQU5HRVMgPSByZXF1aXJlKFwiLi9iYXNlXCIpLlJFVklTSU9OX0NIQU5HRVM7XG5cbmZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIHZhciBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICB2YXIgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitydW50aW1lVmVyc2lvbnMrXCIpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJWZXJzaW9ucytcIikuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKFwiK2NvbXBpbGVySW5mb1sxXStcIikuXCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uOy8vIFRPRE86IFJlbW92ZSB0aGlzIGxpbmUgYW5kIGJyZWFrIHVwIGNvbXBpbGVQYXJ0aWFsXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZVwiKTtcbiAgfVxuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIHZhciBpbnZva2VQYXJ0aWFsV3JhcHBlciA9IGZ1bmN0aW9uKHBhcnRpYWwsIG5hbWUsIGNvbnRleHQsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhKSB7XG4gICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7IHJldHVybiByZXN1bHQ7IH1cblxuICAgIGlmIChlbnYuY29tcGlsZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSB9O1xuICAgICAgcGFydGlhbHNbbmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB7IGRhdGE6IGRhdGEgIT09IHVuZGVmaW5lZCB9LCBlbnYpO1xuICAgICAgcmV0dXJuIHBhcnRpYWxzW25hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZVwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBmbiwgZGF0YSkge1xuICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXTtcbiAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBwcm9ncmFtKGksIGZuLCBkYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHByb2dyYW0oaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIHZhciByZXQgPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIHJldCA9IHt9O1xuICAgICAgICBVdGlscy5leHRlbmQocmV0LCBjb21tb24pO1xuICAgICAgICBVdGlscy5leHRlbmQocmV0LCBwYXJhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4gICAgcHJvZ3JhbVdpdGhEZXB0aDogZW52LlZNLnByb2dyYW1XaXRoRGVwdGgsXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiBudWxsXG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbmFtZXNwYWNlID0gb3B0aW9ucy5wYXJ0aWFsID8gb3B0aW9ucyA6IGVudixcbiAgICAgICAgaGVscGVycyxcbiAgICAgICAgcGFydGlhbHM7XG5cbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIHBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRlbXBsYXRlU3BlYy5jYWxsKFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBuYW1lc3BhY2UsIGNvbnRleHQsXG4gICAgICAgICAgaGVscGVycyxcbiAgICAgICAgICBwYXJ0aWFscyxcbiAgICAgICAgICBvcHRpb25zLmRhdGEpO1xuXG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGVudi5WTS5jaGVja1JldmlzaW9uKGNvbnRhaW5lci5jb21waWxlckluZm8pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydHMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtmdW5jdGlvbiBwcm9ncmFtV2l0aERlcHRoKGksIGZuLCBkYXRhIC8qLCAkZGVwdGggKi8pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuXG4gIHZhciBwcm9nID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIFtjb250ZXh0LCBvcHRpb25zLmRhdGEgfHwgZGF0YV0uY29uY2F0KGFyZ3MpKTtcbiAgfTtcbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGFyZ3MubGVuZ3RoO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0cy5wcm9ncmFtV2l0aERlcHRoID0gcHJvZ3JhbVdpdGhEZXB0aDtmdW5jdGlvbiBwcm9ncmFtKGksIGZuLCBkYXRhKSB7XG4gIHZhciBwcm9nID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMuZGF0YSB8fCBkYXRhKTtcbiAgfTtcbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnRzLnByb2dyYW0gPSBwcm9ncmFtO2Z1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEpIHtcbiAgdmFyIG9wdGlvbnMgPSB7IHBhcnRpYWw6IHRydWUsIGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSB9O1xuXG4gIGlmKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gIH0gZWxzZSBpZihwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO2Z1bmN0aW9uIG5vb3AoKSB7IHJldHVybiBcIlwiOyB9XG5cbmV4cG9ydHMubm9vcCA9IG5vb3A7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIlwiICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNhZmVTdHJpbmc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKmpzaGludCAtVzAwNCAqL1xudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9zYWZlLXN0cmluZ1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBlc2NhcGUgPSB7XG4gIFwiJlwiOiBcIiZhbXA7XCIsXG4gIFwiPFwiOiBcIiZsdDtcIixcbiAgXCI+XCI6IFwiJmd0O1wiLFxuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIidcIjogXCImI3gyNztcIixcbiAgXCJgXCI6IFwiJiN4NjA7XCJcbn07XG5cbnZhciBiYWRDaGFycyA9IC9bJjw+XCInYF0vZztcbnZhciBwb3NzaWJsZSA9IC9bJjw+XCInYF0vO1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl0gfHwgXCImYW1wO1wiO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqLCB2YWx1ZSkge1xuICBmb3IodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmV4dGVuZCA9IGV4dGVuZDt2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9O1xufVxudmFyIGlzRnVuY3Rpb247XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIFNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAoIXN0cmluZyAmJiBzdHJpbmcgIT09IDApIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gIHN0cmluZyA9IFwiXCIgKyBzdHJpbmc7XG5cbiAgaWYoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydHMuZXNjYXBlRXhwcmVzc2lvbiA9IGVzY2FwZUV4cHJlc3Npb247ZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNFbXB0eSA9IGlzRW1wdHk7IiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFycy9ydW50aW1lXCIpW1wiZGVmYXVsdFwiXTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cblxuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRlc3RpbmdFeHBvc2VDeWNsZUNvdW50ID0gZ2xvYmFsLnRlc3RpbmdFeHBvc2VDeWNsZUNvdW50O1xuXG4gIC8vIERldGVjdCBhbmQgZG8gYmFzaWMgc2FuaXR5IGNoZWNraW5nIG9uIE9iamVjdC9BcnJheS5vYnNlcnZlLlxuICBmdW5jdGlvbiBkZXRlY3RPYmplY3RPYnNlcnZlKCkge1xuICAgIGlmICh0eXBlb2YgT2JqZWN0Lm9ic2VydmUgIT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZW9mIEFycmF5Lm9ic2VydmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socmVjcykge1xuICAgICAgcmVjb3JkcyA9IHJlY3M7XG4gICAgfVxuXG4gICAgdmFyIHRlc3QgPSB7fTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgT2JqZWN0Lm9ic2VydmUodGVzdCwgY2FsbGJhY2spO1xuICAgIEFycmF5Lm9ic2VydmUoYXJyLCBjYWxsYmFjayk7XG4gICAgdGVzdC5pZCA9IDE7XG4gICAgdGVzdC5pZCA9IDI7XG4gICAgZGVsZXRlIHRlc3QuaWQ7XG4gICAgYXJyLnB1c2goMSwgMik7XG4gICAgYXJyLmxlbmd0aCA9IDA7XG5cbiAgICBPYmplY3QuZGVsaXZlckNoYW5nZVJlY29yZHMoY2FsbGJhY2spO1xuICAgIGlmIChyZWNvcmRzLmxlbmd0aCAhPT0gNSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChyZWNvcmRzWzBdLnR5cGUgIT0gJ2FkZCcgfHxcbiAgICAgICAgcmVjb3Jkc1sxXS50eXBlICE9ICd1cGRhdGUnIHx8XG4gICAgICAgIHJlY29yZHNbMl0udHlwZSAhPSAnZGVsZXRlJyB8fFxuICAgICAgICByZWNvcmRzWzNdLnR5cGUgIT0gJ3NwbGljZScgfHxcbiAgICAgICAgcmVjb3Jkc1s0XS50eXBlICE9ICdzcGxpY2UnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgT2JqZWN0LnVub2JzZXJ2ZSh0ZXN0LCBjYWxsYmFjayk7XG4gICAgQXJyYXkudW5vYnNlcnZlKGFyciwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgaGFzT2JzZXJ2ZSA9IGRldGVjdE9iamVjdE9ic2VydmUoKTtcblxuICBmdW5jdGlvbiBkZXRlY3RFdmFsKCkge1xuICAgIC8vIERvbid0IHRlc3QgZm9yIGV2YWwgaWYgd2UncmUgcnVubmluZyBpbiBhIENocm9tZSBBcHAgZW52aXJvbm1lbnQuXG4gICAgLy8gV2UgY2hlY2sgZm9yIEFQSXMgc2V0IHRoYXQgb25seSBleGlzdCBpbiBhIENocm9tZSBBcHAgY29udGV4dC5cbiAgICBpZiAodHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY2hyb21lLmFwcCAmJiBjaHJvbWUuYXBwLnJ1bnRpbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94IE9TIEFwcHMgZG8gbm90IGFsbG93IGV2YWwuIFRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaXMgdmVyeSBoYWNreVxuICAgIC8vIGJ1dCBldmVuIGlmIHNvbWUgb3RoZXIgcGxhdGZvcm0gYWRkcyBzdXBwb3J0IGZvciB0aGlzIGZ1bmN0aW9uIHRoaXMgY29kZVxuICAgIC8vIHdpbGwgY29udGludWUgdG8gd29yay5cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IuZ2V0RGV2aWNlU3RvcmFnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgZiA9IG5ldyBGdW5jdGlvbignJywgJ3JldHVybiB0cnVlOycpO1xuICAgICAgcmV0dXJuIGYoKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhciBoYXNFdmFsID0gZGV0ZWN0RXZhbCgpO1xuXG4gIGZ1bmN0aW9uIGlzSW5kZXgocykge1xuICAgIHJldHVybiArcyA9PT0gcyA+Pj4gMCAmJiBzICE9PSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvTnVtYmVyKHMpIHtcbiAgICByZXR1cm4gK3M7XG4gIH1cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgfVxuXG4gIHZhciBudW1iZXJJc05hTiA9IGdsb2JhbC5OdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBnbG9iYWwuaXNOYU4odmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJlU2FtZVZhbHVlKGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGxlZnQgPT09IHJpZ2h0KVxuICAgICAgcmV0dXJuIGxlZnQgIT09IDAgfHwgMSAvIGxlZnQgPT09IDEgLyByaWdodDtcbiAgICBpZiAobnVtYmVySXNOYU4obGVmdCkgJiYgbnVtYmVySXNOYU4ocmlnaHQpKVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gbGVmdCAhPT0gbGVmdCAmJiByaWdodCAhPT0gcmlnaHQ7XG4gIH1cblxuICB2YXIgY3JlYXRlT2JqZWN0ID0gKCdfX3Byb3RvX18nIGluIHt9KSA/XG4gICAgZnVuY3Rpb24ob2JqKSB7IHJldHVybiBvYmo7IH0gOlxuICAgIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIHByb3RvID0gb2JqLl9fcHJvdG9fXztcbiAgICAgIGlmICghcHJvdG8pXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB2YXIgbmV3T2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqZWN0LCBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH07XG5cbiAgdmFyIGlkZW50U3RhcnQgPSAnW1xcJF9hLXpBLVpdJztcbiAgdmFyIGlkZW50UGFydCA9ICdbXFwkX2EtekEtWjAtOV0nO1xuICB2YXIgaWRlbnRSZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIGlkZW50U3RhcnQgKyAnKycgKyBpZGVudFBhcnQgKyAnKicgKyAnJCcpO1xuXG4gIGZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZShjaGFyKSB7XG4gICAgaWYgKGNoYXIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAnZW9mJztcblxuICAgIHZhciBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXG4gICAgc3dpdGNoKGNvZGUpIHtcbiAgICAgIGNhc2UgMHg1QjogLy8gW1xuICAgICAgY2FzZSAweDVEOiAvLyBdXG4gICAgICBjYXNlIDB4MkU6IC8vIC5cbiAgICAgIGNhc2UgMHgyMjogLy8gXCJcbiAgICAgIGNhc2UgMHgyNzogLy8gJ1xuICAgICAgY2FzZSAweDMwOiAvLyAwXG4gICAgICAgIHJldHVybiBjaGFyO1xuXG4gICAgICBjYXNlIDB4NUY6IC8vIF9cbiAgICAgIGNhc2UgMHgyNDogLy8gJFxuICAgICAgICByZXR1cm4gJ2lkZW50JztcblxuICAgICAgY2FzZSAweDIwOiAvLyBTcGFjZVxuICAgICAgY2FzZSAweDA5OiAvLyBUYWJcbiAgICAgIGNhc2UgMHgwQTogLy8gTmV3bGluZVxuICAgICAgY2FzZSAweDBEOiAvLyBSZXR1cm5cbiAgICAgIGNhc2UgMHhBMDogIC8vIE5vLWJyZWFrIHNwYWNlXG4gICAgICBjYXNlIDB4RkVGRjogIC8vIEJ5dGUgT3JkZXIgTWFya1xuICAgICAgY2FzZSAweDIwMjg6ICAvLyBMaW5lIFNlcGFyYXRvclxuICAgICAgY2FzZSAweDIwMjk6ICAvLyBQYXJhZ3JhcGggU2VwYXJhdG9yXG4gICAgICAgIHJldHVybiAnd3MnO1xuICAgIH1cblxuICAgIC8vIGEteiwgQS1aXG4gICAgaWYgKCgweDYxIDw9IGNvZGUgJiYgY29kZSA8PSAweDdBKSB8fCAoMHg0MSA8PSBjb2RlICYmIGNvZGUgPD0gMHg1QSkpXG4gICAgICByZXR1cm4gJ2lkZW50JztcblxuICAgIC8vIDEtOVxuICAgIGlmICgweDMxIDw9IGNvZGUgJiYgY29kZSA8PSAweDM5KVxuICAgICAgcmV0dXJuICdudW1iZXInO1xuXG4gICAgcmV0dXJuICdlbHNlJztcbiAgfVxuXG4gIHZhciBwYXRoU3RhdGVNYWNoaW5lID0ge1xuICAgICdiZWZvcmVQYXRoJzoge1xuICAgICAgJ3dzJzogWydiZWZvcmVQYXRoJ10sXG4gICAgICAnaWRlbnQnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG4gICAgICAnWyc6IFsnYmVmb3JlRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJ11cbiAgICB9LFxuXG4gICAgJ2luUGF0aCc6IHtcbiAgICAgICd3cyc6IFsnaW5QYXRoJ10sXG4gICAgICAnLic6IFsnYmVmb3JlSWRlbnQnXSxcbiAgICAgICdbJzogWydiZWZvcmVFbGVtZW50J10sXG4gICAgICAnZW9mJzogWydhZnRlclBhdGgnXVxuICAgIH0sXG5cbiAgICAnYmVmb3JlSWRlbnQnOiB7XG4gICAgICAnd3MnOiBbJ2JlZm9yZUlkZW50J10sXG4gICAgICAnaWRlbnQnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ11cbiAgICB9LFxuXG4gICAgJ2luSWRlbnQnOiB7XG4gICAgICAnaWRlbnQnOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG4gICAgICAnMCc6IFsnaW5JZGVudCcsICdhcHBlbmQnXSxcbiAgICAgICdudW1iZXInOiBbJ2luSWRlbnQnLCAnYXBwZW5kJ10sXG4gICAgICAnd3MnOiBbJ2luUGF0aCcsICdwdXNoJ10sXG4gICAgICAnLic6IFsnYmVmb3JlSWRlbnQnLCAncHVzaCddLFxuICAgICAgJ1snOiBbJ2JlZm9yZUVsZW1lbnQnLCAncHVzaCddLFxuICAgICAgJ2VvZic6IFsnYWZ0ZXJQYXRoJywgJ3B1c2gnXVxuICAgIH0sXG5cbiAgICAnYmVmb3JlRWxlbWVudCc6IHtcbiAgICAgICd3cyc6IFsnYmVmb3JlRWxlbWVudCddLFxuICAgICAgJzAnOiBbJ2FmdGVyWmVybycsICdhcHBlbmQnXSxcbiAgICAgICdudW1iZXInOiBbJ2luSW5kZXgnLCAnYXBwZW5kJ10sXG4gICAgICBcIidcIjogWydpblNpbmdsZVF1b3RlJywgJ2FwcGVuZCcsICcnXSxcbiAgICAgICdcIic6IFsnaW5Eb3VibGVRdW90ZScsICdhcHBlbmQnLCAnJ11cbiAgICB9LFxuXG4gICAgJ2FmdGVyWmVybyc6IHtcbiAgICAgICd3cyc6IFsnYWZ0ZXJFbGVtZW50JywgJ3B1c2gnXSxcbiAgICAgICddJzogWydpblBhdGgnLCAncHVzaCddXG4gICAgfSxcblxuICAgICdpbkluZGV4Jzoge1xuICAgICAgJzAnOiBbJ2luSW5kZXgnLCAnYXBwZW5kJ10sXG4gICAgICAnbnVtYmVyJzogWydpbkluZGV4JywgJ2FwcGVuZCddLFxuICAgICAgJ3dzJzogWydhZnRlckVsZW1lbnQnXSxcbiAgICAgICddJzogWydpblBhdGgnLCAncHVzaCddXG4gICAgfSxcblxuICAgICdpblNpbmdsZVF1b3RlJzoge1xuICAgICAgXCInXCI6IFsnYWZ0ZXJFbGVtZW50J10sXG4gICAgICAnZW9mJzogWydlcnJvciddLFxuICAgICAgJ2Vsc2UnOiBbJ2luU2luZ2xlUXVvdGUnLCAnYXBwZW5kJ11cbiAgICB9LFxuXG4gICAgJ2luRG91YmxlUXVvdGUnOiB7XG4gICAgICAnXCInOiBbJ2FmdGVyRWxlbWVudCddLFxuICAgICAgJ2VvZic6IFsnZXJyb3InXSxcbiAgICAgICdlbHNlJzogWydpbkRvdWJsZVF1b3RlJywgJ2FwcGVuZCddXG4gICAgfSxcblxuICAgICdhZnRlckVsZW1lbnQnOiB7XG4gICAgICAnd3MnOiBbJ2FmdGVyRWxlbWVudCddLFxuICAgICAgJ10nOiBbJ2luUGF0aCcsICdwdXNoJ11cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub29wKCkge31cblxuICBmdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgdmFyIGMsIG5ld0NoYXIsIGtleSwgdHlwZSwgdHJhbnNpdGlvbiwgYWN0aW9uLCB0eXBlTWFwLCBtb2RlID0gJ2JlZm9yZVBhdGgnO1xuXG4gICAgdmFyIGFjdGlvbnMgPSB7XG4gICAgICBwdXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgfSxcblxuICAgICAgYXBwZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGtleSA9IG5ld0NoYXJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGtleSArPSBuZXdDaGFyO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXliZVVuZXNjYXBlUXVvdGUoKSB7XG4gICAgICBpZiAoaW5kZXggPj0gcGF0aC5sZW5ndGgpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgdmFyIG5leHRDaGFyID0gcGF0aFtpbmRleCArIDFdO1xuICAgICAgaWYgKChtb2RlID09ICdpblNpbmdsZVF1b3RlJyAmJiBuZXh0Q2hhciA9PSBcIidcIikgfHxcbiAgICAgICAgICAobW9kZSA9PSAnaW5Eb3VibGVRdW90ZScgJiYgbmV4dENoYXIgPT0gJ1wiJykpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgbmV3Q2hhciA9IG5leHRDaGFyO1xuICAgICAgICBhY3Rpb25zLmFwcGVuZCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAobW9kZSkge1xuICAgICAgaW5kZXgrKztcbiAgICAgIGMgPSBwYXRoW2luZGV4XTtcblxuICAgICAgaWYgKGMgPT0gJ1xcXFwnICYmIG1heWJlVW5lc2NhcGVRdW90ZShtb2RlKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYyk7XG4gICAgICB0eXBlTWFwID0gcGF0aFN0YXRlTWFjaGluZVttb2RlXTtcbiAgICAgIHRyYW5zaXRpb24gPSB0eXBlTWFwW3R5cGVdIHx8IHR5cGVNYXBbJ2Vsc2UnXSB8fCAnZXJyb3InO1xuXG4gICAgICBpZiAodHJhbnNpdGlvbiA9PSAnZXJyb3InKVxuICAgICAgICByZXR1cm47IC8vIHBhcnNlIGVycm9yO1xuXG4gICAgICBtb2RlID0gdHJhbnNpdGlvblswXTtcbiAgICAgIGFjdGlvbiA9IGFjdGlvbnNbdHJhbnNpdGlvblsxXV0gfHwgbm9vcDtcbiAgICAgIG5ld0NoYXIgPSB0cmFuc2l0aW9uWzJdID09PSB1bmRlZmluZWQgPyBjIDogdHJhbnNpdGlvblsyXTtcbiAgICAgIGFjdGlvbigpO1xuXG4gICAgICBpZiAobW9kZSA9PT0gJ2FmdGVyUGF0aCcpIHtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuOyAvLyBwYXJzZSBlcnJvclxuICB9XG5cbiAgZnVuY3Rpb24gaXNJZGVudChzKSB7XG4gICAgcmV0dXJuIGlkZW50UmVnRXhwLnRlc3Qocyk7XG4gIH1cblxuICB2YXIgY29uc3RydWN0b3JJc1ByaXZhdGUgPSB7fTtcblxuICBmdW5jdGlvbiBQYXRoKHBhcnRzLCBwcml2YXRlVG9rZW4pIHtcbiAgICBpZiAocHJpdmF0ZVRva2VuICE9PSBjb25zdHJ1Y3RvcklzUHJpdmF0ZSlcbiAgICAgIHRocm93IEVycm9yKCdVc2UgUGF0aC5nZXQgdG8gcmV0cmlldmUgcGF0aCBvYmplY3RzJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnB1c2goU3RyaW5nKHBhcnRzW2ldKSk7XG4gICAgfVxuXG4gICAgaWYgKGhhc0V2YWwgJiYgdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2V0VmFsdWVGcm9tID0gdGhpcy5jb21waWxlZEdldFZhbHVlRnJvbUZuKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyhyYWZhZWx3KTogTWFrZSBzaW1wbGUgTFJVIGNhY2hlXG4gIHZhciBwYXRoQ2FjaGUgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRQYXRoKHBhdGhTdHJpbmcpIHtcbiAgICBpZiAocGF0aFN0cmluZyBpbnN0YW5jZW9mIFBhdGgpXG4gICAgICByZXR1cm4gcGF0aFN0cmluZztcblxuICAgIGlmIChwYXRoU3RyaW5nID09IG51bGwgfHwgcGF0aFN0cmluZy5sZW5ndGggPT0gMClcbiAgICAgIHBhdGhTdHJpbmcgPSAnJztcblxuICAgIGlmICh0eXBlb2YgcGF0aFN0cmluZyAhPSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzSW5kZXgocGF0aFN0cmluZy5sZW5ndGgpKSB7XG4gICAgICAgIC8vIENvbnN0cnVjdGVkIHdpdGggYXJyYXktbGlrZSAocHJlLXBhcnNlZCkga2V5c1xuICAgICAgICByZXR1cm4gbmV3IFBhdGgocGF0aFN0cmluZywgY29uc3RydWN0b3JJc1ByaXZhdGUpO1xuICAgICAgfVxuXG4gICAgICBwYXRoU3RyaW5nID0gU3RyaW5nKHBhdGhTdHJpbmcpO1xuICAgIH1cblxuICAgIHZhciBwYXRoID0gcGF0aENhY2hlW3BhdGhTdHJpbmddO1xuICAgIGlmIChwYXRoKVxuICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICB2YXIgcGFydHMgPSBwYXJzZVBhdGgocGF0aFN0cmluZyk7XG4gICAgaWYgKCFwYXJ0cylcbiAgICAgIHJldHVybiBpbnZhbGlkUGF0aDtcblxuICAgIHZhciBwYXRoID0gbmV3IFBhdGgocGFydHMsIGNvbnN0cnVjdG9ySXNQcml2YXRlKTtcbiAgICBwYXRoQ2FjaGVbcGF0aFN0cmluZ10gPSBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgUGF0aC5nZXQgPSBnZXRQYXRoO1xuXG4gIGZ1bmN0aW9uIGZvcm1hdEFjY2Vzc29yKGtleSkge1xuICAgIGlmIChpc0luZGV4KGtleSkpIHtcbiAgICAgIHJldHVybiAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnW1wiJyArIGtleS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJztcbiAgICB9XG4gIH1cblxuICBQYXRoLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG4gICAgX19wcm90b19fOiBbXSxcbiAgICB2YWxpZDogdHJ1ZSxcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYXRoU3RyaW5nID0gJyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXNbaV07XG4gICAgICAgIGlmIChpc0lkZW50KGtleSkpIHtcbiAgICAgICAgICBwYXRoU3RyaW5nICs9IGkgPyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aFN0cmluZyArPSBmb3JtYXRBY2Nlc3NvcihrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXRoU3RyaW5nO1xuICAgIH0sXG5cbiAgICBnZXRWYWx1ZUZyb206IGZ1bmN0aW9uKG9iaiwgZGlyZWN0T2JzZXJ2ZXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvYmogPSBvYmpbdGhpc1tpXV07XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICBpdGVyYXRlT2JqZWN0czogZnVuY3Rpb24ob2JqLCBvYnNlcnZlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkpXG4gICAgICAgICAgb2JqID0gb2JqW3RoaXNbaSAtIDFdXTtcbiAgICAgICAgaWYgKCFpc09iamVjdChvYmopKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb2JzZXJ2ZShvYmosIHRoaXNbMF0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21waWxlZEdldFZhbHVlRnJvbUZuOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgIHZhciBwYXRoU3RyaW5nID0gJ29iaic7XG4gICAgICBzdHIgKz0gJ2lmIChvYmogIT0gbnVsbCc7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIga2V5O1xuICAgICAgZm9yICg7IGkgPCAodGhpcy5sZW5ndGggLSAxKTsgaSsrKSB7XG4gICAgICAgIGtleSA9IHRoaXNbaV07XG4gICAgICAgIHBhdGhTdHJpbmcgKz0gaXNJZGVudChrZXkpID8gJy4nICsga2V5IDogZm9ybWF0QWNjZXNzb3Ioa2V5KTtcbiAgICAgICAgc3RyICs9ICcgJiZcXG4gICAgICcgKyBwYXRoU3RyaW5nICsgJyAhPSBudWxsJztcbiAgICAgIH1cbiAgICAgIHN0ciArPSAnKVxcbic7XG5cbiAgICAgIHZhciBrZXkgPSB0aGlzW2ldO1xuICAgICAgcGF0aFN0cmluZyArPSBpc0lkZW50KGtleSkgPyAnLicgKyBrZXkgOiBmb3JtYXRBY2Nlc3NvcihrZXkpO1xuXG4gICAgICBzdHIgKz0gJyAgcmV0dXJuICcgKyBwYXRoU3RyaW5nICsgJztcXG5lbHNlXFxuICByZXR1cm4gdW5kZWZpbmVkOyc7XG4gICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdvYmonLCBzdHIpO1xuICAgIH0sXG5cbiAgICBzZXRWYWx1ZUZyb206IGZ1bmN0aW9uKG9iaiwgdmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAoIWlzT2JqZWN0KG9iaikpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBvYmogPSBvYmpbdGhpc1tpXV07XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNPYmplY3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBvYmpbdGhpc1tpXV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGludmFsaWRQYXRoID0gbmV3IFBhdGgoJycsIGNvbnN0cnVjdG9ySXNQcml2YXRlKTtcbiAgaW52YWxpZFBhdGgudmFsaWQgPSBmYWxzZTtcbiAgaW52YWxpZFBhdGguZ2V0VmFsdWVGcm9tID0gaW52YWxpZFBhdGguc2V0VmFsdWVGcm9tID0gZnVuY3Rpb24oKSB7fTtcblxuICB2YXIgTUFYX0RJUlRZX0NIRUNLX0NZQ0xFUyA9IDEwMDA7XG5cbiAgZnVuY3Rpb24gZGlydHlDaGVjayhvYnNlcnZlcikge1xuICAgIHZhciBjeWNsZXMgPSAwO1xuICAgIHdoaWxlIChjeWNsZXMgPCBNQVhfRElSVFlfQ0hFQ0tfQ1lDTEVTICYmIG9ic2VydmVyLmNoZWNrXygpKSB7XG4gICAgICBjeWNsZXMrKztcbiAgICB9XG4gICAgaWYgKHRlc3RpbmdFeHBvc2VDeWNsZUNvdW50KVxuICAgICAgZ2xvYmFsLmRpcnR5Q2hlY2tDeWNsZUNvdW50ID0gY3ljbGVzO1xuXG4gICAgcmV0dXJuIGN5Y2xlcyA+IDA7XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RJc0VtcHR5KG9iamVjdCkge1xuICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZklzRW1wdHkoZGlmZikge1xuICAgIHJldHVybiBvYmplY3RJc0VtcHR5KGRpZmYuYWRkZWQpICYmXG4gICAgICAgICAgIG9iamVjdElzRW1wdHkoZGlmZi5yZW1vdmVkKSAmJlxuICAgICAgICAgICBvYmplY3RJc0VtcHR5KGRpZmYuY2hhbmdlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaWZmT2JqZWN0RnJvbU9sZE9iamVjdChvYmplY3QsIG9sZE9iamVjdCkge1xuICAgIHZhciBhZGRlZCA9IHt9O1xuICAgIHZhciByZW1vdmVkID0ge307XG4gICAgdmFyIGNoYW5nZWQgPSB7fTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gb2xkT2JqZWN0KSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBvYmplY3RbcHJvcF07XG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlID09PSBvbGRPYmplY3RbcHJvcF0pXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoIShwcm9wIGluIG9iamVjdCkpIHtcbiAgICAgICAgcmVtb3ZlZFtwcm9wXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkT2JqZWN0W3Byb3BdKVxuICAgICAgICBjaGFuZ2VkW3Byb3BdID0gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgIGlmIChwcm9wIGluIG9sZE9iamVjdClcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGFkZGVkW3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0Lmxlbmd0aCAhPT0gb2xkT2JqZWN0Lmxlbmd0aClcbiAgICAgIGNoYW5nZWQubGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcblxuICAgIHJldHVybiB7XG4gICAgICBhZGRlZDogYWRkZWQsXG4gICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgY2hhbmdlZDogY2hhbmdlZFxuICAgIH07XG4gIH1cblxuICB2YXIgZW9tVGFza3MgPSBbXTtcbiAgZnVuY3Rpb24gcnVuRU9NVGFza3MoKSB7XG4gICAgaWYgKCFlb21UYXNrcy5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVvbVRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlb21UYXNrc1tpXSgpO1xuICAgIH1cbiAgICBlb21UYXNrcy5sZW5ndGggPSAwO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHJ1bkVPTSA9IGhhc09ic2VydmUgPyAoZnVuY3Rpb24oKXtcbiAgICB2YXIgZW9tT2JqID0geyBwaW5nUG9uZzogdHJ1ZSB9O1xuICAgIHZhciBlb21SdW5TY2hlZHVsZWQgPSBmYWxzZTtcblxuICAgIE9iamVjdC5vYnNlcnZlKGVvbU9iaiwgZnVuY3Rpb24oKSB7XG4gICAgICBydW5FT01UYXNrcygpO1xuICAgICAgZW9tUnVuU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZm4pIHtcbiAgICAgIGVvbVRhc2tzLnB1c2goZm4pO1xuICAgICAgaWYgKCFlb21SdW5TY2hlZHVsZWQpIHtcbiAgICAgICAgZW9tUnVuU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgZW9tT2JqLnBpbmdQb25nID0gIWVvbU9iai5waW5nUG9uZztcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihmbikge1xuICAgICAgZW9tVGFza3MucHVzaChmbik7XG4gICAgfTtcbiAgfSkoKTtcblxuICB2YXIgb2JzZXJ2ZWRPYmplY3RDYWNoZSA9IFtdO1xuXG4gIGZ1bmN0aW9uIG5ld09ic2VydmVkT2JqZWN0KCkge1xuICAgIHZhciBvYnNlcnZlcjtcbiAgICB2YXIgb2JqZWN0O1xuICAgIHZhciBkaXNjYXJkUmVjb3JkcyA9IGZhbHNlO1xuICAgIHZhciBmaXJzdCA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZWNvcmRzKSB7XG4gICAgICBpZiAob2JzZXJ2ZXIgJiYgb2JzZXJ2ZXIuc3RhdGVfID09PSBPUEVORUQgJiYgIWRpc2NhcmRSZWNvcmRzKVxuICAgICAgICBvYnNlcnZlci5jaGVja18ocmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IGZ1bmN0aW9uKG9icykge1xuICAgICAgICBpZiAob2JzZXJ2ZXIpXG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ09ic2VydmVkT2JqZWN0IGluIHVzZScpO1xuXG4gICAgICAgIGlmICghZmlyc3QpXG4gICAgICAgICAgT2JqZWN0LmRlbGl2ZXJDaGFuZ2VSZWNvcmRzKGNhbGxiYWNrKTtcblxuICAgICAgICBvYnNlcnZlciA9IG9icztcbiAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBvYnNlcnZlOiBmdW5jdGlvbihvYmosIGFycmF5T2JzZXJ2ZSkge1xuICAgICAgICBvYmplY3QgPSBvYmo7XG4gICAgICAgIGlmIChhcnJheU9ic2VydmUpXG4gICAgICAgICAgQXJyYXkub2JzZXJ2ZShvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIE9iamVjdC5vYnNlcnZlKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIGRlbGl2ZXI6IGZ1bmN0aW9uKGRpc2NhcmQpIHtcbiAgICAgICAgZGlzY2FyZFJlY29yZHMgPSBkaXNjYXJkO1xuICAgICAgICBPYmplY3QuZGVsaXZlckNoYW5nZVJlY29yZHMoY2FsbGJhY2spO1xuICAgICAgICBkaXNjYXJkUmVjb3JkcyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgb2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIE9iamVjdC51bm9ic2VydmUob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgICAgIG9ic2VydmVkT2JqZWN0Q2FjaGUucHVzaCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogVGhlIG9ic2VydmVkU2V0IGFic3RyYWN0aW9uIGlzIGEgcGVyZiBvcHRpbWl6YXRpb24gd2hpY2ggcmVkdWNlcyB0aGUgdG90YWxcbiAgICogbnVtYmVyIG9mIE9iamVjdC5vYnNlcnZlIG9ic2VydmF0aW9ucyBvZiBhIHNldCBvZiBvYmplY3RzLiBUaGUgaWRlYSBpcyB0aGF0XG4gICAqIGdyb3VwcyBvZiBPYnNlcnZlcnMgd2lsbCBoYXZlIHNvbWUgb2JqZWN0IGRlcGVuZGVuY2llcyBpbiBjb21tb24gYW5kIHRoaXNcbiAgICogb2JzZXJ2ZWQgc2V0IGVuc3VyZXMgdGhhdCBlYWNoIG9iamVjdCBpbiB0aGUgdHJhbnNpdGl2ZSBjbG9zdXJlIG9mXG4gICAqIGRlcGVuZGVuY2llcyBpcyBvbmx5IG9ic2VydmVkIG9uY2UuIFRoZSBvYnNlcnZlZFNldCBhY3RzIGFzIGEgd3JpdGUgYmFycmllclxuICAgKiBzdWNoIHRoYXQgd2hlbmV2ZXIgYW55IGNoYW5nZSBjb21lcyB0aHJvdWdoLCBhbGwgT2JzZXJ2ZXJzIGFyZSBjaGVja2VkIGZvclxuICAgKiBjaGFuZ2VkIHZhbHVlcy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgb3B0aW1pemF0aW9uIGlzIGV4cGxpY2l0bHkgbW92aW5nIHdvcmsgZnJvbSBzZXR1cC10aW1lIHRvXG4gICAqIGNoYW5nZS10aW1lLlxuICAgKlxuICAgKiBUT0RPKHJhZmFlbHcpOiBJbXBsZW1lbnQgXCJnYXJiYWdlIGNvbGxlY3Rpb25cIi4gSW4gb3JkZXIgdG8gbW92ZSB3b3JrIG9mZlxuICAgKiB0aGUgY3JpdGljYWwgcGF0aCwgd2hlbiBPYnNlcnZlcnMgYXJlIGNsb3NlZCwgdGhlaXIgb2JzZXJ2ZWQgb2JqZWN0cyBhcmVcbiAgICogbm90IE9iamVjdC51bm9ic2VydmUoZCkuIEFzIGEgcmVzdWx0LCBpdCdzIHBvc3NpYmxlIHRoYXQgaWYgdGhlIG9ic2VydmVkU2V0XG4gICAqIGlzIGtlcHQgb3BlbiwgYnV0IHNvbWUgT2JzZXJ2ZXJzIGhhdmUgYmVlbiBjbG9zZWQsIGl0IGNvdWxkIGNhdXNlIFwibGVha3NcIlxuICAgKiAocHJldmVudCBvdGhlcndpc2UgY29sbGVjdGFibGUgb2JqZWN0cyBmcm9tIGJlaW5nIGNvbGxlY3RlZCkuIEF0IHNvbWVcbiAgICogcG9pbnQsIHdlIHNob3VsZCBpbXBsZW1lbnQgaW5jcmVtZW50YWwgXCJnY1wiIHdoaWNoIGtlZXBzIGEgbGlzdCBvZlxuICAgKiBvYnNlcnZlZFNldHMgd2hpY2ggbWF5IG5lZWQgY2xlYW4tdXAgYW5kIGRvZXMgc21hbGwgYW1vdW50cyBvZiBjbGVhbnVwIG9uIGFcbiAgICogdGltZW91dCB1bnRpbCBhbGwgaXMgY2xlYW4uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldE9ic2VydmVkT2JqZWN0KG9ic2VydmVyLCBvYmplY3QsIGFycmF5T2JzZXJ2ZSkge1xuICAgIHZhciBkaXIgPSBvYnNlcnZlZE9iamVjdENhY2hlLnBvcCgpIHx8IG5ld09ic2VydmVkT2JqZWN0KCk7XG4gICAgZGlyLm9wZW4ob2JzZXJ2ZXIpO1xuICAgIGRpci5vYnNlcnZlKG9iamVjdCwgYXJyYXlPYnNlcnZlKTtcbiAgICByZXR1cm4gZGlyO1xuICB9XG5cbiAgdmFyIG9ic2VydmVkU2V0Q2FjaGUgPSBbXTtcblxuICBmdW5jdGlvbiBuZXdPYnNlcnZlZFNldCgpIHtcbiAgICB2YXIgb2JzZXJ2ZXJDb3VudCA9IDA7XG4gICAgdmFyIG9ic2VydmVycyA9IFtdO1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgdmFyIHJvb3RPYmo7XG4gICAgdmFyIHJvb3RPYmpQcm9wcztcblxuICAgIGZ1bmN0aW9uIG9ic2VydmUob2JqLCBwcm9wKSB7XG4gICAgICBpZiAoIW9iailcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAob2JqID09PSByb290T2JqKVxuICAgICAgICByb290T2JqUHJvcHNbcHJvcF0gPSB0cnVlO1xuXG4gICAgICBpZiAob2JqZWN0cy5pbmRleE9mKG9iaikgPCAwKSB7XG4gICAgICAgIG9iamVjdHMucHVzaChvYmopO1xuICAgICAgICBPYmplY3Qub2JzZXJ2ZShvYmosIGNhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgICAgb2JzZXJ2ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSwgcHJvcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWxsUm9vdE9iak5vbk9ic2VydmVkUHJvcHMocmVjcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByZWMgPSByZWNzW2ldO1xuICAgICAgICBpZiAocmVjLm9iamVjdCAhPT0gcm9vdE9iaiB8fFxuICAgICAgICAgICAgcm9vdE9ialByb3BzW3JlYy5uYW1lXSB8fFxuICAgICAgICAgICAgcmVjLnR5cGUgPT09ICdzZXRQcm90b3R5cGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxsYmFjayhyZWNzKSB7XG4gICAgICBpZiAoYWxsUm9vdE9iak5vbk9ic2VydmVkUHJvcHMocmVjcykpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgdmFyIG9ic2VydmVyO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XG4gICAgICAgIGlmIChvYnNlcnZlci5zdGF0ZV8gPT0gT1BFTkVEKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuaXRlcmF0ZU9iamVjdHNfKG9ic2VydmUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xuICAgICAgICBpZiAob2JzZXJ2ZXIuc3RhdGVfID09IE9QRU5FRCkge1xuICAgICAgICAgIG9ic2VydmVyLmNoZWNrXygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIG9iamVjdDogdW5kZWZpbmVkLFxuICAgICAgb2JqZWN0czogb2JqZWN0cyxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKG9icywgb2JqZWN0KSB7XG4gICAgICAgIGlmICghcm9vdE9iaikge1xuICAgICAgICAgIHJvb3RPYmogPSBvYmplY3Q7XG4gICAgICAgICAgcm9vdE9ialByb3BzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlcnMucHVzaChvYnMpO1xuICAgICAgICBvYnNlcnZlckNvdW50Kys7XG4gICAgICAgIG9icy5pdGVyYXRlT2JqZWN0c18ob2JzZXJ2ZSk7XG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uKG9icykge1xuICAgICAgICBvYnNlcnZlckNvdW50LS07XG4gICAgICAgIGlmIChvYnNlcnZlckNvdW50ID4gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIE9iamVjdC51bm9ic2VydmUob2JqZWN0c1tpXSwgY2FsbGJhY2spO1xuICAgICAgICAgIE9ic2VydmVyLnVub2JzZXJ2ZWRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgIG9iamVjdHMubGVuZ3RoID0gMDtcbiAgICAgICAgcm9vdE9iaiA9IHVuZGVmaW5lZDtcbiAgICAgICAgcm9vdE9ialByb3BzID0gdW5kZWZpbmVkO1xuICAgICAgICBvYnNlcnZlZFNldENhY2hlLnB1c2godGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICB2YXIgbGFzdE9ic2VydmVkU2V0O1xuXG4gIGZ1bmN0aW9uIGdldE9ic2VydmVkU2V0KG9ic2VydmVyLCBvYmopIHtcbiAgICBpZiAoIWxhc3RPYnNlcnZlZFNldCB8fCBsYXN0T2JzZXJ2ZWRTZXQub2JqZWN0ICE9PSBvYmopIHtcbiAgICAgIGxhc3RPYnNlcnZlZFNldCA9IG9ic2VydmVkU2V0Q2FjaGUucG9wKCkgfHwgbmV3T2JzZXJ2ZWRTZXQoKTtcbiAgICAgIGxhc3RPYnNlcnZlZFNldC5vYmplY3QgPSBvYmo7XG4gICAgfVxuICAgIGxhc3RPYnNlcnZlZFNldC5vcGVuKG9ic2VydmVyLCBvYmopO1xuICAgIHJldHVybiBsYXN0T2JzZXJ2ZWRTZXQ7XG4gIH1cblxuICB2YXIgVU5PUEVORUQgPSAwO1xuICB2YXIgT1BFTkVEID0gMTtcbiAgdmFyIENMT1NFRCA9IDI7XG4gIHZhciBSRVNFVFRJTkcgPSAzO1xuXG4gIHZhciBuZXh0T2JzZXJ2ZXJJZCA9IDE7XG5cbiAgZnVuY3Rpb24gT2JzZXJ2ZXIoKSB7XG4gICAgdGhpcy5zdGF0ZV8gPSBVTk9QRU5FRDtcbiAgICB0aGlzLmNhbGxiYWNrXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRhcmdldF8gPSB1bmRlZmluZWQ7IC8vIFRPRE8ocmFmYWVsdyk6IFNob3VsZCBiZSBXZWFrUmVmXG4gICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pZF8gPSBuZXh0T2JzZXJ2ZXJJZCsrO1xuICB9XG5cbiAgT2JzZXJ2ZXIucHJvdG90eXBlID0ge1xuICAgIG9wZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBVTk9QRU5FRClcbiAgICAgICAgdGhyb3cgRXJyb3IoJ09ic2VydmVyIGhhcyBhbHJlYWR5IGJlZW4gb3BlbmVkLicpO1xuXG4gICAgICBhZGRUb0FsbCh0aGlzKTtcbiAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XG4gICAgICB0aGlzLnRhcmdldF8gPSB0YXJnZXQ7XG4gICAgICB0aGlzLmNvbm5lY3RfKCk7XG4gICAgICB0aGlzLnN0YXRlXyA9IE9QRU5FRDtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IE9QRU5FRClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICByZW1vdmVGcm9tQWxsKHRoaXMpO1xuICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xuICAgICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmNhbGxiYWNrXyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudGFyZ2V0XyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuc3RhdGVfID0gQ0xPU0VEO1xuICAgIH0sXG5cbiAgICBkZWxpdmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgZGlydHlDaGVjayh0aGlzKTtcbiAgICB9LFxuXG4gICAgcmVwb3J0XzogZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5jYWxsYmFja18uYXBwbHkodGhpcy50YXJnZXRfLCBjaGFuZ2VzKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIE9ic2VydmVyLl9lcnJvclRocm93bkR1cmluZ0NhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXhjZXB0aW9uIGNhdWdodCBkdXJpbmcgb2JzZXJ2ZXIgY2FsbGJhY2s6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAoZXguc3RhY2sgfHwgZXgpKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzY2FyZENoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jaGVja18odW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9XG4gIH1cblxuICB2YXIgY29sbGVjdE9ic2VydmVycyA9ICFoYXNPYnNlcnZlO1xuICB2YXIgYWxsT2JzZXJ2ZXJzO1xuICBPYnNlcnZlci5fYWxsT2JzZXJ2ZXJzQ291bnQgPSAwO1xuXG4gIGlmIChjb2xsZWN0T2JzZXJ2ZXJzKSB7XG4gICAgYWxsT2JzZXJ2ZXJzID0gW107XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUb0FsbChvYnNlcnZlcikge1xuICAgIE9ic2VydmVyLl9hbGxPYnNlcnZlcnNDb3VudCsrO1xuICAgIGlmICghY29sbGVjdE9ic2VydmVycylcbiAgICAgIHJldHVybjtcblxuICAgIGFsbE9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUZyb21BbGwob2JzZXJ2ZXIpIHtcbiAgICBPYnNlcnZlci5fYWxsT2JzZXJ2ZXJzQ291bnQtLTtcbiAgfVxuXG4gIHZhciBydW5uaW5nTWljcm90YXNrQ2hlY2twb2ludCA9IGZhbHNlO1xuXG4gIGdsb2JhbC5QbGF0Zm9ybSA9IGdsb2JhbC5QbGF0Zm9ybSB8fCB7fTtcblxuICBnbG9iYWwuUGxhdGZvcm0ucGVyZm9ybU1pY3JvdGFza0NoZWNrcG9pbnQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAoIWNvbGxlY3RPYnNlcnZlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBydW5uaW5nTWljcm90YXNrQ2hlY2twb2ludCA9IHRydWU7XG5cbiAgICB2YXIgY3ljbGVzID0gMDtcbiAgICB2YXIgYW55Q2hhbmdlZCwgdG9DaGVjaztcblxuICAgIGRvIHtcbiAgICAgIGN5Y2xlcysrO1xuICAgICAgdG9DaGVjayA9IGFsbE9ic2VydmVycztcbiAgICAgIGFsbE9ic2VydmVycyA9IFtdO1xuICAgICAgYW55Q2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvQ2hlY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gdG9DaGVja1tpXTtcbiAgICAgICAgaWYgKG9ic2VydmVyLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgaWYgKG9ic2VydmVyLmNoZWNrXygpKVxuICAgICAgICAgIGFueUNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICAgIGFsbE9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChydW5FT01UYXNrcygpKVxuICAgICAgICBhbnlDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9IHdoaWxlIChjeWNsZXMgPCBNQVhfRElSVFlfQ0hFQ0tfQ1lDTEVTICYmIGFueUNoYW5nZWQpO1xuXG4gICAgaWYgKHRlc3RpbmdFeHBvc2VDeWNsZUNvdW50KVxuICAgICAgZ2xvYmFsLmRpcnR5Q2hlY2tDeWNsZUNvdW50ID0gY3ljbGVzO1xuXG4gICAgcnVubmluZ01pY3JvdGFza0NoZWNrcG9pbnQgPSBmYWxzZTtcbiAgfTtcblxuICBpZiAoY29sbGVjdE9ic2VydmVycykge1xuICAgIGdsb2JhbC5QbGF0Zm9ybS5jbGVhck9ic2VydmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgYWxsT2JzZXJ2ZXJzID0gW107XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIE9iamVjdE9ic2VydmVyKG9iamVjdCkge1xuICAgIE9ic2VydmVyLmNhbGwodGhpcyk7XG4gICAgdGhpcy52YWx1ZV8gPSBvYmplY3Q7XG4gICAgdGhpcy5vbGRPYmplY3RfID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgT2JqZWN0T2JzZXJ2ZXIucHJvdG90eXBlID0gY3JlYXRlT2JqZWN0KHtcbiAgICBfX3Byb3RvX186IE9ic2VydmVyLnByb3RvdHlwZSxcblxuICAgIGFycmF5T2JzZXJ2ZTogZmFsc2UsXG5cbiAgICBjb25uZWN0XzogZnVuY3Rpb24oY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSBnZXRPYnNlcnZlZE9iamVjdCh0aGlzLCB0aGlzLnZhbHVlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2JzZXJ2ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvcHlPYmplY3Q6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgdmFyIGNvcHkgPSBBcnJheS5pc0FycmF5KG9iamVjdCkgPyBbXSA6IHt9O1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgY29weVtwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICAgIH07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKVxuICAgICAgICBjb3B5Lmxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gICAgICByZXR1cm4gY29weTtcbiAgICB9LFxuXG4gICAgY2hlY2tfOiBmdW5jdGlvbihjaGFuZ2VSZWNvcmRzLCBza2lwQ2hhbmdlcykge1xuICAgICAgdmFyIGRpZmY7XG4gICAgICB2YXIgb2xkVmFsdWVzO1xuICAgICAgaWYgKGhhc09ic2VydmUpIHtcbiAgICAgICAgaWYgKCFjaGFuZ2VSZWNvcmRzKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBvbGRWYWx1ZXMgPSB7fTtcbiAgICAgICAgZGlmZiA9IGRpZmZPYmplY3RGcm9tQ2hhbmdlUmVjb3Jkcyh0aGlzLnZhbHVlXywgY2hhbmdlUmVjb3JkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2xkVmFsdWVzID0gdGhpcy5vbGRPYmplY3RfO1xuICAgICAgICBkaWZmID0gZGlmZk9iamVjdEZyb21PbGRPYmplY3QodGhpcy52YWx1ZV8sIHRoaXMub2xkT2JqZWN0Xyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaWZmSXNFbXB0eShkaWZmKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBpZiAoIWhhc09ic2VydmUpXG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHRoaXMuY29weU9iamVjdCh0aGlzLnZhbHVlXyk7XG5cbiAgICAgIHRoaXMucmVwb3J0XyhbXG4gICAgICAgIGRpZmYuYWRkZWQgfHwge30sXG4gICAgICAgIGRpZmYucmVtb3ZlZCB8fCB7fSxcbiAgICAgICAgZGlmZi5jaGFuZ2VkIHx8IHt9LFxuICAgICAgICBmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiBvbGRWYWx1ZXNbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICBdKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGRpc2Nvbm5lY3RfOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNPYnNlcnZlKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbGRPYmplY3RfID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWxpdmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBPUEVORUQpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaWYgKGhhc09ic2VydmUpXG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfLmRlbGl2ZXIoZmFsc2UpO1xuICAgICAgZWxzZVxuICAgICAgICBkaXJ0eUNoZWNrKHRoaXMpO1xuICAgIH0sXG5cbiAgICBkaXNjYXJkQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5kaXJlY3RPYnNlcnZlcl8pXG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfLmRlbGl2ZXIodHJ1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMub2xkT2JqZWN0XyA9IHRoaXMuY29weU9iamVjdCh0aGlzLnZhbHVlXyk7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIEFycmF5T2JzZXJ2ZXIoYXJyYXkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKVxuICAgICAgdGhyb3cgRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBpcyBub3QgYW4gQXJyYXknKTtcbiAgICBPYmplY3RPYnNlcnZlci5jYWxsKHRoaXMsIGFycmF5KTtcbiAgfVxuXG4gIEFycmF5T2JzZXJ2ZXIucHJvdG90eXBlID0gY3JlYXRlT2JqZWN0KHtcblxuICAgIF9fcHJvdG9fXzogT2JqZWN0T2JzZXJ2ZXIucHJvdG90eXBlLFxuXG4gICAgYXJyYXlPYnNlcnZlOiB0cnVlLFxuXG4gICAgY29weU9iamVjdDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcykge1xuICAgICAgdmFyIHNwbGljZXM7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICBpZiAoIWNoYW5nZVJlY29yZHMpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzcGxpY2VzID0gcHJvamVjdEFycmF5U3BsaWNlcyh0aGlzLnZhbHVlXywgY2hhbmdlUmVjb3Jkcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGxpY2VzID0gY2FsY1NwbGljZXModGhpcy52YWx1ZV8sIDAsIHRoaXMudmFsdWVfLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2xkT2JqZWN0XywgMCwgdGhpcy5vbGRPYmplY3RfLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3BsaWNlcyB8fCAhc3BsaWNlcy5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKCFoYXNPYnNlcnZlKVxuICAgICAgICB0aGlzLm9sZE9iamVjdF8gPSB0aGlzLmNvcHlPYmplY3QodGhpcy52YWx1ZV8pO1xuXG4gICAgICB0aGlzLnJlcG9ydF8oW3NwbGljZXNdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgQXJyYXlPYnNlcnZlci5hcHBseVNwbGljZXMgPSBmdW5jdGlvbihwcmV2aW91cywgY3VycmVudCwgc3BsaWNlcykge1xuICAgIHNwbGljZXMuZm9yRWFjaChmdW5jdGlvbihzcGxpY2UpIHtcbiAgICAgIHZhciBzcGxpY2VBcmdzID0gW3NwbGljZS5pbmRleCwgc3BsaWNlLnJlbW92ZWQubGVuZ3RoXTtcbiAgICAgIHZhciBhZGRJbmRleCA9IHNwbGljZS5pbmRleDtcbiAgICAgIHdoaWxlIChhZGRJbmRleCA8IHNwbGljZS5pbmRleCArIHNwbGljZS5hZGRlZENvdW50KSB7XG4gICAgICAgIHNwbGljZUFyZ3MucHVzaChjdXJyZW50W2FkZEluZGV4XSk7XG4gICAgICAgIGFkZEluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkocHJldmlvdXMsIHNwbGljZUFyZ3MpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFBhdGhPYnNlcnZlcihvYmplY3QsIHBhdGgpIHtcbiAgICBPYnNlcnZlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5vYmplY3RfID0gb2JqZWN0O1xuICAgIHRoaXMucGF0aF8gPSBnZXRQYXRoKHBhdGgpO1xuICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgUGF0aE9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG4gICAgX19wcm90b19fOiBPYnNlcnZlci5wcm90b3R5cGUsXG5cbiAgICBnZXQgcGF0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGhfO1xuICAgIH0sXG5cbiAgICBjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSlcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSBnZXRPYnNlcnZlZFNldCh0aGlzLCB0aGlzLm9iamVjdF8pO1xuXG4gICAgICB0aGlzLmNoZWNrXyh1bmRlZmluZWQsIHRydWUpO1xuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHRoaXMuZGlyZWN0T2JzZXJ2ZXJfKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfLmNsb3NlKHRoaXMpO1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXRlcmF0ZU9iamVjdHNfOiBmdW5jdGlvbihvYnNlcnZlKSB7XG4gICAgICB0aGlzLnBhdGhfLml0ZXJhdGVPYmplY3RzKHRoaXMub2JqZWN0Xywgb2JzZXJ2ZSk7XG4gICAgfSxcblxuICAgIGNoZWNrXzogZnVuY3Rpb24oY2hhbmdlUmVjb3Jkcywgc2tpcENoYW5nZXMpIHtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgICAgdGhpcy52YWx1ZV8gPSB0aGlzLnBhdGhfLmdldFZhbHVlRnJvbSh0aGlzLm9iamVjdF8pO1xuICAgICAgaWYgKHNraXBDaGFuZ2VzIHx8IGFyZVNhbWVWYWx1ZSh0aGlzLnZhbHVlXywgb2xkVmFsdWUpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHRoaXMucmVwb3J0XyhbdGhpcy52YWx1ZV8sIG9sZFZhbHVlLCB0aGlzXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5wYXRoXylcbiAgICAgICAgdGhpcy5wYXRoXy5zZXRWYWx1ZUZyb20odGhpcy5vYmplY3RfLCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBDb21wb3VuZE9ic2VydmVyKHJlcG9ydENoYW5nZXNPbk9wZW4pIHtcbiAgICBPYnNlcnZlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5yZXBvcnRDaGFuZ2VzT25PcGVuXyA9IHJlcG9ydENoYW5nZXNPbk9wZW47XG4gICAgdGhpcy52YWx1ZV8gPSBbXTtcbiAgICB0aGlzLmRpcmVjdE9ic2VydmVyXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9ic2VydmVkXyA9IFtdO1xuICB9XG5cbiAgdmFyIG9ic2VydmVyU2VudGluZWwgPSB7fTtcblxuICBDb21wb3VuZE9ic2VydmVyLnByb3RvdHlwZSA9IGNyZWF0ZU9iamVjdCh7XG4gICAgX19wcm90b19fOiBPYnNlcnZlci5wcm90b3R5cGUsXG5cbiAgICBjb25uZWN0XzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzT2JzZXJ2ZSkge1xuICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICB2YXIgbmVlZHNEaXJlY3RPYnNlcnZlciA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgb2JqZWN0ID0gdGhpcy5vYnNlcnZlZF9baV1cbiAgICAgICAgICBpZiAob2JqZWN0ICE9PSBvYnNlcnZlclNlbnRpbmVsKSB7XG4gICAgICAgICAgICBuZWVkc0RpcmVjdE9ic2VydmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZWVkc0RpcmVjdE9ic2VydmVyKVxuICAgICAgICAgIHRoaXMuZGlyZWN0T2JzZXJ2ZXJfID0gZ2V0T2JzZXJ2ZWRTZXQodGhpcywgb2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja18odW5kZWZpbmVkLCAhdGhpcy5yZXBvcnRDaGFuZ2VzT25PcGVuXyk7XG4gICAgfSxcblxuICAgIGRpc2Nvbm5lY3RfOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vYnNlcnZlZF8ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZWRfW2ldID09PSBvYnNlcnZlclNlbnRpbmVsKVxuICAgICAgICAgIHRoaXMub2JzZXJ2ZWRfW2kgKyAxXS5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5vYnNlcnZlZF8ubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMudmFsdWVfLmxlbmd0aCA9IDA7XG5cbiAgICAgIGlmICh0aGlzLmRpcmVjdE9ic2VydmVyXykge1xuICAgICAgICB0aGlzLmRpcmVjdE9ic2VydmVyXy5jbG9zZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RPYnNlcnZlcl8gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFkZFBhdGg6IGZ1bmN0aW9uKG9iamVjdCwgcGF0aCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IFVOT1BFTkVEICYmIHRoaXMuc3RhdGVfICE9IFJFU0VUVElORylcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBhZGQgcGF0aHMgb25jZSBzdGFydGVkLicpO1xuXG4gICAgICB2YXIgcGF0aCA9IGdldFBhdGgocGF0aCk7XG4gICAgICB0aGlzLm9ic2VydmVkXy5wdXNoKG9iamVjdCwgcGF0aCk7XG4gICAgICBpZiAoIXRoaXMucmVwb3J0Q2hhbmdlc09uT3Blbl8pXG4gICAgICAgIHJldHVybjtcbiAgICAgIHZhciBpbmRleCA9IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgdGhpcy52YWx1ZV9baW5kZXhdID0gcGF0aC5nZXRWYWx1ZUZyb20ob2JqZWN0KTtcbiAgICB9LFxuXG4gICAgYWRkT2JzZXJ2ZXI6IGZ1bmN0aW9uKG9ic2VydmVyKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZV8gIT0gVU5PUEVORUQgJiYgdGhpcy5zdGF0ZV8gIT0gUkVTRVRUSU5HKVxuICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGFkZCBvYnNlcnZlcnMgb25jZSBzdGFydGVkLicpO1xuXG4gICAgICB0aGlzLm9ic2VydmVkXy5wdXNoKG9ic2VydmVyU2VudGluZWwsIG9ic2VydmVyKTtcbiAgICAgIGlmICghdGhpcy5yZXBvcnRDaGFuZ2VzT25PcGVuXylcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIGluZGV4ID0gdGhpcy5vYnNlcnZlZF8ubGVuZ3RoIC8gMiAtIDE7XG4gICAgICB0aGlzLnZhbHVlX1tpbmRleF0gPSBvYnNlcnZlci5vcGVuKHRoaXMuZGVsaXZlciwgdGhpcyk7XG4gICAgfSxcblxuICAgIHN0YXJ0UmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGVfICE9IE9QRU5FRClcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBvbmx5IHJlc2V0IHdoaWxlIG9wZW4nKTtcblxuICAgICAgdGhpcy5zdGF0ZV8gPSBSRVNFVFRJTkc7XG4gICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XG4gICAgfSxcblxuICAgIGZpbmlzaFJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlXyAhPSBSRVNFVFRJTkcpXG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gb25seSBmaW5pc2hSZXNldCBhZnRlciBzdGFydFJlc2V0Jyk7XG4gICAgICB0aGlzLnN0YXRlXyA9IE9QRU5FRDtcbiAgICAgIHRoaXMuY29ubmVjdF8oKTtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH0sXG5cbiAgICBpdGVyYXRlT2JqZWN0c186IGZ1bmN0aW9uKG9ic2VydmUpIHtcbiAgICAgIHZhciBvYmplY3Q7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub2JzZXJ2ZWRfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIG9iamVjdCA9IHRoaXMub2JzZXJ2ZWRfW2ldXG4gICAgICAgIGlmIChvYmplY3QgIT09IG9ic2VydmVyU2VudGluZWwpXG4gICAgICAgICAgdGhpcy5vYnNlcnZlZF9baSArIDFdLml0ZXJhdGVPYmplY3RzKG9iamVjdCwgb2JzZXJ2ZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tfOiBmdW5jdGlvbihjaGFuZ2VSZWNvcmRzLCBza2lwQ2hhbmdlcykge1xuICAgICAgdmFyIG9sZFZhbHVlcztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vYnNlcnZlZF8ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHRoaXMub2JzZXJ2ZWRfW2ldO1xuICAgICAgICB2YXIgcGF0aCA9IHRoaXMub2JzZXJ2ZWRfW2krMV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgaWYgKG9iamVjdCA9PT0gb2JzZXJ2ZXJTZW50aW5lbCkge1xuICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gcGF0aDtcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMuc3RhdGVfID09PSBVTk9QRU5FRCA/XG4gICAgICAgICAgICAgIG9ic2VydmFibGUub3Blbih0aGlzLmRlbGl2ZXIsIHRoaXMpIDpcbiAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5kaXNjYXJkQ2hhbmdlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gcGF0aC5nZXRWYWx1ZUZyb20ob2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChza2lwQ2hhbmdlcykge1xuICAgICAgICAgIHRoaXMudmFsdWVfW2kgLyAyXSA9IHZhbHVlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZVNhbWVWYWx1ZSh2YWx1ZSwgdGhpcy52YWx1ZV9baSAvIDJdKSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBvbGRWYWx1ZXMgPSBvbGRWYWx1ZXMgfHwgW107XG4gICAgICAgIG9sZFZhbHVlc1tpIC8gMl0gPSB0aGlzLnZhbHVlX1tpIC8gMl07XG4gICAgICAgIHRoaXMudmFsdWVfW2kgLyAyXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9sZFZhbHVlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBUT0RPKHJhZmFlbHcpOiBIYXZpbmcgb2JzZXJ2ZWRfIGFzIHRoZSB0aGlyZCBjYWxsYmFjayBhcmcgaGVyZSBpc1xuICAgICAgLy8gcHJldHR5IGxhbWUgQVBJLiBGaXguXG4gICAgICB0aGlzLnJlcG9ydF8oW3RoaXMudmFsdWVfLCBvbGRWYWx1ZXMsIHRoaXMub2JzZXJ2ZWRfXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGlkZW50Rm4odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XG5cbiAgZnVuY3Rpb24gT2JzZXJ2ZXJUcmFuc2Zvcm0ob2JzZXJ2YWJsZSwgZ2V0VmFsdWVGbiwgc2V0VmFsdWVGbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9udFBhc3NUaHJvdWdoU2V0KSB7XG4gICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50YXJnZXRfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub2JzZXJ2YWJsZV8gPSBvYnNlcnZhYmxlO1xuICAgIHRoaXMuZ2V0VmFsdWVGbl8gPSBnZXRWYWx1ZUZuIHx8IGlkZW50Rm47XG4gICAgdGhpcy5zZXRWYWx1ZUZuXyA9IHNldFZhbHVlRm4gfHwgaWRlbnRGbjtcbiAgICAvLyBUT0RPKHJhZmFlbHcpOiBUaGlzIGlzIGEgdGVtcG9yYXJ5IGhhY2suIFBvbHltZXJFeHByZXNzaW9ucyBuZWVkcyB0aGlzXG4gICAgLy8gYXQgdGhlIG1vbWVudCBiZWNhdXNlIG9mIGEgYnVnIGluIGl0J3MgZGVwZW5kZW5jeSB0cmFja2luZy5cbiAgICB0aGlzLmRvbnRQYXNzVGhyb3VnaFNldF8gPSBkb250UGFzc1Rocm91Z2hTZXQ7XG4gIH1cblxuICBPYnNlcnZlclRyYW5zZm9ybS5wcm90b3R5cGUgPSB7XG4gICAgb3BlbjogZnVuY3Rpb24oY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcbiAgICAgIHRoaXMudGFyZ2V0XyA9IHRhcmdldDtcbiAgICAgIHRoaXMudmFsdWVfID1cbiAgICAgICAgICB0aGlzLmdldFZhbHVlRm5fKHRoaXMub2JzZXJ2YWJsZV8ub3Blbih0aGlzLm9ic2VydmVkQ2FsbGJhY2tfLCB0aGlzKSk7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfSxcblxuICAgIG9ic2VydmVkQ2FsbGJhY2tfOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbHVlRm5fKHZhbHVlKTtcbiAgICAgIGlmIChhcmVTYW1lVmFsdWUodmFsdWUsIHRoaXMudmFsdWVfKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZV87XG4gICAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICAgICAgdGhpcy5jYWxsYmFja18uY2FsbCh0aGlzLnRhcmdldF8sIHRoaXMudmFsdWVfLCBvbGRWYWx1ZSk7XG4gICAgfSxcblxuICAgIGRpc2NhcmRDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudmFsdWVfID0gdGhpcy5nZXRWYWx1ZUZuXyh0aGlzLm9ic2VydmFibGVfLmRpc2NhcmRDaGFuZ2VzKCkpO1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgIH0sXG5cbiAgICBkZWxpdmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVfLmRlbGl2ZXIoKTtcbiAgICB9LFxuXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuc2V0VmFsdWVGbl8odmFsdWUpO1xuICAgICAgaWYgKCF0aGlzLmRvbnRQYXNzVGhyb3VnaFNldF8gJiYgdGhpcy5vYnNlcnZhYmxlXy5zZXRWYWx1ZSlcbiAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2YWJsZV8uc2V0VmFsdWUodmFsdWUpO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5vYnNlcnZhYmxlXylcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlXy5jbG9zZSgpO1xuICAgICAgdGhpcy5jYWxsYmFja18gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnRhcmdldF8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm9ic2VydmFibGVfID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmdldFZhbHVlRm5fID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5zZXRWYWx1ZUZuXyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICB2YXIgZXhwZWN0ZWRSZWNvcmRUeXBlcyA9IHtcbiAgICBhZGQ6IHRydWUsXG4gICAgdXBkYXRlOiB0cnVlLFxuICAgIGRlbGV0ZTogdHJ1ZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRpZmZPYmplY3RGcm9tQ2hhbmdlUmVjb3JkcyhvYmplY3QsIGNoYW5nZVJlY29yZHMsIG9sZFZhbHVlcykge1xuICAgIHZhciBhZGRlZCA9IHt9O1xuICAgIHZhciByZW1vdmVkID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZVJlY29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByZWNvcmQgPSBjaGFuZ2VSZWNvcmRzW2ldO1xuICAgICAgaWYgKCFleHBlY3RlZFJlY29yZFR5cGVzW3JlY29yZC50eXBlXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdVbmtub3duIGNoYW5nZVJlY29yZCB0eXBlOiAnICsgcmVjb3JkLnR5cGUpO1xuICAgICAgICBjb25zb2xlLmVycm9yKHJlY29yZCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShyZWNvcmQubmFtZSBpbiBvbGRWYWx1ZXMpKVxuICAgICAgICBvbGRWYWx1ZXNbcmVjb3JkLm5hbWVdID0gcmVjb3JkLm9sZFZhbHVlO1xuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT0gJ3VwZGF0ZScpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT0gJ2FkZCcpIHtcbiAgICAgICAgaWYgKHJlY29yZC5uYW1lIGluIHJlbW92ZWQpXG4gICAgICAgICAgZGVsZXRlIHJlbW92ZWRbcmVjb3JkLm5hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgYWRkZWRbcmVjb3JkLm5hbWVdID0gdHJ1ZTtcblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdHlwZSA9ICdkZWxldGUnXG4gICAgICBpZiAocmVjb3JkLm5hbWUgaW4gYWRkZWQpIHtcbiAgICAgICAgZGVsZXRlIGFkZGVkW3JlY29yZC5uYW1lXTtcbiAgICAgICAgZGVsZXRlIG9sZFZhbHVlc1tyZWNvcmQubmFtZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVkW3JlY29yZC5uYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBhZGRlZClcbiAgICAgIGFkZGVkW3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuXG4gICAgZm9yICh2YXIgcHJvcCBpbiByZW1vdmVkKVxuICAgICAgcmVtb3ZlZFtwcm9wXSA9IHVuZGVmaW5lZDtcblxuICAgIHZhciBjaGFuZ2VkID0ge307XG4gICAgZm9yICh2YXIgcHJvcCBpbiBvbGRWYWx1ZXMpIHtcbiAgICAgIGlmIChwcm9wIGluIGFkZGVkIHx8IHByb3AgaW4gcmVtb3ZlZClcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHZhciBuZXdWYWx1ZSA9IG9iamVjdFtwcm9wXTtcbiAgICAgIGlmIChvbGRWYWx1ZXNbcHJvcF0gIT09IG5ld1ZhbHVlKVxuICAgICAgICBjaGFuZ2VkW3Byb3BdID0gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZGVkOiBhZGRlZCxcbiAgICAgIHJlbW92ZWQ6IHJlbW92ZWQsXG4gICAgICBjaGFuZ2VkOiBjaGFuZ2VkXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1NwbGljZShpbmRleCwgcmVtb3ZlZCwgYWRkZWRDb3VudCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgYWRkZWRDb3VudDogYWRkZWRDb3VudFxuICAgIH07XG4gIH1cblxuICB2YXIgRURJVF9MRUFWRSA9IDA7XG4gIHZhciBFRElUX1VQREFURSA9IDE7XG4gIHZhciBFRElUX0FERCA9IDI7XG4gIHZhciBFRElUX0RFTEVURSA9IDM7XG5cbiAgZnVuY3Rpb24gQXJyYXlTcGxpY2UoKSB7fVxuXG4gIEFycmF5U3BsaWNlLnByb3RvdHlwZSA9IHtcblxuICAgIC8vIE5vdGU6IFRoaXMgZnVuY3Rpb24gaXMgKmJhc2VkKiBvbiB0aGUgY29tcHV0YXRpb24gb2YgdGhlIExldmVuc2h0ZWluXG4gICAgLy8gXCJlZGl0XCIgZGlzdGFuY2UuIFRoZSBvbmUgY2hhbmdlIGlzIHRoYXQgXCJ1cGRhdGVzXCIgYXJlIHRyZWF0ZWQgYXMgdHdvXG4gICAgLy8gZWRpdHMgLSBub3Qgb25lLiBXaXRoIEFycmF5IHNwbGljZXMsIGFuIHVwZGF0ZSBpcyByZWFsbHkgYSBkZWxldGVcbiAgICAvLyBmb2xsb3dlZCBieSBhbiBhZGQuIEJ5IHJldGFpbmluZyB0aGlzLCB3ZSBvcHRpbWl6ZSBmb3IgXCJrZWVwaW5nXCIgdGhlXG4gICAgLy8gbWF4aW11bSBhcnJheSBpdGVtcyBpbiB0aGUgb3JpZ2luYWwgYXJyYXkuIEZvciBleGFtcGxlOlxuICAgIC8vXG4gICAgLy8gICAneHh4eDEyMycgLT4gJzEyM3l5eXknXG4gICAgLy9cbiAgICAvLyBXaXRoIDEtZWRpdCB1cGRhdGVzLCB0aGUgc2hvcnRlc3QgcGF0aCB3b3VsZCBiZSBqdXN0IHRvIHVwZGF0ZSBhbGwgc2V2ZW5cbiAgICAvLyBjaGFyYWN0ZXJzLiBXaXRoIDItZWRpdCB1cGRhdGVzLCB3ZSBkZWxldGUgNCwgbGVhdmUgMywgYW5kIGFkZCA0LiBUaGlzXG4gICAgLy8gbGVhdmVzIHRoZSBzdWJzdHJpbmcgJzEyMycgaW50YWN0LlxuICAgIGNhbGNFZGl0RGlzdGFuY2VzOiBmdW5jdGlvbihjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCkge1xuICAgICAgLy8gXCJEZWxldGlvblwiIGNvbHVtbnNcbiAgICAgIHZhciByb3dDb3VudCA9IG9sZEVuZCAtIG9sZFN0YXJ0ICsgMTtcbiAgICAgIHZhciBjb2x1bW5Db3VudCA9IGN1cnJlbnRFbmQgLSBjdXJyZW50U3RhcnQgKyAxO1xuICAgICAgdmFyIGRpc3RhbmNlcyA9IG5ldyBBcnJheShyb3dDb3VudCk7XG5cbiAgICAgIC8vIFwiQWRkaXRpb25cIiByb3dzLiBJbml0aWFsaXplIG51bGwgY29sdW1uLlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dDb3VudDsgaSsrKSB7XG4gICAgICAgIGRpc3RhbmNlc1tpXSA9IG5ldyBBcnJheShjb2x1bW5Db3VudCk7XG4gICAgICAgIGRpc3RhbmNlc1tpXVswXSA9IGk7XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgbnVsbCByb3dcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sdW1uQ291bnQ7IGorKylcbiAgICAgICAgZGlzdGFuY2VzWzBdW2pdID0gajtcblxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCByb3dDb3VudDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgY29sdW1uQ291bnQ7IGorKykge1xuICAgICAgICAgIGlmICh0aGlzLmVxdWFscyhjdXJyZW50W2N1cnJlbnRTdGFydCArIGogLSAxXSwgb2xkW29sZFN0YXJ0ICsgaSAtIDFdKSlcbiAgICAgICAgICAgIGRpc3RhbmNlc1tpXVtqXSA9IGRpc3RhbmNlc1tpIC0gMV1baiAtIDFdO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vcnRoID0gZGlzdGFuY2VzW2kgLSAxXVtqXSArIDE7XG4gICAgICAgICAgICB2YXIgd2VzdCA9IGRpc3RhbmNlc1tpXVtqIC0gMV0gKyAxO1xuICAgICAgICAgICAgZGlzdGFuY2VzW2ldW2pdID0gbm9ydGggPCB3ZXN0ID8gbm9ydGggOiB3ZXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGlzdGFuY2VzO1xuICAgIH0sXG5cbiAgICAvLyBUaGlzIHN0YXJ0cyBhdCB0aGUgZmluYWwgd2VpZ2h0LCBhbmQgd2Fsa3MgXCJiYWNrd2FyZFwiIGJ5IGZpbmRpbmdcbiAgICAvLyB0aGUgbWluaW11bSBwcmV2aW91cyB3ZWlnaHQgcmVjdXJzaXZlbHkgdW50aWwgdGhlIG9yaWdpbiBvZiB0aGUgd2VpZ2h0XG4gICAgLy8gbWF0cml4LlxuICAgIHNwbGljZU9wZXJhdGlvbnNGcm9tRWRpdERpc3RhbmNlczogZnVuY3Rpb24oZGlzdGFuY2VzKSB7XG4gICAgICB2YXIgaSA9IGRpc3RhbmNlcy5sZW5ndGggLSAxO1xuICAgICAgdmFyIGogPSBkaXN0YW5jZXNbMF0ubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBjdXJyZW50ID0gZGlzdGFuY2VzW2ldW2pdO1xuICAgICAgdmFyIGVkaXRzID0gW107XG4gICAgICB3aGlsZSAoaSA+IDAgfHwgaiA+IDApIHtcbiAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgIGVkaXRzLnB1c2goRURJVF9BREQpO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaiA9PSAwKSB7XG4gICAgICAgICAgZWRpdHMucHVzaChFRElUX0RFTEVURSk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub3J0aFdlc3QgPSBkaXN0YW5jZXNbaSAtIDFdW2ogLSAxXTtcbiAgICAgICAgdmFyIHdlc3QgPSBkaXN0YW5jZXNbaSAtIDFdW2pdO1xuICAgICAgICB2YXIgbm9ydGggPSBkaXN0YW5jZXNbaV1baiAtIDFdO1xuXG4gICAgICAgIHZhciBtaW47XG4gICAgICAgIGlmICh3ZXN0IDwgbm9ydGgpXG4gICAgICAgICAgbWluID0gd2VzdCA8IG5vcnRoV2VzdCA/IHdlc3QgOiBub3J0aFdlc3Q7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtaW4gPSBub3J0aCA8IG5vcnRoV2VzdCA/IG5vcnRoIDogbm9ydGhXZXN0O1xuXG4gICAgICAgIGlmIChtaW4gPT0gbm9ydGhXZXN0KSB7XG4gICAgICAgICAgaWYgKG5vcnRoV2VzdCA9PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfTEVBVkUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfVVBEQVRFKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub3J0aFdlc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGktLTtcbiAgICAgICAgICBqLS07XG4gICAgICAgIH0gZWxzZSBpZiAobWluID09IHdlc3QpIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKEVESVRfREVMRVRFKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgY3VycmVudCA9IHdlc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdHMucHVzaChFRElUX0FERCk7XG4gICAgICAgICAgai0tO1xuICAgICAgICAgIGN1cnJlbnQgPSBub3J0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBlZGl0cy5yZXZlcnNlKCk7XG4gICAgICByZXR1cm4gZWRpdHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNwbGljZSBQcm9qZWN0aW9uIGZ1bmN0aW9uczpcbiAgICAgKlxuICAgICAqIEEgc3BsaWNlIG1hcCBpcyBhIHJlcHJlc2VudGF0aW9uIG9mIGhvdyBhIHByZXZpb3VzIGFycmF5IG9mIGl0ZW1zXG4gICAgICogd2FzIHRyYW5zZm9ybWVkIGludG8gYSBuZXcgYXJyYXkgb2YgaXRlbXMuIENvbmNlcHR1YWxseSBpdCBpcyBhIGxpc3Qgb2ZcbiAgICAgKiB0dXBsZXMgb2ZcbiAgICAgKlxuICAgICAqICAgPGluZGV4LCByZW1vdmVkLCBhZGRlZENvdW50PlxuICAgICAqXG4gICAgICogd2hpY2ggYXJlIGtlcHQgaW4gYXNjZW5kaW5nIGluZGV4IG9yZGVyIG9mLiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGF0IGF0XG4gICAgICogdGhlIHxpbmRleHwsIHxyZW1vdmVkfCBzZXF1ZW5jZSBvZiBpdGVtcyB3ZXJlIHJlbW92ZWQsIGFuZCBjb3VudGluZyBmb3J3YXJkXG4gICAgICogZnJvbSB8aW5kZXh8LCB8YWRkZWRDb3VudHwgaXRlbXMgd2VyZSBhZGRlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExhY2tpbmcgaW5kaXZpZHVhbCBzcGxpY2UgbXV0YXRpb24gaW5mb3JtYXRpb24sIHRoZSBtaW5pbWFsIHNldCBvZlxuICAgICAqIHNwbGljZXMgY2FuIGJlIHN5bnRoZXNpemVkIGdpdmVuIHRoZSBwcmV2aW91cyBzdGF0ZSBhbmQgZmluYWwgc3RhdGUgb2YgYW5cbiAgICAgKiBhcnJheS4gVGhlIGJhc2ljIGFwcHJvYWNoIGlzIHRvIGNhbGN1bGF0ZSB0aGUgZWRpdCBkaXN0YW5jZSBtYXRyaXggYW5kXG4gICAgICogY2hvb3NlIHRoZSBzaG9ydGVzdCBwYXRoIHRocm91Z2ggaXQuXG4gICAgICpcbiAgICAgKiBDb21wbGV4aXR5OiBPKGwgKiBwKVxuICAgICAqICAgbDogVGhlIGxlbmd0aCBvZiB0aGUgY3VycmVudCBhcnJheVxuICAgICAqICAgcDogVGhlIGxlbmd0aCBvZiB0aGUgb2xkIGFycmF5XG4gICAgICovXG4gICAgY2FsY1NwbGljZXM6IGZ1bmN0aW9uKGN1cnJlbnQsIGN1cnJlbnRTdGFydCwgY3VycmVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKSB7XG4gICAgICB2YXIgcHJlZml4Q291bnQgPSAwO1xuICAgICAgdmFyIHN1ZmZpeENvdW50ID0gMDtcblxuICAgICAgdmFyIG1pbkxlbmd0aCA9IE1hdGgubWluKGN1cnJlbnRFbmQgLSBjdXJyZW50U3RhcnQsIG9sZEVuZCAtIG9sZFN0YXJ0KTtcbiAgICAgIGlmIChjdXJyZW50U3RhcnQgPT0gMCAmJiBvbGRTdGFydCA9PSAwKVxuICAgICAgICBwcmVmaXhDb3VudCA9IHRoaXMuc2hhcmVkUHJlZml4KGN1cnJlbnQsIG9sZCwgbWluTGVuZ3RoKTtcblxuICAgICAgaWYgKGN1cnJlbnRFbmQgPT0gY3VycmVudC5sZW5ndGggJiYgb2xkRW5kID09IG9sZC5sZW5ndGgpXG4gICAgICAgIHN1ZmZpeENvdW50ID0gdGhpcy5zaGFyZWRTdWZmaXgoY3VycmVudCwgb2xkLCBtaW5MZW5ndGggLSBwcmVmaXhDb3VudCk7XG5cbiAgICAgIGN1cnJlbnRTdGFydCArPSBwcmVmaXhDb3VudDtcbiAgICAgIG9sZFN0YXJ0ICs9IHByZWZpeENvdW50O1xuICAgICAgY3VycmVudEVuZCAtPSBzdWZmaXhDb3VudDtcbiAgICAgIG9sZEVuZCAtPSBzdWZmaXhDb3VudDtcblxuICAgICAgaWYgKGN1cnJlbnRFbmQgLSBjdXJyZW50U3RhcnQgPT0gMCAmJiBvbGRFbmQgLSBvbGRTdGFydCA9PSAwKVxuICAgICAgICByZXR1cm4gW107XG5cbiAgICAgIGlmIChjdXJyZW50U3RhcnQgPT0gY3VycmVudEVuZCkge1xuICAgICAgICB2YXIgc3BsaWNlID0gbmV3U3BsaWNlKGN1cnJlbnRTdGFydCwgW10sIDApO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnQgPCBvbGRFbmQpXG4gICAgICAgICAgc3BsaWNlLnJlbW92ZWQucHVzaChvbGRbb2xkU3RhcnQrK10pO1xuXG4gICAgICAgIHJldHVybiBbIHNwbGljZSBdO1xuICAgICAgfSBlbHNlIGlmIChvbGRTdGFydCA9PSBvbGRFbmQpXG4gICAgICAgIHJldHVybiBbIG5ld1NwbGljZShjdXJyZW50U3RhcnQsIFtdLCBjdXJyZW50RW5kIC0gY3VycmVudFN0YXJ0KSBdO1xuXG4gICAgICB2YXIgb3BzID0gdGhpcy5zcGxpY2VPcGVyYXRpb25zRnJvbUVkaXREaXN0YW5jZXMoXG4gICAgICAgICAgdGhpcy5jYWxjRWRpdERpc3RhbmNlcyhjdXJyZW50LCBjdXJyZW50U3RhcnQsIGN1cnJlbnRFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQpKTtcblxuICAgICAgdmFyIHNwbGljZSA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBzcGxpY2VzID0gW107XG4gICAgICB2YXIgaW5kZXggPSBjdXJyZW50U3RhcnQ7XG4gICAgICB2YXIgb2xkSW5kZXggPSBvbGRTdGFydDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN3aXRjaChvcHNbaV0pIHtcbiAgICAgICAgICBjYXNlIEVESVRfTEVBVkU6XG4gICAgICAgICAgICBpZiAoc3BsaWNlKSB7XG4gICAgICAgICAgICAgIHNwbGljZXMucHVzaChzcGxpY2UpO1xuICAgICAgICAgICAgICBzcGxpY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBvbGRJbmRleCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFRElUX1VQREFURTpcbiAgICAgICAgICAgIGlmICghc3BsaWNlKVxuICAgICAgICAgICAgICBzcGxpY2UgPSBuZXdTcGxpY2UoaW5kZXgsIFtdLCAwKTtcblxuICAgICAgICAgICAgc3BsaWNlLmFkZGVkQ291bnQrKztcbiAgICAgICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgICAgIHNwbGljZS5yZW1vdmVkLnB1c2gob2xkW29sZEluZGV4XSk7XG4gICAgICAgICAgICBvbGRJbmRleCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFRElUX0FERDpcbiAgICAgICAgICAgIGlmICghc3BsaWNlKVxuICAgICAgICAgICAgICBzcGxpY2UgPSBuZXdTcGxpY2UoaW5kZXgsIFtdLCAwKTtcblxuICAgICAgICAgICAgc3BsaWNlLmFkZGVkQ291bnQrKztcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVESVRfREVMRVRFOlxuICAgICAgICAgICAgaWYgKCFzcGxpY2UpXG4gICAgICAgICAgICAgIHNwbGljZSA9IG5ld1NwbGljZShpbmRleCwgW10sIDApO1xuXG4gICAgICAgICAgICBzcGxpY2UucmVtb3ZlZC5wdXNoKG9sZFtvbGRJbmRleF0pO1xuICAgICAgICAgICAgb2xkSW5kZXgrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzcGxpY2UpIHtcbiAgICAgICAgc3BsaWNlcy5wdXNoKHNwbGljZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3BsaWNlcztcbiAgICB9LFxuXG4gICAgc2hhcmVkUHJlZml4OiBmdW5jdGlvbihjdXJyZW50LCBvbGQsIHNlYXJjaExlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hMZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhjdXJyZW50W2ldLCBvbGRbaV0pKVxuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgcmV0dXJuIHNlYXJjaExlbmd0aDtcbiAgICB9LFxuXG4gICAgc2hhcmVkU3VmZml4OiBmdW5jdGlvbihjdXJyZW50LCBvbGQsIHNlYXJjaExlbmd0aCkge1xuICAgICAgdmFyIGluZGV4MSA9IGN1cnJlbnQubGVuZ3RoO1xuICAgICAgdmFyIGluZGV4MiA9IG9sZC5sZW5ndGg7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgd2hpbGUgKGNvdW50IDwgc2VhcmNoTGVuZ3RoICYmIHRoaXMuZXF1YWxzKGN1cnJlbnRbLS1pbmRleDFdLCBvbGRbLS1pbmRleDJdKSlcbiAgICAgICAgY291bnQrKztcblxuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH0sXG5cbiAgICBjYWxjdWxhdGVTcGxpY2VzOiBmdW5jdGlvbihjdXJyZW50LCBwcmV2aW91cykge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsY1NwbGljZXMoY3VycmVudCwgMCwgY3VycmVudC5sZW5ndGgsIHByZXZpb3VzLCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubGVuZ3RoKTtcbiAgICB9LFxuXG4gICAgZXF1YWxzOiBmdW5jdGlvbihjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHJldHVybiBjdXJyZW50VmFsdWUgPT09IHByZXZpb3VzVmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIHZhciBhcnJheVNwbGljZSA9IG5ldyBBcnJheVNwbGljZSgpO1xuXG4gIGZ1bmN0aW9uIGNhbGNTcGxpY2VzKGN1cnJlbnQsIGN1cnJlbnRTdGFydCwgY3VycmVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKSB7XG4gICAgcmV0dXJuIGFycmF5U3BsaWNlLmNhbGNTcGxpY2VzKGN1cnJlbnQsIGN1cnJlbnRTdGFydCwgY3VycmVudEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkLCBvbGRTdGFydCwgb2xkRW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVyc2VjdChzdGFydDEsIGVuZDEsIHN0YXJ0MiwgZW5kMikge1xuICAgIC8vIERpc2pvaW50XG4gICAgaWYgKGVuZDEgPCBzdGFydDIgfHwgZW5kMiA8IHN0YXJ0MSlcbiAgICAgIHJldHVybiAtMTtcblxuICAgIC8vIEFkamFjZW50XG4gICAgaWYgKGVuZDEgPT0gc3RhcnQyIHx8IGVuZDIgPT0gc3RhcnQxKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICAvLyBOb24temVybyBpbnRlcnNlY3QsIHNwYW4xIGZpcnN0XG4gICAgaWYgKHN0YXJ0MSA8IHN0YXJ0Mikge1xuICAgICAgaWYgKGVuZDEgPCBlbmQyKVxuICAgICAgICByZXR1cm4gZW5kMSAtIHN0YXJ0MjsgLy8gT3ZlcmxhcFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gZW5kMiAtIHN0YXJ0MjsgLy8gQ29udGFpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vbi16ZXJvIGludGVyc2VjdCwgc3BhbjIgZmlyc3RcbiAgICAgIGlmIChlbmQyIDwgZW5kMSlcbiAgICAgICAgcmV0dXJuIGVuZDIgLSBzdGFydDE7IC8vIE92ZXJsYXBcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGVuZDEgLSBzdGFydDE7IC8vIENvbnRhaW5lZFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlU3BsaWNlKHNwbGljZXMsIGluZGV4LCByZW1vdmVkLCBhZGRlZENvdW50KSB7XG5cbiAgICB2YXIgc3BsaWNlID0gbmV3U3BsaWNlKGluZGV4LCByZW1vdmVkLCBhZGRlZENvdW50KTtcblxuICAgIHZhciBpbnNlcnRlZCA9IGZhbHNlO1xuICAgIHZhciBpbnNlcnRpb25PZmZzZXQgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY3VycmVudCA9IHNwbGljZXNbaV07XG4gICAgICBjdXJyZW50LmluZGV4ICs9IGluc2VydGlvbk9mZnNldDtcblxuICAgICAgaWYgKGluc2VydGVkKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdmFyIGludGVyc2VjdENvdW50ID0gaW50ZXJzZWN0KHNwbGljZS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGxpY2UuaW5kZXggKyBzcGxpY2UucmVtb3ZlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmluZGV4ICsgY3VycmVudC5hZGRlZENvdW50KTtcblxuICAgICAgaWYgKGludGVyc2VjdENvdW50ID49IDApIHtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIHR3byBzcGxpY2VzXG5cbiAgICAgICAgc3BsaWNlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcblxuICAgICAgICBpbnNlcnRpb25PZmZzZXQgLT0gY3VycmVudC5hZGRlZENvdW50IC0gY3VycmVudC5yZW1vdmVkLmxlbmd0aDtcblxuICAgICAgICBzcGxpY2UuYWRkZWRDb3VudCArPSBjdXJyZW50LmFkZGVkQ291bnQgLSBpbnRlcnNlY3RDb3VudDtcbiAgICAgICAgdmFyIGRlbGV0ZUNvdW50ID0gc3BsaWNlLnJlbW92ZWQubGVuZ3RoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5yZW1vdmVkLmxlbmd0aCAtIGludGVyc2VjdENvdW50O1xuXG4gICAgICAgIGlmICghc3BsaWNlLmFkZGVkQ291bnQgJiYgIWRlbGV0ZUNvdW50KSB7XG4gICAgICAgICAgLy8gbWVyZ2VkIHNwbGljZSBpcyBhIG5vb3AuIGRpc2NhcmQuXG4gICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByZW1vdmVkID0gY3VycmVudC5yZW1vdmVkO1xuXG4gICAgICAgICAgaWYgKHNwbGljZS5pbmRleCA8IGN1cnJlbnQuaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIHNvbWUgcHJlZml4IG9mIHNwbGljZS5yZW1vdmVkIGlzIHByZXBlbmRlZCB0byBjdXJyZW50LnJlbW92ZWQuXG4gICAgICAgICAgICB2YXIgcHJlcGVuZCA9IHNwbGljZS5yZW1vdmVkLnNsaWNlKDAsIGN1cnJlbnQuaW5kZXggLSBzcGxpY2UuaW5kZXgpO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocHJlcGVuZCwgcmVtb3ZlZCk7XG4gICAgICAgICAgICByZW1vdmVkID0gcHJlcGVuZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3BsaWNlLmluZGV4ICsgc3BsaWNlLnJlbW92ZWQubGVuZ3RoID4gY3VycmVudC5pbmRleCArIGN1cnJlbnQuYWRkZWRDb3VudCkge1xuICAgICAgICAgICAgLy8gc29tZSBzdWZmaXggb2Ygc3BsaWNlLnJlbW92ZWQgaXMgYXBwZW5kZWQgdG8gY3VycmVudC5yZW1vdmVkLlxuICAgICAgICAgICAgdmFyIGFwcGVuZCA9IHNwbGljZS5yZW1vdmVkLnNsaWNlKGN1cnJlbnQuaW5kZXggKyBjdXJyZW50LmFkZGVkQ291bnQgLSBzcGxpY2UuaW5kZXgpO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocmVtb3ZlZCwgYXBwZW5kKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzcGxpY2UucmVtb3ZlZCA9IHJlbW92ZWQ7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXggPCBzcGxpY2UuaW5kZXgpIHtcbiAgICAgICAgICAgIHNwbGljZS5pbmRleCA9IGN1cnJlbnQuaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNwbGljZS5pbmRleCA8IGN1cnJlbnQuaW5kZXgpIHtcbiAgICAgICAgLy8gSW5zZXJ0IHNwbGljZSBoZXJlLlxuXG4gICAgICAgIGluc2VydGVkID0gdHJ1ZTtcblxuICAgICAgICBzcGxpY2VzLnNwbGljZShpLCAwLCBzcGxpY2UpO1xuICAgICAgICBpKys7XG5cbiAgICAgICAgdmFyIG9mZnNldCA9IHNwbGljZS5hZGRlZENvdW50IC0gc3BsaWNlLnJlbW92ZWQubGVuZ3RoXG4gICAgICAgIGN1cnJlbnQuaW5kZXggKz0gb2Zmc2V0O1xuICAgICAgICBpbnNlcnRpb25PZmZzZXQgKz0gb2Zmc2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW5zZXJ0ZWQpXG4gICAgICBzcGxpY2VzLnB1c2goc3BsaWNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxTcGxpY2VzKGFycmF5LCBjaGFuZ2VSZWNvcmRzKSB7XG4gICAgdmFyIHNwbGljZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJlY29yZCA9IGNoYW5nZVJlY29yZHNbaV07XG4gICAgICBzd2l0Y2gocmVjb3JkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgICBtZXJnZVNwbGljZShzcGxpY2VzLCByZWNvcmQuaW5kZXgsIHJlY29yZC5yZW1vdmVkLnNsaWNlKCksIHJlY29yZC5hZGRlZENvdW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgY2FzZSAndXBkYXRlJzpcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICBpZiAoIWlzSW5kZXgocmVjb3JkLm5hbWUpKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgdmFyIGluZGV4ID0gdG9OdW1iZXIocmVjb3JkLm5hbWUpO1xuICAgICAgICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICBtZXJnZVNwbGljZShzcGxpY2VzLCBpbmRleCwgW3JlY29yZC5vbGRWYWx1ZV0sIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgcmVjb3JkIHR5cGU6ICcgKyBKU09OLnN0cmluZ2lmeShyZWNvcmQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3BsaWNlcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2plY3RBcnJheVNwbGljZXMoYXJyYXksIGNoYW5nZVJlY29yZHMpIHtcbiAgICB2YXIgc3BsaWNlcyA9IFtdO1xuXG4gICAgY3JlYXRlSW5pdGlhbFNwbGljZXMoYXJyYXksIGNoYW5nZVJlY29yZHMpLmZvckVhY2goZnVuY3Rpb24oc3BsaWNlKSB7XG4gICAgICBpZiAoc3BsaWNlLmFkZGVkQ291bnQgPT0gMSAmJiBzcGxpY2UucmVtb3ZlZC5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAoc3BsaWNlLnJlbW92ZWRbMF0gIT09IGFycmF5W3NwbGljZS5pbmRleF0pXG4gICAgICAgICAgc3BsaWNlcy5wdXNoKHNwbGljZSk7XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9O1xuXG4gICAgICBzcGxpY2VzID0gc3BsaWNlcy5jb25jYXQoY2FsY1NwbGljZXMoYXJyYXksIHNwbGljZS5pbmRleCwgc3BsaWNlLmluZGV4ICsgc3BsaWNlLmFkZGVkQ291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BsaWNlLnJlbW92ZWQsIDAsIHNwbGljZS5yZW1vdmVkLmxlbmd0aCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNwbGljZXM7XG4gIH1cblxuICBnbG9iYWwuT2JzZXJ2ZXIgPSBPYnNlcnZlcjtcbiAgZ2xvYmFsLk9ic2VydmVyLnJ1bkVPTV8gPSBydW5FT007XG4gIGdsb2JhbC5PYnNlcnZlci5vYnNlcnZlclNlbnRpbmVsXyA9IG9ic2VydmVyU2VudGluZWw7IC8vIGZvciB0ZXN0aW5nLlxuICBnbG9iYWwuT2JzZXJ2ZXIuaGFzT2JqZWN0T2JzZXJ2ZSA9IGhhc09ic2VydmU7XG4gIGdsb2JhbC5BcnJheU9ic2VydmVyID0gQXJyYXlPYnNlcnZlcjtcbiAgZ2xvYmFsLkFycmF5T2JzZXJ2ZXIuY2FsY3VsYXRlU3BsaWNlcyA9IGZ1bmN0aW9uKGN1cnJlbnQsIHByZXZpb3VzKSB7XG4gICAgcmV0dXJuIGFycmF5U3BsaWNlLmNhbGN1bGF0ZVNwbGljZXMoY3VycmVudCwgcHJldmlvdXMpO1xuICB9O1xuXG4gIGdsb2JhbC5BcnJheVNwbGljZSA9IEFycmF5U3BsaWNlO1xuICBnbG9iYWwuT2JqZWN0T2JzZXJ2ZXIgPSBPYmplY3RPYnNlcnZlcjtcbiAgZ2xvYmFsLlBhdGhPYnNlcnZlciA9IFBhdGhPYnNlcnZlcjtcbiAgZ2xvYmFsLkNvbXBvdW5kT2JzZXJ2ZXIgPSBDb21wb3VuZE9ic2VydmVyO1xuICBnbG9iYWwuUGF0aCA9IFBhdGg7XG4gIGdsb2JhbC5PYnNlcnZlclRyYW5zZm9ybSA9IE9ic2VydmVyVHJhbnNmb3JtO1xufSkodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZSA/IGdsb2JhbCA6IHRoaXMgfHwgd2luZG93KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKGdsb2JhbC4kdHJhY2V1clJ1bnRpbWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyICRPYmplY3QgPSBPYmplY3Q7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICB2YXIgJGNyZWF0ZSA9ICRPYmplY3QuY3JlYXRlO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGZyZWV6ZSA9ICRPYmplY3QuZnJlZXplO1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICB2YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciAka2V5cyA9ICRPYmplY3Qua2V5cztcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9ICRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgJHRvU3RyaW5nID0gJE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gIHZhciAkc2VhbCA9IE9iamVjdC5zZWFsO1xuICB2YXIgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG4gIGZ1bmN0aW9uIG5vbkVudW0odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgdmFyIHR5cGVzID0ge1xuICAgIHZvaWQ6IGZ1bmN0aW9uIHZvaWRUeXBlKCkge30sXG4gICAgYW55OiBmdW5jdGlvbiBhbnkoKSB7fSxcbiAgICBzdHJpbmc6IGZ1bmN0aW9uIHN0cmluZygpIHt9LFxuICAgIG51bWJlcjogZnVuY3Rpb24gbnVtYmVyKCkge30sXG4gICAgYm9vbGVhbjogZnVuY3Rpb24gYm9vbGVhbigpIHt9XG4gIH07XG4gIHZhciBtZXRob2QgPSBub25FbnVtO1xuICB2YXIgY291bnRlciA9IDA7XG4gIGZ1bmN0aW9uIG5ld1VuaXF1ZVN0cmluZygpIHtcbiAgICByZXR1cm4gJ19fJCcgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxZTkpICsgJyQnICsgKytjb3VudGVyICsgJyRfXyc7XG4gIH1cbiAgdmFyIHN5bWJvbEludGVybmFsUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbERlc2NyaXB0aW9uUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbERhdGFQcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sVmFsdWVzID0gJGNyZWF0ZShudWxsKTtcbiAgdmFyIHByaXZhdGVOYW1lcyA9ICRjcmVhdGUobnVsbCk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVByaXZhdGVOYW1lKCkge1xuICAgIHZhciBzID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gICAgcHJpdmF0ZU5hbWVzW3NdID0gdHJ1ZTtcbiAgICByZXR1cm4gcztcbiAgfVxuICBmdW5jdGlvbiBpc1N5bWJvbChzeW1ib2wpIHtcbiAgICByZXR1cm4gdHlwZW9mIHN5bWJvbCA9PT0gJ29iamVjdCcgJiYgc3ltYm9sIGluc3RhbmNlb2YgU3ltYm9sVmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gdHlwZU9mKHYpIHtcbiAgICBpZiAoaXNTeW1ib2wodikpXG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgcmV0dXJuIHR5cGVvZiB2O1xuICB9XG4gIGZ1bmN0aW9uIFN5bWJvbChkZXNjcmlwdGlvbikge1xuICAgIHZhciB2YWx1ZSA9IG5ldyBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbik7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3ltYm9sIGNhbm5vdCBiZSBuZXdcXCdlZCcpO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKFN5bWJvbCkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgbWV0aG9kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzeW1ib2xWYWx1ZSA9IHRoaXNbc3ltYm9sRGF0YVByb3BlcnR5XTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgdmFyIGRlc2MgPSBzeW1ib2xWYWx1ZVtzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5XTtcbiAgICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKVxuICAgICAgZGVzYyA9ICcnO1xuICAgIHJldHVybiAnU3ltYm9sKCcgKyBkZXNjICsgJyknO1xuICB9KSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAndmFsdWVPZicsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFzeW1ib2xWYWx1ZSlcbiAgICAgIHRocm93IFR5cGVFcnJvcignQ29udmVyc2lvbiBmcm9tIHN5bWJvbCB0byBzdHJpbmcnKTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIHJldHVybiBzeW1ib2xWYWx1ZTtcbiAgfSkpO1xuICBmdW5jdGlvbiBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbikge1xuICAgIHZhciBrZXkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGF0YVByb3BlcnR5LCB7dmFsdWU6IHRoaXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eSwge3ZhbHVlOiBrZXl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eSwge3ZhbHVlOiBkZXNjcmlwdGlvbn0pO1xuICAgIGZyZWV6ZSh0aGlzKTtcbiAgICBzeW1ib2xWYWx1ZXNba2V5XSA9IHRoaXM7XG4gIH1cbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywge1xuICAgIHZhbHVlOiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sVmFsdWUucHJvdG90eXBlLCAndmFsdWVPZicsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICB2YXIgaGFzaFByb3BlcnR5ID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgdmFyIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IgPSB7dmFsdWU6IHVuZGVmaW5lZH07XG4gIHZhciBoYXNoT2JqZWN0UHJvcGVydGllcyA9IHtcbiAgICBoYXNoOiB7dmFsdWU6IHVuZGVmaW5lZH0sXG4gICAgc2VsZjoge3ZhbHVlOiB1bmRlZmluZWR9XG4gIH07XG4gIHZhciBoYXNoQ291bnRlciA9IDA7XG4gIGZ1bmN0aW9uIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KSB7XG4gICAgdmFyIGhhc2hPYmplY3QgPSBvYmplY3RbaGFzaFByb3BlcnR5XTtcbiAgICBpZiAoaGFzaE9iamVjdCAmJiBoYXNoT2JqZWN0LnNlbGYgPT09IG9iamVjdClcbiAgICAgIHJldHVybiBoYXNoT2JqZWN0O1xuICAgIGlmICgkaXNFeHRlbnNpYmxlKG9iamVjdCkpIHtcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLmhhc2gudmFsdWUgPSBoYXNoQ291bnRlcisrO1xuICAgICAgaGFzaE9iamVjdFByb3BlcnRpZXMuc2VsZi52YWx1ZSA9IG9iamVjdDtcbiAgICAgIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWUgPSAkY3JlYXRlKG51bGwsIGhhc2hPYmplY3RQcm9wZXJ0aWVzKTtcbiAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGhhc2hQcm9wZXJ0eSwgaGFzaFByb3BlcnR5RGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gaGFzaFByb3BlcnR5RGVzY3JpcHRvci52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBmcmVlemUob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkZnJlZXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkcHJldmVudEV4dGVuc2lvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBzZWFsKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHNlYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBTeW1ib2wuaXRlcmF0b3IgPSBTeW1ib2woKTtcbiAgZnJlZXplKFN5bWJvbFZhbHVlLnByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIHRvUHJvcGVydHkobmFtZSkge1xuICAgIGlmIChpc1N5bWJvbChuYW1lKSlcbiAgICAgIHJldHVybiBuYW1lW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgaWYgKCFzeW1ib2xWYWx1ZXNbbmFtZV0gJiYgIXByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgcnYucHVzaChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpIHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHRvUHJvcGVydHkobmFtZSkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpIHtcbiAgICB2YXIgcnYgPSBbXTtcbiAgICB2YXIgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xWYWx1ZXNbbmFtZXNbaV1dO1xuICAgICAgaWYgKHN5bWJvbClcbiAgICAgICAgcnYucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gcnY7XG4gIH1cbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkobmFtZSkge1xuICAgIHJldHVybiAkaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCB0b1Byb3BlcnR5KG5hbWUpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPcHRpb24obmFtZSkge1xuICAgIHJldHVybiBnbG9iYWwudHJhY2V1ciAmJiBnbG9iYWwudHJhY2V1ci5vcHRpb25zW25hbWVdO1xuICB9XG4gIGZ1bmN0aW9uIHNldFByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgc3ltLFxuICAgICAgICBkZXNjO1xuICAgIGlmIChpc1N5bWJvbChuYW1lKSkge1xuICAgICAgc3ltID0gbmFtZTtcbiAgICAgIG5hbWUgPSBuYW1lW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIH1cbiAgICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbiAgICBpZiAoc3ltICYmIChkZXNjID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpKSlcbiAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpIHtcbiAgICAgIGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgZGVzY3JpcHRvciA9ICRjcmVhdGUoZGVzY3JpcHRvciwge2VudW1lcmFibGU6IHt2YWx1ZTogZmFsc2V9fSk7XG4gICAgICB9XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChPYmplY3QpIHtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknLCB7dmFsdWU6IGRlZmluZVByb3BlcnR5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7dmFsdWU6IGdldE93blByb3BlcnR5TmFtZXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3J9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ2hhc093blByb3BlcnR5Jywge3ZhbHVlOiBoYXNPd25Qcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdmcmVlemUnLCB7dmFsdWU6IGZyZWV6ZX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHt2YWx1ZTogcHJldmVudEV4dGVuc2lvbnN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnc2VhbCcsIHt2YWx1ZTogc2VhbH0pO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gIH1cbiAgZnVuY3Rpb24gZXhwb3J0U3RhcihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMoYXJndW1lbnRzW2ldKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lc1tqXTtcbiAgICAgICAgaWYgKHByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgKGZ1bmN0aW9uKG1vZCwgbmFtZSkge1xuICAgICAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtb2RbbmFtZV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KShhcmd1bWVudHNbaV0sIG5hbWVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiB0b09iamVjdCh4KSB7XG4gICAgaWYgKHggPT0gbnVsbClcbiAgICAgIHRocm93ICRUeXBlRXJyb3IoKTtcbiAgICByZXR1cm4gJE9iamVjdCh4KTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja09iamVjdENvZXJjaWJsZShhcmd1bWVudCkge1xuICAgIGlmIChhcmd1bWVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBjYW5ub3QgYmUgY29udmVydGVkIHRvIGFuIE9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnQ7XG4gIH1cbiAgZnVuY3Rpb24gc2V0dXBHbG9iYWxzKGdsb2JhbCkge1xuICAgIGdsb2JhbC5TeW1ib2wgPSBTeW1ib2w7XG4gICAgZ2xvYmFsLlJlZmxlY3QgPSBnbG9iYWwuUmVmbGVjdCB8fCB7fTtcbiAgICBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgPSBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgfHwgZ2xvYmFsO1xuICAgIHBvbHlmaWxsT2JqZWN0KGdsb2JhbC5PYmplY3QpO1xuICB9XG4gIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICBnbG9iYWwuJHRyYWNldXJSdW50aW1lID0ge1xuICAgIGNyZWF0ZVByaXZhdGVOYW1lOiBjcmVhdGVQcml2YXRlTmFtZSxcbiAgICBleHBvcnRTdGFyOiBleHBvcnRTdGFyLFxuICAgIGdldE93bkhhc2hPYmplY3Q6IGdldE93bkhhc2hPYmplY3QsXG4gICAgcHJpdmF0ZU5hbWVzOiBwcml2YXRlTmFtZXMsXG4gICAgc2V0UHJvcGVydHk6IHNldFByb3BlcnR5LFxuICAgIHNldHVwR2xvYmFsczogc2V0dXBHbG9iYWxzLFxuICAgIHRvT2JqZWN0OiB0b09iamVjdCxcbiAgICBpc09iamVjdDogaXNPYmplY3QsXG4gICAgdG9Qcm9wZXJ0eTogdG9Qcm9wZXJ0eSxcbiAgICB0eXBlOiB0eXBlcyxcbiAgICB0eXBlb2Y6IHR5cGVPZixcbiAgICBjaGVja09iamVjdENvZXJjaWJsZTogY2hlY2tPYmplY3RDb2VyY2libGUsXG4gICAgaGFzT3duUHJvcGVydHk6IGZ1bmN0aW9uKG8sIHApIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApO1xuICAgIH0sXG4gICAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gICAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gICAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gICAga2V5czogJGtleXNcbiAgfTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZnVuY3Rpb24gc3ByZWFkKCkge1xuICAgIHZhciBydiA9IFtdLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgaXRlclJlc3VsdDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlVG9TcHJlYWQgPSAkdHJhY2V1clJ1bnRpbWUuY2hlY2tPYmplY3RDb2VyY2libGUoYXJndW1lbnRzW2ldKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVUb1NwcmVhZFskdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3Qgc3ByZWFkIG5vbi1pdGVyYWJsZSBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXRlciA9IHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0oKTtcbiAgICAgIHdoaWxlICghKGl0ZXJSZXN1bHQgPSBpdGVyLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBydltqKytdID0gaXRlclJlc3VsdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5zcHJlYWQgPSBzcHJlYWQ7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciAkT2JqZWN0ID0gT2JqZWN0O1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgdmFyICRjcmVhdGUgPSAkT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydHk7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gJHRyYWNldXJSdW50aW1lLmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJHRyYWNldXJSdW50aW1lLmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciAkZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIGZ1bmN0aW9uIHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKSB7XG4gICAgdmFyIHByb3RvID0gJGdldFByb3RvdHlwZU9mKGhvbWVPYmplY3QpO1xuICAgIGRvIHtcbiAgICAgIHZhciByZXN1bHQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKTtcbiAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICBwcm90byA9ICRnZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfSB3aGlsZSAocHJvdG8pO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkuYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICBpZiAoIWRlc2NyaXB0b3IuZ2V0KVxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yLmdldC5jYWxsKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyU2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwoc2VsZiwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0aHJvdyAkVHlwZUVycm9yKFwic3VwZXIgaGFzIG5vIHNldHRlciAnXCIgKyBuYW1lICsgXCInLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBnZXREZXNjcmlwdG9ycyhvYmplY3QpIHtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lID0gbmFtZXNbaV07XG4gICAgICBkZXNjcmlwdG9yc1tuYW1lXSA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzKGN0b3IsIG9iamVjdCwgc3RhdGljT2JqZWN0LCBzdXBlckNsYXNzKSB7XG4gICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIGN0b3IuX19wcm90b19fID0gc3VwZXJDbGFzcztcbiAgICAgIGN0b3IucHJvdG90eXBlID0gJGNyZWF0ZShnZXRQcm90b1BhcmVudChzdXBlckNsYXNzKSwgZ2V0RGVzY3JpcHRvcnMob2JqZWN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gb2JqZWN0O1xuICAgIH1cbiAgICAkZGVmaW5lUHJvcGVydHkoY3RvciwgJ3Byb3RvdHlwZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnRpZXMoY3RvciwgZ2V0RGVzY3JpcHRvcnMoc3RhdGljT2JqZWN0KSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0UHJvdG9QYXJlbnQoc3VwZXJDbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IHN1cGVyQ2xhc3MucHJvdG90eXBlO1xuICAgICAgaWYgKCRPYmplY3QocHJvdG90eXBlKSA9PT0gcHJvdG90eXBlIHx8IHByb3RvdHlwZSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHN1cGVyQ2xhc3MucHJvdG90eXBlO1xuICAgICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ3N1cGVyIHByb3RvdHlwZSBtdXN0IGJlIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIGlmIChzdXBlckNsYXNzID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzICsgXCIuXCIpKTtcbiAgfVxuICBmdW5jdGlvbiBkZWZhdWx0U3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsIGFyZ3MpIHtcbiAgICBpZiAoJGdldFByb3RvdHlwZU9mKGhvbWVPYmplY3QpICE9PSBudWxsKVxuICAgICAgc3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsICdjb25zdHJ1Y3RvcicsIGFyZ3MpO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcyA9IGNyZWF0ZUNsYXNzO1xuICAkdHJhY2V1clJ1bnRpbWUuZGVmYXVsdFN1cGVyQ2FsbCA9IGRlZmF1bHRTdXBlckNhbGw7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlckNhbGwgPSBzdXBlckNhbGw7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlckdldCA9IHN1cGVyR2V0O1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJTZXQgPSBzdXBlclNldDtcbn0pKCk7XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGNyZWF0ZVByaXZhdGVOYW1lID0gJHRyYWNldXJSdW50aW1lLmNyZWF0ZVByaXZhdGVOYW1lO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydGllcztcbiAgdmFyICRkZWZpbmVQcm9wZXJ0eSA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgZnVuY3Rpb24gbm9uRW51bSh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfTtcbiAgfVxuICB2YXIgU1RfTkVXQk9STiA9IDA7XG4gIHZhciBTVF9FWEVDVVRJTkcgPSAxO1xuICB2YXIgU1RfU1VTUEVOREVEID0gMjtcbiAgdmFyIFNUX0NMT1NFRCA9IDM7XG4gIHZhciBFTkRfU1RBVEUgPSAtMjtcbiAgdmFyIFJFVEhST1dfU1RBVEUgPSAtMztcbiAgZnVuY3Rpb24gZ2V0SW50ZXJuYWxFcnJvcihzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ1RyYWNldXIgY29tcGlsZXIgYnVnOiBpbnZhbGlkIHN0YXRlIGluIHN0YXRlIG1hY2hpbmU6ICcgKyBzdGF0ZSk7XG4gIH1cbiAgZnVuY3Rpb24gR2VuZXJhdG9yQ29udGV4dCgpIHtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLkdTdGF0ZSA9IFNUX05FV0JPUk47XG4gICAgdGhpcy5zdG9yZWRFeGNlcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maW5hbGx5RmFsbFRocm91Z2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZW50XyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudHJ5U3RhY2tfID0gW107XG4gIH1cbiAgR2VuZXJhdG9yQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgcHVzaFRyeTogZnVuY3Rpb24oY2F0Y2hTdGF0ZSwgZmluYWxseVN0YXRlKSB7XG4gICAgICBpZiAoZmluYWxseVN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBmaW5hbGx5RmFsbFRocm91Z2ggPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlTdGFja18ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAodGhpcy50cnlTdGFja19baV0uY2F0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoID0gdGhpcy50cnlTdGFja19baV0uY2F0Y2g7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsbHlGYWxsVGhyb3VnaCA9PT0gbnVsbClcbiAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2ggPSBSRVRIUk9XX1NUQVRFO1xuICAgICAgICB0aGlzLnRyeVN0YWNrXy5wdXNoKHtcbiAgICAgICAgICBmaW5hbGx5OiBmaW5hbGx5U3RhdGUsXG4gICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoOiBmaW5hbGx5RmFsbFRocm91Z2hcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoY2F0Y2hTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRyeVN0YWNrXy5wdXNoKHtjYXRjaDogY2F0Y2hTdGF0ZX0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcG9wVHJ5OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudHJ5U3RhY2tfLnBvcCgpO1xuICAgIH0sXG4gICAgZ2V0IHNlbnQoKSB7XG4gICAgICB0aGlzLm1heWJlVGhyb3coKTtcbiAgICAgIHJldHVybiB0aGlzLnNlbnRfO1xuICAgIH0sXG4gICAgc2V0IHNlbnQodikge1xuICAgICAgdGhpcy5zZW50XyA9IHY7XG4gICAgfSxcbiAgICBnZXQgc2VudElnbm9yZVRocm93KCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VudF87XG4gICAgfSxcbiAgICBtYXliZVRocm93OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJ3Rocm93Jykge1xuICAgICAgICB0aGlzLmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgdGhyb3cgdGhpcy5zZW50XztcbiAgICAgIH1cbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBFTkRfU1RBVEU6XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGNhc2UgUkVUSFJPV19TVEFURTpcbiAgICAgICAgICB0aHJvdyB0aGlzLnN0b3JlZEV4Y2VwdGlvbjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBnZXRJbnRlcm5hbEVycm9yKHRoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlRXhjZXB0aW9uOiBmdW5jdGlvbihleCkge1xuICAgICAgdGhpcy5HU3RhdGUgPSBTVF9DTE9TRUQ7XG4gICAgICB0aGlzLnN0YXRlID0gRU5EX1NUQVRFO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBuZXh0T3JUaHJvdyhjdHgsIG1vdmVOZXh0LCBhY3Rpb24sIHgpIHtcbiAgICBzd2l0Y2ggKGN0eC5HU3RhdGUpIHtcbiAgICAgIGNhc2UgU1RfRVhFQ1VUSU5HOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwiXFxcIlwiICsgYWN0aW9uICsgXCJcXFwiIG9uIGV4ZWN1dGluZyBnZW5lcmF0b3JcIikpO1xuICAgICAgY2FzZSBTVF9DTE9TRUQ6XG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ25leHQnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyB4O1xuICAgICAgY2FzZSBTVF9ORVdCT1JOOlxuICAgICAgICBpZiAoYWN0aW9uID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgY3R4LkdTdGF0ZSA9IFNUX0NMT1NFRDtcbiAgICAgICAgICB0aHJvdyB4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhyb3cgJFR5cGVFcnJvcignU2VudCB2YWx1ZSB0byBuZXdib3JuIGdlbmVyYXRvcicpO1xuICAgICAgY2FzZSBTVF9TVVNQRU5ERUQ6XG4gICAgICAgIGN0eC5HU3RhdGUgPSBTVF9FWEVDVVRJTkc7XG4gICAgICAgIGN0eC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIGN0eC5zZW50ID0geDtcbiAgICAgICAgdmFyIHZhbHVlID0gbW92ZU5leHQoY3R4KTtcbiAgICAgICAgdmFyIGRvbmUgPSB2YWx1ZSA9PT0gY3R4O1xuICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICB2YWx1ZSA9IGN0eC5yZXR1cm5WYWx1ZTtcbiAgICAgICAgY3R4LkdTdGF0ZSA9IGRvbmUgPyBTVF9DTE9TRUQgOiBTVF9TVVNQRU5ERUQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIGRvbmU6IGRvbmVcbiAgICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIGN0eE5hbWUgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICB2YXIgbW92ZU5leHROYW1lID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAkZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oR2VuZXJhdG9yRnVuY3Rpb24pKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBuZXh0OiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gbmV4dE9yVGhyb3codGhpc1tjdHhOYW1lXSwgdGhpc1ttb3ZlTmV4dE5hbWVdLCAnbmV4dCcsIHYpO1xuICAgIH0sXG4gICAgdGhyb3c6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiBuZXh0T3JUaHJvdyh0aGlzW2N0eE5hbWVdLCB0aGlzW21vdmVOZXh0TmFtZV0sICd0aHJvdycsIHYpO1xuICAgIH1cbiAgfTtcbiAgJGRlZmluZVByb3BlcnRpZXMoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtlbnVtZXJhYmxlOiBmYWxzZX0sXG4gICAgbmV4dDoge2VudW1lcmFibGU6IGZhbHNlfSxcbiAgICB0aHJvdzoge2VudW1lcmFibGU6IGZhbHNlfVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCBub25FbnVtKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGlubmVyRnVuY3Rpb24sIGZ1bmN0aW9uT2JqZWN0LCBzZWxmKSB7XG4gICAgdmFyIG1vdmVOZXh0ID0gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZik7XG4gICAgdmFyIGN0eCA9IG5ldyBHZW5lcmF0b3JDb250ZXh0KCk7XG4gICAgdmFyIG9iamVjdCA9ICRjcmVhdGUoZnVuY3Rpb25PYmplY3QucHJvdG90eXBlKTtcbiAgICBvYmplY3RbY3R4TmFtZV0gPSBjdHg7XG4gICAgb2JqZWN0W21vdmVOZXh0TmFtZV0gPSBtb3ZlTmV4dDtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbk9iamVjdCkge1xuICAgIGZ1bmN0aW9uT2JqZWN0LnByb3RvdHlwZSA9ICRjcmVhdGUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlKTtcbiAgICBmdW5jdGlvbk9iamVjdC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICByZXR1cm4gZnVuY3Rpb25PYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNGdW5jdGlvbkNvbnRleHQoKSB7XG4gICAgR2VuZXJhdG9yQ29udGV4dC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuZXJyID0gdW5kZWZpbmVkO1xuICAgIHZhciBjdHggPSB0aGlzO1xuICAgIGN0eC5yZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGN0eC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIGN0eC5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gIH1cbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlID0gJGNyZWF0ZShHZW5lcmF0b3JDb250ZXh0LnByb3RvdHlwZSk7XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgIGNhc2UgRU5EX1NUQVRFOlxuICAgICAgICB0aGlzLnJlc29sdmUodGhpcy5yZXR1cm5WYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSRVRIUk9XX1NUQVRFOlxuICAgICAgICB0aGlzLnJlamVjdCh0aGlzLnN0b3JlZEV4Y2VwdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5yZWplY3QoZ2V0SW50ZXJuYWxFcnJvcih0aGlzLnN0YXRlKSk7XG4gICAgfVxuICB9O1xuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUuaGFuZGxlRXhjZXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFJFVEhST1dfU1RBVEU7XG4gIH07XG4gIGZ1bmN0aW9uIGFzeW5jV3JhcChpbm5lckZ1bmN0aW9uLCBzZWxmKSB7XG4gICAgdmFyIG1vdmVOZXh0ID0gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZik7XG4gICAgdmFyIGN0eCA9IG5ldyBBc3luY0Z1bmN0aW9uQ29udGV4dCgpO1xuICAgIGN0eC5jcmVhdGVDYWxsYmFjayA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY3R4LnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIGN0eC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBtb3ZlTmV4dChjdHgpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIGN0eC5lcnJiYWNrID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBoYW5kbGVDYXRjaChjdHgsIGVycik7XG4gICAgICBtb3ZlTmV4dChjdHgpO1xuICAgIH07XG4gICAgbW92ZU5leHQoY3R4KTtcbiAgICByZXR1cm4gY3R4LnJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gaW5uZXJGdW5jdGlvbi5jYWxsKHNlbGYsIGN0eCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgaGFuZGxlQ2F0Y2goY3R4LCBleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUNhdGNoKGN0eCwgZXgpIHtcbiAgICBjdHguc3RvcmVkRXhjZXB0aW9uID0gZXg7XG4gICAgdmFyIGxhc3QgPSBjdHgudHJ5U3RhY2tfW2N0eC50cnlTdGFja18ubGVuZ3RoIC0gMV07XG4gICAgaWYgKCFsYXN0KSB7XG4gICAgICBjdHguaGFuZGxlRXhjZXB0aW9uKGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3R4LnN0YXRlID0gbGFzdC5jYXRjaCAhPT0gdW5kZWZpbmVkID8gbGFzdC5jYXRjaCA6IGxhc3QuZmluYWxseTtcbiAgICBpZiAobGFzdC5maW5hbGx5RmFsbFRocm91Z2ggIT09IHVuZGVmaW5lZClcbiAgICAgIGN0eC5maW5hbGx5RmFsbFRocm91Z2ggPSBsYXN0LmZpbmFsbHlGYWxsVGhyb3VnaDtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuYXN5bmNXcmFwID0gYXN5bmNXcmFwO1xuICAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uID0gaW5pdEdlbmVyYXRvckZ1bmN0aW9uO1xuICAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UgPSBjcmVhdGVHZW5lcmF0b3JJbnN0YW5jZTtcbn0pKCk7XG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkRnJvbUVuY29kZWRQYXJ0cyhvcHRfc2NoZW1lLCBvcHRfdXNlckluZm8sIG9wdF9kb21haW4sIG9wdF9wb3J0LCBvcHRfcGF0aCwgb3B0X3F1ZXJ5RGF0YSwgb3B0X2ZyYWdtZW50KSB7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGlmIChvcHRfc2NoZW1lKSB7XG4gICAgICBvdXQucHVzaChvcHRfc2NoZW1lLCAnOicpO1xuICAgIH1cbiAgICBpZiAob3B0X2RvbWFpbikge1xuICAgICAgb3V0LnB1c2goJy8vJyk7XG4gICAgICBpZiAob3B0X3VzZXJJbmZvKSB7XG4gICAgICAgIG91dC5wdXNoKG9wdF91c2VySW5mbywgJ0AnKTtcbiAgICAgIH1cbiAgICAgIG91dC5wdXNoKG9wdF9kb21haW4pO1xuICAgICAgaWYgKG9wdF9wb3J0KSB7XG4gICAgICAgIG91dC5wdXNoKCc6Jywgb3B0X3BvcnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0X3BhdGgpIHtcbiAgICAgIG91dC5wdXNoKG9wdF9wYXRoKTtcbiAgICB9XG4gICAgaWYgKG9wdF9xdWVyeURhdGEpIHtcbiAgICAgIG91dC5wdXNoKCc/Jywgb3B0X3F1ZXJ5RGF0YSk7XG4gICAgfVxuICAgIGlmIChvcHRfZnJhZ21lbnQpIHtcbiAgICAgIG91dC5wdXNoKCcjJywgb3B0X2ZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgfVxuICA7XG4gIHZhciBzcGxpdFJlID0gbmV3IFJlZ0V4cCgnXicgKyAnKD86JyArICcoW146Lz8jLl0rKScgKyAnOik/JyArICcoPzovLycgKyAnKD86KFteLz8jXSopQCk/JyArICcoW1xcXFx3XFxcXGRcXFxcLVxcXFx1MDEwMC1cXFxcdWZmZmYuJV0qKScgKyAnKD86OihbMC05XSspKT8nICsgJyk/JyArICcoW14/I10rKT8nICsgJyg/OlxcXFw/KFteI10qKSk/JyArICcoPzojKC4qKSk/JyArICckJyk7XG4gIHZhciBDb21wb25lbnRJbmRleCA9IHtcbiAgICBTQ0hFTUU6IDEsXG4gICAgVVNFUl9JTkZPOiAyLFxuICAgIERPTUFJTjogMyxcbiAgICBQT1JUOiA0LFxuICAgIFBBVEg6IDUsXG4gICAgUVVFUllfREFUQTogNixcbiAgICBGUkFHTUVOVDogN1xuICB9O1xuICBmdW5jdGlvbiBzcGxpdCh1cmkpIHtcbiAgICByZXR1cm4gKHVyaS5tYXRjaChzcGxpdFJlKSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVtb3ZlRG90U2VnbWVudHMocGF0aCkge1xuICAgIGlmIChwYXRoID09PSAnLycpXG4gICAgICByZXR1cm4gJy8nO1xuICAgIHZhciBsZWFkaW5nU2xhc2ggPSBwYXRoWzBdID09PSAnLycgPyAnLycgOiAnJztcbiAgICB2YXIgdHJhaWxpbmdTbGFzaCA9IHBhdGguc2xpY2UoLTEpID09PSAnLycgPyAnLycgOiAnJztcbiAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIHZhciB1cCA9IDA7XG4gICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgc2VnbWVudHMubGVuZ3RoOyBwb3MrKykge1xuICAgICAgdmFyIHNlZ21lbnQgPSBzZWdtZW50c1twb3NdO1xuICAgICAgc3dpdGNoIChzZWdtZW50KSB7XG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcuLic6XG4gICAgICAgICAgaWYgKG91dC5sZW5ndGgpXG4gICAgICAgICAgICBvdXQucG9wKCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdXArKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBvdXQucHVzaChzZWdtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFsZWFkaW5nU2xhc2gpIHtcbiAgICAgIHdoaWxlICh1cC0tID4gMCkge1xuICAgICAgICBvdXQudW5zaGlmdCgnLi4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvdXQubGVuZ3RoID09PSAwKVxuICAgICAgICBvdXQucHVzaCgnLicpO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZGluZ1NsYXNoICsgb3V0LmpvaW4oJy8nKSArIHRyYWlsaW5nU2xhc2g7XG4gIH1cbiAgZnVuY3Rpb24gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpIHtcbiAgICB2YXIgcGF0aCA9IHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdIHx8ICcnO1xuICAgIHBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhwYXRoKTtcbiAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSA9IHBhdGg7XG4gICAgcmV0dXJuIGJ1aWxkRnJvbUVuY29kZWRQYXJ0cyhwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5VU0VSX0lORk9dLCBwYXJ0c1tDb21wb25lbnRJbmRleC5ET01BSU5dLCBwYXJ0c1tDb21wb25lbnRJbmRleC5QT1JUXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlFVRVJZX0RBVEFdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5GUkFHTUVOVF0pO1xuICB9XG4gIGZ1bmN0aW9uIGNhbm9uaWNhbGl6ZVVybCh1cmwpIHtcbiAgICB2YXIgcGFydHMgPSBzcGxpdCh1cmwpO1xuICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzb2x2ZVVybChiYXNlLCB1cmwpIHtcbiAgICB2YXIgcGFydHMgPSBzcGxpdCh1cmwpO1xuICAgIHZhciBiYXNlUGFydHMgPSBzcGxpdChiYXNlKTtcbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSkge1xuICAgICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSA9IGJhc2VQYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gQ29tcG9uZW50SW5kZXguU0NIRU1FOyBpIDw9IENvbXBvbmVudEluZGV4LlBPUlQ7IGkrKykge1xuICAgICAgaWYgKCFwYXJ0c1tpXSkge1xuICAgICAgICBwYXJ0c1tpXSA9IGJhc2VQYXJ0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdWzBdID09ICcvJykge1xuICAgICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBiYXNlUGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF07XG4gICAgdmFyIGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIGluZGV4ICsgMSkgKyBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXTtcbiAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSA9IHBhdGg7XG4gICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgfVxuICBmdW5jdGlvbiBpc0Fic29sdXRlKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG5hbWVbMF0gPT09ICcvJylcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KG5hbWUpO1xuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5jYW5vbmljYWxpemVVcmwgPSBjYW5vbmljYWxpemVVcmw7XG4gICR0cmFjZXVyUnVudGltZS5pc0Fic29sdXRlID0gaXNBYnNvbHV0ZTtcbiAgJHRyYWNldXJSdW50aW1lLnJlbW92ZURvdFNlZ21lbnRzID0gcmVtb3ZlRG90U2VnbWVudHM7XG4gICR0cmFjZXVyUnVudGltZS5yZXNvbHZlVXJsID0gcmVzb2x2ZVVybDtcbn0pKCk7XG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyICRfXzIgPSAkdHJhY2V1clJ1bnRpbWUsXG4gICAgICBjYW5vbmljYWxpemVVcmwgPSAkX18yLmNhbm9uaWNhbGl6ZVVybCxcbiAgICAgIHJlc29sdmVVcmwgPSAkX18yLnJlc29sdmVVcmwsXG4gICAgICBpc0Fic29sdXRlID0gJF9fMi5pc0Fic29sdXRlO1xuICB2YXIgbW9kdWxlSW5zdGFudGlhdG9ycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBiYXNlVVJMO1xuICBpZiAoZ2xvYmFsLmxvY2F0aW9uICYmIGdsb2JhbC5sb2NhdGlvbi5ocmVmKVxuICAgIGJhc2VVUkwgPSByZXNvbHZlVXJsKGdsb2JhbC5sb2NhdGlvbi5ocmVmLCAnLi8nKTtcbiAgZWxzZVxuICAgIGJhc2VVUkwgPSAnJztcbiAgdmFyIFVuY29hdGVkTW9kdWxlRW50cnkgPSBmdW5jdGlvbiBVbmNvYXRlZE1vZHVsZUVudHJ5KHVybCwgdW5jb2F0ZWRNb2R1bGUpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnZhbHVlXyA9IHVuY29hdGVkTW9kdWxlO1xuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUVudHJ5LCB7fSwge30pO1xuICB2YXIgTW9kdWxlRXZhbHVhdGlvbkVycm9yID0gZnVuY3Rpb24gTW9kdWxlRXZhbHVhdGlvbkVycm9yKGVycm9uZW91c01vZHVsZU5hbWUsIGNhdXNlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIHRoaXMuc3RyaXBDYXVzZShjYXVzZSkgKyAnIGluICcgKyBlcnJvbmVvdXNNb2R1bGVOYW1lO1xuICAgIGlmICghKGNhdXNlIGluc3RhbmNlb2YgJE1vZHVsZUV2YWx1YXRpb25FcnJvcikgJiYgY2F1c2Uuc3RhY2spXG4gICAgICB0aGlzLnN0YWNrID0gdGhpcy5zdHJpcFN0YWNrKGNhdXNlLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH07XG4gIHZhciAkTW9kdWxlRXZhbHVhdGlvbkVycm9yID0gTW9kdWxlRXZhbHVhdGlvbkVycm9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShNb2R1bGVFdmFsdWF0aW9uRXJyb3IsIHtcbiAgICBzdHJpcEVycm9yOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKC8uKkVycm9yOi8sIHRoaXMuY29uc3RydWN0b3IubmFtZSArICc6Jyk7XG4gICAgfSxcbiAgICBzdHJpcENhdXNlOiBmdW5jdGlvbihjYXVzZSkge1xuICAgICAgaWYgKCFjYXVzZSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgaWYgKCFjYXVzZS5tZXNzYWdlKVxuICAgICAgICByZXR1cm4gY2F1c2UgKyAnJztcbiAgICAgIHJldHVybiB0aGlzLnN0cmlwRXJyb3IoY2F1c2UubWVzc2FnZSk7XG4gICAgfSxcbiAgICBsb2FkZWRCeTogZnVuY3Rpb24obW9kdWxlTmFtZSkge1xuICAgICAgdGhpcy5zdGFjayArPSAnXFxuIGxvYWRlZCBieSAnICsgbW9kdWxlTmFtZTtcbiAgICB9LFxuICAgIHN0cmlwU3RhY2s6IGZ1bmN0aW9uKGNhdXNlU3RhY2spIHtcbiAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgY2F1c2VTdGFjay5zcGxpdCgnXFxuJykuc29tZSgoZnVuY3Rpb24oZnJhbWUpIHtcbiAgICAgICAgaWYgKC9VbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvci8udGVzdChmcmFtZSkpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHN0YWNrLnB1c2goZnJhbWUpO1xuICAgICAgfSkpO1xuICAgICAgc3RhY2tbMF0gPSB0aGlzLnN0cmlwRXJyb3Ioc3RhY2tbMF0pO1xuICAgICAgcmV0dXJuIHN0YWNrLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgfSwge30sIEVycm9yKTtcbiAgdmFyIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IodXJsLCBmdW5jKSB7XG4gICAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ2FsbCh0aGlzLCAkVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IucHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIFt1cmwsIG51bGxdKTtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICB9O1xuICB2YXIgJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yID0gVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3I7XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLCB7Z2V0VW5jb2F0ZWRNb2R1bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWVfKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8gPSB0aGlzLmZ1bmMuY2FsbChnbG9iYWwpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGV4IGluc3RhbmNlb2YgTW9kdWxlRXZhbHVhdGlvbkVycm9yKSB7XG4gICAgICAgICAgZXgubG9hZGVkQnkodGhpcy51cmwpO1xuICAgICAgICAgIHRocm93IGV4O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBNb2R1bGVFdmFsdWF0aW9uRXJyb3IodGhpcy51cmwsIGV4KTtcbiAgICAgIH1cbiAgICB9fSwge30sIFVuY29hdGVkTW9kdWxlRW50cnkpO1xuICBmdW5jdGlvbiBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihuYW1lKSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuO1xuICAgIHZhciB1cmwgPSBNb2R1bGVTdG9yZS5ub3JtYWxpemUobmFtZSk7XG4gICAgcmV0dXJuIG1vZHVsZUluc3RhbnRpYXRvcnNbdXJsXTtcbiAgfVxuICA7XG4gIHZhciBtb2R1bGVJbnN0YW5jZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbGl2ZU1vZHVsZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIE1vZHVsZSh1bmNvYXRlZE1vZHVsZSkge1xuICAgIHZhciBpc0xpdmUgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIGNvYXRlZE1vZHVsZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModW5jb2F0ZWRNb2R1bGUpLmZvckVhY2goKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBnZXR0ZXIsXG4gICAgICAgICAgdmFsdWU7XG4gICAgICBpZiAoaXNMaXZlID09PSBsaXZlTW9kdWxlU2VudGluZWwpIHtcbiAgICAgICAgdmFyIGRlc2NyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih1bmNvYXRlZE1vZHVsZSwgbmFtZSk7XG4gICAgICAgIGlmIChkZXNjci5nZXQpXG4gICAgICAgICAgZ2V0dGVyID0gZGVzY3IuZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKCFnZXR0ZXIpIHtcbiAgICAgICAgdmFsdWUgPSB1bmNvYXRlZE1vZHVsZVtuYW1lXTtcbiAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvYXRlZE1vZHVsZSwgbmFtZSwge1xuICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhjb2F0ZWRNb2R1bGUpO1xuICAgIHJldHVybiBjb2F0ZWRNb2R1bGU7XG4gIH1cbiAgdmFyIE1vZHVsZVN0b3JlID0ge1xuICAgIG5vcm1hbGl6ZTogZnVuY3Rpb24obmFtZSwgcmVmZXJlck5hbWUsIHJlZmVyZXJBZGRyZXNzKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJtb2R1bGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgbmFtZSk7XG4gICAgICBpZiAoaXNBYnNvbHV0ZShuYW1lKSlcbiAgICAgICAgcmV0dXJuIGNhbm9uaWNhbGl6ZVVybChuYW1lKTtcbiAgICAgIGlmICgvW15cXC5dXFwvXFwuXFwuXFwvLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kdWxlIG5hbWUgZW1iZWRzIC8uLi86ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lWzBdID09PSAnLicgJiYgcmVmZXJlck5hbWUpXG4gICAgICAgIHJldHVybiByZXNvbHZlVXJsKHJlZmVyZXJOYW1lLCBuYW1lKTtcbiAgICAgIHJldHVybiBjYW5vbmljYWxpemVVcmwobmFtZSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKG5vcm1hbGl6ZWROYW1lKSB7XG4gICAgICB2YXIgbSA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIGlmICghbSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIHZhciBtb2R1bGVJbnN0YW5jZSA9IG1vZHVsZUluc3RhbmNlc1ttLnVybF07XG4gICAgICBpZiAobW9kdWxlSW5zdGFuY2UpXG4gICAgICAgIHJldHVybiBtb2R1bGVJbnN0YW5jZTtcbiAgICAgIG1vZHVsZUluc3RhbmNlID0gTW9kdWxlKG0uZ2V0VW5jb2F0ZWRNb2R1bGUoKSwgbGl2ZU1vZHVsZVNlbnRpbmVsKTtcbiAgICAgIHJldHVybiBtb2R1bGVJbnN0YW5jZXNbbS51cmxdID0gbW9kdWxlSW5zdGFuY2U7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKG5vcm1hbGl6ZWROYW1lLCBtb2R1bGUpIHtcbiAgICAgIG5vcm1hbGl6ZWROYW1lID0gU3RyaW5nKG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdID0gbmV3IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICB9KSk7XG4gICAgICBtb2R1bGVJbnN0YW5jZXNbbm9ybWFsaXplZE5hbWVdID0gbW9kdWxlO1xuICAgIH0sXG4gICAgZ2V0IGJhc2VVUkwoKSB7XG4gICAgICByZXR1cm4gYmFzZVVSTDtcbiAgICB9LFxuICAgIHNldCBiYXNlVVJMKHYpIHtcbiAgICAgIGJhc2VVUkwgPSBTdHJpbmcodik7XG4gICAgfSxcbiAgICByZWdpc3Rlck1vZHVsZTogZnVuY3Rpb24obmFtZSwgZnVuYykge1xuICAgICAgdmFyIG5vcm1hbGl6ZWROYW1lID0gTW9kdWxlU3RvcmUubm9ybWFsaXplKG5hbWUpO1xuICAgICAgaWYgKG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2R1cGxpY2F0ZSBtb2R1bGUgbmFtZWQgJyArIG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdID0gbmV3IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lLCBmdW5jKTtcbiAgICB9LFxuICAgIGJ1bmRsZVN0b3JlOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIHJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lLCBkZXBzLCBmdW5jKSB7XG4gICAgICBpZiAoIWRlcHMgfHwgIWRlcHMubGVuZ3RoICYmICFmdW5jLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTW9kdWxlKG5hbWUsIGZ1bmMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5idW5kbGVTdG9yZVtuYW1lXSA9IHtcbiAgICAgICAgICBkZXBzOiBkZXBzLFxuICAgICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyICRfXzAgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICB2YXIgZGVwTWFwID0ge307XG4gICAgICAgICAgICBkZXBzLmZvckVhY2goKGZ1bmN0aW9uKGRlcCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlcE1hcFtkZXBdID0gJF9fMFtpbmRleF07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB2YXIgcmVnaXN0cnlFbnRyeSA9IGZ1bmMuY2FsbCh0aGlzLCBkZXBNYXApO1xuICAgICAgICAgICAgcmVnaXN0cnlFbnRyeS5leGVjdXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0cnlFbnRyeS5leHBvcnRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEFub255bW91c01vZHVsZTogZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUoZnVuYy5jYWxsKGdsb2JhbCksIGxpdmVNb2R1bGVTZW50aW5lbCk7XG4gICAgfSxcbiAgICBnZXRGb3JUZXN0aW5nOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMudGVzdGluZ1ByZWZpeF8pIHtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlSW5zdGFuY2VzKS5zb21lKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICB2YXIgbSA9IC8odHJhY2V1ckBbXlxcL10qXFwvKS8uZXhlYyhrZXkpO1xuICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAkX18wLnRlc3RpbmdQcmVmaXhfID0gbVsxXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMudGVzdGluZ1ByZWZpeF8gKyBuYW1lKTtcbiAgICB9XG4gIH07XG4gIE1vZHVsZVN0b3JlLnNldCgnQHRyYWNldXIvc3JjL3J1bnRpbWUvTW9kdWxlU3RvcmUnLCBuZXcgTW9kdWxlKHtNb2R1bGVTdG9yZTogTW9kdWxlU3RvcmV9KSk7XG4gIHZhciBzZXR1cEdsb2JhbHMgPSAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzO1xuICAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzID0gZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gIH07XG4gICR0cmFjZXVyUnVudGltZS5Nb2R1bGVTdG9yZSA9IE1vZHVsZVN0b3JlO1xuICBnbG9iYWwuU3lzdGVtID0ge1xuICAgIHJlZ2lzdGVyOiBNb2R1bGVTdG9yZS5yZWdpc3Rlci5iaW5kKE1vZHVsZVN0b3JlKSxcbiAgICBnZXQ6IE1vZHVsZVN0b3JlLmdldCxcbiAgICBzZXQ6IE1vZHVsZVN0b3JlLnNldCxcbiAgICBub3JtYWxpemU6IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZVxuICB9O1xuICAkdHJhY2V1clJ1bnRpbWUuZ2V0TW9kdWxlSW1wbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaW5zdGFudGlhdG9yID0gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IobmFtZSk7XG4gICAgcmV0dXJuIGluc3RhbnRpYXRvciAmJiBpbnN0YW50aWF0b3IuZ2V0VW5jb2F0ZWRNb2R1bGUoKTtcbiAgfTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiO1xuICB2YXIgJGNlaWwgPSBNYXRoLmNlaWw7XG4gIHZhciAkZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgJGlzRmluaXRlID0gaXNGaW5pdGU7XG4gIHZhciAkaXNOYU4gPSBpc05hTjtcbiAgdmFyICRwb3cgPSBNYXRoLnBvdztcbiAgdmFyICRtaW4gPSBNYXRoLm1pbjtcbiAgdmFyIHRvT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLnRvT2JqZWN0O1xuICBmdW5jdGlvbiB0b1VpbnQzMih4KSB7XG4gICAgcmV0dXJuIHggPj4+IDA7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ2FsbGFibGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICBmdW5jdGlvbiBpc051bWJlcih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnbnVtYmVyJztcbiAgfVxuICBmdW5jdGlvbiB0b0ludGVnZXIoeCkge1xuICAgIHggPSAreDtcbiAgICBpZiAoJGlzTmFOKHgpKVxuICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKHggPT09IDAgfHwgISRpc0Zpbml0ZSh4KSlcbiAgICAgIHJldHVybiB4O1xuICAgIHJldHVybiB4ID4gMCA/ICRmbG9vcih4KSA6ICRjZWlsKHgpO1xuICB9XG4gIHZhciBNQVhfU0FGRV9MRU5HVEggPSAkcG93KDIsIDUzKSAtIDE7XG4gIGZ1bmN0aW9uIHRvTGVuZ3RoKHgpIHtcbiAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHgpO1xuICAgIHJldHVybiBsZW4gPCAwID8gMCA6ICRtaW4obGVuLCBNQVhfU0FGRV9MRU5HVEgpO1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrSXRlcmFibGUoeCkge1xuICAgIHJldHVybiAhaXNPYmplY3QoeCkgPyB1bmRlZmluZWQgOiB4W1N5bWJvbC5pdGVyYXRvcl07XG4gIH1cbiAgZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcih4KSB7XG4gICAgcmV0dXJuIGlzQ2FsbGFibGUoeCk7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodmFsdWUsIGRvbmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZG9uZTogZG9uZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCBkZXNjcikge1xuICAgIGlmICghKG5hbWUgaW4gb2JqZWN0KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3IpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZURlZmluZU1ldGhvZChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVDb25zdChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUFkZEZ1bmN0aW9ucyhvYmplY3QsIGZ1bmN0aW9ucykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB2YXIgbmFtZSA9IGZ1bmN0aW9uc1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IGZ1bmN0aW9uc1tpICsgMV07XG4gICAgICBtYXliZURlZmluZU1ldGhvZChvYmplY3QsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRDb25zdHMob2JqZWN0LCBjb25zdHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBjb25zdHNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBjb25zdHNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVDb25zdChvYmplY3QsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRJdGVyYXRvcihvYmplY3QsIGZ1bmMsIFN5bWJvbCkge1xuICAgIGlmICghU3ltYm9sIHx8ICFTeW1ib2wuaXRlcmF0b3IgfHwgb2JqZWN0W1N5bWJvbC5pdGVyYXRvcl0pXG4gICAgICByZXR1cm47XG4gICAgaWYgKG9iamVjdFsnQEBpdGVyYXRvciddKVxuICAgICAgZnVuYyA9IG9iamVjdFsnQEBpdGVyYXRvciddO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgICAgdmFsdWU6IGZ1bmMsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgdmFyIHBvbHlmaWxscyA9IFtdO1xuICBmdW5jdGlvbiByZWdpc3RlclBvbHlmaWxsKGZ1bmMpIHtcbiAgICBwb2x5ZmlsbHMucHVzaChmdW5jKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbEFsbChnbG9iYWwpIHtcbiAgICBwb2x5ZmlsbHMuZm9yRWFjaCgoZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYoZ2xvYmFsKTtcbiAgICB9KSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZXQgdG9PYmplY3QoKSB7XG4gICAgICByZXR1cm4gdG9PYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgdG9VaW50MzIoKSB7XG4gICAgICByZXR1cm4gdG9VaW50MzI7XG4gICAgfSxcbiAgICBnZXQgaXNPYmplY3QoKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgaXNDYWxsYWJsZSgpIHtcbiAgICAgIHJldHVybiBpc0NhbGxhYmxlO1xuICAgIH0sXG4gICAgZ2V0IGlzTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIGlzTnVtYmVyO1xuICAgIH0sXG4gICAgZ2V0IHRvSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiB0b0ludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgdG9MZW5ndGgoKSB7XG4gICAgICByZXR1cm4gdG9MZW5ndGg7XG4gICAgfSxcbiAgICBnZXQgY2hlY2tJdGVyYWJsZSgpIHtcbiAgICAgIHJldHVybiBjaGVja0l0ZXJhYmxlO1xuICAgIH0sXG4gICAgZ2V0IGlzQ29uc3RydWN0b3IoKSB7XG4gICAgICByZXR1cm4gaXNDb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIGdldCBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdDtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZSgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZTtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZU1ldGhvZCgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZU1ldGhvZDtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZUNvbnN0KCkge1xuICAgICAgcmV0dXJuIG1heWJlRGVmaW5lQ29uc3Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRGdW5jdGlvbnMoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRGdW5jdGlvbnM7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRDb25zdHMoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRDb25zdHM7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRJdGVyYXRvcigpIHtcbiAgICAgIHJldHVybiBtYXliZUFkZEl0ZXJhdG9yO1xuICAgIH0sXG4gICAgZ2V0IHJlZ2lzdGVyUG9seWZpbGwoKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXJQb2x5ZmlsbDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbEFsbCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbEFsbDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIjtcbiAgdmFyICRfXzMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBpc09iamVjdCA9ICRfXzMuaXNPYmplY3QsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMy5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzMucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyIGdldE93bkhhc2hPYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdDtcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBkZWxldGVkU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gbG9va3VwSW5kZXgobWFwLCBrZXkpIHtcbiAgICBpZiAoaXNPYmplY3Qoa2V5KSkge1xuICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICByZXR1cm4gaGFzaE9iamVjdCAmJiBtYXAub2JqZWN0SW5kZXhfW2hhc2hPYmplY3QuaGFzaF07XG4gICAgfVxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJylcbiAgICAgIHJldHVybiBtYXAuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgcmV0dXJuIG1hcC5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgfVxuICBmdW5jdGlvbiBpbml0TWFwKG1hcCkge1xuICAgIG1hcC5lbnRyaWVzXyA9IFtdO1xuICAgIG1hcC5vYmplY3RJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5zdHJpbmdJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5wcmltaXRpdmVJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5kZWxldGVkQ291bnRfID0gMDtcbiAgfVxuICB2YXIgTWFwID0gZnVuY3Rpb24gTWFwKCkge1xuICAgIHZhciBpdGVyYWJsZSA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAoIWlzT2JqZWN0KHRoaXMpKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWFwIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgdHlwZScpO1xuICAgIGlmICgkaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnZW50cmllc18nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWFwIGNhbiBub3QgYmUgcmVlbnRyYW50bHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgaW5pdE1hcCh0aGlzKTtcbiAgICBpZiAoaXRlcmFibGUgIT09IG51bGwgJiYgaXRlcmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgJF9fNSA9IGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSxcbiAgICAgICAgICAkX182OyAhKCRfXzYgPSAkX181Lm5leHQoKSkuZG9uZTsgKSB7XG4gICAgICAgIHZhciAkX183ID0gJF9fNi52YWx1ZSxcbiAgICAgICAgICAgIGtleSA9ICRfXzdbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9ICRfXzdbMV07XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoTWFwLCB7XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzXy5sZW5ndGggLyAyIC0gdGhpcy5kZWxldGVkQ291bnRfO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBpbmRleCA9IGxvb2t1cEluZGV4KHRoaXMsIGtleSk7XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllc19baW5kZXggKyAxXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIG9iamVjdE1vZGUgPSBpc09iamVjdChrZXkpO1xuICAgICAgdmFyIHN0cmluZ01vZGUgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBpbmRleCA9IGxvb2t1cEluZGV4KHRoaXMsIGtleSk7XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5lbnRyaWVzXy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXhdID0ga2V5O1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKG9iamVjdE1vZGUpIHtcbiAgICAgICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hPYmplY3QuaGFzaDtcbiAgICAgICAgICB0aGlzLm9iamVjdEluZGV4X1toYXNoXSA9IGluZGV4O1xuICAgICAgICB9IGVsc2UgaWYgKHN0cmluZ01vZGUpIHtcbiAgICAgICAgICB0aGlzLnN0cmluZ0luZGV4X1trZXldID0gaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XSA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gbG9va3VwSW5kZXgodGhpcywga2V5KSAhPT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBvYmplY3RNb2RlID0gaXNPYmplY3Qoa2V5KTtcbiAgICAgIHZhciBzdHJpbmdNb2RlID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGFzaDtcbiAgICAgIGlmIChvYmplY3RNb2RlKSB7XG4gICAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgICBpZiAoaGFzaE9iamVjdCkge1xuICAgICAgICAgIGluZGV4ID0gdGhpcy5vYmplY3RJbmRleF9baGFzaCA9IGhhc2hPYmplY3QuaGFzaF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMub2JqZWN0SW5kZXhfW2hhc2hdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHN0cmluZ01vZGUpIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLnN0cmluZ0luZGV4X1trZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4XSA9IGRlbGV0ZWRTZW50aW5lbDtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRlbGV0ZWRDb3VudF8rKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBpbml0TWFwKHRoaXMpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICBpZiAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVudHJpZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fOCgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aCkgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fOCwgdGhpcyk7XG4gICAgfSksXG4gICAga2V5czogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX185KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX185LCB0aGlzKTtcbiAgICB9KSxcbiAgICB2YWx1ZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fMTAoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMTAsIHRoaXMpO1xuICAgIH0pXG4gIH0sIHt9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogTWFwLnByb3RvdHlwZS5lbnRyaWVzXG4gIH0pO1xuICBmdW5jdGlvbiBwb2x5ZmlsbE1hcChnbG9iYWwpIHtcbiAgICB2YXIgJF9fNyA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fNy5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzcuU3ltYm9sO1xuICAgIGlmICghZ2xvYmFsLk1hcClcbiAgICAgIGdsb2JhbC5NYXAgPSBNYXA7XG4gICAgdmFyIG1hcFByb3RvdHlwZSA9IGdsb2JhbC5NYXAucHJvdG90eXBlO1xuICAgIGlmIChtYXBQcm90b3R5cGUuZW50cmllcykge1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihtYXBQcm90b3R5cGUsIG1hcFByb3RvdHlwZS5lbnRyaWVzLCBTeW1ib2wpO1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IGdsb2JhbC5NYXAoKS5lbnRyaWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsTWFwKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgTWFwKCkge1xuICAgICAgcmV0dXJuIE1hcDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE1hcCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE1hcDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIjtcbiAgdmFyICRfXzExID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18xMS5pc09iamVjdCxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18xMS5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzExLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBNYXAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCIpLk1hcDtcbiAgdmFyIGdldE93bkhhc2hPYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdDtcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZ1bmN0aW9uIGluaXRTZXQoc2V0KSB7XG4gICAgc2V0Lm1hcF8gPSBuZXcgTWFwKCk7XG4gIH1cbiAgdmFyIFNldCA9IGZ1bmN0aW9uIFNldCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ21hcF8nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGNhbiBub3QgYmUgcmVlbnRyYW50bHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgaW5pdFNldCh0aGlzKTtcbiAgICBpZiAoaXRlcmFibGUgIT09IG51bGwgJiYgaXRlcmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgJF9fMTUgPSBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fMTY7ICEoJF9fMTYgPSAkX18xNS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzE2LnZhbHVlO1xuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5hZGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFNldCwge1xuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5zaXplO1xuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uaGFzKGtleSk7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdGhpcy5tYXBfLnNldChrZXksIGtleSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5jbGVhcigpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICB2YXIgJF9fMTMgPSB0aGlzO1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5mb3JFYWNoKChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCBrZXksIGtleSwgJF9fMTMpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzE4KCkge1xuICAgICAgdmFyICRfXzE5LFxuICAgICAgICAgICRfXzIwO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18xOSA9IHRoaXMubWFwXy5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMjAgPSAkX18xOVskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMjAuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzIwLnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18yMC52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzE4LCB0aGlzKTtcbiAgICB9KSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzIxKCkge1xuICAgICAgdmFyICRfXzIyLFxuICAgICAgICAgICRfXzIzO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18yMiA9IHRoaXMubWFwXy5lbnRyaWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMjMgPSAkX18yMlskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMjMuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzIzLnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18yMy52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzIxLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IFNldC5wcm90b3R5cGUudmFsdWVzXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgJ2tleXMnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBTZXQucHJvdG90eXBlLnZhbHVlc1xuICB9KTtcbiAgZnVuY3Rpb24gcG9seWZpbGxTZXQoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzE3ID0gZ2xvYmFsLFxuICAgICAgICBPYmplY3QgPSAkX18xNy5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzE3LlN5bWJvbDtcbiAgICBpZiAoIWdsb2JhbC5TZXQpXG4gICAgICBnbG9iYWwuU2V0ID0gU2V0O1xuICAgIHZhciBzZXRQcm90b3R5cGUgPSBnbG9iYWwuU2V0LnByb3RvdHlwZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlLnZhbHVlcykge1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihzZXRQcm90b3R5cGUsIHNldFByb3RvdHlwZS52YWx1ZXMsIFN5bWJvbCk7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgZ2xvYmFsLlNldCgpLnZhbHVlcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSwgU3ltYm9sKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFNldCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IFNldCgpIHtcbiAgICAgIHJldHVybiBTZXQ7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxTZXQoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxTZXQ7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCI7XG4gIHZhciBsZW4gPSAwO1xuICBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gICAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gICAgbGVuICs9IDI7XG4gICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxuICB2YXIgJF9fZGVmYXVsdCA9IGFzYXA7XG4gIHZhciBicm93c2VyR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6IHt9O1xuICB2YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuICB2YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuICBmdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIG5vZGUuZGF0YSA9IChpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMik7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmbHVzaCwgMSk7XG4gICAgfTtcbiAgfVxuICB2YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcbiAgICAgIGNhbGxiYWNrKGFyZyk7XG4gICAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGVuID0gMDtcbiAgfVxuICB2YXIgc2NoZWR1bGVGbHVzaDtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbiAgfSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gIH0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbiAgfSBlbHNlIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xuICB9XG4gIHJldHVybiB7Z2V0IGRlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gJF9fZGVmYXVsdDtcbiAgICB9fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlXCI7XG4gIHZhciBhc3luYyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIikuZGVmYXVsdDtcbiAgdmFyIHJlZ2lzdGVyUG9seWZpbGwgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIikucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyIHByb21pc2VSYXcgPSB7fTtcbiAgZnVuY3Rpb24gaXNQcm9taXNlKHgpIHtcbiAgICByZXR1cm4geCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeC5zdGF0dXNfICE9PSB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZXNvbHZlSGFuZGxlcih4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZWplY3RIYW5kbGVyKHgpIHtcbiAgICB0aHJvdyB4O1xuICB9XG4gIGZ1bmN0aW9uIGNoYWluKHByb21pc2UpIHtcbiAgICB2YXIgb25SZXNvbHZlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IGlkUmVzb2x2ZUhhbmRsZXI7XG4gICAgdmFyIG9uUmVqZWN0ID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IGlkUmVqZWN0SGFuZGxlcjtcbiAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZChwcm9taXNlLmNvbnN0cnVjdG9yKTtcbiAgICBzd2l0Y2ggKHByb21pc2Uuc3RhdHVzXykge1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHRocm93IFR5cGVFcnJvcjtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcHJvbWlzZS5vblJlc29sdmVfLnB1c2gob25SZXNvbHZlLCBkZWZlcnJlZCk7XG4gICAgICAgIHByb21pc2Uub25SZWplY3RfLnB1c2gob25SZWplY3QsIGRlZmVycmVkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICsxOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVzb2x2ZSwgZGVmZXJyZWRdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVqZWN0LCBkZWZlcnJlZF0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVmZXJyZWQoQykge1xuICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBwcm9taXNlSW5pdChuZXcgJFByb21pc2UocHJvbWlzZVJhdykpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgcmVzb2x2ZTogKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KTtcbiAgICAgICAgfSksXG4gICAgICAgIHJlamVjdDogKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpO1xuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgcmVzdWx0LnByb21pc2UgPSBuZXcgQygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc3VsdC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgcmVzdWx0LnJlamVjdCA9IHJlamVjdDtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VTZXQocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSwgb25SZXNvbHZlLCBvblJlamVjdCkge1xuICAgIHByb21pc2Uuc3RhdHVzXyA9IHN0YXR1cztcbiAgICBwcm9taXNlLnZhbHVlXyA9IHZhbHVlO1xuICAgIHByb21pc2Uub25SZXNvbHZlXyA9IG9uUmVzb2x2ZTtcbiAgICBwcm9taXNlLm9uUmVqZWN0XyA9IG9uUmVqZWN0O1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VJbml0KHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZVNldChwcm9taXNlLCAwLCB1bmRlZmluZWQsIFtdLCBbXSk7XG4gIH1cbiAgdmFyIFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgaWYgKHJlc29sdmVyID09PSBwcm9taXNlUmF3KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgIHZhciBwcm9taXNlID0gcHJvbWlzZUluaXQodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmVyKChmdW5jdGlvbih4KSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpO1xuICAgICAgfSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgcik7XG4gICAgICB9KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCBlKTtcbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFByb21pc2UsIHtcbiAgICBjYXRjaDogZnVuY3Rpb24ob25SZWplY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdCk7XG4gICAgfSxcbiAgICB0aGVuOiBmdW5jdGlvbihvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIG9uUmVzb2x2ZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgb25SZXNvbHZlID0gaWRSZXNvbHZlSGFuZGxlcjtcbiAgICAgIGlmICh0eXBlb2Ygb25SZWplY3QgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uUmVqZWN0ID0gaWRSZWplY3RIYW5kbGVyO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjaGFpbih0aGlzLCBmdW5jdGlvbih4KSB7XG4gICAgICAgIHggPSBwcm9taXNlQ29lcmNlKGNvbnN0cnVjdG9yLCB4KTtcbiAgICAgICAgcmV0dXJuIHggPT09IHRoYXQgPyBvblJlamVjdChuZXcgVHlwZUVycm9yKSA6IGlzUHJvbWlzZSh4KSA/IHgudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KSA6IG9uUmVzb2x2ZSh4KTtcbiAgICAgIH0sIG9uUmVqZWN0KTtcbiAgICB9XG4gIH0sIHtcbiAgICByZXNvbHZlOiBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgICAgaWYgKGlzUHJvbWlzZSh4KSkge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlU2V0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSwgKzEsIHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlc29sdmUoeCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVqZWN0OiBmdW5jdGlvbihyKSB7XG4gICAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VTZXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpLCAtMSwgcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlamVjdChyKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHRoaXMpO1xuICAgICAgdmFyIHJlc29sdXRpb25zID0gW107XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgY291bnQgPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc29sdXRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlKHZhbHVlc1tpXSkudGhlbihmdW5jdGlvbihpLCB4KSB7XG4gICAgICAgICAgICAgIHJlc29sdXRpb25zW2ldID0geDtcbiAgICAgICAgICAgICAgaWYgKC0tY291bnQgPT09IDApXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHV0aW9ucyk7XG4gICAgICAgICAgICB9LmJpbmQodW5kZWZpbmVkLCBpKSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9LFxuICAgIHJhY2U6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQodGhpcyk7XG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWx1ZXNbaV0pLnRoZW4oKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoeCk7XG4gICAgICAgICAgfSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cbiAgfSk7XG4gIHZhciAkUHJvbWlzZSA9IFByb21pc2U7XG4gIHZhciAkUHJvbWlzZVJlamVjdCA9ICRQcm9taXNlLnJlamVjdDtcbiAgZnVuY3Rpb24gcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCkge1xuICAgIHByb21pc2VEb25lKHByb21pc2UsICsxLCB4LCBwcm9taXNlLm9uUmVzb2x2ZV8pO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VSZWplY3QocHJvbWlzZSwgcikge1xuICAgIHByb21pc2VEb25lKHByb21pc2UsIC0xLCByLCBwcm9taXNlLm9uUmVqZWN0Xyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZURvbmUocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSwgcmVhY3Rpb25zKSB7XG4gICAgaWYgKHByb21pc2Uuc3RhdHVzXyAhPT0gMClcbiAgICAgIHJldHVybjtcbiAgICBwcm9taXNlRW5xdWV1ZSh2YWx1ZSwgcmVhY3Rpb25zKTtcbiAgICBwcm9taXNlU2V0KHByb21pc2UsIHN0YXR1cywgdmFsdWUpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VFbnF1ZXVlKHZhbHVlLCB0YXNrcykge1xuICAgIGFzeW5jKChmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgcHJvbWlzZUhhbmRsZSh2YWx1ZSwgdGFza3NbaV0sIHRhc2tzW2kgKyAxXSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VIYW5kbGUodmFsdWUsIGhhbmRsZXIsIGRlZmVycmVkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGRlZmVycmVkLnByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gICAgICBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSlcbiAgICAgICAgY2hhaW4ocmVzdWx0LCBkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgZWxzZVxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gIH1cbiAgdmFyIHRoZW5hYmxlU3ltYm9sID0gJ0BAdGhlbmFibGUnO1xuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUNvZXJjZShjb25zdHJ1Y3RvciwgeCkge1xuICAgIGlmICghaXNQcm9taXNlKHgpICYmIGlzT2JqZWN0KHgpKSB7XG4gICAgICB2YXIgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4gPSB4LnRoZW47XG4gICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gJFByb21pc2VSZWplY3QuY2FsbChjb25zdHJ1Y3Rvciwgcik7XG4gICAgICAgIHhbdGhlbmFibGVTeW1ib2xdID0gcHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIHAgPSB4W3RoZW5hYmxlU3ltYm9sXTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZChjb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgeFt0aGVuYWJsZVN5bWJvbF0gPSBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwoeCwgZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsUHJvbWlzZShnbG9iYWwpIHtcbiAgICBpZiAoIWdsb2JhbC5Qcm9taXNlKVxuICAgICAgZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxQcm9taXNlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgUHJvbWlzZSgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsUHJvbWlzZSgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbFByb21pc2U7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRfXzI5O1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiO1xuICB2YXIgJF9fMjcgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzI3LmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0LFxuICAgICAgaXNPYmplY3QgPSAkX18yNy5pc09iamVjdDtcbiAgdmFyICRfXzMwID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSAkX18zMC5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHRvUHJvcGVydHkgPSAkX18zMC50b1Byb3BlcnR5O1xuICB2YXIgaXRlcmF0ZWRTdHJpbmcgPSBTeW1ib2woJ2l0ZXJhdGVkU3RyaW5nJyk7XG4gIHZhciBzdHJpbmdJdGVyYXRvck5leHRJbmRleCA9IFN5bWJvbCgnc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgnKTtcbiAgdmFyIFN0cmluZ0l0ZXJhdG9yID0gZnVuY3Rpb24gU3RyaW5nSXRlcmF0b3IoKSB7fTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoU3RyaW5nSXRlcmF0b3IsICgkX18yOSA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMjksIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG8gPSB0aGlzO1xuICAgICAgaWYgKCFpc09iamVjdChvKSB8fCAhaGFzT3duUHJvcGVydHkobywgaXRlcmF0ZWRTdHJpbmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgbXVzdCBiZSBhIFN0cmluZ0l0ZXJhdG9yIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdmFyIHMgPSBvW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXTtcbiAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgcG9zaXRpb24gPSBvW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXTtcbiAgICAgIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgICAgIGlmIChwb3NpdGlvbiA+PSBsZW4pIHtcbiAgICAgICAgb1t0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0ID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICAgIHZhciByZXN1bHRTdHJpbmc7XG4gICAgICBpZiAoZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBsZW4pIHtcbiAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2Vjb25kID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSk7XG4gICAgICAgIGlmIChzZWNvbmQgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGKSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9bdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gcG9zaXRpb24gKyByZXN1bHRTdHJpbmcubGVuZ3RoO1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHJlc3VsdFN0cmluZywgZmFsc2UpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18yOSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fMjkpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHN0cmluZykge1xuICAgIHZhciBzID0gU3RyaW5nKHN0cmluZyk7XG4gICAgdmFyIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUpO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHM7XG4gICAgaXRlcmF0b3JbdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gMDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgcmV0dXJuIHtnZXQgY3JlYXRlU3RyaW5nSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3I7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIjtcbiAgdmFyIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCIpLmNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICB2YXIgJF9fMzIgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzMyLm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzMyLm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMzIucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyICR0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciAkaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcbiAgdmFyICRsYXN0SW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUubGFzdEluZGV4T2Y7XG4gIGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICBpZiAodGhpcyA9PSBudWxsIHx8ICR0b1N0cmluZy5jYWxsKHNlYXJjaCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgIHBvcyA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgcmV0dXJuICRpbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvcykgPT0gc3RhcnQ7XG4gIH1cbiAgZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICBpZiAodGhpcyA9PSBudWxsIHx8ICR0b1N0cmluZy5jYWxsKHNlYXJjaCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvcyA9IHN0cmluZ0xlbmd0aDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICAgICAgcG9zID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZW5kID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICB2YXIgc3RhcnQgPSBlbmQgLSBzZWFyY2hMZW5ndGg7XG4gICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJGxhc3RJbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHN0YXJ0KSA9PSBzdGFydDtcbiAgfVxuICBmdW5jdGlvbiBjb250YWlucyhzZWFyY2gpIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgIHBvcyA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgcmV0dXJuICRpbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvcykgIT0gLTE7XG4gIH1cbiAgZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIG4gPSBjb3VudCA/IE51bWJlcihjb3VudCkgOiAwO1xuICAgIGlmIChpc05hTihuKSkge1xuICAgICAgbiA9IDA7XG4gICAgfVxuICAgIGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB7XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChuID09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHdoaWxlIChuLS0pIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gY29kZVBvaW50QXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgc2l6ZSA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4oaW5kZXgpKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gc2l6ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIHZhciBzZWNvbmQ7XG4gICAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc2l6ZSA+IGluZGV4ICsgMSkge1xuICAgICAgc2Vjb25kID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgIGlmIChzZWNvbmQgPj0gMHhEQzAwICYmIHNlY29uZCA8PSAweERGRkYpIHtcbiAgICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaXJzdDtcbiAgfVxuICBmdW5jdGlvbiByYXcoY2FsbHNpdGUpIHtcbiAgICB2YXIgcmF3ID0gY2FsbHNpdGUucmF3O1xuICAgIHZhciBsZW4gPSByYXcubGVuZ3RoID4+PiAwO1xuICAgIGlmIChsZW4gPT09IDApXG4gICAgICByZXR1cm4gJyc7XG4gICAgdmFyIHMgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHMgKz0gcmF3W2ldO1xuICAgICAgaWYgKGkgKyAxID09PSBsZW4pXG4gICAgICAgIHJldHVybiBzO1xuICAgICAgcyArPSBhcmd1bWVudHNbKytpXTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZnJvbUNvZGVQb2ludCgpIHtcbiAgICB2YXIgY29kZVVuaXRzID0gW107XG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgaGlnaFN1cnJvZ2F0ZTtcbiAgICB2YXIgbG93U3Vycm9nYXRlO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuICAgICAgaWYgKCFpc0Zpbml0ZShjb2RlUG9pbnQpIHx8IGNvZGVQb2ludCA8IDAgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgZmxvb3IoY29kZVBvaW50KSAhPSBjb2RlUG9pbnQpIHtcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCBjb2RlIHBvaW50OiAnICsgY29kZVBvaW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7XG4gICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcbiAgICAgICAgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgMHhEODAwO1xuICAgICAgICBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgMHhEQzAwO1xuICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuICB9XG4gIGZ1bmN0aW9uIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgIHZhciBvID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgIHZhciBzID0gU3RyaW5nKG8pO1xuICAgIHJldHVybiBjcmVhdGVTdHJpbmdJdGVyYXRvcihzKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFN0cmluZyhnbG9iYWwpIHtcbiAgICB2YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhTdHJpbmcucHJvdG90eXBlLCBbJ2NvZGVQb2ludEF0JywgY29kZVBvaW50QXQsICdjb250YWlucycsIGNvbnRhaW5zLCAnZW5kc1dpdGgnLCBlbmRzV2l0aCwgJ3N0YXJ0c1dpdGgnLCBzdGFydHNXaXRoLCAncmVwZWF0JywgcmVwZWF0XSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLCBbJ2Zyb21Db2RlUG9pbnQnLCBmcm9tQ29kZVBvaW50LCAncmF3JywgcmF3XSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihTdHJpbmcucHJvdG90eXBlLCBzdHJpbmdQcm90b3R5cGVJdGVyYXRvciwgU3ltYm9sKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsU3RyaW5nKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhcnRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBzdGFydHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGVuZHNXaXRoKCkge1xuICAgICAgcmV0dXJuIGVuZHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGNvbnRhaW5zKCkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH0sXG4gICAgZ2V0IHJlcGVhdCgpIHtcbiAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgfSxcbiAgICBnZXQgY29kZVBvaW50QXQoKSB7XG4gICAgICByZXR1cm4gY29kZVBvaW50QXQ7XG4gICAgfSxcbiAgICBnZXQgcmF3KCkge1xuICAgICAgcmV0dXJuIHJhdztcbiAgICB9LFxuICAgIGdldCBmcm9tQ29kZVBvaW50KCkge1xuICAgICAgcmV0dXJuIGZyb21Db2RlUG9pbnQ7XG4gICAgfSxcbiAgICBnZXQgc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gc3RyaW5nUHJvdG90eXBlSXRlcmF0b3I7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxTdHJpbmc7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkX18zNjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiO1xuICB2YXIgJF9fMzQgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICB0b09iamVjdCA9ICRfXzM0LnRvT2JqZWN0LFxuICAgICAgdG9VaW50MzIgPSAkX18zNC50b1VpbnQzMixcbiAgICAgIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0ID0gJF9fMzQuY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gIHZhciBBUlJBWV9JVEVSQVRPUl9LSU5EX0tFWVMgPSAxO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMgPSAyO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTID0gMztcbiAgdmFyIEFycmF5SXRlcmF0b3IgPSBmdW5jdGlvbiBBcnJheUl0ZXJhdG9yKCkge307XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKEFycmF5SXRlcmF0b3IsICgkX18zNiA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMzYsIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gdG9PYmplY3QodGhpcyk7XG4gICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5pdGVyYXRvck9iamVjdF87XG4gICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdCBpcyBub3QgYW4gQXJyYXlJdGVyYXRvcicpO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF87XG4gICAgICB2YXIgaXRlbUtpbmQgPSBpdGVyYXRvci5hcnJheUl0ZXJhdGlvbktpbmRfO1xuICAgICAgdmFyIGxlbmd0aCA9IHRvVWludDMyKGFycmF5Lmxlbmd0aCk7XG4gICAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gSW5maW5pdHk7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSBpbmRleCArIDE7XG4gICAgICBpZiAoaXRlbUtpbmQgPT0gQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMpXG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChhcnJheVtpbmRleF0sIGZhbHNlKTtcbiAgICAgIGlmIChpdGVtS2luZCA9PSBBUlJBWV9JVEVSQVRPUl9LSU5EX0VOVFJJRVMpXG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChbaW5kZXgsIGFycmF5W2luZGV4XV0sIGZhbHNlKTtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChpbmRleCwgZmFsc2UpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18zNiwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fMzYpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5SXRlcmF0b3IoYXJyYXksIGtpbmQpIHtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QoYXJyYXkpO1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBBcnJheUl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yLml0ZXJhdG9yT2JqZWN0XyA9IG9iamVjdDtcbiAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IDA7XG4gICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXyA9IGtpbmQ7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKTtcbiAgfVxuICBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfS0VZUyk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGdldCBlbnRyaWVzKCkge1xuICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgfSxcbiAgICBnZXQga2V5cygpIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0sXG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiO1xuICB2YXIgJF9fMzcgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiKSxcbiAgICAgIGVudHJpZXMgPSAkX18zNy5lbnRyaWVzLFxuICAgICAga2V5cyA9ICRfXzM3LmtleXMsXG4gICAgICB2YWx1ZXMgPSAkX18zNy52YWx1ZXM7XG4gIHZhciAkX18zOCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGNoZWNrSXRlcmFibGUgPSAkX18zOC5jaGVja0l0ZXJhYmxlLFxuICAgICAgaXNDYWxsYWJsZSA9ICRfXzM4LmlzQ2FsbGFibGUsXG4gICAgICBpc0NvbnN0cnVjdG9yID0gJF9fMzguaXNDb25zdHJ1Y3RvcixcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fMzgubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMzgubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18zOC5yZWdpc3RlclBvbHlmaWxsLFxuICAgICAgdG9JbnRlZ2VyID0gJF9fMzgudG9JbnRlZ2VyLFxuICAgICAgdG9MZW5ndGggPSAkX18zOC50b0xlbmd0aCxcbiAgICAgIHRvT2JqZWN0ID0gJF9fMzgudG9PYmplY3Q7XG4gIGZ1bmN0aW9uIGZyb20oYXJyTGlrZSkge1xuICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGl0ZW1zID0gdG9PYmplY3QoYXJyTGlrZSk7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBGbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBrID0gMDtcbiAgICB2YXIgYXJyLFxuICAgICAgICBsZW47XG4gICAgaWYgKG1hcHBpbmcgJiYgIWlzQ2FsbGFibGUobWFwRm4pKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrSXRlcmFibGUoaXRlbXMpKSB7XG4gICAgICBhcnIgPSBpc0NvbnN0cnVjdG9yKEMpID8gbmV3IEMoKSA6IFtdO1xuICAgICAgZm9yICh2YXIgJF9fMzkgPSBpdGVtc1tTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fNDA7ICEoJF9fNDAgPSAkX18zOS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzQwLnZhbHVlO1xuICAgICAgICB7XG4gICAgICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgICAgIGFycltrXSA9IG1hcEZuLmNhbGwodGhpc0FyZywgaXRlbSwgayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycltrXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIGsrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLmxlbmd0aCA9IGs7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xuICAgIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICg7IGsgPCBsZW47IGsrKykge1xuICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgYXJyW2tdID0gdHlwZW9mIHRoaXNBcmcgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oaXRlbXNba10sIGspIDogbWFwRm4uY2FsbCh0aGlzQXJnLCBpdGVtc1trXSwgayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJba10gPSBpdGVtc1trXTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXJyLmxlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGZ1bmN0aW9uIG9mKCkge1xuICAgIGZvciAodmFyIGl0ZW1zID0gW10sXG4gICAgICAgICRfXzQxID0gMDsgJF9fNDEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX180MSsrKVxuICAgICAgaXRlbXNbJF9fNDFdID0gYXJndW1lbnRzWyRfXzQxXTtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGxlbiA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKGxlbikgOiBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGxlbjsgaysrKSB7XG4gICAgICBhcnJba10gPSBpdGVtc1trXTtcbiAgICB9XG4gICAgYXJyLmxlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGZ1bmN0aW9uIGZpbGwodmFsdWUpIHtcbiAgICB2YXIgc3RhcnQgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDogMDtcbiAgICB2YXIgZW5kID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgob2JqZWN0Lmxlbmd0aCk7XG4gICAgdmFyIGZpbGxTdGFydCA9IHRvSW50ZWdlcihzdGFydCk7XG4gICAgdmFyIGZpbGxFbmQgPSBlbmQgIT09IHVuZGVmaW5lZCA/IHRvSW50ZWdlcihlbmQpIDogbGVuO1xuICAgIGZpbGxTdGFydCA9IGZpbGxTdGFydCA8IDAgPyBNYXRoLm1heChsZW4gKyBmaWxsU3RhcnQsIDApIDogTWF0aC5taW4oZmlsbFN0YXJ0LCBsZW4pO1xuICAgIGZpbGxFbmQgPSBmaWxsRW5kIDwgMCA/IE1hdGgubWF4KGxlbiArIGZpbGxFbmQsIDApIDogTWF0aC5taW4oZmlsbEVuZCwgbGVuKTtcbiAgICB3aGlsZSAoZmlsbFN0YXJ0IDwgZmlsbEVuZCkge1xuICAgICAgb2JqZWN0W2ZpbGxTdGFydF0gPSB2YWx1ZTtcbiAgICAgIGZpbGxTdGFydCsrO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIGZpbmRIZWxwZXIodGhpcywgcHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgfVxuICBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIGZpbmRIZWxwZXIodGhpcywgcHJlZGljYXRlLCB0aGlzQXJnLCB0cnVlKTtcbiAgfVxuICBmdW5jdGlvbiBmaW5kSGVscGVyKHNlbGYsIHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciByZXR1cm5JbmRleCA9IGFyZ3VtZW50c1szXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3Qoc2VsZik7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKG9iamVjdC5sZW5ndGgpO1xuICAgIGlmICghaXNDYWxsYWJsZShwcmVkaWNhdGUpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBvYmplY3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybkluZGV4ID8gaSA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5JbmRleCA/IC0xIDogdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsQXJyYXkoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzQyID0gZ2xvYmFsLFxuICAgICAgICBBcnJheSA9ICRfXzQyLkFycmF5LFxuICAgICAgICBPYmplY3QgPSAkX180Mi5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzQyLlN5bWJvbDtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheS5wcm90b3R5cGUsIFsnZW50cmllcycsIGVudHJpZXMsICdrZXlzJywga2V5cywgJ3ZhbHVlcycsIHZhbHVlcywgJ2ZpbGwnLCBmaWxsLCAnZmluZCcsIGZpbmQsICdmaW5kSW5kZXgnLCBmaW5kSW5kZXhdKTtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheSwgWydmcm9tJywgZnJvbSwgJ29mJywgb2ZdKTtcbiAgICBtYXliZUFkZEl0ZXJhdG9yKEFycmF5LnByb3RvdHlwZSwgdmFsdWVzLCBTeW1ib2wpO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKFtdLnZhbHVlcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBTeW1ib2wpO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxBcnJheSk7XG4gIHJldHVybiB7XG4gICAgZ2V0IGZyb20oKSB7XG4gICAgICByZXR1cm4gZnJvbTtcbiAgICB9LFxuICAgIGdldCBvZigpIHtcbiAgICAgIHJldHVybiBvZjtcbiAgICB9LFxuICAgIGdldCBmaWxsKCkge1xuICAgICAgcmV0dXJuIGZpbGw7XG4gICAgfSxcbiAgICBnZXQgZmluZCgpIHtcbiAgICAgIHJldHVybiBmaW5kO1xuICAgIH0sXG4gICAgZ2V0IGZpbmRJbmRleCgpIHtcbiAgICAgIHJldHVybiBmaW5kSW5kZXg7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxBcnJheSgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbEFycmF5O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5XCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCI7XG4gIHZhciAkX180MyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fNDMubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fNDMucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyICRfXzQ0ID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgZGVmaW5lUHJvcGVydHkgPSAkX180NC5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRfXzQ0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICAgIGdldE93blByb3BlcnR5TmFtZXMgPSAkX180NC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgICAga2V5cyA9ICRfXzQ0LmtleXMsXG4gICAgICBwcml2YXRlTmFtZXMgPSAkX180NC5wcml2YXRlTmFtZXM7XG4gIGZ1bmN0aW9uIGlzKGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGxlZnQgPT09IHJpZ2h0KVxuICAgICAgcmV0dXJuIGxlZnQgIT09IDAgfHwgMSAvIGxlZnQgPT09IDEgLyByaWdodDtcbiAgICByZXR1cm4gbGVmdCAhPT0gbGVmdCAmJiByaWdodCAhPT0gcmlnaHQ7XG4gIH1cbiAgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICAgICAgdmFyIHAsXG4gICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgICAgZm9yIChwID0gMDsgcCA8IGxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gcHJvcHNbcF07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHNvdXJjZVtuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBwcm9wcyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlKTtcbiAgICB2YXIgcCxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHByb3BzW3BdKTtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcHNbcF0sIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsT2JqZWN0KGdsb2JhbCkge1xuICAgIHZhciBPYmplY3QgPSBnbG9iYWwuT2JqZWN0O1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKE9iamVjdCwgWydhc3NpZ24nLCBhc3NpZ24sICdpcycsIGlzLCAnbWl4aW4nLCBtaXhpbl0pO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxPYmplY3QpO1xuICByZXR1cm4ge1xuICAgIGdldCBpcygpIHtcbiAgICAgIHJldHVybiBpcztcbiAgICB9LFxuICAgIGdldCBhc3NpZ24oKSB7XG4gICAgICByZXR1cm4gYXNzaWduO1xuICAgIH0sXG4gICAgZ2V0IG1peGluKCkge1xuICAgICAgcmV0dXJuIG1peGluO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsT2JqZWN0O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTnVtYmVyXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiO1xuICB2YXIgJF9fNDYgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBpc051bWJlciA9ICRfXzQ2LmlzTnVtYmVyLFxuICAgICAgbWF5YmVBZGRDb25zdHMgPSAkX180Ni5tYXliZUFkZENvbnN0cyxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fNDYubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fNDYucmVnaXN0ZXJQb2x5ZmlsbCxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzQ2LnRvSW50ZWdlcjtcbiAgdmFyICRhYnMgPSBNYXRoLmFicztcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgdmFyIE1JTl9TQUZFX0lOVEVHRVIgPSAtTWF0aC5wb3coMiwgNTMpICsgMTtcbiAgdmFyIEVQU0lMT04gPSBNYXRoLnBvdygyLCAtNTIpO1xuICBmdW5jdGlvbiBOdW1iZXJJc0Zpbml0ZShudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNGaW5pdGUobnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzSW50ZWdlcihudW1iZXIpIHtcbiAgICByZXR1cm4gTnVtYmVySXNGaW5pdGUobnVtYmVyKSAmJiB0b0ludGVnZXIobnVtYmVyKSA9PT0gbnVtYmVyO1xuICB9XG4gIGZ1bmN0aW9uIE51bWJlcklzTmFOKG51bWJlcikge1xuICAgIHJldHVybiBpc051bWJlcihudW1iZXIpICYmICRpc05hTihudW1iZXIpO1xuICB9XG4gIDtcbiAgZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVySXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgdmFyIGludGVncmFsID0gdG9JbnRlZ2VyKG51bWJlcik7XG4gICAgICBpZiAoaW50ZWdyYWwgPT09IG51bWJlcilcbiAgICAgICAgcmV0dXJuICRhYnMoaW50ZWdyYWwpIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE51bWJlcihnbG9iYWwpIHtcbiAgICB2YXIgTnVtYmVyID0gZ2xvYmFsLk51bWJlcjtcbiAgICBtYXliZUFkZENvbnN0cyhOdW1iZXIsIFsnTUFYX1NBRkVfSU5URUdFUicsIE1BWF9TQUZFX0lOVEVHRVIsICdNSU5fU0FGRV9JTlRFR0VSJywgTUlOX1NBRkVfSU5URUdFUiwgJ0VQU0lMT04nLCBFUFNJTE9OXSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoTnVtYmVyLCBbJ2lzRmluaXRlJywgTnVtYmVySXNGaW5pdGUsICdpc0ludGVnZXInLCBpc0ludGVnZXIsICdpc05hTicsIE51bWJlcklzTmFOLCAnaXNTYWZlSW50ZWdlcicsIGlzU2FmZUludGVnZXJdKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsTnVtYmVyKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgTUFYX1NBRkVfSU5URUdFUigpIHtcbiAgICAgIHJldHVybiBNQVhfU0FGRV9JTlRFR0VSO1xuICAgIH0sXG4gICAgZ2V0IE1JTl9TQUZFX0lOVEVHRVIoKSB7XG4gICAgICByZXR1cm4gTUlOX1NBRkVfSU5URUdFUjtcbiAgICB9LFxuICAgIGdldCBFUFNJTE9OKCkge1xuICAgICAgcmV0dXJuIEVQU0lMT047XG4gICAgfSxcbiAgICBnZXQgaXNGaW5pdGUoKSB7XG4gICAgICByZXR1cm4gTnVtYmVySXNGaW5pdGU7XG4gICAgfSxcbiAgICBnZXQgaXNJbnRlZ2VyKCkge1xuICAgICAgcmV0dXJuIGlzSW50ZWdlcjtcbiAgICB9LFxuICAgIGdldCBpc05hTigpIHtcbiAgICAgIHJldHVybiBOdW1iZXJJc05hTjtcbiAgICB9LFxuICAgIGdldCBpc1NhZmVJbnRlZ2VyKCkge1xuICAgICAgcmV0dXJuIGlzU2FmZUludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxOdW1iZXIoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxOdW1iZXI7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTnVtYmVyXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9wb2x5ZmlsbHNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCI7XG4gIHZhciBwb2x5ZmlsbEFsbCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKS5wb2x5ZmlsbEFsbDtcbiAgcG9seWZpbGxBbGwodGhpcyk7XG4gIHZhciBzZXR1cEdsb2JhbHMgPSAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzO1xuICAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzID0gZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gICAgcG9seWZpbGxBbGwoZ2xvYmFsKTtcbiAgfTtcbiAgcmV0dXJuIHt9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCIgKyAnJyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICBcblxuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImFib3V0LXZpZXdcXFwiPlxcblx0PGgxPkFib3V0IFVTISEhPC9oMT5cXG48L2Rpdj5cXG5cIjtcbiAgfSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIFxuXG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwibWVudS12aWV3IHNob3dcXFwiPlxcblx0PGRpdiBjbGFzcz1cXFwic2NyZWVuIHNoYWRlZFxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJzY3JlZW5cXFwiPjwvYnV0dG9uPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cXFwibW92ZWFibGUgc2hvdyB0cmFuc2l0aW9uXFxcIj5cXG5cdFx0PGRpdiBjbGFzcz1cXFwiYmFyXFxcIj5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVxcXCJtZXNzYWdlXFxcIj48c3Bhbj5Tb21lIGltcG9ydGFudCBtZXNzYWdlPC9zcGFuPjwvZGl2Plxcblx0XHRcdDxkaXYgY2xhc3M9XFxcIm1lbnUtYnRuXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcInRvZ2dsZVxcXCI+PGk+bWVudTwvaT48YiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+JiM4ODAxOzwvYj48L2J1dHRvbj48L2Rpdj5cXG5cdFx0PC9kaXY+XFxuXFxuXHRcdDxkaXYgY2xhc3M9XFxcIm1lbnVcXFwiPlxcblx0XHRcdDxkaXYgY2xhc3M9XFxcInR3by1yb3dcXFwiPlxcblx0XHRcdFx0PGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cXFwiYmx1ZWxpZ2h0c1xcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5CbHVlbGlnaHRzPC9iPjwvYnV0dG9uPjwvZGl2Plxcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJjYWxsXFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcIml0ZW1cXFwiPjxiPkNhbGw8L2I+PC9idXR0b24+PC9kaXY+XFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XFxcInJlcG9ydFxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5SZXBvcnQ8L2I+PC9idXR0b24+PC9kaXY+XFxuXHRcdFx0XHQ8L2Rpdj5cXG5cdFx0XHRcdDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XFxcImFib3V0XFxcIj48YnV0dG9uIGRhdGEtY2xpY2s9XFxcIml0ZW1cXFwiPjxiPkFib3V0PC9iPjwvYnV0dG9uPjwvZGl2Plxcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlc1xcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5TZXJ2aWNlczwvYj48L2J1dHRvbj48L2Rpdj5cXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cXFwicHJvZmlsZVxcXCI+PGJ1dHRvbiBkYXRhLWNsaWNrPVxcXCJpdGVtXFxcIj48Yj5Qcm9maWxlPC9iPjwvYnV0dG9uPjwvZGl2Plxcblx0XHRcdFx0PC9kaXY+XFxuXHRcdFx0PC9kaXY+XFxuXHRcdDwvZGl2Plxcblx0PC9kaXY+XFxuPC9kaXY+XFxuXCI7XG4gIH0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIEhhbmRsZWJhcnNDb21waWxlciA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzID0gSGFuZGxlYmFyc0NvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICBcblxuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcInNlcnZpY2Utdmlld1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInN0YXR1c2Jhci1idWZmZXJcXFwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsaXN0LWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0eXBlIGxpc3RcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxpc3Qtc2Nyb2xsYWJsZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9maWVsZC1sYW5kc2NhcGUtbWVhZG93LTMxNzAtODI0eDU1MC5qcGdcXFwiIGFsdD1cXFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWluZm9cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLW5hbWVcXFwiPkV2YW5zdG9uIEhlYWx0aCBTZXJ2aWNlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCIgaWNvbi1jYWxsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGRldGFpbC1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLW1vcmUtaG9yaXpcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGV0YWlscy1hY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gY2xvc2UtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1jbG9zZVxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXRhaWxzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aXRsZS1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwic2VydmljZS1pbWFnZVxcXCIgc3JjPVxcXCJjc3MvaW1ncy9yYW5kb20taW1hZ2VzL2ZpZWxkLWxhbmRzY2FwZS1tZWFkb3ctMzE3MC04MjR4NTUwLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLW5hbWVcXFwiPkV2YW5zdG9uIEhlYWx0aCBTZXJ2aWNlPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mby1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1kZXNjcmlwdGlvblxcXCI+SWYgeW91IGFyZSBleHBlcmllbmNpbmcgYSBtZWRpY2FsIGVtZXJnZW5jeSwgPGEgaHJlZj1cXFwic21zOjEtNDA4LTU1NS0xMjEyXFxcIj5OZXcgU01TIE1lc3NhZ2U8L2E+aW5jbHVkaW5nIHRob3NlIGR1ZSB0byBleGNlc3NpdmUgYWxjb2hvbCBjb25zdW1wdGlvbiwgY2FsbCA5MTEgdG8gc3VtbW9uIHBhcmFtZWRpY3Mgb3IgZ28gdG8gdGhlIG5lYXJlc3QgaG9zcGl0YWwgZW1lcmdlbmN5IHJvb20uPC9kaXY+XFxuXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbi1zZWN0aW9uIHBob25lLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mbyBzZXJ2aWNlLXBob25lXFxcIj4yMzQtMjM0LTIzNDI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLWNhbGxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbi1zZWN0aW9uIGVtYWlsLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mbyBzZXJ2aWNlLWVtYWlsXFxcIj5oYW9Abm9ydGh3ZXN0ZXJuLmVkdTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGVtYWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tbWFpbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uLXNlY3Rpb24gd2Vic2l0ZS1zZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImluZm8gc2VydmljZS13ZWJzaXRlXFxcIj5ub3J0aHdlc3Rlcm4uZWR1PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gd2Vic2l0ZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLXB1YmxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxvY2F0aW9uLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWRkcmVzc1xcXCI+MzMwIFVuaXZlcnNpdHkgUGxhY2UsIEV2YW5zdG9uIElMLCA2MDIwODwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1saXN0aXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwic2VydmljZS1pbWFnZVxcXCIgc3JjPVxcXCJjc3MvaW1ncy9yYW5kb20taW1hZ2VzL2Jhci1mZWV0LWxlZ3MuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5TYWZlIFJpZGU8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XFxcInNlcnZpY2UtZGVzY3JpcHRpb25cXFwiPmFzZGYgYXNkIGFzZGZkcyBmYXNkZiBhc2RmIGFzZGYgYXNkIGZhc2QgZmFzZCBmYXNkIGFzZGYgYXNkIGFzZGYgYXNkZiBhc2QgZmEgc2YgYXNkZiBhc2RmIGFzZGYgYXNkZiBhc2QgZmFkcyAuLi48L2Rpdj4tLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXctYWN0aW9uc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIG1haWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiIGljb24tbWFpbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBkZXRhaWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tb3JlLWhvcml6XFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9ldmVuaW5nLWxha2UtcGVvcGxlLTE0MDIuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5Db3Vuc2VsaW5nIGFuZCBQc3ljaG9sb2dpY2FsIFNlcnZpY2VzPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCIgaWNvbi1jYWxsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGRldGFpbC1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLW1vcmUtaG9yaXpcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1saXN0aXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwic2VydmljZS1pbWFnZVxcXCIgc3JjPVxcXCJjc3MvaW1ncy9yYW5kb20taW1hZ2VzL2ZpZWxkLWxhbmRzY2FwZS1tZWFkb3ctMzE3MC04MjR4NTUwLmpwZ1xcXCIgYWx0PVxcXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtaW5mb1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+RXZhbnN0b24gSGVhbHRoIFNlcnZpY2U8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XFxcInNlcnZpY2UtZGVzY3JpcHRpb25cXFwiPmFzZGYgYXNkIGFzZGZkcyBmYXNkZiBhc2RmIGFzZGYgYXNkIGZhc2QgZmFzZCBmYXNkIGFzZGYgYXNkIGFzZGYgYXNkZiBhc2QgZmEgc2YgYXNkZiBhc2RmIGFzZGYgYXNkZiBhc2QgZmFkcyAuLi48L2Rpdj4tLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXctYWN0aW9uc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIHBob25lLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcIiBpY29uLWNhbGxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gZGV0YWlsLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tbW9yZS1ob3JpelxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXRhaWxzLWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBjbG9zZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLWNsb3NlXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRldGFpbHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInRpdGxlLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJzZXJ2aWNlLWltYWdlXFxcIiBzcmM9XFxcImNzcy9pbWdzL3JhbmRvbS1pbWFnZXMvZmllbGQtbGFuZHNjYXBlLW1lYWRvdy0zMTcwLTgyNHg1NTAuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbmFtZVxcXCI+RXZhbnN0b24gSGVhbHRoIFNlcnZpY2U8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbmZvLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgYWRzZiBhc2RmIGFzZCBmZHNmcndnIGZnaCBmZ2ggZSBmc2RmIHdzZGYgd2ZhIGRmIGFzZGYgYXNkZiBhc2RmYSBzZGZhZHNmYSBzZGY8L2Rpdj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uLXNlY3Rpb24gcGhvbmUtc2VjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbmZvIHNlcnZpY2UtcGhvbmVcXFwiPjIzNC0yMzQtMjM0MjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIHBob25lLWFjdGlvblxcXCI+PGkgY2xhc3M9XFxcImljb24tY2FsbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uLXNlY3Rpb24gZW1haWwtc2VjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbmZvIHNlcnZpY2UtZW1haWxcXFwiPmhhb0Bub3J0aHdlc3Rlcm4uZWR1PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gZW1haWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tYWlsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24tc2VjdGlvbiB3ZWJzaXRlLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5mbyBzZXJ2aWNlLXdlYnNpdGVcXFwiPm5vcnRod2VzdGVybi5lZHUvaGVhbHRoLWV2YW5zdG9uPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb24gd2Vic2l0ZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLXB1YmxcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxvY2F0aW9uLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWRkcmVzc1xcXCI+MzMwIFVuaXZlcnNpdHkgUGxhY2UsIEV2YW5zdG9uIElMLCA2MDIwODwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1saXN0aXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJvdmVydmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwic2VydmljZS1pbWFnZVxcXCIgc3JjPVxcXCJjc3MvaW1ncy9yYW5kb20taW1hZ2VzL2Jhci1mZWV0LWxlZ3MuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5TYWZlIFJpZGU8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XFxcInNlcnZpY2UtZGVzY3JpcHRpb25cXFwiPmFzZGYgYXNkIGFzZGZkcyBmYXNkZiBhc2RmIGFzZGYgYXNkIGZhc2QgZmFzZCBmYXNkIGFzZGYgYXNkIGFzZGYgYXNkZiBhc2QgZmEgc2YgYXNkZiBhc2RmIGFzZGYgYXNkZiBhc2QgZmFkcyAuLi48L2Rpdj4tLT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXctYWN0aW9uc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIG1haWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiIGljb24tbWFpbFxcXCI+PC9pPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBkZXRhaWwtYWN0aW9uXFxcIj48aSBjbGFzcz1cXFwiaWNvbi1tb3JlLWhvcml6XFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlcnZpY2UtbGlzdGl0ZW1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwib3ZlcnZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInNlcnZpY2UtaW1hZ2VcXFwiIHNyYz1cXFwiY3NzL2ltZ3MvcmFuZG9tLWltYWdlcy9ldmVuaW5nLWxha2UtcGVvcGxlLTE0MDIuanBnXFxcIiBhbHQ9XFxcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VydmljZS1uYW1lXFxcIj5Db3Vuc2VsaW5nIGFuZCBQc3ljaG9sb2dpY2FsIFNlcnZpY2VzPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWRlc2NyaXB0aW9uXFxcIj5hc2RmIGFzZCBhc2RmZHMgZmFzZGYgYXNkZiBhc2RmIGFzZCBmYXNkIGZhc2QgZmFzZCBhc2RmIGFzZCBhc2RmIGFzZGYgYXNkIGZhIHNmIGFzZGYgYXNkZiBhc2RmIGFzZGYgYXNkIGZhZHMgLi4uPC9kaXY+LS0+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm92ZXJ2aWV3LWFjdGlvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFjdGlvbiBwaG9uZS1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCIgaWNvbi1jYWxsXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWN0aW9uIGRldGFpbC1hY3Rpb25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLW1vcmUtaG9yaXpcXFwiPjwvaT48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibWVudS1idWZmZXJcXFwiPjwvZGl2PlxcbjwvZGl2PlxcblxcblwiO1xuICB9KTtcbiJdfQ==
