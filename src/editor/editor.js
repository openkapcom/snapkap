'use strict';

// ============================================================================
// Background Image Presets
// ============================================================================
const BG_IMAGES = [
  'https://pika.style/backgrounds/1-macos.svg',
  'https://pika.style/backgrounds/5-macos.png',
  'https://pika.style/backgrounds/1-art.jpg',
  'https://pika.style/backgrounds/2-art.jpg',
  'https://pika.style/backgrounds/5-abstract.png',
  'https://pika.style/backgrounds/4-abstract.png',
  'https://pika.style/backgrounds/3-abstract.png',
  'https://pika.style/backgrounds/2-abstract.png',
  'https://pika.style/backgrounds/8-abstract.jpg',
  'https://pika.style/backgrounds/9-abstract.jpg',
  'https://pika.style/backgrounds/maitris/7.png',
  'https://pika.style/backgrounds/maitris/2.png',
  'https://pika.style/backgrounds/maitris/9.png',
  'https://pika.style/backgrounds/maitris/11.png',
  'https://pika.style/backgrounds/maitris/6.png',
  'https://pika.style/backgrounds/maitris/10.png',
  'https://pika.style/backgrounds/14-gradient.png',
  'https://pika.style/backgrounds/6-abstract.jpg',
  'https://pika.style/backgrounds/10-abstract.jpg',
];

const bgImageCache = {};

function preloadBgImages() {
  BG_IMAGES.forEach(url => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => { bgImageCache[url] = img; scheduleRender(); };
  });
}

const GRADIENTS = [
  ['#f2b8ff', '#e9e4fe', 'b'],
  ['#3de5b3', '#fee899', 'b'],
  ['#9fbdd3', '#ebe6e2', 'b'],
  ['#f0e2cf', '#f4d5af', 'b'],
  ['#fbe0ff', '#92b4e9', 'b'],
  ['#01befc', '#fc7efc', 'b'],
  ['#b9fbc0', '#a3c4f3', 'b'],
  ['#adf285', '#5346bf', 'b'],
  ['#f5e7ff', '#ff94be', 'br'],
  ['#799aff', '#e8de90', 'br'],
  ['#925a9e', '#ff9696', 'br'],
  ['#b9fbc0', '#a3c4f3', 'br'],
];

const SOLID_PRESETS = [
  '#ffffff','#f1f5f9','#e2e8f0','#f8fafc',
  '#1e293b','#0f172a','#111827','#000000',
  '#6366f1','#2563eb','#f43f5e','#e91e63',
  '#f59e0b','#ffd700','#10b981','#00bcd4',
];

const DEVICE_FRAMES = [
  {
    id: 'none', name: 'None',
    barHeight: 0, barColor: 'transparent', barColorDark: false,
    dots: false, dotColors: [], bodyBorder: false,
    borderColor: 'transparent', borderRadius: 0, shadow: false,
  },
  {
    id: 'arc', name: 'Arc',
    barHeight: 36, barColor: '#fce4ec', barColorDark: false,
    dots: false, dotColors: [], bodyBorder: true,
    borderColor: '#f8bbd0', borderRadius: 12, shadow: false,
  },
  {
    id: 'stack-light', name: 'Stack Light',
    barHeight: 36, barColor: '#f5f5f5', barColorDark: false,
    dots: false, dotColors: [], bodyBorder: true,
    borderColor: '#e0e0e0', borderRadius: 10, shadow: false,
  },
  {
    id: 'stack-dark', name: 'Stack Dark',
    barHeight: 36, barColor: '#2d2d2d', barColorDark: true,
    dots: false, dotColors: [], bodyBorder: true,
    borderColor: '#444', borderRadius: 10, shadow: false,
  },
  {
    id: 'macos-light', name: 'macOS Light',
    barHeight: 36, barColor: '#e8e8e8', barColorDark: false,
    dots: true, dotColors: ['#ff5f57', '#febc2e', '#28c840'],
    bodyBorder: true, borderColor: '#d1d1d1', borderRadius: 10, shadow: true,
  },
  {
    id: 'macos-dark', name: 'macOS Dark',
    barHeight: 36, barColor: '#2d2d2d', barColorDark: true,
    dots: true, dotColors: ['#ff5f57', '#febc2e', '#28c840'],
    bodyBorder: true, borderColor: '#444', borderRadius: 10, shadow: true,
  },
  {
    id: 'macos-subtle', name: 'macOS Subtle',
    barHeight: 36, barColor: '#fafafa', barColorDark: false,
    dots: true, dotColors: ['#ddd', '#ddd', '#ddd'],
    bodyBorder: true, borderColor: '#e5e5e5', borderRadius: 10, shadow: false,
  },
  {
    id: 'macos-adaptive', name: 'macOS Adapt',
    barHeight: 36, barColor: 'rgba(128,128,128,0.15)', barColorDark: false,
    dots: true, dotColors: ['#ff5f57', '#febc2e', '#28c840'],
    bodyBorder: true, borderColor: 'rgba(128,128,128,0.25)',
    borderRadius: 10, shadow: false, adaptive: true,
  },
  {
    id: 'eclipse', name: 'Eclipse',
    barHeight: 36, barColor: '#1a1a2e', barColorDark: true,
    dots: true, dotColors: ['#ff5f57', '#febc2e', '#28c840'],
    bodyBorder: true, borderColor: '#16213e', borderRadius: 14, shadow: true,
  },
  {
    id: 'silver-back', name: 'Silver Back',
    barHeight: 36, barColor: '#c0c0c0', barColorDark: false,
    dots: true, dotColors: ['#999', '#999', '#999'],
    bodyBorder: true, borderColor: '#aaa', borderRadius: 10, shadow: true,
  },
  {
    id: 'shadow-back', name: 'Shadow Back',
    barHeight: 36, barColor: '#3a3a3a', barColorDark: true,
    dots: true, dotColors: ['#666', '#666', '#666'],
    bodyBorder: true, borderColor: '#555', borderRadius: 10, shadow: true,
  },
  {
    id: 'windows-light', name: 'Windows Light',
    barHeight: 32, barColor: '#f0f0f0', barColorDark: false,
    dots: false, dotColors: [], bodyBorder: true,
    borderColor: '#d4d4d4', borderRadius: 8, shadow: false,
    windowsControls: true,
  },
];

const ANN_COLORS = [
  '#EF4444','#F97316','#EAB308','#22C55E',
  '#06B6D4','#6366F1','#A855F7','#EC4899',
  '#ffffff','#000000',
];

// ============================================================================
// State
// ============================================================================

let srcImage    = null;
let exportCvs   = null;
let dispCvs     = null;
let dispCtx     = null;
let renderScale = 1;
let userZoom    = 1;

const customWallpapers = [];

