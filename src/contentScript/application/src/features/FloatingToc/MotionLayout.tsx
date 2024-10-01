import { type DragControls, motion } from 'framer-motion'

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
  return (
    <motion.div
      drag
      dragConstraints={props.constraints}
      dragControls={props.controls}
      dragListener={false}
      animate={{ x: 200, y: 200 }}
      layout
      whileHover={{
        scale: 1.05,
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'auto',
        width: props.tocSize.width,
        height: props.tocSize.height,
        borderRadius: '10px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        overflow: 'hidden',
        zIndex: 1,
        backgroundColor: 'white',
      }}
    >
      {props.children}
    </motion.div>
  )
}
