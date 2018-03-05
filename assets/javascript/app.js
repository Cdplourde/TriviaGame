//VARIABLES
var count = 30; //countdown timer
var correctAnswer = false;
var numRight = 0;
var numWrong = 0;
var questionNum = 0; //tracks how many questions the user has answered
var questions = [
    //0
    {
        question: "How many moons does Jupiter have?",
        answers: ["16", "69", "47", "8"],
        correct: "69", //B
        fact: "Jupiter has 69 known moons, and there may be even more that have yet to be discovered!",
        img: "https://media.giphy.com/media/rrIviDmtfssBG/giphy.gif"
    }, 
    //1
    {
        question: "Which planet has the highest surface temperature?",
        answers: ["Mercury", "Venus", "Earth", "Mars"],
        correct: "Venus", //B
        fact: "While Mercury's close proximity to the sun allows its surface to reach up to 788 °F, Venus' harsh atmosphere allows it to soak up the heat like a sponge to reach over 864 °F.",
        img: "https://media.giphy.com/media/CnPj5PVSJHVzG/giphy.gif" 
    },
    //2
    {
        question: "Which planet has the shortest year?",
        answers: ["Earth", "Neptune", "Saturn", "Mercury"],
        correct: "Mercury", //D
        fact: "At 88 Earth days, Mercury has the shortest year. The closer a planet is to the Sun, the faster the orbit",
        img: "https://media1.giphy.com/media/GcDtLf4RAdiRG/giphy.gif"
    },
    //3
    {
        question: "Which planet is farthest from the sun?",
        answers: ["Neptune", "Saturn", "Uranus", "Jupiter"],
        correct: "Neptune", //A
        fact: "Due to Pluto's reclassification as a dwarf planet in 2006, Neptune overtook the roll as the planet farthest from the sun.",
        img: "http://www.anycalculator.com/1701e_warp.gif"
    },
    //4
    {
        question: "In what month is the Earth closest to the sun?",
        answers: ["August", "July", "January", "March"],
        correct: "January", //C
        fact: "The Earth is closest from the sun in January, and farthest from the sun in July.",
        img: "http://www.reactiongifs.com/r/mye.gif"

    },
    //5
    {
        question: "The largest volcano ever discovered in our solar system is located on which planet?",
        answers: ["Mars", "Earth", "Mercury", "Venus"],
        correct: "Mars", //A
        fact: "At a height of nearly 22 kilometers, Mars' Olympus Mons is the largest volcano in the Solar System. Earth's largest volcano, Tamu Massif, is only 4.4 kilometers by comparison.",
        img: "https://media.giphy.com/media/3oxOCmLMY1XUa9LqlG/giphy.gif"
    },
    //6
    {
        question: "Which of these planets does NOT have rings?",
        answers: ["Neptune", "Jupiter", "Uranus", "Venus"],
        correct: "Venus", //D
        fact: "All four of the outer planets (Jupiter, Saturn, Uranus, and Neptune) have rings.",
        img: "https://media.giphy.com/media/Q7ArXQiZ784ww/giphy.gif"
    },
];



$(document).ready(function() {
    //hide everything but game title.
    $("#innerContainer").hide();
    //create start button and instruction
    $("#innerContainer").after("<button id='startBtn'>Start Game</button>");
    $("#startBtn").after("<p id='instruction'>You will have 30 seconds to answer each of the 7 questions</p>")

    //start game click event
    $(document).on("click", "#startBtn", function() {
        //hide start button and instructions
        $("#startBtn").hide();
        $("#instruction").hide();
        //show time remaining, question, and possible answers
        $("#innerContainer").show(); 
        displayQuestion();
    });

    $(document).on("click", ".btn", function(){
        if ($(this).text() === questions[questionNum].correct) {
            correctAnswer = true;
            checkAnswer();
        }
        else {
            checkAnswer();
        }
    });

    //creates a timer of 30 seconds counting down

    var intervalID //Grabs the interval ID from within countDown()

    function countDown() {
        //reset timer and start immediately
        count = 30;
        $("#timeLeft").html(count);
        setTimeout(function() {
            count--
            $("#timeLeft").html(count);
        }, 1000);
        //countdown every second
        intervalID = setInterval(function() {
            $("#timeLeft").html(count);
            count--;  
            //once countdown reaches 0, proceed to next question
            if (count < 0) {
                clearInterval(intervalID);
                $("#time").html("OUT OF TIME!");
                checkAnswer();
            }       
        }, 100); //countdown interval
    }

    //move onto next question if there are questions left
    function checkAnswer() {
        //stop timer
        clearInterval(intervalID);
        //display the answer, image, and fact
        $(".btn").remove();
        $("#question").after("<p id='fact'>" + questions[questionNum].fact);
        $("#question").after("<p id='factSpan'>FACT: </p>");
        //if out of time, run timedOut()
        if (count === -1) {
            timedOut();
        //else if user guessed incorrect, run incorrect()
        } 
        else if (correctAnswer === false) {
            incorrect();
        //else run correct();
        }           
        else {
            correct();
        }   
        $("#question").after("<img src='" + questions[questionNum].img + "'>");
        questionNum++;
        if (questionNum < questions.length) {
            setTimeout(function() {
                displayQuestion();
            }, 3000); //time until next question
        }
        else {
            setTimeout(function() {
                endScreen();
            }, 3000); //time until next question
        }
    }

    //end game screen
    function endScreen() {
        $("img, #fact, #answer, #factSpan").remove();
        $("#question").html("FINAL SCORE:");
        $("#info").append("<p id='correct'>CORRECT: " + numRight);
        $("#info").append("<p>INCORRECT: " + numWrong);
    }

    //changes display for when user timed out
    function timedOut() {
        $("#question").after("<p id='answer'>CORRECT ANSWER: " + questions[questionNum].correct);  
        numWrong++;    
    }

    //changes display for when user guessed incorrectly
    function incorrect() {
        $("#time").html("You answered incorrectly")
        $("#question").after("<p id='answer'>CORRECT ANSWER: " + questions[questionNum].correct);  
        numWrong++;      
    }

    //changes display for when user guessed correctly
    function correct() {
        $("#question").after("<p id='answer'>YOU GOT IT!</p>");
        numRight++;     
    }

    function displayQuestion() {
        //start countdown and display question
        count = 30;
        $("img, #fact, #answer, #factSpan").remove();
        $("#time").html("<p>TIME LEFT: <span id='timeLeft'></span></p>");
        $("#timeLeft").html(count);
        countDown(); 
        correctAnswer = false;
        //Display question
        $("#question").html(questions[questionNum].question);
        //create and fill buttons with possible answers
        for (var i = 0; i < questions[questionNum].answers.length; i++) {
            var createBtn = "<li class='btn' id='btn" + (i + 1) + "'></li>";
            $("#answers").append(createBtn);
            $(".btn:nth-child(" + (i + 1) + ")").html(questions[questionNum].answers[i]);
        }
    }
});