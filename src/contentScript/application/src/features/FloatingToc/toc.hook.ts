import { useEffect, useRef, useState } from 'react'

export const useTocHighlight = ({
  headings,
}: {
  headings: Array<HTMLHeadingElement>
}) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const options = {
    rootMargin: '-70px 0px -70% 0px',
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
