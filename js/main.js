import './scale-picture.js';
import './slider-picture.js';
import './load-picture.js';
import { sortPicture } from './sort-picture.js';
import { getData } from './api.js';
import { setUserFormSubmit} from './form-validation.js';
import { showFailureAlert } from './utility.js';
import { renderingPictures } from './rendering-picture.js';
import { renderBigPicture } from './render-big-picture.js';


getData()
  .then((pictureArrayObj) => {
    renderBigPicture(pictureArrayObj);
    renderingPictures(pictureArrayObj);
    sortPicture(pictureArrayObj);
  })
  .catch(showFailureAlert);

setUserFormSubmit();

