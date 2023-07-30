import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // console.log(`promise ${position} delay ${delay} resolved${shouldResolve}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let {
    elements: {
      delay: { value: delay },
      step: { value: step },
      amount: { value: amount },
    },
  } = event.currentTarget;

  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onResolve, onReject);
    delay += step;
  }

  // console.log(delay, step, amount);
}

function onResolve({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
