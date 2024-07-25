import simpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';
import { fetchImg } from './api.js';

const form = document.querySelector('#search-form');
const loadBtn = document.querySelector('.load-more')
let page = 1;
let query = '';

const onFormSubmit = e => {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(query);
  if(!query) {
    Notify.failure('Search box is empty!')
    return;
  }
  onSearch(query);
};

const onSearch = async (query) => {
  const images = await fetchImg(query);
  console.log(images);
  picGallery(images.hits);
  loadBtn.computedStyleMap.display = "block"
 if(images.hits.length === 0 ){
    Notify.failure("You sure what you're looking for even exists?");
    return;
 }
//  try {
//     new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionDelay: 250,
//         closeText: '',
//      });
// } catch (error) {
//     console.error('Error initializing SimpleLightbox:', error);
// }
 console.log(document.querySelectorAll('.gallery a'))
};

const onLoadMore = async () => {
  page++;
  const images = await fetchImg(query, page);
  picGallery(images.hits);
  lightbox.refresh();
};

const picGallery = images => {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
    <div class="photo-card">
      <a href="${largeImageURL}" target="_blank">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b> ${likes}</p>
        <p class="info-item"><b>Views</b> ${views}</p>
        <p class="info-item"><b>Comments</b> ${comments}</p>
        <p class="info-item"><b>Downloads</b> ${downloads}</p>
               </div>`
      )
      .join('')
  );
};

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadMore);