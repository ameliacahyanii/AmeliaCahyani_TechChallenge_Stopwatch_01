$(document).ready(function () {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let miliseconds = 0;
  let timer = null;

  function updateDisplay() {
    $("#hours").text(hours.toString().padStart(2, "0"));
    $("#minutes").text(minutes.toString().padStart(2, "0"));
    $("#seconds").text(seconds.toString().padStart(2, "0"));
    $("#miliseconds").text(
      Math.floor(miliseconds / 10)
        .toString()
        .padStart(2, "0"),
    );
  }

  function startTimer() {
    if (timer != null) return;

    timer = setInterval(function () {
      miliseconds += 10;

      if (miliseconds === 1000) {
        miliseconds = 0;
        seconds++;
      }

      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      if (minutes === 60) {
        minutes = 0;
        hours++;
      }

      updateDisplay();
    }, 10);
  }

  function pauseTimer() {
    clearInterval(timer);
    timer = null;
  }

  function resetTimer() {
    pauseTimer();

    hours = 0;
    minutes = 0;
    seconds = 0;
    miliseconds = 0;

    updateDisplay();
  }

  $("#start").click(startTimer);

  $("#pause").click(pauseTimer);

  $("#reset").click(resetTimer);

  updateDisplay();
});
