var IntroView = require('../app/Browser/Views/IntroView');
var MenuView  = require('../app/Browser/Views/MenuView');
var AboutView  = require('../app/Browser/Views/AboutView');
var ServiceView  = require('../app/Browser/Views/ServiceView');

var menuTemplate = require('../templates/built/menu.hbs');
var aboutTemplate = require('../templates/built/about.hbs');
var serviceTemplate = require('../templates/built/service.hbs');

module.exports = [

    {
        'abstract'    : 'introView',
        '$constructor': IntroView,
        'build'       : 'singleton',
        'args'        : [],
    },
    {
        'abstract'    : 'menuView',
        '$constructor': MenuView,
        'build'       : 'singleton',
        'args'        : [menuTemplate],
    },
    {
        'abstract'    : 'aboutView',
        '$constructor': AboutView,
        'build'       : 'singleton',
        'args'        : [aboutTemplate],
    },
    {
        'abstract'    : 'serviceView',
        '$constructor': ServiceView,
        'build'       : 'singleton',
        'args'        : [serviceTemplate],
    },
];