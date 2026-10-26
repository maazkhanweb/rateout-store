(function () {
  const all = Store.products();
  const cats = ["All"].concat([...new Set(all.map(p => p.category))]);
  const params = new URLSearchParams(location.search);
  let cat = cats.includes(params.get("cat")) ? params.get("cat") : "All", q = "";
  const pills = document.getElementById("pills"), list = document.getElementById("list"), empty = document.getElementById("empty");

  function drawPills() { pills.innerHTML = cats.map(c => '<button class="pill' + (c === cat ? " on" : "") + '" data-c="' + Store.esc(c) + '">' + Store.esc(c) + '</button>').join(""); }
  function draw() {
    const rows = all.filter(p => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q));
    empty.hidden = rows.length > 0;
    list.innerHTML = rows.map(p => {
      const out = Number(p.stock) <= 0, low = !out && Number(p.stock) <= 5;
      return '<article class="card reveal"><div class="pic">' + Store.visual(p) + '<span class="chip">' + Store.esc(p.category) + '</span>' + (out ? '<span class="chip low">Sold out</span>' : low ? '<span class="chip low">Only ' + Number(p.stock) + ' left</span>' : "") + '</div><div class="info"><h3>' + Store.esc(p.name) + '</h3><p class="meta">' + Store.esc(p.desc) + '</p><div class="sizes">' + (p.sizes || []).map(s => "<span>" + Store.esc(s) + "</span>").join("") + '</div><div class="row"><span class="price">' + Store.money(p.price) + '</span>' +
        (out ? '<span class="chip">Out of stock</span>' : '<a class="btn sm" target="_blank" rel="noopener" href="' + waLink("Hello, I would like to order " + p.name + " (" + Store.money(p.price) + ").") + '">Order</a>') + '</div></div></article>';
    }).join("");
    window.observeReveal(list);
  }
  pills.addEventListener("click", e => { const b = e.target.closest(".pill"); if (!b) return; cat = b.dataset.c; drawPills(); draw(); });
  document.getElementById("q").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); draw(); });
  drawPills(); draw();
})();
