
browser.runtime.onMessage.addListener((request, sender) => {
    browser.storage.local.get('cache')
        .then(data => {
            if (!data.cache) data.cache = {};
            data.cache['tab' + sender.tab.id] = request.timing;
            browser.storage.local.set(data)
                .then(() => {
                    browser.browserAction.setBadgeText({
                        text: request.time,
                        tabId: sender.tab.id
                    });
                    browser.browserAction.setPopup({
                        tabId: sender.tab.id,
                        popup: "popup.html"
                    })
                });
        });
});
browser.tabs.onRemoved.addListener(tabId => {
    browser.storage.local.get('cache')
        .then(data => {
            if (data.cache) delete data.cache['tab' + tabId];
            browser.storage.local.set(data);
        });
});