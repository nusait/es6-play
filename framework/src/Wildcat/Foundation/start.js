var Config = require('Wildcat.Config.Repository');

function start() {

    var app    = this;
    var env    = app.environment();

    app.bindShared('app', () => app);
    app.registerCoreContainerBindings();

    var {config} = app;
    var {providers} = config.get('app');
    
    app.getProviderRepository().load(app, providers);
}

module.exports = start;