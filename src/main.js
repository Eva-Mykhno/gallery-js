import { UnsplashAPI } from './js/UnsplashAPI';
import { createGalleryCard } from './js/render-function';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const jsGallery = document.querySelector('.js-gallery');
const container = document.getElementById('tui-pagination-container');
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
