import React, { useEffect } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/App";

const root = document.createElement('div')
root.id = 'mokcha_root'
root.style.display = 'none'

document.body.appendChild(root)

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export const application = {
  on: () => {
    root.style.display = 'block'
  },
  off: () => {
    root.style.display = 'none'
  }
}

