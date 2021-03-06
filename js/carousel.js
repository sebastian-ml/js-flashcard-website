const flashcardSlider = document.getElementById('flashcard-slider');
const flashcardCheckboxWrapper = document.getElementById('presentation-flashcard-types');
const maxFlashcardIndex = flashcardCheckboxWrapper.childElementCount - 1;

const carousel = {
    items: document.getElementById('carousel-items'),

    btnLeft: document.getElementById('carousel-btn-left'),
    btnRight: document.getElementById('carousel-btn-right'),

    sliderDirection: 'right',
    prevSliderDirection: 'right',

    prevFlashcardID: 0,
    activeFlashcardID: 0,
    activePrevDifference: undefined,

    transformValue: undefined,
    numOfCardsToMove: 1,

    locked: false,
}

carousel.btnLeft.addEventListener('click', () => {
    if (carousel.locked === false) moveCarousel('left');
})

carousel.btnRight.addEventListener('click', () => {
    if (carousel.locked === false) moveCarousel('right');
})

flashcardSlider.addEventListener('transitionend', () => {
    for (let i = 0; i < carousel.numOfCardsToMove; i++) {
        if (carousel.sliderDirection === 'right') {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
        } else if (carousel.sliderDirection === 'left') {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
        }
    }

    flashcardSlider.style.transition = 'none';
    flashcardSlider.style.transform = 'none';
    setTimeout(() => flashcardSlider.style.transition = '1s');

    carousel.locked = false;
})

flashcardCheckboxWrapper.addEventListener('click', (e) => {
    if ((e.target.type === 'radio') && (carousel.locked === true)) {
        e.preventDefault();
    }
    else if ((e.target.type === 'radio') && (carousel.locked === false)) {
        carousel.locked = true;

        const targetID = e.target.getAttribute('data-card-id');
        carousel.prevFlashcardID = carousel.activeFlashcardID;
        carousel.activeFlashcardID = targetID * 1;
        carousel.prevSliderDirection = carousel.sliderDirection;

        runCarouselDefaultUpdates();
        slideItem(flashcardSlider);
    }
})

// direction - Can be only left or right. Must be a string
function moveCarousel(direction) {
    carousel.locked = true;

    carousel.prevSliderDirection = carousel.sliderDirection;
    carousel.sliderDirection = direction;

    updateFlashcardID();
    updateCheckedFlashcard();
    runCarouselDefaultUpdates();
    slideItem(flashcardSlider);
}

function updateFlashcardID() {
    if (carousel.sliderDirection === 'right') {
        carousel.prevFlashcardID = carousel.activeFlashcardID;

        if (carousel.activeFlashcardID === maxFlashcardIndex) {
            carousel.activeFlashcardID = 0;
        } else {
            carousel.activeFlashcardID++;
        }
    } else if (carousel.sliderDirection === 'left') {
        carousel.prevFlashcardID = carousel.activeFlashcardID;

        if (carousel.activeFlashcardID === 0) {
            carousel.activeFlashcardID = maxFlashcardIndex;
        } else {
            carousel.activeFlashcardID--;
        }
    }
}

function updateCheckedFlashcard() {
    const flashcardToCheck =
        document.querySelector(
            '[data-card-id="' + carousel.activeFlashcardID + '"]'
        );

    flashcardToCheck.checked = true;
}

function runCarouselDefaultUpdates() {
    updateIndexDifference();
    updateSliderDirection();
    updateValueToSlide(25);
}

function updateIndexDifference() {
    carousel.activePrevDifference =
        carousel.activeFlashcardID - carousel.prevFlashcardID;
}

function updateSliderDirection() {
    if (carousel.activePrevDifference === -maxFlashcardIndex) {
        carousel.sliderDirection = 'right';
    } else if (carousel.activePrevDifference === maxFlashcardIndex) {
        carousel.sliderDirection = 'left';
    } else if (carousel.activePrevDifference > 0) {
        carousel.sliderDirection = 'right';
    } else if (carousel.activePrevDifference < 0) {
        carousel.sliderDirection = 'left';
    }
}

/**
 * Update a percentage value which will be passed as a transform argument
 *
 * @param transformValue - Must be a number without "%" sign, e.g. 25
 */
function updateValueToSlide(transformValue) {
    if (Math.abs(carousel.activePrevDifference) !== maxFlashcardIndex) {
        carousel.transformValue = -transformValue * carousel.activePrevDifference + '%';
        carousel.numOfCardsToMove = Math.abs(carousel.activePrevDifference);
    } else {
        carousel.transformValue =
            carousel.activePrevDifference
            / Math.abs(carousel.activePrevDifference) * transformValue + '%';

        carousel.numOfCardsToMove = 1;
    }
}

/**
 * Slide a container to the left or right by the given value.
 *
 * @param slider - parent container which contains cards to slide
 */
function slideItem(slider) {
    if (carousel.sliderDirection !== carousel.prevSliderDirection) {
        if (carousel.sliderDirection === 'left') {
            slider.appendChild(slider.firstElementChild);
            carousel.items.style.justifyContent = 'flex-end';
        } else if (carousel.sliderDirection === 'right') {
            slider.prepend(slider.lastElementChild);
            carousel.items.style.justifyContent = 'flex-start';
        }
    }

    slider.style.transform =
        'translateX(' + carousel.transformValue + ')';
}
