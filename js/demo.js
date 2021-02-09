const container = document.getElementById('demo-container');
const startDemo = document.getElementById('demo-start');
const cardContainer = document.getElementById('demo-card-container');
const htmlToRemove = [
    document.getElementsByClassName('par par--md')[0],
    document.getElementsByClassName('center')[0],
];

// Remove text and show the first randomly chosen card
startDemo.addEventListener('click', () => {
    htmlToRemove.forEach(ele => container.removeChild(ele));
    cardContainer.style.display = 'flex';

    const question = getRandomItem(questions);
    const questionCard = question.createCard('demo-card', 'demo-check-btn');
    cardContainer.prepend(questionCard);
})


