import updateSlidesIndexes from "./updateSlidesIndexes.js";
import addControlsBar from "./addControlsBar.js";
import setEventsClickDrag from "./setEventsClickDrag.js";
import transitionSlides from "./transitionSlides.js";


export default function startSlider({containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, slideTransitionTime, startSlide }) {
    
    const container = document.getElementById(containerId);
    const slidesContainer = document.createElement('div');

    while (container.children.length !== 0) {
        slidesContainer.appendChild(container.children[0]);
    }
    container.appendChild(slidesContainer);
    slidesContainer.classList.add('container');

    function getSlides() {
        const slides = [...slidesContainer.children];
        return slides;
    }

    const stateSlider = {
        slidesElements: [],
        isTransitioning: false
    }; 
    
    stateSlider.slidesElements = getSlides();

    const stateIndexes = {
        currentSlide: startSlide - 1,
        rightSlide: 0,
        leftSlide: 0
    };

    function setupInputParameters() {
        if (widthSlider) {
            slidesContainer.style.width = `${widthSlider}${'px'}`;
        }
        if (heightSlider) {
            slidesContainer.style.height = `${heightSlider}${'px'}`;
        }
    }

    function setupSlides() {
        function appendCopyElementsToContainer(elementsContainer) {
            slidesContainer.appendChild(elementsContainer);
            stateSlider.slidesElements.push(elementsContainer);
        }
    
        if (stateSlider.slidesElements.length === 1) {
            appendCopyElementsToContainer(stateSlider.slidesElements[0].cloneNode(true));
            appendCopyElementsToContainer(stateSlider.slidesElements[0].cloneNode(true));
            stateSlider.slidesElements = getSlides();
        }
        if (stateSlider.slidesElements.length === 2) {
            appendCopyElementsToContainer(stateSlider.slidesElements[0].cloneNode(true));
            appendCopyElementsToContainer(stateSlider.slidesElements[1].cloneNode(true));
            stateSlider.slidesElements = getSlides();
        }

        updateSlidesIndexes({
            sliderContainer: stateSlider.slidesElements,
            leftIndex: stateIndexes.leftSlide,
            rightIndex: stateIndexes.rightSlide,
            currentIndex: stateIndexes.currentSlide
        });

        for (let i = 0; i < stateSlider.slidesElements.length; i+=1) {
            stateSlider.slidesElements[i].classList.add('sliderJs_hide');
        }
        stateSlider.slidesElements[stateIndexes.currentSlide].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateIndexes.rightSlide].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateIndexes.rightSlide].style.left = `${widthSlider}${'px'}`;
        stateSlider.slidesElements[stateIndexes.leftSlide].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateIndexes.leftSlide].style.left = `${-widthSlider}${'px'}`;

    }


    function slideNext() {
        if (stateSlider.isTransitioning) {
            return;
        }
        transitionSlides({
            direction: 'right',
            sliderContainer: stateSlider.slidesElements,
            leftIndex: stateIndexes.leftSlide,
            rightIndex: stateIndexes.rightSlide,
            currentIndex: stateIndexes.currentSlide,
            width: widthSlider
        });
    }

    function slidePrev() {
        if (stateSlider.isTransitioning) {
            return;
        }
        transitionSlides({
            direction: 'left',
            sliderContainer: stateSlider.slidesElements,
            leftIndex: stateIndexes.leftSlide,
            rightIndex: stateIndexes.rightSlide,
            currentIndex: stateIndexes.currentSlide,
            width: widthSlider
        });
    }

    function addEventTransitionStart() {
        container.addEventListener('transitionstart', () => {
            stateSlider.isTransitioning = true;
        });
    }
    
    function addEventTransitionEnd() {
        container.addEventListener('transitionend', () => {
            stateSlider.isTransitioning = false;
        });
    }

    function setSlidesTransitionTime() {
        if (!slideTransitionTime) {
            return;
        }
        for (let i = 0; i < stateSlider.slidesElements.length; i+=1) {
            stateSlider.slidesElements[i].style.transition = `all ${slideTransitionTime}s cubic-bezier(.45,.05,.55,.95) 0s`;
        }
    }

    addEventTransitionStart();
    addEventTransitionEnd();
    setupSlides();
    setSlidesTransitionTime();
    setupInputParameters();
    addControlsBar({
        container,
        slideNext,
        slidePrev
    },
    {
        autoPlayTime,
        autoPlay,
        slideTransitionTime,
        hideButtons
    });
    setEventsClickDrag(container, slidePrev, slideNext);
    
}
