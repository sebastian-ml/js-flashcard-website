class Flashcard {
    constructor(cardType, question, answers) {
        this.cardType = cardType;
        this.box = 1;
        this.question = question;
        this.answers = answers;
    }

    createCard() {
        const card = createHtmlElement('div', ['card', 'card--small']);
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

                const cardInput = createHtmlElement('input', ['card__input']);
                cardInput.type = 'text';
                cardInput.placeholder = 'Enter your answer'

                label.appendChild(cardInput);
                cardBody.appendChild(label);
            }
            card.appendChild(cardBody);
        }

        if (this.cardType === 'millionaire') {
            const cardAnswers = createHtmlElement('ul',['card__answers']);

            this.answers.forEach((answer, index) => {
                const cardAnswer = createHtmlElement('li', ['card__answer']);

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

        const cardBtn = createHtmlElement('button',['btn', 'card__btn']);
        cardBtn.innerText = 'Check your answer';
        card.appendChild(cardBtn);

        this.card = card;
    }
}

function createHtmlElement(htmlTagName, htmlClassNames, htmlID) {
    const newElement = document.createElement(htmlTagName);

    if (htmlClassNames) newElement.classList.add(...htmlClassNames);
    if (htmlID) newElement.id = htmlID;

    return newElement;
}
