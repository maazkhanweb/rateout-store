/* Data layer: saved in the browser (localStorage) for now. */
(function () {
  const PK = "rateout_products_v1", SK = "rateout_sales_v1";
  const seed = [
    { id: "p1", name: "Charcoal Boxy Tee", category: "Oversized", price: 1800, stock: 24, sizes: ["M","L","XL"], color: "#2B2622", desc: "Heavy cotton, boxy fit, soft inside.", image: "" },
    { id: "p2", name: "Teal Essential Tee", category: "T-Shirt", price: 1500, stock: 30, sizes: ["S","M","L","XL"], color: "#0E5E57", desc: "Deep teal everyday tee.", image: "" },
    { id: "p3", name: "Tangerine Polo", category: "Polo", price: 2200, stock: 15, sizes: ["M","L","XL"], color: "#F4691F", desc: "Pique polo with a clean collar.", image: "" },
    { id: "p4", name: "Clay Cloud Hoodie", category: "Hoodie", price: 3800, stock: 12, sizes: ["M","L","XL","XXL"], color: "#B9705A", desc: "Fleece hoodie, warm and relaxed.", image: "" },
    { id: "p5", name: "Ivory Basic Tee", category: "T-Shirt", price: 1300, stock: 40, sizes: ["S","M","L","XL","XXL"], color: "#EFEAE0", desc: "Plain ivory, goes with everything.", image: "" },
    { id: "p6", name: "Olive Oversize Tee", category: "Oversized", price: 2000, stock: 18, sizes: ["M","L","XL"], color: "#5B6B3A", desc: "Olive drop-shoulder tee.", image: "" },
    { id: "p7", name: "Sand Dune Polo", category: "Polo", price: 2100, stock: 10, sizes: ["M","L"], color: "#D8B98A", desc: "Soft sand polo, summer ready.", image: "" },
    { id: "p8", name: "Black Zip Hoodie", category: "Hoodie", price: 4200, stock: 8, sizes: ["L","XL"], color: "#26231F", desc: "Zip-up hoodie, thick fleece.", image: "" }
  ];
  const read = (k, fb) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch (e) { return fb; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { alert("Storage is full. Please use a smaller image."); return false; } };

  const Store = {
    products() { let p = read(PK, null); if (!p) { p = seed; write(PK, p); } return p; },
    saveProducts(p) { return write(PK, p); },
    sales() { return read(SK, []); },
    saveSales(s) { return write(SK, s); },
    uid() { return "id" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },
    money(n) { return (window.CONFIG.currency + " " + Number(n || 0).toLocaleString("en-PK")); },
    esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); },
    shade(hex, amt) {
      const n = parseInt(hex.replace("#", ""), 16);
      const c = v => Math.max(0, Math.min(255, v + amt));
      return "#" + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => c(v).toString(16).padStart(2, "0")).join("");
    },
    lum(hex) { const n = parseInt(hex.replace("#", ""), 16); return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)); },
    shirt(color, kind) {
      const dark = Store.shade(color, -28), light = Store.shade(color, 22);
      const txt = Store.lum(color) > 150 ? "#1F1B18" : "#ffffff";
      const hood = kind === "Hoodie";
      const sleeves = hood ? "M58 30 L16 58 L30 128 L58 120 L58 208 L142 208 L142 120 L170 128 L184 58 L142 30 Z" : "M62 22 L18 48 L38 90 L58 80 L58 204 L142 204 L142 80 L162 90 L182 48 L138 22 Z";
      const neck = hood ? '<path d="M70 30 C70 6 130 6 130 30 C122 52 78 52 70 30Z" fill="' + dark + '"/><path d="M84 40 L84 74 M116 40 L116 74" stroke="' + txt + '" stroke-width="3" stroke-linecap="round" opacity=".7"/>' : '<path d="M72 22 C80 42 120 42 128 22" fill="' + dark + '" stroke="' + dark + '" stroke-width="2"/>';
      const pocket = hood ? '<path d="M72 150 H128 L120 182 H80 Z" fill="' + dark + '" opacity=".55"/>' : "";
      const polo = kind === "Polo" ? '<path d="M100 36 V84" stroke="' + dark + '" stroke-width="3"/><circle cx="100" cy="52" r="2.5" fill="' + txt + '"/><circle cx="100" cy="68" r="2.5" fill="' + txt + '"/>' : "";
      const label = (kind === "Hoodie" || kind === "Polo") ? "" : '<text x="100" y="128" text-anchor="middle" font-family="Archivo Black,Arial Black,sans-serif" font-size="14" letter-spacing="1" fill="' + txt + '" opacity=".9">RATEOUT</text>';
      return '<svg viewBox="0 0 200 224" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shirt"><path d="' + sleeves + '" fill="' + color + '" stroke="' + dark + '" stroke-width="2" stroke-linejoin="round"/><path d="M58 80 L58 204 L70 204 L70 86 Z" fill="' + dark + '" opacity=".25"/><path d="M130 86 L130 204 L142 204 L142 80 Z" fill="' + light + '" opacity=".35"/>' + neck + polo + pocket + label + '</svg>';
    },
    visual(p) { return p.image ? '<img src="' + Store.esc(p.image) + '" alt="' + Store.esc(p.name) + '" loading="lazy">' : Store.shirt(p.color, p.category); }
  };
  window.Store = Store;
})();
