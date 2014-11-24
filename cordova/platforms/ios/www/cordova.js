// Platform: ios
// ???
// browserify
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var PLATFORM_VERSION_BUILD_LABEL = '3.6.3';
var define = {moduleMap: []};
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function NativePageTransitions() {}

NativePageTransitions.prototype.globalOptions = {
    duration: 400,
    iosdelay: 60,
    androiddelay: 70,
    winphonedelay: 200,
    slowdownfactor: 4
};

NativePageTransitions.prototype.slide = function(options, onSuccess, onError) {
    var opts = options || {};
    if (!this._validateHref(opts.href, onError)) {
        return;
    }
    opts.direction = opts.direction || "left";
    if (opts.duration == undefined || opts.duration == "null") {
        opts.duration = this.globalOptions.duration;
    }
    if (opts.androiddelay == undefined || opts.androiddelay == "null") {
        opts.androiddelay = this.globalOptions.androiddelay;
    }
    if (opts.iosdelay == undefined || opts.iosdelay == "null") {
        opts.iosdelay = this.globalOptions.iosdelay;
    }
    if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
        opts.winphonedelay = this.globalOptions.winphonedelay;
    }
    opts.slowdownfactor = opts.slowdownfactor || this.globalOptions.slowdownfactor;
    cordova.exec(onSuccess, onError, "NativePageTransitions", "slide", [ opts ]);
};

NativePageTransitions.prototype.drawer = function(options, onSuccess, onError) {
    var opts = options || {};
    if (!this._validateHref(opts.href, onError)) {
        return;
    }
    opts.origin = opts.origin || "left";
    opts.action = opts.action || "open";
    if (opts.duration == undefined || opts.duration == "null") {
        opts.duration = this.globalOptions.duration;
    }
    if (opts.androiddelay == undefined || opts.androiddelay == "null") {
        opts.androiddelay = this.globalOptions.androiddelay;
    }
    if (opts.iosdelay == undefined || opts.iosdelay == "null") {
        opts.iosdelay = this.globalOptions.iosdelay;
    }
    if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
        opts.winphonedelay = this.globalOptions.winphonedelay;
    }
    cordova.exec(onSuccess, onError, "NativePageTransitions", "drawer", [ opts ]);
};

NativePageTransitions.prototype.flip = function(options, onSuccess, onError) {
    var opts = options || {};
    if (!this._validateHref(opts.href, onError)) {
        return;
    }
    opts.direction = opts.direction || "right";
    if (opts.duration == undefined || opts.duration == "null") {
        opts.duration = this.globalOptions.duration;
    }
    if (opts.androiddelay == undefined || opts.androiddelay == "null") {
        opts.androiddelay = this.globalOptions.androiddelay;
    }
    if (opts.iosdelay == undefined || opts.iosdelay == "null") {
        opts.iosdelay = this.globalOptions.iosdelay;
    }
    if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
        opts.winphonedelay = this.globalOptions.winphonedelay;
    }
    cordova.exec(onSuccess, onError, "NativePageTransitions", "flip", [ opts ]);
};

NativePageTransitions.prototype._validateHref = function(href, errCallback) {
    var currentHref = window.location.href.substr(window.location.href.indexOf("www/") + 4);
    if (href) {
        if (href.indexOf("#") == 0) {
            if (currentHref.indexOf("#") > -1) {
                currentHref = currentHref.substr(currentHref.indexOf("#"));
            }
        }
    }
    if (currentHref == href) {
        if (errCallback) {
            errCallback("The passed href is the same as the current");
        } else {
            console.log("The passed href is the same as the current");
        }
        return false;
    }
    return true;
};

NativePageTransitions.install = function() {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.nativepagetransitions = new NativePageTransitions();
    return window.plugins.nativepagetransitions;
};

cordova.addConstructor(NativePageTransitions.install);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);

window.plugins = window.plugins || {};

window.plugins.nativepagetransitions = window.plugins.nativepagetransitions || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "nativepagetransitions", module.exports);
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder":10}],2:[function(require,module,exports){
function ActionSheet() {}

ActionSheet.prototype.show = function(options, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "ActionSheet", "show", [ options ]);
};

ActionSheet.prototype.hide = function() {
    cordova.exec(null, null, "ActionSheet", "hide", []);
};

ActionSheet.install = function() {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.actionsheet = new ActionSheet();
    return window.plugins.actionsheet;
};

