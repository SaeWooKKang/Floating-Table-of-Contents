chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#f4fb04' })
  chrome.action.setBadgeText({ text: '' })

  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Toggle Floating ToC',
    contexts: ['all'],
    documentUrlPatterns: URL_PATTERNS,
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return
  }

  if (!isValidTab(tab) || !isValidUrl(tab.url)) {
    return
  }

  toggleExtension(tab)
})

chrome.action.onClicked.addListener(async (tab) => {
  if (!isValidTab(tab) || !isValidUrl(tab.url)) {
    return
  }

  toggleExtension(tab)
})

const CONTEXT_MENU_ID = 'Floating-toc'
const URL_PATTERNS = ['http://*/*', 'https://*/*']

const toggleExtension = async (tab: chrome.tabs.Tab) => {
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
}

const isValidUrl = (url?: string) =>
  URL_PATTERNS.some((pattern) => new RegExp(pattern).test(url ?? ''))

const isValidTab = (tab?: chrome.tabs.Tab): tab is chrome.tabs.Tab => {
  return Boolean(tab?.id)
}
