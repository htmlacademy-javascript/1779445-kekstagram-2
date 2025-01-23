import { isEscapeKey } from './utility.js';
import { validation } from './hashtag-validation.js';
import { resetSlider } from './slider-picture.js';
import { resetScale } from './scale-picture.js';
import { sendData } from './api.js';

const { hashtagsValidation, getHashTagsError, commentsValidation, getCommentsError } = validation;

const uploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureOverlay = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentsArea = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');
const successAlert = document.querySelector('#success').content.querySelector('.success');
const failureAlert = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

let isFailureAlertOpen = false; // Переменная для отслеживания состояния окна ошибки

// Функция для отображения алертов (успеха или ошибки)
const showAlert = (alertType) => {
  const alertElement = alertType.cloneNode(true);
  body.appendChild(alertElement);

  const closeAlert = () => {
    document.removeEventListener('keydown', onDocumentKeydownAlert);
    document.removeEventListener('click', onClickOutside);
    alertElement.remove();
    if (alertType === failureAlert) {
      isFailureAlertOpen = false; // Сброс состояния ошибки
    }
  };

  function onDocumentKeydownAlert(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
    }
  }

  function onClickOutside(evt) {
    if (alertElement.contains(evt.target)) {
      evt.preventDefault();
      closeAlert();
    }
  }

  alertElement.querySelector('.success__button, .error__button').addEventListener('click', closeAlert);
  document.addEventListener('keydown', onDocumentKeydownAlert);
  document.addEventListener('click', onClickOutside);
};

const showSuccsessAlert = () => showAlert(successAlert);

const showFailureAlert = () => {
  isFailureAlertOpen = true;
  showAlert(failureAlert);
};

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
  resetSlider();
  resetScale();
}

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt) && isFailureAlertOpen === false) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

// Предотвращение закрытия редактора при фокусе на полях ввода
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

const toggleSumbitButton = (isblocked) => {
  submitButton.disabled = isblocked;
  submitButton.textContent = isblocked ? 'Опубликовываю...' : 'Опубликовать' ;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleSumbitButton(true);

    if (pristine.validate()) {
      sendData(new FormData(evt.target))
        .then(() => {
          closePhotoEditor();
          showSuccsessAlert();
        })
        .catch(showFailureAlert)
        .finally(toggleSumbitButton(false));
    }else {
      toggleSumbitButton(false); // Если форма не валидна, разблокируем кнопку
    }
  });
};

// Добавление валидаторов для полей ввода
pristine.addValidator(hashtagsInput, hashtagsValidation, getHashTagsError);
pristine.addValidator(commentsArea, commentsValidation, getCommentsError);

export { setUserFormSubmit };
