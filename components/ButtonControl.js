// This module manages progress bar functionality, including updating progress values, handling button events, and storing progress states in local storage.

import {
  updateProgressValue,
  toggleVisibility,
  getCheckedProgressBar,
  progressIds,
} from "../composable/Utils.js";

import { bars } from "../data/bars.js";

function updateProgress(progress, change) {
  const newValue = Math.min(Math.max(progress.value + change, 0), 100);

  if (progress.value !== newValue) {
    progress.value = newValue;
    updateProgressValue(progress);
    localStorage.setItem(progress.id, progress.value);
  }
}

export function increaseProgress() {
  getCheckedProgressBar();
  progressIds.forEach((progress) => {
    updateProgress(progress, 10);
  });
}

export function decreaseProgress() {
  getCheckedProgressBar();
  progressIds.forEach((progress) => {
    updateProgress(progress, -10);
  });
}

export function resetProgress() {
  stopIncrease(); // This is for Stop auto-increment
  localStorage.clear();
  bars.forEach((bar) => {
    const progress = document.getElementById(bar.id);
    if (progress) {
      progress.value = 50;
      updateProgressValue(progress);
    }

    const checkbox = document.querySelector(`input[data-progress="${bar.id}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }
  });
}

let intervalIds = [];

export function autoIncrease() {
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
}

export function stopIncrease() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
  toggleVisibility("stopIncreaseBtn", "autoIncreaseBtn");
}

export function attachButtonListeners() {
  const buttonBox = document.querySelector(".button-box");

  buttonBox.addEventListener("click", (event) => {
    switch (event.target.id) {
      case "increaseBtn":
        increaseProgress();
        break;
      case "decreaseBtn":
        decreaseProgress();
        break;
      case "resetBtn":
        resetProgress();
        break;
      case "autoIncreaseBtn":
        autoIncrease();
        break;
      case "stopIncreaseBtn":
        stopIncrease();
        break;
    }
  });
}
