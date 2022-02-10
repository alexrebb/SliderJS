
export default function setEventsClickDrag(container,prevSlide,nextSlide) {
    
    let mouseDownXPosition;
    let currentSlideWasChanged = false;

    function dragging(event) {
        const positionDragX = event.pageX;
        const dragShift = positionDragX - mouseDownXPosition;
    
        if(dragShift > 50 && !currentSlideWasChanged) {
            prevSlide();
            currentSlideWasChanged = true;
    
        }
        if(dragShift < -50 && !currentSlideWasChanged) {
            nextSlide();
            currentSlideWasChanged = true;
        }
    }
    
    function startDrag(event) {
        currentSlideWasChanged = false;
        event.preventDefault();
        mouseDownXPosition = event.pageX;
        window.addEventListener('pointermove', dragging);
    }
    
    function stopDrag() {
        window.removeEventListener('pointermove', dragging);
    }
    
    container.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointerup', stopDrag);
}

