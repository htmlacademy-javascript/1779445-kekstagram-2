import { shuffle, debounce } from './utility.js';
const imgFilters = document.querySelector('.img-filters');
const imgForms = imgFilters.querySelector('.img-filters__form');
const defaultButton = imgFilters.querySelector('#filter-default');
const randomButton = imgFilters.querySelector('#filter-random');
const discussedButton = imgFilters.querySelector('#filter-discussed');

const DEBOUNCE_DELAY = 500;
const MAX_PICTURE_RENDERING = 10;


import { renderingPictures } from './rendering-picture.js';
import { renderBigPicture } from './render-big-picture.js';

// Меняем активный элемент
const checkActive = (cb) => {
  const activeButton = imgFilters.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  cb.classList.add('img-filters__button--active');
};

// Отрисовываем картинки
const renderView = (array) => {
  clearPitureList();
  renderingPictures(array);
  renderBigPicture(array);
};

//Очищаем список
function clearPitureList () {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    // Проверяем, не является ли родителем элемент <template>
    if (!picture.closest('template')) {
      picture.remove(); // Удаляем элемент picture, если он не внутри <template>
    }
  });
}

// Добавляем debounce для отрисовки раз в DEBOUNCE_DELAY мс
const debouncedRenderView = debounce(renderView, DEBOUNCE_DELAY);

const sortPicture = (array) => {
  let tempArray = JSON.parse(JSON.stringify(array));

  imgForms.addEventListener('click', (evt) => {

    switch (evt.target.id) {
      case randomButton.id:
        checkActive(randomButton);
        tempArray = shuffle(tempArray).slice(0, MAX_PICTURE_RENDERING);
        debouncedRenderView(tempArray);
        tempArray = JSON.parse(JSON.stringify(array));
        break;
      case discussedButton.id:
        checkActive(discussedButton);
        tempArray = tempArray.sort((a, b) => b.comments.length - a.comments.length);
        debouncedRenderView(tempArray);
        tempArray = JSON.parse(JSON.stringify(array));
        break;
      default:
        checkActive(defaultButton);
        debouncedRenderView(array);
        break;
    }
  });
};
imgFilters.classList.remove('img-filters--inactive');

export { sortPicture };
