const container = document.getElementById('demo-container');
const nextQuestionBtn = document.getElementById('demo-next-question');
const cardContainer = document.getElementById('demo-card-container');
const htmlToRemove = [
    document.getElementsByClassName('par par--md')[0],
    document.getElementsByClassName('center')[0],
];

let currentQuestionIndex;
let currentQuestion;
let userAnswered = false;

let checkButton;
let answersLi;
let userInput;

container.addEventListener('click', (e) => {
    const targetID = e.target.id;

    if (targetID === 'demo-start' || targetID === 'demo-next-question') {
        if (targetID === 'demo-start') {
            htmlToRemove.forEach(ele => container.removeChild(ele));
            cardContainer.style.display = 'flex';
        } else if (targetID === 'demo-next-question') {
            nextQuestionBtn.style.visibility = 'hidden';
            questions.splice(currentQuestionIndex, 1);
            questionsAnswered.push(currentQuestion);
        }
        generateCard(questions.length);
        getTriggers(currentQuestion.cardType);
        checkIfAnswered();
        checkButton.addEventListener('click', () => {
            showNextBtn(userAnswered, questions.length);
        })
    }
})

function generateCard(cardsLeft) {
    currentQuestionIndex = getRandomNumber(questions.length);
    currentQuestion = questions[currentQuestionIndex];
    const questionCard = currentQuestion.createCard(
        'demo-card',
        'demo-check-btn',
        'demo-answers',
        'demo-input'
    );

    // Remove card if it exists
    const activeCard = document.getElementById('demo-card');
    if (activeCard !== null) {
        activeCard.remove();
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
    checkButton.addEventListener('click', () => {
        if (['millionaire', 'write'].includes(currentQuestion.cardType)) {
            const userAnswer = getUserAnswer(currentQuestion.cardType).trim();
            userAnswered = userAnswer !== undefined && userAnswer.length > 0;
        } else {
            userAnswered = true;
        }
    })
}

function showNextBtn(userAnswered, cardsLeft) {
    if (userAnswered && cardsLeft > 1) {
        nextQuestionBtn.style.visibility = 'visible';
        userAnswered = false;
    } else {
        console.log('There are no more cards');
    }
}

function getUserAnswer(cardType) {
    if (cardType === 'millionaire') {
        return [...answersLi].filter(answer => answer.checked === true)[0].value;
    } else if (cardType === 'write') {
        return userInput.value;
    }
}