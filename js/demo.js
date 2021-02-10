const container = document.getElementById('demo-container');
const startDemo = document.getElementById('demo-start');
const nextQuestionBtn = document.getElementById('demo-next-question');
const cardContainer = document.getElementById('demo-card-container');
const htmlToRemove = [
    document.getElementsByClassName('par par--md')[0],
    document.getElementsByClassName('center')[0],
];

let currentQuestion;
let userAnswered = false;

let checkButton;
let answersLi;
let userInput;

// Remove the default text and show the first randomly chosen card
startDemo.addEventListener('click', () => {
    htmlToRemove.forEach(ele => container.removeChild(ele));
    cardContainer.style.display = 'flex';

    generateCard();
    getTriggers(currentQuestion.cardType);
    checkIfAnswered();
})

nextQuestionBtn.addEventListener('click', () => {
    nextQuestionBtn.style.visibility = 'hidden';

    generateCard();
    getTriggers(currentQuestion.cardType);
    checkIfAnswered();
})

function generateCard() {
    currentQuestion = getRandomItem(questions);
    const questionCard = currentQuestion.createCard(
        'demo-card',
        'demo-check-btn',
        'demo-answers',
        'demo-input'
    );

    // Remove card if it exists
    const activeCard = document.getElementById('demo-card');
    if (activeCard !== null) {
        activeCard.remove()
    }

    cardContainer.prepend(questionCard);
}

function getTriggers(cardType) {
    checkButton = document.getElementById('demo-check-btn');

    if (cardType === 'millionaire') {
        const answersUl = document.getElementById('demo-answers');
        answersLi = answersUl.getElementsByTagName('input');
    } else if (cardType === 'write') {
        userInput = document.getElementById('demo-input');
    }
}

function checkIfAnswered() {
    if (['millionaire', 'write'].includes(currentQuestion.cardType)) {
        checkButton.addEventListener('click', () => {
            const userAnswer = getUserAnswer(currentQuestion.cardType).trim();

            if (userAnswer !== undefined && userAnswer.length > 0) {
                if (currentQuestion.checkAnswer(userAnswer) === true) {
                    console.log('good');
                } else {
                    console.log('wrong');
                }
                userAnswered = true;
            }
        })
    } else {
        checkButton.addEventListener('click', () => {
            userAnswered = true;
        })
    }

    checkButton.addEventListener('click', () => {
        if (userAnswered) {
            nextQuestionBtn.style.visibility = 'visible';
        }
    })
}

function getUserAnswer(cardType) {
    let userAnswer;

    if (cardType === 'millionaire') {
        userAnswer =
            Array.from(answersLi).filter(answer => answer.checked === true)[0].value;
    } else if (cardType === 'write') {
        userAnswer = userInput.value;
    }

    return userAnswer;
}