const CANVAS_PRESETS = [
  { id: 'auto',         label: 'Auto',                    w: 0,    h: 0    },
  { id: 'yt-thumb',     label: 'YouTube Thumbnail',       w: 1280, h: 720  },
  { id: 'tweet',        label: 'Tweet',                   w: 1200, h: 675  },
  { id: 'insta-post',   label: 'Insta Post',              w: 1080, h: 1080 },
  { id: 'insta-story',  label: 'Insta Story',             w: 1080, h: 1920 },
  { id: 'dribbble',     label: 'Dribbble',                w: 1600, h: 1200 },
  { id: 'appstore-65',  label: 'App Store (6.5")',        w: 1284, h: 2778 },
  { id: 'appstore-58',  label: 'App Store (5.8")',        w: 1170, h: 2532 },
  { id: 'appstore-55',  label: 'App Store (5.5")',        w: 1242, h: 2208 },
  { id: 'appstore-47',  label: 'App Store (4.7")',        w: 750,  h: 1334 },
  { id: 'producthunt',  label: 'Product Hunt',            w: 1270, h: 760  },
  { id: 'pinterest',    label: 'Pinterest Pin',           w: 1000, h: 1500 },
  { id: 'linkedin',     label: 'LinkedIn Post',           w: 1200, h: 627  },
  { id: 'chrome-ext',   label: 'Chrome Extension Store',  w: 1280, h: 800  },
  { id: 'adapt',        label: 'Adapt Screenshot',        w: 0,    h: 0    },
  { id: 'og',           label: 'Open Graph',              w: 1200, h: 630  },
  { id: 'square',       label: 'Square (1:1)',            w: 1080, h: 1080 },
  { id: 'wide',         label: 'Wide (16:9)',             w: 1920, h: 1080 },
];

const S = {
  bg: { type: 'image', wpIdx: 0, gradIdx: 0, solidColor: '#1e293b', customWpIdx: -1 },
  canvasPreset: 'auto',
  frame: { padding: 120, radius: 25, shadow: true, inset: 0 },
  deviceFrameIdx: 0,

  annotations:  [],
  history:      [],
  selectedIdx:  -1,
  previewAnn:   null,
  activeTool:   'select',
  activeColor:  ANN_COLORS[0],
  activeWidth:  2,
  numCounter:   1,

  imgRect: { x: 48, y: 48, w: 0, h: 0, scale: 1 },

  isDown:    false,
  downPos:   null,
  penPts:    [],

  pendingText: null,
};

// ============================================================================
// Bootstrap
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  exportCvs = document.createElement('canvas');
  dispCvs   = document.getElementById('display-canvas');
  dispCtx   = dispCvs.getContext('2d');

  preloadBgImages();
  buildImageGrid();
  buildGradientGrid();
  buildSolidSwatches();
  buildDeviceFrameGrid();
  buildColorDots();
  bindCanvasSize();
  bindBgTypeSwitcher();
  bindToolButtons();
  bindStrokeRadios();
  bindSliders();
  bindActions();
  bindKeyboard();
  bindCanvasPointer();
  bindWpUpload();

  await loadScreenshot();
});

// ============================================================================
// Load Screenshot
// ============================================================================
async function loadScreenshot() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) { showLoadError('No screenshot ID in URL.'); return; }

  const key = `screenshot_pending_${id}`;
  chrome.storage.local.get(key, async (result) => {
    const dataUrl = result[key];
    chrome.storage.local.remove(key).catch(() => {});

    if (!dataUrl) { showLoadError('Screenshot data not found.'); return; }

    const img = new Image();
    img.onload = async () => {
      srcImage = img;
      document.getElementById('loading').classList.add('hidden');
      scheduleRender();

      try {
        await copyToClipboard(false);
        showCopiedBanner();
      } catch (_) {}
    };
    img.onerror = () => showLoadError('Failed to decode screenshot.');
    img.src = dataUrl;
  });
}

function showLoadError(msg) {
  document.getElementById('loading').innerHTML =
    `<div class="error-state"><div class="error-icon">!</div><p>${msg}</p></div>`;
}

// ============================================================================
// Render
// ============================================================================
let renderQueued = false;

function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; render(); });
}

function getDeviceFrameBarHeight() {
  const df = DEVICE_FRAMES[S.deviceFrameIdx];
  return (df && df.barHeight) ? df.barHeight : 0;
}

function getCanvasSize() {
  const preset = CANVAS_PRESETS.find(p => p.id === S.canvasPreset) || CANVAS_PRESETS[0];
  const totalPad = S.frame.padding + (S.frame.inset || 0);
  const dfBarH = getDeviceFrameBarHeight();
  const autoW = srcImage.naturalWidth  + totalPad * 2;
  const autoH = srcImage.naturalHeight + totalPad * 2 + dfBarH;

  if (preset.w === 0 && preset.h === 0) return { W: autoW, H: autoH };
  return { W: preset.w, H: preset.h };
}

function render() {
  if (!srcImage) return;

  const { padding, radius, shadow, inset } = S.frame;
  const df = DEVICE_FRAMES[S.deviceFrameIdx] || DEVICE_FRAMES[0];
  const dfBarH = df.barHeight || 0;
  const { W, H } = getCanvasSize();
  exportCvs.width  = W;
  exportCvs.height = H;

  const ctx = exportCvs.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  drawBg(ctx, W, H);

  const preset = CANVAS_PRESETS.find(p => p.id === S.canvasPreset) || CANVAS_PRESETS[0];
  const isFixedSize = preset.w > 0 && preset.h > 0;

  const totalPad = padding + inset;
  let imgX = totalPad, imgY = totalPad + dfBarH;
  let imgW = srcImage.naturalWidth, imgH = srcImage.naturalHeight;

  if (isFixedSize) {
    const availW = W - totalPad * 2;
    const availH = H - totalPad * 2 - dfBarH;
    const scale  = Math.min(availW / srcImage.naturalWidth, availH / srcImage.naturalHeight, 1);
    imgW = Math.round(srcImage.naturalWidth  * scale);
    imgH = Math.round(srcImage.naturalHeight * scale);
    imgX = Math.round((W - imgW) / 2);
    imgY = Math.round((H - imgH) / 2 + dfBarH / 2);
  }

  const frameX = imgX, frameY = imgY - dfBarH;
  const frameW = imgW, frameH = imgH + dfBarH;
  const frameR = df.id !== 'none' ? df.borderRadius : radius;

  ctx.save();
  if (shadow || (df.id !== 'none' && df.shadow)) {
    const blur = Math.max(padding * 0.65, 20);
    ctx.shadowColor   = 'rgba(0,0,0,0.40)';
    ctx.shadowBlur    = blur;
    ctx.shadowOffsetY = Math.max(padding * 0.18, 6);
  }

  if (df.id !== 'none') {
    clipRounded(ctx, frameX, frameY, frameW, frameH, frameR);
    ctx.fillStyle = df.barColor;
    ctx.fillRect(frameX, frameY, frameW, frameH);
  } else {
    clipRounded(ctx, imgX, imgY, imgW, imgH, radius);
  }

  S.imgRect = { x: imgX, y: imgY, w: imgW, h: imgH, scale: isFixedSize ? imgW / srcImage.naturalWidth : 1 };
  ctx.drawImage(srcImage, imgX, imgY, imgW, imgH);
  ctx.restore();

  if (df.id !== 'none') {
    drawDeviceFrame(ctx, frameX, frameY, frameW, frameH, dfBarH, df);
  }

  for (let i = 0; i < S.annotations.length; i++) {
    paintAnn(ctx, S.annotations[i]);
    if (S.activeTool === 'select' && i === S.selectedIdx) {
      paintSelectionOutline(ctx, S.annotations[i]);
    }
  }

  if (S.previewAnn) {
    ctx.save();
    ctx.globalAlpha = 0.80;
    paintAnn(ctx, S.previewAnn);
    ctx.restore();
  }

  blitToDisplay();
}

