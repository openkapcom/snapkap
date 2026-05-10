'use strict';

document.getElementById('btn-area').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !isValidTabUrl(tab.url)) return;

  await chrome.runtime.sendMessage({ action: 'captureScreenshot', mode: 'area', tabId: tab.id });
  window.close();
});

document.getElementById('btn-tab').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !isValidTabUrl(tab.url)) return;

  await chrome.runtime.sendMessage({ action: 'captureScreenshot', mode: 'tab', tabId: tab.id });
  window.close();
});

document.getElementById('btn-screen').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !isValidTabUrl(tab.url)) return;

  await chrome.runtime.sendMessage({ action: 'captureScreenshot', mode: 'window', tabId: tab.id });
  window.close();
});

function isValidTabUrl(url) {
  if (!url) return false;
  return !url.startsWith('chrome://') &&
         !url.startsWith('chrome-extension://') &&
         !url.startsWith('about:') &&
         !url.startsWith('edge://') &&
         !url.startsWith('brave://');
}
