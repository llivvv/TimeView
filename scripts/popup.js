let ogDuration;
let ogDurInSec;
const durations = [];

const durList = document.querySelector(".dur-list");
const speedListElems = document.querySelectorAll(".speed-elem");

// getting the duration of the original video
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
  sendResponse({ message: "Duration received" });
  ogDuration = request.message;
  // console.log(typeof message);
  // ogDuration = JSON.stringify(message);
  makeDurationList();
});

// making new duration
function makeDurationList() {
  ogMinSec = ogDuration.split(":");
  console.log(ogMinSec);

  const ogMin = parseInt(ogMinSec[0]);
  console.log(ogMin);
  const ogSec = parseInt(ogMinSec[1]);
  console.log(ogSec);
  calcDur(ogMin, ogSec);
  calcNewDur();
  addToDuration();

  console.log("yay");
}

// original duration in seconds
function calcDur(ogMin, ogSec) {
  ogDurInSec = ogMin * 60 + ogSec;
  console.log(ogDurInSec);
}

function calcNewDur() {
  speedListElems.forEach((speed) => {
    let speedNum = parseFloat(speed.innerHTML);
    console.log(speedNum);
    let calc = ogDurInSec / speedNum;
    console.log(calc);
    let minute = Math.floor(calc / 60);
    let seconds = Math.round(((calc % 60) * 100) / 100);
    durations.push({ minute, seconds });
    console.log(durations);
  });
}

// creating the html elements
function addToDuration() {
  durations.forEach((dur) => {
    let newLi = document.createElement("li");
    dur.seconds = String(dur.seconds).padStart(2, "0");
    newLi.innerText = `${dur.minute}:${dur.seconds}`;
    durList.appendChild(newLi);
  });
}
