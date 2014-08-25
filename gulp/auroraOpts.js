var auroraOpts = {
    generators: 'parse',

    arrowFunctions: 'parse',
    defaultParameters: 'parse',
    restParameters: 'parse',
    spread: 'parse', // wasn't working, should be, newer version on traceur
    forOf: 'parse',
    destructuring: 'parse',

    classes: true,
    templateLiterals: true, // coming in FF34?

    computedPropertyNames: true, // coming in FF34? make test
    propertyMethods: true, // make test
    propertyNameShorthand: true, // make test
};
module.exports = auroraOpts;