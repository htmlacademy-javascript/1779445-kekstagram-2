const DESCRIPTIONS = [
  'Lake in forest', 'Road to the beach', 'Food',
  'Mclaren', 'Plane', 'Shouse',
  'Cat', 'Palm trees', 'Sea',
  'Concert', 'Range-rover', 'Audi',
  'Light', 'Juice', 'Girl',
  'Ocean', 'Road', 'Sky',
  'Sofa', 'Plym', 'plymouth',
  'Red fish', 'Origin', 'Relax',
  'Programming',
];

const NAMES = [
  'Ivan', 'Oleg', 'Igor',
  'Masha', 'Sasha', 'Pasha',
  'Roma', 'Sergey', 'Olga',
  'Irina', 'Misha', 'Polina',
  'Evgenyi', 'Ekaterina', 'Milana',
  'Adelina', 'Yra', 'Vasya', 'Sofa',
  'Svetlana', 'Tatyana', 'Veronika',
  'Valerya', 'Varvara', 'Vlad',
];

const COMMENTS = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MIN_VALUE = 1;
const MAX_VALUE = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS_VALUE = 30;
const MAX_VALUE_AVATAR = 6;

// Генератор случайных чисел //
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const highest = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (highest - lower + 1) + lower;
  return Math.floor(result);
}

// Генератор случайных неповторяющихся значений //
function createRandomValueAtRange(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if(previousValues.length >= (max - min + 1)){
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Генератор массива комментариев //
function getArrayComments() {

  // Функция для получения случайным образом одного или двух комментариев //
  function getText(){
    const value2 = createRandomValueAtRange(MIN_VALUE, COMMENTS.length - 1);
    return Math.random() < 0.5 === false ? COMMENTS[value2()] : `${COMMENTS[value2()]} ${COMMENTS[value2()]}`;
  }

  const getRandomCommentsId = createRandomValueAtRange(MIN_VALUE, MAX_COMMENTS_VALUE);

  // Создаем экземпляр комментария в качестве объекта //
  const commentObject = () => ({
    id: getRandomCommentsId(),
    avatar: `img/avatar-${getRandomInteger(MIN_VALUE, MAX_VALUE_AVATAR)}.svg.`,
    comment:  getText(),
    name: NAMES[getRandomInteger(MIN_VALUE, MAX_VALUE_AVATAR)],
  });

  return Array.from({length: getRandomInteger(MIN_VALUE, MAX_COMMENTS_VALUE)}, commentObject);
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
  const value = Array.from({length: max}, imageObject);
  return value;
}

createImage(MAX_VALUE);