cordova.addConstructor(ActionSheet.install);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);

window.plugins = window.plugins || {};

window.plugins.actionsheet = window.plugins.actionsheet || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window.plugins, "actionsheet", module.exports);
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder":10}],3:[function(require,module,exports){
var argscheck = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/argscheck"), channel = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel"), utils = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils"), exec = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec"), cordova = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b");

channel.createSticky("onCordovaInfoReady");

channel.waitForInitialization("onCordovaInfoReady");

function Device() {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;
    var me = this;
    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.version = info.version;
            me.uuid = info.uuid;
            me.cordova = buildLabel;
            me.model = info.model;
            channel.onCordovaInfoReady.fire();
        }, function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

Device.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs("fF", "Device.getInfo", arguments);
    exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
};

module.exports = new Device();

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);

window.device = window.device || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "device", module.exports);
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/argscheck":8,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder":10,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel":11,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils":13,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b":14,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec":15}],4:[function(require,module,exports){
var exec = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec");

var namedColors = {
    black: "#000000",
    darkGray: "#A9A9A9",
    lightGray: "#D3D3D3",
    white: "#FFFFFF",
    gray: "#808080",
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    cyan: "#00FFFF",
    yellow: "#FFFF00",
    magenta: "#FF00FF",
    orange: "##FFA500",
    purple: "#800080",
    brown: "#A52A2A"
};

var StatusBar = {
    isVisible: true,
    overlaysWebView: function(doOverlay) {
        exec(null, null, "StatusBar", "overlaysWebView", [ doOverlay ]);
    },
    styleDefault: function() {
        exec(null, null, "StatusBar", "styleDefault", []);
    },
    styleLightContent: function() {
        exec(null, null, "StatusBar", "styleLightContent", []);
    },
    styleBlackTranslucent: function() {
        exec(null, null, "StatusBar", "styleBlackTranslucent", []);
    },
    styleBlackOpaque: function() {
        exec(null, null, "StatusBar", "styleBlackOpaque", []);
    },
    backgroundColorByName: function(colorname) {
        return StatusBar.backgroundColorByHexString(namedColors[colorname]);
    },
    backgroundColorByHexString: function(hexString) {
        if (hexString.charAt(0) !== "#") {
            hexString = "#" + hexString;
        }
        if (hexString.length === 4) {
            var split = hexString.split("");
            hexString = "#" + split[1] + split[1] + split[2] + split[2] + split[3] + split[3];
        }
        exec(null, null, "StatusBar", "backgroundColorByHexString", [ hexString ]);
    },
    hide: function() {
        exec(null, null, "StatusBar", "hide", []);
        StatusBar.isVisible = false;
    },
    show: function() {
        exec(null, null, "StatusBar", "show", []);
        StatusBar.isVisible = true;
    }
};

exec(function(res) {
    if (typeof res == "object") {
        if (res.type == "tap") {
            cordova.fireWindowEvent("statusTap");
        }
    } else {
        StatusBar.isVisible = res;
    }
}, null, "StatusBar", "_ready", []);

module.exports = StatusBar;

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);

window.StatusBar = window.StatusBar || {};

require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder").assignOrWrapInDeprecateGetter(window, "StatusBar", module.exports);
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/builder":10,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec":15}],5:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":6,"ieee754":7}],6:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],7:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],8:[function(require,module,exports){
var exec = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec");

var utils = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils");

var moduleExports = module.exports;

var typeMap = {
    A: "Array",
    D: "Date",
    N: "Number",
    S: "String",
    F: "Function",
    O: "Object"
};

function extractParamName(callee, argIndex) {
    return /.*?\((.*?)\)/.exec(callee)[1].split(", ")[argIndex];
}

function checkArgs(spec, functionName, args, opt_callee) {
    if (!moduleExports.enableChecks) {
        return;
    }
    var errMsg = null;
    var typeName;
    for (var i = 0; i < spec.length; ++i) {
        var c = spec.charAt(i), cUpper = c.toUpperCase(), arg = args[i];
        if (c == "*") {
            continue;
        }
        typeName = utils.typeName(arg);
        if ((arg === null || arg === undefined) && c == cUpper) {
            continue;
        }
        if (typeName != typeMap[cUpper]) {
            errMsg = "Expected " + typeMap[cUpper];
            break;
        }
    }
    if (errMsg) {
        errMsg += ", but got " + typeName + ".";
        errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ": " + errMsg;
        if (typeof jasmine == "undefined") {
            console.error(errMsg);
        }
        throw TypeError(errMsg);
    }
}

