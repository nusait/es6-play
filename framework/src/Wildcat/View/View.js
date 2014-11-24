var state   = require('Wildcat.Support.state');
var observe = require('Wildcat.Support.observe');
var helpers = require('Wildcat.Support.helpers');
var CommanderTrait = require('Wildcat.Commander.CommanderTrait');
var EventListener  = require('Wildcat.Commander.Events.EventListener');
var EventEmitter = require('events').EventEmitter;
// var Handlebars   = require('hbsfy/runtime');
var {PathObserver, Platform} = observe;

/*abstract*/ class View extends EventListener {

    // use CommandTrait

    constructor(app) {

        EventListener.call(this);

        this.app = app;
        state(this, {}, {changed, added});
    }
    bindEvents(opts = 'standard') {

        if (opts === 'standard') {

            var {el}  = this;
            var elOn  = el.addEventListener.bind(el);
            var insOn = this.on.bind(this);

            elOn('touchstart',      this.onTouchstart.bind(this, '[data-click]'));
            elOn('touchmove',       this.onTouchmove.bind(this));
            elOn('touchend',        this.onTouchend.bind(this));
            elOn('click',           this.onClick.bind(this));

            insOn('highlightstart', this.onHighlightstart.bind(this));
            insOn('highlightend',   this.onHighlightend.bind(this));    
        }
    }
    getDesiredTarget(node) {

        if (node.matches('[data-click] *')) {
            return this.ancestorOf(node, '[data-click]'); 
        }
            
        return node;
    }
    onClick(e) {

        if (this.clickedOnTouch(e)) return;

        var target = this.getDesiredTarget(e.target);
        var method = target.dataset.click;

        if (isDefined(method)) {

            method = 'onClick' + ucfirst(method);
            
            if (this[method]) { this[method](target); } 
            else { throw new Error(`${method} does not exist`); }
        }
    }
    onTouchstart(selectors, e) {
        // emit highlight even right away (or after delay if scrollable)
        // and set ins.touchstartEl to target

        var
            ins = this,
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
    }
    onTouchmove(e) {
        if ( ! this.touchstartEl) return;

        e.preventDefault();

        // if we're moving around same touch as what identified
        // the touchstartEl, then call `onToucharound`
        var
            ins = this,
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
    }
    onToucharound(touchstartEl, e) {
        // if toucharound too far from touchstartEl
        // then remove highlight;
        // add back in move in close again
        var 
            ins = this,
            touch = e.targetTouches[0],
            exceeds = ins.exceedsElement(touch, touchstartEl);

        if (exceeds) {
            ins.emit('highlightend', {target: touchstartEl});
        } else {
            ins.emit('highlightstart', {target: touchstartEl});
        }
    }
    onTouchend(e) {// return in no touchstartEl, or
        // immediately remove highlighting on touchstartEl and
        // delegate to onclick if within bounds of touchstartEl

        if ( ! this.touchstartEl) return;

        var
            ins = this,
            touch = e.changedTouches[0],
            touchTarget = ins.getDesiredTarget(touch.target),
            touchstartEl = ins.touchstartEl,
            exceeds = ins.exceedsElement(touch, touchstartEl);

        this.clearTouchstart(ins);
        if ((touchTarget === touchstartEl) && ( ! exceeds)) {
            log(`touchend going to click`);
            ins.onClick(e);
        }
    }
    clearTouchstart() {
        var
            ins = this,
            touchstartEl = ins.touchstartEl,
            emitHighlightTimeout = ins.emitHighlightTimeout;

        if (emitHighlightTimeout) clearTimeout(emitHighlightTimeout);
        if (touchstartEl) ins.emit('highlightend', {target: touchstartEl});
        delete ins.touchstartEl; 
        delete ins.touchstartY;  
    }
    exceedsElement(touch, el) {
        var 
            padding = 20,
            elBox = el.getBoundingClientRect(),

            touchX = touch.clientX,
            touchY = touch.clientY,

            tooLeft  = (touchX - (elBox.left   - padding)) < 0,
            tooRight = (touchX - (elBox.right  + padding)) > 0,
            tooAbove = (touchY - (elBox.top    - padding)) < 0,
            tooBelow = (touchY - (elBox.bottom + padding)) > 0;

        return (tooLeft || tooRight || tooAbove || tooBelow);
    }
    onHighlightstart(e) {

        e.target.classList.add('active');
    }
    onHighlightend(e) {

        e.target.classList.remove('active');
    }
    clickedOnTouch(e) {

        var isClick = (e.type === 'click');
        var {touchable} = this;

        return (isClick && touchable);
    }
    get touchable() {

        var {documentElement} = this.app.window.document;
        return ( ! documentElement.classList.contains('no-touch'));   
    }
    ancestorOf(el, selector) {

        var {document} = global;

        while ( ! el.matches(selector)) {
            el = el.parentNode;
            if (el === document) return null;
        }
        return el;
    }
    setEl(element, quiet = false) {

        return state(this, 'el', element, quiet);
    }
    get el() {

        var _ = state(this);

        if ( ! _.el) {

            if ( ! this.name) throw Error(`this.name not defined on view`);

            var className = `.${this.name}-view`;
            var {document} = this.app.window;
            var el = document.querySelector(className); 

            if ( ! el) throw Error(`${className} not found`);  

            _.el = el;
        } 

        return _.el;
    }
    set el(value) {

        this.setEl(value);
    }
    render() {
        
        var template = this.getTemplate();
        return template();
    }
    getTemplate() {

        return this.template;
    }
    $(...args) {

        return this.el.querySelector(...args);
    }
    $$(...args) {

        return Array.from(this.el.querySelectorAll(...args));
    }
    toggle(...args) {

        return this.el.classList.toggle(...args);
    }
    remove(...args) {

        return this.el.classList.remove(...args);
    }
    contains(...args) {

        return this.el.classList.contains(...args);
    }
    add(...args) {

        return this.el.classList.add(...args);
    }
    elOn(...args) {
        return this.el.addEventListener(...args);
    }
    elOff(...args) {
        return this.el.removeEventListener(...args);
    }
}

function changed(changes) {

    log(`onStateChanged`);
    for (var change of changes) log(change);
}
function added(additions) {

    log(`onStateAdded`);
    for (var addition of additions) log(addition);
}

var {
    log,
    extendProtoOf,
    setTimeout,
    clearTimeout,
    isDefined,
    ucfirst,
} = helpers;

extendProtoOf(View, EventEmitter);
extendProtoOf(View, CommanderTrait);

module.exports = View; 