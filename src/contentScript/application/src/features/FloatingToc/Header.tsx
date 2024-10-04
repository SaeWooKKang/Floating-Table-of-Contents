import { motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
  showBigger: boolean
}
export const Header = (props: Props) => {
  const [isGrabbing, setIsGrabbing] = useState(false)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsGrabbing(true)
    props.onPointerDown(e)
  }

  const handlePointerUp = () => {
    setIsGrabbing(false)
  }

  return (
    <motion.div
      layout
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="flex h-[55px] flex-col items-center justify-center"
      style={{
        cursor: isGrabbing ? 'grabbing' : 'grab',
      }}
    >
      <h1
        id="toc-title"
        className="relative px-[10px] font-bold text-toc-black"
        style={{
          fontSize: props.showBigger ? '16px' : '13px',
        }}
      >
        <span
          className="absolute left-[-15px]"
          style={{ display: props.showBigger ? 'block' : 'none' }}
        >
          ☁️
        </span>
        <span className="font-bold">Floating Table of Contents</span>
      </h1>
    </motion.div>
  )
}
