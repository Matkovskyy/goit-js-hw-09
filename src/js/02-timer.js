// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const startButton = document.querySelector('button[data-start]');
// const dataDays = document.querySelector('span[data-days]');
// const dataHours = document.querySelector('span[data-hours]');
// const dataMinutes = document.querySelector('span[data-minutes]');
// const dataSeconds = document.querySelector('span[data-seconds]');
// const dateInput = document.querySelector('#datetime-picker');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// const currentDate = new Date();
// const date = flatpickr('#datetime-picker', options);

// let intervalId = null;

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// startButton.addEventListener('click', onStartClick);
// dateInput.addEventListener('change', onInputCheck);

// function onStartClick(event) {
//   changeButton(true);

//   let dateMs = date.selectedDates[0].getTime();
//   let dateNowMs = Date.now();

//   console.log('MS :', dateMs);
//   console.log('NOW MS:', dateNowMs);
  
//   startCount(dateMs);
// }

// function startCount(dateMs){
//   intervalId = setInterval(() => {

//     const deltaMs = dateMs - Date.now();
//     const afterConvertMs = convertMs(deltaMs);
//     console.log(afterConvertMs);
//     updateClockFace(afterConvertMs);

//   }, 1000)
//   changeButton(true, true);
// }

// function onInputCheck() {

//     let dateMs = date.selectedDates[0].getTime();
//     let dateNowMs = dateNow.getTime();

//     if (dateMs < dateNowMs) {
//       Notiflix.Notify.failure("Please choose a date in the future");
//         changeButton(false,true);
//     } else {
//         changeButton(false,false);
//     }
// }
// function changeButton(addInput, add){
//   dateInput.disabled = addInput;
//   startButton.disabled = add;
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;


  
//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero (Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero (Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// function updateClockFace({ days, hours, minutes, seconds }) {
//   dataDays.textContent = days;
//   dataHours.textContent = hours;
//   dataMinutes.textContent = minutes;
//   dataSeconds.textContent = seconds;
// }

// const deadLine = new Date(2022, 7, 5);
// const currentDay = new Date();
// const delta = deadLine - currentDay;
// const seconds = Math.floor(delta / 1000) % 60;
// const minutes = Math.floor(delta / 1000 / 60) % 60;
// const hours = Math.floor(delta / 1000 / 60 /60) % 24;
// const days = Math.floor(delta / 1000 / 60 / 60 / 24);
// console.log("seconds", seconds);
// console.log("minutes", minutes);
// console.log("hours", hours);
// console.log("days", days);

const data = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const valueTime = document.querySelectorAll('.value');

startButton.addEventListener('click', onStartButton);
startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
}

flatpickr(data, options);

let selectedTime = 0;
let intervalId = null;

function onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notify.failure('Please choose a date in the future',
                {
                    timeout: 2000,
                });
        } else  {
            startButton.disabled = false;
            selectedTime = selectedDates[0];
        };
};
function timeInterval(date) {
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const countdownTime  = date - currentTime;
        const time = convertMs(countdownTime);
        updateBodyTime(time);

        if (countdownTime <= 0)  {
            data.disabled = false;
            clearInterval(intervalId);
              
        }
    }, 1000); 
};

function onStartButton() {
    startButton.disabled = true;
    data.disabled = true;
    timeInterval(selectedTime); 
    
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
  return { days, hours, minutes, seconds };
};

function updateBodyTime({ days, hours, minutes, seconds }) {
    valueTime[0].textContent = days; 
    valueTime[1].textContent = hours; 
    valueTime[2].textContent = minutes; 
    valueTime[3].textContent = seconds;   
};