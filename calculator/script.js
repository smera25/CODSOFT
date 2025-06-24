let display = document.getElementById("display");

function append(char) {
  const current = display.innerText;

  if (char === '.') {
    const parts = current.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) {
      alert("Only one decimal point is allowed in a number.");
      return;
    }
    if (lastPart === "") {
      display.innerText += "0.";
      adjustFontSize();
      return;
    }
  }

  if (current === "0" && char !== ".") {
    display.innerText = char;
  } else {
    display.innerText += char;
  }

  adjustFontSize();
}

function clearDisplay() {
  display.innerText = "0";
  adjustFontSize();
}

function deleteLast() {
  let current = display.innerText;
  if (current.length === 1 || current === "Error") {
    display.innerText = "0";
  } else {
    display.innerText = current.slice(0, -1);
  }
  adjustFontSize();
}

function calculate() {
  try {
    let expression = display.innerText;
    let result = Function('"use strict"; return (' + expression + ')')();
    result = parseFloat(result.toFixed(10)); 
    display.innerText = result.toString();
  } catch (error) {
    display.innerText = "Error";
  }
  adjustFontSize();
}

function adjustFontSize() {
  const length = display.innerText.length;
  if (length <= 10) {
    display.style.fontSize = "2em";
  } else if (length <= 15) {
    display.style.fontSize = "1.5em";
  } else if (length <= 20) {
    display.style.fontSize = "1.2em";
  } else {
    display.style.fontSize = "1em";
  }
}

document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (!isNaN(key)) {
    append(key);
    pressEffect(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    append(key);
    pressEffect(key);
  } else if (key === '.') {
    append('.');
    pressEffect('.');
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
    pressEffect('=');
  } else if (key === 'Backspace') {
    deleteLast();
    pressEffect('DEL');
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
    pressEffect('C');
  }
});

function pressEffect(key) {
  const button = document.getElementById(key);
  if (button) {
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 150);
  }
}
