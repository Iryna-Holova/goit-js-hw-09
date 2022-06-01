import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

let selectedDateTime;
let timerId = null;

startButton.addEventListener('click', onTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startButton.disabled = false;
            selectedDateTime = selectedDates[0].getTime();
        }
    },
};

flatpickr('input#datetime-picker', options);

function onTimer() {
    startButton.disabled = true;
    input.disabled = true;
    timerId = setInterval(() => {
        const timerTime = selectedDateTime - Date.now();
        const convertedTime = convertMs(timerTime);

        switch (timerTime < 0) {
            case true:
                clearInterval(timerId);
                break;
            case false:
                timerDays.textContent = addLeadingZero(convertedTime.days);
                timerHours.textContent = addLeadingZero(convertedTime.hours);
                timerMinutes.textContent = addLeadingZero(convertedTime.minutes);
                timerSeconds.textContent = addLeadingZero(convertedTime.seconds);
                break;
        }
    }, 1000);
};

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

Notiflix.Notify.init({
    width: '500px',
    fontSize: '24px',
    position: 'center-top',
});
