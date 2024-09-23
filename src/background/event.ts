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
    chrome.tabs.sendMessage(
      tab.id ?? chrome.tabs.TAB_ID_NONE, 
      { status: "on" }
    );
  } else {
    chrome.tabs.sendMessage(
      tab.id ?? chrome.tabs.TAB_ID_NONE, 
      { status: "off" }
    );
  }
});
