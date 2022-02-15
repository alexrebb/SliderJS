/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/JS/addControlsBar.js":
/*!**********************************!*\
  !*** ./src/JS/addControlsBar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addControlsBar)
/* harmony export */ });
function addControlsBar({container, slideNext, slidePrev}, {autoPlayTime, autoPlay, slideTransitionTime, hideButtons}) {

    const controlsBar = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const startBtn = document.createElement('button');
    const stopBtn = document.createElement('button');
    let interval;

    function hideAllButtons() {
        for (let i = 0; i < controlsBar.children.length; i+=1) {
            controlsBar.children[i].classList.add('sliderJs_hide');
        }
    }

    function startAutoPlay() {
        hideAllButtons();
        stopBtn.classList.remove('sliderJs_hide');
        interval = setInterval(slideNext, autoPlayTime);
    }

    function stopAutoPlay() {

        for (let i = 0; i < controlsBar.children.length; i+=1) {
            controlsBar.children[i].classList.remove('sliderJs_hide');
        }                            
        stopBtn.classList.add('sliderJs_hide');
        clearInterval(interval);
    }

    function addControlElement(buttonsName, text) {
        controlsBar.appendChild(buttonsName);
        buttonsName.innerHTML = text;
    }
    
    controlsBar.classList.add('sliderJs_wrapper-button');
    container.appendChild(controlsBar);
    addControlElement(prevBtn, 'PREV');
    addControlElement(nextBtn, 'NEXT');
    addControlElement(startBtn, 'START');
    addControlElement(stopBtn, 'STOP');
    stopBtn.classList.add('sliderJs_hide');
    
    for (let i = 0; i < controlsBar.children.length; i+=1) {
        controlsBar.children[i].classList.add('sliderJs_btn');
    }

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);
    startBtn.addEventListener('click', startAutoPlay);
    stopBtn.addEventListener('click', stopAutoPlay);

    if (autoPlay && autoPlayTime >= slideTransitionTime) {
        startAutoPlay();
    }
    if (hideButtons) {
        hideAllButtons();
    }
    
}


/***/ }),

/***/ "./src/JS/script.js":
/*!**************************!*\
  !*** ./src/JS/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startSlider)
/* harmony export */ });
/* harmony import */ var _updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateSlidesIndexes.js */ "./src/JS/updateSlidesIndexes.js");
/* harmony import */ var _addControlsBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addControlsBar.js */ "./src/JS/addControlsBar.js");
/* harmony import */ var _setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setEventsClickDrag.js */ "./src/JS/setEventsClickDrag.js");
/* harmony import */ var _transitionSlides_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transitionSlides.js */ "./src/JS/transitionSlides.js");






function startSlider({containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, slideTransitionTime, startSlide }) {
    
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
        isTransitioning: false,
        currentSlide: startSlide - 1,
    };
    stateSlider.slidesElements = getSlides();

    let stateSlideIndexes = {};
        
    function setupInputParameters() {
        if (widthSlider) {
            slidesContainer.style.width = `${widthSlider}${'px'}`;
        }
        if (heightSlider) {
            slidesContainer.style.height = `${heightSlider}${'px'}`;
        }
    }

    function initialSetupSlides() {
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

        stateSlideIndexes = (0,_updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
            currentIndex: stateSlider.currentSlide,
            sliderContainer: stateSlider.slidesElements
        }); 
        
        for (let i = 0; i < stateSlider.slidesElements.length; i+=1) {
            stateSlider.slidesElements[i].classList.add('sliderJs_hide');
        }
        stateSlider.slidesElements[stateSlideIndexes.updateCurrentIndex].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateSlideIndexes.updateRightIndex].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateSlideIndexes.updateRightIndex].style.left = `${widthSlider}${'px'}`;
        stateSlider.slidesElements[stateSlideIndexes.updateLeftIndex].classList.remove('sliderJs_hide');
        stateSlider.slidesElements[stateSlideIndexes.updateLeftIndex].style.left = `${-widthSlider}${'px'}`;

    }

    function slideNext() {
        if (stateSlider.isTransitioning) {
            return;
        }
        (0,_transitionSlides_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            direction: 'right',
            sliderContainer: stateSlider.slidesElements,
            stateIndexes: stateSlideIndexes,
            width: widthSlider,
        });
        
        stateSlideIndexes = (0,_updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
            direction: 'right',
            currentIndex: stateSlideIndexes.updateCurrentIndex,
            sliderContainer: stateSlider.slidesElements
        });
    }

    const slidePrev = () => {
        if (stateSlider.isTransitioning) {
            return;
        }
        (0,_transitionSlides_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            direction: 'left',
            sliderContainer: stateSlider.slidesElements,
            stateIndexes: stateSlideIndexes,
            width: widthSlider,
        });
        stateSlideIndexes = (0,_updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
            direction: 'left',
            currentIndex: stateSlideIndexes.updateCurrentIndex,
            sliderContainer: stateSlider.slidesElements
        });
    };


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
    setupInputParameters();
    initialSetupSlides();
    setSlidesTransitionTime();
    (0,_addControlsBar_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
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
    (0,_setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_2__["default"])(container, slidePrev, slideNext);
    
}


/***/ }),

/***/ "./src/JS/setEventsClickDrag.js":
/*!**************************************!*\
  !*** ./src/JS/setEventsClickDrag.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setEventsClickDrag)
/* harmony export */ });

