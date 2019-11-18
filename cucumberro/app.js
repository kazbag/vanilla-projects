const workMinutesInput = document.querySelector("#work-minutes");
const intervalsAmountInput = document.querySelector("#intervals-amount");
const pauseMinutesInput = document.querySelector("#pause-minutes");
const goButton = document.querySelector("#go-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const form = document.querySelector("form");
const timeLeftSpan = document.querySelector("#time-left");
let workMinutes, intervalsAmount, pauseMinutes;
let isStarted = false;

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
  if (!isStarted) {
    intervalsAmount = e.target.value;
    console.log(intervalsAmount);
  }
};
const setPauseMinutes = e => {
  e.preventDefault();
  if (!isStarted) {
    pauseMinutes = e.target.value;
    console.log(pauseMinutes);
  }
};

workMinutesInput.addEventListener("change", setWorkMinutes);
intervalsAmountInput.addEventListener("change", setIntervalsAmount);
pauseMinutesInput.addEventListener("change", setPauseMinutes);

const updateTime = input => {
  let time = input.value * 60;
  const updateTimeEachSecond = setInterval(() => {
    goButton.disabled = true;
    if (time <= 0) {
      isStarted = !isStarted;
      goButton.disabled = false;
      clearInterval(updateTimeEachSecond);
    }
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    time--;
    timeLeftSpan.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }`;
  }, 1000);
};

const startApp = e => {
  e.preventDefault();
  if (!isStarted) {
    updateTime(workMinutesInput);
    isStarted = !isStarted;
  }
};

const pauseApp = e => {
  e.preventDefault();
  isStarted ? (isStarted = !isStarted) : null;
};

const resetApp = e => {
  e.preventDefault();
  isStarted ? (isStarted = !isStarted) : null;
};

goButton.addEventListener("click", startApp);
pauseButton.addEventListener("click", pauseApp);
resetButton.addEventListener("click", resetApp);
