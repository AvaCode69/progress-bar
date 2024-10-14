import {
  getCheckedProgressBar,
  progressIds,
  attachCheckboxEventListeners,
} from "../Utils";

beforeEach(() => {
  // For Mock localStorage
  jest.clearAllMocks();
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
});
describe("Utils", () => {
  describe("getCheckedProgressBar", () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div>
        <progress id="progress-1" value="50" max="100"></progress>
        <input type="checkbox" id="checkbox-1" checked />
        <progress id="progress-2" value="30" max="100"></progress>
        <input type="checkbox" id="checkbox-2" />
        <progress id="progress-3" value="80" max="100"></progress>
        <input type="checkbox" id="checkbox-3" checked />
      </div>
    `;
    });

    afterEach(() => {
      progressIds.length = 0;
    });

    test("should populate progressIds with checked checkboxes", () => {
      getCheckedProgressBar();

      expect(progressIds).toHaveLength(2);
      expect(progressIds).toEqual([
        document.getElementById("progress-1"),
        document.getElementById("progress-3"),
      ]);
    });

    test("should be empty when no checkboxes are checked", () => {
      document.getElementById("checkbox-1").checked = false;
      document.getElementById("checkbox-3").checked = false;

      getCheckedProgressBar();

      expect(progressIds).toHaveLength(0);
    });
  });
  describe("attachCheckboxEventListeners", () => {
    it("should attach a change event listener to the checkbox", () => {
      const bar = { key: "bar1" };
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      attachCheckboxEventListeners(bar, checkbox);
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change"));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "bar1",
        JSON.stringify(true)
      );
    });
  });
});
