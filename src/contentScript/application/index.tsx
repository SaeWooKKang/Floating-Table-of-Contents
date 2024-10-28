import { StrictMode, createContext, useRef, useState } from 'react'
import React from 'react'
import { type Root, createRoot } from 'react-dom/client'

import { App } from './src/App'
import type { External } from './type'

let root: Root | null = null
const container = document.createElement('div')
container.id = 'mokcha_root'
document.body.appendChild(container)

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
