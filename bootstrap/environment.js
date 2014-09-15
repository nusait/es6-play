function environment(localStorage) {
    localStorage = localStorage || window.localStorage;
    return (localStorage.env || 'production');
}

module.exports = environment;