let isDurAdded = false;
let ogDur = 0;
console.log(ogDur);

const durList = [];

function getAllClasses() {
  // get all the tags
  const allTagsArray = [...document.getElementsByTagName("*")];

  // get a flattened list of each tag's classList
  const allClasses = allTagsArray.map((tag) => [...tag.classList]).flat();

  // get a Set of those classes to remove duplicates
  const uniqueClasses = new Set(allClasses);

  // sort alphabetically and join all the classes by newline for display/readability
  const allUniqueClassesJoinedByNewline = [...uniqueClasses].sort().join("\n");

  console.log(allUniqueClassesJoinedByNewline);
}

// getAllClasses();

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
  let newSpan = document.createElement("div");
  speed.appendChild(newSpan);
  let paddedMin = String(hoursMinSecObj.minutes).padStart(2, "0");
  let paddedSec = String(hoursMinSecObj.seconds).padStart(2, "0");
  if (hoursMinSecObj.hours == 0) {
    newSpan.innerText = `${hoursMinSecObj.minutes}:${paddedSec}`;
  } else {
    newSpan.innerText = `${hoursMinSecObj.hours}:${paddedMin}:${paddedSec}`;
  }
  newSpan.classList.add("ytp-menuitem-label");
  newSpan.classList.add(".new-duration");
  durList.push(hoursMinSecObj);
  console.log(durList);
}

function handleSpeedItemClick() {
  // wait for the speeds panel to show up first
  setTimeout(() => {
    getAllClasses();
    if (document.querySelector(".new-duration") != null) return;
    const speedsWithCustom = document.querySelectorAll(".ytp-menuitem");
    const custom = document.querySelector(".ytp-menuitem");
    console.log(speedsWithCustom);
    const speeds = Array.from(speedsWithCustom).slice(1);
    custom.style.width = "100%";

    speeds.forEach((speed) => {
      console.log(`Here is the parent: ${speed.closest("div").classList}`);
      const hoursMinSecObj = calcDur(speed);
      displayDur(hoursMinSecObj, speed);
    });
  }, 500);

  isDurAdded = true;
}

function getMenuItems() {
  console.log("reached settings btn");
  const allChildren = document.querySelector(".ytp-panel-menu").children;
  console.log(allChildren.length);
  let child = null;

  // speed item doesn't have a fixed position in list
  for (let i = 0; i < allChildren.length; i++) {
    if (allChildren[i].children[1].innerText == "Playback speed") {
      ogDur = document.querySelector("video").duration;
      child = allChildren[i].children[1];
      break;
    }
  }

  if (child != null) {
    child.addEventListener("click", handleSpeedItemClick);
  }
}

const settingsBtn = document.querySelector(".ytp-settings-button");
settingsBtn.addEventListener("click", getMenuItems);
