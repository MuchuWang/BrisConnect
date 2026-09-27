const list = document.getElementById("community-list");
const status = document.getElementById("community-status");
const empty = document.getElementById("community-empty");
const buttons = Array.from(document.querySelectorAll("[data-category]"));

let stories = [];
let activeCategory = "all";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function render() {
  if (!list) return;
  const filtered = stories.filter((story) => activeCategory === "all" || story.category === activeCategory);

  list.innerHTML = filtered.map((story) => `
    <article class="card voice-card">
      <img src="${escapeHTML(story.image)}" alt="${escapeHTML(story.alt)}" width="600" height="450" loading="lazy">
      <div>
        <span class="tag">${escapeHTML(story.category)}</span>
        <h3>${escapeHTML(story.title)}</h3>
        <p>${escapeHTML(story.summary)}</p>
      </div>
    </article>
  `).join("");

  if (status) {
    status.textContent = `${filtered.length} ${filtered.length === 1 ? "example" : "examples"} shown`;
  }
  if (empty) {
    empty.hidden = filtered.length !== 0;
  }
}

function setActiveCategory(category) {
  activeCategory = category;
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === category));
  });
  render();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setActiveCategory(button.dataset.category || "all"));
});

fetch("data/stories.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load stories.");
    }
    return response.json();
  })
  .then((data) => {
    stories = Array.isArray(data) ? data : [];
    render();
  })
  .catch(() => {
    if (status) status.textContent = "Community examples could not be loaded.";
    if (empty) {
      empty.hidden = false;
      empty.textContent = "Community examples could not be loaded. Please run the project through a local static server.";
    }
  });
