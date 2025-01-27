import { getNumber } from './utility.js';
import { PictureConst, effects } from './constant.js';

const { MAX_VALUE_SCALE, MIN_SLIDER_VALUE, MAX_SLIDER_VALUE, STEP_SLIDER_VALUE} = PictureConst;

const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const containerEffect = document.querySelector('.img-upload__effect-level');

// Инициализируем слайдер с помощью библиотеки noUiSlider
noUiSlider.create(sliderElement, {
  range: { min: MIN_SLIDER_VALUE, max: MAX_SLIDER_VALUE, },
  start: MAX_SLIDER_VALUE,
  step: STEP_SLIDER_VALUE,
  connect: 'lower'
});

// Функция для изменения фильтра в зависимости от выбранного эффекта
const changeFilter = (filter) => {
  switch (filter) {
    case 'marvin':
      return `invert(${ effectValue.value }%)`;
    case 'phobos':
      return `blur(${ effectValue.value }px)`;
    default:
      return `${effects[filter].filter}(${ effectValue.value })`;
  }
};

let currentFilter = 'original';

// Обработчик события обновления слайдера
sliderElement.noUiSlider.on('update', () => {
  effectValue.value = getNumber(sliderElement.noUiSlider.get());
  picturePreview.style.filter = changeFilter(currentFilter);

  // Если выбран оригинальный фильтр, скрываем контейнер уровня эффекта
  if(currentFilter === 'original'){
    containerEffect.classList.add('visually-hidden');
  }
});

effectList.addEventListener('change', (evt) => {
  const clickedElement = evt.target;
  currentFilter = clickedElement.value;

  if(currentFilter === 'none'){
    picturePreview.style.filter = 'none';
    containerEffect.classList.add('visually-hidden');
  } else {
    containerEffect.classList.remove('visually-hidden');
    sliderElement.noUiSlider.updateOptions(effects[clickedElement.value].effectsSlider);
  }
});

// Функция для сброса слайдера и эффектов
const resetSlider = () => {
  containerEffect.classList.add('visually-hidden');
  sliderElement.noUiSlider.set(MAX_VALUE_SCALE);
  picturePreview.style.filter = 'none';
};

export { resetSlider };
