import { application } from './application/index'

const setting = {
  position: {
    x: 300,
    y: 300,
  },
  changePosition: (x: number, y: number) => {
    const position = { x, y }

    chrome.storage.local.set({
      toc: {
        changePosition: setting.changePosition,
        position: position,
      },
    })
  },
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'on') {
    chrome.storage.local.get(['toc']).then((result) => {
      application.on({
        changePosition: setting.changePosition,
        position: result.toc ?? setting.position,
      })
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status === 'off') {
    application.off()
  }
})
