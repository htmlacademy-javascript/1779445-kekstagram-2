const Data = {

  // Данные для описания фотографий //
  DESCRIPTIONS: [
    'Lake in forest', 'Road to the beach', 'Food', 'Mclaren', 'Plane', 'Shouse',
    'Cat', 'Palm trees', 'Sea', 'Concert', 'Range-rover', 'Audi',
    'Light', 'Juice', 'Girl', 'Ocean', 'Road', 'Sky',
    'Sofa', 'Plym', 'Plymouth', 'Red fish', 'Origin', 'Relax', 'Programming'
  ],

  // Данные c именем пользователей //
  NAMES: [
    'Ivan', 'Oleg', 'Igor', 'Masha', 'Sasha', 'Pasha',
    'Roma', 'Sergey', 'Olga', 'Irina', 'Misha', 'Polina',
    'Evgenyi', 'Ekaterina', 'Milana', 'Adelina', 'Yra', 'Vasya', 'Sofa',
    'Svetlana', 'Tatyana', 'Veronika', 'Valerya', 'Varvara', 'Vlad'
  ],

  // Данные с текстом комментариев //
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
  MIN_VALUE: 1,
  MAX_VALUE: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MAX_COMMENTS_VALUE: 30,
  MAX_COMMENTS_COUNTS: 2,
  MAX_VALUE_AVATAR: 6
};

export { Data, PICTURE_CONST };
