import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SwitchCase } from '../../components/SwitchCase'
import { getAllHeadings, getHeadingInfo } from './toc.utils'

interface Props {
  onTap: () => void
  showBigger: boolean
}

export const Toc = (props: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [headings, setHeadings] = useState<Array<HTMLHeadingElement> | null>(null)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const headings = Array.from(getAllHeadings())
    setHeadings(headings)

    const options = {
      rootMargin: '-70px 0px -70% 0px',
      threshold: 1.0,
    }

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
  }, [])

  const headingInfo = headings && getHeadingInfo(headings)
  const hasHeadingInfo = headingInfo && headingInfo.length > 0

  return (
    <motion.nav
      layout
      onClick={props.onTap}
      className="h-[calc(100%-55px)] w-full overflow-auto pt-[15px] pb-[10px] outline-none"
      ref={scrollAreaRef}
    >
      <SwitchCase
        value={hasHeadingInfo ? 'fill' : 'empty'}
        cases={{
          fill: (
            <ul
              className="flex flex-col gap-[5px] text-toc-black"
              style={{
                fontSize: props.showBigger ? '16px' : '13px',
              }}
            >
              {headingInfo?.map((headingInfo) => {
                return (
                  <motion.li
                    key={headingInfo.id}
                    className="pr-[10px]"
                    style={{
                      paddingLeft: headingInfo.level * 10,
                      color: headingInfo.id === activeId ? 'orange' : 'inherit',
                    }}
                  >
                    <a href={`#${headingInfo.id}`} onClick={(e) => e.stopPropagation()}>
                      {headingInfo.text}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          ),
          empty: (
            <div className="flex h-[calc(100%-40px)] items-center justify-center">empty..</div>
          ),
        }}
      />
    </motion.nav>
  )
}
