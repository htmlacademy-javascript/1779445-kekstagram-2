const picturesContainerElement = document.querySelector('.pictures');
const picturesTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragmentElement = document.createDocumentFragment();

// Отрисовываем изображения
const renderPictures = (pictureArrayObj) => {
  pictureArrayObj.forEach(({ url, description, id, likes, comments }) => {
    const photoElement = picturesTemplateElement.cloneNode(true);
    const imgElement = photoElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.alt = description;
    imgElement.dataset.id = id;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    pictureFragmentElement.appendChild(photoElement);
  });

  picturesContainerElement.appendChild(pictureFragmentElement);
};

export { renderPictures };
