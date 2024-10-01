type TocType = 'bigger' | 'smaller'

type Toc = {
  type: TocType
  size: TocSize
}

type TocSize = {
  width: number
  height: number
}

type TocAction = {
  type: TocType
}

const TOC_SIZE = {
  bigger: {
    width: 300,
    height: 300,
  },
  smaller: {
    width: 250,
    height: 200,
  },
}

export const TOC_INITIAL_STATE: Toc = {
  type: 'bigger',
  size: TOC_SIZE.bigger,
}

export const tocReducer = (state: Toc, action: TocAction) => {
  switch (action.type) {
    case 'bigger':
      return {
        type: 'bigger' as const,
        size: TOC_SIZE.bigger,
      }
    case 'smaller':
      return {
        type: 'smaller' as const,
        size: TOC_SIZE.smaller,
      }
  }
}