function getValue(value, defaultValue) {
    return value === undefined ? defaultValue : value;
}

moduleExports.checkArgs = checkArgs;

moduleExports.getValue = getValue;

moduleExports.enableChecks = true;
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils":13,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec":15}],9:[function(require,module,exports){
(function (Buffer){
var base64 = exports;

base64.fromArrayBuffer = function(arrayBuffer) {
    var array = new Uint8Array(arrayBuffer);
    return uint8ToBase64(array);
};

base64.toArrayBuffer = function(str) {
    var decodedStr = typeof atob != "undefined" ? atob(str) : new Buffer(str, "base64").toString("binary");
    var arrayBuffer = new ArrayBuffer(decodedStr.length);
    var array = new Uint8Array(arrayBuffer);
    for (var i = 0, len = decodedStr.length; i < len; i++) {
        array[i] = decodedStr.charCodeAt(i);
    }
    return arrayBuffer;
};

var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var b64_12bit;

var b64_12bitTable = function() {
    b64_12bit = [];
    for (var i = 0; i < 64; i++) {
        for (var j = 0; j < 64; j++) {
            b64_12bit[i * 64 + j] = b64_6bit[i] + b64_6bit[j];
        }
    }
    b64_12bitTable = function() {
        return b64_12bit;
    };
    return b64_12bit;
};

function uint8ToBase64(rawData) {
    var numBytes = rawData.byteLength;
    var output = "";
    var segment;
    var table = b64_12bitTable();
    for (var i = 0; i < numBytes - 2; i += 3) {
        segment = (rawData[i] << 16) + (rawData[i + 1] << 8) + rawData[i + 2];
        output += table[segment >> 12];
        output += table[segment & 4095];
    }
    if (numBytes - i == 2) {
        segment = (rawData[i] << 16) + (rawData[i + 1] << 8);
        output += table[segment >> 12];
        output += b64_6bit[(segment & 4095) >> 6];
        output += "=";
    } else if (numBytes - i == 1) {
        segment = rawData[i] << 16;
        output += table[segment >> 12];
        output += "==";
    }
    return output;
}
}).call(this,require("buffer").Buffer)
},{"buffer":5}],10:[function(require,module,exports){
var utils = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils");

function each(objects, func, context) {
    for (var prop in objects) {
        if (objects.hasOwnProperty(prop)) {
            func.apply(context, [ objects[prop], prop ]);
        }
    }
}

function clobber(obj, key, value) {
    exports.replaceHookForTesting(obj, key);
    obj[key] = value;
    if (obj[key] !== value) {
        utils.defineGetter(obj, key, function() {
            return value;
        });
    }
}

function assignOrWrapInDeprecateGetter(obj, key, value, message) {
    if (message) {
        utils.defineGetter(obj, key, function() {
            console.log(message);
            delete obj[key];
            clobber(obj, key, value);
            return value;
        });
    } else {
        clobber(obj, key, value);
    }
}

function include(parent, objects, clobber, merge) {
    each(objects, function(obj, key) {
        try {
            var result = obj.path ? require(obj.path) : {};
            if (clobber) {
                if (typeof parent[key] === "undefined") {
                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                } else if (typeof obj.path !== "undefined") {
                    if (merge) {
                        recursiveMerge(parent[key], result);
                    } else {
                        assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                    }
                }
                result = parent[key];
            } else {
                if (typeof parent[key] == "undefined") {
                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                } else {
                    result = parent[key];
                }
            }
            if (obj.children) {
                include(result, obj.children, clobber, merge);
            }
        } catch (e) {
            utils.alert("Exception building Cordova JS globals: " + e + ' for key "' + key + '"');
        }
    });
}

function recursiveMerge(target, src) {
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            if (target.prototype && target.prototype.constructor === target) {
                clobber(target.prototype, prop, src[prop]);
            } else {
                if (typeof src[prop] === "object" && typeof target[prop] === "object") {
                    recursiveMerge(target[prop], src[prop]);
                } else {
                    clobber(target, prop, src[prop]);
                }
            }
        }
    }
}

exports.buildIntoButDoNotClobber = function(objects, target) {
    include(target, objects, false, false);
};

exports.buildIntoAndClobber = function(objects, target) {
    include(target, objects, true, false);
};

