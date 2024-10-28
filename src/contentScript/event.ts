import { application } from './application/index'
import { contentsController } from './setup'

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.status === 'on') {
    const setting = await contentsController.getSetting()

    application.on(setting)
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'off') {
    application.off()
  }
})