// ──── Background ────────────────────────────────────────────────────────────

function drawBg(ctx, W, H) {
  const { type, wpIdx, gradIdx, solidColor, customWpIdx } = S.bg;

  if (type === 'solid') {
    ctx.fillStyle = solidColor;
    ctx.fillRect(0, 0, W, H);
    return;
  }

  if (type === 'gradient') {
    const stops = GRADIENTS[gradIdx];
    const dir = stops[2];
    const g = dir === 'br'
      ? ctx.createLinearGradient(0, 0, W, H)
      : ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, stops[0]);
    g.addColorStop(1, stops[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    return;
  }

  if (type === 'image') {
    if (customWpIdx >= 0 && customWallpapers[customWpIdx]?.img) {
      const img = customWallpapers[customWpIdx].img;
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      return;
    }

    const url = BG_IMAGES[wpIdx] || BG_IMAGES[0];
    const img = bgImageCache[url];
    if (img) {
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, W, H);
    }
  }
}

// ──── Device Frame ──────────────────────────────────────────────────────────

function drawDeviceFrame(ctx, fx, fy, fw, fh, barH, df) {
  ctx.save();

  const r = df.borderRadius;
  ctx.beginPath();
  ctx.moveTo(fx + r, fy);
  ctx.lineTo(fx + fw - r, fy);
  ctx.arcTo(fx + fw, fy, fx + fw, fy + r, r);
  ctx.lineTo(fx + fw, fy + barH);
  ctx.lineTo(fx, fy + barH);
  ctx.lineTo(fx, fy + r);
  ctx.arcTo(fx, fy, fx + r, fy, r);
  ctx.closePath();
  ctx.fillStyle = df.barColor;
  ctx.fill();

  ctx.strokeStyle = df.borderColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(fx, fy + barH);
  ctx.lineTo(fx + fw, fy + barH);
  ctx.stroke();

  if (df.dots && df.dotColors.length >= 3) {
    const dotR = 6;
    const dotY = fy + barH / 2;
    const startX = fx + 16;
    const gap = 20;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(startX + i * gap, dotY, dotR, 0, Math.PI * 2);
      ctx.fillStyle = df.dotColors[i];
      ctx.fill();
    }
  }

  if (df.windowsControls) {
    const ctrlY = fy + barH / 2;
    const ctrlW = 14;
    const gap = 2;
    const startX = fx + fw - 16 - (ctrlW * 3 + gap * 2);

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(startX + 3, ctrlY);
    ctx.lineTo(startX + ctrlW - 3, ctrlY);
    ctx.stroke();

    const mx = startX + ctrlW + gap;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mx + 3, ctrlY - 4, ctrlW - 6, 8);

    const cx = mx + ctrlW + gap;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + 3, ctrlY - 4);
    ctx.lineTo(cx + ctrlW - 3, ctrlY + 4);
    ctx.moveTo(cx + ctrlW - 3, ctrlY - 4);
    ctx.lineTo(cx + 3, ctrlY + 4);
    ctx.stroke();
  }

  if (df.bodyBorder) {
    ctx.strokeStyle = df.borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(fx, fy, fw, fh, r);
    ctx.stroke();
  }

  ctx.restore();
}

// ──── Blit to Display ───────────────────────────────────────────────────────

function blitToDisplay() {
  const wrap = document.getElementById('canvas-area');
  const maxW = wrap.clientWidth  - 64;
  const maxH = wrap.clientHeight - 64;
  if (maxW <= 0 || maxH <= 0) return;

  const fitScale = Math.min(maxW / exportCvs.width, maxH / exportCvs.height, 1.5);
  renderScale = fitScale * userZoom;

  dispCvs.width  = Math.round(exportCvs.width  * renderScale);
  dispCvs.height = Math.round(exportCvs.height * renderScale);

  const overflows = dispCvs.width > wrap.clientWidth || dispCvs.height > wrap.clientHeight;
  wrap.style.overflow = overflows ? 'auto' : 'hidden';

  dispCtx.clearRect(0, 0, dispCvs.width, dispCvs.height);
  dispCtx.drawImage(exportCvs, 0, 0, dispCvs.width, dispCvs.height);

  document.getElementById('zoom-lbl').textContent =
    `${Math.round(renderScale * 100)}%`;
}

function zoomBy(delta) {
  const prev = userZoom;
  userZoom = Math.min(5, Math.max(0.25, userZoom + delta));
  if (userZoom !== prev) scheduleRender();
}

function resetZoom() {
  userZoom = 1;
  scheduleRender();
}

// ============================================================================
// Annotation Painters
// ============================================================================

function paintAnn(ctx, ann) {
  ctx.save();
  switch (ann.type) {
    case 'arrow':     paintArrow(ctx, ann);     break;
    case 'text':      paintText(ctx, ann);      break;
    case 'rect':      paintRect(ctx, ann);      break;
    case 'highlight': paintHighlight(ctx, ann); break;
    case 'blur':      paintBlur(ctx, ann);      break;
    case 'pen':       paintPen(ctx, ann);       break;
    case 'number':    paintNumber(ctx, ann);    break;
  }
  ctx.restore();
}

