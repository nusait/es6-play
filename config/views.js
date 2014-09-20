var IntroView = require('App.Browser.Views.IntroView');

module.exports = [

    {
        'abstract'    : 'introView',
        '$constructor': IntroView,
        'build'       : 'singleton',
    }

];