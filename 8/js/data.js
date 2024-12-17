import {getRandomInteger, createRandomValueAtRange} from './util.js';
import {DESCRIPTIONS, NAMES, COMMENTS} from './const.js';
import {MIN_VALUE, MAX_VALUE, MIN_LIKES, MAX_LIKES, MAX_COMMENTS_VALUE, MAX_VALUE_AVATAR} from './const.js';
// Генератор массива комментариев //
function getArrayComments() {
  const getRandomCommentsId = createRandomValueAtRange(MIN_VALUE, MAX_COMMENTS_VALUE);

  // Создаем экземпляр комментария в качестве объекта //
  const commentObject = () => ({
    id: getRandomCommentsId(),
    avatar: `img/avatar-${getRandomInteger(MIN_VALUE, MAX_VALUE_AVATAR)}.svg.`,
    message:  Array.from({length: getRandomInteger(MIN_VALUE, 2)}, () => COMMENTS[createRandomValueAtRange(0, COMMENTS.length - 1)()]).join(' '),
    name: NAMES[getRandomInteger(MIN_VALUE, NAMES.length)],
  });

  return Array.from({length: getRandomInteger(0, MAX_COMMENTS_VALUE)}, commentObject);
}

//Функция для генерации изображений //
function createImage(max) {
  const getRandomImageId = createRandomValueAtRange(MIN_VALUE, MAX_VALUE);
  const getRandomImageUrl = createRandomValueAtRange(MIN_VALUE, MAX_VALUE);

  const imageObject = () => ({
    id: getRandomImageId(),
    url: `photos/${getRandomImageUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(MIN_VALUE, NAMES.length - 1)],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: getArrayComments(),
  });

  return Array.from({length: max}, imageObject);
}

export {createImage};
