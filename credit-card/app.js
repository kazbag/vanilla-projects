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
