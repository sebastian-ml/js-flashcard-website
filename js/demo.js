import { questions, questionsAnswered } from "./flashcard.js";
import { getRandomNumber } from "./script.js";

const container = document.getElementById("demo-container");
const nextQuestionBtn = document.getElementById("demo-next-question");
const cardContainer = document.getElementById("demo-card-container");
const htmlToRemove = [
  document.getElementsByClassName("par par--md")[0],
  document.getElementsByClassName("center")[0],
];

let currentQuestionIndex;
let currentQuestion;
let userAnswer = false;

let checkButton;
let answersLi;
let userInput;

container.addEventListener("click", (e) => {
  const targetID = e.target.id;

  if (targetID === "demo-start" || targetID === "demo-next-question") {
    if (targetID === "demo-start") {
      htmlToRemove.forEach((ele) => container.removeChild(ele));
      cardContainer.style.display = "flex";
    } else if (targetID === "demo-next-question") {
      nextQuestionBtn.style.visibility = "hidden";
      questions.splice(currentQuestionIndex, 1);
      questionsAnswered.push(currentQuestion);
    }
    generateCard();
    getTriggers(currentQuestion.cardType);
    checkUserAnswer();
    checkButton.addEventListener("click", () => {
      showNextBtn(questions.length);
    });
  }
});

function generateCard() {
  currentQuestionIndex = getRandomNumber(questions.length);
  currentQuestion = questions[currentQuestionIndex];
  const questionCard = currentQuestion.createCard(
    "demo-card",
    "demo-check-btn",
    "demo-answers",
    "demo-input"
  );

  // Remove card if it exists
  const activeCard = document.getElementById("demo-card");
  if (activeCard !== null) {
    activeCard.remove();
  }

  cardContainer.prepend(questionCard);
}

function getTriggers(cardType) {
  checkButton = document.getElementById("demo-check-btn");

  if (cardType === "millionaire") {
    const answersUl = document.getElementById("demo-answers");
    answersLi = answersUl.getElementsByTagName("input");
  } else if (cardType === "write") {
    userInput = document.getElementById("demo-input");
  }
}

function checkUserAnswer() {
  checkButton.addEventListener("click", () => {
    if (currentQuestion.cardType === "millionaire") {
      userAnswer = [...answersLi].filter((answer) => answer.checked === true)[0]
        .value;
    } else if (currentQuestion.cardType === "write") {
      userAnswer = userInput.value.trim();
    } else {
      userAnswer = currentQuestion.answers.filter(
        (option) => option.correct === true
      )[0].answer;
    }
  });
}

function showNextBtn(cardsLeft) {
  if (userAnswer !== false && userAnswer.length !== 0 && cardsLeft > 1) {
    nextQuestionBtn.style.visibility = "visible";
    userAnswer = false;
  } else if (
    userAnswer === false ||
    userAnswer === undefined ||
    userAnswer.length === 0
  ) {
    console.log("Answer the question!");
  } else {
    console.log("There are no more cards");
  }
}
