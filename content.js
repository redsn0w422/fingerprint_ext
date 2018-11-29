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

chrome.runtime.sendMessage({message: window.location.toString()});
var doThing = function(){
    console.log(...arguments)
}

var wrap = function(someFunction){
    var wrappedFunction = function(){
      var args = [...arguments].splice(0)
      console.log(`You're about to run a function with these arguments: \n     ${args}`)
      return someFunction(args)
    }
    return wrappedFunction
}

doThing = wrap(doThing);

doThing('one', {two:'two'}, 3);