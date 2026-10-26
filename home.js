(function () {
  const C = window.CONFIG;
  /* Headline: letters rise once on load */
  const t = document.getElementById("heroTitle"); let i = 0;
  t.querySelectorAll(".ln").forEach(ln => { const txt = ln.textContent; ln.textContent = ""; ln.setAttribute("aria-hidden", "true");
    [...txt].forEach(c => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i++); s.textContent = c; ln.appendChild(s); }); });

  /* Hero picture: uses images/hero.png if it exists, otherwise shows the drawn shirt */
  const hs = document.getElementById("heroShirt");
  hs.innerHTML = Store.shirt("#F4691F", "T-Shirt");
  const img = new Image();
  img.alt = C.storeName; img.className = "hero-photo " + (C.heroImageStyle === "cutout" ? "cutout" : "frame");
  img.onload = () => { hs.innerHTML = ""; hs.appendChild(img); hs.classList.add("has-photo"); };
  img.src = C.heroImage;

  const stage = document.getElementById("stage");
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
    stage.addEventListener("mousemove", e => { const r = stage.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; hs.style.transform = "rotateY(" + x * 18 + "deg) rotateX(" + -y * 14 + "deg)"; });
    stage.addEventListener("mouseleave", () => hs.style.transform = "");
  }

  const I = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.800 7L3 21l2-5.200A8 8 0 1 1 21 12z"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.500-3 8-7 9-4-1-7-4.500-7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    size: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/></svg>'
  };
  const trust = [["chat", "Order on WhatsApp", "Quick and personal"], ["cash", "Cash on delivery", "Pay when it arrives"], ["check", "Quality checked", "Every piece inspected"], ["size", "Size guidance", "Ask us before you buy"]];
  document.getElementById("trust").innerHTML = trust.map(x => '<div class="it">' + I[x[0]] + '<div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>').join("");

  const words = ["New drop", "Oversized tees", "Hoodies", "Polo season", "Cash on delivery", "WhatsApp orders"];
  const one = words.map(w => "<span>" + w + "</span><b>✦</b>").join("");
  document.getElementById("track").innerHTML = one + one;

  document.getElementById("featured").innerHTML = Store.products().slice(0, 4).map(card).join("");

  const cats = [["T-Shirt", "Simple tees for every day"], ["Oversized", "Relaxed, boxy fit"], ["Polo", "Clean collar look"], ["Hoodie", "Warm fleece for cold days"]];
  document.getElementById("cats").innerHTML = cats.map(c => '<a class="cat reveal" href="shop.html?cat=' + encodeURIComponent(c[0]) + '"><h3>' + c[0] + '</h3><p>' + c[1] + '</p></a>').join("");

  document.getElementById("ctaWa").href = waLink("Hello, can you send me your size guide?");

  function card(p) {
    return '<article class="card reveal"><div class="pic">' + Store.visual(p) + '<span class="chip">' + Store.esc(p.category) + '</span></div><div class="info"><h3>' + Store.esc(p.name) + '</h3><p class="meta">' + Store.esc(p.desc) + '</p><div class="row"><span class="price">' + Store.money(p.price) + '</span><a class="btn sm" target="_blank" rel="noopener" href="' + waLink("Hello, I would like to order " + p.name + " (" + Store.money(p.price) + ").") + '">Order</a></div></div></article>';
  }
  window.observeReveal();
})();
