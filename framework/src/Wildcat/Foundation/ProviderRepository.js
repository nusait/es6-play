
class ProviderRepository {

    load(app, providers) {
        
        for (var provider of providers) {
            
            app.register(this.createProvider(app, provider));
        }
    }
    createProvider(app, provider) {

        return new provider(app);
    }

}

module.exports = ProviderRepository;