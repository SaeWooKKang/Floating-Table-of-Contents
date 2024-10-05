import { motion } from 'framer-motion'
import { useRef } from 'react'
import { SwitchCase } from '../../components/SwitchCase'
import { useHeadings, useTocHighlight } from './toc.hook'
import { getHeadingInfo } from './toc.utils'

interface Props {
  onTap: () => void
  showBigger: boolean
}

export const Toc = (props: Props) => {
  const { headings } = useHeadings()
  const { activeId } = useTocHighlight({ headings: headings ?? [] })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

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
