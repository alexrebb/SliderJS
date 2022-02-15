import updateSlidesIndexes from "./updateSlidesIndexes.js";

export default function transitionSlides({direction, sliderContainer, leftIndex, rightIndex, currentIndex, width} ) {

    if (direction === 'right') {

        sliderContainer[leftIndex].classList.add('sliderJs_hide');
        sliderContainer[currentIndex].style.left = `${-width}${'px'}`; 
        sliderContainer[rightIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            updateSlidesIndexes({
                direction: 'right',
                currentIndex,
                rightIndex,
                leftIndex,
                sliderContainer
            });
            sliderContainer[rightIndex].style.left = `${width}${'px'}`;
            sliderContainer[rightIndex].classList.remove('sliderJs_hide');
            sliderContainer[leftIndex].classList.remove('sliderJs_hide');
        },1000);
    }
    if (direction === 'left') {

        sliderContainer[rightIndex].classList.add('sliderJs_hide');
        sliderContainer[currentIndex].style.left = `${width}${'px'}`; 
        sliderContainer[leftIndex].style.left = `${0}${'px'}`;
    
        setTimeout(() => {
            updateSlidesIndexes({
                    direction: 'left',
                    currentIndex,
                    rightIndex,
                    leftIndex,
                    sliderContainer
                });
            sliderContainer[leftIndex].style.left = `${-width}${'px'}`;
            sliderContainer[leftIndex].classList.remove('sliderJs_hide');
            sliderContainer[rightIndex].classList.remove('sliderJs_hide');
        },1000);
    }
}
