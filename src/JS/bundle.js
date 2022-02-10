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
function addControlsBar(container, nextSlide, autoPlayTime, prevSlide, autoPlay, slideTransitionTime, hideButtons) {

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
        interval = setInterval(nextSlide, autoPlayTime);
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

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
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

/***/ "./src/JS/getCurrentIndex.js":
/*!***********************************!*\
  !*** ./src/JS/getCurrentIndex.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCurrentIndex)
/* harmony export */ });
function getCurrentIndex(direction, currentIndex, elements) {
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

/***/ "./src/JS/getLeftIndex.js":
/*!********************************!*\
  !*** ./src/JS/getLeftIndex.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLeftIndex)
/* harmony export */ });
function getLeftIndex(currentIndex, elements) {
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

/***/ "./src/JS/getRightIndex.js":
/*!*********************************!*\
  !*** ./src/JS/getRightIndex.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getRightIndex)
/* harmony export */ });
function getRightIndex(currentIndex, elements) {
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
/* harmony import */ var _getLeftIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getLeftIndex.js */ "./src/JS/getLeftIndex.js");
/* harmony import */ var _getRightIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getRightIndex.js */ "./src/JS/getRightIndex.js");
/* harmony import */ var _getCurrentIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCurrentIndex.js */ "./src/JS/getCurrentIndex.js");
/* harmony import */ var _setupForOneTwoSlides_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setupForOneTwoSlides.js */ "./src/JS/setupForOneTwoSlides.js");
/* harmony import */ var _addControlsBar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addControlsBar.js */ "./src/JS/addControlsBar.js");
/* harmony import */ var _setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setEventsClickDrag.js */ "./src/JS/setEventsClickDrag.js");








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

    function reindexSlides(directionSlide) {
        if(directionSlide) {
            currentSlide = (0,_getCurrentIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"])(directionSlide, currentSlide, slidesElements);
        }
        rightSlide = (0,_getRightIndex_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentSlide, slidesElements);
        leftSlide = (0,_getLeftIndex_js__WEBPACK_IMPORTED_MODULE_0__["default"])(currentSlide, slidesElements);
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
    (0,_setupForOneTwoSlides_js__WEBPACK_IMPORTED_MODULE_3__["default"])(slidesContainer, slidesElements);
    setupSlides();
    (0,_addControlsBar_js__WEBPACK_IMPORTED_MODULE_4__["default"])(container, nextSlide, autoPlayTime, prevSlide, autoPlay, slideTransitionTime, hideButtons);
    (0,_setEventsClickDrag_js__WEBPACK_IMPORTED_MODULE_5__["default"])(container,prevSlide,nextSlide);
    
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

function setEventsClickDrag(container,prevSlide,nextSlide) {
    
    let mouseDownXPosition;
    let currentSlideWasChanged = false;

    function dragging(event) {
        const positionDragX = event.pageX;
        const dragShift = positionDragX - mouseDownXPosition;
    
        if(dragShift > 50 && !currentSlideWasChanged) {
            prevSlide();
            currentSlideWasChanged = true;
    
        }
        if(dragShift < -50 && !currentSlideWasChanged) {
            nextSlide();
            currentSlideWasChanged = true;
        }
    }
    
    function startDrag(event) {
        currentSlideWasChanged = false;
        event.preventDefault();
        mouseDownXPosition = event.pageX;
        window.addEventListener('pointermove', dragging);
    }
    
    function stopDrag() {
        window.removeEventListener('pointermove', dragging);
    }
    
    container.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointerup', stopDrag);
}



/***/ }),

/***/ "./src/JS/setupForOneTwoSlides.js":
/*!****************************************!*\
  !*** ./src/JS/setupForOneTwoSlides.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function setupForOneTwoSlides(container, elements) {
    function appendElement(element) {
        container.appendChild(element);
        elements.push(element);
    }

    if (elements.length === 1) {
        appendElement(elements[0].cloneNode(true));
        appendElement(elements[0].cloneNode(true));
    }
    if (elements.length === 2) {
        appendElement(elements[0].cloneNode(true));
        appendElement(elements[1].cloneNode(true));
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupForOneTwoSlides);

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