function paintArrow(ctx, { x1, y1, x2, y2, color, width }) {
  const angle   = Math.atan2(y2 - y1, x2 - x1);
  const headLen = Math.max(16, width * 4.5);

  ctx.strokeStyle = color;
  ctx.fillStyle   = color;
  ctx.lineWidth   = width;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(
    x2 - Math.cos(angle) * headLen * 0.52,
    y2 - Math.sin(angle) * headLen * 0.52,
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function paintText(ctx, { x, y, text, color, size }) {
  const fs = size || 22;
  ctx.font         = `700 ${fs}px -apple-system, BlinkMacSystemFont, 'Inter', sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillStyle    = color;
  ctx.shadowColor  = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur   = 5;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  (text || '').split('\n').forEach((line, i) => {
    ctx.fillText(line, x, y + i * (fs * 1.35));
  });
}

function paintRect(ctx, { x, y, w, h, color, width }) {
  const rx = Math.min(x, x + w), ry = Math.min(y, y + h);
  const rw = Math.abs(w),        rh = Math.abs(h);
  ctx.strokeStyle = color;
  ctx.lineWidth   = width;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, 4);
  ctx.stroke();
}

function paintHighlight(ctx, { x, y, w, h, color }) {
  const rx = Math.min(x, x + w), ry = Math.min(y, y + h);
  const rw = Math.abs(w),        rh = Math.abs(h);
  ctx.globalAlpha = 0.38;
  ctx.fillStyle   = color || '#EAB308';
  ctx.fillRect(rx, ry, rw, rh);
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = color || '#EAB308';
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(rx, ry, rw, rh);
  ctx.globalAlpha = 1;
}

function paintBlur(ctx, { x, y, w, h }) {
  if (!srcImage) return;
  const rx = Math.min(x, x + w), ry = Math.min(y, y + h);
  const rw = Math.abs(w),        rh = Math.abs(h);
  if (rw < 2 || rh < 2) return;

  const ir   = S.imgRect;
  const tmp  = new OffscreenCanvas(rw, rh);
  const tc   = tmp.getContext('2d');
  tc.filter  = 'blur(14px)';
  tc.drawImage(srcImage, 0, 0, srcImage.naturalWidth, srcImage.naturalHeight,
    ir.x - rx, ir.y - ry, ir.w, ir.h);

  ctx.save();
  ctx.beginPath();
  ctx.rect(rx, ry, rw, rh);
  ctx.clip();
  ctx.drawImage(tmp, rx, ry);
  ctx.globalAlpha = 0.12;
  ctx.fillStyle   = '#ffffff';
  ctx.fillRect(rx, ry, rw, rh);
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(rx, ry, rw, rh);
}

function paintPen(ctx, { points, color, width }) {
  if (!points || points.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth   = width;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1], q = points[i];
    ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
  }
  ctx.stroke();
}

function paintNumber(ctx, { x, y, color, num }) {
  const r = 16;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  ctx.fillStyle    = '#fff';
  ctx.font         = `bold 13px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(num), x, y + 0.5);
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'alphabetic';
}

function paintSelectionOutline(ctx, ann) {
  const b = annBounds(ann);
  if (!b) return;
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth   = 2;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
  ctx.setLineDash([]);
}

// ──── Helpers ────────────────────────────────────────────────────────────────

function clipRounded(ctx, x, y, w, h, r) {
  const cr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + cr, y);
  ctx.lineTo(x + w - cr, y);
  ctx.arcTo(x + w, y,     x + w, y + cr,     cr);
  ctx.lineTo(x + w, y + h - cr);
  ctx.arcTo(x + w, y + h, x + w - cr, y + h, cr);
  ctx.lineTo(x + cr, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - cr, cr);
  ctx.lineTo(x,     y + cr);
  ctx.arcTo(x,     y,     x + cr, y,          cr);
  ctx.closePath();
  ctx.clip();
}

function annBounds(ann) {
  switch (ann.type) {
    case 'arrow':
      return { x: Math.min(ann.x1,ann.x2), y: Math.min(ann.y1,ann.y2), w: Math.abs(ann.x2-ann.x1), h: Math.abs(ann.y2-ann.y1) };
    case 'text': {
      const lines = (ann.text||'').split('\n');
      const fs    = ann.size || 22;
      return { x: ann.x - 2, y: ann.y - 2, w: 240, h: lines.length * (fs * 1.35) + 8 };
    }
    case 'number':
      return { x: ann.x - 16, y: ann.y - 16, w: 32, h: 32 };
    case 'rect': case 'highlight': case 'blur':
      return { x: Math.min(ann.x, ann.x+ann.w), y: Math.min(ann.y, ann.y+ann.h), w: Math.abs(ann.w), h: Math.abs(ann.h) };
    case 'pen': {
      if (!ann.points?.length) return null;
      const xs = ann.points.map(p=>p.x), ys = ann.points.map(p=>p.y);
      const x  = Math.min(...xs), y = Math.min(...ys);
      return { x, y, w: Math.max(...xs)-x, h: Math.max(...ys)-y };
    }
    default: return null;
  }
}

function hitTest(ann, px, py) {
  const b = annBounds(ann);
  if (!b) return false;
  return px >= b.x-10 && px <= b.x+b.w+10 && py >= b.y-10 && py <= b.y+b.h+10;
}

function toExport(clientX, clientY) {
  const r = dispCvs.getBoundingClientRect();
  return { x: (clientX - r.left) / renderScale, y: (clientY - r.top) / renderScale };
}

function exportToWrap(ex, ey) {
  const area = document.getElementById('canvas-area');
  const areaR = area.getBoundingClientRect();
  const cvR   = dispCvs.getBoundingClientRect();
  return { x: (cvR.left - areaR.left) + ex * renderScale, y: (cvR.top - areaR.top) + ey * renderScale };
}

// ============================================================================
// Canvas Pointer Events
// ============================================================================
let dragAnn    = null;
let dragOrigin = null;

function bindCanvasPointer() {
  dispCvs.addEventListener('mousedown',  onDown);
  dispCvs.addEventListener('mousemove',  onMove);
  dispCvs.addEventListener('mouseup',    onUp);
  dispCvs.addEventListener('mouseleave', onUp);
  dispCvs.addEventListener('dblclick',   onDblClick);

  document.getElementById('canvas-area').addEventListener('wheel', e => {
    if (!(e.metaKey || e.ctrlKey)) return;
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.1 : -0.1);
  }, { passive: false });
  new ResizeObserver(scheduleRender).observe(document.getElementById('canvas-area'));
}

function onDown(e) {
  if (e.button !== 0) return;
  const pos = toExport(e.clientX, e.clientY);
  S.isDown  = true;
  S.downPos = pos;

  if (S.activeTool === 'select') {
    let found = -1;
    for (let i = S.annotations.length - 1; i >= 0; i--) {
      if (hitTest(S.annotations[i], pos.x, pos.y)) { found = i; break; }
    }
    S.selectedIdx = found;
    document.getElementById('sel-sec').style.display = found >= 0 ? '' : 'none';
    if (found >= 0) {
      dragAnn    = S.annotations[found];
      dragOrigin = { px: pos.x, py: pos.y };
    }
    updateShortcutHints();
    scheduleRender();
    return;
  }

  if (S.activeTool === 'text') {
    commitText();
    openTextInput(pos, e.clientX, e.clientY);
    return;
  }

  if (S.activeTool === 'number') {
    pushHistory();
    S.annotations.push({ type:'number', x:pos.x, y:pos.y, color:S.activeColor, num:S.numCounter++ });
    scheduleRender();
    return;
  }

  if (S.activeTool === 'pen') {
    S.penPts = [pos];
  }
}

