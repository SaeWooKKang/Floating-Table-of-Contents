import { useCallback, useEffect, useRef, useState } from 'react'
import { throttle } from '../../utils/throttle'
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
    rootMargin: '-80px 0px -60% 0px',
    threshold: [0, 1],
  }

  const changeActiveId = useCallback(
    throttle((id: string) => {
      setActiveId(id)
    }, 100),
    [],
  )

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
        break
      }
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, options)

    for (const heading of headings) {
      observerRef.current?.observe(heading)
    }

    return () => observerRef.current?.disconnect()
  }, [headings, handleIntersection])

  return {
    activeId,
    changeActiveId,
  }
}
