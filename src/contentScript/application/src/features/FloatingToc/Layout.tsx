import React from "react";

export const Layout = (props: {
  children: React.ReactNode
  documentHeight: number
}) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: props.documentHeight,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      className="bg-orange-300"
      >
    {props.children}
  </div>
  )
}
