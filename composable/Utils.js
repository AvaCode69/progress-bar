// This module manages the state and behavior of progress bars in a UI.
// It includes functionality for saving and retrieving checkbox states, updating progress bar values and their display,
// saving the state to local storage, and toggling the visibility of UI elements like stop auto increment buttons.

export let progressIds = []; // Array to hold references to currently checked progress bar elements.

// This function is for saves the checked state of a checkbox to local storage.
export function saveCheckboxState(key, isChecked) {
  localStorage.setItem(key, JSON.stringify(isChecked));
}

// Function to handle event listeners dynamically
export function attachCheckboxEventListeners(bar, checkbox) {
  checkbox.addEventListener("change", () =>
    saveCheckboxState(bar.key, checkbox.checked)
  );
}

// This function is for  Updates progress bar's percentage.
export function updateProgressValue(progress) {
  const percentage = progress.nextElementSibling;
  percentage.textContent = `${progress.value}%`;
}

// For saves the current value of the progress bar to local storage.
export function saveProgressToLocalStorage(progress) {
  localStorage.setItem(progress.id, progress.value);
}

// Gets all the checked checkboxes and saves their related progress bars in the 'progressIds' array.
export function getCheckedProgressBar() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  progressIds = Array.from(checkboxes).map((checkbox) => {
    const progressId = `progress-${checkbox.id.split("-")[1]}`; // create the progress bar ID based on the checkbox ID.
    return document.getElementById(progressId);
  });
}

// Toggles the visibility of two elements. When the user clicks auto-increment, it switches to stop auto-increment and vice versa.
export function toggleVisibility(elementIdToHide, elementIdToShow) {
  document.getElementById(elementIdToHide).classList.add("hidden");
  document.getElementById(elementIdToShow).classList.remove("hidden");
}
