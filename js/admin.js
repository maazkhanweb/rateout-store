(function () {
  if (sessionStorage.getItem("rateout_admin") !== "1") { location.replace("admin-login.html"); return; }
  const $ = id => document.getElementById(id), esc = Store.esc, money = Store.money;
  let products = Store.products(), sales = Store.sales(), editId = null, imgData = "";

  const toast = m => { const t = $("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); };
  $("logout").onclick = () => { sessionStorage.removeItem("rateout_admin"); location.href = "admin-login.html"; };

  /* tabs */
  document.querySelectorAll(".tab").forEach(b => b.onclick = () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("on", x === b));
    ["products", "sale", "records"].forEach(n => $("t-" + n).hidden = n !== b.dataset.t);
  });

  function stats() {
    const rev = sales.reduce((a, s) => a + Number(s.total || 0), 0), pcs = sales.reduce((a, s) => a + Number(s.qty || 0), 0), stock = products.reduce((a, p) => a + Number(p.stock || 0), 0);
    $("stats").innerHTML = [["Products", products.length], ["Pieces in stock", stock], ["Pieces sold", pcs], ["Total sales", money(rev)]].map(s => '<div class="stat"><small>' + s[0] + '</small><b>' + s[1] + '</b></div>').join("");
  }

  /* ---------- Products CRUD ---------- */
  function drawProducts() {
    const q = $("pq").value.trim().toLowerCase();
    const rows = products.filter(p => p.name.toLowerCase().includes(q));
    $("pBody").innerHTML = rows.length ? rows.map(p => '<tr><td><div class="thumb">' + Store.visual(p) + '</div></td><td><strong>' + esc(p.name) + '</strong></td><td>' + esc(p.category) + '</td><td>' + money(p.price) + '</td><td' + (Number(p.stock) <= 5 ? ' class="low-s"' : "") + '>' + Number(p.stock) + '</td><td>' + esc((p.sizes || []).join(", ")) + '</td><td><div class="acts"><button class="btn alt sm" data-e="' + esc(p.id) + '">Edit</button><button class="btn danger sm" data-d="' + esc(p.id) + '">Delete</button></div></td></tr>').join("") : '<tr><td colspan="7" class="empty">No products found. Use "+ New product" to add one.</td></tr>';
    fillSaleProducts(); stats();
  }
  $("pq").oninput = drawProducts;
  $("pBody").onclick = e => {
    const ed = e.target.closest("[data-e]"), de = e.target.closest("[data-d]");
    if (ed) openModal(ed.dataset.e);
    if (de) { const p = products.find(x => x.id === de.dataset.d); if (p && confirm('Delete "' + p.name + '"?')) { products = products.filter(x => x.id !== p.id); Store.saveProducts(products); drawProducts(); toast("Product deleted"); } }
  };

  const f = $("pForm");
  function preview() { $("mPre").innerHTML = imgData ? '<img src="' + imgData + '" alt="">' : Store.shirt(f.color.value, f.category.value); }
  function openModal(id) {
    editId = id || null; const p = id ? products.find(x => x.id === id) : null;
    $("mTitle").textContent = p ? "Edit product" : "New product";
    f.name.value = p ? p.name : ""; f.category.value = p ? p.category : "T-Shirt"; f.price.value = p ? p.price : ""; f.stock.value = p ? p.stock : "";
    f.sizes.value = p ? (p.sizes || []).join(", ") : "S, M, L, XL"; f.color.value = p ? p.color : "#0E5E57"; f.desc.value = p ? p.desc : ""; f.file.value = ""; imgData = p ? (p.image || "") : "";
    preview(); $("modal").hidden = false; f.name.focus();
  }
  $("addP").onclick = () => openModal();
  $("mCancel").onclick = () => $("modal").hidden = true;
  $("modal").addEventListener("mousedown", e => { if (e.target === $("modal")) $("modal").hidden = true; });
  document.addEventListener("keydown", e => { if (e.key === "Escape") $("modal").hidden = true; });
  f.color.oninput = f.category.onchange = preview;
  f.file.onchange = () => {
    const file = f.file.files[0]; if (!file) return;
    const rd = new FileReader();
    rd.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, 640 / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = im.width * s; c.height = im.height * s; c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); imgData = c.toDataURL("image/jpeg", .8); preview(); }; im.src = rd.result; };
    rd.readAsDataURL(file);
  };
  f.onsubmit = e => {
    e.preventDefault();
    const data = { name: f.name.value.trim(), category: f.category.value, price: Number(f.price.value), stock: Number(f.stock.value), sizes: f.sizes.value.split(",").map(s => s.trim().toUpperCase()).filter(Boolean), color: f.color.value, desc: f.desc.value.trim(), image: imgData };
    const next = editId ? products.map(p => p.id === editId ? Object.assign({}, p, data) : p) : products.concat([Object.assign({ id: Store.uid() }, data)]);
    if (!Store.saveProducts(next)) return;
    products = next; $("modal").hidden = true; drawProducts(); toast(editId ? "Product updated" : "Product added");
  };

  /* ---------- Sale entry ---------- */
  const sf = $("saleForm");
  sf.date.value = new Date().toISOString().slice(0, 10);
  function fillSaleProducts() {
    const cur = $("sProduct").value;
    $("sProduct").innerHTML = products.map(p => '<option value="' + esc(p.id) + '">' + esc(p.name) + " (stock " + Number(p.stock) + ")</option>").join("");
    if (products.some(p => p.id === cur)) $("sProduct").value = cur; onProduct(false);
  }
  function onProduct(setPrice) {
    const p = products.find(x => x.id === $("sProduct").value); if (!p) return;
    $("sSize").innerHTML = (p.sizes && p.sizes.length ? p.sizes : ["Free"]).map(s => "<option>" + esc(s) + "</option>").join("");
    if (setPrice !== false || !sf.price.value) sf.price.value = p.price; total();
  }
  function total() { sf.total.value = (Number(sf.qty.value || 0) * Number(sf.price.value || 0)); }
  $("sProduct").onchange = () => onProduct(true); sf.qty.oninput = sf.price.oninput = total;
  sf.onsubmit = e => {
    e.preventDefault();
    const p = products.find(x => x.id === sf.product.value); if (!p) return toast("Add a product first");
    const qty = Number(sf.qty.value);
    if (qty > Number(p.stock) && !confirm("Only " + p.stock + " in stock. Save this sale anyway?")) return;
    const sale = { id: Store.uid(), date: sf.date.value, productId: p.id, product: p.name, size: sf.size.value, qty, price: Number(sf.price.value), total: Number(sf.total.value), customer: sf.customer.value.trim(), phone: sf.phone.value.trim(), pay: sf.pay.value, note: sf.note.value.trim() };
    sales = [sale].concat(sales); if (!Store.saveSales(sales)) return;
    products = products.map(x => x.id === p.id ? Object.assign({}, x, { stock: Math.max(0, Number(x.stock) - qty) }) : x); Store.saveProducts(products);
    window.Sheet.send(sale);
    sf.qty.value = 1; sf.customer.value = sf.phone.value = sf.note.value = ""; onProduct(true);
    drawProducts(); drawSales(); toast("Sale saved");
  };

  /* ---------- Sales record ---------- */
  function drawSales() {
    $("sEmpty").hidden = sales.length > 0;
    $("sBody").innerHTML = sales.map(s => '<tr><td>' + esc(s.date) + '</td><td>' + esc(s.product) + '</td><td>' + esc(s.size) + '</td><td>' + Number(s.qty) + '</td><td>' + money(s.total) + '</td><td>' + esc(s.customer || "-") + '</td><td>' + esc(s.pay) + '</td><td><button class="btn danger sm" data-s="' + esc(s.id) + '">Delete</button></td></tr>').join("");
    $("sheetState").textContent = Sheet.enabled() ? "Google Sheet: connected" : "Google Sheet: not connected yet";
    stats();
  }
  $("sBody").onclick = e => { const b = e.target.closest("[data-s]"); if (!b) return; if (confirm("Delete this sale record?")) { sales = sales.filter(s => s.id !== b.dataset.s); Store.saveSales(sales); drawSales(); toast("Record deleted"); } };
  /* ---------- Download PDF (no library needed, works offline) ---------- */
  function buildPDF(rows) {
    const W = 842, H = 595, M = 36, RH = 20;                       // A4 landscape, points
    const cols = [["Date", 0, 72], ["Product", 72, 180], ["Size", 252, 44], ["Qty", 296, 36], ["Total", 332, 92], ["Customer", 424, 130], ["Payment", 554, 216]];
    const esc = v => String(v ?? "").replace(/[^\x20-\x7E\xA0-\xFF]/g, "?").replace(/([\\()])/g, "\\$1");
    const fit = (v, w) => { v = String(v ?? ""); const n = Math.floor(w / 5.2); return v.length > n ? v.slice(0, n - 3) + "..." : v; };
    const txt = (x, y, v, bold, size) => "BT /" + (bold ? "F2" : "F1") + " " + (size || 9) + " Tf " + x + " " + y + " Td (" + esc(v) + ") Tj ET\n";
    const rule = y => "0.78 G 0.6 w " + M + " " + y + " m " + (W - M) + " " + y + " l S 0 G\n";
    const head = y => cols.map(c => txt(M + c[1], y, c[0], true, 9)).join("") + rule(y - 6);

    const pages = []; let c = "", y = 0;
    const newPage = first => {
      if (c) pages.push(c);
      c = ""; y = H - M - 10;
      if (first) {
        c += txt(M, H - M - 8, window.CONFIG.storeName + " - Sales Record", true, 16);
        c += txt(M, H - M - 26, "Generated: " + new Date().toLocaleDateString("en-GB") + "   |   Records: " + rows.length, false, 9);
        y = H - M - 56;
      }
      c += head(y); y -= RH;
    };
    newPage(true);
    rows.forEach(s => {
      if (y < M + RH) newPage(false);
      const vals = [s.date, s.product, s.size, Number(s.qty), Store.money(s.total), s.customer || "-", s.pay];
      c += cols.map((col, i) => txt(M + col[1], y, fit(vals[i], col[2]), false, 9)).join("") + rule(y - 6);
      y -= RH;
    });
    if (y < M + RH) newPage(false);
    const pcs = rows.reduce((a, s) => a + Number(s.qty || 0), 0), sum = rows.reduce((a, s) => a + Number(s.total || 0), 0);
    c += txt(M, y - 4, "Total pieces: " + pcs + "     Total sales: " + Store.money(sum), true, 10);
    pages.push(c);

    const n = pages.length, o = [];
    o[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    o[2] = "<< /Type /Pages /Kids [" + pages.map((_, i) => (5 + 2 * i) + " 0 R").join(" ") + "] /Count " + n + " >>";
    o[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
    o[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
    pages.forEach((p, i) => {
      const body = p + txt(W - M - 60, 20, "Page " + (i + 1) + " of " + n, false, 8);
      o[5 + 2 * i] = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents " + (6 + 2 * i) + " 0 R >>";
      o[6 + 2 * i] = "<< /Length " + body.length + " >>\nstream\n" + body + "endstream";
    });
    let out = "%PDF-1.4\n"; const off = [];
    for (let k = 1; k < o.length; k++) { off[k] = out.length; out += k + " 0 obj\n" + o[k] + "\nendobj\n"; }
    const xr = out.length;
    out += "xref\n0 " + o.length + "\n0000000000 65535 f \n" + off.slice(1).map(v => String(v).padStart(10, "0") + " 00000 n \n").join("") +
      "trailer\n<< /Size " + o.length + " /Root 1 0 R >>\nstartxref\n" + xr + "\n%%EOF";
    return new Uint8Array([...out].map(ch => ch.charCodeAt(0) & 255));
  }
  $("pdf").onclick = () => {
    if (!sales.length) return toast("No sales to export yet");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([buildPDF(sales)], { type: "application/pdf" }));
    a.download = "sales-record.pdf"; a.click();
  };

  drawProducts(); drawSales();
})();
