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
            return someFunction(args);
        }
        return wrappedFunction
    }
    if (window.navigator.mediaDevices.enumerateDevices) window.navigator.mediaDevices.enumerateDevices = wrap(window.navigator.mediaDevices.enumerateDevices)
    if (window.OfflineAudioContext) window.OfflineAudioContext = wrap(window.OfflineAudioContext)
    if (window.webkitOfflineAudioContext) window.webkitOfflineAudioContext = wrap(window.webkitOfflineAudioContext)
    if (navigator.userAgent) navigator.userAgent = wrap(navigator.userAgent)
    if (navigator.language) navigator.language = wrap(navigator.language)
    if (navigator.userLanguage) navigator.userLanguage = wrap(navigator.userLanguage)
    if (navigator.browserLanguage) navigator.browserLanguage = wrap(navigator.browserLanguage)
    if (navigator.systemLanguage) navigator.systemLanguage = wrap(navigator.systemLanguage)
    if (window.screen.colorDepth) window.screen.colorDepth = wrap(window.screen.colorDepth)
    if (navigator.deviceMemory) navigator.deviceMemory = wrap(navigator.deviceMemory)
    if (window.devicePixelRatio) window.devicePixelRatio = wrap(window.devicePixelRatio)
    if (window.screen.width) window.screen.width = wrap(window.screen.width)
    if (window.screen.height) window.screen.height = wrap(window.screen.height)
    if (window.screen.availWidth) window.screen.availWidth = wrap(window.screen.availWidth)
    if (window.screen.availHeight) window.screen.availHeight = wrap(window.screen.availHeight)
    if (window.Intl) window.Intl = wrap(window.Intl)
    if (window.Intl.DateTimeFormat) window.Intl.DateTimeFormat = wrap(window.Intl.DateTimeFormat)
    if (window.sessionStorage) window.sessionStorage = wrap(window.sessionStorage)
    if (window.localStorage) window.localStorage = wrap(window.localStorage)
    if (window.indexedDB) window.indexedDB = wrap(window.indexedDB)
    if (window.openDatabase) window.openDatabase = wrap(window.openDatabase)
    if (navigator.cpuClass) navigator.cpuClass = wrap(navigator.cpuClass)
    if (navigator.platform) navigator.platform = wrap(navigator.platform)
    if (navigator.doNotTrack) navigator.doNotTrack = wrap(navigator.doNotTrack)
    if (navigator.msDoNotTrack) navigator.msDoNotTrack = wrap(navigator.msDoNotTrack)
    if (window.doNotTrack) window.doNotTrack = wrap(window.doNotTrack)
    if (window.swfobject) window.swfobject = wrap(window.swfobject)
    if (navigator.plugins) navigator.plugins = wrap(navigator.plugins)
    if (navigator.maxTouchPoints) navigator.maxTouchPoints = wrap(navigator.maxTouchPoints)
    if (navigator.hardwareConcurrency) navigator.hardwareConcurrency = wrap(navigator.hardwareConcurrency)
};

var script = document.createElement('script');
script.textContent = '(' + hook.toString() + ')()';
document.documentElement.appendChild(script);
// why are extensions "isloated" if you can just do this...
// https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/LCZCkraIBdg