import {renderingPictures} from './rendering-picture.js';
import {renderBigPicture} from './render-big-picture.js';

const body = document.body;
const picturesElementTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const ALERT_SHOW_TIME = 5000;

const showAlert = () => {
  const photosElement = picturesElementTemplate.cloneNode(true);
  body.appendChild(photosElement);

  setTimeout(() => {
    photosElement.remove();
  }, ALERT_SHOW_TIME);
};

const fetchPicture = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        showAlert();
      }
      return response.json();
    })
    .then((pictureArrayObj) => {
      renderingPictures(pictureArrayObj);
      renderBigPicture(pictureArrayObj);
    });
};

export { fetchPicture };

