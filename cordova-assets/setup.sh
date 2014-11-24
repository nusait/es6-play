#!/bin/bash

# here stub out cordova project
# copy over cordova-assets config.xml
# add platforms

# run in the context of the /cordova dir, not /cordova-assets

cordova plugin add --browserify org.apache.cordova.device
cordova plugin add --browserify https://github.com/Telerik-Verified-Plugins/NativePageTransitions
cordova plugin add --browserify https://github.com/EddyVerbruggen/cordova-plugin-actionsheet
# cordova plugin add --browserify com.ben2.cordova.keyboard
cordova plugin add --browserify https://github.com/driftyco/ionic-plugins-keyboard.git
cordova plugin add --browserify org.apache.cordova.statusbar

# post - specify team provisioning profile
# splash screens

# cordova run --emulator --browserify android
# cordova run --emulator --browserify ios