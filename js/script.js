const carouselItems = document.getElementById('carousel-items');
const flashcardSlider = document.getElementById('flashcard-slider');
const carouselBtnLeft = document.getElementById('carousel-btn-left');
const carouselBtnRight = document.getElementById('carousel-btn-right');

let sliderDirection = 'right';

/**
 * Slide a container to the left or right by the given value.
 *
 * @param slider - parent container which contains items to slide
 * @param newDirection - direction where the container will be moved. Must be only "left" or "right"
 * @param justifyContent - The expected value of justify-content property
 * @param transformValue - The expected value of transform property
 */
function slideItem(slider, newDirection, justifyContent, transformValue) {
    if (sliderDirection !== newDirection) {
        if (sliderDirection === "right") {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
        } else if (sliderDirection === 'left') {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
        }
    }
    sliderDirection = newDirection;
    carouselItems.style.justifyContent = justifyContent;
    flashcardSlider.style.transform = transformValue;
}

function checkCurrentCardType(direction) {
    let presentationCurrentFlashcard;

    if (direction === 'right') {
        presentationCurrentFlashcard = flashcardSlider.children[1].getElementsByClassName('card')[0].dataset.cardType;
    } else if (direction === 'left') {
        presentationCurrentFlashcard = flashcardSlider.children[flashcardSlider.children.length - 2].getElementsByClassName('card')[0].dataset.cardType;
    }

    console.log(presentationCurrentFlashcard)
    return presentationCurrentFlashcard;
}

function updateCheckedFlashcard(typeToCheck) {
    const cardTypesCheckboxes = {
        classic: document.getElementById('radio-classic'),
        millionaire: document.getElementById('radio-millionaire'),
        gap: document.getElementById('radio-gap'),
        write: document.getElementById('radio-write'),
    }

    cardTypesCheckboxes[typeToCheck].checked = true;
}

carouselBtnRight.addEventListener('click', () => {
    slideItem(flashcardSlider, 'right', 'flex-start', 'translateX(-25%)');
    updateCheckedFlashcard(checkCurrentCardType('right'));
});

carouselBtnLeft.addEventListener('click', () => {
    slideItem(flashcardSlider, 'left', 'flex-end', 'translateX(25%)');
    updateCheckedFlashcard(checkCurrentCardType('left'));
});

flashcardSlider.addEventListener('transitionend', () => {
    if (sliderDirection === 'right') {
        flashcardSlider.appendChild(flashcardSlider.firstElementChild);
    } else if (sliderDirection === 'left') {
        flashcardSlider.prepend(flashcardSlider.lastElementChild);
    }

    flashcardSlider.style.transition = 'none';
    flashcardSlider.style.transform = 'none';
    setTimeout(() => flashcardSlider.style.transition = '1s');
});