exports.buildIntoAndMerge = function(objects, target) {
    include(target, objects, true, true);
};

exports.recursiveMerge = recursiveMerge;

exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;

exports.replaceHookForTesting = function() {};
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils":13}],11:[function(require,module,exports){
var utils = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils"), nextGuid = 1;

var Channel = function(type, sticky) {
    this.type = type;
    this.handlers = {};
    this.state = sticky ? 1 : 0;
    this.fireArgs = null;
    this.numHandlers = 0;
    this.onHasSubscribersChange = null;
}, channel = {
    join: function(h, c) {
        var len = c.length, i = len, f = function() {
            if (!--i) h();
        };
        for (var j = 0; j < len; j++) {
            if (c[j].state === 0) {
                throw Error("Can only use join with sticky channels.");
            }
            c[j].subscribe(f);
        }
        if (!len) h();
    },
    create: function(type) {
        return channel[type] = new Channel(type, false);
    },
    createSticky: function(type) {
        return channel[type] = new Channel(type, true);
    },
    deviceReadyChannelsArray: [],
    deviceReadyChannelsMap: {},
    waitForInitialization: function(feature) {
        if (feature) {
            var c = channel[feature] || this.createSticky(feature);
            this.deviceReadyChannelsMap[feature] = c;
            this.deviceReadyChannelsArray.push(c);
        }
    },
    initializationComplete: function(feature) {
        var c = this.deviceReadyChannelsMap[feature];
        if (c) {
            c.fire();
        }
    }
};

function forceFunction(f) {
    if (typeof f != "function") throw "Function required as first argument!";
}

