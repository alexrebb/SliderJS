export default function addControlsBar(container, nextSlide, autoPlayTime, prevSlide, autoPlay, slideTransitionTime, hideButtons) {

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
