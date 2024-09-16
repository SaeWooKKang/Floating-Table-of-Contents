import {generateTOC,removeTOC} from './toc.js'

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: "#f4fb04" });
  chrome.action.setBadgeText({ text: "" });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url?.startsWith('http') || !tab.id) {
    return
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'on' ? '' : 'on'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "on") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: generateTOC,
    });
  } else {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: removeTOC,
    });
  }
});
