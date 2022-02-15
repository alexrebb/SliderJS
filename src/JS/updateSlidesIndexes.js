export default function updateSlidesIndexes({direction, currentIndex, rightIndex, leftIndex, sliderContainer}) {
    if(direction) {
        currentIndex = updateCurrentIndex(direction, currentIndex, sliderContainer);
    }
    rightIndex = updateRightIndex(currentIndex, sliderContainer);
    leftIndex = updateLeftIndex(currentIndex, sliderContainer);
}


function updateCurrentIndex(direction, currentIndex, elements) {
    let currentIndexValue;
    if (direction === 'right' && currentIndex === elements.length - 1) {
        currentIndexValue = 0;
    }else if (direction === 'right'){
        currentIndexValue = currentIndex + 1;
    }

    if (direction === 'left' && currentIndex === 0) {
        currentIndexValue = elements.length - 1;
    }else if (direction === 'left'){
        currentIndexValue = currentIndex - 1;
    }
    return currentIndexValue;
}

function updateLeftIndex(currentIndex, elements) {
    let leftIndex;

    if (currentIndex === 0) {
        leftIndex = elements.length - 1;
    }
    if (currentIndex === elements.length - 1) {
        leftIndex = currentIndex - 1;
    }
    if (currentIndex !== 0 && currentIndex !== elements.length - 1) { 
        leftIndex = currentIndex - 1;
    }
    return leftIndex;
}

function updateRightIndex(currentIndex, elements) {
    let rightIndex;

    if (currentIndex === 0) {
        rightIndex = currentIndex + 1;
    }
    if (currentIndex === elements.length - 1) {
        rightIndex = 0;
    }
    if (currentIndex !== 0 && currentIndex !== elements.length - 1) { 
        rightIndex = currentIndex + 1;
    }
    return rightIndex;
}