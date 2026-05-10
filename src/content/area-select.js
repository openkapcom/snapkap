'use strict';

// Prevent double-injection
if (!document.getElementById('snapkap-area-overlay')) {
  (function() {
    let overlay, selectionRect, dimensionsEl;
    let isSelecting = false;
    let startX = 0, startY = 0;

    // Create overlay
    overlay = document.createElement('div');
    overlay.id = 'snapkap-area-overlay';
    overlay.innerHTML = `
      <div id="snapkap-area-instructions">
        Click and drag to select an area. Press <strong>Esc</strong> to cancel.
      </div>
      <div id="snapkap-area-selection"></div>
      <div id="snapkap-area-dimensions"></div>
    `;
    document.body.appendChild(overlay);

    selectionRect = document.getElementById('snapkap-area-selection');
    dimensionsEl = document.getElementById('snapkap-area-dimensions');

    // Event listeners
    overlay.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        cleanup();
      }
    }

    function onMouseDown(e) {
      if (e.button !== 0) return;

      isSelecting = true;
      startX = e.clientX;
      startY = e.clientY;

      selectionRect.style.setProperty('left', startX + 'px', 'important');
      selectionRect.style.setProperty('top', startY + 'px', 'important');
      selectionRect.style.setProperty('width', '0px', 'important');
      selectionRect.style.setProperty('height', '0px', 'important');
      selectionRect.style.setProperty('display', 'block', 'important');

      const instructions = document.getElementById('snapkap-area-instructions');
      if (instructions) instructions.style.setProperty('display', 'none', 'important');

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    }

    function onMouseMove(e) {
      if (!isSelecting) return;

      const left = Math.min(startX, e.clientX);
      const top = Math.min(startY, e.clientY);
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);

      selectionRect.style.setProperty('left', left + 'px', 'important');
      selectionRect.style.setProperty('top', top + 'px', 'important');
      selectionRect.style.setProperty('width', width + 'px', 'important');
      selectionRect.style.setProperty('height', height + 'px', 'important');

      dimensionsEl.textContent = `${width} x ${height}`;
      dimensionsEl.style.setProperty('left', (left + width + 10) + 'px', 'important');
      dimensionsEl.style.setProperty('top', (top + height / 2 - 10) + 'px', 'important');
      dimensionsEl.style.setProperty('display', 'block', 'important');
    }

    async function onMouseUp(e) {
      if (!isSelecting) return;
      isSelecting = false;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      const left = Math.min(startX, e.clientX);
      const top = Math.min(startY, e.clientY);
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);

      if (width < 10 || height < 10) {
        cleanup();
        return;
      }

      // Hide overlay before capture
      overlay.style.setProperty('display', 'none', 'important');

      // Wait for repaint
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise(r => setTimeout(r, 100));

      // Send capture request with bounds
      chrome.runtime.sendMessage({
        action: 'captureAfterDelay',
        mode: 'area',
        bounds: {
          x: left,
          y: top,
          width: width,
          height: height,
          devicePixelRatio: window.devicePixelRatio || 1
        }
      });

      cleanup();
    }

    function cleanup() {
      isSelecting = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
  })();
}
