import React from "react";

export const Layout = (props: {
  children: React.ReactNode
}) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1000
      }}
      >
    {props.children}
  </div>
  )
}
