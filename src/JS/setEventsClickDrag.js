export default function setEventsClickDrag(container, slidePrev, slideNext) {
  let mouseDownXPosition;
  let currentSlideWasChanged = false;

  function dragging(event) {
    const positionDragX = event.pageX;
    const dragShift = positionDragX - mouseDownXPosition;

    if (dragShift > 50 && !currentSlideWasChanged) {
      slidePrev();
      currentSlideWasChanged = true;
    }
    if (dragShift < -50 && !currentSlideWasChanged) {
      slideNext();
      currentSlideWasChanged = true;
    }
  }

  function startDrag(event) {
    currentSlideWasChanged = false;
    event.preventDefault();
    mouseDownXPosition = event.pageX;
    container.addEventListener("pointermove", dragging);
  }

  function stopDrag() {
    container.removeEventListener("pointermove", dragging);
  }

  container.addEventListener("pointerdown", startDrag);
  container.addEventListener("pointerup", stopDrag);
}
