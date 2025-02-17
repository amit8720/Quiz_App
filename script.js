
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.addEventListener("click", () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
});

exitBtn.addEventListener("click", () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
});

continueBtn.addEventListener("click", () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestion(0);
    questionCounter(1);
    headerscore();
});

tryAgainBtn.addEventListener("click", () => {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    
    showQuestion(questionCount);
    questionCounter(questionNumb);
    headerscore();
});



goHomeBtn.addEventListener("click", () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active')

    let questionCount = 0;
    let questionNumb = 1;
    let userScore = 0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
});


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener("click", () => {
    if
        (questionCount < questions.length - 1){
         questionCount++;
         showQuestion(questionCount);

         questionNumb++;
         questionCounter(questionNumb);

         nextBtn.classList.remove('active');
    }
        else{
            showResultBox();
        }
});

const optionList = document.querySelector('.option-list')

function showQuestion(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
         <div class="option"><span>${questions[index].options[1]}</span></div>
         <div class="option"><span>${questions[index].options[2]}</span></div>
         <div class="option"><span>${questions[index].options[3]}</span></div>`;

 optionList.innerHTML = optionTag;

 const option = document.querySelectorAll('.option');
 for(let i = 0; i < option.length; i++){
    option[i].setAttribute('onclick','optionSelected(this)');
 }

}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerscore();
    }
    else{
        answer.classList.add('incorrect');

        for (let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled')
    }

    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerscore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0; // Start from 0 instead of -1
    let progressEndValue = Math.round((userScore / questions.length) * 100); // Ensure rounded percentage
    let speed = 20;

    let progress = setInterval(() => {
        if (progressStartValue >= progressEndValue) { 
            clearInterval(progress);
        } else {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        }
    }, speed);
}
