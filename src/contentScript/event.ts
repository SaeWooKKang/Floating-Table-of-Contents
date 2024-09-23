import { generateTOC, removeTOC } from "./application/index";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === "on") {
    generateTOC();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === "off") {
    removeTOC();
  }
});
