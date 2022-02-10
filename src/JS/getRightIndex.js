export default function getRightIndex(currentIndex, elements) {
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





