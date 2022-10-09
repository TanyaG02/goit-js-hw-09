import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const start = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');
start.setAttribute('disabled', null);
let selectedTimeId = null;

const options = {
  enableTime: true,
  enabledata: false,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      start.setAttribute('disabled', null) &
        Notify.failure('Please choose a date in the future');
    } else start.removeAttribute('disabled');
  },
};
const dataPickr = new flatpickr(input, options);

const convertMs = ms => {
  ms = dataPickr.selectedDates[0] - Date.now();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return String(value).padStart(2, 0);
};

const onStartClick = () => {
  start.setAttribute('disabled', null);

  selectedTimeId = setInterval(() => {
    const timeTo = convertMs();
    const { days, hours, minutes, seconds } = timeTo;
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(selectedTimeId);
    }
    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minutesTimer.textContent = addLeadingZero(minutes);
    secondsTimer.textContent = addLeadingZero(seconds);
  }, 1000);
};

start.addEventListener('click', onStartClick);
