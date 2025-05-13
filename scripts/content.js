const durElem = document.querySelector(".ytp-time-duration");

const ogDur = durElem.innerHTML;
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

function handleSpeedItemClick() {
  // wait for the speeds panel to show up first
  setTimeout(() => {
    getAllClasses();
    const speedsWithCustom = document.querySelectorAll(".ytp-menuitem");
    console.log(speedsWithCustom);
    const speeds = Array.from(speedsWithCustom).slice(1);

    speeds.forEach((speed) => {
      // make sure the duration was not already added
      if (speed.children.length < 2) {
        let newSpan = document.createElement("div");
        newSpan.innerText = "0:21";
        newSpan.classList.add("ytp-menuitem-label");
        speed.appendChild(newSpan);
        console.log(speed.innerHTML);
      }
      // speed.classList.add("is-speed");
    });
  }, 1000);

  // const onlySpeeds = document.querySelectorAll(".is-speed");
  // onlySpeeds.forEach((speed) => {
  //   let newSpan = document.createElement("div");
  //   newSpan.innerText = "0:21";
  //   newSpan.classList.add("ytp-menuitem-label");
  //   speed.appendChild(newSpan);
  //   console.log(speed.innerHTML);
  // });
}

function getMenuItems() {
  const child = document.querySelector(".ytp-panel-menu").children[5];
  if (child != null) {
    child.addEventListener("click", handleSpeedItemClick, { once: true });
  }
  // alert(child.innerHTML);
}

chrome.runtime.sendMessage({ action: "triggerPopup" });

const settingsBtn = document.querySelector(".ytp-settings-button");

// while (document.querySelector(".ad-showing") != null) {
//   // dont run the event listener until finished watching ad
// }
settingsBtn.addEventListener("click", getMenuItems);

// const parent = document.querySelector(".ytp-panel-menu").children[0];
// alert(parent);

// send the original duration to popup.js
chrome.runtime.sendMessage(
  {
    message: ogDur,
  },
  (response) => {
    console.log(response.message);
  }
);

if (durElem) {
  durElem.innerHTML = "0:07";
}
