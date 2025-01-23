const body = document.body;
const picturesElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const ALERT_SHOW_TIME = 5000;

const showFailureAlert = () => {
  const photosElement = picturesElementTemplate.cloneNode(true);
  body.appendChild(photosElement);

  setTimeout(() => photosElement.remove(), ALERT_SHOW_TIME);
};

//  Функция перемешивания Фишера — Йетса
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Фукнция Debounce
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showFailureAlert, isEscapeKey, shuffle, debounce };
