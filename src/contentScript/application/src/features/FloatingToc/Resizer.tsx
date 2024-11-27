import { SizeIcon } from '@radix-ui/react-icons'
import { type MotionValue, type PanInfo, motion } from 'framer-motion'
import { useRef } from 'react'

interface ResizerProps {
  width: MotionValue<number>
  height: MotionValue<number>
}

export const Resizer = (props: ResizerProps) => {
  const initialDims = useRef({
    width: props.width.get(),
    height: props.height.get(),
  })

  const onPanStart = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    initialDims.current = {
      width: props.width.get(),
      height: props.height.get(),
    }
  }

  const onPan = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    props.width.set(initialDims.current.width + info.offset.x)
    props.height.set(initialDims.current.height + info.offset.y)
  }

  const onPanEnd = (e: PointerEvent, info: PanInfo) => {
    initialDims.current = {
      width: props.width.get(),
      height: props.height.get(),
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
