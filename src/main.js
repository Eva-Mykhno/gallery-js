import iziToast from 'izitoast';
import { UnsplashAPI } from './js/UnsplashAPI';
import { createGalleryCard } from './js/render-function';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const jsGallery = document.querySelector('.js-gallery');
const container = document.getElementById('tui-pagination-container');
const formEl = document.querySelector('.js-search-form');
const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
});

const page = pagination.getCurrentPage();

const api = new UnsplashAPI();
api.getPopularImages(page).then(data => {
  const markup = createGalleryCard(data.results);
  pagination.reset(data.total);
  jsGallery.innerHTML = markup;
});
pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
  api.getPopularImages(currentPage).then(data => {
    const markup = createGalleryCard(data.results);
    jsGallery.innerHTML = markup;
  });
});
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value.trim();
  if (searchQuery === '') {
    iziToast.info({
      message: 'enter text',
    });
    return;
  }
  api.query = searchQuery;
  api.getImagesByQuery(page).then(data => {
    const markup = createGalleryCard(data.results);
    jsGallery.innerHTML = markup;
    pagination.reset(data.total);
  });
});
