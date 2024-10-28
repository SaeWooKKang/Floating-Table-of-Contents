const INITIAL_POSITION = {
  x: 300,
  y: 300,
}

const TOC_KEY = 'floating-toc'

const storage = {
  getToc: () => {
    return chrome.storage.local.get([TOC_KEY])
  },
  setToc: (info: { position: { x: number; y: number } }) => {
    chrome.storage.local.set({
      [TOC_KEY]: {
        position: info.position,
      },
    })
  },
}

export interface Setting {
  position: { x: number; y: number }
  action: {
    changePosition: (x: number, y: number) => void
  }
}

export const contentsController = {
  changePosition: (x: number, y: number) => {
    const position = { x, y }

    storage.setToc({ position })
  },
  getSetting: async (): Promise<Setting> => {
    const result = await storage.getToc()

    return {
      position: result[TOC_KEY]?.position ?? INITIAL_POSITION,
      action: {
        changePosition: contentsController.changePosition,
      },
    }
  },
}
