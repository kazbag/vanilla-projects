const workMinutesInput = document.querySelector("#work-minutes");
const intervalsAmountInput = document.querySelector("#intervals-amount");
const pauseMinutesInput = document.querySelector("#pause-minutes");
const goButton = document.querySelector("#go-button");
const pauseButton = document.querySelector("#pause-button");
const resetButton = document.querySelector("#reset-button");
const form = document.querySelector("form");
let workMinutes, intervalsAmount, pauseMinutes;

// refactor, I think it will be better to create one function which pass inputName as parameter
const setWorkMinutes = e => {
  e.preventDefault();
  workMinutes = e.target.value;
  console.log(workMinutes);
};
const setIntervalsAmount = e => {
  e.preventDefault();
  intervalsAmount = e.target.value;
  console.log(intervalsAmount);
};
const setPauseMinutes = e => {
  e.preventDefault();
  pauseMinutes = e.target.value;
  console.log(pauseMinutes);
};

workMinutesInput.addEventListener("change", setWorkMinutes);
intervalsAmountInput.addEventListener("change", setIntervalsAmount);
pauseMinutesInput.addEventListener("change", setPauseMinutes);
