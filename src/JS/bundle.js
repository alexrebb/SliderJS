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
/* harmony import */ var _updateLeftIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateLeftIndex.js */ "./src/JS/updateLeftIndex.js");
/* harmony import */ var _updateRightIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateRightIndex.js */ "./src/JS/updateRightIndex.js");
/* harmony import */ var _updateCurrentIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateCurrentIndex.js */ "./src/JS/updateCurrentIndex.js");
/* harmony import */ var _addControlsBar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addControlsBar.js */ "./src/JS/addControlsBar.js");
/* harmony import */ var _setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setEventsClickDrag.js */ "./src/JS/setEventsClickDrag.js");







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

    function updateSlidesIndexes(directionSlide) {
        if(directionSlide) {
            currentSlide = (0,_updateCurrentIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"])(directionSlide, currentSlide, slidesElements);
        }
        rightSlide = (0,_updateRightIndex_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentSlide, slidesElements);
        leftSlide = (0,_updateLeftIndex_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentSlide, slidesElements);
    }

    function setupSlides() {
        function appendCopyElementsToContainer(elementsContainer) {
            slidesContainer.appendChild(elementsContainer);
            slidesElements.push(elementsContainer);
        }
    
        if (slidesElements.length === 1) {
            appendCopyElementsToContainer(slidesElements[0].cloneNode(true));
            appendCopyElementsToContainer(slidesElements[0].cloneNode(true));
        }
        if (slidesElements.length === 2) {
            appendCopyElementsToContainer(slidesElements[0].cloneNode(true));
            appendCopyElementsToContainer(slidesElements[1].cloneNode(true));
        }

        updateSlidesIndexes();

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
            updateSlidesIndexes('right');
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
            updateSlidesIndexes('left');
            slidesElements[leftSlide].style.left = `${-widthSlider}${'px'}`;
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
        },1000);
    }

    function slideNext() {
        if (isTransitioning) {
            return;
        }
        transitionSlideRight();
    }

    function slidePrev() {
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
        if (!slideTransitionTime) {
            return;
        }
        for (let i = 0; i < slidesElements.length; i+=1) {
            slidesElements[i].style.transition = `all ${slideTransitionTime}s cubic-bezier(.45,.05,.55,.95) 0s`;
        }
    }
    setupSlides();
    setSlidesTransitionTime();
    setupInputParameters();
    (0,_addControlsBar_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
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
    (0,_setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_4__["default"])(container, slidePrev, slideNext);
    
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

/***/ "./src/JS/updateCurrentIndex.js":
/*!**************************************!*\
  !*** ./src/JS/updateCurrentIndex.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateCurrentIndex)
/* harmony export */ });
function updateCurrentIndex(direction, currentIndex, elements) {
    let currentIndexValue;
    if (direction === 'right' && currentIndex === elements.length - 1) {
        currentIndexValue = 0;
    }else if (direction === 'right'){
        currentIndexValue = currentIndex + 1;
    }

    if (direction === 'left' && currentIndex === 0) {
        currentIndexValue = elements.length - 1;
    }else if (direction === 'left'){
        currentIndexValue = currentIndex - 1;
    }
    return currentIndexValue;
}

/***/ }),

/***/ "./src/JS/updateLeftIndex.js":
/*!***********************************!*\
  !*** ./src/JS/updateLeftIndex.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateLeftIndex)
/* harmony export */ });
function updateLeftIndex(currentIndex, elements) {
    let leftIndex;

    if (currentIndex === 0) {
        leftIndex = elements.length - 1;
    }
    if (currentIndex === elements.length - 1) {
        leftIndex = currentIndex - 1;
    }
    if (currentIndex !== 0 && currentIndex !== elements.length - 1) { 
        leftIndex = currentIndex - 1;
    }
    return leftIndex;
}

/***/ }),

/***/ "./src/JS/updateRightIndex.js":
/*!************************************!*\
  !*** ./src/JS/updateRightIndex.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateRightIndex)
/* harmony export */ });
function updateRightIndex(currentIndex, elements) {
    let rightIndex;

    if (currentIndex === 0) {
        rightIndex = currentIndex + 1;
    }
    if (currentIndex === elements.length - 1) {
        rightIndex = 0;
    }
    if (currentIndex !== 0 && currentIndex !== elements.length - 1) { 
        rightIndex = currentIndex + 1;
    }
    return rightIndex;
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