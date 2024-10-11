import { attachButtonListeners } from "../ProgressControl";
import {
  updateProgressDisplay,
  saveProgressToLocalStorage,
  getCheckedProgressBar,
  progressIds,
} from "../../composable/Utils";

jest.mock("../../composable/Utils", () => ({
  updateProgressDisplay: jest.fn(),
  saveProgressToLocalStorage: jest.fn(),
  getCheckedProgressBar: jest.fn(),
  progressIds: [],
}));

describe("ProgressControl button functionality", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="increaseBtn">Increase</button>
      <button id="decreaseBtn">Decrease</button>
      <button id="resetBtn">Reset</button>
        <button id="autoIncreaseBtn">Auto Increase</button>
      <button id="stopIncreaseBtn" class="hidden">Stop Increase</button>
      <progress id="progress-1" value="50" max="100"></progress>
      <input type="checkbox" id="checkbox-1" checked />



    `;

    attachButtonListeners();

    progressIds.length = 0;
    progressIds.push(document.getElementById("progress-1"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Increase button increments progress by 10", () => {
    const increaseBtn = document.getElementById("increaseBtn");
    const progress = document.getElementById("progress-1");

    increaseBtn.click();

    expect(progress.value).toBe(60); // 50 + 10 = 60

    expect(getCheckedProgressBar).toHaveBeenCalled();

    expect(updateProgressDisplay).toHaveBeenCalledWith(progress);
    expect(saveProgressToLocalStorage).toHaveBeenCalledWith(progress);
  });

  test("Decrease button decrements progress by 10", () => {
    const decreaseBtn = document.getElementById("decreaseBtn");
    const progress = document.getElementById("progress-1");

    decreaseBtn.click();

    expect(progress.value).toBe(40); // 50 - 10 = 40

    expect(updateProgressDisplay).toHaveBeenCalledWith(progress);
    expect(saveProgressToLocalStorage).toHaveBeenCalledWith(progress);
  });

  test("Progress does not go below 0 when decreased", () => {
    const decreaseBtn = document.getElementById("decreaseBtn");
    const progress = document.getElementById("progress-1");

    progress.value = 0;

    decreaseBtn.click();

    expect(progress.value).toBe(0);
  });

  test("Progress does not go above 100 when increased", () => {
    const increaseBtn = document.getElementById("increaseBtn");
    const progress = document.getElementById("progress-1");

    progress.value = 100;

    increaseBtn.click();

    expect(progress.value).toBe(100);
  });
});
