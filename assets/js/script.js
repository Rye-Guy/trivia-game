//variables to get everything started. 
var wrongAnswer;

//Were going to be using these later
var quizArea = document.getElementById('quizArea');
var questionTitle = document.getElementById('questionTitle');
var questionList = document.getElementById('questionList');
var confirmBtn = document.getElementById('confirmBtn');
var secondsLeft = document.getElementById('secondsRemaining');
var resultsArea = document.getElementById('resultsArea');
//variables for pagination 
var previousButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var slides = document.querySelectorAll('.slide');
var currentSlide = 0; 
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
//will be going through all questions. ForEach allows us to go into the myQuestions array and take the value, index and the array itself as peramaters. For this situation we only need the index and the value so currentQuestion and number will work. 
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
                `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                 <div class="answers"> ${currentAnswers.join(' ')} </div>
                </div>`
            );
        });
        quizArea.innerHTML = output.join('');
}

createContent();

function results() {
     //get the ansers from the elements that have the answer class within our quizArea div
    var answerContainers = quizArea.querySelectorAll('.answers');
    //keeps track of correct answers.
    var correctAnswers = 0;

    //for each one of the questions...
    myQuestions.forEach ( (currentQuestion, questionNumber) => {

    var answerArea = answerContainers[questionNumber];
    var selector = 'input[name=question' + questionNumber + ']:checked';
    //searches for the input buttons that have the :checked class. by doing this we can find the button that was pressed. We use .value to get the value of the answer. 

    // using ||or|| we are able to get the value and if there isnt a selected answer we have stored the selector
    var userAnswer = (answerArea.querySelector(selector) || {}).value;

    //if the answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
        correctAnswers++;
    //change answer colors if they are right or wrong and keep track of the score of correct answers. 
        answerContainers[questionNumber].style.color = 'lightgreen'; 
    }else{
        answerContainers[questionNumber].style.color = 'red';
    }
    });
    //display to the user the score they received at the end of the quiz
    resultsArea.innerHTML = correctAnswers + ' out of ' + myQuestions.length;
}

// //function that controls pagination
//  function showSlide(x){
//      slides[currentSlide].classList.remove('active-slide');
//      slides[x].classList.add('active-slide');
//      currentSlide = x;
//     if(currentSlide === 0){
//         //hides the previous button on the first slide and displays for everything else.
//         previousButton.style.display = 'none';
//     }
//     else{
//         previousButton.style.display = 'inline-block';
//         //if its the last slide
//     }if(currentSlide === slides.length - 1){
//         //hides submit thorugh the quiz and shows nextButton 
//         nextButton.style.display = 'none';
//         submitButton.style.display = 'inline-block';
//     }else{
//         //hides the next button and shows submit
//         nextButton.style.display = 'inline-block';
//         submitButton.style.display = 'none';
//     }
//  }
//functions used to move page slides either add or substracting from the current slide number. We pass 0 later as the default. 
 function nextSlide(){
     showSlide(currentSlide + 1);
 }


 function prevSlide(){
    showSlide(currentSlide - 1);
}

previousButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);



 //sets the default to 0 so the page load page 0 first. 
 //showSlide(0);


confirmBtn.addEventListener('click', results);

var setTime = 3;
var timeInterval;

function rateOfClock() {
    clearInterval(timeInterval);
    timeInterval = setInterval(decrease, 1000);
  
}

function decrease() {
    document.getElementById('secondsRemaining').innerHTML = setTime;
    setTime--;
    
   // document.getElementById('secondsRemaining').innerHTML = setTime;
 //   document.getElementById('secondsRemaining').innerHTML = setTime;
    if (setTime == -1) {
       // nextSlide();
        stopClock();
        setTime = 30;
        rateOfClock();
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