const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Функция для приема и отправки данных
const loadData = (route, method = 'GET', body = null) =>
  fetch (`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(() => {
      throw new Error('Network response was not ok');
    });

export const getData = () => loadData(Route.GET_DATA);

export const sendData = (body) => loadData(Route.SEND_DATA, 'POST', body);

