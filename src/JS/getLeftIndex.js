export default function getLeftIndex(currentIndex, elements) {
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