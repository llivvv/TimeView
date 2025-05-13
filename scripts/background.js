chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "triggerPopup") {
    chrome.action.openPopup();
  }
});
