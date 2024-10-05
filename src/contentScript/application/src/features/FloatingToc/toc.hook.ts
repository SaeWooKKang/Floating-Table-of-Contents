import { useEffect, useRef, useState } from 'react'
import { TOC_TITLE_ID } from './toc.const'
import { getAllHeadings, parseHeadingInfo } from './toc.utils'

export const useHeadings = () => {
  const [headings, setHeadings] = useState<Array<HTMLHeadingElement> | null>(null)

  useEffect(() => {
    const headings = Array.from(getAllHeadings()).filter((heading) => heading.id !== TOC_TITLE_ID)

    setHeadings(headings)
  }, [])

  const parsedHeadings = headings && parseHeadingInfo(headings)
  const hasParsedHeading = parsedHeadings && parsedHeadings.length > 0

  return { headings, parsedHeadings, hasParsedHeading }
}

export const useTocHighlight = ({
  headings,
}: {
  headings: Array<HTMLHeadingElement>
}) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const options = {
    rootMargin: '-70px 0px 0px 0px',
    threshold: 1.0,
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }, options)

    for (const heading of headings) {
      observerRef.current?.observe(heading)
    }

    return () => observerRef.current?.disconnect()
  }, [headings])

  return {
    activeId,
  }
}
