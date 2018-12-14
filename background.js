// Facilitates sending native notifications

var notify = function(title, message) {
    chrome.tabs.getSelected(null, function(tab) {
        let msg = `${tab.title}: ${message}`;
        var opt = {
            type: "basic",
            title: title,
            message: msg,
            iconUrl: "icon.png"
        }
        chrome.notifications.create(opt);
    });
    // chrome.notifications.create("fingerprint_notif", opt);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        notify("New fingerprint!", request.message);
    }
);