import { PICTURE_CONST } from './constant.js';
import { createImage } from './data.js';
import { renderBigPicture} from './render-big-picture.js';

const pictureListElement = document.querySelector('.pictures');
const picturesElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureArrayObj = createImage(PICTURE_CONST.MAX_VALUE);
const pictureFragment = document.createDocumentFragment();

// Отрисовываем большую картинку //
const renderingPicture = () => {
  pictureArrayObj .forEach(({ url, description, id, likes, comments }) => {
    const photosElement = picturesElementTemplate.cloneNode(true);
    const imgElement = photosElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.alt = description;
    imgElement.dataset.id = id;

    photosElement.querySelector('.picture__likes').textContent = likes;
    photosElement.querySelector('.picture__comments').textContent = comments.length;

    pictureListElement.appendChild(photosElement);
  });

  pictureListElement.appendChild(pictureFragment);
};

renderBigPicture(pictureArrayObj);

export { renderingPicture };

