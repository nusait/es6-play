
var recursiveReaddir = require('recursive-readdir');
var fs = require('fs');
var q  = require('q');

var recursive = q.denodeify(recursiveReaddir);
var readFile  = q.denodeify(fs.readFile);
var writeFile = q.denodeify(fs.writeFile);

var log  = console.log.bind(console);
var base = './';

function makeBrowserObj(files) {

    // filter out some of the config
    files = files.filter( function(file) {
        if (/^config/.test(file)) {
            if ( ! /config\.js$/.test(file)) {
                return false;
            }
        }
        return true;
    });

    return files.reduce( function(obj, file) {
        var key = makeKey(file);
        obj[key] = './' + file;
        return obj;     
    }, {});
}
function makeKey(file) {
    
    file = removeExtension(file);
    file = psr0(file);
    file = swapSlashesWithPeriod(file);
    return file;
}
function removeExtension(file) {

    return file.replace(/\.js$/, '');
}
function psr0(file) {

    file =  file.replace(/framework\/src\//, '');
    file =  file.replace(/^app\//, 'App/');
    return file;
}
function swapSlashesWithPeriod(file) {

    return file.replace(/\//g, '.');
}
function addBrowserObjToPackage(obj, package) {

    package.browser = obj;
    return package;
}
function serializeIntoPrettyJsonText(package) {

    return JSON.stringify(package, null, 2);
}
function writePackageToDiskFromText(text) {

    var filename = base + 'package.json';

    return writeFile(filename, text, 'utf-8');
}
function readPackageFromDiskIntoObject() {

    var filename = base + 'package.json';

    return readFile(filename, 'utf-8').then(JSON.parse);
}
function loadPackageModifyAndSave(obj) {

    return readPackageFromDiskIntoObject()
        .then(addBrowserObjToPackage.bind({}, obj))
        .then(serializeIntoPrettyJsonText)
        .then(writePackageToDiskFromText);
}
function concatAllArrays(arrayOfArrays) {

    var result =  arrayOfArrays.reduce( function(start, array) {
        return start.concat(array);
    }, []);
    return result;
}
function getArrayOfRelevantFiles() {

    log('starting');

    return q.all([
        recursive(base + 'app'),
        recursive(base + 'config'),
        recursive(base + 'bootstrap'),
        recursive(base + 'framework/src'),
    ]).then(concatAllArrays);
}

function main() {
    var STARTTIME = Date.now();

    return getArrayOfRelevantFiles()
        .then(makeBrowserObj)
        .then(loadPackageModifyAndSave)
        .then( function() {
            var ENDTIME = Date.now();
            var duration = ENDTIME - STARTTIME;
            log('dumpautoload finished: ' + duration);
        })
        .catch(log);
}

module.exports = main;