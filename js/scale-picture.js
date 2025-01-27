import { PictureConst } from './constant.js';

const { SCALE_FACTOR, MAX_VALUE_SCALE, MIN_VALUE_SCALE, STEP_VALUE_SCALE, MIN_SIZE_SCALE} = PictureConst;

const smallerControl = document.querySelector('.scale__control--smaller');
const biggerControl = document.querySelector('.scale__control--bigger');
const valueControl = document.querySelector('.scale__control--value');
const pictureSizeControl = document.querySelector('.img-upload__preview img');

// Функция для изменения значения масштаба
const changeScale = (step) => {
  const currentValue = parseInt(valueControl.value, 10);
  const newValue = currentValue + step;

  if (newValue >= MIN_VALUE_SCALE && newValue <= MAX_VALUE_SCALE) {
    valueControl.value = `${newValue}%`;
    pictureSizeControl.style.transform = `scale(${newValue / SCALE_FACTOR})`;
  }
};

// Добавляем обработчики событий для кнопок увеличения и уменьшения масштаба
smallerControl.addEventListener('click', () => changeScale (-STEP_VALUE_SCALE));
biggerControl.addEventListener('click', () => changeScale (STEP_VALUE_SCALE));

// Функция для сброса масштаба к значению по умолчанию
export const resetScale = () => {
  valueControl.value = `${ MAX_VALUE_SCALE }%`;
  pictureSizeControl.style.transform = `scale(${ MIN_SIZE_SCALE })`;
};