Channel.prototype.subscribe = function(f, c) {
    forceFunction(f);
    if (this.state == 2) {
        f.apply(c || this, this.fireArgs);
        return;
    }
    var func = f, guid = f.observer_guid;
    if (typeof c == "object") {
        func = utils.close(c, f);
    }
    if (!guid) {
        guid = "" + nextGuid++;
    }
    func.observer_guid = guid;
    f.observer_guid = guid;
    if (!this.handlers[guid]) {
        this.handlers[guid] = func;
        this.numHandlers++;
        if (this.numHandlers == 1) {
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

Channel.prototype.unsubscribe = function(f) {
    forceFunction(f);
    var guid = f.observer_guid, handler = this.handlers[guid];
    if (handler) {
        delete this.handlers[guid];
        this.numHandlers--;
        if (this.numHandlers === 0) {
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

Channel.prototype.fire = function(e) {
    var fail = false, fireArgs = Array.prototype.slice.call(arguments);
    if (this.state == 1) {
        this.state = 2;
        this.fireArgs = fireArgs;
    }
    if (this.numHandlers) {
        var toCall = [];
        for (var item in this.handlers) {
            toCall.push(this.handlers[item]);
        }
        for (var i = 0; i < toCall.length; ++i) {
            toCall[i].apply(this, fireArgs);
        }
        if (this.state == 2 && this.numHandlers) {
            this.numHandlers = 0;
            this.handlers = {};
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

channel.createSticky("onDOMContentLoaded");

channel.createSticky("onNativeReady");

channel.createSticky("onCordovaReady");

channel.createSticky("onPluginsReady");

channel.createSticky("onDeviceReady");

channel.create("onResume");

channel.create("onPause");

channel.createSticky("onDestroy");

channel.waitForInitialization("onCordovaReady");

channel.waitForInitialization("onDOMContentLoaded");

module.exports = channel;
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils":13}],12:[function(require,module,exports){
var channel = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel");

var cordova = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b");

var platform = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/platform");

var platformInitChannelsArray = [ channel.onDOMContentLoaded, channel.onNativeReady ];

cordova.exec = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec");

function logUnfiredChannels(arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].state != 2) {
            console.log("Channel not fired: " + arr[i].type);
        }
    }
}

window.setTimeout(function() {
    if (channel.onDeviceReady.state != 2) {
        console.log("deviceready has not fired after 5 seconds.");
        logUnfiredChannels(platformInitChannelsArray);
        logUnfiredChannels(channel.deviceReadyChannelsArray);
    }
}, 5e3);

function replaceNavigator(origNavigator) {
    var CordovaNavigator = function() {};
    CordovaNavigator.prototype = origNavigator;
    var newNavigator = new CordovaNavigator();
    if (CordovaNavigator.bind) {
        for (var key in origNavigator) {
            if (typeof origNavigator[key] == "function") {
                newNavigator[key] = origNavigator[key].bind(origNavigator);
            } else {
                (function(k) {
                    Object.defineProperty(newNavigator, k, {
                        get: function() {
                            return origNavigator[k];
                        },
                        configurable: true,
                        enumerable: true
                    });
                })(key);
            }
        }
    }
    return newNavigator;
}

if (window.navigator) {
    window.navigator = replaceNavigator(window.navigator);
}

if (!window.console) {
    window.console = {
        log: function() {}
    };
}

if (!window.console.warn) {
    window.console.warn = function(msg) {
        this.log("warn: " + msg);
    };
}

channel.onPause = cordova.addDocumentEventHandler("pause");

channel.onResume = cordova.addDocumentEventHandler("resume");

channel.onDeviceReady = cordova.addStickyDocumentEventHandler("deviceready");

if (document.readyState == "complete" || document.readyState == "interactive") {
    channel.onDOMContentLoaded.fire();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        channel.onDOMContentLoaded.fire();
    }, false);
}

if (window._nativeReady) {
    channel.onNativeReady.fire();
}

platform.bootstrap && platform.bootstrap();

channel.join(function() {
    platform.initialize && platform.initialize();
    channel.onCordovaReady.fire();
    channel.join(function() {
        require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b").fireDocumentEvent("deviceready");
    }, channel.deviceReadyChannelsArray);
}, platformInitChannelsArray);
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel":11,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b":14,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/exec":15,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/platform":16}],13:[function(require,module,exports){
var utils = exports;

utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {
    if (Object.defineProperty) {
        var desc = {
            get: getFunc,
            configurable: true
        };
        if (opt_setFunc) {
            desc.set = opt_setFunc;
        }
        Object.defineProperty(obj, key, desc);
    } else {
        obj.__defineGetter__(key, getFunc);
        if (opt_setFunc) {
            obj.__defineSetter__(key, opt_setFunc);
        }
    }
};

utils.defineGetter = utils.defineGetterSetter;

utils.arrayIndexOf = function(a, item) {
    if (a.indexOf) {
        return a.indexOf(item);
    }
    var len = a.length;
    for (var i = 0; i < len; ++i) {
        if (a[i] == item) {
            return i;
        }
    }
    return -1;
};

utils.arrayRemove = function(a, item) {
    var index = utils.arrayIndexOf(a, item);
    if (index != -1) {
        a.splice(index, 1);
    }
    return index != -1;
};

utils.typeName = function(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
};

utils.isArray = function(a) {
    return utils.typeName(a) == "Array";
};

utils.isDate = function(d) {
    return utils.typeName(d) == "Date";
};

utils.clone = function(obj) {
    if (!obj || typeof obj == "function" || utils.isDate(obj) || typeof obj != "object") {
        return obj;
    }
    var retVal, i;
    if (utils.isArray(obj)) {
        retVal = [];
        for (i = 0; i < obj.length; ++i) {
            retVal.push(utils.clone(obj[i]));
        }
        return retVal;
    }
    retVal = {};
    for (i in obj) {
        if (!(i in retVal) || retVal[i] != obj[i]) {
            retVal[i] = utils.clone(obj[i]);
        }
    }
    return retVal;
};

utils.close = function(context, func, params) {
    if (typeof params == "undefined") {
        return function() {
            return func.apply(context, arguments);
        };
    } else {
        return function() {
            return func.apply(context, params);
        };
    }
};

utils.createUUID = function() {
    return UUIDcreatePart(4) + "-" + UUIDcreatePart(2) + "-" + UUIDcreatePart(2) + "-" + UUIDcreatePart(2) + "-" + UUIDcreatePart(6);
};

utils.extend = function() {
    var F = function() {};
    return function(Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.__super__ = Parent.prototype;
        Child.prototype.constructor = Child;
    };
}();

utils.alert = function(msg) {
    if (window.alert) {
        window.alert(msg);
    } else if (console && console.log) {
        console.log(msg);
    }
};

function UUIDcreatePart(length) {
    var uuidpart = "";
    for (var i = 0; i < length; i++) {
        var uuidchar = parseInt(Math.random() * 256, 10).toString(16);
        if (uuidchar.length == 1) {
            uuidchar = "0" + uuidchar;
        }
        uuidpart += uuidchar;
    }
    return uuidpart;
}
},{}],14:[function(require,module,exports){
var channel = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel");

var platform = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/platform");

var m_document_addEventListener = document.addEventListener;

var m_document_removeEventListener = document.removeEventListener;

var m_window_addEventListener = window.addEventListener;

var m_window_removeEventListener = window.removeEventListener;

var documentEventHandlers = {}, windowEventHandlers = {};

document.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof documentEventHandlers[e] != "undefined") {
        documentEventHandlers[e].subscribe(handler);
    } else {
        m_document_addEventListener.call(document, evt, handler, capture);
    }
};

window.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof windowEventHandlers[e] != "undefined") {
        windowEventHandlers[e].subscribe(handler);
    } else {
        m_window_addEventListener.call(window, evt, handler, capture);
    }
};

