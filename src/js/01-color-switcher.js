const refs = {
  bodyEl: document.querySelector('body'),
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};
let bgIntervalId = null;
refs.startBtnEl.addEventListener('click', startBtnClick);
refs.stopBtnEl.addEventListener('click', stopBtnClick);

function startBtnClick() {
  refs.startBtnEl.setAttribute('disabled', '');
  bgIntervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function stopBtnClick() {
  refs.startBtnEl.removeAttribute('disabled');
  clearInterval(bgIntervalId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