function setEventsClickDrag(container,slidePrev,slideNext) {
    
    let mouseDownXPosition;
    let currentSlideWasChanged = false;

    function dragging(event) {
        const positionDragX = event.pageX;
        const dragShift = positionDragX - mouseDownXPosition;
    
        if(dragShift > 50 && !currentSlideWasChanged) {
            slidePrev();
            currentSlideWasChanged = true;
    
        }
        if(dragShift < -50 && !currentSlideWasChanged) {
            slideNext();
            currentSlideWasChanged = true;
        }
    }
    
    function startDrag(event) {
        currentSlideWasChanged = false;
        event.preventDefault();
        mouseDownXPosition = event.pageX;
        container.addEventListener('pointermove', dragging);
    }
    
    function stopDrag() {
        container.removeEventListener('pointermove', dragging);
    }
    
    container.addEventListener('pointerdown', startDrag);
    container.addEventListener('pointerup', stopDrag);
}



/***/ }),

/***/ "./src/JS/transitionSlides.js":
/*!************************************!*\
  !*** ./src/JS/transitionSlides.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionSlides)
/* harmony export */ });
/* harmony import */ var _updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateSlidesIndexes.js */ "./src/JS/updateSlidesIndexes.js");


function transitionSlides({direction, sliderContainer, width, stateIndexes} ) {

    if (direction === 'right') {

        sliderContainer[stateIndexes.updateLeftIndex].classList.add('sliderJs_hide');
        sliderContainer[stateIndexes.updateCurrentIndex].style.left = `${-width}${'px'}`; 
        sliderContainer[stateIndexes.updateRightIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            
            const stateIndexesAfterRightTransition = (0,_updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
                direction: 'right',
                currentIndex: stateIndexes.updateCurrentIndex,
                sliderContainer,
            });

            sliderContainer[stateIndexesAfterRightTransition.updateRightIndex].style.left = `${width}${'px'}`;
            sliderContainer[stateIndexesAfterRightTransition.updateRightIndex].classList.remove('sliderJs_hide');
            sliderContainer[stateIndexesAfterRightTransition.updateLeftIndex].classList.remove('sliderJs_hide');
        },1000);
    }
    if (direction === 'left') {

        sliderContainer[stateIndexes.updateRightIndex].classList.add('sliderJs_hide');
        sliderContainer[stateIndexes.updateCurrentIndex].style.left = `${width}${'px'}`; 
        sliderContainer[stateIndexes.updateLeftIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            const stateIndexesAfterLeftTransition = (0,_updateSlidesIndexes_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
                    direction: 'left',
                    currentIndex: stateIndexes.updateCurrentIndex,
                    sliderContainer,
                });

            sliderContainer[stateIndexesAfterLeftTransition.updateLeftIndex].style.left = `${-width}${'px'}`;
            sliderContainer[stateIndexesAfterLeftTransition.updateLeftIndex].classList.remove('sliderJs_hide');
            sliderContainer[stateIndexesAfterLeftTransition.updateRightIndex].classList.remove('sliderJs_hide');
        },1000);
    }
}


/***/ }),

/***/ "./src/JS/updateSlidesIndexes.js":
/*!***************************************!*\
  !*** ./src/JS/updateSlidesIndexes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSlidesIndexes)
/* harmony export */ });
function updateSlidesIndexes({direction, currentIndex, sliderContainer}) {
    
    let updateCurrentIndex = 0;
    let updateLeftIndex;
    let updateRightIndex;

    // Update currentIndex
    if (direction === 'right' && currentIndex === sliderContainer.length - 1) {
        updateCurrentIndex = 0;
    }else if (direction === 'right'){
        updateCurrentIndex = currentIndex + 1;
    }

    if (direction === 'left' && currentIndex === 0) {
        updateCurrentIndex = sliderContainer.length - 1;
    }else if (direction === 'left'){
        updateCurrentIndex = currentIndex - 1;
    }

    // Update leftIndex

    if (updateCurrentIndex === 0) {
        updateLeftIndex = sliderContainer.length - 1;
    }
    if (updateCurrentIndex === sliderContainer.length - 1) {
        updateLeftIndex = updateCurrentIndex - 1;
    }
    if (updateCurrentIndex !== 0 && updateCurrentIndex !== sliderContainer.length - 1) { 
        updateLeftIndex = updateCurrentIndex - 1;
    }

    // Update rightIndex

    if (updateCurrentIndex === 0) {
        updateRightIndex = updateCurrentIndex + 1;
    }
    if (updateCurrentIndex === sliderContainer.length - 1) {
        updateRightIndex = 0;
    }
    if (updateCurrentIndex !== 0 && updateCurrentIndex !== sliderContainer.length - 1) { 
        updateRightIndex = updateCurrentIndex + 1;
    }
    return {updateCurrentIndex, updateLeftIndex, updateRightIndex};
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./example/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/JS/script.js */ "./src/JS/script.js");
/* eslint-disable no-undef */


document.addEventListener("DOMContentLoaded", () => {
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
    
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container1',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
    
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container2',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
    
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container3',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
    
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container4',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
    
    (0,_src_JS_script_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        containerId: 'container5',
        widthSlider: 600,
        heightSlider: 400,
        slideTransitionTime: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 1
    });
});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map