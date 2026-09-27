const form = document.getElementById("resource-filters");
const searchInput = document.getElementById("search-resources");
const localOnly = document.getElementById("local-only");
const clearButton = document.getElementById("clear-resource-filters");
const pills = Array.from(document.querySelectorAll(".filter-pills .pill"));
const count = document.getElementById("resource-results-count");
const empty = document.getElementById("resources-empty");
const grid = document.getElementById("resources-grid");
const cards = Array.from(document.querySelectorAll(".resource-card"));
const preview = document.getElementById("resource-preview");

let activeType = "all";

function pluralise(number, noun) {
  return `${number} ${noun}${number === 1 ? "" : "s"}`;
}

function setActiveType(type) {
  activeType = type;
  pills.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.type === type));
  });
}

function applyFilters() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const onlyLocal = Boolean(localOnly?.checked);
  let visible = 0;

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const matchesText = !query || text.includes(query);
    const matchesType = activeType === "all" || card.dataset.type === activeType;
    const matchesLocal = !onlyLocal || card.dataset.local === "true";
    const show = matchesText && matchesType && matchesLocal;

    card.hidden = !show;
    card.setAttribute("aria-hidden", String(!show));
    if (show) visible += 1;
  });

  if (count) {
    count.textContent = `${pluralise(visible, "resource")} found`;
  }
  if (empty) {
    empty.hidden = visible !== 0;
  }
  if (grid) {
    grid.hidden = visible === 0;
  }
}

pills.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveType(button.dataset.type || "all");
    applyFilters();
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

searchInput?.addEventListener("input", applyFilters);
localOnly?.addEventListener("change", applyFilters);

clearButton?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (localOnly) localOnly.checked = false;
  setActiveType("all");
  if (preview) preview.textContent = "";
  applyFilters();
  searchInput?.focus();
});

document.querySelectorAll("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.preview;
    if (preview) {
      preview.textContent = `${title} is represented as static prototype content in this portfolio build.`;
    }
  });
});

setActiveType("all");
applyFilters();
