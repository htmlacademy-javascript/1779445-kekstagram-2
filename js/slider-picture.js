import { EFFECTS } from './constant.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const container = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1, },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const changeFilter = (filter) => {
  switch (filter) {
    case 'marvin':
      return `invert(${ effectValue.value }%)`;
    case 'phobos':
      return `blur(${ effectValue.value }px)`;
    default:
      return `${EFFECTS[filter].filter}(${ effectValue.value })`;
  }
};

let currentFilter = 'origignal';

sliderElement.noUiSlider.on('update', () => {
  effectValue.value = sliderElement.noUiSlider.get();
  picturePreview.style.filter = changeFilter(currentFilter);

  if(currentFilter === 'origignal'){
    container.classList.add('visually-hidden');
  }
});

effectList.addEventListener('change', (evt) => {
  const clickedElement = evt.target;
  currentFilter = clickedElement.value;

  if(currentFilter === 'none'){
    picturePreview.style.filter = 'none';
    container.classList.add('visually-hidden');
  } else {
    container.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions(EFFECTS[clickedElement.value].effectsSlider);
  }
});

export const resetSlider = () => {
  container.classList.add('visually-hidden');
  sliderElement.noUiSlider.set(100);
  picturePreview.style.filter = 'none';
};
