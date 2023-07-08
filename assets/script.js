let quizStartButton = document.querySelector("#quiz-start-button");
let debugButton = document.querySelector("#debug-button");

function startQuiz() {
  let timerCount = 10;
  let screenTimer = document.querySelector("#quiz-timer");
  let quizQuestion = document.querySelector("#quiz-question");
  let answerList = document.querySelector("#answer-list").children;
  let chosenAnswer;
  let firstQuestion = {
    Question: "This is the question in firstQuestion",
    answers: ["First answer", "Second answer", "Third answer", "Fourth answer"],
    values: [false, true, false, false],
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

  for (let i = 0; i < firstQuestion.answers.length; i++) {
    answerList[i].textContent = firstQuestion.answers[i];
    answerList[i].addEventListener("click", () => {
      console.log("Click on " + i);
      chosenAnswer = firstQuestion.values[i];
      console.log(chosenAnswer);
      result(chosenAnswer);
    });
  }

  function result(res) {
    console.log("Result is " + res);
    console.log(typeof chosenAnswer);
    if (res) {
      console.log("You're right!");
    } else {
      console.log("You're wrong AF!");
    }
  }

  quizQuestion.textContent = firstQuestion.Question;
  console.log(firstQuestion);
}

quizStartButton.addEventListener("click", startQuiz);
debugButton.addEventListener("click", startQuiz);
