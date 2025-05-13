let ogDuration;
let ogDurInSec;

const durList = document.querySelector(".dur-list");
const speedList = document.querySelectorAll(".speed-elem");

// getting the duration of the original video
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  sendResponse({ message: "Duration received" });
  console.log(typeof message);
  ogDuration = JSON.stringify(message);
  makeDurationList();
});

// making new duration
function makeDurationList() {
  ogMinSec = ogDuration.split(":").slice(1);
  console.log(ogMinSec);

  const ogMin = parseInt(ogMinSec[0]);
  console.log(ogMin);
  const ogSec = parseInt(ogMinSec[1]);
  console.log(ogSec);
  calcDur(ogMin, ogSec);
  calcNewDur();

  console.log("yay");
}

// original duration in seconds
function calcDur(ogMin, ogSec) {
  ogDurInSec = ogMin * 60 + ogSec;
  console.log(ogDurInSec);
}

function calcNewDur() {
  // speedList.forEach((speed) => {});
}
