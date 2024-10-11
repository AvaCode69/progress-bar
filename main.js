// Initializes progress bars from local storage and attaches button event listeners when the window loads.

import { createProgressContainer } from "./components/ProgressBar.js";
import { attachButtonListeners } from "./components/ProgressControl.js";
import { bars } from "./data/bars.js";

export function initProgressBars() {
  const progressBox = document.getElementById("progress-box");
  bars.forEach((bar) => {
    const value = parseInt(localStorage.getItem(bar.id)) || 50;
    const isChecked = JSON.parse(localStorage.getItem(bar.key)) || false;

    const progressContainer = createProgressContainer(bar, value, isChecked);
    progressBox.appendChild(progressContainer);
  });
}

window.onload = () => {
  initProgressBars();
  attachButtonListeners();
};
