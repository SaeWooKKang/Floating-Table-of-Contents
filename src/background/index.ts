chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: "#f4fb04" });
  chrome.action.setBadgeText({ text: "" });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url?.startsWith('http') || !tab.id) {
    return
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'on' ? '' : 'on'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "on") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: generateTOC,
    });
  } else {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: removeTOC,
    });
  }
});

function generateTOC() {
  const headers = document.querySelectorAll('h1, h2, h3, h4');
  const tocList = document.createElement('ul');
  tocList.id = 'extension-toc';
  tocList.style.overflow = 'auto';
  tocList.style.maxHeight = 'calc(100% - 40px)'; // Adjust for the title height
  
  // Add headers to the TOC
  headers.forEach((header, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const headerId = `toc-header-${index}`;
    
    header.id = headerId;
    link.textContent = header.textContent;
    link.href = `#${headerId}`;
    
    listItem.style.marginLeft = `${(parseInt(header.tagName[1]) - 1) * 20}px`;
    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });
  
  const tocContainer = document.createElement('div');
  tocContainer.id = 'extension-toc-container';
  tocContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    width: 250px;
    height: 300px;
    z-index: 1000;
    overflow: hidden;
    min-width: 150px;
    min-height: 100px;
  `;
  
  const tocTitle = document.createElement('h2');
  tocTitle.textContent = '목차';
  tocTitle.style.cursor = 'move';
  tocTitle.style.userSelect = 'none';
  tocTitle.style.marginTop = '0';
  
  tocContainer.appendChild(tocTitle);
  tocContainer.appendChild(tocList);

  // Add resize handles
  const directions = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  directions.forEach(dir => {
    const handle = document.createElement('div');
    handle.className = `resize-handle resize-${dir}`;
    handle.style.cssText = `
      position: absolute;
      ${dir.includes('n') ? 'top: -5px;' : ''}
      ${dir.includes('s') ? 'bottom: -5px;' : ''}
      ${dir.includes('e') ? 'right: -5px;' : ''}
      ${dir.includes('w') ? 'left: -5px;' : ''}
      width: ${dir === 'n' || dir === 's' ? 'calc(100% - 10px)' : '10px'};
      height: ${dir === 'e' || dir === 'w' ? 'calc(100% - 10px)' : '10px'};
      cursor: ${dir}-resize;
    `;
    tocContainer.appendChild(handle);
  });

  document.body.appendChild(tocContainer);

  // Make the TOC draggable
  let isDragging = false;
  let isResizing = false;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;
  let resizeDirection = '';

  tocTitle.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e: MouseEvent) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === tocTitle) {
      isDragging = true;
    }
  }

  function drag(e: MouseEvent) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, tocContainer);
    }

    if (isResizing) {
      e.preventDefault();
      const dx = e.clientX - initialX;
      const dy = e.clientY - initialY;
      const containerRect = tocContainer.getBoundingClientRect();

      if (resizeDirection.includes('e')) {
        tocContainer.style.width = `${containerRect.width + dx}px`;
      }
      if (resizeDirection.includes('w')) {
        tocContainer.style.width = `${containerRect.width - dx}px`;
        tocContainer.style.left = `${containerRect.left + dx}px`;
      }
      if (resizeDirection.includes('s')) {
        tocContainer.style.height = `${containerRect.height + dy}px`;
      }
      if (resizeDirection.includes('n')) {
        tocContainer.style.height = `${containerRect.height - dy}px`;
        tocContainer.style.top = `${containerRect.top + dy}px`;
      }

      initialX = e.clientX;
      initialY = e.clientY;
    }
  }

  function dragEnd(e: MouseEvent) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
    isResizing = false;
  }

  function setTranslate(xPos:number, yPos: number, el: HTMLElement) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // Add resize event listeners
  directions.forEach(dir => {
    const handle = tocContainer.querySelector(`.resize-${dir}`) as HTMLElement
    const fo = (e: MouseEvent) => {
      
    }
    handle?.addEventListener('mousedown', (e) => {
      isResizing = true;
      resizeDirection = dir;
      initialX = e.clientX; 
      initialY = e.clientY;
    });
  });

  // Handle content resize
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target === tocContainer) {
        tocList.style.maxHeight = `${entry.contentRect.height - 40}px`; // Adjust for the title height
      }
    }
  });

  resizeObserver.observe(tocContainer);
}

function removeTOC() {
  const tocContainer = document.getElementById('extension-toc-container');
  if (tocContainer) {
    tocContainer.remove();
  }
}
