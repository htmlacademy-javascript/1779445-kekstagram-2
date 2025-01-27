const PictureConst = {

  MAX_COMMENTS_UPLOADED: 5, // Максимальное количество комментариев, которые возможно загрузить
  MAX_COMMENT_LENGTH: 140, // Максимальная длина комментария

  MAX_HASHTAG_SYMBOLS: 20, // Максимальное количество символов в хештеге, включая символ '#'
  MAX_HASHTAGS_AMOUNT: 5, // Максимальное количество хештегов

  MAX_VALUE_SCALE: 100, // Максимальное значение для масштабирования изображения
  MIN_VALUE_SCALE: 25, // Минимальное значение для масштабирования изображения
  STEP_VALUE_SCALE: 25, // Шаг для изменения масштаба изображения
  MIN_SIZE_SCALE: 1,

  MIN_SLIDER_VALUE: 0, // Минимальное значение слайдера
  MAX_SLIDER_VALUE: 1, // Максимальное значение слайдера
  STEP_SLIDER_VALUE: 0.1, // Шаг слайдера

  SCALE_FACTOR: 100, // Коэффициент для преобразования значения newValue в масштаб (от 0 до 1) для метода scale()
  ALERT_SHOW_TIME: 5000, // Время показа ошибки

  DEBOUNCE_DELAY: 500, // Время задержки дебаунса в мс
  MAX_PICTURE_RENDERING: 10, // Максимальное колличество изображения для рендера случайных изображений

};

// Разрешенные типы файлов
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Настройки Эффектов для фильтров
const effects = {

  original: {
    filter: null,
    effectsSlider: null,
  },

  chrome: {
    filter: 'grayscale',
    effectsSlider: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    }
  },

  sepia: {
    filter: 'sepia',
    effectsSlider: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    }
  },

  marvin: {
    filter: 'invert',
    effectsSlider: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    }
  },

  phobos: {
    filter: 'blur',
    effectsSlider: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    }
  },

  heat: {
    filter: 'brightness',
    effectsSlider: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    }
  }

};

export { PictureConst, effects, FILE_TYPES };
