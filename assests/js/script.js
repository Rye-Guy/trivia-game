//variabls to get everything started. 
var wrongAnswer;
var setTime = 30;
var timeInterval;
//Were going to be using these later
var quizArea = document.getElementById('quizArea');
var questionTitle = document.getElementById('questionTitle');
var questionList = document.getElementById('questionList');
var confirmBtn = document.getElementById('confirmBtn');
var secondsLeft = document.getElementById('secondsRemaining');
var resultsArea = document.getElementById('resultsArea');
//array used to store questions. Using the array with make it easy to loop through the answers and checking for the correct one. Questions will be updated with a theme. These are placeholder.
var myQuestions = [{
        question: "What is the capital of Canada?",
        currentAnswers: {
            a: "Toronto",
            b: "Winnipeg",
            c: "Ottawa",
            d: "Vancouver"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the capital of Canada?",
        currentAnswers: {
            a: "Toronto",
            b: "Winnipeg",
            c: "Ottawa",
            d: "Vancouver"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the capital of Canada?",
        currentAnswers: {
            a: "Toronto",
            b: "Winnipeg",
            c: "Ottawa",
            d: "Vancouver"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the capital of Canada?",
        currentAnswers: {
            a: "Toronto",
            b: "Winnipeg",
            c: "Ottawa",
            d: "Vancouver"
        },
        correctAnswer: "d"
    },
]

function createContent() {
// variable that stores the html
    var output = [];
//will be going through all questions. ForEach allows us to go into the myQuestions array and take the value, index and the array itself as peramaters. For this situation we only need the index and the value so currentQustion and number will work. 
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
        //variable that stores the user guesses.
            var currentAnswers = [];

            for(letter in currentQuestion.currentAnswers){
                //creates the buttons for user selections
                currentAnswers.push(    
            //` es6 use of template strings to allow us to create html with possible answer. Embeding the Javasctipt into strings. Id call these super strings
                 `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.currentAnswers[letter]}
                </label>`
                );
            }

            //push the the answers and questions to the output array
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                 <div class="answers"> ${currentAnswers.join(' ')} </div>
                `
            );
        });
        quizArea.innerHTML = output.join('');
}

createContent();

function results() {
     //get the ansers from the elements that have the answer class within our quizArea div
    var answerArea = quizArea.querySelectorAll('.answers');
    //keeps track of correct answers.
    var correctAnswers = 0;

    //for each one of the questions...
    myQuestions.forEach ( (currentQuestion, questionNumber) => {

    var answerArea = answerArea[questionNumber];
    var selector = 'input[name=question' + questionNumber + ']:checked';
    //searches for the input buttons that have the :checked class. by doing this we can find the button that was pressed. We use .value to get the value of the answer. 

    // using ||or|| we are able to get the value and if there isnt a selected answer we have stored the selector
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //if the answer is correct
    if(userAnswer ===currentQuestion.correctAnswer){
        correctAnswers++;
    //change answer colors if they are right or wrong and keep track of the score of correct answers. 
        answerArea[questionNumber].style.color = 'lightgreen'; 
    }else{
        answerArea[questionNumber].style.color = 'red';
    }
    });
    //display to the user the score they received at the end of the quiz
    resultsArea.innerHTML = correctAnswers + ' out of ' + myQuestions.length;
}


confirmBtn.addEventListener('click', results);



function rateOfClock() {
    clearInterval(timeInterval);
    timeInterval = setInterval(decrease, 1000);
}

function decrease() {
    setTime--;
   // document.getElementById('secondsRemaining').innerHTML = setTime;
 //   document.getElementById('secondsRemaining').innerHTML = setTime;
    if (setTime == 0) {
        stopClock();
    }
}

function stopClock() {
    clearInterval(timeInterval);
}

createContent();
rateOfClock();





// startTime = function(){
//      timeInterval = setTimeout(, 30000);
//     // document.getElementById('')
//