import { motion } from "framer-motion";
import React, { useState } from "react";

interface Props {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
  hideIcon: boolean
}
export const Header = (props: Props) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsGrabbing(true);
    props.onPointerDown(e);
  };

  const handlePointerUp = () => {
    setIsGrabbing(false);
  };

  return (
    <motion.div 
      layout
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="!bg-white flex justify-center flex-col"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: isGrabbing ? 'grabbing' : 'grab',
      }}
    >
      <h1
        style={{
          padding: '15px 10px',
          position: 'relative',
        }}
      >
        <span style={{position: 'absolute', left: -15, display: props.hideIcon ? 'none' : 'block'}}>☁️</span> 
        <span>Floating Table of Contents</span>
      </h1>

      <div 
        style={{
          height:'0.5px',
          width: 'calc(100% - 20px)',
          backgroundColor: '#D5D5D5',
        }}
      />
  </motion.div>
  )
}
