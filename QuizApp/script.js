//list of questions
const questions=[
    {
        question:"_________ keyword is used to declare variables in javascript.",
        answers:[
            {       text:"Var",correct:true},
            {       text:"Dim",correct:false},
            {       text:"String",correct:false},
            {       text:"None of the above",correct:false},
        ]
    },
    {
        question:"The latest HTML standard is",
        answers:[
            {       text:"HTML 4.0",correct:false},
            {       text:"HTML 5.0",correct:true},
            {       text:"XML",correct:false},
            {       text:"SGML",correct:false},
        ]
    },
    {
        question:" In which part of the HTML metadata is contained?",
        answers:[
            {       text:"head tag",correct:true},
            {       text:"title tag",correct:false},
            {       text:"html tag",correct:false},
            {       text:"body tag",correct:false},
        ]
    },
    {
        question:"Which element is used for or styling HTML5 layout?",
        answers:[
            {       text:"CSS",correct:true},
            {       text:"jQuery",correct:false},
            {       text:"JavaScript",correct:false},
            {       text:"PHP",correct:false},
        ]
    },
    {
        question:"Which of the following can read and render HTML web pages",
        answers:[
            {       text:"Server",correct:false},
            {       text:"head Tak",correct:false},
            {       text:"web browser",correct:true},
            {       text:"empty",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");



//score updating


let currentQuestionIndex=0;
let score=0;
function startQuiz()
{
currentQuestionIndex=0;
score=0;
nextButton.innerHTML="Next";
showQuestion();
}

function showQuestion(){
    //we need to remove previous question so
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    // for each option create a new button

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event){
    const selectButton=event.target;
    const isCorrect=selectButton.dataset.correct=="true";
    if(isCorrect){
    selectButton.classList.add("correct");

    score++;
    }
    else
    selectButton.classList.add("incorrect");
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true")
        button.classList.add("correct");
        button.disabled=true;
    });
    nextButton.style.display="block";

}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.backgroundColor="#3D5CDA";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    showQuestion();
    else
    showScore();
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else
    startQuiz();
})
startQuiz();