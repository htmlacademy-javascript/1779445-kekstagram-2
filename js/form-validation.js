import { isEscapeKey } from './utility.js';
import { validation } from './hashtag-validation.js';
import { resetSlider } from './slider-picture.js';
import { resetScale } from './scale-picture.js';

const { hashtagsValidation, getHashTagsError, commentsValidation, getCommentsError } = validation;

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const pictureUploadInput = document.querySelector('.img-upload__input');
const pictureOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentsArea = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const successAlert = document.querySelector('#success').content.querySelector('.success');

let isErrorAlertOpen = false; // Переменная для отслеживания состояния окна ошибки

// показываем сообщение если успешно отправили форму
const showSuccsessAlert = () => {

  const successElement = successAlert.cloneNode(true);
  body.appendChild(successElement);
  const successButton = document.querySelector('.success__button');
  const successInner = document.querySelector('.success__inner');
  const closeSuccessAlert = () => {
    document.removeEventListener('keydown', onDocumentKeydownAlert);
    document.removeEventListener('click', onClickOutside);
    successButton.removeEventListener('click', closeSuccessAlert);
    successElement.remove();
  };

  function onDocumentKeydownAlert(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessAlert();
    }
  }

  function onClickOutside(evt) {
    if(!successInner.contains(evt.target) && evt.target !== successButton) {
      evt.preventDefault();
      closeSuccessAlert();
    }
  }

  successButton.addEventListener('click', closeSuccessAlert);
  document.addEventListener('keydown', onDocumentKeydownAlert);
  document.addEventListener('click', onClickOutside);
};

// блок с ошибками при отправке
const errorAlert = document.querySelector('#error').content.querySelector('.error');

const showFailureAlert = () => {
  isErrorAlertOpen = true;
  const errorElement = errorAlert.cloneNode(true);
  body.appendChild(errorElement);
  const errorButton = document.querySelector('.error__button');
  const errorInner = document.querySelector('.error__inner');
  const closeErrorAlert = () => {
    document.removeEventListener('keydown', onDocumentKeydownAlert);
    document.removeEventListener('click', onClickOutside);
    errorButton .removeEventListener('click', closeErrorAlert);
    errorElement.remove();
  };

  function onDocumentKeydownAlert(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      isErrorAlertOpen = false;
      closeErrorAlert();
    }
  }

  function onClickOutside(evt) {
    if(!errorInner.contains(evt.target) && evt.target !== errorButton) {
      evt.preventDefault();
      closeErrorAlert();
    }
  }

  errorButton .addEventListener('click', closeErrorAlert);
  document.addEventListener('keydown', onDocumentKeydownAlert);
  document.addEventListener('click', onClickOutside);
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
  if(isEscapeKey(evt) && isErrorAlertOpen === false) {
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  blockSubmitButton();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    fetch (
      'https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if(response.ok){

          showSuccsessAlert();
          closePhotoEditor();
        }else {
          showFailureAlert();
        }
      })
      .catch(() => {
        showFailureAlert();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }else {
    // Если форма не валидна, разблокируем кнопку и показываем сообщение об ошибках
    unblockSubmitButton();
  }
});

// Добавление валидаторов для полей ввода
pristine.addValidator(hashtagsInput, hashtagsValidation, getHashTagsError);
pristine.addValidator(commentsArea, commentsValidation, getCommentsError);

