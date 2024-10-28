export const setup = {
  position: {
    x: 300,
    y: 300,
  },
  changePosition: (x: number, y: number) => {
    const position = { x, y }

    chrome.storage.local.set({
      toc: {
        changePosition: setup.changePosition,
        position: position,
      },
    })
  },
}
