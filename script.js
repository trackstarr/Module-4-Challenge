
//Array of created questions with a provided answer
var questions = [
    {
        question: "What does HTML stand for ?",
        options: ["Hypertext Markup Language", "Hightop Medium Low", "How To Make Lasagna", "Heavy Table Makes Lesions"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What is the purpose of CSS ?",
        options: ["To make life Difficult", "Styling", "Managing Crypto", "Developing AI"],
        answer: "Styling"
    },
    {
        question: "What is JavaScript?",
        options: ["A Beveridge", "A Recipe", "A book on life", "Programming language for the web"],
        answer: "Programming language for the web"
    }
];

//Setting Default Values for Questions, Score, and Timer
var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

//Function for the Start Button to initialize the quiz. It also hides the start button and displays the question and submit
function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("submit-button").style.display = "block";

    showQuestion();
    startTimer();
}
//Function to Bring up quiz question and options. Once answered it then clears it to then display the next question by appending
function showQuestion() {
    var questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    var questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = questions[currentQuestion].question;
    questionContainer.appendChild(questionElement);

    for (var i = 0; i < questions[currentQuestion].options.length; i++) {
        var optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerHTML = '<input type="radio" name="answer" value="' + questions[currentQuestion].options[i] + '"> ' + questions[currentQuestion].options[i];
        questionContainer.appendChild(optionElement);
    }
}
//Function to create a timer element. Will end the quiz once the timer reaches 0
function startTimer() {
    var timerElement = document.createElement("div");
    timerElement.id = "timer";
    document.getElementById("quiz-container").appendChild(timerElement);

    timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.innerHTML = "Time left: " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}
//Function for the submit button. Verifies user selection and updates user score if selection made is correct. Proceeds to next question on object
function submitQuiz() {
    var selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption && selectedOption.value === questions[currentQuestion].answer) {
        score++;
        //Deducts timer by 10 seconds if selection made was incorrect
    } else {
        timeLeft -= 10;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}
//Clears the question element, displays score on quiz and brings up a windowed prompt to enter in initials to scoreboard. Stores in local server
function endQuiz() {
    clearInterval(timerInterval);

    var quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    var resultElement = document.createElement("div");
    resultElement.innerHTML = "Quiz ended! Your score is: " + score + " out of " + questions.length;
    quizContainer.appendChild(resultElement);

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var initials = prompt("Enter your initials to save your high score:");

    if (initials) {
        var newScore = {
            initials: initials,
            score: score
        };

        highScores.push(newScore);
        highScores.sort(function (a, b) {
            return b.score - a.score;
        });
        highScores.splice(5);

        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    showHighScores();
}
//Displays scoreboard and its current leaders from high to low
function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    var highScoresElement = document.createElement("div");
    highScoresElement.innerHTML = "<h2>High Scores</h2>";

    if (highScores.length > 0) {
        var listElement = document.createElement("ol");

        for (var i = 0; i < highScores.length; i++) {
            var listItemElement = document.createElement("li");
            listItemElement.innerHTML = highScores[i].initials + " - " + highScores[i].score;
            listElement.appendChild(listItemElement);
        }

        highScoresElement.appendChild(listElement);
    } else {
        highScoresElement.innerHTML = "<p>No high scores yet.</p>";
    }

    document.getElementById("quiz-container").appendChild(highScoresElement);
}
//Click Event Listeners for Start and submit buttons
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("submit-button").addEventListener("click", submitQuiz);