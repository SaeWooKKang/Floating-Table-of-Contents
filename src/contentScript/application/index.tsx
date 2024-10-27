import { StrictMode, createContext, useRef, useState } from 'react'
import React from 'react'
import { type Root, createRoot } from 'react-dom/client'
import { create, createStore } from 'zustand'
import { App } from './src/App'
import type { Position } from './type'

let root: Root | null = null
const container = document.createElement('div')
container.id = 'mokcha_root'
document.body.appendChild(container)

interface External {
  position: Position
  changePosition: (x: number, y: number) => void
}

export const application = {
  on: (external: External) => {
    root = createRoot(container)
    root.render(
      <StrictMode>
        <App setting={external} />
      </StrictMode>,
    )
  },
  off: () => {
    if (root) {
      root.unmount()
      root = null
    }
  },
}
