// Highscores button
let viewScoresBtn = document.getElementById("view-Highscores");


// Timer
let secondsLeft = 60;
let timer = document.getElementById("timer");

function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "";
      timer.textContent = "Time: " + secondsLeft;
      if (secondsLeft <= 0 || questionCount === questions.length) {
        clearInterval(timerInterval);
        captureUserScore();
      } 
    }, 1000);
}


// After clicking 'post score'
let scoresDiv = document.getElementById("scores");
let buttonsDiv = document.getElementById("buttons");


// Start button
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


// Questions
var questionDiv = document.getElementById("questions");
let results = document.getElementById("results");
var choices = document.getElementById("choices");

// Saving score
let emptyArray = [];
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

let score = 0


//Make questions appear
function displayQuestions() {
    removeEls(startButton);
  
    if (questionCount < questions.length) {
      questionDiv.innerHTML = questions[questionCount].title;
      choices.textContent = "";
  
      for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
        let el = document.createElement("button");
        el.innerText = questions[questionCount].multiChoice[i];
        el.setAttribute("data-id", i);
        el.addEventListener("click", function (event) {
          event.stopPropagation();
  
          if (el.innerText === questions[questionCount].answer) {
            score += secondsLeft;
          } else {
            score -= 10;
            secondsLeft = secondsLeft - 10;
          }
          
          questionDiv.innerHTML = "";
  
          if (questionCount === questions.length) {
            return;
          } else {
            questionCount++;
            displayQuestions();
          }
        });
        choices.append(el);
      }
    }
}

function captureUserScore() {
    timer.remove();
    choices.textContent = "";
    let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    };

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
  });
  results.append(initialsInput);
  results.append(postScoreBtn);
}

// Saves and displays scores
const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
    if(arr1 !== null) {
      return arr1
    } else {
      return arr2
    }
}
  
const removeEls = (...els) => {
    for (let el of els) el.remove();
}
  
function displayAllScores() {
    removeEls(timer, startButton, results);
    let scoresArray = defineScoresArray(storedArray, emptyArray);
  
    scoresArray.forEach(obj => {
      let initials = obj.initials;
      let storedScore = obj.score;
      let resultsP = document.createElement("p");
      resultsP.innerText = `${initials}: ${storedScore}`;
      scoresDiv.append(resultsP);
    });
}