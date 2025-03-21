chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "complianceResults") {
        chrome.storage.local.set({ complianceResults: message.data }, () => {
            chrome.runtime.sendMessage(message);
        });
    }
});
