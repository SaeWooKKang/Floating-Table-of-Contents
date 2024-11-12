import { TOC_TITLE_ID } from './toc.const';
import type { Area, HeadingInfo } from './toc.type'

export const getAllHeadings = () => {
  const main = document.querySelector('main')

  const headings = main
    ? main.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4')
    : document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4')

  return Array.from(headings)
}

const filterHeadingList = (headings: Array<Element>)=> {
    return headings
      .filter((heading) => heading.id !== TOC_TITLE_ID)
      .filter(heading => heading.textContent !== '')
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
