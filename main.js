// Initializes progress bars from local storage and attaches button event listeners when the window loads.
import { createProgressContainer } from "./components/ProgressBar.js";
import { attachButtonListeners } from "./components/ButtonControl.js";
import { bars } from "./data/bars.js";

export function initProgressBars() {
  const progressBox = document.getElementById("progress-box");

  bars.forEach((bar) => {
    const storedValue = localStorage.getItem(bar.id) || 50;

    const isChecked =
      JSON.parse(localStorage.getItem(`checkbox-${bar.id}`)) || false;

    const container = document.createElement("div");

    container.innerHTML = createProgressContainer(bar, storedValue, isChecked);

    progressBox.appendChild(container);

    const checkbox = container.querySelector(
      `input[data-progress="${bar.id}"]`
    );
    if (checkbox) {
      checkbox.addEventListener("change", () =>
        localStorage.setItem(
          `checkbox-${bar.id}`,
          JSON.stringify(checkbox.checked)
        )
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  setTimeout(() => {
    loading.style.display = "none";
    content.classList.remove("hidden");
    content.classList.add("show");

    initProgressBars();
    attachButtonListeners();
  }, 500);
});
