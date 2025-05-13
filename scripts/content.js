const durElem = document.querySelector(".ytp-time-duration");
const ogDur = durElem.innerHTML;

const durList = [];
let ogDurInSec = 0;
let isDurAdded = false;

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

function convertOgDurToSec() {
  let ogDurArr = ogDur.split(":");
  let min = parseInt(ogDurArr[0]);
  let sec = parseInt(ogDurArr[1]);
  ogDurInSec = min * 60 + sec;
}

function calcDur(speed) {
  let speedText = speed.innerText;
  if (speedText === "Normal") {
    let ogDurArr = ogDur.split(":");
    let minute = parseInt(ogDurArr[0]);
    let seconds = parseInt(ogDurArr[1]);
    return { minute, seconds };
  } else {
    let speedNum = parseFloat(speedText);
    let calc = ogDurInSec / speedNum;
    let minute = Math.floor(calc / 60);
    let seconds = Math.round(((calc % 60) * 100) / 100);
    return { minute, seconds };
  }
}

function displayDur(minSecObj, speed) {
  let newSpan = document.createElement("div");
  newSpan.classList.add("ytp-menuitem-label");
  speed.appendChild(newSpan);
  let paddedSec = String(minSecObj.seconds).padStart(2, "0");
  newSpan.innerText = `${minSecObj.minute}:${paddedSec}`;
  durList.push(`${minSecObj.minute}:${paddedSec}`);
}

function handleSpeedItemClick() {
  if (isDurAdded) return;

  // wait for the speeds panel to show up first
  setTimeout(() => {
    getAllClasses();
    const speedsWithCustom = document.querySelectorAll(".ytp-menuitem");
    console.log(speedsWithCustom);
    const speeds = Array.from(speedsWithCustom).slice(1);
    convertOgDurToSec();

    speeds.forEach((speed) => {
      const minSecObj = calcDur(speed);
      displayDur(minSecObj, speed);
    });
  }, 500);

  isDurAdded = true;
}

function getMenuItems() {
  const child = document.querySelector(".ytp-panel-menu").children[5];
  child.addEventListener("click", handleSpeedItemClick);
}

const settingsBtn = document.querySelector(".ytp-settings-button");
settingsBtn.addEventListener("click", getMenuItems);
