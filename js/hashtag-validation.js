import { PictureConst } from './constant.js';

const { MAX_HASHTAG_SYMBOLS, MAX_HASHTAGS_AMOUNT, MAX_COMMENT_LENGTH } = PictureConst;

// Правила валидации хештегов
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
    check: (inputValue) => inputValue.every((item) => item.length <= MAX_HASHTAG_SYMBOLS),
    error: `Хештег не должен быть длиннее ${MAX_HASHTAG_SYMBOLS} символов`,
  },
  {
    check: (inputValue) => inputValue.every((item) => !item.slice(1).includes('#')),
    error: 'Хэштеги разделяются пробелами',
  },
  {
    check: (inputValue) => inputValue.every((item) => new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_SYMBOLS}}$`, 'i').test(item)),
    error: 'Недопустимые символы, допустимы буквы, цифры и символ \'#\'',
  },
  {
    check: (inputValue) => inputValue.length === new Set(inputValue).size,
    error: 'Хештеги не должны повторяться',
  },
  {
    check: (inputValue) => inputValue.length <= MAX_HASHTAGS_AMOUNT,
    error: `Нельзя указать больше ${MAX_HASHTAGS_AMOUNT} хештегов`,
  },
];

// функция для проверки хештега
const checkHashtagOnValid = (value) => {
  if (!value.trim()) {
    return true; // Пустое значение является допустимым
  }

  const inputValue = value.trim().toLowerCase().split(/\s+/);
  return hashtagRules.every((rules) => rules.check(inputValue));
};

// Функция для получения предупреждения об ошибке в хештеге
const getHashtagError = (value) => {
  const inputValue = value.trim().toLowerCase().split(/\s+/);
  const rule = hashtagRules.find((rules) => !rules.check(inputValue));
  return rule ? rule.error : '';
};

// функция для проверки комментария
const checkCommentOnValid = (value) => value.length <= MAX_COMMENT_LENGTH;

// Функция для получения текста об ошибке в комментарии
const getCommentError = () => `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`;


export const validation = {
  checkHashtagOnValid,
  getHashtagError,
  checkCommentOnValid,
  getCommentError,
};
