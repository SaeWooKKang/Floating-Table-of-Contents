import { application } from './application/index'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'on') {
    application.on()
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'off') {
    application.off()
  }
})
