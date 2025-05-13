const durElem = document.querySelector(".ytp-time-duration");
const ogDur = durElem.innerHTML;

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
