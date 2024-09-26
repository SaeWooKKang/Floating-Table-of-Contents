import { DragControls, motion, PanInfo } from "framer-motion";
import React, { useState } from "react";

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
}

export const MotionLayout = (props: Props) => {
  const [position, setPosition] = useState({ x: 200, y: 200 });

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    setPosition(info.point);
  }

  return (
    <motion.div 
      drag 
      dragConstraints={props.constraints}
      dragControls={props.controls}
      dragListener={false}
      dragMomentum={false}
      style={{
        position: 'fixed',
        pointerEvents: 'auto',
        width: props.tocSize.width, 
        height: props.tocSize.height,
        borderRadius: '10px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: 'white'
      }}
      initial={position}
      onDragEnd={handleDragEnd}
      layout
    >
      {props.children}
    </motion.div>
  )
}
