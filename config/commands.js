var PostReportCommand = require('App.Commands.PostReportCommand');
var RetrieveBluelightsCommand = require('App.Commands.RetrieveBluelightsCommand');

module.exports = [
    {
        abstract: 'postReportCommand',
        command : PostReportCommand,
    },
    {
        abstract: 'retrieveBluelightsCommand',
        command : RetrieveBluelightsCommand,
    },
];