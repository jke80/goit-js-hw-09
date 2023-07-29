import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

let timerId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timer = Date.parse(selectedDates[0]) - Date.now();
    if (timer <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtnEl.disabled = false;
  },
};

flatpickr('input#datetime-picker', options);
const startBtnEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input#datetime-picker');
startBtnEl.addEventListener('click', onClickStartBtn);
startBtnEl.disabled = true;

timerEl = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

function onClickStartBtn() {
  startBtnEl.disabled = true;
  const timerSetValue = Date.parse(inputEl.value);

  if (timerSetValue < Date.now()) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  clearInterval(timerId);
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      timerSetValue - Date.now()
    );
    if (!(days + hours + minutes + seconds)) {
      clearInterval(timerId);
      Notify.success('Success!!');
    }
    timerEl.days.textContent = addLeadingZero(days);
    timerEl.hours.textContent = addLeadingZero(hours);
    timerEl.minutes.textContent = addLeadingZero(minutes);
    timerEl.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
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
  value = String(value);
  const length = value.length < 2 ? 2 : value.length;
  return value.padStart(length, '0');
}
