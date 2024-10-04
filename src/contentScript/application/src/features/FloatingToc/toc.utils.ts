import type { HeadingInfo } from './toc.type'

export const getAllHeadings = () => {
  const main = document.querySelector('main')

  const headings = main
    ? main.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4')
    : document.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4')

  return headings
}

export const getHeadingInfo = (headings: Array<Element>): HeadingInfo[] => {
  headings.forEach((heading, index) => {
    if (heading.id !== 'toc-title') {
      heading.id = `toc-heading-${index}`
    }
  })

  const info: HeadingInfo[] = [...headings]
    .filter((heading) => heading.id !== 'toc-title')
    .map((heading, index) => {
      const [_, level] = [...heading.tagName]

      return {
        text: heading.textContent ?? '',
        id: `toc-heading-${index}`,
        level: Number(level),
      }
    })
    .filter((headingInfo) => headingInfo.text !== '')

  return info
}
