import './css/styles.css';

import { getPhotoArr, perPage } from './api';
import { Notify } from 'notiflix';

const refForm = document.querySelector('#search-form');
const refInput = document.querySelector('input');
const refGelleryList = document.querySelector('.list');
const refLoadBtn = document.querySelector('.load-btn');

refForm.addEventListener('submit', onGetValue);
refLoadBtn.addEventListener('click', onLoadPhoto);

let inputValue = '';
let pageStart = 1;
function pageStartRestart() {
  pageStart = 1;
}

function disableLoadBtn(spin) {
  refLoadBtn.disabled = spin;
}

function hideLoadBtn() {
  refLoadBtn.classList.add('hiden-btn');
}
function openLoadBtn() {
  refLoadBtn.classList.remove('hiden-btn');
}

function delMarcapGel() {
  refGelleryList.innerHTML = '';
}

function onLoadPhoto() {
  disableLoadBtn(true);
  console.log(pageStart);
  getAsyncArr();
}

function onGetValue(e) {
  e.preventDefault();
  delMarcapGel();
  pageStartRestart();
  console.log(e.target);
  inputValue = refInput.value.trim();
  if (inputValue === '') {
    hideLoadBtn();
    return;
  }
  console.log(inputValue);
  getAsyncArr();
}
const getAsyncArr = async function getPhotoWrap() {
  try {
    const res = await getPhotoArr(inputValue, pageStart);
    if (res.hits.length < perPage) {
      renderGellery(res.hits);
      Notify.success("We're sorry, but you've reached the end of search results.");
      hideLoadBtn();
    } else {
      renderGellery(res.hits);
      if (pageStart === 1) {
        Notify.success(`URA!!! We found ${res.totalHits} images.`);
      } else {
        Notify.info(`${res.totalHits - perPage * pageStart} more pictures ready for viewing`);
      }
    }
  } catch (error) {
    delMarcapGel();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    hideLoadBtn();
  }
  pageStart += 1;
};

function renderGellery(arr) {
  const markup = arr
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      //тут же надо в ссылку оборачивать?????
      return `<li class="item">  
                <div class="photo-card">
                <img src="${webformatURL}" max-height="100%"  width="100%" alt="${tags}" loading="lazy" />
                <div class="info">
                 <p class="info-item">
                <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                <b>Views</b>${views}
                </p>
                <p class="info-item">
                <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>${downloads}
                </p>
                </div>
                </div>
                </li>`;
    })
    .join('');
  refGelleryList.insertAdjacentHTML('beforeend', markup);
  openLoadBtn();
  disableLoadBtn(false);
}

// function renderGellery(arr) {
//   const markup = arr
//     .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
//       //
//       return `  <div class="photo-card">
//                 <img src="${webformatURL}" min-height="100%"  width="100%" alt="${tags}" loading="lazy" />
//                 <div class="info">
//                  <p class="info-item">
//                 <b>Likes</b>${likes}
//                 </p>
//                 <p class="info-item">
//                 <b>Views</b>${views}
//                 </p>
//                 <p class="info-item">
//                 <b>Comments</b>${comments}
//                 </p>
//                 <p class="info-item">
//                 <b>Downloads</b>${downloads}
//                 </p>
//                 </div>
//                 </div>`;
//     })
//     .join('');
//   refGelleryList.insertAdjacentHTML('beforeend', markup);
// }
