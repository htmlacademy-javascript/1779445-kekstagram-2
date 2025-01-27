import { displayModal, onSubmitUserForm } from './form-validation.js';
import { getData } from './api.js';
import { renderPictures } from './rendering-picture.js';
import { renderFullSizePicture } from './render-big-picture.js';
import { sortingPictures } from './sort-picture.js';
import { showFailureAlert } from './utility.js';
import './scale-picture.js';
import './slider-filter-picture.js';

const imgForms = document.querySelector('.img-filters__form');

// Скрываем блок фильтров изначально
imgForms.classList.add('img-filters--inactive');

displayModal();

getData()
  .then((pictureArrayObj) => {
    // Создаем массив промисов для ожидания завершения функций
    const renderPromises = [
      renderFullSizePicture(pictureArrayObj),
      renderPictures(pictureArrayObj)
    ];

    // Ждем завершения всех промисов и возвращаем pictureArrayObj
    return Promise.all(renderPromises).then(() => pictureArrayObj);
  })
  .then((pictureArrayObj) => {
    // Удаляем класс только после завершения всех рендерингов
    imgForms.classList.remove('img-filters--inactive');
    sortingPictures(pictureArrayObj);
  })
  .catch(() => {
    showFailureAlert();
  });

onSubmitUserForm();
