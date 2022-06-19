import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
let timerIntervalId = null;
refs.startBtnEl.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtnEl.setAttribute('disabled', '');

      return;
    }
    refs.startBtnEl.removeAttribute('disabled', '');
  },
};

const fp = flatpickr(refs.datePicker, options);

refs.startBtnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtnEl.setAttribute('disabled', '');
  refs.datePicker.setAttribute('disabled', '');
  Notiflix.Notify.success('Timer has been started');
  timerIntervalId = setInterval(() => {
    let timeObj = calculateTime();
    console.log(refs.daysEl);
    refs.daysEl.textContent = timeObj.convertedDays;
    refs.hoursEl.textContent = timeObj.convertedHours;
    refs.minutesEl.textContent = timeObj.convertedMinutes;
    refs.secondsEl.textContent = timeObj.convertedSeconds;
  }, 1000);
}

function calculateTime() {
  let selectedTimeInMs = fp.selectedDates[0].getTime() - new Date().getTime();
  let convertedTime = convertMs(selectedTimeInMs);
  let convertedSeconds = addLeadingZero(String(convertedTime.seconds));
  let convertedMinutes = addLeadingZero(String(convertedTime.minutes));
  let convertedHours = addLeadingZero(String(convertedTime.hours));
  let convertedDays = addLeadingZero(String(convertedTime.days));
  let validStrTime = `${convertedDays}:${convertedHours}:${convertedMinutes}:${convertedSeconds}`;
  console.log(validStrTime);
  if (validStrTime === '00:00:00:00') {
    clearInterval(timerIntervalId);
  }
  return { convertedDays, convertedHours, convertedMinutes, convertedSeconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.length < 2) {
    return value.padStart(2, '0');
  }
  return value;
}
