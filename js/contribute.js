const form = document.getElementById("community-form");
const feedback = document.getElementById("form-feedback");
const story = document.getElementById("story-content");
const counter = document.getElementById("char-count");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("photo-upload");
const selectedFile = document.getElementById("selected-file");

function setFeedback(message, state = "") {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.state = state;
}

function clearError(input) {
  const error = document.getElementById(`${input.id}-error`);
  if (error) error.remove();
  input.removeAttribute("aria-invalid");
  const describedBy = (input.getAttribute("aria-describedby") || "")
    .split(" ")
    .filter((id) => id && id !== `${input.id}-error`);
  if (describedBy.length) {
    input.setAttribute("aria-describedby", describedBy.join(" "));
  } else {
    input.removeAttribute("aria-describedby");
  }
}

function showError(input, message) {
  clearError(input);
  const error = document.createElement("p");
  error.id = `${input.id}-error`;
  error.className = "field-error";
  error.textContent = message;
  input.after(error);
  input.setAttribute("aria-invalid", "true");
  const describedBy = (input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
  describedBy.push(error.id);
  input.setAttribute("aria-describedby", describedBy.join(" "));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function updateCounter() {
  if (!story || !counter) return;
  counter.textContent = `${story.value.length}/600`;
}

function updateFileLabel() {
  if (!fileInput || !selectedFile) return;
  const file = fileInput.files?.[0];
  selectedFile.textContent = file ? file.name : "No file selected";
}

function validateForm() {
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    title: document.getElementById("story-title"),
    story: document.getElementById("story-content"),
    category: document.getElementById("category"),
    consent: document.getElementById("consent")
  };

  Object.values(fields).forEach((field) => {
    if (field && field.id) clearError(field);
  });

  const errors = [];

  if (!fields.name.value.trim()) {
    errors.push([fields.name, "Please enter your name."]);
  }

  if (!fields.email.value.trim()) {
    errors.push([fields.email, "Please enter your email address."]);
  } else if (!isValidEmail(fields.email.value)) {
    errors.push([fields.email, "Please enter a valid email address."]);
  }

  if (fields.title.value.trim().length < 4) {
    errors.push([fields.title, "Please enter a story title of at least 4 characters."]);
  }

  if (fields.story.value.trim().length < 20) {
    errors.push([fields.story, "Please write at least 20 characters."]);
  }

  if (!fields.category.value) {
    errors.push([fields.category, "Please select a category."]);
  }

  if (!fields.consent.checked) {
    errors.push([fields.consent, "Please confirm consent before submitting."]);
  }

  const file = fileInput?.files?.[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      errors.push([fileInput, "Please choose an image file."]);
    }
    if (file.size > 5 * 1024 * 1024) {
      errors.push([fileInput, "Please choose a photo smaller than 5 MB."]);
    }
  }

  errors.forEach(([input, message]) => showError(input, message));
  return errors;
}

story?.addEventListener("input", updateCounter);
fileInput?.addEventListener("change", updateFileLabel);

dropzone?.addEventListener("click", () => fileInput?.click());
dropzone?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput?.click();
  }
});
dropzone?.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.classList.add("is-dragover");
});
dropzone?.addEventListener("dragleave", () => {
  dropzone.classList.remove("is-dragover");
});
dropzone?.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("is-dragover");
  if (event.dataTransfer?.files?.length && fileInput) {
    fileInput.files = event.dataTransfer.files;
    updateFileLabel();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = validateForm();
  if (errors.length) {
    setFeedback(`Please fix ${errors.length} ${errors.length === 1 ? "issue" : "issues"} before submitting.`, "error");
    errors[0][0].focus();
    return;
  }

  form.reset();
  updateCounter();
  updateFileLabel();
  setFeedback("Thanks. Your story passed validation in this static demo; nothing was sent or stored.", "success");
});

form?.addEventListener("reset", () => {
  window.setTimeout(() => {
    form.querySelectorAll("[aria-invalid='true']").forEach((input) => clearError(input));
    updateCounter();
    updateFileLabel();
    setFeedback("");
  }, 0);
});

updateCounter();
updateFileLabel();
