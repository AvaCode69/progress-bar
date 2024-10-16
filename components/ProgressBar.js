// Use template literals to create the progress bar HTML
export function createProgressContainer(bar, value, isChecked) {
  return `
    <div class="progress-container">
      <input type="checkbox" data-progress="${bar.id}" ${
    isChecked ? "checked" : ""
  } />
      <progress id="${
        bar.id
      }" value="${value}" min="0" max="100" class="progress ${bar.id}" 
        style="--progress-color: ${bar.color};"></progress>
      <strong class="progress-percentage">${value}%</strong>
    </div>
  `;
}
