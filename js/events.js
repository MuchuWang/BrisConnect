const form = document.getElementById("event-filters");
const searchInput = document.getElementById("search-events");
const categorySelect = document.getElementById("event-category");
const freeOnly = document.getElementById("free-only");
const clearButton = document.getElementById("clear-event-filters");
const count = document.getElementById("event-results-count");
const empty = document.getElementById("events-empty");
const grid = document.getElementById("events-grid");
const cards = Array.from(document.querySelectorAll(".event-card"));

function pluralise(number, noun) {
  return `${number} ${noun}${number === 1 ? "" : "s"}`;
}

function applyFilters() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const category = categorySelect?.value || "all";
  const onlyFree = Boolean(freeOnly?.checked);
  let visible = 0;

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const cardText = card.textContent.toLowerCase();
    const matchesText = !query || title.includes(query) || cardText.includes(query);
    const matchesCategory = category === "all" || card.dataset.category === category;
    const matchesFree = !onlyFree || card.dataset.free === "true";
    const show = matchesText && matchesCategory && matchesFree;

    card.hidden = !show;
    card.setAttribute("aria-hidden", String(!show));
    if (show) visible += 1;
  });

  if (count) {
    count.textContent = `${pluralise(visible, "event")} found`;
  }
  if (empty) {
    empty.hidden = visible !== 0;
  }
  if (grid) {
    grid.hidden = visible === 0;
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

searchInput?.addEventListener("input", applyFilters);
categorySelect?.addEventListener("change", applyFilters);
freeOnly?.addEventListener("change", applyFilters);

clearButton?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (categorySelect) categorySelect.value = "all";
  if (freeOnly) freeOnly.checked = false;
  applyFilters();
  searchInput?.focus();
});

applyFilters();
