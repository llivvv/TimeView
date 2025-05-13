chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  let ogDuration = message;
  sendResponse({ message: "Duration received" });
});

ogMinSec = ogDuration.split(":");
console.log(ogMinSec);

const durList = document.querySelector(".dur-list");
const speedList = document.querySelectorAll(".speed-elem");

console.log("yay");
