let quizStartButton = document.querySelector("#quiz-start-button");
let debugButton = document.querySelector("#debug-button");

function startQuiz() {
  let timerCount = 100;
  let screenTimer = document.querySelector("#quiz-timer");
  let quizQuestion = document.querySelector("#quiz-question");
  let answerList = document.querySelector("#answer-list").children;
  let chosenAnswer;
  let firstQuestion = {
    Question: "This is the question in firstQuestion",
    answers: ["First answer", "Second answer", "Third answer", "Fourth answer"],
    values: [false, true, false, false],
  };
  let secondQuestion = {
    Question: "This is the question in secondQuestion",
    answers: [
      "First answer(2)",
      "Second answer(2)",
      "Third answer(2)",
      "Fourth answer(2)",
    ],
    values: [false, false, false, true],
  };

  screenTimer.textContent = "Time: " + timerCount;

  // Quiz timer
  timer = setInterval(() => {
    if (timerCount > 0) {
      timerCount--;
      screenTimer.textContent = "Time: " + timerCount;
    } else {
      screenTimer.textContent = "Time: Done!";
      clearInterval(timer);
    }
  }, 1000);

  // Switches intro to active quiz
  // document.querySelector(".quiz-intro").style.display = "none";
  // document.querySelector(".active-quiz").style.display = "block";

  // Changes HTML to show current questions and adds event listeners to answers that provid a true or false boolean
  function renderQuestion(currentQuestion) {
    quizQuestion.textContent = currentQuestion.Question;
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      answerList[i].textContent = currentQuestion.answers[i];
      answerList[i].addEventListener("click", () => {
        console.log("Click on " + i);
        chosenAnswer = currentQuestion.values[i];
        console.log(chosenAnswer);
        result(chosenAnswer);
      });
    }
  }

  renderQuestion(secondQuestion);

  function result(response) {
    if (response) {
      console.log("No penalty!");
    } else {
      console.log("You're wrong! Minus 10 seconds!");
      timerCount = timerCount - 10;
    }
    document.querySelector("#result").textContent = response;
  }

  console.log(firstQuestion);
}

quizStartButton.addEventListener("click", startQuiz);
debugButton.addEventListener("click", startQuiz);
