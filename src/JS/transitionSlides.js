import updateSlidesIndexes from "./updateSlidesIndexes.js";

export default function transitionSlides({direction, sliderContainer, width, stateIndexes} ) {

    let updateSlides = {};

    if (direction === 'right') {

        sliderContainer[stateIndexes.updateLeftIndex].classList.add('sliderJs_hide');
        sliderContainer[stateIndexes.updateCurrentIndex].style.left = `${-width}${'px'}`; 
        sliderContainer[stateIndexes.updateRightIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            
            updateSlides = updateSlidesIndexes({
                direction: 'right',
                currentIndex: stateIndexes.updateCurrentIndex,
                sliderContainer,
            });

            sliderContainer[updateSlides.updateRightIndex].style.left = `${width}${'px'}`;
            sliderContainer[updateSlides.updateRightIndex].classList.remove('sliderJs_hide');
            sliderContainer[updateSlides.updateLeftIndex].classList.remove('sliderJs_hide');
        },1000);
    }
    if (direction === 'left') {

        sliderContainer[stateIndexes.updateRightIndex].classList.add('sliderJs_hide');
        sliderContainer[stateIndexes.updateCurrentIndex].style.left = `${width}${'px'}`; 
        sliderContainer[stateIndexes.updateLeftIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            updateSlides = updateSlidesIndexes({
                    direction: 'left',
                    currentIndex: stateIndexes.updateCurrentIndex,
                    sliderContainer,
                });

            sliderContainer[updateSlides.updateLeftIndex].style.left = `${-width}${'px'}`;
            sliderContainer[updateSlides.updateLeftIndex].classList.remove('sliderJs_hide');
            sliderContainer[updateSlides.updateRightIndex].classList.remove('sliderJs_hide');
        },1000);
    }
}
