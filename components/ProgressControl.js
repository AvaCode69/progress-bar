// This module manages progress bar functionality, including updating progress values, handling button events, and storing progress states in local storage.

let intervalIds = [];

import {
  updateProgressDisplay,
  saveProgressToLocalStorage,
  toggleVisibility,
  getCheckedProgressBar,
  progressIds,
} from "../composable/Utils.js";

import { bars } from "../data/bars.js";

function updateProgress(progress, change) {
  if (
    (change > 0 && progress.value < 100) ||
    (change < 0 && progress.value > 0)
  ) {
    progress.value += change;
    updateProgressDisplay(progress);
    saveProgressToLocalStorage(progress);
  }
}
export function attachButtonListeners() {
  document.getElementById("increaseBtn").addEventListener("click", function () {
    getCheckedProgressBar();
    progressIds.forEach((progress) => {
      updateProgress(progress, 10);
    });
  });

  document.getElementById("decreaseBtn").addEventListener("click", function () {
    getCheckedProgressBar();
    progressIds.forEach((progress) => {
      updateProgress(progress, -10);
    });
  });

  document.getElementById("resetBtn").addEventListener("click", function () {
    stopIncreaseBtn();
    localStorage.clear();
    bars.forEach((bar) => {
      const progress = document.getElementById(bar.id);
      if (progress) {
        progress.value = 50;
        updateProgressDisplay(progress);
      }

      const checkbox = document.getElementById(bar.key);
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  });

  document
    .getElementById("autoIncreaseBtn")
    .addEventListener("click", function () {
      toggleVisibility("autoIncreaseBtn", "stopIncreaseBtn");
      getCheckedProgressBar();
      progressIds.forEach((progress) => {
        const intervalId = setInterval(() => {
          updateProgress(progress, 1);
          if (progress.value >= 100) {
            clearInterval(intervalId);
          }
        }, 500);
        intervalIds.push(intervalId);
      });
    });

  document
    .getElementById("stopIncreaseBtn")
    .addEventListener("click", stopIncreaseBtn);
}
export function stopIncreaseBtn() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
  toggleVisibility("stopIncreaseBtn", "autoIncreaseBtn");
}
