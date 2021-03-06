const cardNumber = document.querySelector("#card-number");
const cardNumberInput = document.querySelector("#card-number-input");

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop"
  ].forEach(function(event) {
    textbox.oldValue = "";
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

setInputFilter(cardNumberInput, function(value) {
  cardNumber.textContent = value
    .replace(/(\d{4})/g, "$1 ")
    .replace(/(^\s+|\s+$)/, "");
  return /^\d*?\d*$/.test(value);
});

const handleInputChange = (inputField, inputTarget) => {
  inputTarget.textContent = inputField.value;
};

const cardOwner = document.querySelector("#card-owner");
const cardOwnerInput = document.querySelector("#card-owner-input");

cardOwnerInput.addEventListener("input", () => {
  handleInputChange(cardOwnerInput, cardOwner);
});

const selects = [...document.querySelectorAll(".form__select")];

const setExpirationDate = () => {
  const span = document.querySelector("#card-expiration-span");
  const month = selects[0].value;
  const year = selects[1].value;
  if (!isNaN(month) && !isNaN(year)) {
    span.textContent = `${month}/${year}`;
  }
};

selects.forEach(item => item.addEventListener("change", setExpirationDate));

const cardFront = document.querySelector(".card__front");
const cardBack = document.querySelector(".card__back");

const showBackOfCard = () => {
  cardBack.classList.remove("rotated");
  cardFront.classList.add("rotated");
};
const hideBackOfCard = () => {
  cardBack.classList.add("rotated");
  cardFront.classList.remove("rotated");
};
document.querySelector("#cvv-input").addEventListener("focus", showBackOfCard);
document.querySelector("#cvv-input").addEventListener("blur", hideBackOfCard);

const cvvSpan = document.querySelector("#cvv-code");
const cvvInput = document.querySelector("#cvv-input");
const handleCVV = e => {
  cvvSpan.textContent = e.target.value;
};

cvvInput.addEventListener("input", handleCVV);

setInputFilter(cvvInput, function(value) {
  cvvSpan.textContent = value
    .replace(/(\d{4})/g, "$1 ")
    .replace(/(^\s+|\s+$)/, "");
  return /^\d*?\d*$/.test(value);
});

const showModal = () => {
  const el = document.createElement("span");
  el.classList.add("modal");
  el.textContent = "that's no 'back to the past'";
  document.body.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 1500);
};

const validateDate = () => {
  const monthNow = new Date().getMonth();
  const yearFull = new Date().getFullYear().toString();
  const yearNow = yearFull.slice(-2);
  const expirationMonth = document.querySelector("#expiration-month");
  const expirationYear = document.querySelector("#expiration-year");
  const dateSpan = document.querySelector("#card-expiration-span");

  if (expirationMonth.value <= monthNow && yearNow >= expirationYear.value) {
    showModal();
    dateSpan.textContent = `${monthNow + 1}/${yearNow}`;
    expirationMonth.value = monthNow + 1;
  }
};

[...document.querySelectorAll(".form__select")].forEach(item =>
  item.addEventListener("change", validateDate)
);
