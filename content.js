// alert("Hello world!")

// var opt = {
//     type: "basic",
//     title: "Primary Title",
//     message: "Primary message to display"//,
//     // iconUrl: "url_to_small_icon"
// }

// var id = 'asdf'
// chrome.notifications.create(opt);
// console.log(chrome);
// var notification = webkitNotifications.createNotification(
//     // '48.png',  // icon url - can be relative
//     'Hello!',  // notification title
//     'Lorem ipsum...'  // notification body text
// );
// notification.show();

// TODO: wrap functions!
// var wrap = require('lodash.wrap');

// chrome.runtime.sendMessage({message: window.location.toString()});

var sendMessage = function(msg) {
    chrome.runtime.sendMessage({message: msg});
}

document.addEventListener("hook", function(data) {
    if (data.detail && data.detail.message) {
        sendMessage(data.detail.message);
    }
});

var hook = function() {
    var newEvent = function(msg) {
        // var event = document.createEvent('Event');
        var event = new CustomEvent('Event', {
            "detail": {
                message: msg
            }
        });
        event.initEvent('hook');
        document.dispatchEvent(event);
    }
    var wrap = function(someFunction){
        var wrappedFunction = function(){
            var args = [...arguments].splice(0);
            console.log(someFunction.name);
            console.log(`HOOKED\tfn: ${someFunction.toString()}\nargs: ${args}`);
            let msg = `${someFunction.name}`;
            newEvent(msg);
            return someFunction.call(window, args);
        }
        return wrappedFunction
    }
    // var test = "window.navigator.mediaDevices.enumerateDevices"
    // var ftest = eval(test).bind(window)
    // ftest = wrap(ftest)
    window.navigator.mediaDevices.enumerateDevices = wrap(window.navigator.mediaDevices.enumerateDevices.bind(window))

};

var script = document.createElement('script');
script.textContent = '(' + hook.toString() + ')()';
document.documentElement.appendChild(script);
// why are extensions "isloated" if you can just do this...
// https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/LCZCkraIBdg