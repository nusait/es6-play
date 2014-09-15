var Test = require('Nusait.Utils.Test').Test;
var View = require('Wildcat.View.View');

var test = new Test(window);
test.run();
// test.testAsync();

window.Test = Test; 
window.test = test;
