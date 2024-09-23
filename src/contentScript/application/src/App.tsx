import { useEffect } from "react";

export function App() {
  useEffect(() => {
    generateTOC();
  }, [])

  return null
}

function generateTOC() {
  const directions = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const;

  const tocContainer = Layout();
  const tocTitle = Title();
  const tocList = HeaderList();
  const tocDirections = Directions();
  
  tocContainer.appendChild(tocTitle);
  tocContainer.appendChild(tocList);
  tocContainer.appendChild(tocDirections);

  const tocElement = document.querySelector('#mokcha_root')!

  tocElement.appendChild(tocContainer);

  // Make the TOC draggable and resizable
  const toc = {
    isDragging: false,
    isResizing: false,
    currentX: window.innerWidth - 290,
    currentY: 180,
    initialX: 0,
    initialY: 0,
    width: 250,
    height: 300,
    resizeDirection: ''
  }

  tocTitle.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  // Add event listeners for resize handles
  directions.forEach(dir => {
    const handle = tocContainer.querySelector(`.resize-${dir}`) as HTMLElement;
    if (handle) {
      handle.addEventListener("mousedown", (e: MouseEvent) => resizeStart(e, dir));
    }
  });

  function dragStart(e: MouseEvent) {
    if (e.target === tocTitle) {
      toc.initialX = e.clientX - toc.currentX;
      toc.initialY = e.clientY - toc.currentY;
      toc.isDragging = true;
    }
  }

  function resizeStart(e: MouseEvent, direction: string) {
    e.preventDefault();
    toc.isResizing = true;
    toc.resizeDirection = direction;
    toc.initialX = e.clientX;
    toc.initialY = e.clientY;
  }

  function drag(e: MouseEvent) {
    e.preventDefault();

    if (toc.isDragging) {
      toc.currentX = e.clientX - toc.initialX;
      toc.currentY = e.clientY - toc.initialY;
      updatePosition();
    }

    if (toc.isResizing) {
      const dx = e.clientX - toc.initialX;
      const dy = e.clientY - toc.initialY;

      if (toc.resizeDirection.includes('e')) {
        toc.width += dx;
      }
      if (toc.resizeDirection.includes('w')) {
        toc.width -= dx;
        toc.currentX += dx;
      }
      if (toc.resizeDirection.includes('s')) {
        toc.height += dy;
      }
      if (toc.resizeDirection.includes('n')) {
        toc.height -= dy;
        toc.currentY += dy;
      }

      toc.initialX = e.clientX;
      toc.initialY = e.clientY;

      updatePosition();
    }
  }

  function dragEnd(e: MouseEvent) {
    toc.initialX = toc.currentX;
    toc.initialY = toc.currentY;
    toc.isDragging = false;
    toc.isResizing = false;
  }

  function updatePosition() {
    tocContainer.style.width = `${toc.width}px`;
    tocContainer.style.height = `${toc.height}px`;
    tocContainer.style.left = `${toc.currentX}px`;
    tocContainer.style.top = `${toc.currentY}px`;
  }

  // Initial position update
  updatePosition();
  
  function Directions () {
    const fragment = document.createDocumentFragment();

    directions.forEach(dir => {
      const handle = document.createElement('div');
  
      handle.className = `resize-handle resize-${dir}`;
      handle.style.cssText = `
        position: absolute;
  
        width: ${dir === 'n' || dir === 's' ? 'calc(100% - 40px)' : '20px'};
        height: ${dir === 'e' || dir === 'w' ? 'calc(100% - 40px)' : '20px'};
        
        ${dir ==='n' ? 'top: -10px; right: 20px;' : ''}
        ${dir ==='s' ? 'bottom: -10px; right: 20px;' : ''}
        ${dir === 'e' ? 'right: -10px; top: 10px;' : ''}
        ${dir === 'w' ? 'left: -10px; top: 10px;' : ''}
        
        ${dir ==='ne' ? 'top: -10px; right: -10px;' : ''}
        ${dir ==='sw' ? 'bottom: -10px; left: -10px;' : ''}
        ${dir === 'se' ? 'bottom: -10px; right: -10px;' : ''}
        ${dir === 'nw' ? 'top: -10px; left: -10px;' : ''}

        cursor: ${dir}-resize;
      `;
      
      fragment.appendChild(handle);
    });

    return fragment
  }

  function Layout() {
    const tocContainer = document.createElement('div');

    tocContainer.id = 'extension-toc-container';
    tocContainer.style.cssText = `
      position: fixed;
      background: white;
      padding: 15px 10px;
      z-index: 1000;
      overflow: hidden; 
      border-radius: 10px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    `;

    return tocContainer;
  }

  function HeaderList () {
    const headers = document.querySelectorAll('h1, h2, h3, h4');
    const tocList = document.createElement('ul');
    tocList.id = 'extension-toc';
    tocList.style.listStyle = 'none';
    tocList.style.overflow = 'auto';
    tocList.style.marginTop = '20px';
    tocList.style.padding = '0';
    tocList.style.maxHeight = 'calc(100% - 40px)'; // Adjust for the title height
  
    // Add headers to the TOC
    headers.forEach((header, index) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const headerId = `toc-header-${index}`;
      
      header.id = headerId;
      link.textContent = header.textContent;
      link.href = `#${headerId}`;
      link.style.color = '#0ea5e9'
      link.style.fontSize = '14px';
      
      listItem.style.marginLeft = `${(parseInt(header.tagName[1]) - 1) * 15}px`;
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
  
    return tocList;
  }

  function Title  () {
    const tocTitle = document.createElement('h2');

    tocTitle.textContent = '☁️ Floating Table of Contents';
    tocTitle.style.fontSize = '14px';
    tocTitle.style.color = '#212121';
    tocTitle.style.fontWeight = '500';
    tocTitle.style.cursor = 'move';
    tocTitle.style.userSelect = 'none';
    tocTitle.style.marginTop = '0';
    
    return tocTitle
  }
}