function onMove(e) {
  if (!S.isDown) return;
  const pos = toExport(e.clientX, e.clientY);

  if (S.activeTool === 'select' && dragAnn) {
    const dx = pos.x - dragOrigin.px, dy = pos.y - dragOrigin.py;
    dragOrigin = { px: pos.x, py: pos.y };
    shiftAnn(dragAnn, dx, dy);
    scheduleRender();
    return;
  }

  if (S.activeTool === 'pen') {
    S.penPts.push(pos);
    S.previewAnn = { type:'pen', points:[...S.penPts], color:S.activeColor, width:S.activeWidth };
    scheduleRender();
    return;
  }

  const { x:sx, y:sy } = S.downPos;
  switch (S.activeTool) {
    case 'arrow':
      S.previewAnn = { type:'arrow', x1:sx, y1:sy, x2:pos.x, y2:pos.y, color:S.activeColor, width:S.activeWidth };
      break;
    case 'rect':
      S.previewAnn = { type:'rect', x:sx, y:sy, w:pos.x-sx, h:pos.y-sy, color:S.activeColor, width:S.activeWidth };
      break;
    case 'highlight':
      S.previewAnn = { type:'highlight', x:sx, y:sy, w:pos.x-sx, h:pos.y-sy, color:S.activeColor };
      break;
    case 'blur':
      S.previewAnn = { type:'blur', x:sx, y:sy, w:pos.x-sx, h:pos.y-sy };
      break;
  }
  scheduleRender();
}

function onUp(e) {
  if (!S.isDown) return;
  S.isDown  = false;
  dragAnn   = null;
  dragOrigin = null;

  if (S.activeTool === 'pen') {
    if (S.penPts.length > 2) {
      pushHistory();
      S.annotations.push({ type:'pen', points:[...S.penPts], color:S.activeColor, width:S.activeWidth });
    }
    S.penPts     = [];
    S.previewAnn = null;
    scheduleRender();
    return;
  }

  if (S.previewAnn) {
    const ann = S.previewAnn;
    S.previewAnn = null;
    if (meetsMinSize(ann)) { pushHistory(); S.annotations.push(ann); }
    scheduleRender();
  }
}

function onDblClick(e) {
  if (S.activeTool !== 'select') return;
  const pos = toExport(e.clientX, e.clientY);
  for (let i = S.annotations.length - 1; i >= 0; i--) {
    if (S.annotations[i].type === 'text' && hitTest(S.annotations[i], pos.x, pos.y)) {
      const ann = S.annotations.splice(i, 1)[0];
      S.selectedIdx = -1;
      openTextInput(pos, e.clientX, e.clientY, ann.text);
      return;
    }
  }
}

function meetsMinSize(ann) {
  if (ann.type === 'arrow') return Math.hypot(ann.x2-ann.x1, ann.y2-ann.y1) > 12;
  if (['rect','highlight','blur'].includes(ann.type)) return Math.abs(ann.w)>6 && Math.abs(ann.h)>6;
  return true;
}

function shiftAnn(ann, dx, dy) {
  switch (ann.type) {
    case 'arrow': ann.x1+=dx; ann.y1+=dy; ann.x2+=dx; ann.y2+=dy; break;
    case 'text': case 'number': ann.x+=dx; ann.y+=dy; break;
    case 'rect': case 'highlight': case 'blur': ann.x+=dx; ann.y+=dy; break;
    case 'pen': ann.points = ann.points.map(p=>({ x:p.x+dx, y:p.y+dy })); break;
  }
}

// ============================================================================
// Text Tool
// ============================================================================
function openTextInput(exportPos, clientX, clientY, existing = '') {
  const inp  = document.getElementById('text-input');
  const wrap = exportToWrap(exportPos.x, exportPos.y);

  inp.style.left     = `${wrap.x}px`;
  inp.style.top      = `${wrap.y}px`;
  inp.style.color    = S.activeColor;
  inp.style.fontSize = `${Math.round(22 * renderScale)}px`;
  inp.style.display  = 'block';
  inp.value          = existing;

  S.pendingText = { x: exportPos.x, y: exportPos.y };

  inp.style.height = 'auto';
  inp.style.height = inp.scrollHeight + 'px';
  inp.focus();
  if (existing) { inp.selectionStart = 0; inp.selectionEnd = existing.length; }

  inp.oninput   = () => { inp.style.height='auto'; inp.style.height=inp.scrollHeight+'px'; };
  inp.onkeydown = (ev) => {
    if (ev.key === 'Escape')                   { cancelText(); return; }
    if (ev.key === 'Enter' && !ev.shiftKey)    { ev.preventDefault(); commitText(); }
  };
  inp.onblur = () => setTimeout(commitText, 80);
}

function commitText() {
  const inp = document.getElementById('text-input');
  if (!S.pendingText || inp.style.display === 'none') return;
  const text = inp.value.trim();
  if (text) {
    pushHistory();
    S.annotations.push({ type:'text', x:S.pendingText.x, y:S.pendingText.y, text, color:S.activeColor, size:22 });
  }
  cancelText();
  scheduleRender();
}

function cancelText() {
  const inp = document.getElementById('text-input');
  inp.style.display = 'none';
  inp.value = '';
  S.pendingText = null;
}

// ============================================================================
// History
// ============================================================================
function snapshot() {
  return {
    annotations: JSON.parse(JSON.stringify(S.annotations)),
    frame:        { ...S.frame, inset: S.frame.inset || 0 },
    bg:           { ...S.bg },
    numCounter:   S.numCounter,
    deviceFrameIdx: S.deviceFrameIdx,
  };
}

function pushHistory() {
  S.history.push(snapshot());
  if (S.history.length > 80) S.history.shift();
  syncUndoBtn();
}

function undo() {
  if (!S.history.length) return;
  const prev       = S.history.pop();
  S.annotations    = prev.annotations;
  S.frame          = prev.frame;
  S.bg             = prev.bg;
  S.numCounter     = prev.numCounter;
  S.deviceFrameIdx = prev.deviceFrameIdx ?? 0;
  S.selectedIdx  = -1;
  S.previewAnn   = null;
  syncUndoBtn();
  syncUIToState();
  updateShortcutHints();
  scheduleRender();
}

