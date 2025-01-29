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
const renderAfterSorting = (pictureArrayObjects) => {
  clearPictureList();
  renderPictures(pictureArrayObjects);
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
const getSortedPictures = (pictureArrayObjects) => {
  let temporaryArrays = [...pictureArrayObjects]; // Создаем поверхностную копию массива

  const onSortedClick = (sortFunction) => {
    temporaryArrays = sortFunction ? sortFunction([...pictureArrayObjects]) : [...pictureArrayObjects]; // Используем переданную функцию сортировки
    debouncedRenderView(temporaryArrays);
  };

  imgFormFilters.addEventListener('click', (evt) => {
    switch (evt.target.id) {
      case randomButtonFilters.id:
        getActiveButton(randomButtonFilters);
        onSortedClick(() => getShuffleArray(temporaryArrays).slice(0, MAX_PICTURE_RENDERING));
        break;

      case discussedButtonFilters.id:
        getActiveButton(discussedButtonFilters);
        onSortedClick((arrays) => arrays.sort((a, b) => b.comments.length - a.comments.length));
        break;

      default:
        getActiveButton(defaultButtonFilters);
        onSortedClick();
        break;
    }
  });
};


imgFilters.classList.remove('img-filters--inactive');

export { getSortedPictures };
