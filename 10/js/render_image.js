import {createImage} from './data.js';
import {PhotosConst} from './const.js';

const photosListElement = document.querySelector('.pictures');
const photosElementTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosObj = createImage(PhotosConst.MAX_VALUE);
const photosListFragment = document.createDocumentFragment();


photosObj.forEach((photosObjs) => {
  const photosElement = photosElementTemplate.cloneNode(true);
  photosElement.querySelector('.picture__img').src = photosObjs.url;
  photosElement.querySelector('.picture__img').alt = photosObjs.description;
  photosElement.querySelector('.picture__likes').textContent = photosObjs.likes;
  photosElement.querySelector('.picture__comments').textContent = photosObjs.comments.length;
  photosListFragment.appendChild(photosElement);
});

const renderingPhotos = () => photosListElement.appendChild(photosListFragment);

export {renderingPhotos};

