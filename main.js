// Initializes progress bars from local storage and attaches button event listeners when the window loads.

import { createProgressContainer } from "./components/ProgressBar.js";
import { attachButtonListeners } from "./components/ProgressControl.js";
import { bars } from "./data/bars.js";
import { attachCheckboxEventListeners } from "./composable/Utils.js";

export function initProgressBars() {
  const progressBox = document.getElementById("progress-box");

  progressBox.innerHTML = "";

  bars.forEach((bar) => {
    const value = parseInt(localStorage.getItem(bar.id)) || 50;
    const isChecked = JSON.parse(localStorage.getItem(bar.key)) || false;

    const progressHTML = createProgressContainer(bar, value, isChecked);

    progressBox.innerHTML += progressHTML;
  });

  bars.forEach((bar) => {
    const checkbox = document.getElementById(bar.key);
    if (checkbox) {
      attachCheckboxEventListeners(bar, checkbox);
    }
  });
}

window.onload = () => {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  setTimeout(() => {
    loading.style.display = "none";
    content.classList.remove("hidden");
    content.classList.add("show");

    initProgressBars();
    attachButtonListeners();
  }, 500);
};
