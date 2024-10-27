import { type DragControls, motion } from 'framer-motion'
import { type MouseEvent, useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  controls: DragControls
  constraints: {
    left: number
    right: number
    top: number
    bottom: number
  }
  tocSize: {
    width: number
    height: number
  }
  initialPosition: {
    x: number
    y: number
  }
  onDragEnd: (x: number, y: number) => void
}

export const MotionLayout = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleDragStart = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  console.log('MotionLayout:', props.initialPosition)

  return (
    <motion.div
      ref={containerRef}
      drag
      dragConstraints={props.constraints}
      dragControls={props.controls}
      dragListener={false}
      onMouseDown={handleDragStart}
      initial={props.initialPosition.position}
      onDragEnd={(_, info) => {
        if (containerRef.current) {
          const transform = window.getComputedStyle(containerRef.current).transform
          const matrix = new DOMMatrix(transform)
          const translateX = matrix.m41 // pixels 단위로 반환
          const translateY = matrix.m42

          console.dir(props.onDragEnd)

          props.onDragEnd(translateX, translateY)
        }
      }}
      layout
      whileHover={{
        scale: 1.05,
      }}
      className="pointer-events-auto fixed overflow-hidden rounded-[10px] bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)]"
      style={{
        width: props.tocSize.width,
        height: props.tocSize.height,
      }}
    >
      {props.children}
    </motion.div>
  )
}
