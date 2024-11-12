import { HEADING_SELECTOR_ORDERER, NONE_BREAKING_SPACE_UNICODE, TOC_TITLE_ID } from './toc.const';
import type { Area, HeadingInfo } from './toc.type'

const getHeadingContainer = () => {
  for (const selector of HEADING_SELECTOR_ORDERER)  {
    const container = document.querySelector(selector)

    if (container) {
      return container
    }
  }

  return document
}

export const getAllHeadings = () => {
  const container = getHeadingContainer()
  const headings = container
    .querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4')
    
  return Array.from(headings)
}

const filterHeadingList = (headings: Array<Element>)=> {
  return headings
    .filter((heading) => heading.id !== TOC_TITLE_ID)
    .filter(heading => heading.textContent !== '')
    .filter(heading => heading.textContent !== NONE_BREAKING_SPACE_UNICODE)
}

export const parseHeadingInfo = (headings: Array<Element>): HeadingInfo[] => {
  const filteredHeadingList = filterHeadingList(headings)
  const info: HeadingInfo[] = filteredHeadingList
    .map((heading, index) => {
      const [_, level] = [...heading.tagName]

      return {
        text: heading.textContent ?? '',
        id: `toc-heading-${index}`,
        level: Number(level),
      }
    })

    filteredHeadingList.forEach((heading, index) => {
      heading.id = `toc-heading-${index}`
    })
    

  return info
}

export const parseInitialPosition = (position: { x: number; y: number }, constraints: Area) => {
  const copy = { ...position }

  if (constraints.bottom < copy.y) {
    copy.y = constraints.bottom
  }
  if (constraints.right < copy.x) {
    copy.x = constraints.right
  }

  return copy
}
