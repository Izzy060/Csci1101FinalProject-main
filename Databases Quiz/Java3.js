const questions = [
    {
        questions: "What is the primary purpose of a database?",
        answers: [
            { text: "To generate random data for analysis", correct: false}, /*Change to correct if answer is correct*/
            { text: "To store, retrieve, and manage data efficiently", correct: true},
            { text: "To permanently delete unused information", correct: false},
            { text: " To act as a communication protocol between systems", correct: false},
        ]
    },
    {
        questions: "What does SQL stand for?",
        answers: [
            { text: "Structured Query Language", correct: true}, /*Change to correct if answer is correct*/
            { text: "Sequential Query Language", correct: false},
            { text: "Standard Query Language", correct: false},
            { text: "Simple Query Language", correct: false},
        ]
    },
    {
        questions: "What is the function of the WHERE clause in SQL?",
        answers: [
            { text: "Orders rows alphabetically", correct: false}, /*Change to correct if answer is correct*/
            { text: "Defines the columns to be displayed", correct: false},
            { text: "Filters rows based on a condition", correct: true},
            { text: "Groups rows based on a condition", correct: false},
        ]
    },
    {
        questions: "What is a primary key in a database?",
        answers: [
            { text: "A key used for encryption", correct: false}, /*Change to correct if answer is correct*/
            { text: "A key that defines relationships between tables", correct: false},
            { text: "A key that sorts records alphabetically", correct: false},
            { text: "A key that uniquely identifies each record", correct: true},
        ]
    },
    {
        questions: "Questions goes here",
        answers: [
            { text: "Ascending", correct: true}, /*Change to correct if answer is correct*/
            { text: "Descending", correct: false},
            { text: "Random", correct: false},
            { text: "None", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        } else {
            showScore();
        }
    }

    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    })

startQuiz();