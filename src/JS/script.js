import getLeftIndex from "./getLeftIndex.js";
import getRightIndex from "./getRightIndex.js";
import getCurrentIndex from "./getCurrentIndex.js";
import setupForOneTwoSlides from "./setupForOneTwoSlides.js";
import addControlsBar from "./addControlsBar.js";
import setEventsClickDrag from "./setEventsClickDrag.js";


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

    const slidesElements = getSlides();

    let currentSlide = startSlide - 1;
    let rightSlide = 0;
    let leftSlide = 0;
    let isTransitioning = false;
    

    function setupInputParameters() {
        if (widthSlider) {
            slidesContainer.style.width = `${widthSlider}${'px'}`;
        }
        if (heightSlider) {
            slidesContainer.style.height = `${heightSlider}${'px'}`;
        }
    }

    function reindexSlides(directionSlide) {
        if(directionSlide) {
            currentSlide = getCurrentIndex(directionSlide, currentSlide, slidesElements);
        }
        rightSlide = getRightIndex(currentSlide, slidesElements);
        leftSlide = getLeftIndex(currentSlide, slidesElements);
    }

    function setupSlides() {
        reindexSlides();
        for (let i = 0; i < slidesElements.length; i+=1) {
            slidesElements[i].classList.add('sliderJs_hide');
        }
        slidesElements[currentSlide].classList.remove('sliderJs_hide');
        slidesElements[rightSlide].classList.remove('sliderJs_hide');
        slidesElements[rightSlide].style.left = `${widthSlider}${'px'}`;
        slidesElements[leftSlide].classList.remove('sliderJs_hide');
        slidesElements[leftSlide].style.left = `${-widthSlider}${'px'}`;
    }
    

    function transitionSlideRight() {
        
        slidesElements[leftSlide].classList.add('sliderJs_hide');
        slidesElements[currentSlide].style.left = `${-widthSlider}${'px'}`; 
        slidesElements[rightSlide].style.left = `${0}${'px'}`;
        
        setTimeout(() => {
            reindexSlides('right');
            slidesElements[rightSlide].style.left = `${widthSlider}${'px'}`;
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
        },1000);
    }

    function transitionSlideLeft() {
        
        slidesElements[rightSlide].classList.add('sliderJs_hide');
        slidesElements[currentSlide].style.left = `${widthSlider}${'px'}`; 
        slidesElements[leftSlide].style.left = `${0}${'px'}`;
        
        setTimeout(() => {
            reindexSlides('left');
            slidesElements[leftSlide].style.left = `${-widthSlider}${'px'}`;
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
        },1000);
    }

    function nextSlide() {
        if (isTransitioning) {
            return;
        }
        transitionSlideRight();
    }

    function prevSlide() {
        if (isTransitioning) {
            return;
        }
        transitionSlideLeft();
    }

    function addEventTransitionStart() {
        container.addEventListener('transitionstart', () => {
            isTransitioning = true;
        });
    }
    
    function addEventTransitionEnd() {
        
        container.addEventListener('transitionend', () => {
            isTransitioning = false;
        });
    }

    addEventTransitionStart();
    addEventTransitionEnd();

    function setSlidesTransitionTime() {
        if (slideTransitionTime) {
            for (let i = 0; i < slidesElements.length; i+=1) {
                slidesElements[i].style.transition = `all ${slideTransitionTime}s cubic-bezier(.45,.05,.55,.95) 0s`;
            }
        }
    }

    setSlidesTransitionTime();
    setupInputParameters();
    setupForOneTwoSlides(slidesContainer, slidesElements);
    setupSlides();
    addControlsBar(container, nextSlide, autoPlayTime, prevSlide, autoPlay, slideTransitionTime, hideButtons);
    setEventsClickDrag(container,prevSlide,nextSlide);
    
}