function validate(inputField) {
  let lastValue = inputField.value;
  let lastWidth = Math.max(lastValue.length + 1, 3);

  return function(event) {
    if (isNaN(Number(event.data))) {
      inputField.value = lastValue;
      return;
    }
    if (event.inputType == "insertText") {
      if (inputField.value.length < 6) {
        lastWidth += (inputField.value.length < 3) ? 0 : 1;
        inputField.style.width = `${lastWidth}ch`;
        lastValue = inputField.value;
      } else {
        inputField.style.transition = "border-color 0.25s";
        inputField.style.borderColor = "crimson";
        setTimeout(() => {
          const root = document.documentElement;
          inputField.style.transition = "border-color 1s";
          const borderColor = window.getComputedStyle(root)
            .getPropertyValue("--border-color");
          inputField.style.borderColor = borderColor;
        }, 1000);
        inputField.value = lastValue;
      }
    } else if (event.inputType == "deleteContentBackward") {
      const deletedAmount = Math.abs(inputField.value.length - (lastWidth - 1));
      lastWidth = Math.max(lastWidth - deletedAmount, 3);
      inputField.style.width = `${lastWidth}ch`;
      lastValue = inputField.value;
    } else {
      inputField.value = lastValue;
    }
  }
}

function generate(from, to) {
  const number = document.querySelector("main > div:last-of-type > p");
  const [min, max] = [Math.min(from, to), Math.max(from, to)];
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  number.style.transform = "scale(0)";
  setTimeout(() => {
    number.innerText = result;
    number.style.transform = "scale(1)";
  }, 150);
}

function main() {
  const inputFields = [
    document.querySelector(".from"),
    document.querySelector(".to")
  ];
  const generateButton = document.querySelector("button");
  for (const inputField of inputFields) {
    inputField.addEventListener("input", validate(inputField));
  }
  generateButton.addEventListener("click", () => generate(
    +inputFields[0].value, +inputFields[1].value
  ));
}

main();