let quizStartButton = document.getElementById("quiz-start-button");
function quizTimer() {
  let timerCount = 10;
  timer = setInterval(() => {
    if (timerCount > 0) {
      timerCount--;
      console.log(timerCount);
    } else {
      console.log("Done!");
      clearInterval(timer);
    }
  }, 1000);
}

quizStartButton.addEventListener("click", quizTimer);
