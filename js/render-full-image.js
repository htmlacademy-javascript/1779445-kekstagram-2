import {isEnterKey} from './util.js';

const pictures = document.querySelector('.pictures');
const bigPictureOverlay = document.querySelector('.big-picture');
const closeButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const comments = document.querySelector('.social__comment-count');
const likes = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if(isEnterKey(evt)){
    bigPictureOverlay.classList.add('hidden');
  }
};

const openPhoto = () => {
  body.classList.add('modal-open');
  comments.classList.add('hidden');
  likes.classList.add('hidden');
  bigPictureOverlay.classList.remove('hidden');
};

const closePhoto = () => {
  bigPictureOverlay.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

pictures.addEventListener('click', () => {
  openPhoto();
});

closeButton.addEventListener('click', () => {
  closePhoto();
});


export {openPhoto, closePhoto};
