const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startButton.addEventListener('click', onStartButton);
stopButton.addEventListener('click', onStopButton);
stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButton() {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    startButton.disabled = true;
    stopButton.disabled = false;
}

function onStopButton() {
    clearInterval(timerId);

    stopButton.disabled = true;
    startButton.disabled = false;
}