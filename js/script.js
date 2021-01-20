const carouselItems = document.getElementById('carousel-items');
const flashcardSlider = document.getElementById('flashcard-slider');
const carouselBtnLeft = document.getElementById('carousel-btn-left');
const carouselBtnRight = document.getElementById('carousel-btn-right');

const flashcardCheckboxWrapper = document.getElementById('presentation-flashcard-types');

let sliderDirection = 'right';
let newSliderDirection;
let activeCheckboxIndex = 0;

/**
 * Slide a container to the left or right by the given value.
 *
 * @param slider - parent container which contains items to slide
 * @param justifyContent - The expected value of justify-content property
 * @param transformValue - The expected value of transform property
 */
function slideItem(slider, justifyContent, transformValue) {
    if (newSliderDirection !== sliderDirection) {
        if (sliderDirection === "right") {
            flashcardSlider.appendChild(flashcardSlider.firstElementChild);
        } else if (sliderDirection === 'left') {
            flashcardSlider.prepend(flashcardSlider.lastElementChild);
        }
    }

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
    newSliderDirection = 'right';
    updateFlashcardIndex();
    slideItem(flashcardSlider, 'flex-start', 'translateX(-25%)');
    updateCheckedFlashcard(checkCurrentCardType('right'));
    sliderDirection = 'right';
});

carouselBtnLeft.addEventListener('click', () => {
    newSliderDirection = 'left';
    updateFlashcardIndex();
    slideItem(flashcardSlider, 'flex-end', 'translateX(25%)');
    updateCheckedFlashcard(checkCurrentCardType('left'));
    sliderDirection = 'left';
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
        const radioValue = e.target;
        const targetIndex = Array.from(radioValue.parentNode.parentNode.children).indexOf(radioValue.parentNode);
    }
})

function updateFlashcardIndex() {
    const maxIndex = flashcardCheckboxWrapper.childElementCount - 1;

    if (newSliderDirection === 'right') {
        if (activeCheckboxIndex === maxIndex) {
            activeCheckboxIndex = 0;
        } else {
            activeCheckboxIndex++;
        }
    } else {
        if (activeCheckboxIndex === 0) {
            activeCheckboxIndex = 3;
        } else {
            activeCheckboxIndex--;
        }
    }
}

