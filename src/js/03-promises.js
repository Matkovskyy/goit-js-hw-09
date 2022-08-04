// import Notiflix from 'notiflix';

// const form = document.querySelector('.form');
// const startButton = document.querySelector('.form button');
// const firstDelay = document.querySelector('[name=delay]');
// const delayStep = document.querySelector('[name=step]');
// const amount = document.querySelector('[name=amount]');

// form.addEventListener('submit', onSubmitButton);

// function onSubmitButton(event) {
//   event.preventDefault();
//   const firstDelayValue = Number(firstDelay.value);
//   const delayStepValue = Number(delayStep.value);
//   const amountValue = Number(amount.value);

//   let delay = firstDelayValue - delayStepValue;

//   for (let i = 1; i <= amountValue; i += 1) {
//     delay += delayStepValue;
//     createPromise(i, delay)
//       .then(({ position, delay }) => { onFulfilled({ position, delay }) })
//       .catch(({ position, delay }) => { onRejected({ position, delay }) });
//  }
// };

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {

//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve({ position: position, delay: delay });
//       }
//       else {
//         // Reject
//         reject({ position: position, delay: delay });
//       }
//     }, delay);
//   });
// }

// function onFulfilled({position,delay}) {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// }
  
//  function onRejected({position, delay}){
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   };


  import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onClickSubmit);

function onClickSubmit(event) {
  event.preventDefault();
  event.target.reset();
  const elements = event.currentTarget.elements;
  const stepNumber = Number(elements.step.value);
  const delayNumber = Number(elements.delay.value);
  const amountNumber = Number(elements.amount.value);
  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, stepNumber * (i - 1) + delayNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  // console.log('pos=', position, ' delay=', delay);
  return promise;
}