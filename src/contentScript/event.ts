import { application } from './application/index'
import { setup } from './setup'

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.status === 'on') {
    const result = await chrome.storage.local.get(['toc'])

    application.on({
      changePosition: setup.changePosition,
      position: result.toc ?? setup.position,
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'off') {
    application.off()
  }
})
