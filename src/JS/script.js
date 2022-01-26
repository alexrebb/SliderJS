function startSlider({containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, timeSlideTransition, startSlide }) {
    
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector(containerId);
    const imagesBtn = document.querySelectorAll('.image-btn');

    const prevBtn = document.querySelector('.btn1');
    const nextBtn = document.querySelector('.btn2');
    const startBtn = document.querySelector('.btn3');
    const stopBtn = document.querySelector('.btn4');
    
    
    let interval;
    let currentSlide = startSlide;
    let rightSlide = currentSlide + 1;
    let leftSlide = slides.length - 1;
    let mouseDownXPosition;
    let transitionStatus = false;
    let currentSlideWasChanged = false;


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


    function hideAllButtons() {
        for (let i = 0; i < imagesBtn.length; i++) {
            imagesBtn[i].style.display = 'none';
        }
    }

    function drawSlide(slide, set) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.add('hide');
        }
        slides[slide].classList.add('show');
        slides[slide].style.left = set * widthSlider + 'px'
        
    }
    function setupSlides() {
        drawSlide(currentSlide, 0);
        getRightSlideIndex(currentSlide);
        drawSlide(rightSlide, 1);
        getLeftSlideIndex(currentSlide);
        drawSlide(leftSlide, -1);
    }
    

    function transitionSlideRight() {
        
        setTimeSlideTransition();
        
        slides[currentSlide].style.left = -widthSlider + 'px'; 
        slides[rightSlide].style.left = 0 + 'px';
        slides[leftSlide].classList.remove('show');
        
        setTimeout(function() {
            if (currentSlide === slides.length - 1) {
                currentSlide = 0;
            }else {
                currentSlide++;
            }
            getRightSlideIndex(currentSlide);
            getLeftSlideIndex(currentSlide);
            slides[rightSlide].classList.add('show');
            slides[rightSlide].style.left = widthSlider + 'px';
        },timeSlideTransition + 1050)
    }


    function transitionSlideLeft() {
        
        setTimeSlideTransition();
        
        slides[currentSlide].style.left = widthSlider + 'px'; 
        slides[leftSlide].style.left = 0 + 'px';
        slides[rightSlide].classList.remove('show');
        
        setTimeout(function() {
            if (currentSlide === 0) {
                currentSlide = slides.length - 1;
            }else {
                currentSlide--;
            }
            getRightSlideIndex(currentSlide);
            getLeftSlideIndex(currentSlide);
            slides[leftSlide].classList.add('show');
            slides[leftSlide].style.left = -widthSlider + 'px';
        },timeSlideTransition + 1050)
    }


    function getLeftSlideIndex(step) {
        if(step === 0) {
            return leftSlide = slides.length - 1;
        } else return leftSlide = step - 1; 
        
    }


    function getRightSlideIndex(step) {
        if(step === slides.length - 1) {
            return rightSlide = 0;
        } else return rightSlide = step + 1; 
        
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
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.transition = `all ease ${timeSlideTransition}s`;
            }
        }
    }


    function startAutoPlay() {
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block'
        stopBtn.style.margin = '0 auto'
        interval = setInterval(nextSlide, autoPlayTime);
    }

    function stopAutoPlay() {
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
        startBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        clearInterval(interval);
        
    }


    function setEventsClick() {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        startBtn.addEventListener('click', startAutoPlay);
        stopBtn.addEventListener('click', stopAutoPlay);
        addEventTransitionStart();
        addEventTransitionEnd();
    }
    

    function setEventsDrag() {
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

    setupInputParameters();
    setupSlides();
    setEventsClick();
    setEventsDrag();

}

export default startSlider;




