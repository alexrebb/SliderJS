import startSlider from '/src/JS/script.js';


window.addEventListener('DOMContentLoaded', () =>{
    startSlider({
        containerId: '#container',
        widthSlider: 800,
        heightSlider: 600,
        timeSlideTransition: 1,    
        autoPlay: false,
        autoPlayTime: 1500,
        hideButtons: false,
        startSlide: 0
    });
});