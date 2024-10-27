import { application } from './application/index'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'on') {
    chrome.storage.local.get(['toc']).then((result) => {
      application.on(result.toc)
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'off') {
    application.off()
  }
})

chrome.storage.local.set({
  toc: {
    position: {
      x: 300,
      y: 300,
    },
  },
})
