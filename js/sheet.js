/* Google Sheet connection (currently off). If CONFIG.sheetUrl is empty, nothing is sent. */
window.Sheet = {
  enabled() { return !!(window.CONFIG && window.CONFIG.sheetUrl); },
  send(sale) {
    if (!this.enabled()) return Promise.resolve(false);
    return fetch(window.CONFIG.sheetUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(sale) })
      .then(() => true).catch(() => false);
  }
};
