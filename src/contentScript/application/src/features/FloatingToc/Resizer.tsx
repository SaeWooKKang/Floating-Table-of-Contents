import { SizeIcon } from '@radix-ui/react-icons'
import { type MotionValue, type PanInfo, motion } from 'framer-motion'
import { useRef } from 'react'

interface ResizerProps {
  size: {
    width: number
    height: number
  }
  onResize: (size: { width: number; height: number }) => void
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

  const onPan = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    props.onResize({
      width: initialDims.current.width + info.offset.x,
      height: initialDims.current.height + info.offset.y,
    })
  }

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
