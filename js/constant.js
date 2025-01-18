const DATA = {

  // Данные для описания фотографий
  DESCRIPTIONS: [
    'Lake in forest', 'Road to the beach', 'Food', 'Mclaren', 'Plane', 'Shouse',
    'Cat', 'Palm trees', 'Sea', 'Concert', 'Range-rover', 'Audi',
    'Light', 'Juice', 'Girl', 'Ocean', 'Road', 'Sky',
    'Sofa', 'Plym', 'Plymouth', 'Red fish', 'Origin', 'Relax', 'Programming'
  ],

  // Данные c именем пользователей
  NAMES: [
    'Ivan', 'Oleg', 'Igor', 'Masha', 'Sasha', 'Pasha',
    'Roma', 'Sergey', 'Olga', 'Irina', 'Misha', 'Polina',
    'Evgenyi', 'Ekaterina', 'Milana', 'Adelina', 'Yra', 'Vasya', 'Sofa',
    'Svetlana', 'Tatyana', 'Veronika', 'Valerya', 'Varvara', 'Vlad'
  ],

  // Данные с текстом комментариев
  COMMENTS: [
    'Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!'
  ],

};

const PICTURE_CONST = {

  MIN_VALUE: 1, // Минимальное значение для генерации
  MAX_VALUE: 25, // МАксимальное значение для генерации

  MIN_LIKES_AMOUNT: 15, // Минимальное количество лайков
  MAX_LIKES_AMOUNT: 200, // Максимальное количество лайков

  MAX_COMMENTS_AMOUNT: 30, // Максимальное количество комментариев
  MAX_COMMENTS_SENTENCES: 2, // Максимальное количество предложений в одном комментарие
  MAX_COMMENTS_UPLOADED: 5, // Максимальное количество комментариев, которые возможнго загрузить
  MAX_COMMENTS_LENGTH: 140, // Максимальная длинна комментария

  MAX_AVATAR_AMOUNT: 6, // Максимальное количество аваторов

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

export { DATA, PICTURE_CONST, EFFECTS };
