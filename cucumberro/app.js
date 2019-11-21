const workMinutesInput = document.querySelector("#work-minutes");
const intervalsAmountInput = document.querySelector("#intervals-amount");
const pauseMinutesInput = document.querySelector("#pause-minutes");
const goButton = document.querySelector("#go-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const form = document.querySelector("form");
const timeLeftSpan = document.querySelector("#time-left");
let workMinutes = workMinutesInput.value;
let intervalsAmount = intervalsAmountInput.value;
let pauseMinutes = pauseMinutesInput.value;
let isStarted = false;
let isPaused = true;
let hasAppBeenStarted = false;
// refactor, I think it will be better to create one function which pass inputName as parameter
const setWorkMinutes = e => {
  e.preventDefault();
  if (!isStarted) {
    workMinutes = e.target.value;
    console.log(workMinutes);
  }
};
const setIntervalsAmount = e => {
  e.preventDefault();
  intervalsAmount = e.target.value;
};
const setPauseMinutes = e => {
  e.preventDefault();
  if (!isStarted) {
    pauseMinutes = e.target.value;
  }
};

const setTimeValue = e => {
  timeLeftSpan.textContent = `${
    e.target.value >= 10 ? e.target.value : "0" + e.target.value
  }:00`;
};

workMinutesInput.addEventListener("change", setWorkMinutes);
workMinutesInput.addEventListener("change", setTimeValue);
intervalsAmountInput.addEventListener("change", setIntervalsAmount);
pauseMinutesInput.addEventListener("change", setPauseMinutes);

const updateTime = input => {
  let time = input.value * 60;
  const updateTimeEachSecond = setInterval(() => {
    goButton.disabled = true;

    if (time <= 0) {
      intervalsAmount > 0
        ? intervalsAmount--
        : (intervalsAmount = intervalsAmountInput.value);
      isStarted = !isStarted;
      goButton.disabled = false;
      clearInterval(updateTimeEachSecond);
    }
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    time--;
    if (isPaused) {
      clearInterval(updateTimeEachSecond);
      goButton.disabled = false;
    }
    timeLeftSpan.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }`;
  }, 100);
};

const startApp = e => {
  e.preventDefault();
  if (!isStarted) {
    isPaused = false;
    isStarted = true;
    updateTime(workMinutesInput);
  }
};

const pauseApp = e => {
  e.preventDefault();
  if (isStarted) {
    let workMinutes = workMinutesInput.value;
    let intervalsAmount = intervalsAmountInput.value;
    let pauseMinutes = pauseMinutesInput.value;
    isStarted = false;
    isPaused = true;
  }
};

const resetApp = e => {
  e.preventDefault();
  isStarted ? (isStarted = !isStarted) : null;
};

goButton.addEventListener("click", startApp);
pauseButton.addEventListener("click", pauseApp);
resetButton.addEventListener("click", resetApp);
