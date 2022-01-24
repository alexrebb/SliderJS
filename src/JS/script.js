function startSlider({containerId, widthSlider, heightSlider, autoPlay, autoPlayTime, hideButtons, timeSlideTransition, startSlide }) {
    
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector(containerId);
    const width = window.getComputedStyle(container).width;
    const dragImg = document.querySelector('.slide');
    const imagesBtn = document.querySelectorAll('.image-btn');

    const prevBtn = document.querySelector('.btn1');
    const nextBtn = document.querySelector('.btn2');
    const startBtn = document.querySelector('.btn3');
    const stopBtn = document.querySelector('.btn4');

    const sliderElements = [];
    let currentSlideWasChanged = false;
    let interval;
    let currentSlide = startSlide;
    let rightSlide = currentSlide + 1;
    let leftSlide = sliderElements.length - 1;
    let defaultDragShift = 0;
    let clickX;
    let startX;
    let transitionStatus = false;

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


    function hideAllButtons() {
        for (let i = 0; i < imagesBtn.length; i++) {
            imagesBtn[i].style.display = 'none';
        }
    }

    function drawElements() {
        draw(currentSlide, 0);
        getRightSlideIndex(currentSlide);
        draw(rightSlide, 1);
        getLeftSlideIndex(currentSlide);
        draw(leftSlide, -1);
    }
    drawElements();

    function draw(slide, set) {
        for (let i = 0; i < slides.length; i++) {
            sliderElements[i] = slides[i].src;
            slides[i].remove();
        }
        const img = document.createElement('img');
        img.src = sliderElements[slide];
        img.classList.add('slide');
        img.style.left = set * deleteNotDigits(width) + 'px';
        document.querySelector('#container').appendChild(img);
    }

    function getLeftSlideIndex(step) {
        if(step === 0) {
            return leftSlide = sliderElements.length - 1;
        } else return leftSlide = step - 1; 
        
    }

    function getRightSlideIndex(step) {
        if(step === sliderElements.length - 1) {
            return rightSlide = 0;
        } else return rightSlide = step + 1; 
        
    }

    function nextSlide() {
        if (transitionStatus) {
            return
        }
        
        if (currentSlide + 1 === sliderElements.length) {
            currentSlide = 0;
        }else {
            currentSlide++;
        }
        transitionSlide(1, 0, 0);
    }
    function prevSlide() {
        if (transitionStatus) {
            return
        }
        
        if (currentSlide === 0) {
            currentSlide = sliderElements.length - 1;
        }else {
            currentSlide--;
        }
        transitionSlide(2, 0, 0);
    }

    function setTimeSlideTransition() {
        if (timeSlideTransition) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.transition = `all ease ${timeSlideTransition}s`;
            }
        }
    }

    function transitionSlide(slideIndex, currentSlideIndex, set) {
        
        setTimeSlideTransition();
        const transitionSlides = document.querySelectorAll('.slide');
        
        transitionSlides[currentSlideIndex].style.left = set * deleteNotDigits(width) + 'px'; 
        transitionSlides[slideIndex].style.left = set * deleteNotDigits(width) + 'px';
        
        setTimeout(function() {
            for (let i = 0; i < transitionSlides.length; i++) {
                transitionSlides[i].remove();
            }
            drawElements();
            
            
        },timeSlideTransition + 1050)
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
    setEventsClick();

    function setEventsDrag() {
        container.addEventListener('pointerdown', startDrag);
        window.addEventListener('pointerup', stopDrag);
    }
    setEventsDrag();

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
        clickX = event.pageX;
        startX = defaultDragShift;
        window.addEventListener('pointermove', dragging);
    }

    function stopDrag() {
        window.removeEventListener('pointermove', dragging);
    }

    function dragging(event) {
        let dragX = event.pageX;
        const dragShift = dragX - clickX;
        defaultDragShift = startX + dragShift;
        setPosition(defaultDragShift);

        if(dragShift > 50 && dragShift > 0 && !currentSlideWasChanged) {
            prevSlide();
            currentSlideWasChanged = true;

        }
        if(dragShift < 50 && dragShift < 0 && !currentSlideWasChanged) {
            nextSlide();
            currentSlideWasChanged = true;
        }
    }

    function setPosition() {
        dragImg.style.transform = `translate3d(${defaultDragShift}px, 0, 0)`;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    

}

export default startSlider;




