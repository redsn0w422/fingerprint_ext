var notify = function(title, message) {
    var opt = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "icon.png"
    }
    chrome.notifications.create(opt);
    // chrome.notifications.create("fingerprint_notif", opt);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        notify("New message!", request.message);
    }
);