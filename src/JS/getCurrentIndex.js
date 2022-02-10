export default function getCurrentIndex(direction, currentIndex, elements) {
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