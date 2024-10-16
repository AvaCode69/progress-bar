import { createProgressContainer } from "../ProgressBar";

describe("ProgressBar Module", () => {
  describe("createProgressContainer", () => {
    it("should create a progress container HTML string", () => {
      const bar = { id: "progress-1", color: "blue" };
      const value = 60;
      const isChecked = true;

      const result = createProgressContainer(bar, value, isChecked);
      expect(result).toContain('id="progress-1"');
      expect(result).toContain('data-progress="progress-1"');
      expect(result).toContain("checked");
      expect(result).toContain('value="60"');
      expect(result).toContain('style="--progress-color: blue;"');
    });

    it("should not include checked attribute when isChecked is false", () => {
      const bar = { id: "progress-1", color: "blue" };
      const value = 50;
      const isChecked = false;

      const result = createProgressContainer(bar, value, isChecked);
      expect(result).not.toContain("checked");
    });
  });
});