function syncUndoBtn() {
  const undoBtn = document.getElementById('btn-undo');
  if (undoBtn) undoBtn.disabled = S.history.length === 0;
}

function syncUIToState() {
  const slPad = document.getElementById('sl-pad');
  slPad.value = S.frame.padding;
  document.getElementById('val-pad').textContent = S.frame.padding;

  const slRad = document.getElementById('sl-rad');
  slRad.value = S.frame.radius;
  document.getElementById('val-rad').textContent = S.frame.radius;

  const slInset = document.getElementById('sl-inset');
  if (slInset) {
    slInset.value = S.frame.inset || 0;
    document.getElementById('val-inset').textContent = S.frame.inset || 0;
  }

  document.getElementById('tog-shadow').checked = S.frame.shadow;

  const radio = document.querySelector(`input[name="bg-type"][value="${S.bg.type}"]`);
  if (radio) radio.checked = true;
  showBgPane(S.bg.type);

  if (S.bg.type === 'image') {
    document.querySelectorAll('.wp-thumb').forEach(el => el.classList.remove('active'));
    if (S.bg.customWpIdx >= 0) {
      const customThumbs = document.querySelectorAll('.wp-custom-thumb');
      if (customThumbs[S.bg.customWpIdx]) customThumbs[S.bg.customWpIdx].classList.add('active');
    } else {
      const presetThumbs = document.querySelectorAll('.wp-thumb:not(.wp-custom-thumb)');
      if (presetThumbs[S.bg.wpIdx]) presetThumbs[S.bg.wpIdx].classList.add('active');
    }
  } else if (S.bg.type === 'gradient') {
    document.querySelectorAll('.grad-swatch').forEach((el, i) => {
      el.classList.toggle('active', i === S.bg.gradIdx);
    });
  } else if (S.bg.type === 'solid') {
    document.querySelectorAll('.solid-dot').forEach(el => {
      el.classList.toggle('active', el.dataset.color === S.bg.solidColor);
    });
    document.getElementById('solid-custom').value = S.bg.solidColor;
  }

  document.querySelectorAll('.df-thumb').forEach((el, i) => {
    el.classList.toggle('active', i === S.deviceFrameIdx);
  });

  document.getElementById('sel-sec').style.display = 'none';
}

// ============================================================================
// UI Builders
// ============================================================================

