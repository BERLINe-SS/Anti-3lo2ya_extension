// background.js (optimized MV3 service worker)

const LN = "https://www.linkedin.com/feed/";
const PATTERNS = ["*://*.linkedin.com/*", "*://linkedin.com/*"];

// tiny promisified wrappers for chrome callbacks
const qTabs = (q) => new Promise((res) => chrome.tabs.query(q, res));
const updTab = (id, info) => new Promise((res) => chrome.tabs.update(id, info, res));
const createTab = (info) => new Promise((res) => chrome.tabs.create(info, res));
const focusWin = (id) => new Promise((res) => chrome.windows.update(id, { focused: true }, res));

let processing = false;

chrome.tabs.onCreated.addListener((createdTab) => {
  // Fire-and-forget async handler
  void (async () => {
    if (processing) return;
    processing = true;

    try {
      // Fast native pattern query (Chrome does the heavy lifting)
      const lnTabs = await qTabs({ url: PATTERNS });

      if (lnTabs && lnTabs.length > 0) {
        // Activate the first matched LinkedIn tab and focus its window
        const t = lnTabs[0];
        await updTab(t.id, { active: true });
        await focusWin(t.windowId);
      } else {
        // No LinkedIn open → create one in same window (if available) and focus it
        const opts = { url: LN, active: true };
        if (createdTab && typeof createdTab.windowId !== "undefined") opts.windowId = createdTab.windowId;
        const newT = await createTab(opts);
        await focusWin(newT.windowId);
      }
    } catch (err) {
      // keep error logging for debugging; remove if you want silent fail
      console.error("LinkedIn redirector error:", err);
    } finally {
      processing = false;
    }
  })();
});
