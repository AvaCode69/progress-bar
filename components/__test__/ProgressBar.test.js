import {
  createCheckbox,
  createProgressBar,
  createProgressPercentage,
  createProgressContainer,
} from "../ProgressBar.js";

describe("ProgressBar Functions", () => {
  const mockBar = {
    key: "bar-1",
    id: "progress-1",
    color: "red",
  };

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("createCheckbox creates a checkbox with correct attributes", () => {
    const checkbox = createCheckbox(mockBar, true);

    expect(checkbox.type).toBe("checkbox");
    expect(checkbox.id).toBe(mockBar.key);
    expect(checkbox.checked).toBe(true);
  });

  test("createProgressBar creates a progress element with correct attributes", () => {
    const progress = createProgressBar(mockBar, 50);

    expect(progress.id).toBe(mockBar.id);
    expect(progress.value).toBe(50);
    expect(progress.max).toBe(100);
    expect(progress.classList.contains("progress")).toBe(true);
    expect(progress.style.getPropertyValue("--progress-color")).toBe(
      mockBar.color
    );
  });

  test("createProgressPercentage creates a strong element with correct text", () => {
    const percentage = createProgressPercentage(75);

    expect(percentage.classList.contains("progress-percentage")).toBe(true);
    expect(percentage.textContent).toBe("75%");
  });

  test("createProgressContainer creates a container with checkbox, progress bar, and percentage", () => {
    const container = createProgressContainer(mockBar, 50, true);

    expect(container.classList.contains("progress-container")).toBe(true);

    const checkbox = container.querySelector('input[type="checkbox"]');
    const progress = container.querySelector("progress");
    const percentage = container.querySelector(".progress-percentage");

    expect(checkbox).toBeTruthy();
    expect(progress).toBeTruthy();
    expect(percentage).toBeTruthy();

    expect(checkbox.checked).toBe(true);
    expect(progress.value).toBe(50);
    expect(percentage.textContent).toBe("50%");
  });
});
