// This module provides functions to create UI components for progress bars, including checkboxes, progress elements, and percentage for progress bar.

import { saveCheckboxState } from "../composable/Utils.js";

export function createCheckbox(bar, isChecked) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = bar.key;
  checkbox.checked = isChecked;
  checkbox.addEventListener("change", () =>
    saveCheckboxState(bar.key, checkbox.checked)
  );
  return checkbox;
}

export function createProgressBar(bar, value) {
  const progress = document.createElement("progress");
  progress.id = bar.id;
  progress.value = value;
  progress.max = 100;
  progress.classList.add("progress", bar.id);
  progress.style.setProperty("--progress-color", bar.color);
  return progress;
}

export function createProgressPercentage(value) {
  const strong = document.createElement("strong");
  strong.classList.add("progress-percentage");
  strong.textContent = `${value}%`;
  return strong;
}

export function createProgressContainer(bar, value, isChecked) {
  const container = document.createElement("div");
  container.classList.add("progress-container");

  const checkbox = createCheckbox(bar, isChecked);
  const progress = createProgressBar(bar, value);
  const percentage = createProgressPercentage(value);

  container.appendChild(checkbox);
  container.appendChild(progress);
  container.appendChild(percentage);

  return container;
}
