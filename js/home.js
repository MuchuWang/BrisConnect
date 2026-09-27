const form = document.getElementById("newsletter-form");
const email = document.getElementById("newsletter-email");
const feedback = document.getElementById("newsletter-feedback");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setFeedback(message, state = "") {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.state = state;
}

function clearFieldError(input) {
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

function showFieldError(input, message) {
  clearFieldError(input);
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

if (form && email) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = email.value.trim();

    if (!value) {
      showFieldError(email, "Please enter your email address.");
      setFeedback("There is one form error to fix.", "error");
      email.focus();
      return;
    }

    if (!isValidEmail(value)) {
      showFieldError(email, "Please enter a valid email address.");
      setFeedback("There is one form error to fix.", "error");
      email.focus();
      return;
    }

    clearFieldError(email);
    form.reset();
    setFeedback("Thanks. This demo interaction is complete; no email was sent or stored.", "success");
  });

  email.addEventListener("input", () => {
    if (isValidEmail(email.value)) {
      clearFieldError(email);
      setFeedback("");
    }
  });
}
