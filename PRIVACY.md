# Privacy Policy

**Last updated:** May 10, 2026

## The short version

- We collect zero personal data
- Screenshots never leave your device
- No analytics, tracking, or telemetry
- No accounts or sign-ups required
- No data is sold, shared, or transmitted to anyone
- Fully open source — verify it yourself

## Introduction

SnapKap is a browser extension for capturing and editing screenshots. It is built by the team behind OpenKap. This privacy policy explains what data SnapKap accesses, how it is used, and what is stored.

The answer to most of those questions is: nothing. SnapKap is designed to work entirely on your device with no server communication whatsoever.

## Data Collection

**SnapKap does not collect any data.** Specifically:

- No personal information (name, email, address, phone number)
- No browsing history or page URLs
- No screenshots or images
- No usage analytics or telemetry
- No cookies or tracking pixels
- No device fingerprinting
- No crash reports

## How Screenshots Are Processed

When you capture a screenshot, the following happens entirely on your machine:

1. The browser captures the visible tab content using the Chrome `captureVisibleTab` API.
2. If you selected an area, the image is cropped locally in an offscreen document using a Canvas element.
3. The screenshot data URL is temporarily stored in `chrome.storage.local` so the editor tab can load it.
4. The editor tab reads the screenshot, displays it on a Canvas, and deletes the stored data immediately.
5. When you copy or download, the final image is rendered locally and either written to your clipboard or saved to your downloads folder.

At no point during this process is any data sent to a server, API, or third party. Everything happens within your browser.

## Chrome Permissions

SnapKap requests the following permissions, each for a specific purpose:

| Permission | Why it's needed |
|---|---|
| `activeTab` | To capture the visible content of the current tab when you click a capture button. Only activated by your explicit action. |
| `tabs` | To check the current tab's URL before capturing. This prevents capture attempts on restricted pages (chrome://, about:, etc.). Tab URLs are not stored or transmitted. |
| `scripting` | To inject the area selection overlay when you choose Area capture. The injected script only creates a visual drag-to-select interface. It does not read or modify any page content. |
| `storage` | To temporarily hold the captured screenshot so the editor tab can load it. The data is deleted immediately after loading. Nothing is stored persistently. |
| `clipboardWrite` | To copy the finished screenshot to your clipboard when you click Copy or press Cmd+C. |
| `offscreen` | To create a hidden document for image cropping (area captures) and clipboard operations that require DOM access. |
| `host_permissions` | To allow the area selection overlay to be injected on any webpage. Without this, area capture would only work on specific sites. |

## External Resources

The editor loads two types of external resources, neither of which involves any data collection:

- **Google Fonts** — The Inter typeface is loaded from `fonts.googleapis.com` for the editor interface. Google's font API does not use cookies for tracking. See [Google Fonts Privacy FAQ](https://developers.google.com/fonts/faq/privacy).
- **Background images** — Decorative wallpaper images are loaded from `pika.style` as static image files (PNG, JPG, SVG). These are purely visual assets. No user data is sent with these requests.

No other external requests are made. The extension does not communicate with any server, API, or analytics service.

## Data Storage

SnapKap uses `chrome.storage.local` for one purpose: temporarily passing the captured screenshot from the background process to the editor tab. This data:

- Is a base64-encoded image (the screenshot you just captured)
- Is stored only for the few seconds between capture and the editor loading
- Is deleted automatically as soon as the editor reads it
- Never leaves your device

No preferences, settings, history, or any other data is persisted.

## Third-Party Services

SnapKap does not integrate with or send data to any third-party service. There is no:

- Google Analytics or any analytics platform
- Error reporting service (Sentry, Bugsnag, etc.)
- Cloud storage (AWS, Firebase, etc.)
- Authentication provider
- Advertising network
- Social media integration

## Children's Privacy

SnapKap does not collect any data from any user, including children. Since no personal information is collected, there are no special concerns regarding children's privacy under COPPA or similar regulations.

## Changes to This Policy

If we ever change how SnapKap handles data, we will update this privacy policy and the "Last updated" date at the top. Since SnapKap is open source, any changes to the codebase that affect privacy can be independently verified through the public repository.

## Open Source

SnapKap is fully open source. You can review the complete source code, verify every permission usage, and confirm that no data is collected or transmitted:

[github.com/openkapcom/snapkap](https://github.com/openkapcom/snapkap)

## Contact

If you have questions about this privacy policy or the extension:

- GitHub Issues: [github.com/openkapcom/snapkap/issues](https://github.com/openkapcom/snapkap/issues)
