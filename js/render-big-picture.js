import { isEscapeKey } from './utility.js';
import { PICTURE_CONST } from './constant.js';

const { MAX_COMMENTS_UPLOADED } = PICTURE_CONST;

const pictures = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const ulList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.body;

let currentCommentIndex = 0; // Индекс текущего комментария
let currentComments = []; // Массив для хранения комментариев текущего изображения

// Создание комментариев к изображению
const createcomment = () => {
  // Добавляем комментарии по 5 штук
  const nextComments = currentComments.slice(currentCommentIndex, currentCommentIndex + MAX_COMMENTS_UPLOADED);

  nextComments.forEach(({ avatar, name, message }) => {
    const liElement = document.createElement('li');
    liElement.classList.add('social__comment');
    liElement.innerHTML =
      `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>`;

    ulList.appendChild(liElement);
  });

  currentCommentIndex += nextComments.length; // Увеличиваем индекс на количество загруженных комментариев
  commentsLoader.classList.toggle('hidden', currentCommentIndex >= currentComments.length); // скрываем кнопку загрузки, если показаны все комментарии
  document.querySelector('.social__comment-shown-count').textContent = Math.min(currentCommentIndex, currentComments.length); // Обновляем счетчик показанных комментариев
};

// Функция для отрисовки большого изображения
const renderBigPicture = (pictureArrayObj) => {

  // Открытие полноразмерного изображения
  const openPhoto = ({ url, likes, comments, description }) => {
    body.classList.add('modal-open');
    bigPictureOverlay.classList.remove('hidden');

    document.querySelector('.big-picture__img img').src = url;
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    // Сбрасываем индекс и массив комментариев
    currentCommentIndex = 0;
    currentComments = comments;
    ulList.innerHTML = ''; // Очищаем предыдущие комментарии
    createcomment(); // Загружаем первые комментарии
    document.addEventListener('keydown', onDocumentKeydown);
  };

  // Закрытие полноразмерного изображения
  const closePhoto = () => {
    bigPictureOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    // Удаляем обработчики событий при закрытии
    commentsLoader.removeEventListener('click', createcomment);
    document.removeEventListener('keydown', onDocumentKeydown);
    cancelButton.removeEventListener('click', closePhoto);
  };

  function onDocumentKeydown(evt) { // Используем Function Declaration для хостинга
    if (isEscapeKey(evt)) {
      closePhoto();
    }
  }

  pictures.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const selectedPicture = pictureArrayObj.find((item) => item.id === Number(evt.target.dataset.id));
      openPhoto(selectedPicture);
    }
    commentsLoader.addEventListener('click', () => createcomment());
    cancelButton.addEventListener('click', () => closePhoto());
  });
};

export { renderBigPicture };
