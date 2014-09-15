var Config = require('Wildcat.Config.Repository');

function start() {

    var app    = this;
    var env    = app.environment();

    app.bind('app', () => app);

    app.registerCoreContainerBindings();

    app.getProviderRepository().load(app, app.config.get('app').providers);
}

module.exports = start;