import {getRandomInteger, createRandomValueAtRange} from './util.js';
import {DESCRIPTIONS, NAMES, COMMENTS} from './const.js';
import {PhotosConst} from './const.js';
// Генератор массива комментариев //
function getArrayComments() {
  const getRandomCommentsId = createRandomValueAtRange(PhotosConst.MIN_VALUE, PhotosConst.MAX_COMMENTS_VALUE);

  // Создаем экземпляр комментария в качестве объекта //
  const commentObject = () => ({
    id: getRandomCommentsId(),
    avatar: `img/avatar-${getRandomInteger(PhotosConst.MIN_VALUE, PhotosConst.MAX_VALUE_AVATAR)}.svg.`,
    message:  Array.from({length: getRandomInteger(PhotosConst.MIN_VALUE, 2)}, () => COMMENTS[createRandomValueAtRange(0, COMMENTS.length - 1)()]).join(' '),
    name: NAMES[getRandomInteger(PhotosConst.MIN_VALUE, NAMES.length)],
  });

  return Array.from({length: getRandomInteger(0, PhotosConst.MAX_COMMENTS_VALUE)}, commentObject);
}

//Функция для генерации изображений //
function createImage(max) {
  const getRandomImageId = createRandomValueAtRange(PhotosConst.MIN_VALUE, PhotosConst.MAX_VALUE);
  const getRandomImageUrl = createRandomValueAtRange(PhotosConst.MIN_VALUE, PhotosConst.MAX_VALUE);

  const imageObject = () => ({
    id: getRandomImageId(),
    url: `photos/${getRandomImageUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(PhotosConst.MIN_VALUE, NAMES.length - 1)],
    likes: getRandomInteger(PhotosConst.MIN_LIKES, PhotosConst.MAX_LIKES),
    comments: getArrayComments(),
  });

  return Array.from({length: max}, imageObject);
}

export {createImage};

