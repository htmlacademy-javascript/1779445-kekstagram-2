import { isEscapeKey } from './utility.js';
import { validation } from './hashtag-validation.js';
import { resetForm } from './slider-picture.js';
import { resetScale } from './scale-picture.js';

const { hashtagsValidation, getHashTagsError, commentsValidation, getCommentsError } = validation;

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentsArea = document.querySelector('.text__description');

// Инициализация библиотеки Pristine для валидации формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

function closePhotoEditor() {
  pictureOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePhotoEditor);
  uploadForm.reset();
  pristine.reset();
  resetForm();
  resetScale();
}

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

// Добавление обработчика, который отменяет нажатие esc при фокусе полей
[hashtagsInput, commentsArea].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)){
      evt.stopPropagation();
    }
  });
});

pictureUploadInput.addEventListener('change', () => {
  pictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closePhotoEditor);
  document.addEventListener('keydown', onDocumentKeydown);
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});

// Добавление валидаторов для полей ввода
pristine.addValidator(hashtagsInput, hashtagsValidation, getHashTagsError);
pristine.addValidator(commentsArea, commentsValidation, getCommentsError);
