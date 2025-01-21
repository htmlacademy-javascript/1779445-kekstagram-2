import { PICTURE_CONST } from './constant.js';

const { MAX_VALUE_SCALE, MIN_VALUE_SCALE, STEP_VALUE_SCALE} = PICTURE_CONST;

const smallerControl = document.querySelector('.scale__control--smaller');
const biggerControl = document.querySelector('.scale__control--bigger');
const valueControl = document.querySelector('.scale__control--value');
const pictureResize = document.querySelector('.img-upload__preview img');

const changeValue = (step) => {
  const currentValue = parseInt(valueControl.value, 10);
  const newValue = currentValue + step;

  if (newValue >= MIN_VALUE_SCALE && newValue <= MAX_VALUE_SCALE) {
    valueControl.value = `${newValue}%`;
    pictureResize.style.transform = `scale(${newValue / 100})`;
  }
};

smallerControl.addEventListener('click', () => changeValue (-STEP_VALUE_SCALE));
biggerControl.addEventListener('click', () => changeValue (STEP_VALUE_SCALE));

export const resetScale = () => {
  valueControl.value = '100%';
  pictureResize.style.transform = 'scale(1)';
};
