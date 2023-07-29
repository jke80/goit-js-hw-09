const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

let timerId = null;
refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);
refs.stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartClick() {
  changeColor();
  timerId = setInterval(changeColor, 1000);
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
}

function onStopClick() {
  clearInterval(timerId);

  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
}

function changeColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}
