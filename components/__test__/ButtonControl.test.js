import { increaseProgress, decreaseProgress } from "../ButtonControl";
import { updateProgressValue, progressIds } from "../../composable/Utils";

jest.mock("../../composable/Utils", () => ({
  updateProgressValue: jest.fn(),
  getCheckedProgressBar: jest.fn(),
  progressIds: [],
}));

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(),
    },
    writable: true,
  });
});

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

      expect(mockProgress1.value).toBe(50); //(40 + 10 = 50)
      expect(mockProgress2.value).toBe(100); //(93 + 10 = 100)

      expect(updateProgressValue).toHaveBeenCalledWith(mockProgress1);
      expect(updateProgressValue).toHaveBeenCalledWith(mockProgress2);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        mockProgress1.id,
        mockProgress1.value
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        mockProgress2.id,
        mockProgress2.value
      );
    });
  });

  describe("decreaseProgress", () => {
    it("should decrease progress value by 10 and update display and storage", () => {
      const mockProgress1 = { value: 40, id: "progress-1" };
      const mockProgress2 = { value: 5, id: "progress-2" };

      progressIds.push(mockProgress1, mockProgress2);

      decreaseProgress();

      expect(mockProgress1.value).toBe(30); //(40 - 10  =  30)
      expect(mockProgress2.value).toBe(0); //(5 - 10 = 0)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        mockProgress1.id,
        mockProgress1.value
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        mockProgress2.id,
        mockProgress2.value
      );
    });
  });
});
