type Size = {
  width: number
  height: number
}

type ResizeAction = {
  type: 'resize'
  payload: Size
}

type TocAction = ResizeAction

type TocState = {
  size: Size
}

export const TOC_INITIAL_STATE: TocState = {
  size: {
    width: 300,
    height: 300,
  },
}

export const tocReducer = (state: TocState, action: TocAction) => {
  switch (action.type) {
    case 'resize':
      return {
        size: action.payload,
      }
  }
}
