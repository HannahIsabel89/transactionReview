// quiz javaScript
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


const quizModal = document.getElementById('quizModal'),
//quizBtn = document.getElementById('quizBtn'),
closeBtn = document.getElementById('closeBtn');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//listen for a open click
quizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    quizModal.style.display = "block"
    fetch("./quiz.json")
    .then(res => res.json())
    .then (loadedQuestions => {
        console.log(loadedQuestions)
        questions = loadedQuestions;
        startGame()
    })
    .catch(err => {
        console.log(err);
    });
}
// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator
    getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    if (score > 0  && score < 50) {
      quizModal.innerHTML = `<h1 class=sadGrade>${score}%</h1>`;
    } 
    if (score >= 50 && score <= 100) {
      quizModal.innerHTML = `<h1 class=goodGrade>${score}%</h1>`
    };
    setTimeout(function(){closeModal()}, 5000);
  }
    questionCounter++; // increase counter by one
    questionCounterText.innerText =  `${questionCounter}/${MAX_QUESTIONS}`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // get random number between 1 and 3
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return; 

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = 
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 

      if(classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion(); 
      }, 1000);
      
  });
});

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}
function closeModal () {
  quizModal.style.display = "none";
}
// closing the quiz modal
closeBtn.addEventListener('click', event => {
  closeModal();
})