document.removeEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof documentEventHandlers[e] != "undefined") {
        documentEventHandlers[e].unsubscribe(handler);
    } else {
        m_document_removeEventListener.call(document, evt, handler, capture);
    }
};

window.removeEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof windowEventHandlers[e] != "undefined") {
        windowEventHandlers[e].unsubscribe(handler);
    } else {
        m_window_removeEventListener.call(window, evt, handler, capture);
    }
};

function createEvent(type, data) {
    var event = document.createEvent("Events");
    event.initEvent(type, false, false);
    if (data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                event[i] = data[i];
            }
        }
    }
    return event;
}

var cordova = {
    platformVersion: PLATFORM_VERSION_BUILD_LABEL,
    version: PLATFORM_VERSION_BUILD_LABEL,
    require: function(module) {
        if (module === "cordova/exec") {
            return cordova.exec;
        }
        if (module === "org.apache.cordova.media.Media") {
            return window.Media;
        }
        return require(module);
    },
    platformId: platform.id,
    addWindowEventHandler: function(event) {
        return windowEventHandlers[event] = channel.create(event);
    },
    addStickyDocumentEventHandler: function(event) {
        return documentEventHandlers[event] = channel.createSticky(event);
    },
    addDocumentEventHandler: function(event) {
        return documentEventHandlers[event] = channel.create(event);
    },
    removeWindowEventHandler: function(event) {
        delete windowEventHandlers[event];
    },
    removeDocumentEventHandler: function(event) {
        delete documentEventHandlers[event];
    },
    getOriginalHandlers: function() {
        return {
            document: {
                addEventListener: m_document_addEventListener,
                removeEventListener: m_document_removeEventListener
            },
            window: {
                addEventListener: m_window_addEventListener,
                removeEventListener: m_window_removeEventListener
            }
        };
    },
    fireDocumentEvent: function(type, data, bNoDetach) {
        var evt = createEvent(type, data);
        if (typeof documentEventHandlers[type] != "undefined") {
            if (bNoDetach) {
                documentEventHandlers[type].fire(evt);
            } else {
                setTimeout(function() {
                    if (type == "deviceready") {
                        document.dispatchEvent(evt);
                    }
                    documentEventHandlers[type].fire(evt);
                }, 0);
            }
        } else {
            document.dispatchEvent(evt);
        }
    },
    fireWindowEvent: function(type, data) {
        var evt = createEvent(type, data);
        if (typeof windowEventHandlers[type] != "undefined") {
            setTimeout(function() {
                windowEventHandlers[type].fire(evt);
            }, 0);
        } else {
            window.dispatchEvent(evt);
        }
    },
    callbackId: Math.floor(Math.random() * 2e9),
    callbacks: {},
    callbackStatus: {
        NO_RESULT: 0,
        OK: 1,
        CLASS_NOT_FOUND_EXCEPTION: 2,
        ILLEGAL_ACCESS_EXCEPTION: 3,
        INSTANTIATION_EXCEPTION: 4,
        MALFORMED_URL_EXCEPTION: 5,
        IO_EXCEPTION: 6,
        INVALID_ACTION: 7,
        JSON_EXCEPTION: 8,
        ERROR: 9
    },
    callbackSuccess: function(callbackId, args) {
        this.callbackFromNative(callbackId, true, args.status, [ args.message ], args.keepCallback);
    },
    callbackError: function(callbackId, args) {
        this.callbackFromNative(callbackId, false, args.status, [ args.message ], args.keepCallback);
    },
    callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
        try {
            var callback = cordova.callbacks[callbackId];
            if (callback) {
                if (isSuccess && status == cordova.callbackStatus.OK) {
                    callback.success && callback.success.apply(null, args);
                } else {
                    callback.fail && callback.fail.apply(null, args);
                }
                if (!keepCallback) {
                    delete cordova.callbacks[callbackId];
                }
            }
        } catch (err) {
            var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
            console && console.log && console.log(msg);
            this.fireWindowEvent("cordovacallbackerror", {
                message: msg
            });
            throw err;
        }
    },
    addConstructor: function(func) {
        channel.onCordovaReady.subscribe(function() {
            try {
                func();
            } catch (e) {
                console.log("Failed to run constructor: " + e);
            }
        });
    }
};

