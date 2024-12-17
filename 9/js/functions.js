// Функция для сравнения длинны строки с числом //
const isStringLonger = (string, maxLength) => string.length <= maxLength;

// * Функция для определения палиндрома  //
function isPalindrom (string) {
  string = string.replaceAll(' ', '').toLowerCase();

  return string.split('').reverse().join('') === string;
}

// Функция для поиска числа в строке //
function getInteger (value) {

  if(/[0-9]+/.test(String(value))){
    return parseInt(String(value).match(/\d+/g).join(''), 10);
  }

  return NaN;
}

// Проверка вызова функций isStringLonger, isPalindrom, getInteger //
isStringLonger('проверяемая строка', 20);
isPalindrom('топот');
getInteger('2023 год');


// Функция для преобразования времени в формате "чч:мм" в общее колличество минут //
function isMeetingPossible (workStart, workEnd, meetingStart, meetingDuration){
  const timeToMinutes = (time) => time.split(':').reduce((acc, val) => acc * 60 + Number(val), 0);

  const meetingEndMinutes = timeToMinutes(meetingStart) + meetingDuration;

  return timeToMinutes(meetingStart) >= timeToMinutes(workStart) && meetingEndMinutes <= timeToMinutes(workEnd);

}

// Примеры использования функции isMeetingPossible //

isMeetingPossible('08:00', '17:30', '14:00', 90); // true
isMeetingPossible('8:0', '10:0', '8:0', 120); // true
isMeetingPossible('08:00', '14:30', '14:00', 90); // false
isMeetingPossible('14:00', '17:30', '08:0', 90); // false
isMeetingPossible('8:00', '17:30', '08:00', 900); // false
