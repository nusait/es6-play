
var not, pass, message;

function say(strings, ...args) {

    return strings.reduce((result, string, index) => {
        result += string;
        if (args[index] !== undefined) result += args[index];
        return result;
    }, '').replace(/ +/g, ' ');
}
function toBeInstanceOf(util, testers) {

    return { compare(actual, expected) {
        pass = actual instanceof expected;
        not = pass ? '' : 'not';
        message = say`actual is ${not} an instance of expected`;
        return {pass, message};    
    }};
}
function toBeEnumerable(util, testers) {
    
    return { compare([object, name]) {
        pass = object.propertyIsEnumerable(name);
        not = pass ? '' : 'not';
        message = say`property "${name}" of <${object}> is ${not} enumerable`;
        return {pass, message};    
    }};  
}

var customMatchers = {
    toBeInstanceOf,
    toBeEnumerable,
};

module.exports = customMatchers;