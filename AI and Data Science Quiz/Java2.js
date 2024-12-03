const questions = [
    {
        questions: "What is AI",
        answers: [
            { text: "Ability to learn without specifying a set of rules", correct: false}, /*Change to true if answer is correct*/
            { text: "Any technique that enables a computer to mimic human behavior ", correct: true},
            { text: "An algorithm that uses a network of interconnected nodes", correct: false},
            { text: "Having multiple layers of neural networks that are able to complicated tasks", correct: false},
        ]
    },
    {
        questions: "What does not use AI?",
        answers: [
            { text: "apple/google Maps", correct: false}, 
            { text: "YouTube", correct: false},
            { text: "Clock App", correct: true},
            { text: "Amazon", correct: false},
        ]
    },
    {
        questions: "What is not an application of deep learning",
        answers: [
            { text: "Simple Chatbots", correct: true}, 
            { text: "Self-driving cars", correct: false},
            { text: "Traffic prediction", correct: false},
            { text: "Online fraud Detection", correct: false},
        ]
    },
    {
        questions: "What is not a type of neural network",
        answers: [
            { text: "Feed-forward Neural network", correct: false}, 
            { text: "Autoencoders", correct: false},
            { text: "Recurrent Neural Network", correct: false},
            { text: "Back current Neural Network", correct: true},
        ]
    },
    {
        questions: "What does AI stand for",
        answers: [
            { text: "Artificial Invention", correct: false}, 
            { text: "Automated Intelligence", correct: false},
            { text: "Artificial Intelligence", correct: true},
            { text: "Automated Innovation", correct: false},
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