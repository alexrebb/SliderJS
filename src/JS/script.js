function startSlider({wrapperId, containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, timeSlideTransition, startSlide }) {
    
    const container = document.querySelector(containerId);
    const slidesElements = getSlides();
    const wrapper = document.querySelector(wrapperId);
    
    let interval;
    let currentSlide = startSlide - 1;
    let rightSlide = currentSlide + 1;
    let leftSlide = slidesElements - 1;
    let mouseDownXPosition;
    let transitionStatus = false;
    let currentSlideWasChanged = false;
    

    function getSlides() {
        const slides = [];
        for (var i = 0; i < container.children.length; i++) {
            container.children[i].classList.add('sliderJs_slide');
            slides.push(container.children[i]);
            
        }
        return slides;
    }

    function setupForOneTwoSlides() {
        const slider = [];
        if (slidesElements.length === 1) {
            for (let i = 0; i < slidesElements.length; i++) {
                slider[i] = slidesElements[i].src;
            }
            const img = document.createElement('img')
            img.src = slider[0];
            img.classList.add('sliderJs_slide');
            container.appendChild(img);
            slidesElements.push(img);

            const img1 = document.createElement('img')
            img1.src = slider[0];
            img1.classList.add('sliderJs_slide');
            container.appendChild(img1);
            slidesElements.push(img1);
        }
        if (slidesElements.length === 2) {
            for (let i = 0; i < slidesElements.length; i++) {
                slider[i] = slidesElements[i].src;
            }
            
            const img2 = document.createElement('img')
            img2.src = slider[0];
            img2.classList.add('sliderJs_slide');
            container.appendChild(img2);
            slidesElements.push(img2);

            const img3 = document.createElement('img')
            img3.src = slider[1];
            img3.classList.add('sliderJs_slide');
            container.appendChild(img3);
            slidesElements.push(img3);

        }
    }


    function getLeftSlideIndex(step) {
        if(step === 0) {
            return leftSlide = slidesElements.length - 1;
        } else return leftSlide = step - 1; 
    }

    function getRightSlideIndex(step) {
        if(step === slidesElements.length - 1) {
            return rightSlide = 0;
        } else return rightSlide = step + 1; 
        
    }

    
    function setupSlides() {
        getLeftSlideIndex(currentSlide);
        getRightSlideIndex(currentSlide);
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
        
        setTimeout(function() {
            if (currentSlide === slidesElements.length - 1) {
                currentSlide = 0;
            }else{
                currentSlide++;
            }
            getRightSlideIndex(currentSlide);
            getLeftSlideIndex(currentSlide);
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
            slidesElements[rightSlide].style.left = widthSlider + 'px';
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
        
        },timeSlideTransition * 1000)
        
    }

    function transitionSlideLeft() {
        
        slidesElements[rightSlide].classList.add('sliderJs_hide');
        slidesElements[currentSlide].style.left = widthSlider + 'px'; 
        slidesElements[leftSlide].style.left = 0 + 'px';
        
        setTimeout(function() {
            if (currentSlide === 0) {
                currentSlide = slidesElements.length - 1;
            }else {
                currentSlide--;
            }
            getRightSlideIndex(currentSlide);
            getLeftSlideIndex(currentSlide);
            slidesElements[leftSlide].style.left = -widthSlider + 'px';
            slidesElements[leftSlide].classList.remove('sliderJs_hide');
            slidesElements[rightSlide].classList.remove('sliderJs_hide');
        
        },timeSlideTransition * 1000)
    }

    function nextSlide() {
        if (transitionStatus) {
            return
        }
        
        transitionSlideRight();
    }

    function prevSlide() {
        if (transitionStatus) {
            return
        }
        
        transitionSlideLeft();
    }


    function setTimeSlideTransition() {
        if (timeSlideTransition) {
            for (let i = 0; i < slidesElements.length; i++) {
                slidesElements[i].style.transition = `all ${timeSlideTransition}s cubic-bezier(.45,.05,.55,.95) 0s`;
            }
        }
    }
    setTimeout(() => {
        setTimeSlideTransition();
    }, 0)

    function addControlsBar() {
        const controlsBar = document.createElement('div');
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        const startBtn = document.createElement('button');
        const stopBtn = document.createElement('button');
        
        controlsBar.classList.add('sliderJs_wrapper-button');
        wrapper.appendChild(controlsBar);
        addElement(prevBtn, 'PREV');
        addElement(nextBtn, 'NEXT');
        addElement(startBtn, 'START');
        addElement(stopBtn, 'STOP');
        stopBtn.classList.add('sliderJs_hide');
        
        for (let i = 0; i < controlsBar.children.length; i++) {
            controlsBar.children[i].classList.add('sliderJs_btn');
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        startBtn.addEventListener('click', startAutoPlay);
        stopBtn.addEventListener('click', stopAutoPlay);

        function addElement(name, text) {
            controlsBar.appendChild(name);
            name.innerHTML = text;
        }

        function startAutoPlay() {
            hideAllButtons();
            stopBtn.style.display = 'block';
            stopBtn.style.margin = '0 auto';
            
            interval = setInterval(nextSlide, autoPlayTime);
        }
    
        function stopAutoPlay() {
    
            for (let i = 0; i < controlsBar.children.length; i++) {
                controlsBar.children[i].style.display = 'block';
            }
            stopBtn.style.display = 'none';
            clearInterval(interval);
            
        }
        function hideAllButtons() {
            for (let i = 0; i < controlsBar.children.length; i++) {
                controlsBar.children[i].style.display = 'none';
            }
        }
        function setupInputParameters() {
            if (widthSlider) {
                container.style.width = widthSlider + 'px';
            }
            if (heightSlider) {
                container.style.height = heightSlider + 'px';
            }
            if (autoPlay && autoPlayTime >= timeSlideTransition) {
                startAutoPlay();
            }
            if (hideButtons) {
                hideAllButtons();
            }
        }
        setupInputParameters();
    }


    function setEventsClickAndDrag() {
        addEventTransitionStart();
        addEventTransitionEnd();
        container.addEventListener('pointerdown', startDrag);
        window.addEventListener('pointerup', stopDrag);
    }
    

    function addEventTransitionStart() {
        container.addEventListener('transitionstart', () => {
                transitionStatus = true;
        })
    }
        
    
    function addEventTransitionEnd() {
        
        container.addEventListener('transitionend', () => {
            transitionStatus = false;
        })
    }


    function startDrag(event) {
        if (transitionStatus) {
            return
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
        let positionDragX = event.pageX;
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
    
    setupForOneTwoSlides();

    setupSlides();
    
    addControlsBar();
    
    setEventsClickAndDrag();

}






