import { PictureConst } from './constant.js';

const { ALERT_SHOW_TIME } = PictureConst;

const body = document.body;
const pictureElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showFailureAlert = () => {
  const photoElement = pictureElementTemplate.cloneNode(true);
  body.appendChild(photoElement);

  setTimeout(() => photoElement.remove(), ALERT_SHOW_TIME);
};

//  Функция перемешивания Фишера — Йетса
const getShuffleArray = (arrays) => {
  for (let i = arrays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [arrays[i], arrays[j]] = [arrays[j], arrays[i]];
  }
  return arrays;
};

// Проверка на нажатие клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция Debounce
const getDebounce = (callback, timeoutDelay) => {
  let timeOutId;
  return (...rest) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Получить либо целое, либо число с плавающей точкой до 1 знака после запятой
const getNumber = (value) => {
  value = Number(value);
  return Number.isInteger(value) ? value : value.toFixed(1);
};

export { showFailureAlert, isEscapeKey, getShuffleArray, getDebounce, getNumber };
