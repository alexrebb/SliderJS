export default function addControlsBar({container, slideNext, slidePrev}, {autoPlayTime, autoPlay, slideTransitionTime, hideButtons}) {

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
