import { UnsplashAPI } from './js/UnsplashAPI';
const api = new UnsplashAPI();
api.getPopularImages(1).then(data => console.log(data));
