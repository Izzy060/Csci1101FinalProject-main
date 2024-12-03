const questions = [
    {
        questions: "What is the primary purpose of HTML in web development?",
        answers: [
            { text: "To define the structure and content of a webpage", correct: true}, /*Change to true if answer is correct*/
            { text: "To style and format a webpage", correct: false},
            { text: "To make a webpage interactive", correct: false},
            { text: "To store data for a webpage", correct: false},
        ]
    },
    {
        questions: "What is the purpose of Javascript in a website?",
        answers: [
            { text: "To structure the webpage", correct: false}, 
            { text: "To apply styles to the webpage", correct: false},
            { text: "To make the webpage interactive", correct: true},
            { text: "To store user data in a database", correct: false},
        ]
    },
    {
        questions: "Which of the following sets of HTML tages are valid?",
        answers: [
            { text: "< Heading > < article > < nav >", correct: false}, 
            { text: "< html > < em > < ol >", correct: true},
            { text: "< footer > < sec > < nav >", correct: false},
            { text: "< link > < style > < p >", correct: false},
        ]
    },
    {
        questions: "Which method is used to select an element by its ID in JavaScript?",
        answers: [
            { text: "document.getElementById()", correct: true}, 
            { text: "document.querySelector()", correct: false},
            { text: "document.getElementsByClassName()", correct: false},
            { text: "document.selectByID()", correct: false},
        ]
    },
    {
        questions: "Which of the following is a valid CSS selector?",
        answers: [
            { text: "#header {color: blue;}", correct: true}, 
            { text: "@header {color: blue;}", correct: false},
            { text: "%header {color: blue;}", correct: false},
            { text: ".header: blue;", correct: false},
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