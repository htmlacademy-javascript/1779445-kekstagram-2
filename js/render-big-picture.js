import { isEscapeKey } from './utility.js';
import { PictureConst } from './constant.js';

const { MAX_COMMENTS_UPLOADED } = PictureConst;

const picturesContainer = document.querySelector('.pictures');
const FullSizePictureOverlay = document.querySelector('.big-picture');
const cancelButtonOverlay = FullSizePictureOverlay.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');
const body = document.body;

let currentCommentIndex = 0; // Индекс текущего комментария
let currentComments = []; // Массив для хранения комментариев текущего изображения

// Создание комментариев к изображению //
const loadComments = () => {
  // Добавляем комментарии по 5 штук
  const nextComments = currentComments.slice(currentCommentIndex, currentCommentIndex + MAX_COMMENTS_UPLOADED);

  nextComments.forEach(({ avatar, name, message }) => {
    const liElement = document.createElement('li');
    liElement.classList.add('social__comment');

    liElement.innerHTML =
    `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>`;

    commentsList.appendChild(liElement);
  });

  currentCommentIndex += MAX_COMMENTS_UPLOADED;

  // Проверяем, нужно ли скрыть кнопку загрузки комментариев
  commentsLoader.classList.toggle('hidden', currentCommentIndex >= currentComments.length);
  // Обновляем счетчик показанных комментариев
  document.querySelector('.social__comment-shown-count').textContent = Math.min(currentCommentIndex, currentComments.length);
};

// Функция для отрисовки большого изображения //
const renderFullSizePicture = (pictureList) => {

  // Открытие полноразмерного изображения //
  const openPicture = ({ url, likes, comments, description }) => {
    body.classList.add('modal-open');
    FullSizePictureOverlay.classList.remove('hidden');

    document.querySelector('.big-picture__img img').src = url;
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    currentCommentIndex = 0;
    currentComments = comments;
    commentsList.innerHTML = '';
    loadComments();
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const closePicture = () => {
    FullSizePictureOverlay.classList.add('hidden');
    body.classList.remove('modal-open');

    // Удаляем обработчики событий при закрытии
    commentsLoader.removeEventListener('click', loadComments);
    document.removeEventListener('keydown', onDocumentKeydown);
    cancelButtonOverlay.removeEventListener('click', closePicture);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      closePicture();
    }
  }

  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const selectedPicture = pictureList.find((item) => item.id === Number(evt.target.dataset.id));
      openPicture(selectedPicture);
    }
  });

  cancelButtonOverlay.addEventListener('click', () => closePicture());
  commentsLoader.addEventListener('click', () => loadComments());
};

export { renderFullSizePicture };
