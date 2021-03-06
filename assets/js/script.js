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
var startQuiz = document.getElementById('startQuiz');
var timeArea = document.getElementById('timeArea');
var slides = document.getElementsByClassName('slide');
var instructions = document.getElementById('instructions');
var thrAnswers = document.getElementById('theAnswers');
var resetBtn = document.getElementById('reset');
var currentSlide = 0; 
//array used to store questions. Using the array with make it easy to loop through the answers and checking for the correct one. Questions will be updated with a theme. These are placeholder.
var myQuestions = [
    {
        question: "What is the name of Batman’s butler?",
        currentAnswers: {
            a: "Jimmy",
            b: "Greg",
            c: "Erica",
            d: "Alfred"
        },
        correctAnswer: "d"
    },
    {
        question: "What is city does Batman watch over?",
        currentAnswers: {
            a: "Toronto",
            b: "Winnipeg",
            c: "Gotham",
            d: "Vancouver"
        },
        correctAnswer: "c"
    },
    {
        question: "Whats the name of Batman's car?",
        currentAnswers: {
            a: "The Batmobile",
            b: "La Nora",
            c: "The Pussy Wagon",
            d: "The Pimpmoblie"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the name of Batman's arch nemesis?",
        currentAnswers: {
            a: "The Joker",
            b: "The Smoker",
            c: "The Midnight Toker",
            d: "I get my lovin' on the run"
        },
        correctAnswer: "a"
    },
    {
        question: "Who trained Bruce Wayne?",
        currentAnswers: {
            a: "Ra's al Ghul",
            b: "Bruce Lee",
            c: "He's Self Taught",
            d: "Kirigi"
        },
        correctAnswer: "d"
    },
    {
        question: "What is Batman's signature Tool?",
        currentAnswers: {
            a: "The Batarang",
            b: "Bat Shark Repellent",
            c: "Finger Taser",
            d: "Bat-Ice Skates"
        },
        correctAnswer: "a"
    },
]

    instructions.innerHTML = "<h3>Press Start Quiz to Begin<br>You have 15 seconds to answer each question<br>Press next question if your comfortable with your answer<br>Good Luck!</h3>"
    quizArea.style.display = 'none';

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
                            <span class="label-text">${letter} :
                            ${currentQuestion.currentAnswers[letter]}</span>
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
    //wrong question array
    var wrongAnswers = [];

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

        
    }else{ 
        wrongAnswers.push("<li class='answerListItem'>" + "For question " + (questionNumber + 1) + " the correct answer is " + currentQuestion.correctAnswer + ".</li>");
    }
    });
    //display to the user the score they received at the end of the quiz
    quizArea.style.display = 'none'
    resultsArea.innerHTML = 'Score: ' + correctAnswers + ' out of ' + myQuestions.length;
    theAnswers.innerHTML = wrongAnswers.join(" ");
}

    // function currentResults(currentQuestion, questionNumber){
    //     currentScore = 0; 
    //    var answerContainers = quizArea.querySelectorAll('.answers');
    //    var answerArea = answerContainers[questionNumber];
    //  //   var selector = 'input[name=question' + questionNumber + ']:checked';
    //    var userAnswer = (answerArea.querySelector(selector) || {}).value;
    //     if(userAnswer === currentQuestion.correctAnswer){
    //         alert("you got it");
    //         currentScore++;
    //     }else{
    //         alert('you are wrong!');
    //     }
//}

confirmBtn.addEventListener('click', endGame);

// //function that controls pagination
 function showSlide(x){
     slides[currentSlide].classList.remove('active-slide');
     slides[x].classList.add('active-slide');
     startQuiz.style.display = 'none';
     quizArea.style.display = 'block';
     currentSlide = x;
   if(currentSlide === 0){
        //hides the previous button on the first slide and displays for everything else.
      previousButton.style.display = 'none';
      nextButton.style.display = 'none';
      startQuiz.style.display = 'none';
   }
    else{
       // previousButton.style.display = 'inline-block';
        //if its the last slide
    }if(currentSlide === slides.length - 1){
        //hides submit thorugh the quiz and shows nextButton 
        nextButton.style.display = 'none';
        confirmBtn.style.display = 'inline-block';
    }else{
        //hides the next button and shows submit
        nextButton.style.display = 'inline-block';
      //  confirmBtn.style.display = 'none';
    }
    
 }

//functions used to move page slides either add or substracting from the current slide number. We pass 0 later as the default. 

//var index = 0;


function beginGame(){
    showSlide(currentSlide);
    rateOfClock();
    timeArea.style.display = 'block';
    instructions.style.display = 'none';

}

function nextSlide(){
    slides[currentSlide].classList.remove('active-slide');
    setTime = 15;
    currentSlide++;
     showSlide(currentSlide);
 }


 function prevSlide(){
   //  setTime = 3;
    showSlide(currentSlide--);
}

previousButton.addEventListener("click", prevSlide);
previousButton.style.display = 'none';
nextButton.addEventListener("click", nextSlide);
nextButton.style.display = 'none';
confirmBtn.style.display = 'none';
timeArea.style.display = 'none';
resetBtn.style.display = 'none';
startQuiz.addEventListener("click", beginGame);

 //sets the default to 0 so the page load page 0 first. 
 //showSlide(0);



var setTime = 15;
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
        setTime = 15;
        rateOfClock();
        //currentResults();
        nextSlide();
    }else if(currentSlide >= 6){
        stopClock();
        results();
        endGame();
        confirmBtn.style.display = 'inline-block';
    }
}

function endGame(){
    stopClock();
    results();
    confirmBtn.style.display = 'none';
    timeArea.style.display = 'none';
    quizArea.innerHTML = ' ';
    resetBtn.style.display = 'inline-block';
}

function stopClock() {
    clearInterval(timeInterval);
}

function restartGame(){
    rateOfClock();
    currentSlide = 0; 
    theAnswers.style.display = 'none';
    createContent();
    quizArea.style.display = 'block';
    resultsArea.style.display = 'none';
    beginGame();
    resetBtn.style.display = 'none';
}

resetBtn.addEventListener("click", restartGame);

createContent();

// startTime = function(){
//      timeInterval = setTimeout(, 30000);
//     // document.getElementById('')
//