import { getCheckedProgressBar, progressIds } from "../Utils";

describe("getCheckedProgressBar", () => {
  beforeEach(() => {
    progressIds.length = 0;

    document.body.innerHTML = `
      <input type="checkbox" data-progress="progress-1" checked />
      <input type="checkbox" data-progress="progress-2" checked />
      <input type="checkbox" data-progress="progress-3" />
      <progress id="progress-1" value="50" max="100"></progress>
      <progress id="progress-2" value="75" max="100"></progress>
      <progress id="progress-3" value="90" max="100"></progress>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should populate progressIds with checked progress bars", () => {
    getCheckedProgressBar();

    expect(progressIds).toHaveLength(2);
    expect(progressIds).toEqual([
      document.getElementById("progress-1"),
      document.getElementById("progress-2"),
    ]);
  });

  it("should handle the case when no checkboxes are checked", () => {
    document.body.innerHTML = `
      <input type="checkbox" data-progress="progress-1" />
      <input type="checkbox" data-progress="progress-2" />
      <progress id="progress-1" value="50" max="100"></progress>
      <progress id="progress-2" value="75" max="100"></progress>
    `;

    getCheckedProgressBar();

    expect(progressIds).toHaveLength(0);
  });
});
