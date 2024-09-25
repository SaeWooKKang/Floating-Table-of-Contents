import { motion } from "framer-motion";
import React from "react";

interface Props {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
  hideIcon: boolean
}
export const Header = (props: Props) => {
  return (
    <motion.div 
      layout
      onPointerDown={props.onPointerDown}
      className="!bg-white flex justify-center flex-col"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          padding: '15px 10px',
          position: 'relative',
        }}
      >
        <span style={{position: 'absolute', left: -15, display: props.hideIcon ? 'none' : 'block'}}>☁️</span> Floating Table of Contents
      </h1>

      <div 
        style={{
          height:'1px',
          width: 'calc(100% - 20px)',
          backgroundColor: '#D5D5D5',
        }}
      />
  </motion.div>
  )
}
