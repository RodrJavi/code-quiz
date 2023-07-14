const quizStartButton = document.querySelector("#quiz-start-button");
const screenTimer = document.querySelector("#quiz-timer");
const quizQuestion = document.querySelector("#quiz-question");
const answerList = document.querySelector("#answer-list").children;
const scoreDisplay = document.querySelector("#score");
const nameList = document.querySelector("#nameList");
const scoreList = document.querySelector("#scoreList");
let isScoreOpen = false;
const question1 = {
  Question:
    "Which function is used to serialize an object into a JSON string in Javascript?",
  answers: ["stringify()", "parse()", "conver()", "None of the above"],
  correctAnswer: 0,
};
const question2 = {
  Question: "Javscript is a(n) ______ language",
  answers: [
    "Object-Oriented",
    "Procedural",
    "Object-Based",
    "None of the bove",
  ],
  correctAnswer: 0,
};
const question3 = {
  Question:
    "Which of the following keywords is used to define a variable in Javascript",
  answers: ["var", "let", "A and B", "None of the above"],
  correctAnswer: 2,
};
const question4 = {
  Question: "How to stop an interval timer in Javascript?",
  answers: ["clearTimer", "clearInterval", "intervalOver", "stopTimer"],
  correctAnswer: 1,
};
const question5 = {
  Question: "How do we write a comment in Javascript?",
  answers: ["$$", "#", "//", "/**/"],
  correctAnswer: 2,
};
const question6 = {
  Question:
    "Which of the following number object function returns the value of the number?",
  answers: ["toPrecision()", "toLocaleString()", "toString()", "valueOf()"],
  correctAnswer: 3,
};

// empties parent ULs each time when called to allow them to be 'refreshed' when new scores are added to localstorage
function showHighScores() {
  document.querySelector(".quiz-intro").style.display = "none";
  document.querySelector(".active-quiz").style.display = "none";
  document.querySelector(".quiz-results").style.display = "none";
  document.querySelector(".score-screen").style.display = "flex";
  let scoreRecord = JSON.parse(localStorage.getItem("scoreRecord"));
  nameList.innerHTML = "";
  scoreList.innerHTML = "";
  screenTimer.style.display = "none";

  if (!scoreRecord) {
    nameList.innerHTML = "No scores to display!";
  } else {
    for (let i = 0; i < scoreRecord.name.length; i++) {
      let newLi = document.createElement("li");
      newLi.textContent = scoreRecord.name[i];
      nameList.appendChild(newLi);
    }

    for (let i = 0; i < scoreRecord.score.length; i++) {
      let newLi = document.createElement("li");
      newLi.textContent = scoreRecord.score[i];
      scoreList.appendChild(newLi);
    }
  }

  if (!isScoreOpen) {
    isScoreOpen = true;
    document.querySelector("#scoreViewer").textContent = "Return to quiz start";
  } else {
    document.querySelector(".quiz-intro").style.display = "flex";
    document.querySelector(".score-screen").style.display = "none";
    isScoreOpen = false;
    document.querySelector("#scoreViewer").textContent = "View high scores";
  }
}

// On "View high scores" text at top of page to show list of high scores
document
  .querySelector("#scoreViewer")
  .addEventListener("click", showHighScores);

function startQuiz() {
  let timerCount = 75;
  let newScore;
  let activeQuestion;

  // Switches intro to active quiz
  document.querySelector(".quiz-intro").style.display = "none";
  document.querySelector(".active-quiz").style.display = "block";

  // Quiz timer
  timer = setInterval(() => {
    if (timerCount > 0) {
      timerCount--;
      screenTimer.textContent = "Time: " + timerCount;
    } else {
      showScore();
    }
  }, 1000);
  screenTimer.style.display = "block";
  screenTimer.textContent = "Time: " + timerCount;

  // Adds event listeners to questions
  [...answerList].forEach((answer) => {
    answer.addEventListener("click", (e) => {
      let answer = e.target.getAttribute("data-number");
      answerPick(answer, activeQuestion);
    });
  });

  // Changes HTML to show current questions
  function renderQuestion(currentQuestion) {
    activeQuestion = currentQuestion;
    quizQuestion.textContent = currentQuestion.Question;
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      answerList[i].textContent = currentQuestion.answers[i];
    }
  }

  // called when answer is picked, determines if it was correct or not and switches to next question
  function answerPick(ans, currentQ) {
    let windowAnswer = document.querySelector("#result");
    if (ans == currentQ.correctAnswer) {
      windowAnswer.textContent = "Correct!";
      windowAnswer.setAttribute("class", "result correct");
    } else {
      timerCount = timerCount - 10;
      windowAnswer.textContent = "Incorrect";
      windowAnswer.setAttribute("class", "result incorrect");
    }

    switch (currentQ) {
      case question1:
        renderQuestion(question2);
        break;
      case question2:
        renderQuestion(question3);
        break;
      case question3:
        renderQuestion(question4);
        break;
      case question4:
        renderQuestion(question5);
        break;
      case question5:
        renderQuestion(question6);
        break;
      case question6:
        isFinished = true;
        showScore();
        break;
    }
  }

  // Shows score when quiz has ended, also allows user to input name for score and submit into local storage. Shows high score screen right away
  function showScore() {
    let userName;
    highScores = JSON.parse(localStorage.getItem("scoreRecord"));
    screenTimer.textContent = "Time: Done!";
    clearInterval(timer);
    newScore = timerCount;
    scoreDisplay.textContent = newScore;
    document.querySelector(".active-quiz").style.display = "none";
    document.querySelector(".quiz-results").style.display = "flex";
    document.querySelector("#scoreInput").addEventListener("submit", (e) => {
      e.preventDefault();
      userName = document.querySelector("#nameInput").value;
      if (!highScores) {
        highScores = {
          name: [],
          score: [],
        };
      }
      if (!(userName === "")) {
        highScores.name.push(userName);
        highScores.score.push(newScore);
        localStorage.setItem("scoreRecord", JSON.stringify(highScores));
        showHighScores();
      } else {
        window.alert("Please enter a name");
      }
    });
  }

  renderQuestion(question1);
}

quizStartButton.addEventListener("click", startQuiz);
