
var $window = window;
var console = $window.console;
var log = console.log.bind(console);

class Test {
    constructor() {
        log('being constructed');
    }
    speak(message) {
        log('I am speaking my message');
    }
    static hello() {
  
        log('heldlo');
    }
}

export {Test};