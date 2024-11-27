import { SizeIcon } from '@radix-ui/react-icons'
import { type PanInfo, motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { SwitchCase } from '../../components/SwitchCase'
import { useHeadings, useTocHighlight } from './toc.hook'

interface Props {
  onResize: (p: { width: number; height: number }) => void
  size: { width: number; height: number }
}

export const Toc = (props: Props) => {
  const { headings, hasParsedHeading, parsedHeadings } = useHeadings()
  const { activeId, changeActiveId } = useTocHighlight({ headings: headings ?? [] })

  const widthMotionValue = useMotionValue(props.size.width)
  const heightMotionValue = useMotionValue(props.size.height)
  const width = useTransform(widthMotionValue, (latest) => latest)
  const height = useTransform(heightMotionValue, (latest) => latest)

  const initialDims = useRef({
    width: widthMotionValue.get(),
    height: heightMotionValue.get(),
    isResizing: false,
  })

  const onPanStart = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      isResizing: true,
    }
  }

  const onPan = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()
    widthMotionValue.set(initialDims.current.width + info.offset.x)
    heightMotionValue.set(initialDims.current.height + info.offset.y)

    props.onResize({ width: width.get(), height: height.get() })
  }

  const onPanEnd = (e: PointerEvent, info: PanInfo) => {
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      isResizing: true,
    }
  }

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

      <motion.button
        onPan={onPan}
        onPanStart={onPanStart}
        onPanEnd={onPanEnd}
        className="absolute right-1 bottom-1 rotate-90 rounded-md border-2 border-rose-200 p-1"
      >
        <SizeIcon />
      </motion.button>
    </motion.nav>
  )
}
