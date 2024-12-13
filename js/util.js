// Генератор случайных чисел //
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const highest = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (highest - lower + 1) + lower;
  return Math.floor(result);
}

// Генератор случайных неповторяющихся значений //
function createRandomValueAtRange(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if(previousValues.length >= (max - min + 1)){
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export {getRandomInteger, createRandomValueAtRange};
