const questions = [
    {
        question: 'which is the largest animal in the world ?',
        answers:[
            {text:'shark', correct: false },
            {text:'blue whale', correct: true },
            {text:'elephant', correct: false },
            {text:'giraff', correct: false },
        ]
    },
    {
        question: 'which is the smallest continent in the world ?',
        answers:[
            {text:'australia', correct: true },
            {text:'asia', correct: false },
            {text:'africa', correct: false },
            {text:'arctic', correct: false },
        ]
    },
    {
        question: 'how many teeth does a matured human being has ?',
        answers:[
            {text:'sixteen', correct: false },
            {text:'thirthy-two', correct: true },
            {text:'nine', correct: false },
            {text:'four', correct: false },
        ]
    },
    {
        question: 'which is the largest desert in the world ?',
        answers:[
            {text:'sahara', correct: false },
            {text:'kalahari', correct: false },
            {text:'gobi', correct: false },
            {text:'antarctica', correct: true },
        ]
    },
    {
        question: 'which of this is the first animals to go into the space ?',
        answers:[
            {text:'cat', correct: false },
            {text:'dog', correct: true },
            {text:'rat', correct: false },
            {text:'pig', correct: false },
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

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetstate();
    questionElement.innerHTML = 'you did an amazing job.\n  If you would like to continue the game click the \n icon below'
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();
