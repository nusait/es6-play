
var traceur = require('./includeTraceur');
var App = require('./express/App.js');
var express = require('express');

var expressApp = express();
var app = new App(expressApp);


console.log( 'hichris'.contains('chris') );