// This function is for  Updates progress bar's percentage.
export function updateProgressValue(progress) {
  const percentage = progress.nextElementSibling;
  percentage.textContent = `${progress.value}%`;
}

export let progressIds = []; // Array to hold references to currently checked progress bar elements.

// Gets all the checked checkboxes and saves their related progress bars in the 'progressIds' array.
export function getCheckedProgressBar() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  progressIds = Array.from(checkboxes).map((checkbox) => {
    const progressId = checkbox.dataset.progress;
    return document.getElementById(progressId);
  });
}

// Toggles the visibility of two elements. When the user clicks auto-increment, it switches to stop auto-increment and vice versa.
export function toggleVisibility(elementIdToHide, elementIdToShow) {
  document.getElementById(elementIdToHide).classList.add("hidden");
  document.getElementById(elementIdToShow).classList.remove("hidden");
}
