function startSlider({containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, slideTransitionTime, startSlide }) {
    
    const container = document.getElementById(containerId);
    const slidesContainer = document.createElement('div');
    while (container.children.length !== 0) {
        slidesContainer.appendChild(container.children[0]);
    }
    container.appendChild(slidesContainer);
    slidesContainer.classList.add('container');
    const slidesElements = getSlides();

    let interval;
    let currentSlide = startSlide - 1;
    let rightSlide = 0;
    let leftSlide = 0;
    let mouseDownXPosition;
    let isTransitioning = false;
    let currentSlideWasChanged = false;

    function setupInputParameters() {
        if (widthSlider) {
            slidesContainer.style.width = widthSlider + 'px';
        }
        if (heightSlider) {
            slidesContainer.style.height = heightSlider + 'px';
        }

    }

    function getSlides() {
        const slides = [...slidesContainer.children];
        return slides;
    }

    function appendElement(tagName) {
        slidesContainer.appendChild(tagName);
        slidesElements.push(tagName);
    }

    function setupForOneTwoSlides() {
        if(slidesContainer.children[0].localName === 'img') {

            if (slidesElements.length === 1) {
            
                const img = slidesElements[0].cloneNode(true);
                appendElement(img);
    
                const img1 = slidesElements[0].cloneNode(true);
                appendElement(img1);
            }

            if (slidesElements.length === 2) {
                
                const img2 = slidesElements[0].cloneNode(true);
                appendElement(img2);
    
                const img3 = slidesElements[1].cloneNode(true);
                appendElement(img3);
            }
        }

        if(slidesContainer.children[0].localName === 'div') {

            if (slidesElements.length === 1) {
            
                const div = slidesElements[0].cloneNode(true);
                appendElement(div);
    
                const div1 = slidesElements[0].cloneNode(true);
                appendElement(div1);
            }
            if (slidesElements.length === 2) {
                
                const div2 = slidesElements[0].cloneNode(true);
                appendElement(div2);
    
                const div3 = slidesElements[1].cloneNode(true);
                appendElement(div3);
            }
        }
    }

    function  getIndexSlides() {
        if (currentSlide === 0) {
            leftSlide = slidesElements.length - 1;
            rightSlide = currentSlide + 1;
        }
        if (currentSlide === slidesElements.length - 1) {
            rightSlide = 0;
            leftSlide = currentSlide - 1;
        }
        if (currentSlide !== 0 && currentSlide !== slidesElements.length - 1) { 
            leftSlide = currentSlide - 1;
            rightSlide = currentSlide + 1;
        }
    }


    function reindexSlides(direction) {
        if (direction === 'right' && currentSlide === slidesElements.length - 1) {
            currentSlide = 0;
        }else if (direction === 'right'){
            currentSlide++;
        }

        if (direction === 'left' && currentSlide === 0) {
            currentSlide = slidesElements.length - 1;
        }else if (direction === 'left'){
            currentSlide--;
        }
        getIndexSlides();
    }

    
    function setupSlides() {
        reindexSlides();
        for (let i = 0; i < slidesElements.length; i++) {
            slidesElements[i].classList.add('sliderJs_hide');
        }
        slidesElements[currentSlide].classList.remove('sliderJs_hide');
        slidesElements[rightSlide].classList.remove('sliderJs_hide');
        slidesElements[rightSlide].style.left = widthSlider + 'px';
        slidesElements[leftSlide].classList.remove('sliderJs_hide');
        slidesElements[leftSlide].style.left = -widthSlider + 'px';
    }
    

    function transitionSlideRight() {
        
        slidesElements[leftSlide].classList.add('sliderJs_hide');
        slidesElements[currentSlide].style.left = -widthSlider + 'px'; 
        slidesElements[rightSlide].style.left = 0 + 'px';
        
        setTimeout(() => {
            reindexSlides('right');
            slidesElements[rightSlide].style.left = widthSlider + 'px';
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
        },1000);
    }

    function transitionSlideLeft() {
        
        slidesElements[rightSlide].classList.add('sliderJs_hide');
        slidesElements[currentSlide].style.left = widthSlider + 'px'; 
        slidesElements[leftSlide].style.left = 0 + 'px';
        
        setTimeout(() => {
            reindexSlides('left');
            slidesElements[leftSlide].style.left = -widthSlider + 'px';
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

    function addControlsBar() {
        const controlsBar = document.createElement('div');
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        const startBtn = document.createElement('button');
        const stopBtn = document.createElement('button');

        setSlidesTransitionTime();
        
        controlsBar.classList.add('sliderJs_wrapper-button');
        container.appendChild(controlsBar);
        addControlElement(prevBtn, 'PREV');
        addControlElement(nextBtn, 'NEXT');
        addControlElement(startBtn, 'START');
        addControlElement(stopBtn, 'STOP');
        stopBtn.classList.add('sliderJs_hide');
        
        for (let i = 0; i < controlsBar.children.length; i++) {
            controlsBar.children[i].classList.add('sliderJs_btn');
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        startBtn.addEventListener('click', startAutoPlay);
        stopBtn.addEventListener('click', stopAutoPlay);

        function addControlElement(buttonsName, text) {
            controlsBar.appendChild(buttonsName);
            buttonsName.innerHTML = text;
        }

        function startAutoPlay() {
            hideAllButtons();
            stopBtn.classList.remove('sliderJs_hide');
            interval = setInterval(nextSlide, autoPlayTime);
            container.removeEventListener('pointerdown', startDrag);
        }
    
        function stopAutoPlay() {
    
            for (let i = 0; i < controlsBar.children.length; i++) {
                controlsBar.children[i].classList.remove('sliderJs_hide');
            }                            
            stopBtn.classList.add('sliderJs_hide');
            clearInterval(interval);
            container.addEventListener('pointerdown', startDrag);
        }

        function hideAllButtons() {
            for (let i = 0; i < controlsBar.children.length; i++) {
                controlsBar.children[i].classList.add('sliderJs_hide')
            }
        }
        if (autoPlay && autoPlayTime >= slideTransitionTime) {
            startAutoPlay();
        }
        if (hideButtons) {
            hideAllButtons();
        }
    }

    function setEventsClickAndDrag() {
        addEventTransitionStart();
        addEventTransitionEnd();
        container.addEventListener('pointerdown', startDrag);
        window.addEventListener('pointerup', stopDrag);
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


    function startDrag(event) {
        if (isTransitioning) {
            return;
        }
        currentSlideWasChanged = false;
        event.preventDefault();
        mouseDownXPosition = event.pageX;
        window.addEventListener('pointermove', dragging);
    }

    function stopDrag() {
        window.removeEventListener('pointermove', dragging);
    }

    function dragging(event) {
        const positionDragX = event.pageX;
        const dragShift = positionDragX - mouseDownXPosition;

        if(dragShift > 50 && dragShift > 0 && !currentSlideWasChanged) {
            prevSlide();
            currentSlideWasChanged = true;

        }
        if(dragShift < -50 && dragShift < 0 && !currentSlideWasChanged) {
            nextSlide();
            currentSlideWasChanged = true;
        }
    }

    function setSlidesTransitionTime() {
        if (slideTransitionTime) {
            for (let i = 0; i < slidesElements.length; i++) {
                slidesElements[i].style.transition = `all ${slideTransitionTime}s cubic-bezier(.45,.05,.55,.95) 0s`;
            }
        }
    }

    setupInputParameters();
    setupForOneTwoSlides();
    setupSlides();
    addControlsBar();
    setEventsClickAndDrag();
}






