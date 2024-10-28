const INITIAL_POSITION = {
  x: 300,
  y: 300,
}

const storage = {
  getToc: () => {
    return chrome.storage.local.get(['toc'])
  },
  setToc: (info: { position: { x: number; y: number } }) => {
    chrome.storage.local.set({
      toc: {
        position: info.position,
      },
    })
  },
}

export interface Setting {
  position: { x: number; y: number }
  changePosition: (x: number, y: number) => void
}

export const contentsController = {
  changePosition: (x: number, y: number) => {
    const position = { x, y }

    storage.setToc({ position })
  },
  getSetting: async (): Promise<Setting> => {
    const result = await storage.getToc()

    return {
      changePosition: contentsController.changePosition,
      position: result.toc.position ?? INITIAL_POSITION,
    }
  },
}
