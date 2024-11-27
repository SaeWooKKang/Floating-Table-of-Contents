import { motion } from 'framer-motion'
import { useState } from 'react'
import { TOC_TITLE_ID } from './toc.const'

interface Props {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
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
        id={TOC_TITLE_ID}
        className="relative px-[10px] font-bold text-toc-black"
        style={{
          fontSize: '16px',
        }}
      >
        <span className="absolute left-[-15px]" style={{ display: 'block' }}>
          ☁️
        </span>
        <span className="font-bold">Floating Table of Contents</span>
      </h1>
    </motion.div>
  )
}
