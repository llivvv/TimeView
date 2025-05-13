const durElem = document.querySelector(".ytp-time-duration");
const ogDur = durElem.innerHTML;
// function getAllClasses() {
//   // get all the tags
//   const allTagsArray = [...document.getElementsByTagName("*")];

//   // get a flattened list of each tag's classList
//   const allClasses = allTagsArray.map((tag) => [...tag.classList]).flat();

//   // get a Set of those classes to remove duplicates
//   const uniqueClasses = new Set(allClasses);

//   // sort alphabetically and join all the classes by newline for display/readability
//   const allUniqueClassesJoinedByNewline = [...uniqueClasses].sort().join("\n");

//   console.log(allUniqueClassesJoinedByNewline);
// }

// getAllClasses();

chrome.runtime.sendMessage({ action: "triggerPopup" });

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
