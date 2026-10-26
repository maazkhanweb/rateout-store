(function () {
  const ps = Store.products();
  document.getElementById("art").innerHTML = Store.shirt("#0E5E57", "T-Shirt");
  document.getElementById("nProducts").dataset.to = ps.length;
  document.getElementById("nCats").dataset.to = new Set(ps.map(p => p.category)).size;
  const els = document.querySelectorAll("[data-to]");
  const run = el => { const to = +el.dataset.to, suf = el.dataset.suffix || "", t0 = performance.now();
    (function step(t) { const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); })(t0); };
  if ("IntersectionObserver" in window) { const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } })); els.forEach(el => o.observe(el)); }
  else els.forEach(el => el.textContent = el.dataset.to + (el.dataset.suffix || ""));
})();
