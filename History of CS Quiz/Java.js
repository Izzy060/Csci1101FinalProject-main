const questions = [
    {
        questions: "Who is often referred to as the father of the computer?",
        answers: [
            { text: "Alan Turing", correct: false}, /*Change to true if answer is correct*/
            { text: "Charles Babbage", correct: true},
            { text: "George Boole", correct: false},
            { text: "Tim Berners-Lee", correct: false},
        ]
    },
    {
        questions: ".Which of the following is NOT an instrument considered one of the early caculating machine",
        answers: [
            { text: "Abacus", correct: false}, 
            { text: "Slide Rule", correct: false},
            { text: "The Difference Engine", correct: false},
            { text: "Turing Machine", correct: true},
        ]
    },
    {
        questions: "Which programming language did Bjarne Stroustrup develop?",
        answers: [
            { text: "Java", correct: false}, 
            { text: "Python", correct: false},
            { text: "C++", correct: true},
            { text: "COBOL", correct: false},
        ]
    },
    {
        questions: "Who is considered the first computer programmer?",
        answers: [
            { text: "Grace Hopper", correct: false}, 
            { text: "Ada Lovelace", correct: true},
            { text: "Bjarne Stroustrup", correct: false},
            { text: "Alan Turing", correct: false},
        ]
    },
    {
        questions: "Alan Turing is known for developing which of the following concepts?",
        answers: [
            { text: "COBOL", correct: false}, 
            { text: "Turing Machine", correct: true},
            { text: "World Wide Web", correct: false},
            { text: "Apple I computer", correct: false},
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