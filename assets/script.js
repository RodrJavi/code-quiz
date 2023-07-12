const quizStartButton = document.querySelector("#quiz-start-button");
const screenTimer = document.querySelector("#quiz-timer");
const quizQuestion = document.querySelector("#quiz-question");
const answerList = document.querySelector("#answer-list").children;
const scoreDisplay = document.querySelector("#score");
const question1 = {
  Question: "This is the question in firstQuestion",
  answers: ["First answer", "Second answer", "Third answer", "Fourth answer"],
  correctAnswer: 1,
};
const question2 = {
  Question: "This is the question in secondQuestion",
  answers: [
    "First answer(2)",
    "Second answer(2)",
    "Third answer(2)",
    "Fourth answer(2)",
  ],
  correctAnswer: 3,
};
const question3 = {
  Question: "This is the question in thirdQuestion",
  answers: [
    "First answer(3)",
    "Second answer(3)",
    "Third answer(3)",
    "Fourth answer(3)",
  ],
  correctAnswer: 0,
};
const question4 = {
  Question: "This is the question in fourthQuestion",
  answers: [
    "First answer(4)",
    "Second answer(4)",
    "Third answer(4)",
    "Fourth answer(4)",
  ],
  correctAnswer: 1,
};
const question5 = {
  Question: "This is the question in fifthQuestion",
  answers: [
    "First answer(5)",
    "Second answer(5)",
    "Third answer(5)",
    "Fourth answer(5)",
  ],
  correctAnswer: 2,
};
const question6 = {
  Question: "This is the question in sixthQuestion",
  answers: [
    "First answer(6)",
    "Second answer(6)",
    "Third answer(6)",
    "Fourth answer(6)",
  ],
  correctAnswer: 3,
};

function startQuiz() {
  let timerCount = 1000;
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
  document.querySelector(".quiz-timer").style.display = "block";
  screenTimer.textContent = "Time: " + timerCount;

  // Adds event listeners to questions
  [...answerList].forEach((answer) => {
    answer.addEventListener("click", (e) => {
      let answer = e.target.getAttribute("data-number");
      // console.log(answer);
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

  function answerPick(ans, currentQ) {
    let windowAnswer = document.querySelector("#result");
    if (ans == currentQ.correctAnswer) {
      console.log("No penalty!");
      windowAnswer.textContent = "Correct!";
      windowAnswer.setAttribute("class", "result correct");
    } else {
      console.log("You're wrong! Minus 10 seconds!");
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

  function showScore() {
    let userName;
    highScores = JSON.parse(localStorage.getItem("scoreRecord"));
    screenTimer.textContent = "Time: Done!";
    clearInterval(timer);
    newScore = timerCount;
    scoreDisplay.textContent = newScore;
    document.querySelector("#active-quiz").style.display = "none";
    document.querySelector("#quiz-results").style.display = "flex";
    document.querySelector("#scoreInput").addEventListener("submit", (e) => {
      e.preventDefault();
      userName = document.querySelector("#nameInput").value;
      if (!highScores) {
        highScores = {
          name: [],
          score: [],
        };
      }
      highScores.name.push(userName);
      highScores.score.push(newScore);
      localStorage.setItem("scoreRecord", JSON.stringify(highScores));
      console.log(highScores);
    });
  }

  renderQuestion(question6);
}

quizStartButton.addEventListener("click", startQuiz);
