/* Runs on every page: header, footer, WhatsApp button + robot */
(function () {
  const C = window.CONFIG;
  const I = {
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.7 15.5v-7l6 3.5-6 3.5z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.4 1.8 4 4 4.2v3.2c-1.5 0-2.9-.5-4-1.3v6.2a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.3a2.6 2.6 0 1 0 1.7 2.4V3h3.2z"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    gmail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5-8-5V6l8 5 8-5v2.2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.900c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.400 2.400 1.500.3.100.5.100.6-.1l.9-1c.2-.3.4-.2.6-.1l1.900.9c.3.100.5.200.5.300.1.100.1.600-.1 1.200z"/></svg>'
  };
  window.ICONS = I;
  const waLink = (msg) => "https://wa.me/" + C.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  window.waLink = waLink;

  const page = (document.body.dataset.page || "").toLowerCase();
  const nav = [["index.html", "Home", "home"], ["shop.html", "Shop", "shop"], ["about.html", "About", "about"], ["contact.html", "Contact", "contact"]];
  const words = C.storeName.split(" "), brand = words[0], sub = words.slice(1).join(" ");

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="announce">Order on WhatsApp &nbsp;|&nbsp; Cash on delivery &nbsp;|&nbsp; Size help on request</div>' +
      '<header class="topbar"><a class="logo" href="index.html" aria-label="' + C.storeName + ' home"><img src="images/logo.svg" alt="" width="42" height="42"><span class="logo-text"><b>' + brand + '</b><small>' + sub + '</small></span></a>' +
      '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>' +
      '<nav class="nav" id="nav">' + nav.map(n => '<a href="' + n[0] + '"' + (n[2] === page ? ' class="active"' : '') + '>' + n[1] + '</a>').join("") +
      '<a class="nav-admin" href="admin-login.html">Admin</a></nav></header>';
    const b = document.getElementById("burger"), n = document.getElementById("nav");
    b.addEventListener("click", () => { const o = n.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    const soc = [["youtube", "YouTube", C.links.youtube], ["instagram", "Instagram", C.links.instagram], ["facebook", "Facebook", C.links.facebook], ["tiktok", "TikTok", C.links.tiktok], ["location", "Location", C.links.location], ["gmail", "Gmail", "mailto:" + C.email], ["phone", "Contact", "tel:" + C.whatsapp.replace(/^92/, "0")]];
    footer.innerHTML =
      '<footer class="footer"><div class="footer-top"><div><img class="footer-logo" src="images/logo.svg" alt="" width="54" height="54"><div class="footer-big">' + brand + '</div><p class="footer-tag">Shirts, polos and hoodies. Wear it loud.</p></div>' +
      '<div><h4>Follow and contact us</h4><ul class="social">' + soc.map(s => '<li><a href="' + s[2] + '" ' + (s[2].startsWith("http") ? 'target="_blank" rel="noopener"' : '') + ' aria-label="' + s[1] + '" class="s-' + (s[0] === "phone" ? "contact" : s[0]) + '">' + I[s[0]] + '<span>' + s[1] + '</span></a></li>').join("") + '</ul></div></div>' +
      '<p class="copy">&copy; ' + new Date().getFullYear() + ' ' + C.storeName + '. All rights reserved.</p></footer>';
  }

  /* WhatsApp button + support robot (on every page) */
  const wa = document.createElement("div");
  wa.className = "wa";
  wa.innerHTML =
    '<div class="wa-bubble" aria-hidden="true"><strong>' + brand + ' Support</strong><span><i class="dot"></i>Online</span><p>Hi! Need help choosing a size or placing an order? Chat with us.</p></div>' +
    '<div class="wa-robot" aria-hidden="true"><svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="rHead" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4DED4"/></linearGradient>' +
    '<linearGradient id="rBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14796F"/><stop offset="1" stop-color="#0A4A44"/></linearGradient>' +
    '<radialGradient id="rEye" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#B8FFD6"/><stop offset="1" stop-color="#25D366"/></radialGradient></defs>' +
    '<line x1="60" y1="8" x2="60" y2="24" stroke="#1F1B18" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="8" r="5.5" fill="#F4691F" stroke="#1F1B18" stroke-width="2.5" class="r-ant"/>' +
    '<rect x="10" y="40" width="10" height="22" rx="5" fill="#F4691F" stroke="#1F1B18" stroke-width="2.5"/><rect x="100" y="40" width="10" height="22" rx="5" fill="#F4691F" stroke="#1F1B18" stroke-width="2.5"/>' +
    '<rect x="18" y="24" width="84" height="56" rx="22" fill="url(#rHead)" stroke="#1F1B18" stroke-width="3"/>' +
    '<rect x="28" y="34" width="64" height="36" rx="15" fill="#1F1B18"/>' +
    '<g class="r-eyes"><ellipse cx="46" cy="50" rx="6.5" ry="7.5" fill="url(#rEye)"/><ellipse cx="74" cy="50" rx="6.5" ry="7.5" fill="url(#rEye)"/></g>' +
    '<path d="M52 61 Q60 67 68 61" fill="none" stroke="#25D366" stroke-width="3" stroke-linecap="round"/>' +
    '<rect x="34" y="84" width="52" height="52" rx="16" fill="url(#rBody)" stroke="#1F1B18" stroke-width="3"/>' +
    '<circle cx="60" cy="104" r="9" fill="#25D366" stroke="#1F1B18" stroke-width="2.5"/><path d="M56 104l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<g><rect x="20" y="88" width="14" height="26" rx="7" fill="#FFFFFF" stroke="#1F1B18" stroke-width="2.5" transform="rotate(8 27 90)"/></g>' +
    '<g class="r-arm"><rect x="86" y="86" width="14" height="28" rx="7" fill="#FFFFFF" stroke="#1F1B18" stroke-width="2.5"/></g>' +
    '</svg></div>' +
    '<a class="wa-btn" href="' + waLink("Hello, I would like to order from " + C.storeName + ".") + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + I.whatsapp + '</a>';
  document.body.appendChild(wa);

  /* One-time gentle scroll reveal */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  window.observeReveal = (root) => (root || document).querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  window.observeReveal();
})();
