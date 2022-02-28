export default function updateSlidesIndexes({
  direction,
  currentIndex,
  sliderContainer,
}) {
  let updateCurrentIndex = 0;
  let updateLeftIndex;
  let updateRightIndex;

  // Update currentIndex
  if (direction === "right" && currentIndex === sliderContainer - 1) {
    updateCurrentIndex = 0;
  } else if (direction === "right") {
    updateCurrentIndex = currentIndex + 1;
  }

  if (direction === "left" && currentIndex === 0) {
    updateCurrentIndex = sliderContainer - 1;
  } else if (direction === "left") {
    updateCurrentIndex = currentIndex - 1;
  }

  // Update leftIndex

  if (updateCurrentIndex === 0) {
    updateLeftIndex = sliderContainer - 1;
  }
  if (updateCurrentIndex === sliderContainer - 1) {
    updateLeftIndex = updateCurrentIndex - 1;
  }
  if (updateCurrentIndex !== 0 && updateCurrentIndex !== sliderContainer - 1) {
    updateLeftIndex = updateCurrentIndex - 1;
  }

  // Update rightIndex

  if (updateCurrentIndex === 0) {
    updateRightIndex = updateCurrentIndex + 1;
  }
  if (updateCurrentIndex === sliderContainer - 1) {
    updateRightIndex = 0;
  }
  if (updateCurrentIndex !== 0 && updateCurrentIndex !== sliderContainer - 1) {
    updateRightIndex = updateCurrentIndex + 1;
  }
  return { updateCurrentIndex, updateLeftIndex, updateRightIndex };
}
