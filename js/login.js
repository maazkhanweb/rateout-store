(function () {
  if (sessionStorage.getItem("rateout_admin") === "1") { location.replace("admin.html"); return; }
  const f = document.getElementById("loginForm"), err = document.getElementById("err");
  f.addEventListener("submit", e => {
    e.preventDefault();
    const a = window.CONFIG.admin;
    if (f.u.value.trim() === a.username && f.p.value === a.password) { sessionStorage.setItem("rateout_admin", "1"); location.href = "admin.html"; return; }
    err.hidden = false; f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake"); f.p.value = ""; f.p.focus();
  });
})();
