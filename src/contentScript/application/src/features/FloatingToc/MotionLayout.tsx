import { DragControls, motion, useDragControls } from "framer-motion";
import React, { useRef } from "react";

interface Props {
  documentHeight: number
  documentWidth: number
  showBigger: boolean
  children: React.ReactNode
  controls: DragControls
}

export const MotionLayout = (props: Props) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={constraintsRef}
      drag 
      dragConstraints={{
        bottom: props.documentHeight - 200 || 0,
        left: 0,
        right: props.documentWidth - 200 || 0,
        top: 0
      }}
      dragControls={props.controls}
      dragListener={false}
      style={{
        pointerEvents: 'auto',
        width: props.showBigger ? 300 : 250, 
        height: props.showBigger ? 300 : 200,
        borderRadius: '10px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: 'white'
      }}
      layout
    >
      {props.children}
    </motion.div>
  )
}
