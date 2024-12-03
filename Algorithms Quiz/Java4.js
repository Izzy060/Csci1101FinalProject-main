const questions = [
    {
        questions: "What is an Algorithm?",
        answers: [
            { text: "Basic, low-level operations or data types that are the building blocks of more complex structures or functions", correct: false}, /*Change to true if answer is correct*/
            { text: "An ordered set of unambiguous, executable steps that defines a terminating process.", correct: true},
            { text: "a block of code that performs a specific task similar to a function or method in programming languages", correct: false},
            { text: "A collection of related data of the same type (numbers, names, etc.)", correct: false},
        ]
    },
    {
        questions: "What are the two main types of primitives? ",
        answers: [
            { text: "Data and Operation primitives", correct: true}, 
            { text: "Data and Assignment primitives", correct: false},
            { text: "Operation and procedure primitives", correct: false},
            { text: "Operation and Assignment primitives", correct: false},
        ]
    },
    {
        questions: "What is the correct order of  components of repetitive control",
        answers: [
            { text: "Test, Initialize, Modify", correct: false}, 
            { text: "Test, Modify, Initialize", correct: false},
            { text: "Initialize, Modify, Test", correct: false},
            { text: "Initialize, Test, Modify", correct: true},
        ]
    },
    {
        questions: " What is an Array?",
        answers: [
            { text: "A search sort that examines each item in turn and compares it to the one we are searching for.", correct: false}, 
            { text: "An algorithm that arranges items in a collection so that there is an ordering on one (or more) of the fields in the items.", correct: false},
            { text: " A collection of related data of the same type (numbers, names, etc.).   ", correct: true},
            { text: "A simple comparison-based algorithm that works by repeatedly stepping through a list, comparing adjacent elements, and swapping them if they are in the wrong order", correct: false},
        ]
    },
    {
        questions: "Find the correct Logarithmic Function for this expression: 4^3",
        answers: [
            { text: "Log3(12) = 4", correct: false}, 
            { text: "Log4(64) = 3", correct: true},
            { text: "Log12(4) = 3", correct: false},
            { text: "Log3(64) = 4", correct: false},
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