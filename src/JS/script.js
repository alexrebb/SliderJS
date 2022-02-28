import updateSlidesIndexes from "./updateSlidesIndexes.js";
import addControlsBar from "./addControlsBar.js";
import setEventsClickDrag from "./setEventsClickDrag.js";
import transitionSlides from "./transitionSlides.js";

export default function startSlider({
  containerId,
  widthSlider,
  heightSlider,
  autoPlay,
  autoPlayTime,
  hideButtons,
  slideTransitionTime,
  startSlide,
}) {
  const container = document.getElementById(containerId);
  const slidesContainer = document.createElement("div");

  while (container.children.length !== 0) {
    slidesContainer.appendChild(container.children[0]);
  }
  container.appendChild(slidesContainer);
  slidesContainer.classList.add("container");

  function getSlides() {
    const slides = [...slidesContainer.children];
    return slides;
  }

  const stateSlider = {
    slidesElements: [],
    isTransitioning: false,
    currentSlide: startSlide - 1,
  };
  stateSlider.slidesElements = getSlides();

  let stateSlideIndexes = {};
  let slidesCount = stateSlider.slidesElements.length;

  function setupInputParameters() {
    if (widthSlider) {
      slidesContainer.style.width = `${widthSlider}${"px"}`;
    }
    if (heightSlider) {
      slidesContainer.style.height = `${heightSlider}${"px"}`;
    }
  }

  function initialSetupSlides() {
    function appendCopyElementsToContainer(elementsContainer) {
      slidesContainer.appendChild(elementsContainer);
      stateSlider.slidesElements.push(elementsContainer);
    }

    if (slidesCount === 1) {
      appendCopyElementsToContainer(
        stateSlider.slidesElements[0].cloneNode(true)
      );
      appendCopyElementsToContainer(
        stateSlider.slidesElements[0].cloneNode(true)
      );
      stateSlider.slidesElements = getSlides();
    }
    if (slidesCount === 2) {
      appendCopyElementsToContainer(
        stateSlider.slidesElements[0].cloneNode(true)
      );
      appendCopyElementsToContainer(
        stateSlider.slidesElements[1].cloneNode(true)
      );
      stateSlider.slidesElements = getSlides();
    }

    slidesCount = stateSlider.slidesElements.length;

    stateSlideIndexes = updateSlidesIndexes({
      currentIndex: stateSlider.currentSlide,
      sliderContainer: slidesCount,
    });

    for (let i = 0; i < stateSlider.slidesElements.length; i += 1) {
      stateSlider.slidesElements[i].classList.add("sliderJs_hide");
    }
    stateSlider.slidesElements[
      stateSlideIndexes.updateCurrentIndex
    ].classList.remove("sliderJs_hide");
    stateSlider.slidesElements[
      stateSlideIndexes.updateRightIndex
    ].classList.remove("sliderJs_hide");
    stateSlider.slidesElements[
      stateSlideIndexes.updateRightIndex
    ].style.left = `${widthSlider}${"px"}`;
    stateSlider.slidesElements[
      stateSlideIndexes.updateLeftIndex
    ].classList.remove("sliderJs_hide");
    stateSlider.slidesElements[
      stateSlideIndexes.updateLeftIndex
    ].style.left = `${-widthSlider}${"px"}`;
  }

  function slideNext() {
    if (stateSlider.isTransitioning) {
      return;
    }
    transitionSlides({
      direction: "right",
      sliderContainer: stateSlider.slidesElements,
      stateIndexes: stateSlideIndexes,
      width: widthSlider,
    });

    stateSlideIndexes = updateSlidesIndexes({
      direction: "right",
      currentIndex: stateSlideIndexes.updateCurrentIndex,
      sliderContainer: slidesCount,
    });
  }

  const slidePrev = () => {
    if (stateSlider.isTransitioning) {
      return;
    }
    transitionSlides({
      direction: "left",
      sliderContainer: stateSlider.slidesElements,
      stateIndexes: stateSlideIndexes,
      width: widthSlider,
    });
    stateSlideIndexes = updateSlidesIndexes({
      direction: "left",
      currentIndex: stateSlideIndexes.updateCurrentIndex,
      sliderContainer: slidesCount,
    });
  };

  function addEventTransitionStart() {
    container.addEventListener("transitionstart", () => {
      stateSlider.isTransitioning = true;
    });
  }

  function addEventTransitionEnd() {
    container.addEventListener("transitionend", () => {
      stateSlider.isTransitioning = false;
    });
  }

  function setSlidesTransitionTime() {
    if (!slideTransitionTime) {
      return;
    }
    for (let i = 0; i < slidesCount; i += 1) {
      stateSlider.slidesElements[
        i
      ].style.transition = `all ${slideTransitionTime}s cubic-bezier(.45,.05,.55,.95) 0s`;
    }
  }

  addEventTransitionStart();
  addEventTransitionEnd();
  setupInputParameters();
  initialSetupSlides();
  setSlidesTransitionTime();
  addControlsBar(
    {
      container,
      slideNext,
      slidePrev,
    },
    {
      autoPlayTime,
      autoPlay,
      slideTransitionTime,
      hideButtons,
    }
  );
  setEventsClickDrag(container, slidePrev, slideNext);
}
