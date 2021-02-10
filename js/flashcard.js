class Flashcard {
    constructor(cardType, question, answers) {
        this.cardType = cardType.toLowerCase();
        this.question = question;
        this.answers = answers;

        this.box = 1;
    }

    createCard(cardID, cardBtnID, cardAnswersID, cardInputID) {
        const card = createHtmlElement('div', ['card', 'flashcard-questions__card'], cardID);
        card.dataset.cardType = this.cardType;

        const cardQuestion = createHtmlElement('h3',['heading', 'card__question']);
        if (this.cardType === 'gap') {
            cardQuestion.innerText = this.question.replace(this.answers[0]['answer'], '[...]');
        } else {
            cardQuestion.innerText = this.question;
        }

        if (['classic', 'gap', 'write'].some(type => type === this.cardType)) {
            const cardBody = createHtmlElement('div',['card__body']);
            cardBody.appendChild(cardQuestion);

            if (this.cardType === 'write') {
                const label = createHtmlElement('label');

                const cardInput = createHtmlElement(
                    'input',
                    ['card__input'],
                    cardInputID
                );
                cardInput.type = 'text';
                cardInput.placeholder = 'Enter your answer'

                label.appendChild(cardInput);
                cardBody.appendChild(label);
            }
            card.appendChild(cardBody);
        }

        if (this.cardType === 'millionaire') {
            const cardAnswers = createHtmlElement(
                'ul',
                ['card__answers'],
                cardAnswersID
            );

            this.answers.forEach((answer, index) => {
                const cardAnswer = createHtmlElement(
                    'li',
                    ['card__answer']
                );

                const cardRadio = createHtmlElement(
                    'input',
                    ['card__radio'],
                    'answer-' + index
                );
                cardRadio.type = 'radio';
                cardRadio.name = 'card-option'
                cardRadio.value = answer['answer'];

                const cardLabel = createHtmlElement('label',['card__label']);
                cardLabel.htmlFor = 'answer-' + index;
                cardLabel.innerText = answer['answer'];

                cardAnswer.appendChild(cardRadio);
                cardAnswer.appendChild(cardLabel);
                cardAnswers.appendChild(cardAnswer);
            })

            card.appendChild(cardQuestion);
            card.appendChild(cardAnswers);
        }

        const cardBtn = createHtmlElement(
            'button',
            ['btn', 'card__btn'],
            cardBtnID
        );
        cardBtn.innerText = 'Check your answer';
        card.appendChild(cardBtn);

        return card;
    }

    checkAnswer(userAnswer) {
        const correctAnswer =
            (this.answers).filter(answer => answer['correct'])[0]['answer'];
        let isCorrect = false;

        if (userAnswer === correctAnswer) {
            this.box++;
            isCorrect = true;
        } else {
            if (this.box !== 1) this.box--;
        }

        return isCorrect;
    }
}

const questions = [];
const questionsAnswered = [];

questions[0] = new Flashcard(
    'millionaire',
    'What is the highest mountain in the world?',
    [
        {answer: 'Mont Blanc', correct: false},
        {answer: 'Mount Everest', correct: true},
        {answer: 'Nanga Parbat', correct: false},
        {answer: 'Kilimanjaro', correct: false},
    ]
);

questions[1] = new Flashcard(
    'gap',
    'Nile is the longest river in the world.',
    [
        {answer: 'Nile', correct: true},
    ]
);

questions[2] = new Flashcard(
    'classic',
    'What is the capital city of Finland?',
    [
        {answer: 'Helsinki', correct: true},
    ]
);

questions[3] = new Flashcard(
    'write',
    'Who won the US Presidential election in 2020? Name and surname is required.',
    [
        {answer: 'Joe Biden', correct: true},
    ]
);
