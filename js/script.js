const carouselItems = document.getElementById('carousel-items');
const flashcardSlider = document.getElementById('flashcard-slider');
const carouselBtnLeft = document.getElementById('carousel-btn-left');
const carouselBtnRight = document.getElementById('carousel-btn-right');

const flashcardCheckboxWrapper = document.getElementById('presentation-flashcard-types');

let sliderDirection = 'right';

const maxIndex = flashcardCheckboxWrapper.childElementCount - 1;
let prevFlashcardIndex = 0;
let activeFlashcardIndex = 0;
let activePrevDiff;

let valueToSlide;

/**
 * Slide a container to the left or right by the given value.
 *
 * @param slider - parent container which contains items to slide
 * @param justifyContent - The expected value of justify-content property
 * @param transformValue - The expected value of transform property
 */

function slideItem(slider, justifyContent, transformValue) {
    if (sliderDirection === 'left') {
        for (let i = 0; i < Math.abs(activePrevDiff); i++) {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
            carouselItems.style.justifyContent = 'flex-end';
        }
    } else if (sliderDirection === 'right') {
        for (let i = 0; i < Math.abs(activePrevDiff); i++) {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
            carouselItems.style.justifyContent = 'flex-start';
        }
    }

    flashcardSlider.style.transform = valueToSlide;
}


function checkCurrentCardType(direction) {
    let presentationCurrentFlashcard;

    if (direction === 'right') {
        presentationCurrentFlashcard = flashcardSlider.children[1].getElementsByClassName('card')[0].dataset.cardType;
    } else if (direction === 'left') {
        presentationCurrentFlashcard = flashcardSlider.children[flashcardSlider.children.length - 2].getElementsByClassName('card')[0].dataset.cardType;
    }

    return presentationCurrentFlashcard;
}

function updateSliderDirection() {
    if (activePrevDiff === -maxIndex) {
        sliderDirection = 'right';
    } else if (activePrevDiff === maxIndex) {
        sliderDirection = 'left';
    } else if (activePrevDiff > 0) {
        sliderDirection = 'right';
    } else if (activePrevDiff < 0) {
        sliderDirection = 'left';
    }
}

function updateValueToSlide() {
    if (activePrevDiff !== Math.abs(maxIndex)) {
        valueToSlide = -25 * activePrevDiff + '%'
    } else {
        valueToSlide = activePrevDiff / activePrevDiff * 25 + '%';
    }
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
    sliderDirection = 'right';
    updateFlashcardIndex();
    slideItem(flashcardSlider, 'flex-start', 'translateX(-25%)');
    updateCheckedFlashcard(checkCurrentCardType('right'));
});

carouselBtnLeft.addEventListener('click', () => {
    sliderDirection = 'left';
    updateFlashcardIndex();
    slideItem(flashcardSlider, 'flex-end', 'translateX(25%)');
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

flashcardCheckboxWrapper.addEventListener('click', (e) => {
    if (e.target.type === 'radio') {
        const targetID = e.target.getAttribute('data-card-id');
        prevFlashcardIndex = activeFlashcardIndex;
        activeFlashcardIndex = targetID * 1;

        updateIndexDiff();
        updateSliderDirection();
    }
})

function updateFlashcardIndex() {
    if (sliderDirection === 'right') {
        prevFlashcardIndex = activeFlashcardIndex;

        if (activeFlashcardIndex === maxIndex) {
            activeFlashcardIndex = 0;
        } else {
            activeFlashcardIndex++;
        }
    } else if (sliderDirection === 'left') {
        prevFlashcardIndex = activeFlashcardIndex;

        if (activeFlashcardIndex === 0) {
            activeFlashcardIndex = maxIndex;
        } else {
            activeFlashcardIndex--;
        }
    }

    updateIndexDiff();
}

function updateIndexDiff() {
    activePrevDiff = activeFlashcardIndex - prevFlashcardIndex;

    updateValueToSlide();
}

