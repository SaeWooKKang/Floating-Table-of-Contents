chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#f4fb04' })
  chrome.action.setBadgeText({ text: '' })

  chrome.contextMenus.create({
    id: 'Floating-toc',
    title: 'Toggle Floating ToC',
    contexts: ['all'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.url?.startsWith('http') || !tab.id) {
    return
  }

  if (info.menuItemId !== 'Floating-toc') {
    return
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  const nextState = prevState === 'on' ? '' : 'on'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  })

  if (nextState === 'on') {
    chrome.tabs.sendMessage(tab.id ?? chrome.tabs.TAB_ID_NONE, { status: 'on' })
  } else {
    chrome.tabs.sendMessage(tab.id ?? chrome.tabs.TAB_ID_NONE, { status: 'off' })
  }
})

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url?.startsWith('http') || !tab.id) {
    return
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  const nextState = prevState === 'on' ? '' : 'on'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  })

  if (nextState === 'on') {
    chrome.tabs.sendMessage(tab.id ?? chrome.tabs.TAB_ID_NONE, { status: 'on' })
  } else {
    chrome.tabs.sendMessage(tab.id ?? chrome.tabs.TAB_ID_NONE, { status: 'off' })
  }
})
