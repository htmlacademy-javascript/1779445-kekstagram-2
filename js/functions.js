// * Функция для сравнения длинны строки с числом * //
const isStringLonger = (string, maxLength) => string.length <= maxLength;

// * Функция для определения палиндрома * //
function isPalindrom (string) {

  string = string.replaceAll(' ', '').toLowerCase();

  return string.split('').reverse().join('') === string;
}

// * Функция для поиска числа в строке * //
function getInteger (value) {

  if(/[0-9]+/.test(String(value))){

    return parseInt(String(value).match(/\d+/g).join(''), 10);

  }

  return NaN;
}


isStringLonger('проверяемая строка', 20);
isPalindrom('топот');
getInteger('2023 год');
