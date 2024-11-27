const INITIAL_POSITION = {
  x: 300,
  y: 300,
}

const INITIAL_SIZE = {
  width: 300,
  height: 300,
}

const TOC_KEY = 'floating-toc'
const TOC_SIZE_KEY = 'floating-size'

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
  getSize: () => {
    return chrome.storage.local.get([TOC_SIZE_KEY])
  },
  setSize: (size: { width: number; height: number }) => {
    chrome.storage.local.set({
      [TOC_SIZE_KEY]: {
        size,
      },
    })
  },
}

export interface Setting {
  position: { x: number; y: number }
  size: { width: number; height: number }
  action: {
    changePosition: (x: number, y: number) => void
    changeSize: (
      callback: (prev: { width: number; height: number }) => { width: number; height: number },
    ) => void
  }
}

export const contentsController = {
  changePosition: (x: number, y: number) => {
    const position = { x, y }

    storage.setToc({ position })
  },
  changeSize: (width: number, height: number) => {
    storage.setSize({ width, height })
  },
  getSetting: async (): Promise<Setting> => {
    const result = await storage.getToc()
    const sizeResult = await storage.getSize()

    const size = sizeResult[TOC_SIZE_KEY]?.size ?? INITIAL_SIZE

    return {
      position: result[TOC_KEY]?.position ?? INITIAL_POSITION,
      action: {
        changePosition: contentsController.changePosition,
        changeSize: (
          callback: (prev: { width: number; height: number }) => { width: number; height: number },
        ) => storage.setSize(callback(size)),
      },
      size: size,
    }
  },
}
