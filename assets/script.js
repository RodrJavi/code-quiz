let quizStartButton = document.querySelector("#quiz-start-button");
let debugButton = document.querySelector("#debug-button");

function startQuiz() {
  let timerCount = 100;
  let screenTimer = document.querySelector("#quiz-timer");
  let quizQuestion = document.querySelector("#quiz-question");
  let answerList = document.querySelector("#answer-list").children;
  let chosenAnswer;
  let question1 = {
    Question: "This is the question in firstQuestion",
    answers: ["First answer", "Second answer", "Third answer", "Fourth answer"],
    values: [false, true, false, false],
  };
  let question2 = {
    Question: "This is the question in secondQuestion",
    answers: [
      "First answer(2)",
      "Second answer(2)",
      "Third answer(2)",
      "Fourth answer(2)",
    ],
    values: [false, false, false, true],
  };
  let question3 = {
    Question: "This is the question in thirdQuestion",
    answers: [
      "First answer(3)",
      "Second answer(3)",
      "Third answer(3)",
      "Fourth answer(3)",
    ],
    values: [true, false, false, false],
  };

  // Changes HTML to show current questions and adds event listeners to answers that provid a true or false boolean
  function renderQuestion(currentQuestion) {
    quizQuestion.textContent = currentQuestion.Question;
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      answerList[i].textContent = currentQuestion.answers[i];
      answerList[i].addEventListener("click", () => {
        chosenAnswer = currentQuestion.values[i];
        result(chosenAnswer, currentQuestion);
      });
    }
  }

  // Takes clicked answer from active question
  function result(response, currentQuestion) {
    if (response) {
      console.log("No penalty!");
    } else {
      console.log("You're wrong! Minus 10 seconds!");
      timerCount = timerCount - 10;
    }

    switch (currentQuestion) {
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
    }
    document.querySelector("#result").textContent = response;
  }

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

  renderQuestion(question1);
}

quizStartButton.addEventListener("click", startQuiz);
debugButton.addEventListener("click", startQuiz);
