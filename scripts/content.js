// initialize duration and speed elements
let ogDur = 0;
let speedsWithCustom = null;
let speedSlider = null;
let speeds = null;

// stores calculated durations
let durDict = new Map();

// main
function runContentScript() {
  function parseSpeedText(speed) {
    let speedText = speed.innerText;
    if (speedText === "Normal") {
      speedText = "1";
    }
    let speedNum = parseFloat(speedText);
    return speedNum;
  }

  function calcDur(speedNum) {
    let calc = ogDur / speedNum;
    let hours = Math.floor(calc / 3600);
    calc %= 3600;
    let minutes = Math.floor(calc / 60);
    let seconds = Math.floor(calc % 60);
    return { hours, minutes, seconds, speedNum };
  }

  function setDurMap(hoursMinSecObj) {
    if (durDict.has(hoursMinSecObj.speedNum)) return;
    let paddedMin = String(hoursMinSecObj.minutes).padStart(2, "0");
    let paddedSec = String(hoursMinSecObj.seconds).padStart(2, "0");
    let durStr;

    hoursMinSecObj.hours == 0
      ? (durStr = ` (${hoursMinSecObj.minutes}:${paddedSec})`)
      : (durStr = ` (${hoursMinSecObj.hours}:${paddedMin}:${paddedSec})`);

    durDict.set(hoursMinSecObj.speedNum, durStr);
  }

  function renderDur(speed) {
    let speedNum = parseSpeedText(speed);
    let newDur = durDict.get(speedNum);
    speed.children[0].innerText += newDur;
    speed.classList.add("new-duration");
  }

  function calcAndDisplayDur(speeds) {
    if (speeds[1].classList.contains("new-duration")) return;

    speeds.forEach((speed) => {
      const speedNum = parseSpeedText(speed);
      if (!durDict.has(speedNum)) {
        const hoursMinSecObj = calcDur(speedNum);
        setDurMap(hoursMinSecObj, speed);
      }
      renderDur(speed);
    });
  }

  function selectSpeedElems() {
    speedsWithCustom = document.querySelectorAll(".ytp-menuitem");
    speedSlider = document.querySelector(".ytp-speedslider");
    speeds = Array.from(speedsWithCustom).slice(1);
  }

  function handleSpeedItemClick() {
    // wait for the speeds panel to show up first
    setTimeout(() => {
      selectSpeedElems();
      speedSlider.addEventListener("change", () => {
        setTimeout(() => {
          // set elements again because new elements are rendered on screen
          selectSpeedElems();
          calcAndDisplayDur(speeds);
        }, 300);
      });

      calcAndDisplayDur(speeds);
    }, 500);
  }

  function findSpeedItem(allChildren) {
    // speed item doesn't have a fixed position in list
    for (let i = 0; i < allChildren.length; i++) {
      if (allChildren[i].children[1].innerText == "Playback speed") {
        ogDur = document.querySelector("video").duration;
        return allChildren[i];
      }
    }
    return null;
  }

  function getMenuItems() {
    const allChildren = document.querySelector(".ytp-panel-menu").children;
    // let child = null;

    let child = findSpeedItem(allChildren);

    if (child != null) {
      child.addEventListener("click", handleSpeedItemClick);
    }
  }

  let settingsBtn = document.querySelector(".ytp-settings-button");
  settingsBtn.addEventListener("click", getMenuItems);
}

// listen for new video
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (window.location.href.includes("watch?v=")) {
    // initialize duration and speed elements
    ogDur = 0;
    speedsWithCustom = null;
    speedSlider = null;
    speeds = null;

    // stores calculated durations
    durDict = new Map();

    runContentScript();
  }
});
