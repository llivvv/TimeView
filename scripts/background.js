// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "triggerPopup") {
//     chrome.action.openPopup();
//   }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let newUrl = changeInfo.url;
  console.log(newUrl);
  // if (newUrl.includes("watch?v=")) {
  //   if (changeInfo.status === "complete") {
  //     chrome.tabs.sendMessage(tabId, {
  //       message: tab,
  //     });
  //   }
  // }
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, {
      message: tab,
    });
  }
});
