import { PICTURE_CONST } from './constant.js';

const { MAX_SYMBOLS ,MAX_HASHTAG, MAX_COMMENTS_LENGTH } = PICTURE_CONST;

// Правила валидации хештегов //
const hashtagRules = [
  {
    check: (inputValue) => inputValue.every((item) => item.startsWith('#')),
    error: 'Хештег должен начинаться с символа \'#\'',
  },
  {
    check: (inputValue) => inputValue.every((item) => item !== '#'),
    error: 'Хештег не должен состоять только из символа \'#\'',
  },
  {
    check: (inputValue) => inputValue.every((item) => item.length <= MAX_SYMBOLS),
    error: 'Хештег не должен быть длиннее 20 символов',
  },
  {
    check: (inputValue) => inputValue.every((item) => !item.slice(1).includes('#')),
    error: 'Хэштеги разделяются пробелами',
  },
  {
    check: (inputValue) => inputValue.every((item) => /^#[a-zа-яё0-9]{0,19}$/i.test(item)),
    error: 'Недопустимые символы, допустимы буквы, цифры и символ \'#\'',
  },
  {
    check: (inputValue) => inputValue.length === new Set(inputValue).size,
    error: 'Хештеги не должны повторяться',
  },
  {
    check: (inputValue) => inputValue.length <= MAX_HASHTAG,
    error: `Нельзя указать больше ${ MAX_HASHTAG } хештегов`,
  },

];

// функция для проверки хештега //
const hashtagsValidation = (value) => {
  if(!value.trim()) {
    return true; // Пустое значение является допустимым //
  }

  const inputValue = value.trim().toLowerCase().split(/\s+/);
  return hashtagRules.every((rule) => rule.check(inputValue));
};

// Функция для получения предупреждения об ошибке в хештеге //
const getHashTagsError = (value) => {
  const inputValue = value.trim().toLowerCase().split(/\s+/);
  const rule = hashtagRules.find((rules) => !rules.check(inputValue));
  return rule ? rule.error : '';
};

// функция для проверки комментария //
const commentsValidation = (value) => value.length <= MAX_COMMENTS_LENGTH;

// Функция для получения текста об ошибке в комментарии//
const getCommentsError = () => `Длина комментария не может составлять больше ${ MAX_COMMENTS_LENGTH } символов`;

export const validation = {
  hashtagsValidation,
  getHashTagsError,
  commentsValidation,
  getCommentsError,
};
