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
/*
// * Проверка сравнения длинны строки с числом * //
console.log(isStringLonger('проверяемая строка', 20));
console.log(isStringLonger('проверяемая строка', 18));
console.log(isStringLonger('проверяемая строка', 10));

// * Проверка для определения палиндрома * //
console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));
console.log(isPalindrom('Лёша на полке клопа нашёл '));

// * Проверка для поиска числа в строке * //
console.log(getInteger('2023 год'));
console.log(getInteger('ECMAScript 2022'));
console.log(getInteger('1 кефир, 0.5 батона'));
console.log(getInteger('агент 007'));
console.log(getInteger('а я томат'));
console.log(getInteger(2023));
console.log(getInteger(-1));
console.log(getInteger(1.5));
*/
