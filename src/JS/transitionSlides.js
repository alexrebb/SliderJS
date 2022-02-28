import updateSlidesIndexes from "./updateSlidesIndexes.js";

export default function transitionSlides({
  direction,
  sliderContainer,
  width,
  stateIndexes,
}) {
  if (direction === "right") {
    sliderContainer[stateIndexes.updateLeftIndex].classList.add(
      "sliderJs_hide"
    );
    sliderContainer[
      stateIndexes.updateCurrentIndex
    ].style.left = `${-width}${"px"}`;
    sliderContainer[stateIndexes.updateRightIndex].style.left = `${0}${"px"}`;

    setTimeout(() => {
      const stateIndexesAfterRightTransition = updateSlidesIndexes({
        direction: "right",
        currentIndex: stateIndexes.updateCurrentIndex,
        sliderContainer: sliderContainer.length,
      });

      sliderContainer[
        stateIndexesAfterRightTransition.updateRightIndex
      ].style.left = `${width}${"px"}`;
      sliderContainer[
        stateIndexesAfterRightTransition.updateRightIndex
      ].classList.remove("sliderJs_hide");
      sliderContainer[
        stateIndexesAfterRightTransition.updateLeftIndex
      ].classList.remove("sliderJs_hide");
    }, 1000);
  }
  if (direction === "left") {
    sliderContainer[stateIndexes.updateRightIndex].classList.add(
      "sliderJs_hide"
    );
    sliderContainer[
      stateIndexes.updateCurrentIndex
    ].style.left = `${width}${"px"}`;
    sliderContainer[stateIndexes.updateLeftIndex].style.left = `${0}${"px"}`;

    setTimeout(() => {
      const stateIndexesAfterLeftTransition = updateSlidesIndexes({
        direction: "left",
        currentIndex: stateIndexes.updateCurrentIndex,
        sliderContainer: sliderContainer.length,
      });

      sliderContainer[
        stateIndexesAfterLeftTransition.updateLeftIndex
      ].style.left = `${-width}${"px"}`;
      sliderContainer[
        stateIndexesAfterLeftTransition.updateLeftIndex
      ].classList.remove("sliderJs_hide");
      sliderContainer[
        stateIndexesAfterLeftTransition.updateRightIndex
      ].classList.remove("sliderJs_hide");
    }, 1000);
  }
}