window.cordova = module.exports = cordova;
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel":11,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/ios/platform":16}],15:[function(require,module,exports){
var cordova = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b"), channel = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel"), utils = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils"), base64 = require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/base64"), jsToNativeModes = {
    IFRAME_NAV: 0,
    XHR_NO_PAYLOAD: 1,
    XHR_WITH_PAYLOAD: 2,
    XHR_OPTIONAL_PAYLOAD: 3,
    IFRAME_HASH_NO_PAYLOAD: 4,
    IFRAME_HASH_WITH_PAYLOAD: 5,
    WK_WEBVIEW_BINDING: 6
}, bridgeMode, execIframe, execHashIframe, hashToggle = 1, execXhr, requestCount = 0, vcHeaderValue = null, commandQueue = [], isInContextOfEvalJs = 0;

function createExecIframe() {
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    return iframe;
}

function createHashIframe() {
    var ret = createExecIframe();
    ret.contentWindow.history.replaceState(null, null, "file:///#");
    return ret;
}

function shouldBundleCommandJson() {
    if (bridgeMode === jsToNativeModes.XHR_WITH_PAYLOAD) {
        return true;
    }
    if (bridgeMode === jsToNativeModes.XHR_OPTIONAL_PAYLOAD) {
        var payloadLength = 0;
        for (var i = 0; i < commandQueue.length; ++i) {
            payloadLength += commandQueue[i].length;
        }
        return payloadLength < 4500;
    }
    return false;
}

function massageArgsJsToNative(args) {
    if (!args || utils.typeName(args) != "Array") {
        return args;
    }
    var ret = [];
    args.forEach(function(arg, i) {
        if (utils.typeName(arg) == "ArrayBuffer") {
            ret.push({
                CDVType: "ArrayBuffer",
                data: base64.fromArrayBuffer(arg)
            });
        } else {
            ret.push(arg);
        }
    });
    return ret;
}

function massageMessageNativeToJs(message) {
    if (message.CDVType == "ArrayBuffer") {
        var stringToArrayBuffer = function(str) {
            var ret = new Uint8Array(str.length);
            for (var i = 0; i < str.length; i++) {
                ret[i] = str.charCodeAt(i);
            }
            return ret.buffer;
        };
        var base64ToArrayBuffer = function(b64) {
            return stringToArrayBuffer(atob(b64));
        };
        message = base64ToArrayBuffer(message.data);
    }
    return message;
}

function convertMessageToArgsNativeToJs(message) {
    var args = [];
    if (!message || !message.hasOwnProperty("CDVType")) {
        args.push(message);
    } else if (message.CDVType == "MultiPart") {
        message.messages.forEach(function(e) {
            args.push(massageMessageNativeToJs(e));
        });
    } else {
        args.push(massageMessageNativeToJs(message));
    }
    return args;
}

