'use strict';

// ============================================================================
// Service Worker — SnapKap Screenshot Extension
// ============================================================================

let offscreenDocumentExists = false;

// Listen for keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !isValidTabUrl(tab.url)) return;

  if (command === 'capture-area') {
    handleCaptureScreenshot(tab.id, { mode: 'area' });
  } else if (command === 'capture-fullpage') {
    handleCaptureScreenshot(tab.id, { mode: 'window' });
  }
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const action = message.action || message.type;

  if (action === 'captureScreenshot') {
    const tabId = message.tabId || sender.tab?.id;
    handleCaptureScreenshot(tabId, message).then(sendResponse);
    return true;
  }

  if (action === 'captureAfterDelay') {
    const tabId = message.tabId || sender.tab?.id;
    captureAndOpenEditor(tabId, message.mode, message.bounds).then(sendResponse);
    return true;
  }
});

// ============================================================================
// Screenshot Capture
// ============================================================================

async function handleCaptureScreenshot(tabId, data) {
  const { mode, bounds } = data || {};

  try {
    if (tabId) {
      const tab = await chrome.tabs.get(tabId);
      if (!isValidTabUrl(tab.url)) {
        return { success: false, error: 'Cannot capture screenshots on this page' };
      }
    }

    if (mode === 'area') {
      await injectAreaSelector(tabId);
      return { success: true, message: 'Area selection started' };
    }

    // Tab and Window modes both use captureVisibleTab
    return captureAndOpenEditor(tabId, mode, bounds);

  } catch (error) {
    console.error('[SnapKap] Screenshot capture failed:', error);
    return { success: false, error: error.message || 'Failed to capture screenshot' };
  }
}

async function captureAndOpenEditor(tabId, mode, bounds) {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: 'png',
      quality: 100
    });

    let finalDataUrl = dataUrl;

    if (mode === 'area' && bounds) {
      await createOffscreenDocument();
      const cropResponse = await chrome.runtime.sendMessage({
        type: 'crop-image',
        target: 'offscreen',
        data: { dataUrl, bounds }
      });
      if (cropResponse?.success && cropResponse.croppedDataUrl) {
        finalDataUrl = cropResponse.croppedDataUrl;
      }
    }

    const screenshotId = `${Date.now()}`;
    await chrome.storage.local.set({ [`screenshot_pending_${screenshotId}`]: finalDataUrl });

    chrome.tabs.create({
      url: chrome.runtime.getURL(`editor/editor.html?id=${screenshotId}&mode=${mode || 'tab'}`)
    });

    return { success: true, openedEditor: true };

  } catch (error) {
    console.error('[SnapKap] Capture failed:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// Area Selector Injection
// ============================================================================

async function injectAreaSelector(tabId) {
  await chrome.scripting.insertCSS({
    target: { tabId },
    files: ['content/area-select.css']
  });

  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content/area-select.js']
  });
}

// ============================================================================
// Offscreen Document
// ============================================================================

async function createOffscreenDocument() {
  if (offscreenDocumentExists) return;

  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen/offscreen.html',
      reasons: ['CLIPBOARD'],
      justification: 'Image cropping and clipboard operations for screenshots'
    });
    offscreenDocumentExists = true;
  } catch (e) {
    if (e.message?.includes('already exists')) {
      offscreenDocumentExists = true;
    } else {
      throw e;
    }
  }
}

// ============================================================================
// Helpers
// ============================================================================

function isValidTabUrl(url) {
  if (!url) return false;
  return !url.startsWith('chrome://') &&
         !url.startsWith('chrome-extension://') &&
         !url.startsWith('about:') &&
         !url.startsWith('edge://') &&
         !url.startsWith('brave://');
}
