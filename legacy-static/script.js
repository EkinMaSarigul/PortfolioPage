// ---------- Theme (light / dark) ----------
const root = document.documentElement;
const savedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// ---------- Helpers ----------
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function coverHTML(p) {
  if (p.image) return `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`;
  const [a, b] = p.color || ["#ff5a36", "#ffb347"];
  const initials = p.title.split(" ").map(w => w[0]).join("").slice(0, 2);
  return `<div class="ph" style="background:linear-gradient(135deg,${a},${b})">${esc(initials)}</div>`;
}

// ---------- Projects grid ----------
const grid = document.getElementById("project-grid");
grid.innerHTML = PROJECTS.map((p, i) => `
  <button class="card reveal" data-index="${i}" data-category="${esc(p.category)}">
    <div class="card-cover">${coverHTML(p)}</div>
    <div class="card-info">
      <div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
      </div>
      <span>${esc(p.category)} · ${esc(p.year)}</span>
    </div>
  </button>
`).join("");

// ---------- Filters ----------
const filters = document.querySelector(".filters");
const categories = ["All", ...new Set(PROJECTS.map(p => p.category))];
filters.innerHTML = categories.map((c, i) =>
  `<button role="tab" aria-selected="${i === 0}" data-filter="${esc(c)}">${esc(c)}</button>`
).join("");

filters.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b === btn));
  const f = btn.dataset.filter;
  grid.querySelectorAll(".card").forEach(card => {
    card.classList.toggle("hide", f !== "All" && card.dataset.category !== f);
  });
});

// ---------- Project dialog ----------
const dialog = document.getElementById("project-dialog");
grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  const p = PROJECTS[card.dataset.index];
  dialog.querySelector(".dialog-cover").innerHTML = coverHTML(p);
  dialog.querySelector(".dialog-meta").textContent = `${p.category} · ${p.year}`;
  dialog.querySelector(".dialog-title").textContent = p.title;
  dialog.querySelector(".dialog-desc").textContent = p.description;
  dialog.querySelector(".dialog-tags").innerHTML = (p.tags || []).map(t => `<li>${esc(t)}</li>`).join("");
  const link = dialog.querySelector(".dialog-link");
  link.hidden = !p.link;
  if (p.link) link.href = p.link;
  dialog.showModal();
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
