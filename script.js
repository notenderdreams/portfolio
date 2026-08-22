/* ==========================================================================
   SAJID AL NAHIAN — ULTRA MINIMAL PORTFOLIO LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('archive-date');
  const heroDateEl = document.getElementById('archive-hero-date');

  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const year = today.getFullYear().toString().slice(-2);

  const formatted = `${month} ${day} ${year}`;
  if (dateEl) dateEl.textContent = formatted;
  if (heroDateEl) heroDateEl.textContent = formatted;
});
