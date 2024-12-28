// Генератор случайных чисел //
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const highest = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (highest - lower + 1) + lower;
  return Math.floor(result);
};

// Генератор случайных неповторяющихся значений //
const createRandomValueAtRange = (min, max) => {
  const previousValues = new Set();
  let currentValue;

  return () => {
    if(previousValues.size >= (max - min + 1)){
      return null;
    }

    do {
      currentValue = getRandomInteger(min, max);
    } while (previousValues.has(currentValue));

    previousValues.add(currentValue);
    return currentValue;
  };
};

// Проверка нажатия клавиши Escape //
const isEnterKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, createRandomValueAtRange, isEnterKey };
