const PICTURE_CONST = {

  MAX_COMMENTS_UPLOADED: 5, // Максимальное количество комментариев, которые возможнго загрузить
  MAX_COMMENTS_LENGTH: 140, // Максимальная длинна комментария

  MAX_HASHTAG_SYMBOLS: 20, // Максимальное количество символов в хештеге, включая символ '#'
  MAX_HASHTAG_AMOUNT: 5, // Максимальное количество хештегов

  MAX_VALUE_SCALE: 100, // Максимальное значение для масштабирования изображения
  MIN_VALUE_SCALE: 25, // Минимальное значение для масштабирования изображения
  STEP_VALUE_SCALE: 25, // Шаг для изменения масштаба изображения

};

const EFFECTS = {

  origignal: {
    filter: null,
    effectsSlider: null,
  },

  chrome: {
    filter: 'grayscale',
    effectsSlider: {
      range: { min: 0, max: 1},
      start: 1,
      step: 0.1,
    }
  },

  sepia: {
    filter: 'sepia',
    effectsSlider: {
      range: { min: 0, max: 1},
      start: 1,
      step: 0.1,
    }
  },

  marvin: {
    filter: 'invert',
    effectsSlider: {
      range: { min: 0, max: 100},
      start: 100,
      step: 1,
    }
  },

  phobos: {
    filter: 'blur',
    effectsSlider: {
      range: { min: 0, max: 3},
      start: 3,
      step: 0.1,
    }
  },

  heat: {
    filter: 'brightness',
    effectsSlider: {
      range: { min: 1, max: 3},
      start: 3,
      step: 0.1,
    }
  }

};

export { PICTURE_CONST, EFFECTS };
