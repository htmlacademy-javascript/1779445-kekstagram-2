import { isEnterKey } from './utility.js';
import { PICTURE_CONST } from './constant.js';

const pictures = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const ulList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.body;

let currentCommentIndex = 0; // Индекс текущего комментария
let currentComments = []; // Массив для хранения комментариев текущего изображения

// Функция для отрисовки большого изображения //
export const renderBigPicture = (pictureList) => {

  // Создание комментариев к изображению //
  const createcomment = () => {
    // Добавляем комментарии по 5 штук
    const nextComments = currentComments.slice(currentCommentIndex, currentCommentIndex + PICTURE_CONST.MAX_LOAD_VALUE);

    nextComments.forEach((comment) => {
      const liElement = document.createElement('li');
      liElement.classList.add('social__comment');

      liElement.innerHTML =
      `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>`;

      ulList.appendChild(liElement);
    });

    currentCommentIndex += 5;

    // Проверяем, нужно ли скрыть кнопку загрузки комментариев
    if (currentCommentIndex >= currentComments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    // Обновляем счетчик показанных комментариев
    document.querySelector('.social__comment-shown-count').textContent = Math.min(currentCommentIndex, currentComments.length);
  };

  // Открытие полноразмерного изображения //
  const openPhoto = ({ url, likes, comments, description }) => {
    body.classList.add('modal-open');
    bigPictureOverlay.classList.remove('hidden');

    document.querySelector('.big-picture__img img').src = url;
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    // Сбрасываем индекс комментариев
    currentCommentIndex = 0;
    currentComments = comments; // Обновляем текущие комментарии
    ulList.innerHTML = ''; // Очищаем предыдущие комментарии
    createcomment(); // Загружаем первые 5 комментариев
  };

  const closePhoto = () => {
    bigPictureOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  const onDocumentKeydown = (evt) => {
    if (isEnterKey(evt)) {
      closePhoto();
    }
  };

  pictures.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const selectedPicture = pictureList.find((item) => item.id === Number(evt.target.dataset.id));
      openPhoto(selectedPicture);
    }
  });

  commentsLoader.addEventListener('click', () => {
    createcomment();
  });

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', () => closePhoto());
};
