(function () {
  const C = window.CONFIG, I = window.ICONS;
  const items = [["whatsapp", "WhatsApp", C.phoneDisplay, waLink("Hello!")], ["phone", "Call us", C.phoneDisplay, "tel:" + C.whatsapp.replace(/^92/, "0")], ["gmail", "Gmail", C.email, "mailto:" + C.email], ["location", "Location", "Open in Google Maps", C.links.location], ["instagram", "Instagram", "Follow us", C.links.instagram], ["youtube", "YouTube", "Watch our videos", C.links.youtube], ["facebook", "Facebook", "Visit our page", C.links.facebook], ["tiktok", "TikTok", "Watch our clips", C.links.tiktok]];
  document.getElementById("cList").innerHTML = items.map(i => '<a class="c-item" href="' + i[3] + '"' + (i[3].startsWith("http") ? ' target="_blank" rel="noopener"' : "") + '>' + I[i[0]] + '<div><small>' + i[1] + '</small><strong>' + i[2] + '</strong></div></a>').join("");
  document.getElementById("cForm").addEventListener("submit", e => {
    e.preventDefault(); const f = new FormData(e.target);
    const msg = "Hello, my name is " + f.get("name") + ".\n" + f.get("topic") + (f.get("msg") ? "\n" + f.get("msg") : "");
    window.open(waLink(msg), "_blank", "noopener");
  });
})();
