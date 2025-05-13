chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  let ogDuration = message;
  makeDurationList();
  sendResponse({ message: "Duration received" });
});

makeDurationList() {
ogMinSec = ogDuration.split(":");
console.log(ogMinSec);

const durList = document.querySelector(".dur-list");
const speedList = document.querySelectorAll(".speed-elem");

console.log("yay");

}