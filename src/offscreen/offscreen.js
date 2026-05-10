'use strict';

// ============================================================================
// SnapKap Offscreen Document — Image Cropping & Clipboard
// ============================================================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') return false;

  if (message.type === 'crop-image') {
    cropImage(message.data).then(sendResponse);
    return true;
  }

  if (message.type === 'copy-to-clipboard') {
    copyToClipboard(message.data).then(sendResponse);
    return true;
  }
});

async function cropImage(data) {
  const { dataUrl, bounds } = data;
  if (!dataUrl || !bounds) {
    return { success: false, error: 'Missing dataUrl or bounds' };
  }

  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const dpr = bounds.devicePixelRatio || 1;
        const scaledX = Math.round(bounds.x * dpr);
        const scaledY = Math.round(bounds.y * dpr);
        const scaledWidth = Math.round(bounds.width * dpr);
        const scaledHeight = Math.round(bounds.height * dpr);

        const cropX = Math.max(0, Math.min(scaledX, img.width - 1));
        const cropY = Math.max(0, Math.min(scaledY, img.height - 1));
        const cropWidth = Math.min(scaledWidth, img.width - cropX);
        const cropHeight = Math.min(scaledHeight, img.height - cropY);

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const croppedDataUrl = canvas.toDataURL('image/png');
        resolve({ success: true, croppedDataUrl });
      } catch (err) {
        resolve({ success: false, error: err.message });
      }
    };

    img.onerror = () => resolve({ success: false, error: 'Failed to load image' });
    img.src = dataUrl;
  });
}

async function copyToClipboard(data) {
  const { dataUrl } = data;
  if (!dataUrl) return { success: false, error: 'Missing dataUrl' };

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    let pngBlob = blob;
    if (blob.type !== 'image/png') {
      const img = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': pngBlob })
    ]);

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
