import updateSlidesIndexes from "../updateSlidesIndexes.js";

describe("testing", () => {
  it("After right: Updating indexes under boundary conditions", () => {
    const state = {
      direction: "right",
      currentIndex: 2,
      sliderContainer: 3,
    };

    expect(updateSlidesIndexes(state)).toStrictEqual({
      updateCurrentIndex: 0,
      updateLeftIndex: 2,
      updateRightIndex: 1,
    });
  });

  it("After left: Updating indexes under boundary conditions", () => {
    const state = {
      direction: "left",
      currentIndex: 0,
      sliderContainer: 3,
    };

    expect(updateSlidesIndexes(state)).toStrictEqual({
      updateCurrentIndex: 2,
      updateLeftIndex: 1,
      updateRightIndex: 0,
    });
  });
  it("After right: Updating indexes under boundary conditions", () => {
    const state = {
      direction: "right",
      currentIndex: 4,
      sliderContainer: 5,
    };

    expect(updateSlidesIndexes(state)).toStrictEqual({
      updateCurrentIndex: 0,
      updateLeftIndex: 4,
      updateRightIndex: 1,
    });
  });

  it("After left: Updating indexes under boundary conditions", () => {
    const state = {
      direction: "left",
      currentIndex: 0,
      sliderContainer: 5,
    };

    expect(updateSlidesIndexes(state)).toStrictEqual({
      updateCurrentIndex: 4,
      updateLeftIndex: 3,
      updateRightIndex: 0,
    });
  });
});
