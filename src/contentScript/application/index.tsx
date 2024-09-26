import React from "react";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { App } from "./src/App";

let root: Root | null = null;
const container = document.createElement('div');
container.id = 'mokcha_root';
document.body.appendChild(container);

export const application = {
  on: () => {
    if (!root) {
      root = createRoot(container);
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }
  },
  off: () => {    
    if (root) {
      root.unmount();
      root = null;
    }
  }
};
