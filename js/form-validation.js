import { isEscapeKey } from './utility.js';
import { validation } from './hashtag-validation.js';
import { resetSlider } from './slider-filter-picture.js';
import { resetScale } from './scale-picture.js';
import { sendData } from './api.js';
import { FILE_TYPES } from './constant.js';

const { checkHashtagOnValid, getHashtagError, checkCommentOnValid, getCommentError } = validation;

const uploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const cancelButton = document.querySelector('.img-upload__cancel');
const preview = document.querySelector('.img-upload__preview img');
const loadFile = document.querySelector('.img-upload__start input[type=file]');
const hashtagsInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const successAlert = document.querySelector('#success').content.querySelector('.success');
const failureAlert = document.querySelector('#error').content.querySelector('.error');
const effectsPreview = document.querySelectorAll('.effects__preview');

const body = document.querySelector('body');

let isFailureAlertOpen = false; // Переменная для отслеживания сообщения об ошибке

// Функция для отображения модального окна загрузки изображения
export const displayModal = () => {

  let isMatches;
  // Проверяем тип файла, выбранного пользователем
  loadFile.addEventListener('change', () => {

    const file = loadFile.files[0];
    const fileName = file.name.toLowerCase();

    isMatches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (isMatches) {
      preview.src = URL.createObjectURL(file);
    }
  });

  // Добавляем обработчик на открытие файла
  pictureUploadInput.addEventListener('change', () => {
    if (isMatches) {
      uploadOverlay.classList.remove('hidden');
      body.classList.add('modal-open');
      cancelButton.addEventListener('click', closePhotoEditor);
      document.addEventListener('keydown', onDocumentKeydown);

      // Устанавливаем фоновое изображение для эффектов
      effectsPreview.forEach((element) => {
        element.style.backgroundImage = `url(${preview.src})`;
      });
    }
  });
};

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
    if (alertElement === evt.target) {
      evt.preventDefault();
      closeAlert();
    }
  }

  alertElement.querySelector('.success__button, .error__button').addEventListener('click', closeAlert);
  document.addEventListener('keydown', onDocumentKeydownAlert);
  document.addEventListener('click', onClickOutside);
};

const showSuccessAlert = () => showAlert(successAlert);

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
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closePhotoEditor);
  uploadForm.reset();
  pristine.reset();
  resetSlider();
  resetScale();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFailureAlertOpen) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

// Предотвращение закрытия редактора при фокусе на полях ввода
[hashtagsInput, textDescription].forEach((activeInput) => {
  activeInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
});

// Функция изменения текста кнопки, при отправке данных
const toggleSubmitButton = (isBlocked) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? 'Опубликовываю...' : 'Опубликовать';
};

// Функция-обработчик для отправки данных с формы
const onSubmitUserForm = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleSubmitButton(true);
    if (pristine.validate()) {
      sendData(new FormData(evt.target))
        .then(() => {
          closePhotoEditor();
          toggleSubmitButton(false);
          showSuccessAlert();
        })
        .catch(() => {
          showFailureAlert();
          toggleSubmitButton(false);
        });
    } else {
      toggleSubmitButton(false); // Если форма не валидна, разблокируем кнопку
    }
  });
};

// Добавление валидаторов для полей ввода
pristine.addValidator(hashtagsInput, checkHashtagOnValid, getHashtagError);
pristine.addValidator(textDescription, checkCommentOnValid, getCommentError);

export { onSubmitUserForm };

