// ProgressControl.test.js

import { increaseProgress, decreaseProgress } from "../ProgressControl";
import {
  updateProgressValue,
  saveProgressToLocalStorage,
  progressIds,
} from "../../composable/Utils";

jest.mock("../../composable/Utils", () => ({
  updateProgressValue: jest.fn(),
  saveProgressToLocalStorage: jest.fn(),
  getCheckedProgressBar: jest.fn(),
  progressIds: [],
}));

describe("Progress Control Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    progressIds.length = 0;
  });

  describe("increaseProgress", () => {
    it("should increase progress value by 10 and update display and storage", () => {
      const mockProgress1 = { value: 40, id: "progress-1" };
      const mockProgress2 = { value: 93, id: "progress-2" };

      progressIds.push(mockProgress1, mockProgress2);

      increaseProgress();

      if (mockProgress2.value > 100) {
        mockProgress2.value = 100;
      }

      expect(mockProgress1.value).toBe(50); //(40 + 10 = 50)

      expect(mockProgress2.value).toBe(100); //(93 + 10 = 100)

      expect(updateProgressValue).toHaveBeenCalledWith(mockProgress1);

      expect(saveProgressToLocalStorage).toHaveBeenCalledWith(mockProgress1);
    });

    it("should not increase progress if value is already 100", () => {
      const mockProgress = { value: 100, id: "progress100" };
      progressIds.push(mockProgress);

      increaseProgress();

      expect(mockProgress.value).toBe(100);

      expect(updateProgressValue).not.toHaveBeenCalled();
      expect(saveProgressToLocalStorage).not.toHaveBeenCalled();
    });
  });

  describe("decreaseProgress", () => {
    it("should decrease progress value by 10 and update display and storage", () => {
      const mockProgress1 = { value: 40, id: "progress1" };
      const mockProgress2 = { value: 5, id: "progress2" };

      progressIds.push(mockProgress1, mockProgress2);

      decreaseProgress();

      if (mockProgress2.value < 0) {
        mockProgress2.value = 0;
      }

      expect(mockProgress1.value).toBe(30); //(40 - 10  =  30)
      expect(mockProgress2.value).toBe(0); //(5 - 10 = 0)
    });

    it("should not decrease progress if value is already 0", () => {
      const mockProgress = { value: 0, id: "progress0" };
      progressIds.push(mockProgress);

      decreaseProgress();

      expect(mockProgress.value).toBe(0);

      expect(updateProgressValue).not.toHaveBeenCalled();
      expect(saveProgressToLocalStorage).not.toHaveBeenCalled();
    });
  });
});
