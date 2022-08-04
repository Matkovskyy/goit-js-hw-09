import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const startButton = document.querySelector('.form button');
const firstDelay = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');

form.addEventListener('submit', onSubmitButton);

function onSubmitButton(event) {
  event.preventDefault();
  const firstDelayValue = Number(firstDelay.value);
  const delayStepValue = Number(delayStep.value);
  const amountValue = Number(amount.value);

  let delay = firstDelayValue - delayStepValue;

  for (let i = 1; i <= amountValue; i += 1) {
    delay += delayStepValue;
    createPromise(i, delay)
      .then(({ position, delay }) => { onFulfilled({ position, delay }) })
      .catch(({ position, delay }) => { onRejected({ position, delay }) });
  }
   event.target.reset();
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position: position, delay: delay });
      }
      else {
        // Reject
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
   
}

function onFulfilled({position,delay}) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
  
 function onRejected({position, delay}){
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  };

