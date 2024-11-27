import { SizeIcon } from '@radix-ui/react-icons'
import { throttle } from 'es-toolkit'
import { type PanInfo, motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { FRAME_INTERVAL_MS } from './toc.const'
import type { Size } from './toc.type'

interface ResizerProps {
  size: Size
  onResize: (size: Size) => void
}

export const Resizer = (props: ResizerProps) => {
  const initialDims = useRef({
    width: props.size.width,
    height: props.size.height,
  })

  const onPanStart = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    initialDims.current = {
      width: props.size.width,
      height: props.size.height,
    }
  }

  const onPan = useCallback(
    throttle((e: PointerEvent, info: PanInfo) => {
      e.stopPropagation()
      e.preventDefault()

      props.onResize({
        width: initialDims.current.width + info.offset.x,
        height: initialDims.current.height + info.offset.y,
      })
    }, FRAME_INTERVAL_MS),
    [],
  )

  const onPanEnd = (e: PointerEvent, info: PanInfo) => {
    initialDims.current = {
      width: props.size.width,
      height: props.size.height,
    }
  }

  return (
    <div className="sticky right-2 bottom-2 flex justify-end pr-[10px]">
      <motion.button
        onPan={onPan}
        onPanStart={onPanStart}
        onPanEnd={onPanEnd}
        className="rotate-90 rounded-full bg-[#fbffb3] p-[6px]"
      >
        <SizeIcon />
      </motion.button>
    </div>
  )
}
