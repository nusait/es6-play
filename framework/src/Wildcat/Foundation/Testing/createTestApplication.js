
var App = require('../../../../../public/js/bundle.js');

function createTestApplication() {

    var app = new App();
    app.detectEnvironment('testing');
    app.start();
    return app;
}

module.exports = createTestApplication;