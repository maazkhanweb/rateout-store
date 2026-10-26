RATEOUT STORE - static website (HTML, CSS, JavaScript)

HOW TO RUN
1. Extract the zip.
2. Open index.html (or use VS Code Live Server).

YOUR IMAGES (put them in the images/ folder)
- images/hero.png      -> the picture shown on the home page hero (your photo)
- images/favicon.png   -> browser tab icon (square, 512x512 recommended)
- images/logo.svg      -> the site logo (replace with your own logo if you want)
A temporary logo and favicon are already included. Replace the files with the same names.

SETTINGS
Open js/config.js to change the store name, WhatsApp number, social links, admin login,
hero image path and hero image style ("frame" or "cutout").

ADMIN LOGIN
admin-login.html  ->  username: wajeeh1   password: khan1123

GOOGLE SHEET (later)
When the site is finished, paste the Apps Script Web App URL into sheetUrl in js/config.js.
The sale-entry code is already prepared in js/sheet.js.

NOTES
- Products and sales are currently saved in the browser (localStorage), so they only appear on the same browser.
- Admin login runs in JavaScript, so it is not real security. Use a server-side login when a backend is added.
