import { SizeIcon } from '@radix-ui/react-icons'
import { type PanInfo, motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { SwitchCase } from '../../components/SwitchCase'
import { useHeadings, useTocHighlight } from './toc.hook'

export const Toc = () => {
  const { headings, hasParsedHeading, parsedHeadings } = useHeadings()
  const { activeId, changeActiveId } = useTocHighlight({ headings: headings ?? [] })

  return (
    <motion.nav
      layout
      className="relative h-[calc(100%-55px)] w-full overflow-auto pt-[15px] pb-[10px] outline-none"
    >
      <SwitchCase
        value={hasParsedHeading ? 'fill' : 'empty'}
        cases={{
          fill: (
            <ul
              className="flex flex-col gap-[5px] text-toc-black"
              style={{
                fontSize: '16px',
              }}
            >
              {parsedHeadings?.map((headingInfo) => {
                return (
                  <motion.li
                    key={headingInfo.id}
                    className={twMerge(
                      'w-fit pr-[10px] hover:underline',
                      activeId === headingInfo.id && 'text-toc-blue',
                    )}
                    style={{
                      paddingLeft: headingInfo.level * 10,
                    }}
                  >
                    <a
                      href={`#${headingInfo.id}`}
                      onClick={(e) => {
                        e.stopPropagation()

                        changeActiveId(headingInfo.id)
                      }}
                    >
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
