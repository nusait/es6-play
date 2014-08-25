var canaryExpOpts = {
    generators: 'parse',

    arrowFunctions: 'parse',
    defaultParameters: true,
    restParameters: true,
    spread: true,
    forOf: 'parse',
    destructuring: true,

    classes: true,
    templateLiterals: true, // coming in FF34?

    computedPropertyNames: true, // coming in FF34? make test
    propertyMethods: true, // make test
    propertyNameShorthand: true, // make test
};
module.exports = canaryExpOpts;