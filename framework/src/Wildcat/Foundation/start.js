var Config = require('Wildcat.Config.Repository');

function start() {

    var app    = this;
    var env    = app.environment();
    var providers, config;

    app.bindShared('app', () => app);

    app.registerCoreContainerBindings();

    config = app.config;
    providers = config.get('app').providers;
    app.getProviderRepository().load(app, providers);
}

module.exports = start;