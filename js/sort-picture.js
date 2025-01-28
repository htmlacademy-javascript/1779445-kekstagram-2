import { getShuffleArray, getDebounce} from './utility.js';
import { renderPictures } from './rendering-picture.js';
import { PictureConst } from './constant.js';

const { DEBOUNCE_DELAY, MAX_PICTURE_RENDERING } = PictureConst;

const imgFilters = document.querySelector('.img-filters');
const imgFormFilters = imgFilters.querySelector('.img-filters__form');
const defaultButtonFilters = imgFilters.querySelector('#filter-default');
const randomButtonFilters = imgFilters.querySelector('#filter-random');
const discussedButtonFilters = imgFilters.querySelector('#filter-discussed');

// Функция для изменения визуального отображения активного элемента
const getActiveButton = (cb) => {
  const activeButton = imgFilters.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  cb.classList.add('img-filters__button--active');
};

// Функция для отрисовки изображений
const renderAfterSorting = (array) => {
  clearPictureList();
  renderPictures(array);
};

// Функция для очистки списка изображений
function clearPictureList () {
  const picturesArray = document.querySelectorAll('.picture');
  picturesArray.forEach((picture) => {
    // Проверяем, не является ли родителем элемент <template>
    if (!picture.closest('template')) {
      picture.remove(); // Удаляем элемент picture, если он не внутри <template>
    }
  });
}

// Добавляем debounce
const debouncedRenderView = getDebounce(renderAfterSorting, DEBOUNCE_DELAY);

// Функция для сортировки изображений
const sortingPictures = (array) => {
  let tempArray = [...array]; // Создаем поверхностную копию массива

  const onSorting = (sortFunction) => {
    tempArray = sortFunction ? sortFunction([...array]) : [...array]; // Используем переданную функцию сортировки
    debouncedRenderView(tempArray);
  };

  imgFormFilters.addEventListener('click', (evt) => {
    switch (evt.target.id) {
      case randomButtonFilters.id:
        getActiveButton(randomButtonFilters);
        onSorting(() => getShuffleArray(tempArray).slice(0, MAX_PICTURE_RENDERING));
        break;

      case discussedButtonFilters.id:
        getActiveButton(discussedButtonFilters);
        onSorting((arr) => arr.sort((a, b) => b.comments.length - a.comments.length));
        break;

      default:
        getActiveButton(defaultButtonFilters);
        onSorting();
        break;
    }
  });
};


imgFilters.classList.remove('img-filters--inactive');

export { sortingPictures };