function iOSExec() {
    if (bridgeMode === undefined) {
        if (navigator.userAgent) {
            bridgeMode = navigator.userAgent.indexOf(" 5_") == -1 ? jsToNativeModes.IFRAME_NAV : jsToNativeModes.XHR_NO_PAYLOAD;
        } else {
            bridgeMode = jsToNativeModes.IFRAME_NAV;
        }
    }
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova && window.webkit.messageHandlers.cordova.postMessage) {
        bridgeMode = jsToNativeModes.WK_WEBVIEW_BINDING;
    }
    var successCallback, failCallback, service, action, actionArgs, splitCommand;
    var callbackId = null;
    if (typeof arguments[0] !== "string") {
        successCallback = arguments[0];
        failCallback = arguments[1];
        service = arguments[2];
        action = arguments[3];
        actionArgs = arguments[4];
        callbackId = "INVALID";
    } else {
        try {
            splitCommand = arguments[0].split(".");
            action = splitCommand.pop();
            service = splitCommand.join(".");
            actionArgs = Array.prototype.splice.call(arguments, 1);
            console.log("The old format of this exec call has been removed (deprecated since 2.1). Change to: " + 'cordova.exec(null, null, "' + service + '", "' + action + '",' + JSON.stringify(actionArgs) + ");");
            return;
        } catch (e) {}
    }
    actionArgs = actionArgs || [];
    if (successCallback || failCallback) {
        callbackId = service + cordova.callbackId++;
        cordova.callbacks[callbackId] = {
            success: successCallback,
            fail: failCallback
        };
    }
    actionArgs = massageArgsJsToNative(actionArgs);
    var command = [ callbackId, service, action, actionArgs ];
    commandQueue.push(JSON.stringify(command));
    if (bridgeMode === jsToNativeModes.WK_WEBVIEW_BINDING) {
        window.webkit.messageHandlers.cordova.postMessage(command);
    } else {
        if (!isInContextOfEvalJs && commandQueue.length == 1) {
            switch (bridgeMode) {
              case jsToNativeModes.XHR_NO_PAYLOAD:
              case jsToNativeModes.XHR_WITH_PAYLOAD:
              case jsToNativeModes.XHR_OPTIONAL_PAYLOAD:
                pokeNativeViaXhr();
                break;

              default:
                pokeNativeViaIframe();
            }
        }
    }
}

function pokeNativeViaXhr() {
    if (execXhr && execXhr.readyState != 4) {
        execXhr = null;
    }
    execXhr = execXhr || new XMLHttpRequest();
    execXhr.open("HEAD", "/!gap_exec?" + +new Date(), true);
    if (!vcHeaderValue) {
        vcHeaderValue = /.*\((.*)\)/.exec(navigator.userAgent)[1];
    }
    execXhr.setRequestHeader("vc", vcHeaderValue);
    execXhr.setRequestHeader("rc", ++requestCount);
    if (shouldBundleCommandJson()) {
        execXhr.setRequestHeader("cmds", iOSExec.nativeFetchMessages());
    }
    execXhr.send(null);
}

function pokeNativeViaIframe() {
    if (!document.body) {
        setTimeout(pokeNativeViaIframe);
        return;
    }
    if (bridgeMode === jsToNativeModes.IFRAME_HASH_NO_PAYLOAD || bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
        execHashIframe = execHashIframe || createHashIframe();
        if (!execHashIframe.contentWindow) {
            execHashIframe = createHashIframe();
        }
        hashToggle = hashToggle ^ 3;
        var hashValue = "%0" + hashToggle;
        if (bridgeMode === jsToNativeModes.IFRAME_HASH_WITH_PAYLOAD) {
            hashValue += iOSExec.nativeFetchMessages();
        }
        execHashIframe.contentWindow.location.hash = hashValue;
    } else {
        execIframe = execIframe || createExecIframe();
        if (!execIframe.contentWindow) {
            execIframe = createExecIframe();
        }
        execIframe.src = "gap://ready";
    }
}

iOSExec.jsToNativeModes = jsToNativeModes;

iOSExec.setJsToNativeBridgeMode = function(mode) {
    if (execIframe) {
        execIframe.parentNode.removeChild(execIframe);
        execIframe = null;
    }
    bridgeMode = mode;
};

iOSExec.nativeFetchMessages = function() {
    if (!commandQueue.length) {
        return "";
    }
    var json = "[" + commandQueue.join(",") + "]";
    commandQueue.length = 0;
    return json;
};

iOSExec.nativeCallback = function(callbackId, status, message, keepCallback) {
    return iOSExec.nativeEvalAndFetch(function() {
        var success = status === 0 || status === 1;
        var args = convertMessageToArgsNativeToJs(message);
        cordova.callbackFromNative(callbackId, success, status, args, keepCallback);
    });
};

iOSExec.nativeEvalAndFetch = function(func) {
    isInContextOfEvalJs++;
    try {
        func();
        return iOSExec.nativeFetchMessages();
    } finally {
        isInContextOfEvalJs--;
    }
};

module.exports = iOSExec;
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/base64":9,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel":11,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/utils":13,"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/cordova_b":14}],16:[function(require,module,exports){
module.exports = {
    id: "ios",
    bootstrap: function() {
        require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel").onNativeReady.fire();
    }
};
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/channel":11}],17:[function(require,module,exports){
require("/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/init_b");
},{"/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/cordova-js/src/common/init_b":12}]},{},[15,16,17,3,1,2,4])