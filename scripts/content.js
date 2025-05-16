let isDurAdded = false;
let ogDur = 0;
let speedsWithCustom = null;
let speedSlider = null;
let speeds = null;

console.log(ogDur);

const durList = [];

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
  return { hours, minutes, seconds };
}

function displayDur(hoursMinSecObj, speed) {
  let paddedMin = String(hoursMinSecObj.minutes).padStart(2, "0");
  let paddedSec = String(hoursMinSecObj.seconds).padStart(2, "0");

  speed.children[0].innerText +=
    hoursMinSecObj.hours == 0
      ? ` (${hoursMinSecObj.minutes}:${paddedSec})`
      : ` (${hoursMinSecObj.hours}:${paddedMin}:${paddedSec})`;
  speed.classList.add("new-duration");
  durList.push(hoursMinSecObj);
  console.log(durList);
}

function calcAndDisplayDur(speeds) {
  if (document.querySelector(".new-duration") != null) return;

  speeds.forEach((speed) => {
    const hoursMinSecObj = calcDur(speed);
    displayDur(hoursMinSecObj, speed);
  });
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
      return allChildren[i].children[1];
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

const settingsBtn = document.querySelector(".ytp-settings-button");
settingsBtn.addEventListener("click", getMenuItems);
