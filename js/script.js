const carouselItems = document.getElementById('carousel-items');
const flashcardSlider = document.getElementById('flashcard-slider');
const carouselBtnLeft = document.getElementById('carousel-btn-left');
const carouselBtnRight = document.getElementById('carousel-btn-right');

const flashcardCheckboxWrapper = document.getElementById('presentation-flashcard-types');

let sliderDirection = 'right';
let prevSliderDirection = 'right';

const maxIndex = flashcardCheckboxWrapper.childElementCount - 1;
let prevFlashcardIndex = 0;
let activeFlashcardIndex = 0;
let activePrevDiff;

let valueToSlide;
let numberOfCardsToSlide = 1;

/**
 * Slide a container to the left or right by the given value.
 *
 * @param slider - parent container which contains items to slide
 */

function slideItem(slider) {
    if (sliderDirection !== prevSliderDirection) {
        if (sliderDirection === 'left') {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
            carouselItems.style.justifyContent = 'flex-end';
        } else if (sliderDirection === 'right') {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
            carouselItems.style.justifyContent = 'flex-start';
        }
    }

    flashcardSlider.style.transform = 'translateX(' + valueToSlide + ')';
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
    if (Math.abs(activePrevDiff) !== maxIndex) {
        valueToSlide = -25 * activePrevDiff + '%'
        numberOfCardsToSlide = Math.abs(activePrevDiff);
    } else {
        valueToSlide = activePrevDiff / Math.abs(activePrevDiff) * 25 + '%';
        numberOfCardsToSlide = activePrevDiff / activePrevDiff;
    }
}

function updateCheckedFlashcard() {
    const flashcards = document.querySelectorAll('[card-id]');
    Array.from(flashcards).forEach(flashcard => {
        if (flashcard.dataset.Id === activeFlashcardIndex) flashcard.checked = true;
    })
}

carouselBtnRight.addEventListener('click', () => {
    prevSliderDirection = sliderDirection;
    sliderDirection = 'right';
    updateFlashcardIndex();
    slideItem(flashcardSlider);
});

carouselBtnLeft.addEventListener('click', () => {
    prevSliderDirection = sliderDirection;
    sliderDirection = 'left';
    updateFlashcardIndex();
    slideItem(flashcardSlider);
});

flashcardSlider.addEventListener('transitionend', () => {
    if (sliderDirection === 'right') {
        for (let i = 0; i < numberOfCardsToSlide; i++) {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
        }
    } else if (sliderDirection === 'left') {
        for (let i = 0; i < numberOfCardsToSlide; i++) {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
        }
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
        prevSliderDirection = sliderDirection;

        updateIndexDiff();
        slideItem(flashcardSlider);
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

    updateCheckedFlashcard();
    updateIndexDiff();
}

function updateIndexDiff() {
    activePrevDiff = activeFlashcardIndex - prevFlashcardIndex;

    updateSliderDirection();
    updateValueToSlide();
}

