import { isEnterKey } from './utility.js';

const pictures = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const body = document.body;

// Функция для отрисовки большого изображения //
export const renderBigPicture = (pictureList) => {

  // Создание комментариев к изображению //
  const createcomment = (picture) => {
    const ulList = document.querySelector('.social__comments');
    ulList.innerHTML = '';

    picture.comments.forEach(({ avatar, name, message }) => {
      const liElement = document.createElement('li');
      liElement.classList.add('social__comment');

      liElement.innerHTML =
      `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>`;

      ulList.appendChild(liElement);
    });
  };

  // Открытие полноразмерного изображения //
  const openPhoto = ({ url, likes, comments, description }) => {
    body.classList.add('modal-open');
    bigPictureOverlay.classList.remove('hidden');

    document.querySelector('.big-picture__img img').src = url;
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-shown-count').textContent = comments.length;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    createcomment({ url, likes, comments, description });
  };

  const closePhoto = () => {
    bigPictureOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  const onDocumentKeydown = (evt) => {
    if(isEnterKey(evt)){
      closePhoto();
    }
  };

  pictures.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('picture__img')){
      openPhoto(pictureList.filter((item) => item.id === Number(evt.target.dataset.id))[0]);
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', () => closePhoto());

};
