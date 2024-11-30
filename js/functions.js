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

// * Проверка сравнения длинны строки с числом * //
isStringLonger('проверяемая строка', 20);
isStringLonger('проверяемая строка', 18);
isStringLonger('проверяемая строка', 10);

// * Проверка для определения палиндрома * //
isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

// * Проверка для поиска числа в строке * //
getInteger('2023 год');
getInteger('ECMAScript 2022');
getInteger('1 кефир, 0.5 батона');
getInteger('агент 007');
getInteger('а я томат');
getInteger(2023);
getInteger(-1);
getInteger(1.5);

