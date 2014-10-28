function environment(localStorage) {
    localStorage = localStorage || global.localStorage;
    return (localStorage.env || 'production');
}

module.exports = environment;