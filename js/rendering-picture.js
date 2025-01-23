const pictureListElement = document.querySelector('.pictures');
const picturesElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

// Отрисовываем изображения
const renderingPictures = (pictureArrayObj) => {
  pictureArrayObj.forEach(({ url, description, id, likes, comments }) => {
    const photosElement = picturesElementTemplate.cloneNode(true);
    const imgElement = photosElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.alt = description;
    imgElement.dataset.id = id;
    photosElement.querySelector('.picture__likes').textContent = likes;
    photosElement.querySelector('.picture__comments').textContent = comments.length;

    pictureFragment.appendChild(photosElement);
  });

  pictureListElement.appendChild(pictureFragment);

};

export { renderingPictures };
