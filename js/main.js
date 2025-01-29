import { onModalShow, onUserFormSubmit } from './form-validation.js';
import { getData } from './api.js';
import { renderPictures } from './rendering-picture.js';
import { renderFullSizePicture } from './render-big-picture.js';
import { getSortedPictures } from './sort-picture.js';
import { showFailureAlert } from './utility.js';
import './scale-picture.js';
import './slider-filter-picture.js';

const imgForms = document.querySelector('.img-filters__form');

// Скрываем блок фильтров изначально
imgForms.classList.add('img-filters--inactive');

onModalShow();

getData()
  .then((pictureArrayObjects) => {
    // Создаем массив промисов для ожидания завершения функций
    const renderPromises = [
      renderFullSizePicture(pictureArrayObjects),
      renderPictures(pictureArrayObjects)
    ];

    // Ждем завершения всех промисов и возвращаем pictureArrayObj
    return Promise.all(renderPromises).then(() => pictureArrayObjects);
  })
  .then((pictureArrayObjects) => {
    // Удаляем класс только после завершения всех рендерингов
    imgForms.classList.remove('img-filters--inactive');
    getSortedPictures(pictureArrayObjects);
  })
  .catch(() => {
    showFailureAlert();
  });

// Отправляем форму с изображением и настройками
onUserFormSubmit();