function buildImageGrid() {
  const grid = document.getElementById('wallpaper-grid');
  BG_IMAGES.forEach((url, i) => {
    const el = document.createElement('div');
    el.className = 'wp-thumb' + (i === 0 ? ' active' : '');
    el.style.backgroundImage = `url(${url})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.title = `Image ${i + 1}`;
    el.addEventListener('click', () => {
      pushHistory();
      S.bg = { ...S.bg, type:'image', wpIdx:i, customWpIdx:-1 };
      grid.querySelectorAll('.wp-thumb').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.wp-custom-thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      scheduleRender();
    });
    grid.appendChild(el);
  });
}

function addCustomWallpaperThumb(dataUrl, img) {
  const idx  = customWallpapers.length;
  customWallpapers.push({ dataUrl, img });

  const grid = document.getElementById('wallpaper-grid');
  const el   = document.createElement('div');
  el.className = 'wp-thumb wp-custom-thumb';
  el.style.backgroundImage  = `url(${dataUrl})`;
  el.style.backgroundSize   = 'cover';
  el.style.backgroundPosition = 'center';
  el.title = `Custom ${idx + 1}`;
  el.dataset.customIdx = idx;

  const delBtn = document.createElement('button');
  delBtn.className = 'wp-del-btn';
  delBtn.innerHTML = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (S.bg.customWpIdx === idx) {
      pushHistory();
      S.bg = { ...S.bg, wpIdx: 0, customWpIdx: -1 };
      const firstPreset = grid.querySelector('.wp-thumb:not(.wp-custom-thumb)');
      document.querySelectorAll('.wp-thumb').forEach(t => t.classList.remove('active'));
      if (firstPreset) firstPreset.classList.add('active');
      scheduleRender();
    }
    customWallpapers[idx] = null;
    el.remove();
  });
  el.appendChild(delBtn);

  el.addEventListener('click', () => {
    pushHistory();
    S.bg = { ...S.bg, type:'image', customWpIdx:idx };
    document.querySelectorAll('.wp-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    scheduleRender();
  });

  grid.appendChild(el);
  el.click();
}

function buildGradientGrid() {
  const grid = document.getElementById('grad-grid');
  GRADIENTS.forEach((g, i) => {
    const cssDir = g[2] === 'br' ? '135deg' : '180deg';
    const el = document.createElement('div');
    el.className = 'grad-swatch';
    el.style.background = `linear-gradient(${cssDir}, ${g[0]}, ${g[1]})`;
    el.title = `${g[0]} > ${g[1]}`;
    el.addEventListener('click', () => {
      pushHistory();
      S.bg = { ...S.bg, type:'gradient', gradIdx:i };
      grid.querySelectorAll('.grad-swatch').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      scheduleRender();
    });
    grid.appendChild(el);
  });
  grid.children[0]?.classList.add('active');
}

function buildSolidSwatches() {
  const row = document.getElementById('solid-swatches');
  SOLID_PRESETS.forEach(color => {
    const el = document.createElement('div');
    el.className   = 'solid-dot' + (isLightColor(color) ? ' light-border' : '');
    el.style.background = color;
    el.dataset.color    = color;
    el.title = color;
    el.addEventListener('click', () => {
      pushHistory();
      S.bg = { ...S.bg, type:'solid', solidColor:color };
      row.querySelectorAll('.solid-dot').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      scheduleRender();
    });
    row.appendChild(el);
  });
  row.children[0]?.classList.add('active');

  document.getElementById('solid-custom').addEventListener('input', (e) => {
    pushHistory();
    S.bg = { ...S.bg, type:'solid', solidColor:e.target.value };
    row.querySelectorAll('.solid-dot').forEach(s => s.classList.remove('active'));
    scheduleRender();
  });
}

function buildDeviceFrameGrid() {
  const grid = document.getElementById('device-frame-grid');
  DEVICE_FRAMES.forEach((df, i) => {
    const el = document.createElement('div');
    el.className = 'df-thumb' + (i === 0 ? ' active' : '');
    el.title = df.name;

    if (df.id === 'none') {
      const inner = document.createElement('div');
      inner.className = 'df-thumb-inner';
      inner.style.cssText = 'background:#fff;border:1px solid #e0e0e0;border-radius:3px;width:80%;height:60%;';
      el.appendChild(inner);
    } else {
      const inner = document.createElement('div');
      inner.className = 'df-thumb-inner';
      inner.style.cssText = `border:1px solid ${df.borderColor};border-radius:${Math.min(df.borderRadius, 5)}px;overflow:hidden;display:flex;flex-direction:column;width:80%;height:60%;`;

      const bar = document.createElement('div');
      bar.className = 'df-thumb-bar';
      bar.style.background = df.barColor;
      bar.style.minHeight = '6px';

      if (df.dots) {
        df.dotColors.forEach(c => {
          const dot = document.createElement('span');
          dot.className = 'dot';
          dot.style.background = c;
          bar.appendChild(dot);
        });
      }

      if (df.windowsControls) {
        bar.style.justifyContent = 'flex-end';
        bar.style.gap = '2px';
        ['#bbb','#bbb','#bbb'].forEach(c => {
          const ctrl = document.createElement('span');
          ctrl.style.cssText = `width:4px;height:3px;background:${c};border-radius:0.5px;`;
          bar.appendChild(ctrl);
        });
      }

      const body = document.createElement('div');
      body.className = 'df-thumb-body';
      inner.appendChild(bar);
      inner.appendChild(body);
      el.appendChild(inner);
    }

    const label = document.createElement('div');
    label.className = 'df-label';
    label.textContent = df.name;
    el.appendChild(label);

    el.addEventListener('click', () => {
      pushHistory();
      S.deviceFrameIdx = i;
      grid.querySelectorAll('.df-thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      scheduleRender();
    });
    grid.appendChild(el);
  });
}

function buildColorDots() {
  const row = document.getElementById('ann-color-row');
  ANN_COLORS.forEach((color, i) => {
    const el = document.createElement('div');
    el.className = 'color-dot' + (i === 0 ? ' active' : '');
    el.style.background = color;
    if (isLightColor(color)) el.style.boxShadow = 'inset 0 0 0 1px #e5e7eb';
    el.title = color;
    el.addEventListener('click', () => {
      S.activeColor = color;
      row.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      el.classList.add('active');
    });
    row.appendChild(el);
  });
}

function isLightColor(hex) {
  try {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
  } catch { return false; }
}

function bindCanvasSize() {
  const select = document.getElementById('canvas-size-select');
  select.addEventListener('change', () => {
    pushHistory();
    S.canvasPreset = select.value;
    updateCanvasSizeLabel();
    scheduleRender();
  });
}

function updateCanvasSizeLabel() {
  const preset = CANVAS_PRESETS.find(p => p.id === S.canvasPreset);
  const lbl = document.getElementById('canvas-size-info');
  if (!preset || preset.w === 0) {
    lbl.textContent = '';
  } else {
    lbl.textContent = `${preset.w} x ${preset.h}`;
  }
}

function bindBgTypeSwitcher() {
  document.querySelectorAll('input[name="bg-type"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      pushHistory();
      S.bg = { ...S.bg, type: radio.value };
      showBgPane(radio.value);
      scheduleRender();
    });
  });
}

function showBgPane(type) {
  document.getElementById('bg-pane-wallpaper').style.display = type === 'image' ? '' : 'none';
  document.getElementById('bg-pane-gradient').style.display  = type === 'gradient'  ? '' : 'none';
  document.getElementById('bg-pane-solid').style.display     = type === 'solid'     ? '' : 'none';
}

function bindWpUpload() {
  const btn  = document.getElementById('wp-upload-btn');
  const file = document.getElementById('wp-file');
  btn.addEventListener('click', () => file.click());
  file.addEventListener('change', () => {
    const f = file.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => addCustomWallpaperThumb(ev.target.result, img);
      img.src = ev.target.result;
    };
    reader.readAsDataURL(f);
    file.value = '';
  });
}

function bindToolButtons() {
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      S.activeTool  = tool;
      S.selectedIdx = -1;
      S.previewAnn  = null;
      cancelText();

      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const drawingTools = ['arrow','text','rect','highlight','blur','pen','number'];
      document.getElementById('ann-style').style.display = drawingTools.includes(tool) ? '' : 'none';

      const cursors = { select:'cur-select', text:'cur-text' };
      dispCvs.className = cursors[tool] || '';

      document.getElementById('sel-sec').style.display = 'none';
      updateShortcutHints();
      scheduleRender();
    });
  });
}

function bindStrokeRadios() {
  document.querySelectorAll('input[name="stroke-w"]').forEach(r => {
    r.addEventListener('change', () => { if (r.checked) S.activeWidth = parseInt(r.value); });
  });
}

let sliderDragging = false;

function bindSliders() {
  const slPad   = document.getElementById('sl-pad');
  const slRad   = document.getElementById('sl-rad');
  const slInset = document.getElementById('sl-inset');
  const togShad = document.getElementById('tog-shadow');
  const delBtn  = document.getElementById('del-btn');

  const sliders = [slPad, slRad, slInset].filter(Boolean);
  for (const sl of sliders) {
    sl.addEventListener('pointerdown', () => {
      if (!sliderDragging) { sliderDragging = true; pushHistory(); }
    });
    sl.addEventListener('pointerup',   () => { sliderDragging = false; });
    sl.addEventListener('pointercancel', () => { sliderDragging = false; });
  }

  slPad.addEventListener('input', () => {
    S.frame.padding = parseInt(slPad.value);
    document.getElementById('val-pad').textContent = slPad.value;
    scheduleRender();
  });

  slRad.addEventListener('input', () => {
    S.frame.radius = parseInt(slRad.value);
    document.getElementById('val-rad').textContent = slRad.value;
    scheduleRender();
  });

  if (slInset) {
    slInset.addEventListener('input', () => {
      S.frame.inset = parseInt(slInset.value);
      document.getElementById('val-inset').textContent = slInset.value;
      scheduleRender();
    });
  }

  togShad.addEventListener('change', () => {
    pushHistory();
    S.frame.shadow = togShad.checked;
    scheduleRender();
  });

  delBtn.addEventListener('click', deleteSelected);
}

function bindActions() {
  document.getElementById('btn-undo').addEventListener('click', undo);

  // Zoom controls
  document.getElementById('zoom-in').addEventListener('click', () => zoomBy(0.1));
  document.getElementById('zoom-out').addEventListener('click', () => zoomBy(-0.1));
  document.getElementById('zoom-lbl').addEventListener('click', resetZoom);
  document.getElementById('zoom-fit')?.addEventListener('click', resetZoom);

  // Bottom bar buttons
  document.getElementById('btn-copy').addEventListener('click', async () => {
    try {
      await copyToClipboard(true);
      showCopiedBanner();
    } catch (e) {
      toast('Copy failed: ' + e.message);
    }
  });

  document.getElementById('btn-dl').addEventListener('click', () => {
    downloadPng();
    toast('Downloading...');
  });

}

const TOOL_KEYS = { v:'select', a:'arrow', t:'text', r:'rect', h:'highlight', b:'blur', p:'pen', n:'number' };
const TOOL_KEY_LABELS = { select:'V', arrow:'A', text:'T', rect:'R', highlight:'H', blur:'B', pen:'P', number:'N' };
const isMac = navigator.platform.includes('Mac');
const MOD   = isMac ? '\u2318' : 'Ctrl';

function bindKeyboard() {
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;

    const mod = e.metaKey || e.ctrlKey;

    if (mod && (e.key === '=' || e.key === '+')) { e.preventDefault(); zoomBy(0.1); return; }
    if (mod && e.key === '-')                    { e.preventDefault(); zoomBy(-0.1); return; }
    if (mod && e.key === '0')                    { e.preventDefault(); resetZoom(); return; }
    if (mod && e.key === 'z') { e.preventDefault(); undo(); return; }
    if (mod && e.key === 'c') { e.preventDefault(); copyToClipboard(true).then(() => showCopiedBanner()).catch(()=>{}); return; }
    if (mod && e.key === 'd') { e.preventDefault(); downloadPng(); toast('Downloading...'); return; }

    if (e.key === 'Escape')   { S.selectedIdx=-1; cancelText(); document.getElementById('sel-sec').style.display='none'; updateShortcutHints(); scheduleRender(); return; }
    if ((e.key==='Delete'||e.key==='Backspace') && S.selectedIdx>=0) { deleteSelected(); return; }

    if (!mod && TOOL_KEYS[e.key.toLowerCase()]) {
      document.querySelector(`[data-tool="${TOOL_KEYS[e.key.toLowerCase()]}"]`)?.click();
    }
  });

  updateShortcutHints();
}

function updateShortcutHints() {
  // Inline hints — just the current tool
  const el = document.getElementById('shortcut-hints');
  if (el) {
    const toolKey = TOOL_KEY_LABELS[S.activeTool];
    const hints = [];
    if (toolKey) {
      hints.push(`<span class="kbd-group" style="cursor:default"><span class="kbd">${toolKey}</span>${capitalize(S.activeTool)}</span>`);
    }
    if (S.selectedIdx >= 0) {
      hints.push(`<span class="kbd-group" style="cursor:default"><span class="kbd">${isMac ? '\u232B' : 'Del'}</span>Delete</span>`);
    }
    el.innerHTML = hints.join('');
  }

  // Full shortcuts tooltip
  const tip = document.getElementById('shortcuts-tooltip');
  if (tip) {
    const rows = [
      ['V', 'Select'], ['A', 'Arrow'], ['T', 'Text'], ['R', 'Box'],
      ['H', 'Mark'], ['B', 'Blur'], ['P', 'Pen'], ['N', 'Step'],
      [`${MOD}Z`, 'Undo'], [`${MOD}C`, 'Copy'], [`${MOD}D`, 'Download'],
      [`${MOD}+`, 'Zoom in'], [`${MOD}-`, 'Zoom out'], [`${MOD}0`, 'Reset zoom'],
      ['Esc', 'Deselect'],
    ];
    tip.innerHTML = rows.map(([k, v]) =>
      `<div class="tt-row"><span>${v}</span><span class="tt-key">${k}</span></div>`
    ).join('');
  }
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function deleteSelected() {
  if (S.selectedIdx < 0) return;
  pushHistory();
  S.annotations.splice(S.selectedIdx, 1);
  S.selectedIdx = -1;
  document.getElementById('sel-sec').style.display = 'none';
  updateShortcutHints();
  scheduleRender();
}

// ============================================================================
// Export
// ============================================================================
function renderCleanExport() {
  if (!srcImage) return;

  const { padding, radius, shadow, inset } = S.frame;
  const df = DEVICE_FRAMES[S.deviceFrameIdx] || DEVICE_FRAMES[0];
  const dfBarH = df.barHeight || 0;
  const { W, H } = getCanvasSize();
  exportCvs.width  = W;
  exportCvs.height = H;

  const ctx = exportCvs.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  drawBg(ctx, W, H);

  const preset = CANVAS_PRESETS.find(p => p.id === S.canvasPreset) || CANVAS_PRESETS[0];
  const isFixedSize = preset.w > 0 && preset.h > 0;

  const totalPad = padding + inset;
  let imgX = totalPad, imgY = totalPad + dfBarH;
  let imgW = srcImage.naturalWidth, imgH = srcImage.naturalHeight;

  if (isFixedSize) {
    const availW = W - totalPad * 2;
    const availH = H - totalPad * 2 - dfBarH;
    const scale  = Math.min(availW / srcImage.naturalWidth, availH / srcImage.naturalHeight, 1);
    imgW = Math.round(srcImage.naturalWidth  * scale);
    imgH = Math.round(srcImage.naturalHeight * scale);
    imgX = Math.round((W - imgW) / 2);
    imgY = Math.round((H - imgH) / 2 + dfBarH / 2);
  }

  const frameX = imgX, frameY = imgY - dfBarH;
  const frameW = imgW, frameH = imgH + dfBarH;
  const frameR = df.id !== 'none' ? df.borderRadius : radius;

  ctx.save();
  if (shadow || (df.id !== 'none' && df.shadow)) {
    const blur = Math.max(padding * 0.65, 20);
    ctx.shadowColor   = 'rgba(0,0,0,0.40)';
    ctx.shadowBlur    = blur;
    ctx.shadowOffsetY = Math.max(padding * 0.18, 6);
  }

  if (df.id !== 'none') {
    clipRounded(ctx, frameX, frameY, frameW, frameH, frameR);
    ctx.fillStyle = df.barColor;
    ctx.fillRect(frameX, frameY, frameW, frameH);
  } else {
    clipRounded(ctx, imgX, imgY, imgW, imgH, radius);
  }

  ctx.drawImage(srcImage, imgX, imgY, imgW, imgH);
  ctx.restore();

  if (df.id !== 'none') {
    drawDeviceFrame(ctx, frameX, frameY, frameW, frameH, dfBarH, df);
  }

  for (const ann of S.annotations) paintAnn(ctx, ann);
}

async function getBlob() {
  renderCleanExport();
  return new Promise(resolve => exportCvs.toBlob(resolve, 'image/png'));
}

async function copyToClipboard(showToastMsg = true) {
  const blob = await getBlob();
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  scheduleRender();
}

function downloadPng() {
  renderCleanExport();
  const a    = document.createElement('a');
  a.href     = exportCvs.toDataURL('image/png');
  a.download = `snapkap-${Date.now()}.png`;
  a.click();
  scheduleRender();
}

// ============================================================================
// Notifications
// ============================================================================

function showCopiedBanner() {
  const el = document.getElementById('copied-banner');
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3600);
}

let toastTimer = null;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}
