// need to reinitialize for new videos
// let settingsBtn = null;
// let durDict = null;

function runContentScript() {
  let ogDur = 0;
  let speedsWithCustom = null;
  let speedSlider = null;
  let speeds = null;

  let durDict = new Map();

  function calcDur(speed) {
    let speedText = speed.innerText;
    if (speedText === "Normal") {
      speedText = "1";
    }
    let speedNum = parseFloat(speedText);
    let calc = ogDur / speedNum;
    let hours = Math.floor(calc / 3600);
    calc %= 3600;
    let minutes = Math.floor(calc / 60);
    let seconds = Math.floor(calc % 60);
    return { hours, minutes, seconds, speedNum };
  }

  function setDurMap(hoursMinSecObj) {
    let paddedMin = String(hoursMinSecObj.minutes).padStart(2, "0");
    let paddedSec = String(hoursMinSecObj.seconds).padStart(2, "0");
    let durStr;

    hoursMinSecObj.hours == 0
      ? (durStr = ` (${hoursMinSecObj.minutes}:${paddedSec})`)
      : (durStr = ` (${hoursMinSecObj.hours}:${paddedMin}:${paddedSec})`);

    durDict.set(hoursMinSecObj.speedNum, durStr);
  }

  function renderDur(speed) {
    let speedText = speed.innerText;
    if (speedText === "Normal") {
      speedText = "1";
    }
    let speedNum = parseFloat(speedText);
    let newDur = durDict.get(speedNum);
    speed.children[0].innerText += newDur;
    speed.classList.add("new-duration");
  }

  function calcAndDisplayDur(speeds) {
    if (speeds[1].classList.contains("new-duration")) return;

    // if (document.querySelector(".new-duration") != null) return;

    if (durDict.size != 0) {
      speeds.forEach((speed) => renderDur(speed));
      console.log("did not recalculate!");
    } else {
      speeds.forEach((speed) => {
        const hoursMinSecObj = calcDur(speed);
        setDurMap(hoursMinSecObj, speed);
        renderDur(speed);
        console.log("did a calculation");
      });
    }
  }

  function selectSpeedElems() {
    speedsWithCustom = document.querySelectorAll(".ytp-menuitem");
    speedSlider = document.querySelector(".ytp-speedslider");
    speeds = Array.from(speedsWithCustom).slice(1);
    console.log(speeds);
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
    console.log("reached settings btn");
    const allChildren = document.querySelector(".ytp-panel-menu").children;
    console.log(allChildren.length);
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
  console.log("got msg from background lol");

  if (window.location.href.includes("watch?v=")) {
    runContentScript();
  }
  // console.log(window.location.href);
  // settingsBtn = document.querySelector(".ytp-settings-button");
  // durDict = new Map();
});
