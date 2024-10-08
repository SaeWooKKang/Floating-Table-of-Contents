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
  const prevScrollYRef = useRef(0)
  const allHeadingIdsRef = useRef<Array<string>>([])
  const currentHeadingIdsRef = useRef<Array<string>>([])
  const isClickedRef = useRef(false)

  const options = {
    rootMargin: '-80px 0px -60% 0px',
    threshold: [0, 1],
  }

  const changeActiveId = useCallback(
    throttle((id: string) => {
      setActiveId(id)

      isClickedRef.current = true

      setTimeout(() => {
        isClickedRef.current = false
      }, 100)
    }, 100),
    [],
  )

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (allHeadingIdsRef.current.length === 0) {
      allHeadingIdsRef.current = entries.map((entry) => entry.target.id)
    }

    if (isClickedRef.current) {
      return
    }

    const isScrollingUp = (document.documentElement.scrollTop ?? 0) < (prevScrollYRef?.current ?? 0)
    const isScrollingDown = !isScrollingUp
    prevScrollYRef.current = document.documentElement.scrollTop ?? 0

    for (const entry of entries) {
      if (isScrollingDown && entry.isIntersecting) {
        const foundEntryIndex = allHeadingIdsRef.current.findIndex((id) => id === entry.target.id)

        currentHeadingIdsRef.current = allHeadingIdsRef.current.slice(0, foundEntryIndex + 1)

        setActiveId(entry.target.id)

        return
      }

      if (isScrollingUp && !entry.isIntersecting) {
        const foundIdIndex = currentHeadingIdsRef.current.findIndex((id) => id === entry.target.id)
        const isLast = foundIdIndex === currentHeadingIdsRef.current.length - 1

        if (isLast) {
          currentHeadingIdsRef.current = allHeadingIdsRef.current.slice(0, foundIdIndex)
          setActiveId(currentHeadingIdsRef.current[currentHeadingIdsRef.current.length - 1])
        }

        return
      }

      if (entry.isIntersecting && isScrollingUp) {
        const foundIdIndex = allHeadingIdsRef.current.findIndex((id) => id === entry.target.id)

        currentHeadingIdsRef.current = allHeadingIdsRef.current.slice(0, foundIdIndex + 1)
        setActiveId(entry.target.id)
      }
    }
  }, [])

  useEffect(() => {
    prevScrollYRef.current = document.documentElement.scrollTop ?? 0
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
