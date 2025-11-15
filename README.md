# Anti-3lo2ya Chrome Extension

A lightweight, high-performance Chrome extension that automatically switches to an existing LinkedIn tab when the user opens a new tab.  
If no LinkedIn tab exists, the extension opens LinkedIn instantly.

## 🚀 Features
- Detects existing LinkedIn tabs using fast URL-pattern matching.
- Automatically activates and focuses the LinkedIn tab.
- If LinkedIn is not open, it opens a new LinkedIn feed tab.
- Zero CPU cost while idle (MV3 service worker).
- No unnecessary memory usage.

## 🛠 How It Works
Whenever the user opens a new tab, the extension:
1. Searches for any tab containing “linkedin.com”.
2. If found → focuses that tab.
3. If not → opens a new LinkedIn feed tab.

This is done using Chrome's event-driven API for maximum performance.

## 📦 Install (Developer Mode)
1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the folder

## 📝 License
This project is licensed under the MIT License.
