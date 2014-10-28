var PostReportCommandHandler = require('App.Commands.PostReportCommandHandler');
var RetrieveBluelightsCommandHandler = require('App.Commands.RetrieveBluelightsCommandHandler');

module.exports = [
    {
        abstract: 'postReportCommandHandler',
        handler : PostReportCommandHandler,
    },
    {
        abstract: 'retrieveBluelightsCommandHandler',
        handler : RetrieveBluelightsCommandHandler,
    },
];