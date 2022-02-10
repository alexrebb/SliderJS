function setupForOneTwoSlides(container, elements) {
    function appendElement(element) {
        container.appendChild(element);
        elements.push(element);
    }

    if (elements.length === 1) {
        appendElement(elements[0].cloneNode(true));
        appendElement(elements[0].cloneNode(true));
    }
    if (elements.length === 2) {
        appendElement(elements[0].cloneNode(true));
        appendElement(elements[1].cloneNode(true));
    }
}

export default setupForOneTwoSlides;