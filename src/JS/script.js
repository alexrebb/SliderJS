function startSlider({wrapperId, containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, slideTransitionTime, startSlide }) {
    
    const container = document.getElementById(containerId);
    const wrapper = document.getElementById(wrapperId);
    const slidesElements = getSlides();
    container.classList.add('container');

    let interval;
    let currentSlide = startSlide - 1;
    let rightSlide = 0;
    let leftSlide = 0;
    let mouseDownXPosition;
    let isTransitioning = false;
    let currentSlideWasChanged = false;

    function setupInputParameters() {
        if (widthSlider) {
            container.style.width = widthSlider + 'px';
        }
        if (heightSlider) {
            container.style.height = heightSlider + 'px';
        }

    }

    function getSlides() {
        const slides = [...container.children];
        return slides;
    }

    function setupForOneTwoSlides() {
        if(container.children[0].localName === 'img') {

            if (slidesElements.length === 1) {
            
                const img = document.createElement('img')
                img.src = slidesElements[0].src;
                container.appendChild(img);
                slidesElements.push(img);
    
                const img1 = document.createElement('img')
                img1.src = slidesElements[0].src;
                container.appendChild(img1);
                slidesElements.push(img1);
            }

            if (slidesElements.length === 2) {
                
                const img2 = document.createElement('img')
                img2.src = slidesElements[0].src;
                container.appendChild(img2);
                slidesElements.push(img2);
    
                const img3 = document.createElement('img')
                img3.src = slidesElements[1].src;
                container.appendChild(img3);
                slidesElements.push(img3);
            }
        }

        if(container.children[0].localName === 'div') {
            if (slidesElements.length === 1) {
            
                const div = document.createElement('div')
                div.innerHTML = slidesElements[0].innerHTML;
                div.style.background = slidesElements[0].style.background;
                container.appendChild(div);
                slidesElements.push(div);
    
                const div1 = document.createElement('div')
                div1.innerHTML = slidesElements[0].innerHTML;
                div1.style.background = slidesElements[0].style.background;
                container.appendChild(div1);
                slidesElements.push(div1);
            }
            if (slidesElements.length === 2) {
                
                const div2 = document.createElement('div')
                div2.innerHTML = slidesElements[0].innerHTML;
                div2.style.background = slidesElements[0].style.background;
                container.appendChild(div2);
                slidesElements.push(div2);
    
                const div3 = document.createElement('div')
                div3.innerHTML = slidesElements[1].innerHTML;
                div3.style.background = slidesElements[1].style.background;
                container.appendChild(div3);
                slidesElements.push(div3);
            }
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

        if(currentSlide === 0) {
            leftSlide = slidesElements.length - 1;
            rightSlide = currentSlide + 1
        }else if(currentSlide === slidesElements.length - 1) {
            rightSlide = 0;
            leftSlide = currentSlide - 1;
        }else {
            leftSlide = currentSlide - 1;
            rightSlide = currentSlide + 1
        }
             
    }
    
    function setupSlides() {
        reindexSlides();
        console.log(currentSlide);
        console.log(leftSlide);
        console.log(rightSlide);
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
        },1000)
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
        },1000)
    }

    function nextSlide() {
        if (isTransitioning) {
            return
        }
        transitionSlideRight();
    }

    function prevSlide() {
        if (isTransitioning) {
            return
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
        wrapper.appendChild(controlsBar);
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

        function addControlElement(name, text) {
            controlsBar.appendChild(name);
            name.innerHTML = text;
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
        })
    }
        
    
    function addEventTransitionEnd() {
        
        container.addEventListener('transitionend', () => {
            isTransitioning = false;
        })
    }


    function startDrag(event) {
        if (isTransitioning) {
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






