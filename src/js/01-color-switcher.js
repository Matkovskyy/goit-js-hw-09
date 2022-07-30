const startButton = document.querySelector("button[data-start]")
const stopButton = document.querySelector("button[data-stop]")

startButton.addEventListener("click", onStartClick)
stopButton.addEventListener("click", onStopClick)
const DELAY = 1000;
let intervalId = null;

function onStartClick() {
    intervalId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    },DELAY);
    changeButtonStatus(false, true);

}

function onStopClick() {
 clearInterval(intervalId);
    changeButtonStatus(true, false);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeButtonStatus = (remove, add) => {
    startButton.disabled = add;
    stopButton.disabled = remove;

}
