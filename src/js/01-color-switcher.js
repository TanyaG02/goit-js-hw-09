const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
  body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
}

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    getRandomHexColor();
  }, 1000);
  if ((buttonStart.disabled = true)) {
    buttonStop.disabled = false;
  }
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  if ((buttonStop.disabled = true)) {
    buttonStart.disabled = false;
  }
});
